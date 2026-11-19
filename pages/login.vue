<template>
  <div class="min-h-screen bg-[#F6F8FB] lg:grid lg:grid-cols-[1.02fr_.98fr]">
    <!-- Brand panel -->
    <aside class="hidden lg:flex relative overflow-hidden bg-navy-950 p-10 xl:p-14 flex-col justify-between">
      <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop" alt="Laboratory" class="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div class="absolute inset-0 navy-mesh"></div>
      <div class="absolute inset-0 brand-grid opacity-[0.08]"></div>
      <div class="relative z-10 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <BrandLogo variant="white" class="h-9" />
          <span class="font-display text-xl font-bold text-white">UniVerse<span class="text-teal-400">.</span></span>
        </NuxtLink>
        <span class="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/60">Members portal</span>
      </div>
      <div class="relative z-10 max-w-md">
        <p class="text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal-300">Welcome back</p>
        <h2 class="mt-3 font-display text-4xl xl:text-5xl font-bold leading-[1.02] text-white">Pick up where<br>you left off.</h2>
        <p class="mt-4 text-sm leading-relaxed text-white/55">Your resources, mentors and next opportunity are already waiting in your workspace.</p>
        <div class="mt-8 space-y-3.5">
          <div class="flex items-center gap-3 text-sm text-white/70"><span class="w-8 h-8 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center"><ShieldCheck class="w-4 h-4 text-teal-300" /></span> A verified MLS community</div>
          <div class="flex items-center gap-3 text-sm text-white/70"><span class="w-8 h-8 rounded-xl bg-brand-400/15 border border-brand-300/20 flex items-center justify-center"><Folder class="w-4 h-4 text-brand-200" /></span> Resources, mentors and career tools</div>
          <div class="flex items-center gap-3 text-sm text-white/70"><span class="w-8 h-8 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center"><Lock class="w-4 h-4 text-teal-300" /></span> Secure sign-in with email verification</div>
        </div>
      </div>
      <div class="relative z-10 rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
        <p class="text-sm leading-relaxed text-white/70">“The Vault and my mentor match changed how I prepared for rotations. Everything I needed was in one place.”</p>
        <div class="mt-3 flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-full bg-teal-400 text-navy-950 flex items-center justify-center text-[10px] font-extrabold">SJ</div>
          <div><p class="text-xs font-bold text-white">Sarah J.</p><p class="text-[10px] text-white/40">400L MLS Student</p></div>
        </div>
      </div>
    </aside>

    <!-- Form panel -->
    <main class="relative flex items-center justify-center p-5 sm:p-8 lg:p-10 min-h-screen">
      <div class="absolute inset-0 brand-grid opacity-50 lg:hidden"></div>
      <div class="relative w-full max-w-[460px]">
        <div class="mb-6 flex items-center justify-center lg:hidden">
          <NuxtLink to="/" class="flex items-center gap-2.5">
            <BrandLogo variant="brand" class="h-8" />
            <span class="font-display text-lg font-bold text-navy-950">UniVerse<span class="text-teal-500">.</span></span>
          </NuxtLink>
        </div>

        <div class="rounded-[2rem] border border-navy-100 bg-white p-6 sm:p-8 shadow-soft">
          <!-- Credentials -->
          <div v-if="step === 'credentials'">
            <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand">Member sign in</p>
            <h2 class="mt-2 font-display text-3xl font-bold text-navy-950">Welcome back.</h2>
            <p class="mt-1.5 text-sm text-navy-500">Enter your details to access your workspace.</p>

            <form @submit.prevent="handleLogin" class="mt-7 space-y-5">
              <UiInput id="email" label="Email address" type="email" v-model="form.email" required placeholder="you@example.com" />
              <div>
                <UiInput id="password" label="Password" type="password" v-model="form.password" required placeholder="••••••••" />
                <div class="mt-2 text-right">
                  <NuxtLink to="/forgot-password" class="text-xs font-bold text-brand hover:text-brand-700">Forgot password?</NuxtLink>
                </div>
              </div>

              <div v-if="error" class="rounded-xl bg-red-50 border border-red-100 p-3.5 text-sm text-red-700 flex items-start gap-2.5">
                <ShieldAlert class="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
                <span>{{ error }}</span>
              </div>

              <UiButton type="submit" :loading="loading" class="w-full !py-3.5">Continue to sign in</UiButton>
            </form>

            <div class="mt-7 pt-5 border-t border-navy-100 text-center">
              <p class="text-sm text-navy-500">Not a member yet? <NuxtLink to="/register" class="font-bold text-brand hover:text-brand-700">Apply now</NuxtLink></p>
            </div>
          </div>

          <!-- OTP -->
          <div v-else-if="step === 'otp'">
            <div class="flex items-start gap-3">
              <button @click="handleBackToCredentials" type="button" class="mt-0.5 w-8 h-8 rounded-full border border-navy-100 text-navy-400 hover:text-brand hover:bg-brand-50 flex items-center justify-center transition-colors" title="Back to login">
                <ArrowLeft class="w-4 h-4" />
              </button>
              <div>
                <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand">Security check</p>
                <h2 class="mt-1 font-display text-2xl font-bold text-navy-950">Enter your code.</h2>
                <p class="mt-1 text-xs text-navy-500">Sent to <span class="font-bold text-navy-800">{{ form.email }}</span></p>
              </div>
            </div>

            <div class="mt-5 rounded-xl bg-brand-50 border border-brand-100 p-3.5 flex gap-2.5">
              <Mail class="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
              <p class="text-[11px] leading-relaxed text-brand-800">Open the 6-digit code in your email. It expires in 10 minutes and can only be used once.</p>
            </div>

            <form @submit.prevent="handleOtpVerify" class="mt-6 space-y-5">
              <div>
                <div class="flex items-center justify-between text-[11px] mb-2.5">
                  <span class="font-extrabold uppercase tracking-[0.1em] text-navy-500">6-digit code</span>
                  <span class="flex items-center gap-1 font-bold" :class="isOtpExpired ? 'text-red-600' : otpTimeRemaining <= 60 ? 'text-amber-600' : 'text-navy-400'">
                    <Clock class="w-3.5 h-3.5" />
                    <span v-if="isOtpExpired">Expired</span><span v-else>{{ formatTime(otpTimeRemaining) }}</span>
                  </span>
                </div>
                <div class="flex justify-between gap-1.5 sm:gap-2">
                  <input
                    v-for="(digit, index) in 6"
                    :key="index"
                    ref="otpInputs"
                    v-model="otpValues[index]"
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    autocomplete="one-time-code"
                    class="w-11 h-12 sm:w-12 sm:h-14 rounded-xl border-2 text-center text-xl font-bold text-navy-950 outline-none transition-all"
                    :class="[otpError ? 'border-red-200 bg-red-50/40' : otpValues[index] ? 'border-brand bg-brand-50' : 'border-navy-100 hover:border-navy-200', 'focus:border-brand focus:ring-4 focus:ring-brand/10']"
                    :disabled="verifying || isOtpExpired"
                    @input="onOtpInput(index, $event)"
                    @keydown="onOtpKeydown(index, $event)"
                    @paste="onOtpPaste($event)"
                  />
                </div>
              </div>

              <div v-if="isOtpExpired" class="rounded-xl bg-amber-50 border border-amber-100 p-3.5 text-xs text-amber-800 flex gap-2.5">
                <Clock class="w-4 h-4 flex-shrink-0" />
                <span>This code has expired. Use “Resend code” to get a new one.</span>
              </div>
              <div v-if="otpError" class="rounded-xl bg-red-50 border border-red-100 p-3.5 text-xs text-red-700 flex gap-2.5">
                <ShieldAlert class="w-4 h-4 flex-shrink-0" />
                <span>{{ otpError }}</span>
              </div>

              <UiButton type="submit" :loading="verifying" :disabled="isOtpExpired || getOtpString().length !== 6" class="w-full !py-3.5">Verify &amp; continue</UiButton>

              <div class="text-center">
                <button type="button" @click="handleResendOtp" :disabled="resendCountdown > 0 || resending" class="inline-flex items-center gap-1.5 text-xs font-bold transition-colors disabled:opacity-50" :class="resendCountdown > 0 ? 'text-navy-300' : 'text-brand hover:text-brand-700'">
                  <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': resending }" />
                  <span v-if="resendCountdown > 0">Resend in {{ resendCountdown }}s</span>
                  <span v-else-if="resending">Sending…</span>
                  <span v-else>Resend code</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <p class="mt-5 text-center text-[11px] text-navy-400">Need help? <a href="mailto:support@medlabconvo.com" class="font-bold text-navy-600 hover:text-brand">support@medlabconvo.com</a></p>
      </div>
    </main>

    <!-- Pending modal -->
    <div v-if="showApprovalModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-soft border border-navy-100">
        <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-5"><Clock class="w-6 h-6" /></div>
        <h3 class="font-display text-2xl font-bold text-navy-950">Account pending approval</h3>
        <p class="mt-2 text-sm leading-relaxed text-navy-500">Your verification document is still under review. We’ll email you as soon as your account is activated.</p>
        <button @click="showApprovalModal = false" class="mt-6 w-full rounded-full bg-navy-950 py-3 text-sm font-bold text-white hover:bg-navy-900 transition-colors">Understood</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useSeoMeta } from '#imports';
import { Lock, Mail, ArrowLeft, Clock, ShieldAlert, RefreshCw, ShieldCheck, Folder } from 'lucide-vue-next';
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
