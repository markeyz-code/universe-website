<template>
  <div class="rich-editor-wrapper border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand/30 focus-within:border-brand transition-all bg-white flex flex-col relative" :class="{ 'ring-2 ring-brand/30 border-brand': isFocused, 'fullscreen-editor': isFullscreen }">
    <!-- Toolbar Row 1 -->
    <div class="flex items-center gap-0.5 px-2 pt-2 pb-1 border-b border-gray-100 bg-gray-50/80 flex-wrap relative z-10">
      <!-- Undo / Redo -->
      <button type="button" @click.prevent="format('undo')" :class="tbtn" title="Undo (Ctrl+Z)">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a5 5 0 015 5v2M3 10l4-4m-4 4l4 4"/></svg>
      </button>
      <button type="button" @click.prevent="format('redo')" :class="tbtn" title="Redo (Ctrl+Y)">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10H11a5 5 0 00-5 5v2m15-7l-4-4m4 4l-4 4"/></svg>
      </button>

      <div class="divider"></div>

      <!-- Block Format Dropdown -->
      <div class="relative" ref="blockDropdownRef">
        <button type="button" @click.prevent="showBlockDropdown = !showBlockDropdown" :class="tbtn" class="!px-2 gap-1 min-w-[100px] justify-between" title="Block Format">
          <span class="text-[11px] truncate">{{ currentBlockLabel }}</span>
          <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="showBlockDropdown" class="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg border border-gray-200 py-1 z-50 min-w-[160px]">
          <button v-for="b in blockFormats" :key="b.tag" type="button" @click.prevent="setBlock(b.tag)" class="w-full text-left px-3 py-1.5 hover:bg-brand/5 text-sm transition-colors" :class="b.class">{{ b.label }}</button>
        </div>
      </div>

      <!-- Font Size -->
      <div class="relative" ref="fontSizeDropdownRef">
        <button type="button" @click.prevent="showFontSizeDropdown = !showFontSizeDropdown" :class="tbtn" class="!px-2 gap-1 min-w-[60px] justify-between" title="Font Size">
          <span class="text-[11px]">Size</span>
          <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="showFontSizeDropdown" class="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg border border-gray-200 py-1 z-50 min-w-[100px]">
          <button v-for="s in fontSizes" :key="s.value" type="button" @click.prevent="setFontSize(s.value)" class="w-full text-left px-3 py-1.5 hover:bg-brand/5 transition-colors" :style="{ fontSize: s.preview }">{{ s.label }}</button>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Text Style -->
      <button type="button" @click.prevent="format('bold')" :class="[tbtn, { active: activeStates.bold }]" title="Bold (Ctrl+B)">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
      </button>
      <button type="button" @click.prevent="format('italic')" :class="[tbtn, { active: activeStates.italic }]" title="Italic (Ctrl+I)">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>
      </button>
      <button type="button" @click.prevent="format('underline')" :class="[tbtn, { active: activeStates.underline }]" title="Underline (Ctrl+U)">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>
      </button>
      <button type="button" @click.prevent="format('strikeThrough')" :class="[tbtn, { active: activeStates.strikeThrough }]" title="Strikethrough">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/></svg>
      </button>

      <div class="divider"></div>

      <!-- Text Color -->
      <div class="relative">
        <button type="button" :class="tbtn" class="!p-1" title="Text Color">
          <div class="flex flex-col items-center">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2L5.5 16h2.25l1.12-3h6.25l1.12 3h2.25L13 2h-2zm-1.38 9L12 4.67 14.38 11H9.62z"/></svg>
            <div class="w-4 h-1 rounded-full mt-0.5" :style="{ background: currentTextColor }"></div>
          </div>
          <input type="color" :value="currentTextColor" @input="setTextColor($event)" class="absolute inset-0 opacity-0 cursor-pointer" />
        </button>
      </div>

      <!-- Highlight Color -->
      <div class="relative">
        <button type="button" :class="tbtn" class="!p-1" title="Highlight Color">
          <div class="flex flex-col items-center">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/></svg>
            <div class="w-4 h-1 rounded-full mt-0.5" :style="{ background: currentHighlight }"></div>
          </div>
          <input type="color" :value="currentHighlight" @input="setHighlightColor($event)" class="absolute inset-0 opacity-0 cursor-pointer" />
        </button>
      </div>

      <div class="divider"></div>

      <!-- Superscript / Subscript -->
      <button type="button" @click.prevent="format('superscript')" :class="tbtn" title="Superscript">
        <span class="text-[11px] font-bold">X<sup class="text-[8px]">2</sup></span>
      </button>
      <button type="button" @click.prevent="format('subscript')" :class="tbtn" title="Subscript">
        <span class="text-[11px] font-bold">X<sub class="text-[8px]">2</sub></span>
      </button>
    </div>

    <!-- Toolbar Row 2 -->
    <div class="flex items-center gap-0.5 px-2 py-1 border-b border-gray-200 bg-gray-50/80 flex-wrap relative z-10">
      <!-- Lists -->
      <button type="button" @click.prevent="format('insertUnorderedList')" :class="[tbtn, { active: activeStates.insertUnorderedList }]" title="Bullet List">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
      </button>
      <button type="button" @click.prevent="format('insertOrderedList')" :class="[tbtn, { active: activeStates.insertOrderedList }]" title="Numbered List">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>
      </button>

      <div class="divider"></div>

      <!-- Alignment -->
      <button type="button" @click.prevent="format('justifyLeft')" :class="tbtn" title="Align Left">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
      </button>
      <button type="button" @click.prevent="format('justifyCenter')" :class="tbtn" title="Align Center">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/></svg>
      </button>
      <button type="button" @click.prevent="format('justifyRight')" :class="tbtn" title="Align Right">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/></svg>
      </button>
      <button type="button" @click.prevent="format('justifyFull')" :class="tbtn" title="Justify">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/></svg>
      </button>

      <div class="divider"></div>

      <!-- Indent -->
      <button type="button" @click.prevent="format('indent')" :class="tbtn" title="Increase Indent">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/></svg>
      </button>
      <button type="button" @click.prevent="format('outdent')" :class="tbtn" title="Decrease Indent">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/></svg>
      </button>

      <div class="divider"></div>

      <!-- Blockquote -->
      <button type="button" @click.prevent="format('formatBlock', 'BLOCKQUOTE')" :class="tbtn" title="Blockquote">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
      </button>

      <!-- Code -->
      <button type="button" @click.prevent="insertCode()" :class="tbtn" title="Inline Code">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
      </button>

      <div class="divider"></div>

      <!-- Horizontal Rule -->
      <button type="button" @click.prevent="format('insertHorizontalRule')" :class="tbtn" title="Horizontal Line">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M3 12h18"/></svg>
      </button>

      <!-- Link -->
      <button type="button" @click.prevent="insertLink()" :class="tbtn" title="Insert Link">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
      </button>

      <!-- Image -->
      <button type="button" @click.prevent="triggerImageUpload()" :class="tbtn" title="Insert Image">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </button>

      <!-- Table -->
      <button type="button" @click.prevent="insertTable()" :class="tbtn" title="Insert Table">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M10 3v18M14 3v18M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z"/></svg>
      </button>

      <div class="divider"></div>

      <!-- Clear Formatting -->
      <button type="button" @click.prevent="format('removeFormat')" :class="tbtn" title="Clear Formatting">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
      </button>

      <!-- Fullscreen -->
      <button type="button" @click.prevent="toggleFullscreen()" :class="tbtn" class="ml-auto" :title="isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'">
        <svg v-if="!isFullscreen" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/></svg>
      </button>

      <!-- Word Count -->
      <span class="text-[10px] text-gray-400 ml-2 tabular-nums">{{ wordCount }} words</span>
    </div>

    <!-- Hidden image input -->
    <input ref="imageInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />

    <!-- Floating Exit Fullscreen Button -->
    <button v-if="isFullscreen" type="button" @click.prevent="toggleFullscreen()" class="fixed top-6 right-6 z-[10000] bg-gray-900 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 hover:bg-gray-800 transition-all font-medium text-sm border border-gray-700">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/></svg>
      Exit Fullscreen
    </button>

    <!-- Editor Area -->
    <div
      ref="editor"
      contenteditable="true"
      class="rich-editor-content p-4 outline-none text-sm text-gray-800 overflow-y-auto"
      :class="isFullscreen ? 'flex-1' : 'min-h-[250px] max-h-[600px]'"
      :data-placeholder="placeholder"
      @input="handleInput"
      @blur="handleBlur"
      @focus="isFocused = true"
      @keydown="handleKeydown"
      @paste="handlePaste"
    ></div>

    <!-- Status Bar -->
    <div class="flex items-center justify-between px-3 py-1 border-t border-gray-100 bg-gray-50/50 text-[10px] text-gray-400">
      <span>Rich Text Editor</span>
      <span>{{ charCount }} characters</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed, reactive } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Write your content here...' }
});
const emit = defineEmits(['update:modelValue']);

