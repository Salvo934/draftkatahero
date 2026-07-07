import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Termini di utilizzo — DraftKataHero",
  description: "Condizioni d’uso del sito draft.katahero.com e dell’esperienza DraftKataHero.",
};

export default function TerminiPage() {
  return (
    <LegalPageLayout
      title="Termini di utilizzo"
      description="L’accesso e l’utilizzo di draft.katahero.com implicano l’accettazione delle presenti condizioni. Ti invitiamo a leggerle attentamente."
    >
      <LegalSection title="1. Oggetto">
        <p>
          {LEGAL.siteName} è un sito promozionale ed esperienziale dedicato al draft settimanale
          KataHero. Consente di visualizzare slot, countdown, simulazioni di pick e player card
          collegate al brand {LEGAL.parentBrand}. Il sito non costituisce un’offerta contrattuale
          vincolante salvo quanto espressamente indicato su pagine di acquisto esterne.
        </p>
      </LegalSection>

      <LegalSection title="2. Accesso e uso lecito">
        <p>L’utente si impegna a:</p>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>utilizzare il sito in conformità alla legge e ai presenti Termini;</li>
          <li>non interferire con il funzionamento del sito (es. tentativi di hacking, scraping aggressivo, sovraccarico dei server);</li>
          <li>non riprodurre, distribuire o sfruttare commercialmente contenuti del sito senza autorizzazione scritta del Titolare.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Natura dell’esperienza draft">
        <p>
          Gli slot, i nomi, l’ordine di pick e le simulazioni hanno finalità di intrattenimento e
          comunicazione del brand. Salvo diversa indicazione ufficiale, l’esperienza sul sito{" "}
          <strong className="text-white">non garantisce</strong> selezione, contratto sportivo,
          partnership o altri diritti verso KataHero o verso terzi. Eventuali acquisti di player
          card o servizi avvengono tramite{" "}
          <a
            href={LEGAL.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            katahero.com
          </a>{" "}
          e sono regolati dalle condizioni ivi pubblicate.
        </p>
      </LegalSection>

      <LegalSection title="4. Proprietà intellettuale">
        <p>
          Marchi, loghi, grafiche, testi, audio, layout, player card, immagini e codice del sito
          sono di titolarità di {LEGAL.controller} o dei rispettivi licenzianti e sono protetti
          dalle leggi italiane ed internazionali sul diritto d’autore e sulla concorrenza sleale.
        </p>
        <p>
          È consentita la visualizzazione personale e non commerciale. Qualsiasi altro uso richiede
          autorizzazione scritta.
        </p>
      </LegalSection>

      <LegalSection title="5. Contenuti su atleti e immagini">
        <p>
          Nomi, dati sportivi, fotografie e player card degli atleti sono pubblicati nel rispetto
          degli accordi con gli interessati o dei legittimi titoli di utilizzo. Per richieste di
          rettifica o rimozione contattare{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-accent underline-offset-2 hover:underline">
            {LEGAL.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. Link esterni">
        <p>
          Il sito può contenere link a risorse di terze parti. {LEGAL.controller} non controlla tali
          siti e non risponde di contenuti, prodotti o servizi offerti da terzi. L’accesso avviene
          sotto la responsabilità dell’utente.
        </p>
      </LegalSection>

      <LegalSection title="7. Disponibilità del servizio">
        <p>
          Il Titolare si impegna a mantenere il sito accessibile ma non garantisce assenza di
          interruzioni, errori o ritardi (es. manutenzione, drop programmato, problemi di hosting).
          Contenuti, orari di drop e numero di slot possono essere modificati per esigenze
          organizzative o tecniche.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitazione di responsabilità">
        <p>
          Nei limiti consentiti dalla legge, {LEGAL.controller} non risponde di danni indiretti,
          perdita di opportunità o mancati guadagni derivanti dall’uso o dall’impossibilità di usare
          il sito. Resta ferma la responsabilità per dolo o colpa grave e per i diritti inderogabili
          del consumatore ove applicabili.
        </p>
      </LegalSection>

      <LegalSection title="9. Privacy">
        <p>
          Il trattamento dei dati personali è regolato dalla{" "}
          <Link href="/privacy" className="text-accent underline-offset-2 hover:underline">
            Privacy Policy
          </Link>{" "}
          e dalla{" "}
          <Link href="/cookie" className="text-accent underline-offset-2 hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="10. Legge applicabile e foro competente">
        <p>
          I presenti Termini sono regolati dalla legge italiana. Per ogni controversia relativa
          all’interpretazione o esecuzione sarà competente il foro del consumatore ove applicabile
          ai sensi del Codice del consumo; negli altri casi, il foro di residenza o domicilio
          eletto dal Titolare, salvo diversa disposizione inderogabile di legge.
        </p>
      </LegalSection>

      <LegalSection title="11. Modifiche">
        <p>
          Il Titolare può aggiornare i Termini in qualsiasi momento. Le modifiche sono efficaci
          dalla pubblicazione su questa pagina. L’uso continuato del sito dopo la modifica vale come
          accettazione delle nuove condizioni.
        </p>
      </LegalSection>

      <LegalSection title="12. Contatti">
        <p>
          Per chiarimenti sui Termini:{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-accent underline-offset-2 hover:underline">
            {LEGAL.email}
          </a>{" "}
          · {LEGAL.phone}
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
