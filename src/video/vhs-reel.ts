/**
 * VHS Reel rotation controller for the seek bar.
 * Computes rotation (rad) = (percentPlayed * progressHolderWidth) / reelRadius
 * Sets --vhs-rot on the player element and seek bar holder.
 */

export interface SeekBarLike {
  getPercent(): number;
}

export function setupVhsReel(player: HTMLElement): () => void {
  const holder = player.querySelector('media-time-slider, .vjs-progress-holder, .vjs-progress-control') as HTMLElement | null;
  if (!holder) return () => {};
  const targetHolder: HTMLElement = holder;

  const anyPlayer = player as any;
  if (typeof anyPlayer.requestAnimationFrame !== 'function') {
    anyPlayer.requestAnimationFrame = (cb: FrameRequestCallback) => window.requestAnimationFrame(cb);
  }
  if (typeof anyPlayer.cancelAnimationFrame !== 'function') {
    anyPlayer.cancelAnimationFrame = (id: number) => window.cancelAnimationFrame(id);
  }

  const getMedia = (): HTMLMediaElement | null => {
    return player.querySelector('video, mux-video') as HTMLMediaElement | null;
  };

  const seekBar: SeekBarLike = {
    getPercent(): number {
      const isDragging = targetHolder.hasAttribute('data-dragging') || targetHolder.hasAttribute('data-seeking');
      const pointerVal = targetHolder.style.getPropertyValue('--media-slider-pointer');

      if (isDragging && pointerVal) {
        const p = parseFloat(pointerVal) / 100;
        if (isFinite(p)) return Math.max(0, Math.min(1, p));
      }

      const media = getMedia();
      if (media && media.duration > 0 && isFinite(media.currentTime)) {
        return Math.max(0, Math.min(1, media.currentTime / media.duration));
      }

      const fillVal = targetHolder.style.getPropertyValue('--media-slider-fill');
      if (fillVal) {
        const p = parseFloat(fillVal) / 100;
        if (isFinite(p)) return Math.max(0, Math.min(1, p));
      }

      return 0;
    },
  };

  anyPlayer.seekBar = seekBar;
  (targetHolder as any).getPercent = () => seekBar.getPercent();
  anyPlayer.controlBar = anyPlayer.controlBar || {};
  anyPlayer.controlBar.progressControl = anyPlayer.controlBar.progressControl || { seekBar };

  function getReelRadius(): number {
    const thumb = targetHolder.querySelector('.media-time-slider-thumb, .vjs-seek-handle') as HTMLElement | null;
    if (thumb && thumb.offsetWidth > 0) {
      return thumb.offsetWidth / 2;
    }
    const computed = window.getComputedStyle(player);
    const sizeVar = computed.getPropertyValue('--vhs-reel-size').trim();
    if (sizeVar) {
      const val = parseFloat(sizeVar);
      if (isFinite(val) && val > 0) return val / 2;
    }
    return 11;
  }

  function updateRotation() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      player.style.setProperty('--vhs-rot', '0rad');
      targetHolder.style.setProperty('--vhs-rot', '0rad');
      return;
    }

    const percentPlayed = seekBar.getPercent();
    const progressHolderWidth = targetHolder.getBoundingClientRect().width || targetHolder.clientWidth || 0;
    const reelRadius = getReelRadius();

    let rot = 0;
    if (reelRadius > 0 && progressHolderWidth > 0 && isFinite(percentPlayed)) {
      rot = (percentPlayed * progressHolderWidth) / reelRadius;
    }

    if (!isFinite(rot) || isNaN(rot)) {
      rot = 0;
    }

    const rotStr = `${rot}rad`;
    player.style.setProperty('--vhs-rot', rotStr);
    targetHolder.style.setProperty('--vhs-rot', rotStr);
  }

  let rafId: number | null = null;

  function loop() {
    updateRotation();
    rafId = anyPlayer.requestAnimationFrame(loop);
  }

  function startRafLoop() {
    if (rafId !== null) return;
    rafId = anyPlayer.requestAnimationFrame(loop);
  }

  function stopRafLoop() {
    if (rafId !== null) {
      anyPlayer.cancelAnimationFrame(rafId);
      rafId = null;
    }
    updateRotation();
  }

  const events = ['seeking', 'seeked', 'timeupdate', 'loadedmetadata', 'durationchange'];

  events.forEach((evt) => {
    player.addEventListener(evt, updateRotation);
    targetHolder.addEventListener(evt, updateRotation);
  });

  const attachMediaListeners = (media: HTMLMediaElement) => {
    events.forEach((evt) => media.addEventListener(evt, updateRotation));
    media.addEventListener('play', startRafLoop);
    media.addEventListener('playing', startRafLoop);
    media.addEventListener('pause', stopRafLoop);
    media.addEventListener('ended', stopRafLoop);
    if (!media.paused && !media.ended) {
      startRafLoop();
    }
  };

  const initialMedia = getMedia();
  if (initialMedia) {
    attachMediaListeners(initialMedia);
  }

  player.addEventListener('play', startRafLoop);
  player.addEventListener('playing', startRafLoop);
  player.addEventListener('pause', stopRafLoop);
  player.addEventListener('ended', stopRafLoop);

  // Live drag updates
  targetHolder.addEventListener('pointerdown', updateRotation);
  targetHolder.addEventListener('pointermove', updateRotation);
  targetHolder.addEventListener('pointerup', updateRotation);
  targetHolder.addEventListener('touchmove', updateRotation);
  targetHolder.addEventListener('drag-start', updateRotation);
  targetHolder.addEventListener('drag-end', updateRotation);

  // Recompute on resize
  const ro = new ResizeObserver(() => {
    updateRotation();
  });
  ro.observe(targetHolder);

  function cleanup() {
    stopRafLoop();
    ro.disconnect();
    events.forEach((evt) => {
      player.removeEventListener(evt, updateRotation);
      targetHolder.removeEventListener(evt, updateRotation);
    });
    const media = getMedia();
    if (media) {
      events.forEach((evt) => media.removeEventListener(evt, updateRotation));
      media.removeEventListener('play', startRafLoop);
      media.removeEventListener('playing', startRafLoop);
      media.removeEventListener('pause', stopRafLoop);
      media.removeEventListener('ended', stopRafLoop);
    }
    player.removeEventListener('play', startRafLoop);
    player.removeEventListener('playing', startRafLoop);
    player.removeEventListener('pause', stopRafLoop);
    player.removeEventListener('ended', stopRafLoop);
    targetHolder.removeEventListener('pointerdown', updateRotation);
    targetHolder.removeEventListener('pointermove', updateRotation);
    targetHolder.removeEventListener('pointerup', updateRotation);
    targetHolder.removeEventListener('touchmove', updateRotation);
    targetHolder.removeEventListener('drag-start', updateRotation);
    targetHolder.removeEventListener('drag-end', updateRotation);
  }

  player.addEventListener('dispose', cleanup);

  // Initial calculation
  updateRotation();

  return cleanup;
}

// Auto-wire on any player elements in DOM
if (typeof document !== 'undefined') {
  const initialized = new WeakSet<HTMLElement>();

  const initAll = () => {
    const players = document.querySelectorAll<HTMLElement>('video-player');
    if (players.length > 0) {
      players.forEach((el) => {
        if (!initialized.has(el)) {
          initialized.add(el);
          setupVhsReel(el);
        }
      });
      return;
    }
    const candidates = document.querySelectorAll<HTMLElement>('.media-container, .vjs-vhs');
    candidates.forEach((el) => {
      if (!initialized.has(el)) {
        initialized.add(el);
        setupVhsReel(el);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  const mo = new MutationObserver(() => {
    initAll();
  });

  mo.observe(document.documentElement, { childList: true, subtree: true });
}
