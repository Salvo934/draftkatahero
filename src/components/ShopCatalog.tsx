"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import type { PlayerProfile } from "@/data/players";
import { overallAlbumSeed } from "@/data/players";
import { loadDraftBoardState } from "@/lib/draft-board";
import {
  getShopCheckoutUrl,
  getFeaturedShopProducts,
  getShopProductsByCategory,
  SHOP_CATEGORIES,
  SHOP_RARITY_LABELS,
  type ShopCategoryId,
  type ShopProduct,
  type ShopRarity,
} from "@/lib/shop";

function collectShopPlayers(): PlayerProfile[] {
  const board = loadDraftBoardState();
  const seen = new Set<string>();
  const players: PlayerProfile[] = [];

  for (const source of [
    ...overallAlbumSeed.map((e) => e.player),
    ...board.pickedSlots.map((s) => s.player),
    ...board.discoverSlots.map((s) => s.player),
  ]) {
    if (!source?.slug || !source.cardImage || seen.has(source.slug)) continue;
    seen.add(source.slug);
    players.push(source);
  }

  return players.sort((a, b) => a.name.localeCompare(b.name, "it"));
}

function ShopItemTile({
  product,
  playerSlug,
  size = "default",
}: {
  product: ShopProduct;
  playerSlug?: string;
  size?: "default" | "wide";
}) {
  const checkoutUrl = getShopCheckoutUrl(product.id, playerSlug);
  const canPurchase = Boolean(playerSlug);

  return (
    <article
      className={`shop-item shop-item--${product.rarity} ${size === "wide" ? "shop-item--wide" : ""}`}
    >
      <div className="shop-item__glow" aria-hidden />

      {product.badge ? (
        <span className="shop-item__badge">{product.badge}</span>
      ) : null}

      <div className="shop-item__body">
        <span className="shop-item__icon" aria-hidden>
          {product.icon}
        </span>
        <p className="shop-item__rarity">{SHOP_RARITY_LABELS[product.rarity]}</p>
        <h3 className="shop-item__name">{product.name}</h3>
        {product.highlight ? (
          <p className="shop-item__highlight">{product.highlight}</p>
        ) : null}
        <p className="shop-item__desc">{product.description}</p>
      </div>

      <div className="shop-item__footer">
        <div className="shop-item__price">
          {product.comparePrice ? (
            <span className="shop-item__compare">{product.comparePrice}</span>
          ) : null}
          <span className="shop-item__amount">{product.price}</span>
          {product.pricePeriod ? (
            <span className="shop-item__period">{product.pricePeriod}</span>
          ) : null}
        </div>

        {canPurchase ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shop-item__buy"
          >
            Acquista
          </a>
        ) : (
          <span className="shop-item__buy shop-item__buy--disabled">Seleziona atleta</span>
        )}
      </div>
    </article>
  );
}

function CategorySection({
  categoryId,
  playerSlug,
}: {
  categoryId: ShopCategoryId;
  playerSlug?: string;
}) {
  const category = SHOP_CATEGORIES.find((entry) => entry.id === categoryId)!;
  const products = getShopProductsByCategory(categoryId).filter((p) => !p.featured);

  return (
    <section className="shop-section" style={{ "--shop-cat-color": category.color } as CSSProperties}>
      <header className="shop-section__header">
        <div className="shop-section__bar" aria-hidden />
        <div>
          <h2 className="shop-section__title">{category.label}</h2>
          <p className="shop-section__tagline">{category.tagline}</p>
        </div>
      </header>

      <div className="shop-grid">
        {products.map((product) => (
          <ShopItemTile key={product.id} product={product} playerSlug={playerSlug} />
        ))}
      </div>
    </section>
  );
}

