<template>
  <main class="min-h-screen bg-gray-50 flex flex-col pt-24 pb-20">
    <div v-if="loading" class="flex-1 flex justify-center items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f4e70]"></div>
    </div>
    
    <div v-else-if="error || !article" class="flex-1 flex flex-col items-center justify-center text-center px-4">
      <div class="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
      <p class="text-gray-500 mb-8 max-w-md text-lg">The article you are looking for does not exist, has been removed, or is currently drafted.</p>
      <NuxtLink to="/" class="px-8 py-3.5 bg-[#1f4e70] text-white rounded-xl hover:bg-[#153a56] transition-colors font-medium shadow-lg shadow-[#1f4e70]/20">Return Home</NuxtLink>
    </div>

    <article v-else class="max-w-4xl mx-auto w-full px-4 sm:px-6">
      <!-- Article Header -->
      <header class="mb-10 text-center max-w-3xl mx-auto">
        <span class="inline-block px-4 py-1.5 bg-[#1f4e70]/10 text-[#1f4e70] text-xs font-black rounded-full uppercase tracking-widest mb-6 border border-[#1f4e70]/20">{{ article.category }}</span>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">{{ article.title }}</h1>
        <div class="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-[#1f4e70] text-white flex items-center justify-center font-bold text-xs">E</div>
            <span class="text-gray-900 font-bold">Editor</span>
          </div>
          <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span>{{ article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently published' }}</span>
        </div>
      </header>
      
      <!-- Cover Image -->
      <div v-if="article.coverImage" class="w-full aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl ring-1 ring-gray-900/5">
        <img :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg sm:prose-xl max-w-none text-gray-800 bg-white p-8 sm:p-12 md:p-16 rounded-[2.5rem] shadow-sm border border-gray-100 prose-headings:font-black prose-headings:text-gray-900 prose-a:text-[#1f4e70] prose-a:font-bold hover:prose-a:text-[#153a56] prose-img:rounded-2xl" v-html="article.content"></div>
      
      <!-- Footer Share -->
      <div class="mt-12 text-center pb-12 border-b border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Share this article</h3>
        <div class="flex items-center justify-center gap-3">
          <button @click="copyLink" class="px-6 py-3 bg-white border border-gray-200 hover:border-[#1f4e70] hover:text-[#1f4e70] text-gray-700 rounded-xl transition-all shadow-sm font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            {{ copied ? 'Copied!' : 'Copy Link' }}
          </button>
        </div>
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useSeoMeta } from '#imports';
import axios from 'axios';

const route = useRoute();
const slugParam = route.params.slug as string;
const article = ref<any>(null);
const loading = ref(true);
const error = ref(false);
const copied = ref(false);

const fetchArticle = async () => {
  try {
    const parts = slugParam.split('-');
    const id = parts[parts.length - 1];
    
    // We fetch directly from backend API for articles
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/articles/${id}`);
    
    // If it's a draft, don't show it on public site
    if (response.data.status !== 'published') {
      throw new Error('Article not found or not published');
    }
    
    article.value = response.data;
    
    useSeoMeta({
      title: `${article.value.title} | Universe`,
      description: article.value.excerpt || 'Read the latest article on Universe',
    });
  } catch (err) {
    console.error('Failed to fetch article', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  copied.value = true;
  setTimeout(() => { copied.value = false }, 2000);
};

onMounted(() => {
  fetchArticle();
});
</script>
