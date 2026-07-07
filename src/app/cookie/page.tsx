import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { LEGAL, LOCAL_STORAGE_ITEMS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy — DraftKataHero",
  description:
    "Informativa su cookie e tecnologie simili utilizzate su draft.katahero.com.",
};

export default function CookiePage() {
  return (
    <LegalPageLayout
      title="Cookie e tecnologie simili"
      description="Questa pagina descrive l’uso di cookie e tecnologie equivalenti (incluso il localStorage del browser) su draft.katahero.com, in conformità al Provvedimento del Garante Privacy del 10 giugno 2021 e al GDPR."
    >
      <LegalSection title="1. Cosa utilizziamo">
        <p>
          Su {LEGAL.siteName} <strong className="text-white">non impostiamo cookie HTTP</strong>{" "}
          di profilazione, marketing o analytics. Utilizziamo esclusivamente{" "}
          <strong className="text-white">tecnologie tecniche/funzionali</strong> memorizzate sul
          dispositivo dell’utente (localStorage), necessarie o utili al corretto funzionamento
          dell’esperienza draft.
        </p>
        <p>
          Poiché tali tecnologie possono essere assimilate ai cookie ai fini informativi, le
          descriviamo con la stessa trasparenza prevista per i cookie tecnici.
        </p>
      </LegalSection>

      <LegalSection title="2. Elenco delle tecnologie">
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[560px] text-left text-xs">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Nome / chiave</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Finalità</th>
                <th className="px-4 py-3 font-semibold">Durata</th>
              </tr>
            </thead>
            <tbody>
              {LOCAL_STORAGE_ITEMS.map((item) => (
                <tr key={item.key} className="border-t border-white/8">
                  <td className="px-4 py-3 font-mono text-[11px] text-accent">{item.key}</td>
                  <td className="px-4 py-3 text-zinc-400">{item.type}</td>
                  <td className="px-4 py-3 text-zinc-400">{item.purpose}</td>
                  <td className="px-4 py-3 text-zinc-500">{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="3. Base giuridica e consenso">
        <p>
          Le tecnologie elencate sono utilizzate per erogare il servizio richiesto dall’utente e
          migliorare l’esperienza sul dispositivo. Non richiedono consenso preventivo quando
          rientrano tra quelle strettamente necessarie o funzionali, secondo la normativa applicabile.
        </p>
        <p>
          Qualora in futuro fossero introdotti cookie non tecnici (es. analytics, remarketing),
          verrà richiesto il consenso tramite apposito banner prima del loro deposito.
        </p>
      </LegalSection>

      <LegalSection title="4. Come gestire o disabilitare">
        <p>Puoi cancellare o bloccare i dati memorizzati localmente in qualsiasi momento:</p>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>
            dalle impostazioni del browser (cancellazione dati sito / localStorage / storage
            locale);
          </li>
          <li>
            utilizzando la modalità navigazione in incognito, che non conserva i dati al termine
            della sessione (salvo eccezioni del browser);
          </li>
          <li>
            disabilitando JavaScript o lo storage locale, con possibile impossibilità di usare
            correttamente la board del draft.
          </li>
        </ul>
        <p>
          Le istruzioni variano per browser (Chrome, Safari, Firefox, Edge). Consulta la sezione
          “Privacy” o “Sicurezza” del tuo browser per i dettagli.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookie di terze parti">
        <p>
          Aprendo link verso siti esterni (es. KataHero, Instagram) potresti ricevere cookie
          impostati da tali domini. Non controlliamo tali cookie: consulta le rispettive informative
          dei titolari terzi.
        </p>
      </LegalSection>

      <LegalSection title="6. Ulteriori informazioni">
        <p>
          Per maggiori dettagli sul trattamento dei dati personali consulta la{" "}
          <Link href="/privacy" className="text-accent underline-offset-2 hover:underline">
            Privacy Policy
          </Link>{" "}
          o scrivi a{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-accent underline-offset-2 hover:underline">
            {LEGAL.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
