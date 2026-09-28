<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Events</h1>
      <p class="text-gray-600 mt-1">Discover upcoming events, webinars, and networking opportunities.</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div v-if="loadingEvents" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
      
      <div v-else-if="events.length === 0" class="text-center py-12 text-gray-500">
        No upcoming events at the moment. Check back later.
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="event in events" :key="event._id" class="bg-gray-50 rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow flex flex-col">
          <span class="inline-block self-start bg-brand/10 text-brand text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            {{ event.category || 'Event' }}
          </span>
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.title }}</h3>
          <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{{ event.description }}</p>
          
          <div class="mt-auto space-y-2 pt-4 border-t border-gray-200">
            <div class="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Calendar class="w-4 h-4 text-brand" />
              {{ new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) }}
            </div>
            <div v-if="event.location" class="flex items-center gap-2 text-sm font-medium text-gray-500">
              <MapPin class="w-4 h-4 text-brand" />
              {{ event.location }}
            </div>
          </div>
          
          <div class="mt-4">
             <button @click="openEventModal(event)" class="w-full py-2 bg-white border border-gray-200 rounded text-brand font-medium hover:bg-gray-50 transition-colors text-sm">
                View Details
             </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Event Modal (copied from index) -->
    <div v-if="selectedEvent" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeEventModal"></div>
      <div class="bg-white rounded-2xl w-full max-w-lg relative z-10 shadow-2xl max-h-[90vh] flex flex-col">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
          <h3 class="text-xl font-bold text-gray-900">Event Details</h3>
          <button @click="closeEventModal" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto">
          <span class="bg-brand/10 text-brand text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide inline-block mb-4">{{ selectedEvent.category || 'Event' }}</span>
          <h4 class="text-2xl font-bold text-gray-900 mb-4">{{ selectedEvent.title }}</h4>
          
          <div class="space-y-4 mb-6">
            <div class="flex items-start gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
              <Calendar class="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div>
                <p class="font-medium text-gray-900">Date & Time</p>
                <p class="text-sm mt-0.5">{{ new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) }}</p>
              </div>
            </div>
            
            <div v-if="selectedEvent.location" class="flex items-start gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
              <MapPin class="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div>
                <p class="font-medium text-gray-900">Location</p>
                <p class="text-sm mt-0.5">{{ selectedEvent.location }}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h5 class="font-bold text-gray-900 mb-2">About this event</h5>
            <p class="text-gray-600 whitespace-pre-line leading-relaxed">{{ selectedEvent.description }}</p>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl sticky bottom-0">
          <button 
            @click="registerForEvent" 
            :disabled="registeringEvent"
            class="w-full py-3.5 bg-brand text-white rounded-xl font-bold hover:bg-[#1f4e70] transition-colors shadow-lg shadow-brand/20 disabled:opacity-70 flex justify-center"
          >
            <span v-if="registeringEvent" class="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            <span v-else>{{ eventRegistered ? 'Registered!' : 'Register Now' }}</span>
          </button>
          <p v-if="eventRegistered" class="text-green-600 text-sm text-center mt-3 font-medium">Successfully registered! We'll email you the details.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSeoMeta } from '#imports';
import { Calendar, MapPin, X } from 'lucide-vue-next';
import { useGetEvents } from '@/composables/modules/events/useGetEvents';
import { useAuth } from '@/composables/core/useAuth';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Events | Dashboard' });

const { user } = useAuth();
const { loading: loadingEvents, events, fetchEvents } = useGetEvents();

const selectedEvent = ref<any>(null);
const registeringEvent = ref(false);
const eventRegistered = ref(false);

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
  
  // Fake API call for registration
  await new Promise(resolve => setTimeout(resolve, 1500));
  registeringEvent.value = false;
  eventRegistered.value = true;
  
  setTimeout(() => {
    closeEventModal();
  }, 2000);
};

onMounted(() => {
  fetchEvents();
});
</script>
