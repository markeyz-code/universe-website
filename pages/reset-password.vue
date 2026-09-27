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
          <h2 class="text-4xl font-medium leading-tight">Create a new password.</h2>
          <p class="text-blue-100 font-light">Make sure it's secure and something you can remember.</p>
        </div>
      </div>
    </div>

    <!-- Form Side -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12">
      <div class="w-full max-w-md">
        <div class="mb-10 lg:hidden text-center">
          <NuxtLink to="/">
            <img src="~/assets/logo-icon.png" class="h-8 w-auto rounded-lg mx-auto mb-2" alt="UniVerse Logo" />
          </NuxtLink>
        </div>
        
        <h2 class="text-3xl font-medium text-gray-900 mb-2">Set New Password</h2>
        <p class="text-gray-500 mb-8">Enter your new password below.</p>

        <div v-if="!token" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex items-start gap-3 rounded">
          <Lock class="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>Invalid or missing reset token. Please request a new password reset link.</span>
        </div>

        <form v-else-if="!success" @submit.prevent="handleResetPassword" class="space-y-6">
          <UiInput
            id="password"
            label="New Password"
            type="password"
            v-model="password"
            required
            placeholder="••••••••"
          />

          <UiInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            v-model="confirmPassword"
            required
            placeholder="••••••••"
          />

          <div v-if="error" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex items-start gap-3 rounded">
            <Lock class="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{{ error }}</span>
          </div>

          <UiButton
            type="submit"
            :loading="loading"
            class="w-full py-3 text-base font-medium"
          >
            Reset Password
          </UiButton>
        </form>

        <div v-else class="text-center p-6 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle class="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-green-800 mb-2">Password Reset Successful</h3>
          <p class="text-green-700 mb-6">Your password has been successfully reset. You can now log in with your new password.</p>
          <NuxtLink to="/login" class="inline-block w-full py-3 px-4 bg-brand text-white font-medium rounded-lg hover:bg-brand/90 transition-colors">
            Log In Now
          </NuxtLink>
        </div>

        <div v-if="!success" class="mt-8 text-center pt-6 border-t border-gray-100">
          <p class="text-gray-600 text-sm">
            <NuxtLink to="/login" class="font-medium text-brand hover:underline">
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Lock, CheckCircle } from 'lucide-vue-next';
import { authApi } from '@/api_factory/modules/auth';
import UiInput from '@/components/ui/Input.vue';
import UiButton from '@/components/ui/Button.vue';
import { useCustomToast } from '@/composables/core/useCustomToast';

useSeoMeta({
  title: 'Reset Password - UniVerse',
  description: 'Set a new password for your UniVerse account.',
})

definePageMeta({ layout: 'empty' });

const route = useRoute();
const router = useRouter();
const token = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);
const { showToast } = useCustomToast();

onMounted(() => {
  if (route.query.token) {
    token.value = route.query.token as string;
  }
});

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters long.';
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    await authApi.resetPassword({ token: token.value, password: password.value });
    success.value = true;
    showToast({ title: 'Success', message: 'Password reset successfully.', type: 'success' });
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to reset password. The link may have expired.';
  } finally {
    loading.value = false;
  }
};
</script>
