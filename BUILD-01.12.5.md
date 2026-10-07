# AVERO Studio — Build 01.12.5 / Velocidade ambiente do rotor

Branch: `build-01-12-2-v4-radial`.
Base: Build 01.12.4, commit `4c879fbae394c79368661656ba6db9cf416a2e8b`.

## Alteração aprovada

A constante `collectionAmbientSpeed` passa de **2,5°/s para 3,2°/s**.
Uma volta ambiente completa corresponde agora a **112,5 segundos** de movimento
ativo, em vez de 144 segundos. O comentário da constante acompanha esse valor.

Essa constante é consumida somente pelo RAF ambiente `collectionFrame`.
O loop, suas condições de execução e todos os demais trechos de JavaScript
permanecem idênticos à base. Não há outro transform, timer ou animação acelerado.

## Preservação

- Geometria V4, stage/câmera, 12 lâminas, raio, dimensões, perspective,
  tilt −10° e front gap intactos.
- Troca física e `radialBladeContent` intactos: extraction gate −60°,
  cálculo/duração proporcional do alinhamento, travessia de 600ms,
  atualização comercial/copy aos 140ms e retomada após 450ms.
- Navegação manual, teclado, contador, ARIA e botão de pausa preservados.
- Pausas por document.hidden, viewport, interação, ponteiro/foco, pausa manual,
  reduced motion e transferência em andamento permanecem sem alterações.
- Movimento ambiente não modifica activeIndex, imagem principal, título ou CTA.
- Desktop, outras seções, CSS, HTML, assets e configurações intactos.

## QA

Chromium/Playwright, primeiro em **390px**, depois **320, 430 e 900px**.
Transição para desktop conferida em **901px**.

- Velocidade medida pela variação angular entre frames: **3,2°/s nas quatro
  larguras compactas**; item ativo e contador permanecem estáveis no ambiente.
- Pausa manual e retomada sem reinicialização angular verificadas nas quatro
  larguras, assim como reduced motion e navegação por teclado com wrap.
- Em 390px, aba oculta, saída/entrada da viewport e pausas por ponteiro/interação
  verificadas; o rotor para e retoma a partir de seu ângulo físico.
- Navegação manual suspende o RAF, mantém dois proxies e travessia de 600ms,
  atualiza a copy cedo, permuta o mapa e remove os elementos temporários.
  Pausa após o assentamento preservada.
- Zero overflow horizontal e zero erros JavaScript/console nos cenários testados.
  Em 901px não há stage radial ou RAF ambiente.
- Comparação integral de `script.js` com a base: somente a linha da constante
  e seu comentário diferem. Todos os tempos e as condições de pausa são idênticos.
- HTTP 200 e conteúdo não vazio na página, CSS e JavaScript locais.
- `node --check script.js` e `git diff --check` aprovados.

Arquivos desta build: `script.js` e `BUILD-01.12.5.md`.

## Limitações e publicação

QA local em Chromium; Safari/iOS e dispositivos físicos não testados.
Document.hidden controlado no teste com o handler real de visibilitychange,
pois Chromium headless mantém abas visíveis.

Commit/push somente na branch indicada. Preview e deployment Vercel confirmados
na entrega após o push. Main preservada em
`dd9257f9c2c42d28d421a300727d6aef148f4b63`, sem merge ou promoção para produção.
