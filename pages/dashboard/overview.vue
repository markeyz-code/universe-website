
<template>
  <div class="space-y-6 pb-10">
    
    <!-- Hero Banner - UniVerse Gradient -->
    <section class="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl overflow-hidden shadow-lg border border-violet-500/30">
      <div class="absolute right-0 top-0 w-1/2 h-full bg-[url('/community_network.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay mask-gradient"></div>
      <!-- Decorative orbs -->
      <div class="absolute -right-16 -top-16 w-48 h-48 bg-fuchsia-400/20 rounded-full blur-3xl"></div>
      <div class="absolute left-1/3 -bottom-10 w-40 h-40 bg-violet-400/20 rounded-full blur-2xl"></div>
      
      <div class="relative z-10 p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="max-w-xl">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-4">
            <Sparkles class="w-3 h-3" /> Welcome to UniVerse
          </div>
          <h1 class="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
            Your academic universe awaits.
          </h1>
          <p class="text-sm text-white/80 mb-6 leading-relaxed">
            Explore resources, connect with mentors, attend campus events, and unlock your full potential — all from your UniVerse command center.
          </p>
          
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/dashboard/vault" class="px-4 py-2 bg-white text-violet-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all duration-300 shadow flex items-center gap-2 group">
              Explore Vault <ArrowRight class="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            <NuxtLink to="/dashboard/mentorship" class="px-4 py-2 bg-transparent text-white rounded-lg text-sm font-bold hover:bg-white/10 transition-all duration-300 border border-white/30 flex items-center gap-2">
              <Users class="w-3 h-3" /> Find a Mentor
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Grid -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-900">Your Activity</h2>
        <span class="text-xs font-medium text-violet-600 hover:underline cursor-pointer">View detailed report</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Stat Card 1 -->
        <div class="bg-white p-5 rounded-xl border border-violet-100 shadow-sm hover:shadow-md hover:border-violet-200 relative overflow-hidden group transition-all">
          <div class="absolute -right-6 -top-6 w-20 h-20 bg-violet-100/50 rounded-full blur-xl group-hover:bg-violet-100 transition-colors"></div>
          <div class="relative z-10 flex justify-between items-start mb-6">
            <div class="w-10 h-10 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center">
              <Folder class="w-5 h-5" />
            </div>
            <span class="px-2 py-0.5 bg-violet-100 text-violet-700 text-[10px] font-bold rounded-full">+12%</span>
          </div>
          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-gray-900 mb-1">
              <span v-if="loading" class="animate-pulse text-transparent bg-violet-100 rounded">00</span>
              <span v-else>{{ stats.documentsUploaded || 0 }}</span>
            </h3>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Documents Uploaded</p>
          </div>
        </div>

        <!-- Stat Card 2 -->
        <div class="bg-white p-5 rounded-xl border border-violet-100 shadow-sm hover:shadow-md hover:border-violet-200 relative overflow-hidden group transition-all">
          <div class="absolute -right-6 -top-6 w-20 h-20 bg-fuchsia-100/50 rounded-full blur-xl group-hover:bg-fuchsia-100 transition-colors"></div>
          <div class="relative z-10 flex justify-between items-start mb-6">
            <div class="w-10 h-10 bg-fuchsia-100 text-fuchsia-600 rounded-lg flex items-center justify-center">
              <Users class="w-5 h-5" />
            </div>
            <span class="px-2 py-0.5 bg-fuchsia-100 text-fuchsia-700 text-[10px] font-bold rounded-full">+3</span>
          </div>
          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-gray-900 mb-1">
              <span v-if="loading" class="animate-pulse text-transparent bg-fuchsia-100 rounded">00</span>
              <span v-else>{{ stats.mentorshipSessions || 0 }}</span>
            </h3>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Mentorship Sessions</p>
          </div>
        </div>

        <!-- Stat Card 3 -->
        <div class="bg-white p-5 rounded-xl border border-violet-100 shadow-sm hover:shadow-md hover:border-violet-200 relative overflow-hidden group transition-all">
          <div class="absolute -right-6 -top-6 w-20 h-20 bg-purple-100/50 rounded-full blur-xl group-hover:bg-purple-100 transition-colors"></div>
          <div class="relative z-10 flex justify-between items-start mb-6">
            <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase class="w-5 h-5" />
            </div>
            <span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">Pending</span>
          </div>
          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-gray-900 mb-1">
              <span v-if="loading" class="animate-pulse text-transparent bg-purple-100 rounded">00</span>
              <span v-else>{{ stats.jobsApplied || 0 }}</span>
            </h3>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Jobs Applied For</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Modules -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
      
      <!-- Video / Presentation Card -->
      <div v-if="featuredResource" class="bg-white border border-violet-100 rounded-2xl p-1.5 shadow-sm relative group overflow-hidden">
        <div class="aspect-video rounded-xl overflow-hidden relative">
           <img src="/community_network.jpg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div class="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-fuchsia-900/40 group-hover:from-violet-900/40 group-hover:to-fuchsia-900/30 transition-colors"></div>
           <div class="absolute inset-0 flex items-center justify-center">
             <button @click="openResourceModal(featuredResource)" :disabled="accessLoading === featuredResource._id" class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-violet-700 transition-all duration-300 hover:scale-110 shadow-lg disabled:opacity-50">
               <div v-if="accessLoading === featuredResource._id" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
               <Play v-else class="w-5 h-5 ml-1" fill="currentColor" />
             </button>
           </div>
           <div class="absolute bottom-4 left-4 right-4">
             <span class="px-2 py-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[9px] font-bold uppercase tracking-wider rounded inline-block mb-1">{{ featuredResource.category || 'Featured' }}</span>
             <h3 class="text-lg font-bold text-white drop-shadow-md line-clamp-1">{{ featuredResource.title }}</h3>
           </div>
        </div>
      </div>
      
      <div v-else-if="resourcesLoading" class="bg-white border border-violet-100 rounded-2xl p-6 shadow-sm flex items-center justify-center aspect-video">
         <div class="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
      </div>

      <!-- Quick Links List -->
      <div class="bg-white rounded-2xl border border-violet-100 p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-bold text-gray-900 mb-1">Workspace Hub</h2>
          <p class="text-xs text-gray-500 mb-5">Quickly jump back into your most important resources and modules.</p>
          
          <div class="space-y-3">
            <NuxtLink to="/dashboard/vault" class="flex items-center justify-between p-3 rounded-xl border border-violet-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all group">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                  <Folder class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-sm font-bold text-gray-900">Access The Vault</h4>
                  <p class="text-[11px] text-gray-500">Secure documents & resources</p>
                </div>
              </div>
              <div class="w-8 h-8 rounded-full bg-white border border-violet-200 flex items-center justify-center group-hover:border-violet-400 group-hover:text-violet-600 transition-colors shadow-sm">
                <ArrowRight class="w-3 h-3" />
              </div>
            </NuxtLink>

            <NuxtLink to="/dashboard/career" class="flex items-center justify-between p-3 rounded-xl border border-violet-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all group">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center">
                  <Briefcase class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-sm font-bold text-gray-900">Career Hub</h4>
                  <p class="text-[11px] text-gray-500">Track job applications</p>
                </div>
              </div>
              <div class="w-8 h-8 rounded-full bg-white border border-violet-200 flex items-center justify-center group-hover:border-violet-400 group-hover:text-violet-600 transition-colors shadow-sm">
                <ArrowRight class="w-3 h-3" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      
    </section>

    <!-- Resource Viewer Modal -->
    <Teleport to="body">
      <div v-if="activeResourceUrl" class="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
        <div class="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" @click="closeResourceModal"></div>
        <div class="bg-white rounded-xl sm:rounded-2xl w-full h-full max-w-6xl max-h-[95vh] relative z-10 shadow-2xl flex flex-col overflow-hidden">
          <div class="px-4 py-3 sm:p-5 border-b border-violet-100 flex items-center justify-between bg-white z-20 shrink-0">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 truncate pr-4">{{ activeResourceTitle }}</h3>
            <div class="flex items-center gap-2">
              <a :href="activeResourceUrl" target="_blank" class="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-all" title="Open in new tab">
                <ExternalLink class="w-5 h-5" />
              </a>
              <button @click="closeResourceModal" class="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Close">
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div class="flex-1 bg-gray-50 w-full h-full overflow-hidden relative">
            <iframe :src="activeResourceUrl" class="w-full h-full border-0 absolute inset-0" allow="fullscreen"></iframe>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { Play, ArrowRight, Folder, Users, Briefcase, Sparkles, ExternalLink, X } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useDashboardStats } from '@/composables/modules/dashboard/useDashboardStats';
