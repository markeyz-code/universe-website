<template>
  <div class="flex-grow flex flex-col w-full bg-[#F6F8FB]">
    <!-- Hero -->
    <section class="relative overflow-hidden brand-mesh">
      <div class="absolute inset-0 brand-grid opacity-70"></div>
      <div class="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-teal-200/25 blur-3xl"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-16 lg:pb-24">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="relative z-10">
            <div class="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/70 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand backdrop-blur">
              <span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              MedLabConvo · UniVerse
            </div>
            <h1 class="mt-6 font-display text-[44px] leading-[.98] sm:text-6xl lg:text-[72px] font-bold tracking-tight text-navy-950">
              Study with<br><span class="bg-gradient-to-r from-brand to-teal-500 bg-clip-text text-transparent">direction.</span><br>Grow with a community.
            </h1>
            <p class="mt-6 text-base sm:text-lg leading-relaxed text-navy-500 max-w-xl">
              A verified home for Medical Laboratory Science students — study resources, mentors and career opportunities in one calm, focused workspace.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <NuxtLink to="/register" class="btn-primary">
                Apply for membership
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
              <NuxtLink to="/login" class="btn-soft">
                Member sign in
              </NuxtLink>
            </div>
            <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-semibold text-navy-500">
              <span class="inline-flex items-center gap-1.5"><ShieldCheck class="w-4 h-4 text-teal-500" /> Manual student verification</span>
              <span class="inline-flex items-center gap-1.5"><LockKeyhole class="w-4 h-4 text-teal-500" /> Secure Paystack payments</span>
              <span class="inline-flex items-center gap-1.5"><BadgeCheck class="w-4 h-4 text-teal-500" /> Built for MLS</span>
            </div>
          </div>

          <div class="relative">
            <div class="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-brand-200/40 via-teal-100/40 to-transparent blur-2xl"></div>
            <div class="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-navy-950 shadow-soft">
              <img :src="heroImages[currentSlide]?.url" :alt="heroImages[currentSlide]?.alt || 'MLS students'" class="h-[430px] sm:h-[510px] w-full object-cover opacity-95" />
              <div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent"></div>
              <div class="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand shadow-sm">
                <ShieldCheck class="w-3.5 h-3.5 text-teal-600" /> Verified student community
              </div>
              <div class="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div class="text-white">
                  <p class="text-[10px] font-extrabold uppercase tracking-[0.18em] text-teal-300">Inside the workspace</p>
                  <p class="mt-1 font-display text-xl font-bold">The Vault &amp; Mentorship</p>
                </div>
                <div class="flex gap-1.5 pb-1">
                  <button v-for="(_, index) in heroImages" :key="'dot-' + index" @click="setSlide(index)" class="h-1.5 rounded-full transition-all" :class="currentSlide === index ? 'w-6 bg-teal-400' : 'w-1.5 bg-white/50'" :aria-label="'Go to slide ' + (index + 1)"></button>
                </div>
              </div>
            </div>

            <div class="hidden sm:flex absolute -left-5 top-16 items-center gap-3 rounded-2xl border border-navy-100 bg-white/95 p-3.5 pr-5 shadow-card backdrop-blur">
              <div class="w-9 h-9 rounded-xl bg-brand-50 text-brand flex items-center justify-center"><ShieldCheck class="w-5 h-5" /></div>
              <div><p class="text-[10px] font-extrabold uppercase tracking-[0.14em] text-navy-400">Student status</p><p class="text-sm font-bold text-navy-950">Verified</p></div>
            </div>
            <div class="hidden sm:block absolute -right-4 bottom-28 rounded-2xl border border-navy-100 bg-white/95 p-3.5 shadow-card backdrop-blur">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center"><Folder class="w-4 h-4" /></div>
                <div><p class="text-[10px] font-extrabold uppercase tracking-[0.14em] text-navy-400">Resources</p><p class="text-sm font-bold text-navy-950">Past questions &amp; guides</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Proof strip -->
    <section class="border-y border-navy-100 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 grid grid-cols-2 md:grid-cols-4 gap-y-6 divide-x divide-navy-100">
        <div v-for="(metric, idx) in heroStats" :key="'hero-stat-' + idx" class="px-4 sm:px-6 first:pl-0">
          <p class="font-display text-2xl sm:text-3xl font-bold text-navy-950">{{ metric.value }}</p>
          <p class="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-navy-400">{{ metric.label }}</p>
        </div>
      </div>
    </section>

    <!-- Platform -->
    <section id="platform" class="bg-white py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p class="section-label">Inside UniVerse</p>
            <h2 class="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-950">One workspace.<br class="hidden sm:block">Every advantage.</h2>
          </div>
          <p class="max-w-md text-sm sm:text-base leading-relaxed text-navy-500">Five connected spaces for the whole student journey — learn, get unstuck, find your people and make your next move.</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-4">
          <div class="group relative lg:col-span-2 overflow-hidden rounded-[1.75rem] bg-navy-950 p-7 sm:p-9 text-white min-h-[330px] card-lift">
            <img src="/vault_microscope.jpg" alt="The Vault" class="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-tr from-navy-950 via-navy-950/85 to-brand/40"></div>
            <div class="relative h-full flex flex-col justify-between gap-16">
              <div class="flex items-center justify-between">
                <div class="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-teal-300"><Folder class="w-5 h-5" /></div>
                <span class="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">01 · Resource library</span>
              </div>
              <div>
                <h3 class="font-display text-2xl sm:text-3xl font-bold">The Vault</h3>
                <p class="mt-2 max-w-md text-sm leading-relaxed text-white/65">Past questions, curated study guides and bench references, organised by the things you are actually studying.</p>
                <NuxtLink to="/dashboard/vault" class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-300 hover:text-teal-200 transition-colors">Open the Vault <ArrowUpRight class="w-4 h-4" /></NuxtLink>
              </div>
            </div>
          </div>

          <div class="group rounded-[1.75rem] border border-navy-100 bg-[#FBFCFE] p-7 card-lift">
            <div class="flex items-center justify-between"><div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand flex items-center justify-center"><Users class="w-5 h-5" /></div><span class="text-[10px] font-extrabold uppercase tracking-[0.16em] text-navy-300">02</span></div>
            <h3 class="mt-6 font-display text-xl font-bold text-navy-950">Mentorship Matcher</h3>
            <p class="mt-2 text-sm leading-relaxed text-navy-500">A senior student or preceptor who has walked the path you are on.</p>
            <NuxtLink to="/mentorship" class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-700">Find a mentor <ArrowUpRight class="w-3.5 h-3.5" /></NuxtLink>
          </div>

          <div class="group rounded-[1.75rem] border border-navy-100 bg-white p-7 card-lift">
            <div class="flex items-center justify-between"><div class="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center"><Briefcase class="w-5 h-5" /></div><span class="text-[10px] font-extrabold uppercase tracking-[0.16em] text-navy-300">03</span></div>
            <h3 class="mt-6 font-display text-xl font-bold text-navy-950">Career Hub</h3>
            <p class="mt-2 text-sm leading-relaxed text-navy-500">Placements, internships and entry-level roles — with a CV that is ready to send.</p>
            <NuxtLink to="/career" class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-700">Browse roles <ArrowUpRight class="w-3.5 h-3.5" /></NuxtLink>
          </div>

          <div class="group rounded-[1.75rem] border border-navy-100 bg-white p-7 card-lift">
            <div class="flex items-center justify-between"><div class="w-10 h-10 rounded-2xl bg-sand-100 text-brand-700 flex items-center justify-center"><ShoppingBag class="w-5 h-5" /></div><span class="text-[10px] font-extrabold uppercase tracking-[0.16em] text-navy-300">04</span></div>
            <h3 class="mt-6 font-display text-xl font-bold text-navy-950">Creator Hub</h3>
            <p class="mt-2 text-sm leading-relaxed text-navy-500">Buy and sell the study assets students actually use — templates, guides, notes.</p>
            <NuxtLink to="/dashboard/marketplace" class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-700">Explore the market <ArrowUpRight class="w-3.5 h-3.5" /></NuxtLink>
          </div>

          <div class="group rounded-[1.75rem] border border-navy-100 bg-white p-7 card-lift">
            <div class="flex items-center justify-between"><div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand flex items-center justify-center"><Target class="w-5 h-5" /></div><span class="text-[10px] font-extrabold uppercase tracking-[0.16em] text-navy-300">05</span></div>
            <h3 class="mt-6 font-display text-xl font-bold text-navy-950">Events &amp; Services</h3>
            <p class="mt-2 text-sm leading-relaxed text-navy-500">CV reviews, mock interviews and webinars that move you from theory to practice.</p>
            <NuxtLink to="/dashboard/events" class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-700">See what’s on <ArrowUpRight class="w-3.5 h-3.5" /></NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="relative overflow-hidden bg-navy-950 py-20 lg:py-28">
      <div class="absolute inset-0 brand-grid opacity-[0.08]"></div>
      <div class="absolute -left-24 top-10 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p class="text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal-300">How it works</p>
          <h2 class="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">A verified path,<br>not a free-for-all.</h2>
          <p class="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-white/60">Every student is reviewed by a human before they enter the community. It keeps the room high-signal and your access meaningful.</p>
          <div class="mt-8 space-y-4">
            <div class="flex gap-4"><div class="w-8 h-8 shrink-0 rounded-full border border-teal-400/40 bg-teal-400/10 text-teal-300 flex items-center justify-center text-xs font-extrabold">01</div><div><p class="font-bold text-white">Apply with a current school document</p><p class="text-sm text-white/50 mt-0.5">ID card, fees receipt, course registration form or admission letter.</p></div></div>
            <div class="flex gap-4"><div class="w-8 h-8 shrink-0 rounded-full border border-teal-400/40 bg-teal-400/10 text-teal-300 flex items-center justify-center text-xs font-extrabold">02</div><div><p class="font-bold text-white">We review it manually</p><p class="text-sm text-white/50 mt-0.5">Usually within 24–48 hours. No payment is taken yet.</p></div></div>
            <div class="flex gap-4"><div class="w-8 h-8 shrink-0 rounded-full border border-teal-400/40 bg-teal-400/10 text-teal-300 flex items-center justify-center text-xs font-extrabold">03</div><div><p class="font-bold text-white">Approved, then choose a plan</p><p class="text-sm text-white/50 mt-0.5">Sign in and activate the subscription that fits your studies.</p></div></div>
          </div>
          <NuxtLink to="/register" class="mt-8 btn-light">Start your application <ArrowRight class="w-4 h-4" /></NuxtLink>
        </div>

        <div class="relative">
          <div class="rounded-[2rem] bg-white p-6 shadow-soft rotate-[-1.5deg]">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand"><ShieldCheck class="w-3.5 h-3.5" /> Verification review</span>
              <span class="text-[10px] font-bold text-navy-400">24–48h</span>
            </div>
            <div class="mt-5 space-y-2.5">
              <div class="flex items-center gap-3 rounded-xl border border-navy-100 bg-[#FBFCFE] p-3"><div class="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center"><FileText class="w-4 h-4" /></div><div class="flex-1"><p class="text-xs font-bold text-navy-900">School fees receipt</p><p class="text-[10px] text-navy-400">Current session · name visible</p></div><Check class="w-4 h-4 text-teal-600" /></div>
              <div class="flex items-center gap-3 rounded-xl border border-navy-100 bg-[#FBFCFE] p-3"><div class="w-8 h-8 rounded-lg bg-brand-50 text-brand flex items-center justify-center"><BookOpen class="w-4 h-4" /></div><div class="flex-1"><p class="text-xs font-bold text-navy-900">Course registration form</p><p class="text-[10px] text-navy-400">Semester enrolment</p></div><Check class="w-4 h-4 text-teal-600" /></div>
              <div class="flex items-center gap-3 rounded-xl border border-navy-100 bg-[#FBFCFE] p-3"><div class="w-8 h-8 rounded-lg bg-sand-100 text-brand-700 flex items-center justify-center"><GraduationCap class="w-4 h-4" /></div><div class="flex-1"><p class="text-xs font-bold text-navy-900">Admission letter</p><p class="text-[10px] text-navy-400">Institution &amp; programme</p></div><Check class="w-4 h-4 text-teal-600" /></div>
            </div>
            <div class="mt-5 rounded-xl bg-teal-50 border border-teal-100 p-3.5">
              <p class="text-[10px] font-extrabold uppercase tracking-[0.14em] text-teal-700">Approved</p>
              <p class="text-xs font-semibold text-navy-800 mt-1">Next: sign in and choose your subscription plan.</p>
            </div>
          </div>
          <div class="absolute -bottom-6 -right-4 hidden sm:flex items-center gap-2 rounded-2xl bg-navy-900 border border-white/10 px-4 py-3 text-white shadow-soft">
            <LockKeyhole class="w-4 h-4 text-teal-300" />
            <span class="text-xs font-semibold">No payment before approval</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Join Us / Exclusive Access -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-navy-100">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div class="w-full lg:w-1/2 space-y-6">
          <div class="inline-block bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
            Verified Academic Community
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-navy-950 tracking-tight leading-tight">
            Strictly Verified.<br/>Academic Integrity &amp; Verified Access.
          </h2>
          <p class="text-lg text-navy-500 leading-relaxed">
            To protect academic integrity and maintain a secure, high-yield environment tailored exclusively for Medical Laboratory Science students, every applicant's credentials are authenticated before full platform access is granted.
          </p>
          <ul class="space-y-4 pt-4">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <div class="text-navy-700 text-sm">
                <strong class="font-semibold text-navy-950">Acceptable Documents:</strong> Current Student ID card, school fees receipt, online course registration form, or admission letter.
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <div class="text-navy-700 text-sm">
                <strong class="font-semibold text-navy-950">Seamless Upload:</strong> Submit a clean PDF, JPG, or PNG document (max 5MB) directly during registration.
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <div class="text-navy-700 text-sm">
                <strong class="font-semibold text-navy-950">Prompt Outcome Notification:</strong> Our team reviews applications within 24–48 hours. You receive an email update with your next step; approved students then sign in and choose a plan.
              </div>
            </li>
          </ul>
        </div>
        <div class="w-full lg:w-1/2">
          <div class="relative rounded-[2rem] overflow-hidden border border-navy-100 shadow-soft">
            <img src="/documents_verify.jpg" alt="University Credential Verification" class="w-full h-auto object-cover" />
            <div class="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section v-if="siteSettings.sections?.testimonials" class="py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F8FB] border-t border-navy-100">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-navy-950 tracking-tight">Hear from Our Members</h2>
          <p class="text-lg text-navy-500">See how UniVerse has empowered Medical Laboratory Science students and alumni across universities.</p>
        </div>
        <div class="relative max-w-4xl mx-auto">
          <div class="overflow-hidden relative">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }"
            >
              <div v-for="(testimonial, index) in testimonials" :key="index" class="w-full flex-shrink-0 px-4">
                <div class="bg-white p-6 md:p-12 rounded-xl shadow-sm border border-navy-100 text-center relative">
                  <div class="absolute top-6 left-1/2 -translate-x-1/2 text-gray-200 opacity-50">
                    <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  <p class="text-lg md:text-2xl text-navy-700 italic relative z-10 mb-8 mt-6">"{{ testimonial.text }}"</p>
                  <div class="flex flex-col items-center">
                    <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-brand/20 shadow-sm mb-3">
                      <img v-if="testimonial.image" :src="testimonial.image" :alt="testimonial.name" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full bg-brand/10 text-brand font-bold flex items-center justify-center">{{ testimonial.initials }}</div>
                    </div>
                    <h4 class="font-bold text-navy-950 text-lg">{{ testimonial.name }}</h4>
                    <p class="text-xs font-semibold text-brand uppercase tracking-wider">{{ testimonial.role }}</p>
                    <p class="text-xs text-navy-400 mt-0.5">{{ testimonial.school }}</p>
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
    <section v-if="siteSettings.sections?.events" class="py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F8FB] border-t border-navy-100">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-navy-950 tracking-tight">Community Highlights & Events</h2>
          <p class="text-lg text-navy-500 mt-4">Join our webinars, seminars, and networking events.</p>
        </div>
        
        <div v-if="loadingEvents" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
        </div>
        
        <div v-else-if="events.length === 0" class="text-center py-12 text-navy-400">
          No upcoming events at the moment.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-8">
          <div v-for="event in events.slice(0, 3)" :key="event._id" @click="openEventModal(event)" class="bg-white rounded-xl shadow-sm border border-navy-100 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group flex flex-col">
            <div v-if="event.coverImage" class="w-full h-48 bg-navy-50 relative overflow-hidden shrink-0">
              <img :src="event.coverImage" :alt="event.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span class="absolute bottom-3 left-3 bg-brand text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-sm">{{ event.category || 'Event' }}</span>
            </div>
            <div class="p-5 md:p-6 flex-1 flex flex-col">
              <span v-if="!event.coverImage" class="bg-brand-100 text-brand-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide w-fit mb-3">{{ event.category || 'Event' }}</span>
              <h3 class="text-xl font-bold text-navy-950 mb-2 group-hover:text-brand transition-colors line-clamp-2">{{ event.title }}</h3>
              <p class="text-navy-500 mb-4 line-clamp-2 text-sm flex-1">{{ event.description }}</p>
              <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div>
                  <p class="text-xs font-semibold text-navy-400 flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5"/> {{ new Date(event.date).toLocaleDateString() }}</p>
                  <p class="text-xs font-semibold text-navy-400 mt-1 flex items-center gap-1.5 truncate max-w-[150px]" v-if="event.location"><MapPin class="w-3.5 h-3.5"/> {{ event.location }}</p>
                </div>
                <button class="text-brand text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-50 px-2.5 py-1.5 rounded-lg">View <ArrowRight class="w-3.5 h-3.5"/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Event Details Modal -->
    <div v-if="selectedEvent" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" @click="closeEventModal"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Cover Image -->
        <div v-if="selectedEvent.coverImage" class="w-full h-56 md:h-72 relative shrink-0">
          <img :src="selectedEvent.coverImage" :alt="selectedEvent.title" class="w-full h-full object-cover"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <button @click="closeEventModal" class="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full transition-colors z-10 shadow-sm">
            <X class="w-5 h-5" />
          </button>
          
          <div class="absolute bottom-6 left-6 right-6">
            <span class="bg-brand text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide mb-3 inline-block shadow-sm">{{ selectedEvent.category || 'Event' }}</span>
            <h3 class="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">{{ selectedEvent.title }}</h3>
          </div>
        </div>

        <div class="p-6 md:p-8 overflow-y-auto flex-1">
          <button v-if="!selectedEvent.coverImage" @click="closeEventModal" class="absolute top-4 right-4 p-2 text-navy-300 hover:text-navy-950 hover:bg-navy-50 rounded-full transition-colors z-10">
            <X class="w-5 h-5" />
          </button>
          
          <template v-if="!selectedEvent.coverImage">
            <span class="bg-brand-100 text-brand-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block">{{ selectedEvent.category || 'Event' }}</span>
            <h3 class="text-2xl md:text-3xl font-bold text-navy-950 mb-6 leading-tight">{{ selectedEvent.title }}</h3>
          </template>
          
          <div class="flex flex-wrap gap-4 mb-6 pb-6 border-b border-navy-100">
            <div class="flex items-center gap-2 text-navy-500">
              <Calendar class="w-5 h-5 text-brand" />
              <span class="font-medium">{{ new Date(selectedEvent.date).toLocaleDateString() }}</span>
            </div>
            <div class="flex items-center gap-2 text-navy-500" v-if="selectedEvent.location">
              <MapPin class="w-5 h-5 text-brand" />
              <span class="font-medium">{{ selectedEvent.location }}</span>
            </div>
          </div>

          <div class="prose prose-gray max-w-none text-navy-500">
            <p class="whitespace-pre-wrap leading-relaxed">{{ selectedEvent.description }}</p>
          </div>
        </div>
        <div class="p-6 bg-[#F6F8FB] border-t border-navy-100 flex justify-end gap-3 shrink-0">
          <span v-if="eventRegistered" class="text-green-600 font-medium self-center mr-4">Successfully registered!</span>
          <button @click="closeEventModal" class="px-5 py-2.5 rounded-lg border border-navy-200 text-navy-700 font-medium hover:bg-navy-50 transition-colors">Close</button>
          <button @click="registerForEvent" :disabled="registeringEvent" class="px-5 py-2.5 rounded-lg bg-brand text-white font-medium hover:bg-[#1a405c] transition-colors shadow-sm shadow-brand/20 disabled:opacity-50">
            {{ registeringEvent ? 'Registering...' : 'Register for Event' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Latest Articles Section (Displayed only when published articles exist and enabled) -->
    <section v-if="siteSettings.sections?.articles && !loadingArticles && articles && articles.length > 0" class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-navy-100">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-navy-950 tracking-tight">Latest Insights</h2>
          <p class="text-lg text-navy-500 mt-4">Read our latest articles, bench guides, and community updates.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:p-8">
          <NuxtLink :to="'/articles/' + article._id" v-for="article in articles.slice(0, 3)" :key="article._id" class="bg-white rounded-xl shadow-sm border border-navy-100 overflow-hidden hover:shadow-lg transition-all flex flex-col group cursor-pointer">
            <div class="h-48 bg-navy-100 w-full overflow-hidden" v-if="article.coverImage">
               <img :src="article.coverImage" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="h-48 bg-brand/10 w-full flex items-center justify-center overflow-hidden" v-else>
               <span class="text-brand font-bold text-xl group-hover:scale-105 transition-transform duration-500">{{ article.category || 'Article' }}</span>
            </div>
            <div class="p-6 flex-1 flex flex-col">
              <span class="text-xs font-bold text-brand uppercase tracking-wider mb-2">{{ article.category || 'Insight' }}</span>
              <h3 class="text-xl font-bold text-navy-950 mb-2 group-hover:text-brand transition-colors">{{ article.title }}</h3>
              <p class="text-navy-500 text-sm mb-4 line-clamp-3 flex-1">{{ article.excerpt || article.content?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' }}</p>
              <div class="flex items-center justify-between text-xs text-navy-400 mt-auto">
                <span>Published: {{ new Date(article.publishDate || article.createdAt).toLocaleDateString() }}</span>
                <span class="text-brand font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Read <ArrowRight class="w-3 h-3"/></span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-navy-100">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-navy-950 tracking-tight">Frequently Asked Questions</h2>
          <p class="text-lg text-navy-500">Everything you need to know about joining, verifying, and navigating the UniVerse ecosystem.</p>
        </div>
        
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-navy-100 rounded-lg overflow-hidden">
            <button 
              @click="toggleFaq(index)" 
              class="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F6F8FB] transition-colors text-left focus:outline-none"
            >
              <span class="font-bold text-navy-950 text-lg">{{ faq.question }}</span>
              <ChevronDown 
                class="w-5 h-5 text-navy-400 transition-transform duration-300" 
                :class="{ 'rotate-180': openFaq === index }" 
              />
            </button>
            <div 
              class="overflow-hidden transition-all duration-300"
              :style="{ maxHeight: openFaq === index ? '300px' : '0' }"
            >
              <div class="p-6 pt-0 text-navy-500 bg-white leading-relaxed">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center bg-[#F6F8FB] p-8 rounded-xl border border-navy-100">
          <h3 class="text-xl font-bold text-navy-950 mb-2">Still have questions?</h3>
          <p class="text-navy-500 text-sm mb-4">Our dedicated student support team is available to guide your onboarding and answer queries.</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="mailto:support@medlabconvo.com" class="px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors inline-flex items-center gap-2">
              <Mail class="w-4 h-4" /> Email: support@medlabconvo.com
            </a>
            <NuxtLink to="/contact" class="px-5 py-2.5 bg-white border border-navy-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-navy-50 transition-colors">
              Contact Center & Office Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section v-if="siteSettings.sections?.pricing" class="py-24 bg-[#F6F8FB] border-t border-navy-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-navy-950 mb-6">Simple, Transparent Pricing</h2>
          <p class="text-xl text-navy-500">Invest in your medical laboratory career. Get unrestricted access to our premium ecosystem.</p>
        </div>
        
        <div class="text-center">
          <NuxtLink to="/pricing" class="inline-flex items-center justify-center px-8 py-2.5 text-lg font-medium text-white bg-brand hover:bg-brand-700 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            View Subscription Plans
            <ArrowRight class="ml-2 w-5 h-5" />
          </NuxtLink>
          <p class="mt-4 text-sm text-navy-400">Secure payments powered by Paystack.</p>
        </div>
      </div>
    </section>

    <!-- Support Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 bg-brand text-white border-t border-navy-100">
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
              <Mail class="w-5 h-5 text-brand-300 shrink-0" />
              <span>Official Email: <a href="mailto:support@medlabconvo.com" class="text-white font-medium hover:underline">support@medlabconvo.com</a></span>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="w-5 h-5 text-brand-300 shrink-0" />
              <span>Support & WhatsApp: <strong class="text-white">+234 813 000 0000</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <MapPin class="w-5 h-5 text-brand-300 shrink-0" />
              <span>Address: <span class="text-white">MedLabConvo Hub, Lagos, Nigeria</span></span>
            </div>
          </div>
        </div>
        
        <div class="w-full lg:w-1/2">
          <div class="bg-white rounded-xl shadow-2xl p-6 md:p-10 text-navy-950">
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
                <label class="block text-sm font-medium text-navy-700 mb-1">Your Name</label>
                <input 
                  v-model="enquiryForm.name" 
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors" 
                  placeholder="e.g. John Doe" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-navy-700 mb-1">Email Address</label>
                <input 
                  v-model="enquiryForm.email" 
                  type="email" 
                  required
                  class="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-navy-700 mb-1">Message</label>
                <textarea 
                  v-model="enquiryForm.message" 
                  required
                  rows="4"
                  class="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors resize-none" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <div v-if="error" class="text-red-500 text-sm font-medium">{{ error }}</div>
              
              <button 
                type="submit" 
                :disabled="loading"
                class="w-full bg-brand hover:bg-brand-700 text-white py-3.5 rounded-lg font-medium transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
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
    <section class="relative py-24 px-4 sm:px-6 lg:px-8 bg-navy-950 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop" alt="Lab Test Tubes" class="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div class="absolute inset-0 bg-navy-950/80"></div>
      <div class="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight">Ready to elevate your internship?</h2>
        <p class="text-xl text-navy-300 font-light max-w-2xl mx-auto">
          Join hundreds of other verified interns who are building their careers and mastering the bench.
        </p>
        <div class="pt-4">
          <NuxtLink to="/register" class="bg-brand hover:bg-brand-700 text-white px-10 py-2.5 rounded-lg text-lg font-bold transition-colors inline-block border border-transparent">
            Apply for Access Now
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSeoMeta } from '#imports';
import { Folder, Users, Briefcase, Check, ChevronDown, ArrowRight, X, Calendar, MapPin, ShieldCheck, LockKeyhole, BadgeCheck, ArrowUpRight, ShoppingBag, Target, FileText, BookOpen, GraduationCap } from 'lucide-vue-next';
import { useCreateEnquiry } from '@/composables/modules/enquiries/useCreateEnquiry';
import { useGetEvents } from '@/composables/modules/events/useGetEvents';
import { useGetArticles } from '@/composables/modules/articles/useGetArticles';
import { useSiteSettings } from '@/composables/useSiteSettings';

const { settings: siteSettings } = useSiteSettings('universe');
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

const heroStats = computed(() => {
  const stats = siteSettings.value?.stats;
  if (stats?.enabled && Array.isArray(stats.metrics) && stats.metrics.length > 0) {
    return stats.metrics.slice(0, 4).map((metric) => ({
      value: metric.value,
      label: metric.label,
    }));
  }
  return [
    { value: '38', label: 'Universities' },
    { value: '24–48h', label: 'Review window' },
    { value: '10', label: 'Workspace tools' },
    { value: '1', label: 'Verified community' },
  ];
});

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
