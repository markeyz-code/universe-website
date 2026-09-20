<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-24">
    <div class="max-w-2xl w-full px-4 text-center">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-4 block">Pending</span>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Documents under review</h1>
      <p class="text-lg text-gray-600 mb-10">
        The Admin team is carefully examining your submitted documents right now.
      </p>
      
      <div class="flex justify-center gap-4 mb-16">
        <NuxtLink to="/" class="bg-brand text-white px-6 py-2.5 rounded font-medium hover:bg-[#1f4e70] transition-colors">
          Go to Home
        </NuxtLink>
        <button @click="contactSupport" class="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded font-medium hover:bg-gray-50 transition-colors">
          Support
        </button>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-12 flex flex-col sm:flex-row items-center justify-between text-left shadow-sm">
        <div class="mb-6 sm:mb-0">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Documents Received.</h2>
          <p class="text-gray-600">We will notify you once verified.</p>
          <p class="text-sm text-gray-400 mt-4">A confirmation has been sent to your email.</p>
        </div>
        <div class="bg-gray-100 p-6 rounded-2xl">
          <FileCheck class="w-16 h-16 text-gray-400" stroke-width="1.5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { FileCheck } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

useSeoMeta({ title: 'Verification Status | InternTional Ecosystem' });
useHead({ title: 'Verification Status | InternTional Ecosystem' });

const router = useRouter();

const contactSupport = () => {
  router.push('/#support');
};
</script>
