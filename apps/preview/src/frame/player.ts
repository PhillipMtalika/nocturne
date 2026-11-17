import '@videojs/html/video/player';
import '@videojs/html/media/mux-video';
import '@/video/skin';
import skinTemplate from '@/video/skin.html?raw';

// What the preview plays: NASA's official Webb first-images highlight reel
// ("First Images from the James Webb Space Telescope"), public domain, hosted on
// Mux for the challenge's Mux bonus. Playback ID lives in README.md too.
const PLAYBACK_ID = 'PKyXtGIJ1VczxiGS4D01H2ONuKQB02C86hJOaGMQZYEgk';
const SRC = `https://stream.mux.com/${PLAYBACK_ID}.m3u8`;
const POSTER = `https://image.mux.com/${PLAYBACK_ID}/thumbnail.webp?time=90`;
/** Chapters for the time slider, served from `apps/preview/public`. */
const CHAPTERS = './webb-first-images-chapters.vtt';

const MEDIA_PLACEHOLDER = '<!-- Add a compatible media component here. -->';

export function createPlayer(): HTMLElement {
  const player = document.createElement('video-player');
  player.setAttribute('poster', POSTER);

  player.innerHTML = skinTemplate.replace(
    MEDIA_PLACEHOLDER,
    `<mux-video src="${SRC}" playsinline crossorigin><track kind="chapters" label="English" srclang="en" src="${CHAPTERS}" default></mux-video>`
  );

  return player;
}
