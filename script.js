// interactions: open article, copy link, theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-article');
  const articleWrap = document.getElementById('article-wrap');
  const copyBtn = document.getElementById('copy-link');
  const themeToggle = document.getElementById('theme-toggle');

  // open article (scroll + focus)
  openBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    articleWrap?.classList.add('visible');
    const article = document.getElementById('article');
    if (article) {
      article.scrollIntoView({ behavior: 'smooth', block: 'start' });
      article.focus({ preventScroll: true });
    }
    // small animation feedback
    openBtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-3px)' }, { transform: 'translateY(0)' }], { duration: 220 });
  });

  // copy link to clipboard
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      copyBtn.textContent = '✅';
      setTimeout(() => (copyBtn.textContent = '🔗'), 1200);
    } catch (err) {
      copyBtn.textContent = '❌';
      setTimeout(() => (copyBtn.textContent = '🔗'), 1200);
    }
  });

  // share buttons (simple handlers)
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', () => {
      const kind = btn.getAttribute('data-share');
      const url = encodeURIComponent(location.href);
      const text = encodeURIComponent(document.getElementById('headline')?.textContent || document.title);
      if (kind === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
      if (kind === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    });
  });

  // theme toggle (dark / light)
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (currentTheme === 'dark') html.setAttribute('data-theme', 'dark');

  themeToggle?.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌙';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '☀️';
    }
  });

  // set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // accessibility: allow open-article by Enter on focused button
  document.getElementById('open-article')?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') e.target.click();
  });
});
