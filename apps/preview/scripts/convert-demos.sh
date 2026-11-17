#!/bin/zsh
# Converts the recorded .webm demos to .mp4 using the ffmpeg binary bundled with Playwright.
set -e

FF=$(ls -d ~/Library/Caches/ms-playwright/ffmpeg-*/ffmpeg-mac* 2>/dev/null | head -1)
if [[ -z "$FF" ]]; then
  echo "No bundled ffmpeg found; run: npx playwright install chromium"
  exit 1
fi

cd demos
for f in *.webm; do
  name="${f:r}"
  echo "Converting $name..."
  "$FF" -y -i "$f" -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p -movflags +faststart "$name.mp4"
done
ls -lh *.mp4
