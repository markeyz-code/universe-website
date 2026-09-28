<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border border-gray-200 rounded-lg">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">The Vault</h1>
        <p class="text-sm text-gray-500 mt-1">Access curated clinical resources and study materials.</p>
      </div>
      <div class="flex w-full sm:w-auto items-center gap-3 relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="h-4 w-4 text-gray-400" />
        </div>
        <UiInput
          id="search-vault"
          v-model="searchQuery"
          placeholder="Search resources..."
          class="!pl-10 !w-full sm:!w-64 !bg-gray-50"
        />
      </div>
    </div>

    <!-- Category Filters -->
    <div class="flex flex-wrap gap-2">
      <button 
        v-for="cat in ['All', 'Study Guide', 'Clinical', 'Video', 'Past Questions']" 
        :key="cat"
        @click="activeCategory = cat"
        class="px-4 py-1.5 rounded text-sm font-medium transition-colors border"
        :class="activeCategory === cat ? 'bg-brand text-white border-brand' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading">
      <UiTableSpinner />
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredResources.length === 0">
      <UiEmptyState 
        title="No resources found" 
        description="We couldn't find anything matching your criteria." 
        :icon="SearchXIcon" 
      >
        <template #action>
          <button v-if="searchQuery || activeCategory !== 'All'" @click="searchQuery = ''; activeCategory = 'All'" class="mt-4 text-brand font-medium hover:underline text-sm">
            Clear filters
          </button>
        </template>
      </UiEmptyState>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="resource in filteredResources" 
        :key="resource._id" 
        class="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors flex flex-col group relative overflow-hidden"
      >
        <div class="p-5 flex-1">
          <div class="flex items-start justify-between mb-3">
            <span class="text-[10px] font-bold text-brand tracking-wider uppercase">{{ resource.category }}</span>
            <span class="text-[10px] font-bold text-gray-500 tracking-wider uppercase bg-gray-100 px-2 py-0.5 rounded">{{ resource.type }}</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-snug group-hover:text-brand transition-colors">{{ resource.title }}</h3>
          <p class="text-gray-500 text-sm line-clamp-2" v-if="resource.description">{{ resource.description }}</p>
        </div>
        
        <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <span class="text-xs text-gray-500">Added {{ new Date(resource.createdAt).toLocaleDateString() }}</span>
          <button 
            @click="handleAccess(resource._id)"
            :disabled="accessLoading === resource._id"
            class="text-sm font-medium text-brand hover:text-[#1f4e70] transition-colors disabled:opacity-50"
          >
            <span v-if="accessLoading === resource._id">Loading...</span>
            <span v-else>Access &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';

useSeoMeta({
  title: 'The Vault - UniVerse',
  description: 'Access curated clinical resources and study materials for your MLS studies.',
  ogTitle: 'The Vault - UniVerse',
  ogDescription: 'Access curated clinical resources and study materials for your MLS studies.',
  ogImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
  twitterCard: 'summary_large_image',
})

import { ref, computed, onMounted } from 'vue';
import { Search, SearchX as SearchXIcon } from 'lucide-vue-next';
import { useGetResources } from '@/composables/modules/vault/useGetResources';
import { useAccessResource } from '@/composables/modules/vault/useAccessResource';
import UiInput from '@/components/ui/Input.vue';
import UiTableSpinner from '@/components/ui/TableSpinner.vue';
import UiEmptyState from '@/components/ui/EmptyState.vue';

definePageMeta({ layout: 'dashboard' });

const { loading, resources, getResources } = useGetResources();
const { loading: accessLoading, accessResource } = useAccessResource();

const searchQuery = ref('');
const activeCategory = ref('All');

const filteredResources = computed(() => {
  return resources.value.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          (resource.description && resource.description.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchesCategory = activeCategory.value === 'All' || resource.category === activeCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const handleAccess = async (id: string) => {
  await accessResource(id);
};

onMounted(() => getResources());
</script>