const editor = ref<HTMLElement | null>(null);
const imageInput = ref<HTMLInputElement | null>(null);
const blockDropdownRef = ref<HTMLElement | null>(null);
const fontSizeDropdownRef = ref<HTMLElement | null>(null);
const isFocused = ref(false);
const isFullscreen = ref(false);
const showBlockDropdown = ref(false);
const showFontSizeDropdown = ref(false);
const currentTextColor = ref('#000000');
const currentHighlight = ref('#FFFF00');
let isInternalChange = false;

const tbtn = 'p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors inline-flex items-center cursor-pointer';

const blockFormats = [
  { tag: 'P', label: 'Paragraph', class: 'text-sm' },
  { tag: 'H1', label: 'Heading 1', class: 'text-xl font-bold' },
  { tag: 'H2', label: 'Heading 2', class: 'text-lg font-bold' },
  { tag: 'H3', label: 'Heading 3', class: 'text-base font-semibold' },
  { tag: 'H4', label: 'Heading 4', class: 'text-sm font-semibold' },
  { tag: 'PRE', label: 'Code Block', class: 'text-sm font-mono' },
];

const fontSizes = [
  { label: 'Tiny', value: '1', preview: '10px' },
  { label: 'Small', value: '2', preview: '12px' },
  { label: 'Normal', value: '3', preview: '14px' },
  { label: 'Medium', value: '4', preview: '16px' },
  { label: 'Large', value: '5', preview: '20px' },
  { label: 'Huge', value: '6', preview: '24px' },
  { label: 'Maximum', value: '7', preview: '32px' },
];

