/**
 * main.js – Scripts de page Business Partners
 * ---------------------------------------------------------------
 * Un seul fichier pour toutes les pages. Chaque fonctionnalité ne
 * s'active que si ses éléments existent dans la page : plus d'erreur
 * "null" quand un bloc (formulaire, FAQ, tableau…) est absent.
 * Usage : <script src="./assets/js/main.js" defer></script>
 */
(function () {
  'use strict';

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // Masque/affiche un élément, que la classe ".hidden" existe ou non dans votre CSS
  function setHidden(el, hide) {
    el.classList.toggle('hidden', hide);
    el.hidden = hide;
  }

  // Apparition au défilement (.reveal -> ajoute "is-visible" et "visible")
  function initReveal() {
    const els = $$('.reveal');
    if (!els.length) return;
    const show = (el) => el.classList.add('is-visible', 'visible');

    const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduceMotion) {
      els.forEach(show);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => obs.observe(el));
  }

  // FAQ en accordéon (.faq-item > .faq-q)
  function initFaq() {
    const items = $$('.faq-item');
    if (!items.length) return;
    items.forEach((item) => {
      const q = $('.faq-q', item);
      if (!q) return;
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        items.forEach((i) => {
          i.classList.remove('open');
          const btn = $('.faq-q', i);
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('open');
          q.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // Tableau comparatif : surbrillance de colonne au survol (#cmp)
  function initCompareTable() {
    const cmp = document.getElementById('cmp');
    if (!cmp) return;
    [
      ['.th-achat, .td-achat',     'hov-achat'],
      ['.th-leasing, .td-leasing', 'hov-leasing'],
      ['.th-bp, .td-bp',           'hov-bp']
    ].forEach(([cells, cls]) => {
      $$(cells, cmp).forEach((el) => {
        el.addEventListener('mouseenter', () => cmp.classList.add(cls));
        el.addEventListener('mouseleave', () => cmp.classList.remove(cls));
      });
    });
  }

  // Formulaire de contact (#bp-contact-form)
  function initContactForm() {
    const form = document.getElementById('bp-contact-form');
    if (!form) return;
    const errorBox   = document.getElementById('form-error');
    const successBox = document.getElementById('form-success');
    const resetBtn   = document.getElementById('reset-form-btn');

    if (errorBox)   setHidden(errorBox, true);
    if (successBox) setHidden(successBox, true);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (errorBox) setHidden(errorBox, true);

      if (!form.checkValidity()) {
        if (errorBox) setHidden(errorBox, false);
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // TODO : brancher ici l'envoi réel (fetch vers votre backend, Formspree, etc.)
      setHidden(form, true);
      if (successBox) setHidden(successBox, false);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        if (successBox) setHidden(successBox, true);
        setHidden(form, false);
      });
    }
  }

  // Une erreur dans un bloc n'empêche pas les autres de fonctionner
  function run(fn) {
    try { fn(); } catch (err) { console.error('[main.js] ' + fn.name + ' :', err); }
  }

  function init() {
    [initReveal, initFaq, initCompareTable, initContactForm].forEach(run);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();