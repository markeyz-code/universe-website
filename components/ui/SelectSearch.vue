<template>
  <div class="space-y-1" ref="dropdownRef">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <button
        :id="id"
        type="button"
        @click="toggleDropdown"
        class="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors disabled:opacity-50 disabled:bg-gray-50"
        :class="modelValue === '' && placeholder ? 'text-gray-500' : 'text-gray-900'"
        :disabled="disabled"
        v-bind="$attrs"
      >
        <span class="truncate">{{ displayValue || placeholder || 'Select option' }}</span>
        <svg class="size-4 text-gray-500 transition-transform" :class="{'rotate-180': isOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isOpen" class="absolute z-50 mt-1 w-full max-h-72 overflow-hidden flex flex-col rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <div class="p-2 border-b border-gray-100 shrink-0">
             <input type="text" v-model="searchQuery" class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:ring-brand" placeholder="Search..." ref="searchInput" />
          </div>
          <div class="overflow-y-auto overflow-x-hidden flex-1 p-1">
            <div
              v-if="placeholder && !required"
              @click="selectOption('')"
              class="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-brand/5 text-gray-900 rounded"
            >
              <span class="block truncate" :class="modelValue === '' ? 'font-semibold text-brand' : 'font-normal'">{{ placeholder }}</span>
            </div>
            <div v-if="filteredOptions.length === 0" class="py-3 px-3 text-gray-500 text-center text-sm">No results found</div>
            <div
              v-for="option in filteredOptions"
              :key="option.value"
              @click="selectOption(option.value)"
              class="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-brand/5 text-gray-900 rounded"
            >
              <span class="block truncate" :class="modelValue === option.value ? 'font-semibold text-brand' : 'font-normal'">
                {{ option.label }}
              </span>
              <span v-if="modelValue === option.value" class="absolute inset-y-0 right-0 flex items-center pr-4 text-brand">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-gray-500 mt-1">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

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
  placeholder: String,
  options: {
    type: Array as PropType<Array<{ label: string; value: string | number }>>,
    required: true,
  },
  required: Boolean,
  disabled: Boolean,
  error: String,
  hint: String,
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);
const searchQuery = ref('');

const toggleDropdown = async () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      searchQuery.value = '';
      await nextTick();
      if (searchInput.value) {
        searchInput.value.focus();
      }
    }
  }
};

const selectOption = (value: string | number) => {
  emit('update:modelValue', value);
  isOpen.value = false;
};

const displayValue = computed(() => {
  if (props.modelValue === '' && props.placeholder) return '';
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.label : '';
});

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;
  const q = searchQuery.value.toLowerCase();
  return props.options.filter(opt => opt.label.toLowerCase().includes(q));
});

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
