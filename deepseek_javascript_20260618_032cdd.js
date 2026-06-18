(function () {
  if (window.__sobConsultaInit) return;
  window.__sobConsultaInit = true;

  const d = document;

  const CONFIG = {
    whatsappNumber: '5541991668814',
    badgeText: 'Consultar preço',
    ctaText: 'Consultar no WhatsApp',
    contextNote: 'Esse produto é sob consulta — fale com a gente para saber o valor e a disponibilidade.',
    mensagem: (nome) => `Olá! Gostaria de saber o preço do produto: ${nome}`,
  };

  const WHATS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.4-4.2A8 8 0 1 1 9 18.5L4 20Z"></path></svg>';

  const PRICE_SELECTORS = '.js-price-display, .price, .item-price, .product-item-price';
  const GRID_ITEM_SELECTOR = '.js-item-product';
  const BUY_AREA_SELECTORS = '.js-product-buy-container, .js-product-form, #product-form, .js-product-container';
  const BUTTON_CONSULT_SELECTORS = '[value*="sob consulta" i], .js-addtocart.contact, .js-prod-submit-form';
  const NAME_SELECTORS = '[data-store^="product-item-name"], .js-item-name, .product-title, .js-product-name, h1';

  function temPrecoValido(texto) {
    return /[0-9]/.test(texto) && !/sob\s*consulta/i.test(texto);
  }
  function limparTexto(t) {
    return (t || '').replace(/\s+/g, ' ').trim();
  }
  function linkWhats(msg) {
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }
  function getProductName(root) {
    const el = root?.querySelector?.(NAME_SELECTORS) || d.querySelector(NAME_SELECTORS);
    return limparTexto(el?.textContent) || d.title || 'este produto';
  }

  function injetarEstilos() {
    if (d.getElementById('sc-styles')) return;
    const style = d.createElement('style');
    style.id = 'sc-styles';
    style.textContent = `
      .sc-badge{display:inline-flex !important;align-items:center !important;gap:7px !important;background:#ffffff !important;border:1px solid #1a1a1a !important;border-radius:3px !important;padding:7px 14px !important;font-size:10.5px !important;font-weight:700 !important;color:#1a1a1a !important;text-decoration:none !important;cursor:pointer !important;line-height:1.2 !important;text-transform:uppercase !important;letter-spacing:.08em !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important;transition:background .25s ease,color .25s ease !important;}
      .sc-badge:hover{background:#1a1a1a !important;color:#ffffff !important}
      .sc-badge:hover .sc-badge-icon svg{stroke:#ffffff !important}
      .sc-badge-icon{display:inline-flex !important;width:13px !important;height:13px !important;flex-shrink:0 !important}
      .sc-badge-icon svg{width:100% !important;height:100% !important;stroke:#1a1a1a !important;transition:stroke .25s ease !important}
      .sc-badge-lg{padding:11px 18px !important;font-size:11.5px !important}
      .sc-badge-lg .sc-badge-icon{width:15px !important;height:15px !important}
      .sc-cta{display:flex !important;align-items:center !important;justify-content:center !important;gap:9px !important;width:100% !important;background:#1a1a1a !important;color:#ffffff !important;border:none !important;border-radius:3px !important;padding:14px 16px !important;font-size:12px !important;font-weight:700 !important;letter-spacing:.1em !important;text-transform:uppercase !important;text-decoration:none !important;cursor:pointer !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important;transition:background .25s ease,box-shadow .25s ease !important;}
      .sc-cta:hover{background:#2e2e2e !important;box-shadow:0 6px 18px rgba(0,0,0,0.18) !important}
      .sc-cta-icon{display:inline-flex !important;width:16px !important;height:16px !important;flex-shrink:0 !important}
      .sc-cta-icon svg{width:100% !important;height:100% !important;stroke:#ffffff !important}
      .sc-context-note{display:block !important;margin:10px 0 0 0 !important;font-size:11.5px !important;color:#8a8a8a !important;line-height:1.6 !important;font-style:italic !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important;}
    `;
    d.head.appendChild(style);
  }

  function criarSelo(nome, grande) {
    const a = d.createElement('a');
    a.className = grande ? 'sc-badge sc-badge-lg' : 'sc-badge';
    a.href = linkWhats(CONFIG.mensagem(nome));
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `<span class="sc-badge-icon">${WHATS_ICON}</span><span>${CONFIG.badgeText}</span>`;
    return a;
  }

  function criarBotaoCTA(nome) {
    const a = d.createElement('a');
    a.className = 'sc-cta';
    a.href = linkWhats(CONFIG.mensagem(nome));
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `<span class="sc-cta-icon">${WHATS_ICON}</span><span>${CONFIG.ctaText}</span>`;
    return a;
  }

  function observarPreco(priceEl, aoEncontrarPrecoReal) {
    if (priceEl.dataset.scObservado) return;
    priceEl.dataset.scObservado = '1';
    const obs = new MutationObserver(() => {
      if (priceEl.querySelector('.sc-badge')) return;
      if (temPrecoValido(priceEl.textContent.trim())) {
        obs.disconnect();
        aoEncontrarPrecoReal?.();
      }
    });
    obs.observe(priceEl, { characterData: true, childList: true, subtree: true });
  }

  function processarItemGrade(product) {
    if (!product) return;
    let priceEl = product.querySelector(PRICE_SELECTORS);
    if (priceEl && priceEl.querySelector('.sc-badge')) return;
    if (priceEl && temPrecoValido(priceEl.textContent.trim())) return;
    if (!priceEl) {
      priceEl = d.createElement('div');
      priceEl.className = 'item-price';
      (product.querySelector('.item-description') || product).appendChild(priceEl);
    }
    const nome = getProductName(product);
    priceEl.innerHTML = '';
    priceEl.appendChild(criarSelo(nome, false));
    observarPreco(priceEl);
  }

  function processarGradeToda() {
    d.querySelectorAll(GRID_ITEM_SELECTOR).forEach(processarItemGrade);
  }

  function encontrarAreaDeCompra() {
    return d.querySelector(BUY_AREA_SELECTORS);
  }
  function isPaginaDeProdutoUnico() {
    return !!(encontrarAreaDeCompra() || d.getElementById('single-product'));
  }
  function encontrarPrecoDoProduto(escopo) {
    for (const el of escopo.querySelectorAll(PRICE_SELECTORS)) {
      if (el.closest(GRID_ITEM_SELECTOR)) continue;
      return el;
    }
    return null;
  }

  function processarPaginaDeProduto() {
    if (!isPaginaDeProdutoUnico()) return;
    if (d.body.dataset.scProdutoProcessado) return;
    const escopo = d.getElementById('single-product') || d;
    const priceEl = encontrarPrecoDoProduto(escopo);
    if (priceEl && temPrecoValido(priceEl.textContent.trim())) {
      d.body.dataset.scProdutoProcessado = '1';
      return;
    }
    d.body.dataset.scProdutoProcessado = '1';
    const nome = getProductName(escopo);
    const elementosCriados = [];
    let elementoEscondido = null;

    if (priceEl && !priceEl.querySelector('.sc-badge')) {
      priceEl.innerHTML = '';
      priceEl.appendChild(criarSelo(nome, true));
    }

    const botaoExistente = d.querySelector(BUTTON_CONSULT_SELECTORS);
    let cta = null;

    if (botaoExistente && !botaoExistente.dataset.scReplaced) {
      const label = limparTexto(botaoExistente.value || botaoExistente.textContent);
      const pareceConsulta = /consulta|contato/i.test(label) || botaoExistente.classList.contains('contact');
      const pareceComprar = /comprar|adicionar|carrinho/i.test(label) || /[0-9]/.test(label);

      if (pareceConsulta && !pareceComprar) {
        cta = criarBotaoCTA(nome);
        botaoExistente.insertAdjacentElement('afterend', cta);
        botaoExistente.setAttribute('aria-hidden', 'true');
        botaoExistente.tabIndex = -1;
        if ('disabled' in botaoExistente) botaoExistente.disabled = true;
        botaoExistente.style.display = 'none';
        botaoExistente.dataset.scReplaced = '1';
        elementoEscondido = botaoExistente;
      }
    }

    if (!cta) {
      const alvo = encontrarAreaDeCompra();
      cta = criarBotaoCTA(nome);
      if (alvo && alvo.parentNode) {
        alvo.parentNode.insertBefore(cta, alvo);
        alvo.style.display = 'none';
        elementoEscondido = alvo;
      } else {
        escopo.appendChild ? escopo.appendChild(cta) : d.body.appendChild(cta);
      }
    }
    elementosCriados.push(cta);

    const nota = d.createElement('small');
    nota.className = 'sc-context-note';
    nota.textContent = CONFIG.contextNote;
    cta.insertAdjacentElement('afterend', nota);
    elementosCriados.push(nota);

    if (priceEl) {
      observarPreco(priceEl, () => {
        elementosCriados.forEach((el) => el.remove());
        if (elementoEscondido) elementoEscondido.style.display = '';
      });
    }
  }

  function processarTudo() {
    injetarEstilos();
    processarGradeToda();
    processarPaginaDeProduto();
  }

  if (d.readyState === 'loading') {
    d.addEventListener('DOMContentLoaded', processarTudo);
  } else {
    processarTudo();
  }
  window.addEventListener('load', processarTudo);

  const obs = new MutationObserver(() => processarTudo());
  obs.observe(d.body, { childList: true, subtree: true });
})();