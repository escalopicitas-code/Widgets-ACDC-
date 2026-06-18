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

      /* ─────────────────────────────────────────────────
         FILOSOFIA: sem caixas, sem sombras, sem radius.
         Linhas finas de 1px como separadores editoriais.
         Tipografia como protagonista.
         Referências: Minotti, B&B Italia, Roche Bobois.
      ───────────────────────────────────────────────── */

      /* BREADCRUMB */
      .breadcrumb,
      .product-breadcrumb {
        display: flex !important;
        align-items: center !important;
        flex-wrap: wrap !important;
        gap: 0 !important;
        margin-bottom: 20px !important;
        padding: 0 !important;
        list-style: none !important;
      }
      .breadcrumb a,
      .breadcrumb span,
      .breadcrumb li,
      .product-breadcrumb a,
      .product-breadcrumb span {
        font-size: 10px !important;
        font-weight: 500 !important;
        letter-spacing: .14em !important;
        text-transform: uppercase !important;
        color: #b0b0b0 !important;
        text-decoration: none !important;
        transition: color .2s ease !important;
      }
      .breadcrumb a:hover,
      .product-breadcrumb a:hover {
        color: #1a1a1a !important;
      }
      .breadcrumb .breadcrumb-separator,
      .breadcrumb li + li::before,
      .breadcrumb span.separator {
        color: #d8d8d8 !important;
        margin: 0 8px !important;
        font-weight: 300 !important;
      }
      .breadcrumb li:last-child,
      .breadcrumb li:last-child a,
      .breadcrumb li:last-child span,
      .breadcrumb .active {
        color: #1a1a1a !important;
        font-weight: 600 !important;
      }

      /* NOME DO PRODUTO */
      #single-product h1,
      .product-name,
      h1.product-name {
        font-size: clamp(1.5rem, 2.8vw, 2.1rem) !important;
        font-weight: 300 !important;
        letter-spacing: .04em !important;
        line-height: 1.15 !important;
        color: #1a1a1a !important;
        margin: 0 0 22px 0 !important;
      }

      /* SKU */
      .product-sku,
      .js-product-sku {
        font-size: 10px !important;
        font-weight: 500 !important;
        letter-spacing: .14em !important;
        text-transform: uppercase !important;
        color: #bbbbbb !important;
        margin-bottom: 18px !important;
      }

      /* PREÇO PRINCIPAL */
      .product-price,
      .js-product-price {
        display: flex !important;
        align-items: baseline !important;
        flex-wrap: wrap !important;
        gap: 6px 12px !important;
        margin-bottom: 4px !important;
      }
      .js-price-display,
      .product-price .price,
      .item-price {
        font-size: 1.55rem !important;
        font-weight: 400 !important;
        letter-spacing: .01em !important;
        color: #1a1a1a !important;
      }
      .product-compare-price,
      .js-compare-price,
      .price-compare {
        font-size: 0.95rem !important;
        font-weight: 400 !important;
        color: #c0c0c0 !important;
        text-decoration: line-through !important;
      }

      /* badge "-10% OFF" — fino, sem preenchimento */
      .product-discount,
      .product-label,
      .js-product-discount,
      [class*="discount-badge"],
      [class*="product-label"] {
        display: inline-flex !important;
        align-items: center !important;
        background: transparent !important;
        border: 1px solid #1a1a1a !important;
        border-radius: 0 !important;
        color: #1a1a1a !important;
        font-size: 9px !important;
        font-weight: 600 !important;
        letter-spacing: .12em !important;
        text-transform: uppercase !important;
        padding: 2px 7px !important;
      }

      /* "R$1.350,00 com Pix" */
      .js-product-price-pix,
      .product-price-pix,
      .price-pix {
        font-size: 0.82rem !important;
        font-weight: 400 !important;
        letter-spacing: .02em !important;
        color: #888888 !important;
        margin-bottom: 0 !important;
        display: block !important;
      }
      .js-product-price-pix strong,
      .product-price-pix strong,
      .price-pix strong {
        font-weight: 500 !important;
        color: #1a1a1a !important;
      }

      /* ─────────────────────────────────────────────────
         BLOCO DE PAGAMENTOS
         Sem card. Separado da área de preço por uma
         linha fina de 1px. Parcelamento e Pix como
         linhas de texto, não como widgets.
      ───────────────────────────────────────────────── */
      .js-product-payments-container {
        background: transparent !important;
        border: none !important;
        border-top: 1px solid #e8e8e8 !important;
        border-radius: 0 !important;
        padding: 22px 0 0 0 !important;
        margin-top: 20px !important;
        margin-bottom: 20px !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        color: #1a1a1a !important;
        box-shadow: none !important;
      }

      /* linha de parcelamento */
      .js-max-installments-container,
      .product-installments {
        display: flex !important;
        align-items: baseline !important;
        flex-wrap: wrap !important;
        gap: 4px 8px !important;
        margin-bottom: 0 !important;
      }
      .js-max-installments-container {
        margin-bottom: 16px !important;
      }

      .js-installment-amount,
      .js-installment-price {
        font-size: 0.95rem !important;
        font-weight: 500 !important;
        letter-spacing: .01em !important;
        color: #1a1a1a !important;
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
      }

      /* "de", "no", "x" */
      .product-installments span:not([class]):not(:last-of-type) {
        font-size: 0.85rem !important;
        font-weight: 400 !important;
        color: #888888 !important;
        letter-spacing: .02em !important;
      }

      /* "SEM JUROS" — só um contorno fino, sem preenchimento */
      .js-installment-interest-free,
      .product-installments .installment-interest-free {
        display: inline-flex !important;
        align-items: center !important;
        background: transparent !important;
        border: 1px solid #1a1a1a !important;
        border-radius: 0 !important;
        color: #1a1a1a !important;
        font-size: 8.5px !important;
        font-weight: 600 !important;
        letter-spacing: .14em !important;
        text-transform: uppercase !important;
        padding: 2px 6px !important;
        margin-left: 3px !important;
        vertical-align: middle !important;
      }

      /* desconto Pix — linha de texto separada por 1px,
         sem fundo, sem borda arredondada */
      .js-product-discount-container {
        display: flex !important;
        align-items: baseline !important;
        flex-wrap: wrap !important;
        gap: 4px 6px !important;
        background: transparent !important;
        border: none !important;
        border-top: 1px solid #eeeeee !important;
        border-radius: 0 !important;
        padding: 16px 0 0 0 !important;
        margin-bottom: 16px !important;
      }

      /* "10% de desconto" */
      .text-accent {
        font-size: 0.88rem !important;
        font-weight: 600 !important;
        letter-spacing: .01em !important;
        color: #1a1a1a !important;
        background: transparent !important;
        padding: 0 !important;
      }

      /* "pagando com Pix" */
      .js-product-discount-container > span:not(.text-accent):not(.js-product-discount-disclaimer) {
        font-size: 0.85rem !important;
        font-weight: 400 !important;
        letter-spacing: .01em !important;
        color: #888888 !important;
      }

      /* "Não acumulável com outras promoções" */
      .js-product-discount-disclaimer {
        width: 100% !important;
        font-size: 9.5px !important;
        font-weight: 400 !important;
        letter-spacing: .1em !important;
        text-transform: uppercase !important;
        color: #c0c0c0 !important;
        margin-top: 5px !important;
        font-style: normal !important;
        opacity: 1 !important;
      }

      /* "VER MAIS DETALHES" — só texto uppercase espaçado */
      #btn-installments {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        font-size: 9.5px !important;
        font-weight: 600 !important;
        letter-spacing: .18em !important;
        text-transform: uppercase !important;
        color: #888888 !important;
        text-decoration: none !important;
        border: none !important;
        background: transparent !important;
        cursor: pointer !important;
        padding: 0 !important;
        transition: color .25s ease !important;
        margin-top: 0 !important;
      }
      #btn-installments:hover {
        color: #1a1a1a !important;
      }
      #btn-installments .icon-inline {
        width: 13px !important;
        height: 13px !important;
        stroke: currentColor !important;
        transition: stroke .25s ease !important;
      }

      /* AVISO DE ESTOQUE — só texto uppercase, sem box */
      .product-stock-message,
      .js-product-stock-message,
      .product-last-items {
        display: inline-block !important;
        font-size: 9.5px !important;
        font-weight: 600 !important;
        letter-spacing: .14em !important;
        text-transform: uppercase !important;
        color: #1a1a1a !important;
        background: transparent !important;
        border: none !important;
        border-radius: 0 !important;
        padding: 0 !important;
        margin-bottom: 14px !important;
      }

      @media (max-width: 576px) {
        #single-product h1,
        .product-name {
          font-size: 1.3rem !important;
          letter-spacing: .02em !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

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
