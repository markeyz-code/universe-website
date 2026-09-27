<template>
  <div class="bg-gray-50 py-8 md:py-16 px-3 sm:px-4">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-12">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Privacy Policy</h1>
      <div class="prose prose-gray max-w-none text-gray-600 text-sm sm:text-base">
        <p class="text-lg">Last updated: {{ new Date().toLocaleDateString() }}</p>
        
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mt-8 sm:mt-12 mb-3 sm:mb-4">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.</p>
        
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mt-8 sm:mt-12 mb-3 sm:mb-4">2. How We Use Your Information</h2>
        <p>We may use the information we collect about you to:</p>
        <ul>
          <li>Provide, maintain, and improve our Services;</li>
          <li>Process transactions and send you related information;</li>
          <li>Send you technical notices, updates, security alerts, and support and administrative messages;</li>
          <li>Respond to your comments, questions, and requests, and provide customer service;</li>
          <li>Communicate with you about products, services, offers, promotions, rewards, and events offered by us and others;</li>
        </ul>
        
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mt-8 sm:mt-12 mb-3 sm:mb-4">3. Security</h2>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
        
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mt-8 sm:mt-12 mb-3 sm:mb-4">4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at support@example.com.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';

definePageMeta({ layout: 'default' });
useSeoMeta({ title: 'Privacy Policy | Ecosystem' });
useHead({ title: 'Privacy Policy | Ecosystem' });
</script>
