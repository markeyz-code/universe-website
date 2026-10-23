<template>
  <NuxtLayout :name="isAuthenticated ? 'dashboard' : 'default'">

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

        <div v-else-if="displaySubscriptions.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">No subscription plans available for this billing cycle.</p>
        </div>

        <!-- Mobile Cards View (Visible on Mobile & Tablets) -->
        <div v-else class="block md:hidden space-y-6 mb-12">
          <div 
            v-for="plan in displaySubscriptions" 
            :key="'mobile-'+plan._id"
            class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-left relative overflow-hidden"
          >
            <div v-if="plan.durationMonths === 12" class="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
              Best Value
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-1">{{ plan.name }}</h3>
            <p class="text-xs text-gray-500 mb-4">{{ plan.description || 'Access all core UniVerse academic resources and study materials.' }}</p>
            
            <div class="flex items-baseline gap-1 mb-4">
              <span class="text-3xl font-extrabold text-gray-900">₦{{ (plan.price / 100).toLocaleString() }}</span>
              <span class="text-xs text-gray-500 font-medium">/ {{ plan.durationMonths > 1 ? plan.durationMonths + ' months' : 'month' }}</span>
            </div>

            <div class="p-3 bg-gray-50 rounded-lg text-xs text-gray-600 mb-5 space-y-1">
              <p><strong class="font-semibold text-gray-900">Duration:</strong> {{ plan.durationMonths }} Month{{ plan.durationMonths > 1 ? 's' : '' }} Full Access</p>
              <p><strong class="font-semibold text-gray-900">Renewal:</strong> Automatic via Paystack. Cancel anytime before next cycle.</p>
            </div>

            <ul class="space-y-2.5 mb-6 text-sm text-gray-700">
              <li v-for="feature in (plan.features || allUniqueFeatures)" :key="feature" class="flex items-start gap-2">
                <Check class="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span class="text-xs leading-relaxed">{{ feature }}</span>
              </li>
            </ul>

            <button 
              @click="handleSubscribe(plan)" 
              :disabled="paymentLoading"
              class="w-full py-3 bg-brand text-white text-sm font-bold rounded-xl hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {{ paymentLoading ? 'Processing...' : 'Subscribe Now' }}
            </button>
          </div>
        </div>

        <!-- Desktop: Full comparison table -->
        <div class="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 mb-12">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr>
                <th class="p-6 bg-gray-50 border-b border-gray-200 w-1/4"></th>
                <th v-for="plan in displaySubscriptions" :key="'head-'+plan._id" class="p-6 bg-gray-50 border-b border-gray-200 border-l w-1/4 text-center">
                  <h4 class="font-bold text-gray-900 mb-1">{{ plan.name }}</h4>
                  <div class="text-2xl font-extrabold text-gray-900 mb-1">₦{{ (plan.price / 100).toLocaleString() }}</div>
                  <p class="text-xs text-gray-500 mb-1">Per {{ plan.durationMonths > 1 ? plan.durationMonths + ' months' : 'month' }}</p>
                  <p class="text-[11px] text-brand font-medium mb-4">Auto-renewing • Cancel anytime</p>
                  <button 
                    @click="handleSubscribe(plan)" 
                    :disabled="paymentLoading"
                    class="w-full py-2.5 bg-brand text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50"
                  >
                    Select Plan
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
                <td v-for="plan in displaySubscriptions" :key="plan._id+'-'+feature" class="p-4 text-center border-l border-gray-100">
                  <Check v-if="!plan.features || plan.features.includes(feature)" class="w-5 h-5 text-brand mx-auto" />
                  <span v-else class="text-gray-300">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Subscription Duration & Renewal Clarity Notice -->
        <div class="max-w-4xl mx-auto bg-violet-50/60 border border-violet-100 rounded-2xl p-6 sm:p-8 text-left mt-8">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shrink-0">
              <Check class="w-5 h-5" />
            </div>
            <div class="space-y-3">
              <h3 class="text-lg font-bold text-gray-900">Subscription Duration & Transparent Renewal Policy</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700 leading-relaxed">
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">⏱ Duration</h4>
                  <p>Access is active for the precise duration selected (30 days for Monthly, 365 days for Yearly). You retain full access to The Vault and all features for the entire paid window.</p>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">🔄 Renewal Mechanics</h4>
                  <p>Subscriptions renew automatically using Paystack's encrypted billing to ensure continuous study access. You will receive an email notice prior to renewal.</p>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">✋ Easy Cancellation</h4>
                  <p>You can cancel automatic renewal at any time directly in your Member Dashboard under Settings. No questions asked, and your access continues until the cycle concludes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Everything you need to build your career -->
    <section v-if="!isAuthenticated" class="py-24 bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-16 max-w-2xl">
          <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Included</span>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed in your studies</h2>
          <p class="text-lg text-gray-600 mb-6">Comprehensive tools, resources, and connections to get you through exams, lab practicals, and into a successful academic program.</p>
          <NuxtLink to="/register" class="text-brand font-medium hover:text-violet-700 flex items-center gap-2">
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
    <section v-if="!isAuthenticated" class="bg-gray-900 py-24">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">What comes next</h2>
        <p class="text-xl text-gray-300 mb-10">A life worth living involves building your network and learning from the best.</p>
        <NuxtLink to="/register" class="bg-white text-gray-900 px-8 py-3 rounded font-medium hover:bg-gray-100 transition-colors">
          Join Now
        </NuxtLink>
      </div>
    </section>

    <!-- FAQ -->
    <section v-if="!isAuthenticated" class="py-24 bg-gray-50 border-t border-gray-200">
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
  </NuxtLayout>

