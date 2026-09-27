<template>
  <div class="bg-gray-50 min-h-screen pb-24">
    <!-- Hero / Main Pricing Intro -->
    <section class="pt-24 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-3 block">Plans</span>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Student membership</h1>
        <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the plan that fits your academic needs.
        </p>

        <!-- Toggle -->
        <div class="inline-flex bg-gray-200 rounded-lg p-1 mb-16">
          <button @click="billingCycle = 'monthly'" :class="['px-6 py-2 rounded-md font-medium', billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900']">Monthly</button>
          <button @click="billingCycle = 'yearly'" :class="['px-6 py-2 rounded-md font-medium', billingCycle === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900']">Yearly</button>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
          <p class="text-gray-500 mt-4">Loading plans...</p>
        </div>

        <div v-else-if="filteredSubscriptions.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">No subscription plans available for this billing cycle.</p>
        </div>

        <!-- Featured Plan Cards -->
        <div v-else-if="filteredSubscriptions.length > 0" class="mt-8 flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          <div v-for="plan in filteredSubscriptions" :key="plan._id" class="w-full md:w-[400px] bg-white rounded-3xl shadow-xl shadow-brand/5 border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            <!-- Decorative Background Element -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-brand/10 transition-colors"></div>
            
            <div class="relative z-10">
              <span class="inline-block bg-brand/10 text-brand text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">{{ plan.durationMonths === 1 ? 'Monthly' : 'Annual' }}</span>
              <h3 class="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">{{ plan.name }}</h3>
              <p class="text-sm text-gray-500 mb-8">{{ plan.description }}</p>
              
              <div class="mb-8 flex items-baseline gap-2 border-b border-gray-100 pb-8">
                <span class="text-5xl font-black text-gray-900 tracking-tighter">₦{{ (plan.price / 100).toLocaleString() }}</span>
                <span class="text-gray-500 font-medium">/{{ plan.durationMonths === 1 ? 'mo' : 'yr' }}</span>
              </div>

              <button 
                @click="handleSubscribe(plan)" 
                :disabled="paymentLoading"
                class="w-full bg-gray-900 text-white hover:bg-brand py-4 rounded-xl font-bold text-lg transition-colors flex justify-center items-center gap-2 mb-8 shadow-md disabled:opacity-50"
              >
                <span v-if="paymentLoading && selectedPlanId === plan._id">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </span>
                <span v-else>Select {{ plan.name }}</span>
              </button>

              <div class="space-y-4">
                <p class="text-sm font-bold text-gray-900 uppercase tracking-wider">What's included</p>
                <ul class="space-y-3">
                  <li v-for="(feature, idx) in plan.features" :key="idx" class="flex items-start">
                    <div class="flex-shrink-0 w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center mr-3 mt-0.5">
                      <Check class="h-3 w-3 text-brand" />
                    </div>
                    <span class="text-sm text-gray-600 font-medium">{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Plan details (Comparison Table) -->
    <section v-if="filteredSubscriptions.length > 1" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Compare</span>
          <h2 class="text-3xl font-bold text-gray-900">Plan details</h2>
          <p class="text-gray-600 mt-2">See what each tier includes.</p>
        </div>

        <!-- Mobile: Vertical cards per plan -->
        <div class="md:hidden space-y-6">
          <div v-for="plan in filteredSubscriptions" :key="'mobile-'+plan._id" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="p-6 bg-gray-50 border-b border-gray-200 text-center">
              <h4 class="font-bold text-gray-900 text-lg mb-1">{{ plan.name }}</h4>
              <div class="text-3xl font-extrabold text-gray-900 mb-1">₦{{ (plan.price / 100).toLocaleString() }}</div>
              <p class="text-sm text-gray-500 mb-4">Per {{ plan.durationMonths > 1 ? plan.durationMonths + ' months' : 'month' }}</p>
              <button 
                @click="handleSubscribe(plan)" 
                :disabled="paymentLoading"
                class="w-full py-3 bg-brand text-white text-sm font-bold rounded-lg hover:bg-[#1f4e70] transition-colors"
              >
                Select {{ plan.name }}
              </button>
            </div>
            <div class="p-6">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Features included</p>
              <ul class="space-y-3">
                <li v-for="feature in plan.features" :key="plan._id+'-m-'+feature" class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center mt-0.5">
                    <Check class="h-3 w-3 text-brand" />
                  </div>
                  <span class="text-sm text-gray-700 font-medium">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Desktop: Full comparison table -->
        <div class="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
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
      </div>
    </section>

    <!-- Everything you need to build your career -->
    <section class="py-24 bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-16 max-w-2xl">
          <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Included</span>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed in your studies</h2>
          <p class="text-lg text-gray-600 mb-6">Comprehensive tools, resources, and connections to get you through exams, lab practicals, and into a successful academic program.</p>
          <NuxtLink to="/register" class="text-brand font-medium hover:text-[#1f4e70] flex items-center gap-2">
            Explore <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="space-y-24">
          <!-- Item 1 -->
          <div class="flex flex-col md:flex-row gap-12 items-center">
            <div class="md:w-1/2">
              <img src="/documents_verify.jpg" alt="Vault access" class="rounded-xl shadow-md w-full h-64 object-cover" />
            </div>
            <div class="md:w-1/2">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Vault access</h3>
              <p class="text-gray-600">Downloadable resources, templates, and frameworks. From study guides to lab protocols and practical logs.</p>
            </div>
          </div>
          
          <!-- Item 2 -->
          <div class="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div class="md:w-1/2">
              <img src="/community_network.jpg" alt="Mentorship connections" class="rounded-xl shadow-md w-full h-64 object-cover" />
            </div>
            <div class="md:w-1/2">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Mentorship connections</h3>
              <p class="text-gray-600">Connect with senior professionals in the field. Get guidance on your academic trajectory, advice on navigating the university environment, and more.</p>
            </div>
          </div>
          
          <!-- Item 3 -->
          <div class="flex flex-col md:flex-row gap-12 items-center">
            <div class="md:w-1/2">
              <div class="rounded-xl shadow-md w-full h-64 bg-gray-200"></div>
            </div>
            <div class="md:w-1/2">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Academic & Entry-level listings</h3>
              <p class="text-gray-600">Exclusive access to specific research assistant positions and study groups across top institutions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="bg-gray-900 py-24">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">What comes next</h2>
        <p class="text-xl text-gray-300 mb-10">A life worth living involves building your network and learning from the best.</p>
        <NuxtLink to="/register" class="bg-white text-gray-900 px-8 py-3 rounded font-medium hover:bg-gray-100 transition-colors">
          Join Now
        </NuxtLink>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 bg-gray-50 border-t border-gray-200">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Questions</h2>
          <p class="text-gray-600">Find answers about payments and billing.</p>
        </div>

        <div class="space-y-4">
          <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              What payment methods do you accept?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              We accept all major debit cards and bank transfers via Paystack. Digital wallets and USSD transfers are also available.
            </div>
          </details>
          <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              Can I upgrade my plan after purchase?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              Yes. You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
            </div>
          </details>
          <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              What is your refund policy?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              We offer a 7-day money-back guarantee if you're not satisfied. Contact our support team to request a refund within this period.
            </div>
          </details>
        </div>
      </div>
    </section>

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
import { Check, ArrowRight } from 'lucide-vue-next';
import { useSubscriptions } from '@/composables/modules/subscriptions/useSubscriptions';
import { usePayments } from '@/composables/modules/payments/usePayments';
import { useAuth } from '@/composables/core/useAuth';

useSeoMeta({ title: 'Student Membership | UniVerse Ecosystem' });
useHead({ title: 'Student Membership | UniVerse Ecosystem' });

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
        router.push('/vault');
      } else {
        alert('Payment verification failed or is still pending.');
      }
    } catch (e) {
      alert('An error occurred during verification.');
    } finally {
      verifying.value = false;
      router.replace('/pricing');
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
  const callbackUrl = `${window.location.origin}/pricing`;
  
  const result = await initializePayment(plan._id, callbackUrl);
  
  if (result && result.authorization_url) {
    window.location.href = result.authorization_url;
  } else {
    alert('Failed to initialize payment. Please try again.');
  }
  selectedPlanId.value = null;
};
</script>
