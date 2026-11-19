<template>
  <div class="min-h-screen bg-[#F6F8FB] lg:grid lg:grid-cols-[.92fr_1.08fr]">
    <!-- Brand panel -->
    <aside class="hidden lg:flex relative overflow-hidden bg-navy-950 p-10 xl:p-12 flex-col justify-between">
      <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop" alt="Microscope" class="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div class="absolute inset-0 navy-mesh"></div>
      <div class="absolute inset-0 brand-grid opacity-[0.08]"></div>
      <div class="relative z-10 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <BrandLogo variant="white" class="h-9" />
          <span class="font-display text-xl font-bold text-white">UniVerse<span class="text-teal-400">.</span></span>
        </NuxtLink>
        <span class="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/60">Student application</span>
      </div>
      <div class="relative z-10 max-w-md">
        <p class="text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal-300">Membership</p>
        <h2 class="mt-3 font-display text-4xl xl:text-5xl font-bold leading-[1.02] text-white">Join the verified<br>MLS community.</h2>
        <p class="mt-4 text-sm leading-relaxed text-white/55">A focused academic home for students who take their clinical training seriously.</p>
        <div class="mt-8 space-y-3.5">
          <div class="flex items-center gap-3 text-sm text-white/70"><span class="w-8 h-8 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center"><FileText class="w-4 h-4 text-teal-300" /></span> School ID, fees receipt or course form</div>
          <div class="flex items-center gap-3 text-sm text-white/70"><span class="w-8 h-8 rounded-xl bg-brand-400/15 border border-brand-300/20 flex items-center justify-center"><ShieldCheck class="w-4 h-4 text-brand-200" /></span> Manual review in 24–48 hours</div>
          <div class="flex items-center gap-3 text-sm text-white/70"><span class="w-8 h-8 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center"><Lock class="w-4 h-4 text-teal-300" /></span> No payment until you are approved</div>
        </div>
      </div>
      <div class="relative z-10 rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
        <p class="text-[10px] font-extrabold uppercase tracking-[0.16em] text-teal-300">A calmer application</p>
        <p class="mt-1.5 text-sm leading-relaxed text-white/65">Upload one current document. We review it by hand, then email you the next step.</p>
      </div>
    </aside>

    <!-- Form panel -->
    <main class="relative flex justify-center p-5 sm:p-8 lg:p-10 overflow-y-auto min-h-screen">
      <div class="absolute inset-0 brand-grid opacity-50 lg:hidden"></div>
      <div class="relative w-full max-w-2xl my-auto py-4">
        <div class="mb-5 flex items-center justify-center lg:hidden">
          <NuxtLink to="/" class="flex items-center gap-2.5">
            <BrandLogo variant="brand" class="h-8" />
            <span class="font-display text-lg font-bold text-navy-950">UniVerse<span class="text-teal-500">.</span></span>
          </NuxtLink>
        </div>

        <div class="rounded-[2rem] border border-navy-100 bg-white p-6 sm:p-8 shadow-soft">
        <div v-if="success" class="text-center py-6">
          <div class="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 class="w-8 h-8" />
          </div>
          <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand">Application received</p>
          <h2 class="mt-2 font-display text-3xl font-bold text-navy-950">You’re in the review queue.</h2>
          <p class="mt-3 text-sm leading-relaxed text-navy-500 max-w-md mx-auto">Your document is pending manual review. If approved, you’ll receive an email; sign in then to choose your subscription plan. No payment is taken now.</p>
          <NuxtLink to="/" class="mt-7 inline-flex items-center justify-center rounded-full bg-navy-950 px-6 py-3 text-sm font-bold text-white hover:bg-navy-900 transition-colors">Return to homepage</NuxtLink>
        </div>

        <div v-else>
          <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand">Student membership</p>
          <h2 class="mt-2 font-display text-3xl font-bold text-navy-950">Apply for membership</h2>
          <p class="mt-1.5 text-sm text-navy-500">UniVerse is exclusive to verified Medical Laboratory Science students.</p>

          <div class="mb-7 mt-6 grid grid-cols-3 gap-2">
            <div v-for="(label, idx) in ['Details', 'Email', 'Verification']" :key="label">
              <div class="h-1.5 rounded-full transition-colors" :class="step >= idx + 1 ? 'bg-brand' : 'bg-navy-100'"></div>
              <p class="mt-2 text-[9px] font-extrabold uppercase tracking-[0.12em]" :class="step >= idx + 1 ? 'text-brand' : 'text-navy-300'">{{ label }}</p>
            </div>
          </div>

          <form @submit.prevent="submitStep" class="space-y-6">
            <div v-if="step === 1" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <UiInput id="firstName" label="First Name" v-model="form.firstName" required placeholder="Jane" />
                <UiInput id="lastName" label="Last Name" v-model="form.lastName" required placeholder="Doe" />
              </div>
              <UiInput id="email" label="Email Address" type="email" v-model="form.email" required placeholder="jane.doe@example.com" />
              <UiInput id="password" label="Password" type="password" v-model="form.password" required minlength="8" placeholder="Minimum 8 characters" />
            </div>

            <div v-else-if="step === 2" class="space-y-6">
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-50 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail class="w-8 h-8" />
                </div>
                <h3 class="text-xl font-medium text-navy-950 mb-2">Verify Your Email</h3>
                <p class="text-navy-400 mb-1 text-sm">We've sent a 4-digit code to <span class="font-bold">{{ form.email }}</span>.</p>
                <button type="button" @click="backToEmail" class="text-brand text-sm font-medium hover:underline">Change email address</button>
              </div>
              
              <div class="flex gap-4 justify-center my-8">
                <input 
                  v-for="(digit, idx) in 4" 
                  :key="idx" 
                  ref="otpRefs" 
                  type="text" 
                  maxlength="1" 
                  v-model="otpArray[idx]" 
                  @input="handleOtpInput(idx, $event)" 
                  @keydown="handleOtpKeydown(idx, $event)" 
                  @paste="handleOtpPaste($event)"
                  class="w-14 h-14 text-center text-2xl font-bold border-2 border-navy-100 rounded-2xl text-navy-950 focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all" 
                />
              </div>

              <div class="text-center">
                <p v-if="countdown > 0" class="text-sm text-navy-400 mb-2">Code expires in <span class="font-bold text-navy-950">{{ formattedCountdown }}</span></p>
                <p v-else class="text-sm text-red-600 mb-2">Code expired!</p>
                
                <button type="button" @click="resendCode" :disabled="countdown > 540 || loading" class="text-brand text-sm font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ countdown > 540 ? `Resend code in ${countdown - 540}s` : 'Resend code' }}
                </button>
              </div>
            </div>

            <div v-else-if="step === 3" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-[11px] font-extrabold uppercase tracking-[0.1em] text-navy-600 mb-1">University</label>
                  <UiSelectSearch
                    id="university"
                    v-model="form.universityId"
                    :required="step === 3"
                    placeholder="Select your university"
                    search-placeholder="Search universities..."
                    :options="universityOptions"
                  />
                  <p class="text-[11px] text-navy-400 mt-1">
                    Can't find your school?
                    <a href="mailto:support@medlabconvo.com" class="text-brand font-medium hover:underline">Contact support</a>.
                  </p>
                </div>
                <div>
                  <label class="block text-[11px] font-extrabold uppercase tracking-[0.1em] text-navy-600 mb-1">Programme</label>
                  <UiSelectSearch
                    id="programme"
                    v-model="form.programmeId"
                    :required="step === 3"
                    :disabled="!form.universityId"
                    :placeholder="form.universityId ? 'Select your programme' : 'Select a university first'"
                    search-placeholder="Search programmes..."
                    :options="programmeOptions"
                  />
                  <p v-if="form.universityId && programmeOptions.length === 0" class="text-xs text-red-600 mt-1">
                    No programme is currently listed for this university. Please contact support.
                  </p>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-extrabold uppercase tracking-[0.1em] text-navy-600 mb-1">Type of Verification Document <span class="text-brand">*</span></label>
                <UiSelect
                  id="verificationDocumentType"
                  v-model="form.verificationDocumentType"
                  :required="step === 3"
                  placeholder="Select the document you are uploading"
                  :options="documentTypes"
                />
                <p class="text-xs text-navy-500 mt-2 leading-relaxed">
                  Accepted: <strong>school ID card</strong>, <strong>current school fees receipt</strong>, <strong>online course registration form</strong>, or <strong>admission letter</strong>. The document must show your name and current session.
                </p>
              </div>

              <div class="pt-2">
                <UiFileInput
                  v-model="form.file"
                  label="Verification Document"
                  :required="step === 3"
                  accept="image/*,.pdf"
                  placeholder="Upload school ID, fees receipt, or course registration form"
                  hint="PDF, JPG, PNG (max 5MB) · current session"
                  :icon="UploadCloud"
                  :successIcon="CheckCircle2"
                />
                
                <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-3">
                  <div class="flex justify-between text-xs text-navy-500 mb-1">
                    <span>Uploading...</span>
                    <span>{{ uploadProgress }}%</span>
                  </div>
                  <div class="w-full bg-navy-100 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-brand h-full rounded-full transition-all" :style="{ width: uploadProgress + '%' }"></div>
                  </div>
                </div>

                <div class="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 leading-relaxed">
                  <strong>No payment yet.</strong> The technical team reviews your document manually. If approved, you will receive an email and can then sign in to choose a subscription plan.
                </div>
              </div>
            </div>

            <div v-if="error" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex flex-col gap-2 rounded">
              <div class="flex items-start gap-3">
                <Lock class="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{{ error }}</span>
              </div>
              <p class="text-xs text-red-600 pl-8">
                Need assistance? Contact our student verification desk at
                <a href="mailto:support@medlabconvo.com" class="font-bold underline">support@medlabconvo.com</a> or WhatsApp <strong class="underline">+234 813 000 0000</strong>.
              </p>
            </div>

            <div class="flex items-center gap-4 mt-4">
              <button 
                v-if="step === 3" 
                type="button" 
                @click="step = 2" 
                class="w-1/3 py-3 text-sm font-bold text-navy-600 bg-navy-50 hover:bg-navy-100 rounded-full transition-colors"
              >
                Back
              </button>
              <UiButton
                type="submit"
                :loading="loading"
                class="flex-1 py-3 text-base font-medium"
              >
                {{ step === 3 ? 'Submit Application' : (step === 2 ? 'Verify Email' : 'Next Step') }}
              </UiButton>
            </div>
          </form>

          <div class="mt-7 text-center pt-5 border-t border-navy-100">
            <p class="text-navy-500 text-sm">
              Already have an account?
              <NuxtLink to="/login" class="font-medium text-brand hover:underline ml-1">
                Sign in
              </NuxtLink>
            </p>
          </div>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';

