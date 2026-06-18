(function () {
  'use strict';

  if (window.__acdcProductPageInit) return;
  window.__acdcProductPageInit = true;

  var CSS_ID = 'acdc-product-page-style';

  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var style = document.createElement('style');
    style.id = CSS_ID;
    style.textContent = `

      /* ════════════════════════════════════════════════
         BREADCRUMB
         Início . Móveis . Puffs . Puff Ibiza
      ════════════════════════════════════════════════ */
      .breadcrumb,
      .product-breadcrumb {
        display: flex !important;
        align-items: center !important;
        flex-wrap: wrap !important;
        gap: 0 !important;
        margin-bottom: 14px !important;
        padding: 0 !important;
        list-style: none !important;
      }
      .breadcrumb a,
      .breadcrumb span,
      .breadcrumb li,
      .product-breadcrumb a,
      .product-breadcrumb span {
        font-size: 10.5px !important;
        font-weight: 600 !important;
        letter-spacing: .08em !important;
        text-transform: uppercase !important;
        color: #aaaaaa !important;
        text-decoration: none !important;
      }
      .breadcrumb a:hover,
      .product-breadcrumb a:hover {
        color: #1a1a1a !important;
      }
      /* separador " . " */
      .breadcrumb .breadcrumb-separator,
      .breadcrumb li + li::before,
      .breadcrumb span.separator {
        color: #cccccc !important;
        margin: 0 6px !important;
        font-weight: 400 !important;
      }
      /* último item (nome do produto atual) */
      .breadcrumb li:last-child,
      .breadcrumb li:last-child a,
      .breadcrumb li:last-child span,
      .breadcrumb .active {
        color: #1a1a1a !important;
        font-weight: 700 !important;
      }

      /* ════════════════════════════════════════════════
         NOME DO PRODUTO (H1)
      ════════════════════════════════════════════════ */
      #single-product h1,
      .product-name,
      h1.product-name {
        font-size: clamp(1.4rem, 2.6vw, 2rem) !important;
        font-weight: 900 !important;
        letter-spacing: -.025em !important;
        line-height: 1.1 !important;
        color: #1a1a1a !important;
        margin: 0 0 18px 0 !important;
      }

      /* SKU / código do produto (abaixo do nome, se houver) */
      .product-sku,
      .js-product-sku {
        font-size: 10.5px !important;
        font-weight: 600 !important;
        letter-spacing: .1em !important;
        text-transform: uppercase !important;
        color: #aaaaaa !important;
        margin-bottom: 16px !important;
      }

      /* ════════════════════════════════════════════════
         ÁREA DE PREÇO
         R$650,00 · -10% OFF · R$585,00 com Pix
      ════════════════════════════════════════════════ */
      .product-price,
      .js-product-price {
        display: flex !important;
        align-items: baseline !important;
        flex-wrap: wrap !important;
        gap: 6px 10px !important;
        margin-bottom: 6px !important;
      }

      /* preço principal */
      .js-price-display,
      .product-price .price,
      .item-price {
        font-size: 1.6rem !important;
        font-weight: 900 !important;
        letter-spacing: -.03em !important;
        color: #1a1a1a !important;
      }

      /* preço riscado (de) */
      .product-compare-price,
      .js-compare-price,
      .price-compare {
        font-size: 1rem !important;
        font-weight: 500 !important;
        color: #aaaaaa !important;
        text-decoration: line-through !important;
      }

      /* badge de desconto "-10% OFF" */
      .product-discount,
      .product-label,
      .js-product-discount,
      [class*="discount-badge"],
      [class*="product-label"] {
        display: inline-flex !important;
        align-items: center !important;
        background: #f5f5f5 !important;
        border: 1px solid #1a1a1a !important;
        color: #1a1a1a !important;
        font-size: 9.5px !important;
        font-weight: 700 !important;
        letter-spacing: .08em !important;
        text-transform: uppercase !important;
        padding: 3px 9px !important;
        border-radius: 3px !important;
      }

      /* "R$585,00 com Pix" — linha abaixo do preço principal */
      .js-product-price-pix,
      .product-price-pix,
      .price-pix {
        font-size: 0.88rem !important;
        font-weight: 600 !important;
        color: #555555 !important;
        margin-bottom: 16px !important;
        display: block !important;
      }
      .js-product-price-pix strong,
      .product-price-pix strong,
      .price-pix strong {
        font-weight: 800 !important;
        color: #1a1a1a !important;
      }

      /* ════════════════════════════════════════════════
         BLOCO DE PAGAMENTOS
         (parcelamento + desconto Pix)
      ════════════════════════════════════════════════ */
      .js-product-payments-container {
        background: #ffffff !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 10px !important;
        padding: 16px 18px !important;
        margin-bottom: 20px !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        color: #1a1a1a !important;
        box-shadow: none !important;
      }

      /* linha de parcelamento */
      .js-max-installments-container,
      .product-installments {
        display: flex !important;
        align-items: center !important;
        flex-wrap: wrap !important;
        gap: 5px 7px !important;
        margin-bottom: 0 !important;
      }
      .js-max-installments-container {
        margin-bottom: 12px !important;
      }

      .js-installment-amount,
      .js-installment-price {
        font-weight: 800 !important;
        font-size: 1.05rem !important;
        color: #1a1a1a !important;
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
      }

      /* "de", "no" e outros textos da linha */
      .product-installments span:not([class]):not(:last-of-type) {
        color: #555555 !important;
        font-size: 0.9rem !important;
        font-weight: 400 !important;
      }

      /* badge "Sem Juros" */
      .js-installment-interest-free,
      .product-installments .installment-interest-free {
        display: inline-flex !important;
        align-items: center !important;
        background: #f5f5f5 !important;
        border: 1px solid #1a1a1a !important;
        color: #1a1a1a !important;
        font-size: 9.5px !important;
        font-weight: 700 !important;
        letter-spacing: .08em !important;
        text-transform: uppercase !important;
        padding: 3px 8px !important;
        border-radius: 3px !important;
        margin-left: 2px !important;
      }

      /* bloco desconto Pix */
      .js-product-discount-container {
        display: flex !important;
        align-items: center !important;
        flex-wrap: wrap !important;
        gap: 5px 7px !important;
        background: #f7f7f7 !important;
        border: 1px solid #e0e0e0 !important;
        border-radius: 8px !important;
        padding: 11px 14px !important;
        margin-bottom: 14px !important;
      }

      .text-accent {
        color: #1a1a1a !important;
        font-weight: 900 !important;
        font-size: 1rem !important;
        background: transparent !important;
        padding: 0 !important;
      }

      .js-product-discount-container > span:not(.text-accent):not(.js-product-discount-disclaimer) {
        color: #444444 !important;
        font-weight: 500 !important;
        font-size: 0.88rem !important;
      }

      .js-product-discount-disclaimer {
        width: 100% !important;
        font-size: 0.72rem !important;
        color: #999999 !important;
        margin-top: 3px !important;
        font-style: italic !important;
        opacity: 1 !important;
      }

      /* link "Ver mais formas de pagamento" */
      #btn-installments {
        display: inline-flex !important;
        align-items: center !important;
        gap: 5px !important;
        font-size: 0.78rem !important;
        font-weight: 700 !important;
        letter-spacing: .07em !important;
        text-transform: uppercase !important;
        color: #1a1a1a !important;
        text-decoration: none !important;
        border-bottom: 1px solid #1a1a1a !important;
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        background: transparent !important;
        cursor: pointer !important;
        padding: 0 0 1px 0 !important;
        transition: opacity .2s ease !important;
        margin-top: 2px !important;
      }
      #btn-installments:hover {
        opacity: .6 !important;
      }
      #btn-installments .icon-inline {
        width: 14px !important;
        height: 14px !important;
        stroke: #1a1a1a !important;
      }

      /* ════════════════════════════════════════════════
         AVISOS ("Atenção, última peça!" etc.)
      ════════════════════════════════════════════════ */
      .product-stock-message,
      .js-product-stock-message,
      .product-last-items {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        font-size: 10.5px !important;
        font-weight: 700 !important;
        letter-spacing: .08em !important;
        text-transform: uppercase !important;
        color: #1a1a1a !important;
        background: #f5f5f5 !important;
        border: 1px solid #1a1a1a !important;
        border-radius: 3px !important;
        padding: 4px 10px !important;
        margin-bottom: 14px !important;
      }

      @media (max-width: 576px) {
        .js-product-payments-container {
          padding: 13px 14px !important;
        }
        #single-product h1,
        .product-name {
          font-size: 1.3rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Garante que o bloco de desconto fique antes do link "Ver mais"
  function reordenar() {
    var container = document.querySelector('.js-product-payments-container');
    if (!container) return;
    var discount = container.querySelector('.js-product-discount-container');
    var link = container.querySelector('#btn-installments');
    if (discount && link && discount.nextElementSibling !== link) {
      container.insertBefore(discount, link);
    }
  }

  function init() {
    injectCSS();
    reordenar();

    var tentativas = 0;
    var intervalo = setInterval(function () {
      reordenar();
      if (++tentativas >= 8) clearInterval(intervalo);
    }, 250);

    window.addEventListener('load', reordenar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  var obs = new MutationObserver(function (mutations, observer) {
    if (document.querySelector('.js-product-payments-container')) {
      injectCSS();
      reordenar();
      observer.disconnect();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });

})();
