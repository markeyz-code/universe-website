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
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div class="inline-block bg-brand/20 border border-brand/30 text-blue-100 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-2 uppercase backdrop-blur-sm">
            Empowering the Next Generation of Scientists
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            The Ultimate Network for <br class="hidden md:block"/> <span class="text-brand">MLS Students</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto">
            Access specialized study materials, connect with experienced mentors, and navigate your academic journey with absolute confidence.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <NuxtLink to="/register" class="bg-brand hover:bg-[#1f4e70] text-white px-8 py-2 rounded-lg text-lg font-medium transition-colors inline-block w-full sm:w-auto text-center border border-transparent">
              Apply for Access
            </NuxtLink>
            <NuxtLink to="/login" class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-2 rounded-lg text-lg font-medium transition-colors inline-block w-full sm:w-auto text-center">
              Member Sign In
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Carousel Indicators -->
      <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
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

    <!-- Impact / Statistics Section -->
    <section class="border-y border-gray-200 bg-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100 text-center">
          <div class="px-4">
            <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">5k+</div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wider">Verified Students</div>
          </div>
          <div class="px-4">
            <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10k+</div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wider">Study Resources</div>
          </div>
          <div class="px-4">
            <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">150+</div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wider">Senior Mentors</div>
          </div>
          <div class="px-4">
            <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">50+</div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wider">Partner Labs</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Elaborate Features Showcase -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Everything You Need to Succeed</h2>
          <p class="text-lg text-gray-600">A complete ecosystem designed exclusively for the demands of the modern University student.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Vault Feature -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col group hover:border-brand/50 transition-colors duration-300 shadow-sm">
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
              <img src="/images/black_african_medical_students.jpg" alt="Clinical Resources" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="p-8 flex-1 flex flex-col relative">
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
              <img src="/images/black_african_medical_mentorship.jpg" alt="Mentorship" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="p-8 flex-1 flex flex-col relative">
              <div class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-brand absolute -top-6 left-8 shadow-sm">
                <Users class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3 mt-4">Expert Mentorship</h3>
              <p class="text-gray-600 flex-1 leading-relaxed">Connect directly with senior students and professionals who have navigated the intricacies of the exams and lab practicals.</p>
            </div>
          </div>

          <!-- Career Hub Feature -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col group hover:border-brand/50 transition-colors duration-300 shadow-sm">
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
              <img src="/images/black_african_medical_career.jpg" alt="Career Hub" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="p-8 flex-1 flex flex-col relative">
              <div class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-brand absolute -top-6 left-8 shadow-sm">
                <Briefcase class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3 mt-4">Career Hub</h3>
              <p class="text-gray-600 flex-1 leading-relaxed">Prepare for graduation with resume reviews, interview prep, and exclusive academic and entry-level postings.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Join Us / Exclusive Access -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div class="w-full lg:w-1/2 space-y-6">
          <div class="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
            Quality Assurance
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Strictly Verified.<br/>Exclusive 2-Year Access.
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            To maintain the highest quality and relevance of our community, access is strictly verified. We manually review every applicant's credentials to ensure they are an actively participating University student.
          </p>
          <ul class="space-y-4 pt-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <span class="text-gray-700">Manual verification of institutional posting letters</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <span class="text-gray-700">Access limited strictly to the 24-month duration</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <span class="text-gray-700">High-signal, noise-free professional environment</span>
            </li>
          </ul>
        </div>
        <div class="w-full lg:w-1/2">
          <div class="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <img src="/images/black_african_medical_students.jpg" alt="University Verification" class="w-full h-auto object-cover" />
            <div class="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Hear From Our Interns</h2>
          <p class="text-lg text-gray-600">See how UniVerse has transformed the university experience for hundreds of students.</p>
        </div>
        <div class="relative max-w-4xl mx-auto">
          <div class="overflow-hidden relative">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }"
            >
              <div v-for="(testimonial, index) in testimonials" :key="index" class="w-full flex-shrink-0 px-4">
                <div class="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 text-center relative">
                  <div class="absolute top-8 left-1/2 -translate-x-1/2 text-gray-200 opacity-50">
                    <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  <p class="text-xl md:text-2xl text-gray-700 italic relative z-10 mb-8 mt-6">"{{ testimonial.text }}"</p>
                  <div class="flex flex-col items-center">
                    <div class="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl mb-3">
                      {{ testimonial.initials }}
                    </div>
                    <h4 class="font-bold text-gray-900">{{ testimonial.name }}</h4>
                    <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
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
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Community Highlights</h2>
          <p class="text-lg text-gray-600 mt-4">Join our webinars, seminars, and networking events.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <span class="bg-blue-100 text-brand text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Upcoming Webinar</span>
            <h3 class="text-2xl font-bold text-gray-900 mt-4 mb-2">Mastering Laboratory Diagnostics</h3>
            <p class="text-gray-600 mb-4">Join Dr. Osei as he walks through the latest methodologies in modern clinical diagnostics. Exclusive to members.</p>
            <p class="text-sm font-semibold text-gray-500">Starts: Friday, 4:00 PM</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Career Fair</span>
            <h3 class="text-2xl font-bold text-gray-900 mt-4 mb-2">Annual MLS Networking Event</h3>
            <p class="text-gray-600 mb-4">Connect with top pathology labs and hospitals looking for fresh, talented graduates to join their teams.</p>
            <p class="text-sm font-semibold text-gray-500">Location: Virtual Hub</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Frequently Asked Questions</h2>
          <p class="text-lg text-gray-600">Everything you need to know about the UniVerse ecosystem.</p>
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
              :style="{ maxHeight: openFaq === index ? '200px' : '0' }"
            >
              <div class="p-6 pt-0 text-gray-600 bg-white">
                {{ faq.answer }}
              </div>
            </div>
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
          <NuxtLink to="/pricing" class="inline-flex items-center justify-center px-8 py-2.5 text-lg font-medium text-white bg-brand hover:bg-[#1f4e70] rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
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
        </div>
        
        <div class="w-full lg:w-1/2">
          <div class="bg-white rounded-xl shadow-2xl p-8 md:p-10 text-gray-900">
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
                class="w-full bg-brand hover:bg-[#1f4e70] text-white py-3.5 rounded-lg font-medium transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
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
          <NuxtLink to="/register" class="bg-brand hover:bg-[#1f4e70] text-white px-10 py-2.5 rounded-lg text-lg font-bold transition-colors inline-block border border-transparent">
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
import { Folder, Users, Briefcase, Check, ChevronDown } from 'lucide-vue-next';
import { useCreateEnquiry } from '@/composables/modules/enquiries/useCreateEnquiry';

