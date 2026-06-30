(function () {
  if (window.__wallpaperCalcInit) return;
  window.__wallpaperCalcInit = true;

  const d = document;
  const url = window.location.href.toLowerCase();
  const WHATSAPP_NUM = "5541991668814";
  const MAX_ICONS = 12;

  const isPainel =
    url.includes('painel') ||
    (function () {
      const el = d.querySelector('[data-store^="product-item-name"], .js-item-name, .product-title, .js-product-name, h1');
      return el ? /painel/i.test(el.textContent) : false;
    })();

  const isWallpaper =
    url.includes('papeis-de-parede') ||
    url.includes('papel-de-parede') ||
    url.includes('wallpaper') ||
    isPainel;

  if (!isWallpaper) return;

  const ICON_ROLL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 9a4 4 0 0 1 4 4v5"/></svg>`;
  const ICON_PANEL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="18" rx="1.5"/><rect x="13" y="3" width="8" height="18" rx="1.5"/></svg>`;
  const ICON_CALC = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="13" height="6" rx="2"/><path d="M9 10v4a3 3 0 0 0 3 3h0"/><rect x="11" y="17" width="5" height="4" rx="1"/></svg>`;
  const ICON_CHEVRON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>`;
  const ICON_WHATS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.4-4.2A8 8 0 1 1 9 18.5L4 20Z" stroke-linejoin="round"/></svg>`;

  const style = d.createElement('style');
  style.textContent = `
    #wpc-wrap{display:none!important;max-width:390px!important;margin:20px 0!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif!important;opacity:0;transform:translateY(8px);transition:opacity .45s ease,transform .45s ease}
    #wpc-wrap.wpc-in{opacity:1!important;transform:translateY(0)!important}
    .wpc-trigger{width:100%!important;display:flex!important;align-items:center!important;gap:13px!important;background:#fff!important;border:1.5px solid #1a1a1a!important;border-radius:14px!important;padding:13px 16px!important;cursor:pointer!important;text-align:left!important;transition:background .2s,box-shadow .2s,transform .15s!important}
    .wpc-trigger:hover{background:#f7f7f7!important;box-shadow:0 6px 20px rgba(0,0,0,.1)!important;transform:translateY(-1px)!important}
    .wpc-trigger:active{transform:translateY(0)!important}
    .wpc-badge{flex-shrink:0!important;width:40px!important;height:40px!important;border-radius:11px!important;background:#f0f0f0!important;display:flex!important;align-items:center!important;justify-content:center!important;color:#1a1a1a!important}
    .wpc-badge svg{width:21px!important;height:21px!important}
    .wpc-badge--painel{background:#1a1a1a!important;color:#fff!important}
    .wpc-trigger-text{flex:1!important;min-width:0!important}
    .wpc-trigger-text strong{display:block!important;font-size:13.5px!important;font-weight:800!important;color:#1a1a1a!important;letter-spacing:-.01em!important}
    .wpc-trigger-text small{display:block!important;font-size:11px!important;color:#888!important;margin-top:2px!important;line-height:1.3!important}
    .wpc-mode-chip{display:inline-flex!important;align-items:center!important;padding:2px 8px!important;border-radius:99px!important;font-size:10px!important;font-weight:700!important;letter-spacing:.04em!important;text-transform:uppercase!important;margin-top:5px!important}
    .wpc-mode-chip--rolo{background:#f0f0f0!important;color:#555!important}
    .wpc-mode-chip--painel{background:#1a1a1a!important;color:#fff!important}
    .wpc-arrow{flex-shrink:0!important;width:16px!important;height:16px!important;color:#1a1a1a!important;transition:transform .25s ease!important}
    .wpc-trigger:hover .wpc-arrow{transform:translateX(3px)!important}
    #wpc-overlay{position:fixed!important;inset:0!important;background:rgba(0,0,0,.5)!important;z-index:99999!important;display:none;align-items:center!important;justify-content:center!important;padding:20px!important;opacity:0;transition:opacity .3s ease!important}
    #wpc-overlay.wpc-open{display:flex!important;opacity:1!important}
    .wpc-panel{position:relative!important;background:#fff!important;border-radius:18px!important;max-width:390px!important;width:100%!important;max-height:92vh!important;overflow-y:auto!important;box-shadow:0 28px 80px rgba(0,0,0,.28)!important;transform:scale(.93) translateY(12px)!important;transition:transform .38s cubic-bezier(.22,.61,.36,1)!important}
    #wpc-overlay.wpc-open .wpc-panel{transform:scale(1) translateY(0)!important}
    .wpc-panel *{box-sizing:border-box!important}
    .wpc-panel-header{padding:18px 20px 0!important;display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:12px!important}
    .wpc-panel-header-left{display:flex!important;align-items:center!important;gap:12px!important}
    .wpc-close{width:32px!important;height:32px!important;flex-shrink:0!important;border-radius:50%!important;border:none!important;background:#f0f0f0!important;color:#1a1a1a!important;font-size:20px!important;line-height:1!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;transition:background .2s!important;margin-top:-2px!important}
    .wpc-close:hover{background:#e2e2e2!important}
    .wpc-panel-title{font-size:15px!important;font-weight:800!important;color:#1a1a1a!important;letter-spacing:-.01em!important;margin:0!important}
    .wpc-panel-sub{font-size:11.5px!important;color:#999!important;margin:3px 0 0!important}
    .wpc-accent-bar{height:4px!important;margin:16px 0 0!important;background:#1a1a1a!important}
    .wpc-body{padding:18px 20px 22px!important}
    .wpc-row{display:flex!important;gap:10px!important;margin-bottom:14px!important}
    .wpc-field{flex:1!important;min-width:0!important}
    .wpc-label{display:block!important;margin:0 0 6px!important;font-size:10px!important;font-weight:700!important;color:#999!important;text-transform:uppercase!important;letter-spacing:.05em!important}
    .wpc-stepper{display:flex!important;align-items:stretch!important;border:1.5px solid #ddd!important;border-radius:10px!important;overflow:hidden!important;background:#fff!important;transition:border-color .2s,box-shadow .2s!important}
    .wpc-stepper:focus-within{border-color:#1a1a1a!important;box-shadow:0 0 0 3px rgba(0,0,0,.09)!important}
    .wpc-stepper button{width:32px!important;flex-shrink:0!important;border:none!important;background:#f5f5f5!important;color:#1a1a1a!important;font-size:17px!important;font-weight:700!important;cursor:pointer!important;padding:0!important;transition:background .15s!important}
    .wpc-stepper button:hover{background:#eaeaea!important}
    .wpc-stepper input{width:100%!important;border:none!important;outline:none!important;text-align:center!important;font-size:13.5px!important;font-weight:700!important;color:#222!important;padding:7px 2px!important;background:#fff!important}
    .wpc-stepper input::-webkit-outer-spin-button,.wpc-stepper input::-webkit-inner-spin-button{-webkit-appearance:none!important}
    .wpc-unit-wrap{position:relative!important}
    .wpc-unit-wrap input{width:100%!important;border:1.5px solid #ddd!important;border-radius:10px!important;padding:8px 28px 8px 11px!important;font-size:13.5px!important;font-weight:700!important;color:#222!important;outline:none!important;transition:border-color .2s,box-shadow .2s!important;background:#fff!important}
    .wpc-unit-wrap input:focus{border-color:#1a1a1a!important;box-shadow:0 0 0 3px rgba(0,0,0,.09)!important}
    .wpc-unit-wrap input::placeholder{color:#bbb!important;font-weight:500!important}
    .wpc-unit-suf{position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%)!important;font-size:11px!important;color:#aaa!important;font-weight:700!important;pointer-events:none!important}
    .wpc-seg{position:relative!important;display:flex!important;background:#f0f0f0!important;border-radius:10px!important;padding:3px!important;height:38px!important}
    .wpc-seg input{position:absolute!important;opacity:0!important;width:1px!important;height:1px!important;pointer-events:none!important}
    .wpc-seg-hl{position:absolute!important;top:3px!important;left:3px!important;bottom:3px!important;width:calc(33.333% - 4px)!important;background:#1a1a1a!important;border-radius:8px!important;transition:transform .35s cubic-bezier(.22,.61,.36,1)!important;z-index:0!important;box-shadow:0 2px 8px rgba(0,0,0,.2)!important}
    .wpc-s1:checked ~ .wpc-seg-hl{transform:translateX(0%)!important}
    .wpc-s2:checked ~ .wpc-seg-hl{transform:translateX(100%)!important}
    .wpc-s3:checked ~ .wpc-seg-hl{transform:translateX(200%)!important}
    .wpc-seg label{position:relative!important;z-index:1!important;flex:1!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:11px!important;font-weight:700!important;color:#999!important;cursor:pointer!important;border-radius:8px!important;transition:color .25s!important;padding:0 2px!important}
    .wpc-s1:checked + label,.wpc-s2:checked + label,.wpc-s3:checked + label{color:#fff!important}
    .wpc-hint{margin:-2px 0 14px!important;font-size:10.5px!important;color:#aaa!important;font-style:italic!important;line-height:1.35!important}
    .wpc-divider{height:1px!important;background:#f0f0f0!important;margin:16px 0!important}
    .wpc-result{max-height:0!important;overflow:hidden!important;opacity:0!important;transition:max-height .45s ease,opacity .4s ease,margin-top .4s ease!important;margin-top:0!important}
    .wpc-result.wpc-show{max-height:400px!important;opacity:1!important;margin-top:2px!important}
    .wpc-result-inner{background:#f8f8f8!important;border:1px solid #ebebeb!important;border-radius:13px!important;padding:15px!important}
    .wpc-stats{display:grid!important;grid-template-columns:1fr 1fr!important;gap:10px!important;margin-bottom:12px!important}
    .wpc-stat{background:#fff!important;border:1px solid #ebebeb!important;border-radius:10px!important;padding:10px 12px!important}
    .wpc-stat-label{font-size:9.5px!important;font-weight:700!important;letter-spacing:.05em!important;text-transform:uppercase!important;color:#aaa!important;margin:0 0 4px!important}
    .wpc-stat-val{font-size:22px!important;font-weight:900!important;color:#1a1a1a!important;letter-spacing:-.02em!important;line-height:1!important}
    .wpc-stat-unit{font-size:12px!important;font-weight:600!important;color:#aaa!important;margin-left:2px!important}
    .wpc-rolls-vis{display:flex!important;flex-wrap:wrap!important;gap:5px!important;margin-top:8px!important;min-height:22px!important}
    .wpc-roll-ico{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:20px!important;height:20px!important;color:#1a1a1a!important;opacity:0;transform:scale(.3);animation:wpcPop .38s cubic-bezier(.34,1.56,.64,1) forwards}
    .wpc-roll-ico svg{width:100%!important;height:100%!important}
    .wpc-roll-more{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:20px!important;padding:0 6px!important;background:#1a1a1a!important;color:#fff!important;font-size:10px!important;font-weight:800!important;border-radius:6px!important;opacity:0;transform:scale(.3);animation:wpcPop .38s cubic-bezier(.34,1.56,.64,1) forwards}
    @keyframes wpcPop{to{opacity:1;transform:scale(1)}}
    .wpc-whats-btn{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;width:100%!important;margin-top:12px!important;background:#1a1a1a!important;color:#fff!important;border:none!important;border-radius:10px!important;padding:11px!important;font-size:12.5px!important;font-weight:700!important;cursor:pointer!important;transition:transform .15s,box-shadow .15s!important}
    .wpc-whats-btn svg{width:16px!important;height:16px!important;flex-shrink:0!important}
    .wpc-whats-btn:hover{transform:translateY(-2px)!important;box-shadow:0 8px 20px rgba(0,0,0,.22)!important}
    .wpc-whats-btn:active{transform:translateY(0)!important}
    .wpc-whats-btn:disabled{opacity:.4!important;cursor:not-allowed!important;transform:none!important;box-shadow:none!important}
    @media(prefers-reduced-motion:reduce){#wpc-wrap,#wpc-overlay,.wpc-panel,.wpc-roll-ico,.wpc-roll-more,.wpc-seg-hl,.wpc-result{transition:none!important;animation:none!important}}
  `;
  d.head.appendChild(style);

  // ─── Trigger ─────────────────────────────────────────────────────────
  const wrap = d.createElement('div');
  wrap.id = 'wpc-wrap';
  wrap.innerHTML = `
    <button type="button" class="wpc-trigger" id="wpc-trigger" aria-haspopup="dialog">
      <span class="wpc-badge${isPainel ? ' wpc-badge--painel' : ''}">${isPainel ? ICON_PANEL : ICON_CALC}</span>
      <span class="wpc-trigger-text">
        <strong>${isPainel ? 'Calculadora de Painel' : 'Calculadora de Rolos'}</strong>
        <small>${isPainel ? 'Descubra quantos m² você precisa' : 'Descubra quantos rolos você precisa'}</small>
        <span class="wpc-mode-chip wpc-mode-chip--${isPainel ? 'painel' : 'rolo'}">${isPainel ? 'Modo painel' : 'Modo rolo'}</span>
      </span>
      <span class="wpc-arrow">${ICON_CHEVRON}</span>
    </button>
  `;

  // ─── Modal ───────────────────────────────────────────────────────────
  const overlay = d.createElement('div');
  overlay.id = 'wpc-overlay';

  if (isPainel) {
    overlay.innerHTML = `
      <div class="wpc-panel" role="dialog" aria-modal="true" aria-labelledby="wpc-modal-title">
        <div class="wpc-panel-header">
          <div class="wpc-panel-header-left">
            <span class="wpc-badge wpc-badge--painel">${ICON_PANEL}</span>
            <div>
              <p class="wpc-panel-title" id="wpc-modal-title">Calculadora de Painel</p>
              <p class="wpc-panel-sub">Informe as dimensões da parede</p>
            </div>
          </div>
          <button type="button" class="wpc-close" id="wpc-close" aria-label="Fechar">×</button>
        </div>
        <div class="wpc-accent-bar"></div>
        <div class="wpc-body">
          <div class="wpc-row">
            <div class="wpc-field">
              <label class="wpc-label" for="wpc-pw">Largura da parede</label>
              <div class="wpc-unit-wrap"><input id="wpc-pw" type="number" inputmode="decimal" min="0" step="0.01" placeholder="3,50"><span class="wpc-unit-suf">m</span></div>
            </div>
            <div class="wpc-field">
              <label class="wpc-label" for="wpc-ph">Altura da parede</label>
              <div class="wpc-unit-wrap"><input id="wpc-ph" type="number" inputmode="decimal" min="0" step="0.01" placeholder="2,70"><span class="wpc-unit-suf">m</span></div>
            </div>
          </div>
          <div class="wpc-result" id="wpc-result" aria-live="polite">
            <div class="wpc-result-inner">
              <div class="wpc-stats">
                <div class="wpc-stat">
                  <p class="wpc-stat-label">Área da parede</p>
                  <p class="wpc-stat-val"><span id="wpc-area">0</span><span class="wpc-stat-unit">m²</span></p>
                </div>
                <div class="wpc-stat">
                  <p class="wpc-stat-label">Você precisa de</p>
                  <p class="wpc-stat-val"><span id="wpc-qty">0</span><span class="wpc-stat-unit">m²</span></p>
                </div>
              </div>
              <button type="button" class="wpc-whats-btn" id="wpc-whats-btn" disabled>
                ${ICON_WHATS} Solicitar orçamento no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    overlay.innerHTML = `
      <div class="wpc-panel" role="dialog" aria-modal="true" aria-labelledby="wpc-modal-title">
        <div class="wpc-panel-header">
          <div class="wpc-panel-header-left">
            <span class="wpc-badge">${ICON_CALC}</span>
            <div>
              <p class="wpc-panel-title" id="wpc-modal-title">Calculadora de Rolos</p>
              <p class="wpc-panel-sub">Informe as dimensões da parede</p>
            </div>
          </div>
          <button type="button" class="wpc-close" id="wpc-close" aria-label="Fechar">×</button>
        </div>
        <div class="wpc-accent-bar"></div>
        <div class="wpc-body">
          <div class="wpc-row">
            <div class="wpc-field">
              <label class="wpc-label" for="wpc-cov">m² por rolo</label>
              <div class="wpc-stepper">
                <button type="button" id="wpc-cov-minus" aria-label="Diminuir">−</button>
                <input id="wpc-cov" type="number" inputmode="decimal" step="0.1" min="0.1" value="5.3">
                <button type="button" id="wpc-cov-plus" aria-label="Aumentar">+</button>
              </div>
            </div>
          </div>
          <div class="wpc-row" style="margin-bottom:6px">
            <div class="wpc-field">
              <label class="wpc-label">Tipo de estampa</label>
              <div class="wpc-seg" role="radiogroup" aria-label="Tipo de estampa">
                <input class="wpc-s1" type="radio" name="wpc-margin" id="wpc-m1" value="0.05">
                <label for="wpc-m1">Liso</label>
                <input class="wpc-s2" type="radio" name="wpc-margin" id="wpc-m2" value="0.10" checked>
                <label for="wpc-m2">Médio</label>
                <input class="wpc-s3" type="radio" name="wpc-margin" id="wpc-m3" value="0.15">
                <label for="wpc-m3">Grande</label>
                <div class="wpc-seg-hl"></div>
              </div>
            </div>
          </div>
          <p class="wpc-hint">*O m² por rolo e o tipo de estampa estão na descrição do produto.</p>
          <div class="wpc-divider"></div>
          <div class="wpc-row">
            <div class="wpc-field">
              <label class="wpc-label" for="wpc-w">Largura</label>
              <div class="wpc-unit-wrap"><input id="wpc-w" type="number" inputmode="decimal" min="0" step="0.01" placeholder="3,50"><span class="wpc-unit-suf">m</span></div>
            </div>
            <div class="wpc-field">
              <label class="wpc-label" for="wpc-h">Altura</label>
              <div class="wpc-unit-wrap"><input id="wpc-h" type="number" inputmode="decimal" min="0" step="0.01" placeholder="2,70"><span class="wpc-unit-suf">m</span></div>
            </div>
          </div>
          <div class="wpc-result" id="wpc-result" aria-live="polite">
            <div class="wpc-result-inner">
              <div class="wpc-stats">
                <div class="wpc-stat">
                  <p class="wpc-stat-label">Área total</p>
                  <p class="wpc-stat-val"><span id="wpc-area">0</span><span class="wpc-stat-unit">m²</span></p>
                </div>
                <div class="wpc-stat">
                  <p class="wpc-stat-label">Você precisa de</p>
                  <p class="wpc-stat-val"><span id="wpc-rolls">0</span><span class="wpc-stat-unit">rolos</span></p>
                </div>
              </div>
              <div class="wpc-rolls-vis" id="wpc-rolls-vis"></div>
              <button type="button" class="wpc-whats-btn" id="wpc-whats-btn" disabled>
                ${ICON_WHATS} Solicitar orçamento no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Helpers ─────────────────────────────────────────────────────────
  function findBuyArea() {
    return (
      d.querySelector('.js-product-buy-container') ||
      d.querySelector('.js-product-form') ||
      d.querySelector('#product-form') ||
      d.querySelector('.js-product-container')
    );
  }

  function isSingleProduct() {
    return !!(findBuyArea() || d.getElementById('single-product'));
  }

  function productName() {
    const el = d.querySelector('[data-store^="product-item-name"], .js-item-name, .product-title, .js-product-name, h1');
    return (el?.textContent || d.title || 'este produto').replace(/\s+/g, ' ').trim();
  }

  function animateValue(span, from, to, decimals) {
    const dur = 420, start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = from + (to - from) * eased;
      span.textContent = decimals ? cur.toFixed(decimals).replace('.', ',') : Math.round(cur);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ─── Init ─────────────────────────────────────────────────────────────
  function init() {
    if (!isSingleProduct()) return;

    const buyArea = findBuyArea();
    const scope = d.getElementById('single-product') || d;

    if (buyArea?.parentNode) {
      buyArea.parentNode.insertBefore(wrap, buyArea);
    } else {
      const fallback = scope.querySelector('h1') || scope;
      if (fallback.parentNode) fallback.parentNode.insertBefore(wrap, fallback.nextSibling);
    }

    wrap.style.setProperty('display', 'block', 'important');
    requestAnimationFrame(() => wrap.classList.add('wpc-in'));
    d.body.appendChild(overlay);

    const triggerBtn = d.getElementById('wpc-trigger');
    const closeBtn = d.getElementById('wpc-close');

    function openModal() {
      overlay.classList.add('wpc-open');
      d.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function closeModal() {
      overlay.classList.remove('wpc-open');
      d.body.style.overflow = '';
      triggerBtn.focus();
    }

    triggerBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('wpc-open')) closeModal(); });

    if (isPainel) {
      initPainelCalc();
    } else {
      initRollCalc();
    }
  }

  // ─── Modo Painel ──────────────────────────────────────────────────────
  function initPainelCalc() {
    const pwI = d.getElementById('wpc-pw');
    const phI = d.getElementById('wpc-ph');
    const resultBox = d.getElementById('wpc-result');
    const areaSpan = d.getElementById('wpc-area');
    const qtySpan = d.getElementById('wpc-qty');
    const whatsBtn = d.getElementById('wpc-whats-btn');

    let lastArea = 0, animArea = 0, animQty = 0;

    function update() {
      const pw = parseFloat(pwI.value) || 0;
      const ph = parseFloat(phI.value) || 0;

      if (pw > 0 && ph > 0) {
        const area = pw * ph;
        animateValue(areaSpan, animArea, area, 2);
        animateValue(qtySpan, animQty, area, 2);
        animArea = area; animQty = area;
        lastArea = area;
        resultBox.classList.add('wpc-show');
        whatsBtn.disabled = false;
      } else {
        resultBox.classList.remove('wpc-show');
        whatsBtn.disabled = true;
      }
    }

    [pwI, phI].forEach(i => i.addEventListener('input', update));

    whatsBtn.addEventListener('click', () => {
      if (!lastArea) return;
      const areaTxt = lastArea.toFixed(2).replace('.', ',');
      const msg = encodeURIComponent(
        `Olá! Calculei no site que preciso de ${areaTxt} m² de ${productName()}. Gostaria de confirmar disponibilidade e valor.`
      );
      window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank', 'noopener');
    });
  }

  // ─── Modo Rolo ────────────────────────────────────────────────────────
  function initRollCalc() {
    const covI = d.getElementById('wpc-cov');
    const wI = d.getElementById('wpc-w');
    const hI = d.getElementById('wpc-h');
    const resultBox = d.getElementById('wpc-result');
    const areaSpan = d.getElementById('wpc-area');
    const rollsSpan = d.getElementById('wpc-rolls');
    const rollsVis = d.getElementById('wpc-rolls-vis');
    const whatsBtn = d.getElementById('wpc-whats-btn');

    let lastArea = 0, lastRolls = 0, animArea = 0, animRolls = 0;

    function getMargin() {
      const sel = d.querySelector('input[name="wpc-margin"]:checked');
      return sel ? parseFloat(sel.value) : 0.10;
    }

    function renderRolls(n) {
      rollsVis.innerHTML = '';
      const shown = Math.min(n, MAX_ICONS);
      for (let i = 0; i < shown; i++) {
        const span = d.createElement('span');
        span.className = 'wpc-roll-ico';
        span.style.animationDelay = (i * 38) + 'ms';
        span.innerHTML = ICON_ROLL;
        rollsVis.appendChild(span);
      }
      if (n > MAX_ICONS) {
        const more = d.createElement('span');
        more.className = 'wpc-roll-more';
        more.style.animationDelay = (shown * 38) + 'ms';
        more.textContent = '+' + (n - MAX_ICONS);
        rollsVis.appendChild(more);
      }
    }

    function update() {
      const w = parseFloat(wI.value) || 0;
      const h = parseFloat(hI.value) || 0;
      const c = parseFloat(covI.value) || 0;
      const m = getMargin();

      if (w > 0 && h > 0 && c > 0) {
        const area = w * h;
        const rolls = Math.ceil((area * (1 + m)) / c);
        animateValue(areaSpan, animArea, area, 2);
        animateValue(rollsSpan, animRolls, rolls, 0);
        animArea = area; animRolls = rolls;
        lastArea = area; lastRolls = rolls;
        renderRolls(rolls);
        resultBox.classList.add('wpc-show');
        whatsBtn.disabled = false;
      } else {
        resultBox.classList.remove('wpc-show');
        whatsBtn.disabled = true;
      }
    }

    covI.addEventListener('input', update);
    wI.addEventListener('input', update);
    hI.addEventListener('input', update);
    d.querySelectorAll('input[name="wpc-margin"]').forEach(r => r.addEventListener('change', update));

    d.getElementById('wpc-cov-minus').addEventListener('click', () => {
      covI.value = Math.max(0.1, (parseFloat(covI.value) || 0) - 0.1).toFixed(1);
      update();
    });
    d.getElementById('wpc-cov-plus').addEventListener('click', () => {
      covI.value = ((parseFloat(covI.value) || 0) + 0.1).toFixed(1);
      update();
    });

    whatsBtn.addEventListener('click', () => {
      if (!lastRolls) return;
      const areaTxt = lastArea.toFixed(2).replace('.', ',');
      const msg = encodeURIComponent(
        `Olá! Calculei no site que preciso de ${lastRolls} rolos (${areaTxt} m²) de ${productName()}. Gostaria de confirmar disponibilidade e valor.`
      );
      window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank', 'noopener');
    });
  }

  // ─── Boot ─────────────────────────────────────────────────────────────
  if (d.readyState === 'complete') init(); else window.addEventListener('load', init);
})();
