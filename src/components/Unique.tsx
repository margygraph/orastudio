import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { classes, instructors, timetable, testimonials, type ClassType } from '../data/studio';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. MODALITÀ "ORA DEL GIORNO"
// ═══════════════════════════════════════════════════════════════════════════════
export type TimeOfDay = 'dawn' | 'day' | 'evening' | 'night';

export function useTimeOfDay(): TimeOfDay {
  const [time, setTime] = useState<TimeOfDay>('day');

  useEffect(() => {
    const update = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 11) setTime('dawn');
      else if (hour >= 11 && hour < 17) setTime('day');
      else if (hour >= 17 && hour < 22) setTime('evening');
      else setTime('night');
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const palettes: Record<TimeOfDay, Record<string, string>> = {
      dawn: {
        '--bg': '#F5F5F5',
        '--fg': '#0A0A0A',
        '--accent': '#FF4D4D',
        '--secondary': '#00D9FF',
        '--tertiary': '#FFE500',
        '--surface': '#FFFFFF',
        '--muted': '#666666',
      },
      day: {
        '--bg': '#F5F5F5',
        '--fg': '#0A0A0A',
        '--accent': '#FF4D4D',
        '--secondary': '#00D9FF',
        '--tertiary': '#FFE500',
        '--surface': '#FFFFFF',
        '--muted': '#666666',
      },
      evening: {
        '--bg': '#0A0A0A',
        '--fg': '#F5F5F5',
        '--accent': '#FF4D4D',
        '--secondary': '#00D9FF',
        '--tertiary': '#FFE500',
        '--surface': '#1A1A1A',
        '--muted': '#999999',
      },
      night: {
        '--bg': '#0A0A0A',
        '--fg': '#F5F5F5',
        '--accent': '#FF4D4D',
        '--secondary': '#00D9FF',
        '--tertiary': '#FFE500',
        '--surface': '#1A1A1A',
        '--muted': '#999999',
      },
    };
    const palette = palettes[time];
    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.setAttribute('data-time', time);
  }, [time]);

  return time;
}

