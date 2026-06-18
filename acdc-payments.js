(function() {
  "use strict";

  var CSS_ID = 'acdc-payments-pure-style';
  var done = false;

  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var style = document.createElement('style');
    style.id = CSS_ID;
    style.innerHTML = `
      /* Container Principal: Design clean em formato de card moderno */
      .js-product-payments-container {
        background: #ffffff !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 12px !important;
        padding: 20px !important;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
        color: #334155 !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03) !important;
        margin-bottom: 24px !important;
      }

      /* Organização das parcelas */
      .js-max-installments-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px 8px;
        margin-bottom: 16px !important;
      }

      .product-installments {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
      }

      /* Quantidade de parcelas (ex: 10x) */
      .js-installment-amount {
        font-weight: 700 !important;
        font-size: 1.15rem !important;
        color: #0f172a !important;
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
      }

      /* Texto intermediário (ex: "de") */
      .product-installments span:not([class]) {
        color: #64748b !important;
        font-size: 0.95rem !important;
      }

      /* Valor da parcela - Foco na tipografia ao invés de blocos de cor */
      .js-installment-price {
        font-weight: 800 !important;
        font-size: 1.15rem !important;
        color: #0f172a !important;
        background: transparent !important;
        padding: 0 !important;
      }

      /* Tag "Sem Juros" - Verde sofisticado e formato sutil */
      .product-installments span:last-child {
        background: #dcfce7 !important;
        color: #166534 !important;
        font-weight: 600 !important;
        font-size: 0.75rem !important;
        padding: 4px 8px !important;
        border-radius: 6px !important;
        text-transform: uppercase !important;
        letter-spacing: 0.5px !important;
        margin-left: 4px !important;
      }

      /* Caixa de Desconto do Pix - Fundo neutro com borda de destaque lateral */
      .js-product-discount-container {
        background: #f8fafc !important;
        border: 1px solid #e2e8f0 !important;
        border-left: 4px solid #10b981 !important; /* Destaque verde esmeralda */
        border-radius: 8px !important;
        padding: 12px 16px !important;
        margin-bottom: 16px !important;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px 8px;
      }

      /* Texto de desconto em si (ex: 10% de desconto) */
      .text-accent {
        color: #10b981 !important;
        font-weight: 800 !important;
        font-size: 0.95rem !important;
        background: transparent !important;
        padding: 0 !important;
      }

      /* Texto "pagando com Pix" */
      .js-product-discount-container > span:not(.text-accent) {
        color: #334155 !important;
        font-weight: 500 !important;
        font-size: 0.95rem !important;
      }

      /* Disclaimer em itálico */
      .js-product-discount-disclaimer {
        width: 100% !important;
        font-size: 0.75rem !important;
        color: #94a3b8 !important;
        margin-top: 2px !important;
        font-style: normal !important;
      }

      /* Link "Ver mais detalhes" */
      #btn-installments {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        font-size: 0.85rem !important;
        color: #64748b !important;
        text-decoration: none !important;
        font-weight: 600 !important;
        transition: color 0.2s ease !important;
        border: none !important;
      }

      #btn-installments:hover {
        color: #0f172a !important;
      }

      #btn-installments .icon-inline {
        width: 16px !important;
        height: 16px !important;
        stroke: currentColor !important;
      }

      /* Responsividade mobile */
      @media (max-width: 576px) {
        .js-product-payments-container {
          padding: 16px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function reorderIfNeeded() {
    var container = document.querySelector('.js-product-payments-container');
    if (!container) return;
    var discount = container.querySelector('.js-product-discount-container');
    var link = container.querySelector('#btn-installments');
    if (discount && link && discount.nextElementSibling !== link) {
      container.insertBefore(discount, link);
    }
  }

  function init() {
    if (done) return;
    injectCSS();
    reorderIfNeeded();
    setTimeout(reorderIfNeeded, 300);
    setTimeout(reorderIfNeeded, 800);
    window.addEventListener('load', reorderIfNeeded);
    done = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (window.MutationObserver) {
    var observer = new MutationObserver(function() {
      if (document.querySelector('.js-product-payments-container')) {
        injectCSS();
        reorderIfNeeded();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
