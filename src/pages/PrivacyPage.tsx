import { useSEO } from '../hooks/useSEO';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function PrivacyPage() {
  const { language } = useAppSettings();
  useSEO({ title: language === 'no' ? 'Personvernerklæring' : 'Privacy Policy', description: language === 'no' ? 'Les Samsaris personvernerklæring om hvordan vi behandler personopplysninger.' : 'Read Samsari privacy policy on how we handle personal data.', path: '/privacy' });

  if (language === 'en') return <PrivacyEN />;
  return <PrivacyNO />;
}

function PrivacyNO() {
  return (
    <article className="px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-soft sm:p-10 lg:p-14 space-y-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Personvern</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Personvernerklæring</h1>
            <p className="mt-4 text-sm text-[var(--color-text-subtle)]">Sist oppdatert: juni 2026</p>
          </div>

          <PolicySection title="Behandlingsansvarlig">
            <p>Samsari er behandlingsansvarlig for personopplysningene som samles inn via dette nettstedet.</p>
            <ul className="mt-4 space-y-1 text-sm text-[var(--color-text-muted)]">
              <li><strong>Selskapsnavn:</strong> Samsari</li>
              <li><strong>Organisasjonsnummer:</strong> 936 276 474</li>
              <li><strong>Adresse:</strong> Hagbart Brinchmanns vei 20, 6510 Kristiansund N</li>
              <li><strong>E-post:</strong> <a href="mailto:hei@samsari.no" className="text-[var(--color-primary)] hover:underline">hei@samsari.no</a></li>
            </ul>
          </PolicySection>

          <PolicySection title="Hvilke opplysninger samler vi inn?">
            <p>Vi samler inn følgende personopplysninger når du fyller ut kontaktskjemaet på nettsiden:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Navn</li>
              <li>E-postadresse</li>
              <li>Bedriftsnavn</li>
              <li>Meldingsinnhold</li>
            </ul>
            <p className="mt-4">Vi samler ikke inn sensitiv personinformasjon, og vi bruker ikke informasjonskapsler (cookies) for sporing utover teknisk nødvendig funksjonalitet.</p>
          </PolicySection>

          <PolicySection title="Formål og rettslig grunnlag">
            <p>Opplysningene du oppgir i kontaktskjemaet brukes til å besvare din henvendelse og vurdere om vi kan hjelpe deg.</p>
            <p className="mt-3">Rettslig grunnlag for behandlingen er ditt samtykke (GDPR artikkel 6 nr. 1 bokstav a) – ved å sende inn skjemaet godtar du at vi behandler opplysningene for dette formålet.</p>
          </PolicySection>

          <PolicySection title="Lagring og sletting">
            <p>Vi lagrer personopplysningene dine så lenge det er nødvendig for å besvare din henvendelse, eller frem til du ber oss slette dem. Opplysninger som ikke har ført til et kundeforhold, slettes innen 12 måneder.</p>
          </PolicySection>

          <PolicySection title="Deling med tredjepart">
            <p>Vi deler ikke personopplysninger med tredjeparter, med unntak av leverandører som hjelper oss med å drifte tjenester (f.eks. e-postleverandør, hostingleverandør). Disse behandler data kun etter våre instrukser og i henhold til databehandleravtaler.</p>
          </PolicySection>

          <PolicySection title="Analyse (Google Analytics)">
            <p>Vi bruker Google Analytics 4 for å forstå hvordan besøkende bruker nettstedet. Google Analytics samler inn anonymiserte data om sidebesøk og brukeratferd. Data behandles av Google LLC i henhold til deres personvernregler. Ingen direkte personopplysninger sendes til Google Analytics.</p>
          </PolicySection>

          <PolicySection title="Dine rettigheter">
            <p>Du har rett til å:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Kreve innsyn i hvilke opplysninger vi har om deg</li>
              <li>Kreve retting av feilaktige opplysninger</li>
              <li>Kreve sletting av opplysninger</li>
              <li>Trekke tilbake samtykket ditt</li>
              <li>Klage til Datatilsynet (datatilsynet.no)</li>
            </ul>
            <p className="mt-4">For å bruke rettighetene dine, ta kontakt med oss på <a href="mailto:hei@samsari.no" className="text-[var(--color-primary)] hover:underline">hei@samsari.no</a>.</p>
          </PolicySection>

          <PolicySection title="Kontakt">
            <p>Har du spørsmål om behandlingen av personopplysninger, ta gjerne kontakt med oss:</p>
            <p className="mt-3"><a href="mailto:hei@samsari.no" className="text-[var(--color-primary)] hover:underline">hei@samsari.no</a></p>
          </PolicySection>
        </div>
      </div>
    </article>
  );
}

