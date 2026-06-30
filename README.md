# Widgets ACDC

Repositório de widgets da ACDC Casa.

## Galeria ACDC automática

Pasta: `galeria-acdc/`

Arquivos principais:

- `galeria-acdc/widget-galeria-acdc.html` — código para colar no widget HTML do site.
- `galeria-acdc/fotos.txt` — lista simples de fotos. Cole um link por linha.
- `galeria-acdc/admin-colar-links.html` — tela auxiliar para colar links, pré-visualizar e copiar a lista pronta.

### Como atualizar as fotos

1. Abra `galeria-acdc/fotos.txt`.
2. Clique no lápis para editar.
3. Cole um link de foto por linha.
4. Clique em **Commit changes**.

Formato aceito:

```txt
https://link-da-foto.jpg
https://link-da-foto.jpg | Descrição da foto
```

O widget lê o `fotos.txt` automaticamente, então você não precisa editar o HTML foto por foto.
