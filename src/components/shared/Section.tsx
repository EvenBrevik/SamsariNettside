import type { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{ eyebrow?: string; title?: string; subtitle?: string; className?: string; contentClassName?: string }>;

export function Section({ eyebrow, title, subtitle, className = '', contentClassName = '', children }: SectionProps) {
  return (
    <section className={`px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || subtitle) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow ? <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">{eyebrow}</p> : null}
            {title ? <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2> : null}
            {subtitle ? <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">{subtitle}</p> : null}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}
