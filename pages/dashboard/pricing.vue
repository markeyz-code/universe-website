<template>
  <div class="space-y-6 pb-12">
    <!-- Header & Billing Cycle Selector -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Subscription Plans</h1>
        <p class="text-gray-500 text-sm mt-0.5">Choose the plan that fits your clinical and academic needs.</p>
      </div>

      <!-- Billing Cycle Toggle -->
      <div class="flex items-center gap-3 self-start sm:self-auto">
        <div class="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200/80 shadow-inner">
          <button
            @click="billingCycle = 'monthly'"
            :class="billingCycle === 'monthly' ? 'bg-white text-brand font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900 font-medium'"
            class="px-5 py-2 rounded-lg text-xs transition-all"
          >
            Monthly Billing
          </button>
          <button
            @click="billingCycle = 'yearly'"
            :class="billingCycle === 'yearly' ? 'bg-white text-brand font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900 font-medium'"
            class="px-5 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5"
          >
            <span>Annual Billing</span>
            <span class="bg-green-100 text-green-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
      <p class="text-gray-500 text-sm mt-4 font-medium">Loading subscription tiers...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredSubscriptions.length === 0" class="text-center py-16 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
      <div class="w-16 h-16 bg-brand/5 text-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
        <CreditCard class="w-8 h-8 text-brand" />
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-1">No plans available</h3>
      <p class="text-gray-500 text-sm max-w-sm mx-auto mb-4">There are currently no active plans available for the selected billing cycle.</p>
      <button @click="billingCycle = billingCycle === 'monthly' ? 'yearly' : 'monthly'" class="px-4 py-2 bg-brand text-white rounded-xl text-xs font-bold hover:bg-brand/90 transition-all">
        Switch to {{ billingCycle === 'monthly' ? 'Annual' : 'Monthly' }}
      </button>
    </div>

    <!-- Unified Comparison Matrix -->
    <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-200/90 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[700px]">
          <!-- Plan Headers -->
          <thead>
            <tr class="divide-x divide-gray-100">
              <!-- Empty Corner / Context Column -->
              <th class="p-6 bg-gray-50/70 w-1/4 align-bottom border-b border-gray-200">
                <span class="text-xs font-extrabold text-violet-600 uppercase tracking-wider block mb-1">UniVerse Membership</span>
                <h3 class="text-lg font-bold text-gray-900">Compare Plans</h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">Select the subscription level with the exact resource access you require.</p>
              </th>

              <!-- Plan Header Columns -->
              <th
                v-for="(plan, index) in filteredSubscriptions"
                :key="'head-' + plan._id"
                class="p-6 bg-gray-50/70 border-b border-gray-200 text-center relative group transition-colors"
                :class="[
                  index === 1 ? 'bg-brand/[0.02]' : '',
                  'w-1/' + (filteredSubscriptions.length + 1)
                ]"
              >
                <!-- Popular Badge (for middle / recommended plan) -->
                <div v-if="index === 1 || plan.name.toLowerCase().includes('basic') || plan.name.toLowerCase().includes('popular')" class="mb-2">
                  <span class="inline-flex bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Recommended
                  </span>
                </div>
                <div v-else class="h-6"></div>

                <h4 class="text-lg font-bold text-gray-900 mb-1">{{ plan.name }}</h4>
                <p class="text-xs text-gray-500 mb-3 min-h-[32px] line-clamp-2 px-2">{{ plan.description || 'Full platform access' }}</p>

                <!-- Pricing Display -->
                <div class="mb-4">
                  <div class="flex items-baseline justify-center gap-1">
                    <span class="text-3xl font-extrabold text-gray-900 tracking-tight">₦{{ (plan.price / 100).toLocaleString() }}</span>
                    <span class="text-xs font-semibold text-gray-500">/{{ plan.durationMonths > 1 ? plan.durationMonths + ' mos' : 'mo' }}</span>
                  </div>
                  <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Billed {{ plan.durationMonths === 1 ? 'monthly' : 'annually' }}</p>
                </div>

                <!-- Action Button -->
                <button
                  @click="handleSubscribe(plan)"
                  :disabled="paymentLoading || getPlanStatus(plan, index) !== 'upgrade'"
                  class="w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  :class="[
                    getPlanStatus(plan, index) === 'current'
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : getPlanStatus(plan, index) === 'downgrade'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-violet-600 text-white hover:bg-violet-700 hover:shadow-md active:scale-95'
                  ]"
                >
                  <span v-if="paymentLoading && selectedPlanId === plan._id" class="flex items-center gap-2">
                    <div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </span>
                  <span v-else-if="getPlanStatus(plan, index) === 'current'" class="flex items-center gap-1.5">
                    <Check class="w-4 h-4" />
                    <span>Current Plan</span>
                  </span>
                  <span v-else-if="getPlanStatus(plan, index) === 'downgrade'">
                    Unavailable
                  </span>
                  <span v-else>Select {{ plan.name }}</span>
                </button>
              </th>
            </tr>
          </thead>

          <!-- Feature Comparison Matrix -->
          <tbody class="divide-y divide-gray-100">
            <!-- Section Title -->
            <tr class="bg-gray-50/90">
              <td :colspan="filteredSubscriptions.length + 1" class="px-6 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider border-y border-gray-200">
                Features & Resource Inclusions
              </td>
            </tr>

            <!-- Feature Rows -->
            <tr
              v-for="feature in allUniqueFeatures"
              :key="feature"
              class="divide-x divide-gray-100 hover:bg-gray-50/50 transition-colors"
            >
              <td class="px-6 py-4 text-xs font-semibold text-gray-700">
                {{ feature }}
              </td>

              <td
                v-for="(plan, index) in filteredSubscriptions"
                :key="plan._id + '-' + feature"
                class="px-6 py-4 text-center"
                :class="index === 1 ? 'bg-brand/[0.01]' : ''"
              >
                <div v-if="plan.features && plan.features.includes(feature)" class="flex justify-center items-center">
                  <div class="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                    <Check class="w-4 h-4 text-brand stroke-[2.5]" />
                  </div>
                </div>
                <div v-else class="text-gray-300 font-bold text-sm">
                  —
                </div>
              </td>
            </tr>

            <!-- Bottom CTA Row -->
            <tr class="divide-x divide-gray-100 bg-gray-50/40">
              <td class="p-6 align-middle font-bold text-xs text-gray-500 uppercase tracking-wider">
                Ready to get started?
              </td>

              <td
                v-for="plan in filteredSubscriptions"
                :key="'foot-' + plan._id"
                class="p-5 text-center"
              >
                <button
                  @click="handleSubscribe(plan)"
                  :disabled="paymentLoading || getPlanStatus(plan, index) !== 'upgrade'"
                  class="w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  :class="[
                    getPlanStatus(plan, index) === 'current'
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : getPlanStatus(plan, index) === 'downgrade'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-violet-600 text-white hover:bg-violet-700 hover:shadow-md active:scale-95'
                  ]"
                >
                  <span v-if="paymentLoading && selectedPlanId === plan._id" class="flex items-center gap-1.5">
                    <div class="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                  </span>
                  <span v-else-if="getPlanStatus(plan, index) === 'current'" class="flex items-center gap-1.5">
                    <Check class="w-4 h-4" />
                    <span>Current Plan</span>
                  </span>
                  <span v-else-if="getPlanStatus(plan, index) === 'downgrade'">
                    Unavailable
                  </span>
                  <span v-else>Get {{ plan.name }}</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Verification Modal -->
    <Teleport to="body">
      <div v-if="verifying" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-gray-100">
          <div class="animate-spin rounded-full h-12 w-12 border-2 border-brand border-t-transparent mx-auto mb-4"></div>
          <h3 class="text-xl font-bold text-gray-900 mb-1">Verifying Payment</h3>
          <p class="text-gray-500 text-xs">Please wait while we confirm your transaction with Paystack...</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSeoMeta, useHead } from '#imports';
