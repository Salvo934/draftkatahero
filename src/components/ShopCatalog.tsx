"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  getShopCheckoutUrl,
  SHOP_EXTRAS,
  SHOP_PAGE_SECTIONS,
  SHOP_PLANS,
  type ShopExtra,
  type ShopPageSection,
  type ShopPlan,
} from "@/lib/shop";

const EXAMPLE_CARD_IMAGE = "/players/example-overall-card.png";

function CheckIcon({ included }: { included: boolean }) {
  if (included) {
    return (
      <svg className="shop-check shop-check--yes" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6.5 10.2 8.8 12.5 13.5 7.8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className="shop-check shop-check--no" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M7 7 13 13M13 7 7 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

function ExampleCardPreview({
  variant,
  size = "plan",
}: {
  variant: "silver" | "gold";
  size?: "hero" | "plan";
}) {
  return (
    <div
      className={`shop-card-preview shop-card-preview--${variant} shop-card-preview--${size}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={EXAMPLE_CARD_IMAGE}
        alt="Esempio card Overall KataHero — Jason Taylor, rating 79"
        className="shop-card-preview__img"
        decoding="async"
      />
      {variant === "gold" ? (
        <span className="shop-card-preview__page-badge">+ Player Page</span>
      ) : null}
      <span className="shop-card-preview__caption">Esempio reale · Overall 79</span>
    </div>
  );
}

function PlanCard({ plan, playerSlug }: { plan: ShopPlan; playerSlug?: string }) {
  const checkoutUrl = getShopCheckoutUrl(plan.id, playerSlug);

  return (
    <article
      className={`shop-plan shop-plan--${plan.accent} ${plan.recommended ? "shop-plan--featured" : ""}`}
    >
      {plan.badge ? <span className="shop-plan__badge">{plan.badge}</span> : null}

      <div className="shop-plan__visual">
        <ExampleCardPreview variant={plan.accent} size="plan" />
      </div>

      <div className="shop-plan__head">
        <p className="shop-plan__tier">{plan.recommended ? "Pacchetto completo" : "Solo card"}</p>
        <h2 className="shop-plan__name">{plan.name}</h2>
        <p className="shop-plan__tagline">{plan.tagline}</p>
      </div>

      <ul className="shop-plan__features">
        {plan.features.map((feature) => (
          <li
            key={feature.label}
            className={`shop-plan__feature ${feature.included ? "shop-plan__feature--yes" : "shop-plan__feature--no"}`}
          >
            <CheckIcon included={feature.included} />
            <span>
              <strong>{feature.label}</strong>
              {feature.detail ? <em>{feature.detail}</em> : null}
            </span>
          </li>
        ))}
      </ul>

      <div className="shop-plan__footer">
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shop-plan__cta"
        >
          <span className="shop-plan__cta-label">{plan.cta}</span>
          <span className="shop-plan__cta-price">{plan.price}</span>
        </a>
      </div>
    </article>
  );
}

function PageSectionCard({
  section,
  playerSlug,
}: {
  section: ShopPageSection;
  playerSlug?: string;
}) {
  const checkoutUrl = getShopCheckoutUrl(section.id, playerSlug);

  return (
    <article className="shop-section">
      <div className="shop-section__top">
        <span className="shop-section__icon" aria-hidden>
          {section.icon}
        </span>
        <div className="shop-section__copy">
          <h3 className="shop-section__name">{section.name}</h3>
          <p className="shop-section__desc">{section.description}</p>
        </div>
      </div>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shop-section__cta"
      >
        <span className="shop-section__cta-label">{section.cta}</span>
        <span className="shop-section__cta-price">{section.price}</span>
      </a>
    </article>
  );
}

function ExtraCard({ extra, playerSlug }: { extra: ShopExtra; playerSlug?: string }) {
  const checkoutUrl = getShopCheckoutUrl(extra.id, playerSlug);

  return (
    <article className="shop-extra">
      {extra.tag ? <span className="shop-extra__tag">{extra.tag}</span> : null}

      <div className="shop-extra__top">
        <span className="shop-extra__icon" aria-hidden>
          {extra.icon}
        </span>
        <div className="shop-extra__copy">
          <h3 className="shop-extra__name">{extra.name}</h3>
          <p className="shop-extra__desc">{extra.description}</p>
        </div>
      </div>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shop-extra__cta"
      >
        <span className="shop-extra__cta-label">{extra.cta}</span>
        <span className="shop-extra__cta-price">
          {extra.price}
          {extra.priceNote ? (
            <small className="shop-extra__cta-unit"> {extra.priceNote}</small>
          ) : null}
        </span>
      </a>
    </article>
  );
}

export default function ShopCatalog() {
  const searchParams = useSearchParams();
  const playerSlug = searchParams.get("player")?.trim() || undefined;

  return (
    <div className="shop-store">
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="shop-hero">
          <p className="shop-hero__label">Negozio · KataHero</p>
          <h1 className="shop-hero__title">
            La tua <span>Player Card</span>
          </h1>
          <p className="shop-hero__sub">
            Sei un cestista? Scegli come presentarti: solo la card Overall da scaricare, oppure
            card + player page con link personale su KataHero.
          </p>
        </header>

        <div className="shop-showcase">
          <div className="shop-showcase__glow" aria-hidden />
          <ExampleCardPreview variant="silver" size="hero" />
          <div className="shop-showcase__copy">
            <p className="shop-showcase__label">Anteprima card</p>
            <h2 className="shop-showcase__title">La tua Overall, così</h2>
            <p className="shop-showcase__text">
              Stile FIFA Ultimate Team: rating, posizione, stats e foto — pronta da scaricare in HD
              e postare sui social. Con €9,99 ottieni card + player page base; ogni sezione (gallery,
              highlights…) si aggiunge a €9,99.
            </p>
          </div>
        </div>

        <div className="shop-explainer">
          <div className="shop-explainer__block">
            <span className="shop-explainer__icon shop-explainer__icon--silver" aria-hidden>
              🃏
            </span>
            <div>
              <h2 className="shop-explainer__title">€4,99 · Card Overall</h2>
              <p>
                Ricevi la tua card FIFA in HD, pronta da scaricare e postare su Instagram, TikTok
                o WhatsApp. <strong>Nessuna player page</strong> — solo il file della card.
              </p>
            </div>
          </div>

          <div className="shop-explainer__vs" aria-hidden>
            VS
          </div>

          <div className="shop-explainer__block shop-explainer__block--gold">
            <span className="shop-explainer__icon shop-explainer__icon--gold" aria-hidden>
              ⭐
            </span>
            <div>
              <h2 className="shop-explainer__title">€9,99 · Card + Player Page</h2>
              <p>
                Tutto della card da €4,99, più la <strong>player page base</strong> con link
                personale. Ogni sezione premium — gallery, highlights, stats — costa{" "}
                <strong>€9,99 a sezione</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="shop-plans">
          {SHOP_PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} playerSlug={playerSlug} />
          ))}
        </div>

        <section className="shop-sections">
          <header className="shop-sections__header">
            <p className="shop-sections__label">Player Page</p>
            <h2 className="shop-sections__title">Sezioni a €9,99</h2>
            <p className="shop-sections__sub">
              Per chi sceglie <strong>Card + Player Page</strong>: attiva le sezioni che vuoi sulla
              tua pagina atleta. Ogni modulo — gallery, highlights, stats, bio — costa €9,99.
            </p>
          </header>

          <div className="shop-sections__grid">
            {SHOP_PAGE_SECTIONS.map((section) => (
              <PageSectionCard key={section.id} section={section} playerSlug={playerSlug} />
            ))}
          </div>
        </section>

        <section className="shop-extras">
          <header className="shop-extras__header">
            <p className="shop-extras__label">Add-on card</p>
            <h2 className="shop-extras__title">Extra & Upgrade</h2>
            <p className="shop-extras__sub">
              Potenzia la tua card con boost, nuovo design, punti Overall e skin premium.
            </p>
          </header>

          <div className="shop-extras__grid">
            {SHOP_EXTRAS.map((extra) => (
              <ExtraCard key={extra.id} extra={extra} playerSlug={playerSlug} />
            ))}
          </div>
        </section>

        <div className="shop-compare">
          <h2 className="shop-compare__title">Confronto rapido</h2>
          <div className="shop-compare__table-wrap">
            <table className="shop-compare__table">
              <thead>
                <tr>
                  <th scope="col">Cosa include</th>
                  <th scope="col">Card €4,99</th>
                  <th scope="col">Pro €9,99</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Card Overall scaricabile (HD)</td>
                  <td aria-label="Incluso">✓</td>
                  <td aria-label="Incluso">✓</td>
                </tr>
                <tr>
                  <td>File PNG per social</td>
                  <td aria-label="Incluso">✓</td>
                  <td aria-label="Incluso">✓</td>
                </tr>
                <tr>
                  <td>Player page base + link</td>
                  <td aria-label="Non incluso">—</td>
                  <td aria-label="Incluso">✓</td>
                </tr>
                <tr>
                  <td>Gallery / Highlights / Stats</td>
                  <td aria-label="Non incluso">—</td>
                  <td aria-label="Extra a pagamento">€9,99 cad.</td>
                </tr>
                <tr>
                  <td>Profilo su katahero.com</td>
                  <td aria-label="Non incluso">—</td>
                  <td aria-label="Incluso">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {playerSlug ? (
          <p className="shop-draft-note">
            Checkout collegato al profilo draft{" "}
            <code>draft:{playerSlug}</code>
          </p>
        ) : null}

        <footer className="shop-footer">
          <p>
            Pagamenti sicuri con Stripe. Dopo l&apos;acquisto ricevi istruzioni via email entro 48h
            lavorative. Domande?{" "}
            <Link href="/pagamenti">Pagamenti & assistenza</Link>.
          </p>
        </footer>
      </section>
    </div>
  );
}
