import type { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{ eyebrow?: string; title?: string; subtitle?: string; className?: string; contentClassName?: string }>;

export function Section({ eyebrow, title, subtitle, className = '', contentClassName = '', children }: SectionProps) {
  return (
    <section className={`px-4 py-20 sm:px-6 lg:px-8 lg:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">
        {(eyebrow || title || subtitle) && (
          <div className="mb-12 max-w-3xl">
            {eyebrow ? (
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]" />
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">{eyebrow}</p>
              </div>
            ) : null}
            {title ? <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2> : null}
            {subtitle ? <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">{subtitle}</p> : null}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}
