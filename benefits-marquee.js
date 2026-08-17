document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.nm-benefits');
  const viewport = document.querySelector('.nm-benefits-wrap');
  if (!track || !viewport || track.dataset.marqueeReady === 'true') return;

  const style = document.createElement('style');
  style.id = 'nm-benefits-marquee-style';
  style.textContent = `
    .nm-benefits-wrap{
      overflow:hidden!important;
      padding:18px 0!important;
    }
    .nm-benefits{
      display:flex!important;
      grid-template-columns:none!important;
      width:max-content!important;
      max-width:none!important;
      margin:0!important;
      padding:2px 0 10px max(20px,calc((100vw - 1280px)/2 + 20px))!important;
      gap:14px!important;
      overflow:visible!important;
      scroll-snap-type:none!important;
      scrollbar-width:auto!important;
      will-change:transform;
      transform:translate3d(0,0,0);
    }
    .nm-benefits::-webkit-scrollbar{display:none!important}
    .nm-benefit{
      flex:0 0 clamp(270px,22vw,320px)!important;
      width:clamp(270px,22vw,320px)!important;
      min-height:94px!important;
      scroll-snap-align:none!important;
      animation:none!important;
    }
    @media(max-width:900px){
      .nm-benefits{
        display:flex!important;
        grid-template-columns:none!important;
      }
      .nm-benefit{
        flex-basis:300px!important;
        width:300px!important;
      }
    }
    @media(max-width:680px){
      .nm-benefits-wrap{padding:14px 0!important}
      .nm-benefits{
        width:max-content!important;
        display:flex!important;
        overflow:visible!important;
        padding:2px 0 8px 14px!important;
        gap:10px!important;
      }
      .nm-benefit{
        flex:0 0 min(82vw,320px)!important;
        width:min(82vw,320px)!important;
        min-height:86px!important;
      }
    }
    @media(prefers-reduced-motion:reduce){
      .nm-benefits{transform:none!important}
    }
  `;
  document.head.appendChild(style);

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
  const speed = 38;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const measure = () => {
    const first = originals[0];
    const firstClone = track.querySelector('.nm-benefit-clone');
    if (!first || !firstClone) return;
    cycleWidth = firstClone.offsetLeft - first.offsetLeft;
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

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    viewport.addEventListener('mouseenter', () => { paused = true; });
    viewport.addEventListener('mouseleave', () => {
      paused = false;
      lastTime = performance.now();
    });
  }

  window.addEventListener('resize', () => {
    measure();
    offset = 0;
    track.style.transform = 'translate3d(0,0,0)';
    lastTime = performance.now();
  });

  document.addEventListener('visibilitychange', () => {
    lastTime = performance.now();
  });

  requestAnimationFrame(() => {
    measure();
    requestAnimationFrame(frame);
  });
});
