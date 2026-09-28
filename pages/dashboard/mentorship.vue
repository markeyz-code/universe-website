<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Mentorship Matcher</h1>
      <p class="text-gray-600 mt-1">Connect with experienced MLS professionals who understand your path forward.</p>
    </div>

    <!-- Request Form -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-xl">
      <div v-if="successMessage" class="p-4 bg-green-50 text-green-700 rounded-lg">
        {{ successMessage }}
      </div>

      <form v-else @submit.prevent="submitMentorshipRequest" class="space-y-5">
        <h3 class="text-lg font-bold text-gray-900">Request a Mentor</h3>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input v-model="form.name" required type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="John Doe" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
          <input v-model="form.email" required type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="john@example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Area of Interest</label>
          <select v-model="form.interest" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none">
            <option value="" disabled>Select specialization</option>
            <option value="Lab Management">Lab Management</option>
            <option value="Clinical Chemistry">Clinical Chemistry</option>
            <option value="Operations">Operations</option>
            <option value="Quality Assurance">Quality Assurance</option>
          </select>
        </div>
        <button type="submit" :disabled="loading" class="w-full px-6 py-2.5 bg-brand text-white rounded font-medium hover:bg-[#1f4e70] transition-colors disabled:opacity-50">
          {{ loading ? 'Submitting...' : 'Request a Mentor' }}
        </button>
      </form>
    </div>

    <!-- Mentor Directory -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <h3 class="text-lg font-bold text-gray-900 mb-2">Find mentors by specialization</h3>
      <p class="text-gray-600 text-sm mb-6">Search experienced professionals by their specialization and years in the field.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="mentor in mentors" :key="mentor.name" class="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col items-center text-center">
          <div class="w-16 h-16 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
            <User class="text-gray-400 w-7 h-7"/>
          </div>
          <h4 class="font-bold text-gray-900 text-sm">{{ mentor.name }}</h4>
          <p class="text-xs text-brand font-medium mb-2">{{ mentor.role }}</p>
          <p class="text-xs text-gray-500">{{ mentor.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSeoMeta, useHead } from '#imports';
import { User } from 'lucide-vue-next';
import { useCreateEnquiry } from '@/composables/modules/enquiries/useCreateEnquiry';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Mentorship Matcher | Dashboard' });
useHead({ title: 'Mentorship Matcher | Dashboard' });

const { createEnquiry, loading } = useCreateEnquiry();

const form = ref({
  name: '',
  email: '',
  interest: ''
});

const successMessage = ref('');

const mentors = [
  { name: 'Robert DeBate', role: 'Lab Director', description: 'Twenty years managing teams and building quality systems in clinical labs.' },
  { name: 'Patricia Hayes', role: 'Chemistry Specialist', description: '15 years in analytical workflows with a track record of mentoring emerging talent.' },
  { name: 'Michael Barnes', role: 'Operations Manager', description: 'Knows the business side and how to navigate academic growth strategically.' },
  { name: 'Jennifer Blake', role: 'Quality Assurance', description: 'Dedicated to compliance and excellence with a passion for developing others.' },
];

const submitMentorshipRequest = async () => {
  const payload = {
    name: form.value.name,
    email: form.value.email,
    message: `Mentorship Request for Specialization: ${form.value.interest}`
  };
  await createEnquiry(payload);
  successMessage.value = 'Your mentorship request has been received! Our team will match you shortly.';
};
</script>
