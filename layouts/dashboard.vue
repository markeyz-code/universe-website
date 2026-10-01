
<template>
  <div class="h-screen w-full flex bg-[#FAF5FF] overflow-hidden font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-[#1E1145] to-[#2D1B69] text-slate-300 flex-shrink-0 hidden lg:flex flex-col relative z-20 transition-all duration-300 border-r border-purple-900/50">
      <!-- Decorative orb -->
      <div class="absolute -top-20 -left-20 w-56 h-56 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-20 -right-10 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Logo Area -->
      <div class="h-16 flex items-center px-6 border-b border-white/10 relative overflow-hidden">
        <NuxtLink to="/dashboard/overview" class="flex items-center gap-3 relative z-10">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Sparkles class="w-4 h-4 text-white" />
          </div>
          <span class="text-lg font-bold text-white tracking-tight">UniVerse</span>
        </NuxtLink>
      </div>
      
      <!-- Navigation -->
      <div class="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar relative z-10">
        <p class="text-[10px] font-bold text-violet-400/70 uppercase tracking-widest mb-3 px-3">Main Menu</p>
        <nav class="space-y-1">
          <NuxtLink to="/dashboard/overview" class="nav-item group" active-class="active-nav">
            <div class="nav-icon"><LayoutDashboard class="w-4 h-4" /></div>
            <span class="font-medium text-sm">Overview</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/vault" class="nav-item group" active-class="active-nav">
            <div class="nav-icon"><Folder class="w-4 h-4" /></div>
            <span class="font-medium text-sm">The Vault</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/mentorship" class="nav-item group" active-class="active-nav">
            <div class="nav-icon"><Users class="w-4 h-4" /></div>
            <span class="font-medium text-sm">Mentorship Matcher</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/career" class="nav-item group" active-class="active-nav">
            <div class="nav-icon"><Briefcase class="w-4 h-4" /></div>
            <span class="font-medium text-sm">Career Hub</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/notifications" class="nav-item group" active-class="active-nav">
            <div class="nav-icon"><Bell class="w-4 h-4" /></div>
            <span class="font-medium text-sm">Notifications</span>
            <span v-if="unreadCount > 0" class="ml-auto px-1.5 py-0.2 min-w-[18px] text-center rounded-full text-[10px] font-extrabold bg-fuchsia-500 text-white animate-pulse">
              {{ unreadCount > 99 ? '99+' : unreadCount }}
            </span>
          </NuxtLink>
          
          <div class="pt-5 pb-1">
            <p class="text-[10px] font-bold text-violet-400/70 uppercase tracking-widest mb-3 px-3">Account</p>
          </div>
          
          <NuxtLink to="/dashboard/pricing" class="nav-item group" active-class="active-nav">
            <div class="nav-icon"><CreditCard class="w-4 h-4" /></div>
            <span class="font-medium text-sm">Subscription</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/events" class="nav-item group" active-class="active-nav">
            <div class="nav-icon"><Calendar class="w-4 h-4" /></div>
            <span class="font-medium text-sm">Events</span>
          </NuxtLink>
        </nav>
      </div>

      <!-- User Profile -->
      <div class="mt-auto p-3 m-3 bg-white/5 border border-violet-500/20 rounded-xl backdrop-blur-sm relative z-10">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/30">
            {{ userInitial }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-white truncate">{{ userDisplayName }}</p>
            <p class="text-[10px] text-violet-300/70 truncate">{{ user?.email || 'user@example.com' }}</p>
          </div>
        </div>
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-slate-300 text-xs font-medium transition-all duration-300 cursor-pointer">
          <LogOut class="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Wrapper -->
    <div class="flex-1 flex flex-col min-w-0 bg-[#FAF5FF]">
      
      <!-- Header -->
      <header class="h-16 bg-white/80 backdrop-blur-md border-b border-violet-100 flex items-center justify-between px-6 sticky top-0 z-30">
        <!-- Mobile Menu Toggle -->
        <div class="flex items-center gap-4">
          <button class="lg:hidden p-2 text-slate-600 hover:bg-violet-50 rounded-xl transition-colors">
            <Menu class="w-5 h-5" />
          </button>
          
          <div class="hidden md:flex items-center bg-violet-50/80 rounded-full px-3 py-1.5 w-64 border border-violet-200/60 focus-within:border-violet-400 transition-all">
            <Search class="w-4 h-4 text-violet-400 mr-2" />
            <input type="text" placeholder="Search anything..." class="bg-transparent border-none outline-none w-full text-xs text-slate-700 placeholder-violet-300" />
          </div>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink
            to="/dashboard/notifications"
            class="w-9 h-9 rounded-full border border-violet-200 flex items-center justify-center text-violet-500 hover:bg-violet-50 hover:text-violet-700 transition-colors relative"
            title="Notifications"
          >
            <Bell class="w-4 h-4" />
            <span
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-fuchsia-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white animate-pulse"
            >
              {{ unreadCount > 99 ? '99+' : unreadCount }}
            </span>
          </NuxtLink>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="flex-1 overflow-auto p-4 lg:p-6">
        <div class="max-w-6xl mx-auto">
          <slot />
        </div>
      </main>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Folder, Users, Briefcase, LogOut, Menu, CreditCard, LayoutDashboard, Calendar, Search, Bell, Sparkles } from 'lucide-vue-next';
import { useAuth } from '@/composables/core/useAuth';
import { useNotifications } from '@/composables/modules/notifications/useNotifications';
import { useCustomModal } from '@/composables/core/useCustomModal';

const router = useRouter();
const { user, clearAuth, initAuth, fetchUserProfile } = useAuth();
const { unreadCount, initWebSocket, fetchUnreadCount } = useNotifications();
const { confirm } = useCustomModal();

onMounted(async () => {
  initAuth();
  if (!user.value?.firstName) {
    await fetchUserProfile();
  }
  initWebSocket();
  await fetchUnreadCount();
});

const userDisplayName = computed(() => {
  if (user.value?.firstName) {
    return `${user.value.firstName} ${user.value.lastName || ''}`.trim();
  }
  if (user.value?.email) {
    return user.value.email.split('@')[0];
  }
  return 'UniVerse Member';
});

const userInitial = computed(() => {
  if (user.value?.firstName) return user.value.firstName.charAt(0).toUpperCase();
  if (user.value?.email) return user.value.email.charAt(0).toUpperCase();
  return 'U';
});

const handleLogout = async () => {
  const confirmed = await confirm({
    title: 'Sign Out',
    message: 'Are you sure you want to sign out of your current session?',
    confirmText: 'Sign Out',
    cancelText: 'Cancel',
    type: 'danger',
  });
  if (confirmed) {
    clearAuth();
    router.push('/login');
  }
};
</script>

<style scoped>
.nav-item {
  @apply flex items-center gap-3 px-3 py-2.5 rounded-lg text-violet-300/70 hover:text-white hover:bg-white/5 transition-all duration-300;
}
.nav-icon {
  @apply flex items-center justify-center transition-transform duration-300 group-hover:scale-110;
}
.active-nav {
  @apply bg-violet-500/20 text-white font-bold border border-violet-500/30 shadow-[inset_0px_0px_10px_rgba(109,40,217,0.15)];
}
.active-nav .nav-icon {
  @apply text-violet-300;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.2);
  border-radius: 10px;
}
</style>
