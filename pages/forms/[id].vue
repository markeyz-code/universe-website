<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand/5 font-sans pt-28 pb-20">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32">
      <div class="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin mb-4"></div>
      <p class="text-gray-500 text-sm">Loading form...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-lg mx-auto text-center px-6 py-32">
      <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Form Not Found</h2>
      <p class="text-gray-500 mb-8">This form may have been removed, closed, or the link is incorrect.</p>
      <NuxtLink to="/" class="px-6 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand/90 transition-colors shadow-sm">
        ← Back to Home
      </NuxtLink>
    </div>

    <!-- Form Content -->
    <div v-else-if="form" class="max-w-3xl mx-auto px-4 sm:px-6">
      <!-- Form Header -->
      <div class="text-center mb-10">
        <!-- Cover Image -->
        <div v-if="form.coverImage" class="mb-8 rounded-2xl overflow-hidden shadow-lg max-h-64">
          <img :src="form.coverImage" :alt="form.title" class="w-full h-full object-cover" />
        </div>

        <!-- Type Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          :class="formTypeBadge(form.type)">
          {{ formTypeIcon(form.type) }} {{ form.type?.replace(/-/g, ' ') }}
        </div>

        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">{{ form.title }}</h1>
        <p v-if="form.description" class="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">{{ form.description }}</p>

        <!-- Deadline Warning -->
        <div v-if="form.deadline" class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm font-medium text-amber-800">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Deadline: {{ new Date(form.deadline).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
        </div>

        <!-- Closed Banner -->
        <div v-if="form.status !== 'active'" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium text-sm">
          ⚠️ This form is currently <strong>{{ form.status }}</strong> and is not accepting submissions.
        </div>
      </div>

      <!-- Form Fields -->
      <div v-if="form.status === 'active' && !submitted" class="bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-100/50 p-6 sm:p-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Submitter Info (always required) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-6 border-b border-gray-100">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name <span class="text-red-500">*</span></label>
              <input v-model="submitterName" required type="text" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white" placeholder="Enter your full name" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address <span class="text-red-500">*</span></label>
              <input v-model="submitterEmail" required type="email" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white" placeholder="you@example.com" />
            </div>
          </div>

          <!-- Dynamic Fields -->
          <div v-for="(field, idx) in form.fields" :key="idx" class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <p v-if="field.helpText" class="text-xs text-gray-400 -mt-1">{{ field.helpText }}</p>

            <!-- Text -->
            <input v-if="field.type === 'text'" v-model="formValues[field.label]" :required="field.required" :placeholder="field.placeholder" type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white" />

            <!-- Email -->
            <input v-else-if="field.type === 'email'" v-model="formValues[field.label]" :required="field.required" :placeholder="field.placeholder" type="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white" />

            <!-- Phone -->
            <input v-else-if="field.type === 'phone'" v-model="formValues[field.label]" :required="field.required" :placeholder="field.placeholder" type="tel"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white" />

            <!-- Number -->
            <input v-else-if="field.type === 'number'" v-model.number="formValues[field.label]" :required="field.required" :placeholder="field.placeholder" type="number"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white" />

            <!-- Date -->
            <input v-else-if="field.type === 'date'" v-model="formValues[field.label]" :required="field.required" type="date"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white" />

            <!-- URL -->
            <input v-else-if="field.type === 'url'" v-model="formValues[field.label]" :required="field.required" :placeholder="field.placeholder || 'https://...'" type="url"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white" />

            <!-- Textarea -->
            <textarea v-else-if="field.type === 'textarea'" v-model="formValues[field.label]" :required="field.required" :placeholder="field.placeholder" rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white resize-y"></textarea>

            <!-- Rich Text (rendered as textarea for public form) -->
            <textarea v-else-if="field.type === 'rich-text'" v-model="formValues[field.label]" :required="field.required" :placeholder="field.placeholder" rows="8"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white resize-y font-mono"></textarea>

            <!-- Select / Dropdown -->
            <UiSelect v-else-if="field.type === 'select'"
              :id="`select-${idx}`"
              v-model="formValues[field.label]"
              :required="field.required"
              :placeholder="field.placeholder || 'Select an option'"
              :options="field.options.map((opt: string) => ({ label: opt, value: opt }))"
              inputClass="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition-all bg-gray-50 focus:bg-white"
            />

            <!-- Radio -->
            <div v-else-if="field.type === 'radio'" class="space-y-2 pt-1">
              <label v-for="opt in field.options" :key="opt" class="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:border-brand/40 hover:bg-brand/5 transition-all cursor-pointer"
                :class="{ 'border-brand bg-brand/5 ring-1 ring-brand/20': formValues[field.label] === opt }">
                <input type="radio" v-model="formValues[field.label]" :value="opt" :name="`field-${idx}`" :required="field.required"
                  class="text-brand focus:ring-brand" />
                <span class="text-sm text-gray-700 font-medium">{{ opt }}</span>
              </label>
            </div>

            <!-- Checkbox -->
            <div v-else-if="field.type === 'checkbox'" class="space-y-2 pt-1">
              <label v-for="opt in field.options" :key="opt" class="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:border-brand/40 hover:bg-brand/5 transition-all cursor-pointer"
                :class="{ 'border-brand bg-brand/5 ring-1 ring-brand/20': (formValues[field.label] || []).includes(opt) }">
                <input type="checkbox" :value="opt" @change="toggleCheckbox(field.label, opt)" :checked="(formValues[field.label] || []).includes(opt)"
                  class="rounded text-brand focus:ring-brand" />
                <span class="text-sm text-gray-700 font-medium">{{ opt }}</span>
              </label>
            </div>

            <!-- File Upload -->
            <div v-else-if="field.type === 'file'" class="relative">
              <div class="border-2 border-dashed border-gray-300 rounded-xl px-4 py-8 text-center hover:border-brand/50 hover:bg-brand/5 transition-all cursor-pointer"
                @click="($refs[`file-${idx}`] as HTMLInputElement[])?.[0]?.click()">
                <svg class="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p class="text-sm font-medium text-gray-600" v-if="!fileNames[field.label]">Click to upload or drag and drop</p>
                <p class="text-sm font-medium text-brand" v-else>{{ fileNames[field.label] }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ field.accept || 'Any file' }} {{ field.maxFileSize ? `• Max ${field.maxFileSize}MB` : '' }}</p>
              </div>
              <input :ref="`file-${idx}`" type="file" :accept="field.accept" :required="field.required" class="hidden"
                @change="handleFileChange(field, $event)" />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button type="submit" :disabled="submitting" class="w-full py-4 bg-brand text-white rounded-xl font-bold text-base hover:bg-[#1a405c] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 active:translate-y-0">
              <span v-if="submitting" class="inline-flex items-center gap-2">
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Submitting...
              </span>
              <span v-else>Submit Response →</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Success State -->
      <div v-else-if="submitted" class="text-center py-16">
        <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-once">
          <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Submission Received! 🎉</h2>
        <p class="text-gray-500 text-base max-w-md mx-auto leading-relaxed">{{ form.successMessage || 'Thank you for your submission. We will review and get back to you.' }}</p>
        <div class="mt-8">
          <NuxtLink to="/" class="px-6 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand/90 transition-colors shadow-sm inline-flex items-center gap-2">
            ← Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSeoMeta } from '#imports';
