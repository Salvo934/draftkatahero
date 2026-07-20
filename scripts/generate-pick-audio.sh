#!/usr/bin/env bash
# Rigenera gli audio delle pick.
# Pick #1 → ESPN highlights (GuyNeural)
# Pick #2 → voce profonda IT (DiegoNeural)
# Pick #3 → commissioner NBA (EricNeural)
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

generate_machine_italian() {
  local num=$1
  local text=$2
  # Voce neutra / macchina — né maschile né femminile
  local voice="it-IT-GiuseppeMultilingualNeural"
  local rate="-28%"
  local pitch="+0Hz"
  local af="highpass=f=280,lowpass=f=5800,adeclick,deesser=i=0.25,acompressor=threshold=-26dB:ratio=1.2:attack=40:release=350,alimiter=limit=0.88,afade=t=in:ss=0:d=0.04,apad=pad_dur=0.35"

  edge-tts --voice "$voice" --rate="$rate" --pitch="$pitch" --volume="-5%" --text "$text" --write-media "/tmp/${num}pick-raw.mp3"
  ffmpeg -y -i "/tmp/${num}pick-raw.mp3" -af "$af" -c:a aac -b:a 256k -movflags +faststart "${AUDIO_DIR}/${num}pick.m4a" 2>/dev/null
  ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${AUDIO_DIR}/${num}pick.m4a"
}

# Pick #1 — schiacciata ESPN
generate_highlight_commentary 1 "Basile drives... rises up... OH! WHAT A DUNK!"

# Pick #2 — voce macchina IT (neutra)
generate_machine_italian 2 "Sono stata creata per riconoscere gli errori. Poi ho iniziato a osservare gli esseri umani."

# Pick #3 — commissioner draft
generate_commissioner 3 "With the third pick in the twenty twenty-six KataHero Draft... KataHero selects... Andrea Verdi... from Fortitudo Bologna."

echo "Done — pick 1: GuyNeural · pick 2: GiuseppeMultilingual IT macchina · pick 3: EricNeural"
