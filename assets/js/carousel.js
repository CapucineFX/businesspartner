// ══ CAROUSEL TILES MOBILE ══
const TILES_DATA = [
  {
    num: '01', title: 'Logistique',
    img: './assets/img/logistique.jpeg',   // ← ton image
    desc: "Des équipements pour une chaîne logistique performante.",
    items: ['Chariots élévateurs', 'Manutention et rayonnage', 'Convoyeurs', "Équipements entrepôt"]
  },
  {
    num: '02', title: 'Robotique',
    img: './assets/img/robotique.webp',
    desc: "Accompagnez vos projets d'automatisation et de robotisation.",
    items: ['Bras robotisés', 'Cobots', 'Lignes automatisées', 'Vision industrielle']
  },
  {
    num: '03', title: 'Santé',
    img: './assets/img/sante.jpeg',
    desc: "Équipez vos espaces pour plus de sécurité et de performance.",
    items: ['Défibrillateurs (DAE)', 'Armoires de secours', 'Maintenance & contrôle', 'Formation']
  },
  {
    num: '04', title: 'Informatique',
    img: './assets/img/informatique.jpeg',
    desc: "Renouvelez votre parc sans immobiliser de trésorerie.",
    items: ['Postes de travail', 'Serveurs & réseau', 'Impression', 'Écrans & périphériques']
  },
];

let tileCur = 0, tileStartX = 0, tileDragging = false;

function tileRender() {
  const track = document.getElementById('tt');
  const dotsEl = document.getElementById('dots');
  const dpEl   = document.getElementById('dp');
  if (!track || !dotsEl || !dpEl) return; // sécurité si éléments absents

  // Tiles
 track.innerHTML = TILES_DATA.map((d, i) => `
  <div class="tile-mob${i === tileCur ? ' active' : ''}" data-i="${i}">
    <div class="tile-mob-img">
      <img src="${d.img}" alt="${d.title}">
      <div class="tile-mob-overlay"></div>
    </div>
    <div class="tile-mob-content">
      <div class="t-num">${d.num}</div>
      <div class="t-title">${d.title}</div>
      <p class="t-desc">${d.desc}</p>
    </div>
  </div>
`).join('');

  // Dots
  dotsEl.innerHTML = TILES_DATA.map((_, i) =>
    `<div class="tile-dot${i === tileCur ? ' on' : ''}"></div>`
  ).join('');

  // Panneau détail
  const d = TILES_DATA[tileCur];
  dpEl.innerHTML = `
    <div class="tile-detail">
      <div class="td-head">
         <span class="td-num">${d.num}</span>
        <span class="td-title">${d.title}</span>
      </div>
       <div class="row g-2 mb-3">
       <div class="col-lg-4 col-sm-12 mt-3">
     
        <div class="video-box"><button class="play"><i class="bi bi-play-fill"></i></button></div>
      </div>
      <div class="col-lg-4 col-sm-12 mt-3">
      <p class="td-desc">${d.desc}</p>
      <ul class="td-list">
    
        ${d.items.map(it => `<li>${it}</li>`).join('')}
      </ul>
      </div>

      <div class="col-lg-4 col-sm-12 mt-3">
           <div class="solution">
      <h4 class="d-flex align-items-center mb-2"><span class="gear"><i class="bi bi-gear"></i></span> Notre solution</h4>
        <ul class="td-list">
          <li> Des solutions flexibles et sur mesure</li>
          <li> Une intégration simple et rapide</li>
          <li> Un accompagnement expert</li>
          <li> Un suivi sur le long terme</li>
        </ul>
            <button class="btn-study">Demander une étude <i class="bi bi-arrow-right"></i></button>
          </div>
      </div>
      </div>

 
      <div class="td-nav mt-4">
        <button id="tile-prev">← Précédent</button>
        <button id="tile-next">Suivant →</button>
      </div>
    </div>
  `;

  // Navigation boutons
  document.getElementById('tile-prev').onclick = () => tileGo(tileCur - 1);
  document.getElementById('tile-next').onclick = () => tileGo(tileCur + 1);

  // Clic sur une tile
  track.querySelectorAll('.tile-mob').forEach(c =>
    c.addEventListener('click', () => tileGo(+c.dataset.i))
  );
  // Déplace le track uniquement sur mobile / tablette
  const cardW = track.children[0]?.offsetWidth + 16 || 0;
  track.style.transform = `translateX(-${tileCur * cardW}px)`;

  // Désactive le swipe/déplacement sur desktop (à partir de 992px)
  if (window.innerWidth >= 992) {
    track.style.transform = 'none';
    return;
  }


}



function tileGo(i) {
  tileCur = (i + TILES_DATA.length) % TILES_DATA.length;
  tileRender();
}

function tileInitSwipe() {
  const tw = document.getElementById('tw');
  if (!tw) return;

  // Touch
  tw.addEventListener('touchstart', e => {
    tileStartX = e.touches[0].clientX;
    tileDragging = true;
  }, { passive: true });

  tw.addEventListener('touchend', e => {
    if (!tileDragging) return;
    tileDragging = false;
    const dx = e.changedTouches[0].clientX - tileStartX;
    if (Math.abs(dx) > 40) tileGo(dx < 0 ? tileCur + 1 : tileCur - 1);
  });

  // Souris (desktop fallback)
  tw.addEventListener('mousedown', e => {
    tileStartX = e.clientX;
    tileDragging = true;
  });
  window.addEventListener('mouseup', e => {
    if (!tileDragging) return;
    tileDragging = false;
    const dx = e.clientX - tileStartX;
    if (Math.abs(dx) > 40) tileGo(dx < 0 ? tileCur + 1 : tileCur - 1);
  });
}

// Init au chargement
document.addEventListener('DOMContentLoaded', () => {
  tileRender();
  tileInitSwipe();
});