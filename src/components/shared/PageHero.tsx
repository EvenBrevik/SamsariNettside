type PageHeroProps = { eyebrow?: string; title: string; subtitle: string; intro?: string };

export function PageHero({ eyebrow, title, subtitle, intro }: PageHeroProps) {
  return (
    <section className="px-4 pb-10 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 shadow-premium sm:px-10 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-70" />
          <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[var(--color-primary-soft)] blur-3xl" />
          <div className="relative max-w-3xl">
            {eyebrow ? <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">{eyebrow}</p> : null}
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">{subtitle}</p>
            {intro ? <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--color-text-subtle)]">{intro}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
