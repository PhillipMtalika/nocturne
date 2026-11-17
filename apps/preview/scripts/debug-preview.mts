import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
page.on('console', m => console.log('CONSOLE:', m.type(), m.text().slice(0,120)));
page.on('pageerror', e => console.log('PAGEERROR:', String(e).slice(0,200)));
await page.goto('https://nocturne-livid-kappa.vercel.app/preview.html#width=1100&ratio=16:9', { waitUntil: 'load' });
await new Promise(r=>setTimeout(r,8000));
const html = await page.evaluate(() => ({
  title: document.title,
  mux: !!document.querySelector('mux-video'),
  container: !!document.querySelector('media-container'),
  body: document.body.innerHTML.length,
}));
console.log(JSON.stringify(html));
await browser.close();
