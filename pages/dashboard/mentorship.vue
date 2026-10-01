
<template>
  <div class="max-w-6xl mx-auto space-y-4">
    <!-- Hero Banner (Aligned with Platform Aesthetic) -->
    <div class="bg-brand text-white rounded-2xl px-6 py-6 sm:px-8 sm:py-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
      <!-- Decorative background glow orbs -->
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute right-48 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

      <div class="relative z-10 max-w-xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-semibold mb-3">
          <Users class="w-3.5 h-3.5 text-white" />
          <span>Professional Network & Growth</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Mentorship Matcher</h1>
        <p class="text-white/85 text-sm mt-1.5 leading-relaxed">
          Connect with experienced MLS professionals. Choose your area of specialization and get paired with a mentor.
        </p>
      </div>
    </div>

    <!-- Dynamic Mentorship Status Section -->
    <div v-if="statusLoading" class="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex justify-center">
      <Loader2 class="w-6 h-6 animate-spin text-brand" />
    </div>

    <!-- State 3: Matched -->
    <div v-else-if="myStatus === 'matched' && myMentor" class="bg-white rounded-lg shadow-sm border border-brand/20 p-6">
      <div class="flex flex-col sm:flex-row items-center gap-6">
        <div class="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center shrink-0">
          <User class="text-brand w-10 h-10"/>
        </div>
        <div class="text-center sm:text-left flex-1">
          <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold mb-2">
            <Check class="w-3 h-3" />
            Active Mentor
          </div>
          <h2 class="text-xl font-bold text-gray-900">{{ myMentor.firstName }} {{ myMentor.lastName }}</h2>
          <p class="text-brand font-semibold text-sm">{{ myMentor.jobTitle || 'Senior Professional' }}</p>
          <p class="text-gray-500 text-sm mt-2 line-clamp-2 max-w-2xl">{{ myMentor.bio || 'Your matched mentor is ready to help you navigate your professional journey.' }}</p>
        </div>
        <div class="flex flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
          <button class="px-5 py-2.5 bg-brand text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition-all w-full text-center shadow-sm">
            Message Mentor
          </button>
          <button class="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-all w-full text-center">
            Book Session
          </button>
        </div>
      </div>
    </div>

    <!-- State 2: Pending -->
    <div v-else-if="myStatus === 'pending'" class="bg-white rounded-lg shadow-sm border border-orange-200 p-8 text-center bg-orange-50/30">
      <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Loader2 class="w-8 h-8 text-orange-500 animate-spin" />
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">Match in Progress</h3>
      <p class="text-gray-600 text-sm max-w-md mx-auto">
        We are carefully reviewing your profile and finding the absolute best mentor for your goals. We'll notify you as soon as you're paired!
      </p>
    </div>

    <!-- State 1: Request Form (No active/pending request) -->
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div v-if="successMessage" class="p-3 bg-green-50 border border-green-200 text-green-800 rounded-md flex items-center gap-2 mb-4">
        <Check class="text-green-600 w-4 h-4 shrink-0"/>
        <p class="text-xs font-medium">{{ successMessage }}</p>
      </div>

      <form v-else @submit.prevent="submitMentorshipRequest" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
            <input v-model="form.name" required type="text" class="text-xs w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-brand focus:bg-white outline-none transition-all" placeholder="John Doe" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Your Email</label>
            <input v-model="form.email" required type="email" class="text-xs w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-brand focus:bg-white outline-none transition-all" placeholder="john@example.com" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Area of Interest <span class="text-red-500">*</span></label>
            <div class="relative">
              <!-- Overlay to close dropdown -->
              <div v-if="dropdownOpen" @click="dropdownOpen = false" class="fixed inset-0 z-40"></div>
              
              <!-- Dropdown Trigger -->
              <div 
                @click="dropdownOpen = !dropdownOpen" 
                class="relative z-50 text-xs w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus-within:ring-1 focus-within:ring-brand focus-within:bg-white transition-all cursor-pointer flex justify-between items-center"
                :class="{ 'text-gray-900': form.interest, 'text-gray-500': !form.interest }"
              >
                <div class="flex items-center gap-1.5">
                  <component 
                    v-if="form.interest" 
                    :is="specializations.find(s => s.value === form.interest)?.icon" 
                    class="w-3.5 h-3.5 text-brand"
                  />
                  <span class="truncate font-medium">{{ form.interest || 'Select specialization' }}</span>
                </div>
                <svg class="w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform duration-200" :class="{ 'rotate-180': dropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              
              <!-- Dropdown Menu -->
              <div v-if="dropdownOpen" class="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-md shadow-lg py-1 overflow-hidden">
                <div 
                  v-for="spec in specializations" 
                  :key="spec.id" 
                  @click="selectInterest(spec.value)"
                  class="px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition-colors"
                  :class="{ 'bg-brand/5 text-brand font-semibold': form.interest === spec.value }"
                >
                  <component :is="spec.icon" class="w-3.5 h-3.5 text-gray-400" :class="{ 'text-brand': form.interest === spec.value }" />
                  {{ spec.label }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <button type="submit" :disabled="loading" class="w-full sm:w-auto px-5 py-1.5 text-xs bg-brand text-white rounded-md font-medium hover:bg-brand transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            <Loader2 v-if="loading" class="w-3.5 h-3.5 animate-spin" />
            <span>{{ loading ? 'Submitting...' : 'Request Mentor' }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Mentor Directory -->
    <div>
      <div class="mb-2 flex items-center justify-between">
        <h3 class="text-sm font-bold text-gray-900">Featured Mentors</h3>
      </div>
      
      <div v-if="mentorsLoading" class="flex justify-center py-8">
        <Loader2 class="w-6 h-6 animate-spin text-brand" />
      </div>
      
      <div v-else-if="!mentors || mentors.length === 0" class="py-12 text-center border-2 border-dashed border-gray-100 rounded-xl">
        <p class="text-gray-500 text-sm font-medium">No mentors available at the moment.</p>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div v-for="mentor in mentors" :key="mentor.id" class="bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div class="w-10 h-10 bg-gray-100 rounded-full mb-2 flex items-center justify-center">
            <User class="text-gray-400 w-5 h-5"/>
          </div>
          <h4 class="font-bold text-xs text-gray-900">{{ mentor.firstName }} {{ mentor.lastName }}</h4>
          <span class="px-2 py-0.5 mt-1 bg-brand/10 text-brand rounded-full text-[9px] font-semibold mb-1.5">{{ mentor.jobTitle || 'Mentor' }}</span>
          <p class="text-[10px] text-gray-500 line-clamp-2 leading-tight">{{ mentor.bio || 'Experienced professional.' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSeoMeta, useHead } from '#imports';
import { User, Users, Check, Loader2, FlaskConical, Stethoscope, Briefcase, Activity } from 'lucide-vue-next';
import { useRequestMentorship } from '@/composables/modules/mentors/useRequestMentorship';
import { useGetMentors } from '@/composables/modules/mentors/useGetMentors';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Mentorship Matcher | Dashboard' });
useHead({ title: 'Mentorship Matcher | Dashboard' });

const { requestMentorship, loading, statusLoading, myStatus, myMentor, fetchMyStatus } = useRequestMentorship();
const { mentors, loading: mentorsLoading, fetchMentors } = useGetMentors();

onMounted(async () => {
  await fetchMyStatus('universe');
  fetchMentors();
});

const form = ref({
  name: '',
  email: '',
  interest: ''
});

const dropdownOpen = ref(false);

const selectInterest = (value: string) => {
  form.value.interest = value;
  dropdownOpen.value = false;
};

const specializations = [
  { id: 1, label: 'Lab Management', value: 'Lab Management', icon: Briefcase },
  { id: 2, label: 'Clinical Chemistry', value: 'Clinical Chemistry', icon: FlaskConical },
  { id: 3, label: 'Operations', value: 'Operations', icon: Activity },
  { id: 4, label: 'Quality Assurance', value: 'Quality Assurance', icon: Stethoscope },
];

const successMessage = ref('');

const { alert: modalAlert } = useCustomModal();

const submitMentorshipRequest = async () => {
  if (!form.value.interest) {
    await modalAlert({
      title: 'Selection Required',
      message: 'Please select an area of interest before submitting your mentorship request.',
      type: 'warning',
    });
    return;
  }
  
  const payload = {
    name: form.value.name,
    email: form.value.email,
    areaOfInterest: form.value.interest,
    application: 'universe'
  };
  const result = await requestMentorship(payload);
  if (result) {
    successMessage.value = 'Your mentorship request has been received! Our team will match you shortly.';
    form.value.name = '';
    form.value.email = '';
    form.value.interest = '';
  }
};
</script>
