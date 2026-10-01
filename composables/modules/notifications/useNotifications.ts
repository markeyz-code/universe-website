import { ref, computed } from 'vue';
import { io, Socket } from 'socket.io-client';
import { notificationsApi } from '@/api_factory/modules/notifications';
import { useAuth } from '@/composables/core/useAuth';
import { useCustomToast } from '@/composables/core/useCustomToast';

let socketInstance: Socket | null = null;

export const useNotifications = () => {
  const { token, isAuthenticated } = useAuth();
  const { showToast } = useCustomToast();

  const notifications = useState<any[]>('notifications_list', () => []);
  const unreadCount = useState<number>('notifications_unread_count', () => 0);
  const connected = useState<boolean>('notifications_connected', () => false);
  const loading = ref(false);
  const activeFilter = ref<'all' | 'unread' | 'SUBSCRIPTION' | 'MENTORSHIP' | 'APPROVAL' | 'SYSTEM'>('all');
  const pushPermission = ref<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  const filteredNotifications = computed(() => {
    if (activeFilter.value === 'all') return notifications.value;
    if (activeFilter.value === 'unread') return notifications.value.filter((n) => !n.isRead);
    return notifications.value.filter((n) => n.type === activeFilter.value);
  });

  const getSocketUrl = () => {
    const raw = (import.meta.env.VITE_BASE_URL as string) || 'http://localhost:4000/api/v1';
    return raw.replace(/\/api\/v1\/?$/, '');
  };

  /**
   * Request browser push notification permission
   */
  const requestPushPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showToast({ title: 'Not Supported', message: 'Browser push notifications are not supported on this device.', type: 'info' });
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      pushPermission.value = permission;
      if (permission === 'granted') {
        showToast({ title: 'Push Notifications Enabled', message: 'You will receive real-time updates directly on your screen.', type: 'success' });
      }
      return permission;
    } catch (err: any) {
      console.error('Error requesting notification permission:', err);
      return 'denied';
    }
  };

  /**
   * Trigger native browser push notification
   */
  const triggerPushNotification = (title: string, message: string, link?: string) => {
    if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    try {
      const notif = new Notification(title, {
        body: message,
        icon: '/logo-icon.png',
        badge: '/logo-icon.png',
      });

      if (link) {
        notif.onclick = () => {
          window.focus();
          window.location.href = link;
        };
      }
    } catch (err) {
      console.error('Push notification trigger error:', err);
    }
  };

  /**
   * Initialize WebSocket connection with auth token
   */
  const initWebSocket = () => {
    if (typeof window === 'undefined') return;
    if (!token.value || !isAuthenticated.value) return;

    if (socketInstance && socketInstance.connected) {
      connected.value = true;
      return;
    }

    const socketUrl = getSocketUrl();

    socketInstance = io(`${socketUrl}/notifications`, {
      auth: { token: token.value },
      query: { token: token.value },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 15,
      reconnectionDelay: 2000,
    });

    socketInstance.on('connect', () => {
      connected.value = true;
    });

    socketInstance.on('disconnect', () => {
      connected.value = false;
    });

    socketInstance.on('connected', (data: any) => {
      connected.value = true;
    });

    // Real-time notification received from server
    socketInstance.on('new_notification', (newNotif: any) => {
      // Check if already in list to avoid duplicates
      const exists = notifications.value.some((n) => n._id === newNotif._id);
      if (!exists) {
        notifications.value.unshift(newNotif);
      }
      unreadCount.value = (unreadCount.value || 0) + 1;

      // In-app custom toast
      showToast({
        title: newNotif.title,
        message: newNotif.message,
        type: 'info',
      });

      // Browser Push Notification
      triggerPushNotification(newNotif.title, newNotif.message, newNotif.link);
    });

    socketInstance.on('unread_count_update', (data: { unreadCount: number }) => {
      unreadCount.value = data.unreadCount;
    });

    socketInstance.on('broadcast_notification', (data: any) => {
      notifications.value.unshift(data);
      unreadCount.value = (unreadCount.value || 0) + 1;
      showToast({
        title: data.title,
        message: data.message,
        type: 'info',
      });
      triggerPushNotification(data.title, data.message, data.link);
    });
  };

  const disconnectWebSocket = () => {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
      connected.value = false;
    }
  };

  /**
   * Fetch paginated notifications from REST API
   */
  const fetchNotifications = async (page: number = 1, limit: number = 30) => {
    if (!isAuthenticated.value) return;
    loading.value = true;
    try {
      const response = await notificationsApi.getNotifications({ page, limit });
      const data = response?.data || response;
      notifications.value = data.items || [];
      unreadCount.value = data.unreadCount || 0;
      return data;
    } catch (err: any) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetch unread notifications count
   */
  const fetchUnreadCount = async () => {
    if (!isAuthenticated.value) return;
    try {
      const response = await notificationsApi.getUnreadCount();
      const data = response?.data || response;
      unreadCount.value = data.unreadCount || 0;
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    }
  };

  /**
   * Mark a single notification as read
   */
  const markAsRead = async (id: string) => {
    try {
      // Optimistic update
      const item = notifications.value.find((n) => n._id === id);
      if (item && !item.isRead) {
        item.isRead = true;
        unreadCount.value = Math.max(0, unreadCount.value - 1);
      }
      await notificationsApi.markAsRead(id);
    } catch (err: any) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = async () => {
    try {
      notifications.value.forEach((n) => (n.isRead = true));
      unreadCount.value = 0;
      await notificationsApi.markAllAsRead();
      showToast({ title: 'Updated', message: 'All notifications marked as read', type: 'success' });
    } catch (err: any) {
      console.error('Failed to mark all as read:', err);
    }
  };

  /**
   * Delete a notification
   */
  const deleteNotification = async (id: string) => {
    try {
      const index = notifications.value.findIndex((n) => n._id === id);
      if (index !== -1) {
        const item = notifications.value[index];
        if (!item.isRead) {
          unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
        notifications.value.splice(index, 1);
      }
      await notificationsApi.deleteNotification(id);
    } catch (err: any) {
      console.error('Failed to delete notification:', err);
    }
  };

  return {
    notifications,
    filteredNotifications,
    unreadCount,
    connected,
    loading,
    activeFilter,
    pushPermission,
    initWebSocket,
    disconnectWebSocket,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    requestPushPermission,
  };
};
