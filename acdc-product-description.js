(function () {
  'use strict';

  if (window.__acdcDescriptionInit) return;
  window.__acdcDescriptionInit = true;

  var CSS_ID = 'acdc-description-style';
  var built  = false;

  /* ════════════════════════════════════════════════════════════
     CSS (Estilização dos Cards e Tabelas)
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

      /* grade de dimensões */
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
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  var DIM_WORDS = /altura|largura|profundidade|comprimento|assento|di[aâ]metro|espessura|peso|tamanho/i;
  var OBS_WORDS = /^(?:obs|observa[çc][ãa]o|nota|aten[çc][ãa]o|importante)$/i;

  function addDefaultUnit(label, value) {
    var cleanVal = value.replace(/(cm|ml|m|kg)\s*$/i, '').trim();
    if (/[a-zA-ZÀ-ö]/.test(cleanVal) && !/(cm|ml|m|kg)$/i.test(value)) return value;
    if (/peso/i.test(label)) return cleanVal + ' kg';
    if (/comprimento/i.test(label) && /ml/i.test(value)) return cleanVal + ' ml'; // mantem o padrão bizarro se houver
    return cleanVal + ' cm';
  }

  function findContainer() {
    return document.querySelector('[data-store*="product-description"] .user-content')
        || document.querySelector('.user-content.font-small.mb-4');
  }

  function animateCards() {
    document.querySelectorAll('.acdc-dimension').forEach(function(el){ el.classList.add('visible'); });
  }

  /* ════════════════════════════════════════════════════════════
     PROCESSADOR ULTRA RESILIENTE
  ════════════════════════════════════════════════════════════ */
  function buildDescription(container) {
    if (container.dataset.acdcReady === 'true') return false;

    var rawText = container.innerText || container.textContent || '';
    if (!rawText.trim()) return false;
    container.dataset.acdcReady = 'true';

    var prev = container.previousElementSibling;
    if (prev && prev.tagName.toLowerCase() === 'h6') prev.style.display = 'none';

    var lines = rawText.split(/\r?\n/);
    
    var descGeralHtml = "";
    var details = [];
    var dimensions = [];
    var observations = [];

    lines.forEach(function(line) {
      var trimmed = line.trim();
      if (!trimmed) return;

      // Remove falsos títulos redundantes
      if (/^(descri[çc][ãa]o|medidas?|dimen\s*s[õo]es)[:\-]?$/i.test(trimmed)) return;

      // Caso A: Linha com Pipes "|" (Múltiplas dimensões separadas por barras)
      if (trimmed.includes('|') && DIM_WORDS.test(trimmed)) {
        var parts = trimmed.split('|');
        parts.forEach(function(part) {
          var subMatch = part.trim().match(/^([^:]+):\s*(.*)$/);
          if (subMatch) {
            var dLabel = subMatch[1].trim();
            var dVal = subMatch[2].trim();
            dimensions.push({ label: dLabel, value: addDefaultUnit(dLabel, dVal) });
          }
        });
        return;
      }

      // Procura separadores flexíveis (tanto ":" quanto um espaço largo após palavras conhecidas)
      var matchLabel = trimmed.match(/^([^:]+):\s*(.*)$/);
      
      // Se não tem dois-pontos mas começa com uma palavra-chave conhecida seguida de texto
      if (!matchLabel) {
        var tokensConhecidos = /^(material|composi[çc][ãa]o|acabamento|cor|altura|largura|comprimento|profundidade|obs|nota)\b/i;
        if (tokensConhecidos.test(trimmed)) {
          var firstSpace = trimmed.indexOf(' ');
          if (firstSpace > 0) {
            matchLabel = [
              trimmed,
              trimmed.substring(0, firstSpace),
              trimmed.substring(firstSpace + 1)
            ];
          }
        }
      }

      if (matchLabel) {
        var label = matchLabel[1].trim().replace(/[:\-]+/g, '');
        var value = matchLabel[2].trim();

        if (OBS_WORDS.test(label)) {
          if (value) observations.push(value);
          return;
        }

        if (DIM_WORDS.test(label)) {
          dimensions.push({ label: label, value: addDefaultUnit(label, value) });
          return;
        }

        if (value.length > 50 || /^(material|composi[çc][ãa]o|acabamento)$/i.test(label)) {
          descGeralHtml += '<p style="font-size:13.5px; color:#666; margin-bottom:12px; line-height:1.6;">'
                        + '<strong>' + escapeHtml(label) + ':</strong> ' + escapeHtml(value) 
                        + '</p>';
          return;
        }

        details.push({ label: label, value: value });

      } else {
        // Se for aviso longo joga para observações, senão vira descrição geral
        if (/calcular|margem|sobra|estoque|responsabilizamos/i.test(trimmed) || trimmed.length > 60) {
          observations.push(trimmed);
        } else {
          descGeralHtml += '<p style="font-size:13.5px; color:#666; margin-bottom:12px; line-height:1.6;">' 
                        + escapeHtml(trimmed) 
                        + '</p>';
        }
      }
    });

    /* ── MONTAGEM VISUAL FINAL ── */
    var html = '<div class="acdc-product-description" role="region" aria-label="Descrição do produto">';

    if (descGeralHtml || details.length) {
      html += '<div class="acdc-section"><h3>Descrição</h3>';
      if (descGeralHtml) html += descGeralHtml;
      details.forEach(function(d) {
        html += '<div class="acdc-row">'
             +  '<span class="acdc-label">'  + escapeHtml(d.label) + '</span>'
             +  '<span class="acdc-value">'  + escapeHtml(d.value) + '</span>'
             +  '</div>';
      });
      html += '</div>';
    }

    if (dimensions.length) {
      html += '<div class="acdc-section"><h3>Dimensões</h3><div class="acdc-dimensions">';
      dimensions.forEach(function(d, i) {
        html += '<div class="acdc-dimension" style="transition-delay:' + (i * 55) + 'ms">'
             +  '<div class="acdc-dimension-label">' + escapeHtml(d.label) + '</div>'
             +  '<div class="acdc-dimension-value">' + escapeHtml(d.value) + '</div>'
             +  '</div>';
      });
      html += '</div></div>';
    }

    if (observations.length) {
      html += '<div class="acdc-notes">';
      observations.forEach(function(o) { html += '<p>' + escapeHtml(o) + '</p>'; });
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
    window.__acdcDescriptionInit = false; 
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
