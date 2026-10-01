import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const notificationsApi = {
  getNotifications(params?: { page?: number; limit?: number; unreadOnly?: boolean; type?: string }) {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/notifications', { params });
  },

  getUnreadCount() {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/notifications/unread-count');
  },

  markAsRead(id: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.patch(`/notifications/${id}/read`);
  },

  markAllAsRead() {
    return GATEWAY_ENDPOINT_WITH_AUTH.patch('/notifications/read-all');
  },

  deleteNotification(id: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/notifications/${id}`);
  },
};
