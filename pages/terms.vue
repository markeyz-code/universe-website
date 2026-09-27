<template>
  <div class="min-h-screen bg-gray-50 py-32 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10 md:p-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div class="prose prose-gray max-w-none text-gray-600">
        <p class="text-lg">Last updated: {{ new Date().toLocaleDateString() }}</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the service.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul>
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>attempt to decompile or reverse engineer any software contained on our website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Disclaimer</h2>
        <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Limitations</h2>
        <p>In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';

definePageMeta({ layout: 'default' });
useSeoMeta({ title: 'Terms of Service | Ecosystem' });
useHead({ title: 'Terms of Service | Ecosystem' });
</script>
