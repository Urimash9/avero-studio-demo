# AVERO Studio — Build 01.12.1 / Refino da geometria 3D mobile

Branch: `build-01-12-collection-3d`, sem branch adicional.
Base: Build 01.12, commit `bbbae731dd2ed488ae31ffc3b25d357aed1c1265`.

## Escopo e decisão

Esta rodada refina somente a geometria, a lombada e a troca física da Coleção
compacta, no breakpoint existente de até 900px. A fundação 3D da Build 01.12
permanece: câmera CSS, elementos reais, controlador centralizado, navegação,
acessibilidade, pausas e reduced motion. A imagem ativa continua à esquerda,
o mecanismo à direita e os controles abaixo.

A distribuição uniforme de 11 páginas em 360° e o raio de 16% da largura da
página, registrados na Build 01.12, foram substituídos por uma abertura parcial.
A circunferência completa concentrava superfícies em uma massa pouco legível.
A nova decisão, solicitada nesta tarefa, dá ao objeto a leitura de páginas
abertas em torno de uma lombada comum.

Arquivos alterados:

- `script.js`: poses compactas, preparação da página e trajetórias de troca.
- `styles.css`: borda das páginas passivas e pequeno marcador da lombada,
  exclusivamente dentro do bloco 3D de até 900px.
- `BUILD-01.12.1.md`: este registro.

`index.html`, AGENTS.md, builds anteriores, assets, configuração Vercel e todas
as outras seções permanecem intactos. Não há dependências novas.

## Janela angular e slots

Continuam existindo 12 itens comerciais na ordem original: um destaque fora do
mecanismo e 11 páginas reais nos slots da lombada. A distância circular no estado
serve apenas para identificar vizinhos; não posiciona páginas em uma circunferência.

```text
offset = (índice - activeIndex + 12) % 12

offset 1  → próxima página       → posição -0,5
offset 2  → segunda próxima      → posição -1,5
offset 10 → segunda anterior     → posição +1,5
offset 11 → anterior             → posição +0,5
offset 3…9                      → sete páginas dobradas/recuadas
```

Quatro páginas ficam visualmente abertas. As outras sete continuam nos elementos
e no estado existentes, com opacidade zero, escala 0,32 e Z mais recuado:
`-larguraDaPágina * 0,7 - offset * 4`. Não há exclusão de itens nem clones.

Para cada posição aberta `p`:

```text
abertura = sin((wheelRotation + p * 12) * π / 180) * 2°
rotateZ = p * 40° + abertura
rotateY = -8° + p * 24° + abertura
rotateX = 12°
Z = -18px - p * 4px
translateZ adicional = larguraDaPágina * 0,035
escala = 0,48 - abs(p) * 0,02
```

A silhueta ocupa nominalmente -60° a +60° em Z, com páginas em -60°, -20°,
+20° e +60°: janela de 120°, limitada a ±62° durante a respiração. Em Y, a
abertura nominal vai de -44° a +28°, limitada a -46°…+30° com o movimento.
Não há voltas completas das páginas. A escala menor mantém o destaque dominante.

As poses continuam usando `translate3d`, `rotateZ`, `rotateX`, `rotateY` e
`translateZ` em um contexto `preserve-3d`, com `backface-visibility` nas faces.
A câmera permanece `max(560px, largura * 2,2)`. A profundidade existe nas origens
e ao longo das superfícies; a silhueta em Z não substitui a geometria espacial.
Os testes confirmaram matrizes `matrix3d` e diferenças reais de Z nos 11 slots.

## Lombada e hierarquia

O eixo mantém X em 63% da largura e Y em
`activeY + alturaDaPágina * 0,55`. Todas as páginas usam origem na borda esquerda,
no centro vertical (`transform-origin: 0 50%`). O pequeno raio de 3,5% aproxima
as origens da mesma lombada, em vez de criar uma órbita larga.

O marcador mede 6×22px, centralizado no eixo, com `translateZ(32px)` e
`rotateX(12deg)`. A borda das páginas passivas ajuda a distinguir superfícies.
O destaque mantém tamanho, posição e conteúdo anteriores; textos, controles,
altura do palco e breakpoints não mudam.

## Movimento e estado preservados

`collectionState`, pausas, RAF, IntersectionObserver, reduced motion e eventos
de navegação permanecem com a estrutura da Build 01.12. `wheelRotation` agora
alimenta a fase da abertura sinusoidal limitada a 2°, usando o mesmo avanço de
1,3°/s. As páginas respiram em torno da lombada, sem girar continuamente em 360°.

Há um único RAF, sem leituras de layout no loop. O movimento escreve transform
e opacity, não muda `activeIndex` automaticamente, e respeita pausa manual,
interação, foco, hover, viewport, documento oculto e reduced motion. A navegação
desktop e o código externo ao controlador da Coleção permanecem idênticos à base.

## Duas trajetórias de troca

