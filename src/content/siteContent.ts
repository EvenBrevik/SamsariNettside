export type Language = 'no' | 'en';
export type BlogCategory = 'Power Platform' | 'AI' | 'Microsoft 365' | 'Automatisering';

type HeroStat = { value: string; label: string };
type HeroCard = { eyebrow: string; title: string; body: string; bullets: string[] };
type ValueCard = { title: string; description: string };
type ServiceItem = { title: string; summary: string; problem: string; value: string };
type ProductItem = { title: string; description: string; highlights: string[] };
type CaseItem = { company: string; sector: string; problem: string; solution: string; result: string; metrics: string[] };
type BlogPost = { slug: string; title: string; excerpt: string; date: string; readingTime: string; category: BlogCategory; body: string[] };

type SharedLocaleContent = {
  nav: { home: string; services: string; products: string; cases: string; blog: string; about: string; contact: string };
  common: {
    bookMeeting: string; exploreMore: string; trustedBy: string; readArticle: string; viewAllArticles: string; talkToUs: string;
    results: string; challenge: string; solution: string; value: string; categoryAll: string; sendMessage: string;
    formSuccess: string; footerTagline: string; no: string; en: string; light: string; dark: string;
  };
  home: {
    hero: { eyebrow: string; title: string; description: string; primaryCta: string; secondaryCta: string; stats: HeroStat[]; card: HeroCard };
    trustLogos: string[];
    valueProps: { title: string; subtitle: string; items: ValueCard[] };
    servicesPreview: { title: string; subtitle: string };
    productsPreview: { title: string; subtitle: string };
    process: { title: string; subtitle: string; steps: { step: string; title: string; description: string }[] };
    casesPreview: { title: string; subtitle: string };
    blogPreview: { title: string; subtitle: string };
    finalCta: { title: string; description: string; primaryCta: string };
  };
  servicesPage: { title: string; subtitle: string; intro: string };
  productsPage: { title: string; subtitle: string; intro: string };
  casesPage: { title: string; subtitle: string; intro: string };
  blogPage: { title: string; subtitle: string; intro: string };
  aboutPage: { title: string; subtitle: string; intro: string; principles: { title: string; description: string }[] };
  contactPage: {
    title: string; subtitle: string; intro: string; sideCardTitle: string; sideCardBody: string; sideCardPoints: string[];
    formLabels: { name: string; email: string; company: string; message: string };
  };
  services: ServiceItem[];
  products: ProductItem[];
  cases: CaseItem[];
  blogPosts: BlogPost[];
};

const sharedCategories: BlogCategory[] = ['Power Platform', 'AI', 'Microsoft 365', 'Automatisering'];