import { formsApi } from '@/api_factory/modules/forms';
import { useCustomModal } from '@/composables/core/useCustomModal';
import UiSelect from '@/components/ui/Select.vue';

definePageMeta({ layout: false });

const { alert: modalAlert } = useCustomModal();

const route = useRoute();
const loading = ref(true);
const error = ref(false);
const form = ref<any>(null);
const submitting = ref(false);
const submitted = ref(false);

const submitterName = ref('');
const submitterEmail = ref('');
const formValues = ref<Record<string, any>>({});
const fileNames = ref<Record<string, string>>({});

// Extract form ID from the route param (format: slug-id or just id)
const getFormId = () => {
  const param = route.params.id as string;
  if (!param) return null;
  // Try to extract MongoDB ObjectId (24 hex chars) from end of slug
  const match = param.match(/([a-f0-9]{24})$/i);
  if (match) return match[1];
  return param; // fallback: treat whole param as ID
};

const fetchForm = async () => {
  const formId = getFormId();
  if (!formId) { error.value = true; loading.value = false; return; }

  try {
    const res = await formsApi.getForm(formId);
    form.value = res.data;
    if (!form.value) { error.value = true; }
    else {
      useSeoMeta({
        title: `${form.value.title} | UniVerse`,
        description: form.value.description || 'Submit your response',
      });
      // Initialize form values
      (form.value.fields || []).forEach((f: any) => {
        if (f.type === 'checkbox') formValues.value[f.label] = [];
        else if (f.type === 'select') formValues.value[f.label] = '';
        else formValues.value[f.label] = '';
      });
    }
  } catch (e) {
    console.error(e);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const toggleCheckbox = (label: string, value: string) => {
  if (!formValues.value[label]) formValues.value[label] = [];
  const arr = formValues.value[label] as string[];
  const idx = arr.indexOf(value);
  if (idx > -1) arr.splice(idx, 1);
  else arr.push(value);
};

const handleFileChange = (field: any, event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (field.maxFileSize && file.size > field.maxFileSize * 1024 * 1024) {
    modalAlert({
      title: 'File Too Large',
      message: `File is too large. Maximum size is ${field.maxFileSize}MB.`,
      type: 'warning',
    });
    input.value = '';
    return;
  }

  fileNames.value[field.label] = file.name;
  formValues.value[field.label] = `[File: ${file.name}]`;
};

const handleSubmit = async () => {
  if (!submitterName.value || !submitterEmail.value) return;
  submitting.value = true;

  try {
    await formsApi.submitForm(form.value._id, {
      submitterName: submitterName.value,
      submitterEmail: submitterEmail.value,
      data: { ...formValues.value },
    });
    submitted.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e: any) {
    const msg = e?.response?.data?.message || e?.message || 'Submission failed. Please try again.';
    await modalAlert({
      title: 'Submission Failed',
      message: msg,
      type: 'danger',
    });
  } finally {
    submitting.value = false;
  }
};

const formTypeBadge = (type: string) => {
  const map: Record<string, string> = {
    'call-for-papers': 'bg-purple-100 text-purple-700',
    'article-submission': 'bg-blue-100 text-blue-700',
    'comic-strip-contest': 'bg-pink-100 text-pink-700',
    'abstract-submission': 'bg-teal-100 text-teal-700',
    'registration': 'bg-green-100 text-green-700',
    'survey': 'bg-yellow-100 text-yellow-700',
    'feedback': 'bg-orange-100 text-orange-700',
    'custom': 'bg-gray-100 text-gray-700',
  };
  return map[type] || 'bg-gray-100 text-gray-700';
};

const formTypeIcon = (type: string) => {
  const map: Record<string, string> = {
    'call-for-papers': '📄',
    'article-submission': '📝',
    'comic-strip-contest': '🎨',
    'abstract-submission': '🔬',
    'registration': '📋',
    'survey': '📊',
    'feedback': '💬',
    'custom': '📌',
  };
  return map[type] || '📌';
};

onMounted(fetchForm);
</script>

<style scoped>
@keyframes bounce-once {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-once {
  animation: bounce-once 0.6s ease-in-out;
}
</style>
