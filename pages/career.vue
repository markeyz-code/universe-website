<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center max-w-3xl mx-auto pt-8">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Start Your Academic Journey</h1>
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Explore study groups, research projects, and student placements at top diagnostic centers and universities across Nigeria.
      </p>
      <div class="flex justify-center gap-4">
        <button class="px-6 py-2.5 bg-brand text-white rounded font-medium hover:bg-[#1f4e70] transition-colors">
          Browse all jobs
        </button>
        <button class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors">
          Upload CV
        </button>
      </div>
    </section>

    <!-- Active positions -->
    <section class="bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2 block">Openings</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Active positions available now</h2>
        <p class="text-gray-600">Browse research projects and study groups across facilities.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
        <!-- Job Card 1 -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div class="h-48 bg-gray-100">
             <img src="/documents_verify.jpg" class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Research Assistant (Student) at UCH, Ibadan</h3>
            <p class="text-xs text-gray-500 mb-4">Ibadan. Deadline March 15, 2024.</p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded">Research</span>
              <span class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded">Study Group</span>
              <span class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded">UCH</span>
            </div>
            <button class="text-sm text-brand font-medium hover:underline">View role &rarr;</button>
          </div>
        </div>

        <!-- Job Card 2 -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div class="h-48 bg-gray-100">
             <img src="/vault_microscope.jpg" class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Student Lab Assistant at Clina lab</h3>
            <p class="text-xs text-gray-500 mb-4">Lagos. Deadline April 1, 2024.</p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded">Laboratory</span>
              <span class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded">Entry level</span>
              <span class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded">Lagos</span>
            </div>
            <button class="text-sm text-brand font-medium hover:underline">View role &rarr;</button>
          </div>
        </div>

        <!-- Job Card 3 -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div class="h-48 bg-gray-100">
             <img src="/mentor_group.jpg" class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Graduate Trainee at 54gene</h3>
            <p class="text-xs text-gray-500 mb-4">Abuja. Deadline March 30, 2024.</p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded">Diagnostic</span>
              <span class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded">Student Placement</span>
              <span class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded">Abuja</span>
            </div>
            <button class="text-sm text-brand font-medium hover:underline">View role &rarr;</button>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <button class="px-6 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">View all</button>
      </div>
    </section>

    <!-- Student feedback -->
    <section class="py-12 bg-white flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto border-t border-b border-gray-100">
      <div class="md:w-1/3">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Student feedback</h2>
        <p class="text-gray-600">What others say about their experience.</p>
      </div>
      <div class="md:w-2/3 bg-gray-50 p-8 rounded-xl border border-gray-200">
         <div class="flex text-yellow-400 mb-4">
           <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
         </div>
         <p class="text-lg text-gray-900 font-medium mb-6">"I found my current study group through this board just two weeks after my exams. The process was seamless."</p>
         <div class="flex items-center gap-3">
           <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">SM</div>
           <div>
             <h4 class="text-sm font-bold text-gray-900">Sarah Mitchell</h4>
             <p class="text-xs text-gray-500">MLS Student, UITH, Ilorin.</p>
           </div>
         </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Questions</h2>
        <p class="text-gray-600">Find answers about applying, requirements, and getting support here.</p>
      </div>

      <div class="space-y-4">
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            How do I apply?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            Submit your resume and cover letter through the platform. Review the role details carefully before applying. Our team will contact you within two weeks.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            What are the requirements?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            Most positions require current enrollment or recent graduation. Check individual listings for specific qualifications. Some roles need relevant lab experience or certifications.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            When are deadlines?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            Each opening shows its deadline clearly. Applications close at midnight on the listed date. Late submissions are not accepted under any circumstances.
          </div>
        </details>
      </div>

      <div class="text-center mt-12">
        <h4 class="font-bold text-gray-900 mb-2">Need more help?</h4>
        <p class="text-sm text-gray-600 mb-4">Reach out to our support team anytime.</p>
        <button class="px-6 py-2 border border-brand text-brand hover:bg-brand/5 rounded font-medium transition-colors">Contact</button>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="rounded-2xl overflow-hidden relative shadow-lg my-12 max-w-6xl mx-auto">
      <div class="absolute inset-0 bg-gray-900/60 z-10 mix-blend-multiply"></div>
      <img src="/community_network.jpg" class="absolute inset-0 w-full h-full object-cover" />
      <div class="relative z-20 py-20 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to accelerate your studies?</h2>
        <p class="text-lg text-gray-200 mb-8 max-w-xl mx-auto">Apply now or explore more opportunities in the community.</p>
        <div class="flex justify-center gap-4">
          <button class="px-8 py-3 bg-white text-gray-900 rounded font-bold hover:bg-gray-100 transition-colors">Apply</button>
          <button class="px-8 py-3 bg-transparent border border-white text-white rounded font-bold hover:bg-white/10 transition-colors">Explore</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { Star } from 'lucide-vue-next';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Academic Hub | UniVerse Ecosystem' });
useHead({ title: 'Academic Hub | UniVerse Ecosystem' });
</script>
