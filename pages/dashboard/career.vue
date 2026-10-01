<template>
  <div class="space-y-6 pb-12">
    <!-- Hero Banner (UniVerse Purple Theme) -->
    <div class="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-2xl px-6 py-6 sm:px-8 sm:py-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
      <!-- Decorative background glow orbs -->
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute right-48 -bottom-12 w-48 h-48 bg-violet-400/15 rounded-full blur-2xl pointer-events-none"></div>

      <div class="relative z-10 max-w-xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-semibold mb-3">
          <Briefcase class="w-3.5 h-3.5 text-white" />
          <span>Opportunities & Placements</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Career Hub</h1>
        <p class="text-white/85 text-sm mt-1.5 leading-relaxed">
          Explore internship placements, fellowship opportunities, and laboratory scientist roles.
        </p>
      </div>

      <!-- View Switcher (Grid vs List) -->
      <div class="relative z-10 flex items-center gap-3 self-stretch md:self-center justify-between md:justify-end">
        <div class="flex items-center bg-white/15 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-inner">
          <button
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-white text-violet-700 shadow font-bold' : 'text-white/85 hover:text-white'"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
            title="Grid View"
          >
            <LayoutGrid class="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-white text-violet-700 shadow font-bold' : 'text-white/85 hover:text-white'"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
            title="List View"
          >
            <List class="w-3.5 h-3.5" />
            <span>List</span>
          </button>
          <button
            @click="viewMode = 'kanban'"
            :class="viewMode === 'kanban' ? 'bg-white text-violet-700 shadow font-bold' : 'text-white/85 hover:text-white'"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
            title="Kanban Board"
          >
            <Columns class="w-3.5 h-3.5" />
            <span>Board</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Search & Custom Filters Bar -->
    <div class="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-sm space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
        <!-- Search Input -->
        <div class="md:col-span-6 relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search class="w-4 h-4" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by role title, hospital, or keywords..."
            class="w-full pl-10 pr-9 py-2.5 bg-gray-50/70 hover:bg-gray-50 focus:bg-white text-gray-900 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Custom Location Dropdown -->
        <div class="md:col-span-3 relative" ref="locationDropdownRef">
          <button
            type="button"
            @click="toggleDropdown('location')"
            class="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50/70 hover:bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-left"
          >
            <div class="flex items-center gap-2 truncate">
              <MapPin class="w-4 h-4 text-brand shrink-0" />
              <span class="truncate font-medium">{{ selectedLocation === 'All' ? 'All Locations' : selectedLocation }}</span>
            </div>
            <ChevronDown class="w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0" :class="{ 'rotate-180': activeDropdown === 'location' }" />
          </button>

          <!-- Dropdown Popover -->
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="activeDropdown === 'location'"
              class="absolute z-40 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 max-h-60 overflow-y-auto text-sm focus:outline-none"
            >
              <div
                @click="selectLocation('All')"
                class="flex items-center justify-between px-3.5 py-2 cursor-pointer hover:bg-brand/5 transition-colors"
                :class="selectedLocation === 'All' ? 'text-brand font-semibold bg-brand/5' : 'text-gray-700'"
              >
                <span>All Locations</span>
                <Check v-if="selectedLocation === 'All'" class="w-4 h-4 text-brand" />
              </div>
              <div
                v-for="loc in uniqueLocations"
                :key="loc.name"
                @click="selectLocation(loc.name)"
                class="flex items-center justify-between px-3.5 py-2 cursor-pointer hover:bg-brand/5 transition-colors"
                :class="selectedLocation === loc.name ? 'text-brand font-semibold bg-brand/5' : 'text-gray-700'"
              >
                <span class="truncate">{{ loc.name }}</span>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="text-[11px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{{ loc.count }}</span>
                  <Check v-if="selectedLocation === loc.name" class="w-4 h-4 text-brand" />
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Custom Organization Dropdown -->
        <div class="md:col-span-3 relative" ref="companyDropdownRef">
          <button
            type="button"
            @click="toggleDropdown('company')"
            class="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50/70 hover:bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-left"
          >
            <div class="flex items-center gap-2 truncate">
              <Briefcase class="w-4 h-4 text-brand shrink-0" />
              <span class="truncate font-medium">{{ selectedCompany === 'All' ? 'All Organizations' : selectedCompany }}</span>
            </div>
            <ChevronDown class="w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0" :class="{ 'rotate-180': activeDropdown === 'company' }" />
          </button>

          <!-- Dropdown Popover -->
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="activeDropdown === 'company'"
              class="absolute z-40 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 max-h-60 overflow-y-auto text-sm focus:outline-none"
            >
              <div
                @click="selectCompany('All')"
                class="flex items-center justify-between px-3.5 py-2 cursor-pointer hover:bg-brand/5 transition-colors"
                :class="selectedCompany === 'All' ? 'text-brand font-semibold bg-brand/5' : 'text-gray-700'"
              >
                <span>All Organizations</span>
                <Check v-if="selectedCompany === 'All'" class="w-4 h-4 text-brand" />
              </div>
              <div
                v-for="comp in uniqueCompanies"
                :key="comp.name"
                @click="selectCompany(comp.name)"
                class="flex items-center justify-between px-3.5 py-2 cursor-pointer hover:bg-brand/5 transition-colors"
                :class="selectedCompany === comp.name ? 'text-brand font-semibold bg-brand/5' : 'text-gray-700'"
              >
                <span class="truncate">{{ comp.name }}</span>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="text-[11px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{{ comp.count }}</span>
                  <Check v-if="selectedCompany === comp.name" class="w-4 h-4 text-brand" />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Quick Filter Pills & Result Stats -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-semibold text-gray-400 mr-1">Filter:</span>
          
          <button
            @click="selectLocation('All')"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition-all border"
            :class="selectedLocation === 'All' && selectedCompany === 'All' && !searchQuery
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'"
          >
            All Roles
          </button>

          <button
            v-for="loc in topLocations"
            :key="loc"
            @click="selectLocation(loc)"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1"
            :class="selectedLocation === loc
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'"
          >
            <MapPin class="w-3 h-3 opacity-70" />
            <span>{{ loc }}</span>
          </button>

          <button
            v-if="isFiltered"
            @click="resetFilters"
            class="px-2.5 py-1 rounded-lg text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors flex items-center gap-1"
          >
            <X class="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        </div>

        <div class="text-xs font-medium text-gray-500">
          Showing <span class="font-bold text-gray-800">{{ filteredJobs.length }}</span> of {{ jobs.length }} positions
        </div>
      </div>
    </div>

    <!-- Active Positions List / Grid -->
    <div class="relative min-h-[300px]">
      <!-- Loading State -->
      <div v-if="getLoading" class="py-20 flex flex-col items-center justify-center gap-3">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
        <p class="text-xs text-gray-400 font-medium">Fetching active career opportunities...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredJobs.length === 0" class="bg-white rounded-3xl p-12 sm:p-16 text-center border border-gray-200/80 shadow-sm">
        <div class="w-16 h-16 bg-brand/5 text-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
          <SearchXIcon class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">No matching positions found</h3>
        <p class="text-gray-500 text-sm mb-6 max-w-sm mx-auto">We couldn't find any opportunities matching your selected criteria. Try adjusting your search term or filters.</p>
        <button
          @click="resetFilters"
          class="px-5 py-2.5 bg-brand text-white rounded-xl text-xs font-bold hover:bg-brand/90 transition-all shadow-md shadow-brand/20 active:scale-95"
        >
          Clear all filters
        </button>
      </div>

      <!-- GRID VIEW -->
      <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="job in filteredJobs"
          :key="job._id"
          class="bg-white border border-gray-200/80 rounded-2xl hover:shadow-xl hover:shadow-brand/5 hover:border-brand/40 transition-all duration-300 flex flex-col h-full group relative overflow-hidden"
        >
          <!-- Hover accent top line -->
          <div class="absolute top-0 left-0 w-full h-1 bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

          <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <!-- Top Row Badges -->
              <div class="flex items-start justify-between gap-2 mb-3">
                <span class="inline-flex bg-brand/10 text-brand text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  {{ job.company }}
                </span>
                <span class="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                  <MapPin class="w-3 h-3 text-brand" />
                  <span class="truncate max-w-[130px]">{{ job.location }}</span>
                </span>
              </div>

              <!-- Job Title -->
              <h3 class="text-base font-bold text-gray-900 group-hover:text-brand transition-colors line-clamp-2 leading-snug mb-2">
                {{ job.title }}
              </h3>

              <!-- Description -->
              <p class="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                {{ job.description }}
              </p>
            </div>

            <!-- Footer Action Row -->
            <div class="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
              <span class="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                <Calendar class="w-3.5 h-3.5 text-gray-300" />
                {{ formatDate(job.createdAt) }}
              </span>

              <button
                @click="openApplyModal(job)"
                class="px-4 py-2 bg-brand text-white hover:bg-brand/90 text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 group/btn active:scale-95"
              >
                <span>Apply</span>
                <ArrowRight class="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- LIST VIEW -->
      <div v-else-if="viewMode === 'list'" class="flex flex-col gap-3.5">
        <div
          v-for="job in filteredJobs"
          :key="job._id"
          class="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-brand/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group relative overflow-hidden"
        >
          <!-- Hover accent left bar -->
          <div class="absolute left-0 top-0 w-1.5 h-full bg-brand transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

          <!-- Main Info -->
          <div class="flex items-start sm:items-center gap-4 flex-1 min-w-0">
            <!-- Icon/Initial Badge -->
            <div class="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold text-sm shrink-0 border border-brand/20">
              <Briefcase class="w-5 h-5 text-brand" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <h3 class="text-base font-bold text-gray-900 truncate group-hover:text-brand transition-colors">
                  {{ job.title }}
                </h3>
                <span class="inline-flex bg-brand/10 text-brand text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  {{ job.company }}
                </span>
                <span class="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  <MapPin class="w-3 h-3 text-brand" />
                  {{ job.location }}
                </span>
              </div>
              <p class="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                {{ job.description }}
              </p>
            </div>
          </div>

          <!-- Metadata & Action -->
          <div class="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
              <Calendar class="w-3.5 h-3.5 text-gray-300" />
              {{ formatDate(job.createdAt) }}
            </span>

            <button
              @click="openApplyModal(job)"
              class="px-5 py-2.5 bg-brand text-white hover:bg-brand/90 text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 group/btn active:scale-95"
            >
              <span>Apply Now</span>
              <ArrowRight class="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <!-- KANBAN VIEW -->
      <div v-else-if="viewMode === 'kanban'" class="flex gap-6 overflow-x-auto pb-4 min-h-[400px]">
        <div v-for="status in ['active', 'closed']" :key="status" 
             class="flex-shrink-0 w-80 flex flex-col bg-gray-50/50 rounded-xl border border-gray-200"
             @dragover.prevent
             @drop="onDrop($event, status)">
          <div class="p-4 border-b border-gray-200 flex items-center justify-between bg-white rounded-t-xl">
            <h3 class="font-bold text-gray-900 capitalize flex items-center gap-2">
              <span class="w-2 h-2 rounded-full" :class="status === 'active' ? 'bg-green-500' : 'bg-red-500'"></span>
              {{ status }}
            </h3>
            <span class="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {{ filteredJobs.filter(j => j.status === status).length }}
            </span>
          </div>
          <div class="flex-1 p-3 space-y-3 overflow-y-auto max-h-[600px]">
            <div v-for="job in filteredJobs.filter(j => j.status === status)" :key="job._id" 
                 draggable="true"
                 @dragstart="onDragStart($event, job)"
                 class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-violet-600/30 hover:shadow-md transition-all group">
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-bold text-gray-900 text-sm truncate pr-2 group-hover:text-violet-600 transition-colors">{{ job.title }}</h4>
                <div class="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                  <Briefcase class="w-4 h-4" />
                </div>
              </div>
              <p class="text-violet-700 font-extrabold text-[10px] mb-3 uppercase tracking-wider">{{ job.company }}</p>
              <p class="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">{{ job.description }}</p>
              <div class="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-50">
                <span class="flex items-center gap-1 font-medium"><MapPin class="w-3.5 h-3.5 text-violet-600 opacity-70"/> <span class="truncate max-w-[80px]">{{ job.location }}</span></span>
                <span class="flex items-center gap-1"><Calendar class="w-3.5 h-3.5 text-gray-400"/> {{ formatDate(job.createdAt) }}</span>
              </div>
              <button
                v-if="status === 'active'"
                @click="openApplyModal(job)"
                class="mt-4 w-full py-2 bg-violet-50 text-violet-700 text-xs font-bold rounded-lg hover:bg-violet-600 hover:text-white transition-colors"
              >
                Apply Now
              </button>
              <div v-else class="mt-4 w-full py-2 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg text-center">
                Closed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Apply Modal -->
    <Teleport to="body">
      <div v-if="activeJob" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="!applyLoading && closeApplyModal()"></div>
        <div class="bg-white rounded-2xl w-full max-w-lg relative z-10 shadow-2xl overflow-hidden p-6 sm:p-8 border border-gray-100">
          <div class="flex items-start justify-between mb-4">
            <div>
              <span class="inline-flex bg-brand/10 text-brand text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                {{ activeJob.company }}
              </span>
              <h3 class="text-xl font-bold text-gray-900">Apply for {{ activeJob.title }}</h3>
              <p class="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                <MapPin class="w-3 h-3 text-brand" />
                {{ activeJob.location }}
              </p>
            </div>
            <button @click="!applyLoading && closeApplyModal()" class="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="space-y-4 pt-2">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                v-model="applicantName"
                type="text"
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none text-sm transition-all"
                placeholder="e.g. Dr. Jane Doe"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                v-model="applicantEmail"
                type="email"
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none text-sm transition-all"
                placeholder="e.g. jane@example.com"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Upload Resume / CV</label>
              <div
                class="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all bg-gray-50/60 relative group"
                :class="selectedFile ? 'border-brand bg-brand/5' : 'border-gray-200 hover:border-brand/60 hover:bg-brand/5'"
              >
                <input
                  type="file"
                  id="cv-upload"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx"
                  @change="onFileChange"
                  :disabled="applyLoading"
                />
                <div class="flex flex-col items-center justify-center pointer-events-none">
                  <div
                    class="w-12 h-12 rounded-full shadow-sm flex items-center justify-center mb-2.5 transition-colors"
                    :class="selectedFile ? 'bg-brand text-white' : 'bg-white text-brand group-hover:scale-110'"
                  >
                    <FileText v-if="selectedFile" class="w-6 h-6" />
                    <UploadCloud v-else class="w-6 h-6" />
                  </div>
                  <span v-if="selectedFile" class="text-sm font-bold text-gray-900 truncate max-w-xs">{{ selectedFile.name }}</span>
                  <span v-else class="text-xs font-semibold text-gray-600">Click or drag & drop CV to upload</span>
                  <span class="text-[11px] text-gray-400 mt-1">Supports PDF, DOC, DOCX up to 10MB</span>
                </div>
              </div>
            </div>

            <!-- Upload progress bar -->
            <div v-if="applyLoading" class="space-y-1.5 pt-1">
              <div class="flex justify-between text-xs text-gray-500">
                <span>Uploading application documents...</span>
                <span class="font-bold text-brand">{{ uploadProgress }}%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  class="bg-brand h-full rounded-full transition-all duration-300 relative"
                  :style="{ width: uploadProgress + '%' }"
                >
                  <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
              <button
                @click="closeApplyModal"
                :disabled="applyLoading"
                class="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                @click="submitApplication"
                :disabled="!selectedFile || !applicantName || !applicantEmail || applyLoading"
                class="px-6 py-2.5 rounded-xl text-xs font-bold bg-brand text-white hover:bg-brand/90 transition-all disabled:opacity-50 flex items-center gap-2 shadow-md shadow-brand/20 active:scale-95"
              >
                <div v-if="applyLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{{ applyLoading ? 'Submitting Application...' : 'Confirm Application' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  Search,
  SearchX as SearchXIcon,
  MapPin,
  Briefcase,
  Calendar,
  ArrowRight,
  LayoutGrid,
  List,
  Columns,
  ChevronDown,
  Check,
  X,
  FileText,
  UploadCloud
} from 'lucide-vue-next';
import { useGetJobs } from '@/composables/modules/jobs/useGetJobs';
import { useApplyJob } from '@/composables/modules/jobs/useApplyJob';
import { useUpdateJob } from '@/composables/modules/jobs/useUpdateJob';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Career Hub | Opportunities' });
useHead({ title: 'Career Hub | Opportunities' });

