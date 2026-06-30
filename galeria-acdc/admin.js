(function () {
  var script = document.currentScript;
  var repo = (script && script.getAttribute('data-repo')) || 'escalopicitas-code/Widgets-ACDC-';
  var path = (script && script.getAttribute('data-path')) || 'galeria-acdc/fotos.txt';
  var branch = (script && script.getAttribute('data-branch')) || 'main';
  var rawUrl = 'https://raw.githubusercontent.com/' + repo + '/' + branch + '/' + path;

  var root = document.createElement('section');
  root.className = 'acdc-gallery-admin-clean';
  if (script && script.parentNode) script.parentNode.insertBefore(root, script);
  else document.body.appendChild(root);

  if (!document.getElementById('acdc-gallery-admin-clean-css')) {
    var style = document.createElement('style');
    style.id = 'acdc-gallery-admin-clean-css';
    style.textContent = `
      .acdc-gallery-admin-clean{max-width:980px;margin:24px auto;padding:28px 18px;background:#fff;color:#111;border:1px solid #e5e5e5;border-radius:18px;font-family:Arial,sans-serif}
      .acdc-gallery-admin-clean *{box-sizing:border-box}
      .acdc-gallery-admin-clean h2{margin:0 0 8px;font-size:clamp(26px,4vw,42px);line-height:1.05;text-transform:uppercase;letter-spacing:-.03em}
      .acdc-gallery-admin-clean p{color:#666;line-height:1.55}
      .acdc-gallery-admin-clean label{display:block;margin:18px 0 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
      .acdc-gallery-admin-clean textarea,.acdc-gallery-admin-clean input{width:100%;border:1px solid #dcdcdc;border-radius:12px;padding:14px;font:15px/1.45 Arial,sans-serif;background:#fff;color:#111}
      .acdc-gallery-admin-clean textarea{min-height:320px;resize:vertical;font-family:Consolas,monospace}
      .acdc-gallery-admin-clean__hint{background:#f7f7f7;border:1px solid #e4e4e4;border-radius:14px;padding:12px;margin:16px 0;color:#444}
      .acdc-gallery-admin-clean__bar{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0}
      .acdc-gallery-admin-clean button{border:1px solid #111;background:#111;color:#fff;border-radius:999px;padding:12px 18px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;cursor:pointer}
      .acdc-gallery-admin-clean button.secondary{background:#fff;color:#111}
      .acdc-gallery-admin-clean__status{min-height:24px;margin:12px 0;font-weight:700}
      .acdc-gallery-admin-clean__status.ok{color:#0b7a34}.acdc-gallery-admin-clean__status.err{color:#b00020}
      .acdc-gallery-admin-clean__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}
      .acdc-gallery-admin-clean__photo{position:relative;aspect-ratio:1/1;background:#eee;border-radius:8px;overflow:hidden}
      .acdc-gallery-admin-clean__photo img{width:100%;height:100%;display:block;object-fit:cover}
      .acdc-gallery-admin-clean__photo span{position:absolute;left:6px;bottom:6px;background:rgba(0,0,0,.68);color:#fff;border-radius:999px;padding:4px 8px;font-size:11px}
      .acdc-gallery-admin-clean code{background:#eee;border-radius:5px;padding:2px 5px}
      .acdc-gallery-admin-clean__small{font-size:12px;color:#777}
      @media(max-width:720px){.acdc-gallery-admin-clean__grid{grid-template-columns:repeat(2,1fr)}}
    `;
    document.head.appendChild(style);
  }

  root.innerHTML = `
    <h2>Atualizar galeria</h2>
    <p>Cole os links das fotos abaixo, confira na prévia e clique em <strong>Salvar galeria</strong>.</p>
    <div class="acdc-gallery-admin-clean__hint">
      <strong>Formato:</strong><br>
      <code>https://site.com/foto.jpg</code><br>
      ou <code>https://site.com/foto.jpg | Descrição da foto</code>
    </div>
    <label>Token do GitHub</label>
    <input class="acdc-gallery-admin-clean__token" type="password" placeholder="Cole aqui o token do GitHub">
    <label style="text-transform:none;letter-spacing:0;font-weight:400;font-size:13px"><input class="acdc-gallery-admin-clean__remember" type="checkbox" style="width:auto"> Lembrar token neste navegador</label>
    <p class="acdc-gallery-admin-clean__small">O token é necessário para salvar automaticamente no GitHub. Não coloque este painel em uma página pública sem proteção.</p>
    <label>Links das fotos</label>
    <textarea class="acdc-gallery-admin-clean__links" placeholder="Cole aqui os links das fotos, um por linha"></textarea>
    <div class="acdc-gallery-admin-clean__bar">
      <button type="button" class="acdc-gallery-admin-clean__load secondary">Carregar atuais</button>
      <button type="button" class="acdc-gallery-admin-clean__clean secondary">Organizar links</button>
      <button type="button" class="acdc-gallery-admin-clean__preview secondary">Pré-visualizar</button>
      <button type="button" class="acdc-gallery-admin-clean__save">Salvar galeria</button>
    </div>
    <p class="acdc-gallery-admin-clean__status"></p>
    <div class="acdc-gallery-admin-clean__grid"></div>
  `;

  var tokenInput = root.querySelector('.acdc-gallery-admin-clean__token');
  var rememberInput = root.querySelector('.acdc-gallery-admin-clean__remember');
  var linksInput = root.querySelector('.acdc-gallery-admin-clean__links');
  var statusBox = root.querySelector('.acdc-gallery-admin-clean__status');
  var grid = root.querySelector('.acdc-gallery-admin-clean__grid');

  var savedToken = localStorage.getItem('acdc_gallery_github_token') || '';
  if (savedToken) {
    tokenInput.value = savedToken;
    rememberInput.checked = true;
  }

  function setStatus(message, type) {
    statusBox.textContent = message || '';
    statusBox.className = 'acdc-gallery-admin-clean__status ' + (type || '');
  }

  function extractLinks(text) {
    var list = [];
    String(text || '').split(/\n+/).map(function (line) { return line.trim(); }).filter(Boolean).forEach(function (line) {
      if (line.indexOf('|') > -1) {
        var first = line.split('|')[0].trim();
        if (/^https?:\/\//i.test(first)) list.push(line);
        return;
      }
      var urls = line.match(/https?:\/\/[^\s"'<>]+/gi);
      if (urls) urls.forEach(function (url) { list.push(url.replace(/[),.;]+$/, '')); });
    });
    return Array.from(new Set(list));
  }

  function fileContent() {
    return '# Galeria ACDC Casa\n# Cole um link por linha. Opcional: link | descrição\n\n' + extractLinks(linksInput.value).join('\n') + '\n';
  }

  function toBase64(text) {
    return btoa(unescape(encodeURIComponent(text)));
  }

  function fromBase64(text) {
    return decodeURIComponent(escape(atob(String(text || '').replace(/\n/g, ''))));
  }

  function githubHeaders() {
    var token = tokenInput.value.trim();
    return {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + token,
      'X-GitHub-Api-Version': '2022-11-28'
    };
  }

  function apiReadUrl() {
    return 'https://api.github.com/repos/' + repo + '/contents/' + path + '?ref=' + branch;
  }

  function apiWriteUrl() {
    return 'https://api.github.com/repos/' + repo + '/contents/' + path;
  }

  function requireToken() {
    if (!tokenInput.value.trim()) throw new Error('Cole o token do GitHub antes de salvar ou carregar.');
  }

  function preview() {
    var list = extractLinks(linksInput.value);
    grid.innerHTML = '';
    list.forEach(function (line, index) {
      var url = line.split('|')[0].trim();
      var item = document.createElement('div');
      item.className = 'acdc-gallery-admin-clean__photo';
      var img = document.createElement('img');
      img.src = url;
      img.alt = '';
      var number = document.createElement('span');
      number.textContent = index + 1;
      item.appendChild(img);
      item.appendChild(number);
      grid.appendChild(item);
    });
    setStatus(list.length ? list.length + ' foto(s) pronta(s).' : 'Cole pelo menos um link.', list.length ? 'ok' : 'err');
  }

  root.querySelector('.acdc-gallery-admin-clean__clean').addEventListener('click', function () {
    linksInput.value = extractLinks(linksInput.value).join('\n');
    preview();
  });

  root.querySelector('.acdc-gallery-admin-clean__preview').addEventListener('click', preview);

  root.querySelector('.acdc-gallery-admin-clean__load').addEventListener('click', function () {
    (async function () {
      requireToken();
      setStatus('Carregando fotos atuais...', '');
      var response = await fetch(apiReadUrl(), { headers: githubHeaders() });
      if (!response.ok) throw new Error('Erro ao carregar fotos atuais: ' + response.status);
      var data = await response.json();
      linksInput.value = fromBase64(data.content).replace(/^#.*$/gm, '').trim();
      setStatus('Fotos atuais carregadas.', 'ok');
      preview();
    })().catch(function (error) { setStatus(error.message, 'err'); });
  });

  root.querySelector('.acdc-gallery-admin-clean__save').addEventListener('click', function () {
    (async function () {
      requireToken();
      var links = extractLinks(linksInput.value);
      if (!links.length) throw new Error('Cole pelo menos um link antes de salvar.');

      if (rememberInput.checked) localStorage.setItem('acdc_gallery_github_token', tokenInput.value.trim());
      else localStorage.removeItem('acdc_gallery_github_token');

      setStatus('Salvando galeria...', '');
      var currentResponse = await fetch(apiReadUrl(), { headers: githubHeaders() });
      if (!currentResponse.ok) throw new Error('Não consegui ler o arquivo atual: ' + currentResponse.status);
      var currentFile = await currentResponse.json();

      var saveResponse = await fetch(apiWriteUrl(), {
        method: 'PUT',
        headers: Object.assign({ 'Content-Type': 'application/json' }, githubHeaders()),
        body: JSON.stringify({
          message: 'Atualiza fotos da galeria ACDC',
          content: toBase64(fileContent()),
          sha: currentFile.sha,
          branch: branch
        })
      });
      var answer = await saveResponse.json();
      if (!saveResponse.ok) throw new Error(answer.message || 'Erro ao salvar no GitHub.');
      setStatus('Galeria salva com sucesso. O site atualiza em instantes.', 'ok');
      preview();
    })().catch(function (error) { setStatus(error.message, 'err'); });
  });
})();
