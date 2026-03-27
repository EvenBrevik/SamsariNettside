import { useState, type FormEvent } from 'react';
import { PageHero } from '../components/shared/PageHero';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { useAppSettings } from '../providers/AppSettingsProvider';

type FormState = { name: string; email: string; company: string; message: string };
const initialForm: FormState = { name: '', email: '', company: '', message: '' };

export function ContactPage() {
  const { t, language } = useAppSettings();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    const requiredText = language === 'no' ? 'Påkrevd felt' : 'Required field';
    const emailText = language === 'no' ? 'Skriv inn en gyldig e-post' : 'Enter a valid email';
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = requiredText;
    if (!form.email.trim()) nextErrors.email = requiredText;
    else if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = emailText;
    if (!form.company.trim()) nextErrors.company = requiredText;
    if (!form.message.trim()) nextErrors.message = requiredText;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
    setForm(initialForm);
    setErrors({});
  }

  return (
    <>
      <PageHero title={t.contactPage.title} subtitle={t.contactPage.subtitle} intro={t.contactPage.intro} />
      <Section contentClassName="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Reveal className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {(Object.keys(t.contactPage.formLabels) as Array<keyof FormState>).map((field) => (
              <label key={field} className="block">
                <span className="mb-2 block text-sm font-medium text-[var(--color-text)]">{t.contactPage.formLabels[field]}</span>
                {field === 'message' ? (
                  <textarea value={form[field]} onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))} rows={6} className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]" />
                ) : (
                  <input type={field === 'email' ? 'email' : 'text'} value={form[field]} onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))} className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]" />
                )}
                {errors[field] ? <span className="mt-2 block text-sm text-[var(--color-feedback-accent)]">{errors[field]}</span> : null}
              </label>
            ))}
            <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-button-primary)] px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[var(--color-button-primary-hover)]">{t.common.sendMessage}</button>
            {isSubmitted ? <p className="text-sm text-[var(--color-feedback-primary)]">{t.common.formSuccess}</p> : null}
          </form>
        </Reveal>
        <div className="space-y-6">
          <Reveal className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft sm:p-8">
            <h2 className="text-2xl font-semibold">{t.contactPage.sideCardTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{t.contactPage.sideCardBody}</p>
            <ul className="mt-6 space-y-3">{t.contactPage.sideCardPoints.map((point) => <li key={point} className="rounded-2xl bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-subtle)]">{point}</li>)}</ul>
          </Reveal>
          <Reveal delay={80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{t.common.talkToUs}</p>
            <p className="mt-4 text-lg font-medium">hello@samsari.no</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">Oslo, Norge</p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
