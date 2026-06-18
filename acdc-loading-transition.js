(function () {
  'use strict';

  if (window.acdcLoadingTransition) return;
  window.acdcLoadingTransition = true;

  if (sessionStorage.getItem('acdc_intro_played')) return;

  var CSS_ID = 'acdc-transition-style';

  var style = document.createElement('style');
  style.id = CSS_ID;
  style.textContent = `
    #acdc-transition {
      position: fixed;
      inset: 0;
      background: #fff;
      z-index: 999999999;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      opacity: 1;
      transition: opacity .5s cubic-bezier(.4,0,.2,1);
    }
    #acdc-transition.hide {
      opacity: 0;
      pointer-events: none;
    }

    .acdc-stage {
      text-align: center;
      width: min(760px, 88vw);
    }

    .acdc-logo {
      font-size: 46px;
      font-weight: 900;
      letter-spacing: 14px;
      color: #1a1a1a;
      opacity: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      animation: acdcFadeUp .7s cubic-bezier(.22,.61,.36,1) .05s forwards;
    }

    .acdc-tag {
      margin-top: 10px;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #999;
      opacity: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      animation: acdcFadeUp .7s cubic-bezier(.22,.61,.36,1) .15s forwards;
    }

    /* ── SVG sketch
       Cada elemento usa pathLength="100" — normaliza o dasharray
       para 100 independente do comprimento real do traço, então
       stroke-dasharray:100 e stroke-dashoffset:100 funcionam certo
       em qualquer tipo de shape (rect, line, path, circle).
    ── */
    .acdc-scene {
      width: 100%;
      max-width: 620px;
      margin: 56px auto 36px;
    }

    .acdc-scene * {
      fill: none;
      stroke: #1a1a1a;
      stroke-width: 1.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
    }

    /* delays escalonados — duração 0.55s cada.
       último elemento: delay 0.85s → termina em 1.40s.
       overlay some em 1550ms → animação completa sem corte. */
    .acdc-s1  { animation: acdcDraw .55s ease .10s forwards; }
    .acdc-s2  { animation: acdcDraw .55s ease .20s forwards; }
    .acdc-s3  { animation: acdcDraw .55s ease .28s forwards; }
    .acdc-s4  { animation: acdcDraw .55s ease .36s forwards; }
    .acdc-s5  { animation: acdcDraw .55s ease .44s forwards; }
    .acdc-s6  { animation: acdcDraw .55s ease .52s forwards; }
    .acdc-s7  { animation: acdcDraw .55s ease .60s forwards; }
    .acdc-s8  { animation: acdcDraw .55s ease .68s forwards; }
    .acdc-s9  { animation: acdcDraw .55s ease .76s forwards; }
    .acdc-s10 { animation: acdcDraw .55s ease .85s forwards; }

    .acdc-progress {
      width: 180px;
      height: 1px;
      background: #e8e8e8;
      margin: 0 auto;
      overflow: hidden;
    }
    .acdc-progress::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: #1a1a1a;
      transform: translateX(-100%);
      /* barra termina junto com o último traço do SVG */
      animation: acdcProgressFill 1.3s cubic-bezier(.4,0,.6,1) .1s forwards;
    }

    @keyframes acdcDraw {
      to { stroke-dashoffset: 0; }
    }
    @keyframes acdcFadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes acdcProgressFill {
      to { transform: translateX(0); }
    }

    @media (max-width: 600px) {
      .acdc-logo  { font-size: 28px; letter-spacing: 8px; }
      .acdc-tag   { font-size: 9px;  letter-spacing: 3px; }
      .acdc-scene { margin: 36px auto 28px; }
    }
  `;
  document.head.appendChild(style);

  /*
    SVG: sketch minimalista de interiores
    Composição (viewBox 700×280):
      1. Parede fundo (retângulo)
      2. Janela (retângulo)
      3. Janela — barra vertical
      4. Janela — barra horizontal
      5. Sofá — estrutura principal
      6. Sofá — linha do encosto
      7. Sofá — braço esquerdo
      8. Sofá — braço direito
      9. Luminária de chão — haste
     10. Luminária de chão — cúpula
  */
  var overlay = document.createElement('div');
  overlay.id = 'acdc-transition';
  overlay.innerHTML = `
    <div class="acdc-stage">
      <div class="acdc-logo">ACDC CASA</div>
      <div class="acdc-tag">Móveis &nbsp;·&nbsp; Papéis de Parede &nbsp;·&nbsp; Decoração</div>
      <svg class="acdc-scene" viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">

        <!-- 1. Parede fundo -->
        <rect  class="acdc-s1"  pathLength="100" x="60"  y="40"  width="580" height="185"/>

        <!-- 2-4. Janela + divisórias -->
        <rect  class="acdc-s2"  pathLength="100" x="210" y="64"  width="140" height="105"/>
        <line  class="acdc-s3"  pathLength="100" x1="280" y1="64"  x2="280" y2="169"/>
        <line  class="acdc-s4"  pathLength="100" x1="210" y1="116" x2="350" y2="116"/>

        <!-- 5-8. Sofá (direita) -->
        <!-- estrutura: back + seat em path único pra ficar coeso -->
        <path  class="acdc-s5"  pathLength="100"
               d="M420,100 L420,190 L600,190 L600,100"/>
        <line  class="acdc-s6"  pathLength="100" x1="420" y1="140" x2="600" y2="140"/>
        <!-- braço esquerdo -->
        <line  class="acdc-s7"  pathLength="100" x1="420" y1="100" x2="420" y2="225"/>
        <!-- braço direito -->
        <line  class="acdc-s8"  pathLength="100" x1="600" y1="100" x2="600" y2="225"/>

        <!-- 9-10. Luminária de chão (esquerda) -->
        <line  class="acdc-s9"  pathLength="100" x1="130" y1="225" x2="130" y2="80"/>
        <!-- cúpula como arco -->
        <path  class="acdc-s10" pathLength="100"
               d="M105,80 Q130,55 155,80 L148,112 L112,112 Z"/>

      </svg>
      <div class="acdc-progress"></div>
    </div>
  `;

  function ensureInDom() {
    if (!document.getElementById('acdc-transition') && document.body) {
      document.body.appendChild(overlay);
      // impede scroll enquanto o overlay estiver visível
      document.body.style.overflow = 'hidden';
    }
  }

  function hideTransition() {
    var el = document.getElementById('acdc-transition');
    if (!el) return;
    el.classList.add('hide');
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
      document.body.style.overflow = '';
      sessionStorage.setItem('acdc_intro_played', 'true');
    }, 520); // aguarda o fade-out (.5s) + margem
  }

  function init() {
    ensureInDom();
    // 1550ms: garante que o último traço (delay 0.85s + dur 0.55s = 1.40s) termina
    setTimeout(hideTransition, 1550);
  }

  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

})();
