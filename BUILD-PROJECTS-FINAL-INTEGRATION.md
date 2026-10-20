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
- Chrome remoto no preview: 390, 430, 768, 1024, 1280 e 1440px.
  Nenhum overflow horizontal; os slots medidos têm as mesmas dimensões da base.
  As três imagens carregam em 1536 × 1152, sem distorção, com cover e o
  object-position existente (56%/50% no mobile; 50%/46% nas demais larguras).
- Os três projetos foram percorridos, com nomes/categorias/status e assets
  correspondentes. A terceira imagem carrega quando se aproxima do viewport,
  conforme o lazy loading nativo existente; nenhuma imagem quebrada observada.
- Paginação direta, próximo/anterior e teclado funcionaram; foco visível de 2px
  no CTA. Regras de hover e efeitos preservadas sem alteração de CSS.
- Os três CTAs foram clicados: cada demo abriu uma nova aba e a Home permaneceu
  aberta. Nenhum clique de projeto alterou o campo de mensagem ou os interesses
  selecionados no contato.
- Essentia acessível diretamente. Atelier Forma e Estúdio Lume redirecionam
  visitantes sem acesso para autenticação Vercel. Conteúdo conferido com acesso
  temporário autorizado para QA. As URLs originais foram mantidas no HTML, sem
  tokens temporários nem alterações da proteção dessas demos.
- Menu mobile abre e fecha com Escape; navegação interna, Coleção com próximo
  e teclado anterior e seleção de interesse no contato conferidos. Sem envio
  de formulário ou mensagem.
- Console observado sem erros atribuídos ao aplicativo; avisos da extensão do
  navegador diferenciados do site.
- Diff final revisado: index.html restrito à seção Projetos; três novos assets
  e este documento. Nenhuma dependência, CSS ou JS alterado.

## Limitações

Validação em Chrome remoto com viewports equivalentes, sem Safari/iPhone,
aparelhos físicos ou teste de gesto touch nativo. Motion/reduced-motion do
carrossel foi preservado por não haver alteração em CSS/JS. O texto dentro das
imagens fica naturalmente pequeno no mobile; não houve ajuste do layout para
compensar, nem enquadramento individual adicionado.

Sem merge, alteração da main ou promoção para produção.
