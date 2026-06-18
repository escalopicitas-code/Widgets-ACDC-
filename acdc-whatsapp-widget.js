(function () {
  if (window.__acdcWaWidgetInit) return;
  window.__acdcWaWidgetInit = true;

  const d = document;

  const BUY_AREA_SELECTORS = '.js-product-buy-container, .js-product-form, #product-form, .js-product-container';
  const NAME_SELECTORS = '[data-store^="product-item-name"], .js-item-name, .product-title, .js-product-name, h1';

  function limparTexto(t) {
    return (t || '').replace(/\s+/g, ' ').trim();
  }

  function isPaginaDeProdutoUnico() {
    return !!(d.querySelector(BUY_AREA_SELECTORS) || d.getElementById('single-product'));
  }

  function nomeDoProdutoAtual() {
    if (!isPaginaDeProdutoUnico()) return null;
    const escopo = d.getElementById('single-product') || d;
    const el = escopo.querySelector(NAME_SELECTORS) || d.querySelector(NAME_SELECTORS);
    return limparTexto(el?.textContent) || null;
  }

  function mensagemPadrao(nomeAtendente) {
    const produto = nomeDoProdutoAtual();
    if (produto) {
      return `Olá, ${nomeAtendente}! Vim do site da ACDC Casa e tenho uma dúvida sobre este produto: ${produto}.\n${window.location.href}`;
    }
    return `Olá, ${nomeAtendente}! Vim do site da ACDC Casa e gostaria de falar sobre um produto.`;
  }

  // Injeta CSS
  const style = d.createElement('style');
  style.textContent = `
    #acdc-wa-fab{position:fixed !important;right:22px !important;bottom:22px !important;z-index:9998 !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important}
    #acdc-wa-btn{position:relative !important;width:58px !important;height:58px !important;border-radius:50% !important;background:#1a1a1a !important;border:none !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;box-shadow:0 6px 22px rgba(0,0,0,0.28) !important;transition:transform .2s ease, box-shadow .2s ease !important}
    #acdc-wa-btn:hover{transform:scale(1.06) !important;box-shadow:0 8px 26px rgba(0,0,0,0.34) !important}
    #acdc-wa-btn svg{width:26px !important;height:26px !important;stroke:#ffffff !important;transition:opacity .2s ease, transform .2s ease !important}
    #acdc-wa-btn .acdc-wa-close-ico{position:absolute !important;opacity:0 !important;transform:scale(.5) rotate(-45deg) !important}
    #acdc-wa-fab.acdc-wa-open #acdc-wa-btn .acdc-wa-chat-ico{opacity:0 !important;transform:scale(.5) rotate(45deg) !important}
    #acdc-wa-fab.acdc-wa-open #acdc-wa-btn .acdc-wa-close-ico{opacity:1 !important;transform:scale(1) rotate(0deg) !important}
    .acdc-wa-ring{position:absolute !important;inset:0 !important;border-radius:50% !important;border:1.5px solid rgba(26,26,26,0.35) !important;animation:acdcWaPulse 2.4s ease-out infinite !important;pointer-events:none !important}
    @keyframes acdcWaPulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.55);opacity:0}}
    #acdc-wa-fab.acdc-wa-open .acdc-wa-ring{display:none !important}
    #acdc-wa-panel{position:absolute !important;right:0 !important;bottom:72px !important;width:300px !important;background:#ffffff !important;border:1px solid #ececec !important;border-radius:14px !important;box-shadow:0 18px 50px rgba(0,0,0,0.18) !important;overflow:hidden !important;opacity:0 !important;visibility:hidden !important;transform:translateY(12px) scale(.97) !important;transition:opacity .25s ease, transform .25s ease, visibility .25s ease !important;transform-origin:bottom right !important}
    #acdc-wa-fab.acdc-wa-open #acdc-wa-panel{opacity:1 !important;visibility:visible !important;transform:translateY(0) scale(1) !important}
    .acdc-wa-panel-header{background:#1a1a1a !important;color:#ffffff !important;padding:16px 18px !important;display:flex !important;align-items:flex-start !important;justify-content:space-between !important;gap:10px !important}
    .acdc-wa-panel-header strong{display:block !important;font-size:14.5px !important;font-weight:800 !important;letter-spacing:-.01em !important}
    .acdc-wa-panel-header small{display:block !important;margin-top:2px !important;font-size:11.5px !important;color:#bbbbbb !important;font-weight:500 !important}
    #acdc-wa-close{flex-shrink:0 !important;width:24px !important;height:24px !important;border:none !important;background:transparent !important;color:#ffffff !important;font-size:18px !important;line-height:1 !important;cursor:pointer !important;opacity:.75 !important;transition:opacity .2s ease !important}
    #acdc-wa-close:hover{opacity:1 !important}
    .acdc-wa-list{padding:8px !important}
    .acdc-wa-contact{display:flex !important;align-items:center !important;gap:12px !important;padding:11px 10px !important;border-radius:9px !important;text-decoration:none !important;cursor:pointer !important;transition:background .2s ease !important}
    .acdc-wa-contact:hover{background:#f5f5f5 !important}
    .acdc-wa-avatar{flex-shrink:0 !important;width:38px !important;height:38px !important;border-radius:50% !important;background:#1a1a1a !important;color:#ffffff !important;display:flex !important;align-items:center !important;justify-content:center !important;font-weight:800 !important;font-size:14px !important}
    .acdc-wa-info{flex:1 !important;min-width:0 !important}
    .acdc-wa-info strong{display:block !important;font-size:13.5px !important;font-weight:700 !important;color:#1a1a1a !important}
    .acdc-wa-info small{display:block !important;margin-top:1px !important;font-size:11.5px !important;color:#888888 !important}
    .acdc-wa-arrow{flex-shrink:0 !important;width:16px !important;height:16px !important;stroke:#aaaaaa !important;transition:transform .2s ease !important}
    .acdc-wa-contact:hover .acdc-wa-arrow{transform:translateX(3px) !important;stroke:#1a1a1a !important}
    @media(max-width:480px){#acdc-wa-panel{width:calc(100vw - 32px) !important;right:-6px !important}}
    @media(prefers-reduced-motion:reduce){#acdc-wa-panel,#acdc-wa-btn svg,.acdc-wa-ring{transition:none !important;animation:none !important}}
  `;
  d.head.appendChild(style);

  // Cria o HTML
  const fab = d.createElement('div');
  fab.id = 'acdc-wa-fab';
  fab.innerHTML = `
    <div class="acdc-wa-ring"></div>
    <button type="button" id="acdc-wa-btn" aria-haspopup="dialog" aria-expanded="false" aria-label="Falar no WhatsApp">
      <svg class="acdc-wa-chat-ico" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M4 20l1.4-4.2A8 8 0 1 1 9 18.5L4 20Z" stroke-linejoin="round"></path></svg>
      <svg class="acdc-wa-close-ico" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"></line><line x1="19" y1="5" x2="5" y2="19"></line></svg>
    </button>
    <div id="acdc-wa-panel" role="dialog" aria-label="Fale com a gente no WhatsApp">
      <div class="acdc-wa-panel-header">
        <div>
          <strong>Fale com a gente</strong>
          <small>Equipe de vendas · ACDC Casa</small>
        </div>
        <button type="button" id="acdc-wa-close" aria-label="Fechar">×</button>
      </div>
      <div class="acdc-wa-list">
        <a class="acdc-wa-contact" id="acdc-wa-c1" target="_blank" rel="noopener" data-num="5541991668814" data-nome="Raquel">
          <span class="acdc-wa-avatar">R</span>
          <span class="acdc-wa-info"><strong>Raquel</strong><small>Vendas</small></span>
          <svg class="acdc-wa-arrow" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
        </a>
        <a class="acdc-wa-contact" id="acdc-wa-c2" target="_blank" rel="noopener" data-num="5541992547744" data-nome="Beth">
          <span class="acdc-wa-avatar">B</span>
          <span class="acdc-wa-info"><strong>Beth</strong><small>Vendas</small></span>
          <svg class="acdc-wa-arrow" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
        </a>
      </div>
    </div>
  `;
  d.body.appendChild(fab);

  function montarLinks() {
    d.querySelectorAll('.acdc-wa-contact').forEach((a) => {
      const num = a.dataset.num;
      const nome = a.dataset.nome;
      a.href = `https://wa.me/${num}?text=${encodeURIComponent(mensagemPadrao(nome))}`;
    });
  }

  function init() {
    const btn = d.getElementById('acdc-wa-btn');
    const closeBtn = d.getElementById('acdc-wa-close');
    if (!fab || !btn) return;

    montarLinks();

    function abrir() {
      fab.classList.add('acdc-wa-open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function fechar() {
      fab.classList.remove('acdc-wa-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function alternar() {
      fab.classList.contains('acdc-wa-open') ? fechar() : abrir();
    }

    btn.addEventListener('click', alternar);
    closeBtn?.addEventListener('click', fechar);

    d.addEventListener('click', (e) => {
      if (fab.classList.contains('acdc-wa-open') && !fab.contains(e.target)) fechar();
    });
    d.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && fab.classList.contains('acdc-wa-open')) fechar();
    });
  }

  if (d.readyState === 'complete') init(); else window.addEventListener('load', init);
})();
