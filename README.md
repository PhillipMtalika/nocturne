# Nocturne

A Video.js video skin for HTML, styled with CSS. It started from the Scaffold skin.

## Design: the late-night screening room

Nocturne frames video the way a projectionist sees it: a deep navy screening room lit by amber, with the picture running edge to edge — the controls float directly on the footage with no panel hiding it. The signature element is the seek bar, built as a **VHS tape and reel**: a thin grey line for unplayed tape, a thicker amber line for what you've played, and a playhead drawn as a **real supply reel** — a cream plastic flange with six cut-out windows showing the wound oxide tape underneath, a toothed hub gripping the spindle, and a glossy highlight. The reel rotates as the tape plays (rotation = distance travelled ÷ reel radius, like tape physically winding off the reel), and it's the settings icon too. The icon set is drawn in the same retro language: chunky strokes, beveled joins, square caps. Amber (`#f6b84b`) marks every active state — played tape, volume fill, captions on, focus rings — against the navy room, so the state of the player is readable at a glance.

## Built-in accessibility

- **Readable over any footage:** text and icons carry a subtle shadow, and the unplayed rail has a dark casing, so controls stay legible over bright and dark video alike; the picture is never hidden behind a panel.
- **Keyboard:** every control is reachable and operable — arrows/J/L seek, space/K play, M mute, F fullscreen, C captions, 0–9 and Home/End jump — with a visible amber focus ring on every control, and menus exit with Escape.
- **Touch:** comfortable 36–40px targets, extended hit areas on coarse pointers, and the reel grows slightly on hover/drag for feedback.
- **Calm on request:** with reduced motion on, the reel stops rotating and all transitions are dropped.
- System modes are respected throughout: forced colors, reduced transparency, and more-contrast variants all restyle to solid, system-palette surfaces.

## Submission notes

- **Live URL:** https://nocturne-livid-kappa.vercel.app (standalone player: `/preview.html`)
- The preview plays **"First Images from the James Webb Space Telescope (Official NASA Highlights)"** — NASA footage is public domain, so player recordings carry no license restrictions. Hosted on **Mux**; playback ID `PKyXtGIJ1VczxiGS4D01H2ONuKQB02C86hJOaGMQZYEgk` (keep the asset live through judging).
- Chapter markers (Carina Nebula, Stephan's Quintet, Southern Ring Nebula, WASP 96-b, SMACS 0723) exercise the chaptered seek bar.

## Develop

```sh
npm run dev
```

The workbench opens your skin in a slimmed-down version of the Video.js sandbox. It plays NASA's Cosmic Dawn trailer from Mux, with chapters; change the media in `apps/preview/src/frame/player`. The options panel sets the player's width and aspect ratio, the color scheme, text direction, and language, and playback options such as autoplay, muted, loop, and preload. The arrow button opens the preview on its own. The settings live in the URL, so a link such as `/?width=384&ratio=9:16&dir=rtl&locale=ar` opens the workbench in that state, and `/preview.html#width=384&ratio=9:16` opens the preview alone.

## Deploy

```sh
npm run deploy
```

It asks where to deploy the workbench: Vercel, Netlify, or Cloudflare Pages. Name one to skip the question, such as `npm run deploy vercel`. The first time, the host's CLI signs you in and creates the project, then every run prints the URL. Vercel and Netlify deploy to a preview URL you can share; to deploy to production instead, add `--prod` to the `deploy:netlify` script, or to both commands in `deploy:vercel`.

To deploy on every push instead, put the project on GitHub and import it on Vercel or Netlify; `vercel.json` and `netlify.toml` already describe the build. The build uses relative URLs, so `dist/` also works on any static host, including in a subfolder.

## Where things live

- `src/`: your skin, and only your skin. Keep, rewrite, or delete any of it.
  - `src/video/`: the skin component and its parts.
  - `src/styles/`: theme tokens and shared styles the skin imports, when it started from a packaged skin.
  - `src/skin.css`: global styles for the skin.
- `apps/preview/`: the workbench that previews the skin. You don't need to change it.
  - `src/shell/`: the Shadcn shell.
  - `src/frame/`: the page the shell frames. `player` mounts your skin in a player and sets the media it plays.
  - `public/`: files the preview serves, such as the chapters track.
- `vercel.json`, `netlify.toml`: how those hosts build the workbench.
- `skin.json`: what this skin is built from. Keep it; it records the Video.js version the skin was created with.

## Learn more

- [Build your own skin](https://videojs.org/docs/framework/html/guides/build-your-own-skin)
- [Customize skins](https://videojs.org/docs/framework/html/guides/customize-skins)
- [UI components](https://videojs.org/docs/framework/html/guides/ui-components)
