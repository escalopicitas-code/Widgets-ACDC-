/* ACDC CASA — VERSÃO COMPLETA V10 — 24/07/2026
   Inclui produto, medidas em linha, transição, calculadora,
   voltar ao topo e produtos sem preço/sob consulta.
*/

/* =========================================================================
   ACDC CASA — PÁGINA DE PRODUTO (arquivo único)
   v1.1

   Substitui e unifica:
     • acdc-payments.js
     • acdc-shipping-calculator.js
     • consultar-disponibilidade.js
     • formatação da descrição do produto
     • acdc-loading-transition.js
     • acdc-roll-calculator.js
     • acdc-back-to-top.js
     • acdc-under-consultation.js
     • acdc-whatsapp-widget.js

   Linguagem visual:
     preto absoluto · dourado #C9A84C · zero radius · linhas de 1px ·
     zero sombra · tipografia uppercase com tracking largo
   ========================================================================= */

(function () {
  'use strict';

  if (window.__ACDC_PDP__) return;
  window.__ACDC_PDP__ = true;

  /* ---------------------------------------------------------------- CONFIG */
  var CFG = {
    whatsapp: '5541991668814',
    // Categorias/termos que exibem o aviso "consultar disponibilidade"
    avisoTermos: ['papel de parede', 'papeis de parede', 'tapete'],
    idEstilo: 'acdc-pdp-style',
    idAviso: 'acdc-aviso-disponibilidade'
  };

  /* ------------------------------------------------------------------- CSS */
  var CSS = `
:root{
  --acdc-preto:#0A0A0A;
  --acdc-tinta:#111111;
  --acdc-texto:#333333;
  --acdc-suave:#8A8A8A;
  --acdc-fraco:#B4B4B4;
  --acdc-linha:#E6E6E6;
  --acdc-linha-fina:#F0F0F0;
  --acdc-ouro:#C9A84C;
  --acdc-fundo-2:#FAFAFA;
  --acdc-fonte:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
}

/* ══ 0. NORMALIZAÇÃO — sem raio, sem sombra em toda a coluna do produto ══ */
#single-product .btn,
#single-product input,
#single-product select,
#single-product textarea,
#single-product .card,
#single-product .alert,
#single-product [class*="rounded"],
[data-store="shipping-calculator"],
[data-store="shipping-calculator"] *,
.product-shipping-calculator,
.product-shipping-calculator *{
  border-radius:0 !important;
  box-shadow:none !important;
}

/* ══ 1. BREADCRUMB ══════════════════════════════════════════════════════ */
.breadcrumb,
.product-breadcrumb{
  display:flex !important; align-items:center !important; flex-wrap:wrap !important;
  gap:0 !important; margin:0 0 22px 0 !important; padding:0 !important; list-style:none !important;
}
.breadcrumb a,.breadcrumb span,.breadcrumb li,
.product-breadcrumb a,.product-breadcrumb span{
  font-size:10px !important; font-weight:500 !important;
  letter-spacing:.14em !important; text-transform:uppercase !important;
  color:var(--acdc-fraco) !important; text-decoration:none !important;
  transition:color .2s ease !important;
}
.breadcrumb a:hover,.product-breadcrumb a:hover{ color:var(--acdc-ouro) !important; }
.breadcrumb .breadcrumb-separator,
.breadcrumb li + li::before,
.breadcrumb span.separator{
  color:#D8D8D8 !important; margin:0 8px !important; font-weight:300 !important;
}
.breadcrumb li:last-child,.breadcrumb li:last-child a,
.breadcrumb li:last-child span,.breadcrumb .active{
  color:var(--acdc-tinta) !important; font-weight:600 !important;
}

/* ══ 2. NOME + SKU ══════════════════════════════════════════════════════ */
#single-product h1,
.product-name, h1.product-name{
  font-size:clamp(1.5rem,2.8vw,2.1rem) !important;
  font-weight:300 !important; letter-spacing:.04em !important;
  line-height:1.15 !important; color:var(--acdc-tinta) !important;
  margin:0 0 20px 0 !important;
}
.product-sku,.js-product-sku{
  font-size:10px !important; font-weight:500 !important;
  letter-spacing:.14em !important; text-transform:uppercase !important;
  color:var(--acdc-fraco) !important; margin-bottom:16px !important;
}

/* ══ 3. PREÇO ═══════════════════════════════════════════════════════════ */
.product-price,.js-product-price{
  display:flex !important; align-items:baseline !important; flex-wrap:wrap !important;
  gap:6px 12px !important; margin-bottom:4px !important;
}
.js-price-display,.product-price .price,.item-price{
  font-size:1.55rem !important; font-weight:400 !important;
  letter-spacing:.01em !important; color:var(--acdc-tinta) !important;
}
.product-compare-price,.js-compare-price,.price-compare{
  font-size:.95rem !important; font-weight:400 !important;
  color:#C0C0C0 !important; text-decoration:line-through !important;
}
.product-discount,.product-label,.js-product-discount,
[class*="discount-badge"],[class*="product-label"]{
  display:inline-flex !important; align-items:center !important;
  background:transparent !important; border:1px solid var(--acdc-tinta) !important;
  color:var(--acdc-tinta) !important; font-size:9px !important; font-weight:600 !important;
  letter-spacing:.12em !important; text-transform:uppercase !important; padding:2px 7px !important;
}
.js-product-price-pix,.product-price-pix,.price-pix{
  display:block !important; font-size:.82rem !important; font-weight:400 !important;
  letter-spacing:.02em !important; color:var(--acdc-suave) !important; margin:0 !important;
}
.js-product-price-pix strong,.product-price-pix strong,.price-pix strong{
  font-weight:500 !important; color:var(--acdc-tinta) !important;
}

/* ══ 4. PAGAMENTOS ══════════════════════════════════════════════════════ */
.js-product-payments-container{
  background:transparent !important; border:none !important;
  border-top:1px solid var(--acdc-linha) !important;
  padding:20px 0 0 0 !important; margin:20px 0 !important;
  font-family:var(--acdc-fonte) !important; color:var(--acdc-tinta) !important;
}
.js-max-installments-container,.product-installments{
  display:flex !important; align-items:baseline !important; flex-wrap:wrap !important;
  gap:4px 8px !important; margin-bottom:0 !important;
}
.js-max-installments-container{ margin-bottom:16px !important; }
.js-installment-amount,.js-installment-price{
  font-size:.95rem !important; font-weight:500 !important; letter-spacing:.01em !important;
  color:var(--acdc-tinta) !important; background:transparent !important;
  border:none !important; padding:0 !important;
}
.product-installments span:not([class]):not(:last-of-type){
  font-size:.85rem !important; font-weight:400 !important;
  color:var(--acdc-suave) !important; letter-spacing:.02em !important;
}
/* "SEM JUROS" — contorno fino, nunca colorido pelo tema */
.js-installment-interest-free,
.product-installments .installment-interest-free,
.js-max-installments-container .text-primary,
.js-max-installments-container .text-accent,
.product-installments .text-primary{
  display:inline-flex !important; align-items:center !important;
  background:transparent !important; border:1px solid var(--acdc-tinta) !important;
  color:var(--acdc-tinta) !important; font-size:8.5px !important; font-weight:600 !important;
  letter-spacing:.14em !important; text-transform:uppercase !important;
  padding:2px 6px !important; margin-left:3px !important; vertical-align:middle !important;
}
.js-product-discount-container{
  display:flex !important; align-items:baseline !important; flex-wrap:wrap !important;
  gap:4px 6px !important; background:transparent !important; border:none !important;
  border-top:1px solid var(--acdc-linha-fina) !important;
  padding:16px 0 0 0 !important; margin-bottom:16px !important;
}
.js-product-discount-container .text-accent{
  font-size:.88rem !important; font-weight:600 !important; letter-spacing:.01em !important;
  color:var(--acdc-tinta) !important; background:transparent !important;
  border:none !important; padding:0 !important; text-transform:none !important;
}
.js-product-discount-container > span:not(.text-accent):not(.js-product-discount-disclaimer){
  font-size:.85rem !important; font-weight:400 !important;
  letter-spacing:.01em !important; color:var(--acdc-suave) !important;
}
.js-product-discount-disclaimer{
  width:100% !important; font-size:9.5px !important; font-weight:400 !important;
  letter-spacing:.1em !important; text-transform:uppercase !important;
  color:#C4C4C4 !important; margin-top:5px !important; font-style:normal !important; opacity:1 !important;
}
#btn-installments{
  display:inline-flex !important; align-items:center !important; gap:6px !important;
  font-size:9.5px !important; font-weight:600 !important; letter-spacing:.18em !important;
  text-transform:uppercase !important; color:var(--acdc-suave) !important;
  text-decoration:none !important; border:none !important; background:transparent !important;
  cursor:pointer !important; padding:0 !important; margin:0 !important;
  transition:color .25s ease !important;
}
#btn-installments:hover{ color:var(--acdc-ouro) !important; }
#btn-installments .icon-inline{ width:13px !important; height:13px !important; stroke:currentColor !important; }

/* ══ 4B. CABEÇALHO + PREÇO — acabamento alto padrão ════════════════════ */
#single-product [data-store^="product-info-"] .page-header{
  margin:0 0 22px 0 !important;
  padding:0 !important;
}
#single-product .breadcrumbs{
  display:flex !important; align-items:center !important; flex-wrap:wrap !important;
  gap:0 !important; margin:0 0 18px 0 !important; padding:0 !important;
}
#single-product .breadcrumbs .crumb{
  color:var(--acdc-suave) !important;
  font-size:9.5px !important; font-weight:500 !important;
  line-height:1.4 !important; letter-spacing:.12em !important;
  text-decoration:none !important; text-transform:uppercase !important;
  transition:color .2s ease !important;
}
#single-product .breadcrumbs a.crumb:hover{ color:var(--acdc-ouro) !important; }
#single-product .breadcrumbs .separator{
  color:var(--acdc-ouro) !important;
  font-size:9px !important; margin:0 8px !important;
}
#single-product .breadcrumbs .crumb.active{
  color:var(--acdc-fraco) !important; font-weight:400 !important;
}
#single-product .page-header .js-product-name{
  max-width:560px !important;
  margin:0 !important;
  color:var(--acdc-tinta) !important;
  font-family:var(--acdc-fonte) !important;
  font-size:clamp(28px,2.25vw,34px) !important;
  font-weight:400 !important;
  line-height:1.16 !important;
  letter-spacing:.025em !important;
}
#single-product .price-container{
  margin:0 !important; padding:0 !important;
}
#single-product .price-container > .mb-3{
  margin:0 !important;
}
#single-product .price-container #price_display,
#single-product .price-container > div > span > .js-price-display{
  color:var(--acdc-tinta) !important;
  font-family:var(--acdc-fonte) !important;
  font-size:27px !important;
  font-weight:400 !important;
  line-height:1.15 !important;
  letter-spacing:.01em !important;
}
#single-product .payment-discount-price-product-container{
  display:flex !important; align-items:baseline !important; flex-wrap:wrap !important;
  gap:4px !important; margin:9px 0 0 0 !important;
  color:var(--acdc-suave) !important;
  font-size:11px !important; font-weight:500 !important;
  letter-spacing:.08em !important; text-transform:uppercase !important;
}
#single-product .payment-discount-price-product-container .payment-discount-price-product{
  color:var(--acdc-tinta) !important;
  font-size:17px !important; font-weight:600 !important;
  line-height:1.2 !important; letter-spacing:.01em !important;
}
#single-product .payment-discount-price-product-container .js-payment-discount-name-product{
  color:var(--acdc-tinta) !important; font-weight:600 !important;
}
#single-product .js-product-payments-container{
  width:100% !important; max-width:100% !important; flex:0 0 100% !important;
  margin:22px 0 24px 0 !important; padding:17px 0 16px 0 !important;
  border-top:1px solid var(--acdc-linha) !important;
  border-bottom:1px solid var(--acdc-linha) !important;
}
#single-product .js-product-payments-container .js-max-installments-container{
  margin:0 0 15px 0 !important;
}
#single-product .js-product-payments-container .product-installments{
  display:flex !important; align-items:baseline !important; flex-wrap:wrap !important;
  gap:5px !important;
}
#single-product .js-product-payments-container .js-installment-amount{
  color:var(--acdc-tinta) !important; font-size:14px !important; font-weight:700 !important;
}
#single-product .js-product-payments-container .js-installment-price{
  color:var(--acdc-tinta) !important; font-size:14px !important; font-weight:600 !important;
}
#single-product .js-product-payments-container .product-installments > span:not([class]){
  color:var(--acdc-suave) !important;
  font-size:10px !important; font-weight:500 !important;
  letter-spacing:.09em !important; text-transform:uppercase !important;
}
#single-product .js-product-payments-container .product-installments > span:last-child{
  color:var(--acdc-ouro) !important;
}
#single-product .js-product-payments-container .js-product-discount-container{
  margin:0 !important; padding:15px 0 0 0 !important;
}
#single-product .js-product-payments-container .js-product-discount-container .text-accent{
  color:var(--acdc-tinta) !important; font-size:12px !important; font-weight:600 !important;
}
#single-product .js-product-payments-container .js-product-discount-container{
  color:var(--acdc-texto) !important; font-size:12px !important;
}
#single-product .js-product-payments-container .js-product-discount-disclaimer{
  color:var(--acdc-fraco) !important;
  font-size:9px !important; letter-spacing:.13em !important;
}
#single-product .js-product-payments-container #btn-installments{
  display:inline-flex !important; align-items:center !important; gap:8px !important;
  width:max-content !important; margin:15px 0 0 0 !important; padding:9px 12px !important;
  color:var(--acdc-tinta) !important; background:#fff !important;
  border:1px solid var(--acdc-tinta) !important;
  font-size:9px !important; font-weight:600 !important; letter-spacing:.17em !important;
  transition:color .2s ease,border-color .2s ease !important;
}
#single-product .js-product-payments-container #btn-installments:hover{
  color:var(--acdc-ouro) !important; border-color:var(--acdc-ouro) !important;
}

/* ══ 5. ESTOQUE ═════════════════════════════════════════════════════════ */
.product-stock-message,.js-product-stock-message,.product-last-items{
  display:inline-block !important; font-size:9.5px !important; font-weight:600 !important;
  letter-spacing:.14em !important; text-transform:uppercase !important;
  color:var(--acdc-tinta) !important; background:transparent !important;
  border:none !important; padding:0 !important; margin-bottom:14px !important;
}

/* ══ 6. QUANTIDADE + COMPRAR ════════════════════════════════════════════ */
.js-quantity-input-wrapper,
.item-quantity,
[data-component="quantity"]{
  border:1px solid var(--acdc-linha) !important; background:#fff !important;
}
.js-quantity-input,
.item-quantity input,
input[name="quantity"]{
  border:none !important; background:transparent !important;
  font-size:14px !important; font-weight:500 !important; color:var(--acdc-tinta) !important;
  text-align:center !important;
}
.js-addtocart,
.js-prod-submit-form .btn-primary,
[data-store="product-buy-buttons"] .btn-primary,
.product-buy-container .btn-primary{
  background:var(--acdc-preto) !important; color:#fff !important;
  border:1px solid var(--acdc-preto) !important;
  font-size:11px !important; font-weight:600 !important;
  letter-spacing:.2em !important; text-transform:uppercase !important;
  padding:16px 24px !important;
  transition:background .25s ease,color .25s ease,border-color .25s ease !important;
}
.js-addtocart:hover,
.js-prod-submit-form .btn-primary:hover,
[data-store="product-buy-buttons"] .btn-primary:hover,
.product-buy-container .btn-primary:hover{
  background:var(--acdc-ouro) !important; border-color:var(--acdc-ouro) !important;
  color:var(--acdc-preto) !important;
}

/* ══ 7. MEIOS DE ENVIO / CALCULADORA DE FRETE ═══════════════════════════ */
[data-store="shipping-calculator"],
.product-shipping-calculator,
#single-product .card,
#single-product .accordion{
  background:transparent !important; border:none !important;
  border-top:1px solid var(--acdc-linha) !important;
  border-bottom:1px solid var(--acdc-linha) !important;
  padding:0 !important; margin:24px 0 !important;
  font-family:var(--acdc-fonte) !important;
}
#single-product .card-header,
[data-store="shipping-calculator"] .js-toggle,
[data-store="shipping-calculator"] .card-header{
  background:transparent !important; border:none !important; padding:18px 0 !important;
}
[data-store="shipping-calculator"] .js-shipping-calculator-head,
[data-store="shipping-calculator"] .card-header span,
#single-product .card-header span{
  font-size:10px !important; font-weight:600 !important;
  letter-spacing:.18em !important; text-transform:uppercase !important;
  color:var(--acdc-tinta) !important;
}
[data-store="shipping-calculator"] .card-body,
#single-product .card-body{ padding:0 0 20px 0 !important; background:transparent !important; }

[data-store="shipping-calculator"] .js-shipping-calculator-current-zip{
  color:var(--acdc-tinta) !important; font-weight:600 !important;
  font-size:12.5px !important; letter-spacing:.02em !important;
}
[data-store="shipping-calculator"] .js-shipping-calculator-head a,
[data-store="shipping-calculator"] .js-shipping-calculator-with-zipcode a{
  color:var(--acdc-suave) !important; font-weight:600 !important;
  text-decoration:none !important; border-bottom:1px solid var(--acdc-linha) !important;
  font-size:9.5px !important; letter-spacing:.16em !important; text-transform:uppercase !important;
  transition:color .2s ease,border-color .2s ease !important;
}
[data-store="shipping-calculator"] .js-shipping-calculator-head a:hover,
[data-store="shipping-calculator"] .js-shipping-calculator-with-zipcode a:hover{
  color:var(--acdc-ouro) !important; border-color:var(--acdc-ouro) !important;
}
[data-store="shipping-calculator"] input[type="text"],
[data-store="shipping-calculator"] input[type="tel"],
[data-store="shipping-calculator"] input.form-control{
  border:1px solid var(--acdc-linha) !important; background:#fff !important;
  padding:13px 14px !important; font-size:13px !important; font-weight:500 !important;
  letter-spacing:.06em !important; color:var(--acdc-tinta) !important;
  transition:border-color .2s ease !important;
}
[data-store="shipping-calculator"] input:focus{
  border-color:var(--acdc-preto) !important; outline:none !important;
}
[data-store="shipping-calculator"] .js-calculate-shipping{
  background:transparent !important; color:var(--acdc-tinta) !important;
  border:1px solid var(--acdc-tinta) !important;
  font-size:9.5px !important; font-weight:600 !important;
  letter-spacing:.2em !important; text-transform:uppercase !important;
  padding:13px 20px !important;
  transition:background .25s ease,color .25s ease !important;
}
[data-store="shipping-calculator"] .js-calculate-shipping:hover{
  background:var(--acdc-preto) !important; color:#fff !important;
}
[data-store="shipping-calculator"] a[href*="correios"]{
  color:var(--acdc-fraco) !important; font-size:10px !important;
  letter-spacing:.1em !important; text-transform:uppercase !important;
  text-decoration:none !important; border-bottom:1px solid var(--acdc-linha) !important;
}
[data-store="shipping-calculator"] .spinner-ellipsis .point{ background:var(--acdc-tinta) !important; }
[data-store="shipping-calculator"] .js-shipping-calculator-response{
  margin-top:16px !important; border-top:1px solid var(--acdc-linha-fina) !important; padding-top:14px !important;
}
[data-store="shipping-calculator"] .js-shipping-calculator-response .text-primary{
  color:var(--acdc-tinta) !important; font-weight:600 !important;
}
[data-store="shipping-calculator"] .js-shipping-calculator-response .price-compare{
  color:var(--acdc-fraco) !important; text-decoration:line-through !important;
}
[data-store="shipping-calculator"] .js-free-shipping-message{
  display:inline-flex !important; align-items:center !important; gap:6px !important;
  background:transparent !important; border:1px solid var(--acdc-ouro) !important;
  color:var(--acdc-tinta) !important; padding:5px 10px !important;
  font-size:9px !important; font-weight:600 !important;
  letter-spacing:.16em !important; text-transform:uppercase !important;
}
[data-store="shipping-calculator"] .js-free-shipping-message strong{ color:var(--acdc-tinta) !important; }
[data-store="shipping-calculator"] .alert,
[data-store="shipping-calculator"] .alert-warning{
  background:var(--acdc-fundo-2) !important; border:none !important;
  border-left:2px solid var(--acdc-tinta) !important; color:var(--acdc-texto) !important;
  font-size:12px !important; font-weight:400 !important; padding:10px 14px !important;
}
[data-store="shipping-calculator"] .text-danger,
[data-store="shipping-calculator"] .input-form-alert{
  color:#B3261E !important; font-size:11px !important;
  letter-spacing:.04em !important; margin-top:8px !important; font-weight:500 !important;
}
.product-shipping-calculator .js-accordion-private-toggle{
  display:flex !important; align-items:center !important;
  min-height:54px !important; margin:0 !important; padding:0 !important;
  color:var(--acdc-tinta) !important; text-decoration:none !important;
}
.product-shipping-calculator .js-accordion-private-toggle > .col{
  padding-left:0 !important;
}
.product-shipping-calculator .js-accordion-private-toggle > .col-auto{
  padding-right:0 !important;
}
.product-shipping-calculator .js-accordion-private-toggle .col > div{
  display:flex !important; align-items:center !important; gap:10px !important;
  font-size:11px !important; font-weight:600 !important;
  letter-spacing:.16em !important; line-height:1.2 !important;
  text-transform:uppercase !important;
}
.product-shipping-calculator .js-accordion-private-toggle svg{
  color:var(--acdc-tinta) !important;
}

/* ══ 8. AVISO DE DISPONIBILIDADE ════════════════════════════════════════ */
#${CFG.idAviso}{
  display:flex; align-items:center; gap:12px;
  width:100%; box-sizing:border-box;
  min-height:54px; margin:16px 0 0 0; padding:0 0 0 14px;
  border:1px solid var(--acdc-linha); border-left:2px solid var(--acdc-preto);
  background:#fff; color:var(--acdc-tinta);
  font-family:var(--acdc-fonte); line-height:1.4;
  transition:border-color .2s ease;
}
#${CFG.idAviso} .acdc-aviso-icone{
  display:flex; flex:0 0 16px; align-items:center; justify-content:center;
  width:16px; height:16px; border:1px solid var(--acdc-preto);
  color:var(--acdc-preto); font-size:10px; font-weight:700; line-height:1;
  transition:color .2s ease,border-color .2s ease;
}
#${CFG.idAviso} .acdc-aviso-texto{
  flex:1 1 auto; min-width:0; font-size:11.5px; color:var(--acdc-texto);
  letter-spacing:.01em;
}
#${CFG.idAviso} a{
  display:flex; align-self:stretch; align-items:center; justify-content:center;
  flex:0 0 auto; min-width:112px; white-space:nowrap; color:#fff;
  background:var(--acdc-preto);
  font-size:9.5px; font-weight:600; letter-spacing:.18em;
  text-decoration:none; text-transform:uppercase; border:none; padding:0 20px;
  transition:color .2s ease,background .2s ease;
}
#${CFG.idAviso} a:hover{ color:var(--acdc-preto); background:var(--acdc-ouro); }
#${CFG.idAviso}:hover{ border-left-color:var(--acdc-ouro); }
#${CFG.idAviso}:hover .acdc-aviso-icone{
  color:var(--acdc-ouro); border-color:var(--acdc-ouro);
}

/* ══ 9. DESCRIÇÃO — preserva o conteúdo cadastrado ═════════════════════ */
[data-store^="product-description"] .user-content p.acdc-campo{
  display:grid !important;
  grid-template-columns:112px minmax(0,1fr) !important;
  column-gap:18px !important;
  align-items:start !important;
  margin:0 !important;
  padding:16px 0 !important;
  border-top:1px solid var(--acdc-linha) !important;
}
[data-store^="product-description"] .acdc-campo-label{
  display:block !important;
  color:var(--acdc-suave) !important;
  font-family:inherit !important;
  font-size:11px !important;
  line-height:1.5 !important;
  font-weight:600 !important;
  letter-spacing:.08em !important;
  text-transform:uppercase !important;
}
[data-store^="product-description"] .acdc-campo-conteudo{
  display:block !important;
  min-width:0 !important;
  color:inherit !important;
  font:inherit !important;
}

/* No computador, força rótulo e conteúdo na mesma linha mesmo quando o
   tema da Nuvemshop acrescenta elementos ou estilos próprios. */
@media (min-width:577px){
  [data-store^="product-description"] .user-content p.acdc-campo{
    display:grid !important;
    grid-template-columns:112px minmax(0,1fr) !important;
  }
  [data-store^="product-description"] .user-content p.acdc-campo > .acdc-campo-label{
    grid-column:1 !important;
    grid-row:1 !important;
  }
  [data-store^="product-description"] .user-content p.acdc-campo > .acdc-campo-conteudo{
    grid-column:2 !important;
    grid-row:1 !important;
  }
}
[data-store^="product-description"] .user-content p.acdc-campo--sem-valor{
  padding-bottom:6px !important;
}
[data-store^="product-description"] .user-content p.acdc-campo-continuacao{
  margin:0 !important;
  padding:0 0 16px 130px !important;
}

/* ══ 10. COMPARTILHAR ═══════════════════════════════════════════════════ */
.social-share .btn-link,
.social-share .js-tooltip-open span{
  font-size:9.5px !important; font-weight:600 !important;
  letter-spacing:.18em !important; text-transform:uppercase !important;
  color:var(--acdc-suave) !important; transition:color .2s ease !important;
}
.social-share .js-tooltip-open:hover .btn-link{ color:var(--acdc-ouro) !important; }
.social-share svg{ color:var(--acdc-suave) !important; }

/* ══ 11. MOBILE ═════════════════════════════════════════════════════════ */
@media (max-width:576px){
  #single-product h1,.product-name{ font-size:26px !important; letter-spacing:.02em !important; }
  #single-product .breadcrumbs{ margin-bottom:14px !important; }
  #single-product .breadcrumbs .crumb.active{ display:none !important; }
  #single-product .breadcrumbs .separator:last-of-type{ display:none !important; }
  #single-product .price-container #price_display{ font-size:25px !important; }
  #single-product .js-product-payments-container{ margin:18px 0 20px 0 !important; }
  [data-store^="product-description"] .user-content p.acdc-campo{
    grid-template-columns:1fr !important;
    row-gap:6px !important;
    padding:14px 0 !important;
  }
  [data-store^="product-description"] .user-content p.acdc-campo--sem-valor{
    padding-bottom:5px !important;
  }
  [data-store^="product-description"] .user-content p.acdc-campo-continuacao{
    padding:0 0 14px 0 !important;
  }
  #${CFG.idAviso}{ flex-wrap:wrap; padding:10px 10px 10px 12px; gap:9px; }
  #${CFG.idAviso} .acdc-aviso-texto{ font-size:11px; flex:1 1 100%; order:2; }
  #${CFG.idAviso} a{ order:3; min-height:40px; margin-left:auto; padding:0 16px; }
}
`;

  /* --------------------------------------------------------------- HELPERS */
  function normalizar(t) {
    return String(t || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().trim();
  }

  function injetarCSS() {
    if (document.getElementById(CFG.idEstilo)) return;
    var s = document.createElement('style');
    s.id = CFG.idEstilo;
    s.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(s);
  }

  /* ------------------------------------------- 1. REORDENAR BLOCO PAGAMENTO */
  function reordenarPagamentos() {
    var c = document.querySelector('.js-product-payments-container');
    if (!c) return;
    var desconto = c.querySelector('.js-product-discount-container');
    var link = c.querySelector('#btn-installments');
    if (desconto && link && desconto.nextElementSibling !== link) {
      c.insertBefore(desconto, link);
    }
  }

  /* -------------------------------------- 2. ORGANIZAR CAMPOS DA DESCRIÇÃO */
  function tipoRotuloDaFicha(texto) {
    var chave = normalizar(texto)
      .replace(/[:.\s]+$/g, '')
      .replace(/\s+/g, ' ');

    if (/^(material|materiais|composicao)$/.test(chave)) return 'material';
    if (/^(medida|medidas|dimensao|dimensoes|tamanho|tamanhos)$/.test(chave)) return 'medidas';
    if (/^(cor|cores)$/.test(chave)) return 'cor';
    if (/^(obs|observacao|observacoes|nota|notas|informacao|informacoes)$/.test(chave)) return 'obs';
    return 'campo';
  }

  function ehTituloNegrito(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.tagName !== 'STRONG' && el.tagName !== 'B') return false;

    var texto = String(el.textContent || '').replace(/\s+/g, ' ').trim();
    return !!texto && texto.length <= 80;
  }

  function desembrulharRotulosNegrito(box) {
    var negritos = Array.prototype.slice.call(box.querySelectorAll('strong, b'));
    var tagsInline = /^(SPAN|FONT|EM|I|U|SMALL)$/;

    for (var i = 0; i < negritos.length; i++) {
      var negrito = negritos[i];
      if (!ehTituloNegrito(negrito) || !box.contains(negrito)) continue;

      // O editor da Nuvemshop às vezes envolve o rótulo e seu valor em spans.
      // Remove apenas esses invólucros de formatação, preservando todos os nós,
      // textos, sinais, unidades e a ordem em que foram cadastrados.
      var pai = negrito.parentNode;
      while (pai && pai !== box && pai.tagName !== 'P' && tagsInline.test(pai.tagName)) {
        var avo = pai.parentNode;
        if (!avo) break;

        while (pai.firstChild) {
          avo.insertBefore(pai.firstChild, pai);
        }
        avo.removeChild(pai);
        pai = negrito.parentNode;
      }
    }
  }

  function separarParagrafosPorNegrito(box) {
    var ps = Array.prototype.slice.call(box.querySelectorAll('p'));

    for (var i = 0; i < ps.length; i++) {
      var pOriginal = ps[i];
      if (!box.contains(pOriginal)) continue;

      var filhos = Array.prototype.slice.call(pOriginal.childNodes);
      var quantidadeTitulos = 0;
      for (var f = 0; f < filhos.length; f++) {
        if (ehTituloNegrito(filhos[f])) quantidadeTitulos++;
      }
      if (quantidadeTitulos <= 1) continue;

      var fragmento = document.createDocumentFragment();
      var pAtual = pOriginal.cloneNode(false);
      var encontrouTitulo = false;

      function adicionarAtual() {
        if (!pAtual) return;
        var texto = pAtual.textContent.replace(/\s+/g, '').trim();
        var temElementoUtil = pAtual.querySelector(':scope > *:not(br)');
        if (texto || temElementoUtil) fragmento.appendChild(pAtual);
      }

      for (var n = 0; n < filhos.length; n++) {
        var no = filhos[n];
        if (ehTituloNegrito(no)) {
          adicionarAtual();
          pAtual = pOriginal.cloneNode(false);
          pAtual.appendChild(no);
          encontrouTitulo = true;
        } else {
          pAtual.appendChild(no);
        }
      }
      adicionarAtual();

      if (encontrouTitulo && pOriginal.parentNode) {
        pOriginal.parentNode.replaceChild(fragmento, pOriginal);
      }
    }
  }

  function limparQuebrasNasBordas(el) {
    while (el.firstChild) {
      var primeiro = el.firstChild;
      var vazio = primeiro.nodeType === 3 && !primeiro.nodeValue.trim();
      if (primeiro.nodeName === 'BR' || vazio) {
        el.removeChild(primeiro);
      } else {
        break;
      }
    }

    while (el.lastChild) {
      var ultimo = el.lastChild;
      var vazioFinal = ultimo.nodeType === 3 && !ultimo.nodeValue.trim();
      if (ultimo.nodeName === 'BR' || vazioFinal) {
        el.removeChild(ultimo);
      } else {
        break;
      }
    }
  }

  function temTextoUtil(el) {
    return !!String(el && el.textContent || '')
      .replace(/\u00a0/g, ' ')
      .trim();
  }

  function proximoBlocoDaDescricao(atual, box) {
    var cursor = atual;

    while (cursor && cursor !== box) {
      if (cursor.nextElementSibling) return cursor.nextElementSibling;
      cursor = cursor.parentElement;
    }

    return null;
  }

  function juntarValoresSeparados(box) {
    var campos = box.querySelectorAll('p.acdc-campo');

    for (var i = 0; i < campos.length; i++) {
      var campo = campos[i];
      var conteudo = campo.querySelector(':scope > .acdc-campo-conteudo');
      if (!conteudo || temTextoUtil(conteudo)) continue;

      var candidato = proximoBlocoDaDescricao(campo, box);

      // Ignora os DIVs vazios que o editor cria quando alguém aperta Enter.
      while (candidato && !temTextoUtil(candidato)) {
        var vazio = candidato;
        candidato = proximoBlocoDaDescricao(vazio, box);
        if (vazio.parentNode) vazio.parentNode.removeChild(vazio);
      }

      if (!candidato) continue;

      // Nunca captura o campo seguinte: qualquer novo negrito continua sendo
      // tratado como o início de outro campo.
      var proximoCampo = candidato.matches('p.acdc-campo')
        ? candidato
        : candidato.querySelector('p.acdc-campo');
      var proximoRotulo = proximoCampo
        ? proximoCampo.querySelector('.acdc-campo-label')
        : candidato.querySelector('strong, b');
      if (proximoRotulo && ehTituloNegrito(proximoRotulo)) continue;

      while (candidato.firstChild) {
        conteudo.appendChild(candidato.firstChild);
      }
      if (candidato.parentNode) candidato.parentNode.removeChild(candidato);

      limparQuebrasNasBordas(conteudo);
      campo.classList.remove('acdc-campo--sem-valor');
    }
  }

  function organizarDescricaoPlana(box) {
    var nos = Array.prototype.slice.call(box.childNodes);
    var temRotuloDireto = false;

    for (var i = 0; i < nos.length; i++) {
      var no = nos[i];
      if (ehTituloNegrito(no)) {
        temRotuloDireto = true;
        break;
      }
    }
    if (!temRotuloDireto) return;

    var fragmento = document.createDocumentFragment();
    var campo = null;

    function concluirCampo() {
      if (!campo) return;
      limparQuebrasNasBordas(campo.conteudo);
      campo.p.appendChild(campo.conteudo);
      campo.p.setAttribute('data-acdc-campo', 'ok');
      fragmento.appendChild(campo.p);
      campo = null;
    }

    for (var n = 0; n < nos.length; n++) {
      var atual = nos[n];
      var tipo = ehTituloNegrito(atual)
        ? tipoRotuloDaFicha(atual.textContent)
        : '';

      if (tipo) {
        concluirCampo();
        var p = document.createElement('p');
        p.className = 'acdc-campo acdc-campo--' + tipo;
        atual.classList.add('acdc-campo-label');
        p.appendChild(atual);

        campo = {
          p: p,
          conteudo: document.createElement('span')
        };
        campo.conteudo.className = 'acdc-campo-conteudo';
      } else if (campo) {
        campo.conteudo.appendChild(atual);
      } else {
        fragmento.appendChild(atual);
      }
    }
    concluirCampo();

    while (box.firstChild) box.removeChild(box.firstChild);
    box.appendChild(fragmento);
  }

  function organizarDescricao() {
    var box = document.querySelector('[data-store^="product-description"] .user-content')
      || document.querySelector('.user-content');
    if (!box) return;

    desembrulharRotulosNegrito(box);
    separarParagrafosPorNegrito(box);

    // Também aceita descrições salvas dentro de DIVs pelo editor, inclusive
    // quando cada novo negrito marca o início do campo seguinte.
    var grupos = Array.prototype.slice.call(box.querySelectorAll('div, section'));
    for (var g = grupos.length - 1; g >= 0; g--) {
      organizarDescricaoPlana(grupos[g]);
    }
    organizarDescricaoPlana(box);

    var ps = box.querySelectorAll('p');
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      if (!box.contains(p)) continue;
      if (p.getAttribute('data-acdc-campo') === 'ok') continue;

      var forte = p.querySelector('strong, b');
      var tipo = ehTituloNegrito(forte) ? tipoRotuloDaFicha(forte.textContent) : '';
      if (!forte || !tipo) continue;

      // Quando os dois-pontos ficaram fora do negrito no editor, eles ainda
      // pertencem ao rótulo. Move somente essa pontuação, sem alterar o texto.
      var primeiroNo = forte.nextSibling;
      if (primeiroNo && primeiroNo.nodeType === 3) {
        var inicio = primeiroNo.nodeValue.match(/^(\s*:)(\s*)/);
        if (inicio) {
          forte.appendChild(document.createTextNode(inicio[1]));
          primeiroNo.nodeValue = inicio[2] + primeiroNo.nodeValue.slice(inicio[0].length);
        }
      }

      p.classList.add('acdc-campo', 'acdc-campo--' + tipo);
      forte.classList.add('acdc-campo-label');

      // Agrupa os nós do valor apenas para alinhamento. O conteúdo e a ordem
      // dos nós permanecem exatamente como foram cadastrados.
      if (forte.parentNode === p && !p.querySelector('.acdc-campo-conteudo')) {
        var conteudo = document.createElement('span');
        conteudo.className = 'acdc-campo-conteudo';

        while (forte.nextSibling) {
          conteudo.appendChild(forte.nextSibling);
        }
        p.appendChild(conteudo);

        // A Nuvemshop às vezes salva "Medidas" e o valor em parágrafos
        // separados. Junta os dois para manter todas as fichas no mesmo padrão.
        if (tipo === 'medidas' && !conteudo.textContent.trim()) {
          var linhaMedidas = p.nextElementSibling;
          if (linhaMedidas && linhaMedidas.tagName === 'P'
            && !linhaMedidas.querySelector('strong, b')) {
            while (linhaMedidas.firstChild) {
              conteudo.appendChild(linhaMedidas.firstChild);
            }
            linhaMedidas.parentNode.removeChild(linhaMedidas);
            limparQuebrasNasBordas(conteudo);
          }
        }

        if (!conteudo.textContent.trim()) {
          p.classList.add('acdc-campo--sem-valor');
          var proximo = p.nextElementSibling;
          if (proximo && proximo.tagName === 'P' && !proximo.querySelector('strong, b')) {
            proximo.classList.add('acdc-campo-continuacao');
          }
        }
      }

      p.setAttribute('data-acdc-campo', 'ok');
    }

    // Alguns produtos antigos foram salvos com o título em um DIV e o valor
    // no bloco seguinte. No computador, une todos esses campos para o texto
    // começar na mesma linha; no celular o CSS mantém o valor abaixo.
    juntarValoresSeparados(box);
  }
  /* ------------------------------------------ 3. AVISO DE DISPONIBILIDADE */
  function ehProdutoComAviso() {
    if (normalizar(window.location.pathname).indexOf('/produtos/') === -1) return false;

    var el = document.querySelector('#single-product h1')
      || document.querySelector('h1')
      || document.querySelector('.js-product-name')
      || document.querySelector('.product-name');

    var titulo = normalizar(el ? el.textContent : document.title);

    for (var i = 0; i < CFG.avisoTermos.length; i++) {
      if (titulo.indexOf(normalizar(CFG.avisoTermos[i])) !== -1) return true;
    }
    return false;
  }

  function encontrarBotaoComprar() {
    var seletores = [
      '.js-addtocart',
      '.js-add-to-cart',
      "button[name='add_to_cart']",
      "form[action*='/cart'] button[type='submit']",
      '.product-buy-container button',
      '.product-actions button'
    ];
    for (var i = 0; i < seletores.length; i++) {
      var el = document.querySelector(seletores[i]);
      if (el) return el;
    }
    var todos = document.querySelectorAll("button, input[type='submit']");
    for (var j = 0; j < todos.length; j++) {
      var t = normalizar(todos[j].textContent || todos[j].value || '');
      if (t.indexOf('comprar') !== -1 || t.indexOf('adicionar ao carrinho') !== -1) return todos[j];
    }
    return null;
  }

  function instalarAviso() {
    if (!ehProdutoComAviso()) return;
    if (document.getElementById(CFG.idAviso)) return;
    if (document.querySelector('.sc-cta')) return;

    var botao = encontrarBotaoComprar();
    if (!botao) return;

    var ancora = (botao.closest && botao.closest('form')) || botao.parentElement;
    if (!ancora || !ancora.parentNode) return;

    var tituloEl = document.querySelector('#single-product h1') || document.querySelector('h1');
    var tituloProduto = tituloEl ? tituloEl.textContent.trim() : 'este produto';
    var mensagem = 'Olá! Gostaria de consultar a disponibilidade em estoque do produto: '
      + tituloProduto + ' — ' + window.location.href;

    var aviso = document.createElement('div');
    aviso.id = CFG.idAviso;
    aviso.setAttribute('role', 'note');

    var icone = document.createElement('span');
    icone.className = 'acdc-aviso-icone';
    icone.textContent = '!';

    var texto = document.createElement('span');
    texto.className = 'acdc-aviso-texto';
    texto.textContent = 'Confirme a disponibilidade em estoque antes de finalizar a compra.';

    var link = document.createElement('a');
    link.href = 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(mensagem);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Consultar';

    aviso.appendChild(icone);
    aviso.appendChild(texto);
    aviso.appendChild(link);

    ancora.parentNode.insertBefore(aviso, ancora.nextSibling);
  }

  /* -------------------------------------------------------------- BOOTSTRAP */
  function aplicar() {
    injetarCSS();
    reordenarPagamentos();
    organizarDescricao();
    instalarAviso();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicar);
  } else {
    aplicar();
  }

  // Conteúdo do tema carrega em etapas: reaplica por um período curto.
  var tentativas = 0;
  var timer = setInterval(function () {
    aplicar();
    if (++tentativas >= 20) clearInterval(timer);
  }, 400);

  window.addEventListener('load', aplicar);

  var obs = new MutationObserver(aplicar);
  obs.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function () { obs.disconnect(); }, 15000);

})();

