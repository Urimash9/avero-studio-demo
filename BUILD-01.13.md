# Build 01.13 — refino visual mobile

## Base e escopo

- Repositório: `Urimash9/avero-studio-demo`.
- Branch: `build-01-13-refino-visual-mobile`.
- Base aprovada: `e6d938be45a2821b0ccd70c07a5bc2f36d28ada9` (Build 01.12.5).
- Leitura prévia: `AGENTS.md`, `README.md`, `BUILD-01.11.md`, `BUILD-01.12.5.md` e implementação atual.
- Intervenção limitada às camadas visuais da Hero/Perspectiva, segmento Direção → Criação do Método e olho atmosférico do Footer.
- Header, Posicionamento, Serviços, Projetos, Coleção e CTA/formulário preservados. Copy e semântica preservadas.
- Nenhum merge, promoção para produção ou escrita na main.

## Arquivos

- `assets/avero-nebula-continuous-v1.webp` — novo asset.
- `assets/avero-eye-isolated-v1.webp` — novo asset transparente.
- `styles.css` — overrides isolados por breakpoint, sem alterar regras anteriores.
- `index.html` — apenas dois segmentos dos paths compactos do Método.
- `review/build-01-13.html` — ferramenta auxiliar de comparação por largura/área; não participa da composição da Home.
- `BUILD-01.13.md` — documentação desta rodada.
- `script.js` não foi alterado.

## Assets e validação antes do layout

Os dois PNGs fornecidos foram convertidos em WebP **lossless**, sem geração ou extração de imagens.

| Asset | Dimensões | Modo | Bytes |
| --- | --- | --- | --- |
| Nebulosa contínua | 1536 × 1024 | RGB | 1.206.604 |
| Olho isolado | 1774 × 887 | RGBA | 1.039.894 |

Foi comparada a decodificação dos WebPs com os PNGs: pixels idênticos, incluindo alpha do olho (0–255). Ambos carregaram com HTTP 200 e decodificação válida antes das alterações visuais. A preview também confirmou `complete=true` e dimensões naturais corretas. `assets/avero-eye.png` permaneceu byte a byte igual à base, como referência/fallback desktop.

## Hero mobile

A geometria aprovada ficou intacta: headline, CTAs, container do olho, texto e assinatura.

- Atmosfera: `.hero-content::before`, com uma única nebulosa sem olho, `cover`, posição `center 55%`, opacidade `0.55`, sem blur.
- Faixa: os offsets aprovados `top:65px` / `bottom:35px` fazem a camada começar perto de “impulsionam”, passar por negócios/CTAs/olho e dissipar perto do texto complementar.
- Máscara única, somente nas extremidades: transparente → preto em 18% → preto até 78% → transparente.
- Removida a camada antiga de halo complementar (`::after`). Nenhuma máscara interna, circular ou derivada do raster antigo.
- Olho: `.hero-mobile-eye::before`, WebP com alpha nativo, tamanho `96% auto`, posição `center 35%`, opacidade 1, sem máscara/filtro. O ajuste acomoda as pontas alongadas do novo asset sem ampliar o container nem reposicionar o layout.
- Os dois CTAs continuam com 54px e mesmos topo/base em todas as larguras de telefone auditadas.

## Perspectiva mobile

Título → símbolo → segunda frase e todos os textos permanecem na composição aprovada.

- Olho isolado em `::after`: `96% auto`, `center 40%`, opacidade `0.74`, sem máscara do símbolo ou filtro de brilho. Presença secundária à Hero, dentro da faixa solicitada de 65–80%.
- Nebulosa independente em `::before`: opacidade `0.17`, `cover`, posição `center 55%`, estendida horizontalmente à viewport, com fade apenas superior/inferior (20% / 75%).
- `overflow-x:clip` na própria Perspectiva contém a atmosfera ao limite da seção, inclusive com scrollbar de desktop durante QA. Isso evita que `100vw` adicione overflow horizontal.
- O fundo não acompanha o contorno do olho; o alpha elimina o retângulo raster. Mantidos os pequenos overlaps/margens aprovados entre texto e espaço do símbolo, sem colocar máscara sobre letras.

## Método

Somente o trecho entre os nós 02 e 03 foi alterado. Nenhum estágio, offset, texto, nó, início ou fim mudou.

- Telefone: substituído `V245` por duas Béziers: `C362 151 394 160 394 190 C394 220 362 229 362 245`.
- Compacto/tablet: substituído `V256` por `V190 C370 200 392 201 392 223 C392 245 370 246 370 256`.
- A curva avança à direita e retorna com tangentes contínuas, formando uma barriga alongada. Fica dentro do viewBox, sem cotovelo ou reta vertical longa entre Direção/Criação.
- Final do telefone permanece `... C48 372 21 368 0 368`: encerra à esquerda, antes de “O lançamento não precisa ser o fim.”
- SVG desktop e seus nós permanecem idênticos.

