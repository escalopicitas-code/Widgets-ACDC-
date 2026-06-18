(function() {
  "use strict";

  var CSS_ID = 'acdc-payments-pure-style';
  var done = false;

  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var style = document.createElement('style');
    style.id = CSS_ID;
    style.innerHTML = `
      .js-product-payments-container {
        background: #f8f9fb !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 14px !important;
        padding: 18px 20px 16px !important;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial !important;
        color: #1a1a1a !important;
        line-height: 1.4 !important;
        margin-bottom: 20px !important;
      }

      .js-max-installments-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px 10px;
        margin-bottom: 12px !important;
      }

      .product-installments {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 4px 8px;
      }

      .js-installment-amount {
        background: #fff !important;
        border: 1px solid #ddd !important;
        border-radius: 8px !important;
        padding: 4px 12px !important;
        font-weight: 700 !important;
        font-size: 1.1rem !important;
        color: #000 !important;
        letter-spacing: -0.2px !important;
      }

      .product-installments span:not([class]) {
        color: #555 !important;
        font-size: 0.9rem !important;
      }

      .js-installment-price {
        background: #111 !important;
        color: #fff !important;
        border-radius: 6px !important;
        padding: 4px 12px !important;
        font-weight: 600 !important;
        font-size: 1rem !important;
      }

      .product-installments span:last-child {
        background: #e6f4ea !important;
        color: #1e7e34 !important;
        font-weight: 600 !important;
        font-size: 0.8rem !important;
        padding: 4px 12px !important;
        border-radius: 20px !important;
        letter-spacing: 0.3px !important;
        white-space: nowrap !important;
      }

      .js-product-discount-container {
        background: #fff7e5 !important;
        border: 1px solid #ffe0a3 !important;
        border-radius: 10px !important;
        padding: 10px 14px !important;
        margin-bottom: 12px !important;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px 10px;
        font-size: 0.9rem !important;
      }

      .text-accent {
        background: #f4511e !important;
        color: #fff !important;
        border-radius: 20px !important;
        padding: 3px 12px !important;
        font-weight: 700 !important;
        font-size: 0.85rem !important;
        letter-spacing: 0.3px !important;
      }

      .js-product-discount-container > span:not(.text-accent) {
        color: #5d4037 !important;
        font-weight: 500 !important;
      }

      .js-product-discount-disclaimer {
        width: 100% !important;
        font-size: 0.78rem !important;
        color: #8a8a8a !important;
        margin-top: 4px !important;
        font-style: italic !important;
        opacity: 1 !important;
      }

      #btn-installments {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        font-size: 0.85rem !important;
        color: #444 !important;
        text-decoration: none !important;
        font-weight: 500 !important;
        border-bottom: 1px solid transparent !important;
        transition: all 0.2s !important;
      }

      #btn-installments:hover {
        color: #000 !important;
        border-bottom-color: #aaa !important;
      }

      #btn-installments .icon-inline {
        width: 18px !important;
        height: 18px !important;
        stroke: currentColor !important;
      }

      @media (max-width: 576px) {
        .js-product-payments-container {
          padding: 14px 12px 12px !important;
        }
        .product-installments {
          flex-direction: column;
          align-items: flex-start;
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
