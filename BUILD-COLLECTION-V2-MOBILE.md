# Coleção Avero V2 — apresentação mobile

## Base e escopo

Branch `feature/colecao-avero-v2-assets`, base `9e673f17e0a192d46108f8cd7017b94ede133355`.
Alteração limitada à apresentação e navegação por gesto da Coleção até 900px.
HTML da Home, conteúdo, ordem, todos os assets e demais seções preservados.

## Apresentação

O destaque anterior usava 44% da largura, limitado a 240px, com altura 1,05×largura.
Em 390px isso produzia aproximadamente 147×155px e recorte lateral dos arquivos 3:2.

O destaque passa a usar a largura útil integral e proporção 3:2, centralizado,
com `object-fit: contain`. Não há focal point individual, zoom ou reexportação.
O rotor mantém câmera, inclinação, rotação, profundidade e linguagem radial;
sua largura mobile é 34% da área, limitada a 180px, e fica ao lado da legenda,
abaixo do destaque. A opacidade por profundidade e o motion não foram alterados.
A área da coleção reserva espaço para títulos, CTA, rotor e controles.

Valores e regras desktop, acima de 900px, permanecem iguais à base.
O Color Lab ganhou somente opções 375/412px para conferir os viewports solicitados;
essa mudança não altera a Home.

## Gesto

A base possuía botões e teclado, mas não swipe/drag na Coleção.
Pointer Events mobile encaminham o gesto horizontal à mesma função de navegação.
Intenção horizontal exige distância maior que a vertical; gesto curto, scroll
vertical, CTA, ponteiro secundário ou cancelamento não iniciam troca.
Captura começa somente após intenção horizontal. `pan-y pinch-zoom` preserva
scroll e zoom nativos. Desktop ignora este gesto. Resize cancela sua captura.
Fila de navegação, timing, easing, copy, retorno físico, ambiente e reduced motion
continuam na máquina de estados existente.

## Verificações locais

- `node --check script.js` e `git diff --check` aprovados.
- Harness Node/VM com funções reais: swipe touch, scroll vertical, CTA,
  cancelamento, liberação da captura e isolamento desktop aprovados.
- Regressão da troca: overlap, copy/contador/ARIA, destino acumulado, resize,
  viewport, reduced motion, retomada e projeção/crop 3:2 aprovados.
- Homologação visual em preview deve ser realizada antes de qualquer redesign.
- Sem aparelho físico ou Safari/iOS neste ambiente.

Sem merge, alteração de main ou promoção para produção.

## QA em preview

- Chromium / Home oficial no Color Lab: 360, 375, 390, 412, 430, 768, 900 e 901px,
  sem overflow horizontal. Os 12 universos foram percorridos e carregados.
- Em 390px o destaque passou de 147×155px para 335×223px; todos usam contain,
  sem deformação, crop individual ou troca de arquivo. Títulos e CTA preservados.
- Arraste real no navegador avançou Gastronomia → Arquitetura; botões,
  Home/End e retorno anterior conferidos. Menu abre/fecha com Escape.
- A intenção de gesto horizontal remove o foco do container de teclado quando
  necessário, para não reter sua pausa deliberada do ambiente. Foco de CTA e
  navegação por teclado preservados; esse comportamento tem teste de regressão.
- Comparação DOM com a base em 1024, 1280 e 1440px: visual, posição do card,
  dimensão da lista, raio/câmera/inclinação/posição do rotor, posições e alturas
  de todas as seções da Home idênticos.
- Sem erro da aplicação observado. Avisos de metadata da extensão do navegador
  foram diferenciados dos logs do site. Sem proxies ou aria-busy residuais.
- Capturas separadas de antes/depois em 390px disponibilizadas para homologação.
- Touch coberto no harness de eventos; arraste em Chromium. Safari/iPhone e
  Android físicos não estavam disponíveis. Não houve nova avaliação criativa.
