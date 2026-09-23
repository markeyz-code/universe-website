<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gray-50 pt-32 pb-24 border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <span class="text-sm font-semibold text-brand uppercase tracking-wider mb-4 block">Begin</span>
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">Start your journey</h1>
        <p class="text-xl text-gray-600 mb-10">
          Everything you need to get started as a student in our community.
        </p>
        <div class="flex justify-center gap-4">
          <NuxtLink to="/register" class="bg-brand text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1f4e70] transition-colors">
            Apply Now
          </NuxtLink>
          <NuxtLink to="/pricing" class="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            View plans
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Two simple steps -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2">Setup</span>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Two simple steps</h2>
          <p class="text-gray-600">Get ready in minutes, not hours.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div class="p-8 pb-12 flex-grow">
              <span class="text-xs font-semibold text-gray-400 uppercase mb-2 block">First</span>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Tell us who you are</h3>
              <p class="text-gray-600 mb-6">Create your profile with basic details and your professional goals.</p>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded">Fast</span>
                <span class="px-3 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded">Secure</span>
              </div>
            </div>
            <img src="/community_network.jpg" class="h-48 w-full object-cover" alt="Profile setup" />
          </div>

          <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div class="p-8 pb-12 flex-grow">
              <span class="text-xs font-semibold text-gray-400 uppercase mb-2 block">Second</span>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Verify with your documents</h3>
              <p class="text-gray-600 mb-6">Upload your student ID, letter of intent, or other proof.</p>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-brand/10 text-brand text-xs font-medium rounded">Strictly Verified</span>
              </div>
            </div>
            <img src="/documents_verify.jpg" class="h-48 w-full object-cover" alt="Document verification" />
          </div>
        </div>
      </div>
    </section>

    <!-- Step by Step List -->
    <section class="py-24 bg-gray-50 border-t border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        <div class="flex gap-8 md:gap-16 items-start">
          <div class="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter">01</div>
          <div class="pt-2 md:pt-6">
            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Register</span>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Create your account and profile</h3>
            <p class="text-lg text-gray-600">Sign up with your email and build out your profile. It takes just a few minutes to get the basics down.</p>
            <div class="mt-6 flex gap-3">
              <NuxtLink to="/register" class="px-4 py-2 border border-gray-300 bg-white rounded text-sm font-medium text-gray-700 hover:bg-gray-50">Start</NuxtLink>
            </div>
          </div>
        </div>

        <div class="flex gap-8 md:gap-16 items-start">
          <div class="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter">02</div>
          <div class="pt-2 md:pt-6">
            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Upload</span>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Submit your verification documents</h3>
            <p class="text-lg text-gray-600">Share the files that confirm your status. Our team reviews them quickly to keep things moving.</p>
          </div>
        </div>

        <div class="flex gap-8 md:gap-16 items-start">
          <div class="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter">03</div>
          <div class="pt-2 md:pt-6">
            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Approve</span>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Wait for our review and approval</h3>
            <p class="text-lg text-gray-600">We check your documents and confirm everything. You'll hear back within one business day.</p>
          </div>
        </div>

        <div class="flex gap-8 md:gap-16 items-start">
          <div class="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter">04</div>
          <div class="pt-2 md:pt-6">
            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Access</span>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Unlock the full community experience</h3>
            <p class="text-lg text-gray-600">Once approved, you're in. Access the vault, find mentors, and explore job opportunities right away.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 bg-white border-t border-gray-200">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Questions</h2>
          <p class="text-gray-600">Find answers to common questions about getting started.</p>
        </div>

        <div class="space-y-4">
          <details class="group bg-gray-50 rounded-lg open:bg-white open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              What documents do I need?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              You need a clear photo of your student ID, and/or a scanned copy of your admission letter from the university.
            </div>
          </details>
          <details class="group bg-gray-50 rounded-lg open:bg-white open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              How long does approval take?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              Our admin team verifies all applications within 24-48 hours. Your status will remain pending until then.
            </div>
          </details>
          <details class="group bg-gray-50 rounded-lg open:bg-white open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              Can I update my profile later?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              Yes. Your profile can be updated anytime after approval. Simply login to your dashboard and make changes to your information whenever you need to.
            </div>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';

useSeoMeta({ title: 'Getting Started | UniVerse Ecosystem' });
useHead({ title: 'Getting Started | UniVerse Ecosystem' });
</script>
