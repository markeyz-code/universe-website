<template>
  <div class="space-y-12">
    <!-- Hero / Welcome -->
    <section class="text-center max-w-2xl mx-auto">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Welcome</span>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">You're in</h1>
      <p class="text-lg text-gray-600">
        Your account is activated and verified. Everything is ready to go.
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <NuxtLink to="/vault" class="px-6 py-2.5 bg-brand text-white rounded font-medium hover:bg-[#1f4e70] transition-colors">
          Explore
        </NuxtLink>
        <NuxtLink to="/mentorship" class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors">
          Learn
        </NuxtLink>
      </div>
    </section>

    <!-- Activity at a glance -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div class="text-center mb-10">
        <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2 block">Progress</span>
        <h2 class="text-2xl font-bold text-gray-900">Your activity at a glance</h2>
        <p class="text-gray-600 mt-2">Track what you've accomplished and what comes next.</p>
      </div>

      <div class="flex flex-col md:flex-row items-center gap-12">
        <div class="md:w-1/3 space-y-8 pl-8">
          <div>
            <div class="text-5xl font-black text-gray-900 mb-1">
              <span v-if="loading" class="animate-pulse bg-gray-200 text-transparent rounded">--</span>
              <span v-else>{{ stats.documentsUploaded }}</span>
            </div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Documents uploaded</div>
          </div>
          <div>
            <div class="text-5xl font-black text-gray-900 mb-1">
              <span v-if="loading" class="animate-pulse bg-gray-200 text-transparent rounded">--</span>
              <span v-else>{{ stats.mentorshipSessions }}</span>
            </div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Mentorship sessions</div>
          </div>
          <div>
            <div class="text-5xl font-black text-gray-900 mb-1">
              <span v-if="loading" class="animate-pulse bg-gray-200 text-transparent rounded">--</span>
              <span v-else>{{ stats.jobsApplied }}</span>
            </div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Jobs applied for</div>
          </div>
        </div>
        <div class="md:w-2/3 w-full relative">
          <!-- Video Placeholder -->
          <div class="aspect-video bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center group cursor-pointer shadow-md">
            <img src="/community_network.jpg" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" />
            <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform z-10">
              <Play class="w-6 h-6 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Everything you need is here -->
    <section class="py-12">
      <div class="mb-12 border-l-4 border-brand pl-6">
        <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-1 block">Navigation</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-3">Everything you need is here</h2>
        <p class="text-lg text-gray-600 max-w-2xl mb-6">
          Access core resources, connect with mentors, explore opportunities, and stay informed. The tools that matter are organized and ready.
        </p>
        <div class="flex gap-4">
           <NuxtLink to="/vault" class="px-5 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">Browse</NuxtLink>
           <NuxtLink to="/community" class="px-5 py-2 text-brand text-sm font-medium hover:text-[#1f4e70] flex items-center gap-1">Steps <ArrowRight class="w-4 h-4"/></NuxtLink>
        </div>
      </div>

      <div class="space-y-8">
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center group">
          <div class="md:w-1/3 h-48 md:h-full bg-gray-100">
             <img src="/vault_microscope.jpg" class="w-full h-full object-cover" />
          </div>
          <div class="p-8 md:w-2/3">
            <h3 class="text-xl font-bold text-gray-900 mb-3">The vault</h3>
            <p class="text-gray-600 mb-4">Core and targeted advice documents in one secure place. Keep lectures, protocols, and verification documents whenever you need them.</p>
            <NuxtLink to="/vault" class="text-brand font-medium text-sm group-hover:underline">Open Vault &rarr;</NuxtLink>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row-reverse items-center group">
          <div class="md:w-1/3 h-48 md:h-full bg-gray-100">
             <img src="/mentor_group.jpg" class="w-full h-full object-cover" />
          </div>
          <div class="p-8 md:w-2/3">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Mentorship match</h3>
            <p class="text-gray-600 mb-4">Get paired with experienced professionals who understand your path. Learn from those who have walked it before and build relationships that matter.</p>
            <NuxtLink to="/mentorship" class="text-brand font-medium text-sm group-hover:underline">Find Mentor &rarr;</NuxtLink>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center group">
          <div class="md:w-1/3 h-48 md:h-full bg-gray-100">
             <img src="/documents_verify.jpg" class="w-full h-full object-cover" />
          </div>
          <div class="p-8 md:w-2/3">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Academic hub</h3>
            <p class="text-gray-600 mb-4">Analyze listings and discover opportunities tailored to your steps. Start finding and track your progress through each application.</p>
            <NuxtLink to="/career" class="text-brand font-medium text-sm group-hover:underline">View Jobs &rarr;</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Connect with peers CTA -->
    <section class="rounded-2xl overflow-hidden relative shadow-lg my-16">
      <div class="absolute inset-0 bg-gray-900/60 z-10 mix-blend-multiply"></div>
      <img src="/community_network.jpg" class="absolute inset-0 w-full h-full object-cover" />
      <div class="relative z-20 p-16 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Connect with peers</h2>
        <p class="text-lg text-gray-200 mb-8 max-w-xl mx-auto">Join our community group to share experiences and grow together.</p>
        <div class="flex justify-center gap-4">
          <NuxtLink to="/community" class="px-8 py-3 bg-white text-gray-900 rounded font-bold hover:bg-gray-100 transition-colors">Join</NuxtLink>
          <NuxtLink to="/events" class="px-8 py-3 bg-transparent border border-white text-white rounded font-bold hover:bg-white/10 transition-colors">Learn</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { Play, ArrowRight } from 'lucide-vue-next';
import { onMounted } from 'vue';
import { useDashboardStats } from '@/composables/modules/dashboard/useDashboardStats';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Overview | UniVerse Ecosystem' });
useHead({ title: 'Overview | UniVerse Ecosystem' });

const { loading, stats, fetchStats } = useDashboardStats();

onMounted(() => {
  fetchStats();
});
</script>
