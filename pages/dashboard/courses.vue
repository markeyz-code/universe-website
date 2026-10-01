<template>
  <div class="space-y-8 pb-12 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
      <div class="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
      <div class="relative z-10">
        <h1 class="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">Your Courses</h1>
        <p class="text-white/80 text-sm max-w-lg">
          Access premium Masterclasses and curated courses included with your active subscription plan.
        </p>
      </div>
    </div>

    <div v-if="loading" class="py-20 flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
    </div>

    <!-- Active Plan & Courses -->
    <div v-else-if="hasActivePlan" class="space-y-12">
      <div v-if="!activePlanData?.sellarCourses || activePlanData.sellarCourses.length === 0" class="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
        <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">No courses available</h3>
        <p class="text-gray-500 mb-6 max-w-sm mx-auto">Your current subscription plan doesn't have any attached premium courses yet.</p>
      </div>

      <!-- Categories -->
      <div v-else class="space-y-12">
        <div v-for="(category, idx) in activePlanData.sellarCourses" :key="idx" class="space-y-4">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold text-gray-900">{{ category.category || 'General' }}</h2>
            <div class="h-px flex-1 bg-gray-200"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(course, cIdx) in category.courses" :key="cIdx" class="bg-white rounded-2xl border border-violet-100 shadow-sm hover:shadow-xl hover:shadow-violet-600/5 transition-all group overflow-hidden flex flex-col">
              <!-- Course Cover Image -->
              <div class="h-40 w-full bg-gray-100 relative overflow-hidden">
                <img v-if="course.image" :src="course.image" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div v-else class="w-full h-full flex flex-col justify-center items-center bg-violet-50 text-violet-300">
                  <svg class="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <!-- Category Badge -->
                <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-extrabold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                  Premium Course
                </div>
              </div>
              
              <div class="p-5 flex-1 flex flex-col">
                <h3 class="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-violet-600 transition-colors">{{ course.title }}</h3>
                <p class="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{{ course.description || 'Access this premium course material.' }}</p>
                
                <a :href="course.link" target="_blank" class="w-full text-center px-4 py-2.5 bg-violet-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-violet-700 transition-all cursor-pointer">
                  Start Course
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Plan State -->
    <div v-else class="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
      <div class="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Upgrade to Access Courses</h3>
      <p class="text-gray-500 mb-6 max-w-sm mx-auto">You need an active subscription plan to access premium courses and masterclasses.</p>
      <NuxtLink to="/dashboard/pricing" class="px-6 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-all shadow-md shadow-violet-600/20 inline-block">
        View Pricing Plans
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';
import { ref, computed, onMounted } from 'vue';
import { useAuth } from '@/composables/core/useAuth';
import { useSubscriptions } from '@/composables/modules/subscriptions/useSubscriptions';

useSeoMeta({ title: 'My Courses - UniVerse' });
definePageMeta({ layout: 'dashboard' });

const { user, initAuth } = useAuth();
const { loading, subscriptions, fetchActive } = useSubscriptions();

const hasActivePlan = computed(() => {
  return !!user.value?.activeSubscription;
});

const activePlanData = computed(() => {
  if (!user.value?.activeSubscription) return null;
  // If activeSubscription is just an ID, find it in subscriptions
  const planId = typeof user.value.activeSubscription === 'object' 
    ? user.value.activeSubscription._id 
    : user.value.activeSubscription;
    
  // If user object already has the populated plan with sellarCourses
  if (typeof user.value.activeSubscription === 'object' && user.value.activeSubscription.sellarCourses) {
    return user.value.activeSubscription;
  }
  
  // Otherwise try to find it in the fetched subscriptions
  return subscriptions.value.find(p => p._id === planId) || null;
});

onMounted(async () => {
  initAuth();
  if (hasActivePlan.value && subscriptions.value.length === 0) {
    await fetchActive();
  }
});
</script>