function PrivacyEN() {
  return (
    <article className="px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-soft sm:p-10 lg:p-14 space-y-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Privacy</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Privacy Policy</h1>
            <p className="mt-4 text-sm text-[var(--color-text-subtle)]">Last updated: June 2026</p>
          </div>

          <PolicySection title="Data Controller">
            <p>Samsari is the data controller for personal data collected through this website.</p>
            <ul className="mt-4 space-y-1 text-sm text-[var(--color-text-muted)]">
              <li><strong>Company:</strong> Samsari</li>
              <li><strong>Organisation number:</strong> 936 276 474</li>
              <li><strong>Address:</strong> Hagbart Brinchmanns vei 20, 6510 Kristiansund N, Norway</li>
              <li><strong>Email:</strong> <a href="mailto:hei@samsari.no" className="text-[var(--color-primary)] hover:underline">hei@samsari.no</a></li>
            </ul>
          </PolicySection>

          <PolicySection title="What data do we collect?">
            <p>We collect the following personal data when you submit the contact form on our website:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Company name</li>
              <li>Message content</li>
            </ul>
            <p className="mt-4">We do not collect sensitive personal data, and we do not use tracking cookies beyond what is technically necessary.</p>
          </PolicySection>

          <PolicySection title="Purpose and legal basis">
            <p>The information you provide in the contact form is used solely to respond to your inquiry and assess how we can help you.</p>
            <p className="mt-3">The legal basis for this processing is your consent (GDPR Article 6(1)(a)) — by submitting the form, you agree that we may process your data for this purpose.</p>
          </PolicySection>

          <PolicySection title="Retention and deletion">
            <p>We retain your personal data for as long as necessary to respond to your inquiry, or until you request deletion. Data that has not resulted in a customer relationship is deleted within 12 months.</p>
          </PolicySection>

          <PolicySection title="Sharing with third parties">
            <p>We do not share personal data with third parties, except for service providers who help us operate the site (e.g. email provider, hosting provider). These providers process data solely on our instructions and under data processing agreements.</p>
          </PolicySection>

          <PolicySection title="Analytics (Google Analytics)">
            <p>We use Google Analytics 4 to understand how visitors use the website. Google Analytics collects anonymised data about page visits and user behaviour. Data is processed by Google LLC in accordance with their privacy policy. No directly identifiable personal data is sent to Google Analytics.</p>
          </PolicySection>

          <PolicySection title="Your rights">
            <p>You have the right to:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Request access to the data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw your consent at any time</li>
              <li>Lodge a complaint with the Norwegian Data Protection Authority (datatilsynet.no)</li>
            </ul>
            <p className="mt-4">To exercise your rights, contact us at <a href="mailto:hei@samsari.no" className="text-[var(--color-primary)] hover:underline">hei@samsari.no</a>.</p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>If you have questions about how we handle personal data, please reach out:</p>
            <p className="mt-3"><a href="mailto:hei@samsari.no" className="text-[var(--color-primary)] hover:underline">hei@samsari.no</a></p>
          </PolicySection>
        </div>
      </div>
    </article>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{children}</div>
    </div>
  );
}