const { loading: getLoading, jobs, fetchJobs } = useGetJobs();
const { loading: applyLoading, uploadProgress, applyForJob } = useApplyJob();
const { updateJob } = useUpdateJob();

// View Mode
const viewMode = ref<'grid' | 'list' | 'kanban'>('kanban');

// Drag and drop logic
const onDragStart = (e: DragEvent, job: any) => {
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('jobId', job._id);
  }
};

const onDrop = async (e: DragEvent, status: string) => {
  if (e.dataTransfer) {
    const jobId = e.dataTransfer.getData('jobId');
    const job = jobs.value.find((j: any) => j._id === jobId);
    if (job && job.status !== status) {
      const oldStatus = job.status;
      job.status = status; // Optimistic update
      
      const success = await updateJob(jobId, { status });
      if (!success) {
        job.status = oldStatus; // Revert on failure
      }
    }
  }
};

// Search & Custom Filters
const searchQuery = ref('');
const selectedLocation = ref('All');
const selectedCompany = ref('All');
const activeDropdown = ref<'location' | 'company' | null>(null);

const locationDropdownRef = ref<HTMLElement | null>(null);
const companyDropdownRef = ref<HTMLElement | null>(null);

// Modal state
const activeJob = ref<any>(null);
const selectedFile = ref<File | null>(null);
const applicantName = ref('');
const applicantEmail = ref('');

