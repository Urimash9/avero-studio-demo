# Build 01.16B.3 — energia contínua nas linhas

## Base e escopo

- Branch existente `build-01-14-palette-b-home`; HEAD aprovado antes da edição `0f72b36da6837d5fd094b22b41dd6c8fd5198253`.
- Pedido atual: comportamento visual das linhas de Posicionamento e Método, com preservação integral da Coleção e da Home.
- Serviços já estavam sem 01/02/03/04 após 01.16B.2. Confirmada ausência em todos os breakpoints; nenhum índice novo removido ou texto alterado nesta rodada.
- HTML e assets permanecem idênticos. Kicker, título, descrição e CTA dos Serviços conservam o alinhamento existente; subtítulo e título têm a mesma borda esquerda.

## Arquitetura visual

- Path estrutural original independente: mesmos `d`, espessura, gradientes e posições. Opacity respira suavemente entre .86 e 1 em 5.2s nos pilares e 6.1s no Método.
- Uma cópia decorativa do próprio path acrescenta radiância muito baixa (.06–.16), no mesmo ritmo da base; sombra de 1px. Nenhum shape ou stroke-width é animado.
- Pulso reconstruído como envelope graduado: seis strokes sobrepostos, com a mesma borda de avanço, formam cabeça/corpo/rastro de luminosidade decrescente. Comprimentos normalizados 12/24/42/64/88/112; presença máxima por camada .88/.46/.29/.19/.13/.09.
- Halo separado, curto e localizado: stroke constante de 1.8px, blur de 1.1px e sombra de .8px. Leitura de luz cerca de 1–3px fora do traço, sem filtro pesado de toda a seção. As seis camadas de corpo não usam filtros.
- Todos os dashes têm período total 1800, evitando bordas de avanço e repetições diferentes entre as camadas. O envelope entra discreto, ganha intensidade e se dissolve antes do reinício.
- Prata e aquecimento champagne do gradiente anterior preservados. Nenhuma mudança nos tokens da paleta.

## Continuidade e nós

- Ciclos: Posicionamento 6.4s; Método 7.3s com fase -2.1s. Pequena variação de velocidade ao longo do percurso, sem parada ou overshoot. Viagem até 94% do ciclo; reinício invisível após a dissolução.
- Pilares mobile continuam nos três segmentos originais, com delays 0/1.9/3.8s. Envelope proporcional ao percurso curto; cada viagem ocupa 29% do ciclo.
- Pico dos nós calculado pela distância no path e pelo mesmo mapa de tempo/distância da viagem. Intensidade até .64, sem alterar raio, posição ou tamanho; reforço dissipa em cerca de .58s no Posicionamento e .66s no Método.
- Removido o gatilho por IntersectionObserver: relógios CSS são contínuos, independentes de scroll ou interação. Não existe loop JavaScript para atualizar a animação.
- Resize apenas de altura ou dentro da mesma variante não reinicia os relógios. Na troca desktop/mobile dos pilares, os relógios decorativos são reconciliados; medições ocorrem somente na inicialização/resize.
- `prefers-reduced-motion: reduce` desliga radiância, pulso e resposta dos nós e deixa a base estática com opacity 1. Pontos e cores originais continuam presentes.

## QA e evidências

- Chromium / Home oficial pelo Color Lab (`view=home`, sem overrides de tema): 320, 360, 390, 430, 768, 900, 901, 1024, 1280 e 1440px. Zero overflow horizontal e índices de Serviços ausentes.
- Em todos os enquadramentos medidos, base e pulso preservam os sete paths existentes e o núcleo tem stroke computado de 1px. Os quatro títulos do Método permanecem legíveis e na ordem aprovada.
- Método em 1280px: comparação com a base confirma dimensões, coordenadas dos quatro títulos e três paths estruturalmente idênticos. Inspeção visual desktop e mobile, incluindo os pilares compactos e o Método em 390px.
- Amostras em momentos diferentes, sem scroll/interação: offset progride, radiância/opacidade variam e o nó de Visão ganha reforço momentâneo. Camadas mantêm a mesma frente de avanço e cauda menos intensa. Nenhum congelamento ou glitch observado na inspeção disponível.
- Menu mobile abre e fecha com Escape; Coleção muda com botão e ArrowRight e limpa os proxies; Projetos avança para Vértice Clínica; Serviços destaca Landing Pages e sua ação seleciona o serviço no formulário. Nenhuma mensagem enviada.
- Console sem erros da aplicação observados; avisos da extensão separados. HTTP local da raiz, CSS e JS retorna 200.
- Node/VM com a função real: resize de altura deixa de reiniciar o pulso (base falha nesse critério); mudança de variante reconcilia; picos dos nós correspondem às posições da cabeça nas keyframes CSS; paths e raios originais preservados. Verificação das regras de reduced motion para todas as camadas novas.
- `node --check script.js`, `git diff --check` e revisão final do diff aprovados. Conteúdo do HTML, JavaScript a partir da Coleção e CSS fora do bloco de linhas/reduced motion idênticos à base.

## Limites e preservação

- Sem aparelho físico, Safari/iOS, perfil de FPS/GPU ou emulação nativa de reduced motion. O suporte a movimento reduzido foi conferido nas regras e testes controlados; não se afirma ausência absoluta de jank em todo hardware.
- Hero, wordmark, paleta B, curva e palavras do Método, estrutura/opacity/lógica da Coleção, Serviços, Projetos, Perspectiva, CTA, formulário e Footer preservados.
- Main intacta em `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Sem merge ou promoção para produção.
