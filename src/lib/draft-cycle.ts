/** Draft week ends Sunday at 23:59:59 (local time). Reset Monday 00:00. */

export function formatWeekKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Sunday this draft period is building toward. */
export function getPeriodEndSunday(now = new Date()): Date {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();

  if (day === 0) return d;

  d.setDate(d.getDate() + (7 - day));
  return d;
}

export function getCurrentPeriodWeekKey(now = new Date()): string {
  return formatWeekKey(getPeriodEndSunday(now));
}

export function formatWeekLabel(weekKey: string): string {
  const [y, m, d] = weekKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function createEmptySlots(): { slot: number; player: null }[] {
  return Array.from({ length: 40 }, (_, i) => ({
    slot: i + 1,
    player: null as null,
  }));
}
