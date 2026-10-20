# AVERO Studio — Build 01.12 / Coleção mobile em CSS 3D

Branch: `build-01-12-collection-3d`.
Base: HEAD `93b6e75ce02e1955e324ff232ed89e2c41958972` de
`build-01-2-refino-visual`, com Build 01.11 e AGENTS.md oficial presentes.

## Escopo e decisão

Esta build substitui exclusivamente o mecanismo compacto 2D da Coleção por
páginas com profundidade real. A nova decisão supersede o leque mobile e a troca
FLIP mobile registrados nas Builds 01.9/01.10. A composição continua com destaque
à esquerda, mecanismo à direita e setas/contador/pausa abaixo. Não há autoplay
do destaque, slider horizontal, dependências novas ou produção publicada.

Arquivos alterados:

- `styles.css`: bloco novo, limitado ao breakpoint existente de até 900px e à
  Coleção com a classe `is-3d`.
- `script.js`: somente o controlador da Coleção; geometria, estado e interação.
- `BUILD-01.12.md`: este registro.

`index.html`, AGENTS.md, documentação anterior, assets e configuração Vercel
permanecem intactos. O CSS anterior foi conservado integralmente. JavaScript antes
e depois do controlador da Coleção foi comparado byte a byte com a base.

## Arquitetura e geometria

A lista existente é a câmera: `perspective`, `perspective-origin` no eixo e
`transform-style: preserve-3d`. Seus 12 elementos reais mantêm a ordem DOM.
Os artigos preservam o contexto 3D; as faces visuais usam `backface-visibility`.
Não há cópia permanente, proxy, clone ou reparenting.

O destaque ocupa um plano frontal independente. Cada uma das outras 11 páginas
recebe um slot determinístico, contado a partir da próxima direção comercial:

```text
offset = (índice - activeIndex + 12) % 12
slot = offset - 1                         // 0 a 10; exclui o destaque
step = 360 / 11
angle = wrap(slot * step + wheelRotation - 32°)
```

O eixo fica em 63% da largura do mecanismo e na região central da imagem ativa.
Todas as páginas usam origem na borda esquerda/centro vertical e o mesmo eixo
inclinado: `rotateZ(-16deg) rotateX(18deg)`. Um núcleo curto com profundidade de
12px sugere a lombada; não existe haste longa.

Cada pose é composta nesta ordem:

```text
translate3d(x, y, z)
rotateZ(rz) rotateX(rx) rotateY(angle)
translateZ(radius)
scale(scale)
```

No repouso, as páginas ficam em `z = -24px`, com raio igual a 16% da largura do
destaque e escala 0,66. Rotacionar antes de `translateZ` distribui suas origens em
X/Y/Z; a própria superfície também ocupa profundidades diferentes em função do
ângulo. A escala complementa a hierarquia, sem substituir o eixo Z.

A câmera usa `max(560px, largura * 2,2)`. O destaque mantém a largura anterior de
44%, limitada a 240px, e as alturas existentes da lista. As páginas anteriores
não competem por z-index: a composição espacial resolve a oclusão. A opacidade
segue o cosseno positivo do ângulo, com dissipação gradual perto da borda lateral.
Aproximadamente cinco ou seis páginas do arco frontal ficam perceptíveis; as
demais continuam nos slots, recuadas ou invisíveis no arco posterior.

Evidência em 390px: câmera de 770px, contexto `preserve-3d`, 11 matrizes `matrix3d`
na roda e translações Z distintas, aproximadamente entre -46,6 e -0,6px, além
da variação de Z ao longo das superfícies. A base apresentava câmera `none` e
matrizes 2D nas quatro páginas mobile.

## Estado e movimento ambiental

`collectionState` centraliza `activeIndex`, `wheelRotation`, `transitionState`,
destino, geração da transição, animações, geometria, preferência de movimento,
visibilidade e motivos de pausa. Os dados comerciais continuam derivados do HTML.

Um único `requestAnimationFrame` avança a roda a 1,3°/s, sem medir layout no loop.
Ele escreve somente transform/opacity, nunca troca `activeIndex`, imagem, título,
descrição, CTA ou contador automaticamente. `will-change` fica restrito às duas
páginas em trânsito e é removido no assentamento.

O loop é cancelado fora da viewport, com documento oculto, durante transição,
interação, pausa manual ou movimento reduzido. Hover de mouse sobre o mecanismo
e foco em seu conteúdo também pausam. Ao cessar a interação, a retomada aguarda
700ms e respeita todos os outros motivos de pausa. Soltar/cancelar o ponteiro fora
do componente não deixa uma pausa permanente.

## Troca física

As setas avançam/retornam exatamente uma posição, incluindo 12 → 01 e 01 → 12.
Durante a troca, novas entradas são ignoradas e os controles anunciam
`aria-disabled`, mantendo o foco. Não existe fila de cliques.

