# AVERO Studio — Build 01.12.3 / Movimento ambiental, copy e tilt

Branch: `build-01-12-2-v4-radial`.
Base: Build 01.12.2, commit `f560e9c69d8a332b8a14a930b718369a66c93211`.

## Decisão e escopo

A geometria radial V4 aprovada foi preservada. Esta tarefa autoriza três mudanças
no modo compacto, até 900px: movimento ambiental do rotor, resposta imediata da
copy e comparação da inclinação global. Essas decisões substituem o repouso
ambiental, o botão de pausa oculto e o tilt de −7° registrados na Build 01.12.2.

Stage/camera → tilt → rotor único → 12 lâminas continuam com a mesma estrutura.
O catálogo, as duas faces decorativas, `preserve-3d`, perspective, raio, dimensões,
`rotateY(angle) translateZ(radius) rotateY(90deg)` e vão frontal permanecem.
Step: 30°; frontGapOffset: 15°. A imagem ativa permanece independente à esquerda.
Não há extração física, novos assets, dependências ou alterações de outras seções.

Arquivos alterados:

- `script.js`: RAF ambiental, pausa e integração angular com a navegação existente.
- `styles.css`: copy visível durante busy no modo radial, tilt e `will-change`.
- `BUILD-01.12.3.md`: este registro.

HTML, AGENTS.md, README, builds anteriores, assets e configuração Vercel intactos.
Nenhuma branch ou worktree adicional foi criada.

## Movimento ambiental e ângulo compartilhado

Velocidade nominal: **2,5°/s em Y negativo**, uma volta a cada **144 segundos**
(2min24s) enquanto o movimento estiver ativo. Não altera `activeIndex`, imagem,
título, descrição, CTA, contador ou estado ARIA da seleção.

Um único `requestAnimationFrame` usa `collectionState.wheelRotation`. A única
escrita DOM no loop é `transform: rotateY(...)` do rotor; não mede layout,
não modifica as lâminas e não cria loops por item. Delta de tempo limitado a 64ms
evita avanço grande após um frame atrasado. Ao pausar, o RAF é cancelado e o
relógio é limpo; o primeiro frame retomado conserva o ângulo anterior, sem
acumular o tempo de pausa. `will-change` fica somente no rotor durante movimento.

O estado centralizado existente conserva sua estrutura e suas flags. O rotor
pode acumular voltas; pausas e resize dentro do compacto não normalizam o ângulo
para a direção ativa. Na entrada do modo compacto, o item selecionado é alinhado
à orientação equivalente mais próxima, inclusive após navegação no desktop.

## Navegação manual

O clique captura o último ângulo realmente escrito pelo RAF e pausa o ambiente.
O destino mantém a fórmula V4, escolhendo a representação equivalente mais próxima:

```text
canonical = -destination * 30° - 15°
delta = ((canonical - current + 180°) mod 360°, positivo) - 180°
target = current + delta
```

O deslocamento tem no máximo 180°, mesmo após várias voltas ambientais. Botões
continuam selecionando exatamente uma direção, com wrap; Home/End preservam seus
destinos. O ângulo de assentamento respeita step e vão frontal.

A Web Animations API controla somente o rotor durante **850ms**, com o easing
existente `cubic-bezier(.22,.8,.18,1)`. Nesse intervalo o RAF permanece suspenso.
O ângulo de origem fica no estado até o assentamento, quando o destino equivalente
é consolidado sem normalização para outra volta. Bloqueio de entradas durante o
giro, `aria-disabled`, `aria-busy` e geração de transição continuam funcionando.
Callbacks de animações canceladas não podem modificar uma escolha posterior.

Ao assentar, a pausa de interação é renovada: **700ms** antes de tentar retomar.
Isso evita que o timer de pointerup, iniciado antes do fim dos 850ms, libere o
ambiente cedo demais. A retomada depende de todas as outras condições de pausa.
Interrupções por visibilidade, resize ou reduced motion consolidam a seleção
pretendida e cancelam a animação pendente, como na base.

## Pausa e acessibilidade

Reutilizados `pauseState`, `visibilityState`, IntersectionObserver, foco e eventos
de ponteiro existentes. Ambiente suspenso quando:

- Documento oculto ou Coleção fora da viewport.
- Navegação manual em andamento ou espera de retomada.
- Pausa manual, interação de ponteiro, hover de mouse sobre o mecanismo ou foco
  no conteúdo da Coleção.
- Reduced motion ativo ou modo desktop.

O botão AVERO existente foi reativado no compacto. Mantém área de toque ≥44px,
`aria-pressed` associado à pausa manual, label “Pausar movimento do conjunto” ou
“Retomar movimento do conjunto” e ícone correspondente. Não confunde uma pausa
automática com a preferência manual. Fica oculto em reduced motion e no desktop.

Com `prefers-reduced-motion: reduce`, não há RAF ambiental nem giro manual suave.
A geometria permanece 3D estática e a seleção muda diretamente, com copy imediata.
Teclado, foco visível, status, contador e links continuam funcionais. As lâminas
permanecem previews decorativos `aria-hidden`/`inert`, fora da tabulação.

## Resposta da copy

Imagem ativa, título, descrição, CTA, contador e ARIA são atualizados juntos no
início da navegação. A copy aparece no próximo paint, sem microfade ou espera pelo
rotor. No teste local de 390px, a copy estava visível no primeiro frame observado,
aproximadamente **7ms** após o clique, com opacidade 1; é uma medição local, não uma garantia
de latência em todos os dispositivos. A transição CSS da copy radial dura 0ms.