## Footer

- Links em duas colunas e organização de contato preservados.
- `::before` usa somente o novo olho transparente, com opacidade `0.10`.
- Largura `clamp(460px,135vw,580px)`, proporção 2:1, `bottom:145px`.
- Centro do símbolo 12px além da lateral direita: `left:calc(100% - largura/2 + 12px)`.
- Aproximadamente metade do símbolo entra na tela, atrás de Explorar/Contato. O enquadramento sugere continuidade além da viewport, sem um olho inteiro centralizado.
- Fade vertical suave e alpha nativo, sem quadrado, raster de nebulosa ou halo. A baixa intensidade preserva o contraste dos links.

## Breakpoints e movimento

- Hero: novos layers somente até 700px, no layout de telefone já aprovado. Em 701–900px a composição tablet da Hero permanece intacta.
- Método: path de telefone até 700px; compacto entre 701–900px.
- Perspectiva/Footer: novos layers até 900px.
- Em 901px+ nenhuma nova regra visual se aplica; SVGs alterados estão ocultos.
- Não foram adicionadas animações, dependências, JS, canvas ou WebGL. Reduced-motion permanece com o comportamento aprovado, sem movimento novo.

## QA

Checks executados com sucesso:

- `node --check script.js`.
- `git diff --check`.
- Roundtrip lossless/alpha e carregamento dos dois WebPs.
- Console da página sem erros ou warnings atribuídos ao site. Há mensagens do content-script da extensão do navegador de QA, independentes do código da Home.
- Nenhuma imagem HTML carregada apresentou dimensão natural zero.
- Antes/depois obrigatório, inspecionado e salvo em 390px para Hero, Método, Perspectiva e Footer.
- Inspeção adicional da menor largura (320px) nas quatro áreas e da transição compacta em 900px.

| Viewport nominal | Área útil no Chrome com scrollbar | scrollWidth final | Resultado |
| --- | --- | --- | --- |
| 430 | 415 | 415 | Sem overflow |
| 390 | 375 | 375 | Sem overflow |
| 360 | 345 | 345 | Sem overflow |
| 320 | 305 | 305 | Sem overflow |
| 768 | 753 | 753 | Sem overflow |
| 900 | 885 | 885 | Sem overflow |
| 901 | 886 | 886 | Sem overflow / desktop preservado |
| 1024 | 1009 | 1009 | Sem overflow / desktop preservado |
| 1280 | 1265 | 1265 | Sem overflow / desktop preservado |
| 1440 | 1425 | 1425 | Sem overflow / desktop preservado |

O iframe utiliza a largura nominal para as media queries; a scrollbar clássica consome 15px da área útil. `documentElement.scrollWidth`, `body.scrollWidth` e largura útil coincidiram nas dez larguras finais.

Geometria/tipografia/backgrounds das áreas observadas em 901/1024/1280/1440px coincidiram com a base, normalizando somente o hostname da preview. A preservação do desktop também é garantida pelo escopo CSS e pela ausência de modificações no SVG desktop.

## Coleção preservada

- Markup da seção idêntico à base.
- `script.js` inteiro byte a byte idêntico.
- CSS anterior inteiro preservado, sem novo seletor/override de Coleção.
- Rotor V4, 3,2°/s, tilt, proxies, radialBladeContent, timings, 12 itens, assets, controles e breakpoints não alterados.
- Navegação observada: Gastronomia 01 → Gastronomia 02 por botão → Gastronomia 01 por Enter; rotor ambiental continuou ativo.
- Uma modificação local preexistente em `assets/collection-gastronomy.png` foi preservada no checkout e excluída de todos os commits/deployments desta build. O asset remoto aprovado ficou intacto.

## Problemas resolvidos e limites

- Eliminadas reconstrução parcial da nebulosa, máscara raster do olho e camada artificial de halo na Hero.
- Eliminado fundo raster retangular da Perspectiva; a primeira expansão em `100vw` gerava 7–8px de overflow no QA com scrollbar, corrigidos pela contenção local da atmosfera.
- Substituído trecho vertical rígido do Método por curva contínua.
- Fragmento acidental do Footer substituído por meio olho deliberadamente além da lateral.
- Assets lossless totalizam aproximadamente 2,14 MiB; não houve compressão com perdas ou mudança de resolução. Otimização adicional fica para decisão posterior.
- QA realizado em Chrome com viewports reais no iframe; Safari/iOS físico não foi testado. A intensidade percebida final ainda pode ser revisada visualmente pelo usuário.

## Publicação

Código visual validado: `76d963908ee9f6a1068a85ebed3f9712c24c6203`.
Preview de QA confirmada READY: https://avero-studio-demo-oaq0rwsoh-john-e7bd.vercel.app
O commit de documentação final gera uma nova preview da mesma branch, com código visual idêntico. A URL final e o commit final são informados na entrega.
Main de referência permaneceu `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Sem merge ou promoção de produção.
