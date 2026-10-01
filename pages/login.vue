<template>
  <div class="min-h-screen bg-white flex">
    <!-- Image Side (Hidden on mobile) -->
    <div class="hidden lg:block lg:w-1/2 relative bg-gray-100">
      <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop" alt="Laboratory" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-br from-violet-800/95 to-fuchsia-900/90 flex flex-col justify-between p-12">
        <NuxtLink to="/">
          <img src="~/assets/logo.jpg" class="h-10 w-auto rounded-lg" alt="UniVerse Logo" />
        </NuxtLink>
        <div class="text-white space-y-4 max-w-md">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 mb-2">
            <Lock class="w-3.5 h-3.5" />
            SECURE VERIFICATION
          </div>
          <h2 class="text-4xl font-medium leading-tight">Welcome back to the UniVerse.</h2>
          <p class="text-violet-200 font-light">Access your exclusive resources, connect with mentors, and prepare for your career.</p>
        </div>
      </div>
    </div>

    <!-- Form Side -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12">
      <div class="w-full max-w-md">
        <div class="mb-8 lg:hidden text-center">
          <NuxtLink to="/">
            <img src="~/assets/logo-icon.png" class="h-8 w-auto rounded-lg mx-auto mb-2" alt="UniVerse Logo" />
          </NuxtLink>
        </div>

        <!-- ── STEP 1: Email + Password Credentials ── -->
        <div v-if="step === 'credentials'">
          <h2 class="text-3xl font-medium text-gray-900 mb-2">Sign In</h2>
          <p class="text-gray-500 mb-8">Enter your details to access your account.</p>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <UiInput
              id="email"
              label="Email Address"
              type="email"
              v-model="form.email"
              required
              placeholder="you@example.com"
            />

            <div>
              <UiInput
                id="password"
                label="Password"
                type="password"
                v-model="form.password"
                required
                placeholder="••••••••"
              />
              <div class="mt-2 text-right">
                <NuxtLink to="/forgot-password" class="text-sm text-brand font-medium hover:underline">
                  Forgot Password?
                </NuxtLink>
              </div>
            </div>

            <div v-if="error" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex items-start gap-3 rounded-lg">
              <ShieldAlert class="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
              <span>{{ error }}</span>
            </div>

            <UiButton
              type="submit"
              :loading="loading"
              class="w-full py-3 text-base font-medium"
            >
              Continue to Sign In
            </UiButton>
          </form>

          <div class="mt-8 text-center pt-6 border-t border-gray-100">
            <p class="text-gray-600 text-sm">
              Not a member yet?
              <NuxtLink to="/register" class="font-medium text-brand hover:underline ml-1">
                Apply now
              </NuxtLink>
            </p>
          </div>
        </div>

        <!-- ── STEP 2: Professional OTP Verification Layer ── -->
        <div v-else-if="step === 'otp'">
          <div class="mb-6 flex items-start gap-3">
            <button
              @click="handleBackToCredentials"
              type="button"
              class="mt-1 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to login"
            >
              <ArrowLeft class="w-5 h-5" />
            </button>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Security Verification</h2>
              <p class="text-gray-500 text-sm mt-1">
                We've sent a 6-digit one-time code to
                <span class="font-semibold text-gray-900">{{ form.email }}</span>
              </p>
            </div>
          </div>

          <!-- Email Banner Callout -->
          <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3">
            <Mail class="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
            <div class="text-sm text-blue-900 space-y-1">
              <p class="font-medium">Check your inbox</p>
              <p class="text-blue-700 text-xs">Enter the code from your email to confirm your identity. It will expire shortly.</p>
            </div>
          </div>

          <form @submit.prevent="handleOtpVerify" class="space-y-6">
            <div>
              <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span class="font-medium text-gray-700">Enter 6-Digit Code</span>
                <span
                  :class="[
                    isOtpExpired ? 'text-red-600 font-semibold' : otpTimeRemaining <= 60 ? 'text-amber-600 font-semibold animate-pulse' : 'text-gray-500'
                  ]"
                  class="flex items-center gap-1"
                >
                  <Clock class="w-3.5 h-3.5" />
                  <span v-if="isOtpExpired">Code Expired</span>
                  <span v-else>Expires in {{ formatTime(otpTimeRemaining) }}</span>
                </span>
              </div>

              <!-- Professional 6-Segment OTP Field -->
              <div class="flex justify-between gap-2 sm:gap-3">
                <input
                  v-for="(digit, index) in 6"
                  :key="index"
                  ref="otpInputs"
                  v-model="otpValues[index]"
                  type="text"
                  inputmode="numeric"
                  maxlength="1"
                  autocomplete="one-time-code"
                  class="w-12 h-14 sm:w-14 sm:h-16 border-2 rounded-xl text-center text-2xl font-bold text-gray-900 outline-none transition-all shadow-sm focus:border-brand focus:ring-4 focus:ring-brand/20 disabled:bg-gray-100 disabled:text-gray-400"
                  :class="[
                    otpError ? 'border-red-300 bg-red-50/30' : otpValues[index] ? 'border-brand bg-brand/5' : 'border-gray-200 hover:border-gray-300'
                  ]"
                  :disabled="verifying || isOtpExpired"
                  @input="onOtpInput(index, $event)"
                  @keydown="onOtpKeydown(index, $event)"
                  @paste="onOtpPaste($event)"
                />
              </div>
            </div>

            <!-- Expired Notice Banner -->
            <div v-if="isOtpExpired" class="text-amber-800 text-sm p-4 bg-amber-50 border border-amber-200 flex items-start gap-3 rounded-lg">
              <Clock class="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p class="font-medium">Verification Code Expired</p>
                <p class="text-xs text-amber-700 mt-0.5">This code is no longer valid. Please click "Resend Code" below to receive a new one.</p>
              </div>
            </div>

            <!-- OTP Error Notice -->
            <div v-if="otpError" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex items-start gap-3 rounded-lg">
              <ShieldAlert class="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
              <span>{{ otpError }}</span>
            </div>

            <!-- Submit Button -->
            <UiButton
              type="submit"
              :loading="verifying"
              :disabled="isOtpExpired || getOtpString().length !== 6"
              class="w-full py-3 text-base font-medium"
            >
              Verify & Complete Sign In
            </UiButton>

            <!-- Resend / Cooldown Section -->
            <div class="pt-2 text-center">
              <button
                type="button"
                @click="handleResendOtp"
                :disabled="resendCountdown > 0 || resending"
                class="inline-flex items-center gap-1.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :class="resendCountdown > 0 ? 'text-gray-400' : 'text-brand hover:text-violet-700 hover:underline'"
              >
                <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': resending }" />
                <span v-if="resendCountdown > 0">Resend code in {{ resendCountdown }}s</span>
                <span v-else-if="resending">Sending new code...</span>
                <span v-else>Didn't receive code? Resend Code</span>
              </button>
            </div>

            <!-- Back to change email -->
            <div class="text-center pt-4 border-t border-gray-100">
              <button
                type="button"
                @click="handleBackToCredentials"
                class="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Use a different email address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Approval Pending Modal -->
    <div v-if="showApprovalModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 mx-auto">
          <Clock class="w-6 h-6" />
        </div>
        <h3 class="text-xl font-semibold text-center text-gray-900 mb-2">Account Pending Approval</h3>
        <p class="text-center text-gray-600 mb-6">
          Your account is currently under review by our administrators. You will receive an email once your verification document is approved and your account is activated.
        </p>
        <button 
          @click="showApprovalModal = false" 
          class="w-full bg-gray-900 text-white rounded-lg py-2.5 font-medium hover:bg-gray-800 transition-colors"
        >
          Understood
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useSeoMeta } from '#imports';
import { Lock, Mail, ArrowLeft, Clock, ShieldAlert, RefreshCw } from 'lucide-vue-next';
import { useLogin } from '@/composables/modules/auth/useLogin';
import UiInput from '@/components/ui/Input.vue';
import UiButton from '@/components/ui/Button.vue';

