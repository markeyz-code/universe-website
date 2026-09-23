<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center max-w-2xl mx-auto pt-8">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Contact</span>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Reach out today</h1>
      <p class="text-lg text-gray-600">
        We're here to help you navigate the MLS community and answer your questions.
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <button @click="scrollToForm" class="px-6 py-2.5 bg-brand text-white rounded font-medium hover:bg-[#1f4e70] transition-colors">
          Message
        </button>
        <button @click="scrollToFaq" class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors">
          Learn
        </button>
      </div>
    </section>

    <!-- Get in touch -->
    <section class="bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8 py-16">
      <div class="max-w-6xl mx-auto">
        <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2 block">Reach</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Get in touch</h2>
        <p class="text-gray-600 mb-12">Multiple ways to contact our support team.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Contact Method 1 -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <Mail class="w-6 h-6 text-gray-900 mb-4" />
            <h3 class="font-bold text-gray-900 mb-2">Email</h3>
            <p class="text-sm text-gray-500 mb-4">Send us your questions and we'll respond within hours.</p>
            <a href="mailto:support@mls.com" class="text-sm font-medium text-brand hover:underline">support@mls.com</a>
          </div>
          <!-- Contact Method 2 -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <MessageSquare class="w-6 h-6 text-gray-900 mb-4" />
            <h3 class="font-bold text-gray-900 mb-2">Live chat</h3>
            <p class="text-sm text-gray-500 mb-4">Talk to someone on our team right now during business hours.</p>
            <button class="text-sm font-medium text-brand hover:underline">Start conversation</button>
          </div>
          <!-- Contact Method 3 -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <Phone class="w-6 h-6 text-gray-900 mb-4" />
            <h3 class="font-bold text-gray-900 mb-2">Phone</h3>
            <p class="text-sm text-gray-500 mb-4">Call us during office hours for immediate assistance.</p>
            <a href="tel:+15550000000" class="text-sm font-medium text-brand hover:underline">+1 (555) 000-0000</a>
          </div>
          <!-- Contact Method 4 -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <MapPin class="w-6 h-6 text-gray-900 mb-4" />
            <h3 class="font-bold text-gray-900 mb-2">Office</h3>
            <p class="text-sm text-gray-500 mb-4">Visit us in person or check our hours before you come.</p>
            <address class="text-sm font-medium text-brand hover:underline not-italic cursor-pointer">
              123 Sample St, Sydney NSW 2000 AU
            </address>
          </div>
        </div>
      </div>
    </section>

    <!-- Tell us more form -->
    <section id="contact-form" class="py-16 max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
      <div class="md:w-1/3">
        <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2 block">Send</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Tell us more</h2>
        <p class="text-gray-600 mb-8">Fill out the form below and we'll get back to you soon.</p>
        
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-sm text-gray-700">
             <Mail class="w-4 h-4 text-gray-400" /> support@mls.com
          </div>
          <div class="flex items-center gap-3 text-sm text-gray-700">
             <Phone class="w-4 h-4 text-gray-400" /> +1 (555) 000-0000
          </div>
          <div class="flex items-center gap-3 text-sm text-gray-700">
             <MapPin class="w-4 h-4 text-gray-400" /> 123 Sample St, Sydney NSW 2000 AU
          </div>
        </div>
      </div>
      
      <div class="md:w-2/3 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First name</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-gray-50" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last name</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-gray-50" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-gray-50" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <input type="tel" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-gray-50" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">What can we help with?</label>
            <select class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-gray-50">
              <option>Select topic</option>
              <option>Account Issues</option>
              <option>Billing & Subscriptions</option>
              <option>Document Verification</option>
              <option>Technical Support</option>
            </select>
          </div>

          <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">How would you describe yourself?</label>
             <div class="grid grid-cols-2 gap-4">
               <label class="flex items-center gap-2 text-sm text-gray-700">
                 <input type="radio" name="role" class="text-brand focus:ring-brand" /> Current Student
               </label>
               <label class="flex items-center gap-2 text-sm text-gray-700">
                 <input type="radio" name="role" class="text-brand focus:ring-brand" /> Prospective Student
               </label>
               <label class="flex items-center gap-2 text-sm text-gray-700">
                 <input type="radio" name="role" class="text-brand focus:ring-brand" /> Mentor
               </label>
               <label class="flex items-center gap-2 text-sm text-gray-700">
                 <input type="radio" name="role" class="text-brand focus:ring-brand" /> Employer
               </label>
               <label class="flex items-center gap-2 text-sm text-gray-700">
                 <input type="radio" name="role" class="text-brand focus:ring-brand" /> Administrator
               </label>
               <label class="flex items-center gap-2 text-sm text-gray-700">
                 <input type="radio" name="role" class="text-brand focus:ring-brand" /> Other
               </label>
             </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows="4" placeholder="Tell us what's on your mind..." class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-gray-50"></textarea>
          </div>

          <div>
             <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
               <input type="checkbox" class="text-brand focus:ring-brand rounded border-gray-300" />
               I agree to the terms
             </label>
          </div>

          <button type="submit" class="px-8 py-3 bg-brand text-white rounded font-medium hover:bg-[#1f4e70] transition-colors">
            Send
          </button>
        </form>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="py-16 bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Questions</h2>
          <p class="text-gray-600">Find answers to common questions about getting in touch with our team.</p>
        </div>

        <div class="space-y-4">
          <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              How fast do you respond?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              We aim to get back to you within 24 hours. Most inquiries receive a response much sooner during business hours. Your time matters to us.
            </div>
          </details>
          <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              What's the best way to reach support?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              Use the contact form on this page or send a message directly through your dashboard. Both routes get you to the same team. We'll handle it from there.
            </div>
          </details>
          <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              Can I call instead of messaging?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              Email and our contact form work best for us. This keeps everything documented and organized. We'll respond promptly either way.
            </div>
          </details>
          <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              Do you offer technical support?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              Yes. Whether it's dashboard access, document uploads, or subscription issues, we handle it all. Describe the problem and we'll fix it.
            </div>
          </details>
          <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
              What if I need urgent help?
              <span class="transition group-open:rotate-180">+</span>
            </summary>
            <div class="px-6 pb-6 text-gray-600">
              Mark your message as urgent in the contact form. We prioritize these requests and will reach out quickly. Don't hesitate to let us know when it's critical.
            </div>
          </details>
        </div>

        <div class="text-center mt-12">
          <h4 class="font-bold text-gray-900 mb-2">Didn't find what you needed?</h4>
          <p class="text-sm text-gray-600 mb-4">Send us a message and we'll help you out.</p>
          <button @click="scrollToForm" class="px-6 py-2 border border-brand text-brand hover:bg-brand/5 rounded font-medium transition-colors">Contact</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-vue-next';

useSeoMeta({ title: 'Contact Us | UniVerse Ecosystem' });
useHead({ title: 'Contact Us | UniVerse Ecosystem' });

const scrollToForm = () => {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToFaq = () => {
  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
};

const submitForm = () => {
  alert('Thank you for reaching out! We will get back to you shortly.');
};
</script>
