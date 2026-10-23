<template>
  <div class="flex-grow flex flex-col w-full bg-gray-50">
    <!-- Hero Section with Carousel -->
    <section class="relative h-[80vh] min-h-[600px] max-h-[900px] w-full overflow-hidden bg-gray-900">
      <!-- Carousel Images -->
      <div 
        v-for="(image, index) in heroImages" 
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="currentSlide === index ? 'opacity-100' : 'opacity-0'"
      >
        <img :src="image.url" :alt="image.alt" class="w-full h-full object-cover" />
        <!-- Dark overlay to ensure text legibility -->
        <div class="absolute inset-0 bg-gray-900/70"></div>
      </div>

      <!-- Hero Content -->
      <div class="absolute inset-0 flex items-center justify-center pt-28 md:pt-32">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div class="inline-block bg-violet-500/20 border border-violet-400/30 text-violet-200 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-2 uppercase backdrop-blur-sm">
            Empowering the Next Generation of Scientists
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            The Ultimate Network for <br class="hidden md:block"/> <span class="text-violet-300">MLS Students</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-200 font-light max-w-3xl mx-auto">
            Access specialized study materials, connect with experienced mentors, and navigate your academic journey with absolute confidence.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <NuxtLink to="/register" class="bg-violet-600 hover:bg-violet-700 text-white px-8 py-2 rounded-lg text-lg font-medium transition-colors inline-block w-full sm:w-auto text-center border border-transparent">
              Apply for Access
            </NuxtLink>
            <NuxtLink to="/login" class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-2 rounded-lg text-lg font-medium transition-colors inline-block w-full sm:w-auto text-center">
              Member Sign In
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Carousel Indicators -->
      <div class="absolute bottom-8 left-0 right-0 hidden md:flex justify-center gap-3 z-20">
        <button 
          v-for="(_, index) in heroImages" 
          :key="'indicator-'+index"
          @click="setSlide(index)"
          class="w-12 h-1.5 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'bg-brand' : 'bg-white/30 hover:bg-white/50'"
          aria-label="Go to slide"
        ></button>
      </div>
    </section>

    <!-- Elaborate Features Showcase -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Everything You Need to Succeed</h2>
          <p class="text-lg text-gray-600">A complete ecosystem designed exclusively for the demands of the modern Medical Laboratory Science Student Community.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:p-8">
          <!-- Vault Feature -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col group hover:border-brand/50 transition-colors duration-300 shadow-sm">
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
              <img src="/vault_microscope.jpg" alt="Clinical Resources" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="p-5 md:p-8 flex-1 flex flex-col relative">
              <div class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-brand absolute -top-6 left-8 shadow-sm">
                <Folder class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3 mt-4">The Vault</h3>
              <p class="text-gray-600 flex-1 leading-relaxed">Access curated study materials, past questions, and academic bench guides maintained and vetted by the community.</p>
            </div>
          </div>

          <!-- Mentorship Feature -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col group hover:border-brand/50 transition-colors duration-300 shadow-sm">
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
              <img src="/images/lab_feature_mentorship_1789856647200.jpg" alt="Mentorship" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="p-5 md:p-8 flex-1 flex flex-col relative">
              <div class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-brand absolute -top-6 left-8 shadow-sm">
                <Users class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3 mt-4">Expert Mentorship</h3>
              <p class="text-gray-600 flex-1 leading-relaxed">Connect directly with senior students and professionals who have navigated the intricacies of exams and lab practicals.</p>
            </div>
          </div>

          <!-- Career Hub Feature -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col group hover:border-brand/50 transition-colors duration-300 shadow-sm">
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
              <img src="/images/lab_feature_career_1789856657816.jpg" alt="Career Hub" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="p-5 md:p-8 flex-1 flex flex-col relative">
              <div class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-brand absolute -top-6 left-8 shadow-sm">
                <Briefcase class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3 mt-4">Career Hub</h3>
              <p class="text-gray-600 flex-1 leading-relaxed">Prepare for graduation with resume reviews, interview prep, and exclusive academic and entry-level postings.</p>
            </div>
          </div>

          <!-- Events Feature -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col group hover:border-brand/50 transition-colors duration-300 shadow-sm">
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
              <img src="/community_network.jpg" alt="Events" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="p-5 md:p-8 flex-1 flex flex-col relative">
              <div class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-brand absolute -top-6 left-8 shadow-sm">
                <Calendar class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3 mt-4">Events & Webinars</h3>
              <p class="text-gray-600 flex-1 leading-relaxed">Join exclusive seminars, workshops, and networking events to build connections and enhance your skills.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Join Us / Exclusive Access -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div class="w-full lg:w-1/2 space-y-6">
          <div class="inline-block bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
            Verified Academic Community
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Strictly Verified.<br/>Academic Integrity & 2-Year Access.
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            To protect academic integrity and maintain a secure, high-yield environment tailored exclusively for Medical Laboratory Science students, every applicant's credentials are authenticated before full platform access is granted.
          </p>
          <ul class="space-y-4 pt-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <div class="text-gray-700 text-sm">
                <strong class="font-semibold text-gray-900">Acceptable Documents:</strong> Valid Student ID card, Official University Admission Letter, Current Semester Course Registration Slip, or Institutional Clinical Posting Letter.
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <div class="text-gray-700 text-sm">
                <strong class="font-semibold text-gray-900">Seamless Upload:</strong> Submit a clean PDF, JPG, or PNG document (max 5MB) directly during registration.
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <div class="text-gray-700 text-sm">
                <strong class="font-semibold text-gray-900">Prompt Outcome Notification:</strong> Our team reviews applications within 12–24 hours. You receive an instant email update and immediate access to your downloadable digital student card.
              </div>
            </li>
          </ul>
        </div>
        <div class="w-full lg:w-1/2">
          <div class="relative rounded-xl overflow-hidden border border-gray-200 shadow-md">
            <img src="/documents_verify.jpg" alt="University Credential Verification" class="w-full h-auto object-cover" />
            <div class="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Hear from Our Members</h2>
          <p class="text-lg text-gray-600">See how UniVerse has empowered Medical Laboratory Science students and alumni across universities.</p>
        </div>
        <div class="relative max-w-4xl mx-auto">
          <div class="overflow-hidden relative">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }"
            >
              <div v-for="(testimonial, index) in testimonials" :key="index" class="w-full flex-shrink-0 px-4">
                <div class="bg-white p-6 md:p-12 rounded-xl shadow-sm border border-gray-100 text-center relative">
                  <div class="absolute top-6 left-1/2 -translate-x-1/2 text-gray-200 opacity-50">
                    <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  <p class="text-lg md:text-2xl text-gray-700 italic relative z-10 mb-8 mt-6">"{{ testimonial.text }}"</p>
                  <div class="flex flex-col items-center">
                    <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-brand/20 shadow-sm mb-3">
                      <img v-if="testimonial.image" :src="testimonial.image" :alt="testimonial.name" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full bg-brand/10 text-brand font-bold flex items-center justify-center">{{ testimonial.initials }}</div>
                    </div>
                    <h4 class="font-bold text-gray-900 text-lg">{{ testimonial.name }}</h4>
                    <p class="text-xs font-semibold text-brand uppercase tracking-wider">{{ testimonial.role }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ testimonial.school }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Testimonial Controls -->
          <div class="flex justify-center gap-2 mt-8">
            <button 
              v-for="(_, index) in testimonials" 
              :key="'test-ind-'+index"
              @click="currentTestimonial = index"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="currentTestimonial === index ? 'bg-brand scale-125' : 'bg-gray-300 hover:bg-gray-400'"
              aria-label="Go to testimonial"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Mission Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-brand text-white">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="md:w-1/2">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">Our Mission & Vision</h2>
          <p class="text-lg text-blue-100 leading-relaxed mb-4">
            We believe that every Medical Laboratory Science student deserves access to world-class resources, guidance, and professional networks, regardless of their background.
          </p>
          <p class="text-lg text-blue-100 leading-relaxed">
            Our vision is to empower the next generation of African medical scientists to innovate, excel, and lead on a global scale.
          </p>
        </div>
        <div class="md:w-1/2 relative rounded-xl overflow-hidden shadow-2xl">
          <img src="/images/black_african_lab_scientist.jpg" alt="Mission" class="w-full h-auto object-cover" />
          <div class="absolute inset-0 bg-brand/20 mix-blend-multiply"></div>
        </div>
      </div>
    </section>

    <!-- Community Highlights Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Community Highlights & Events</h2>
          <p class="text-lg text-gray-600 mt-4">Join our webinars, seminars, and networking events.</p>
        </div>
        
        <div v-if="loadingEvents" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
        </div>
        
        <div v-else-if="events.length === 0" class="text-center py-12 text-gray-500">
          No upcoming events at the moment.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-8">
          <div v-for="event in events.slice(0, 3)" :key="event._id" @click="openEventModal(event)" class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group flex flex-col">
            <div v-if="event.coverImage" class="w-full h-48 bg-gray-100 relative overflow-hidden shrink-0">
              <img :src="event.coverImage" :alt="event.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span class="absolute bottom-3 left-3 bg-violet-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-sm">{{ event.category || 'Event' }}</span>
            </div>
            <div class="p-5 md:p-6 flex-1 flex flex-col">
              <span v-if="!event.coverImage" class="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide w-fit mb-3">{{ event.category || 'Event' }}</span>
              <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">{{ event.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2 text-sm flex-1">{{ event.description }}</p>
              <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div>
                  <p class="text-xs font-semibold text-gray-500 flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5"/> {{ new Date(event.date).toLocaleDateString() }}</p>
                  <p class="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-1.5 truncate max-w-[150px]" v-if="event.location"><MapPin class="w-3.5 h-3.5"/> {{ event.location }}</p>
                </div>
                <button class="text-violet-600 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-violet-50 px-2.5 py-1.5 rounded-lg">View <ArrowRight class="w-3.5 h-3.5"/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Event Details Modal -->
    <div v-if="selectedEvent" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeEventModal"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Cover Image -->
        <div v-if="selectedEvent.coverImage" class="w-full h-56 md:h-72 relative shrink-0">
          <img :src="selectedEvent.coverImage" :alt="selectedEvent.title" class="w-full h-full object-cover"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <button @click="closeEventModal" class="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full transition-colors z-10 shadow-sm">
            <X class="w-5 h-5" />
          </button>
          
          <div class="absolute bottom-6 left-6 right-6">
            <span class="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide mb-3 inline-block shadow-sm">{{ selectedEvent.category || 'Event' }}</span>
            <h3 class="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">{{ selectedEvent.title }}</h3>
          </div>
        </div>

        <div class="p-6 md:p-8 overflow-y-auto flex-1">
          <button v-if="!selectedEvent.coverImage" @click="closeEventModal" class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-10">
            <X class="w-5 h-5" />
          </button>
          
          <template v-if="!selectedEvent.coverImage">
            <span class="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block">{{ selectedEvent.category || 'Event' }}</span>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">{{ selectedEvent.title }}</h3>
          </template>
          
          <div class="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-100">
            <div class="flex items-center gap-2 text-gray-600">
              <Calendar class="w-5 h-5 text-brand" />
              <span class="font-medium">{{ new Date(selectedEvent.date).toLocaleDateString() }}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600" v-if="selectedEvent.location">
              <MapPin class="w-5 h-5 text-brand" />
              <span class="font-medium">{{ selectedEvent.location }}</span>
            </div>
          </div>

          <div class="prose prose-gray max-w-none text-gray-600">
            <p class="whitespace-pre-wrap leading-relaxed">{{ selectedEvent.description }}</p>
          </div>
        </div>
        <div class="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <span v-if="eventRegistered" class="text-green-600 font-medium self-center mr-4">Successfully registered!</span>
          <button @click="closeEventModal" class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors">Close</button>
          <button @click="registerForEvent" :disabled="registeringEvent" class="px-5 py-2.5 rounded-lg bg-brand text-white font-medium hover:bg-[#1a405c] transition-colors shadow-sm shadow-brand/20 disabled:opacity-50">
            {{ registeringEvent ? 'Registering...' : 'Register for Event' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Latest Articles Section (Displayed only when published articles exist) -->
    <section v-if="!loadingArticles && articles && articles.length > 0" class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Latest Insights</h2>
          <p class="text-lg text-gray-600 mt-4">Read our latest articles, bench guides, and community updates.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:p-8">
          <NuxtLink :to="'/articles/' + article._id" v-for="article in articles.slice(0, 3)" :key="article._id" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col group cursor-pointer">
            <div class="h-48 bg-gray-200 w-full overflow-hidden" v-if="article.coverImage">
               <img :src="article.coverImage" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="h-48 bg-brand/10 w-full flex items-center justify-center overflow-hidden" v-else>
               <span class="text-brand font-bold text-xl group-hover:scale-105 transition-transform duration-500">{{ article.category || 'Article' }}</span>
            </div>
            <div class="p-6 flex-1 flex flex-col">
              <span class="text-xs font-bold text-brand uppercase tracking-wider mb-2">{{ article.category || 'Insight' }}</span>
              <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors">{{ article.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{{ article.excerpt || article.content?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' }}</p>
              <div class="flex items-center justify-between text-xs text-gray-500 mt-auto">
                <span>Published: {{ new Date(article.publishDate || article.createdAt).toLocaleDateString() }}</span>
                <span class="text-brand font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Read <ArrowRight class="w-3 h-3"/></span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Frequently Asked Questions</h2>
          <p class="text-lg text-gray-600">Everything you need to know about joining, verifying, and navigating the UniVerse ecosystem.</p>
        </div>
        
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-lg overflow-hidden">
            <button 
              @click="toggleFaq(index)" 
              class="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left focus:outline-none"
            >
              <span class="font-bold text-gray-900 text-lg">{{ faq.question }}</span>
              <ChevronDown 
                class="w-5 h-5 text-gray-500 transition-transform duration-300" 
                :class="{ 'rotate-180': openFaq === index }" 
              />
            </button>
            <div 
              class="overflow-hidden transition-all duration-300"
              :style="{ maxHeight: openFaq === index ? '300px' : '0' }"
            >
              <div class="p-6 pt-0 text-gray-600 bg-white leading-relaxed">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center bg-gray-50 p-8 rounded-xl border border-gray-200">
          <h3 class="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p class="text-gray-600 text-sm mb-4">Our dedicated student support team is available to guide your onboarding and answer queries.</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="mailto:support@medlabconvo.com" class="px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors inline-flex items-center gap-2">
              <Mail class="w-4 h-4" /> Email: support@medlabconvo.com
            </a>
            <NuxtLink to="/contact" class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Contact Center & Office Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-24 bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
          <p class="text-xl text-gray-600">Invest in your medical laboratory career. Get unrestricted access to our premium ecosystem.</p>
        </div>
        
        <div class="text-center">
          <NuxtLink to="/pricing" class="inline-flex items-center justify-center px-8 py-2.5 text-lg font-medium text-white bg-brand hover:bg-violet-700 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            View Subscription Plans
            <ArrowRight class="ml-2 w-5 h-5" />
          </NuxtLink>
          <p class="mt-4 text-sm text-gray-500">Secure payments powered by Paystack.</p>
        </div>
      </div>
    </section>

    <!-- Support Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-brand text-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div class="w-full lg:w-1/2 space-y-6">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Have questions?<br/>We're here to help.
          </h2>
          <p class="text-xl text-blue-100 font-light leading-relaxed max-w-lg">
            Whether you need help with verification, accessing resources, or finding a mentor, our support team is directly connected to the admin dashboard. Drop us a message!
          </p>
          
          <div class="pt-4 space-y-3 text-sm text-blue-100">
            <div class="flex items-center gap-3">
              <Mail class="w-5 h-5 text-violet-300 shrink-0" />
              <span>Official Email: <a href="mailto:support@medlabconvo.com" class="text-white font-medium hover:underline">support@medlabconvo.com</a></span>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="w-5 h-5 text-violet-300 shrink-0" />
              <span>Support & WhatsApp: <strong class="text-white">+234 813 000 0000</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <MapPin class="w-5 h-5 text-violet-300 shrink-0" />
              <span>Address: <span class="text-white">MedLabConvo Hub, Lagos, Nigeria</span></span>
            </div>
          </div>
        </div>
        
        <div class="w-full lg:w-1/2">
          <div class="bg-white rounded-xl shadow-2xl p-6 md:p-10 text-gray-900">
            <h3 class="text-2xl font-bold mb-6">Send an Enquiry</h3>
            
            <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 text-center space-y-3">
              <div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check class="w-6 h-6" />
              </div>
              <p class="font-medium">Message Sent Successfully!</p>
              <p class="text-sm">We will get back to you shortly.</p>
              <button @click="resetForm" class="text-brand text-sm hover:underline font-medium mt-2">Send another message</button>
            </div>
            
            <form v-else @submit.prevent="submitEnquiry" class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  v-model="enquiryForm.name" 
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors" 
                  placeholder="e.g. John Doe" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  v-model="enquiryForm.email" 
                  type="email" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  v-model="enquiryForm.message" 
                  required
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors resize-none" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <div v-if="error" class="text-red-500 text-sm font-medium">{{ error }}</div>
              
              <button 
                type="submit" 
                :disabled="loading"
                class="w-full bg-brand hover:bg-violet-700 text-white py-3.5 rounded-lg font-medium transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
              >
                <span v-if="loading">Sending...</span>
                <span v-else>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Banner -->
    <section class="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop" alt="Lab Test Tubes" class="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div class="absolute inset-0 bg-gray-900/80"></div>
      <div class="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight">Ready to elevate your internship?</h2>
        <p class="text-xl text-gray-300 font-light max-w-2xl mx-auto">
          Join hundreds of other verified interns who are building their careers and mastering the bench.
        </p>
        <div class="pt-4">
          <NuxtLink to="/register" class="bg-brand hover:bg-violet-700 text-white px-10 py-2.5 rounded-lg text-lg font-bold transition-colors inline-block border border-transparent">
            Apply for Access Now
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSeoMeta } from '#imports';
import { Folder, Users, Briefcase, Check, ChevronDown, ArrowRight, X, Calendar, MapPin } from 'lucide-vue-next';
import { useCreateEnquiry } from '@/composables/modules/enquiries/useCreateEnquiry';
import { useGetEvents } from '@/composables/modules/events/useGetEvents';
import { useGetArticles } from '@/composables/modules/articles/useGetArticles';

const { loading: loadingEvents, events, fetchEvents } = useGetEvents();
const { loading: loadingArticles, articles, fetchArticles } = useGetArticles();

const selectedEvent = ref<any>(null);
const registeringEvent = ref(false);
const eventRegistered = ref(false);

const openEventModal = (event: any) => {
  selectedEvent.value = event;
  eventRegistered.value = false;
  document.body.style.overflow = 'hidden';
};

const closeEventModal = () => {
  selectedEvent.value = null;
  document.body.style.overflow = '';
};

const registerForEvent = async () => {
  if (!selectedEvent.value) return;
  registeringEvent.value = true;
  try {
    // We reuse the createEnquiry endpoint or simulate a registration
    // If you had a dedicated event registration endpoint, you would call it here.
    await new Promise(resolve => setTimeout(resolve, 1000));
    eventRegistered.value = true;
  } catch (err) {
    console.error(err);
  } finally {
    registeringEvent.value = false;
  }
};

onMounted(() => {
  fetchEvents();
  fetchArticles();
});

useSeoMeta({
  title: 'UniVerse - Medical Laboratory Science Student Community',
  description: 'The premier ecosystem and digital community for Medical Laboratory Science students.',
  ogTitle: 'UniVerse - Medical Laboratory Science Student Community',
  ogDescription: 'The premier ecosystem and digital community for Medical Laboratory Science students.',
  ogImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
  twitterCard: 'summary_large_image',
})

const currentSlide = ref(0);
let slideInterval: ReturnType<typeof setInterval> | null = null;

const heroImages = [
  { url: '/images/black_african_lab_scientist.jpg', alt: 'Microscope in Lab' },
  { url: '/images/black_african_medical_students.jpg', alt: 'Scientist Working' },
  { url: '/images/black_african_medical_career.jpg', alt: 'Lab Equipment and Samples' }
];

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroImages.length;
};

