<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from '#imports';

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | UniVerse Ecosystem` : 'UniVerse Ecosystem';
  }
});

useSeoMeta({
  description: 'The premier ecosystem and community for University Students.',
  ogTitle: 'UniVerse Ecosystem',
  ogDescription: 'The premier ecosystem and community for University Students.',
  ogImage: '/images/universe-og.jpg',
  twitterCard: 'summary_large_image',
});
</script>
