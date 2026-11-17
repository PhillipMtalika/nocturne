/**
 * Records demo videos of the Nocturne skin from the live Vercel deployment.
 *
 * Playwright records each scenario as .webm; they are converted to .mp4
 * afterwards with the ffmpeg binary that ships with Playwright (see convert.sh).
 *
 * Run: npx tsx apps/preview/scripts/record-demos.mts   (or node with ts stripped)
 */
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'https://nocturne-livid-kappa.vercel.app';
const OUT = 'demos';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

mkdirSync(OUT, { recursive: true });

/** One context per scenario, so each gets its own video file. */
async function newPage(browser: Browser, width: number, height: number): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext({
    viewport: { width, height },
    recordVideo: { dir: OUT, size: { width: 1280, height: 800 } },
  });
  const page = await context.newPage();
  return { context, page };
}

const browser = await chromium.launch();

/* ------------------------------------------------------------------ */
/* Demo 1 — hero: play, reel rotation, hover preview, reel drag        */
/* ------------------------------------------------------------------ */
{
  const { context, page } = await newPage(browser, 1280, 800);
  await page.goto(`${BASE}/preview.html#width=1100&ratio=16:9`);
  await page.waitForSelector('mux-video', { state: 'attached', timeout: 30000 });
  await sleep(1500); // poster settles

  const play = page.locator('.video-controls-center-play');
  await play.click();
  await sleep(7000); // playback: reel rotates across the amber tape

  // Hover the seek bar to show the thumbnail preview card.
  const slider = page.locator('media-time-slider');
  const box = await slider.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2);
    await sleep(1800);
    await page.mouse.move(box.x + box.width * 0.75, box.y + box.height / 2);
    await sleep(1500);
  }

  // Drag the reel to ~60% — the tape-and-reel scrub moment.
  if (box) {
    await page.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.6, box.y + box.height / 2, { steps: 25 });
    await sleep(600);
    await page.mouse.up();
  }
  await sleep(2500);
  await play.click(); // pause on a bright frame
  await sleep(1500);
  await context.close();
}

/* ------------------------------------------------------------------ */
/* Demo 2 — responsive: wide → narrow → wide                           */
/* ------------------------------------------------------------------ */
{
  const { context, page } = await newPage(browser, 1280, 800);
  await page.goto(`${BASE}/preview.html#width=1100&ratio=16:9`);
  await page.waitForSelector('mux-video', { state: 'attached', timeout: 30000 });
  await sleep(1200);
  await page.locator('.video-controls-center-play').click();
  await sleep(3000);

  // Shrink the player width param through the workbench URL is a reload; instead resize the player via params.
  await page.goto(`${BASE}/preview.html#width=384&ratio=16:9`);
  await page.waitForSelector('mux-video', { state: 'attached', timeout: 30000 });
  await sleep(1000);
  await page.locator('.video-controls-center-play').click();
  await sleep(4000);

  await page.goto(`${BASE}/preview.html#width=320&ratio=9:16`);
  await page.waitForSelector('mux-video', { state: 'attached', timeout: 30000 });
  await sleep(1000);
  await page.locator('.video-controls-center-play').click();
  await sleep(4000);
  await context.close();
}

/* ------------------------------------------------------------------ */
/* Demo 3 — keyboard: focus rings, hotkeys, menus                      */
/* ------------------------------------------------------------------ */
{
  const { context, page } = await newPage(browser, 1280, 800);
  await page.goto(`${BASE}/preview.html#width=1100&ratio=16:9`);
  await page.waitForSelector('mux-video', { state: 'attached', timeout: 30000 });
  await sleep(1200);

  // Tab through controls so the amber focus rings are visible.
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    await sleep(700);
  }

  // Keyboard playback: k = play/pause, arrows = seek, m = mute.
  await page.keyboard.press('k');
  await sleep(3500);
  await page.keyboard.press('ArrowRight');
  await sleep(1000);
  await page.keyboard.press('m');
  await sleep(1500);
  await page.keyboard.press('k');
  await sleep(1200);
  await context.close();
}

await browser.close();
console.log('Recorded webm files in ./demos — now run convert.sh for mp4s.');