A preparação de 280ms abre apenas a página escolhida em uma pose de extração
junto à lombada. As outras páginas não precisam dar uma volta para encontrá-la.
A pose preparada é preservada antes de iniciar a troca de 820ms.

- **Entrada no destaque:** abre junto ao eixo, sobe ligeiramente e avança para
  Z positivo (32px e depois 48px). Cruza pela faixa superior/frontal, cresce e
  assenta no plano da imagem ativa. Na aproximação final, uma compensação de X
  pela distância da câmera mantém a projeção dentro do palco enquanto Z é 16px.
- **Retorno à lombada:** espera os primeiros 12% da troca, reduz para escala
  0,5, recua para Z negativo (-65px) e atravessa pela faixa inferior/traseira.
  Aproxima-se do eixo em Z -56px e escala 0,44 antes de assentar no novo slot.

As duas páginas são os elementos reais existentes. Z, Y, ângulo, tamanho e timing
distintos mantêm as peças reconhecíveis durante o cruzamento. As demais páginas
assentam nos slots relativos à nova seleção.

O bloqueio de cliques, a geração contra callbacks antigos, `aria-busy`, inert,
anúncios e atualização conjunta de conteúdo/contador permanecem. Interrupções
por resize, breakpoint, visibilidade ou preferência assentam o destino pendente
e removem animações e marcas transitórias. Não há proxies ou elementos fantasmas.

Com reduced motion, a geometria continua 3D estática, sem movimento ambiental
ou troca WAAPI. Navegação manual direta, teclado, Home/End e foco continuam
funcionando. As áreas de toque existentes de pelo menos 44px foram preservadas.

## QA realizado

Validação local em Chromium com Playwright, fontes Montserrat carregadas por
HTTPS com validação TLS e imagens existentes decodificadas antes das capturas.

| Larguras | Resultado |
| --- | --- |
| 430, 390, 360, 320px | Quatro páginas abertas, eixo legível, destaque dominante, controles tocáveis e zero overflow horizontal |
| 768, 900px | Geometria compacta dentro do palco, textos protegidos e zero overflow horizontal |
| 901, 1024, 1280, 1440px | Desktop preservado; 503 elementos por largura com medidas e estilos auditados idênticos à Build 01.12 |

Nas seis larguras compactas, 363 elementos externos à Coleção por largura tiveram
medidas e estilos auditados idênticos à base, normalizando somente a origem local
das URLs de assets. Hero, Posicionamento, Serviços, Projetos, Método, Perspectiva,
CTA e Footer foram preservados.

- 2.592 configurações: 12 seleções × 36 fases ambientais × 6 larguras compactas.
  Nenhum overflow, página aberta fora do mecanismo ou invasão da copy.
- Trocas 01 → 02, 02 → 03, 11 → 12, 12 → 01 e anterior de 01 → 12 nas seis
  larguras compactas. Foram medidos 330 frames em 11 pontos de cada percurso;
  90 capturas registram 25%, 50% e 75% da troca, incluindo inspeção visual.
- As duas páginas permaneceram dentro do palco e distinguíveis. A maior
  interseção entre retângulos projetados foi 3,47% da área do menor retângulo,
  em 320px; nos frames de 25% e 75%, foi zero. A separação mínima entre as
  translações Z computadas nas amostras foi 11,05px. Interseção de retângulos
  é uma medida conservadora e não equivale à sobreposição de superfícies.
- Ciclo completo 01 → 12 → 01, anterior em 01, vinte cliques extras durante
  a troca, teclado, Home/End, foco e sincronização do conteúdo/contador.
- Pausa/retomada manual, foco, hover, saída/entrada da viewport, ponteiro solto
  fora do componente, documento oculto e mudança de reduced motion.
- Resize e cruzamento 900/901px durante a troca, sem estado pendente ou estilos
  compactos residuais no desktop.
- CTA da Coleção, menu mobile, controles de projetos e montagem de mensagem
  WhatsApp verificados sem envio externo; fallback sem JavaScript mantém 12 links.
- Sem erros JavaScript ou de console nos testes funcionais.
- `node --check script.js` e `git diff --check` aprovados; diff limitado aos
  três arquivos registrados nesta build.

## Limitações e publicação

- Assets continuam provisórios e algumas direções compartilham imagens. Não
  foram criados, substituídos ou editados arquivos de imagem.
- Não foi recebido um novo vídeo nesta rodada. A referência de forma foi o
  rascunho anteriormente anexado, junto às capturas locais da Build 01.12.
- O teste de aba usa o handler real de `visibilitychange` com `document.hidden`
  controlado, pois Chromium headless mantém abas visíveis. Não houve troca
  física de aba, teste em dispositivo físico ou validação Safari/iOS.
- QA funcional foi local. O preview deve ser confirmado após commit/push;
  este registro não substitui a confirmação do deployment da branch.

Main de referência: `dd9257f9c2c42d28d421a300727d6aef148f4b63`.
Sem alteração da main, merge ou promoção para produção.
