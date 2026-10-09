# Coleção — refinamento final do rotor e da troca física

## Base e escopo

- Branch existente `build-01-14-palette-b-home`, base aprovada local/origin `3f4af4b5779eb80b89afcc4ebf98bfe5de120341`.
- Alterados somente o trecho da Coleção em `script.js` e este registro. Nenhum CSS, HTML, texto, asset, wordmark, paleta ou outra seção mudou. Os pulsos da build 01.16B.3 continuam idênticos.
- Composições compacta/mobile e meia-roda desktop preservadas: mesmas posições, dimensões, câmera, raio, inclinação e profundidade.
- **Opacidade do rotor preservada**: função por profundidade .28–.54, peça em extração .82 e destaque 1. Nenhuma redução ou nova direção visual de transparência.

## Causa da sensação de etapas separadas

- O alinhamento precisava terminar antes da construção/início da transferência. Mesmo com velocidade final contínua, a peça esperava a roda chegar à porta para começar a sair.
- Alinhamento, espera de decode e transferência tinham animações de roda separadas, canceladas/recriadas em cada fronteira.
- Pointerdown pausava o ambiente antecipadamente; o retorno aguardava 220ms. A perspectiva aplicava smoothstep dentro de outro easing, retardando a leitura da extração.
- Copy dependia de setTimeout; cancelamento de animações criadas depois da captura das Promises podia deixar rejeição sem tratamento.

## Uma troca, um relógio

- Estado `preparing` decodifica o asset conservando o card atual e o giro ambiente. Imagens adjacentes continuam aquecidas pelo cache. Se a rede demorar, a troca aguarda uma imagem decodificada; não congela a roda nem esvazia o palco.
- Uma única animação de roda cobre alinhamento + extração + percurso + assentamento. Todos os handles recebem o mesmo `document.timeline.currentTime` como origem.
- Alinhamento **180–440ms**, proporcional à distância angular. Extração começa **160ms antes** do final do alinhamento.
- Incoming: **900ms**. Outgoing começa **120ms depois do incoming** e retorna em **780ms**; ambos terminam juntos. Duração total **920–1180ms**, excluindo uma eventual espera de decode.
- Easing das duas superfícies: **`cubic-bezier(.32,.12,.28,.92)`**. A roda usa poses Hermite amostradas, incluindo exatamente os instantes de extração, chegada à porta e encaixe. Interpolação linear entre essas poses não implica velocidade linear do percurso.
- Hermite preserva velocidade ambiente na entrada do alinhamento e −3.2°/s na saída, sem parada obrigatória entre fases.

## Entrada, retorno e enquadramento

- A superfície incoming nasce nos quatro cantos projetados da peça ainda em movimento, antes de o alinhamento terminar. O original entrega sua visibilidade no mesmo relógio, sem duplicação ou intervalo vazio na origem.
- Quatro medidas de face antes do playback fornecem origem, tangente inicial, destino futuro e tangente final. Não há getBoundingClientRect em frames contínuos.
- Duas superfícies temporárias fazem a travessia: incoming até o destaque; outgoing do destaque até a mesma vaga, na pose futura da roda.
- Homografia conserva os cantos de origem/destino; 33 poses interpolam perspectiva e arco. Tangentes de início/encaixe acompanham a roda e compensam a curva de easing, aplicada uma vez. O arco/profundidade tem derivada nula nas extremidades.
- A imagem conserva o asset e object-position central. Escalas internas de crop acompanham a mudança de proporção da moldura, sem distorcer o asset. As seis imagens existentes são 1536×1152; fallback de proporção 4:3 cobre uma imagem ainda sem dimensões no elemento lazy.
- Brightness apenas das imagens temporárias acompanha .86 da face → 1 do palco e o caminho inverso. CSS/brilho/opacity do rotor não mudaram; sem blur ou filtro grande.
- O card anterior permanece atrás das superfícies até a chegada assumir o palco, com overlap de opacity. O próximo original só se revela quando sua superfície termina no mesmo enquadramento.

## Copy, controles e finalização