useSeoMeta({
  title: 'UniVerse - University Student Community',
  description: 'The premier ecosystem and community for University Students.',
  ogTitle: 'UniVerse - University Student Community',
  ogDescription: 'The premier ecosystem and community for University Students.',
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

// Testimonials
const currentTestimonial = ref(0);
const testimonials = [
  { text: 'The Vault has been a lifesaver during my rotations. The organized study materials helped me prep efficiently.', name: 'Sarah Jenkins', role: 'Current Intern', initials: 'SJ' },
  { text: 'Through the mentorship program, I connected with a senior scientist who guided me through the interview process.', name: 'Michael Osei', role: 'Alumni', initials: 'MO' },
  { text: 'An absolute necessity for any MLS intern. The noise-free environment lets you focus entirely on professional growth.', name: 'Elena Vance', role: 'Current Intern', initials: 'EV' },
];

// FAQs
const openFaq = ref<number | null>(null);
const faqs = [
  { question: 'Who is eligible to join?', answer: 'Only actively participating University students are eligible. Access is strictly limited to the duration of your study.' },
  { question: 'How does the verification process work?', answer: 'You must upload a copy of your institutional posting letter during registration. Our admin team manually reviews this to verify your status before granting access.' },
  { question: 'What happens after 24 months?', answer: 'Your standard intern access will automatically expire. However, you will have the option to transition to the Mentorship tier if you wish to guide future interns.' },
  { question: 'Is the study material in The Vault updated?', answer: 'Yes, The Vault is actively maintained and crowdsourced by the community, ensuring materials are relevant and up to date.' },
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