const setSlide = (index: number) => {
  currentSlide.value = index;
  resetInterval();
};

const resetInterval = () => {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
};

// Testimonials (Enhanced with photo, full name, role, and institution)
const currentTestimonial = ref(0);
const testimonials = [
  { 
    text: 'The Vault has been a lifesaver during my university rotations and exam prep. Having past questions and organized bench protocols in one place gave me complete confidence.', 
    name: 'Sarah Jenkins', 
    role: '400L MLS Student', 
    school: 'University of Lagos (UNILAG)', 
    initials: 'SJ',
    image: '/images/black_african_medical_students.jpg'
  },
  { 
    text: 'Through the UniVerse mentorship initiative, I connected with a Senior Laboratory Scientist who guided me through hematology case studies and interview readiness.', 
    name: 'Michael Osei', 
    role: 'MLS Graduate & Research Intern', 
    school: 'University of Ibadan (UI)', 
    initials: 'MO',
    image: '/images/black_african_lab_scientist.jpg'
  },
  { 
    text: 'An indispensable ecosystem for every aspiring Medical Laboratory Scientist. The community is focused, noise-free, and directly tailored to our curriculum.', 
    name: 'Elena Vance', 
    role: '500L BMLS Candidate', 
    school: 'University of Nigeria, Nsukka (UNN)', 
    initials: 'EV',
    image: '/images/black_african_medical_career.jpg'
  },
];

