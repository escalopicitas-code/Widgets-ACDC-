/* =========================================================================
   ACDC CASA — PÁGINA DE PRODUTO (arquivo único)
   v1.0

   Substitui e unifica:
     • acdc-payments.js
     • acdc-shipping-calculator.js
     • consultar-disponibilidade.js
     • formatação da descrição do produto

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

/* ══ 8. AVISO DE DISPONIBILIDADE ════════════════════════════════════════ */
#${CFG.idAviso}{
  display:flex; align-items:center; gap:12px;
  width:100%; box-sizing:border-box;
  margin:14px 0 0 0; padding:11px 14px;
  border:1px solid var(--acdc-linha); border-left:2px solid var(--acdc-ouro);
  background:var(--acdc-fundo-2); color:var(--acdc-tinta);
  font-family:var(--acdc-fonte); line-height:1.4;
}
#${CFG.idAviso} .acdc-aviso-icone{
  display:flex; flex:0 0 16px; align-items:center; justify-content:center;
  width:16px; height:16px; border:1px solid var(--acdc-ouro);
  color:var(--acdc-ouro); font-size:10px; font-weight:700; line-height:1;
}
#${CFG.idAviso} .acdc-aviso-texto{
  flex:1 1 auto; min-width:0; font-size:11.5px; color:var(--acdc-texto);
  letter-spacing:.01em;
}
#${CFG.idAviso} a{
  flex:0 0 auto; white-space:nowrap; color:var(--acdc-tinta);
  font-size:9.5px; font-weight:600; letter-spacing:.18em;
  text-decoration:none; text-transform:uppercase;
  border-bottom:1px solid var(--acdc-tinta); padding-bottom:2px;
  transition:color .2s ease,border-color .2s ease;
}
#${CFG.idAviso} a:hover{ color:var(--acdc-ouro); border-color:var(--acdc-ouro); }