definePageMeta({ layout: 'empty' });

useSeoMeta({
  title: 'Login - UniVerse',
  description: 'Sign in to access your UniVerse account and community resources.',
  ogTitle: 'Login - UniVerse',
  ogDescription: 'Sign in to access your UniVerse account and community resources.',
  ogImage: 'https://images.unsplash.com/photo-1579154204601-52ee6c23b202?q=80&w=2000&auto=format&fit=crop',
  twitterCard: 'summary_large_image',
});

const {
  step,
  loading,
  verifying,
  resending,
  error,
  otpError,
  resendCountdown,
  otpTimeRemaining,
  isOtpExpired,
  showApprovalModal,
  login,
  verifyOtp,
  resendOtp,
  backToCredentials,
} = useLogin();

const form = ref({ email: '', password: '' });

// ── Segmented 6-digit OTP fields ───────────────────────────
const otpValues = ref<string[]>(Array(6).fill(''));
const otpInputs = ref<HTMLInputElement[] | null>(null);

const getOtpString = () => otpValues.value.join('');

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const handleLogin = async () => {
  const result = await login(form.value);
  if (result?.requireOtp) {
    step.value = 'otp';
    otpValues.value = Array(6).fill('');
    await nextTick();
    setTimeout(() => {
      if (otpInputs.value && otpInputs.value.length > 0) {
        otpInputs.value[0].focus();
      }
    }, 100);
  }
};

const onOtpInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const val = target.value.replace(/[^0-9]/g, '');

  otpValues.value[index] = val.slice(-1);

  if (val && index < 5 && otpInputs.value) {
    otpInputs.value[index + 1].focus();
  }

  // Auto-submit if all 6 digits entered
  if (getOtpString().length === 6) {
    handleOtpVerify();
  }
};

const onOtpKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace') {
    if (!otpValues.value[index] && index > 0 && otpInputs.value) {
      otpInputs.value[index - 1].focus();
      otpValues.value[index - 1] = '';
    }
  } else if (event.key === 'ArrowLeft' && index > 0 && otpInputs.value) {
    otpInputs.value[index - 1].focus();
  } else if (event.key === 'ArrowRight' && index < 5 && otpInputs.value) {
    otpInputs.value[index + 1].focus();
  }
};

const onOtpPaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pastedData = event.clipboardData?.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
  if (!pastedData) return;

  for (let i = 0; i < 6; i++) {
    otpValues.value[i] = pastedData[i] || '';
  }

  const focusIndex = Math.min(pastedData.length, 5);
  if (otpInputs.value && otpInputs.value[focusIndex]) {
    otpInputs.value[focusIndex].focus();
  }

  if (pastedData.length === 6) {
    handleOtpVerify();
  }
};

const handleOtpVerify = async () => {
  const code = getOtpString();
  if (code.length !== 6) return;
  await verifyOtp(form.value.email, code);
};

const handleResendOtp = async () => {
  await resendOtp(form.value.email);
  otpValues.value = Array(6).fill('');
  await nextTick();
  if (otpInputs.value && otpInputs.value.length > 0) {
    otpInputs.value[0].focus();
  }
};

const handleBackToCredentials = () => {
  backToCredentials();
  otpValues.value = Array(6).fill('');
};
</script>
