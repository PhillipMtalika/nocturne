import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('https://nocturne-livid-kappa.vercel.app/', { waitUntil: 'load' });
await page.waitForTimeout(3000);

const btn = page.locator('header button', { hasText: /system|light|dark/ }).first();

const frameSnap = async (label: string) => {
  const frame = page.frameLocator('iframe').locator('body');
  const s = await page.frames()[1]!.evaluate(() => ({
    colorSchemeProp: getComputedStyle(document.documentElement).colorScheme,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    inlineStyle: document.documentElement.getAttribute('style') ?? '(none)',
    hash: location.hash.slice(0, 60),
  }));
  console.log(label, JSON.stringify(s));
};

await frameSnap('START frame:');
await btn.click(); // -> light
await page.waitForTimeout(1000);
await frameSnap('LIGHT frame:');
await btn.click(); // -> dark
await page.waitForTimeout(1000);
await frameSnap('DARK frame:');
await page.screenshot({ path: 'demos/vercel-dark-frame.png' });
await browser.close();
