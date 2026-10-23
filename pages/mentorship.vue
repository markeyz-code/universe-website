<template>
  <NuxtLayout :name="isAuthenticated ? 'dashboard' : 'default'">

  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center max-w-3xl mx-auto pt-8">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Personalized Academic Mentorship</span>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Connect with Senior MLS Preceptors</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Bridge the gap between academic theory and clinical mastery. Receive 1-on-1 guidance from licensed medical laboratory scientists, post-graduate researchers, and experienced preceptors.
      </p>

      <!-- Step-by-Step Participation Guide -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 text-left">
        <div class="bg-violet-50/60 border border-violet-100 rounded-xl p-5">
          <span class="w-7 h-7 rounded-full bg-brand text-white font-bold text-xs flex items-center justify-center mb-3">1</span>
          <h4 class="font-bold text-gray-900 text-sm mb-1">Select Your Specialty</h4>
          <p class="text-xs text-gray-600">Choose between Clinical Chemistry, Microbiology, Hematology, Histopathology, or Lab Management.</p>
        </div>
        <div class="bg-violet-50/60 border border-violet-100 rounded-xl p-5">
          <span class="w-7 h-7 rounded-full bg-brand text-white font-bold text-xs flex items-center justify-center mb-3">2</span>
          <h4 class="font-bold text-gray-900 text-sm mb-1">Matched with a Preceptor</h4>
          <p class="text-xs text-gray-600">Our academic team matches you with a verified scientist tailored to your learning goals within 48 hours.</p>
        </div>
        <div class="bg-violet-50/60 border border-violet-100 rounded-xl p-5">
          <span class="w-7 h-7 rounded-full bg-brand text-white font-bold text-xs flex items-center justify-center mb-3">3</span>
          <h4 class="font-bold text-gray-900 text-sm mb-1">1-on-1 Advisory Sessions</h4>
          <p class="text-xs text-gray-600">Engage in virtual case discussions, mock oral exams (Vivas), and rotation guidance.</p>
        </div>
      </div>
      
      <div id="request-form">
        <div v-if="successMessage" class="mt-8 p-6 bg-green-50 border border-green-200 text-green-800 rounded-xl max-w-md mx-auto text-center space-y-2">
          <CheckCircle class="w-8 h-8 text-green-600 mx-auto" />
          <h4 class="font-bold text-base">Request Submitted!</h4>
          <p class="text-xs leading-relaxed">{{ successMessage }}</p>
          <button @click="successMessage = ''" class="text-xs text-brand underline font-medium mt-2">Submit another request</button>
        </div>

        <form v-else @submit.prevent="submitMentorshipRequest" class="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md mx-auto text-left">
          <h3 class="font-bold text-gray-900 text-lg mb-1">Request a Mentor Match</h3>
          <p class="text-xs text-gray-500 mb-6">Tell us your area of interest and our preceptor desk will connect you.</p>

          <div class="mb-4">
            <label class="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
            <input v-model="form.name" required type="text" class="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-brand outline-none" placeholder="e.g. John Doe" />
          </div>
          <div class="mb-4">
            <label class="block text-xs font-semibold text-gray-700 mb-1">Your Email Address *</label>
            <input v-model="form.email" required type="email" class="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-brand outline-none" placeholder="john@example.com" />
          </div>
          <div class="mb-6">
            <label class="block text-xs font-semibold text-gray-700 mb-1">Area of Specialization *</label>
            <UiSelect
              id="interest"
              v-model="form.interest"
              :required="true"
              placeholder="Select specialization track"
              :options="[
                { label: 'Clinical Chemistry & Chemical Pathology', value: 'Clinical Chemistry' },
                { label: 'Medical Microbiology & Parasitology', value: 'Medical Microbiology' },
                { label: 'Hematology & Blood Transfusion', value: 'Hematology' },
                { label: 'Histopathology & Cytopathology', value: 'Histopathology' },
                { label: 'Quality Assurance & Lab Management', value: 'Quality Assurance' }
              ]"
            />
          </div>
          <button type="submit" :disabled="loading" class="w-full py-3 bg-brand text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50">
            {{ loading ? 'Submitting Request...' : 'Match Me with a Mentor' }}
          </button>
        </form>
      </div>
    </section>

    <!-- Directory Filter -->
    <section class="flex flex-col md:flex-row gap-12 items-center bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8 py-16">
      <div class="md:w-1/2">
        <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2 block">Preceptor Directory</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Learn from Experienced Practitioners</h2>
        <p class="text-gray-600 mb-8 leading-relaxed">
          Our mentors represent accredited teaching hospitals, diagnostic chains, and research institutes across Nigeria and the diaspora. Get answers to difficult rotation protocols, exam preparation strategies, and licensing vivas.
        </p>
        <ul class="space-y-3 mb-8 text-sm text-gray-700">
          <li class="flex items-center gap-2"><CheckCircle class="w-4 h-4 text-brand" /> 1-on-1 personalized advisory check-ins</li>
          <li class="flex items-center gap-2"><CheckCircle class="w-4 h-4 text-brand" /> Practical bench troubleshooting & logbook review</li>
          <li class="flex items-center gap-2"><CheckCircle class="w-4 h-4 text-brand" /> Guidance on council licensing exams & career placement</li>
        </ul>
        <div class="flex gap-4">
           <a href="#mentors-showcase" class="px-5 py-2.5 bg-brand text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">View Preceptors</a>
           <a href="#request-form" class="px-5 py-2.5 border border-gray-300 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Request Session</a>
        </div>
      </div>
      <div class="md:w-1/2">
        <img src="/mentor_group.jpg" alt="Mentors" class="rounded-xl shadow-lg w-full object-cover" />
      </div>
    </section>

    <!-- Mentors Showcase -->
    <section id="mentors-showcase" class="py-16 bg-white text-center">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Featured Preceptors</span>
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Senior MLS Mentors Ready to Guide You</h2>
      <p class="text-gray-600 mb-16 max-w-2xl mx-auto">
        Select a mentor or specialization track below to get started.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <!-- Mentor 1 -->
        <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
          <div class="w-20 h-20 rounded-full bg-brand/10 text-brand font-bold text-xl mb-4 flex items-center justify-center border-2 border-brand/20">
            RD
          </div>
          <h4 class="font-bold text-gray-900 text-base">Dr. Robert DeBate</h4>
          <p class="text-xs text-brand font-semibold mb-2">Laboratory Director & Preceptor</p>
          <p class="text-xs text-gray-500 text-center mb-4 leading-relaxed">20+ years leading clinical laboratories and advising medical laboratory science interns on career growth.</p>
          <button @click="selectMentor('Quality Assurance')" class="mt-auto px-4 py-1.5 bg-white border border-brand text-brand hover:bg-brand hover:text-white rounded-lg text-xs font-semibold transition-colors">
            Select Track &rarr;
          </button>
        </div>

        <!-- Mentor 2 -->
        <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
          <div class="w-20 h-20 rounded-full bg-brand/10 text-brand font-bold text-xl mb-4 flex items-center justify-center border-2 border-brand/20">
            PH
          </div>
          <h4 class="font-bold text-gray-900 text-base">Patricia Hayes, MSc, AMLSCN</h4>
          <p class="text-xs text-brand font-semibold mb-2">Clinical Chemistry Specialist</p>
          <p class="text-xs text-gray-500 text-center mb-4 leading-relaxed">Specialized in automated analytical workflows, QC troubleshooting, and exam revision for clinical biochemistry.</p>
          <button @click="selectMentor('Clinical Chemistry')" class="mt-auto px-4 py-1.5 bg-white border border-brand text-brand hover:bg-brand hover:text-white rounded-lg text-xs font-semibold transition-colors">
            Select Track &rarr;
          </button>
        </div>

        <!-- Mentor 3 -->
        <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
          <div class="w-20 h-20 rounded-full bg-brand/10 text-brand font-bold text-xl mb-4 flex items-center justify-center border-2 border-brand/20">
            MB
          </div>
          <h4 class="font-bold text-gray-900 text-base">Michael Barnes, BMLS, FMLSCN</h4>
          <p class="text-xs text-brand font-semibold mb-2">Hematology & Transfusion Lead</p>
          <p class="text-xs text-gray-500 text-center mb-4 leading-relaxed">Extensive clinical bench leadership guiding students through blood bank procedures and diagnostic morphology.</p>
          <button @click="selectMentor('Hematology')" class="mt-auto px-4 py-1.5 bg-white border border-brand text-brand hover:bg-brand hover:text-white rounded-lg text-xs font-semibold transition-colors">
            Select Track &rarr;
          </button>
        </div>

        <!-- Mentor 4 -->
        <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
          <div class="w-20 h-20 rounded-full bg-brand/10 text-brand font-bold text-xl mb-4 flex items-center justify-center border-2 border-brand/20">
            JB
          </div>
          <h4 class="font-bold text-gray-900 text-base">Jennifer Blake, PhD</h4>
          <p class="text-xs text-brand font-semibold mb-2">Medical Microbiology Fellow</p>
          <p class="text-xs text-gray-500 text-center mb-4 leading-relaxed">Focuses on antimicrobial resistance, clinical culture interpretation, and post-graduate scholarship applications.</p>
          <button @click="selectMentor('Medical Microbiology')" class="mt-auto px-4 py-1.5 bg-white border border-brand text-brand hover:bg-brand hover:text-white rounded-lg text-xs font-semibold transition-colors">
            Select Track &rarr;
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section v-if="!isAuthenticated" class="py-16 max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p class="text-gray-600">Everything you need to know about finding and working with an MLS mentor.</p>
      </div>

      <div class="space-y-4">
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            How does the preceptor matchmaking process work?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
            Submit your mentorship request form with your current academic level and desired discipline. Our academic coordinators review your request and connect you with a verified senior practitioner whose clinical domain matches your goals.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            How often do mentorship sessions occur?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
            Session frequency is tailored to your academic calendar. Most mentor-mentee pairs meet bi-weekly or monthly via Google Meet or Zoom for 45-minute focused check-ins.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            Is there a fee for undergraduate student mentorship?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
            Standard group mentoring and advisor check-ins are included in your active UniVerse student membership. Specialized mock viva examinations and bespoke CV consulting can also be scheduled via the platform.
          </div>
        </details>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section v-if="!isAuthenticated" class="rounded-2xl overflow-hidden relative shadow-lg my-16 max-w-6xl mx-auto">
      <div class="absolute inset-0 bg-gray-900/60 z-10"></div>
      <img src="/community_network.jpg" class="absolute inset-0 w-full h-full object-cover" />
      <div class="relative z-20 py-20 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to Accelerate Your Medical Science Career?</h2>
        <p class="text-lg text-gray-200 mb-8 max-w-xl mx-auto">Join UniVerse today to connect with experienced preceptors and access curated study archives.</p>
        <div class="flex justify-center gap-4">
          <NuxtLink to="/register" class="px-8 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors">Apply for Access</NuxtLink>
          <NuxtLink to="/pricing" class="px-8 py-3 bg-transparent border border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors">View Plans</NuxtLink>
        </div>
      </div>
    </section>
  </div>
  </NuxtLayout>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/core/useAuth';
