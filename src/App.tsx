import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './components/Reveal';
import {
  classes, instructors, timetable, memberships, testimonials, faqItems,
  type ClassType, type TimetableSlot
} from './data/studio';
import { generateICS, downloadICS, getNextDateForDay, addMinutes } from './utils/calendar';

// ─── HEADER ────────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    { label: 'Classes', href: '#classes' },
    { label: 'Timetable', href: '#timetable' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Studio', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bone/90 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-semibold tracking-tight text-charcoal">
          Ora Studio
        </a>
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {nav.map(item => (
            <a key={item.href} href={item.href} className="text-sm text-charcoal/70 hover:text-charcoal transition-colors">
              {item.label}
            </a>
          ))}
          <a
            href="#booking"
            className="magnetic-btn inline-flex items-center px-5 py-2.5 bg-clay text-white text-sm font-medium rounded-full hover:bg-clay-light"
          >
            Book a free trial
          </a>
        </nav>
        <button
          className="md:hidden p-2 text-charcoal"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bone border-t border-black/5 overflow-hidden"
          >
            <nav className="px-5 py-6 flex flex-col gap-4" aria-label="Mobile navigation">
              {nav.map(item => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-base text-charcoal/80 py-2">
                  {item.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="magnetic-btn inline-flex items-center justify-center px-5 py-3 bg-clay text-white text-sm font-medium rounded-full mt-2"
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
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bone via-bone to-sand/30" />
      <div
        className="absolute inset-0 opacity-20 md:opacity-30"
        style={{
          backgroundImage: 'url(https://image.qwenlm.ai/generated-images/0eeb0166-d224-45f1-8a97-7fc4ad5b7fda/_result.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
      />
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10 py-20 md:py-0">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm uppercase tracking-widest text-moss mb-6 font-medium"
          >
            Pilates · Yoga · Strength — Milan
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-display-xl font-light text-charcoal mb-8"
          >
            Move well.<br />
            <span className="italic text-clay">Feel the difference.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-body-lg text-charcoal/70 max-w-xl mb-10"
          >
            A small, intentional studio in the heart of Milan. Expert instructors, 
            considered equipment, classes that actually fit your life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#booking"
              className="magnetic-btn inline-flex items-center justify-center px-8 py-4 bg-clay text-white font-medium rounded-full text-base"
            >
              Book a free trial
            </a>
            <a
              href="#classes"
              className="inline-flex items-center justify-center px-8 py-4 border border-charcoal/20 text-charcoal font-medium rounded-full text-base hover:border-charcoal/40 transition-colors"
            >
              Explore classes
            </a>
          </motion.div>
        </div>
      </div>
      {/* Decorative element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 hidden lg:block opacity-10">
        <div className="w-full h-full bg-gradient-to-bl from-clay/40 to-transparent rounded-full blur-3xl" />
      </div>
    </section>
  );
}

// ─── CLASSES (BENTO GRID) ──────────────────────────────────────────────────────
function Classes() {
  return (
    <section id="classes" className="section-padding">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-moss mb-4 font-medium">What we offer</p>
          <h2 className="font-display text-display-lg text-charcoal mb-4">Five disciplines.<br />One standard.</h2>
          <p className="text-body-lg text-charcoal/60 max-w-xl mb-12">
            Every class is taught by a specialist. Small groups. Real attention. No filler.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls, i) => (
            <Reveal key={cls.id} delay={i * 80}>
              <ClassCard cls={cls} large={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassCard({ cls, large }: { cls: ClassType; large?: boolean }) {
  return (
    <div className={`group relative p-6 md:p-8 rounded-2xl border border-black/5 bg-white/50 hover:bg-white/80 transition-all duration-300 ${large ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <span className={`inline-block w-3 h-3 rounded-full ${
          cls.color === 'clay' ? 'bg-clay' :
          cls.color === 'moss' ? 'bg-moss' :
          cls.color === 'sand' ? 'bg-sand-dark' :
          'bg-charcoal'
        }`} />
        <span className="text-xs text-charcoal/50 font-medium">{cls.duration} min</span>
      </div>
      <h3 className={`font-display ${large ? 'text-display-md' : 'text-xl'} font-medium text-charcoal mb-3`}>
        {cls.name}
      </h3>
      <p className="text-sm text-charcoal/60 leading-relaxed mb-6">{cls.description}</p>
      <div className="flex items-center gap-4 text-xs text-charcoal/50">
        <span className="px-2.5 py-1 rounded-full bg-bone border border-black/5">{cls.level}</span>
        <span className="flex items-center gap-1">
          Intensity
          <span className="flex gap-0.5 ml-1">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= cls.intensity ? 'bg-clay' : 'bg-black/10'}`} />
            ))}
          </span>
        </span>
      </div>
    </div>
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

  const getClassName = (id: string) => classes.find(c => c.id === id)?.name || '';
  const getInstructorName = (id: string) => instructors.find(i => i.id === id)?.name || '';
  const getClassDuration = (id: string) => classes.find(c => c.id === id)?.duration || 50;

  return (
    <section id="timetable" className="section-padding bg-white/30">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-moss mb-4 font-medium">Weekly schedule</p>
          <h2 className="font-display text-display-lg text-charcoal mb-4">This week at Ora</h2>
          <p className="text-body-lg text-charcoal/60 max-w-xl mb-10">
            Filter by class type or level. Book directly from here.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-3 mb-8">
            <select
              value={filterClass}
              onChange={e => setFilterClass(e.target.value)}
              className="px-4 py-2.5 rounded-full border border-black/10 bg-white text-sm text-charcoal appearance-none cursor-pointer"
              aria-label="Filter by class type"
            >
              <option value="all">All classes</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select
              value={filterLevel}
              onChange={e => setFilterLevel(e.target.value)}
              className="px-4 py-2.5 rounded-full border border-black/10 bg-white text-sm text-charcoal appearance-none cursor-pointer"
              aria-label="Filter by level"
            >
              <option value="all">All levels</option>
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </Reveal>

        {/* Mobile: Day selector */}
        <div className="md:hidden mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5" role="tablist" aria-label="Select day">
            {days.map(day => (
              <button
                key={day}
                role="tab"
                aria-selected={selectedDay === day}
                onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDay === day
                    ? 'bg-charcoal text-white'
                    : 'bg-white border border-black/10 text-charcoal/70'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Full week grid */}
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
                    {daySlots.map(slot => (
                      <TimetableSlotCard key={slot.id} slot={slot} compact />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: List view */}
        <div className="md:hidden space-y-3">
          {filteredSlots.length === 0 ? (
            <p className="text-center text-charcoal/50 py-8">No classes match your filters.</p>
          ) : (
            filteredSlots.map(slot => (
              <TimetableSlotCard key={slot.id} slot={slot} compact={false} />
            ))
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
      <a
        href="#booking"
        className={`ml-4 flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
          isFull
            ? 'bg-black/5 text-charcoal/40 cursor-not-allowed'
            : 'bg-clay text-white hover:bg-clay-light'
        }`}
        aria-disabled={isFull}
        tabIndex={isFull ? -1 : 0}
      >
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

  const handleSubmit = () => {
    if (validate()) setStep(3);
  };

  const handleDownloadICS = () => {
    if (!selectedSlot) return;
    const cls = classes.find(c => c.id === selectedSlot.classId)!;
    const date = getNextDateForDay(selectedSlot.day);
    const endTime = addMinutes(selectedSlot.time, cls.duration);
    const ics = generateICS(
      `Ora Studio: ${cls.name}`,
      date,
      selectedSlot.time,
      endTime,
      'Ora Studio, Via San Damiano 5, Milan',
      `Instructor: ${instructors.find(i => i.id === selectedSlot.instructorId)?.name}`
    );
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-bone w-full md:max-w-lg md:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Book a class"
          >
            <div className="sticky top-0 bg-bone border-b border-black/5 p-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-medium">
                {step === 1 ? 'Choose a class' : step === 2 ? 'Your details' : 'You\'re booked'}
              </h3>
              <button onClick={handleClose} className="p-2 text-charcoal/60 hover:text-charcoal" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>

            <div className="p-5">
              {/* Step indicators */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-clay' : 'bg-black/10'}`} />
                ))}
              </div>

              {/* Step 1: Choose class */}
              {step === 1 && (
                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {availableSlots.slice(0, 15).map(slot => {
                    const cls = classes.find(c => c.id === slot.classId)!;
                    const inst = instructors.find(i => i.id === slot.instructorId)!;
                    const spotsLeft = slot.capacity - slot.booked;
                    return (
                      <button
                        key={slot.id}
                        onClick={() => { setSelectedSlot(slot); setStep(2); }}
                        className={`w-full text-left p-4 rounded-xl border transition-colors ${
                          selectedSlot?.id === slot.id ? 'border-clay bg-clay/5' : 'border-black/5 hover:border-clay/30'
                        }`}
                      >
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

              {/* Step 2: Details */}
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
                    <input
                      id="booking-name"
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-charcoal text-sm focus:border-clay focus:ring-0 outline-none transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
                    <input
                      id="booking-email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-charcoal text-sm focus:border-clay focus:ring-0 outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className="block text-sm font-medium text-charcoal mb-1.5">Phone</label>
                    <input
                      id="booking-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-charcoal text-sm focus:border-clay focus:ring-0 outline-none transition-colors"
                      placeholder="+39 ..."
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="magnetic-btn w-full py-3.5 bg-clay text-white font-medium rounded-full text-sm mt-4"
                  >
                    Confirm booking
                  </button>
                  <button onClick={() => setStep(1)} className="w-full py-2 text-sm text-charcoal/50 hover:text-charcoal">
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && selectedSlot && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-moss/10 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3F4A3C" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-display text-xl font-medium text-charcoal mb-2">See you there</h4>
                  <p className="text-sm text-charcoal/60 mb-6">
                    {classes.find(c => c.id === selectedSlot.classId)?.name} with{' '}
                    {instructors.find(i => i.id === selectedSlot.instructorId)?.name}<br />
                    {selectedSlot.day} at {selectedSlot.time}
                  </p>
                  <button
                    onClick={handleDownloadICS}
                    className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 border border-charcoal/20 rounded-full text-sm font-medium text-charcoal hover:border-charcoal/40 transition-colors mb-3"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    Add to calendar
                  </button>
                  <p className="text-xs text-charcoal/40 mt-4">
                    Confirmation sent to {formData.email}
                  </p>
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
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-moss mb-4 font-medium">Pricing</p>
          <h2 className="font-display text-display-lg text-charcoal mb-4">Simple, transparent pricing</h2>
          <p className="text-body-lg text-charcoal/60 max-w-xl mb-12">
            No contracts. No hidden fees. Start with a free trial.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {memberships.map((mem, i) => (
            <Reveal key={mem.id} delay={i * 100}>
              <div className={`relative p-6 rounded-2xl border h-full flex flex-col ${
                mem.highlighted
                  ? 'border-clay bg-clay/5'
                  : 'border-black/5 bg-white/50'
              }`}>
                {mem.highlighted && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-clay text-white text-xs font-medium rounded-full">
                    Start here
                  </span>
                )}
                <h3 className="font-display text-lg font-medium text-charcoal mb-1">{mem.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-display text-3xl font-semibold text-charcoal">
                    {mem.price === 0 ? 'Free' : `€${mem.price}`}
                  </span>
                  {mem.price > 0 && <span className="text-xs text-charcoal/50">/{mem.period}</span>}
                </div>
                <p className="text-sm text-charcoal/60 mb-6">{mem.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {mem.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-charcoal/70">
                      <svg className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={mem.isTrial ? '#booking' : '#contact'}
                  className={`magnetic-btn block text-center py-3 rounded-full text-sm font-medium transition-colors ${
                    mem.highlighted
                      ? 'bg-clay text-white hover:bg-clay-light'
                      : 'border border-charcoal/20 text-charcoal hover:border-charcoal/40'
                  }`}
                >
                  {mem.isTrial ? 'Book free trial' : mem.price === 0 ? 'Get started' : 'Choose plan'}
                </a>
              </div>
            </Reveal>
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
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-moss mb-4 font-medium">Our team</p>
          <h2 className="font-display text-display-lg text-charcoal mb-12">Five specialists.<br />Each one invested in your progress.</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((inst, i) => (
            <Reveal key={inst.id} delay={i * 80}>
              <div className="group">
                <div className="aspect-[3/4] rounded-2xl mb-4 overflow-hidden relative">
                  <img
                    src={inst.image}
                    alt={`Portrait of ${inst.name}, ${inst.specialties.join(' and ')} instructor at Ora Studio`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg font-medium text-charcoal">{inst.name}</h3>
                <p className="text-xs text-clay mb-2">{inst.specialties.join(' · ')}</p>
                <p className="text-sm text-charcoal/60 leading-relaxed">{inst.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STUDIO ────────────────────────────────────────────────────────────────────
function Studio() {
  const galleryItems = [
    { label: 'Reformer room', color: '#B9714F' },
    { label: 'Yoga space', color: '#3F4A3C' },
    { label: 'Equipment detail', color: '#D9CDB8' },
    { label: 'Natural light', color: '#F4EFE6' },
  ];

  return (
    <section id="studio" className="section-padding">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-moss mb-4 font-medium">The space</p>
          <h2 className="font-display text-display-lg text-charcoal mb-4">Designed for focus.</h2>
          <p className="text-body-lg text-charcoal/60 max-w-xl mb-12">
            280 square metres in Porta Venezia. Natural materials, considered lighting, and the right equipment for each discipline.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          <Reveal delay={0}>
            <div
              className="aspect-square md:col-span-2 md:row-span-2 rounded-xl flex items-end p-4 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://image.qwenlm.ai/generated-images/02992ea2-c055-4fc7-ab6f-ca405182f6bd/_result.png)' }}
            >
              <span className="text-xs font-medium text-charcoal/70 bg-white/60 px-2 py-1 rounded-full backdrop-blur-sm">
                The studio
              </span>
            </div>
          </Reveal>
          {galleryItems.slice(1).map((item, i) => (
            <Reveal key={item.label} delay={(i + 1) * 80}>
              <div
                className="aspect-square rounded-xl flex items-end p-4"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-xs font-medium text-charcoal/70 bg-white/60 px-2 py-1 rounded-full backdrop-blur-sm">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <Reveal>
            <div>
              <h3 className="font-display text-xl font-medium text-charcoal mb-4">What to bring</h3>
              <ul className="space-y-3 text-sm text-charcoal/70">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2 flex-shrink-0" />
                  Comfortable clothing that allows full range of movement
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2 flex-shrink-0" />
                  Grip socks for reformer classes (available at reception)
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2 flex-shrink-0" />
                  Water bottle — refill station in the studio
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2 flex-shrink-0" />
                  We provide mats, towels, and all equipment
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <h3 className="font-display text-xl font-medium text-charcoal mb-4">First visit</h3>
              <ol className="space-y-3 text-sm text-charcoal/70">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-moss/10 text-moss text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  Arrive 10 minutes early
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-moss/10 text-moss text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  We'll show you the studio and introduce your instructor
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-moss/10 text-moss text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  Mention any injuries or limitations — we'll adapt
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-moss/10 text-moss text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  Class. Then tea or water in our rest area.
                </li>
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF ──────────────────────────────────────────────────────────────
function SocialProof() {
  const stats = [
    { value: '1,200+', label: 'Classes taught in 2024' },
    { value: '4.9', label: 'Average rating' },
    { value: '92%', label: 'Members who stay past 6 months' },
  ];

  return (
    <section className="section-padding bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl md:text-4xl font-light text-bone mb-1">{stat.value}</p>
                <p className="text-xs md:text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 100}>
              <blockquote className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm text-white/80 leading-relaxed mb-4">"{t.text}"</p>
                <footer>
                  <p className="text-sm font-medium text-bone">{t.author}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30">
            <span> Balanced Body Certified</span>
            <span>·</span>
            <span>Yoga Alliance Registered</span>
            <span>·</span>
            <span>CONI Affiliated</span>
          </div>
        </Reveal>
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
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-moss mb-4 font-medium">Questions</p>
          <h2 className="font-display text-display-lg text-charcoal mb-12">Common questions</h2>
        </Reveal>

        <div className="space-y-0 border-t border-black/10" role="list">
          {faqItems.map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="border-b border-black/10" role="listitem">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-sm md:text-base font-medium text-charcoal pr-4">{item.question}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-charcoal/40 transition-transform duration-200 ${openIndex === i ? 'rotate-45' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'}`}
                >
                  <p className="text-sm text-charcoal/60 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </Reveal>
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
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-moss mb-4 font-medium">Find us</p>
          <h2 className="font-display text-display-lg text-charcoal mb-12">Come say hello.</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <Reveal>
            {/* Map placeholder */}
            <div className="aspect-[4/3] rounded-2xl bg-sand/50 border border-black/5 flex items-center justify-center mb-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 40%, #B9714F20 0%, transparent 50%), radial-gradient(circle at 70% 60%, #3F4A3C15 0%, transparent 40%)'
                }} />
              </div>
              <div className="text-center relative z-10">
                <svg className="w-8 h-8 mx-auto mb-2 text-clay" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <p className="text-sm text-charcoal/60">Porta Venezia, Milan</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Address</h3>
                <p className="text-charcoal">Via San Damiano 5<br />20122 Milan, Italy</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Opening hours</h3>
                <div className="text-charcoal space-y-1 text-sm">
                  <p>Monday – Friday: 07:00 – 21:00</p>
                  <p>Saturday: 09:00 – 17:00</p>
                  <p>Sunday: 10:00 – 17:00</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Contact</h3>
                <div className="space-y-1 text-sm">
                  <a href="mailto:hello@orastudio.it" className="block text-charcoal hover:text-clay transition-colors">hello@orastudio.it</a>
                  <a href="https://instagram.com/orastudio" className="block text-charcoal hover:text-clay transition-colors" target="_blank" rel="noopener noreferrer">@orastudio</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Getting here</h3>
                <p className="text-sm text-charcoal/70">
                  San Babila metro (M1) — 4 min walk.<br />
                  Street parking available. Garage San Babila nearby.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-black/5 py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <p className="font-display text-lg font-semibold text-charcoal mb-2">Ora Studio</p>
            <p className="text-sm text-charcoal/50">Pilates, Yoga & Strength<br />Via San Damiano 5, Milan</p>
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal mb-3">Quick links</p>
            <nav className="space-y-2">
              <a href="#classes" className="block text-sm text-charcoal/50 hover:text-charcoal transition-colors">Classes</a>
              <a href="#timetable" className="block text-sm text-charcoal/50 hover:text-charcoal transition-colors">Timetable</a>
              <a href="#memberships" className="block text-sm text-charcoal/50 hover:text-charcoal transition-colors">Memberships</a>
              <a href="#faq" className="block text-sm text-charcoal/50 hover:text-charcoal transition-colors">FAQ</a>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal mb-3">Legal</p>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-charcoal/50 hover:text-charcoal transition-colors">Privacy Policy</a>
              <a href="#" className="block text-sm text-charcoal/50 hover:text-charcoal transition-colors">Cookie Policy</a>
              <a href="#" className="block text-sm text-charcoal/50 hover:text-charcoal transition-colors">Terms & Conditions</a>
            </nav>
          </div>
        </div>
        <div className="border-t border-black/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal/40">
            © {new Date().getFullYear()} Ora Studio S.r.l. — P.IVA 12345678901 — REA MI-0000000
          </p>
          <p className="text-xs text-charcoal/40">
            Designed with care in Milan
          </p>
        </div>
      </div>
    </footer>
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

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-5 right-5 md:left-auto md:right-8 md:bottom-8 z-40 md:w-auto">
      <button
        onClick={onBook}
        className="magnetic-btn w-full md:w-auto px-6 py-3.5 bg-clay text-white font-medium rounded-full shadow-lg shadow-clay/20 text-sm"
      >
        Book a free trial
      </button>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  // Handle hash-based booking trigger
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
    <div className="grain min-h-screen bg-bone text-charcoal">
      <Header />
      <main>
        <Hero />
        <Classes />
        <Timetable />
        <Memberships />
        <Instructors />
        <Studio />
        <SocialProof />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA onBook={() => setBookingOpen(true)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
