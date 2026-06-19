(function () {
  'use strict';

  if (window.__acdcDescriptionInit) return;
  window.__acdcDescriptionInit = true;

  var CSS_ID = 'acdc-description-style';
  var built  = false;

  /* ════════════════════════════════════════════════════════════
     CSS PREMIUM REESTILIZADO
  ════════════════════════════════════════════════════════════ */
  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var s = document.createElement('style');
    s.id = CSS_ID;
    s.textContent = `
      [data-store*="product-description"] > h6 { display:none !important; }

      .acdc-product-description {
        width:100%; font-family:"Helvetica Neue",Helvetica,Arial,system-ui,sans-serif;
        color:#1a1a1a; background:transparent; line-height:1.6; padding: 10px 0;
      }

      /* seções */
      .acdc-section { padding:24px 0; border-top:1px solid #f0f0f0; }
      .acdc-section:first-child { border-top:0; padding-top:0; }
      .acdc-section h3 {
        margin:0 0 20px; font-size:11px; font-weight:600;
        letter-spacing:.2em; text-transform:uppercase; color:#999999;
      }

      /* linhas de detalhe */
      .acdc-row {
        display:flex; flex-wrap:wrap; align-items:baseline;
        gap:6px 16px; padding:10px 0; border-bottom:1px solid #f7f7f7;
      }
      .acdc-row:last-child { border-bottom:0; padding-bottom:0; }
      .acdc-label {
        font-size:11px; font-weight:600; letter-spacing:.12em;
        text-transform:uppercase; color:#222222; white-space:nowrap; min-width:110px;
      }
      .acdc-value {
        font-size:14px; font-weight:400; letter-spacing:.01em;
        color:#555555; word-break:break-word;
      }

      /* grade de dimensões inteligente e fluida */
      .acdc-dimensions { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); 
        gap: 12px; 
      }
      .acdc-dimension {
        background:#ffffff; padding:20px 16px;
        border: 1px solid #e8e8e8;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        display:flex; flex-direction:column; align-items:center;
        justify-content:center; text-align:center;
        opacity:0; transform:translateY(8px);
        transition: opacity .4s ease, transform .4s ease, border-color .3s ease, box-shadow .3s ease;
      }
      .acdc-dimension.visible { opacity:1; transform:translateY(0); }
      .acdc-dimension:hover   { border-color: #cccccc; box-shadow: 0 4px 8px rgba(0,0,0,0.04); }
      
      .acdc-dimension-label {
        font-size:10px; font-weight:600; letter-spacing:.14em;
        text-transform:uppercase; color:#999999; margin-bottom:8px;
      }
      .acdc-dimension-value {
        font-size:clamp(18px, 2.2vw, 24px); font-weight:300;
        letter-spacing:-.01em; color:#1a1a1a; line-height:1.1;
      }

      /* notas e avisos de rodapé */
      .acdc-notes { margin-top:24px; padding:16px 20px; background: #fafafa; border-radius: 6px; border-left: 3px solid #dddddd; }
      .acdc-notes p {
        margin:0 0 8px; font-size:13px; font-weight:400;
        letter-spacing:.01em; color:#777777; line-height:1.6;
      }
      .acdc-notes p:last-child { margin-bottom:0; }

      @media(max-width:480px){
        .acdc-row{flex-direction:column;gap:4px;}
        .acdc-label{min-width:auto;}
        .acdc-dimensions { grid-template-columns: 1fr; }
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
    var cleanVal = value.replace(/(cm|ml|m|kg|m²)\s*$/i, '').trim();
    if (/[a-zA-ZÀ-ö]/.test(cleanVal) && !/(cm|ml|m|kg|m²)$/i.test(value)) return value;
    if (/peso/i.test(label)) return cleanVal + ' kg';
    if (/comprimento/i.test(label) && /ml/i.test(value)) return cleanVal + 'ml';
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
     PROCESSADOR ADAPTATIVO
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

      if (/^(descri[çc][ãa]o|medidas?|dimen\s*s[õo]es)[:\-]?$/i.test(trimmed)) return;

      // ── TRATAMENTO EXCLUSIVO PARA PAPEL DE PAREDE ──
      if (/(\d+)\s*(?:ml|metros\s+lineares)/i.test(trimmed) || /cobre\s+aproximadamente/i.test(trimmed)) {
        
        var largMatch = trimmed.match(/largura\s*:\s*(\d+)\s*cm/i);
        if (largMatch) {
          dimensions.push({ label: 'Largura', value: largMatch[1] + ' cm' });
        }

        var compMatch = trimmed.match(/(\d+)\s*ml/i);
        if (compMatch) {
          dimensions.push({ label: 'Comprimento', value: compMatch[1] + 'ml' });
        }

        var cobMatch = trimmed.match(/(cobre\s+aproximadamente\s*\d+\s*m²|\d+\s*m²)/i);
        if (cobMatch) {
          observations.push(cobMatch[1].trim());
        }

        var restoAviso = trimmed.replace(/largura\s*:\s*(\d+)\s*cm/i, '')
                                .replace(/(\d+)\s*ml/i, '')
                                .replace(/cobre\s+aproximadamente\s*\d+\s*m²/i, '')
                                .replace(/[,;\s|]+$/, '').trim();
        if (restoAviso.length > 10) {
          observations.push(restoAviso);
        }
        return; 
      }

      // ── FLUXO PADRÃO DO RESTO DO SITE ──
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

      var matchLabel = trimmed.match(/^([^:]+):\s*(.*)$/);
      
      if (!matchLabel) {
        var tokensConhecidos = /^(material|composi[çc][ãa]o|acabamento|cor|altura|largura|comprimento|profundidade|obs|nota)\b/i;
        if (tokensConhecidos.test(trimmed)) {
          var firstSpace = trimmed.indexOf(' ');
          if (firstSpace > 0) {
            matchLabel = [trimmed, trimmed.substring(0, firstSpace), trimmed.substring(firstSpace + 1)];
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
          descGeralHtml += '<p style="font-size:14px; color:#555; margin-bottom:12px; line-height:1.6;">'
                        + '<strong>' + escapeHtml(label) + ':</strong> ' + escapeHtml(value) 
                        + '</p>';
          return;
        }

        details.push({ label: label, value: value });

      } else {
        if (/calcular|margem|sobra|estoque|responsabilizamos/i.test(trimmed) || trimmed.length > 60) {
          observations.push(trimmed);
        } else {
          descGeralHtml += '<p style="font-size:14px; color:#555; margin-bottom:12px; line-height:1.6;">' 
                        + escapeHtml(trimmed) 
                        + '</p>';
        }
      }
    });

    /* ── RECONSTRUÇÃO DO HTML ── */
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