export function TimeIndicator({ time }: { time: TimeOfDay }) {
  const getTimeLabel = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getGradient = () => {
    switch (time) {
      case 'dawn': return 'from-orange-400 via-pink-400 to-purple-400';
      case 'day': return 'from-yellow-400 via-orange-400 to-red-400';
      case 'evening': return 'from-purple-500 via-pink-500 to-orange-400';
      case 'night': return 'from-blue-600 via-purple-600 to-indigo-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-5 md:right-8 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-black/5 shadow-lg"
      aria-label={`Current time: ${getTimeLabel()}`}
    >
      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getGradient()} animate-pulse`} />
      <span className="text-xs font-bold text-[var(--fg)] tabular-nums">{getTimeLabel()}</span>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. SEZIONE "IL TUO PRIMO RESPIRO"
// ═══════════════════════════════════════════════════════════════════════════════
export function BreathingCircle() {
  const [active, setActive] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');

  useEffect(() => {
    if (!active) {
      setPhase('idle');
      setCycle(0);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    let currentCycle = 0;

    const runCycle = () => {
      if (currentCycle >= 3) {
        setActive(false);
        return;
      }

      setPhase('inhale');
      timeout = setTimeout(() => {
        setPhase('hold');
        timeout = setTimeout(() => {
          setPhase('exhale');
          timeout = setTimeout(() => {
            currentCycle++;
            setCycle(currentCycle);
            runCycle();
          }, 4000);
        }, 2000);
      }, 4000);
    };

    runCycle();
    return () => clearTimeout(timeout);
  }, [active]);

  const getScale = () => {
    if (phase === 'inhale') return 1.4;
    if (phase === 'hold') return 1.4;
    if (phase === 'exhale') return 1;
    return 1;
  };

  const getLabel = () => {
    if (phase === 'inhale') return 'Breathe in';
    if (phase === 'hold') return 'Hold';
    if (phase === 'exhale') return 'Breathe out';
    return 'Begin';
  };

  return (
    <section className="section-padding relative overflow-hidden bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-6 font-medium"
        >
          Your first breath
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-display-md text-[var(--fg)] mb-12"
        >
          Before you book, take a moment.
        </motion.h2>

        <div className="relative flex items-center justify-center h-80 md:h-96">
          {/* Outer rings */}
          <motion.div
            animate={{ scale: getScale(), opacity: active ? 0.3 : 0.1 }}
            transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 4 : 0.5, ease: 'easeInOut' }}
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-[var(--accent)]"
          />
          <motion.div
            animate={{ scale: getScale() * 0.85, opacity: active ? 0.5 : 0.15 }}
            transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 4 : 0.5, ease: 'easeInOut' }}
            className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full border border-[var(--accent)]"
          />

          {/* Core circle */}
          <motion.div
            animate={{ scale: getScale() }}
            transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 4 : 0.5, ease: 'easeInOut' }}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-[var(--accent)]/10 border-2 border-[var(--accent)] flex items-center justify-center"
          >
            <span className="font-display text-lg md:text-xl text-[var(--fg)]">
              {getLabel()}
            </span>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!active ? (
            <motion.button
              key="start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => setActive(true)}
              className="magnetic-btn mt-8 px-8 py-3.5 bg-[var(--accent)] text-white rounded-full text-sm font-medium"
            >
              Start breathing exercise
            </motion.button>
          ) : cycle >= 3 ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <p className="font-display text-xl text-[var(--fg)] mb-4">
                This is what happens in 50 minutes with us.
              </p>
              <a
                href="#booking"
                className="magnetic-btn inline-flex px-8 py-3.5 bg-[var(--accent)] text-white rounded-full text-sm font-medium"
              >
                Book your first class
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex items-center justify-center gap-2"
            >
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < cycle ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]/20'
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-[var(--muted)]">
                {cycle + 1} of 3
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. BUSSOLA DI NAVIGAZIONE
// ═══════════════════════════════════════════════════════════════════════════════
export function CompassNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const sections = [
    { id: 'classes', label: 'Classes', angle: 0 },
    { id: 'timetable', label: 'Timetable', angle: 60 },
    { id: 'memberships', label: 'Pricing', angle: 120 },
    { id: 'studio', label: 'Studio', angle: 180 },
    { id: 'contact', label: 'Contact', angle: 240 },
    { id: 'faq', label: 'FAQ', angle: 300 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50 hidden md:block">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 left-0 w-48 p-4 rounded-2xl bg-[var(--surface)] border border-black/10 shadow-xl backdrop-blur-md"
          >
            <nav className="space-y-1">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === id
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium'
                      : 'text-[var(--fg)]/70 hover:text-[var(--fg)]'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full bg-[var(--surface)] border border-black/10 shadow-lg backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Navigation compass"
        aria-expanded={open}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ rotate: rotation }}
        >
          <circle cx="12" cy="12" r="10" stroke="var(--fg)" strokeWidth="1" opacity="0.3" />
          <path d="M12 2 L14 10 L12 8 L10 10 Z" fill="var(--accent)" />
          <path d="M12 22 L14 14 L12 16 L10 14 Z" fill="var(--fg)" opacity="0.3" />
          <circle cx="12" cy="12" r="1.5" fill="var(--accent)" />
        </motion.svg>
      </motion.button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. TIMETABLE "LIVE"
// ═══════════════════════════════════════════════════════════════════════════════
export function LiveTimetable() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = dayNames[now.getDay()];
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const todaySlots = timetable
    .filter(s => s.day === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  const getCurrentClass = () => {
    return todaySlots.find(slot => {
      const cls = classes.find(c => c.id === slot.classId)!;
      const [startH, startM] = slot.time.split(':').map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = startMinutes + cls.duration;
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      return nowMinutes >= startMinutes && nowMinutes < endMinutes;
    });
  };

  const currentClass = getCurrentClass();

  return (
    <section id="timetable-live" className="section-padding bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-6 font-medium">
            Live schedule
          </p>
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="font-display text-display-lg text-[var(--fg)]">Today at Ora</h2>
            <span className="text-sm text-[var(--muted)]">{today}, {currentTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs text-[var(--muted)]">
              {currentClass ? 'A class is happening now' : 'Studio is open'}
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-[var(--fg)]/10" />

          <div className="space-y-4">
            {todaySlots.map((slot, i) => {
              const cls = classes.find(c => c.id === slot.classId)!;
              const inst = instructors.find(ins => ins.id === slot.instructorId)!;
              const isCurrent = currentClass?.id === slot.id;
              const isPast = slot.time < currentTime && !isCurrent;
              const spotsLeft = slot.capacity - slot.booked;

              return (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative pl-12 md:pl-20 py-4 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-[var(--accent)]/10 border border-[var(--accent)]/30'
                      : isPast
                      ? 'opacity-40'
                      : 'hover:bg-[var(--fg)]/5'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full border-2 ${
                    isCurrent
                      ? 'bg-[var(--accent)] border-[var(--accent)]'
                      : isPast
                      ? 'bg-[var(--fg)]/20 border-[var(--fg)]/20'
                      : 'bg-[var(--surface)] border-[var(--fg)]/30'
                  }`} />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-semibold text-[var(--fg)] tabular-nums">{slot.time}</span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 bg-[var(--accent)] text-white text-[10px] font-medium rounded-full uppercase tracking-wider">
                            Live now
                          </span>
                        )}
                      </div>
                      <p className="text-base font-medium text-[var(--fg)]">{cls.name}</p>
                      <p className="text-sm text-[var(--muted)]">{inst.name} · {cls.duration} min</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs ${spotsLeft === 0 ? 'text-[var(--muted)]' : 'text-[var(--accent)]'}`}>
                        {spotsLeft === 0 ? 'Full' : `${spotsLeft} spots left`}
                      </span>
                      {!isPast && spotsLeft > 0 && (
                        <a
                          href="#booking"
                          className="magnetic-btn px-4 py-2 bg-[var(--accent)] text-white text-xs font-medium rounded-full"
                        >
                          Book
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. TESTIMONIANZE "A MANO" (TYPEWRITER)
// ═══════════════════════════════════════════════════════════════════════════════
export function TypewriterTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const testimonial = testimonials[activeIndex];
    if (!testimonial) return;

    setIsTyping(true);
    setDisplayedText('');
    let i = 0;

    const interval = setInterval(() => {
      if (i < testimonial.text.length) {
        setDisplayedText(testimonial.text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    if (isTyping) return;
    const timeout = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isTyping]);

  const testimonial = testimonials[activeIndex];

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-6 font-medium text-center"
        >
          Words from our members
        </motion.p>

        <div className="relative min-h-[300px] flex flex-col items-center justify-center">
          {/* Letter paper effect */}
          <div className="relative w-full max-w-2xl p-8 md:p-12 rounded-2xl bg-[var(--surface)] border border-black/5">
            {/* Decorative lines */}
            <div className="absolute inset-8 md:inset-12 pointer-events-none opacity-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-px bg-[var(--fg)] mb-8" />
              ))}
            </div>

            <div className="relative">
              <p className="font-display text-xl md:text-2xl text-[var(--fg)] leading-relaxed italic min-h-[150px]">
                "{displayedText}"
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-6 bg-[var(--accent)] ml-1 align-middle"
                  />
                )}
              </p>

              {!isTyping && (
                <motion.footer
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-4 border-t border-black/5"
                >
                  <p className="text-sm font-medium text-[var(--fg)]">{testimonial.author}</p>
                  <p className="text-xs text-[var(--muted)]">{testimonial.role}</p>
                </motion.footer>
              )}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeIndex ? 'bg-[var(--accent)] w-6' : 'bg-[var(--fg)]/20'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. FOOTER "ORA ESATTA A MILANO"
// ═══════════════════════════════════════════════════════════════════════════════
export function MilanTimeFooter() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const milanTime = now.toLocaleTimeString('it-IT', {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const hour = parseInt(milanTime.split(':')[0]);
  const isOpen = (hour >= 7 && hour < 21) || (hour === 21 && now.getMinutes() === 0);

  const getStatus = () => {
    if (hour >= 7 && hour < 21) {
      return { text: 'Open now', subtext: 'Closes at 21:00', color: 'text-green-500' };
    }
    if (hour >= 21 || hour < 7) {
      return { text: 'Closed', subtext: 'Opens tomorrow at 07:00', color: 'text-[var(--muted)]' };
    }
    return { text: 'Open now', subtext: 'Closes at 21:00', color: 'text-green-500' };
  };

  const status = getStatus();

  return (
    <footer className="border-t border-black/5 py-12 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Time section */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-2">Milano</p>
              <p className="font-display text-3xl font-light text-[var(--fg)] tabular-nums">
                {milanTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${status.color.includes('green') ? 'bg-green-500' : 'bg-[var(--muted)]'}`} />
              <div>
                <p className={`text-sm font-medium ${status.color}`}>{status.text}</p>
                <p className="text-xs text-[var(--muted)]">{status.subtext}</p>
              </div>
            </div>
          </div>

          {/* Studio info */}
          <div>
            <p className="font-display text-lg font-semibold text-[var(--fg)] mb-2">Ora Studio</p>
            <p className="text-sm text-[var(--muted)]">
              Pilates, Yoga & Strength<br />
              Via San Damiano 5<br />
              20122 Milan, Italy
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-medium text-[var(--fg)] mb-3">Quick links</p>
            <nav className="space-y-2">
              <a href="#classes" className="block text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">Classes</a>
              <a href="#timetable" className="block text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">Timetable</a>
              <a href="#memberships" className="block text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">Memberships</a>
              <a href="#faq" className="block text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">FAQ</a>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-medium text-[var(--fg)] mb-3">Legal</p>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">Privacy Policy</a>
              <a href="#" className="block text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">Cookie Policy</a>
              <a href="#" className="block text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors">Terms & Conditions</a>
            </nav>
          </div>
        </div>

        <div className="border-t border-black/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Ora Studio S.r.l. — P.IVA 12345678901 — REA MI-0000000
          </p>
          <p className="text-xs text-[var(--muted)]">
            Designed with care in Milan
          </p>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BONUS: QUIZ "TROVA LA TUA CLASSE"
