<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center max-w-2xl mx-auto pt-8">
      <span class="text-sm font-semibold text-brand tracking-wider uppercase mb-2 block">Secure</span>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Your resources protected</h1>
      <p class="text-lg text-gray-600">
        Store textbooks, lab notes, and past papers in one organized place.
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <button class="px-6 py-2.5 bg-brand text-white rounded font-medium hover:bg-[#1f4e70] transition-colors">
          Upload
        </button>
        <button class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors">
          Learn more
        </button>
      </div>
    </section>

    <!-- Browse by subject -->
    <section class="bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <span class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2 block">Organize</span>
        <h2 class="text-2xl font-bold text-gray-900">Browse by subject</h2>
        <p class="text-gray-600 mt-2">Find resources by field of study</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Subject Card 1 -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
          <div class="p-6 pb-8 flex-grow">
            <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Hematology</span>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Blood disorders and cell analysis materials</h3>
            <p class="text-sm text-gray-500 mb-6">43 documents</p>
            <div class="flex items-center gap-4">
              <button class="text-sm font-medium border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50">Explore</button>
              <button class="text-sm text-brand hover:underline font-medium">Share &rarr;</button>
            </div>
          </div>
          <div class="h-32 bg-gray-100">
             <img src="/vault_microscope.jpg" class="w-full h-full object-cover opacity-80 mix-blend-multiply" />
          </div>
        </div>

        <!-- Subject Card 2 -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
          <div class="p-6 pb-8 flex-grow">
            <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Histopathology</span>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Tissue examination and pathology notes</h3>
            <p class="text-sm text-gray-500 mb-6">24 files</p>
            <div class="flex items-center gap-4">
               <button class="text-sm text-brand hover:underline font-medium">See materials &rarr;</button>
            </div>
          </div>
          <div class="h-32 bg-gray-200 bg-[url('/community_network.jpg')] bg-cover bg-center"></div>
        </div>
        
        <!-- Subject Card 3 -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full lg:row-span-2 lg:col-start-3">
          <div class="p-6 pb-8">
            <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Immune system and antibody response materials</span>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Explore</h3>
            <p class="text-sm text-gray-600 mb-6">View all categories and discover more resources.</p>
            <div class="flex items-center gap-4">
              <button class="text-sm font-medium border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50">Browse</button>
              <button class="text-sm text-brand hover:underline font-medium">View &rarr;</button>
            </div>
          </div>
          <div class="h-full min-h-[200px] bg-gray-900 relative">
             <img src="https://placehold.co/600x400" class="absolute inset-0 w-full h-full object-cover opacity-60" />
          </div>
        </div>

        <!-- Subject Card 4 -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div class="mb-4 text-brand">
             <div class="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                <Microscope class="w-5 h-5" />
             </div>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Chemical pathology</h3>
          <p class="text-xs text-gray-500 mb-4">Chemistry and molecular testing resources</p>
          <button class="text-sm text-brand hover:underline font-medium">Browse &rarr;</button>
        </div>

        <!-- Subject Card 5 -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div class="mb-4 text-brand">
             <div class="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                <Bug class="w-5 h-5" />
             </div>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Medical microbiology</h3>
          <p class="text-xs text-gray-500 mb-4">Infections and organism identification guides</p>
          <button class="text-sm text-brand hover:underline font-medium">Browse &rarr;</button>
        </div>
      </div>
    </section>

    <!-- Resource Library -->
    <section class="py-12 text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Resource library</h2>
      <p class="text-gray-600 mb-10">Find what you need fast with our searchable collection</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
         <img src="/documents_verify.jpg" class="rounded-xl h-48 w-full object-cover shadow-sm" />
         <img src="/vault_microscope.jpg" class="rounded-xl h-48 w-full object-cover shadow-sm" />
         <img src="/mentor_group.jpg" class="rounded-xl h-48 w-full object-cover shadow-sm" />
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Questions</h2>
        <p class="text-gray-600">Everything you need to know about storing and sharing files.</p>
      </div>

      <div class="space-y-4">
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            How secure is this?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            Your documents are encrypted and stored on secure servers. Only you and those you grant access can view them. We take privacy seriously.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            What file types work?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            We support PDFs, Word documents, images, and spreadsheets. Most text/spreadsheet options will read natively. Check our documentation for format specifics.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            Can I share documents?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            Yes. You control who sees what. Share with specific people or make files available to your study group. Permissions are always yours to manage.
          </div>
        </details>
        <details class="group bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-gray-200">
          <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900">
            Is there a storage limit?
            <span class="transition group-open:rotate-180">+</span>
          </summary>
          <div class="px-6 pb-6 text-gray-600">
            Your plan includes premium storage. Most students never hit the limit. Upgrade anytime if you need more space for your collection.
          </div>
        </details>
      </div>

      <div class="text-center mt-12">
        <h4 class="font-bold text-gray-900 mb-2">Need more help?</h4>
        <p class="text-sm text-gray-600 mb-4">Reach out anytime with questions or concerns</p>
        <button class="px-6 py-2 border border-brand text-brand hover:bg-brand/5 rounded font-medium transition-colors">Contact</button>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="rounded-2xl overflow-hidden relative shadow-lg my-12">
      <div class="absolute inset-0 bg-gray-900/70 z-10 mix-blend-multiply"></div>
      <img src="/documents_verify.jpg" class="absolute inset-0 w-full h-full object-cover" />
      <div class="relative z-20 py-16 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to build your vault?</h2>
        <p class="text-lg text-gray-300 mb-8">Start uploading documents and organizing your study materials now.</p>
        <div class="flex justify-center gap-4">
          <button class="px-8 py-3 bg-white text-gray-900 rounded font-bold hover:bg-gray-100 transition-colors">Upload</button>
          <button class="px-8 py-3 bg-transparent border border-white text-white rounded font-bold hover:bg-white/10 transition-colors">Browse</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { Microscope, Bug } from 'lucide-vue-next';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'The Vault | UniVerse Ecosystem' });
useHead({ title: 'The Vault | UniVerse Ecosystem' });
</script>
