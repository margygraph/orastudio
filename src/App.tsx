import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  SplitText, ParallaxImage, Counter, Marquee, ScrollProgress,
  CursorGlow, SectionReveal, FadeUp
} from './components/Cinematic';
import { Logo, LogoMark } from './components/Logo';
import {
  useTimeOfDay, TimeIndicator, BreathingCircle, CompassNav,
  LiveTimetable, TypewriterTestimonials, MilanTimeFooter, ClassQuiz
} from './components/Unique';
import {
  classes, instructors, timetable, memberships, testimonials, faqItems,
  type ClassType, type TimetableSlot
} from './data/studio';
import { generateICS, downloadICS, getNextDateForDay, addMinutes } from './utils/calendar';

// ─── HEADER ────────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const nav = [
    { label: 'Classes', href: '#classes' },
    { label: 'Timetable', href: '#timetable' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Studio', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (currentY > 80 && currentY > lastScrollY.current) {
        setHidden(true);
        if (menuOpen) setMenuOpen(false);
      } else if (currentY < lastScrollY.current || currentY <= 80) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? 'bg-ice-white/95 backdrop-blur-xl border-b border-black/10 shadow-sm' : 'bg-transparent'
      }`}
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="inline-flex items-center">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {nav.map(item => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-deep-black hover:text-electric-red transition-colors relative group">
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric-red transition-all group-hover:w-full" />
            </a>
          ))}
          <a
            href="#booking"
            className="magnetic-btn inline-flex items-center px-6 py-3 bg-electric-red text-white text-sm font-bold rounded-full shadow-lg hover:shadow-electric-red/50 hover:scale-105 transition-all"
          >
            Book a free trial
          </a>
        </nav>
        <button
          className="md:hidden p-2 text-deep-black hover:text-electric-red transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ice-white/98 backdrop-blur-xl border-t border-black/10 overflow-hidden"
          >
            <nav className="px-5 py-6 flex flex-col gap-4" aria-label="Mobile navigation">
              {nav.map(item => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-lg font-semibold text-deep-black hover:text-electric-red transition-colors py-2">
                  {item.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="magnetic-btn inline-flex items-center justify-center px-6 py-3 bg-electric-red text-white text-base font-bold rounded-full mt-2 shadow-lg"
              >
                Book a free trial
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 md:pt-0">
      {/* Immagine hero ottimizzata */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/5d4954c1-a7f8-4c60-b8e5-bfc31ffa00bf/_result.png?w=1400&q=75&fm=webp"
          alt="Elegant pilates practice"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width="1400"
          height="800"
        />
        {/* Overlay chiaro per coerenza con il resto del sito */}
        <div className="absolute inset-0 bg-gradient-to-r from-ice-white/85 via-ice-white/70 to-ice-white/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ice-white/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full py-12 md:py-0 animate-[fadeInUp_0.8s_ease-out]">
        <div className="max-w-4xl">
          <div className="mb-6 md:mb-8">
            <LogoMark className="w-12 h-12 md:w-16 md:h-16" />
          </div>

          <p
            className="text-sm md:text-base uppercase tracking-[0.3em] text-neon-cyan mb-6 md:mb-8 font-bold animate-[fadeInUp_0.8s_ease-out_0.2s_both]"
            style={{ textShadow: '0 2px 10px rgba(0, 217, 255, 0.3)' }}
          >
            Pilates · Yoga · Strength — Milan
          </p>

          <h1 className="font-display text-display-xl font-bold text-deep-black mb-10 leading-[0.9] animate-[fadeInUp_0.8s_ease-out_0.4s_both]" style={{ textShadow: '0 4px 20px rgba(255, 255, 255, 0.5)' }}>
            Move well.<br />
            <span className="italic text-electric-red">Feel the difference.</span>
          </h1>

          <p
            className="text-xl md:text-2xl text-deep-black/90 max-w-2xl mb-12 leading-relaxed font-medium animate-[fadeInUp_0.8s_ease-out_0.6s_both]"
            style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.8)' }}
          >
            A small, intentional studio in the heart of Milan. Expert instructors, considered equipment, classes that actually fit your life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
            <a href="#booking" className="magnetic-btn inline-flex items-center justify-center px-10 py-5 bg-electric-red text-white font-bold rounded-full text-lg shadow-2xl hover:shadow-electric-red/50 hover:scale-105 transition-all">
              Book a free trial
            </a>
            <a href="#classes" className="inline-flex items-center justify-center px-10 py-5 border-2 border-deep-black text-deep-black font-bold rounded-full text-lg hover:bg-deep-black hover:text-ice-white transition-all">
              Explore classes
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-[fadeIn_1s_ease-out_1.5s_both]">
        <div className="w-1 h-16 bg-gradient-to-b from-transparent via-electric-red to-transparent animate-[bounce_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}

// ─── MANIFESTO ─────────────────────────────────────────────────────────────────
function Manifesto() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionReveal>
          <div className="max-w-5xl">
            <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan mb-8 font-bold">Our philosophy</p>
            <h2 className="font-display text-display-lg text-charcoal leading-[1.1]">
              We believe movement should feel <em className="text-clay">good</em>. Not punishing, not performative. Just honest work in a space designed for focus.
            </h2>
          </div>
        </SectionReveal>
      </div>
      <div className="mt-20 overflow-hidden">
        <Marquee items={['Reformer Pilates', 'Mat Pilates', 'Vinyasa Yoga', 'Yin Yoga', 'Strength & Mobility']} />
      </div>
    </section>
  );
}

// ─── CLASSES ───────────────────────────────────────────────────────────────────
function Classes() {
  return (
    <section id="classes" className="relative overflow-hidden">
      <div className="section-padding pb-8">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan mb-6 font-bold">What we offer</p>
            <SplitText text="Five disciplines. One standard." className="font-display text-display-lg text-charcoal mb-6" />
            <p className="text-body-lg text-charcoal/60 max-w-xl mb-12">
              Every class is taught by a specialist. Small groups. Real attention. No filler.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, i) => (
              <FadeUp key={cls.id} delay={i * 0.08}>
                <ClassCard cls={cls} index={i} />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClassCard({ cls, index }: { cls: ClassType; index: number }) {
  return (
    <motion.div
      className="group relative p-8 md:p-10 rounded-3xl border border-black/5 bg-white/60 backdrop-blur-sm hover:bg-white/90 transition-all duration-500 min-h-[400px] flex flex-col justify-between"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <div className="flex items-start justify-between mb-6">
          <span className={`inline-block w-3 h-3 rounded-full ${
            cls.color === 'electric-red' ? 'bg-clay' :
            cls.color === 'neon-cyan' ? 'bg-moss' :
            cls.color === 'solar-yellow' ? 'bg-sand-dark' :
            'bg-charcoal'
          }`} />
          <span className="text-xs text-charcoal/40 font-medium">{cls.duration} min</span>
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-light text-charcoal mb-4 leading-tight">
          {cls.name}
        </h3>
        <p className="text-sm text-charcoal/60 leading-relaxed">{cls.description}</p>
      </div>
      <div className="flex items-center gap-4 text-xs text-charcoal/50">
        <span className="px-3 py-1.5 rounded-full bg-bone border border-black/5">{cls.level}</span>
        <span className="flex items-center gap-1.5">
          Intensity
          <span className="flex gap-0.5 ml-1">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= cls.intensity ? 'bg-clay' : 'bg-black/10'}`} />
            ))}
          </span>
        </span>
      </div>
    </motion.div>
  );
}

