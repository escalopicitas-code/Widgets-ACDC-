(function() {
  "use strict";

  var CSS_ID = 'acdc-payments-pure-style';
  var done = false;

  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var style = document.createElement('style');
    style.id = CSS_ID;
    style.innerHTML = `
      /* Container Principal: Design minimalista em Preto e Branco */
      .js-product-payments-container {
        background: #ffffff !important;
        border: 1px solid #000000 !important; /* Borda preta fina */
        border-radius: 8px !important;
        padding: 20px !important;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
        color: #000000 !important; /* Texto totalmente preto */
        box-shadow: none !important; /* Removido sombras para visual mais limpo */
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
        color: #000000 !important;
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
      }

      /* Texto intermediário (ex: "de") */
      .product-installments span:not([class]) {
        color: #000000 !important;
        font-size: 0.95rem !important;
      }

      /* Valor da parcela */
      .js-installment-price {
        font-weight: 800 !important;
        font-size: 1.15rem !important;
        color: #000000 !important;
        background: transparent !important;
        padding: 0 !important;
      }

      /* Tag "Sem Juros" - Invertido para Preto e Branco */
      .product-installments span:last-child {
        background: #000000 !important; /* Fundo preto */
        color: #ffffff !important;       /* Texto branco */
        font-weight: 700 !important;
        font-size: 0.75rem !important;
        padding: 4px 8px !important;
        border-radius: 4px !important;
        text-transform: uppercase !important;
        letter-spacing: 0.5px !important;
        margin-left: 4px !important;
      }

      /* Caixa de Desconto do Pix - Estrutura P&B com destaque lateral preto */
      .js-product-discount-container {
        background: #ffffff !important;
        border: 1px solid #000000 !important;
        border-left: 5px solid #000000 !important; /* Destaque lateral em preto */
        border-radius: 6px !important;
        padding: 12px 16px !important;
        margin-bottom: 16px !important;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px 8px;
      }

      /* Texto de desconto (ex: 10% de desconto) - Destaque em Vermelho */
      .text-accent {
        color: #ff0000 !important; /* VERMELHO para o desconto do Pix */
        font-weight: 800 !important;
        font-size: 1.05rem !important;
        background: transparent !important;
        padding: 0 !important;
      }

      /* Texto "pagando com Pix" */
      .js-product-discount-container > span:not(.text-accent) {
        color: #000000 !important;
        font-weight: 600 !important;
        font-size: 0.95rem !important;
      }

      /* Disclaimer abaixo do Pix */
      .js-product-discount-disclaimer {
        width: 100% !important;
        font-size: 0.75rem !important;
        color: #000000 !important;
        margin-top: 2px !important;
        font-style: normal !important;
        opacity: 0.7; /* Tom sutil usando opacidade do próprio preto */
      }

      /* Link "Ver mais detalhes" */
      #btn-installments {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        font-size: 0.85rem !important;
        color: #000000 !important;
        text-decoration: underline !important; /* Sublinhado para indicar link no padrão P&B */
        font-weight: 600 !important;
        border: none !important;
        background: transparent !important;
        cursor: pointer;
      }

      #btn-installments:hover {
        opacity: 0.7;
      }

      #btn-installments .icon-inline {
        width: 16px !important;
        height: 16px !important;
        stroke: #000000 !important;
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
