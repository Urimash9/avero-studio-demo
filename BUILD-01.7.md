# AVERO Studio — Build 01.7

Branch: `build-01-2-refino-visual`. Base: `224e9c9a8a36a1a4f4c379148d01369ed0087606` (Build 01.6).

## Escopo e arquivos

- `index.html`: somente a seção Projetos. Três artigos estáticos na ordem Nicota, Vértice, Sabor; introdução e controles separados da imagem.
- `styles.css`: regras novas restritas a `.projects`; CSS anterior preservado.
- `script.js`: substituição exclusiva do carrossel de Projetos; lógica da Coleção, Serviços e contato preservada.
- `review/build-01-7.html`: painel isolado de revisão, com larguras reais no iframe e visão geral opcional. Não integra a Home.
- `BUILD-01.7.md`: descrição e registro de verificação desta rodada.

## Estrutura removida

A divisão entre um projeto principal e dois cards secundários, a coluna lateral e a atualização dinâmica desses cards foram removidas. Os três projetos continuam existindo como slides completos, sem clones e sem duplicação de assets. Os status existentes foram mantidos: Nicota e Vértice, “Conceito Avero”; Sabor Real, “Demo personalizada”. Ano 2026, segmentos e destinos de contato preservados.

## Composição desktop e tablet

Introdução editorial acima do trilho, com headline à esquerda e texto de apoio à direita. O projeto ativo ocupa 83% da largura disponível. A imagem possui recorte discreto no canto inferior direito; as informações começam sobre a base escurecida da imagem e continuam abaixo dela, com uma linha lateral fina. O CTA acompanha a informação à direita. Não há caixa fechada envolvendo cada projeto. Controles e “Ver todos os projetos” ficam abaixo do destaque.

O próximo projeto aparece parcialmente à direita, com 65% de opacidade e escala de 96%. Somente a imagem aparece nessa continuação; título, status e CTA ficam reservados ao projeto ativo. O background global e suas trajetórias permanecem intactos. Em tablet, a tipografia diminui e os controles aproveitam a largura disponível.

## Mobile

Introdução centralizada. O slide ativo se alinha à margem esquerda da área da seção e ocupa 86% do trilho, com uma faixa do próximo visível à direita. A imagem mantém proporção própria, sem deformação. Nome, segmento, status e ano continuam em leitura aberta abaixo da imagem; CTA de 44px de altura. Navegação centralizada imediatamente abaixo; “Ver todos os projetos” logo depois. Não existem imagens ou cards secundários soltos.

## Navegação e movimento

Ciclo: Nicota → Vértice → Sabor Real → Nicota. Anterior percorre o ciclo inverso. Paginação permite seleção direta. O trilho desliza por 620ms, com easing `cubic-bezier(.22,.68,.22,1)`; após o movimento, a ordem visual é normalizada sem alterar a ordem DOM dos três artigos. Não há clones, autoplay ou biblioteca de slider.

Botões reais; Enter e Space funcionam por ativação nativa. Setas esquerda/direita e Home/End também funcionam na vitrine e nos controles. Deslize horizontal deliberado em touch navega; rolagem vertical continua disponível. Inputs sucessivos e resize durante uma transição assentam o destino antes de continuar.

Slides inativos têm `inert` e `aria-hidden`, evitando foco em links cortados. A paginação indica `aria-current`. O status anuncia uma única mudança ao concluir a navegação. Foco visível de 2px; botões de navegação com área de 44 × 44px. O link “Ver todos os projetos” mantém o destino interno `#project-list`, agora o próprio trilho; nenhuma página foi criada.

Com `prefers-reduced-motion: reduce`, a troca é direta, sem deslocamento animado nem transição de escala/opacidade. Se a preferência mudar durante o movimento, o destino é assentado imediatamente. Sem JS, os três artigos permanecem disponíveis em uma faixa com scroll nativo.

## Verificação

Larguras reais da Home em iframe da preview: 1440, 1280, 1024, 900, 768, 430, 390, 360 e 320px.

| Largura | Slide ativo | Faixa do próximo no trilho |
| --- | --- | --- |
| 1440px | 83% | 177,6px |
| 1280px | 83% | 154,6px |
| 1024px | 83% | 130,0px |
| 900px | 83% | 112,1px |
| 768px | 83% | 91,1px |
| 430px | 86% | 38,5px |
| 390px | 86% | 32,9px |
| 360px | 86% | 32,1px |
| 320px | 86% | 26,5px |

Valores medidos antes da leve escala visual aplicada à imagem seguinte; o trilho permanece recortado pelo viewport. A barra vertical do iframe ocupa 15px, tornando a área útil ligeiramente menor que a largura selecionada.

- Nenhum overflow horizontal da Home nas nove larguras; somente o trilho excede sua janela recortada.
- Três slides/assets únicos; um ativo e um próximo visível, inclusive Sabor → Nicota.
- Imagens existentes carregadas em 1536 × 1152; `object-fit: cover`, sem distorção ou filtros fortes.
- Informações e CTA do slide ativo dentro da área visível; controles com altura mínima de 44px.
- Navegação por botões, paginação e teclado verificada na preview, incluindo volta circular.
- Sintaxe de `script.js` verificada com `node --check`.
- Harness temporário de JS nativo verificou ciclo, inverso, paginação, Home/End, inputs rápidos, resize, ausência de animação no estado reduced-motion, swipe horizontal e prioridade da rolagem vertical. A preferência foi simulada nesse teste de lógica, não alterada no sistema do navegador.
- Comparação com a Build 01.6 confirmou o restante do HTML byte a byte, prefixo anterior do CSS e JS das outras seções preservados.

## Problemas resolvidos e decisões pendentes

Resolvidos: fragmentação entre destaque e cards avulsos; introdução disputando espaço dentro do mockup; duplicação visual entre peças; falta de continuidade horizontal; navegação sem slides próprios. A quebra forçada do texto introdutório foi removida, e a headline recebeu ajuste de escala no tablet.

Não há bloqueio funcional identificado na verificação. A proporção do peek, intensidade de redução do próximo e recorte editorial aguardam revisão visual. Os três assets atuais continuam provisórios; acabamento e identidade final dos mockups dependem de uma rodada própria de assets. Nenhum asset foi gerado ou substituído.

Hero, Posicionamento, Serviços, Coleção Avero, Método, Perspectiva, CTA final, Footer e background global não foram reinterpretados. Main não foi modificada; nenhuma operação de merge ou promoção para produção foi realizada.
