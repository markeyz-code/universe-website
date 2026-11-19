<template>
  <div class="space-y-1">
    <label v-if="label" :for="id" class="block text-sm font-medium text-navy-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <textarea
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        class="block w-full rounded border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-950 placeholder-navy-300 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors disabled:opacity-50 disabled:bg-[#F6F8FB] resize-y"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :rows="rows"
        v-bind="$attrs"
      ></textarea>
    </div>
    <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-navy-400 mt-1">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  label: String,
  placeholder: String,
  required: Boolean,
  disabled: Boolean,
  rows: {
    type: Number,
    default: 4
  },
  error: String,
  hint: String,
});

defineEmits(['update:modelValue']);
</script>
