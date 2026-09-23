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
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto max-h-screen">
      <div class="w-full max-w-xl">
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

          <form @submit.prevent="handleRegister" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <UiInput id="firstName" label="First Name" v-model="form.firstName" required placeholder="Jane" />
              <UiInput id="lastName" label="Last Name" v-model="form.lastName" required placeholder="Doe" />
            </div>

            <UiInput id="email" label="Email Address" type="email" v-model="form.email" required placeholder="jane.doe@example.com" />
            <UiInput id="password" label="Password" type="password" v-model="form.password" required minlength="8" placeholder="Minimum 8 characters" />

            <div class="pt-2">
              <UiFileInput
                v-model="form.file"
                label="Verification Document"
                required
                accept="image/*,.pdf"
                placeholder="Upload Posting Letter or Lab ID"
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

            <div v-if="error" class="text-red-700 text-sm p-4 bg-red-50 border border-red-200 flex items-start gap-3 rounded">
              <Lock class="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{{ error }}</span>
            </div>

            <UiButton
              type="submit"
              :loading="loading"
              class="w-full py-3 text-base font-medium mt-4"
            >
              Submit Application
            </UiButton>
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

import { ref } from 'vue';
import { ArrowRight, UploadCloud, CheckCircle2, Lock } from 'lucide-vue-next';
import { useRegister } from '@/composables/modules/auth/useRegister';
import UiInput from '@/components/ui/Input.vue';
import UiButton from '@/components/ui/Button.vue';
import UiFileInput from '@/components/ui/FileInput.vue';

definePageMeta({ layout: 'empty' });

const { loading, uploadProgress, error, register } = useRegister();
const form = ref({ firstName: '', lastName: '', email: '', password: '', file: null as File | null });
const success = ref(false);

const handleRegister = async () => {
  if (!form.value.file) {
    error.value = 'Please upload a verification document to proceed.';
    return;
  }
  const result = await register({
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    password: form.value.password,
    file: form.value.file,
  });
  if (result) success.value = true;
};
</script>
