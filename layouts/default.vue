<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white border-b border-gray-200">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="flex items-center gap-2">
          <img src="~/assets/logo-icon.png" class="h-8 w-auto rounded-lg" alt="InternTional Logo" />
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-6">
          <NuxtLink to="/login" class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Sign In</NuxtLink>
          <NuxtLink to="/register" class="bg-brand text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#1f4e70] transition-colors">
            Apply Now
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="flex-grow flex flex-col">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="~/assets/logo-icon.png" class="h-8 w-auto rounded-lg" alt="InternTional Logo" />
          <div class="text-sm text-gray-500">
            &copy; {{ new Date().getFullYear() }} InternTional Ecosystem. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
