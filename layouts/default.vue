<template>
  <div class="min-h-screen flex flex-col bg-[#F6F8FB] font-sans">
    <!-- Utility bar -->
    <div class="bg-navy-950 text-white/65">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
        <p class="text-[10px] sm:text-[11px] font-medium tracking-wide">
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 align-middle"></span>
          A verified Medical Laboratory Science community
        </p>
        <div class="hidden sm:flex items-center gap-6 text-[10px] sm:text-[11px] font-medium">
          <span>Applications reviewed in 24–48 hours</span>
          <a href="mailto:support@medlabconvo.com" class="hover:text-white transition-colors">support@medlabconvo.com</a>
        </div>
      </div>
    </div>

    <!-- Primary navigation -->
    <header class="sticky top-0 z-50 border-b border-navy-100/80 bg-white/90 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="h-[76px] flex items-center justify-between gap-6">
          <NuxtLink to="/" class="flex items-center gap-3 shrink-0 group" aria-label="UniVerse home">
            <BrandLogo variant="brand" class="h-8 group-hover:opacity-80 transition-opacity" />
            <span class="hidden sm:block h-7 w-px bg-navy-100"></span>
            <span class="hidden sm:block font-display text-xl font-bold tracking-tight text-navy-950">
              UniVerse<span class="text-teal-500">.</span>
            </span>
          </NuxtLink>

          <nav class="hidden lg:flex items-center gap-1 rounded-full border border-navy-100 bg-white/70 p-1.5 shadow-sm">
            <NuxtLink
              v-for="item in navItems"
              :key="item.label"
              :to="item.to"
              class="px-4 py-2 rounded-full text-[13px] font-semibold text-navy-500 hover:text-brand hover:bg-brand-50 transition-all"
              active-class="!text-brand !bg-brand-50"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="flex items-center gap-2 sm:gap-3">
            <template v-if="isLoggedIn">
              <NuxtLink to="/dashboard/overview" class="btn-primary !px-5 !py-2.5 !text-[13px]">
                Dashboard
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6-6 6 6-6 6"/></svg>
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="hidden sm:block px-4 py-2 text-[13px] font-bold text-navy-600 hover:text-brand transition-colors">
                Sign in
              </NuxtLink>
              <NuxtLink to="/register" class="btn-primary !px-5 !py-2.5 !text-[13px]">
                Apply now
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6-6 6 6-6 6"/></svg>
              </NuxtLink>
            </template>

            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="lg:hidden w-10 h-10 rounded-full border border-navy-100 bg-white text-navy-700 flex items-center justify-center hover:bg-navy-50 transition-colors"
              :aria-expanded="mobileMenuOpen"
              aria-label="Toggle navigation"
            >
              <svg v-if="!mobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16"/></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden border-t border-navy-100 bg-white shadow-xl">
          <nav class="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-1.5">
            <NuxtLink
              v-for="item in navItems"
              :key="'m-' + item.label"
              :to="item.to"
              @click="mobileMenuOpen = false"
              class="px-4 py-3 rounded-xl text-sm font-semibold text-navy-700 hover:bg-brand-50 hover:text-brand transition-colors"
              active-class="!bg-brand-50 !text-brand"
            >
              {{ item.label }}
            </NuxtLink>
            <NuxtLink v-if="isLoggedIn" to="/dashboard/overview" @click="mobileMenuOpen = false" class="px-4 py-3 rounded-xl text-sm font-bold bg-brand text-white text-center">Dashboard</NuxtLink>
            <NuxtLink v-else to="/login" @click="mobileMenuOpen = false" class="px-4 py-3 rounded-xl text-sm font-bold bg-navy-50 text-navy-900 text-center">Sign in</NuxtLink>
          </nav>
        </div>
      </transition>
    </header>

    <main class="flex-grow flex flex-col">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="relative overflow-hidden bg-navy-950 text-white">
      <div class="absolute inset-0 brand-grid opacity-[0.06]"></div>
      <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-5">
            <div class="flex items-center gap-3 mb-6">
              <BrandLogo variant="white" class="h-9" />
              <span class="font-display text-xl font-bold">UniVerse<span class="text-teal-400">.</span></span>
            </div>
            <h3 class="font-display text-2xl md:text-3xl font-bold leading-tight max-w-sm">
              The professional home for the next generation of scientists.
            </h3>
            <p class="mt-4 text-sm leading-relaxed text-white/55 max-w-md">
              Verified students, practical resources and a community that moves together — from first year to first job.
            </p>
            <div class="mt-7 space-y-2.5 text-sm text-white/60">
              <p class="flex items-center gap-2.5"><Mail class="w-4 h-4 text-teal-400" /> <a href="mailto:support@medlabconvo.com" class="hover:text-white transition-colors">support@medlabconvo.com</a></p>
              <p class="flex items-center gap-2.5"><Phone class="w-4 h-4 text-teal-400" /> <a href="tel:+2348130000000" class="hover:text-white transition-colors">+234 813 000 0000</a></p>
              <p class="flex items-center gap-2.5"><MapPin class="w-4 h-4 text-teal-400" /> MedLabConvo Hub, Lagos, Nigeria</p>
            </div>
          </div>

          <div class="lg:col-span-2">
            <h4 class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/40 mb-5">Platform</h4>
            <ul class="space-y-3 text-sm text-white/60">
              <li><NuxtLink to="/community" class="hover:text-white transition-colors">Community</NuxtLink></li>
              <li><NuxtLink to="/dashboard/vault" class="hover:text-white transition-colors">The Vault</NuxtLink></li>
              <li><NuxtLink to="/mentorship" class="hover:text-white transition-colors">Find a mentor</NuxtLink></li>
              <li><NuxtLink to="/career" class="hover:text-white transition-colors">Career board</NuxtLink></li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <h4 class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/40 mb-5">Company</h4>
            <ul class="space-y-3 text-sm text-white/60">
              <li><NuxtLink to="/pricing" class="hover:text-white transition-colors">Pricing &amp; plans</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-white transition-colors">Contact us</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="hover:text-white transition-colors">Privacy policy</NuxtLink></li>
              <li><NuxtLink to="/terms" class="hover:text-white transition-colors">Terms of service</NuxtLink></li>
            </ul>
          </div>

          <div class="lg:col-span-3">
            <h4 class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/40 mb-5">Stay in the loop</h4>
            <p class="text-sm text-white/55 leading-relaxed mb-4">New resources, mentor sessions and opportunities — once a month, no noise.</p>
            <form class="flex items-center gap-2" @submit.prevent="subscribeNewsletter">
              <input
                v-model="newsletterEmail"
                type="email"
                required
                placeholder="you@email.com"
                class="min-w-0 flex-1 rounded-full bg-white/10 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-teal-400/70 focus:ring-2 focus:ring-teal-400/20 disabled:opacity-50"
                :disabled="loading"
              />
              <button type="submit" :disabled="loading" class="shrink-0 rounded-full bg-teal-500 px-4 py-2.5 text-sm font-bold text-navy-950 hover:bg-teal-400 transition-colors disabled:opacity-50">
                {{ loading ? '…' : 'Join' }}
              </button>
            </form>
            <p v-if="success" class="text-teal-300 text-xs mt-2 font-medium">You’re on the list.</p>
            <p v-if="error" class="text-red-300 text-xs mt-2 font-medium">{{ error }}</p>
          </div>
        </div>

        <div class="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-white/35">&copy; {{ new Date().getFullYear() }} MedLabConvo · UniVerse. All rights reserved.</p>
          <div class="flex items-center gap-2 text-xs text-white/35">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            Built for Medical Laboratory Science
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Mail, Phone, MapPin } from 'lucide-vue-next';
import { useCreateEnquiry } from '@/composables/modules/enquiries/useCreateEnquiry';
import { useAuth } from '@/composables/core/useAuth';

const { isLoggedIn, initAuth } = useAuth();
const mobileMenuOpen = ref(false);
const newsletterEmail = ref('');
const { loading, error, success, createEnquiry } = useCreateEnquiry();

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Community', to: '/community' },
  { label: 'Vault', to: '/dashboard/vault' },
  { label: 'Career', to: '/career' },
  { label: 'Mentors', to: '/mentorship' },
  { label: 'Pricing', to: '/pricing' },
];

onMounted(() => {
  initAuth();
});

const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) return;
  await createEnquiry({
    name: 'Newsletter Subscriber',
    email: newsletterEmail.value,
    message: 'Subscribed to the UniVerse newsletter',
  });
  if (success.value) {
    newsletterEmail.value = '';
    setTimeout(() => { success.value = false; }, 3000);
  }
};
</script>
