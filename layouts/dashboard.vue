<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden lg:flex flex-col z-20">
      <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <img src="~/assets/logo-icon.png" class="h-8 w-auto" alt="InternTional Logo" />
      </div>
      
      <div class="px-4 py-6">
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Menu</p>
        <nav class="space-y-1">
          <NuxtLink to="/overview" class="flex items-center gap-3 px-3 py-2 rounded text-gray-600 hover:bg-gray-50 transition-colors group font-medium" active-class="bg-gray-100 text-gray-900">
            <LayoutDashboard class="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            Overview
          </NuxtLink>
          <NuxtLink to="/vault" class="flex items-center gap-3 px-3 py-2 rounded text-gray-600 hover:bg-gray-50 transition-colors group font-medium" active-class="bg-gray-100 text-gray-900">
            <Folder class="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            The Vault
          </NuxtLink>
          <NuxtLink to="/mentorship" class="flex items-center gap-3 px-3 py-2 rounded text-gray-600 hover:bg-gray-50 transition-colors group font-medium" active-class="bg-gray-100 text-gray-900">
            <Users class="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            Mentorship Matcher
          </NuxtLink>
          <NuxtLink to="/career" class="flex items-center gap-3 px-3 py-2 rounded text-gray-600 hover:bg-gray-50 transition-colors group font-medium" active-class="bg-gray-100 text-gray-900">
            <Briefcase class="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            Career Hub
          </NuxtLink>
          <NuxtLink to="/pricing" class="flex items-center gap-3 px-3 py-2 rounded text-gray-600 hover:bg-gray-50 transition-colors group font-medium" active-class="bg-gray-100 text-gray-900">
            <CreditCard class="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            Subscription
          </NuxtLink>
        </nav>
      </div>

      <div class="mt-auto p-4 border-t border-gray-200">
        <div class="px-2 py-3 mb-2">
          <p class="text-sm font-medium text-gray-900 truncate">{{ user?.firstName || 'Intern' }} {{ user?.lastName || 'Member' }}</p>
          <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
        </div>
        
        <button @click="handleLogout" class="w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          <LogOut class="w-4 h-4 text-gray-400" />
          Sign Out
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <!-- Mobile Header -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:hidden">
        <img src="~/assets/logo-icon.png" class="h-8 w-auto" alt="InternTional Logo" />
        <button class="p-2 text-gray-600 hover:bg-gray-100 rounded">
          <Menu class="w-6 h-6" />
        </button>
      </header>
      
      <!-- Main Content -->
      <main class="flex-1 overflow-auto p-6 lg:p-8">
        <div class="max-w-6xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Folder, Users, Briefcase, LogOut, Menu, CreditCard, LayoutDashboard } from 'lucide-vue-next';
import { useAuth } from '@/composables/core/useAuth';

const router = useRouter();
const { user, clearAuth } = useAuth();

const handleLogout = () => {
  clearAuth();
  router.push('/login');
};
</script>
