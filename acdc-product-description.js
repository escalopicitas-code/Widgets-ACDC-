(function() {
  "use strict";

  var CSS_ID = 'acdc-description-style';
  var READY_FLAG = 'acdcReady';
  var built = false;

  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var style = document.createElement('style');
    style.id = CSS_ID;
    style.innerHTML = `
      :root{
        --acdc-gap:10px;
        --acdc-padding:16px;
        --acdc-border:#e9e9e9;
        --acdc-muted:#5b5b5b;
        --acdc-bg:#fff;
        --acdc-accent:#111;
        --acdc-radius:8px;
        --acdc-transition:all .3s cubic-bezier(.2,.9,.3,1);
      }

      [data-store*="product-description"] > h6 {
        display: none !important;
      }

      .acdc-product-description{
        width:100%;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        color:var(--acdc-accent);
        background:transparent;
        line-height:1.4;
      }

      .acdc-section{
        padding:var(--acdc-padding) 0;
        border-top:1px solid var(--acdc-border);
      }

      .acdc-section:first-child{
        border-top:0;
        padding-top:0;
      }

      .acdc-section h3{
        margin:0 0 12px;
        font-size:clamp(16px, 1.8vw, 19px);
        font-weight:700;
        letter-spacing:0.2px;
      }

      .acdc-row{
        display:flex;
        flex-wrap:wrap;
        align-items:baseline;
        gap:4px 8px;
        margin-bottom:10px;
        padding-bottom:6px;
        border-bottom:1px dashed #eee;
      }
      .acdc-row:last-child{
        margin-bottom:0;
        border-bottom:0;
      }

      .acdc-label{
        font-weight:700;
        text-transform: uppercase;
        font-size: 11px;
        letter-spacing: 0.4px;
        color:var(--acdc-accent);
        white-space:nowrap;
      }

      .acdc-value{
        color:var(--acdc-muted);
        font-size:clamp(13px,1.4vw,15px);
        word-break:break-word;
      }

      .acdc-dimensions{
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:10px;
      }

      .acdc-dimension{
        padding:12px 10px;
        border:1px solid var(--acdc-border);
        background:var(--acdc-bg);
        border-radius:var(--acdc-radius);
        opacity:0;
        transform:translateY(10px);
        transition:var(--acdc-transition);
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content:center;
        text-align: center;
      }

      .acdc-dimension.visible{
        opacity:1;
        transform:translateY(0);
      }

      .acdc-dimension:hover{
        transform:translateY(-4px);
        box-shadow:0 8px 20px rgba(0,0,0,.04);
        border-color:#ccc;
      }

      .acdc-dimension-label{
        font-size:11px;
        color:#777;
        margin-bottom:4px;
        text-transform: capitalize;
        letter-spacing:0.2px;
      }

      .acdc-dimension-value{
        font-size:clamp(16px,2vw,22px);
        font-weight:700;
        color:var(--acdc-accent);
        line-height:1.2;
      }

      .acdc-notes{
        margin-top: 18px;
        padding: 10px 16px;
        background-color: #f7f7f7;
        border-radius: var(--acdc-radius);
        text-align: left;
        font-size:13px;
        color:#555;
        line-height:1.5;
      }

      .acdc-notes p{
        margin:0 0 2px;
        font-weight:400;
        letter-spacing:0.1px;
      }
      .acdc-notes p:last-child{
        margin-bottom:0;
      }

      .acdc-product-description img{
        max-width:100%;
        height:auto;
        display:block;
        margin:0 auto 10px;
        object-fit:contain;
        border-radius:6px;
      }

      @media(max-width:900px){
        .acdc-dimensions{
          grid-template-columns:repeat(2,1fr);
        }
      }

      @media(max-width:480px){
        .acdc-dimensions{
          grid-template-columns:1fr;
          gap:8px;
        }
        .acdc-dimension{
          padding:10px 8px;
        }
        .acdc-section h3{
          font-size:16px;
        }
        .acdc-row{
          flex-direction:column;
          align-items:flex-start;
          gap:2px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  var sanitize = function(s) { return String(s || '').trim().replace(/\s+/g, ' '); };
  var escapeHtml = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  function addDefaultUnit(label, value) {
    if (/[a-zA-Z]/.test(value)) return value;
    if (/peso/.test(label.toLowerCase())) return value + ' kg';
    return value + ' cm';
  }

  function findContainer() {
    return document.querySelector('[data-store*="product-description"] .user-content') ||
           document.querySelector('.user-content.font-small.mb-4');
  }

  function animateCards() {
    var cards = document.querySelectorAll('.acdc-dimension');
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.add('visible');
    }
  }

  function buildDescription(container) {
    if (container.dataset[READY_FLAG] === 'true') return false;

    var raw = (container.innerText || container.textContent || '').trim();
    if (!raw) return false;

    container.dataset[READY_FLAG] = 'true';

    var originalHeading = container.previousElementSibling;
    if (originalHeading && originalHeading.tagName.toLowerCase() === 'h6') {
      originalHeading.style.display = 'none';
    }

    var lines = raw
      .replace(/\r/g, '\n')
      .split(/[\n;|]+/)
      .map(sanitize)
      .filter(Boolean);

    var seen = new Set();
    var unique = [];
    for (var i = 0; i < lines.length; i++) {
      var key = lines[i].toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(lines[i]);
      }
    }

    var dimensions = [];
    var details = [];
    var observations = [];

    for (var j = 0; j < unique.length; j++) {
      var line = unique[j];
      line = line.replace(/^(?:medidas?(?:\s+unit[aá]rias?)?)[\s:-]*/i, '').trim();
      if (!line) continue;

      if (/^(obs|observa[çc][ãa]o|nota)[\s:]*$/i.test(line)) continue;

      var obsMatch = line.match(/^(?:obs|observa[çc][ãa]o|nota)[\s:]*(.+)/i);
      if (obsMatch && obsMatch[1].trim().length > 0) {
        observations.push(sanitize(obsMatch[1]));
        continue;
      }

      var match = line.match(/^([^:]+):\s*(.+)$/);
      if (!match) {
        observations.push(line);
        continue;
      }

      var label = sanitize(match[1]);
      var value = sanitize(match[2]);
      var isDim = /altura|largura|profundidade|comprimento|assento|di[aâ]metro|diametro|espessura|peso|tamanho/.test(label.toLowerCase());

      if (isDim) {
        dimensions.push({ label: label, value: addDefaultUnit(label, value) });
      } else {
        details.push({ label: label, value: value });
      }
    }

    function dedup(arr, keyFn) {
      var s = new Set();
      var result = [];
      for (var k = 0; k < arr.length; k++) {
        var kk = keyFn(arr[k]);
        if (!s.has(kk)) {
          s.add(kk);
          result.push(arr[k]);
        }
      }
      return result;
    }
    var dims = dedup(dimensions, function(d) { return d.label + '::' + d.value; });
    var dets = dedup(details, function(d) { return d.label + '::' + d.value; });
    var obs = [];
    var obsSet = new Set();
    for (var l = 0; l < observations.length; l++) {
      if (!obsSet.has(observations[l])) {
        obsSet.add(observations[l]);
        obs.push(observations[l]);
      }
    }

    var html = '<div class="acdc-product-description" role="region" aria-label="Descrição do produto">';

    if (dets.length) {
      html += '<div class="acdc-section"><h3>Descrição</h3>';
      for (var m = 0; m < dets.length; m++) {
        html += '<div class="acdc-row"><span class="acdc-label">' + escapeHtml(dets[m].label) + '</span><span class="acdc-value">' + escapeHtml(dets[m].value) + '</span></div>';
      }
      html += '</div>';
    }

    if (dims.length) {
      html += '<div class="acdc-section"><h3>Dimensões</h3><div class="acdc-dimensions">';
      for (var n = 0; n < dims.length; n++) {
        html += '<div class="acdc-dimension" style="transition-delay:' + (n * 60) + 'ms"><div class="acdc-dimension-label">' + escapeHtml(dims[n].label) + '</div><div class="acdc-dimension-value">' + escapeHtml(dims[n].value) + '</div></div>';
      }
      html += '</div></div>';
    }

    if (obs.length) {
      html += '<div class="acdc-notes">';
      for (var p = 0; p < obs.length; p++) {
        html += '<p>' + escapeHtml(obs[p]) + '</p>';
      }
      html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
    animateCards();

    console.log('[ACDC] Descrição montada com sucesso.');
    return true;
  }

  var observer = null;
  var retryTimer = null;

  function tryBuild() {
    if (built) return;
    var container = findContainer();
    if (container) {
      var success = buildDescription(container);
      if (success) {
        built = true;
        if (observer) { observer.disconnect(); observer = null; }
        if (retryTimer) { clearTimeout(retryTimer); retryTimer = null; }
      }
    }
  }

  function scheduleRetries() {
    var delays = [500, 1500, 3000];
    for (var d = 0; d < delays.length; d++) {
      setTimeout(function() {
        if (!built) tryBuild();
      }, delays[d]);
    }
    var continuousRetry = function() {
      if (built) return;
      tryBuild();
      retryTimer = setTimeout(continuousRetry, 2000);
    };
    retryTimer = setTimeout(continuousRetry, 4000);
  }

  function init() {
    injectCSS();
    tryBuild();
    if (!built) {
      scheduleRetries();
      if (window.MutationObserver) {
        observer = new MutationObserver(function() { tryBuild(); });
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
