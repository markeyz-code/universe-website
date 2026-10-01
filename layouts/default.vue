<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-brand/20">
    <!-- Creative Floating Glassmorphism Navbar -->
    <div class="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 pointer-events-none transition-all duration-500">
      <header class="pointer-events-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg shadow-brand/5 transition-all duration-500 w-full max-w-5xl">
        <!-- Logo -->
        <div class="flex items-center shrink-0">
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-full bg-brand/5 group-hover:scale-105 transition-transform shadow-sm">
              <img src="~/assets/logo-icon.png" class="absolute inset-0 w-full h-full object-cover" alt="UniVerse Logo" />
            </div>
            <span class="font-bold text-lg md:text-xl tracking-tight text-gray-900 group-hover:text-brand transition-colors">UniVerse<span class="text-brand">.</span></span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6 font-sans font-medium text-sm text-gray-500">
          <NuxtLink to="/" class="hover:text-brand transition-colors duration-300 relative group cursor-pointer" exact-active-class="text-brand">
            <span>Home</span>
            <div class="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2" :class="{ 'opacity-100': $route.path === '/' }"></div>
          </NuxtLink>
          <NuxtLink to="/community" class="hover:text-brand transition-colors duration-300 relative group cursor-pointer" active-class="text-brand">
            <span>Community</span>
            <div class="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2" :class="{ 'opacity-100': $route.path.includes('/community') }"></div>
          </NuxtLink>
          <NuxtLink to="/dashboard/vault" class="hover:text-brand transition-colors duration-300 relative group cursor-pointer" active-class="text-brand">
            <span>Vault</span>
            <div class="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2" :class="{ 'opacity-100': $route.path.includes('/dashboard/vault') }"></div>
          </NuxtLink>
          <NuxtLink to="/career" class="hover:text-brand transition-colors duration-300 relative group cursor-pointer" active-class="text-brand">
            <span>Career</span>
            <div class="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2" :class="{ 'opacity-100': $route.path.includes('/career') }"></div>
          </NuxtLink>
          <NuxtLink to="/mentorship" class="hover:text-brand transition-colors duration-300 relative group cursor-pointer" active-class="text-brand">
            <span>Mentors</span>
            <div class="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2" :class="{ 'opacity-100': $route.path.includes('/mentorship') }"></div>
          </NuxtLink>
          <NuxtLink to="/pricing" class="hover:text-brand transition-colors duration-300 relative group cursor-pointer" active-class="text-brand">
            <span>Pricing</span>
            <div class="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2" :class="{ 'opacity-100': $route.path.includes('/pricing') }"></div>
          </NuxtLink>
        </nav>

        <!-- Auth Actions & Mobile Toggle -->
        <div class="flex items-center space-x-2 sm:space-x-4 shrink-0">
          <template v-if="isLoggedIn">
            <NuxtLink to="/dashboard/overview" class="group relative inline-flex items-center justify-center bg-brand text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#1a405c] transition-all overflow-hidden shadow-sm shadow-brand/20 hover:shadow-md hover:shadow-brand/30 hover:-translate-y-0.5">
              <span class="relative z-10 flex items-center gap-1 sm:gap-2">Dashboard <span class="group-hover:translate-x-1 transition-transform">→</span></span>
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="hidden sm:block text-sm font-bold text-gray-500 hover:text-brand transition-colors">Sign In</NuxtLink>
            <NuxtLink to="/register" class="group relative inline-flex items-center justify-center bg-brand text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#1a405c] transition-all overflow-hidden shadow-sm shadow-brand/20 hover:shadow-md hover:shadow-brand/30 hover:-translate-y-0.5">
              <span class="relative z-10 flex items-center gap-1 sm:gap-2">Apply Now <span class="group-hover:translate-x-1 transition-transform">→</span></span>
            </NuxtLink>
          </template>

          <!-- Hamburger button for mobile -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-gray-600 hover:text-brand transition-colors rounded-full hover:bg-gray-100 cursor-pointer">
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </header>

      <!-- Mobile Menu Dropdown -->
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform -translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform -translate-y-4 opacity-0">
        <div v-if="mobileMenuOpen" class="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden md:hidden pointer-events-auto">
          <nav class="flex flex-col p-4">
            <NuxtLink to="/" @click="mobileMenuOpen = false" class="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand/5 hover:text-brand rounded-xl" active-class="text-brand bg-brand/5">Home</NuxtLink>
            <NuxtLink to="/community" @click="mobileMenuOpen = false" class="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand/5 hover:text-brand rounded-xl" active-class="text-brand bg-brand/5">Community</NuxtLink>
            <NuxtLink to="/dashboard/vault" @click="mobileMenuOpen = false" class="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand/5 hover:text-brand rounded-xl" active-class="text-brand bg-brand/5">Vault</NuxtLink>
            <NuxtLink to="/career" @click="mobileMenuOpen = false" class="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand/5 hover:text-brand rounded-xl" active-class="text-brand bg-brand/5">Career</NuxtLink>
            <NuxtLink to="/mentorship" @click="mobileMenuOpen = false" class="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand/5 hover:text-brand rounded-xl" active-class="text-brand bg-brand/5">Mentors</NuxtLink>
            <NuxtLink to="/pricing" @click="mobileMenuOpen = false" class="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand/5 hover:text-brand rounded-xl" active-class="text-brand bg-brand/5">Pricing</NuxtLink>
            <div class="border-t border-gray-100 my-2"></div>
            <template v-if="isLoggedIn">
              <NuxtLink to="/dashboard/overview" @click="mobileMenuOpen = false" class="px-4 py-3 text-sm font-bold text-brand bg-brand/5 hover:bg-brand/10 rounded-xl flex items-center justify-between">
                <span>Go to Dashboard</span>
                <span>→</span>
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/login" @click="mobileMenuOpen = false" class="px-4 py-3 text-sm font-bold text-gray-700 hover:bg-brand/5 hover:text-brand rounded-xl">Sign In</NuxtLink>
            </template>
          </nav>
        </div>
      </transition>
    </div>

    <main :class="['flex-grow flex flex-col', $route.path === '/' ? 'pt-0' : 'pt-32']">
      <slot />
    </main>

    <!-- Modern Footer -->
    <footer class="bg-white border-t border-gray-100 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-1">
            <NuxtLink to="/" class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-brand/5 overflow-hidden">
                <img src="~/assets/logo-icon.png" class="w-full h-full object-cover" alt="UniVerse Logo" />
              </div>
              <span class="font-bold text-xl text-gray-900">UniVerse</span>
            </NuxtLink>
            <p class="text-sm text-gray-500 leading-relaxed mb-6">The premier ecosystem and community for University Students. Elevate your potential.</p>
            <div class="flex items-center gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand/10 hover:text-brand transition-all">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand/10 hover:text-brand transition-all">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="font-bold text-gray-900 mb-6">Ecosystem</h4>
            <ul class="space-y-4">
              <li><NuxtLink to="/community" class="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Community</NuxtLink></li>
              <li><NuxtLink to="/mentorship" class="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Find a Mentor</NuxtLink></li>
              <li><NuxtLink to="/dashboard/vault" class="text-gray-500 hover:text-brand transition-colors text-sm font-medium">The Vault</NuxtLink></li>
              <li><NuxtLink to="/career" class="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Career Board</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold text-gray-900 mb-6">Company</h4>
            <ul class="space-y-4">
              <li><NuxtLink to="/pricing" class="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Pricing & Plans</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Contact Us</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/terms" class="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Terms of Service</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold text-gray-900 mb-6">Stay updated</h4>
            <p class="text-sm text-gray-500 mb-4 leading-relaxed">Join our newsletter to stay up to date on features and releases.</p>
            <form class="flex" @submit.prevent="subscribeNewsletter">
              <input v-model="newsletterEmail" type="email" required placeholder="Enter your email" class="w-full px-4 py-2.5 rounded-l-lg border border-gray-200 text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none disabled:opacity-50" :disabled="loading" />
              <button type="submit" :disabled="loading" class="bg-gray-900 text-white px-4 py-2.5 rounded-r-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
                <span v-if="loading">Wait</span>
                <span v-else>Subscribe</span>
              </button>
            </form>
            <p v-if="success" class="text-green-600 text-xs mt-2 font-medium">Successfully subscribed!</p>
            <p v-if="error" class="text-red-500 text-xs mt-2 font-medium">{{ error }}</p>
          </div>
        </div>
        
        <div class="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-sm text-gray-500 font-medium">
            &copy; {{ new Date().getFullYear() }} UniVerse Ecosystem. All rights reserved.
          </div>
          <!-- <div class="flex items-center gap-2 text-sm text-gray-500">
            Crafted with <span class="text-red-500">♥</span> for Students
          </div> -->
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCreateEnquiry } from '@/composables/modules/enquiries/useCreateEnquiry';
import { useAuth } from '@/composables/core/useAuth';

const { isLoggedIn, initAuth } = useAuth();

onMounted(() => {
  initAuth();
});

const mobileMenuOpen = ref(false);
const newsletterEmail = ref('');
const { loading, error, success, createEnquiry } = useCreateEnquiry();

const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) return;
  await createEnquiry({
    name: 'Newsletter Subscriber',
    email: newsletterEmail.value,
    message: 'Subscribed to the newsletter'
  });
  if (success.value) {
    newsletterEmail.value = '';
    setTimeout(() => { success.value = false }, 3000);
  }
};
</script>
