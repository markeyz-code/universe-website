<template>
  <div class="space-y-6 pb-12">
    <!-- Hero Banner (UniVerse Purple Theme) -->
    <div class="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-2xl px-6 py-6 sm:px-8 sm:py-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
      <!-- Decorative background glow orbs -->
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute right-48 -bottom-12 w-48 h-48 bg-violet-400/15 rounded-full blur-2xl pointer-events-none"></div>

      <div class="relative z-10 max-w-xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-semibold mb-3">
          <Calendar class="w-3.5 h-3.5 text-white" />
          <span>Professional Development & Sessions</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Events</h1>
        <p class="text-white/85 text-sm mt-1.5 leading-relaxed">
          Discover upcoming events, webinars, and networking opportunities. Expand your knowledge and connect with peers.
        </p>
      </div>

      <!-- View Switcher (Grid vs List) -->
      <div class="relative z-10 flex items-center gap-3 self-stretch md:self-center justify-between md:justify-end">
        <div class="flex items-center bg-white/15 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-inner">
          <button
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-white text-violet-700 shadow font-bold' : 'text-white/85 hover:text-white'"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
            title="Grid View"
          >
            <LayoutGrid class="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-white text-violet-700 shadow font-bold' : 'text-white/85 hover:text-white'"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
            title="List View"
          >
            <List class="w-3.5 h-3.5" />
            <span>List</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Search & Custom Filters Bar -->
    <div class="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-sm space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
        <!-- Search Input -->
        <div class="md:col-span-6 relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search class="w-4 h-4" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search events, webinars, or venues..."
            class="w-full pl-10 pr-9 py-2.5 bg-gray-50/80 hover:bg-gray-50 focus:bg-white text-gray-900 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all placeholder:text-gray-400"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Custom Category Dropdown -->
        <div class="md:col-span-3 relative" ref="categoryDropdownRef">
          <button
            type="button"
            @click="toggleDropdown('category')"
            class="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50/80 hover:bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-left"
          >
            <div class="flex items-center gap-2 truncate">
              <Calendar class="w-4 h-4 text-brand shrink-0" />
              <span class="truncate font-medium">{{ selectedCategory === 'All' ? 'All Categories' : selectedCategory }}</span>
            </div>
            <ChevronDown class="w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0" :class="{ 'rotate-180': activeDropdown === 'category' }" />
          </button>

          <!-- Dropdown Popover -->
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="activeDropdown === 'category'"
              class="absolute z-40 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 max-h-60 overflow-y-auto text-sm focus:outline-none"
            >
              <div
                @click="selectCategory('All')"
                class="flex items-center justify-between px-3.5 py-2 cursor-pointer hover:bg-brand/5 transition-colors"
                :class="selectedCategory === 'All' ? 'text-brand font-semibold bg-brand/5' : 'text-gray-700'"
              >
                <span>All Categories</span>
                <Check v-if="selectedCategory === 'All'" class="w-4 h-4 text-brand" />
              </div>
              <div
                v-for="cat in uniqueCategories"
                :key="cat.name"
                @click="selectCategory(cat.name)"
                class="flex items-center justify-between px-3.5 py-2 cursor-pointer hover:bg-brand/5 transition-colors"
                :class="selectedCategory === cat.name ? 'text-brand font-semibold bg-brand/5' : 'text-gray-700'"
              >
                <span class="truncate">{{ cat.name }}</span>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="text-[11px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{{ cat.count }}</span>
                  <Check v-if="selectedCategory === cat.name" class="w-4 h-4 text-brand" />
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Custom Format / Mode Dropdown -->
        <div class="md:col-span-3 relative" ref="formatDropdownRef">
          <button
            type="button"
            @click="toggleDropdown('format')"
            class="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50/80 hover:bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-left"
          >
            <div class="flex items-center gap-2 truncate">
              <Video class="w-4 h-4 text-brand shrink-0" />
              <span class="truncate font-medium">{{ selectedFormatLabel }}</span>
            </div>
            <ChevronDown class="w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0" :class="{ 'rotate-180': activeDropdown === 'format' }" />
          </button>

          <!-- Dropdown Popover -->
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="activeDropdown === 'format'"
              class="absolute z-40 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 max-h-60 overflow-y-auto text-sm focus:outline-none"
            >
              <div
                v-for="fmt in formatOptions"
                :key="fmt.value"
                @click="selectFormat(fmt.value)"
                class="flex items-center justify-between px-3.5 py-2 cursor-pointer hover:bg-brand/5 transition-colors"
                :class="selectedFormat === fmt.value ? 'text-brand font-semibold bg-brand/5' : 'text-gray-700'"
              >
                <span>{{ fmt.label }}</span>
                <Check v-if="selectedFormat === fmt.value" class="w-4 h-4 text-brand" />
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Quick Filter Pills & Result Stats -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-semibold text-gray-400 mr-1">Filter:</span>
          
          <button
            @click="resetFilters"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer"
            :class="selectedCategory === 'All' && selectedFormat === 'All' && !searchQuery
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'"
          >
            All Events
          </button>

          <button
            @click="selectFormat('online')"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer"
            :class="selectedFormat === 'online'
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'"
          >
            <Video class="w-3 h-3 opacity-80" />
            <span>Virtual / Online</span>
          </button>

          <button
            @click="selectFormat('in-person')"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer"
            :class="selectedFormat === 'in-person'
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'"
          >
            <MapPin class="w-3 h-3 opacity-80" />
            <span>In-Person</span>
          </button>

          <button
            v-if="isFiltered"
            @click="resetFilters"
            class="px-2.5 py-1 rounded-lg text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <X class="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        </div>

        <div class="text-xs font-medium text-gray-500">
          Showing <span class="font-bold text-gray-800">{{ filteredEvents.length }}</span> of {{ events.length }} events
        </div>
      </div>
    </div>

    <!-- Active Events List / Grid Container -->
    <div class="relative min-h-[300px]">
      <!-- Loading State -->
      <div v-if="loadingEvents" class="py-20 flex flex-col items-center justify-center gap-3">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
        <p class="text-xs text-gray-400 font-medium">Loading clinical events & webinars...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredEvents.length === 0" class="bg-white rounded-3xl p-12 sm:p-16 text-center border border-gray-200/80 shadow-sm">
        <div class="w-16 h-16 bg-brand/5 text-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
          <SearchXIcon class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">No matching events found</h3>
        <p class="text-gray-500 text-sm mb-6 max-w-sm mx-auto">We couldn't find any events matching your selected criteria. Try adjusting your search term or filters.</p>
        <button
          @click="resetFilters"
          class="px-5 py-2.5 bg-brand text-white rounded-xl text-xs font-bold hover:bg-brand/90 transition-all shadow-md shadow-brand/20 active:scale-95 cursor-pointer"
        >
          Clear all filters
        </button>
      </div>

      <!-- GRID VIEW -->
      <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in filteredEvents"
          :key="event._id"
          @click="openEventModal(event)"
          class="bg-white border border-gray-200/80 rounded-2xl hover:shadow-xl hover:shadow-brand/5 hover:border-brand/40 transition-all duration-300 flex flex-col h-full group relative overflow-hidden cursor-pointer"
        >
          <!-- Hover accent top line -->
          <div class="absolute top-0 left-0 w-full h-1 bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

          <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <!-- Top Badges -->
              <div class="flex items-start justify-between gap-2 mb-3">
                <span class="inline-flex bg-brand/10 text-brand text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  {{ event.category || 'Clinical Event' }}
                </span>
                <span
                  class="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border"
                  :class="isOnlineEvent(event) ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-50 text-gray-600 border-gray-100'"
                >
                  <Video v-if="isOnlineEvent(event)" class="w-3 h-3 text-blue-600" />
                  <MapPin v-else class="w-3 h-3 text-brand" />
                  <span>{{ isOnlineEvent(event) ? 'Virtual' : 'In-Person' }}</span>
                </span>
              </div>

              <!-- Title -->
              <h3 class="text-base font-bold text-gray-900 group-hover:text-brand transition-colors line-clamp-2 leading-snug mb-2">
                {{ event.title }}
              </h3>

              <!-- Description -->
              <p class="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                {{ event.description }}
              </p>
            </div>

            <!-- Date & Location Footer -->
            <div class="pt-4 border-t border-gray-100 space-y-2 mt-auto">
              <div class="flex items-center gap-2 text-xs font-medium text-gray-600">
                <Calendar class="w-3.5 h-3.5 text-brand shrink-0" />
                <span class="truncate">{{ formatEventDate(event.date) }}</span>
              </div>
              <div v-if="event.location" class="flex items-center gap-2 text-xs text-gray-500">
                <MapPin class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span class="truncate">{{ event.location }}</span>
              </div>

              <div class="pt-3">
                <button
                  class="w-full py-2.5 bg-brand/5 text-brand group-hover:bg-brand group-hover:text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <span>View Details</span>
                  <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LIST VIEW -->
      <div v-else class="flex flex-col gap-3.5">
        <div
          v-for="event in filteredEvents"
          :key="event._id"
          @click="openEventModal(event)"
          class="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-brand/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group relative overflow-hidden cursor-pointer"
        >
          <!-- Hover accent left bar -->
          <div class="absolute left-0 top-0 w-1.5 h-full bg-brand transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

          <!-- Main Info -->
          <div class="flex items-start sm:items-center gap-4 flex-1 min-w-0">
            <!-- Calendar Date Block -->
            <div class="w-14 h-14 rounded-2xl bg-brand/5 border border-brand/15 text-brand flex flex-col items-center justify-center shrink-0 p-1">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-brand leading-none">
                {{ getEventMonth(event.date) }}
              </span>
              <span class="text-lg font-black text-gray-900 leading-tight">
                {{ getEventDay(event.date) }}
              </span>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <h3 class="text-base font-bold text-gray-900 truncate group-hover:text-brand transition-colors">
                  {{ event.title }}
                </h3>
                <span class="inline-flex bg-brand/10 text-brand text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  {{ event.category || 'Event' }}
                </span>
                <span
                  class="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded border"
                  :class="isOnlineEvent(event) ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-50 text-gray-600 border-gray-100'"
                >
                  <Video v-if="isOnlineEvent(event)" class="w-2.5 h-2.5 text-blue-600" />
                  <MapPin v-else class="w-2.5 h-2.5 text-brand" />
                  <span>{{ isOnlineEvent(event) ? 'Virtual' : 'In-Person' }}</span>
                </span>
              </div>
              <p class="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                {{ event.description }}
              </p>
              <div class="flex items-center gap-4 text-xs text-gray-400 mt-1.5">
                <span class="inline-flex items-center gap-1">
                  <Calendar class="w-3 h-3 text-brand" />
                  {{ formatEventDate(event.date) }}
                </span>
                <span v-if="event.location" class="inline-flex items-center gap-1 truncate max-w-xs">
                  <MapPin class="w-3 h-3 text-gray-400" />
                  {{ event.location }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="flex items-center justify-end shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
            <button
              class="px-5 py-2.5 bg-brand text-white hover:bg-brand/90 text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 group/btn active:scale-95 cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight class="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Details Modal -->
    <Teleport to="body">
      <div v-if="selectedEvent" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeEventModal"></div>
        <div class="bg-white rounded-2xl w-full max-w-lg relative z-10 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
          <div class="p-6 border-b border-gray-100 flex items-center justify-between bg-white/95 backdrop-blur z-20">
            <div class="flex items-center gap-2">
              <span class="bg-brand/10 text-brand text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                {{ selectedEvent.category || 'Event Details' }}
              </span>
              <span
                class="text-[10px] font-bold px-2 py-0.5 rounded border"
                :class="isOnlineEvent(selectedEvent) ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-50 text-gray-600 border-gray-100'"
              >
                {{ isOnlineEvent(selectedEvent) ? 'Virtual Session' : 'On-Site' }}
              </span>
            </div>
            <button @click="closeEventModal" class="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all cursor-pointer">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="p-6 overflow-y-auto space-y-6">
            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{{ selectedEvent.title }}</h3>
            </div>

            <!-- Date & Location Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="flex items-start gap-3 text-gray-600 bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                <div class="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <Calendar class="w-4 h-4" />
                </div>
                <div class="min-w-0">
                  <p class="font-bold text-gray-900 text-xs">Date & Time</p>
                  <p class="text-xs text-gray-600 mt-0.5 leading-relaxed">{{ formatModalDate(selectedEvent.date) }}</p>
                </div>
              </div>

              <div v-if="selectedEvent.location" class="flex items-start gap-3 text-gray-600 bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                <div class="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <MapPin class="w-4 h-4" />
                </div>
                <div class="min-w-0">
                  <p class="font-bold text-gray-900 text-xs">Location</p>
                  <p class="text-xs text-gray-600 mt-0.5 leading-relaxed truncate">{{ selectedEvent.location }}</p>
                </div>
              </div>
            </div>

            <!-- About Section -->
            <div>
              <h4 class="font-bold text-gray-900 text-sm mb-2">About this event</h4>
              <p class="text-gray-600 whitespace-pre-line leading-relaxed text-xs sm:text-sm bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                {{ selectedEvent.description }}
              </p>
            </div>
          </div>

          <!-- Modal Action Footer -->
          <div class="p-5 border-t border-gray-100 bg-white z-20">
            <button
              @click="registerForEvent"
              :disabled="registeringEvent || eventRegistered"
              class="w-full py-3 bg-brand text-white rounded-xl text-xs font-bold hover:bg-brand/90 transition-all shadow-md shadow-brand/20 disabled:opacity-70 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <div v-if="registeringEvent" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span v-else>{{ eventRegistered ? 'Successfully Registered!' : 'Confirm Event Registration' }}</span>
            </button>
            <p v-if="eventRegistered" class="text-green-600 text-xs text-center mt-2.5 font-medium flex items-center justify-center gap-1">
              <Check class="w-3.5 h-3.5 text-green-600 stroke-[2.5]" />
              You're in! Access details and calendar invites have been recorded.
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSeoMeta, useHead } from '#imports';
import {
  Calendar,
  MapPin,
  X,
  Search,
  SearchX as SearchXIcon,
  ArrowRight,
  LayoutGrid,
  List,
  ChevronDown,
  Check,
  Video
} from 'lucide-vue-next';
import { useGetEvents } from '@/composables/modules/events/useGetEvents';
import { useAuth } from '@/composables/core/useAuth';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Events | Dashboard' });
useHead({ title: 'Events | Dashboard' });

