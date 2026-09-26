<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <h1 class="text-xl font-bold bg-gradient-to-r from-brand to-blue-600 bg-clip-text text-transparent">
              Portal
            </h1>
          </div>
          <div class="flex items-center gap-4">
            <button @click="handleLogout" class="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <!-- Welcome Header -->
      <div v-if="!loading && profile" class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand/5 rounded-full blur-3xl"></div>
        <div class="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 tracking-tight">Welcome back, {{ profile.firstName }}! 👋</h2>
            <p class="text-gray-500 mt-2 text-sm sm:text-base">Here's an overview of your active subscription and member benefits.</p>
          </div>
          <div v-if="subscription" class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand/10 to-brand/5 border border-brand/20 rounded-full">
            <span class="w-2.5 h-2.5 bg-brand rounded-full animate-pulse"></span>
            <span class="text-sm font-bold text-brand uppercase tracking-wider">{{ subscription.name }}</span>
          </div>
          <div v-else class="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-700">
            <span class="text-sm font-bold uppercase tracking-wider">No Active Plan</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="h-32 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse"></div>
      </div>

      <!-- Main Dashboard Grid -->
      <div v-else-if="profile" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Subscription Details (Left Col) -->
        <div class="lg:col-span-2 space-y-8">
          
          <h3 class="text-lg font-bold text-gray-900">Your Plan Allowances</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Mentorship Requests -->
            <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <p class="text-sm font-medium text-gray-500">Mentorship Requests</p>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-3xl font-black text-gray-900">{{ subscription?.maxMentorshipRequests || 0 }}</span>
                <span class="text-sm text-gray-500">Max / month</span>
              </div>
            </div>

            <!-- Event Discount -->
            <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p class="text-sm font-medium text-gray-500">Event Ticket Discount</p>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-3xl font-black text-gray-900">{{ subscription?.eventDiscountPercentage || 0 }}%</span>
                <span class="text-sm text-gray-500">Off all paid events</span>
              </div>
            </div>
          </div>

          <h3 class="text-lg font-bold text-gray-900 pt-4">Feature Access</h3>
          
          <!-- Access Checks -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
            <div class="p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-lg">🔐</span>
                <span class="font-medium text-gray-900">Access The Vault</span>
              </div>
              <span v-if="subscription?.canAccessVault" class="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase">Unlocked</span>
              <span v-else class="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase">Locked</span>
            </div>
            
            <div class="p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-lg">✍️</span>
                <span class="font-medium text-gray-900">Post Articles</span>
              </div>
              <span v-if="subscription?.canPostArticles" class="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase">Unlocked</span>
              <span v-else class="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase">Locked</span>
            </div>

            <div class="p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-lg">🌍</span>
                <span class="font-medium text-gray-900">Global Community</span>
              </div>
              <span v-if="subscription?.canAccessGlobalCommunity" class="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase">Unlocked</span>
              <span v-else class="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase">Locked</span>
            </div>
          </div>

        </div>

        <!-- Quick Links (Right Col) -->
        <div class="space-y-6">
          <div class="bg-brand rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
            <h3 class="text-xl font-bold mb-2">Ready to explore?</h3>
            <p class="text-brand-50 text-sm mb-6">Take advantage of your active plan and start networking, reading, or attending events.</p>
            <div class="space-y-3 relative z-10">
              <NuxtLink to="/events" class="flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group">
                <span class="font-medium">Browse Events</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </NuxtLink>
              <NuxtLink to="/vault" v-if="subscription?.canAccessVault" class="flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group">
                <span class="font-medium">Enter The Vault</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </NuxtLink>
              <NuxtLink to="/pricing" v-if="!subscription" class="flex items-center justify-between px-4 py-3 bg-white text-brand hover:bg-gray-50 rounded-lg transition-colors font-bold text-center justify-center">
                Get a Subscription
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
      
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authApi } from '@/api_factory/modules/auth';
import { useAuth } from '@/composables/core/useAuth';
import { useSeoMeta } from '#imports';

useSeoMeta({ title: 'Dashboard | Portal' });

const router = useRouter();
const { clearAuth } = useAuth();

const loading = ref(true);
const profile = ref<any>(null);

const subscription = computed(() => {
  return profile.value?.activeSubscription || null;
});

const handleLogout = () => {
  clearAuth();
  router.push('/login');
};

const fetchProfile = async () => {
  try {
    const { data } = await authApi.me();
    profile.value = data;
  } catch (error) {
    console.error('Failed to load profile:', error);
    // If unauthorized, redirect to login
    clearAuth();
    router.push('/login');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
.brand {
  --tw-text-opacity: 1;
  color: rgb(31 78 112 / var(--tw-text-opacity));
}
.bg-brand {
  --tw-bg-opacity: 1;
  background-color: rgb(31 78 112 / var(--tw-bg-opacity));
}
</style>
