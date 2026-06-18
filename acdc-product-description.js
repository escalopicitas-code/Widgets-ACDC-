(function() {
  "use strict";

  var CSS_ID = 'acdc-payments-luxury-style';
  var done = false;

  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var style = document.createElement('style');
    style.id = CSS_ID;
    style.innerHTML = `
      /* Animação de entrada sutil para efeito premium */
      @keyframes premiumFadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Container Principal: Estilo Galeria de Arte / Alta Joalheria */
      .js-product-payments-container {
        background: #ffffff !important;
        border: 1px solid #000000 !important; /* Linha preta fina e precisa */
        border-radius: 0px !important; /* Cantos retos = Design Arquitetônico/Sofisticado */
        padding: 24px !important;
        font-family: "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif !important;
        color: #000000 !important;
        box-shadow: none !important;
        margin-bottom: 24px !important;
        animation: premiumFadeIn 0.5s ease-out forwards;
      }

      /* Grid das parcelas */
      .js-max-installments-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 20px !important;
      }

      .product-installments {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
      }

      /* Parcelamento (ex: 12x) */
      .js-installment-amount {
        font-weight: 700 !important;
        font-size: 1.2rem !important;
        letter-spacing: -0.02em !important;
        color: #000000 !important;
      }

      /* Conector "de" */
      .product-installments span:not([class]) {
        color: #000000 !important;
        font-size: 0.95rem !important;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        opacity: 0.8;
      }

      /* Valor da Parcela */
      .js-installment-price {
        font-weight: 700 !important;
        font-size: 1.2rem !important;
        letter-spacing: -0.02em !important;
        color: #000000 !important;
      }

      /* Tag "Sem Juros" - Minimalista e imponente */
      .product-installments span:last-child {
        background: #000000 !important;
        color: #ffffff !important;
        font-weight: 600 !important;
        font-size: 0.7rem !important;
        padding: 3px 8px !important;
        border-radius: 0px !important; /* Reto */
        text-transform: uppercase !important;
        letter-spacing: 0.1em !important; /* Letras espaçadas estilo grife */
        margin-left: 8px !important;
      }

      /* Bloco de Desconto (Pix / À Vista) - Limpo e Direto */
      .js-product-discount-container {
        background: #ffffff !important;
        border-top: 1px dashed #000000 !important; /* Divisor elegante interno */
        border-bottom: 1px dashed #000000 !important;
        border-left: none !important;
        border-right: none !important;
        border-radius: 0px !important;
        padding: 16px 0px !important;
        margin-bottom: 20px !important;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px 8px;
      }

      /* O preço com desconto / porcentagem em Vermelho Puro de Destaque */
      .text-accent {
        color: #E31837 !important; /* Vermelho vivo, sério e corporativo */
        font-weight: 700 !important;
        font-size: 1.15rem !important;
        letter-spacing: -0.01em !important;
      }

      /* Texto complementar "pagando com Pix" ou "à vista" */
      .js-product-discount-container > span:not(.text-accent) {
        color: #000000 !important;
        font-weight: 500 !important;
        font-size: 1rem !important;
        letter-spacing: -0.01em !important;
      }

      /* Notas de rodapé / Disclaimer */
      .js-product-discount-disclaimer {
        width: 100% !important;
        font-size: 0.75rem !important;
        color: #000000 !important;
        opacity: 0.6;
        letter-spacing: 0.02em !important;
        text-transform: uppercase;
      }

      /* Botão "Ver mais detalhes" com efeito de linha inteligente */
      #btn-installments {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        font-size: 0.8rem !important;
        color: #000000 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important;
        text-decoration: none !important;
        font-weight: 600 !important;
        border: none !important;
        background: transparent !important;
        cursor: pointer;
        padding: 4px 0 !important;
        position: relative;
        transition: opacity 0.2s ease;
      }

      /* Efeito de Underline sofisticado no hover */
      #btn-installments::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #000000;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }

      #btn-installments:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }

      #btn-installments:hover {
        opacity: 0.7;
      }

      #btn-installments .icon-inline {
        width: 12px !important;
        height: 12px !important;
        stroke: #000000 !important;
        transition: transform 0.3s ease;
      }
      
      #btn-installments:hover .icon-inline {
        transform: translateX(2px); /* Micro-movimento premium na seta */
      }

      /* Ajuste responsivo */
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
