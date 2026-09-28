<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Career Hub</h1>
      <p class="text-gray-600 mt-1">Explore internship placements and entry-level scientist roles.</p>
    </div>

    <!-- Active Positions -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <h3 class="text-lg font-bold text-gray-900 mb-6">Active positions available now</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="job in jobs" :key="job.title" class="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
          <div class="h-40 bg-gray-200">
            <img :src="job.image" class="w-full h-full object-cover" />
          </div>
          <div class="p-5">
            <h4 class="text-lg font-bold text-gray-900 mb-1">{{ job.title }}</h4>
            <p class="text-xs text-gray-500 mb-3">{{ job.location }}. Deadline {{ job.deadline }}.</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in job.tags" :key="tag" class="px-3 py-1 bg-white border border-gray-200 text-xs text-gray-600 rounded">{{ tag }}</span>
            </div>
            <button class="text-sm text-brand font-medium hover:underline">View role &rarr;</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload CV -->
    <div class="bg-brand rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div class="relative z-10">
        <h3 class="text-xl font-bold mb-2">Ready to apply?</h3>
        <p class="text-white/80 text-sm mb-4">Upload your CV and start applying for positions directly.</p>
        <button class="px-6 py-2.5 bg-white text-brand rounded font-bold hover:bg-gray-100 transition-colors">Upload CV</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Career Hub | Dashboard' });
useHead({ title: 'Career Hub | Dashboard' });

const jobs = [
  { title: 'Research intern at UCH, Ibadan', location: 'Ibadan', deadline: 'March 15, 2024', image: '/documents_verify.jpg', tags: ['Research', 'Internship', 'UCH'] },
  { title: 'Laboratory Intern at Clina lab', location: 'Lagos', deadline: 'April 1, 2024', image: '/vault_microscope.jpg', tags: ['Laboratory', 'Entry level', 'Lagos'] },
  { title: 'Graduate Trainee at 54gene', location: 'Abuja', deadline: 'March 30, 2024', image: '/mentor_group.jpg', tags: ['Diagnostic', 'Internship', 'Abuja'] },
];
</script>
