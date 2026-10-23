<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gray-50 py-24 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h3 class="text-sm font-semibold text-brand tracking-wider uppercase mb-3">Community</h3>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Build your network</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Connect with peers, search for mentors, and give or seek advice.
        </p>
        <div class="flex justify-center gap-4">
          <NuxtLink to="/register" class="bg-brand hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Join
          </NuxtLink>
          <NuxtLink to="/login" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium transition-colors">
            Explore
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Alternating Features -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        <!-- Feature 1 -->
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="lg:w-1/2">
            <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">01 Discussions</span>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Where ideas meet real experience</h2>
            <p class="text-lg text-gray-600 mb-8">
              Post questions, start debates, and learn from those further down their academic path. See what experts in Medical Laboratory science are talking about.
            </p>
            <NuxtLink to="/register" class="text-brand font-medium hover:text-violet-700 flex items-center gap-2">
              Browse <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </div>
          <div class="lg:w-1/2">
            <img src="/community_network.jpg" alt="Networking professionals" class="rounded-2xl shadow-xl w-full h-[400px] object-cover" />
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div class="lg:w-1/2">
            <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">02 Resources</span>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Access what others have built</h2>
            <p class="text-lg text-gray-600 mb-8">
              Find the guides and insider tips shared by the community. Build the path you want without reinventing the wheel.
            </p>
            <NuxtLink to="/register" class="text-brand font-medium hover:text-violet-700 flex items-center gap-2">
              Explore <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </div>
          <div class="lg:w-1/2">
            <img src="/documents_verify.jpg" alt="Resources and Guides" class="rounded-2xl shadow-xl w-full h-[400px] object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-sm font-semibold text-brand tracking-wider uppercase">Upcoming</span>
          <h2 class="text-3xl font-bold text-gray-900 mt-2">Events</h2>
          <p class="text-gray-600 mt-4">Learn from experts in your field</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Event Card 1 -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div class="h-48 bg-gray-200">
              <img src="/community_network.jpg" alt="Event" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
              <div class="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                <span class="flex items-center"><Calendar class="w-4 h-4 mr-1"/> Oct 24, 2026</span>
                <span class="flex items-center"><Video class="w-4 h-4 mr-1"/> Virtual</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Market analysis masterclass</h3>
              <p class="text-sm text-gray-600 mb-4">Learn how the best trends are shifting and adapt your resume.</p>
              <NuxtLink to="/register" class="text-brand text-sm font-medium">RSVP &rarr;</NuxtLink>
            </div>
          </div>
          
          <!-- Event Card 2 -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div class="h-48 bg-gray-200">
              <img src="/documents_verify.jpg" alt="Event" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
              <div class="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                <span class="flex items-center"><Calendar class="w-4 h-4 mr-1"/> Nov 02, 2026</span>
                <span class="flex items-center"><MapPin class="w-4 h-4 mr-1"/> Abuja</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Speed networking session</h3>
              <p class="text-sm text-gray-600 mb-4">Connect with 20 experts across the country in one evening.</p>
              <NuxtLink to="/register" class="text-brand text-sm font-medium">RSVP &rarr;</NuxtLink>
            </div>
          </div>

          <!-- Event Card 3 -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div class="h-48 bg-gray-200 bg-brand/10"></div>
            <div class="p-6">
              <div class="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                <span class="flex items-center"><Calendar class="w-4 h-4 mr-1"/> Nov 15, 2026</span>
                <span class="flex items-center"><Video class="w-4 h-4 mr-1"/> Virtual</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Find your summer mentor</h3>
              <p class="text-sm text-gray-600 mb-4">Hear how top labs select their student groups and what they look for.</p>
              <NuxtLink to="/register" class="text-brand text-sm font-medium">RSVP &rarr;</NuxtLink>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-10">
          <button class="px-6 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100">View all</button>
        </div>
      </div>
    </section>

    <!-- Community Leaders -->
    <section class="py-24 bg-white border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-sm font-semibold text-brand tracking-wider uppercase">Leadership & Preceptors</span>
        <h2 class="text-3xl font-bold text-gray-900 mt-2 mb-16">Ecosystem Leadership Team</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Leader 1 -->
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
            <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-brand to-violet-500 text-white mb-4 flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
              MQ
            </div>
            <h4 class="font-bold text-gray-900 text-base">Marquis</h4>
            <p class="text-xs text-brand font-semibold mb-2">Platform & Community Lead</p>
            <p class="text-xs text-gray-600 leading-relaxed text-center">Architecting digital infrastructure and academic initiatives for MLS scholars across the federation.</p>
          </div>
          <!-- Leader 2 -->
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
            <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white mb-4 flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
              OM
            </div>
            <h4 class="font-bold text-gray-900 text-base">Oluwamuyiwa</h4>
            <p class="text-xs text-brand font-semibold mb-2">Clinical Operations & Preceptors</p>
            <p class="text-xs text-gray-600 leading-relaxed text-center">Coordinates clinical rotation partnerships, hospital preceptor standards, and mock oral examinations.</p>
          </div>
          <!-- Leader 3 -->
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
            <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-brand text-white mb-4 flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
              MR
            </div>
            <h4 class="font-bold text-gray-900 text-base">Miracle</h4>
            <p class="text-xs text-brand font-semibold mb-2">Student Engagement Director</p>
            <p class="text-xs text-gray-600 leading-relaxed text-center">Curates interactive study webinars, campus ambassador chapters, and community study halls.</p>
          </div>
          <!-- Leader 4 -->
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
            <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-brand text-white mb-4 flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
              OY
            </div>
            <h4 class="font-bold text-gray-900 text-base">Oyindamola</h4>
            <p class="text-xs text-brand font-semibold mb-2">Academic & Mentorship Lead</p>
            <p class="text-xs text-gray-600 leading-relaxed text-center">Oversees The Vault syllabus archives, practical bench guidelines, and 1-on-1 mentor pairings.</p>
          </div>
        </div>

        <div class="mt-16 bg-violet-50/60 rounded-2xl p-8 max-w-2xl mx-auto border border-violet-100">
          <h3 class="text-xl font-bold text-gray-900 mb-2">Contribute to UniVerse</h3>
          <p class="text-gray-600 text-xs mb-6 leading-relaxed">Are you a high-achieving MLS student, researcher, or senior scientist? Help mentor the next generation or become a campus coordinator.</p>
          <NuxtLink to="/contact" class="px-6 py-2.5 bg-brand text-white rounded-lg text-xs font-bold hover:bg-violet-700 transition-colors inline-block shadow-sm">Get in Touch with Leadership</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Bottom CTA CTA -->
    <section class="bg-gray-900 py-24 relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">Ready to find your people?</h2>
        <p class="text-xl text-gray-300 mb-10">Join thousands of students building their studies today.</p>
        <NuxtLink to="/register" class="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block">
          Join Now
        </NuxtLink>
      </div>
      <img src="/community_network.jpg" alt="Background" class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { ArrowRight, Calendar, Video, MapPin } from 'lucide-vue-next';

useSeoMeta({ title: 'Community | UniVerse Ecosystem' });
useHead({ title: 'Community | UniVerse Ecosystem' });
</script>