useSeoMeta({
  title: 'Apply for Membership - UniVerse MLS Community',
  description: 'Join the exclusive community of verified Medical Laboratory Science Students.',
  ogTitle: 'Apply for Membership - UniVerse MLS Community',
  ogDescription: 'Join the exclusive community of verified Medical Laboratory Science Students.',
  ogImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
  twitterCard: 'summary_large_image',
})

import { ref, onMounted, computed, onUnmounted, watch } from 'vue';
import { ArrowRight, UploadCloud, CheckCircle2, Lock, Mail, FileText, ShieldCheck } from 'lucide-vue-next';
import { useRegister } from '@/composables/modules/auth/useRegister';
import { universeApi } from '@/api_factory/modules/universe';
import UiInput from '@/components/ui/Input.vue';
import UiButton from '@/components/ui/Button.vue';
import UiFileInput from '@/components/ui/FileInput.vue';
import UiSelect from '@/components/ui/Select.vue';
import UiSelectSearch from '@/components/ui/SelectSearch.vue';

definePageMeta({ layout: 'empty' });

const { loading, uploadProgress, error, register, sendOtp, verifyOtp } = useRegister();
const form = ref({ firstName: '', lastName: '', email: '', password: '', otp: '', universityId: '', programmeId: '', verificationDocumentType: '', file: null as File | null });
const success = ref(false);
const step = ref(1);

