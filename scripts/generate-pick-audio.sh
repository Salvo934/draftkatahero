#!/usr/bin/env bash
# Rigenera gli audio delle pick.
# Pick #1 → voce ESPN highlights (GuyNeural, hype)
# Pick #2–3 → voce commissioner NBA (EricNeural, Adam Silver style)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AUDIO_DIR="$ROOT/public/audio"
TARGET=14.6

generate_commissioner() {
  local num=$1
  local text=$2
  local voice="en-US-EricNeural"
  local rate="-20%"
  local pitch="+5Hz"
  local af="highpass=f=100,lowpass=f=9500,equalizer=f=280:t=q:w=1:g=2.5,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=120,aecho=0.55:0.65:35:0.1,loudnorm=I=-16:TP=-1.5:LRA=11,apad=pad_dur=${TARGET},atrim=0:${TARGET}"

  edge-tts --voice "$voice" --rate="$rate" --pitch="$pitch" --volume="+0%" --text "$text" --write-media "/tmp/${num}pick-raw.mp3"
  ffmpeg -y -i "/tmp/${num}pick-raw.mp3" -af "$af" -c:a aac -b:a 128k -movflags +faststart "${AUDIO_DIR}/${num}pick.m4a" 2>/dev/null
  ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${AUDIO_DIR}/${num}pick.m4a"
}

generate_highlights() {
  local num=$1
  local text=$2
  local mode="${3:-fixed}"
  # ESPN / SportsCenter energy — più veloce, più compresso, più “broadcast”
  local voice="en-US-GuyNeural"
  local rate="+10%"
  local pitch="+1Hz"
  local af_base="highpass=f=130,lowpass=f=10500,equalizer=f=200:t=q:w=1:g=3.5,equalizer=f=3000:t=q:w=1.4:g=3,acompressor=threshold=-13dB:ratio=4.5:attack=2:release=45,aecho=0.4:0.5:22:0.14,loudnorm=I=-14:TP=-1:LRA=8"
  local af

  if [ "$mode" = "natural" ]; then
    af="${af_base},apad=pad_dur=0.6"
  else
    af="${af_base},apad=pad_dur=${TARGET},atrim=0:${TARGET}"
  fi

  edge-tts --voice "$voice" --rate="$rate" --pitch="$pitch" --volume="+8%" --text "$text" --write-media "/tmp/${num}pick-raw.mp3"
  ffmpeg -y -i "/tmp/${num}pick-raw.mp3" -af "$af" -c:a aac -b:a 128k -movflags +faststart "${AUDIO_DIR}/${num}pick.m4a" 2>/dev/null
  ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${AUDIO_DIR}/${num}pick.m4a"
}

# Pick #1 — solo hype highlights ESPN
generate_highlights 1 "OH! What a dunk! Kevin Basile rises up... throws it down with AUTHORITY!" natural

# Pick #2–3 — commissioner draft
generate_commissioner 2 "With the second pick in the twenty twenty-six KataHero Draft... KataHero selects... Luca Bianchi... from UCC Assigeco Piacenza."
generate_commissioner 3 "With the third pick in the twenty twenty-six KataHero Draft... KataHero selects... Andrea Verdi... from Fortitudo Bologna."

echo "Done — pick 1: GuyNeural ESPN highlights · picks 2–3: EricNeural commissioner · ${TARGET}s each"
