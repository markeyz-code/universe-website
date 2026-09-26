<template>
  <div class="min-h-screen bg-white flex">
    <!-- Image Side (Hidden on mobile) -->
    <div class="hidden lg:block lg:w-1/2 relative bg-gray-100">
      <img src="https://images.unsplash.com/photo-1579154204601-52ee6c23b202?q=80&w=2000&auto=format&fit=crop" alt="Laboratory" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-brand/90 flex flex-col justify-between p-12">
        <NuxtLink to="/">
          <img src="~/assets/logo.jpg" class="h-10 w-auto rounded-lg" alt="UniVerse Logo" />
        </NuxtLink>
        <div class="text-white space-y-4 max-w-md">
          <h2 class="text-4xl font-medium leading-tight">Welcome to the intern ecosystem.</h2>
          <p class="text-blue-100 font-light">Set up your password to activate your account and access exclusive resources.</p>
        </div>
      </div>
    </div>

    <!-- Form Side -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
      <div class="w-full max-w-md">
        <div class="mb-10 lg:hidden text-center">
          <NuxtLink to="/">
            <img src="~/assets/logo-icon.png" class="h-8 w-auto mx-auto mb-2" alt="UniVerse Logo" />
          </NuxtLink>
        </div>
        
        <h2 class="text-3xl font-medium text-gray-900 mb-2">Setup Your Password</h2>
        <p class="text-gray-500 mb-8">Choose a strong password to secure your newly approved account.</p>

        <form v-if="token" @submit.prevent="handleSetup" class="space-y-6">
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

          <div v-if="errorMsg" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex items-start gap-3 rounded">
            <Lock class="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{{ errorMsg }}</span>
          </div>

          <div v-if="apiError" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex items-start gap-3 rounded">
            <Lock class="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{{ apiError }}</span>
          </div>

          <UiButton
            type="submit"
            :loading="loading"
            class="w-full py-3 text-base font-medium"
          >
            Activate Account
          </UiButton>
        </form>

        <div v-else class="text-center p-6 bg-red-50 rounded-lg border border-red-100">
          <p class="text-red-600 font-medium">Invalid or missing setup token. Please check the link sent to your email.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Lock } from 'lucide-vue-next';
import { useSetupPassword } from '@/composables/modules/auth/useSetupPassword';
import UiInput from '@/components/ui/Input.vue';
import UiButton from '@/components/ui/Button.vue';

definePageMeta({ layout: 'empty' });

useSeoMeta({
  title: 'Setup Password - UniVerse',
  description: 'Set up your password to activate your approved UniVerse account.',
})

const route = useRoute();
const token = computed(() => route.query.token as string);

const { loading, error: apiError, setupPassword } = useSetupPassword();
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');

const handleSetup = async () => {
  errorMsg.value = '';
  if (password.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters long.';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.';
    return;
  }
  await setupPassword(token.value, password.value);
};
</script>
