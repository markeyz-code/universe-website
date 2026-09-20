<template>
  <div class="min-h-screen bg-white flex">
    <!-- Image Side (Hidden on mobile) -->
    <div class="hidden lg:block lg:w-1/2 relative bg-gray-100">
      <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop" alt="Laboratory" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-brand/90 flex flex-col justify-between p-12">
        <NuxtLink to="/">
          <img src="~/assets/logo.jpg" class="h-10 w-auto rounded-lg" alt="InternTional Logo" />
        </NuxtLink>
        <div class="text-white space-y-4 max-w-md">
          <h2 class="text-4xl font-medium leading-tight">Welcome back to the intern ecosystem.</h2>
          <p class="text-blue-100 font-light">Access your exclusive resources, connect with mentors, and prepare for your career.</p>
        </div>
      </div>
    </div>

    <!-- Form Side -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
      <div class="w-full max-w-md">
        <div class="mb-10 lg:hidden text-center">
          <NuxtLink to="/">
            <img src="~/assets/logo-icon.png" class="h-8 w-auto mx-auto mb-2" alt="InternTional Logo" />
          </NuxtLink>
        </div>
        
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

          <UiInput
            id="password"
            label="Password"
            type="password"
            v-model="form.password"
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
            Sign In
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';

useSeoMeta({
  title: 'Login - InternTional',
  description: 'Sign in to access your InternTional account and community resources.',
  ogTitle: 'Login - InternTional',
  ogDescription: 'Sign in to access your InternTional account and community resources.',
  ogImage: 'https://images.unsplash.com/photo-1579154204601-52ee6c23b202?q=80&w=2000&auto=format&fit=crop',
  twitterCard: 'summary_large_image',
})

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Lock } from 'lucide-vue-next';
import { useLogin } from '@/composables/modules/auth/useLogin';
import UiInput from '@/components/ui/Input.vue';
import UiButton from '@/components/ui/Button.vue';

definePageMeta({ layout: 'empty' });

const { loading, error, login } = useLogin();
const form = ref({ email: '', password: '' });

const handleLogin = async () => {
  await login(form.value);
};
</script>
