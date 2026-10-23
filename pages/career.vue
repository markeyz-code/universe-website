<template>
  <NuxtLayout :name="isAuthenticated ? 'dashboard' : 'default'">

  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center max-w-3xl mx-auto pt-8">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Career & Placements</span>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Start Your Clinical & Academic Journey</h1>
      <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
        Explore study cohorts, research assistantships, and student clinical postings at top diagnostic centers, teaching hospitals, and university research labs across Nigeria.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="#openings" class="px-6 py-2.5 bg-brand text-white rounded-lg font-medium hover:bg-violet-700 transition-colors shadow-sm">
          Browse Active Placements
        </a>
        <NuxtLink to="/register" class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Get Placement Ready (No CV Required)
        </NuxtLink>
      </div>

      <p class="text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5">
        <span class="text-brand font-bold">ℹ️ Note:</span>
        <span>A formal CV is <strong>never mandatory</strong> for students. You can apply with your academic standing, university, and coursework profile.</span>
      </p>
    </section>

    <!-- Active positions -->
    <section id="openings" class="bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2 block">Verified Opportunities</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Active Positions & Student Placements</h2>
        <p class="text-gray-600">Verified laboratory opportunities, hospital rotations, and research groups.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
        <!-- Job Card 1 -->
        <div v-for="job in jobsList" :key="job.id" class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
          <div class="h-48 bg-gray-100 overflow-hidden relative">
             <img :src="job.image" class="w-full h-full object-cover" />
             <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase">
               {{ job.type }}
             </span>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-lg font-bold text-gray-900 mb-1 leading-snug">{{ job.title }}</h3>
            <p class="text-xs text-gray-500 mb-4">{{ job.facility }} • {{ job.location }}</p>
            <p class="text-xs text-gray-600 mb-4 line-clamp-2">{{ job.description }}</p>
            <div class="flex flex-wrap gap-1.5 mb-6 mt-auto">
              <span v-for="tag in job.tags" :key="tag" class="px-2.5 py-0.5 bg-gray-100 text-xs text-gray-600 rounded">
                {{ tag }}
              </span>
            </div>
            <button 
              @click="openApplication(job)"
              class="w-full py-2 bg-brand/10 hover:bg-brand text-brand hover:text-white rounded-lg text-sm font-medium transition-colors"
            >
              View Details & Apply &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Modal -->
    <div v-if="selectedJob" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-xs font-bold text-brand uppercase tracking-wider">{{ selectedJob.facility }}</span>
            <h3 class="text-xl font-bold text-gray-900">{{ selectedJob.title }}</h3>
          </div>
          <button @click="selectedJob = null" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>

        <div v-if="applicationSuccess" class="bg-green-50 text-green-800 p-6 rounded-xl text-center space-y-3">
          <CheckCircle2 class="w-10 h-10 text-green-600 mx-auto" />
          <h4 class="font-bold text-lg">Application Submitted!</h4>
          <p class="text-xs leading-relaxed">Your application has been received by {{ selectedJob.facility }}. You will receive status updates via your email.</p>
          <button @click="selectedJob = null; applicationSuccess = false" class="px-6 py-2 bg-brand text-white rounded-lg text-xs font-bold">Done</button>
        </div>

        <form v-else @submit.prevent="submitApplication" class="space-y-4">
          <p class="text-xs text-gray-600 leading-relaxed">{{ selectedJob.description }}</p>
          
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
            <input v-model="applicant.name" required type="text" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-brand outline-none" placeholder="e.g. Jane Doe" />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
            <input v-model="applicant.email" required type="email" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-brand outline-none" placeholder="jane@example.com" />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Current Academic Level / Institution *</label>
            <input v-model="applicant.schoolLevel" required type="text" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-brand outline-none" placeholder="e.g. 400L BMLS, University of Lagos" />
          </div>

          <div class="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 text-center">
            <label class="block text-xs font-bold text-gray-800 mb-1">
              Upload CV / Resume <span class="text-brand font-normal">(Optional)</span>
            </label>
            <p class="text-[11px] text-gray-500 mb-2">Not required! If you do not have a CV, you may proceed with just your academic profile.</p>
            <input type="file" accept=".pdf,.doc,.docx" @change="handleFile" class="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-brand/10 file:text-brand hover:file:bg-brand/20" />
          </div>

          <div class="flex gap-3 pt-2">
            <button type="button" @click="selectedJob = null" class="w-1/3 py-2.5 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="submittingApp" class="flex-1 py-2.5 bg-brand text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors disabled:opacity-50">
              {{ submittingApp ? 'Submitting...' : 'Submit Application' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Student feedback -->
    <section v-if="!isAuthenticated" class="py-12 bg-white flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto border-t border-b border-gray-100">
      <div class="md:w-1/3">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Student Feedback</h2>
        <p class="text-gray-600">Hear from MLS students placed through the Career Hub.</p>
      </div>
      <div class="md:w-2/3 bg-gray-50 p-8 rounded-xl border border-gray-200">
         <div class="flex text-yellow-400 mb-4">
           <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
         </div>
         <p class="text-lg text-gray-900 font-medium mb-6">"I secured my clinical observation placement through this board without needing a complex corporate CV. The direct hospital connection was seamless."</p>
         <div class="flex items-center gap-3">
           <div class="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center font-bold text-xs">SM</div>
           <div>
             <h4 class="text-sm font-bold text-gray-900">Sarah Mitchell</h4>
             <p class="text-xs text-gray-500">MLS Student, University of Ilorin Teaching Hospital (UITH)</p>
           </div>
         </div>
      </div>
    </section>

    <!-- FAQ -->
    <section v-if="!isAuthenticated" class="py-16 max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p class="text-gray-600">Everything you need to know about student placements and applications.</p>
      </div>

      <div class="space-y-4">
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            Do I need a CV or work experience to apply?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
            No! As an undergraduate or early MLS intern, you do not need a corporate resume. You can apply with your academic level, university name, and coursework summary. If you happen to have a CV, you may optionally attach it, but it is not mandatory.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            What are the requirements for student clinical placements?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
            Most placements require active enrollment in an accredited Medical Laboratory Science or related healthcare program. Specific clinical sites may request proof of immunization or institutional recommendation once shortlisted.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            How soon will I hear back after applying?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
            Partner diagnostic centers and laboratory coordinators typically review cohorts within 5–7 business days. You will receive real-time updates in your student dashboard and via email.
          </div>
        </details>
      </div>

      <div class="text-center mt-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h4 class="font-bold text-gray-900 mb-1">Need help with placements?</h4>
        <p class="text-xs text-gray-600 mb-4">Reach out to our student advisory desk anytime at <a href="mailto:support@medlabconvo.com" class="text-brand font-bold underline">support@medlabconvo.com</a> or WhatsApp +234 813 000 0000.</p>
        <NuxtLink to="/contact" class="px-6 py-2 border border-brand text-brand hover:bg-brand/5 rounded-lg text-xs font-bold transition-colors inline-block">Contact Support Team</NuxtLink>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section v-if="!isAuthenticated" class="rounded-2xl overflow-hidden relative shadow-lg my-12 max-w-6xl mx-auto">
      <div class="absolute inset-0 bg-gray-900/70 z-10"></div>
      <img src="/community_network.jpg" class="absolute inset-0 w-full h-full object-cover" />
      <div class="relative z-20 py-20 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to accelerate your clinical studies?</h2>
        <p class="text-lg text-gray-200 mb-8 max-w-xl mx-auto">Join UniVerse today to access verified laboratory placements, study archives, and senior mentorship.</p>
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
import { Star, CheckCircle2 } from 'lucide-vue-next';

definePageMeta({ layout: false });
useSeoMeta({ 
  title: 'Career & Student Placements | UniVerse MLS Community',
  description: 'Explore student placements, research assistantships, and diagnostic laboratory opportunities across Nigeria.'
});
useHead({ title: 'Career & Student Placements | UniVerse MLS Community' });

const { isAuthenticated } = useAuth();

const jobsList = ref([
  {
    id: 1,
    title: 'Research Assistant (Student Rotation)',
    facility: 'University College Hospital (UCH)',
    location: 'Ibadan, Oyo State',
    type: 'Research Placement',
    image: '/documents_verify.jpg',
    description: 'Collaborate with clinical scientists on ongoing infectious disease epidemiology and diagnostic screening panels.',
    tags: ['Research', 'Histopathology', 'UCH']
  },
  {
    id: 2,
    title: 'Student Lab Trainee (Clinical Chemistry)',
    facility: 'Clina-Lancet Laboratories',
    location: 'Victoria Island, Lagos',
    type: 'Diagnostic Posting',
    image: '/vault_microscope.jpg',
    description: 'Hands-on exposure to automated chemistry analyzers, quality control validation, and sample pre-analytics.',
    tags: ['Clinical Chemistry', 'Automated Analyzers', 'Lagos']
  },
  {
    id: 3,
    title: 'Genomics & Molecular Lab Intern',
    facility: '54gene Research Center',
    location: 'Abuja, FCT',
    type: 'Molecular Lab',
    image: '/mentor_group.jpg',
    description: 'Observe real-world molecular biology assays, PCR workflows, and biobanking procedures under senior supervision.',
    tags: ['Molecular Biology', 'PCR', 'Abuja']
  }
]);

const selectedJob = ref<any>(null);
const applicant = ref({ name: '', email: '', schoolLevel: '', cvFile: null as File | null });
const submittingApp = ref(false);
const applicationSuccess = ref(false);

const openApplication = (job: any) => {
  selectedJob.value = job;
  applicationSuccess.value = false;
};

const handleFile = (e: any) => {
  const file = e.target.files?.[0];
  applicant.value.cvFile = file || null;
};

const submitApplication = async () => {
  submittingApp.value = true;
  await new Promise(r => setTimeout(r, 1000));
  submittingApp.value = false;
  applicationSuccess.value = true;
};
</script>
