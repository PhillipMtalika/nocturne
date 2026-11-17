/**
 * VHS-styled icon set for the Nocturne skin.
 *
 * Registered over the `scaffold` family so every `<media-icon family="scaffold">`
 * in the skin renders these instead. All icons are stroke-based on currentColor,
 * so theme states (amber captions, dimmed top rail, hover brightness) keep working.
 *
 * Design language: chunky retro geometry — beveled joins, square line caps,
 * and a reel for settings, echoing the tape-and-reel seek bar.
 */

const base = 'xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" aria-hidden="true" viewBox="0 0 18 18"';

const svg = (body: string): string => `<svg ${base}>${body}</svg>`;

export const vhsIcons = {
  /* ---- Playback ---- */

  'play': svg(
    /* Classic VCR deck button: a solid silk-screened triangle. */
    '<path fill="currentColor" stroke="none" d="M4.5 2.9c0-.7.8-1.2 1.4-.8l9.3 5.6c.6.4.6 1.2 0 1.6l-9.3 5.6c-.6.4-1.4-.1-1.4-.8Z"/>'
  ),

  'pause': svg(
    /* Classic VCR deck button: two solid silk-screened bars. */
    '<path fill="currentColor" stroke="none" d="M4.25 3h2.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-2.5A.75.75 0 0 1 3.5 14.25V3.75A.75.75 0 0 1 4.25 3Zm7 0h2.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 .75-.75Z"/>'
  ),

  'restart': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M3.25 9a5.75 5.75 0 1 0 5.75-5.75"/>' +
      '<path fill="currentColor" stroke="none" d="m9 1 4.25 2.25L9 5.5Z"/>'
  ),

  /* ±10s jump. The backward button mirrors this via CSS scaleX(-1). */
  'seek': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="m3.5 3.5 5.5 5.5-5.5 5.5M9.5 3.5 15 9l-5.5 5.5"/>'
  ),

  /* ---- Volume ---- */

  'volume-high': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linejoin="bevel" d="M2.5 6.75h2.75L9 3.5v11l-3.75-3.25H2.5Z"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M11.5 6.5a3.5 3.5 0 0 1 0 5M13.75 4.75a6.25 6.25 0 0 1 0 8.5"/>'
  ),

  'volume-low': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linejoin="bevel" d="M2.5 6.75h2.75L9 3.5v11l-3.75-3.25H2.5Z"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M11.5 6.5a3.5 3.5 0 0 1 0 5"/>'
  ),

  'volume-off': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linejoin="bevel" d="M2.5 6.75h2.75L9 3.5v11l-3.75-3.25H2.5Z"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="m11.75 6.75 4.5 4.5M16.25 6.75l-4.5 4.5"/>'
  ),

  /* ---- Captions: "CC" in a screen; the active icon carries an underline ---- */

  'captions-on': svg(
    '<rect x="1.75" y="3.75" width="14.5" height="10.5" rx="1" stroke="currentColor" stroke-width="1.5"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M6.1 7.3a1.9 1.9 0 1 0 0 3.4M10.9 7.3a1.9 1.9 0 1 0 0 3.4"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M5 16.25h8"/>'
  ),

  'captions-off': svg(
    '<rect x="1.75" y="3.75" width="14.5" height="10.5" rx="1" stroke="currentColor" stroke-width="1.5"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M6.1 7.3a1.9 1.9 0 1 0 0 3.4M10.9 7.3a1.9 1.9 0 1 0 0 3.4"/>'
  ),

  /* ---- Fullscreen / PiP / AirPlay / Cast ---- */

  'fullscreen-enter': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M2.5 6.5v-4h4M11.5 2.5h4v4M15.5 11.5v4h-4M6.5 15.5h-4v-4"/>'
  ),

  'fullscreen-exit': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M6.75 2.75v4h-4M11.25 2.75v4h4M11.25 15.25v-4h4M6.75 15.25v-4h-4"/>'
  ),

  'pip-enter': svg(
    '<rect x="1.75" y="3.25" width="14.5" height="11.5" rx="1" stroke="currentColor" stroke-width="1.5"/>' +
      '<rect x="9.25" y="8.5" width="5" height="4" fill="currentColor" stroke="none"/>'
  ),

  'pip-exit': svg(
    '<rect x="1.75" y="3.25" width="14.5" height="11.5" rx="1" stroke="currentColor" stroke-width="1.5"/>' +
      '<rect x="9.25" y="8.5" width="5" height="4" stroke="currentColor" stroke-width="1.5"/>'
  ),

  'airplay-enter': svg(
    '<path stroke="currentColor" stroke-width="1.5" d="M2.5 11.5V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7.5"/>' +
      '<path fill="currentColor" stroke="none" d="m9 10.5 4.25 4.75H4.75Z"/>'
  ),

  'airplay-exit': svg(
    '<rect x="2.5" y="3" width="13" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/>' +
      '<path fill="currentColor" stroke="none" d="m9 10.5 4.25 4.75H4.75Z"/>'
  ),

  'cast-enter': svg(
    '<path stroke="currentColor" stroke-width="1.5" d="M2 8.5V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-5"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M2 15.5h.01M2 12.75a2.75 2.75 0 0 1 2.75 2.75M2 10a5.5 5.5 0 0 1 5.5 5.5"/>'
  ),

  'cast-exit': svg(
    '<path stroke="currentColor" stroke-width="1.5" d="M2 8.5V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-5"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M2 15.5h.01M2 12.75a2.75 2.75 0 0 1 2.75 2.75M2 10a5.5 5.5 0 0 1 5.5 5.5"/>' +
      '<path fill="currentColor" stroke="none" d="m8 11.5 4 4H4Z"/>'
  ),

  /* ---- Menus: settings is a reel, echoing the seek-bar playhead ---- */

  'gear': svg(
    '<circle cx="9" cy="9" r="6.75" stroke="currentColor" stroke-width="1.5"/>' +
      '<circle cx="9" cy="9" r="2.25" stroke="currentColor" stroke-width="1.5"/>' +
      '<g stroke="currentColor" stroke-width="1.5" stroke-linecap="square">' +
      '<path d="M9 2.25v3M9 12.75v3M2.25 9h3M12.75 9h3"/>' +
      '<path d="M4.15 4.15l2.1 2.1M11.75 11.75l2.1 2.1M13.85 4.15l-2.1 2.1M6.25 11.75l-2.1 2.1"/>' +
      '</g>'
  ),

  'check': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="m3.5 9.5 3.75 3.75L14.5 5"/>'
  ),

  'chevron': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="m6.75 3.5 5.5 5.5-5.5 5.5"/>'
  ),

  /* Audio tracks: a waveform strip. */
  'speech': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M2.5 6v6M6 3.5v11M9.5 5.5v7M13 2.5v13M15.5 6.5v5"/>'
  ),

  /* Speed: beveled play head with a fast-forward stop bar. */
  'speed': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linejoin="bevel" d="M3.5 3 12 9l-8.5 6Z"/>' +
      '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M14.75 3.5v11"/>'
  ),

  /* Quality/switches: fader sliders. */
  'switches': svg(
    '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="square" d="M2.5 5.5h13M2.5 12.5h13"/>' +
      '<rect x="4.5" y="3.5" width="4" height="4" fill="currentColor" stroke="none"/>' +
      '<rect x="9.5" y="10.5" width="4" height="4" fill="currentColor" stroke="none"/>'
  ),

  /* Buffering: dashed reel-like ring spins via the skin's spinner animation. */
  'spinner': svg(
    '<circle cx="9" cy="9" r="6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-dasharray="4 3.4"/>'
  ),
} as const;

export type VhsIconName = keyof typeof vhsIcons;