import { useGetResources } from '@/composables/modules/vault/useGetResources';
import { useAccessResource } from '@/composables/modules/vault/useAccessResource';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Overview | UniVerse' });
useHead({ title: 'Overview | UniVerse' });

const { loading, stats, fetchStats } = useDashboardStats();
const { loading: resourcesLoading, getResources } = useGetResources();
const { loading: accessLoading, accessResource } = useAccessResource();

const featuredResource = ref<any>(null);
const activeResourceUrl = ref<string | null>(null);
const activeResourceTitle = ref<string>('');

const openResourceModal = async (resource: any) => {
  const url = await accessResource(resource._id);
  if (url) {
    activeResourceUrl.value = url;
    activeResourceTitle.value = resource.title;
    document.body.style.overflow = 'hidden';
  }
};

const closeResourceModal = () => {
  activeResourceUrl.value = null;
  activeResourceTitle.value = '';
  document.body.style.overflow = '';
};

onMounted(async () => {
  fetchStats();
  
  // Fetch latest video or any resource as "featured"
  const resources = await getResources();
  if (resources && resources.length > 0) {
    // Prefer video, otherwise fallback to first resource
    const video = resources.find((r: any) => r.type === 'VIDEO');
    featuredResource.value = video || resources[0];
  }
});
</script>

<style scoped>
.mask-gradient {
  -webkit-mask-image: linear-gradient(to right, transparent, black);
  mask-image: linear-gradient(to right, transparent, black);
}
</style>
