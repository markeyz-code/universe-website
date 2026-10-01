<template>
  <main class="w-full">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Creator Hub</h1>
        <p class="text-gray-500 mt-1">Discover, buy, and sell premium digital assets.</p>
      </div>
      <button @click="showUploadModal = true" class="px-5 py-2.5 bg-[#0F172A] text-white font-medium rounded-lg shadow-md hover:bg-[#1e293b] transition">
        + Sell a Product
      </button>
    </div>

      <div class="flex gap-4">
        <button 
          @click="activeTab = 'explore'"
          :class="['pb-3 font-medium transition border-b-2', activeTab === 'explore' ? 'text-[#0F172A] border-[#0F172A]' : 'text-gray-500 border-transparent hover:text-gray-700']"
        >
          Explore Market
        </button>
        <button 
          @click="activeTab = 'purchases'; loadPurchases()"
          :class="['pb-3 font-medium transition border-b-2', activeTab === 'purchases' ? 'text-[#0F172A] border-[#0F172A]' : 'text-gray-500 border-transparent hover:text-gray-700']"
        >
          My Purchases
        </button>
      </div>
      <div class="flex gap-2">
        <button @click="viewMode = 'grid'" :class="['p-2 rounded', viewMode === 'grid' ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100']">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        </button>
        <button @click="viewMode = 'list'" :class="['p-2 rounded', viewMode === 'list' ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100']">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>

    <!-- EXPLORE TAB -->
    <div v-if="activeTab === 'explore'">
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="bg-white rounded-xl shadow-sm p-4 animate-pulse h-64">
          <div class="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div class="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
          <div class="w-1/2 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      <div v-else-if="products.length === 0" class="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
        <div class="text-4xl mb-4">🛍️</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">The market is empty</h3>
        <p class="text-gray-500">Be the first to upload a premium digital asset and start earning!</p>
      </div>

      <div v-else :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'">
        <div v-for="product in products" :key="product._id" :class="[
          'bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all group',
          viewMode === 'list' ? 'flex items-center p-4 gap-6' : ''
        ]">
          <div :class="[viewMode === 'list' ? 'w-48 h-32 shrink-0 rounded-lg overflow-hidden' : 'aspect-video', 'bg-gray-100 relative']">
            <img v-if="product.coverImage" :src="product.coverImage" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">No Cover</div>
            <div class="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-900">
              {{ product.category }}
            </div>
          </div>
          <div :class="[viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : 'p-5']">
            <h3 class="font-bold text-gray-900 text-lg mb-1 truncate">{{ product.title }}</h3>
            <p class="text-sm text-gray-500 line-clamp-2 mb-4">{{ product.description }}</p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div>
                <span v-if="product.price === 0" class="font-bold text-emerald-600">FREE</span>
                <span v-else class="font-bold text-gray-900">₦{{ (product.price / 100).toLocaleString() }}</span>
              </div>
              <button @click="initPurchase(product)" class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MY PURCHASES TAB -->
    <div v-if="activeTab === 'purchases'">
      <div v-if="loading" class="text-center py-8 text-gray-500">Loading your purchases...</div>
      <div v-else-if="purchases.length === 0" class="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500">
        You haven't bought anything yet.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="product in purchases" :key="product._id" class="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4">
          <div class="w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
            <img v-if="product.coverImage" :src="product.coverImage" class="w-full h-full object-cover" />
          </div>
          <div class="flex-grow">
            <h4 class="font-bold text-gray-900">{{ product.title }}</h4>
            <p class="text-xs text-gray-500 uppercase">{{ product.category }}</p>
          </div>
          <button @click="download(product._id)" class="px-4 py-2 text-sm font-medium text-[#0F172A] bg-gray-100 rounded-lg hover:bg-gray-200 transition whitespace-nowrap">
            Download File
          </button>
        </div>
      </div>
    </div>

    <!-- UPLOAD MODAL -->
    <Teleport to="body">
      <div v-if="showUploadModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
          <h3 class="text-xl font-bold mb-4">Sell a Digital Asset</h3>
          <form @submit.prevent="submitProduct" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input v-model="form.title" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="form.description" required rows="3" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                <input v-model.number="form.price" type="number" min="0" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
                <span class="text-xs text-gray-500">Enter 0 for free.</span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <UiSelect
                  id="category"
                  v-model="form.category"
                  :required="true"
                  placeholder="Select Category"
                  :options="[
                    { label: 'Study Notes', value: 'Notes' },
                    { label: 'Templates', value: 'Templates' },
                    { label: 'Guides / Books', value: 'Guides' },
                    { label: 'Media / Visuals', value: 'Media' }
                  ]"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Direct Download Link</label>
              <input v-model="form.fileUrl" required type="url" placeholder="https://..." class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
              <p class="text-xs text-gray-500 mt-1">Provide a Google Drive or Cloudinary link to the secure file.</p>
            </div>
            <div class="flex gap-3 justify-end pt-4 mt-6 border-t border-gray-100">
              <button type="button" @click="showUploadModal = false" class="px-4 py-2 font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
              <button type="submit" :disabled="loading" class="px-4 py-2 font-medium text-white bg-[#0F172A] hover:bg-[#1e293b] rounded-lg disabled:opacity-50">
                {{ loading ? 'Publishing...' : 'Publish Product' }}
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
import { useMarketplace } from '@/composables/modules/marketplace/useMarketplace';
import { useSeoMeta } from '#imports';
// Import Paystack dynamically or via head script depending on your setup.
// We assume window.PaystackPop is available or we can inject it.

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Creator Hub | UniVerse' });

const { products, purchases, loading, getProducts, getMyPurchases, createProduct, purchaseProduct, downloadProduct } = useMarketplace();

const activeTab = ref('explore');
const showUploadModal = ref(false);
const viewMode = ref('grid');

const form = ref({
  title: '',
  description: '',
  price: 0,
  category: 'Notes',
  fileUrl: '',
  environment: 'uniVerse',
  coverImage: '' // Could hook up Cloudinary upload here
});

onMounted(() => {
  getProducts('uniVerse');
  
  // Inject Paystack Script
  if (!document.getElementById('paystack-script')) {
    const script = document.createElement('script');
    script.id = 'paystack-script';
    script.src = 'https://js.paystack.co/v1/inline.js';
    document.head.appendChild(script);
  }
});

const loadPurchases = () => {
  getMyPurchases();
};

const submitProduct = async () => {
  await createProduct({
    ...form.value,
    price: form.value.price * 100 // Convert NGN to Kobo
  });
  showUploadModal.value = false;
  getProducts('uniVerse');
  
  form.value = {
    title: '', description: '', price: 0, category: 'Notes', fileUrl: '', environment: 'uniVerse', coverImage: ''
  };
};

const download = async (productId: string) => {
  await downloadProduct(productId);
};

const initPurchase = async (product: any) => {
  if (product.price === 0) {
    // Free product
    await purchaseProduct(product._id, `free_${Date.now()}`);
    return;
  }
  
  const userStr = localStorage.getItem('intern_user');
  if (!userStr) return;
  const user = JSON.parse(userStr);

  const handler = (window as any).PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_placeholder', // Should be your PK
    email: user.email,
    amount: product.price,
    currency: 'NGN',
    callback: async function (response: any) {
      await purchaseProduct(product._id, response.reference);
    },
    onClose: function () {
      console.log('Payment closed');
    }
  });
  handler.openIframe();
};
</script>
