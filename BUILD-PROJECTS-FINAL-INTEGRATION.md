# Projetos finais da Home — integração

Base: `6ef131bdcc762f31ffd3f778c3bc4da01e8449a7`.
Branch: `feature/service-landing-page-pilot`.

## Projetos e arquivos

| Ordem | Nome público | Categoria | Asset original → arquivo integrado | Demo |
| --- | --- | --- | --- | --- |
| 01 | Atelier Forma | Arquitetura & Interiores | 1000037625.png → assets/project-atelier-forma.jpg | https://avero-concept-interiores-2aa2eqdc4-john-e7bd.vercel.app/ |
| 02 | Estúdio Lume | Arquitetura autoral | 1000037626.png → assets/project-estudio-lume.jpg | https://avero-arquitetura-conceitual-n9s8plznc-john-e7bd.vercel.app/ |
| 03 | Essentia Odonto | Saúde & Odontologia | 1000037624.png → assets/project-essentia-odonto.jpg | https://essentia-odonto-demo.vercel.app/ |

Todos usam “Projeto conceitual AVERO”, com o ano existente preservado.
Os três uploads têm conteúdo JPEG, apesar do nome .png. As cópias .jpg
preservam os bytes recebidos, sem recompressão, edição ou recriação.
Dimensões: 1536 × 1152, iguais às imagens anteriores.

## Integração e preservação

- `index.html`: somente nomes, categorias, status, src/alt, IDs acessíveis,
  rótulos de paginação e destinos dos três CTAs da seção Projetos.
- Links com `target="_blank"`, `rel="noopener noreferrer"` e aria-label
  informando abertura em nova aba. O CTA visual existente foi preservado.
- Removido `data-project` desses três links para que abrir a demo não selecione
  interesse nem preencha o formulário da Home. Nenhuma mudança em JavaScript.
- Estrutura, classes, geometria dos slots, object-fit/object-position, recortes,
  animação, navegação, responsividade e CSS existentes preservados.
- Originais provisórios mantidos no repositório, sem uso na lista de Projetos.
- Nenhuma alteração da Home fora de Projetos ou das páginas internas.
- Alteração local preexistente em assets/COLECAO-AVERO-03-HOTELARIA.png
  preservada e excluída desta integração/commit.

## Observação de identidade

O segundo asset enviado contém “Casa Lume” dentro do mockup. Foi integrado sem
modificações, com nome público “Estúdio Lume” no HTML e link informado pelo
usuário. Essa diferença está na imagem fornecida; não houve ajuste de layout
nem tentativa de corrigir ou recriar o arquivo.

## QA

- `node --check script.js` e `git diff --check`: passaram.
- Comparação estática: HTML fora de Projetos idêntico; CSS/JS sem diff.
- Bytes dos três assets conferidos com os uploads.
- QA de navegador, responsividade e abertura das demos: em andamento no preview.

Sem merge, alteração da main ou promoção para produção.
