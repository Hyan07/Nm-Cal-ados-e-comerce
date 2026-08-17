document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.nm-benefits');
  const viewport = document.querySelector('.nm-benefits-wrap');
  if (!track || !viewport || track.dataset.marqueeReady === 'true') return;

  const originals = Array.from(track.children);
  if (!originals.length) return;

  originals.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('nm-benefit-clone');
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  track.dataset.marqueeReady = 'true';

  let offset = 0;
  let lastTime = performance.now();
  let cycleWidth = 0;
  let paused = false;
  const speed = 38; // pixels por segundo
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const measure = () => {
    const first = originals[0];
    const firstClone = track.querySelector('.nm-benefit-clone');
    if (!first || !firstClone) return;
    cycleWidth = firstClone.offsetLeft - first.offsetLeft;
    if (cycleWidth <= 0) {
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      cycleWidth = originals.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0) + gap * originals.length;
    }
  };

  const frame = now => {
    const delta = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    if (!paused && !reduceMotion && cycleWidth > 0) {
      offset -= speed * delta;
      if (Math.abs(offset) >= cycleWidth) offset += cycleWidth;
      track.style.transform = `translate3d(${offset}px,0,0)`;
    }

    requestAnimationFrame(frame);
  };

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (finePointer.matches) {
    viewport.addEventListener('mouseenter', () => { paused = true; });
    viewport.addEventListener('mouseleave', () => { paused = false; lastTime = performance.now(); });
  }

  document.addEventListener('visibilitychange', () => {
    lastTime = performance.now();
  });

  const resizeObserver = new ResizeObserver(() => {
    measure();
    offset = 0;
    track.style.transform = 'translate3d(0,0,0)';
  });
  resizeObserver.observe(viewport);

  requestAnimationFrame(() => {
    measure();
    requestAnimationFrame(frame);
  });
});
