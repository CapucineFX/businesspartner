/**
 * header.js – Header / navigation Business Partners (autonome)
 * ---------------------------------------------------------------
 * - Aucune dépendance (ni Bootstrap, ni Tailwind, ni police d'icônes)
 * - Remplace nav.js (#ham / #mob-menu) et le script "header-color" au scroll
 * - Usage : <script src="./assets/js/header.js" defer></script>
 *   Optionnel : <div id="site-header"></div> pour choisir l'emplacement,
 *   sinon le header est inséré tout en haut du <body>.
 */
(function () {
  'use strict';

  // ====== CONFIGURATION (à modifier ici uniquement) ======
  const CONFIG = {
    logo: { line1: 'BUSINESS', line2: 'PARTNERS', href: './index.html' },
    links: [
      { label: 'Expertises',     href: './index.html#expertises' },
      { label: 'Entreprises',    href: './entreprise.html' },
      { label: 'Partenaires',    href: './partenaires.html' },
      { label: 'Notre approche', href: './approche.html' },
      { label: 'À propos',       href: './a-propos.html' }
    ],
    cta: { label: 'Nous contacter', href: './contact.html' },
    breakpoint: 992,   // px : en dessous, les liens passent dans le burger
    overlay: false     // true = le header se superpose au hero (transparent en haut de page)
                       // false = la page démarre sous le header
  };

  // ====== ICÔNES SVG ======
  const svg = (path, size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const ICON_BURGER = svg('<path d="M4 7h16M4 12h16M4 17h16"/>', 22);
  const ICON_CLOSE  = svg('<path d="M6 6l12 12M18 6L6 18"/>', 22);
  const ICON_ARROW  = svg('<path d="M5 12h14M13 6l6 6-6 6"/>', 16);

  // ====== STYLES ======
  const css = `
    #bp-header-root, #bp-header-root * { box-sizing: border-box; }
    #bp-header-root { --bp-header-h: 70px; }

    /* Header fixe : "sticky" ne marche pas ici car le conteneur fait la hauteur du header */
    .bp-header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: transparent; transition: background .25s ease, box-shadow .25s ease; }
    .bp-header.is-scrolled { background: rgba(6, 13, 28, .94); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); box-shadow: 0 1px 0 rgba(255,255,255,.08); }
    .bp-spacer { height: var(--bp-header-h); }
    .bp-header__inner { height: var(--bp-header-h); margin: 0 auto; padding: 0 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }

    .bp-logo { font-weight: 800; line-height: .95; font-size: 1.2rem; letter-spacing: .5px;  text-decoration: none; text-transform: uppercase; }
    .bp-logo span { display: block; }

    .bp-nav { display: none; list-style: none; margin: 0 auto; padding: 0; gap: 4px; }
    .bp-nav a { display: block; font-size: .85rem; padding: 8px 14px; text-decoration: none; border-bottom: 2px solid transparent; transition: color .2s; }
    .bp-nav a:hover { color: #9dbcff; }
    .bp-nav a.is-active { border-bottom-color: #4f8cff; }

    .bp-actions { display: flex; align-items: center; gap: 10px; }
    .bp-cta { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #0b1730; font-weight: 600; font-size: .85rem; border-radius: 10px; padding: 10px 18px; text-decoration: none; white-space: nowrap; transition: background .2s; }
    .bp-cta:hover { background: #dfe8ff; color: #0b1730; }
    .bp-cta svg { display: none; }
    .bp-burger, .bp-close { width: 42px; height: 42px; border-radius: 50%; background: transparent; color: #fff; display: inline-flex; align-items: center; justify-content: center; padding: 0; cursor: pointer; }
    .bp-burger { border: 1px solid #4f8cff; transition: background .2s; }
    .bp-burger:hover { background: rgba(79, 140, 255, .2); }
    .bp-close { border: 1px solid rgba(255,255,255,.3); }

    /* Menu latéral */
    .bp-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.55); opacity: 0; visibility: hidden; transition: opacity .25s, visibility .25s; z-index: 1001; }
    .bp-drawer { position: fixed; top: 0; right: 0; height: 100%; width: min(360px, 88vw); background: #0b1730; color: #fff; padding: 20px 24px; transform: translateX(100%); visibility: hidden; transition: transform .3s ease, visibility .3s; z-index: 1002; overflow-y: auto; }
    .bp-open .bp-backdrop { opacity: 1; visibility: visible; }
    .bp-open .bp-drawer { transform: translateX(0); visibility: visible; }
    .bp-drawer__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .bp-drawer__link { display: block; padding: 16px 0; color: #fff; font-size: 1.1rem; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.1); }
    .bp-drawer__link.is-active { color: #4f8cff; }
    .bp-drawer .bp-cta { margin-top: 24px; }
    .bp-drawer .bp-cta svg { display: block; }
    html.bp-lock { overflow: hidden; }

    @media (min-width: ${CONFIG.breakpoint}px) {
      .bp-nav { display: flex; }
      .bp-cta svg { display: block; }
    }
    @media (max-width: 400px) {
      .bp-cta { padding: 9px 12px; font-size: .8rem; }
      .bp-logo { font-size: 1.05rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      .bp-header, .bp-backdrop, .bp-drawer { transition: none; }
    }
  `;

  // ====== LIEN ACTIF ======
  function pageName(pathname) {
    const last = pathname.split('/').filter(Boolean).pop() || 'index.html';
    return last.includes('.') ? last : last + '.html';
  }
  const currentPage = pageName(location.pathname);
  const isActive = (href) => pageName(new URL(href, location.href).pathname) === currentPage;
  const activeCls = (h) => (isActive(h) ? ' is-active' : '');
  const activeAria = (h) => (isActive(h) ? ' aria-current="page"' : '');

  // ====== TEMPLATE ======
  const desktopLinks = CONFIG.links.map(l =>
    `<li><a class="${activeCls(l.href).trim()}" href="${l.href}"${activeAria(l.href)}>${l.label}</a></li>`
  ).join('');

  const drawerLinks = CONFIG.links.map(l =>
    `<a class="bp-drawer__link${activeCls(l.href)}" href="${l.href}"${activeAria(l.href)}>${l.label}</a>`
  ).join('');

  const html = `
    <header class="bp-header" id="bp-header">
      <div class="bp-header__inner">
        <a href="${CONFIG.logo.href}" class="bp-logo" aria-label="Accueil Business Partners"><span>${CONFIG.logo.line1}</span><span>${CONFIG.logo.line2}</span></a>
        <nav aria-label="Navigation principale"><ul class="bp-nav">${desktopLinks}</ul></nav>
        <div class="bp-actions">
          <a href="${CONFIG.cta.href}" class="bp-cta">${CONFIG.cta.label}${ICON_ARROW}</a>
          <button class="bp-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="bpDrawer">${ICON_BURGER}</button>
        </div>
      </div>
    </header>
    ${CONFIG.overlay ? '' : '<div class="bp-spacer" aria-hidden="true"></div>'}
    <div class="bp-backdrop" data-bp-close></div>
    <aside class="bp-drawer" id="bpDrawer" aria-label="Menu" aria-hidden="true">
      <div class="bp-drawer__head">
        <span class="bp-logo">${CONFIG.logo.line1} ${CONFIG.logo.line2}</span>
        <button class="bp-close" type="button" aria-label="Fermer le menu" data-bp-close>${ICON_CLOSE}</button>
      </div>
      <nav aria-label="Menu mobile">${drawerLinks}</nav>
      <a href="${CONFIG.cta.href}" class="bp-cta">${CONFIG.cta.label}${ICON_ARROW}</a>
    </aside>
  `;

  // ====== INJECTION + COMPORTEMENT ======
  function mount() {
    if (document.getElementById('bp-header-root')) return; // évite le double chargement

    const style = document.createElement('style');
    style.id = 'bp-header-style';
    style.textContent = css;
    document.head.appendChild(style);

    const root = document.createElement('div');
    root.id = 'bp-header-root';
    root.innerHTML = html;

    const target = document.getElementById('site-header');
    if (target) target.appendChild(root);
    else document.body.insertBefore(root, document.body.firstChild);

    const header = root.querySelector('.bp-header');
    const burger = root.querySelector('.bp-burger');
    const drawer = root.querySelector('.bp-drawer');

    // --- Menu latéral ---
    function setOpen(open) {
      root.classList.toggle('bp-open', open);
      document.documentElement.classList.toggle('bp-lock', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
      if (open) drawer.querySelector('.bp-close').focus();
      else burger.focus({ preventScroll: true });
    }
    burger.addEventListener('click', () => setOpen(true));
    root.querySelectorAll('[data-bp-close]').forEach(el => el.addEventListener('click', () => setOpen(false)));
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => root.classList.contains('bp-open') && setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('bp-open')) setOpen(false); });

    // --- Couleur du header au scroll ---
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();