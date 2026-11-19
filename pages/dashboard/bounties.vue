<template>
  <main class="w-full">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-navy-950 tracking-tight">Services & Bounties</h1>
        <p class="text-navy-400 mt-1">Book 1-on-1 CV Reviews, Mock Interviews, and Consulting.</p>
      </div>
      <button @click="showUploadModal = true" class="px-5 py-2.5 bg-brand text-white font-medium rounded-lg shadow-md hover:bg-brand-700 transition">
        + Offer a Service
      </button>
    </div>

    <!-- TABS -->
    <div class="flex gap-4 border-b border-navy-100 mb-8">
      <button 
        @click="activeTab = 'explore'"
        :class="['pb-3 font-medium transition', activeTab === 'explore' ? 'text-brand-700 border-b-2 border-brand-700' : 'text-navy-400 hover:text-navy-700']"
      >
        Find Services
      </button>
      <button 
        @click="activeTab = 'bookings'; loadBookings()"
        :class="['pb-3 font-medium transition', activeTab === 'bookings' ? 'text-brand-700 border-b-2 border-brand-700' : 'text-navy-400 hover:text-navy-700']"
      >
        My Bookings
      </button>
    </div>

    <!-- EXPLORE TAB -->
    <div v-if="activeTab === 'explore'">
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="bg-white rounded-xl shadow-sm p-4 animate-pulse h-48">
          <div class="w-full h-8 bg-navy-100 rounded mb-4"></div>
          <div class="w-3/4 h-4 bg-navy-100 rounded mb-2"></div>
          <div class="w-1/2 h-4 bg-navy-100 rounded"></div>
        </div>
      </div>
      
      <div v-else-if="bounties.length === 0" class="bg-white rounded-2xl p-12 text-center border border-navy-100 shadow-sm">
        <div class="text-4xl mb-4">🤝</div>
        <h3 class="text-xl font-bold text-navy-950 mb-2">No Services Available Yet</h3>
        <p class="text-navy-400">Be the first to offer CV Reviews or Mock Interviews!</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="bounty in bounties" :key="bounty._id" class="bg-white border border-navy-100 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all group flex flex-col relative">
          <div class="p-5 flex-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold shrink-0">
                {{ bounty.provider?.firstName?.charAt(0) || 'U' }}
              </div>
              <div>
                <h4 class="font-bold text-sm text-navy-950">{{ bounty.provider?.firstName }} {{ bounty.provider?.lastName }}</h4>
                <p class="text-xs text-navy-400">Professional Mentor</p>
              </div>
              <span class="ml-auto bg-navy-50 text-navy-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                {{ formatCategory(bounty.category) }}
              </span>
            </div>
            
            <h3 class="font-bold text-navy-950 text-lg mb-2">{{ bounty.title }}</h3>
            <p class="text-sm text-navy-400 line-clamp-3 mb-4">{{ bounty.description }}</p>
          </div>
          
          <div class="p-5 border-t border-gray-50 bg-[#F6F8FB]/50 mt-auto flex items-center justify-between">
            <div>
              <span v-if="bounty.price === 0" class="font-bold text-emerald-600">FREE</span>
              <span v-else class="font-bold text-navy-950 text-lg">₦{{ (bounty.price / 100).toLocaleString() }}</span>
            </div>
            <button @click="initBooking(bounty)" class="px-5 py-2.5 bg-navy-950 text-white text-sm font-medium rounded-lg hover:bg-navy-900 transition">
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MY BOOKINGS TAB -->
    <div v-if="activeTab === 'bookings'">
      <div v-if="loading" class="text-center py-8 text-navy-400">Loading your bookings...</div>
      <div v-else-if="myBookings.length === 0" class="text-center py-12 bg-[#F6F8FB] rounded-xl border border-dashed border-navy-100 text-navy-400">
        You haven't booked any services yet.
      </div>
      <div v-else class="space-y-4">
        <div v-for="booking in myBookings" :key="booking._id" class="bg-white p-5 rounded-xl border border-navy-100 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div class="flex-grow">
            <div class="flex items-center gap-3 mb-1">
              <span class="px-2 py-0.5 bg-navy-50 text-navy-500 text-[10px] font-bold rounded uppercase">
                {{ formatCategory(booking.bounty?.category) }}
              </span>
              <span :class="{
                'text-yellow-600 bg-yellow-50': booking.status === 'pending',
                'text-blue-600 bg-blue-50': booking.status === 'in_progress',
                'text-emerald-600 bg-emerald-50': booking.status === 'completed'
              }" class="px-2 py-0.5 text-[10px] font-bold rounded uppercase">
                {{ booking.status.replace('_', ' ') }}
              </span>
            </div>
            <h4 class="font-bold text-navy-950 text-lg">{{ booking.bounty?.title }}</h4>
            <p class="text-sm text-navy-400">Provider: {{ booking.bounty?.provider?.firstName }} {{ booking.bounty?.provider?.lastName }}</p>
          </div>
          <div class="w-full md:w-auto text-right">
            <p class="text-xs text-navy-300 mb-1">Reference: {{ booking.reference }}</p>
            <p class="text-sm font-bold">₦{{ (booking.amountPaid / 100).toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- BOOKING MODAL (FOR CLIENT NOTES) -->
    <Teleport to="body">
      <div v-if="showBookingModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl w-full max-w-md p-6">
          <h3 class="text-xl font-bold mb-2">Book: {{ selectedBounty?.title }}</h3>
          <p class="text-sm text-navy-400 mb-4">Provide any notes or links to your CV before checking out.</p>
          <textarea v-model="clientNotes" rows="4" placeholder="Hi, here is the Google Drive link to my CV..." class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none mb-6"></textarea>
          
          <div class="flex gap-3 justify-end">
            <button @click="showBookingModal = false" class="px-4 py-2 font-medium text-navy-500 hover:bg-[#F6F8FB] rounded-lg">Cancel</button>
            <button @click="proceedToPay" class="px-4 py-2 font-medium text-white bg-brand hover:bg-brand-700 rounded-lg">
              Proceed (₦{{ ((selectedBounty?.price || 0) / 100).toLocaleString() }})
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- OFFER SERVICE MODAL -->
    <Teleport to="body">
      <div v-if="showUploadModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
          <h3 class="text-xl font-bold mb-4">Offer a Service / Bounty</h3>
          <form @submit.prevent="submitBounty" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-navy-700 mb-1">Service Title</label>
              <input v-model="form.title" placeholder="e.g. 1-on-1 Mock Interview (30 mins)" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-navy-700 mb-1">Description (What will they get?)</label>
              <textarea v-model="form.description" required rows="3" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-navy-700 mb-1">Price (₦)</label>
                <input v-model.number="form.price" type="number" min="0" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                <span class="text-xs text-navy-400">Enter 0 for free.</span>
              </div>
              <div>
                <label class="block text-sm font-medium text-navy-700 mb-1">Category</label>
                <UiSelect
                  id="category"
                  v-model="form.category"
                  :required="true"
                  placeholder="Select Category"
                  :options="[
                    { label: 'CV / Resume Review', value: 'cv_review' },
                    { label: 'Mock Interview', value: 'mock_interview' },
                    { label: 'Career Planning', value: 'career_planning' },
                    { label: 'Freelance Consulting', value: 'freelance_consulting' }
                  ]"
                />
              </div>
            </div>
            <div class="flex gap-3 justify-end pt-4 mt-6 border-t border-navy-100">
              <button type="button" @click="showUploadModal = false" class="px-4 py-2 font-medium text-navy-500 hover:bg-[#F6F8FB] rounded-lg">Cancel</button>
              <button type="submit" :disabled="loading" class="px-4 py-2 font-medium text-white bg-brand hover:bg-brand-700 rounded-lg disabled:opacity-50">
                {{ loading ? 'Publishing...' : 'List Service' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBounties } from '@/composables/modules/bounties/useBounties';
import { useSeoMeta } from '#imports';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Services & Bounties | UniVerse' });

const { bounties, myBookings, loading, getBounties, getMyBookings, createBounty, bookBounty } = useBounties();

const activeTab = ref('explore');
const showUploadModal = ref(false);
const showBookingModal = ref(false);
const selectedBounty = ref<any>(null);
const clientNotes = ref('');

const form = ref({
  title: '',
  description: '',
  price: 0,
  category: 'cv_review',
  environment: 'uniVerse'
});

onMounted(() => {
  getBounties('uniVerse');
  
  if (!document.getElementById('paystack-script')) {
    const script = document.createElement('script');
    script.id = 'paystack-script';
    script.src = 'https://js.paystack.co/v1/inline.js';
    document.head.appendChild(script);
  }
});

const loadBookings = () => {
  getMyBookings();
};

const formatCategory = (cat: string) => {
  if (!cat) return '';
  return cat.split('_').join(' ');
};

const submitBounty = async () => {
  await createBounty({
    ...form.value,
    price: form.value.price * 100
  });
  showUploadModal.value = false;
  getBounties('uniVerse');
  
  form.value = {
    title: '', description: '', price: 0, category: 'cv_review', environment: 'uniVerse'
  };
};

const initBooking = (bounty: any) => {
  selectedBounty.value = bounty;
  clientNotes.value = '';
  showBookingModal.value = true;
};

const proceedToPay = async () => {
  const bounty = selectedBounty.value;
  if (!bounty) return;
  
  showBookingModal.value = false;

  if (bounty.price === 0) {
    await bookBounty(bounty._id, `free_${Date.now()}`, clientNotes.value);
    activeTab.value = 'bookings';
    loadBookings();
    return;
  }
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return;
  const user = JSON.parse(userStr);

  const handler = (window as any).PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_placeholder', 
    email: user.email,
    amount: bounty.price,
    currency: 'NGN',
    callback: async function (response: any) {
      await bookBounty(bounty._id, response.reference, clientNotes.value);
      activeTab.value = 'bookings';
      loadBookings();
    },
    onClose: function () {
      console.log('Payment closed');
    }
  });
  handler.openIframe();
};
</script>
