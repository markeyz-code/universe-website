<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all focus:outline-none focus:ring-4 focus:ring-brand/15 disabled:opacity-50 disabled:pointer-events-none',
      variantStyles[variant],
      sizeStyles[size]
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <Loader2 v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from 'lucide-vue-next';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const variantStyles: Record<string, string> = {
  primary: 'bg-gradient-to-r from-brand to-brand-700 text-white shadow-lg shadow-brand/20 hover:from-brand-700 hover:to-brand-800',
  secondary: 'bg-navy-50 text-navy-900 hover:bg-navy-100',
  outline: 'border border-navy-200 bg-white text-navy-800 hover:bg-navy-50',
  ghost: 'bg-transparent text-navy-700 hover:bg-navy-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizeStyles: Record<string, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-5 py-3',
  lg: 'text-base px-7 py-3.5',
};
</script>
