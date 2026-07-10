"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CARD_CATEGORIES,
  CARD_POSITIONS,
  CARD_STAT_FIELDS,
  CARD_STAT_SCALE,
  DOMINANT_HANDS,
  getCardRequestWhatsAppUrl,
  PAGE_SECTION_OPTIONS,
  type CardRequestPackage,
  type CardRequestPayload,
} from "@/lib/card-request";

type CardRequestFormProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  package: CardRequestPackage;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  instagram: string;
  position: string;
  country: string;
  team: string;
  category: string;
  heightCm: string;
  weightKg: string;
  birthYear: string;
  dominantHand: string;
  strongPoint: string;
  statAth: string;
  statSho: string;
  statPas: string;
  statDri: string;
  statDef: string;
  statPhy: string;
  seasonLabel: string;
  seasonPoints: string;
  seasonRebounds: string;
  seasonAssists: string;
  bioShort: string;
  highlightsUrl: string;
  pageSections: string[];
  notes: string;
  privacyAccepted: boolean;
};

const INITIAL: FormState = {
  package: "card-overall",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  instagram: "",
  position: CARD_POSITIONS[2].value,
  country: "Italia",
  team: "",
  category: "Serie B",
  heightCm: "",
  weightKg: "",
  birthYear: "",
  dominantHand: "",
  strongPoint: "",
  statAth: "",
  statSho: "",
  statPas: "",
  statDri: "",
  statDef: "",
  statPhy: "",
  seasonLabel: "",
  seasonPoints: "",
  seasonRebounds: "",
  seasonAssists: "",
  bioShort: "",
  highlightsUrl: "",
  pageSections: [],
  notes: "",
  privacyAccepted: false,
};

function FieldLabel({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="card-form__label">
      {children}
      {required ? <span className="text-accent"> *</span> : null}
      {hint ? <span className="card-form__hint">{hint}</span> : null}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`card-form__input ${props.className ?? ""}`} />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`card-form__textarea ${props.className ?? ""}`} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`card-form__select ${props.className ?? ""}`} />;
}