export default function ShopCatalog() {
  const searchParams = useSearchParams();
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [activeTab, setActiveTab] = useState<ShopCategoryId | "featured">("featured");

  useEffect(() => {
    const sync = () => setPlayers(collectShopPlayers());
    sync();
    const id = setInterval(sync, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fromQuery = searchParams.get("player")?.trim();
    if (fromQuery && players.some((p) => p.slug === fromQuery)) {
      setSelectedSlug(fromQuery);
      return;
    }
    if (players.length === 1) {
      setSelectedSlug(players[0].slug);
    }
  }, [players, searchParams]);

  const selectedPlayer = useMemo(
    () => players.find((player) => player.slug === selectedSlug),
    [players, selectedSlug],
  );

  const featured = getFeaturedShopProducts();
  const playerSlug = selectedSlug || undefined;

  return (
    <div className="shop-fortnite">
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="shop-hero">
          <div className="shop-hero__label">Item Shop · KataHero</div>
          <h1 className="shop-hero__title">
            NEGOZIO <span>CARD</span>
          </h1>
          <p className="shop-hero__sub">
            Stile Fortnite — potenzia la tua player card, spingi l&apos;Overall, attiva booster e
            sblocca estetica premium.
          </p>
        </header>

        <div className="shop-player-panel">
          <label htmlFor="shop-player" className="shop-player-panel__label">
            Il tuo loadout
          </label>
          {players.length > 0 ? (
            <>
              <select
                id="shop-player"
                value={selectedSlug}
                onChange={(event) => setSelectedSlug(event.target.value)}
                className="shop-player-panel__select"
              >
                <option value="">— Seleziona atleta —</option>
                {players.map((player) => (
                  <option key={player.slug} value={player.slug}>
                    {player.name} · {player.position}
                  </option>
                ))}
              </select>
              {selectedPlayer ? (
                <p className="shop-player-panel__meta">
                  Checkout per <strong>{selectedPlayer.name}</strong>
                  <code>draft:{selectedPlayer.slug}</code>
                </p>
              ) : (
                <p className="shop-player-panel__hint">Seleziona il profilo per sbloccare gli acquisti.</p>
              )}
            </>
          ) : (
            <p className="shop-player-panel__hint">
              Nessuna card in roster. Se sei stato scelto al draft, comparirai qui automaticamente.
            </p>
          )}
        </div>

        <nav className="shop-tabs" aria-label="Categorie negozio">
          <button
            type="button"
            className={`shop-tabs__btn ${activeTab === "featured" ? "shop-tabs__btn--active" : ""}`}
            onClick={() => setActiveTab("featured")}
          >
            In evidenza
          </button>
          {SHOP_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`shop-tabs__btn ${activeTab === cat.id ? "shop-tabs__btn--active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
              style={{ "--shop-tab-color": cat.color } as CSSProperties}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {activeTab === "featured" ? (
          <>
            <section className="shop-section shop-section--featured">
              <header className="shop-section__header">
                <div className="shop-section__bar shop-section__bar--gold" aria-hidden />
                <div>
                  <h2 className="shop-section__title">Featured · Oggi nel negozio</h2>
                  <p className="shop-section__tagline">I pezzi forti — massimo impatto, un solo click</p>
                </div>
              </header>
              <div className="shop-grid shop-grid--featured">
                {featured.map((product) => (
                  <ShopItemTile
                    key={product.id}
                    product={product}
                    playerSlug={playerSlug}
                    size="wide"
                  />
                ))}
              </div>
            </section>

            {SHOP_CATEGORIES.map((cat) => (
              <CategorySection key={cat.id} categoryId={cat.id} playerSlug={playerSlug} />
            ))}
          </>
        ) : (
          <CategorySection categoryId={activeTab} playerSlug={playerSlug} />
        )}

        <footer className="shop-footer">
          <p>
            Pagamenti sicuri con Stripe. Gli upgrade vengono applicati al profilo entro 48h lavorative.
            Assistenza su{" "}
            <Link href="/pagamenti">Pagamenti</Link>.
          </p>
        </footer>
      </section>
    </div>
  );
}
