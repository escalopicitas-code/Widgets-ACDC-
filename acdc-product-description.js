<script>
(function() {
  "use strict";

  /* ---------- CONFIGURAÇÕES ---------- */
  const CSS_ID = 'acdc-description-style';
  const READY_FLAG = 'acdcReady';
  let built = false;

  /* ---------- INJEÇÃO DE CSS (APARÊNCIA MELHORADA) ---------- */
  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    const style = document.createElement('style');
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

      /* Detalhes (título + valor) em linha, com separação visual */
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

      /* Dimensões – grid mais compacto e com mais colunas */
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

      /* Observações compactas e elegantes */
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

      /* Responsivo */
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

  /* ---------- UTILITÁRIOS ---------- */
  const sanitize = s => String(s || '').trim().replace(/\s+/g, ' ');
  const escapeHtml = str =>
    String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  function addDefaultUnit(label, value) {
    if (/[a-zA-Z]/.test(value)) return value;
    if (/peso/.test(label.toLowerCase())) return value + ' kg';
    return value + ' cm';
  }

  function findContainer() {
    return document.querySelector('[data-store*="product-description"] .user-content') ||
           document.querySelector('.user-content.font-small.mb-4');
  }

  /* ---------- ANIMAÇÃO ---------- */
  function animateCards() {
    document.querySelectorAll('.acdc-dimension').forEach(card => card.classList.add('visible'));
  }

  /* ---------- CONSTRUÇÃO DO HTML ---------- */
  function buildDescription(container) {
    if (container.dataset[READY_FLAG] === 'true') return false;

    const raw = (container.innerText || container.textContent || '').trim();
    if (!raw) return false;

    container.dataset[READY_FLAG] = 'true';

    const originalHeading = container.previousElementSibling;
    if (originalHeading && originalHeading.tagName.toLowerCase() === 'h6') {
      originalHeading.style.display = 'none';
    }

    const lines = raw
      .replace(/\r/g, '\n')
      .split(/[\n;|]+/)
      .map(sanitize)
      .filter(Boolean);

    const seen = new Set();
    const unique = lines.filter(line => {
      const key = line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const dimensions = [];
    const details = [];
    const observations = [];

    unique.forEach(line => {
      line = line.replace(/^(?:medidas?(?:\s+unit[aá]rias?)?)[\s:-]*/i, '').trim();
      if (!line) return;

      if (/^(obs|observa[çc][ãa]o|nota)[\s:]*$/i.test(line)) return;

      const obsMatch = line.match(/^(?:obs|observa[çc][ãa]o|nota)[\s:]*(.+)/i);
      if (obsMatch && obsMatch[1].trim().length > 0) {
        observations.push(sanitize(obsMatch[1]));
        return;
      }

      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (!match) {
        observations.push(line);
        return;
      }

      const label = sanitize(match[1]);
      const value = sanitize(match[2]);
      const isDim = /altura|largura|profundidade|comprimento|assento|di[aâ]metro|diametro|espessura|peso|tamanho/.test(label.toLowerCase());

      if (isDim) {
        dimensions.push({ label, value: addDefaultUnit(label, value) });
      } else {
        details.push({ label, value });
      }
    });

    const dedup = (arr, keyFn) => {
      const s = new Set();
      return arr.filter(item => {
        const k = keyFn(item);
        if (s.has(k)) return false;
        s.add(k);
        return true;
      });
    };
    const dims = dedup(dimensions, d => `${d.label}::${d.value}`);
    const dets = dedup(details, d => `${d.label}::${d.value}`);
    const obs = [...new Set(observations)];

    let html = '<div class="acdc-product-description" role="region" aria-label="Descrição do produto">';

    if (dets.length) {
      html += '<div class="acdc-section"><h3>Descrição</h3>';
      dets.forEach(item => {
        html += `<div class="acdc-row"><span class="acdc-label">${escapeHtml(item.label)}</span><span class="acdc-value">${escapeHtml(item.value)}</span></div>`;
      });
      html += '</div>';
    }

    if (dims.length) {
      html += '<div class="acdc-section"><h3>Dimensões</h3><div class="acdc-dimensions">';
      dims.forEach((item, idx) => {
        html += `<div class="acdc-dimension" style="transition-delay:${idx * 60}ms"><div class="acdc-dimension-label">${escapeHtml(item.label)}</div><div class="acdc-dimension-value">${escapeHtml(item.value)}</div></div>`;
      });
      html += '</div></div>';
    }

    if (obs.length) {
      html += '<div class="acdc-notes">';
      obs.forEach(text => html += `<p>${escapeHtml(text)}</p>`);
      html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
    animateCards();

    console.log('[ACDC] Descrição montada com sucesso.');
    return true;
  }

  /* ---------- INICIALIZAÇÃO ROBUSTA ---------- */
  let observer = null;
  let retryTimer = null;

  function tryBuild() {
    if (built) return;
    const container = findContainer();
    if (container) {
      const success = buildDescription(container);
      if (success) {
        built = true;
        if (observer) { observer.disconnect(); observer = null; }
        if (retryTimer) { clearTimeout(retryTimer); retryTimer = null; }
      }
    }
  }

  function scheduleRetries() {
    const delays = [500, 1500, 3000];
    delays.forEach(d => {
      setTimeout(() => {
        if (!built) tryBuild();
      }, d);
    });
    const continuousRetry = () => {
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
        observer = new MutationObserver(() => tryBuild());
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
</script>