import { useSeoMeta, useHead } from '#imports';
import { CheckCircle, ArrowRight, MessageSquare, FileText, Award, Star, User } from 'lucide-vue-next';
import { useCreateEnquiry } from '@/composables/modules/enquiries/useCreateEnquiry';

const { isAuthenticated } = useAuth();
const { createEnquiry, loading } = useCreateEnquiry();

const form = ref({
  name: '',
  email: '',
  interest: 'Clinical Chemistry'
});

const successMessage = ref('');

const selectMentor = (track: string) => {
  form.value.interest = track;
  const el = document.getElementById('request-form');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const submitMentorshipRequest = async () => {
  const payload = {
    name: form.value.name,
    email: form.value.email,
    message: `Mentorship Match Request for Specialization Track: ${form.value.interest}`
  };
  await createEnquiry(payload);
  successMessage.value = 'Your mentorship match request has been recorded. Our academic team will connect you with a verified preceptor shortly via email.';
};

definePageMeta({ layout: false });
useSeoMeta({ 
  title: 'Expert Mentorship | UniVerse MLS Community',
  description: 'Connect with senior preceptors, post-graduate researchers, and licensed medical laboratory scientists for 1-on-1 guidance.'
});
useHead({ title: 'Expert Mentorship | UniVerse MLS Community' });
</script>
