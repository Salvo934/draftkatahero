import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { LEGAL } from "@/lib/legal";
import {
  getPlayerCardPurchaseUrl,
  getStripeCustomerPortalUrl,
  PAYMENTS,
} from "@/lib/payments";

export const metadata: Metadata = {
  title: "Pagamenti — DraftKataHero",
  description:
    "Informazioni su pagamenti, sblocco player card e gestione abbonamento su draft.katahero.com.",
};

export default function PagamentiPage() {
  const checkoutUrl = getPlayerCardPurchaseUrl();
  const portalUrl = getStripeCustomerPortalUrl();

  return (
    <LegalPageLayout
      title="Pagamenti e abbonamenti"
      description="Tutto ciò che devi sapere sui pagamenti su DraftKataHero: sblocco della player card, gestione abbonamento, metodi accettati e assistenza."
    >
      <LegalSection title="1. Come funzionano i pagamenti">
        <p>
          I pagamenti su {LEGAL.siteName} sono gestiti in modo sicuro tramite{" "}
          <strong className="text-white">{PAYMENTS.processor}</strong>, piattaforma certificata per
          transazioni online. {LEGAL.controller} non memorizza i dati completi della carta di
          credito sui propri server: il checkout avviene su infrastruttura Stripe.
        </p>
      </LegalSection>

      <LegalSection title="2. Sblocco player card (draft)">
        <p>
          Se vieni scelto al draft settimanale, la tua player card è visibile in anteprima sul
          sito. Per sbloccarla in alta definizione e ricevere il link personale con profilo atleta
          premium, effettua il pagamento previsto.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Prezzo sblocco card:</strong>{" "}
            {PAYMENTS.playerCardPrice} (pagamento unico, salvo diversa indicazione al checkout)
          </li>
          <li>
            <strong className="text-zinc-200">Cosa ricevi:</strong> player card HD, link personale
            e materiali KataHero comunicati dopo l&apos;acquisto
          </li>
          <li>
            <strong className="text-zinc-200">Come pagare:</strong> dal modal della card dopo il
            draft, oppure dal link qui sotto
          </li>
        </ul>
        <p className="mt-4">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-black"
          >
            Sblocca la tua player card →
          </a>
        </p>
      </LegalSection>

      <LegalSection title="3. Pacchetti e abbonamenti KataHero">
        <p>
          Oltre allo sblocco della player card dal draft, su{" "}
          <a
            href={PAYMENTS.packagesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            katahero.com/pacchetti
          </a>{" "}
          sono disponibili i piani annuali Rookie, Pro ed Elite per la presenza digitale completa
          dell&apos;atleta.
        </p>
        <p>
          Per informazioni su prezzi, rinnovi e contenuti inclusi consulta la pagina pacchetti o
          scrivi a{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-accent underline-offset-2 hover:underline">
            {LEGAL.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="4. Gestisci il tuo abbonamento">
        <p>
          Se hai già un abbonamento attivo (Rookie, Pro o Elite) o un pagamento ricorrente gestito
          su Stripe, puoi accedere al portale clienti per:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>aggiornare il metodo di pagamento;</li>
          <li>scaricare fatture e ricevute;</li>
          <li>gestire il rinnovo o la disdetta, ove previsto dal piano sottoscritto.</li>
        </ul>
        <p className="mt-4">
          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-accent/30 hover:text-accent"
          >
            Gestisci abbonamento su Stripe →
          </a>
        </p>
        <p className="mt-3 text-xs text-zinc-500">
          Accedi con l&apos;email usata al momento dell&apos;acquisto. Per problemi di accesso
          contattaci a {LEGAL.email}.
        </p>
      </LegalSection>

      <LegalSection title="5. Metodi di pagamento e sicurezza">
        <p>
          Stripe accetta i principali metodi di pagamento (carta di credito/debito e altri metodi
          abilitati al checkout). Le transazioni sono crittografate e conformi agli standard di
          sicurezza del settore (PCI-DSS).
        </p>
        <p>
          Informativa privacy di Stripe:{" "}
          <a
            href={PAYMENTS.processorPrivacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            stripe.com/it/privacy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. Rimborsi e assistenza">
        <p>
          Per richieste relative a pagamenti errati, rimborsi o problemi tecnici al checkout scrivi
          a{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-accent underline-offset-2 hover:underline">
            {LEGAL.email}
          </a>{" "}
          indicando email usata per l&apos;acquisto e data della transazione. Valuteremo ogni
          richiesta secondo i{" "}
          <Link href="/termini" className="text-accent underline-offset-2 hover:underline">
            Termini di utilizzo
          </Link>{" "}
          e la normativa applicabile.
        </p>
      </LegalSection>

      <LegalSection title="7. Contatti">
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
      </LegalSection>
    </LegalPageLayout>
  );
}
