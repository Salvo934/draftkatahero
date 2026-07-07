import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import {
  LEGAL,
  LOCAL_STORAGE_ITEMS,
  PROCESSORS,
  THIRD_PARTY_LINKS,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — DraftKataHero",
  description:
    "Informativa sul trattamento dei dati personali per draft.katahero.com, ai sensi del GDPR.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Informativa sulla privacy"
      description="Questa informativa descrive come vengono trattati i dati personali degli utenti che visitano draft.katahero.com, nel rispetto del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana applicabile."
    >
      <LegalSection title="1. Titolare del trattamento">
        <p>
          Titolare: <strong className="text-white">{LEGAL.controller}</strong>.
        </p>
        <p>
          Contatti per esercitare i diritti o per richieste sulla privacy:{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-accent underline-offset-2 hover:underline">
            {LEGAL.email}
          </a>
          , telefono {LEGAL.phone}.
        </p>
        <p>
          Per i servizi generali del brand consulta anche l’informativa su{" "}
          <a
            href={LEGAL.parentPrivacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            katahero.com/privacy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Ambito di applicazione">
        <p>
          La presente informativa si applica esclusivamente al sito{" "}
          <strong className="text-white">{LEGAL.siteUrl}</strong> ({LEGAL.siteName}), dedicato
          all’esperienza del draft settimanale. Non richiede registrazione, login o compilazione
          di moduli: non raccogliamo volontariamente nome, email o altri dati identificativi
          direttamente su questo sito.
        </p>
      </LegalSection>

      <LegalSection title="3. Tipologie di dati trattati">
        <p>Possono essere trattati, a seconda dell’utilizzo del sito:</p>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Dati di navigazione e log tecnici</strong> (es.
            indirizzo IP, user agent, data/ora di accesso, pagine richieste), trattati dal
            fornitore di hosting per sicurezza e funzionamento del servizio.
          </li>
          <li>
            <strong className="text-zinc-200">Dati memorizzati localmente sul dispositivo</strong>{" "}
            tramite tecnologie equivalenti ai cookie (localStorage del browser), descritti nella{" "}
            <Link href="/cookie" className="text-accent underline-offset-2 hover:underline">
              Cookie Policy
            </Link>
            .
          </li>
          <li>
            <strong className="text-zinc-200">Contenuti pubblici del draft</strong> (nomi, ruoli,
            immagini e statistiche degli atleti rivelati), mostrati a scopo informativo e
            promozionale nel contesto dell’evento DraftKataHero.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Finalità e basi giuridiche">
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Erogazione del servizio draft</strong> (board,
            countdown, simulazione, player card): esecuzione di misure precontrattuali/contrattuali
            o legittimo interesse del Titolare a offrire l’esperienza richiesta dall’utente.
          </li>
          <li>
            <strong className="text-zinc-200">Memorizzazione locale dello stato</strong> (slot
            rivelati, preferenze di visualizzazione): legittimo interesse e/o necessità tecnica
            per il corretto funzionamento del sito sul dispositivo dell’utente.
          </li>
          <li>
            <strong className="text-zinc-200">Sicurezza, manutenzione e prevenzione abusi</strong>
            : legittimo interesse e, ove applicabile, obblighi di legge.
          </li>
        </ul>
        <p>
          Non utilizziamo cookie di profilazione, pixel pubblicitari o strumenti di analytics di
          terze parti su questo sito.
        </p>
      </LegalSection>

      <LegalSection title="5. Local storage utilizzato">
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[520px] text-left text-xs">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Chiave</th>
                <th className="px-4 py-3 font-semibold">Finalità</th>
                <th className="px-4 py-3 font-semibold">Conservazione</th>
              </tr>
            </thead>
            <tbody>
              {LOCAL_STORAGE_ITEMS.map((item) => (
                <tr key={item.key} className="border-t border-white/8">
                  <td className="px-4 py-3 font-mono text-[11px] text-accent">{item.key}</td>
                  <td className="px-4 py-3 text-zinc-400">{item.purpose}</td>
                  <td className="px-4 py-3 text-zinc-500">{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="6. Destinatari e responsabili del trattamento">
        <p>
          I dati non sono venduti né ceduti a terzi per finalità di marketing. Possono essere
          trattati da fornitori tecnici nominati responsabili del trattamento, nella misura
          strettamente necessaria:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          {PROCESSORS.map((processor) => (
            <li key={processor.name}>
              <strong className="text-zinc-200">{processor.name}</strong> — {processor.role}.{" "}
              <a
                href={processor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 hover:underline"
              >
                Informativa privacy
              </a>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="7. Link a siti di terze parti">
        <p>
          Il sito contiene link verso risorse esterne. Cliccando su tali link l’utente esce da{" "}
          {LEGAL.siteName} e si applicano le informative privacy dei rispettivi titolari:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          {THIRD_PARTY_LINKS.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 hover:underline"
              >
                {item.name}
              </a>{" "}
              — {item.note}
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="8. Trasferimenti extra-SEE">
        <p>
          Alcuni fornitori tecnici (es. hosting) possono trattare dati anche al di fuori dello
          Spazio Economico Europeo. In tali casi il Titolare adotta le garanzie previste dal GDPR,
          incluse clausole contrattuali standard approvate dalla Commissione Europea o altre misure
          idonee.
        </p>
      </LegalSection>

      <LegalSection title="9. Conservazione">
        <p>
          I log tecnici del hosting sono conservati per il tempo necessario a sicurezza e
          manutenzione, secondo le policy del fornitore. I dati in localStorage restano sul
          dispositivo dell’utente finché non vengono cancellati manualmente o fino a
          aggiornamenti del sito che modificano le chiavi utilizzate.
        </p>
      </LegalSection>

      <LegalSection title="10. Diritti dell’interessato">
        <p>
          Ai sensi degli artt. 15–22 GDPR, l’interessato può chiedere accesso, rettifica,
          cancellazione, limitazione, portabilità (ove applicabile) e opporsi al trattamento
          basato su legittimo interesse. Può inoltre revocare eventuali consensi senza pregiudicare
          la liceità del trattamento precedente.
        </p>
        <p>
          Per esercitare i diritti scrivi a{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-accent underline-offset-2 hover:underline">
            {LEGAL.email}
          </a>
          . Hai diritto di proporre reclamo al{" "}
          <a
            href={LEGAL.guarantorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            Garante per la protezione dei dati personali
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="11. Minori">
        <p>
          Il sito è destinato a un pubblico generico. Qualora fossero pubblicati profili di atleti
          minorenni, il Titolare provvede al relativo consenso dei genitori o tutori legali per i
          trattamenti che lo richiedono, secondo quanto previsto sul sito principale KataHero.
        </p>
      </LegalSection>

      <LegalSection title="12. Modifiche">
        <p>
          La presente informativa può essere aggiornata. La data indicata in cima alla pagina
          segnala l’ultimo aggiornamento sostanziale. Ti invitiamo a consultarla periodicamente.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
