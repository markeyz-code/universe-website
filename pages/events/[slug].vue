<template>
  <main class="min-h-screen bg-gray-50 flex flex-col pt-24 pb-20">
    <div v-if="loading" class="flex-1 flex justify-center items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f4e70]"></div>
    </div>
    
    <div v-else-if="error || !event" class="flex-1 flex flex-col items-center justify-center text-center px-4">
      <div class="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
      <p class="text-gray-500 mb-8 max-w-md text-lg">The event you are looking for does not exist or has been removed.</p>
      <NuxtLink to="/" class="px-8 py-3.5 bg-[#1f4e70] text-white rounded-xl hover:bg-[#153a56] transition-colors font-medium shadow-lg shadow-[#1f4e70]/20">Return Home</NuxtLink>
    </div>

    <div v-else class="max-w-4xl mx-auto w-full px-4 sm:px-6">
      <!-- Event Header -->
      <div v-if="event.coverImage" class="w-full aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden mb-10 shadow-2xl ring-1 ring-gray-900/5">
        <img :src="event.coverImage" :alt="event.title" class="w-full h-full object-cover" />
      </div>

      <div class="flex flex-col lg:flex-row gap-10">
        <!-- Event Details -->
        <div class="flex-1">
          <span class="inline-block px-4 py-1.5 bg-[#1f4e70]/10 text-[#1f4e70] text-xs font-black rounded-full uppercase tracking-widest mb-4 border border-[#1f4e70]/20">{{ event.type || 'Event' }}</span>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">{{ event.title }}</h1>
          
          <div class="space-y-3 mb-8">
            <div class="flex items-center gap-3 text-gray-600">
              <svg class="w-5 h-5 text-[#1f4e70] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span class="font-medium">{{ new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) }} at {{ new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}</span>
            </div>
            <div v-if="event.location" class="flex items-center gap-3 text-gray-600">
              <svg class="w-5 h-5 text-[#1f4e70] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span class="font-medium">{{ event.location }}</span>
            </div>
            <div v-if="event.speaker" class="flex items-center gap-3 text-gray-600">
              <svg class="w-5 h-5 text-[#1f4e70] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span class="font-medium">{{ event.speaker }}</span>
            </div>
          </div>
          
          <div v-if="event.description" class="prose prose-lg text-gray-700 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <p>{{ event.description }}</p>
          </div>
        </div>

        <!-- Registration Card -->
        <div class="lg:w-[380px] shrink-0">
          <div class="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sticky top-28">
            <h2 class="text-xl font-black text-gray-900 mb-2">Register for this Event</h2>
            <p class="text-sm text-gray-500 mb-6">Secure your spot now. {{ event.capacity ? `Limited to ${event.capacity} attendees.` : 'Open registration.' }}</p>

            <div v-if="registered" class="text-center py-8">
              <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-1">You're Registered! 🎉</h3>
              <p class="text-sm text-gray-500">We've saved your spot. See you there!</p>
            </div>

            <form v-else-if="event.registrationOpen && event.status === 'upcoming'" @submit.prevent="submitRegistration" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input v-model="regForm.fullName" required type="text" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#1f4e70] focus:border-[#1f4e70] text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input v-model="regForm.email" required type="email" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#1f4e70] focus:border-[#1f4e70] text-sm" placeholder="john@university.edu" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input v-model="regForm.phone" type="tel" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#1f4e70] focus:border-[#1f4e70] text-sm" placeholder="+234..." />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">University</label>
                <input v-model="regForm.university" type="text" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#1f4e70] focus:border-[#1f4e70] text-sm" placeholder="University of Lagos" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Programme</label>
                <input v-model="regForm.programme" type="text" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#1f4e70] focus:border-[#1f4e70] text-sm" placeholder="Medical Laboratory Science" />
              </div>
              <p v-if="regError" class="text-sm text-red-600 font-medium">{{ regError }}</p>
              <button type="submit" :disabled="submitting" class="w-full py-3 bg-[#1f4e70] text-white rounded-xl hover:bg-[#153a56] transition-all font-bold text-sm shadow-lg shadow-[#1f4e70]/20 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ submitting ? 'Registering...' : 'Register Now' }}
              </button>
            </form>

            <div v-else class="text-center py-6">
              <p class="text-gray-500 font-medium">Registration is currently closed for this event.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useSeoMeta } from '#imports';
import axios from 'axios';

const route = useRoute();
const slugParam = route.params.slug as string;
const event = ref<any>(null);
const loading = ref(true);
const error = ref(false);
const registered = ref(false);
const submitting = ref(false);
const regError = ref('');

const regForm = ref({
  fullName: '',
  email: '',
  phone: '',
  university: '',
  programme: '',
});

const fetchEvent = async () => {
  try {
    const parts = slugParam.split('-');
    const id = parts[parts.length - 1];
    const response = await axios.get(`http://localhost:4000/api/v1/events/${id}`);
    event.value = response.data;
    
    useSeoMeta({
      title: `${event.value.title} | Universe Events`,
      description: event.value.description || 'Register for this event on Universe',
    });
  } catch (err) {
    console.error('Failed to fetch event', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const submitRegistration = async () => {
  if (!regForm.value.fullName || !regForm.value.email) return;
  submitting.value = true;
  regError.value = '';
  
  try {
    const parts = slugParam.split('-');
    const id = parts[parts.length - 1];
    await axios.post(`http://localhost:4000/api/v1/events/${id}/register`, regForm.value);
    registered.value = true;
  } catch (err: any) {
    regError.value = err.response?.data?.message || 'Registration failed. Please try again.';
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  fetchEvent();
});
</script>
