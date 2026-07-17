#!/usr/bin/env bash
# Rigenera gli audio delle pick.
# Pick #1–2 → voce ESPN highlights (GuyNeural)
# Pick #3 → voce commissioner NBA (EricNeural, Adam Silver style)
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

generate_highlight_commentary() {
  local num=$1
  local text=$2
  local voice="en-US-GuyNeural"
  local rate="+12%"
  local pitch="+3Hz"
  local af="highpass=f=90,lowpass=f=11000,adeclick,deesser=i=0.4,acompressor=threshold=-20dB:ratio=1.8:attack=10:release=180,alimiter=limit=0.94:attack=5:release=60,afade=t=in:ss=0:d=0.015,apad=pad_dur=0.2"

  edge-tts --voice "$voice" --rate="$rate" --pitch="$pitch" --volume="+6%" --text "$text" --write-media "/tmp/${num}pick-raw.mp3"
  ffmpeg -y -i "/tmp/${num}pick-raw.mp3" -af "$af" -c:a aac -b:a 256k -movflags +faststart "${AUDIO_DIR}/${num}pick.m4a" 2>/dev/null
  ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${AUDIO_DIR}/${num}pick.m4a"
}

# Pick #1 — schiacciata
generate_highlight_commentary 1 "Basile drives... rises up... OH! WHAT A DUNK!"

# Pick #2 — triple
generate_highlight_commentary 2 "Kevin Basile for threeee, yeeeessss!"

# Pick #3 — commissioner draft
generate_commissioner 3 "With the third pick in the twenty twenty-six KataHero Draft... KataHero selects... Andrea Verdi... from Fortitudo Bologna."

echo "Done — picks 1–2: GuyNeural ESPN highlights · pick 3: EricNeural commissioner"