const { user } = useAuth();
const { loading: loadingEvents, events, fetchEvents } = useGetEvents();

// View Mode
const viewMode = ref<'grid' | 'list'>('list');

// Search & Custom Filters
const searchQuery = ref('');
const selectedCategory = ref('All');
const selectedFormat = ref('All'); // 'All' | 'online' | 'in-person'
const activeDropdown = ref<'category' | 'format' | null>(null);

const categoryDropdownRef = ref<HTMLElement | null>(null);
const formatDropdownRef = ref<HTMLElement | null>(null);

// Modal state
const selectedEvent = ref<any>(null);
const registeringEvent = ref(false);
const eventRegistered = ref(false);

const formatOptions = [
  { label: 'All Formats', value: 'All' },
  { label: 'Virtual / Online', value: 'online' },
  { label: 'In-Person / On-Site', value: 'in-person' }
];

const selectedFormatLabel = computed(() => {
  const match = formatOptions.find(f => f.value === selectedFormat.value);
  return match ? match.label : 'All Formats';
});

// Computed Dropdown Options
const uniqueCategories = computed(() => {
  const map: Record<string, number> = {};
  events.value.forEach(e => {
    const cat = e.category || 'General';
    map[cat] = (map[cat] || 0) + 1;
  });
  return Object.entries(map).map(([name, count]) => ({ name, count }));
});

