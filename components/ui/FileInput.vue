<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div 
      class="border border-dashed p-6 text-center rounded-lg transition-all"
      :class="[
        isDragging ? 'border-brand bg-brand/5 ring-2 ring-brand/20' : '',
        props.modelValue ? 'border-brand bg-blue-50/30' : 'border-gray-300 hover:border-gray-400 cursor-pointer bg-gray-50'
      ]"
      @click="!props.modelValue && triggerFileInput()"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input 
        ref="fileInput" 
        type="file" 
        @change="handleFileUpload" 
        :accept="accept" 
        class="hidden" 
      />
      
      <!-- Empty State -->
      <div v-if="!props.modelValue">
        <component :is="icon" class="mx-auto h-8 w-8 text-gray-400 mb-2" v-if="icon" />
        <p class="text-sm font-medium text-gray-700">{{ placeholder }}</p>
        <p v-if="hint" class="text-xs text-gray-500 mt-1">{{ hint }}</p>
      </div>

      <!-- File Selected State with Preview -->
      <div v-else class="flex flex-col items-center">
        <!-- Image Preview -->
        <div v-if="previewUrl && isImage" class="mb-4 relative group">
          <img 
            :src="previewUrl" 
            class="max-h-40 rounded-lg shadow-sm border border-gray-200 object-contain mx-auto" 
            alt="Preview" 
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <span class="text-white text-xs font-medium">Click remove to change</span>
          </div>
        </div>

        <!-- PDF Preview -->
        <div v-else-if="isPdf" class="mb-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <svg class="w-8 h-8 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/><path d="M8 12h2v2H8v-2zm0 3h2v2H8v-2zm3-3h2v2h-2v-2zm0 3h2v2h-2v-2zm3-3h2v2h-2v-2z"/></svg>
          <div class="text-left">
            <p class="text-sm font-medium text-gray-900 truncate max-w-[200px]">{{ fileName }}</p>
            <p class="text-xs text-gray-500">{{ fileSize }}</p>
          </div>
        </div>

        <!-- Generic File -->
        <div v-else class="mb-3">
          <component :is="successIcon" class="mx-auto h-8 w-8 text-brand mb-2" v-if="successIcon" />
        </div>

        <p class="text-sm font-medium text-gray-900 truncate max-w-full">{{ fileName }}</p>
        <p class="text-xs text-gray-500 mt-0.5">{{ fileSize }}</p>
        <button 
          type="button" 
          @click.stop="removeFile" 
          class="text-xs text-red-600 hover:text-red-800 hover:underline mt-2 font-medium transition-colors"
        >
          Remove file
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [File, String],
    default: null
  },
  label: String,
  required: Boolean,
  accept: String,
  placeholder: {
    type: String,
    default: 'Click to upload file'
  },
  hint: String,
  icon: Object,
  successIcon: Object
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.[0]) {
    const file = target.files[0];
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    emit('update:modelValue', file);
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    emit('update:modelValue', file);
  }
};

const removeFile = () => {
  emit('update:modelValue', null);
  // Reset file input so same file can be re-selected
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const fileName = computed(() => {
  if (!props.modelValue) return '';
  if (typeof props.modelValue === 'string') return props.modelValue.split('/').pop() || 'File';
  return props.modelValue.name;
});

const fileSize = computed(() => {
  if (!props.modelValue || typeof props.modelValue === 'string') return '';
  const bytes = props.modelValue.size;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
});

const isImage = computed(() => {
  if (!props.modelValue) return false;
  if (typeof props.modelValue === 'string') return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(props.modelValue);
  return props.modelValue.type.startsWith('image/');
});

const isPdf = computed(() => {
  if (!props.modelValue) return false;
  if (typeof props.modelValue === 'string') return /\.pdf$/i.test(props.modelValue);
  return props.modelValue.type === 'application/pdf';
});

const previewUrl = computed(() => {
  if (!props.modelValue) return null;
  if (typeof props.modelValue === 'string') return props.modelValue;
  if (props.modelValue instanceof File && props.modelValue.type.startsWith('image/')) {
    return URL.createObjectURL(props.modelValue);
  }
  return null;
});
</script>