import { Check, CreditCard } from 'lucide-vue-next';
import { useSubscriptions } from '@/composables/modules/subscriptions/useSubscriptions';
import { usePayments } from '@/composables/modules/payments/usePayments';
import { useAuth } from '@/composables/core/useAuth';
import { useCustomModal } from '@/composables/core/useCustomModal';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Subscription | Dashboard' });
useHead({ title: 'Subscription | Dashboard' });

const router = useRouter();
const route = useRoute();
const { isAuthenticated, user, initAuth } = useAuth();
const { loading, subscriptions, fetchActive } = useSubscriptions();
const { loading: paymentLoading, initializePayment, verifyPayment } = usePayments();
const { confirm, alert: modalAlert } = useCustomModal();

const selectedPlanId = ref<string | null>(null);
const verifying = ref(false);
const billingCycle = ref<'monthly' | 'yearly'>('monthly');

const activeSubscriptionId = computed(() => {
  if (!user.value?.activeSubscription) return null;
  return typeof user.value.activeSubscription === 'object'
    ? user.value.activeSubscription._id
    : user.value.activeSubscription;
});

const getPlanStatus = (plan: any, index: number) => {
  if (!activeSubscriptionId.value) return 'upgrade'; // If no sub, they can buy any
  
  const activePlanIndex = filteredSubscriptions.value.findIndex(p => p._id === activeSubscriptionId.value);
  if (activePlanIndex === -1) return 'upgrade';

  if (plan._id === activeSubscriptionId.value) return 'current';
  if (index < activePlanIndex) return 'downgrade';
  return 'upgrade';
};

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
    if (plan.features) {
      plan.features.forEach((f: string) => features.add(f));
    }
  });
  return Array.from(features);
});

onMounted(async () => {
  initAuth();
  await fetchActive();

  if (route.query.reference) {
    verifying.value = true;
    try {
      const result = await verifyPayment(route.query.reference as string);
      if (result && result.verified) {
        await modalAlert({
          title: 'Subscription Active! 🎉',
          message: 'Payment verified successfully! Your subscription privileges are now live.',
          type: 'success',
        });
        router.push('/dashboard/overview');
      } else {
        await modalAlert({
          title: 'Verification Pending',
          message: 'Payment verification failed or is still being processed.',
          type: 'warning',
        });
      }
    } catch (e) {
      await modalAlert({
        title: 'Verification Error',
        message: 'An error occurred during payment verification. Please check your transaction.',
        type: 'danger',
      });
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
      title: 'Switch Subscription Plan',
      message: `You currently have an active plan. Do you want to upgrade/switch to "${plan.name}"?`,
      confirmText: 'Yes, Switch Plan',
      cancelText: 'Cancel',
      type: 'info',
    });
    if (!confirmUpgrade) return;
  }

  selectedPlanId.value = plan._id;
  const callbackUrl = `${window.location.origin}/dashboard/pricing`;

  const result = await initializePayment(plan._id, callbackUrl);

  if (result) {
    // If it's a free plan or auto-activated
    if (result.isFree || !result.authorization_url) {
      await modalAlert({
        title: 'Plan Activated! 🎉',
        message: result.message || `"${plan.name}" has been activated successfully!`,
        type: 'success',
      });
      router.push('/dashboard/overview');
      return;
    }

    if (result.authorization_url) {
      window.location.href = result.authorization_url;
      return;
    }
  }

  selectedPlanId.value = null;
};
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
