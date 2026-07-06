import { PICK_ANNOUNCEMENT_AUDIO } from "@/lib/draft-announcement";

let sharedAudio: HTMLAudioElement | null = null;

function getSharedAudio(): HTMLAudioElement {
  if (typeof window === "undefined") {
    throw new Error("Audio is only available in the browser");
  }
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.preload = "auto";
  }
  return sharedAudio;
}

const SILENT_WAV =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

/** Sblocca l'audio sul gesto utente (tap su Simula drop) — necessario su iOS */
export function unlockPickAudio(): void {
  const audio = getSharedAudio();
  audio.src = SILENT_WAV;
  audio.currentTime = 0;
  void audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
  }).catch(() => {});

  Object.values(PICK_ANNOUNCEMENT_AUDIO).forEach((src) => {
    if (!src) return;
    const preload = new Audio();
    preload.preload = "auto";
    preload.src = src;
    preload.load();
  });
}

export function stopPickAudio(): void {
  if (!sharedAudio) return;
  sharedAudio.pause();
  sharedAudio.currentTime = 0;
  sharedAudio.removeAttribute("src");
  sharedAudio.load();
}

export function playPickAudio(src: string): HTMLAudioElement {
  const audio = getSharedAudio();
  audio.pause();
  audio.currentTime = 0;
  audio.src = src;
  audio.load();
  void audio.play().catch(() => {});
  return audio;
}

export function resetPickAudio(): void {
  sharedAudio = null;
}
