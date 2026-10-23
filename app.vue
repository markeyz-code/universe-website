<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ToastContainer />
    <CustomModalContainer />
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
  description: 'The premier ecosystem and community for Medical Laboratory Science Students.',
  ogTitle: 'UniVerse Ecosystem - Medical Laboratory Science Community',
  ogDescription: 'The premier ecosystem and community for Medical Laboratory Science Students.',
  ogImage: '/images/universe-og.jpg',
  twitterCard: 'summary_large_image',
});
</script>
