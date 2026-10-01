# AVERO Studio — Build 01.9

Branch: `build-01-2-refino-visual`. Base: `4894b168efa79ba7559510af9665f6e8ecae3ffd` (Build 01.8).

## Arquivos e escopo

- `index.html`: exclusivamente a seção Coleção Avero; introdução/copy e CTA preservados.
- `styles.css`: regras novas restritas à Coleção, sem alterar o CSS anterior.
- `script.js`: somente a lógica antiga da Coleção foi substituída. A preferência de movimento reduzido continua compartilhada com os componentes existentes.
- `review/build-01-9.html`: página de revisão por larguras reais em iframe, sem criar página comercial da Coleção.
- `BUILD-01.9.md`: decisões, limitações e verificação desta rodada.

HTML fora da Coleção e JavaScript fora do trecho substituído permanecem byte a byte iguais à base. Hero, Posicionamento, Serviços, Projetos, Método, Perspectiva, CTA final, Footer e background global foram preservados. Nenhum asset foi criado, substituído ou modificado nos commits desta build. Uma alteração local pré-existente em `assets/collection-gastronomy.png` foi mantida fora destes commits.

## Desktop

Introdução editorial à esquerda e conjunto visual com eixo à direita. Uma peça maior vem à frente; quatro peças periféricas sugerem variedade e profundidade por escala, sobreposição, opacidade e rotações pequenas. Fragmentos de percurso conectam o conjunto, sem círculo fechado ou bloco de fundo rígido. O nome, a descrição e a ação da direção ativa ficam abaixo da imagem, com espaço protegido das miniaturas.

As setas e o indicador atual/total ficam abaixo do mecanismo. A navegação é manual, circular e sem autoplay: 01 → 02 → … → 12 → 01, com retorno no sentido contrário. Não há biblioteca de slider, clones de itens, canvas ou WebGL.

## Mobile e tablet estreito

A partir de 900px, a introdução e o CTA ficam centralizados. O mecanismo possui uma composição própria: destaque à esquerda, ocupando aproximadamente 44% do espaço, e páginas/miniaturas agrupadas à direita, ao redor de um eixo. O destaque mostra nome e ação; a descrição completa continua na estrutura de dados, mas é omitida visualmente nesse layout para preservar espaço e leitura.

As setas, o indicador e o botão de pausa ficam abaixo do conjunto. Os controles possuem áreas de toque de 44–46px e foco visível. A leitura do texto ativo é preservada em 320px, inclusive para Arquitetura & Interiores e Serviços & Consultoria.

## Troca física e movimento ambiental

O mesmo elemento HTML muda de posição e escala. O componente mede a posição anterior, organiza as novas posições e anima a diferença com JavaScript nativo/Web Animations API (FLIP). A miniatura avança para o destaque e a peça anterior retorna ao conjunto. O movimento principal dura 720ms, com curva suave e pequeno desvio no percurso. O texto fica discreto durante a troca e aparece quando a peça assenta. Entradas rápidas cancelam a transição anterior e avançam a partir do estado atual, sem duplicar itens ou criar fila.

No mobile, somente as quatro miniaturas visíveis recebem um movimento CSS ambiental: 24s por trecho, deslocamento de 2px e rotação de poucos graus, com fases diferentes. Esse movimento não muda a direção ativa. Ao navegar, pausa por 5,5s e depois pode retomar. Há pausa manual acessível; o componente também pausa quando sai da viewport ou quando a aba fica oculta. No desktop não existe movimento ambiental.

Com `prefers-reduced-motion: reduce`, o movimento ambiental desaparece e a troca acontece diretamente, sem deslocamento amplo. O botão ambiental deixa de ser exibido. As setas, o indicador, a leitura e o acesso aos 12 itens continuam funcionais.

## Dados e assets provisórios

A lista ordenada no HTML é a fonte da Coleção. Cada entrada contém ID estável, setor, variante, ordem, imagem, miniatura, nome, descrição e indicação de asset provisório. O JavaScript monta `collectionDirections` a partir desses dados, sem manter uma segunda lista divergente. Os nomes e descrições são HTML semântico, nunca texto em SVG.

