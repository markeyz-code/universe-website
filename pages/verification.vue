<template>
  <div class="min-h-screen bg-[#F6F8FB] flex flex-col justify-center items-center py-24">
    <div class="max-w-2xl w-full px-4 text-center">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-4 block">Pending</span>
      <h1 class="text-4xl md:text-5xl font-bold text-navy-950 mb-6">Documents under review</h1>
      <p class="text-lg text-navy-500 mb-10">
        The Admin team is carefully examining your submitted documents right now.
      </p>
      
      <div class="flex justify-center gap-4 mb-16">
        <NuxtLink to="/" class="bg-brand text-white px-6 py-2.5 rounded font-medium hover:bg-brand-700 transition-colors">
          Go to Home
        </NuxtLink>
        <button @click="contactSupport" class="bg-white border border-navy-200 text-navy-700 px-6 py-2.5 rounded font-medium hover:bg-[#F6F8FB] transition-colors">
          Support
        </button>
      </div>

      <div class="bg-white border border-navy-100 rounded-2xl p-12 flex flex-col sm:flex-row items-center justify-between text-left shadow-sm">
        <div class="mb-6 sm:mb-0">
          <h2 class="text-2xl font-bold text-navy-950 mb-2">Documents Received.</h2>
          <p class="text-navy-500">We will notify you once verified.</p>
          <p class="text-sm text-navy-300 mt-4">A confirmation has been sent to your email.</p>
        </div>
        <div class="bg-navy-50 p-6 rounded-2xl">
          <FileCheck class="w-16 h-16 text-navy-300" stroke-width="1.5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { FileCheck } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

useSeoMeta({ title: 'Verification Status | UniVerse Ecosystem' });
useHead({ title: 'Verification Status | UniVerse Ecosystem' });

const router = useRouter();

const contactSupport = () => {
  router.push('/#support');
};
</script>