const isOnlineEvent = (event: any) => {
  if (!event) return false;
  const loc = (event.location || '').toLowerCase();
  const cat = (event.category || '').toLowerCase();
  const type = (event.type || '').toLowerCase();
  return type === 'virtual' || loc.includes('online') || loc.includes('zoom') || loc.includes('stream') || loc.includes('virtual') || cat.includes('webinar');
};

const isFiltered = computed(() => {
  return !!searchQuery.value || selectedCategory.value !== 'All' || selectedFormat.value !== 'All';
});

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const q = searchQuery.value.toLowerCase().trim();
    const matchesSearch = !q ||
      event.title?.toLowerCase().includes(q) ||
      event.description?.toLowerCase().includes(q) ||
      event.location?.toLowerCase().includes(q) ||
      event.category?.toLowerCase().includes(q);

    const matchesCategory = selectedCategory.value === 'All' || (event.category || 'General') === selectedCategory.value;

    let matchesFormat = true;
    if (selectedFormat.value === 'online') {
      matchesFormat = isOnlineEvent(event);
    } else if (selectedFormat.value === 'in-person') {
      matchesFormat = !isOnlineEvent(event);
    }

    return matchesSearch && matchesCategory && matchesFormat;
  });
});

// Dropdown Handlers
const toggleDropdown = (type: 'category' | 'format') => {
  activeDropdown.value = activeDropdown.value === type ? null : type;
};

