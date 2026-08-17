document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.nm-benefits');
  if (!track || track.dataset.marqueeReady === 'true') return;

  const originals = Array.from(track.children);
  originals.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('nm-benefit-clone');
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  track.dataset.marqueeReady = 'true';
});
