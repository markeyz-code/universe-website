<template>
  <div class="space-y-1">
    <label v-if="label" :for="id" class="block text-[11px] font-extrabold uppercase tracking-[0.1em] text-navy-600">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="block w-full rounded-xl border border-navy-100 bg-[#FBFCFE] px-4 py-3 text-[14px] text-navy-950 placeholder-navy-300 focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10 transition-all disabled:opacity-50 disabled:bg-[#F6F8FB]"
        :class="type === 'password' ? 'pr-10' : ''"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        v-bind="$attrs"
      />
      <button 
        v-if="type === 'password'" 
        type="button"
        @click="isPasswordVisible = !isPasswordVisible"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-navy-300 hover:text-navy-500 focus:outline-none"
      >
        <EyeOff v-if="!isPasswordVisible" class="w-5 h-5" />
        <Eye v-else class="w-5 h-5" />
      </button>
    </div>
    <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-navy-400 mt-1">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  required: Boolean,
  disabled: Boolean,
  error: String,
  hint: String,
});

defineEmits(['update:modelValue']);

const isPasswordVisible = ref(false);
const inputType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password';
  }
  return props.type;
});
</script>
