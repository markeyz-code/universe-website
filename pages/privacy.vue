<template>
  <div class="min-h-screen bg-gray-50 py-32 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10 md:p-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div class="prose prose-gray max-w-none text-gray-600">
        <p class="text-lg">Last updated: {{ new Date().toLocaleDateString() }}</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">2. How We Use Your Information</h2>
        <p>We may use the information we collect about you to:</p>
        <ul>
          <li>Provide, maintain, and improve our Services;</li>
          <li>Process transactions and send you related information;</li>
          <li>Send you technical notices, updates, security alerts, and support and administrative messages;</li>
          <li>Respond to your comments, questions, and requests, and provide customer service;</li>
          <li>Communicate with you about products, services, offers, promotions, rewards, and events offered by us and others;</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Security</h2>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Contact Us</h2>
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
