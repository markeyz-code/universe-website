<template>
  <div class="space-y-6 pb-16">
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-gray-900">Notifications</h1>
          <!-- Real-time WebSocket connection status badge -->
          <div
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            :class="connected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'"
          >
            <span class="w-2 h-2 rounded-full" :class="connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'"></span>
            <span>{{ connected ? 'Live' : 'Connecting...' }}</span>
          </div>
        </div>
        <p class="text-gray-500 text-sm mt-1">Real-time alerts for application status, subscription upgrades, mentorship, and jobs.</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
        <!-- Push Notification Permission Button -->
        <button
          v-if="pushPermission !== 'granted'"
          @click="requestPushPermission"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-brand/10 text-brand hover:bg-brand/20 transition-colors"
          title="Enable browser notifications"
        >
          <BellRing class="w-4 h-4 text-brand" />
          <span>Enable Push</span>
        </button>
        <div
          v-else
          class="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
        >
          <Check class="w-3.5 h-3.5 text-emerald-600" />
          <span>Push Enabled</span>
        </div>

        <!-- Mark all as read -->
        <button
          @click="markAllAsRead"
          :disabled="unreadCount === 0"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <CheckCheck class="w-4 h-4 text-slate-500" />
          <span>Mark all as read</span>
        </button>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        v-for="tab in filterTabs"
        :key="tab.key"
        @click="activeFilter = tab.key as any"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border"
        :class="[
          activeFilter === tab.key
            ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200'
            : 'bg-white text-slate-600 hover:bg-violet-50 border-slate-200/80'
        ]"
      >
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.badge !== undefined && tab.badge > 0"
          class="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold"
          :class="activeFilter === tab.key ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand'"
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white rounded-2xl p-16 text-center border border-slate-200/80 shadow-sm">
      <div class="animate-spin rounded-full h-10 w-10 border-2 border-brand border-t-transparent mx-auto"></div>
      <p class="text-slate-500 text-sm mt-4 font-medium">Fetching notifications...</p>
    </div>

    <!-- Notifications List -->
    <div v-else-if="filteredNotifications.length > 0" class="space-y-3">
      <div
        v-for="notif in filteredNotifications"
        :key="notif._id"
        class="bg-white rounded-2xl p-5 border transition-all duration-200 flex items-start gap-4 hover:shadow-sm"
        :class="[
          !notif.isRead
            ? 'border-brand/40 bg-brand/[0.015] ring-1 ring-brand/10'
            : 'border-slate-200/80'
        ]"
      >
        <!-- Category Icon -->
        <div
          class="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          :class="getTypeStyles(notif.type).iconBg"
        >
          <component :is="getTypeStyles(notif.type).icon" class="w-5 h-5" :class="getTypeStyles(notif.type).iconColor" />
        </div>

        <!-- Notification Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-3 mb-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-sm font-bold text-gray-900">{{ notif.title }}</h3>
              <span
                v-if="!notif.isRead"
                class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand text-white uppercase tracking-wider"
              >
                New
              </span>
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                :class="getTypeStyles(notif.type).badge"
              >
                {{ notif.type }}
              </span>
            </div>
            <span class="text-[11px] text-slate-400 whitespace-nowrap">{{ formatTime(notif.createdAt) }}</span>
          </div>

          <p class="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">{{ notif.message }}</p>

          <!-- Action Link / Buttons -->
          <div class="flex items-center gap-3 pt-1">
            <NuxtLink
              v-if="notif.link"
              :to="notif.link"
              class="inline-flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-800 hover:underline"
            >
              <span>View Details</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </NuxtLink>

            <button
              v-if="!notif.isRead"
              @click="markAsRead(notif._id)"
              class="text-xs text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 font-medium ml-auto"
              title="Mark as read"
            >
              <Check class="w-3.5 h-3.5 text-slate-400" />
              <span>Mark as read</span>
            </button>

            <button
              @click="deleteNotification(notif._id)"
              class="text-xs text-slate-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50 ml-1"
              title="Delete notification"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-2xl p-16 text-center border border-slate-200/80 shadow-sm">
      <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
        <BellOff class="w-8 h-8 text-slate-400" />
      </div>
      <h3 class="text-base font-bold text-gray-900 mb-1">All caught up!</h3>
      <p class="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto mb-6">
        {{ activeFilter === 'unread' ? 'You have no unread notifications.' : 'There are no notifications in this category.' }}
      </p>
      <button
        v-if="activeFilter !== 'all'"
        @click="activeFilter = 'all'"
        class="px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold hover:bg-violet-700 transition-colors"
      >
        View All Notifications
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';
import { useSeoMeta, useHead } from '#imports';
import {
  Bell,
  BellRing,
  BellOff,
  Check,
  CheckCheck,
  CheckCircle2,
  CreditCard,
  Users,
  Briefcase,
  Shield,
  Trash2,
  ArrowRight,
  Sparkles,
} from 'lucide-vue-next';
import { useNotifications } from '@/composables/modules/notifications/useNotifications';

definePageMeta({ layout: 'dashboard' });

useSeoMeta({
  title: 'Notifications | UniVerse',
  description: 'Manage your real-time UniVerse alerts and activity updates.',
});
useHead({ title: 'Notifications | UniVerse' });

const {
  notifications,
  filteredNotifications,
  unreadCount,
  connected,
  loading,
  activeFilter,
  pushPermission,
  initWebSocket,
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  requestPushPermission,
} = useNotifications();

const filterTabs = computed(() => [
  { key: 'all', label: 'All', badge: notifications.value.length },
  { key: 'unread', label: 'Unread', badge: unreadCount.value },
  { key: 'SUBSCRIPTION', label: 'Subscriptions' },
  { key: 'MENTORSHIP', label: 'Mentorship' },
  { key: 'APPROVAL', label: 'Approvals' },
  { key: 'SYSTEM', label: 'System' },
]);

const getTypeStyles = (type: string) => {
  switch (type) {
    case 'APPROVAL':
      return {
        icon: CheckCircle2,
        iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        iconColor: 'text-emerald-600',
        badge: 'bg-emerald-50 text-emerald-700',
      };
    case 'SUBSCRIPTION':
    case 'PAYMENT':
      return {
        icon: CreditCard,
        iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
        iconColor: 'text-blue-600',
        badge: 'bg-blue-50 text-blue-700',
      };
    case 'MENTORSHIP':
      return {
        icon: Users,
        iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
        iconColor: 'text-purple-600',
        badge: 'bg-purple-50 text-purple-700',
      };
    case 'JOB':
      return {
        icon: Briefcase,
        iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
        iconColor: 'text-amber-600',
        badge: 'bg-amber-50 text-amber-700',
      };
    case 'SECURITY':
      return {
        icon: Shield,
        iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
        iconColor: 'text-rose-600',
        badge: 'bg-rose-50 text-rose-700',
      };
    default:
      return {
        icon: Sparkles,
        iconBg: 'bg-slate-100 text-slate-600 border border-slate-200',
        iconColor: 'text-slate-600',
        badge: 'bg-slate-100 text-slate-700',
      };
  }
};

const formatTime = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

onMounted(async () => {
  initWebSocket();
  await fetchNotifications();
});
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