- Copy/CTA, contador, ARIA e activeIndex mudam juntos **648ms após o início da extração**: 72% dos 900ms, quando o incoming já assume o destaque. Copy suaviza de .72 a 1 em 180ms.
- O marco usa `Animation.finished`, compartilhando o relógio visual, em vez de um timer independente. Cancelamentos de todos os handles são tratados, inclusive o crossfade tardio da copy.
- Inputs durante a troca acumulam um único destino seguinte. Anterior/próximo, Home/End e setas permanecem disponíveis; não há cadeias simultâneas nem controles com cursor de espera.
- Pointer/touch não pausam antecipadamente o ambiente; nenhuma captura de gesto ou prevenção de scroll vertical foi adicionada. Pausa explícita e pausa por foco existentes continuam disponíveis.
- Ao concluir, roda/estado lógico preservam o ângulo final e a velocidade de **3.2°/s**. Handles e proxies são removidos e o ambiente continua sem reset angular ou rampa nova após uma troca normal.
- Resize de largura ou altura desktop reconcilia o destino e limpa a transferência. Resize apenas de altura mobile, típico da barra do navegador, preserva a troca. Saída do viewport/documento e mudança de reduced motion invalidam o proprietário antigo antes de finalizar.
- Se o cancelamento ocorre em `preparing`, conserva-se o ângulo ambiente atual, não um ângulo capturado antes do decode.
- **Reduced motion**: sem ambiente nem percurso complexo; o item solicitado, copy/contador/ARIA e a permutação das 12 peças chegam diretamente ao estado final correto.

## Verificação

- `node --check script.js` e `git diff --check` aprovados.
- HTTP local: `/`, `/script.js`, `/styles.css` e imagens da Coleção com status 200 e conteúdo completo lido.
- Node/VM, funções reais com relógio/DOM/WAAPI controlados: relógio único e overlap; chegada simultânea; ausência de parada na roda; velocidade/ângulo da retomada; copy/contador/ARIA; destino acumulado em entradas rápidas; decode atrasado e cancelado; resize; saída/retorno do viewport; 36 trocas reduced motion conservando a permutação; matrizes finitas e quatro cantos exatos nas extremidades com três proporções de imagem.
- A base anterior falha na reprodução porque ainda está em `aligning` quando a extração já deveria estar compondo a mesma ação; a implementação final passa. Comparação textual confirma função de opacidade e todo JS fora da Coleção idênticos à base.
- Chromium / Home oficial pelo Color Lab, sem override de tema: **360, 390, 430, 1024, 1280 e 1440px**. Sem overflow horizontal ou imagens quebradas. Próximo/anterior, cliques consecutivos, Home/End/setas, resize entre compacto/desktop, saída/retorno ao viewport e pausa/retomada explícita conferidos.
- Estado final coerente: card/counter correspondentes, aria-busy removido, zero proxies residuais e imagem do destaque com opacity 1. Movimento ambiente novamente ativo, com transform mudando ao longo do tempo.
- Regressão: menu mobile abre/fecha com Escape, Projetos navega, link de Serviço leva ao contato e seleciona Landing page. Nenhuma mensagem de teste enviada.
- Console sem erro da aplicação observado; notificações de metadata da extensão do navegador foram diferenciadas do site. Diff revisado e restrito ao comportamento da Coleção.

## Limites e preservação

- Sem perfil quantitativo de FPS/GPU ou aparelho físico. A inspeção Chromium e os testes de relógio controlado não garantem ausência absoluta de jank em todo hardware.
- Touch/pointer e reduced motion cobertos nas fronteiras de eventos/estado; sem ensaio em Safari/iOS ou preferência nativa do sistema operacional. A validação mobile no navegador usa os breakpoints reais da Home.
- Uma rede fria ainda pode adiar a extração até o asset decodificar, mantendo card e ambiente vivos durante a espera.
- Hero, Serviços, Projetos, Método, Perspectiva, CTA, Footer, assets, wordmark, paleta, textos e pulsos preservados. Main permanece `dd9257f9c2c42d28d421a300727d6aef148f4b63`; nenhum merge ou promoção para produção.
- Rodada encerrada neste escopo.
