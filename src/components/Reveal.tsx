import { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = '', delay = 0 }: Props) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 500ms ${delay}ms var(--ease-out-smooth), transform 500ms ${delay}ms var(--ease-out-smooth)`,
      }}
    >
      {children}
    </div>
  );
}