// ═══════════════════════════════════════════════════════════════════════════════
export function ClassQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<ClassType | null>(null);

  const questions = [
    {
      question: "What's your main goal?",
      options: [
        { label: 'Build strength', value: 'strength' },
        { label: 'Find flexibility', value: 'flexibility' },
        { label: 'Reduce stress', value: 'calm' },
        { label: 'Improve posture', value: 'posture' },
      ],
    },
    {
      question: 'How would you describe your energy today?',
      options: [
        { label: 'High — I want to move', value: 'high' },
        { label: 'Medium — steady pace', value: 'medium' },
        { label: 'Low — I need to restore', value: 'low' },
      ],
    },
    {
      question: 'What matters most to you?',
      options: [
        { label: 'Precision and technique', value: 'precision' },
        { label: 'Flow and rhythm', value: 'flow' },
        { label: 'Stillness and depth', value: 'stillness' },
      ],
    },
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Determine result
      const scores: Record<string, number> = {
        reformer: 0,
        mat: 0,
        vinyasa: 0,
        yin: 0,
        strength: 0,
      };

      if (newAnswers.includes('strength')) scores.strength += 2;
      if (newAnswers.includes('posture')) scores.reformer += 2;
      if (newAnswers.includes('flexibility')) scores.mat += 1;
      if (newAnswers.includes('calm')) scores.yin += 2;
      if (newAnswers.includes('high')) scores.vinyasa += 2;
      if (newAnswers.includes('medium')) scores.mat += 1;
      if (newAnswers.includes('low')) scores.yin += 2;
      if (newAnswers.includes('precision')) scores.reformer += 2;
      if (newAnswers.includes('flow')) scores.vinyasa += 2;
      if (newAnswers.includes('stillness')) scores.yin += 2;

      const bestMatch = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      const matchedClass = classes.find(c => c.id === bestMatch) || classes[0];
      setResult(matchedClass);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section className="section-padding bg-[var(--surface)]">
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-6 font-medium">
            Not sure where to start?
          </p>
          <h2 className="font-display text-display-md text-[var(--fg)]">
            Find your perfect class
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="text-sm text-[var(--muted)] mb-2">
                Question {step + 1} of {questions.length}
              </p>
              <h3 className="font-display text-xl md:text-2xl text-[var(--fg)] mb-8">
                {questions[step].question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {questions[step].options.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className="p-4 rounded-xl border border-black/10 bg-[var(--bg)] text-[var(--fg)] text-sm font-medium hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all"
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="p-8 rounded-2xl bg-[var(--bg)] border border-[var(--accent)]/30">
                <p className="text-sm text-[var(--muted)] mb-4">We recommend</p>
                <h3 className="font-display text-3xl text-[var(--fg)] mb-4">{result.name}</h3>
                <p className="text-sm text-[var(--muted)] mb-6">{result.description}</p>
                <div className="flex items-center justify-center gap-4 text-xs text-[var(--muted)] mb-6">
                  <span>{result.duration} min</span>
                  <span>·</span>
                  <span>{result.level}</span>
                </div>
                <a
                  href="#booking"
                  className="magnetic-btn inline-flex px-8 py-3.5 bg-[var(--accent)] text-white rounded-full text-sm font-medium"
                >
                  Book this class
                </a>
              </div>
              <button
                onClick={reset}
                className="mt-6 text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              >
                Take the quiz again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