// ─── TIMETABLE ─────────────────────────────────────────────────────────────────
function Timetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
  const [selectedDay, setSelectedDay] = useState<(typeof days)[number]>('Monday');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredSlots = timetable.filter(slot => {
    const matchDay = slot.day === selectedDay;
    const matchClass = filterClass === 'all' || slot.classId === filterClass;
    const matchLevel = filterLevel === 'all' || classes.find(c => c.id === slot.classId)?.level === filterLevel;
    return matchDay && matchClass && matchLevel;
  });

  return (
    <section id="timetable" className="section-padding bg-white/30">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan mb-6 font-bold">Weekly schedule</p>
          <SplitText text="This week at Ora" className="font-display text-display-lg text-charcoal mb-6" />
          <p className="text-body-lg text-charcoal/60 max-w-xl mb-12">
            Filter by class type or level. Book directly from here.
          </p>
        </SectionReveal>

        <FadeUp delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-8">
            <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="px-4 py-2.5 rounded-full border border-black/10 bg-white text-sm text-charcoal appearance-none cursor-pointer" aria-label="Filter by class type">
              <option value="all">All classes</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} className="px-4 py-2.5 rounded-full border border-black/10 bg-white text-sm text-charcoal appearance-none cursor-pointer" aria-label="Filter by level">
              <option value="all">All levels</option>
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </FadeUp>

        <div className="md:hidden mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5" role="tablist" aria-label="Select day">
            {days.map(day => (
              <button key={day} role="tab" aria-selected={selectedDay === day} onClick={() => setSelectedDay(day)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedDay === day ? 'bg-charcoal text-white' : 'bg-white border border-black/10 text-charcoal/70'}`}>
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <FadeUp delay={0.2}>
          <div className="hidden md:block overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-7 gap-px bg-black/5 rounded-2xl overflow-hidden border border-black/5">
                {days.map(day => (
                  <div key={day} className="bg-bone p-3 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">{day.slice(0, 3)}</span>
                  </div>
                ))}
                {days.map(day => {
                  const daySlots = timetable.filter(s => s.day === day)
                    .filter(s => filterClass === 'all' || s.classId === filterClass)
                    .filter(s => filterLevel === 'all' || classes.find(c => c.id === s.classId)?.level === filterLevel);
                  return (
                    <div key={day} className="bg-white p-2 min-h-[200px]">
                      {daySlots.map(slot => <TimetableSlotCard key={slot.id} slot={slot} compact />)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="md:hidden space-y-3">
          {filteredSlots.length === 0 ? (
            <p className="text-center text-charcoal/50 py-8">No classes match your filters.</p>
          ) : (
            filteredSlots.map(slot => <TimetableSlotCard key={slot.id} slot={slot} compact={false} />)
          )}
        </div>
      </div>
    </section>
  );
}

function TimetableSlotCard({ slot, compact }: { slot: TimetableSlot; compact: boolean }) {
  const cls = classes.find(c => c.id === slot.classId)!;
  const instructor = instructors.find(i => i.id === slot.instructorId)!;
  const spotsLeft = slot.capacity - slot.booked;
  const isFull = spotsLeft === 0;

  if (compact) {
    return (
      <div className={`p-2 rounded-lg mb-2 text-xs ${isFull ? 'bg-black/5 opacity-60' : 'bg-bone/50'}`}>
        <p className="font-semibold text-charcoal">{slot.time}</p>
        <p className="text-charcoal/70 truncate">{cls.shortName}</p>
        <p className="text-charcoal/50 truncate">{instructor.name.split(' ')[0]}</p>
        {!isFull && <p className="text-clay text-[10px] mt-0.5">{spotsLeft} left</p>}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${isFull ? 'border-black/5 bg-black/[0.02]' : 'border-black/5 bg-white hover:border-clay/20'} transition-colors`}>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-sm font-semibold text-charcoal">{slot.time}</span>
          <span className="text-sm text-charcoal font-medium">{cls.name}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-charcoal/50">
          <span>{instructor.name}</span>
          <span>·</span>
          <span>{cls.duration} min</span>
          <span>·</span>
          <span className={isFull ? 'text-charcoal/40' : 'text-clay'}>
            {isFull ? 'Full' : `${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} left`}
          </span>
        </div>
      </div>
      <a href="#booking" className={`ml-4 flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${isFull ? 'bg-black/5 text-charcoal/40 cursor-not-allowed' : 'bg-clay text-white hover:bg-clay-light'}`} aria-disabled={isFull} tabIndex={isFull ? -1 : 0}>
        {isFull ? 'Full' : 'Book'}
      </a>
    </div>
  );
}