| Ordem | Direções | Imagem/miniatura provisória |
| --- | --- | --- |
| 01–02 | Gastronomia 01 / 02 | `collection-gastronomy.png` |
| 03–04 | Estética & Beleza 01 / 02 | `collection-beauty.png` |
| 05–06 | Saúde 01 / 02 | `collection-health.png` |
| 07–08 | Arquitetura & Interiores 01 / 02 | `collection-architecture.png` |
| 09–10 | Serviços & Consultoria 01 / 02 | `service-landing.png` |
| 11–12 | E-commerce & Cardápios 01 / 02 | `service-commerce.png` |

Todos os 12 itens são navegáveis. As variantes 01 e 02 de cada setor reutilizam a mesma imagem nesta build. Consultoria e comércio também reutilizam assets já presentes em Serviços. A diversidade definitiva entre as duas direções de cada setor depende dos 12 assets finais; esta rodada não apresenta essas imagens repetidas como conceitos finais distintos.

Para substituir depois: mudar `src` da imagem, `data-thumbnail`, a descrição e `data-provisional` da entrada correspondente, preservando ID, setor e ordem. O browser reutiliza as seis URLs atuais; não foram introduzidos novos arquivos pesados.

## Acessibilidade e fallback

A ordem DOM dos 12 itens permanece lógica e nunca é reordenada para a composição visual. Somente a direção ativa recebe foco/interação; as miniaturas são representações visuais da mesma lista e ficam `inert`/`aria-hidden`. Setas são botões reais; também funcionam ArrowLeft, ArrowRight, Home e End. Uma região de status anuncia apenas a direção escolhida pelo usuário. Linhas e o ponto do eixo são decorativos, com `aria-hidden` e `focusable="false"`.

Sem JavaScript, os 12 itens permanecem disponíveis como lista visual estática, e os controles inoperantes ficam ocultos. A ação da direção ativa conserva a integração existente: leva ao contato com a direção escolhida preenchida. “Explorar toda a Coleção” mantém o destino `#catalogo`, sem criar página nova.

## Verificação e problemas corrigidos

Larguras verificadas na preview: 1440, 1280, 1024, 900, 768, 430, 390, 360 e 320px. A largura real do iframe corresponde à selecionada; sua scrollbar interna ocupa 15px da área de conteúdo. A opção “Visão geral” altera apenas a escala de exibição, sem mudar o breakpoint testado.

- Sem overflow horizontal da Home, texto cortado ou colisão com os controles nas larguras testadas.
- Ciclo dos 12 nomes conferido no browser mobile, com retorno a Gastronomia 01.
- Pausa manual, indicador, teclado e conservação da ordem/única direção acessível conferidos.
- Verificação da lógica nativa com movimento normal e preferência reduzida: 12 itens alcançáveis; ciclos nos dois sentidos; Home/End; pausa; nenhuma chamada de animação no modo reduzido.
- `node --check script.js` aprovado.
- Comparação de escopo contra a base confirmou a preservação das demais seções.

Problemas encontrados: miniaturas inferiores próximas da descrição no desktop, pequena aproximação em 1024px e aparecimento antecipado do texto durante a troca de escala. Foram corrigidos por reposicionamento/escala das peças e revelação da copy após o assentamento. O antigo trilho horizontal, scroll-snap e paginação de seis botões deixaram de controlar a Coleção.

## Pendências para revisão

A arquitetura e os 12 estados estão prontos. Ainda dependem dos assets finais: diferenças reais entre 01/02 de cada setor, crops específicos por direção, miniaturas próprias e melhor representação de Consultoria. A intensidade do eixo, a escala das páginas e o ritmo da troca aguardam revisão visual. Não foi implementada rotação contínua de categorias ou autoplay de seleção.

Main preservada no SHA `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Sem merge e sem promoção para produção.