const currentBlockLabel = ref('Paragraph');
const activeStates = reactive({
  bold: false,
  italic: false,
  underline: false,
  strikeThrough: false,
  insertUnorderedList: false,
  insertOrderedList: false,
});

const wordCount = computed(() => {
  if (!editor.value) return 0;
  const text = editor.value.innerText || '';
  return text.trim() ? text.trim().split(/\s+/).length : 0;
});

const charCount = computed(() => {
  if (!editor.value) return 0;
  return (editor.value.innerText || '').length;
});

onMounted(() => {
  if (editor.value && props.modelValue) {
    editor.value.innerHTML = props.modelValue;
  }
  document.addEventListener('selectionchange', updateActiveStates);
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('selectionchange', updateActiveStates);
  document.removeEventListener('click', handleOutsideClick);
});

const handleOutsideClick = (e: MouseEvent) => {
  if (blockDropdownRef.value && !blockDropdownRef.value.contains(e.target as Node)) {
    showBlockDropdown.value = false;
  }
  if (fontSizeDropdownRef.value && !fontSizeDropdownRef.value.contains(e.target as Node)) {
    showFontSizeDropdown.value = false;
  }
};

const updateActiveStates = () => {
  if (!editor.value?.contains(document.activeElement) && document.activeElement !== editor.value) return;
  try {
    activeStates.bold = document.queryCommandState('bold');
    activeStates.italic = document.queryCommandState('italic');
    activeStates.underline = document.queryCommandState('underline');
    activeStates.strikeThrough = document.queryCommandState('strikeThrough');
    activeStates.insertUnorderedList = document.queryCommandState('insertUnorderedList');
    activeStates.insertOrderedList = document.queryCommandState('insertOrderedList');

    const block = document.queryCommandValue('formatBlock');
    const found = blockFormats.find(b => b.tag.toLowerCase() === block.toLowerCase());
    currentBlockLabel.value = found ? found.label : 'Paragraph';
  } catch (e) { /* ignore */ }
};

watch(() => props.modelValue, (val) => {
  if (isInternalChange) {
    isInternalChange = false;
    return;
  }
  if (editor.value && val !== editor.value.innerHTML) {
    editor.value.innerHTML = val || '';
  }
});

const handleInput = () => {
  if (!editor.value) return;
  isInternalChange = true;
  emit('update:modelValue', editor.value.innerHTML);
};

const handleBlur = () => {
  isFocused.value = false;
  handleInput();
};

const format = (command: string, value?: string) => {
  document.execCommand(command, false, value);
  if (editor.value) editor.value.focus();
  handleInput();
  updateActiveStates();
};

const setBlock = (tag: string) => {
  format('formatBlock', tag);
  showBlockDropdown.value = false;
};

const setFontSize = (size: string) => {
  format('fontSize', size);
  showFontSizeDropdown.value = false;
};

const setTextColor = (e: Event) => {
  const color = (e.target as HTMLInputElement).value;
  currentTextColor.value = color;
  format('foreColor', color);
};

const setHighlightColor = (e: Event) => {
  const color = (e.target as HTMLInputElement).value;
  currentHighlight.value = color;
  format('hiliteColor', color);
};

const insertLink = () => {
  const url = prompt('Enter URL:');
  if (url) {
    format('createLink', url);
  }
};

