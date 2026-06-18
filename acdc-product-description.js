(function () {
  'use strict';

  if (window.__acdcDescriptionInit) return;
  window.__acdcDescriptionInit = true;

  var CSS_ID = 'acdc-description-style';
  var built  = false;

  /* ════════════════════════════════════════════════════════════
     CSS
  ════════════════════════════════════════════════════════════ */
  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var s = document.createElement('style');
    s.id = CSS_ID;
    s.textContent = `
      [data-store*="product-description"] > h6 { display:none !important; }

      .acdc-product-description {
        width:100%; font-family:"Helvetica Neue",Helvetica,Arial,system-ui,sans-serif;
        color:#1a1a1a; background:transparent; line-height:1.6;
      }

      /* seção */
      .acdc-section { padding:20px 0; border-top:1px solid #ebebeb; }
      .acdc-section:first-child { border-top:0; padding-top:0; }
      .acdc-section h3 {
        margin:0 0 16px; font-size:10px; font-weight:600;
        letter-spacing:.18em; text-transform:uppercase; color:#aaaaaa;
      }

      /* linhas de detalhe */
      .acdc-row {
        display:flex; flex-wrap:wrap; align-items:baseline;
        gap:4px 10px; padding:8px 0; border-bottom:1px solid #f2f2f2;
      }
      .acdc-row:last-child { border-bottom:0; padding-bottom:0; }
      .acdc-label {
        font-size:10px; font-weight:600; letter-spacing:.12em;
        text-transform:uppercase; color:#1a1a1a; white-space:nowrap; min-width:90px;
      }
      .acdc-value {
        font-size:13.5px; font-weight:400; letter-spacing:.01em;
        color:#666666; word-break:break-word;
      }

      /* grade de dimensões: gap de 1px via background no wrapper */
      .acdc-dimensions { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#ebebeb; }
      .acdc-dimension {
        background:#ffffff; padding:16px 12px;
        display:flex; flex-direction:column; align-items:center;
        justify-content:center; text-align:center;
        opacity:0; transform:translateY(8px);
        transition:opacity .4s ease,transform .4s ease;
      }
      .acdc-dimension.visible { opacity:1; transform:translateY(0); }
      .acdc-dimension:hover   { background:#fafafa; }
      .acdc-dimension-label {
        font-size:9.5px; font-weight:600; letter-spacing:.12em;
        text-transform:uppercase; color:#aaaaaa; margin-bottom:6px;
      }
      .acdc-dimension-value {
        font-size:clamp(17px,2vw,22px); font-weight:300;
        letter-spacing:-.01em; color:#1a1a1a; line-height:1.2;
      }

      /* notas */
      .acdc-notes { margin-top:20px; padding-top:16px; border-top:1px solid #ebebeb; }
      .acdc-notes p {
        margin:0 0 6px; font-size:12.5px; font-weight:400;
        letter-spacing:.02em; color:#888888; line-height:1.6;
      }
      .acdc-notes p:last-child { margin-bottom:0; }

      .acdc-product-description img {
        max-width:100%; height:auto; display:block;
        margin:0 auto 12px; object-fit:contain; border-radius:0;
      }

      @media(max-width:900px){ .acdc-dimensions{grid-template-columns:repeat(2,1fr);} }
      @media(max-width:480px){
        .acdc-dimensions{grid-template-columns:1fr;}
        .acdc-row{flex-direction:column;gap:2px;}
        .acdc-label{min-width:auto;}
      }
    `;
    document.head.appendChild(s);
  }

  /* ════════════════════════════════════════════════════════════
     UTILS
  ════════════════════════════════════════════════════════════ */
  function sanitize(s) { return String(s || '').trim().replace(/\s+/g, ' '); }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function dedup(arr, keyFn) {
    var seen = new Set(), out = [];
    arr.forEach(function(x){ var k=keyFn(x); if(!seen.has(k)){seen.add(k);out.push(x);} });
    return out;
  }

  var DIM_WORDS = /altura|largura|profundidade|comprimento|assento|di[aâ]metro|espessura|peso|tamanho/i;
  var OBS_WORDS = /^(?:obs|observa[çc][ãa]o|nota)$/i;
  var MEDIDAS_STRIP = /^medidas?\s*(?:unit[aá]rias?)?\s*[:–\-]*/i;

  /* ════════════════════════════════════════════════════════════
     PASSO 1 — TOKENIZADOR
     Varre o texto inteiro em busca de TODOS os pares Label: valor,
     independente de onde estão na linha.
     Regex: 1-3 palavras (primeira maiúscula, sem dígito inicial),
     seguidas de ":"  que NÃO seja parte de hora (12:00) nem URL.
  ════════════════════════════════════════════════════════════ */
  var LABEL_RE = /([A-ZÁÉÍÓÚÀÃÕÇ][A-ZÁÉÍÓÚÀÃÕÇa-záéíóúàãõç\-]*(?:\s+[A-ZÁÉÍÓÚÀÃÕÇa-záéíóúàãõç\-]+){0,2})\s*:/g;

  function tokenize(text) {
    var hits = [], m;
    LABEL_RE.lastIndex = 0;

    while ((m = LABEL_RE.exec(text)) !== null) {
      var label = sanitize(m[1]);

      // descarta se muito curto (1 letra) ou parece ser parte de URL/email
      if (label.length < 2) continue;
      var charBefore = m.index > 0 ? text[m.index - 1] : '';
      if (/[@\/\\]/.test(charBefore)) continue;

      // descarta se é um número disfarçado (ex: "R$" → já filtrado por [A-Z])
      // descarta "Às 10:", "Às 15h" type things — hora pattern: single letter + colon + digit
      var charAfter = text[m.index + m[0].length] || '';
      if (label.length <= 2 && /\d/.test(charAfter)) continue; // "D: 5" ok, "D:5" skip if very short

      hits.push({ label: label, valueStart: m.index + m[0].length, labelStart: m.index });
    }
    return hits;
  }

  /* ════════════════════════════════════════════════════════════
     PASSO 2 — EXTRAÇÃO DA MEDIDA
     Para valores de dimensão, pega só o número + unidade inicial.
     O resto vai para observações.
     Suporta: cm, mm, m, m², m2, kg, g, ml, l, polegadas, "
  ════════════════════════════════════════════════════════════ */
  var UNIT_RE = /^(\d+(?:[,\.]\d+)?(?:\s*(?:cm|mm|m[²2]?|kg|g(?!rafia)|ml|l|"|pol(?:egadas?)?))?)\b/i;

  function extractMeasurement(value) {
    var m = value.match(UNIT_RE);
    if (!m || !m[1]) return null;
    var meas = m[1].trim();
    var rest = value.slice(m[1].length).replace(/^[\s,;.]+/, '').trim();
    return { meas: meas, rest: rest };
  }

  function addDefaultUnit(label, value) {
    if (/[a-zA-ZÀ-ö]/.test(value)) return value;
    if (/peso/i.test(label)) return value + ' kg';
    return value + ' cm';
  }

  /* ════════════════════════════════════════════════════════════
     PASSO 3 — SEPARAR VALOR CURTO DE NOTA LONGA
     Para detalhes não-dimensionais cujo valor contém uma nota
     embutida, ex: "Bege e fendi Lembre-se de sempre calcular..."
     → value = "Bege e fendi",  note = "Lembre-se de sempre..."

     Critério: a partir da 3ª palavra, se encontrar uma palavra
     com inicial maiúscula que NÃO seja precedida por conector
     comum, inicia a nota aí.
  ════════════════════════════════════════════════════════════ */
  var CONNECTORS = new Set([
    'e','de','da','do','das','dos','em','com','por','para','ou',
    'a','o','um','uma','no','na','ao','à','as','os','se','que',
    'mais','menos','muito','pouco','bem','mal','já','ainda'
  ]);

  function splitValueNote(value) {
    if (value.length < 25) return { value: value, note: '' };
    var words = value.split(/\s+/);
    if (words.length <= 3) return { value: value, note: '' };

    for (var i = 2; i < words.length; i++) {
      var w = words[i];
      // palavra começa com maiúscula e não é acrônimo curto (MDF, etc.) com mais contexto
      if (/^[A-ZÁÉÍÓÚÀÃÕÇ][a-záéíóúàãõç]/.test(w)) {
        var prev = words[i - 1].replace(/[,;.!?]+$/, '').toLowerCase();
        if (!CONNECTORS.has(prev)) {
          return {
            value: words.slice(0, i).join(' ').replace(/[,;.]+$/, '').trim(),
            note:  words.slice(i).join(' ').trim()
          };
        }
      }
    }
    return { value: value, note: '' };
  }

  /* ════════════════════════════════════════════════════════════
     PARSER PRINCIPAL
  ════════════════════════════════════════════════════════════ */
  function findContainer() {
    return document.querySelector('[data-store*="product-description"] .user-content')
        || document.querySelector('.user-content.font-small.mb-4');
  }

  function animateCards() {
    document.querySelectorAll('.acdc-dimension').forEach(function(el){ el.classList.add('visible'); });
  }

  function buildDescription(container) {
    if (container.dataset.acdcReady === 'true') return false;

    var raw = sanitize(container.innerText || container.textContent || '');
    if (!raw) return false;
    container.dataset.acdcReady = 'true';

    var prev = container.previousElementSibling;
    if (prev && prev.tagName.toLowerCase() === 'h6') prev.style.display = 'none';

    /* ── tokeniza o texto completo ── */
    var positions = tokenize(raw);

    var dimensions  = [];
    var details     = [];
    var observations = [];

    /* texto antes do primeiro label → observação */
    if (positions.length > 0 && positions[0].labelStart > 0) {
      var pre = raw.slice(0, positions[0].labelStart).trim();
      if (pre) observations.push(pre);
    }
    if (positions.length === 0) {
      observations.push(raw);
    }

    for (var i = 0; i < positions.length; i++) {
      var label = positions[i].label;
      var valueEnd = i + 1 < positions.length ? positions[i + 1].labelStart : raw.length;
      var value = raw.slice(positions[i].valueStart, valueEnd)
                     .replace(/[\s,;.]+$/, '').trim();

      /* remove prefixo "Medidas Unitárias:" (label vazio após strip) */
      label = label.replace(MEDIDAS_STRIP, '').trim();
      if (!label || value === '') continue;

      /* Obs / Nota → observação */
      if (OBS_WORDS.test(label)) { observations.push(value); continue; }

      var isDim = DIM_WORDS.test(label);

      if (isDim) {
        var meas = extractMeasurement(value);
        if (meas) {
          if (meas.rest) observations.push(meas.rest);
          dimensions.push({ label: label, value: addDefaultUnit(label, meas.meas) });
        } else {
          dimensions.push({ label: label, value: addDefaultUnit(label, value) });
        }
      } else {
        var sv = splitValueNote(value);
        if (sv.value) details.push({ label: label, value: sv.value });
        if (sv.note)  observations.push(sv.note);
      }
    }

    /* dedup */
    var dims = dedup(dimensions,   function(d){ return d.label + '||' + d.value; });
    var dets = dedup(details,      function(d){ return d.label + '||' + d.value; });
    var obs  = dedup(observations, function(s){ return s.toLowerCase().slice(0, 60); });

    /* filtra observações muito curtas (artefatos do parser) */
    obs = obs.filter(function(o){ return o.length > 4; });

    /* ── gera HTML ── */
    var html = '<div class="acdc-product-description" role="region" aria-label="Descrição do produto">';

    if (dets.length) {
      html += '<div class="acdc-section"><h3>Descrição</h3>';
      dets.forEach(function(d){
        html += '<div class="acdc-row">'
             +  '<span class="acdc-label">'  + escapeHtml(d.label) + '</span>'
             +  '<span class="acdc-value">'  + escapeHtml(d.value) + '</span>'
             +  '</div>';
      });
      html += '</div>';
    }

    if (dims.length) {
      html += '<div class="acdc-section"><h3>Dimensões</h3><div class="acdc-dimensions">';
      dims.forEach(function(d, i){
        html += '<div class="acdc-dimension" style="transition-delay:' + (i * 55) + 'ms">'
             +  '<div class="acdc-dimension-label">' + escapeHtml(d.label) + '</div>'
             +  '<div class="acdc-dimension-value">' + escapeHtml(d.value) + '</div>'
             +  '</div>';
      });
      html += '</div></div>';
    }

    if (obs.length) {
      html += '<div class="acdc-notes">';
      obs.forEach(function(o){ html += '<p>' + escapeHtml(o) + '</p>'; });
      html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
    animateCards();
    return true;
  }

  /* ════════════════════════════════════════════════════════════
     ORQUESTRAÇÃO
  ════════════════════════════════════════════════════════════ */
  var observer   = null;
  var retryTimer = null;
  var attempts   = 0;
  var MAX_ATTEMPTS = 12;

  function tryBuild() {
    if (built) return;
    var c = findContainer();
    if (c && buildDescription(c)) {
      built = true;
      if (observer)   { observer.disconnect();    observer   = null; }
      if (retryTimer) { clearTimeout(retryTimer); retryTimer = null; }
    }
  }

  function scheduleRetries() {
    [300, 800, 1800].forEach(function(ms){ setTimeout(function(){ if(!built) tryBuild(); }, ms); });
    (function tick(){
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
        observer = new MutationObserver(function(){ if (!built) tryBuild(); });
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