const otpArray = ref(['', '', '', '']);
const otpRefs = ref<HTMLInputElement[]>([]);
const countdown = ref(0);
let countdownInterval: any;

const documentTypes = [
  { label: 'School ID card', value: 'STUDENT_ID' },
  { label: 'School fees receipt (current session)', value: 'SCHOOL_FEES_RECEIPT' },
  { label: 'Online course registration form', value: 'COURSE_REGISTRATION_FORM' },
  { label: 'Admission letter', value: 'ADMISSION_LETTER' },
  { label: 'Other school document', value: 'OTHER' },
];

const formattedCountdown = computed(() => {
  const m = Math.floor(countdown.value / 60).toString().padStart(2, '0');
  const s = (countdown.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

const startCountdown = () => {
  countdown.value = 600;
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
};

const handleOtpInput = (idx: number, e: Event) => {
  const input = e.target as HTMLInputElement;
  const val = input.value.replace(/[^0-9]/g, '').slice(-1);
  otpArray.value[idx] = val;
  input.value = val;
  if (val && idx < 3) {
    otpRefs.value[idx + 1]?.focus();
  }
  form.value.otp = otpArray.value.join('');
};

const handleOtpKeydown = (idx: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !otpArray.value[idx] && idx > 0) {
    otpRefs.value[idx - 1]?.focus();
  }
};

const handleOtpPaste = (e: ClipboardEvent) => {
  const pasted = e.clipboardData?.getData('text').replace(/[^0-9]/g, '').slice(0, 4);
  if (!pasted) return;
  e.preventDefault();
  otpArray.value = ['', '', '', ''];
  for (let i = 0; i < pasted.length; i++) otpArray.value[i] = pasted[i];
  form.value.otp = otpArray.value.join('');
  otpRefs.value[Math.min(pasted.length, 3)]?.focus();
};

const resendCode = async () => {
  const sent = await sendOtp(form.value.email, form.value.firstName, 'universe');
  if (sent) {
    startCountdown();
  }
};

const backToEmail = () => {
  step.value = 1;
  otpArray.value = ['', '', '', ''];
  form.value.otp = '';
  countdown.value = 0;
  clearInterval(countdownInterval);
  error.value = null;
};

onUnmounted(() => clearInterval(countdownInterval));

const sortByName = (items: any[]) =>
  [...items].sort((a, b) =>
    String(a?.name || '').localeCompare(String(b?.name || ''), 'en', { sensitivity: 'base' }),
  );

const universities = ref<any[]>([]);
const programmes = ref<any[]>([]);

const fetchUniverseData = async () => {
  const [uniResult, progResult] = await Promise.allSettled([
    universeApi.getUniversities(),
    universeApi.getProgrammes(),
  ]);

  if (uniResult.status === 'fulfilled') {
    const data = uniResult.value?.data ?? uniResult.value;
    universities.value = Array.isArray(data)
      ? sortByName(data.filter((u: any) => u?.status !== 'inactive'))
      : [];
  } else {
    console.error('Failed to load universities', uniResult.reason);
  }

  if (progResult.status === 'fulfilled') {
    const data = progResult.value?.data ?? progResult.value;
    programmes.value = Array.isArray(data) ? data.filter((p: any) => p?.status !== 'inactive') : [];
  } else {
    console.error('Failed to load programmes', progResult.reason);
  }

  if (universities.value.length === 0) {
    error.value = 'We could not load the universities needed to register. Please refresh the page or contact support@medlabconvo.com.';
  }
};

onMounted(() => {
  fetchUniverseData();
});

const universityOptions = computed(() =>
  universities.value.map(u => ({ label: String(u.name || '').trim(), value: u._id })),
);

const programmeUniversityId = (programme: any) => {
  const university = programme?.universityId;
  return university && typeof university === 'object' ? university._id : university;
};

const programmeOptions = computed(() => {
  if (!form.value.universityId) return [];
  return sortByName(
    programmes.value.filter(
      p => String(programmeUniversityId(p)) === String(form.value.universityId),
    ),
  ).map(p => ({ label: String(p.name || '').trim(), value: p._id }));
});

watch(
  () => form.value.universityId,
  () => {
    form.value.programmeId = '';
    if (programmeOptions.value.length === 1) {
      form.value.programmeId = String(programmeOptions.value[0].value);
    }
  },
);

const submitStep = async () => {
  error.value = null;

  if (step.value === 1) {
    if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.password) {
      error.value = "Please fill in all basic details.";
      return;
    }
    if (universities.value.length === 0) {
      error.value = 'Universities could not be loaded. Please refresh the page or contact support@medlabconvo.com.';
      return;
    }
    otpArray.value = ['', '', '', ''];
    form.value.otp = '';
    const sent = await sendOtp(form.value.email, form.value.firstName, 'universe');
    if (sent) {
      step.value = 2;
      startCountdown();
    }
    return;
  }

  if (step.value === 2) {
    if (!form.value.otp || form.value.otp.length !== 4) {
      error.value = "Please enter the 4-digit code.";
      return;
    }
    const verified = await verifyOtp(form.value.email, form.value.otp);
    if (verified) step.value = 3;
    return;
  }
  
  if (!form.value.file) {
    error.value = 'Please upload a verification document to proceed.';
    return;
  }
  if (!form.value.universityId || !form.value.programmeId) {
    error.value = 'Please select your university and programme.';
    return;
  }
  if (programmeOptions.value.length === 0) {
    error.value = 'No programme is available for the selected university. Please contact support.';
    return;
  }
  if (!form.value.verificationDocumentType) {
    error.value = 'Please select the type of document you uploaded.';
    return;
  }

  const result = await register({
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    password: form.value.password,
    universityId: form.value.universityId,
    programmeId: form.value.programmeId,
    verificationDocumentType: form.value.verificationDocumentType,
    file: form.value.file,
    source: 'universe',
  });
  if (result) {
    if (result.authorization_url) {
      window.location.href = result.authorization_url;
    } else {
      success.value = true;
    }
  }
};
</script>
