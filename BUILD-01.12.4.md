# AVERO Studio — Build 01.12.4 / Troca física entre rotor e destaque

Branch: `build-01-12-2-v4-radial`.
Base aprovada: Build 01.12.3, commit
`3fa55279a86b3fe1e33253e011d246f81f93aa31`.

## Decisão e escopo

A navegação compacta agora comunica uma troca: a direção escolhida sai da face
frontal/esquerda do rotor e assume o destaque; a anterior retorna àquela posição.
Esta decisão substitui a troca direta da imagem e o giro único de 850ms da
Build 01.12.3. A geometria V4 aprovada permanece integralmente preservada.

Stage, câmera, perspective-origin, tilt de −10°, rotor único, 12 lâminas reais,
step de 30°, front gap estrutural de 15°, raio, dimensões e posições existentes
não mudaram. O ambiente continua a 2,5°/s (144s por volta ativa). Nenhuma lâmina
é retirada, reparentada ou reconstruída. Apenas o conteúdo visual de dois slots
é atualizado no assentamento.

Arquivos alterados:

- `script.js`: mapa visual, gate, proxies, timing comercial e assentamento atômico.
- `styles.css`: regras transitórias de visibilidade, manutenção das posições dos
  originais e camada/proxies, exclusivamente dentro do modo até 900px.
- `BUILD-01.12.4.md`: este registro.

HTML, AGENTS.md, README, builds anteriores, assets e configuração Vercel intactos.
Hero, Posicionamento, Serviços, Projetos, Método, Perspectiva, CTA, Footer e
Coleção desktop preservados. Sem dependências, assets novos, branches ou worktrees.

## Estado e mapa visual

`collectionState.activeIndex` e `collectionDirections` continuam sendo a única
fonte comercial: título, descrição, CTA, formulário, contador, status e ARIA.
`collectionState.transfer` guarda somente os dados temporários da troca, incluindo
direção anterior, slots, ângulo do gate, timer de copy e layer.

`radialBladeContent` é uma permutação visual dos índices do catálogo, inicialmente
`[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]`. Cada posição identifica o conteúdo de
uma lâmina física existente, não sua posição comercial no contador.

```text
sourceSlot = radialBladeContent.indexOf(destination)
oldActiveSlot = radialBladeContent.indexOf(oldActive)

no assentamento:
radialBladeContent[sourceSlot] = oldActive
radialBladeContent[oldActiveSlot] = destination
```

Front e back dos dois slots recebem os thumbnails correspondentes. As 12 direções
permanecem no rotor, incluindo a direção ativa; nenhum conteúdo é perdido ou
duplicado dentro do mapa. A borda decorativa de direção ativa acompanha o conteúdo
do slot, não seu índice físico. A imagem principal continua uma estrutura independente.

O ângulo do rotor passa a representar sua posição física acumulada. Trocas futuras
buscam novamente os slots no mapa, inclusive após navegação desktop e retorno ao
compacto. Não se assume `destination === slot` e não se normaliza para
`-activeIndex * step` após a troca ou no retorno a um rotor já criado.

## Gate e alinhamento

Extraction angle escolhido: **−60°**. Nessa posição, a face front fica na região
esquerda/frontal, com orientação aproximada de +30° em Y após o `rotateY(90deg)`
local. A imagem é reconhecível e permanece ligada ao objeto antes da extração.
Alternativas de −45°, −55° e −65° foram medidas e inspecionadas para a escolha.

No clique, o ângulo visual atual é capturado e o RAF ambiental é pausado, sem
normalização. O destino físico é `−60° - sourceSlot * 30°`, na representação
equivalente mais próxima. O deslocamento tem no máximo 180°.

Duração proporcional à distância angular `d`:

```text
0 <= d < 30°: 220ms * d / 30°
30° <= d <= 180°: 220ms + (d - 30°) * 200ms / 150°
```

Média medida nas 24 trocas consecutivas: aproximadamente **226ms**. Para distâncias
usuais, 220–420ms; uma lâmina já próxima do gate não espera um mínimo artificial,
e alinhamento nulo é pulado. Easing: `cubic-bezier(.22,.8,.18,1)`.
Busy, controles e rotor respondem no início do clique; entradas adicionais são
ignoradas durante `aligning` e `transferring`.