export const siteContent: Record<Language, SharedLocaleContent> = {
  no: {
    nav: { home: 'Hjem', services: 'Tjenester', products: 'Produkter', cases: 'Case', blog: 'Blogg', about: 'Om oss', contact: 'Kontakt' },
    common: {
      bookMeeting: 'Book gratis kartleggingsmøte', exploreMore: 'Se hva vi kan gjøre for deg', trustedBy: 'Stolt på av ledende firma',
      readArticle: 'Les artikkel', viewAllArticles: 'Se alle artikler', talkToUs: 'Snakk med oss', results: 'Resultat', challenge: 'Problem',
      solution: 'Løsning', value: 'Forretningsverdi', categoryAll: 'Alle', sendMessage: 'Send melding',
      formSuccess: 'Takk. Vi tar kontakt så snart som mulig.', footerTagline: 'Ser mulighetene - Skaper løsningene',
      no: 'NO', en: 'EN', light: 'Lys', dark: 'Mørk',
    },
    home: {
      hero: {
        eyebrow: 'Microsoft 365, Power Platform og AI',
        title: 'Lås opp bedriftens potensial',
        description: 'Vi hjelper bedrifter med å jobbe smartere ved å automatisere prosesser, redusere manuelt arbeid og hente mer verdi ut av Microsoft 365.',
        primaryCta: 'Book møte',
        secondaryCta: 'Se hva vi kan gjøre for deg',
        stats: [{ value: '4 uker', label: 'Fra innsikt til første løsning' }, { value: '40%', label: 'Mindre manuelt arbeid i typiske prosesser' }, { value: '100%', label: 'Bygget rundt verktøy du allerede bruker' }],
        card: {
          eyebrow: 'Premium arbeidsflyt',
          title: 'Fra manuelle flaskehalser til flyt',
          body: 'Vi kombinerer forretningsforståelse med Microsoft-teknologi for å skape løsninger som faktisk tas i bruk.',
          bullets: ['Power Apps og Power Automate', 'AI og Copilot-støttede arbeidsflyter', 'Skreddersydd for norske virksomheter'],
        },
      },
      trustLogos: ['Microsoft 365', 'Power Platform', 'Copilot', 'Dataverse', 'SharePoint'],
      valueProps: {
        title: 'Det handler ikke bare om teknologi',
        subtitle: 'Samsari bygger løsninger som fjerner friksjon, gjør data nyttige og skaper merkbar effekt i hverdagen.',
        items: [
          { title: 'Automatisering', description: 'Eliminer repeterende oppgaver og sikre at viktige steg faktisk blir fulgt opp.' },
          { title: 'Effektivisering', description: 'Samle informasjon, ansvar og fremdrift i ett tydelig arbeidsløp.' },
          { title: 'Skreddersøm', description: 'Løsninger formes rundt prosessene deres, ikke rundt begrensningene i et standardsystem.' },
          { title: 'Microsoft 365-utnyttelse', description: 'Få mer verdi ut av lisensene og plattformene virksomheten allerede betaler for.' },
        ],
      },
      servicesPreview: { title: 'Tjenester som gir raske gevinster og varig struktur', subtitle: 'Fra apper og automatisering til AI-støttede arbeidsflyter og smartere bruk av Microsoft 365.' },
      productsPreview: { title: 'Skalerbare produkter for virksomheter som vil videre', subtitle: 'Ferdige byggesteiner og produktiserte løsninger som kan tas i bruk raskt og utvides over tid.' },
      process: {
        title: 'En prosess som gjør det enkelt å komme i gang',
        subtitle: 'Vi jobber tett med dere fra første kartlegging til trygg implementering.',
        steps: [
          { step: '01', title: 'Kartlegging', description: 'Vi identifiserer tidstyver, flaskehalser og hvor verdien er størst.' },
          { step: '02', title: 'Analyse', description: 'Vi prioriterer tiltak, vurderer gevinst og designer et tydelig forbedringsløp.' },
          { step: '03', title: 'Utvikling', description: 'Vi bygger løsninger med fokus på brukervennlighet, trygghet og rask verdi.' },
          { step: '04', title: 'Implementering', description: 'Vi ruller ut, justerer og sikrer at løsningen faktisk fungerer i praksis.' },
        ],
      },
      casesPreview: { title: 'Resultater som merkes i driften', subtitle: 'Case med fokus på spart tid, bedre kontroll og høyere gjennomføringsevne.' },
      blogPreview: { title: 'Innsikt for ledere og fagmiljøer', subtitle: 'Praktiske artikler om Power Platform, Microsoft 365, AI og automatisering.' },
      finalCta: { title: 'Klar til å jobbe smartere?', description: 'La oss kartlegge hvor dere kan redusere manuelt arbeid og skape mer flyt med verktøyene dere allerede har.', primaryCta: 'Book møte' },
    },
    servicesPage: { title: 'Tjenester som kobler teknologi til faktisk forretningsverdi', subtitle: 'Vi hjelper dere å forstå hva som bør bygges, hvorfor det er viktig, og hvordan det skaper effekt.', intro: 'Samsari jobber i skjæringspunktet mellom prosessforbedring, Microsoft 365 og moderne automatisering. Hver tjeneste er bygget for å løse reelle arbeidsutfordringer.' },
    productsPage: { title: 'Produkter som gjør forbedring skalerbar', subtitle: 'Når utfordringer går igjen, bør løsningene være enklere å rulle ut, drifte og videreutvikle.', intro: 'Vi bygger både skreddersydde løsninger og produktiserte moduler som gir virksomheter et raskere sprang fra behov til verdi.' },
    casesPage: { title: 'Case som viser hvordan moderne arbeidsflyt skaper fart', subtitle: 'Eksempler på hvordan Samsari forenkler prosesser, samler informasjon og skaper tydelige gevinster.', intro: 'Resultater skapes når teknologi møter riktig prosessforståelse. Derfor beskriver vi alltid både utfordringen, løsningen og den målbare effekten.' },
    blogPage: { title: 'Blogg og faglig innsikt', subtitle: 'Refleksjoner, anbefalinger og konkrete råd for virksomheter som vil jobbe smartere.', intro: 'Her deler vi erfaringer fra prosjekter, vanlige fallgruver og hvordan Microsoft 365, Power Platform og AI kan brukes på en mer verdiskapende måte.' },
    aboutPage: { title: 'Et norsk teknologimiljø med blikk for både mennesker og prosesser', subtitle: 'Samsari er en partner for virksomheter som vil skape mer flyt, mindre manuelt arbeid og bedre utnyttelse av Microsoft 365.', intro: 'Vi tror de beste løsningene oppstår når man forstår hvordan folk faktisk jobber. Derfor kombinerer vi analyse, design og utvikling i ett samlet leveranseløp.', principles: [{ title: 'Nærhet til forretningen', description: 'Vi stiller spørsmålene som gjør at teknologi faktisk treffer drift, mål og mennesker.' }, { title: 'Løsninger som tas i bruk', description: 'Brukervennlighet og forankring er like viktig som teknologien under.' }, { title: 'Langsiktig verdi', description: 'Vi bygger på Microsoft 365 for å gi fleksibilitet, eierskap og trygg videreutvikling.' }] },
    contactPage: { title: 'La oss se på hvor dere kan jobbe smartere', subtitle: 'En samtale er ofte nok til å finne de første mulighetene for automatisering, bedre flyt og mer verdi i Microsoft 365.', intro: 'Del litt om virksomheten, utfordringen eller prosessen dere ønsker å forbedre, så tar vi kontakt for en uforpliktende prat.', sideCardTitle: 'Hva får dere i en kartleggingssamtale?', sideCardBody: 'Vi ser på hvor manuelt arbeid skaper friksjon i dag, hvilke muligheter som finnes i Microsoft 365, og hva som kan gi raskest effekt.', sideCardPoints: ['Konkrete forbedringsområder', 'Prioritering av gevinster og neste steg', 'Et tydelig bilde av hva som kan automatiseres'], formLabels: { name: 'Navn', email: 'E-post', company: 'Bedrift', message: 'Hvordan kan vi hjelpe?' } },
    services: [
      { title: 'Power Apps', summary: 'Bygg forretningsapper som samler informasjon, ansvar og oppgaver i en løsning folk faktisk vil bruke.', problem: 'Mange virksomheter håndterer kritiske prosesser i e-post, regneark og manuelle oppfølginger.', value: 'Mer kontroll, bedre datakvalitet og raskere arbeidsflyt uten å innføre tunge plattformer.' },
      { title: 'Power Automate', summary: 'Automatiser prosesser på tvers av systemer, godkjenninger, varslinger og oppfølging.', problem: 'Manuelle steg skaper kø, feil og sårbarhet når mye av arbeidet avhenger av enkeltpersoner.', value: 'Bedre gjennomføring, færre flaskehalser og mer tid til arbeid som faktisk skaper verdi.' },
      { title: 'AI / Copilot', summary: 'Bruk AI til å effektivisere kunnskapsarbeid, hente innsikt raskere og støtte ansatte i hverdagen.', problem: 'Informasjon er ofte spredt, utilgjengelig eller krevende å bruke i praktiske beslutninger.', value: 'Raskere tilgang til innsikt, høyere produktivitet og mer konsistent kvalitet i leveranser.' },
      { title: 'Microsoft 365', summary: 'Få mer ut av verktøyene dere allerede har gjennom smartere oppsett, struktur og integrasjon.', problem: 'Mange betaler for funksjonalitet som brukes for lite eller på en måte som skaper mer kompleksitet enn verdi.', value: 'Bedre utnyttelse av investeringer, mer sømløst samarbeid og en trygg plattform for videre vekst.' },
    ],
    products: [
      { title: 'Prosjektportal', description: 'Et samlet rom for oppgaver, dokumenter, status og fremdrift på tvers av team og prosjekter.', highlights: ['Bedre oversikt for ledelse og prosjektteam', 'Enklere samarbeid på tvers av avdelinger', 'Bygget for å kunne tilpasses og utvides'] },
      { title: 'Arbeidsflater', description: 'Skreddersydde arbeidsflater som gir riktige data, prosesser og handlinger i samme grensesnitt.', highlights: ['Tilpasset ulike roller og prosesser', 'Samler flere steg i én flyt', 'Reduserer hopping mellom systemer'] },
      { title: 'Automatiserte prosesser', description: 'Produktiserte automasjoner for onboarding, godkjenninger, internservice og oppfølging.', highlights: ['Kortere vei fra behov til verdi', 'Standardiserbare moduler med fleksibel tilpasning', 'Støtter skalering uten å øke administrasjon'] },
    ],
    cases: [
      { company: 'Nordic Drift', sector: 'Operativ virksomhet', problem: 'Teamene manglet oversikt over interne forespørsler, ansvar og status på tvers av avdelinger.', solution: 'Samsari bygget en arbeidsflate i Microsoft 365 med Power Apps, automatiserte varsler og tydelig rollefordeling.', result: 'Virksomheten reduserte behandlingstid, fikk bedre sporbarhet og frigjorde tid i både drift og ledelse.', metrics: ['34 % raskere behandling', 'Én felles arbeidsflate', 'Færre manuelle oppfølginger'] },
      { company: 'Fjord Prosjekt', sector: 'Prosjektbasert leveranse', problem: 'Prosjektinformasjon var fragmentert mellom e-post, dokumentbibliotek og manuelle statusmøter.', solution: 'Vi etablerte en prosjektportal med oppgavestyring, dokumentflyt og automatiserte påminnelser.', result: 'Prosjektledere fikk bedre kontroll, og organisasjonen brukte mindre tid på koordinering og statusjakt.', metrics: ['25 % mindre koordineringstid', 'Bedre fremdriftssynlighet', 'Tydeligere ansvar i prosjektløp'] },
      { company: 'Arctic HR', sector: 'People operations', problem: 'Onboarding og offboarding var avhengig av sjekklister, e-post og manuelle avklaringer.', solution: 'Samsari bygget en automatisert prosess for oppgaver, godkjenninger og varslinger rundt hele ansattreisen.', result: 'HR fikk tryggere gjennomføring, færre avvik og en bedre opplevelse for både ledere og ansatte.', metrics: ['50 % mindre manuelt koordineringsarbeid', 'Standardisert prosess', 'Tryggere etterlevelse'] },
    ],
    blogPosts: [
      { slug: 'slik-skaper-power-platform-rask-verdi', title: 'Slik skaper Power Platform rask verdi i virksomheten', excerpt: 'Tre grep som gjør at Power Platform gir gevinst raskt, uten at initiativene stopper opp i kompleksitet.', date: '14. mars 2026', readingTime: '5 min', category: 'Power Platform', body: ['Mange virksomheter vet at Power Platform har potensial, men sliter med å komme fra idé til konkret gevinst. Det handler sjelden om mangel på funksjonalitet. Utfordringen er oftere å velge et riktig første problem å løse.', 'De beste initiativene starter der manuelt arbeid er høyt, prosessen er tydelig og effekten av forbedring er enkel å merke. Da blir det lettere å skape forankring, lære raskt og bygge videre på en løsning som faktisk brukes.', 'Når plattformen kombineres med god prosessforståelse, blir Power Apps og Power Automate ikke bare teknologi. De blir et verktøy for å rydde opp i hvordan virksomheten jobber hver dag.'] },
      { slug: 'ai-i-microsoft-365-uten-stoy', title: 'AI i Microsoft 365 uten støy og hype', excerpt: 'Hvordan bruke AI og Copilot på en måte som faktisk støtter arbeidsflyt, kvalitet og beslutninger.', date: '2. mars 2026', readingTime: '6 min', category: 'AI', body: ['AI skaper høye forventninger, men i mange virksomheter blir resultatet fragmenterte eksperimenter uten tydelig verdi. Skal AI fungere i praksis, må den settes inn i en konkret arbeidssituasjon.', 'Det betyr å starte med oppgaver der ansatte bruker mye tid på å hente innsikt, sammenfatte informasjon eller kvalitetssikre innhold. Da kan Copilot og andre AI-verktøy støtte arbeidet uten å skape mer friksjon.', 'For ledere handler dette ikke bare om teknologi. Det handler om å finne arbeidsflyter der AI forbedrer kvalitet, tempo og tilgjengelighet på kunnskap.'] },
      { slug: 'microsoft-365-som-strategisk-plattform', title: 'Microsoft 365 som strategisk plattform, ikke bare verktøy', excerpt: 'Virksomheter som ser Microsoft 365 som en plattform får langt mer igjen for investeringene sine.', date: '20. februar 2026', readingTime: '4 min', category: 'Microsoft 365', body: ['Når Microsoft 365 brukes fragmentert, blir resultatet ofte flere siloer og mer manuelt arbeid. Når det brukes som en samlet plattform, åpner det for helt andre gevinster.', 'Ved å koble sammen SharePoint, Teams, Power Platform og strukturert data kan man lage arbeidsflater som passer faktiske prosesser. Da blir det mulig å samle dokumenter, oppgaver, godkjenninger og innsikt i samme flyt.', 'Det gir bedre styring, høyere brukervennlighet og et bedre grunnlag for å forbedre prosesser over tid.'] },
      { slug: 'automatisering-som-reduserer-sarbarhet', title: 'Automatisering som reduserer sårbarhet i drift', excerpt: 'Automatisering handler ikke bare om effektivitet. Det handler også om robusthet, kvalitet og forutsigbarhet.', date: '5. februar 2026', readingTime: '5 min', category: 'Automatisering', body: ['I mange bedrifter er viktige prosesser avhengig av at én person husker riktig steg til riktig tid. Det gjør virksomheten mer sårbar enn nødvendig.', 'Når varslinger, godkjenninger og oppfølging automatiseres, blir prosessen mindre personavhengig og mer stabil. Samtidig får ledelsen bedre oversikt over hva som er gjort, hva som gjenstår og hvor flaskehalsene faktisk ligger.', 'Automatisering er derfor like mye et kvalitetsgrep som et effektiviseringstiltak.'] },
    ],
  },
  en: {
    nav: { home: 'Home', services: 'Services', products: 'Products', cases: 'Cases', blog: 'Blog', about: 'About', contact: 'Contact' },
    common: {
      bookMeeting: 'Book free discovery call', exploreMore: 'See what we can do for you', trustedBy: 'Trusted by leading companies',
      readArticle: 'Read article', viewAllArticles: 'View all articles', talkToUs: 'Talk to us', results: 'Result', challenge: 'Problem',
      solution: 'Solution', value: 'Business value', categoryAll: 'All', sendMessage: 'Send message',
      formSuccess: 'Thank you. We will get back to you shortly.', footerTagline: 'Seeing the possibilities - Building the solutions',
      no: 'NO', en: 'EN', light: 'Light', dark: 'Dark',
    },
    home: {
      hero: {
        eyebrow: 'Microsoft 365, Power Platform and AI',
        title: 'Unlock your company’s potential',
        description: 'We help businesses work smarter by automating processes, reducing manual work, and unlocking more value from Microsoft 365.',
        primaryCta: 'Book meeting',
        secondaryCta: 'See what we can do for you',
        stats: [{ value: '4 weeks', label: 'From insight to first solution' }, { value: '40%', label: 'Less manual work in common processes' }, { value: '100%', label: 'Built around tools you already use' }],
        card: {
          eyebrow: 'Premium workflow design',
          title: 'From manual bottlenecks to operational flow',
          body: 'We combine business understanding with Microsoft technology to create solutions that teams actually adopt.',
          bullets: ['Power Apps and Power Automate', 'AI and Copilot-supported workflows', 'Tailored for modern business operations'],
        },
      },
      trustLogos: ['Microsoft 365', 'Power Platform', 'Copilot', 'Dataverse', 'SharePoint'],
      valueProps: {
        title: 'This is about more than technology',
        subtitle: 'Samsari creates solutions that remove friction, make data useful, and create visible impact in day-to-day work.',
        items: [
          { title: 'Automation', description: 'Remove repetitive work and make sure critical steps are followed up consistently.' },
          { title: 'Efficiency', description: 'Bring information, responsibility and progress into one clear operational flow.' },
          { title: 'Tailored solutions', description: 'Solutions are shaped around your processes, not around the limitations of a standard system.' },
          { title: 'Microsoft 365 value', description: 'Get more from the licenses and platforms your business is already paying for.' },
        ],
      },
      servicesPreview: { title: 'Services that create fast wins and lasting structure', subtitle: 'From apps and automation to AI-powered workflows and smarter Microsoft 365 usage.' },
      productsPreview: { title: 'Scalable products for companies ready to move forward', subtitle: 'Ready-made building blocks and productized solutions that can launch fast and evolve over time.' },
      process: {
        title: 'A process that makes it easy to get started',
        subtitle: 'We work closely with you from initial mapping to confident implementation.',
        steps: [
          { step: '01', title: 'Discovery', description: 'We identify bottlenecks, repetitive work and where the value is highest.' },
          { step: '02', title: 'Analysis', description: 'We prioritize opportunities, estimate impact and design a clear improvement path.' },
          { step: '03', title: 'Build', description: 'We create solutions focused on usability, reliability and fast time to value.' },
          { step: '04', title: 'Implementation', description: 'We roll out, refine and make sure the solution works in the real world.' },
        ],
      },
      casesPreview: { title: 'Results that are felt in daily operations', subtitle: 'Case examples focused on time saved, stronger control and better execution.' },
      blogPreview: { title: 'Insights for leaders and expert teams', subtitle: 'Practical articles about Power Platform, Microsoft 365, AI and automation.' },
      finalCta: { title: 'Ready to work smarter?', description: 'Let’s identify where you can reduce manual work and create more flow with the tools you already have.', primaryCta: 'Book meeting' },
    },
    servicesPage: { title: 'Services that connect technology to measurable business value', subtitle: 'We help you understand what to build, why it matters, and how it creates impact.', intro: 'Samsari works at the intersection of process improvement, Microsoft 365 and modern automation. Each service is designed to solve real operational challenges.' },
    productsPage: { title: 'Products that make improvement scalable', subtitle: 'When the same problems keep coming back, solutions should be easier to roll out, manage and extend.', intro: 'We build both tailored solutions and productized modules that help businesses move faster from need to value.' },
    casesPage: { title: 'Cases showing how modern workflow creates momentum', subtitle: 'Examples of how Samsari simplifies processes, connects information and creates visible gains.', intro: 'Results happen when technology meets the right process understanding. That is why we always describe the challenge, the solution and the measurable impact.' },
    blogPage: { title: 'Blog and insights', subtitle: 'Reflections, recommendations and practical advice for businesses that want to work smarter.', intro: 'Here we share project experience, common pitfalls and how Microsoft 365, Power Platform and AI can be used in a more valuable way.' },
    aboutPage: { title: 'A Norwegian technology partner with an eye for both people and process', subtitle: 'Samsari helps businesses create more flow, less manual work and stronger value from Microsoft 365.', intro: 'We believe the best solutions emerge when you understand how people actually work. That is why we combine analysis, design and delivery in one cohesive process.', principles: [{ title: 'Close to the business', description: 'We ask the questions that make technology fit operations, goals and people.' }, { title: 'Solutions people adopt', description: 'Usability and organizational buy-in matter just as much as the technology underneath.' }, { title: 'Long-term value', description: 'We build on Microsoft 365 to give you flexibility, ownership and a strong foundation for future development.' }] },
    contactPage: { title: 'Let’s explore where you can work smarter', subtitle: 'One conversation is often enough to uncover the first opportunities for automation, better flow and more value from Microsoft 365.', intro: 'Share a bit about your business, challenge or process, and we will reach out for a no-obligation conversation.', sideCardTitle: 'What do you get from a discovery call?', sideCardBody: 'We look at where manual work creates friction today, what opportunities exist inside Microsoft 365, and what could generate the fastest impact.', sideCardPoints: ['Concrete improvement areas', 'Priority view of value and next steps', 'A clearer picture of what can be automated'], formLabels: { name: 'Name', email: 'Email', company: 'Company', message: 'How can we help?' } },
    services: [
      { title: 'Power Apps', summary: 'Build business apps that bring information, ownership and execution into one interface people actually want to use.', problem: 'Many businesses still run critical processes across email, spreadsheets and manual follow-up.', value: 'More control, better data quality and faster workflow without introducing heavy new platforms.' },
      { title: 'Power Automate', summary: 'Automate processes across systems, approvals, notifications and recurring operational tasks.', problem: 'Manual steps create queues, errors and vulnerability when too much depends on individual follow-up.', value: 'Stronger execution, fewer bottlenecks and more time for work that truly creates value.' },
      { title: 'AI / Copilot', summary: 'Use AI to speed up knowledge work, surface insight faster and support employees in daily work.', problem: 'Information is often scattered, hard to access or difficult to turn into practical decisions.', value: 'Faster access to insight, higher productivity and more consistent quality in delivery.' },
      { title: 'Microsoft 365', summary: 'Get more out of the tools you already have through smarter setup, structure and integration.', problem: 'Many companies pay for functionality they barely use, or use it in ways that create more complexity than value.', value: 'Better return on investment, smoother collaboration and a safer platform for future growth.' },
    ],
    products: [
      { title: 'Project Portal', description: 'A shared environment for tasks, documents, status and progress across teams and projects.', highlights: ['Better visibility for leadership and project teams', 'Simpler cross-functional collaboration', 'Designed to be tailored and extended over time'] },
      { title: 'Workspaces', description: 'Tailored workspaces that bring the right data, processes and actions into one focused interface.', highlights: ['Adapted to different roles and workflows', 'Brings multiple steps into one flow', 'Reduces the need to jump between systems'] },
      { title: 'Automated Processes', description: 'Productized automations for onboarding, approvals, internal services and follow-up.', highlights: ['Shorter path from need to value', 'Standardized modules with flexible tailoring', 'Supports scaling without more admin overhead'] },
    ],
    cases: [
      { company: 'Nordic Drift', sector: 'Operations', problem: 'Teams lacked shared visibility into requests, ownership and status across departments.', solution: 'Samsari built a Microsoft 365 workspace with Power Apps, automated notifications and clear role flows.', result: 'The business reduced handling time, improved traceability and freed up time for both operations and leadership.', metrics: ['34% faster handling', 'One shared workspace', 'Fewer manual follow-ups'] },
      { company: 'Fjord Prosjekt', sector: 'Project delivery', problem: 'Project information was fragmented across email, document libraries and manual status routines.', solution: 'We implemented a project portal with task management, document flow and automated reminders.', result: 'Project leaders gained stronger control, and the organization spent less time on coordination and status chasing.', metrics: ['25% less coordination time', 'Better progress visibility', 'Clearer ownership in project delivery'] },
      { company: 'Arctic HR', sector: 'People operations', problem: 'Onboarding and offboarding depended on checklists, email and manual clarification between teams.', solution: 'Samsari built an automated process for tasks, approvals and notifications across the employee journey.', result: 'HR gained more reliable execution, fewer deviations and a better experience for managers and employees.', metrics: ['50% less manual coordination', 'Standardized process', 'Safer compliance and follow-through'] },
    ],
    blogPosts: [
      { slug: 'how-power-platform-creates-fast-value', title: 'How Power Platform creates fast business value', excerpt: 'Three practical moves that help Power Platform deliver impact quickly, without getting lost in complexity.', date: 'March 14, 2026', readingTime: '5 min', category: 'Power Platform', body: ['Many businesses know Power Platform has potential, but struggle to move from ideas to clear value. The issue is rarely a lack of features. More often, the real challenge is choosing the right first problem to solve.', 'The strongest initiatives start where manual work is high, the workflow is clear and the effect of improvement is easy to notice. That makes it easier to create alignment, learn quickly and build on a solution that teams genuinely use.', 'When the platform is paired with solid process understanding, Power Apps and Power Automate become more than tools. They become a way to improve how work gets done every day.'] },
      { slug: 'ai-in-microsoft-365-without-noise', title: 'AI in Microsoft 365 without the noise', excerpt: 'How to use AI and Copilot in ways that genuinely support workflow, quality and decision-making.', date: 'March 2, 2026', readingTime: '6 min', category: 'AI', body: ['AI creates high expectations, but many businesses end up with fragmented experiments and little concrete value. To work in practice, AI needs to be placed inside a real work situation.', 'That means starting with tasks where people spend time retrieving information, summarizing knowledge or quality-checking content. In those moments, Copilot and related tools can support work without creating more friction.', 'For leaders, this is not only a technology question. It is about finding workflows where AI improves quality, speed and access to knowledge.'] },
      { slug: 'microsoft-365-as-a-strategic-platform', title: 'Microsoft 365 as a strategic platform, not just a toolset', excerpt: 'Businesses that treat Microsoft 365 as a platform get much more from their existing investment.', date: 'February 20, 2026', readingTime: '4 min', category: 'Microsoft 365', body: ['When Microsoft 365 is used in a fragmented way, the result is often more silos and more manual work. When it is used as a connected platform, the upside becomes far more interesting.', 'By connecting SharePoint, Teams, Power Platform and structured data, businesses can create workspaces that fit real processes. Documents, tasks, approvals and insight can live in the same operational flow.', 'That leads to stronger governance, higher usability and a better foundation for improving processes over time.'] },
      { slug: 'automation-that-reduces-operational-risk', title: 'Automation that reduces operational risk', excerpt: 'Automation is not only about efficiency. It is also about resilience, quality and predictability.', date: 'February 5, 2026', readingTime: '5 min', category: 'Automatisering', body: ['In many companies, important processes rely on one person remembering the right step at the right time. That makes the business more vulnerable than it needs to be.', 'When notifications, approvals and follow-up are automated, the process becomes less dependent on individuals and more stable. Leadership also gains better visibility into what is done, what remains and where the real bottlenecks are.', 'Automation is therefore as much a quality initiative as it is an efficiency initiative.'] },
    ],
  },
};

export const blogCategories = sharedCategories;
