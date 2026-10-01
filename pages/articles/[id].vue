<template>
  <div class="bg-white min-h-screen pt-12 pb-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
      
      <div v-else-if="error" class="text-center py-24">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
        <p class="text-gray-600 mb-8">{{ error }}</p>
        <NuxtLink to="/" class="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors">
          Return Home
        </NuxtLink>
      </div>

      <article v-else-if="article" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <!-- Back Button -->
        <div class="mb-8">
          <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand transition-colors">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Home
          </NuxtLink>
        </div>

        <!-- Article Header -->
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-6 text-sm">
            <span class="bg-brand/10 text-brand font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {{ article.category || 'Insight' }}
            </span>
            <span class="text-gray-500">{{ new Date(article.publishDate || article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
            <span v-if="article.author" class="text-gray-500 hidden sm:inline-block">&bull;</span>
            <span v-if="article.author" class="text-gray-700 font-medium hidden sm:inline-block">By {{ article.author }}</span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            {{ article.title }}
          </h1>
          
          <p class="text-xl text-gray-600 font-light leading-relaxed mb-8">
            {{ article.excerpt }}
          </p>
          
          <div v-if="article.author" class="flex items-center gap-4 sm:hidden mb-8">
            <div class="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold">
              {{ article.author.charAt(0) }}
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ article.author }}</p>
              <p class="text-xs text-gray-500">Author</p>
            </div>
          </div>
        </header>

        <!-- Featured Image -->
        <div v-if="article.coverImage" class="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-lg">
          <img :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover" />
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg prose-brand max-w-none text-gray-700 leading-loose">
          <!-- We use v-html if content contains HTML, otherwise just render it -->
          <div v-html="article.content"></div>
        </div>

        <!-- Tags -->
        <div v-if="article.tags && article.tags.length > 0" class="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
          <span class="text-sm font-medium text-gray-500 mr-2 self-center">Tags:</span>
          <span v-for="tag in article.tags" :key="tag" class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            #{{ tag }}
          </span>
        </div>
      </article>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { useGetArticleById } from '@/composables/modules/articles/useGetArticleById';

const route = useRoute();
const { loading, article, error, fetchArticle } = useGetArticleById();

onMounted(() => {
  const id = route.params.id as string;
  if (id) {
    fetchArticle(id);
  }
});
</script>