## Transfer layer, medidas e proxies

Apenas durante a travessia, uma `.collection-transfer-layer` é anexada ao body:
fixed, inset 0, z-index 50, pointer-events none, `aria-hidden` e `inert`.
Contém exatamente dois proxies visuais: incoming e outgoing, com imagens reais
do catálogo, alt vazio e sem texto, CTA, IDs comerciais ou conteúdo interativo.

Após o alinhamento, são medidos o retângulo da imagem principal e a face real da
lâmina. Quatro probes de tamanho zero leem os cantos projetados da face via
`getBoundingClientRect`, incluindo perspective e tilt. São removidos antes da
criação da layer. Uma homografia planar em `matrix3d` mantém os cantos iniciais
e finais dos proxies sobre essas medidas reais, sem estimar a câmera.

Somente a face escolhida e as imagens originais dos dois highlights ficam
visualmente ocultas. Os originais mantêm suas caixas; uma regra transitória também
conserva o highlight anterior no layout quando a copy comercial muda. O conteúdo
ativo e os controles continuam visíveis. Nenhum original é removido para animar.

## Travessia e proporção

Duração: **600ms**, easing `cubic-bezier(.4,0,.2,1)`. Nove poses calculadas antes
da animação são executadas pela Web Animations API, sem medir layout por frame.

- Incoming: sai com a projeção da face, percorre a rota mais alta, abre a
  orientação e cresce até o retângulo do destaque. O crescimento usa `t²`,
  preservando a leitura de página antes de assumir a superfície maior. Arco
  máximo para cima: `min(18px, altura do destaque * 0,12)`. Z-index maior.
- Outgoing: retorna por baixo e visualmente recuada. Reduz mais cedo, com
  `1 - (1 - t)³`; arco máximo para baixo de 30% da altura do destaque e redução
  adicional de profundidade até 65% no cruzamento. Isso mantém as duas peças
  distinguíveis, sem invadir a copy, e termina na projeção original da face.

Width, height, left e top dos proxies são definidos uma única vez. A animação usa
transforms, ajuste discreto de borda e crop; não move o layout continuamente.
Os proxies usam `img` com object-fit cover. O crop abre por transform X/Y com
propriedades numéricas CSS registradas e herdadas; permanecem dois alvos de
animação externos. Em motores sem `CSS.registerProperty`, o mesmo crop é animado
nativamente nas imagens internas dos dois proxies, sem criar objetos adicionais.

O primeiro/último frame usa o mesmo asset e as mesmas medidas dos originais.
Assentamento cancela as animações, aplica a permutação, restaura visibilidade,
remove a layer com os dois proxies e libera controles na mesma operação síncrona.
Não há teleport de posição/tamanho nem troca baseada apenas em fade.

## Copy, acessibilidade e retomada

**140ms após iniciar a travessia**, activeIndex, imagem real ainda oculta, título,
descrição, CTA, contador, status e ARIA são atualizados juntos. A imagem real fica
pronta para reaparecer no assentamento. Média observada da resposta da copy:
aproximadamente **141ms** após o início dessa fase, com opacity 1 e sem microfade.
Não espera o término dos 600ms; a regra radial da Build 01.12.3 que mantém a copy
visível durante `aria-busy` continua intacta. Desktop mantém seu comportamento.

Após assentar, a pausa de interação é renovada por **450ms**. O ambiente retoma
do ângulo físico do gate, somente quando documento/viewport, pausa manual, foco,
ponteiro e reduced motion permitirem. O único RAF ambiental permanece intacto e
suspenso durante alinhamento/travessia; a copy nunca é alterada pelo ambiente.

Botão de pausa, área ≥44px, aria-pressed, labels, ArrowLeft/Right, Home/End, foco
visível e proteção contra cliques repetidos preservados. Os proxies não entram
na tabulação nem duplicam conteúdo semântico. CTA cedo na travessia continua
enviando a direção comercial correta ao formulário.

## Interrupções e reduced motion

`settleCollectionMotion` delega qualquer troca pendente a **`settleTransfer`**.
Essa função única invalida a geração, limpa o timer de copy, cancela WAAPI,
consolida destination uma vez, aplica o mapa uma vez, restaura originais, remove
proxies/layer, limpa busy e libera controles. Callbacks antigos verificam geração
e identidade da transferência antes de agir.

