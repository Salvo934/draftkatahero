import {
  ANNOUNCEMENT_MS,
  DROP_HOUR,
  REVEAL_INTERVAL_MS,
  SIMULATION_ANNOUNCEMENT_MS,
  SIMULATION_REVEAL_INTERVAL_MS,
} from "@/lib/draft-config";

export type DropRuntime = {
  dropStart: Date;
  revealIntervalMs: number;
  announcementMs: number;
};

export function getDropStartFromWeekKey(weekKey: string): Date {
  const [y, m, d] = weekKey.split("-").map(Number);
  return new Date(y, m - 1, d, DROP_HOUR, 0, 0, 0);
}

export function createProductionRuntime(weekKey: string): DropRuntime {
  return {
    dropStart: getDropStartFromWeekKey(weekKey),
    revealIntervalMs: REVEAL_INTERVAL_MS,
    announcementMs: ANNOUNCEMENT_MS,
  };
}

export function createSimulationRuntime(start = new Date()): DropRuntime {
  return {
    dropStart: start,
    revealIntervalMs: SIMULATION_REVEAL_INTERVAL_MS,
    announcementMs: SIMULATION_ANNOUNCEMENT_MS,
  };
}

export function resolveDropRuntime(
  weekKey: string,
  runtime?: Partial<DropRuntime>,
): DropRuntime {
  return {
    dropStart: runtime?.dropStart ?? getDropStartFromWeekKey(weekKey),
    revealIntervalMs: runtime?.revealIntervalMs ?? REVEAL_INTERVAL_MS,
    announcementMs: runtime?.announcementMs ?? ANNOUNCEMENT_MS,
  };
}
