/** WhatsApp per richieste card album — +39 327 459 7773 */
export const CARD_REQUEST_WHATSAPP = "393274597773";

export type CardRequestPackage = "card-overall" | "card-player-page";

export type CardRequestPayload = {
  package: CardRequestPackage;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  instagram?: string;
  position: string;
  positionCode: string;
  country: string;
  team: string;
  category: string;
  heightCm: string;
  weightKg?: string;
  birthYear: string;
  dominantHand?: string;
  strongPoint?: string;
  statAth: string;
  statSho: string;
  statPas: string;
  statDri: string;
  statDef: string;
  statPhy: string;
  seasonLabel?: string;
  seasonPoints?: string;
  seasonRebounds?: string;
  seasonAssists?: string;
  bioShort?: string;
  highlightsUrl?: string;
  pageSections?: string[];
  notes?: string;
  privacyAccepted: boolean;
  photoFileName?: string;
};

export const CARD_POSITIONS = [
  { value: "playmaker", label: "Playmaker", code: "PG" },
  { value: "guardia-shooting", label: "Guardia shooting", code: "SG" },
  { value: "ala-piccola", label: "Ala piccola", code: "SF" },
  { value: "ala-grande", label: "Ala grande", code: "PF" },
  { value: "centro", label: "Centro", code: "C" },
] as const;

export const CARD_CATEGORIES = [
  "NCAA",
  "Serie A",
  "Serie B",
  "Serie C",
  "Nazionale",
  "Giovanili",
  "Pro / estero",
  "Altro",
] as const;

export const DOMINANT_HANDS = ["Destro", "Sinistro", "Ambidestro"] as const;

export const PAGE_SECTION_OPTIONS = [
  { id: "gallery", label: "Gallery" },
  { id: "highlights", label: "Highlights" },
  { id: "stats", label: "Stats & stagione" },
  { id: "bio", label: "Bio & percorso" },
] as const;

export const CARD_STAT_FIELDS = [
  { key: "statAth", code: "ATH", label: "Attacco" },
  { key: "statSho", code: "SHO", label: "Tiro" },
  { key: "statPas", code: "PAS", label: "Passaggio" },
  { key: "statDri", code: "DRI", label: "Dribbling" },
  { key: "statDef", code: "DEF", label: "Difesa" },
  { key: "statPhy", code: "PHY", label: "Fisico" },
] as const;

export const CARD_STAT_SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export function formatCardRequestEmail(payload: CardRequestPayload): {
  subject: string;
  body: string;
} {
  const fullName = `${payload.firstName} ${payload.lastName}`.trim();
  const packageLabel =
    payload.package === "card-player-page"
      ? "Card Overall + Player Page (€9,99 base)"
      : "Solo Card Overall (€4,99)";

  const lines = [
    "RICHIESTA CARD KATAHERO — DraftKataHero Album",
    "==========================================",
    "",
    `Pacchetto: ${packageLabel}`,
    "",
    "--- CONTATTO ---",
    `Nome: ${fullName}`,
    `Email: ${payload.email}`,
    `Telefono: ${payload.phone}`,
    payload.instagram ? `Instagram: ${payload.instagram}` : null,
    "",
    "--- DATI PER LA CARD FIFA ---",
    `Nome in card: ${payload.firstName.toUpperCase()} / ${payload.lastName.toUpperCase()}`,
    `Ruolo: ${payload.position} (${payload.positionCode})`,
    `Nazionalità: ${payload.country}`,
    `Squadra / club: ${payload.team}`,
    `Categoria: ${payload.category}`,
    `Altezza: ${payload.heightCm} cm`,
    payload.weightKg ? `Peso: ${payload.weightKg} kg` : null,
    `Classe / anno: ${payload.birthYear}`,
    payload.dominantHand ? `Mano dominante: ${payload.dominantHand}` : null,
    payload.strongPoint ? `Punto di forza: ${payload.strongPoint}` : null,
    "",
    "--- AUTOVALUTAZIONE (scala 1–10) ---",
    "Overall e valori FIFA: calcolati da KataHero in base a queste valutazioni.",
    `ATH (attacco): ${payload.statAth}/10`,
    `SHO (tiro): ${payload.statSho}/10`,
    `PAS (passaggio): ${payload.statPas}/10`,
    `DRI (dribbling): ${payload.statDri}/10`,
    `DEF (difesa): ${payload.statDef}/10`,
    `PHY (fisico): ${payload.statPhy}/10`,
    "",
    payload.seasonLabel || payload.seasonPoints || payload.package === "card-player-page"
      ? "--- STAGIONE ---"
      : null,
    payload.seasonLabel ? `Stagione: ${payload.seasonLabel}` : null,
    payload.seasonPoints ? `Punti: ${payload.seasonPoints}` : null,
    payload.seasonRebounds ? `Rimbalzi: ${payload.seasonRebounds}` : null,
    payload.seasonAssists ? `Assist: ${payload.seasonAssists}` : null,
    "",
    payload.package === "card-player-page" ? "--- PLAYER PAGE ---" : null,
    payload.package === "card-player-page" && payload.pageSections?.length
      ? `Sezioni interesse (€9,99 cad.): ${payload.pageSections.join(", ")}`
      : null,
    payload.bioShort ? `Bio breve: ${payload.bioShort}` : null,
    payload.highlightsUrl ? `Link highlights: ${payload.highlightsUrl}` : null,
    "",
    "--- FOTO CARD ---",
    payload.photoFileName
      ? `File foto allegato dall'atleta: ${payload.photoFileName}`
      : "Foto: da allegare all'email",
    "",
    payload.notes ? `Note extra:\n${payload.notes}` : null,
    "",
    "---",
    "Inviato da form Album DraftKataHero",
  ].filter((line): line is string => line !== null);

  return {
    subject: `[Card Request] ${fullName} — ${packageLabel}`,
    body: lines.join("\n"),
  };
}

export function getCardRequestWhatsAppUrl(payload: CardRequestPayload): string {
  const { body } = formatCardRequestEmail(payload);
  return `https://wa.me/${CARD_REQUEST_WHATSAPP}?text=${encodeURIComponent(body)}`;
}
