(function () {
  'use strict';

  if (window.__acdcDescriptionInit) return;
  window.__acdcDescriptionInit = true;

  var CSS_ID    = 'acdc-description-style';
  var READY_KEY = 'acdcReady';
  var built     = false;

  /* ── estilos ── */
  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var style = document.createElement('style');
    style.id = CSS_ID;
    style.textContent = `
      [data-store*="product-description"] > h6 { display: none !important; }

      .acdc-product-description {
        width: 100%;
        font-family: "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
        color: #1a1a1a;
        background: transparent;
        line-height: 1.6;
      }

      .acdc-section {
        padding: 20px 0;
        border-top: 1px solid #ebebeb;
      }
      .acdc-section:first-child { border-top: 0; padding-top: 0; }

      .acdc-section h3 {
        margin: 0 0 16px;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: .18em;
        text-transform: uppercase;
        color: #aaaaaa;
      }

      .acdc-row {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 4px 10px;
        padding: 8px 0;
        border-bottom: 1px solid #f2f2f2;
      }
      .acdc-row:last-child { border-bottom: 0; padding-bottom: 0; }

      .acdc-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: #1a1a1a;
        white-space: nowrap;
        min-width: 90px;
      }

      .acdc-value {
        font-size: 13.5px;
        font-weight: 400;
        letter-spacing: .01em;
        color: #666666;
        word-break: break-word;
      }

      /* grade de dimensões: gap de 1px via background no grid-wrapper */
      .acdc-dimensions {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: #ebebeb;
      }

      .acdc-dimension {
        background: #ffffff;
        padding: 16px 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity .4s ease, transform .4s ease;
      }
      .acdc-dimension.visible { opacity: 1; transform: translateY(0); }
      .acdc-dimension:hover   { background: #fafafa; }

      .acdc-dimension-label {
        font-size: 9.5px;
        font-weight: 600;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: #aaaaaa;
        margin-bottom: 6px;
      }

      .acdc-dimension-value {
        font-size: clamp(17px, 2vw, 22px);
        font-weight: 300;
        letter-spacing: -.01em;
        color: #1a1a1a;
        line-height: 1.2;
      }

      .acdc-notes {
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid #ebebeb;
        background: transparent;
      }
      .acdc-notes p {
        margin: 0 0 6px;
        font-size: 12.5px;
        font-weight: 400;
        letter-spacing: .02em;
        color: #888888;
        line-height: 1.6;
      }
      .acdc-notes p:last-child { margin-bottom: 0; }

      .acdc-product-description img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto 12px;
        object-fit: contain;
        border-radius: 0;
      }

      @media (max-width: 900px) { .acdc-dimensions { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 480px) {
        .acdc-dimensions { grid-template-columns: 1fr; }
        .acdc-row        { flex-direction: column; gap: 2px; }
        .acdc-label      { min-width: auto; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── helpers ── */
  function sanitize(s) { return String(s || '').trim().replace(/\s+/g, ' '); }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function addDefaultUnit(label, value) {
    if (/[a-zA-Z]/.test(value)) return value;
    if (/peso/i.test(label))    return value + ' kg';
    return value + ' cm';
  }

  function dedup(arr, keyFn) {
    var seen = new Set(), result = [];
    arr.forEach(function (item) {
      var k = keyFn(item);
      if (!seen.has(k)) { seen.add(k); result.push(item); }
    });
    return result;
  }

  /* ─────────────────────────────────────────────────────────────
     normalizeRaw
     Pré-processa o texto bruto inserindo quebras de linha nos
     lugares onde múltiplos pares label:valor estão concatenados
     na mesma linha — padrão comum em descrições da Nuvemshop.

     Exemplo: "Profundidade: 62 cm Cor: Bege Obs: Consulte-nos"
     vira:   "Profundidade: 62 cm\nCor: Bege\nObs: Consulte-nos"
  ───────────────────────────────────────────────────────────── */
  function normalizeRaw(raw) {
    return raw
      // 1. "Obs: / Observação: / Nota:" inline → nova linha
      .replace(/\s+(obs(?:erva[çc][ãa]o)?\s*:|nota\s*:)/gi, '\n$1')

      // 2. Após valor com unidade de medida (62 cm, 40 mm, 1.5 kg...),
      //    quando o próximo token parece um label (palavra maiúscula + ":"),
      //    insere quebra de linha antes do label.
      //    Ex: "62 cm Cor:"  →  "62 cm\nCor:"
      .replace(
        /(\d+(?:[,\.]\d+)?\s*(?:cm|mm|m\b|kg|g|l)\b)\s+(?=[A-ZÁÉÍÓÚÀÃÕÇ][\w\s]{0,30}:)/gi,
        '$1\n'
      )

      // 3. Após número puro (sem unidade) seguido de label aparente
      //    mas NÃO quando o número faz parte de uma palavra como "D-28"
      //    Ex: "Altura: 80 Cor:"  →  "Altura: 80\nCor:"
      .replace(
        /((?:^|[^a-zA-ZÀ-ö\-])(\d+(?:[,\.]\d+)?))\s+(?=[A-ZÁÉÍÓÚÀÃÕÇ][^:\n\d]{1,25}:)/gm,
        '$1\n'
      )

      // 4. Após fim de frase (ponto/!/?), se o que vem a seguir
      //    parece ser um novo label.
      //    Ex: "...epóxi. Medidas: Altura: 80"  →  "...epóxi.\nMedidas: Altura: 80"
      .replace(/([.!?])\s+(?=[A-ZÁÉÍÓÚÀÃÕÇ][\w\s]{0,25}:)/g, '$1\n');
  }

  /* ── DOM ── */
  function findContainer() {
    return document.querySelector('[data-store*="product-description"] .user-content') ||
           document.querySelector('.user-content.font-small.mb-4');
  }

  function animateCards() {
    document.querySelectorAll('.acdc-dimension').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── parser principal ── */
  function buildDescription(container) {
    if (container.dataset[READY_KEY] === 'true') return false;

    var raw = sanitize(container.innerText || container.textContent || '');
    if (!raw) return false;

    container.dataset[READY_KEY] = 'true';

    var prev = container.previousElementSibling;
    if (prev && prev.tagName.toLowerCase() === 'h6') prev.style.display = 'none';

    // normaliza antes de splittar em linhas
    raw = normalizeRaw(raw);

    var lines = raw
      .replace(/\r/g, '\n')
      .split(/[\n;|]+/)
      .map(sanitize)
      .filter(Boolean);

    // dedup por conteúdo
    var linesSeen = new Set();
    lines = lines.filter(function (l) {
      var k = l.toLowerCase();
      if (linesSeen.has(k)) return false;
      linesSeen.add(k);
      return true;
    });

    var dimensions  = [];
    var details     = [];
    var observations = [];

    lines.forEach(function (line) {
      // remove prefixo "Medidas:" solto (ex: "Medidas: Altura: 80" → "Altura: 80")
      line = line.replace(/^medidas?\s*(?:unit[aá]rias?)?\s*[:–-]*/i, '').trim();
      if (!line) return;

      // linha que é só "Obs" / "Observação" sem conteúdo
      if (/^(?:obs|observa[çc][ãa]o|nota)\s*:?\s*$/i.test(line)) return;

      // "Obs: texto"
      var obsM = line.match(/^(?:obs|observa[çc][ãa]o|nota)\s*[:–-]\s*(.+)/i);
      if (obsM) { observations.push(sanitize(obsM[1])); return; }

      // "Label: Valor"
      var pairM = line.match(/^([^:]+):\s*(.+)$/);
      if (!pairM) { observations.push(line); return; }

      var label = sanitize(pairM[1]);
      var value = sanitize(pairM[2]);

      var isDim = /altura|largura|profundidade|comprimento|assento|di[aâ]metro|espessura|peso|tamanho/i.test(label);

      if (isDim) dimensions.push({ label: label, value: addDefaultUnit(label, value) });
      else       details.push({ label: label, value: value });
    });

    var dims = dedup(dimensions,   function (d) { return d.label + '||' + d.value; });
    var dets = dedup(details,      function (d) { return d.label + '||' + d.value; });
    var obs  = dedup(observations, function (s) { return s.toLowerCase(); });

    /* ── monta HTML ── */
    var html = '<div class="acdc-product-description" role="region" aria-label="Descrição do produto">';

    if (dets.length) {
      html += '<div class="acdc-section"><h3>Descrição</h3>';
      dets.forEach(function (d) {
        html += '<div class="acdc-row">'
              + '<span class="acdc-label">'  + escapeHtml(d.label) + '</span>'
              + '<span class="acdc-value">'  + escapeHtml(d.value) + '</span>'
              + '</div>';
      });
      html += '</div>';
    }

    if (dims.length) {
      html += '<div class="acdc-section"><h3>Dimensões</h3><div class="acdc-dimensions">';
      dims.forEach(function (d, i) {
        html += '<div class="acdc-dimension" style="transition-delay:' + (i * 55) + 'ms">'
              + '<div class="acdc-dimension-label">' + escapeHtml(d.label) + '</div>'
              + '<div class="acdc-dimension-value">' + escapeHtml(d.value) + '</div>'
              + '</div>';
      });
      html += '</div></div>';
    }

    if (obs.length) {
      html += '<div class="acdc-notes">';
      obs.forEach(function (o) {
        html += '<p>' + escapeHtml(o) + '</p>';
      });
      html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
    animateCards();
    return true;
  }

  /* ── orquestração ── */
  var observer   = null;
  var retryTimer = null;
  var attempts   = 0;
  var MAX_ATTEMPTS = 12;

  function tryBuild() {
    if (built) return;
    var container = findContainer();
    if (container && buildDescription(container)) {
      built = true;
      if (observer)   { observer.disconnect();    observer   = null; }
      if (retryTimer) { clearTimeout(retryTimer); retryTimer = null; }
    }
  }

  function scheduleRetries() {
    [300, 800, 1800].forEach(function (ms) {
      setTimeout(function () { if (!built) tryBuild(); }, ms);
    });
    (function tick() {
      if (built || attempts >= MAX_ATTEMPTS) return;
      attempts++;
      tryBuild();
      retryTimer = setTimeout(tick, 2000);
    }());
  }

  function init() {
    injectCSS();
    tryBuild();
    if (!built) {
      scheduleRetries();
      if (window.MutationObserver) {
        observer = new MutationObserver(function () { if (!built) tryBuild(); });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