// Computed Dropdown Options
const uniqueLocations = computed(() => {
  const map: Record<string, number> = {};
  jobs.value.forEach(j => {
    if (j.location) {
      map[j.location] = (map[j.location] || 0) + 1;
    }
  });
  return Object.entries(map).map(([name, count]) => ({ name, count }));
});

const topLocations = computed(() => {
  return uniqueLocations.value.slice(0, 3).map(l => l.name);
});

const uniqueCompanies = computed(() => {
  const map: Record<string, number> = {};
  jobs.value.forEach(j => {
    if (j.company) {
      map[j.company] = (map[j.company] || 0) + 1;
    }
  });
  return Object.entries(map).map(([name, count]) => ({ name, count }));
});

const isFiltered = computed(() => {
  return !!searchQuery.value || selectedLocation.value !== 'All' || selectedCompany.value !== 'All';
});

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    // Search match
    const q = searchQuery.value.toLowerCase().trim();
    const matchesSearch = !q ||
      job.title?.toLowerCase().includes(q) ||
      job.company?.toLowerCase().includes(q) ||
      job.location?.toLowerCase().includes(q) ||
      job.description?.toLowerCase().includes(q);

    // Location match
    const matchesLocation = selectedLocation.value === 'All' || job.location === selectedLocation.value;

    // Company match
    const matchesCompany = selectedCompany.value === 'All' || job.company === selectedCompany.value;

    // Status match (exclude drafts on frontend)
    const matchesStatus = job.status !== 'draft';

    return matchesSearch && matchesLocation && matchesCompany && matchesStatus;
  });
});

