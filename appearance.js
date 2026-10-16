(() => {
  const root = document.documentElement;
  root.dataset.palette = 'persimmon';
  root.dataset.wordmark = 'fraunces';
  let mode = 'dark';
  try { if (localStorage.getItem('conrad-color-mode') === 'light') mode = 'light'; } catch {}
  root.dataset.mode = mode;
  async function updateIcon() {
    await document.fonts.load('600 52px "Fraunces"');
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 64;
    const context = canvas.getContext('2d');
    const css = getComputedStyle(root);
    context.fillStyle = css.getPropertyValue('--paper').trim();
    context.beginPath(); context.roundRect(0,0,64,64,10); context.fill();
    context.fillStyle = css.getPropertyValue('--ink').trim();
    context.font = '600 52px "Fraunces"';
    const metrics = context.measureText('C');
    context.fillText('C', (64-metrics.width)/2, (64+metrics.actualBoundingBoxAscent-metrics.actualBoundingBoxDescent)/2);
    const icon = document.querySelector('link[rel="icon"]');
    if (icon) { icon.type = 'image/png'; icon.href = canvas.toDataURL('image/png'); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('[data-mode-toggle]');
    function syncButton() {
      if (!button) return;
      const next = root.dataset.mode === 'dark' ? 'light' : 'dark';
      button.textContent = next === 'light' ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-label', 'Switch to ' + next + ' mode');
    }
    syncButton(); updateIcon();
    button?.addEventListener('click', () => {
      root.dataset.mode = root.dataset.mode === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('conrad-color-mode', root.dataset.mode); } catch {}
      syncButton(); updateIcon();
      document.dispatchEvent(new CustomEvent('appearancechange', {detail:{kind:'mode'}}));
    });
  });
})();
