import { BOOKING_URL } from '../../config';
import { ButtonLink } from './ButtonLink';
import { Section } from './Section';

type CTASectionProps = { title: string; description: string; cta: string; eyebrow?: string };

export function CTASection({ title, description, cta, eyebrow = 'Samsari' }: CTASectionProps) {
  return (
    <Section className="pt-10 lg:pt-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-10 shadow-premium sm:px-10 lg:px-14 lg:py-14">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)] opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-[var(--color-gradient-main)]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{eyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{description}</p>
          </div>
          <ButtonLink to={BOOKING_URL}>{cta}</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
