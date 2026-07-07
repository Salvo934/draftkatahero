import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Note legali — DraftKataHero",
  description: "Informazioni legali e identificativi del sito draft.katahero.com.",
};

export default function NoteLegaliPage() {
  return (
    <LegalPageLayout
      title="Note legali"
      description="Informazioni di identificazione del titolare e del sito, ai sensi del D.Lgs. 70/2003 (commercio elettronico) e delle buone pratiche di trasparenza verso gli utenti."
    >
      <LegalSection title="1. Editore del sito">
        <ul className="space-y-2 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Denominazione:</strong> {LEGAL.controller}
          </li>
          <li>
            <strong className="text-zinc-200">Sito:</strong>{" "}
            <a href={LEGAL.siteUrl} className="text-accent underline-offset-2 hover:underline">
              {LEGAL.siteUrl}
            </a>
          </li>
          <li>
            <strong className="text-zinc-200">Prodotto:</strong> {LEGAL.siteName} — draft
            settimanale del brand {LEGAL.parentBrand}
          </li>
          <li>
            <strong className="text-zinc-200">Sito principale del brand:</strong>{" "}
            <a
              href={LEGAL.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-2 hover:underline"
            >
              {LEGAL.parentUrl}
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Contatti">
        <ul className="space-y-2 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Email:</strong>{" "}
            <a href={`mailto:${LEGAL.email}`} className="text-accent underline-offset-2 hover:underline">
              {LEGAL.email}
            </a>
          </li>
          <li>
            <strong className="text-zinc-200">Telefono:</strong> {LEGAL.phone}
          </li>
        </ul>
        <p>
          Per richieste commerciali, informazioni sui pacchetti atleta e consulenze visita{" "}
          <a
            href={`${LEGAL.parentUrl}/#contatti`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            katahero.com — Contatti
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="3. Hosting">
        <p>
          Il sito è ospitato su infrastruttura cloud Vercel Inc. Per informazioni sul trattamento
          dei dati da parte dell’hosting consulta la{" "}
          <Link href="/privacy" className="text-accent underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="4. Documenti legali">
        <p>Documenti applicabili a questo sito:</p>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>
            <Link href="/privacy" className="text-accent underline-offset-2 hover:underline">
              Informativa sulla privacy (GDPR)
            </Link>
          </li>
          <li>
            <Link href="/cookie" className="text-accent underline-offset-2 hover:underline">
              Cookie e tecnologie simili
            </Link>
          </li>
          <li>
            <Link href="/termini" className="text-accent underline-offset-2 hover:underline">
              Termini di utilizzo
            </Link>
          </li>
          <li>
            <Link href="/pagamenti" className="text-accent underline-offset-2 hover:underline">
              Pagamenti e abbonamenti
            </Link>
          </li>
          <li>
            <a
              href={LEGAL.parentPrivacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-2 hover:underline"
            >
              Privacy policy generale KataHero
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Proprietà intellettuale">
        <p>
          Salvo diversa indicazione, tutti i contenuti presenti su {LEGAL.siteUrl} (testi, grafica,
          loghi, audio, codice, player card) sono di proprietà di {LEGAL.controller} o concessi in
          licenza. È vietata la riproduzione non autorizzata.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitazioni di responsabilità">
        <p>
          Il Titolare cura l’accuratezza delle informazioni pubblicate ma non garantisce l’assenza di
          errori o omissioni. Per i dettagli completi sulle responsabilità e sull’uso del sito
          consulta i{" "}
          <Link href="/termini" className="text-accent underline-offset-2 hover:underline">
            Termini di utilizzo
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Reclami e diritti">
        <p>
          Per esercitare i diritti privacy o segnalare contenuti illeciti scrivi a{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-accent underline-offset-2 hover:underline">
            {LEGAL.email}
          </a>
          . Per reclami relativi al trattamento dei dati personali è possibile contattare il{" "}
          <a
            href={LEGAL.guarantorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            Garante Privacy
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
