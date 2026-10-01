<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-2xl px-6 py-6 sm:px-8 sm:py-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
      <!-- Decorative background element -->
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="relative z-10 w-full md:w-auto">
        <h1 class="text-2xl sm:text-3xl font-extrabold mb-2 text-white">The Vault</h1>
        <p class="text-white/80 text-sm max-w-lg mt-1 leading-relaxed">Access curated clinical resources and study materials. Search by topic or filter by category below.</p>
      </div>
      <div class="w-full md:w-72 flex-shrink-0 relative z-10">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search class="h-4 w-4 text-gray-400" />
        </div>
        <input
          id="search-vault"
          v-model="searchQuery"
          type="text"
          placeholder="Search resources..."
          class="w-full pl-10 pr-4 py-2.5 bg-white text-gray-900 border-none shadow-xl rounded-xl focus:ring-4 focus:ring-white/20 outline-none text-sm transition-shadow"
        />
      </div>
    </div>

    <!-- Category Filters & View Toggle -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="cat in ['All', 'Study Guide', 'Clinical', 'Video', 'Past Questions']" 
          :key="cat"
          @click="activeCategory = cat"
          class="px-4 py-2 sm:px-5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-300 border"
          :class="activeCategory === cat ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700'"
        >
          {{ cat }}
        </button>
      </div>
      
      <div class="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm shrink-0">
        <button @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'bg-gray-100 text-brand shadow-sm' : 'text-gray-400 hover:text-gray-600'" class="p-1.5 rounded-md transition-colors cursor-pointer" title="Grid View">
          <LayoutGrid class="w-4 h-4" />
        </button>
        <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-gray-100 text-brand shadow-sm' : 'text-gray-400 hover:text-gray-600'" class="p-1.5 rounded-md transition-colors cursor-pointer" title="List View">
          <List class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="py-20 flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredResources.length === 0" class="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
      <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <SearchXIcon class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">No resources found</h3>
      <p class="text-gray-500 mb-6 max-w-sm mx-auto">We couldn't find any materials matching your criteria. Try adjusting your filters or search term.</p>
      <button v-if="searchQuery || activeCategory !== 'All'" @click="searchQuery = ''; activeCategory = 'All'" class="px-6 py-2.5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand/90 transition-all shadow-md shadow-brand/20">
        Clear filters
      </button>
    </div>

    <!-- Grid / List -->
    <div v-else :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'flex flex-col gap-3'">
      <div 
        v-for="resource in filteredResources" 
        :key="resource._id" 
        class="bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-brand/5 transition-all group flex h-full relative overflow-hidden"
        :class="viewMode === 'grid' ? 'p-6 flex-col' : 'p-4 items-center justify-between gap-4'"
      >
        <!-- Accent lines -->
        <div v-if="viewMode === 'grid'" class="absolute top-0 left-0 w-full h-1.5 bg-brand transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        <div v-if="viewMode === 'list'" class="absolute top-0 left-0 h-full w-1.5 bg-brand transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>

        <template v-if="viewMode === 'grid'">
          <div class="flex-1">
            <div class="flex items-start justify-between mb-4">
              <span class="inline-flex items-center bg-brand/10 text-brand text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg uppercase tracking-wider">
                {{ resource.category }}
              </span>
              <span class="text-[10px] font-extrabold text-gray-500 tracking-wider uppercase bg-gray-100 px-2.5 py-1.5 rounded-lg">{{ resource.type }}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-brand transition-colors">{{ resource.title }}</h3>
            <p class="text-gray-500 text-sm line-clamp-2" v-if="resource.description">{{ resource.description }}</p>
          </div>
          
          <div class="pt-5 mt-5 border-t border-gray-100 flex justify-between items-center">
            <span class="text-[11px] font-medium text-gray-400">Added {{ new Date(resource.createdAt).toLocaleDateString('en-GB') }}</span>
            <button 
              @click="openResourceModal(resource)"
              :disabled="accessLoading === resource._id"
              class="text-xs font-bold text-brand hover:text-brand/80 transition-colors disabled:opacity-50 flex items-center gap-1.5 bg-brand/5 px-3 py-1.5 rounded-lg group-hover:bg-brand group-hover:text-white cursor-pointer"
            >
              <span v-if="accessLoading === resource._id" class="flex items-center gap-1.5">
                 <div class="w-3 h-3 border-2 border-brand border-t-transparent rounded-full animate-spin group-hover:border-white group-hover:border-t-transparent"></div> Loading
              </span>
              <span v-else class="flex items-center gap-1.5">
                 Access <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </template>
        
        <template v-else>
          <div class="flex items-center gap-4 flex-1 overflow-hidden">
            <div class="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center shrink-0">
               <component :is="resource.type === 'PDF' ? FileText : resource.type === 'IMAGE' ? ImageIcon : Play" class="w-5 h-5 text-brand" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="text-base font-bold text-gray-900 truncate group-hover:text-brand transition-colors">{{ resource.title }}</h3>
                <span class="inline-flex items-center bg-gray-100 text-gray-500 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shrink-0">{{ resource.type }}</span>
              </div>
              <p class="text-gray-500 text-xs truncate">{{ resource.description }}</p>
            </div>
            <div class="hidden md:flex items-center gap-4 shrink-0 px-4 border-l border-gray-100">
               <span class="inline-flex items-center bg-brand/10 text-brand text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                 {{ resource.category }}
               </span>
               <span class="text-[11px] font-medium text-gray-400 w-24">Added {{ new Date(resource.createdAt).toLocaleDateString('en-GB') }}</span>
            </div>
          </div>
          <div class="shrink-0 pl-2">
            <button 
              @click="openResourceModal(resource)"
              :disabled="accessLoading === resource._id"
              class="text-xs font-bold text-brand hover:text-brand/80 transition-colors disabled:opacity-50 flex items-center gap-1.5 bg-brand/5 px-4 py-2 rounded-lg group-hover:bg-brand group-hover:text-white cursor-pointer"
            >
              <span v-if="accessLoading === resource._id" class="flex items-center gap-1.5">
                 <div class="w-3 h-3 border-2 border-brand border-t-transparent rounded-full animate-spin group-hover:border-white group-hover:border-t-transparent"></div>
              </span>
              <span v-else class="flex items-center gap-1.5">
                 Access <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </template>
      </div>
    </div>

    <!-- Resource Viewer Modal -->
    <Teleport to="body">
      <div v-if="activeResourceUrl" class="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
        <div class="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" @click="closeResourceModal"></div>
        <div class="bg-white rounded-xl sm:rounded-2xl w-full h-full max-w-6xl max-h-[95vh] relative z-10 shadow-2xl flex flex-col overflow-hidden">
          <div class="px-4 py-3 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white z-20 shrink-0">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 truncate pr-4">{{ activeResourceTitle }}</h3>
            <div class="flex items-center gap-2">
              <a :href="activeResourceUrl" target="_blank" class="p-2 text-gray-500 hover:text-brand hover:bg-brand/5 rounded-full transition-all" title="Open in new tab">
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
import { useSeoMeta } from '#imports';
import { ref, computed, onMounted } from 'vue';
import { Search, SearchX as SearchXIcon, ArrowRight, LayoutGrid, List, FileText, Image as ImageIcon, Play, ExternalLink, X } from 'lucide-vue-next';
import { useGetResources } from '@/composables/modules/vault/useGetResources';
import { useAccessResource } from '@/composables/modules/vault/useAccessResource';

useSeoMeta({
  title: 'The Vault - UniVerse',
  description: 'Access curated clinical resources and study materials.',
  ogTitle: 'The Vault - UniVerse',
  ogDescription: 'Access curated clinical resources and study materials.',
  ogImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
  twitterCard: 'summary_large_image',
});

definePageMeta({ layout: 'dashboard' });

const { loading, resources, getResources } = useGetResources();
const { loading: accessLoading, accessResource } = useAccessResource();

const searchQuery = ref('');
const activeCategory = ref('All');
const viewMode = ref<'grid' | 'list'>('list');

const activeResourceUrl = ref<string | null>(null);
const activeResourceTitle = ref<string>('');

const filteredResources = computed(() => {
  return resources.value.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          (resource.description && resource.description.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchesCategory = activeCategory.value === 'All' || resource.category === activeCategory.value;
    return matchesSearch && matchesCategory;
  });
});

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

onMounted(() => getResources());
</script>
