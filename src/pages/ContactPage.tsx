import { useState, type FormEvent } from 'react';
import { Reveal } from '../components/shared/Reveal';
import { useSEO } from '../hooks/useSEO';
import { useAppSettings } from '../providers/AppSettingsProvider';

type FormState = { name: string; email: string; company: string; message: string };
const empty: FormState = { name: '', email: '', company: '', message: '' };
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[var(--color-text)]">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-[var(--color-feedback-accent)]">{error}</span>}
    </label>
  );
}

export function ContactPage() {
  const { t, language } = useAppSettings();
  useSEO({ title: language === 'no' ? 'Kontakt' : 'Contact', description: language === 'no' ? 'Ta kontakt med Samsari for en gratis kartleggingssamtale om automatisering og Microsoft 365.' : 'Contact Samsari for a free discovery call about automation and Microsoft 365.', path: '/contact' });

  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const no = language === 'no';
  const inputClass =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15';

  function validate() {
    const req = no ? 'Påkrevd felt' : 'Required field';
    const emailErr = no ? 'Skriv inn en gyldig e-post' : 'Enter a valid email';
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = req;
    if (!form.email.trim()) next.email = req;
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = emailErr;
    if (!form.company.trim()) next.company = req;
    if (!form.message.trim()) next.message = req;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError(false);

    if (!CONTACT_ENDPOINT) {
      const subject = encodeURIComponent(`Henvendelse fra ${form.company}`);
      const body = encodeURIComponent(`Navn: ${form.name}\nE-post: ${form.email}\nBedrift: ${form.company}\n\n${form.message}`);
      window.location.href = `mailto:oliver@samsari.no?subject=${subject}&body=${body}`;
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
      setForm(empty);
      setErrors({});
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const nextStepsLabel = no ? 'Dette får dere i en samtale' : 'What you get from a call';
  const contactPersonLabel = no ? 'Din kontaktperson' : 'Your contact';
  const responseLabel = no ? 'Svarer innen en virkedag' : 'Responds within one business day';

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)] opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[36rem] w-[36rem] rounded-full bg-[var(--color-primary-soft)] blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[var(--color-accent-soft)] blur-[100px]" />

      <div className="relative mx-auto w-full max-w-7xl">

        {/* Header */}
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
              {no ? 'Kontakt' : 'Contact'}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t.contactPage.title}</h1>
            <p className="mt-4 text-lg leading-8 text-[var(--color-text-muted)]">{t.contactPage.subtitle}</p>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">

          {/* ── Form ── */}
          <Reveal>
            {isSubmitted ? (
              <div className="flex flex-col items-start gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-2xl font-semibold">{no ? 'Takk for meldingen!' : 'Thanks for reaching out!'}</h2>
                  <p className="mt-2 text-base text-[var(--color-text-muted)]">{t.common.formSuccess}</p>
                </div>
                <a href="mailto:oliver@samsari.no" className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-link-hover)]">
                  oliver@samsari.no
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-soft sm:p-9"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t.contactPage.formLabels.name} error={errors.name}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                      className={inputClass}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label={t.contactPage.formLabels.email} error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                      className={inputClass}
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label={t.contactPage.formLabels.company} error={errors.company}>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                      className={inputClass}
                      autoComplete="organization"
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label={t.contactPage.formLabels.message} error={errors.message}>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                      rows={6}
                      className={`${inputClass} resize-y`}
                    />
                  </Field>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--color-button-primary),var(--color-button-accent))] px-7 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting
                      ? (no ? 'Sender...' : 'Sending...')
                      : t.common.sendMessage}
                  </button>
                  {submitError && (
                    <p className="text-sm text-[var(--color-feedback-accent)]">
                      {no ? 'Noe gikk galt. Prøv igjen eller send e-post direkte.' : 'Something went wrong. Please try again or email us.'}
                    </p>
                  )}
                </div>
              </form>
            )}
          </Reveal>

          {/* ── Right: contact person + next steps ── */}
          <Reveal delay={100} className="flex flex-col gap-5">

            {/* Oliver card */}
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft">
              <div className="relative h-56 overflow-hidden bg-[var(--color-surface-elevated)]">
                <img
                  src="/SkjorteSlips.png"
                  alt="Oliver Lysø"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    {responseLabel}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  {contactPersonLabel}
                </p>
                <h2 className="mt-1 text-xl font-semibold">Oliver Lysø</h2>
                <p className="text-sm text-[var(--color-text-subtle)]">
                  {no ? 'Daglig leder & Gründer' : 'CEO & Founder'}
                </p>
                <div className="mt-5 space-y-2.5">
                  <a
                    href="mailto:oliver@samsari.no"
                    className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" aria-hidden="true">
                      <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 5.854V12.25c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.854l-4.651 3.434a1.75 1.75 0 01-2.098 0L1.5 5.854zm1.232-2.1l5.338 3.941a.25.25 0 00.3 0l5.338-3.94H2.732z" />
                    </svg>
                    oliver@samsari.no
                  </a>
                  <a
                    href="tel:+4740700457"
                    className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" aria-hidden="true">
                      <path d="M1.885.511a1.745 1.745 0 012.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                    +47 407 00 457
                  </a>
                </div>
              </div>
            </div>

            {/* What to expect */}
            <div className="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-primary-soft)] p-6">
              <p className="mb-4 text-sm font-semibold text-[var(--color-primary)]">{nextStepsLabel}</p>
              <ul className="space-y-3">
                {t.contactPage.sideCardPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

          </Reveal>
        </div>
      </div>
    </section>
  );
}
