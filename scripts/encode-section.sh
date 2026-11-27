#!/usr/bin/env bash
set -euo pipefail

FFMPEG=$(command -v ffmpeg || command -v ffmpeg.exe || true)
FFPROBE=$(command -v ffprobe || command -v ffprobe.exe || true)

if [[ -z "$FFMPEG" || -z "$FFPROBE" ]]; then
  echo "Error: ffmpeg and ffprobe are required." >&2
  exit 1
fi

RAW="${1:-reference/section-raw.mp4}"

if [[ ! -f "$RAW" ]]; then
  echo "Error: raw video not found at '$RAW'" >&2
  exit 1
fi

DIMS=$("$FFPROBE" -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$RAW" | tr -d '\r')
if [[ "$DIMS" != "1920x1080" ]]; then
  echo "Error: expected 1920x1080 input, got '$DIMS' for '$RAW'" >&2
  exit 1
fi

mkdir -p public/videos public/images

DESKTOP_OUT="public/videos/section.mp4"
MOBILE_OUT="public/videos/section-mobile.mp4"
POSTER_START="public/images/section-poster.jpg"
POSTER_END="public/images/section-poster-end.jpg"

echo "Encoding desktop section (1600px, all-intra)..."
"$FFMPEG" -y -i "$RAW" -an -vf "fps=30,scale=1600:-2" -c:v libx264 -preset slow -crf 26 \
  -g 1 -keyint_min 1 -sc_threshold 0 -bf 0 \
  -x264-params keyint=1:min-keyint=1:scenecut=0 \
  -pix_fmt yuv420p -movflags +faststart "$DESKTOP_OUT"

echo "Encoding mobile section (1080px, all-intra)..."
"$FFMPEG" -y -i "$RAW" -an -vf "fps=30,scale=1080:-2" -c:v libx264 -preset slow -crf 28 \
  -g 1 -keyint_min 1 -sc_threshold 0 -bf 0 \
  -x264-params keyint=1:min-keyint=1:scenecut=0 \
  -pix_fmt yuv420p -movflags +faststart "$MOBILE_OUT"

echo "Extracting start and end posters..."
"$FFMPEG" -y -i "$DESKTOP_OUT" -vf "select=eq(n\,0)" -vframes 1 -q:v 2 "$POSTER_START"
"$FFMPEG" -y -sseof -0.1 -i "$DESKTOP_OUT" -update 1 -q:v 2 "$POSTER_END"

verify_intra() {
  local file="$1"
  local max_bytes="$2"
  local label="$3"

  local frames
  frames=$("$FFPROBE" -v error -select_streams v:0 -show_entries frame=pict_type -of csv=p=0 "$file" | tr -d '\r' | sort | uniq -c)
  echo "Frame types for $file:"
  echo "$frames"

  if echo "$frames" | grep -qE '\b[PB]\b'; then
    echo "Error: $file contains non-I frames!" >&2
    exit 1
  fi

  local size
  size=$(wc -c < "$file")
  local mb
  mb=$(awk "BEGIN {printf \"%.2f\", $size / 1048576}")
  echo "$label size: ${mb} MB ($size bytes)"

  if (( size > max_bytes )); then
    echo "Error: $label exceeds budget of $max_bytes bytes. Raise -crf slightly and re-run." >&2
    exit 1
  fi
}

verify_intra "$DESKTOP_OUT" 12582912 "Desktop section"
verify_intra "$MOBILE_OUT" 5242880 "Mobile section"

echo "Section encoding and verification complete."
