(function() {
  const style = document.createElement('style');
  style.textContent = `
    [data-store="shipping-calculator"],
    .product-shipping-calculator {
      background: #ffffff !important;
      border: 1px solid #e5e5e5 !important;
      border-radius: 12px !important;
      padding: 16px 18px !important;
      margin: 16px 0 !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }

    [data-store="shipping-calculator"] .js-shipping-calculator-current-zip {
      color: #1a1a1a !important;
      font-weight: 800 !important;
    }
    [data-store="shipping-calculator"] .js-shipping-calculator-head a,
    [data-store="shipping-calculator"] .js-shipping-calculator-with-zipcode a {
      color: #1a1a1a !important;
      font-weight: 700 !important;
      text-decoration: none !important;
      border-bottom: 1px solid #1a1a1a !important;
      font-size: 12.5px !important;
    }

    [data-store="shipping-calculator"] input[type="text"],
    [data-store="shipping-calculator"] input[type="tel"],
    [data-store="shipping-calculator"] input.form-control {
      border: 1.5px solid #dddddd !important;
      border-radius: 8px !important;
      padding: 10px 14px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      color: #222222 !important;
      background: #ffffff !important;
      transition: border-color .2s ease, box-shadow .2s ease !important;
    }
    [data-store="shipping-calculator"] input:focus {
      border-color: #1a1a1a !important;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08) !important;
      outline: none !important;
    }

    [data-store="shipping-calculator"] .js-calculate-shipping {
      background: #1a1a1a !important;
      color: #ffffff !important;
      border: none !important;
      border-radius: 8px !important;
      font-weight: 700 !important;
      letter-spacing: .08em !important;
      text-transform: uppercase !important;
      font-size: 11.5px !important;
      padding: 11px 18px !important;
      transition: background .2s ease, box-shadow .2s ease !important;
    }
    [data-store="shipping-calculator"] .js-calculate-shipping:hover {
      background: #2e2e2e !important;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18) !important;
    }

    [data-store="shipping-calculator"] a[href*="correios"] {
      color: #888888 !important;
      font-size: 11.5px !important;
      text-decoration: underline !important;
    }

    [data-store="shipping-calculator"] .spinner-ellipsis .point {
      background: #1a1a1a !important;
    }

    [data-store="shipping-calculator"] .js-free-shipping-message {
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      background: #f5f5f5 !important;
      border: 1px solid #1a1a1a !important;
      color: #1a1a1a !important;
      padding: 6px 12px !important;
      border-radius: 999px !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      letter-spacing: .05em !important;
      text-transform: uppercase !important;
    }
    [data-store="shipping-calculator"] .js-free-shipping-message strong {
      color: #1a1a1a !important;
    }

    [data-store="shipping-calculator"] .js-shipping-calculator-response {
      margin-top: 14px !important;
    }
    [data-store="shipping-calculator"] .js-shipping-calculator-response .text-primary {
      color: #1a1a1a !important;
      font-weight: 800 !important;
    }
    [data-store="shipping-calculator"] .js-shipping-calculator-response .price-compare {
      color: #aaaaaa !important;
      text-decoration: line-through !important;
    }

    [data-store="shipping-calculator"] .alert,
    [data-store="shipping-calculator"] .alert-warning {
      background: #f7f7f7 !important;
      border: 1px solid #1a1a1a !important;
      color: #1a1a1a !important;
      border-radius: 8px !important;
      font-size: 12.5px !important;
      font-weight: 600 !important;
      padding: 10px 14px !important;
    }
    [data-store="shipping-calculator"] .alert svg,
    [data-store="shipping-calculator"] .alert-warning svg,
    [data-store="shipping-calculator"] .alert i,
    [data-store="shipping-calculator"] .alert-warning i {
      color: #1a1a1a !important;
      fill: #1a1a1a !important;
    }

    [data-store="shipping-calculator"] .alert,
    [data-store="shipping-calculator"] .text-danger,
    [data-store="shipping-calculator"] .input-form-alert {
      color: #b3261e !important;
      font-size: 12px !important;
      margin-top: 8px !important;
      font-weight: 500 !important;
    }
  `;
  document.head.appendChild(style);
})();
