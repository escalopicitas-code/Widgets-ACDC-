# Galeria ACDC — versão limpa

Esta pasta agora tem uma estrutura simples:

- `site.js` — script da galeria pública do site.
- `admin.js` — painel completo para colar links, pré-visualizar e salvar no GitHub.
- `fotos.txt` — lista das fotos usadas pela galeria.

## Script da galeria pública

Cole no local onde a galeria deve aparecer:

```html
<script
  src="https://cdn.jsdelivr.net/gh/escalopicitas-code/Widgets-ACDC-@main/galeria-acdc/site.js?v=1"
  data-title="Galeria"
  data-eyebrow="Portfólio completo"
  data-fotos="https://raw.githubusercontent.com/escalopicitas-code/Widgets-ACDC-/main/galeria-acdc/fotos.txt">
</script>
```

## Script do painel de atualização

Cole em uma página protegida/admin:

```html
<script
  src="https://cdn.jsdelivr.net/gh/escalopicitas-code/Widgets-ACDC-@main/galeria-acdc/admin.js?v=1"
  data-repo="escalopicitas-code/Widgets-ACDC-"
  data-path="galeria-acdc/fotos.txt"
  data-branch="main">
</script>
```

## Como atualizar fotos

1. Abra a página onde está o `admin.js`.
2. Cole o token do GitHub.
3. Cole os links das fotos, um por linha.
4. Clique em `Pré-visualizar`.
5. Clique em `Salvar galeria`.

Formato:

```txt
https://site.com/foto.jpg
https://site.com/foto.jpg | Descrição da foto
```
