<template>
  <img
    :src="variant === 'white' ? '/logo-mark-white.png' : '/logo-mark-brand.png'"
    alt="MedLabConvo"
    class="w-auto shrink-0 object-contain select-none"
    draggable="false"
    decoding="async"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'brand' | 'white';
  }>(),
  { variant: 'brand' },
);
</script>