/* =========================================================================
   MÓDULO: TRANSIÇÃO DE CARREGAMENTO
   ========================================================================= */

(function () {
  'use strict';

  if (window.acdcLoadingTransition) return;
  window.acdcLoadingTransition = true;

  if (sessionStorage.getItem('acdc_intro_played')) return;

  var CSS_ID = 'acdc-transition-style';

  var style = document.createElement('style');
  style.id = CSS_ID;
  style.textContent = `
    #acdc-transition {
      position: fixed;
      inset: 0;
      background: #fff;
      z-index: 999999999;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      opacity: 1;
      transition: opacity .5s cubic-bezier(.4,0,.2,1);
    }
    #acdc-transition.hide {
      opacity: 0;
      pointer-events: none;
    }

    .acdc-stage {
      text-align: center;
      width: min(760px, 88vw);
    }

    .acdc-logo {
      font-size: 46px;
      font-weight: 900;
      letter-spacing: 14px;
      color: #1a1a1a;
      opacity: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      animation: acdcFadeUp .7s cubic-bezier(.22,.61,.36,1) .05s forwards;
    }

    .acdc-tag {
      margin-top: 10px;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #999;
      opacity: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      animation: acdcFadeUp .7s cubic-bezier(.22,.61,.36,1) .15s forwards;
    }

    /* ── SVG sketch
       Cada elemento usa pathLength="100" — normaliza o dasharray
       para 100 independente do comprimento real do traço, então
       stroke-dasharray:100 e stroke-dashoffset:100 funcionam certo
       em qualquer tipo de shape (rect, line, path, circle).
    ── */
    .acdc-scene {
      width: 100%;
      max-width: 620px;
      margin: 56px auto 36px;
    }

    .acdc-scene * {
      fill: none;
      stroke: #1a1a1a;
      stroke-width: 1.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
    }

    /* delays escalonados — duração 0.55s cada.
       último elemento: delay 0.85s → termina em 1.40s.
       overlay some em 1550ms → animação completa sem corte. */
    .acdc-s1  { animation: acdcDraw .55s ease .10s forwards; }
    .acdc-s2  { animation: acdcDraw .55s ease .20s forwards; }
    .acdc-s3  { animation: acdcDraw .55s ease .28s forwards; }
    .acdc-s4  { animation: acdcDraw .55s ease .36s forwards; }
    .acdc-s5  { animation: acdcDraw .55s ease .44s forwards; }
    .acdc-s6  { animation: acdcDraw .55s ease .52s forwards; }
    .acdc-s7  { animation: acdcDraw .55s ease .60s forwards; }
    .acdc-s8  { animation: acdcDraw .55s ease .68s forwards; }
    .acdc-s9  { animation: acdcDraw .55s ease .76s forwards; }
    .acdc-s10 { animation: acdcDraw .55s ease .85s forwards; }

    .acdc-progress {
      width: 180px;
      height: 1px;
      background: #e8e8e8;
      margin: 0 auto;
      overflow: hidden;
    }
    .acdc-progress::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: #1a1a1a;
      transform: translateX(-100%);
      /* barra termina junto com o último traço do SVG */
      animation: acdcProgressFill 1.3s cubic-bezier(.4,0,.6,1) .1s forwards;
    }

    @keyframes acdcDraw {
      to { stroke-dashoffset: 0; }
    }
    @keyframes acdcFadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes acdcProgressFill {
      to { transform: translateX(0); }
    }

    @media (max-width: 600px) {
      .acdc-logo  { font-size: 28px; letter-spacing: 8px; }
      .acdc-tag   { font-size: 9px;  letter-spacing: 3px; }
      .acdc-scene { margin: 36px auto 28px; }
    }
  `;
  document.head.appendChild(style);

  /*
    SVG: sketch minimalista de interiores
    Composição (viewBox 700×280):
      1. Parede fundo (retângulo)
      2. Janela (retângulo)
      3. Janela — barra vertical
      4. Janela — barra horizontal
      5. Sofá — estrutura principal
      6. Sofá — linha do encosto
      7. Sofá — braço esquerdo
      8. Sofá — braço direito
      9. Luminária de chão — haste
     10. Luminária de chão — cúpula
  */
  var overlay = document.createElement('div');
  overlay.id = 'acdc-transition';
  overlay.innerHTML = `
    <div class="acdc-stage">
      <div class="acdc-logo">ACDC CASA</div>
      <div class="acdc-tag">Móveis &nbsp;·&nbsp; Papéis de Parede &nbsp;·&nbsp; Decoração</div>
      <svg class="acdc-scene" viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">

        <!-- 1. Parede fundo -->
        <rect  class="acdc-s1"  pathLength="100" x="60"  y="40"  width="580" height="185"/>

        <!-- 2-4. Janela + divisórias -->
        <rect  class="acdc-s2"  pathLength="100" x="210" y="64"  width="140" height="105"/>
        <line  class="acdc-s3"  pathLength="100" x1="280" y1="64"  x2="280" y2="169"/>
        <line  class="acdc-s4"  pathLength="100" x1="210" y1="116" x2="350" y2="116"/>

        <!-- 5-8. Sofá (direita) -->
        <!-- estrutura: back + seat em path único pra ficar coeso -->
        <path  class="acdc-s5"  pathLength="100"
               d="M420,100 L420,190 L600,190 L600,100"/>
        <line  class="acdc-s6"  pathLength="100" x1="420" y1="140" x2="600" y2="140"/>
        <!-- braço esquerdo -->
        <line  class="acdc-s7"  pathLength="100" x1="420" y1="100" x2="420" y2="225"/>
        <!-- braço direito -->
        <line  class="acdc-s8"  pathLength="100" x1="600" y1="100" x2="600" y2="225"/>

        <!-- 9-10. Luminária de chão (esquerda) -->
        <line  class="acdc-s9"  pathLength="100" x1="130" y1="225" x2="130" y2="80"/>
        <!-- cúpula como arco -->
        <path  class="acdc-s10" pathLength="100"
               d="M105,80 Q130,55 155,80 L148,112 L112,112 Z"/>

      </svg>
      <div class="acdc-progress"></div>
    </div>
  `;

  function ensureInDom() {
    if (!document.getElementById('acdc-transition') && document.body) {
      document.body.appendChild(overlay);
      // impede scroll enquanto o overlay estiver visível
      document.body.style.overflow = 'hidden';
    }
  }

  function hideTransition() {
    var el = document.getElementById('acdc-transition');
    if (!el) return;
    el.classList.add('hide');
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
      document.body.style.overflow = '';
      sessionStorage.setItem('acdc_intro_played', 'true');
    }, 520); // aguarda o fade-out (.5s) + margem
  }

  function init() {
    ensureInDom();
    // 1550ms: garante que o último traço (delay 0.85s + dur 0.55s = 1.40s) termina
    setTimeout(hideTransition, 1550);
  }

  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

})();

