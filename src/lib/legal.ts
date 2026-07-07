/** Dati legali condivisi — allineati a katahero.com/privacy */
export const LEGAL = {
  siteName: "DraftKataHero",
  siteUrl: "https://draft.katahero.com",
  parentBrand: "KataHero",
  parentUrl: "https://www.katahero.com",
  parentPrivacyUrl: "https://www.katahero.com/privacy",
  controller: "KataHero",
  email: "salvo.bonavita9808@gmail.com",
  phone: "+39 327 459 7773",
  lastUpdated: "7 luglio 2026",
  governingLaw: "Italia",
  guarantorUrl: "https://www.garanteprivacy.it",
} as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookie", label: "Cookie" },
  { href: "/termini", label: "Termini" },
  { href: "/note-legali", label: "Note legali" },
] as const;

export const LOCAL_STORAGE_ITEMS = [
  {
    key: "draftkatahero-board-v8",
    purpose:
      "Memorizza lo stato locale della board del draft (slot rivelati, settimana corrente, Hall of Fame) per evitare di perdere l’esperienza al ricaricamento della pagina.",
    duration: "Fino alla cancellazione manuale tramite browser o aggiornamento del sito.",
    type: "tecnico / strettamente necessario",
  },
  {
    key: "draftkatahero-card-views",
    purpose:
      "Registra quali player card sono state aperte sul dispositivo, per non mostrare ripetutamente la stessa animazione di apertura.",
    duration: "Fino alla cancellazione manuale tramite browser.",
    type: "preferenze / funzionale",
  },
] as const;

export const THIRD_PARTY_LINKS = [
  {
    name: "KataHero",
    url: "https://www.katahero.com",
    note: "Sito principale del brand e pagine di acquisto player card.",
  },
  {
    name: "Instagram (Meta)",
    url: "https://www.instagram.com/katahero",
    note: "Profilo social raggiungibile tramite link esterni.",
  },
] as const;

export const PROCESSORS = [
  {
    name: "Vercel Inc.",
    role: "Hosting e distribuzione del sito",
    url: "https://vercel.com/legal/privacy-policy",
  },
] as const;
