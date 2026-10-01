
<template>
  <div class="h-screen w-full flex bg-[#FAF5FF] overflow-hidden font-sans text-sm md:text-base">
    <!-- Mobile Sidebar Backdrop -->
    <div 
      v-if="isMobileSidebarOpen"
      @click="isMobileSidebarOpen = false"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        isSidebarCollapsed ? 'lg:w-20 w-64' : 'w-64',
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'fixed lg:relative inset-y-0 left-0 bg-[#0F172A] text-slate-300 flex-shrink-0 flex flex-col z-50 transition-all duration-300 border-r border-slate-800 h-full'
      ]"
    >
      <!-- Desktop Collapse Toggle -->
      <button 
        @click="toggleDesktopSidebar" 
        class="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors z-50 shadow-md cursor-pointer"
      >
        <ChevronLeft v-if="!isSidebarCollapsed" class="w-3.5 h-3.5" />
        <ChevronRight v-else class="w-3.5 h-3.5" />
      </button>

      <!-- Logo Area -->
      <div class="h-16 flex items-center px-6 border-b border-white/10 relative overflow-hidden" :class="isSidebarCollapsed ? 'lg:justify-center lg:px-0' : ''">
        <NuxtLink to="/dashboard/overview" class="flex items-center gap-3 relative z-10" @click="isMobileSidebarOpen = false">
          <div class="w-8 h-8 rounded-xl bg-brand flex items-center justify-center shadow-sm shrink-0">
            <Sparkles class="w-4 h-4 text-white" />
          </div>
          <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="text-lg font-bold text-white tracking-tight">UniVerse</span>
        </NuxtLink>
      </div>
      
      <!-- Navigation -->
      <div class="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar relative z-10">
        <p :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">Main Menu</p>
        <nav class="space-y-1">
          <NuxtLink to="/dashboard/overview" class="nav-item group" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'Overview' : ''">
            <div class="nav-icon"><LayoutDashboard class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">Overview</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/vault" class="nav-item group" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'The Vault' : ''">
            <div class="nav-icon"><Folder class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">The Vault</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/courses" class="nav-item group" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'Courses' : ''">
            <div class="nav-icon"><BookOpen class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">Courses</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/mentorship" class="nav-item group" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'Mentorship Matcher' : ''">
            <div class="nav-icon"><Users class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">Mentorship Matcher</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/career" class="nav-item group" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'Career Hub' : ''">
            <div class="nav-icon"><Briefcase class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">Career Hub</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/marketplace" class="nav-item group" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'Creator Hub' : ''">
            <div class="nav-icon"><ShoppingBag class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">Creator Hub</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/bounties" class="nav-item group" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'Services & Bounties' : ''">
            <div class="nav-icon"><Target class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">Services & Bounties</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/notifications" class="nav-item group relative" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'Notifications' : ''">
            <div class="nav-icon"><Bell class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">Notifications</span>
            <span v-if="unreadCount > 0 && !isSidebarCollapsed" class="ml-auto px-1.5 py-0.2 min-w-[18px] text-center rounded-full text-[10px] font-extrabold bg-fuchsia-500 text-white animate-pulse">
              {{ unreadCount > 99 ? '99+' : unreadCount }}
            </span>
            <span v-if="unreadCount > 0 && isSidebarCollapsed" class="absolute top-2 right-2 w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse lg:block hidden"></span>
          </NuxtLink>
          
          <div class="pt-5 pb-1">
            <p :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">Account</p>
          </div>
          
          <NuxtLink to="/dashboard/pricing" class="nav-item group" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'Subscription' : ''">
            <div class="nav-icon"><CreditCard class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">Subscription</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/events" class="nav-item group" active-class="active-nav" @click="isMobileSidebarOpen = false" :title="isSidebarCollapsed ? 'Events' : ''">
            <div class="nav-icon"><Calendar class="w-4 h-4 shrink-0" /></div>
            <span :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="font-medium text-sm">Events</span>
          </NuxtLink>
        </nav>
      </div>

      <!-- User Profile -->
      <div class="mt-auto p-3 m-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm relative z-10">
        <div class="flex items-center gap-3 mb-3" :class="isSidebarCollapsed ? 'lg:justify-center' : ''">
          <div class="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
            {{ userInitial }}
          </div>
          <div :class="isSidebarCollapsed ? 'lg:hidden' : ''" class="flex-1 min-w-0">
            <p class="text-xs font-bold text-white truncate">{{ userDisplayName }}</p>
            <p class="text-[10px] text-slate-400 truncate">{{ user?.email || 'user@example.com' }}</p>
          </div>
        </div>
        <button @click="handleLogout" :title="isSidebarCollapsed ? 'Sign Out' : ''" class="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-slate-300 text-xs font-medium transition-all duration-300 cursor-pointer">
          <LogOut class="w-3.5 h-3.5 shrink-0" />
          <span :class="isSidebarCollapsed ? 'lg:hidden' : ''">Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Wrapper -->
    <div class="flex-1 flex flex-col min-w-0 bg-[#FAF5FF]">
      
      <!-- Header -->
      <header class="h-16 bg-white/80 backdrop-blur-md border-b border-violet-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
        <!-- Mobile Menu Toggle -->
        <div class="flex items-center gap-2 lg:gap-4">
          <button @click="toggleMobileSidebar" class="lg:hidden p-2 text-slate-600 hover:bg-violet-50 rounded-xl transition-colors shrink-0 cursor-pointer">
            <Menu class="w-5 h-5" />
          </button>
          
          <div class="hidden md:flex items-center bg-violet-50/80 rounded-full px-3 py-1.5 w-48 lg:w-64 border border-violet-200/60 focus-within:border-violet-400 transition-all">
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
import { Folder, Users, Briefcase, LogOut, Menu, CreditCard, LayoutDashboard, Calendar, Search, Bell, Sparkles, ShoppingBag, Target, BookOpen, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useAuth } from '@/composables/core/useAuth';
import { useNotifications } from '@/composables/modules/notifications/useNotifications';
import { useCustomModal } from '@/composables/core/useCustomModal';

const router = useRouter();
const { user, clearAuth, initAuth, fetchUserProfile } = useAuth();
const { unreadCount, initWebSocket, fetchUnreadCount } = useNotifications();
const { confirm } = useCustomModal();

const isMobileSidebarOpen = ref(false);
const isSidebarCollapsed = ref(false);

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const toggleDesktopSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

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
  @apply flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 overflow-hidden;
}
.nav-icon {
  @apply flex items-center justify-center transition-transform duration-300 group-hover:scale-110;
}
.active-nav {
  @apply bg-brand/20 text-white font-bold border border-brand/30 shadow-[inset_0px_0px_10px_rgba(109,40,217,0.15)];
}
.active-nav .nav-icon {
  @apply text-white;
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
