<template>
  <div class="min-h-screen bg-white flex">
    <!-- Image Side -->
    <div class="hidden lg:block lg:w-1/2 relative bg-gray-100">
      <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop" alt="Microscope" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-brand/90 flex flex-col justify-between p-12">
        <NuxtLink to="/">
          <img src="~/assets/logo.jpg" class="h-10 w-auto rounded-lg" alt="UniVerse Logo" />
        </NuxtLink>
        <div class="text-white space-y-4 max-w-md">
          <h2 class="text-4xl font-medium leading-tight">Join the exclusive community.</h2>
          <p class="text-blue-100 font-light">Connect with mentors, access premium clinical guides, and elevate your MLS internship.</p>
        </div>
      </div>
    </div>

    <!-- Form Side -->
    <div class="w-full lg:w-1/2 flex justify-center p-6 sm:p-8 md:p-12 overflow-y-auto h-screen">
      <div class="w-full max-w-xl my-auto py-8">
        <div class="mb-10 lg:hidden text-center">
          <NuxtLink to="/">
            <img src="~/assets/logo-icon.png" class="h-8 w-auto mx-auto mb-2" alt="UniVerse Logo" />
          </NuxtLink>
        </div>
        
        <div v-if="success" class="text-center">
          <div class="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ArrowRight class="w-8 h-8" />
          </div>
          <h2 class="text-3xl font-medium text-gray-900 mb-4">Application Submitted</h2>
          <p class="text-gray-500 mb-8 max-w-md mx-auto">Your account is pending admin review. You'll receive an email notification once your verification document is approved.</p>
          <NuxtLink to="/" class="inline-block bg-gray-900 text-white px-6 py-2.5 rounded font-medium hover:bg-gray-800 transition-colors">
            Return to Homepage
          </NuxtLink>
        </div>

        <div v-else>
          <h2 class="text-3xl font-medium text-gray-900 mb-2">Apply for Membership</h2>
          <p class="text-gray-500 mb-8">UniVerse is exclusive to verified University Students.</p>

          <!-- Step Indicators -->
          <div class="flex items-center mb-8 gap-2">
            <div class="flex-1 h-2 rounded-full transition-colors" :class="step >= 1 ? 'bg-brand' : 'bg-gray-200'"></div>
            <div class="flex-1 h-2 rounded-full transition-colors" :class="step >= 2 ? 'bg-brand' : 'bg-gray-200'"></div>
            <div class="flex-1 h-2 rounded-full transition-colors" :class="step >= 3 ? 'bg-brand' : 'bg-gray-200'"></div>
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
                <h3 class="text-xl font-medium text-gray-900 mb-2">Verify Your Email</h3>
                <p class="text-gray-500 mb-1 text-sm">We've sent a 4-digit code to <span class="font-bold">{{ form.email }}</span>.</p>
                <button type="button" @click="step = 1" class="text-brand text-sm font-medium hover:underline">Change email address</button>
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
                  class="w-16 h-16 text-center text-3xl font-bold border-2 border-gray-200 rounded-xl text-gray-900 focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none transition-all" 
                />
              </div>

              <div class="text-center">
                <p v-if="countdown > 0" class="text-sm text-gray-500 mb-2">Code expires in <span class="font-bold text-gray-900">{{ formattedCountdown }}</span></p>
                <p v-else class="text-sm text-red-600 mb-2">Code expired!</p>
                
                <button type="button" @click="resendCode" :disabled="countdown > 540 || loading" class="text-brand text-sm font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ countdown > 540 ? `Resend code in ${countdown - 540}s` : 'Resend code' }}
                </button>
              </div>
            </div>

            <div v-else-if="step === 3" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">University</label>
                  <UiSelect
                    id="university"
                    v-model="form.universityId"
                    :required="step === 3"
                    placeholder="Select University"
                    :options="universities.map(u => ({ label: u.name, value: u._id }))"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Programme</label>
                  <UiSelect
                    id="programme"
                    v-model="form.programmeId"
                    :required="step === 3"
                    placeholder="Select Programme"
                    :options="filteredProgrammes.map(p => ({ label: p.name, value: p._id }))"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Subscription Plan</label>
                <div class="space-y-3">
                  <div 
                    v-for="plan in plans" 
                    :key="plan._id"
                    @click="form.planId = plan._id"
                    class="border rounded-lg p-3 cursor-pointer transition-all flex items-center justify-between"
                    :class="form.planId === plan._id ? 'border-brand bg-brand/5 ring-1 ring-brand' : 'border-gray-200 hover:border-brand/50'"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5" :class="form.planId === plan._id ? 'border-brand bg-brand' : 'border-gray-300'">
                        <div v-if="form.planId === plan._id" class="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <h3 class="font-bold text-gray-900 text-sm">{{ plan.name }}</h3>
                        <p class="text-xs text-gray-500 line-clamp-1">{{ plan.description }}</p>
                      </div>
                    </div>
                    <div class="text-right flex-shrink-0 ml-4">
                      <div class="font-bold text-gray-900 text-sm">₦{{ (plan.price / 100).toLocaleString() }}</div>
                      <div class="text-[10px] text-gray-500 uppercase tracking-wider">/ {{ plan.durationMonths }} mo</div>
                    </div>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-3 flex items-start gap-1.5 bg-gray-50 p-2 rounded">
                  <span class="text-brand font-bold shrink-0">ⓘ Note:</span>
                  <span>You will be securely redirected to Paystack to enter your card details. Your card will be automatically charged at the intervals defined by your chosen plan. You can cancel at any time.</span>
                </p>
              </div>

              <div class="pt-2">
                <UiFileInput
                  v-model="form.file"
                  label="Verification Document"
                  :required="step === 3"
                  accept="image/*,.pdf"
                  placeholder="Upload Admission Letter or Student ID"
                  hint="PDF, JPG, PNG (max 5MB)"
                  :icon="UploadCloud"
                  :successIcon="CheckCircle2"
                />
                
                <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-3">
                  <div class="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Uploading...</span>
                    <span>{{ uploadProgress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-brand h-full rounded-full transition-all" :style="{ width: uploadProgress + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="error" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex items-start gap-3 rounded">
              <Lock class="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{{ error }}</span>
            </div>

            <div class="flex items-center gap-4 mt-4">
              <button 
                v-if="step === 3" 
                type="button" 
                @click="step = 2" 
                class="w-1/3 py-3 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
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

          <div class="mt-8 text-center pt-6 border-t border-gray-100">
            <p class="text-gray-600 text-sm">
              Already have an account?
              <NuxtLink to="/login" class="font-medium text-brand hover:underline ml-1">
                Sign in
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';

useSeoMeta({
  title: 'Apply for Membership - UniVerse',
  description: 'Join the exclusive community of verified University Students.',
  ogTitle: 'Apply for Membership - UniVerse',
  ogDescription: 'Join the exclusive community of verified University Students.',
  ogImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
  twitterCard: 'summary_large_image',
})

import { ref, onMounted, computed, onUnmounted } from 'vue';
import { ArrowRight, UploadCloud, CheckCircle2, Lock, Mail } from 'lucide-vue-next';
import { useRegister } from '@/composables/modules/auth/useRegister';
import { universeApi } from '@/api_factory/modules/universe';
import UiInput from '@/components/ui/Input.vue';
import UiButton from '@/components/ui/Button.vue';
import UiFileInput from '@/components/ui/FileInput.vue';

definePageMeta({ layout: 'empty' });

const { loading, uploadProgress, error, register, sendOtp, verifyOtp } = useRegister();
const form = ref({ firstName: '', lastName: '', email: '', password: '', otp: '', universityId: '', programmeId: '', planId: '', file: null as File | null });
const success = ref(false);
const step = ref(1);

const otpArray = ref(['', '', '', '']);
const otpRefs = ref<HTMLInputElement[]>([]);
const countdown = ref(0);
let countdownInterval: any;

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
  const val = (e.target as HTMLInputElement).value;
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

const resendCode = async () => {
  const success = await sendOtp(form.value.email, form.value.firstName, 'universe');
  if (success) {
    startCountdown();
  }
};

onUnmounted(() => clearInterval(countdownInterval));

const universities = ref<any[]>([]);
const programmes = ref<any[]>([]);
const plans = ref<any[]>([]);

const fetchUniverseData = async () => {
  try {
    const [uniRes, progRes, plansRes] = await Promise.all([
      universeApi.getUniversities(),
      universeApi.getProgrammes(),
      universeApi.get('/subscriptions').then((res: any) => res.data || res).catch(() => [])
    ]);
    universities.value = uniRes.data || uniRes;
    programmes.value = progRes.data || progRes;
    plans.value = plansRes;
  } catch (err) {
    console.error('Failed to fetch universe data');
  }
};

onMounted(() => {
  fetchUniverseData();
});

const filteredProgrammes = computed(() => {
  if (!form.value.universityId) return [];
  return programmes.value.filter(p => p.universityId === form.value.universityId);
});

const submitStep = async () => {
  error.value = null;

  if (step.value === 1) {
    if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.password) {
      error.value = "Please fill in all basic details.";
      return;
    }
    const success = await sendOtp(form.value.email, form.value.firstName, 'universe');
    if (success) {
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
    const success = await verifyOtp(form.value.email, form.value.otp);
    if (success) step.value = 3;
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
  if (!form.value.planId) {
    error.value = 'Please select a subscription plan.';
    return;
  }
  
  const result = await register({
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    password: form.value.password,
    universityId: form.value.universityId,
    programmeId: form.value.programmeId,
    planId: form.value.planId,
    file: form.value.file,
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
