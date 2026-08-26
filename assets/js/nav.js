/* =============================================
   NAV.JS — Business Partners
   Hamburger mobile + fermeture au clic lien
   Un seul fichier, chargé sur toutes les pages,
   ciblant les IDs réellement présents dans le HTML : #ham / #mob-menu
============================================= */
(function () {
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob-menu');

  if (!ham || !mob) return; // sécurité si l'élément n'existe pas sur la page

  ham.addEventListener('click', function () {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });

  mob.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      ham.classList.remove('open');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
