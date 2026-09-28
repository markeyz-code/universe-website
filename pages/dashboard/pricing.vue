<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Subscription</h1>
      <p class="text-gray-600 mt-1">Choose the plan that fits your academic needs.</p>
    </div>

    <!-- Toggle -->
    <div class="inline-flex bg-gray-200 rounded-lg p-1">
      <button @click="billingCycle = 'monthly'" :class="['px-6 py-2 rounded-md font-medium text-sm', billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900']">Monthly</button>
      <button @click="billingCycle = 'yearly'" :class="['px-6 py-2 rounded-md font-medium text-sm', billingCycle === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900']">Yearly</button>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
      <p class="text-gray-500 mt-4">Loading plans...</p>
    </div>

    <div v-else-if="filteredSubscriptions.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">No subscription plans available for this billing cycle.</p>
    </div>

    <!-- Plan Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="plan in filteredSubscriptions" :key="plan._id" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-48 h-48 bg-brand/5 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none group-hover:bg-brand/10 transition-colors"></div>
        
        <div class="relative z-10">
          <span class="inline-block bg-brand/10 text-brand text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">{{ plan.durationMonths === 1 ? 'Monthly' : 'Annual' }}</span>
          <h3 class="text-2xl font-extrabold text-gray-900 mb-1">{{ plan.name }}</h3>
          <p class="text-sm text-gray-500 mb-6">{{ plan.description }}</p>
          
          <div class="mb-6 flex items-baseline gap-2 border-b border-gray-100 pb-6">
            <span class="text-4xl font-black text-gray-900">₦{{ (plan.price / 100).toLocaleString() }}</span>
            <span class="text-gray-500 font-medium">/{{ plan.durationMonths === 1 ? 'mo' : 'yr' }}</span>
          </div>

          <button 
            @click="handleSubscribe(plan)" 
            :disabled="paymentLoading"
            class="w-full bg-gray-900 text-white hover:bg-brand py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 mb-6 shadow-md disabled:opacity-50"
          >
            <span v-if="paymentLoading && selectedPlanId === plan._id">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </span>
            <span v-else>Select {{ plan.name }}</span>
          </button>

          <div class="space-y-3">
            <p class="text-sm font-bold text-gray-900 uppercase tracking-wider">What's included</p>
            <ul class="space-y-2">
              <li v-for="(feature, idx) in plan.features" :key="idx" class="flex items-start">
                <div class="flex-shrink-0 w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center mr-3 mt-0.5">
                  <Check class="h-3 w-3 text-brand" />
                </div>
                <span class="text-sm text-gray-600">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison Table (Desktop) -->
    <div v-if="filteredSubscriptions.length > 1" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hidden md:block">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr>
            <th class="p-6 bg-gray-50 border-b border-gray-200 w-1/4"></th>
            <th v-for="plan in filteredSubscriptions" :key="'head-'+plan._id" class="p-6 bg-gray-50 border-b border-gray-200 border-l w-1/4 text-center">
              <h4 class="font-bold text-gray-900 mb-1">{{ plan.name }}</h4>
              <div class="text-2xl font-extrabold text-gray-900 mb-1">₦{{ (plan.price / 100).toLocaleString() }}</div>
              <p class="text-xs text-gray-500 mb-4">Per {{ plan.durationMonths > 1 ? plan.durationMonths + ' months' : 'month' }}</p>
              <button 
                @click="handleSubscribe(plan)" 
                :disabled="paymentLoading"
                class="w-full py-2 bg-brand text-white text-sm font-medium rounded hover:bg-[#1f4e70] transition-colors"
              >
                Select plan
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr>
            <td colspan="4" class="p-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">Features included</td>
          </tr>
          <tr v-for="feature in allUniqueFeatures" :key="feature">
            <td class="p-4 text-sm text-gray-700 font-medium">{{ feature }}</td>
            <td v-for="plan in filteredSubscriptions" :key="plan._id+'-'+feature" class="p-4 text-center border-l border-gray-100">
              <Check v-if="plan.features.includes(feature)" class="w-5 h-5 text-gray-900 mx-auto" />
              <span v-else class="text-gray-300">-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Verification Modal -->
    <div v-if="verifying" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Verifying Payment</h3>
        <p class="text-gray-500 text-sm">Please wait while we confirm your transaction...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSeoMeta, useHead } from '#imports';
import { Check } from 'lucide-vue-next';
import { useSubscriptions } from '@/composables/modules/subscriptions/useSubscriptions';
import { usePayments } from '@/composables/modules/payments/usePayments';
import { useAuth } from '@/composables/core/useAuth';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Subscription | Dashboard' });
useHead({ title: 'Subscription | Dashboard' });

const router = useRouter();
const route = useRoute();
const { isAuthenticated, user } = useAuth();
const { loading, subscriptions, fetchActive } = useSubscriptions();
const { loading: paymentLoading, initializePayment, verifyPayment } = usePayments();

const selectedPlanId = ref<string | null>(null);
const verifying = ref(false);
const billingCycle = ref<'monthly' | 'yearly'>('monthly');

const filteredSubscriptions = computed(() => {
  if (!subscriptions.value) return [];
  if (billingCycle.value === 'monthly') {
    return subscriptions.value.filter(p => p.durationMonths === 1);
  }
  return subscriptions.value.filter(p => p.durationMonths === 12);
});

const allUniqueFeatures = computed(() => {
  if (!filteredSubscriptions.value) return [];
  const features = new Set<string>();
  filteredSubscriptions.value.forEach(plan => {
    if(plan.features) {
      plan.features.forEach((f: string) => features.add(f));
    }
  });
  return Array.from(features);
});

onMounted(async () => {
  await fetchActive();

  if (route.query.reference) {
    verifying.value = true;
    try {
      const result = await verifyPayment(route.query.reference as string);
      if (result && result.verified) {
        alert('Payment successful! Your subscription is now active.');
        router.push('/dashboard');
      } else {
        alert('Payment verification failed or is still pending.');
      }
    } catch (e) {
      alert('An error occurred during verification.');
    } finally {
      verifying.value = false;
      router.replace('/dashboard/pricing');
    }
  }
});

const handleSubscribe = async (plan: any) => {
  if (!isAuthenticated.value) {
    router.push(`/register?planId=${plan._id}`);
    return;
  }

  if (user.value?.activeSubscription) {
    if (user.value.activeSubscription === plan._id || user.value.activeSubscription._id === plan._id) {
      alert('You are already subscribed to this plan.');
      return;
    }
    const confirmUpgrade = confirm(`You currently have an active plan. Do you want to upgrade/switch to ${plan.name}?`);
    if (!confirmUpgrade) return;
  }

  selectedPlanId.value = plan._id;
  const callbackUrl = `${window.location.origin}/dashboard/pricing`;
  
  const result = await initializePayment(plan._id, callbackUrl);
  
  if (result && result.authorization_url) {
    window.location.href = result.authorization_url;
  } else {
    alert('Failed to initialize payment. Please try again.');
  }
  selectedPlanId.value = null;
};
</script>
