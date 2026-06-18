(function() {
  if (window.__wallpaperCalcInit) return;
  window.__wallpaperCalcInit = true;

  const d = document;
  const url = window.location.href.toLowerCase();
  const WHATSAPP_NUM = "5541991668814";
  const ROLL_ICON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="14" height="12" rx="2"></rect><path d="M17 9a4 4 0 0 1 4 4v5"></path></svg>';
  const MAX_ICONS = 12;

  if (!(url.includes('papeis-de-parede') || url.includes('papel-de-parede') || url.includes('wallpaper'))) return;

  // Injeta CSS
  const style = d.createElement('style');
  style.textContent = `
    #wpc-trigger-wrap{display:none !important;max-width:380px !important;margin:18px 0 !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important;opacity:0;transform:translateY(10px);transition:opacity .5s ease, transform .5s ease}
    #wpc-trigger-wrap.wpc-in{opacity:1 !important;transform:translateY(0) !important}
    .wpc-trigger{width:100% !important;display:flex !important;align-items:center !important;gap:12px !important;background:#ffffff !important;border:1.5px solid #1a1a1a !important;border-radius:12px !important;padding:12px 14px !important;cursor:pointer !important;text-align:left !important;transition:background .2s ease, transform .15s ease, box-shadow .2s ease !important}
    .wpc-trigger:hover{background:#f5f5f5 !important;box-shadow:0 4px 14px rgba(0,0,0,0.12) !important;transform:translateY(-1px) !important}
    .wpc-trigger:active{transform:translateY(0) !important}
    .wpc-icon-badge{flex-shrink:0 !important;width:38px !important;height:38px !important;border-radius:10px !important;background:#f0f0f0 !important;display:flex !important;align-items:center !important;justify-content:center !important}
    .wpc-icon-badge svg{width:20px !important;height:20px !important;stroke:#1a1a1a !important}
    .wpc-trigger-text{flex:1 !important;min-width:0 !important;display:flex !important;flex-direction:column !important;gap:2px !important}
    .wpc-trigger-text strong{font-size:13.5px !important;font-weight:800 !important;color:#1a1a1a !important;letter-spacing:-.01em !important}
    .wpc-trigger-text small{font-size:11px !important;color:#777777 !important;font-weight:500 !important;line-height:1.3 !important}
    .wpc-trigger-arrow{flex-shrink:0 !important;width:18px !important;height:18px !important;stroke:#1a1a1a !important;transition:transform .25s ease !important}
    .wpc-trigger:hover .wpc-trigger-arrow{transform:translateX(3px) !important}
    #wpc-modal-overlay{position:fixed !important;inset:0 !important;background:rgba(0,0,0,0.55) !important;z-index:99999 !important;display:none;align-items:center !important;justify-content:center !important;padding:20px !important;opacity:0;transition:opacity .3s ease !important}
    #wpc-modal-overlay.wpc-open{display:flex !important;opacity:1 !important}
    .wpc-modal-panel{position:relative !important;background:#ffffff !important;border-radius:14px !important;max-width:380px !important;width:100% !important;max-height:90vh !important;overflow-y:auto !important;box-shadow:0 24px 70px rgba(0,0,0,0.3) !important;transform:scale(.94) translateY(10px) !important;transition:transform .35s cubic-bezier(.22,.61,.36,1) !important}
    #wpc-modal-overlay.wpc-open .wpc-modal-panel{transform:scale(1) translateY(0) !important}
    .wpc-modal-panel *{box-sizing:border-box !important}
    .wpc-modal-close{position:absolute !important;top:12px !important;right:12px !important;width:30px !important;height:30px !important;border-radius:50% !important;border:none !important;background:#f0f0f0 !important;color:#1a1a1a !important;font-size:19px !important;line-height:1 !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;z-index:2 !important;transition:background .2s ease !important}
    .wpc-modal-close:hover{background:#e0e0e0 !important}
    .wpc-swatch{height:7px !important;width:100% !important;background:repeating-linear-gradient(-45deg,#1a1a1a 0 6px,#4a4a4a 6px 12px) !important}
    .wpc-body{padding:18px 20px 20px !important}
    .wpc-header{display:flex !important;align-items:center !important;gap:12px !important;margin-bottom:16px !important}
    .wpc-header h2{margin:0 !important;font-size:15px !important;font-weight:800 !important;color:#1a1a1a !important;letter-spacing:-.01em !important}
    .wpc-header p{margin:2px 0 0 0 !important;font-size:11.5px !important;color:#888888 !important;line-height:1.3 !important}
    .wpc-row{display:flex !important;gap:10px !important;margin-bottom:14px !important}
    .wpc-field{flex:1 !important;min-width:0 !important}
    .wpc-field label{display:block !important;margin:0 0 6px 0 !important;font-size:10.5px !important;font-weight:700 !important;color:#888888 !important;text-transform:uppercase !important;letter-spacing:.04em !important}
    .wpc-stepper{display:flex !important;align-items:stretch !important;border:1.5px solid #dddddd !important;border-radius:9px !important;overflow:hidden !important;background:#fff !important;transition:border-color .2s !important}
    .wpc-stepper:focus-within{border-color:#1a1a1a !important;box-shadow:0 0 0 3px rgba(0,0,0,0.1) !important}
    .wpc-stepper button{width:30px !important;flex-shrink:0 !important;border:none !important;background:#f5f5f5 !important;color:#1a1a1a !important;font-size:16px !important;font-weight:700 !important;cursor:pointer !important;line-height:1 !important;padding:0 !important;transition:background .15s !important}
    .wpc-stepper button:hover{background:#ececec !important}
    .wpc-stepper button:active{background:#e0e0e0 !important}
    .wpc-stepper input{width:100% !important;border:none !important;outline:none !important;text-align:center !important;font-size:13.5px !important;font-weight:700 !important;color:#222222 !important;padding:6px 2px !important;background:#fff !important}
    .wpc-stepper input::-webkit-outer-spin-button,.wpc-stepper input::-webkit-inner-spin-button{-webkit-appearance:none !important;margin:0 !important}
    .wpc-unit-wrap{position:relative !important}
    .wpc-unit-wrap input{width:100% !important;border:1.5px solid #dddddd !important;border-radius:9px !important;padding:8px 26px 8px 10px !important;font-size:13.5px !important;font-weight:700 !important;color:#222222 !important;outline:none !important;transition:border-color .2s,box-shadow .2s !important}
    .wpc-unit-wrap input:focus{border-color:#1a1a1a !important;box-shadow:0 0 0 3px rgba(0,0,0,0.1) !important}
    .wpc-unit-wrap input::placeholder{color:#aaaaaa !important;font-weight:600 !important}
    .wpc-unit-suffix{position:absolute !important;right:10px !important;top:50% !important;transform:translateY(-50%) !important;font-size:11.5px !important;color:#999999 !important;font-weight:700 !important;pointer-events:none !important}
    .wpc-hint{margin:-4px 0 14px 0 !important;font-size:10.5px !important;color:#999999 !important;font-style:italic !important;line-height:1.3 !important}
    .wpc-segment{position:relative !important;display:flex !important;background:#f0f0f0 !important;border-radius:9px !important;padding:3px !important;height:38px !important}
    .wpc-segment input{position:absolute !important;opacity:0 !important;width:1px !important;height:1px !important;pointer-events:none !important}
    .wpc-segment-highlight{position:absolute !important;top:3px !important;left:3px !important;bottom:3px !important;width:calc(33.333% - 4px) !important;background:#1a1a1a !important;border-radius:7px !important;transition:transform .35s cubic-bezier(.22,.61,.36,1) !important;z-index:0 !important;box-shadow:0 2px 6px rgba(0,0,0,0.22) !important}
    .wpc-seg-1:checked ~ .wpc-segment-highlight{transform:translateX(0%) !important}
    .wpc-seg-2:checked ~ .wpc-segment-highlight{transform:translateX(100%) !important}
    .wpc-seg-3:checked ~ .wpc-segment-highlight{transform:translateX(200%) !important}
    .wpc-segment label{position:relative !important;z-index:1 !important;flex:1 !important;display:flex !important;align-items:center !important;justify-content:center !important;font-size:11px !important;font-weight:700 !important;color:#888888 !important;cursor:pointer !important;border-radius:7px !important;transition:color .3s !important;text-align:center !important;padding:0 2px !important}
    .wpc-seg-1:checked + label,.wpc-seg-2:checked + label,.wpc-seg-3:checked + label{color:#ffffff !important}
    .wpc-segment input:focus-visible + label{outline:2px solid #1a1a1a !important;outline-offset:2px !important}
    .wpc-result{max-height:0 !important;overflow:hidden !important;opacity:0 !important;transition:max-height .45s ease, opacity .4s ease, margin-top .45s ease !important;margin-top:0 !important}
    .wpc-result.wpc-show{max-height:420px !important;opacity:1 !important;margin-top:4px !important}
    .wpc-result-inner{background:#f7f7f7 !important;border:1px solid #e5e5e5 !important;border-radius:11px !important;padding:14px 14px 12px !important}
    .wpc-stats{display:flex !important;align-items:center !important;justify-content:space-between !important;gap:10px !important}
    .wpc-stat-label{margin:0 !important;font-size:10px !important;letter-spacing:.05em !important;text-transform:uppercase !important;color:#777777 !important;font-weight:700 !important}
    .wpc-area-val{margin:3px 0 0 0 !important;font-size:15px !important;font-weight:800 !important;color:#222222 !important}
    .wpc-rolls-block{text-align:right !important;border-left:1px solid #e0e0e0 !important;padding-left:14px !important}
    .wpc-rolls-val{margin:1px 0 0 0 !important;font-size:24px !important;font-weight:900 !important;color:#1a1a1a !important;letter-spacing:-.02em !important}
    .wpc-rolls-vis{display:flex !important;flex-wrap:wrap !important;gap:5px !important;margin-top:11px !important;min-height:22px !important}
    .wpc-roll-ico{display:inline-flex !important;align-items:center !important;justify-content:center !important;width:20px !important;height:20px !important;opacity:0;transform:scale(.3);animation:wpcPop .38s cubic-bezier(.34,1.56,.64,1) forwards}
    .wpc-roll-ico svg{width:100% !important;height:100% !important}
    @keyframes wpcPop{to{opacity:1;transform:scale(1)}}
    .wpc-roll-more{display:inline-flex !important;align-items:center !important;justify-content:center !important;height:20px !important;padding:0 6px !important;background:#1a1a1a !important;color:#fff !important;font-size:10px !important;font-weight:800 !important;border-radius:6px !important;opacity:0;transform:scale(.3);animation:wpcPop .38s cubic-bezier(.34,1.56,.64,1) forwards}
    .wpc-whats-btn{display:flex !important;align-items:center !important;justify-content:center !important;gap:7px !important;width:100% !important;margin-top:13px !important;background:#1a1a1a !important;color:#ffffff !important;border:none !important;border-radius:8px !important;padding:10px !important;font-size:12.5px !important;font-weight:700 !important;cursor:pointer !important;transition:transform .15s ease, box-shadow .15s ease, filter .15s ease !important}
    .wpc-whats-btn svg{width:15px !important;height:15px !important;flex-shrink:0 !important}
    .wpc-whats-btn:hover{transform:translateY(-2px) !important;box-shadow:0 6px 16px rgba(0,0,0,0.25) !important;filter:brightness(1.5) !important}
    .wpc-whats-btn:active{transform:translateY(0) !important}
    @media (prefers-reduced-motion: reduce){#wpc-trigger-wrap,#wpc-modal-overlay,.wpc-modal-panel,.wpc-roll-ico,.wpc-roll-more,.wpc-segment-highlight,.wpc-result{transition:none !important;animation:none !important}}
  `;
  d.head.appendChild(style);

  // Cria o HTML
  const triggerWrap = d.createElement('div');
  triggerWrap.id = 'wpc-trigger-wrap';
  triggerWrap.innerHTML = `
    <button type="button" class="wpc-trigger" id="wpc-trigger" aria-haspopup="dialog">
      <span class="wpc-icon-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="13" height="6" rx="2"></rect><path d="M9 10v4a3 3 0 0 0 3 3h0"></path><rect x="11" y="17" width="5" height="4" rx="1"></rect></svg>
      </span>
      <span class="wpc-trigger-text">
        <strong>Calculadora de Rolos</strong>
        <small>Toque para saber quantos rolos você precisa</small>
      </span>
      <svg class="wpc-trigger-arrow" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
    </button>
  `;

  const overlay = d.createElement('div');
  overlay.id = 'wpc-modal-overlay';
  overlay.innerHTML = `
    <div class="wpc-modal-panel" role="dialog" aria-modal="true" aria-labelledby="wpc-modal-title">
      <div class="wpc-swatch"></div>
      <button type="button" class="wpc-modal-close" id="wpc-modal-close" aria-label="Fechar calculadora">×</button>
      <div class="wpc-body">
        <div class="wpc-header">
          <span class="wpc-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="13" height="6" rx="2"></rect><path d="M9 10v4a3 3 0 0 0 3 3h0"></path><rect x="11" y="17" width="5" height="4" rx="1"></rect></svg>
          </span>
          <div>
            <h2 id="wpc-modal-title">Calculadora de Rolos</h