const insertCode = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const code = document.createElement('code');
    code.style.cssText = 'background:#f3f4f6;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em;color:#e11d48';
    try {
      range.surroundContents(code);
    } catch {
      code.textContent = selection.toString();
      range.deleteContents();
      range.insertNode(code);
    }
    handleInput();
  }
};

const insertTable = () => {
  const rows = parseInt(prompt('Number of rows:', '3') || '0');
  const cols = parseInt(prompt('Number of columns:', '3') || '0');
  if (!rows || !cols) return;

  let html = '<table style="width:100%;border-collapse:collapse;margin:8px 0">';
  for (let r = 0; r < rows; r++) {
    html += '<tr>';
    for (let c = 0; c < cols; c++) {
      const tag = r === 0 ? 'th' : 'td';
      const style = 'border:1px solid #d1d5db;padding:8px 12px;text-align:left;' + (r === 0 ? 'background:#f9fafb;font-weight:600;' : '');
      html += `<${tag} style="${style}">${r === 0 ? 'Header' : 'Cell'}</${tag}>`;
    }
    html += '</tr>';
  }
  html += '</table><p><br></p>';
  document.execCommand('insertHTML', false, html);
  handleInput();
};

const triggerImageUpload = () => {
  imageInput.value?.click();
};

const handleImageUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = `<img src="${reader.result}" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0;display:block" alt="${file.name}" />`;
    editor.value?.focus();
    document.execCommand('insertHTML', false, img + '<p><br></p>');
    handleInput();
  };
  reader.readAsDataURL(file);
  if (imageInput.value) imageInput.value.value = '';
};

const handlePaste = (e: ClipboardEvent) => {
  const items = e.clipboardData?.items;
  if (!items) return;
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      e.preventDefault();
      const file = item.getAsFile();
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = `<img src="${reader.result}" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0;display:block" />`;
        document.execCommand('insertHTML', false, img);
        handleInput();
      };
      reader.readAsDataURL(file);
      return;
    }
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
    handleInput();
  } else if (e.key === 'Escape' && isFullscreen.value) {
    e.preventDefault();
    isFullscreen.value = false;
  }
};

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};
</script>

<style scoped>
.rich-editor-wrapper {
  position: relative;
}

.rich-editor-wrapper.fullscreen-editor {
  position: fixed;
  inset: 0;
  z-index: 9999;
  border-radius: 0;
  border: none;
}

.divider {
  width: 1px;
  height: 20px;
  background: #e5e7eb;
  margin: 0 2px;
}

.active {
  background: #e0f2fe !important;
  color: #0284c7 !important;
}
</style>

<style>
/* Rich Editor Content Styles */
.rich-editor-content:empty::before {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
  display: block;
}

.rich-editor-content h1 {
  font-size: 1.75em;
  font-weight: 700;
  line-height: 1.3;
  margin: 0.6em 0 0.3em;
  color: #111827;
}

.rich-editor-content h2 {
  font-size: 1.4em;
  font-weight: 700;
  line-height: 1.35;
  margin: 0.5em 0 0.25em;
  color: #1f2937;
}

.rich-editor-content h3 {
  font-size: 1.15em;
  font-weight: 600;
  line-height: 1.4;
  margin: 0.4em 0 0.2em;
  color: #374151;
}

.rich-editor-content h4 {
  font-size: 1em;
  font-weight: 600;
  margin: 0.3em 0 0.15em;
  color: #4b5563;
}

.rich-editor-content p {
  margin: 0.25em 0;
  line-height: 1.7;
}

.rich-editor-content ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin: 0.4em 0;
}

.rich-editor-content ol {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin: 0.4em 0;
}

.rich-editor-content li {
  margin: 0.15em 0;
  line-height: 1.6;
}

.rich-editor-content blockquote {
  border-left: 4px solid #60a5fa;
  padding: 0.5em 1em;
  margin: 0.5em 0;
  background: #eff6ff;
  border-radius: 0 8px 8px 0;
  color: #1e40af;
  font-style: italic;
}

.rich-editor-content pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 8px;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.85em;
  overflow-x: auto;
  margin: 0.5em 0;
  line-height: 1.6;
}

.rich-editor-content code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
  color: #e11d48;
}

.rich-editor-content a {
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
}

.rich-editor-content a:hover {
  color: #1d4ed8;
}

.rich-editor-content hr {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 1em 0;
}

.rich-editor-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 8px 0;
  display: block;
}

.rich-editor-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
}

.rich-editor-content th,
.rich-editor-content td {
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  text-align: left;
}

.rich-editor-content th {
  background: #f9fafb;
  font-weight: 600;
}

.rich-editor-content sup {
  vertical-align: super;
  font-size: 0.75em;
}

.rich-editor-content sub {
  vertical-align: sub;
  font-size: 0.75em;
}
</style>