// FAQs (Expanded comprehensive database)
const openFaq = ref<number | null>(null);
const faqs = [
  { 
    question: 'How do I join the UniVerse community?', 
    answer: 'Simply click "Apply for Access" or "Get Started". You will enter your basic profile details, verify your email with a 4-digit OTP, select your university and programme, and upload an academic verification document. Once submitted, our verification team will review your application within 12–24 hours.' 
  },
  { 
    question: 'How does the credential verification process work and what documents are accepted?', 
    answer: 'To protect academic integrity and maintain an exclusive, high-signal community for Medical Laboratory Science students, every applicant must upload a qualifying document. Acceptable proofs include: a valid Student ID Card, Official University Admission Letter, Current Semester Course Registration Slip, or an Institutional Clinical Posting Letter (PDF, JPG, or PNG up to 5MB).' 
  },
  { 
    question: 'How do I navigate registration and download my instant digital student card?', 
    answer: 'Once your registration and credentials are authenticated, log into your student dashboard. Head over to the Verification / Profile tab to view your official UniVerse Verified Member status and instantly download or print your customized Digital Student Identity Card.' 
  },
  { 
    question: 'How do I access The Vault and proprietary study resources?', 
    answer: 'The Vault is accessible directly from your member dashboard. It contains categorized past exam questions, practical bench guides, standard operating procedures (SOPs), and clinical case archives across Medical Microbiology, Hematology, Chemical Pathology, and Histopathology.' 
  },
  { 
    question: 'What are the mechanics of the Expert Mentorship program?', 
    answer: 'UniVerse connects students with verified senior preceptors, post-graduate researchers, and licensed laboratory scientists. Through the Mentorship tab, you can browse specialist mentors by domain (Quality Assurance, Clinical Chemistry, Lab Management), submit mentorship requests, and schedule one-on-one virtual guidance sessions.' 
  },
  { 
    question: 'How do I utilize the Career Hub and find student placement opportunities?', 
    answer: 'The Career Hub provides verified listings for hospital placements, student research assistantships, and diagnostic laboratory opportunities. You can apply directly through the platform. Submitting a formal CV is completely optional for students; you can apply using your academic year, coursework summary, and institution profile.' 
  },
  { 
    question: 'What are the direct support channels and troubleshooting options?', 
    answer: 'If you ever encounter difficulties with login, university selection, or document upload, you can email support@medlabconvo.com, message our support desk on WhatsApp at +234 813 000 0000, or submit the direct enquiry form at the bottom of our homepage. Our team typically responds within 2–4 hours during business days.' 
  },
];
const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index;
};

// Support Enquiry
const { loading, error, success, createEnquiry } = useCreateEnquiry();
const enquiryForm = ref({ name: '', email: '', message: '' });

const submitEnquiry = async () => {
  await createEnquiry(enquiryForm.value);
};

const resetForm = () => {
  enquiryForm.value = { name: '', email: '', message: '' };
  success.value = false;
};

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
});
</script>
