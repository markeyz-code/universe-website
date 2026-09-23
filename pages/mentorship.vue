<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center max-w-2xl mx-auto pt-8">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Exclusive</span>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Find your mentor</h1>
      <p class="text-lg text-gray-600">
        Connect with experienced MLS professionals who understand your path forward.
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <button class="px-6 py-2.5 bg-brand text-white rounded font-medium hover:bg-[#1f4e70] transition-colors">
          Match
        </button>
        <button class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors">
          Learn
        </button>
      </div>
    </section>

    <!-- Directory Filter -->
    <section class="flex flex-col md:flex-row gap-12 items-center bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8 py-16">
      <div class="md:w-1/2">
        <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2 block">Directory</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Find mentors by what they know</h2>
        <p class="text-lg text-gray-600 mb-8">
          Search experienced professionals by their specialization and years in the field. Filter by lab management, clinical chemistry, operations, or quality assurance.
        </p>
        <ul class="space-y-3 mb-8 text-sm text-gray-700">
          <li class="flex items-center gap-2"><CheckCircle class="w-4 h-4 text-brand" /> Filter by specializations</li>
          <li class="flex items-center gap-2"><CheckCircle class="w-4 h-4 text-brand" /> Filter by years of experience</li>
          <li class="flex items-center gap-2"><CheckCircle class="w-4 h-4 text-brand" /> View detailed mentor profiles</li>
        </ul>
        <div class="flex gap-4">
           <button class="px-5 py-2 border border-gray-300 bg-white rounded text-sm font-medium text-gray-700 hover:bg-gray-50">Search</button>
           <button class="px-5 py-2 text-brand text-sm font-medium hover:text-[#1f4e70] flex items-center gap-1">Browse <ArrowRight class="w-4 h-4"/></button>
        </div>
      </div>
      <div class="md:w-1/2">
        <img src="/mentor_group.jpg" alt="Mentors" class="rounded-xl shadow-lg w-full object-cover" />
      </div>
    </section>

    <!-- What your mentor provides -->
    <section class="py-16 text-center max-w-5xl mx-auto">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Support</span>
      <h2 class="text-3xl font-bold text-gray-900 mb-4">What your mentor provides</h2>
      <p class="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
        Direct access to someone who has walked the path you're on. Real conversations about real challenges in the lab and beyond.
      </p>

      <div class="grid md:grid-cols-3 gap-12">
        <div class="flex flex-col items-center">
           <div class="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-4">
             <MessageSquare class="w-5 h-5" />
           </div>
           <h3 class="font-bold text-gray-900 mb-2">One-on-one conversations</h3>
           <p class="text-sm text-gray-600">Talk through lab trials, your questions, and your first terms with someone who gets it.</p>
        </div>
        <div class="flex flex-col items-center">
           <div class="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-4">
             <FileText class="w-5 h-5" />
           </div>
           <h3 class="font-bold text-gray-900 mb-2">Resume and application review</h3>
           <p class="text-sm text-gray-600">Get honest feedback on how you present yourself to employers in the field.</p>
        </div>
        <div class="flex flex-col items-center">
           <div class="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-4">
             <Award class="w-5 h-5" />
           </div>
           <h3 class="font-bold text-gray-900 mb-2">Certification guidance</h3>
           <p class="text-sm text-gray-600">Navigate the certifications that matter and understand what they mean for your academic progression.</p>
        </div>
      </div>
      
      <div class="mt-12">
        <button class="px-5 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2">Explore</button>
        <button class="px-5 py-2 text-brand text-sm font-medium hover:text-[#1f4e70]">FAQ &rarr;</button>
      </div>
    </section>

    <!-- Real Outcomes / Testimonial -->
    <section class="py-12 bg-white flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto border-t border-b border-gray-100">
      <div class="md:w-1/3">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Real outcomes</h2>
        <p class="text-gray-600">Students who found their way.</p>
      </div>
      <div class="md:w-2/3 bg-gray-50 p-8 rounded-xl border border-gray-200">
         <div class="flex text-yellow-400 mb-4">
           <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
         </div>
         <p class="text-lg text-gray-900 font-medium mb-6">"My mentor showed me what it takes to move forward in this field."</p>
         <div class="flex items-center gap-3">
           <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
           <div>
             <h4 class="text-sm font-bold text-gray-900">David Mitchell</h4>
             <p class="text-xs text-gray-500">Laboratory Student, Clina</p>
           </div>
         </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="rounded-2xl overflow-hidden relative shadow-lg my-16 max-w-6xl mx-auto">
      <div class="absolute inset-0 bg-gray-900/50 z-10 mix-blend-multiply"></div>
      <img src="/community_network.jpg" class="absolute inset-0 w-full h-full object-cover" />
      <div class="relative z-20 py-20 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to find your mentor?</h2>
        <p class="text-lg text-gray-200 mb-8 max-w-xl mx-auto">Start your mentorship search and get the guidance you need to succeed.</p>
        <div class="flex justify-center gap-4">
          <button class="px-8 py-3 bg-white text-gray-900 rounded font-bold hover:bg-gray-100 transition-colors">Register</button>
          <button class="px-8 py-3 bg-transparent border border-white text-white rounded font-bold hover:bg-white/10 transition-colors">Search</button>
        </div>
      </div>
    </section>

    <!-- Who guides you -->
    <section class="py-16 bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8 text-center">
      <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2 block">Mentors</span>
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Who guides you</h2>
      <p class="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
        These professionals bring years of field experience to your development.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <!-- Profile 1 -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <div class="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center"><User class="text-gray-400 w-8 h-8"/></div>
          <h4 class="font-bold text-gray-900">Robert DeBate</h4>
          <p class="text-xs text-brand font-medium mb-3">Lab Director</p>
          <p class="text-xs text-gray-500 text-center">Twenty years managing teams and building quality systems in clinical labs.</p>
        </div>
        <!-- Profile 2 -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <div class="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center"><User class="text-gray-400 w-8 h-8"/></div>
          <h4 class="font-bold text-gray-900">Patricia Hayes</h4>
          <p class="text-xs text-brand font-medium mb-3">Chemistry Specialist</p>
          <p class="text-xs text-gray-500 text-center">15 years in analytical workflows with a track record of mentoring emerging talent.</p>
        </div>
        <!-- Profile 3 -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <div class="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center"><User class="text-gray-400 w-8 h-8"/></div>
          <h4 class="font-bold text-gray-900">Michael Barnes</h4>
          <p class="text-xs text-brand font-medium mb-3">Operations Manager</p>
          <p class="text-xs text-gray-500 text-center">Knows the business side and how to navigate academic growth strategically.</p>
        </div>
        <!-- Profile 4 -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <div class="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center"><User class="text-gray-400 w-8 h-8"/></div>
          <h4 class="font-bold text-gray-900">Jennifer Blake</h4>
          <p class="text-xs text-brand font-medium mb-3">Quality Assurance</p>
          <p class="text-xs text-gray-500 text-center">Dedicated to compliance and excellence with a passion for developing others.</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Questions</h2>
        <p class="text-gray-600">Everything you need to know about finding and working with a mentor.</p>
      </div>

      <div class="space-y-4">
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            How do I find a mentor?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            Browse our mentor directory and filter by specialization and experience level. Review profiles and request a match that fits your goals.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            What if we don't click?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            If the match doesn't work out right away, you can request a different mentor. We want this relationship to be valuable for both of you.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            How often do we meet?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            That's between you and your mentor. Some meet weekly, others monthly. You set the schedule that works for both of you.
          </div>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { CheckCircle, ArrowRight, MessageSquare, FileText, Award, Star, User } from 'lucide-vue-next';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Mentorship Matcher | UniVerse Ecosystem' });
useHead({ title: 'Mentorship Matcher | UniVerse Ecosystem' });
</script>