</template>

<script setup lang="ts">

import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSeoMeta, useHead } from '#imports';
import { Check, ArrowRight } from 'lucide-vue-next';
import { useSubscriptions } from '@/composables/modules/subscriptions/useSubscriptions';
import { usePayments } from '@/composables/modules/payments/usePayments';
import { useAuth } from '@/composables/core/useAuth';
import { useCustomModal } from '@/composables/core/useCustomModal';

useSeoMeta({ title: 'Student Membership | UniVerse Ecosystem' });
useHead({ title: 'Student Membership | UniVerse Ecosystem' });

const router = useRouter();
const route = useRoute();
const { isAuthenticated, user } = useAuth();
const { loading, subscriptions, fetchActive } = useSubscriptions();
const { loading: paymentLoading, initializePayment, verifyPayment } = usePayments();
const { confirm, alert: modalAlert } = useCustomModal();

const selectedPlanId = ref<string | null>(null);
const verifying = ref(false);
const billingCycle = ref<'monthly' | 'yearly'>('monthly');

const DEFAULT_PLANS = [
  {
    _id: 'plan-monthly-std',
    name: 'Monthly Scholar Pass',
    description: 'Ideal for semester exam revision, test prep, and clinical bench rotations.',
    price: 250000,
    durationMonths: 1,
    features: [
      'Full access to The Vault (Past questions & Bench protocols)',
      'Departmental & university cohort access',
      'Discussion forums and study groups',
      'Downloadable digital Student Identity verification card',
      'Standard email & WhatsApp desk support'
    ]
  },
  {
    _id: 'plan-yearly-pro',
    name: 'Annual Unlimited Scholar Pass',
    description: 'Comprehensive 12-month access covering two semesters plus clinical rotations.',
    price: 2500000,
    durationMonths: 12,
    features: [
      'Everything in Monthly Scholar Pass',
      '2 months free (Save 17% annually)',
      'Priority Expert Mentorship matchmaking',
      'Exclusive Career Hub hospital placement listings',
      'Offline downloadable study packs & revision decks',
      'Direct priority support desk access'
    ]
  }
];

const displaySubscriptions = computed(() => {
  const source = (subscriptions.value && subscriptions.value.length > 0) ? subscriptions.value : DEFAULT_PLANS;
  if (billingCycle.value === 'monthly') {
    const list = source.filter(p => p.durationMonths === 1 || p.durationMonths <= 3);
    return list.length > 0 ? list : source;
  }
  const list = source.filter(p => p.durationMonths >= 6);
  return list.length > 0 ? list : source;
});

const allUniqueFeatures = computed(() => {
  if (!displaySubscriptions.value) return [];
  const features = new Set<string>();
  displaySubscriptions.value.forEach(plan => {
    if (plan.features && Array.isArray(plan.features)) {
      plan.features.forEach((f: string) => features.add(f));
    }
  });
  if (features.size === 0) {
    DEFAULT_PLANS[1].features.forEach(f => features.add(f));
  }
  return Array.from(features);
});

onMounted(async () => {
  await fetchActive();

  if (route.query.reference) {
    verifying.value = true;
    try {
      const result = await verifyPayment(route.query.reference as string);
      if (result && result.verified) {
        await modalAlert({
          title: 'Subscription Active! 🎉',
          message: 'Payment verified successfully! Your subscription is now active.',
          type: 'success',
        });
        router.push('/dashboard/vault');
      } else {
        await modalAlert({
          title: 'Verification Pending',
          message: 'Payment verification failed or is still pending.',
          type: 'warning',
        });
      }
    } catch (e) {
      await modalAlert({
        title: 'Error',
        message: 'An error occurred during verification.',
        type: 'danger',
      });
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
    const activeSubId = typeof user.value.activeSubscription === 'object'
      ? user.value.activeSubscription._id
      : user.value.activeSubscription;

    if (activeSubId === plan._id) {
      await modalAlert({
        title: 'Current Plan',
        message: 'You are already subscribed to this plan.',
        type: 'info',
      });
      return;
    }
    const confirmUpgrade = await confirm({
      title: 'Switch Plan',
      message: `You currently have an active plan. Do you want to upgrade/switch to "${plan.name}"?`,
      confirmText: 'Yes, Switch Plan',
      cancelText: 'Cancel',
      type: 'info',
    });
    if (!confirmUpgrade) return;
  }

  selectedPlanId.value = plan._id;
  const callbackUrl = `${window.location.origin}/pricing`;
  
  const result = await initializePayment(plan._id, callbackUrl);
  
  if (result && result.authorization_url) {
    window.location.href = result.authorization_url;
  } else {
    await modalAlert({
      title: 'Payment Error',
      message: 'Failed to initialize payment. Please try again.',
      type: 'danger',
    });
  }
  selectedPlanId.value = null;
};
</script>
