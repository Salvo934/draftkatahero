/** Next Sunday at 21:00 (Italy / Europe-Rome evening drop). */
export function getNextSundayDrop(): Date {
  const now = new Date();
  const target = new Date(now);

  const day = now.getDay();
  const daysUntilSunday = day === 0 ? (now.getHours() >= 21 ? 7 : 0) : 7 - day;

  target.setDate(now.getDate() + daysUntilSunday);
  target.setHours(21, 0, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }

  return target;
}

export function getTimeRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());

  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function isDropLive(): boolean {
  const now = new Date();
  const isSunday = now.getDay() === 0;
  const hour = now.getHours();
  return isSunday && hour >= 21 && hour < 23;
}

export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