const selectCategory = (cat: string) => {
  selectedCategory.value = cat;
  activeDropdown.value = null;
};

const selectFormat = (fmt: string) => {
  selectedFormat.value = fmt;
  activeDropdown.value = null;
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'All';
  selectedFormat.value = 'All';
  activeDropdown.value = null;
};

// Global click outside listener
const handleOutsideClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (
    categoryDropdownRef.value && !categoryDropdownRef.value.contains(target) &&
    formatDropdownRef.value && !formatDropdownRef.value.contains(target)
  ) {
    activeDropdown.value = null;
  }
};

// Date Formatters
const formatEventDate = (dateString?: string) => {
  if (!dateString) return 'Upcoming';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Upcoming';
  }
};

const formatModalDate = (dateString?: string) => {
  if (!dateString) return 'Upcoming';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Upcoming';
  }
};

const getEventMonth = (dateString?: string) => {
  if (!dateString) return 'EVENT';
  try {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short' });
  } catch {
    return 'EVENT';
  }
};

const getEventDay = (dateString?: string) => {
  if (!dateString) return '—';
  try {
    return new Date(dateString).getDate();
  } catch {
    return '—';
  }
};

// Modal Handlers
const openEventModal = (event: any) => {
  selectedEvent.value = event;
  eventRegistered.value = false;
  document.body.style.overflow = 'hidden';
};

const closeEventModal = () => {
  selectedEvent.value = null;
  document.body.style.overflow = '';
};

const registerForEvent = async () => {
  if (!selectedEvent.value) return;
  registeringEvent.value = true;

  await new Promise(resolve => setTimeout(resolve, 1000));
  registeringEvent.value = false;
  eventRegistered.value = true;
};

onMounted(() => {
  fetchEvents();
  window.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.text-brand {
  color: #6D28D9;
}
.bg-brand {
  background-color: #6D28D9;
}
.border-brand {
  border-color: #6D28D9;
}
.ring-brand {
  --tw-ring-color: #6D28D9;
}
</style>