export default function CardRequestForm({ open, onClose }: CardRequestFormProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!photo) {
      setPhotoPreview(null);
      return;
    }
    const url = URL.createObjectURL(photo);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const patch = useCallback((partial: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleSection = (id: string) => {
    setForm((prev) => ({
      ...prev,
      pageSections: prev.pageSections.includes(id)
        ? prev.pageSections.filter((s) => s !== id)
        : [...prev.pageSections, id],
    }));
  };

  function validate(): string | null {
    if (!form.firstName.trim() || !form.lastName.trim()) return "Inserisci nome e cognome.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Inserisci un'email valida.";
    if (!form.phone.trim()) return "Inserisci un numero di telefono.";
    if (!form.team.trim()) return "Inserisci squadra o club.";
    if (!form.heightCm.trim()) return "Inserisci l'altezza in cm.";
    if (!form.birthYear.trim()) return "Inserisci anno di nascita / classe.";
    if (!photo) return "Allega la foto per la card (ritratto o mezzo busto).";
    if (photo.size > 10 * 1024 * 1024) return "La foto deve essere sotto i 10 MB.";

    const stats = [form.statAth, form.statSho, form.statPas, form.statDri, form.statDef, form.statPhy];
    for (const stat of stats) {
      if (!stat.trim()) return "Valuta tutte e 6 le abilità da 1 a 10.";
      const n = Number(stat);
      if (!Number.isInteger(n) || n < 1 || n > 10) return "Ogni valutazione deve essere un numero da 1 a 10.";
    }

    if (form.package === "card-player-page") {
      if (!form.seasonLabel.trim()) return "Inserisci la stagione (obbligatoria per Card + Player Page).";
      if (!form.seasonPoints.trim()) return "Inserisci i punti medi di stagione.";
      if (!form.seasonRebounds.trim()) return "Inserisci i rimbalzi medi di stagione.";
      if (!form.seasonAssists.trim()) return "Inserisci gli assist medi di stagione.";
    }

    if (!form.privacyAccepted) return "Accetta l'informativa privacy per inviare la richiesta.";
    return null;
  }

  function buildPayload(): CardRequestPayload {
    const positionMeta = CARD_POSITIONS.find((p) => p.value === form.position) ?? CARD_POSITIONS[2];
    return {
      package: form.package,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      instagram: form.instagram.trim() || undefined,
      position: positionMeta.label,
      positionCode: positionMeta.code,
      country: form.country.trim(),
      team: form.team.trim(),
      category: form.category,
      heightCm: form.heightCm.trim(),
      weightKg: form.weightKg.trim() || undefined,
      birthYear: form.birthYear.trim(),
      dominantHand: form.dominantHand || undefined,
      strongPoint: form.strongPoint.trim() || undefined,
      statAth: form.statAth.trim(),
      statSho: form.statSho.trim(),
      statPas: form.statPas.trim(),
      statDri: form.statDri.trim(),
      statDef: form.statDef.trim(),
      statPhy: form.statPhy.trim(),
      seasonLabel: form.seasonLabel.trim() || undefined,
      seasonPoints: form.seasonPoints.trim() || undefined,
      seasonRebounds: form.seasonRebounds.trim() || undefined,
      seasonAssists: form.seasonAssists.trim() || undefined,
      bioShort: form.bioShort.trim() || undefined,
      highlightsUrl: form.highlightsUrl.trim() || undefined,
      pageSections:
        form.package === "card-player-page" && form.pageSections.length
          ? form.pageSections
          : undefined,
      notes: form.notes.trim() || undefined,
      privacyAccepted: form.privacyAccepted,
      photoFileName: photo?.name,
    };
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = buildPayload();

    try {
      const data = new FormData();
      data.append("payload", JSON.stringify(payload));
      if (photo) data.append("photo", photo);
      await fetch("/api/card-request", { method: "POST", body: data });
    } catch {
      /* WhatsApp fallback sotto */
    }

    const whatsappUrl = getCardRequestWhatsAppUrl(payload);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  function handleReset() {
    setForm(INITIAL);
    setPhoto(null);
    setSent(false);
    setError(null);
    onClose();
  }

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="card-form-overlay fixed inset-0 z-9999 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-request-title"
    >
      <button
        type="button"
        className="card-form-overlay__backdrop absolute inset-0 bg-black/85"
        aria-label="Chiudi"
        onClick={onClose}
      />

      <div className="card-form-modal relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-zinc-950 shadow-2xl sm:rounded-2xl">
        <header className="card-form-modal__head shrink-0 border-b border-white/8 px-4 py-4 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
            Richiesta card
          </p>
          <h2 id="card-request-title" className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
            Dati per la tua Overall
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Compila tutto con cura: useremo questi dati per creare la tua player card.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="card-form-modal__close absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-lg text-white"
            aria-label="Chiudi form"
          >
            ×
          </button>
        </header>

        {sent ? (
          <div className="card-form-success flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-8 sm:px-6">
            <p className="font-display text-lg font-bold text-white">Richiesta pronta!</p>
            <p className="text-sm leading-relaxed text-zinc-400">
              Si è aperto WhatsApp con tutti i dati compilati.{" "}
              <strong className="text-zinc-200">Allega la foto</strong> ({photo?.name}) al messaggio
              e invia al <strong className="text-zinc-200">327 459 7773</strong>. Ti risponderemo con
              il giorno di uscita nell&apos;album.
            </p>
            <button type="button" onClick={handleReset} className="btn-accent mt-2 rounded-full px-5 py-2.5 text-sm font-semibold">
              Chiudi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-form flex flex-1 flex-col overflow-hidden">
            <div className="card-form__body flex-1 overflow-y-auto px-4 py-4 sm:px-6">
              {error ? (
                <p className="card-form__error mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </p>
              ) : null}

              <fieldset className="card-form__section">
                <legend className="card-form__legend">1 · Pacchetto</legend>
                <div className="card-form__package-grid">
                  <label className={`card-form__package ${form.package === "card-overall" ? "card-form__package--active" : ""}`}>
                    <input
                      type="radio"
                      name="package"
                      value="card-overall"
                      checked={form.package === "card-overall"}
                      onChange={() => patch({ package: "card-overall" })}
                    />
                    <span className="card-form__package-title">Card Overall</span>
                    <span className="card-form__package-price">€4,99</span>
                    <span className="card-form__package-desc">Solo PNG HD — nessuna player page</span>
                  </label>
                  <label className={`card-form__package ${form.package === "card-player-page" ? "card-form__package--active" : ""}`}>
                    <input
                      type="radio"
                      name="package"
                      value="card-player-page"
                      checked={form.package === "card-player-page"}
                      onChange={() => patch({ package: "card-player-page" })}
                    />
                    <span className="card-form__package-title">Card + Player Page</span>
                    <span className="card-form__package-price">€9,99</span>
                    <span className="card-form__package-desc">Card + profilo base su KataHero</span>
                  </label>
                </div>
              </fieldset>

              <fieldset className="card-form__section">
                <legend className="card-form__legend">2 · Contatti</legend>
                <div className="card-form__grid card-form__grid--2">
                  <div>
                    <FieldLabel htmlFor="firstName" required>Nome</FieldLabel>
                    <TextInput id="firstName" required value={form.firstName} onChange={(e) => patch({ firstName: e.target.value })} placeholder="Jason" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="lastName" required>Cognome</FieldLabel>
                    <TextInput id="lastName" required value={form.lastName} onChange={(e) => patch({ lastName: e.target.value })} placeholder="Taylor" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="email" required>Email</FieldLabel>
                    <TextInput id="email" type="email" required value={form.email} onChange={(e) => patch({ email: e.target.value })} placeholder="tu@email.com" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="phone" required>Telefono / WhatsApp</FieldLabel>
                    <TextInput id="phone" type="tel" required value={form.phone} onChange={(e) => patch({ phone: e.target.value })} placeholder="+39 333 0000000" />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel htmlFor="instagram" hint="opzionale">Instagram</FieldLabel>
                    <TextInput id="instagram" value={form.instagram} onChange={(e) => patch({ instagram: e.target.value })} placeholder="@tuousername" />
                  </div>
                </div>
              </fieldset>

              <fieldset className="card-form__section">
                <legend className="card-form__legend">3 · Dati atleta (sulla card)</legend>
                <div className="card-form__grid card-form__grid--2">
                  <div>
                    <FieldLabel htmlFor="position" required>Ruolo</FieldLabel>
                    <Select id="position" value={form.position} onChange={(e) => patch({ position: e.target.value })}>
                      {CARD_POSITIONS.map((p) => (
                        <option key={p.value} value={p.value}>{p.label} ({p.code})</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <FieldLabel htmlFor="category" required>Categoria</FieldLabel>
                    <Select id="category" value={form.category} onChange={(e) => patch({ category: e.target.value })}>
                      {CARD_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <FieldLabel htmlFor="team" required>Squadra / club / scuola</FieldLabel>
                    <TextInput id="team" required value={form.team} onChange={(e) => patch({ team: e.target.value })} placeholder="UCC Piacenza" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="country" required>Nazionalità</FieldLabel>
                    <TextInput id="country" required value={form.country} onChange={(e) => patch({ country: e.target.value })} placeholder="Italia" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="heightCm" required>Altezza (cm)</FieldLabel>
                    <TextInput id="heightCm" inputMode="numeric" required value={form.heightCm} onChange={(e) => patch({ heightCm: e.target.value })} placeholder="198" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="weightKg" hint="opzionale">Peso (kg)</FieldLabel>
                    <TextInput id="weightKg" inputMode="numeric" value={form.weightKg} onChange={(e) => patch({ weightKg: e.target.value })} placeholder="92" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="birthYear" required>Classe / anno nascita</FieldLabel>
                    <TextInput id="birthYear" required value={form.birthYear} onChange={(e) => patch({ birthYear: e.target.value })} placeholder="2003" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="dominantHand" hint="opzionale">Mano dominante</FieldLabel>
                    <Select id="dominantHand" value={form.dominantHand} onChange={(e) => patch({ dominantHand: e.target.value })}>
                      <option value="">—</option>
                      {DOMINANT_HANDS.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel htmlFor="strongPoint" hint="opzionale">Punto di forza</FieldLabel>
                    <TextInput id="strongPoint" value={form.strongPoint} onChange={(e) => patch({ strongPoint: e.target.value })} placeholder="Tiro da tre, difesa..." />
                  </div>
                </div>
              </fieldset>

              <fieldset className="card-form__section">
                <legend className="card-form__legend">4 · Autovalutazione (1–10)</legend>
                <p className="card-form__section-note">
                  Valuta le tue abilità da 1 (basso) a 10 (eccellente). Noi calcoleremo overall e statistiche FIFA
                  sulla card.
                </p>
                <div className="card-form__stats-grid">
                  {CARD_STAT_FIELDS.map(({ key, code, label }) => (
                    <div key={key}>
                      <FieldLabel htmlFor={key} required>
                        {code} · {label}
                      </FieldLabel>
                      <Select
                        id={key}
                        required
                        value={form[key]}
                        onChange={(e) => patch({ [key]: e.target.value })}
                      >
                        <option value="">—</option>
                        {CARD_STAT_SCALE.map((n) => (
                          <option key={n} value={String(n)}>
                            {n}
                          </option>
                        ))}
                      </Select>
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset className="card-form__section">
                <legend className="card-form__legend">5 · Foto per la card</legend>
                <p className="card-form__section-note">
                  Ritratto o mezzo busto, buona luce, sfondo neutro. JPG o PNG, max 10 MB.
                </p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  required
                  className="card-form__file"
                  onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                />
                {photoPreview ? (
                  <div className="card-form__photo-preview">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoPreview} alt="Anteprima foto card" />
                  </div>
                ) : null}
              </fieldset>

              <fieldset className="card-form__section">
                <legend className="card-form__legend">
                  6 · Stagione{form.package === "card-player-page" ? "" : " (opzionale)"}
                </legend>
                {form.package === "card-player-page" ? (
                  <p className="card-form__section-note">
                    Obbligatoria per Card + Player Page — servono per la sezione stats del profilo.
                  </p>
                ) : null}
                <div className="card-form__grid card-form__grid--2">
                  <div>
                    <FieldLabel htmlFor="seasonLabel" required={form.package === "card-player-page"}>
                      Stagione
                    </FieldLabel>
                    <TextInput
                      id="seasonLabel"
                      required={form.package === "card-player-page"}
                      value={form.seasonLabel}
                      onChange={(e) => patch({ seasonLabel: e.target.value })}
                      placeholder="2025/26"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="seasonPoints" required={form.package === "card-player-page"}>
                      Punti medi
                    </FieldLabel>
                    <TextInput
                      id="seasonPoints"
                      required={form.package === "card-player-page"}
                      value={form.seasonPoints}
                      onChange={(e) => patch({ seasonPoints: e.target.value })}
                      placeholder="18.4"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="seasonRebounds" required={form.package === "card-player-page"}>
                      Rimbalzi medi
                    </FieldLabel>
                    <TextInput
                      id="seasonRebounds"
                      required={form.package === "card-player-page"}
                      value={form.seasonRebounds}
                      onChange={(e) => patch({ seasonRebounds: e.target.value })}
                      placeholder="6.2"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="seasonAssists" required={form.package === "card-player-page"}>
                      Assist medi
                    </FieldLabel>
                    <TextInput
                      id="seasonAssists"
                      required={form.package === "card-player-page"}
                      value={form.seasonAssists}
                      onChange={(e) => patch({ seasonAssists: e.target.value })}
                      placeholder="3.1"
                    />
                  </div>
                </div>
              </fieldset>

              {form.package === "card-player-page" ? (
                <fieldset className="card-form__section">
                  <legend className="card-form__legend">7 · Player page (opzionale ora)</legend>
                  <p className="card-form__section-note">
                    Indica le sezioni che ti interessano (€9,99 cad. dopo l&apos;uscita). Puoi attivarle in seguito dal negozio.
                  </p>
                  <div className="card-form__checks">
                    {PAGE_SECTION_OPTIONS.map((opt) => (
                      <label key={opt.id} className="card-form__check">
                        <input
                          type="checkbox"
                          checked={form.pageSections.includes(opt.id)}
                          onChange={() => toggleSection(opt.id)}
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <FieldLabel htmlFor="bioShort">Bio breve (per la page)</FieldLabel>
                    <TextArea id="bioShort" rows={3} value={form.bioShort} onChange={(e) => patch({ bioShort: e.target.value })} placeholder="Chi sei, obiettivi, percorso..." />
                  </div>
                  <div className="mt-3">
                    <FieldLabel htmlFor="highlightsUrl">Link highlights (YouTube, Drive…)</FieldLabel>
                    <TextInput id="highlightsUrl" type="url" value={form.highlightsUrl} onChange={(e) => patch({ highlightsUrl: e.target.value })} placeholder="https://" />
                  </div>
                </fieldset>
              ) : null}

              <fieldset className="card-form__section">
                <legend className="card-form__legend">Note extra</legend>
                <TextArea id="notes" rows={3} value={form.notes} onChange={(e) => patch({ notes: e.target.value })} placeholder="Altre info utili per creare la card..." />
              </fieldset>

              <label className="card-form__privacy">
                <input
                  type="checkbox"
                  checked={form.privacyAccepted}
                  onChange={(e) => patch({ privacyAccepted: e.target.checked })}
                />
                <span>
                  Ho letto l&apos;{" "}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    informativa privacy
                  </a>{" "}
                  e acconsento al trattamento dei dati per la richiesta card.
                </span>
              </label>
            </div>

            <footer className="card-form__footer shrink-0 border-t border-white/8 px-4 py-4 sm:px-6">
              <button type="submit" className="btn-accent w-full rounded-full px-5 py-3 text-sm font-semibold">
                Invia richiesta con foto →
              </button>
              <p className="mt-2 text-center text-[10px] text-zinc-600">
                Si aprirà WhatsApp — allega la foto selezionata e invia al 327 459 7773
              </p>
            </footer>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
