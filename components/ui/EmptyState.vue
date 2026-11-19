<template>
  <div class="flex flex-col items-center justify-center p-12 text-center border border-navy-100 rounded-lg bg-[#F6F8FB]/50">
    <div class="bg-navy-50 p-4 rounded-full mb-4">
      <component :is="icon" class="size-8 text-navy-300" />
    </div>
    <h3 class="text-lg font-medium text-navy-950 mb-1">{{ title }}</h3>
    <p class="text-sm text-navy-400 max-w-sm">{{ description }}</p>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'No records found.'
  },
  icon: {
    type: Object,
    required: true
  }
});
</script>
