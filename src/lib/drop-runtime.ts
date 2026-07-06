import { DEFAULT_ANNOUNCEMENT_MS, DROP_HOUR, SIMULATION_ANNOUNCEMENT_MS } from "@/lib/draft-config";

export type DropRuntime = {
  dropStart: Date;
  announcementMs: number;
};

export function getDropStartFromWeekKey(weekKey: string): Date {
  const [y, m, d] = weekKey.split("-").map(Number);
  return new Date(y, m - 1, d, DROP_HOUR, 0, 0, 0);
}

export function createProductionRuntime(weekKey: string): DropRuntime {
  return {
    dropStart: getDropStartFromWeekKey(weekKey),
    announcementMs: DEFAULT_ANNOUNCEMENT_MS,
  };
}

export function createSimulationRuntime(start = new Date()): DropRuntime {
  return {
    dropStart: start,
    announcementMs: SIMULATION_ANNOUNCEMENT_MS,
  };
}

export function resolveDropRuntime(
  weekKey: string,
  runtime?: Partial<DropRuntime>,
): DropRuntime {
  return {
    dropStart: runtime?.dropStart ?? getDropStartFromWeekKey(weekKey),
    announcementMs: runtime?.announcementMs ?? DEFAULT_ANNOUNCEMENT_MS,
  };
}
