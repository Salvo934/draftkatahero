#!/usr/bin/env bash
# Rigenera gli audio delle pick con un unico profilo voce (Adam Silver style).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AUDIO_DIR="$ROOT/public/audio"
TARGET=14.6

# Profilo voce unico — non cambiare tra le pick
VOICE="en-US-EricNeural"
RATE="-20%"
PITCH="+5Hz"
VOLUME="+0%"

AF="highpass=f=100,lowpass=f=9500,equalizer=f=280:t=q:w=1:g=2.5,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=120,aecho=0.55:0.65:35:0.1,loudnorm=I=-16:TP=-1.5:LRA=11,apad=pad_dur=${TARGET},atrim=0:${TARGET}"

generate() {
  local num=$1
  local text=$2
  edge-tts --voice "$VOICE" --rate="$RATE" --pitch="$PITCH" --volume="$VOLUME" --text "$text" --write-media "/tmp/${num}pick-raw.mp3"
  ffmpeg -y -i "/tmp/${num}pick-raw.mp3" -af "$AF" -c:a aac -b:a 128k -movflags +faststart "${AUDIO_DIR}/${num}pick.m4a" 2>/dev/null
  ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${AUDIO_DIR}/${num}pick.m4a"
}

generate 1 "With the first pick in the twenty twenty-six KataHero Draft... KataHero selects... Jason Taylor... from USA."
generate 2 "With the second pick in the twenty twenty-six KataHero Draft... KataHero selects... Luca Bianchi... from UCC Assigeco Piacenza."
generate 3 "With the third pick in the twenty twenty-six KataHero Draft... KataHero selects... Andrea Verdi... from Fortitudo Bologna."

echo "Done — ${VOICE} @ ${RATE} / ${PITCH}, ${TARGET}s each"