Usada em resize, 900→901px, document.hidden, mudança de reduced motion e saída da
viewport. Scroll também assenta a troca: uma layer fixed não pode continuar
viajando em coordenadas antigas enquanto os originais se deslocam na página.

Com reduced motion, a escolha e a permutação são diretas, sem proxies espaciais
ou RAF ambiental. Geometria 3D estática, copy, teclado e navegação permanecem.
Escolhas fora da viewport, em documento oculto ou sem WAAPI também assentam
diretamente, sem deixar estado intermediário.

## QA

Chromium/Playwright, Montserrat carregada por HTTPS com validação TLS e assets
originais decodificados. Larguras: **390 primeiro**, 430, 360, 320, 768, 900,
901, 1024, 1280 e 1440px; adjacentes 431, 700 e 701px.

- 24 trocas consecutivas com animações nativas completas: dois ciclos 01→12→01,
  permutação correta, mesmos 12 elementos físicos e faces correspondentes ao mapa.
  Anterior 01→12, Home/End, setas e vinte cliques extras durante busy verificados.
- Seis casos visuais: 01→02, 02→03, 03→04, 11→12, 12→01 e 01→12. Nas seis
  larguras compactas, 41 frames por caso: **1.476 frames medidos**. Capturas em
  0/25/35/50/75/100% e após restaurar os originais; inspeção do cruzamento e encaixe.
- Proxies contidos na viewport, copy não invadida, rotor imóvel durante travessia,
  transforms locais das lâminas constantes e originais mantendo as mesmas caixas.
  Erro de retângulo dos endpoints menor que 0,06px nos testes.
- Maior sobreposição medida: aproximadamente 40% do retângulo projetado da outgoing.
  As peças conservam silhuetas distintas; essa medida complementa a inspeção visual.
- 18 interrupções: seis causas × alinhamento, travessia antes da copy e depois
  da copy. Inclui nova escolha logo após cancelar, sem rollback de callbacks antigos.
- CTA durante busy, fallback de crop sem registro CSS, reduced motion e retorno
  desktop→mobile com oldActiveSlot diferente de zero verificados.
- Ambiente medido próximo de 2,5°/s, sem seleção automática; pausas ociosas por aba
  e viewport preservam ângulo acumulado. Auditoria: um RAF pendente no máximo,
  zero leituras de layout/estilo no loop e zero avanço no primeiro frame retomado.
- Zero layers/proxies/probes/classes transitórias residuais. Quantidade de listeners
  originados em script.js permaneceu igual antes/depois das trocas.
- Comparação com a base: 363 elementos externos à Coleção por largura compacta
  e 503 elementos em cada largura desktop auditada com medidas/estilos idênticos.
  Fábrica radial, medidas/câmera, RAF ambiental e navegação desktop também comparados
  byte a byte; HTML, CSS anterior ao radial e JavaScript das outras áreas intactos.
- Menu, navegação, projetos, CTA, formulário e montagem da URL WhatsApp verificados
  sem enviar mensagens. Fallback sem JavaScript mantém os 12 links acessíveis.
- HTTP 200 e conteúdo não vazio na página, CSS, JavaScript e 17 assets originais.
- Zero overflow horizontal e zero erros JavaScript/console nos cenários testados.
- `node --check script.js`, `git diff --check` e revisão de escopo aprovados.

## Limitações e publicação

Safari/iOS e dispositivos físicos não testados. Aba oculta validada com o handler
real e document.hidden controlado, pois Chromium headless mantém abas visíveis.
Assets continuam provisórios e repetidos entre algumas direções; nenhuma imagem
foi criada, editada ou substituída. Não foi adicionada interação de drag/swipe.

Commit/push nesta mesma branch; o deployment de preview e sua URL são confirmados
na entrega após o push. QA local não substitui confirmação do deployment.
`main` permanece em `dd9257f9c2c42d28d421a300727d6aef148f4b63`; checkpoints
`build-01-12-collection-3d` (`a8346e2e95b1a62e1e5a095e72d323b5f22b7ab9`) e
`build-01-2-refino-visual` (`93b6e75ce02e1955e324ff232ed89e2c41958972`) preservados.
Sem merge ou promoção do preview para produção.