/* =========================================================================
   MÓDULO: CALCULADORA DE ROLOS E PAINÉIS
   ========================================================================= */

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
    #wpc-wrap{display:none!important;width:100%!important;max-width:none!important;margin:16px 0!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif!important;opacity:0;transform:translateY(8px);transition:opacity .45s ease,transform .45s ease}
    #wpc-wrap.wpc-in{opacity:1!important;transform:translateY(0)!important}
    .wpc-trigger{width:100%!important;min-height:54px!important;display:flex!important;align-items:stretch!important;gap:0!important;background:#fff!important;border:1px solid #1a1a1a!important;border-radius:0!important;padding:0!important;cursor:pointer!important;text-align:left!important;overflow:hidden!important;box-shadow:none!important;transition:border-color .2s ease!important}
    .wpc-trigger:hover{background:#fff!important;border-color:#c9a84c!important;box-shadow:none!important;transform:none!important}
    .wpc-trigger:active{transform:none!important}
    .wpc-trigger .wpc-badge{flex-shrink:0!important;width:54px!important;height:54px!important;border-radius:0!important;background:#fff!important;border-right:1px solid #e2e2e2!important;display:flex!important;align-items:center!important;justify-content:center!important;color:#1a1a1a!important}
    .wpc-trigger .wpc-badge svg{width:19px!important;height:19px!important}
    .wpc-trigger .wpc-badge--painel{background:#fff!important;color:#1a1a1a!important}
    .wpc-badge{flex-shrink:0!important;width:40px!important;height:40px!important;border-radius:0!important;background:#f0f0f0!important;display:flex!important;align-items:center!important;justify-content:center!important;color:#1a1a1a!important}
    .wpc-badge svg{width:21px!important;height:21px!important}
    .wpc-badge--painel{background:#1a1a1a!important;color:#fff!important}
    .wpc-trigger-text{flex:1!important;min-width:0!important;display:flex!important;align-items:center!important;padding:0 16px!important}
    .wpc-trigger-text strong{display:block!important;font-size:11px!important;font-weight:600!important;color:#1a1a1a!important;letter-spacing:.16em!important;text-transform:uppercase!important}
    .wpc-trigger-text small,.wpc-trigger .wpc-mode-chip{display:none!important}
    .wpc-mode-chip{display:inline-flex!important;align-items:center!important;padding:2px 8px!important;border-radius:0!important;font-size:10px!important;font-weight:700!important;letter-spacing:.04em!important;text-transform:uppercase!important;margin-top:5px!important}
    .wpc-mode-chip--rolo{background:#f0f0f0!important;color:#555!important}
    .wpc-mode-chip--painel{background:#1a1a1a!important;color:#fff!important}
    .wpc-trigger-action{flex:0 0 112px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:#1a1a1a!important;color:#fff!important;font-size:9.5px!important;font-weight:600!important;letter-spacing:.18em!important;text-transform:uppercase!important;transition:background .2s ease,color .2s ease!important}
    .wpc-trigger:hover .wpc-trigger-action{background:#c9a84c!important;color:#1a1a1a!important}
    @media(max-width:480px){.wpc-trigger-action{flex-basis:88px!important}.wpc-trigger-text{padding:0 12px!important}.wpc-trigger-text strong{font-size:10px!important;letter-spacing:.1em!important}}
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
      <span class="wpc-trigger-action">Abrir</span>
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

/* =========================================================================
   MÓDULO: VOLTAR AO TOPO
   ========================================================================= */

(function() {
  if (window.__ACDC_BACK_TO_TOP__) return;
  window.__ACDC_BACK_TO_TOP__ = true;

  function initBackToTop() {
  // Injeta o CSS
  const style = document.createElement('style');
  style.textContent = `
    .btt-container {
      position: fixed;
      bottom: 96px;
      right: 22px;
      z-index: 9999;
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.8);
      padding: 0;
      margin: 0;
      border: none;
      background: transparent;
      border-radius: 50%;
      transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.3s ease;
    }

    .btt-container.is-visible {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    .btt-container:hover {
      transform: translateY(-5px);
    }

    .btt-progress-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .btt-progress-circle {
      fill: rgba(0, 0, 0, 0.8);
      stroke: #25d366;
      stroke-width: 4;
      transition: stroke-dashoffset 0.1s linear;
    }

    .btt-icon {
      position: relative;
      z-index: 2;
      width: 20px;
      height: 20px;
      fill: none;
      stroke: #ffffff;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke 0.3s;
    }
  `;
  document.head.appendChild(style);

  // Cria o botão
  const btt = document.createElement('button');
  btt.type = 'button';
  btt.className = 'btt-container';
  btt.id = 'back-to-top';
  btt.title = 'Voltar ao Topo';
  btt.setAttribute('aria-label', 'Voltar ao topo');
  btt.innerHTML = `
    <svg class="btt-progress-svg" viewBox="0 0 50 50">
      <circle class="btt-progress-circle" cx="25" cy="25" r="23"></circle>
    </svg>
    <svg class="btt-icon" viewBox="0 0 24 24">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  document.body.appendChild(btt);

  const circle = btt.querySelector('.btt-progress-circle');
  const totalLength = 2 * Math.PI * circle.r.baseVal.value;
  circle.style.strokeDasharray = totalLength;
  circle.style.strokeDashoffset = totalLength;

  let ticking = false;

  function updateScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    btt.classList.toggle('is-visible', scrollTop > 300);

    if (docHeight > 0) {
      const progress = scrollTop / docHeight;
      circle.style.strokeDashoffset = totalLength - (progress * totalLength);
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  }

  if (document.body) {
    initBackToTop();
  } else {
    document.addEventListener('DOMContentLoaded', initBackToTop);
  }
})();

/* =========================================================================
   MÓDULO: PRODUTOS SOB CONSULTA
   ========================================================================= */

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

    const avisoDisponibilidade = d.getElementById('acdc-aviso-disponibilidade');
    if (avisoDisponibilidade) avisoDisponibilidade.remove();

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
  if (d.body) {
    obs.observe(d.body, { childList: true, subtree: true });
  } else {
    d.addEventListener('DOMContentLoaded', () => {
      obs.observe(d.body, { childList: true, subtree: true });
    });
  }
})();

/* =========================================================================
   MÓDULO: WHATSAPP
   ========================================================================= */

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
