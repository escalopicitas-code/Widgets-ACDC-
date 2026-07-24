<script>
(function () {
  var AVISO_ID = "acdc-aviso-disponibilidade";
  var ESTILO_ID = "acdc-aviso-disponibilidade-estilo";
  var WHATSAPP = "5541991668814";

  function normalizar(texto) {
    return String(texto || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function paginaDeProdutoSelecionado() {
    var caminho = normalizar(window.location.pathname);
    if (caminho.indexOf("/produtos/") === -1) return false;

    var el =
      document.querySelector("h1") ||
      document.querySelector(".js-product-name") ||
      document.querySelector(".product-name");

    var titulo = normalizar(el ? el.textContent : document.title);

    var papel =
      titulo.indexOf("papel de parede") !== -1 ||
      titulo.indexOf("papeis de parede") !== -1;

    var tapete =
      titulo.indexOf("tapete ") === 0 ||
      titulo === "tapete" ||
      titulo.indexOf("tapetes ") === 0;

    return papel || tapete;
  }

  function encontrarBotaoComprar() {
    var seletores = [
      ".js-addtocart",
      ".js-add-to-cart",
      "button[name='add_to_cart']",
      "form[action*='/cart'] button[type='submit']",
      ".product-buy-container button",
      ".product-actions button"
    ];

    for (var i = 0; i < seletores.length; i++) {
      var el = document.querySelector(seletores[i]);
      if (el) return el;
    }

    var todos = document.querySelectorAll("button, input[type='submit'], a");
    for (var j = 0; j < todos.length; j++) {
      var texto = normalizar(todos[j].textContent || todos[j].value || "");
      if (texto.indexOf("comprar") !== -1 || texto.indexOf("adicionar ao carrinho") !== -1) {
        return todos[j];
      }
    }
    return null;
  }

  function encontrarAncora(botao) {
    var form = botao.closest ? botao.closest("form") : null;
    if (form) return form;

    var pai = botao.parentElement;
    if (pai && pai.parentElement) return pai;
    return botao;
  }

  function criarAviso() {
    var tituloEl = document.querySelector("h1");
    var tituloProduto = tituloEl ? tituloEl.textContent.trim() : "este produto";

    var mensagem =
      "Ola! Gostaria de consultar a disponibilidade em estoque do produto: " +
      tituloProduto + " - " + window.location.href;

    var aviso = document.createElement("div");
    aviso.id = AVISO_ID;
    aviso.setAttribute("role", "note");

    var icone = document.createElement("span");
    icone.className = "acdc-aviso-icone";
    icone.textContent = "!";

    var texto = document.createElement("span");
    texto.className = "acdc-aviso-texto";
    texto.textContent = "Confirme a disponibilidade em estoque antes de finalizar a compra.";

    var link = document.createElement("a");
    link.setAttribute("href", "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagem));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.textContent = "CONSULTAR";

    aviso.appendChild(icone);
    aviso.appendChild(texto);
    aviso.appendChild(link);

    return aviso;
  }

  function adicionarEstilo() {
    if (document.getElementById(ESTILO_ID)) return;

    var css = [
      "#" + AVISO_ID + "{",
      "display:flex;align-items:center;gap:10px;",
      "width:100%;box-sizing:border-box;",
      "margin:10px 0 0 0;padding:8px 12px;",
      "border:1px solid #111;border-radius:0;",
      "background:#FFF;color:#111;",
      "font-family:inherit;line-height:1.35;",
      "box-shadow:none;",
      "}",

      "#" + AVISO_ID + " .acdc-aviso-icone{",
      "display:flex;flex:0 0 16px;align-items:center;justify-content:center;",
      "width:16px;height:16px;border:1px solid #111;border-radius:0;",
      "background:#FFF;color:#111;",
      "font-size:10px;font-weight:700;line-height:1;",
      "}",

      "#" + AVISO_ID + " .acdc-aviso-texto{",
      "flex:1 1 auto;min-width:0;",
      "font-size:11.5px;color:#111;",
      "display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;",
      "overflow:hidden;",
      "}",

      "#" + AVISO_ID + " a{",
      "flex:0 0 auto;white-space:nowrap;",
      "color:#111;font-size:10px;font-weight:700;letter-spacing:.12em;",
      "text-decoration:none;text-transform:uppercase;",
      "border-bottom:1px solid #111;padding-bottom:1px;",
      "transition:opacity .2s ease;",
      "}",

      "#" + AVISO_ID + " a:hover{opacity:.55;}",

      "@media (max-width:768px){",
      "#" + AVISO_ID + "{padding:7px 10px;gap:8px;}",
      "#" + AVISO_ID + " .acdc-aviso-texto{font-size:11px;}",
      "}"
    ].join("");

    var estilo = document.createElement("style");
    estilo.id = ESTILO_ID;
    estilo.appendChild(document.createTextNode(css));
    document.head.appendChild(estilo);
  }

  function instalarAviso() {
    if (!paginaDeProdutoSelecionado()) return;
    if (document.getElementById(AVISO_ID)) return;

    var botao = encontrarBotaoComprar();
    if (!botao) return;

    var ancora = encontrarAncora(botao);
    if (!ancora || !ancora.parentNode) return;

    adicionarEstilo();

    var aviso = criarAviso();
    ancora.parentNode.insertBefore(aviso, ancora.nextSibling);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", instalarAviso);
  } else {
    instalarAviso();
  }

  var observador = new MutationObserver(instalarAviso);
  observador.observe(document.documentElement, { childList: true, subtree: true });

  setTimeout(function () {
    observador.disconnect();
  }, 15000);
})();
</script>
