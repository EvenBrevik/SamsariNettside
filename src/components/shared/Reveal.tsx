import type { HTMLAttributes, PropsWithChildren } from 'react';
import { useReveal } from '../../hooks/useReveal';

type RevealProps = PropsWithChildren<HTMLAttributes<HTMLDivElement> & { delay?: number }>;

export function Reveal({ children, className = '', delay = 0, ...props }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}
