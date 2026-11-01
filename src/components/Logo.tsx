interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', showText = true, variant = 'dark' }: LogoProps) {
  const color = variant === 'dark' ? '#0A0A0A' : '#F5F5F5';
  const accentColor = '#FF4D4D';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer circle - the "O" */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
        />
        {/* Inner arc - suggests time/movement, like a clock hand at rest */}
        <path
          d="M 32 12 A 20 20 0 0 1 48 40"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Small dot - the pivot point, like a clock center */}
        <circle
          cx="32"
          cy="32"
          r="2.5"
          fill={accentColor}
        />
        {/* Subtle line suggesting the present moment */}
        <line
          x1="32"
          y1="32"
          x2="32"
          y2="18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
      {showText && (
        <span className="font-display text-xl font-bold tracking-tight" style={{ color }}>
          Ora Studio
        </span>
      )}
    </div>
  );
}

export function LogoMark({ className = '', variant = 'dark' }: { className?: string; variant?: 'light' | 'dark' }) {
  const color = variant === 'dark' ? '#0A0A0A' : '#F5F5F5';
  const accentColor = '#FF4D4D';

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ora Studio logo"
    >
      <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 32 12 A 20 20 0 0 1 48 40" stroke={accentColor} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="32" r="2.5" fill={accentColor} />
      <line x1="32" y1="32" x2="32" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
