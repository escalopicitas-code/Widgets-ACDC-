function buildDescription(container) {
    if (container.dataset.acdcReady === 'true') return false;

    var raw = sanitize(container.innerText || container.textContent || '');
    if (!raw) return false;
    container.dataset.acdcReady = 'true';

    var prev = container.previousElementSibling;
    if (prev && prev.tagName.toLowerCase() === 'h6') prev.style.display = 'none';

    /* ════════════════════════════════════════════════════════════
       NOVO: ISOLAR TEXTO ANTES DE "MEDIDAS"
    ════════════════════════════════════════════════════════════ */
    var descGeral = "";
    var specs = raw; // Se não achar "Medidas", processa tudo (comportamento fallback)

    // Procura por "Medidas", "Medida", "Medidas unitárias" (com ou sem dois-pontos)
    var matchMedidas = raw.match(/\b(medidas?(?:\s+unit[aá]rias?)?)\b\s*[:\-]?/i);

    if (matchMedidas) {
      // Tudo ANTES do match vira o texto corrido da descrição
      descGeral = raw.substring(0, matchMedidas.index).trim();
      
      // Remove a palavra "Descrição" solta no início (caso a loja tenha digitado)
      descGeral = descGeral.replace(/^Descri[çc][ãa]o\s*/i, '').trim();
      
      // Tudo a partir de "Medidas" vai para o tokenizador criar os cards
      specs = raw.substring(matchMedidas.index).trim();
    }

    /* ── Tokeniza APENAS a parte das especificações ── */
    var positions = tokenize(specs);

    var dimensions   = [];
    var details      = [];
    var observations = [];

    for (var i = 0; i < positions.length; i++) {
      var label = positions[i].label;
      var valueEnd = i + 1 < positions.length ? positions[i + 1].labelStart : specs.length;
      
      // Extrai o valor e já limpa vírgulas, pontos e também os PIPES (|) do final
      var value = specs.slice(positions[i].valueStart, valueEnd)
                       .replace(/[\s,;.|]+$/, '').trim();
      
      // Limpa os PIPES (|) que podem ter sobrado no começo do valor
      value = value.replace(/^[\s|]+/, '');

      /* remove prefixo "Medidas Unitárias:" (label vazio após strip) */
      label = label.replace(MEDIDAS_STRIP, '').trim();
      if (!label || value === '') continue;

      /* Obs / Nota → observação */
      if (OBS_WORDS.test(label)) { observations.push(value); continue; }

      var isDim = DIM_WORDS.test(label);

      if (isDim) {
        var meas = extractMeasurement(value);
        if (meas) {
          if (meas.rest) observations.push(meas.rest);
          dimensions.push({ label: label, value: addDefaultUnit(label, meas.meas) });
        } else {
          dimensions.push({ label: label, value: addDefaultUnit(label, value) });
        }
      } else {
        var sv = splitValueNote(value);
        if (sv.value) details.push({ label: label, value: sv.value });
        if (sv.note)  observations.push(sv.note);
      }
    }

    /* dedup */
    var dims = dedup(dimensions,   function(d){ return d.label + '||' + d.value; });
    var dets = dedup(details,      function(d){ return d.label + '||' + d.value; });
    var obs  = dedup(observations, function(s){ return s.toLowerCase().slice(0, 60); });

    /* filtra observações muito curtas e lixos como "|" solto */
    obs = obs.filter(function(o){ return o.length > 4 && o !== '|'; });

    /* ── gera HTML ── */
    var html = '<div class="acdc-product-description" role="region" aria-label="Descrição do produto">';

    if (descGeral || dets.length) {
      html += '<div class="acdc-section"><h3>Descrição</h3>';
      
      // Insere o texto geral corrido ANTES das outras linhas de detalhes
      if (descGeral) {
        // Destaca palavras comuns de início, como "Material:"
        var formatado = escapeHtml(descGeral).replace(/^(Material|Composi[çc][ãa]o|Tecido):/i, '<strong>$1:</strong>');
        html += '<p style="font-size:13.5px; color:#666; margin-bottom:16px; line-height:1.6;">' + formatado + '</p>';
      }

      dets.forEach(function(d){
        html += '<div class="acdc-row">'
             +  '<span class="acdc-label">'  + escapeHtml(d.label) + '</span>'
             +  '<span class="acdc-value">'  + escapeHtml(d.value) + '</span>'
             +  '</div>';
      });
      html += '</div>';
    }

    if (dims.length) {
      html += '<div class="acdc-section"><h3>Dimensões</h3><div class="acdc-dimensions">';
      dims.forEach(function(d, i){
        html += '<div class="acdc-dimension" style="transition-delay:' + (i * 55) + 'ms">'
             +  '<div class="acdc-dimension-label">' + escapeHtml(d.label) + '</div>'
             +  '<div class="acdc-dimension-value">' + escapeHtml(d.value) + '</div>'
             +  '</div>';
      });
      html += '</div></div>';
    }

    if (obs.length) {
      html += '<div class="acdc-notes">';
      obs.forEach(function(o){ html += '<p>' + escapeHtml(o) + '</p>'; });
      html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
    animateCards();
    return true;
  }
