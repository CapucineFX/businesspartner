/* =============================================
   NAV.JS — Business Partners
   Hamburger + fermeture au clic lien
============================================= */
(function () {
  const ham = document.getElementById('bp-ham');
  const mob = document.getElementById('bp-mob');

  if (!ham || !mob) return;   // sécurité si l'élément n'existe pas

  /* Toggle hamburger */
  ham.addEventListener('click', function () {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow =
      mob.classList.contains('open') ? 'hidden' : '';
  });

  /* Fermer quand on clique un lien dans le menu mobile */
  mob.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      ham.classList.remove('open');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* Optionnel : fermer en cliquant ailleurs */
  document.addEventListener('click', function (e) {
    if (!ham.contains(e.target) && !mob.contains(e.target)) {
      ham.classList.remove('open');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();