/* ══ 9. DESCRIÇÃO — ficha técnica ═══════════════════════════════════════ */
[data-store^="product-description"] h6,
.acdc-desc-titulo{
  font-size:10px !important; font-weight:600 !important;
  letter-spacing:.2em !important; text-transform:uppercase !important;
  color:var(--acdc-fraco) !important; margin:0 0 18px 0 !important;
}
.acdc-specs{ border-top:1px solid var(--acdc-linha); margin-bottom:22px; }
.acdc-spec{
  display:grid; grid-template-columns:112px 1fr; gap:0 28px;
  padding:15px 0; border-bottom:1px solid var(--acdc-linha);
}
.acdc-spec-label{
  font-size:9px; font-weight:600; letter-spacing:.18em; text-transform:uppercase;
  color:var(--acdc-fraco); padding-top:4px;
}
.acdc-spec-valor{
  font-size:13.5px; line-height:1.7; color:var(--acdc-texto);
  font-weight:400; letter-spacing:.01em;
}
.acdc-spec-valor strong{ font-weight:500; color:var(--acdc-tinta); }
.acdc-medidas{ display:flex; flex-wrap:wrap; gap:14px 0; }
.acdc-medida{
  display:flex; flex-direction:column; gap:5px;
  padding:0 22px; border-left:1px solid var(--acdc-linha);
}
.acdc-medida:first-child{ padding-left:0; border-left:none; }
.acdc-medida i{
  font-style:normal; font-size:8.5px; font-weight:600;
  letter-spacing:.18em; text-transform:uppercase; color:var(--acdc-fraco);
}
.acdc-medida b{ font-weight:400; font-size:15px; color:var(--acdc-tinta); letter-spacing:.02em; }
.acdc-nota{
  border-left:2px solid var(--acdc-ouro); padding:2px 0 2px 14px;
  font-size:12px; line-height:1.6; color:var(--acdc-suave);
  margin:0 0 20px 0; letter-spacing:.01em;
}
.acdc-nota strong{ color:var(--acdc-tinta); font-weight:500; }
.acdc-desc-livre{ font-size:13.5px; line-height:1.75; color:var(--acdc-texto); margin:0 0 14px 0; }

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
  #single-product h1,.product-name{ font-size:1.3rem !important; letter-spacing:.02em !important; }
  .acdc-spec{ grid-template-columns:1fr; gap:7px; padding:14px 0; }
  .acdc-spec-label{ padding-top:0; }
  .acdc-medida{ padding:0 16px; }
  #${CFG.idAviso}{ flex-wrap:wrap; padding:10px 12px; gap:9px; }
  #${CFG.idAviso} .acdc-aviso-texto{ font-size:11px; flex:1 1 100%; order:2; }
  #${CFG.idAviso} a{ order:3; margin-left:auto; }
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

  /* -------------------------------------------------- 2. FICHA DA DESCRIÇÃO */
  function formatarMedidas(html) {
    var texto = html.replace(/<[^>]*>/g, '').trim();
    if (texto.indexOf('|') === -1) return null;

    var partes = texto.split('|');
    var unidade = '';
    var m = texto.match(/(cm|mm|m)\s*$/i);
    if (m) unidade = m[1];

    var itens = [];
    for (var i = 0; i < partes.length; i++) {
      var p = partes[i].trim();
      var idx = p.indexOf(':');
      if (idx === -1) return null;
      var label = p.slice(0, idx).trim();
      var valor = p.slice(idx + 1).trim();
      if (unidade && valor.toLowerCase().indexOf(unidade.toLowerCase()) === -1) {
        valor += ' ' + unidade;
      }
      itens.push('<span class="acdc-medida"><i>' + label + '</i><b>' + valor + '</b></span>');
    }
    return '<div class="acdc-medidas">' + itens.join('') + '</div>';
  }

  function formatarDescricao() {
    var box = document.querySelector('[data-store^="product-description"] .user-content')
      || document.querySelector('.user-content');
    if (!box || box.getAttribute('data-acdc') === 'ok') return;

    var filhos = box.children;
    var ps = [];
    for (var i = 0; i < filhos.length; i++) {
      if (filhos[i].tagName === 'P') ps.push(filhos[i]);
    }
    if (!ps.length) return;

    var specs = [];
    var notas = [];
    var livres = [];

    for (var j = 0; j < ps.length; j++) {
      var p = ps[j];
      var forte = p.querySelector('strong, b');

      if (!forte) {
        var txt = p.textContent.trim();
        if (txt) livres.push(p.innerHTML);
        continue;
      }

      var label = forte.textContent.replace(/[:\s]+$/, '').trim();
      var clone = p.cloneNode(true);
      var cf = clone.querySelector('strong, b');
      if (cf) cf.parentNode.removeChild(cf);
      var valor = clone.innerHTML.replace(/^(\s|&nbsp;|:|–|-)+/, '').trim();

      // Label sozinho no parágrafo: o valor está nos parágrafos seguintes
      if (!valor) {
        var acumulado = [];
        while (j + 1 < ps.length && !ps[j + 1].querySelector('strong, b')) {
          acumulado.push(ps[j + 1].innerHTML.trim());
          j++;
        }
        valor = acumulado.join('<br>');
      }
      if (!valor) continue;

      var chaveNota = normalizar(label);
      if (chaveNota === 'obs' || chaveNota === 'observacao' || chaveNota === 'observacoes') {
        notas.push(valor);
        continue;
      }

      var medidas = formatarMedidas(valor);
      specs.push({ label: label, valor: medidas || valor });
    }

    if (!specs.length && !notas.length) return;

    var html = '';
    if (livres.length) {
      for (var l = 0; l < livres.length; l++) {
        html += '<p class="acdc-desc-livre">' + livres[l] + '</p>';
      }
    }
    if (specs.length) {
      html += '<div class="acdc-specs">';
      for (var s = 0; s < specs.length; s++) {
        html += '<div class="acdc-spec">' +
          '<span class="acdc-spec-label">' + specs[s].label + '</span>' +
          '<div class="acdc-spec-valor">' + specs[s].valor + '</div>' +
          '</div>';
      }
      html += '</div>';
    }
    for (var n = 0; n < notas.length; n++) {
      html += '<p class="acdc-nota">' + notas[n] + '</p>';
    }

    box.innerHTML = html;
    box.setAttribute('data-acdc', 'ok');
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
    formatarDescricao();
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