1. O movimento ambiental pausa; a roda se alinha à página escolhida em 280ms.
2. Por 820ms, a página real escolhida avança em Z, atravessa o espaço à esquerda
   e cresce até assumir o plano frontal. Simultaneamente, a página ativa diminui,
   se aproxima do eixo e ocupa um slot da roda.
3. No assentamento, seleção, contador, imagem/miniatura, título, descrição, CTA,
   estados ARIA e inert são atualizados juntos. A copy reaparece na direção ativa.
4. As animações WAAPI e marcas transitórias são removidas; o movimento pode retomar.

O percurso intermediário tem Z positivo e `translateZ` adicional, não apenas
fade. O código move os próprios elementos que já contêm imagem e conteúdo.
Resize, cruzamento de breakpoint, documento oculto ou mudança de preferência
assentam atomicamente o destino pendente. Uma geração impede callbacks antigos
de restaurarem estados intermediários.

## Reduced motion e acessibilidade

Com `prefers-reduced-motion: reduce`, a roda continua 3D estática, sem RAF nem
animações WAAPI. A seleção manual é direta e o botão ambiental fica oculto.
ArrowLeft, ArrowRight, Home e End continuam funcionando. Somente o item ativo
é acessível/interativo; os outros 11 ficam `inert` e `aria-hidden`. Não há
miniaturas adicionais na tabulação nem duplicação semântica. Os botões existentes
têm áreas de 46×46px e a pausa, 44×44px; foco visível preservado.

A região de status anuncia somente escolhas manuais. Sem JavaScript, o fallback
anterior conserva os 12 links como lista estática. A ação da direção ativa continua
preenchendo o formulário de contato com o conceito escolhido.

## Verificação

QA local em Chromium com Playwright, Montserrat carregada por HTTPS com validação
TLS preservada e os assets existentes decodificados antes das capturas.

| Larguras | Evidência |
| --- | --- |
| 430, 390, 360, 320px | Câmera real, 11 páginas nos slots, destaque dominante, textos protegidos, controles tocáveis, sem overflow |
| 768, 900px | Mesma arquitetura compacta; mecanismo dentro da viewport, sem overflow |
| 901, 1024, 1280, 1440px | 503 elementos comparados por largura com a base, incluindo Coleção; medidas e estilos auditados idênticos |

Nas seis larguras compactas, 363 elementos externos à Coleção foram comparados
por largura: geometria, tipografia, cores, opacidade, transforms, grids e camadas
auditados idênticos à base, normalizando somente a origem da URL local dos assets.
Hero, Posicionamento, Serviços, Projetos, Método, Perspectiva, CTA e Footer preservados.

Verificações adicionais aprovadas:

- 2.592 configurações: 12 seleções × 36 ângulos × 6 larguras compactas. Nenhum
  overflow, página perceptível fora do mecanismo ou invasão da copy; quatro a
  seis páginas perceptíveis em cada configuração.
- Ciclo completo 01 → 12 → 01, anterior de 01 para 12 e vinte cliques extras
  durante uma troca: apenas um avanço, sem clones ou estado pendente.
- Transição física: duas páginas reais em trânsito e Z positivo medido durante
  a travessia; contador e conteúdo sincronizados no assentamento.
- Teclado, Home/End, foco visível, um único item ativo, onze inativos inert e
  coerência entre título, CTA e contador.
- Pausa/retomada manual, hover, foco, viewport, liberação de ponteiro fora do
  componente e alteração de preferência de movimento.
- Resize e cruzamento 900/901px durante a troca, sem estilos 3D residuais no desktop.
- Interrupção por resize após navegação por teclado: destino anunciado, pausa de
  interação liberada e movimento ambiental retomado; mudanças de preferência em
  repouso não anunciam seleções automáticas.
- Ocultação do documento durante a troca assenta o destino e remove estados transitórios.
- Menu mobile, controles de projetos, CTA da Coleção e montagem de mensagem
  WhatsApp verificados sem abrir conversa externa ou enviar mensagens.
- Sem erros JavaScript ou erros de console nos testes funcionais.
- `node --check script.js` e `git diff --check` aprovados.

## Limitações

- Assets continuam provisórios. Variantes 01/02 de cada setor compartilham a
  mesma imagem; Consultoria e Comércio reutilizam as URLs previstas anteriormente.
  Essa repetição limita a distinção visual de algumas trocas, sem alterar a ordem
  comercial ou criar assets novos.
- A visibilidade de aba foi exercitada pelo handler real de `visibilitychange`
  com `document.hidden` controlado no teste. Chromium headless mantém as abas
  visíveis; não houve teste físico de troca de aba no sistema operacional.
- Não foram testados Safari/iOS nem dispositivos físicos. A arquitetura usa CSS
  3D e WAAPI nativos e mantém fallback sem JavaScript, sem prometer paridade entre
  navegadores ainda não auditados.

Desktop preservado; main de referência permanece no SHA
`dd9257f9c2c42d28d421a300727d6aef148f4b63`. Sem merge ou promoção para produção.
Preview da branch deve ser confirmado após commit/push; este registro de QA local
não substitui a confirmação do deployment.
