(function () {
  var script = document.currentScript;
  var fotosUrl = (script && script.getAttribute('data-fotos')) || 'https://raw.githubusercontent.com/escalopicitas-code/Widgets-ACDC-/main/galeria-acdc/fotos.txt';
  var titulo = (script && script.getAttribute('data-title')) || 'Galeria';
  var chamada = (script && script.getAttribute('data-eyebrow')) || 'Portfólio completo';

  var root = document.createElement('section');
  root.className = 'acdc-gallery-clean';
  if (script && script.parentNode) script.parentNode.insertBefore(root, script);
  else document.body.appendChild(root);

  if (!document.getElementById('acdc-gallery-clean-css')) {
    var style = document.createElement('style');
    style.id = 'acdc-gallery-clean-css';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Open+Sans:wght@400;600;700&display=swap');
      .acdc-gallery-clean{--ink:#111;--muted:rgba(17,17,17,.58);--line:rgba(17,17,17,.14);background:#fff;color:var(--ink);font-family:'Open Sans',Arial,sans-serif;padding:clamp(42px,7vw,82px) clamp(18px,5vw,48px)}
      .acdc-gallery-clean *{box-sizing:border-box}
      .acdc-gallery-clean__wrap{max-width:1280px;margin:0 auto}
      .acdc-gallery-clean__eyebrow{margin:0 0 10px;color:var(--muted);font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
      .acdc-gallery-clean__title{margin:0 0 clamp(28px,5vw,44px);font-family:'Hammersmith One',Arial,sans-serif;font-size:clamp(32px,5.4vw,60px);font-weight:400;line-height:1;text-transform:uppercase}
      .acdc-gallery-clean__stage{position:relative}
      .acdc-gallery-clean__track{display:flex;gap:clamp(12px,2vw,20px);overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;padding-bottom:4px}
      .acdc-gallery-clean__track::-webkit-scrollbar{display:none}
      .acdc-gallery-clean__card{flex:0 0 calc((100% - 40px)/2.4);aspect-ratio:1/1;border:0;border-radius:6px;overflow:hidden;background:#eee;padding:0;cursor:pointer;scroll-snap-align:start}
      .acdc-gallery-clean__card img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .55s ease}
      .acdc-gallery-clean__card:hover img{transform:scale(1.06)}
      .acdc-gallery-clean__arrow{position:absolute;top:50%;z-index:4;transform:translateY(-50%);width:48px;height:48px;border:1px solid var(--line);border-radius:50%;background:rgba(255,255,255,.94);box-shadow:0 8px 24px rgba(0,0,0,.12);color:#111;font-size:32px;line-height:1;cursor:pointer}
      .acdc-gallery-clean__arrow:hover{background:#111;color:#fff}
      .acdc-gallery-clean__prev{left:-10px}.acdc-gallery-clean__next{right:-10px}
      .acdc-gallery-clean__view{display:block;margin:28px auto 0;padding:12px 24px;border:1px solid var(--line);border-radius:999px;background:#fff;color:#111;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
      .acdc-gallery-clean__view:hover{background:#111;color:#fff}
      .acdc-gallery-clean.is-expanded .acdc-gallery-clean__track{display:grid;grid-template-columns:repeat(4,1fr);overflow:visible;scroll-snap-type:none}
      .acdc-gallery-clean.is-expanded .acdc-gallery-clean__card{flex:none;width:100%}
      .acdc-gallery-clean.is-expanded .acdc-gallery-clean__arrow{display:none}
      .acdc-gallery-clean__message{padding:24px;border:1px dashed var(--line);color:#777;font-size:14px}
      .acdc-gallery-clean__lightbox{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;gap:18px;padding:24px}
      .acdc-gallery-clean__lightbox[hidden]{display:none}
      .acdc-gallery-clean__big{width:min(74vw,70vh,680px);height:min(74vw,70vh,680px);object-fit:cover;border-radius:8px;background:#111;box-shadow:0 20px 70px rgba(0,0,0,.55)}
      .acdc-gallery-clean__close,.acdc-gallery-clean__lbnav{border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);color:#fff;border-radius:50%;cursor:pointer}
      .acdc-gallery-clean__close{position:absolute;top:22px;right:22px;width:46px;height:46px;font-size:30px}
      .acdc-gallery-clean__lbnav{width:54px;height:54px;font-size:38px;line-height:1}
      .acdc-gallery-clean__counter{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);color:#fff;font-size:13px;font-weight:700;letter-spacing:.1em}
      @media(max-width:560px){.acdc-gallery-clean__card{flex-basis:82%;scroll-snap-align:center}.acdc-gallery-clean__arrow{width:40px;height:40px}.acdc-gallery-clean__prev{left:4px}.acdc-gallery-clean__next{right:4px}.acdc-gallery-clean__view{display:none}.acdc-gallery-clean__big{width:min(88vw,60vh,460px);height:min(88vw,60vh,460px)}.acdc-gallery-clean__lbnav{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;background:rgba(0,0,0,.45);font-size:28px}.acdc-gallery-clean__lbprev{left:10px}.acdc-gallery-clean__lbnext{right:10px}}
      @media(min-width:561px) and (max-width:900px){.acdc-gallery-clean.is-expanded .acdc-gallery-clean__track{grid-template-columns:repeat(3,1fr)}}
    `;
    document.head.appendChild(style);
  }

  root.innerHTML = `
    <div class="acdc-gallery-clean__wrap">
      <p class="acdc-gallery-clean__eyebrow"></p>
      <h2 class="acdc-gallery-clean__title"></h2>
      <div class="acdc-gallery-clean__stage">
        <button class="acdc-gallery-clean__arrow acdc-gallery-clean__prev" type="button" aria-label="Foto anterior">‹</button>
        <div class="acdc-gallery-clean__track"></div>
        <button class="acdc-gallery-clean__arrow acdc-gallery-clean__next" type="button" aria-label="Próxima foto">›</button>
      </div>
      <button class="acdc-gallery-clean__view" type="button">Ver todas as fotos</button>
    </div>
    <div class="acdc-gallery-clean__lightbox" hidden>
      <button class="acdc-gallery-clean__close" type="button" aria-label="Fechar">×</button>
      <button class="acdc-gallery-clean__lbnav acdc-gallery-clean__lbprev" type="button" aria-label="Imagem anterior">‹</button>
      <img class="acdc-gallery-clean__big" src="" alt="">
      <button class="acdc-gallery-clean__lbnav acdc-gallery-clean__lbnext" type="button" aria-label="Próxima imagem">›</button>
      <div class="acdc-gallery-clean__counter"></div>
    </div>
  `;

  root.querySelector('.acdc-gallery-clean__eyebrow').textContent = chamada;
  root.querySelector('.acdc-gallery-clean__title').textContent = titulo;

  var track = root.querySelector('.acdc-gallery-clean__track');
  var lightbox = root.querySelector('.acdc-gallery-clean__lightbox');
  var big = root.querySelector('.acdc-gallery-clean__big');
  var counter = root.querySelector('.acdc-gallery-clean__counter');
  var photos = [];
  var current = 0;

  function parse(text) {
    return String(text || '')
      .split('\n')
      .map(function (line) { return line.trim(); })
      .filter(function (line) { return line && line.charAt(0) !== '#'; })
      .map(function (line) {
        var parts = line.split('|');
        return { src: (parts[0] || '').trim(), alt: (parts.slice(1).join('|') || 'Ambiente ACDC Casa').trim() };
      })
      .filter(function (item) { return /^https?:\/\//i.test(item.src); });
  }

  function render() {
    track.innerHTML = '';
    if (!photos.length) {
      track.innerHTML = '<div class="acdc-gallery-clean__message">Nenhuma foto encontrada no arquivo fotos.txt.</div>';
      return;
    }
    photos.forEach(function (photo, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'acdc-gallery-clean__card';
      button.setAttribute('aria-label', 'Ver imagem ' + (index + 1) + ' de ' + photos.length);
      var img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt;
      img.loading = 'lazy';
      button.appendChild(img);
      button.addEventListener('click', function () { openLightbox(index); });
      track.appendChild(button);
    });
  }

  function step() {
    var card = track.querySelector('.acdc-gallery-clean__card');
    var gap = parseFloat(getComputedStyle(track).gap || 0) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  }

  function openLightbox(index) {
    if (!photos.length) return;
    current = (index + photos.length) % photos.length;
    big.src = photos[current].src;
    big.alt = photos[current].alt;
    counter.textContent = (current + 1) + ' / ' + photos.length;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  root.querySelector('.acdc-gallery-clean__prev').addEventListener('click', function () { track.scrollBy({ left: -step() * 2, behavior: 'smooth' }); });
  root.querySelector('.acdc-gallery-clean__next').addEventListener('click', function () { track.scrollBy({ left: step() * 2, behavior: 'smooth' }); });
  root.querySelector('.acdc-gallery-clean__view').addEventListener('click', function () {
    var expanded = root.classList.toggle('is-expanded');
    this.textContent = expanded ? 'Ver como carrossel' : 'Ver todas as fotos';
  });
  root.querySelector('.acdc-gallery-clean__close').addEventListener('click', closeLightbox);
  root.querySelector('.acdc-gallery-clean__lbprev').addEventListener('click', function () { openLightbox(current - 1); });
  root.querySelector('.acdc-gallery-clean__lbnext').addEventListener('click', function () { openLightbox(current + 1); });
  lightbox.addEventListener('click', function (event) { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (event) {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') openLightbox(current - 1);
    if (event.key === 'ArrowRight') openLightbox(current + 1);
  });

  fetch(fotosUrl + '?t=' + Date.now(), { cache: 'no-store' })
    .then(function (response) {
      if (!response.ok) throw new Error('Erro ' + response.status);
      return response.text();
    })
    .then(function (text) { photos = parse(text); render(); })
    .catch(function (error) {
      track.innerHTML = '<div class="acdc-gallery-clean__message">Galeria não carregou. Verifique o arquivo fotos.txt.</div>';
      console.error('ACDC Galeria:', error);
    });
})();
