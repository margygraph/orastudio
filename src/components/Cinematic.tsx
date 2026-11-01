import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// ─── SPLIT TEXT (word-by-word reveal) ──────────────────────────────────────────
interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className = '', as: Tag = 'h2', delay = 0, stagger = 0.05 }: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline pr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={isInView ? { y: 0 } : { y: '110%' }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// ─── PARALLAX IMAGE ────────────────────────────────────────────────────────────
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  mask?: boolean;
}

export function ParallaxImage({ src, alt, className = '', speed = 0.3, mask = true }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const smoothY = useSpring(y, { stiffness: 50, damping: 20, mass: 0.5 });

  // Ottimizza l'URL dell'immagine per qwenlm.ai
  const optimizedSrc = src.includes('qwenlm.ai') && !src.includes('?')
    ? `${src}?w=800&q=75&fm=webp`
    : src;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-[120%] -my-[10%]"
        style={{ y: smoothY }}
      >
        <img
          src={optimizedSrc}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}

// ─── COUNTER ───────────────────────────────────────────────────────────────────
interface CounterProps {
  value: string;
  label: string;
  className?: string;
}

export function Counter({ value, label, className = '' }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Extract numeric part
  const numMatch = value.match(/[\d.]+/);
  const suffix = value.replace(/[\d.]+/, '');
  const targetNum = numMatch ? parseFloat(numMatch[0]) : 0;
  const isDecimal = value.includes('.');

  const [display, setDisplay] = useState(isDecimal ? '0.0' : '0');

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = targetNum * eased;
      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString());
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, targetNum, isDecimal]);

  return (
    <div ref={ref} className={className}>
      <p className="font-display text-display-lg font-light text-bone tabular-nums">
        {display}{suffix}
      </p>
      <p className="text-xs md:text-sm text-white/50 mt-2">{label}</p>
    </div>
  );
}

// ─── MARQUEE ───────────────────────────────────────────────────────────────────
interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className = '' }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-display text-display-lg font-light text-charcoal/15 mx-8 inline-flex items-center gap-8">
            {item}
            <span className="w-2 h-2 rounded-full bg-clay/40" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SCROLL PROGRESS ───────────────────────────────────────────────────────────
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return <motion.div className="scroll-progress" style={{ scaleX, width: '100%' }} />;
}

// ─── CURSOR GLOW ───────────────────────────────────────────────────────────────
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [visible]);

  return (
    <div
      className="cursor-glow hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

// ─── SECTION REVEAL ────────────────────────────────────────────────────────────
interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ children, className = '' }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── HORIZONTAL SCROLL SECTION ─────────────────────────────────────────────────
interface HorizontalSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalSection({ children, className = '' }: HorizontalSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const smoothX = useSpring(x, { stiffness: 80, damping: 30, mass: 0.5 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x: smoothX }} className="horizontal-scroll-container">
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// ─── FADE UP (simple) ──────────────────────────────────────────────────────────
interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeUp({ children, className = '', delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