// ─── BOOKING MODAL ─────────────────────────────────────────────────────────────
function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<TimetableSlot | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => { if (validate()) setStep(3); };

  const handleDownloadICS = () => {
    if (!selectedSlot) return;
    const cls = classes.find(c => c.id === selectedSlot.classId)!;
    const date = getNextDateForDay(selectedSlot.day);
    const endTime = addMinutes(selectedSlot.time, cls.duration);
    const ics = generateICS(`Ora Studio: ${cls.name}`, date, selectedSlot.time, endTime, 'Ora Studio, Via San Damiano 5, Milan', `Instructor: ${instructors.find(i => i.id === selectedSlot.instructorId)?.name}`);
    downloadICS(`ora-studio-${cls.shortName.toLowerCase()}.ics`, ics);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedSlot(null);
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
    onClose();
  };

  const availableSlots = timetable.filter(s => s.capacity - s.booked > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4" onClick={handleClose}>
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" />
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.3 }} className="relative bg-bone w-full md:max-w-lg md:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Book a class">
            <div className="sticky top-0 bg-bone border-b border-black/5 p-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-medium">
                {step === 1 ? 'Choose a class' : step === 2 ? 'Your details' : 'You\'re booked'}
              </h3>
              <button onClick={handleClose} className="p-2 text-charcoal/60 hover:text-charcoal" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M6 18L18 6" /></svg>
              </button>
            </div>

            <div className="p-5">
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map(s => <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-clay' : 'bg-black/10'}`} />)}
              </div>

              {step === 1 && (
                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {availableSlots.slice(0, 15).map(slot => {
                    const cls = classes.find(c => c.id === slot.classId)!;
                    const inst = instructors.find(i => i.id === slot.instructorId)!;
                    const spotsLeft = slot.capacity - slot.booked;
                    return (
                      <button key={slot.id} onClick={() => { setSelectedSlot(slot); setStep(2); }} className={`w-full text-left p-4 rounded-xl border transition-colors ${selectedSlot?.id === slot.id ? 'border-clay bg-clay/5' : 'border-black/5 hover:border-clay/30'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-charcoal">{cls.name}</p>
                            <p className="text-sm text-charcoal/60">{slot.day} · {slot.time} · {inst.name}</p>
                          </div>
                          <span className="text-xs text-clay">{spotsLeft} left</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {selectedSlot && (
                    <div className="p-3 rounded-lg bg-white border border-black/5 mb-4">
                      <p className="text-sm font-medium text-charcoal">
                        {classes.find(c => c.id === selectedSlot.classId)?.name} — {selectedSlot.day} {selectedSlot.time}
                      </p>
                    </div>
                  )}
                  <div>
                    <label htmlFor="booking-name" className="block text-sm font-medium text-charcoal mb-1.5">Full name</label>
                    <input id="booking-name" type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-charcoal text-sm focus:border-clay focus:ring-0 outline-none transition-colors" placeholder="Your name" />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
                    <input id="booking-email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-charcoal text-sm focus:border-clay focus:ring-0 outline-none transition-colors" placeholder="you@email.com" />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className="block text-sm font-medium text-charcoal mb-1.5">Phone</label>
                    <input id="booking-phone" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-charcoal text-sm focus:border-clay focus:ring-0 outline-none transition-colors" placeholder="+39 ..." />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                  <button onClick={handleSubmit} className="magnetic-btn w-full py-3.5 bg-clay text-white font-medium rounded-full text-sm mt-4">Confirm booking</button>
                  <button onClick={() => setStep(1)} className="w-full py-2 text-sm text-charcoal/50 hover:text-charcoal">← Back</button>
                </div>
              )}

              {step === 3 && selectedSlot && (
                <div className="text-center py-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-16 h-16 mx-auto mb-4 rounded-full bg-moss/10 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3F4A3C" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                  </motion.div>
                  <h4 className="font-display text-xl font-medium text-charcoal mb-2">See you there</h4>
                  <p className="text-sm text-charcoal/60 mb-6">
                    {classes.find(c => c.id === selectedSlot.classId)?.name} with {instructors.find(i => i.id === selectedSlot.instructorId)?.name}<br />
                    {selectedSlot.day} at {selectedSlot.time}
                  </p>
                  <button onClick={handleDownloadICS} className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 border border-charcoal/20 rounded-full text-sm font-medium text-charcoal hover:border-charcoal/40 transition-colors mb-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    Add to calendar
                  </button>
                  <p className="text-xs text-charcoal/40 mt-4">Confirmation sent to {formData.email}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── MEMBERSHIPS ───────────────────────────────────────────────────────────────
function Memberships() {
  return (
    <section id="memberships" className="section-padding">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan mb-6 font-bold">Pricing</p>
          <SplitText text="Simple, transparent pricing" className="font-display text-display-lg text-charcoal mb-6" />
          <p className="text-body-lg text-charcoal/60 max-w-xl mb-12">No contracts. No hidden fees. Start with a free trial.</p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {memberships.map((mem, i) => (
            <FadeUp key={mem.id} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8 }} className={`relative p-6 rounded-2xl border h-full flex flex-col ${mem.highlighted ? 'border-clay bg-clay/5' : 'border-black/5 bg-white/50'}`}>
                {mem.highlighted && <span className="absolute -top-3 left-6 px-3 py-1 bg-clay text-white text-xs font-medium rounded-full">Start here</span>}
                <h3 className="font-display text-lg font-medium text-charcoal mb-1">{mem.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-display text-3xl font-semibold text-charcoal">{mem.price === 0 ? 'Free' : `€${mem.price}`}</span>
                  {mem.price > 0 && <span className="text-xs text-charcoal/50">/{mem.period}</span>}
                </div>
                <p className="text-sm text-charcoal/60 mb-6">{mem.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {mem.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-charcoal/70">
                      <svg className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={mem.isTrial ? '#booking' : '#contact'} className={`magnetic-btn block text-center py-3 rounded-full text-sm font-medium transition-colors ${mem.highlighted ? 'bg-clay text-white hover:bg-clay-light' : 'border border-charcoal/20 text-charcoal hover:border-charcoal/40'}`}>
                  {mem.isTrial ? 'Book free trial' : mem.price === 0 ? 'Get started' : 'Choose plan'}
                </a>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INSTRUCTORS ───────────────────────────────────────────────────────────────
function Instructors() {
  return (
    <section id="instructors" className="section-padding bg-white/30">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan mb-6 font-bold">Our team</p>
          <SplitText text="Five specialists. Each one invested in your progress." className="font-display text-display-lg text-charcoal mb-12" />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((inst, i) => (
            <FadeUp key={inst.id} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} className="group">
                <div className="aspect-[3/4] rounded-2xl mb-4 overflow-hidden relative">
                  <motion.img src={inst.image} alt={`Portrait of ${inst.name}, ${inst.specialties.join(' and ')} instructor at Ora Studio`} className="w-full h-full object-cover" loading="lazy" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <h3 className="font-display text-lg font-medium text-charcoal">{inst.name}</h3>
                <p className="text-xs text-clay mb-2">{inst.specialties.join(' · ')}</p>
                <p className="text-sm text-charcoal/60 leading-relaxed">{inst.bio}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STUDIO ────────────────────────────────────────────────────────────────────
function Studio() {
  return (
    <section id="studio" className="section-padding">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan mb-6 font-bold">The space</p>
          <SplitText text="Designed for focus." className="font-display text-display-lg text-charcoal mb-6" />
          <p className="text-body-lg text-charcoal/60 max-w-xl mb-12">280 square metres in Porta Venezia. Natural materials, considered lighting, and the right equipment for each discipline.</p>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          <FadeUp delay={0}>
            <ParallaxImage src="https://image.qwenlm.ai/generated-images/69af45d4-5289-4a5c-bc43-9a94274f676c/_result.png?w=800&q=75&fm=webp" alt="Woman practicing warrior pose in bright studio" className="aspect-square md:col-span-2 md:row-span-2 rounded-xl" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <ParallaxImage src="https://image.qwenlm.ai/generated-images/9f147f37-10b7-47fd-ab30-95c03f657f8d/_result.png?w=800&q=75&fm=webp" alt="Elegant downward dog yoga pose" className="aspect-square rounded-xl" />
          </FadeUp>
          <FadeUp delay={0.2}>
            <ParallaxImage src="https://image.qwenlm.ai/generated-images/5c8769f9-4816-4e71-bf8f-22f9cd727c38/_result.png?w=800&q=75&fm=webp" alt="Pilates reformer session" className="aspect-square rounded-xl" />
          </FadeUp>
          <FadeUp delay={0.3}>
            <ParallaxImage src="https://image.qwenlm.ai/generated-images/28c919b1-15be-49d7-a807-b431c81bb2d1/_result.png?w=800&q=75&fm=webp" alt="Serene tree pose yoga" className="aspect-square rounded-xl" />
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <SectionReveal>
            <div>
              <h3 className="font-display text-xl font-medium text-charcoal mb-4">What to bring</h3>
              <ul className="space-y-3 text-sm text-charcoal/70">
                {['Comfortable clothing that allows full range of movement', 'Grip socks for reformer classes (available at reception)', 'Water bottle — refill station in the studio', 'We provide mats, towels, and all equipment'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
          <SectionReveal>
            <div>
              <h3 className="font-display text-xl font-medium text-charcoal mb-4">First visit</h3>
              <ol className="space-y-3 text-sm text-charcoal/70">
                {['Arrive 10 minutes early', "We'll show you the studio and introduce your instructor", "Mention any injuries or limitations — we'll adapt", 'Class. Then tea or water in our rest area.'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-neon-cyan/20 text-neon-cyan text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF ──────────────────────────────────────────────────────────────
function SocialProof() {
  return (
    <section className="section-padding bg-deep-black text-ice-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <SectionReveal>
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-20">
            <Counter value="1,200+" label="Classes taught in 2024" />
            <Counter value="4.9" label="Average rating" />
            <Counter value="92%" label="Members who stay past 6 months" />
          </div>
        </SectionReveal>

        <FadeUp delay={0.3}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-ice-white/60">
            <span>Balanced Body Certified</span>
            <span className="text-neon-cyan">·</span>
            <span>Yoga Alliance Registered</span>
            <span className="text-neon-cyan">·</span>
            <span>CONI Affiliated</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan mb-6 font-bold">Questions</p>
          <SplitText text="Common questions" className="font-display text-display-lg text-deep-black mb-12" />
        </SectionReveal>

        <div className="space-y-0 border-t border-black/10" role="list">
          {faqItems.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-b border-black/10" role="listitem">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left" aria-expanded={openIndex === i} aria-controls={`faq-answer-${i}`}>
                  <span className="text-sm md:text-base font-medium text-charcoal pr-4">{item.question}</span>
                  <svg className={`w-5 h-5 flex-shrink-0 text-charcoal/40 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div id={`faq-answer-${i}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="text-sm text-charcoal/60 leading-relaxed pb-5">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="section-padding bg-white/30">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan mb-6 font-bold">Find us</p>
          <SplitText text="Come say hello." className="font-display text-display-lg text-charcoal mb-12" />
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <SectionReveal>
            <ParallaxImage src="https://image.qwenlm.ai/generated-images/02992ea2-c055-4fc7-ab6f-ca405182f6bd/_result.png" alt="Ora Studio location" className="aspect-[4/3] rounded-2xl mb-8" speed={0.2} />
          </SectionReveal>

          <SectionReveal>
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Address</h3>
                <p className="text-charcoal">Via San Damiano 5<br />20122 Milan, Italy</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Opening hours</h3>
                <div className="text-charcoal space-y-1 text-sm">
                  <p>Monday – Friday: 07:00 – 21:00</p>
                  <p>Saturday: 09:00 – 17:00</p>
                  <p>Sunday: 10:00 – 17:00</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Contact</h3>
                <div className="space-y-1 text-sm">
                  <a href="mailto:hello@orastudio.it" className="block text-charcoal hover:text-clay transition-colors">hello@orastudio.it</a>
                  <a href="https://instagram.com/orastudio" className="block text-charcoal hover:text-clay transition-colors" target="_blank" rel="noopener noreferrer">@orastudio</a>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Getting here</h3>
                <p className="text-sm text-charcoal/70">San Babila metro (M1) — 4 min walk.<br />Street parking available. Garage San Babila nearby.</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

// ─── FLOATING CTA ──────────────────────────────────────────────────────────────
function FloatingCTA({ onBook }: { onBook: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="fixed bottom-6 left-5 right-5 md:left-auto md:right-8 md:bottom-8 z-40 md:w-auto">
          <button onClick={onBook} className="magnetic-btn w-full md:w-auto px-6 py-3.5 bg-clay text-white font-medium rounded-full shadow-lg shadow-clay/20 text-sm">
            Book a free trial
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const timeOfDay = useTimeOfDay();

  const handleHashChange = useCallback(() => {
    if (window.location.hash === '#booking') {
      setBookingOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  return (
    <div className="grain min-h-screen bg-bone text-charcoal relative">
      <ScrollProgress />
      <CursorGlow />
      <TimeIndicator time={timeOfDay} />
      <CompassNav />
      <Header />
      <main>
        <Hero />
        <BreathingCircle />
        <Manifesto />
        <Classes />
        <LiveTimetable />
        <Memberships />
        <Instructors />
        <Studio />
        <SocialProof />
        <TypewriterTestimonials />
        <ClassQuiz />
        <FAQ />
        <Contact />
      </main>
      <MilanTimeFooter />
      <FloatingCTA onBook={() => setBookingOpen(true)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