// Dropdown Handlers
const toggleDropdown = (type: 'location' | 'company') => {
  activeDropdown.value = activeDropdown.value === type ? null : type;
};

const selectLocation = (loc: string) => {
  selectedLocation.value = loc;
  activeDropdown.value = null;
};

const selectCompany = (comp: string) => {
  selectedCompany.value = comp;
  activeDropdown.value = null;
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedLocation.value = 'All';
  selectedCompany.value = 'All';
  activeDropdown.value = null;
};

// Global click outside listener for custom dropdowns
const handleOutsideClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (
    locationDropdownRef.value && !locationDropdownRef.value.contains(target) &&
    companyDropdownRef.value && !companyDropdownRef.value.contains(target)
  ) {
    activeDropdown.value = null;
  }
};

// Date Formatter
const formatDate = (dateString?: string) => {
  if (!dateString) return 'Recent';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return 'Recent';
  }
};

// Apply Modal Handlers
const openApplyModal = (job: any) => {
  activeJob.value = job;
  document.body.style.overflow = 'hidden';
};

const closeApplyModal = () => {
  activeJob.value = null;
  selectedFile.value = null;
  applicantName.value = '';
  applicantEmail.value = '';
  document.body.style.overflow = '';
};

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) {
    selectedFile.value = target.files[0];
  }
};

const submitApplication = async () => {
  if (!selectedFile.value || !applicantName.value || !applicantEmail.value || !activeJob.value) return;

  const success = await applyForJob({
    jobId: activeJob.value._id,
    jobTitle: activeJob.value.title,
    name: applicantName.value,
    email: applicantEmail.value,
    file: selectedFile.value
  });

  if (success) {
    closeApplyModal();
  }
};

onMounted(() => {
  fetchJobs();
  window.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick);
  document.body.style.overflow = '';
});
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