A regra global `.collection-system[aria-busy="true"] .collection-piece-copy`
continua intacta para o desktop. Apenas o seletor da peça ativa dentro de
`.collection-system.is-enhanced.is-radial`, no media query até 900px, passa a
definir `opacity: 1`, `visibility: visible` e `transition: none`. A copy não
fica invisível durante os 850ms de `aria-busy`; o status de ocupação continua
representando a navegação do rotor.

## Comparação do tilt

Foram comparados visualmente **−7°, −10° e −12°**, em **390, 360 e 320px**.
Escolhido: **`rotateX(-10deg)`** no container global de tilt. Reforça a leitura
das superfícies superiores/recuadas, conservando separação, vazio central e
protagonismo do destaque. −12° aumentou a abertura sem benefício suficiente
para esta rodada; a opção conservadora de −10° foi mantida.

Todas as três alternativas couberam no palco nessas larguras. Com −10°, o rotor
também foi verificado em toda a volta ambiental e nos frames intermediários
da navegação, sem clipping necessário para caber ou invasão da copy. Não foram
alteradas poses locais, dimensões, raio, câmera ou breakpoints da Build 01.12.2.

## QA

Validação local em Chromium com Playwright, Montserrat carregada por HTTPS com
validação TLS e imagens originais decodificadas antes das capturas.

- 390px primeiro; depois 430, 360, 320, 768, 900, 901, 1024, 1280 e 1440px.
  Transições adjacentes também verificadas em 431, 700 e 701px.
- Todas as 12 seleções nas larguras compactas: zero overflow horizontal, rotor
  contido no palco, destaque dominante, copy protegida e controles tocáveis.
- 432 orientações ambientais medidas: passo de 5° em toda a volta, nas seis
  larguras compactas principais. Sem overflow, clipping do rotor ou invasão da copy.
- 360 frames de navegação: dez casos × seis pontos × seis larguras compactas.
  Casos 01 → 02, 02 → 03, 11 → 12, 12 → 01, anterior 01 → 12, Home/End e ângulos
  ambientais deslocados, inclusive após várias voltas. Origem visual preservada,
  caminho curto, uma animação de 850ms e transforms locais das lâminas constantes.
- Copy visível no primeiro frame e durante o giro, incluindo 120, 180, 425 e
  800ms. Conteúdo e contador sincronizados, sem bloqueio visual pelo busy state.
- Velocidade ambiental medida em aproximadamente 2,49–2,51°/s, sem trocar seleção.
- Pausa manual, viewport, documento oculto, retomada e resize ocioso conservam o
  ângulo acumulado. Espera após assentamento e retomada suave confirmadas.
- Instrumentação do RAF ambiental: máximo de um callback pendente, zero leituras
  de layout/estilo no loop e zero avanço angular no primeiro frame de cada retomada.
- Ciclo completo 01 → 12 → 01 com giros nativos, anterior em 01 e vinte cliques
  extras durante uma transição: sem avanço adicional ou estado intermediário preso.
- ArrowLeft/Right, Home/End, foco visível, ARIA, reduced motion e interrupção de
  giro seguida de nova navegação: callbacks antigos ignorados.
- Cruzamento 900/901px durante o giro: destino preservado, rotor oculto no desktop
  e peças sem transforms inline residuais.
- Comparação com a base: 363 elementos externos à Coleção por largura compacta
  e 503 elementos por largura desktop em 901, 1024, 1280 e 1440px com medidas e
  estilos auditados idênticos. Coleção desktop e demais seções preservadas.
- Catálogo, estrutura de estado, fábrica radial, medidas/câmera, navegação desktop,
  restante do JavaScript, CSS anterior ao bloco radial e HTML comparados com a base.
- Menu mobile, navegação interna, CTA ativo, projetos, seleção de serviços,
  campos obrigatórios, acentos/quebras de linha e URL/link alternativo WhatsApp
  verificados por interceptação, sem enviar mensagem. Fallback sem JavaScript
  conserva os 12 links acessíveis.
- Sem erros JavaScript ou de console nos cenários testados.
- HTTP 200 e conteúdo não vazio em 20 rotas: página, CSS, JavaScript e 17 assets.
- `node --check script.js`, `git diff --check` e revisão de escopo aprovados.

## Limitações e publicação

QA em Chromium; Safari/iOS e dispositivos físicos não foram testados. Aba oculta
foi validada com o handler real de `visibilitychange` e `document.hidden`
controlado, pois o navegador headless mantém abas visíveis. Assets provisórios
continuam com a repetição existente. Não houve extração física ou redesign.

A entrega requer commit/push nesta mesma branch e confirmação do deployment
Vercel de preview após esse push. A URL e o estado do novo deployment são
informados na entrega; QA local não substitui essa confirmação.

Branches protegidas preservadas nos checkpoints: `main` em
`dd9257f9c2c42d28d421a300727d6aef148f4b63`, `build-01-12-collection-3d` em
`a8346e2e95b1a62e1e5a095e72d323b5f22b7ab9` e `build-01-2-refino-visual` em
`93b6e75ce02e1955e324ff232ed89e2c41958972`. Sem merge ou promoção para produção.
