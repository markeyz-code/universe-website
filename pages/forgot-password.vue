<template>
  <div class="min-h-screen bg-white flex">
    <!-- Image Side (Hidden on mobile) -->
    <div class="hidden lg:block lg:w-1/2 relative bg-gray-100">
      <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop" alt="Laboratory" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-brand/90 flex flex-col justify-between p-12">
        <NuxtLink to="/">
          <img src="~/assets/logo.jpg" class="h-10 w-auto rounded-lg" alt="UniVerse Logo" />
        </NuxtLink>
        <div class="text-white space-y-4 max-w-md">
          <h2 class="text-4xl font-medium leading-tight">Forgot your password?</h2>
          <p class="text-blue-100 font-light">No worries, we'll send you reset instructions.</p>
        </div>
      </div>
    </div>

    <!-- Form Side -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
      <div class="w-full max-w-md">
        <div class="mb-10 lg:hidden text-center">
          <NuxtLink to="/">
            <img src="~/assets/logo-icon.png" class="h-8 w-auto rounded-lg mx-auto mb-2" alt="UniVerse Logo" />
          </NuxtLink>
        </div>
        
        <h2 class="text-3xl font-medium text-gray-900 mb-2">Reset Password</h2>
        <p class="text-gray-500 mb-8">Enter the email associated with your account and we'll send you a link to reset your password.</p>

        <form v-if="!success" @submit.prevent="handleForgotPassword" class="space-y-6">
          <UiInput
            id="email"
            label="Email Address"
            type="email"
            v-model="email"
            required
            placeholder="you@example.com"
          />

          <div v-if="error" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex items-start gap-3 rounded">
            <Mail class="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{{ error }}</span>
          </div>

          <UiButton
            type="submit"
            :loading="loading"
            class="w-full py-3 text-base font-medium"
          >
            Send Reset Link
          </UiButton>
        </form>

        <div v-else class="text-center p-6 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle class="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-green-800 mb-2">Check your email</h3>
          <p class="text-green-700">We've sent password reset instructions to your email address.</p>
        </div>

        <div class="mt-8 text-center pt-6 border-t border-gray-100">
          <p class="text-gray-600 text-sm">
            Remembered your password?
            <NuxtLink to="/login" class="font-medium text-brand hover:underline ml-1">
              Back to login
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';
import { ref } from 'vue';
import { Mail, CheckCircle } from 'lucide-vue-next';
import { authApi } from '@/api_factory/modules/auth';
import UiInput from '@/components/ui/Input.vue';
import UiButton from '@/components/ui/Button.vue';
import { useCustomToast } from '@/composables/core/useCustomToast';

useSeoMeta({
  title: 'Forgot Password - UniVerse',
  description: 'Reset your UniVerse account password.',
})

definePageMeta({ layout: 'empty' });

const email = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);
const { showToast } = useCustomToast();

const handleForgotPassword = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authApi.forgotPassword({ email: email.value, source: 'universe' });
    success.value = true;
    showToast({ title: 'Success', message: 'Reset link sent successfully.', type: 'success' });
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to send reset link. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
