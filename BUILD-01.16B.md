# Build 01.16B — luz nas linhas + fluidez da Coleção radial

## Base e limite

- Branch existente: `build-01-14-palette-b-home`.
- HEAD limpo, confirmado local/origin antes de editar: `4422322f2cc65391a281d387095f2171cc1a9531` (01.16A.2).
- Fontes: AGENTS, README, BUILD-01.15, BUILD-01.16A.2 e BUILD-01.12.4; decisões de geometria e paleta aprovadas preservadas.
- Escopo: highlights das linhas de Posicionamento/Método e motion/hierarquia do rotor. Sem íris, novos assets, dependências, alterações de conteúdo ou redesign.

## Pulso luminoso

- `createLinePulses` adiciona três paths decorativos (cauda, corpo, núcleo) a cada SVG existente: sete SVGs/21 highlights incluindo variantes ocultas. O `d` é copiado literalmente; paths estruturais, nodes e gradientes originais ficam independentes e intactos.
- Apenas os SVGs aprovados `.pillar-line`, `.pillar-mobile-segment` e `.method-path`; nenhuma linha de Serviços/Hero/Footer recebe efeito.
- Highlights normalizados com `pathLength=1000`; `stroke-dashoffset` via CSS percorre o caminho. Valores explícitos em px permitem interpolação contínua, sem passos discretos.
- Stroke fixo de 1px com `vector-effect:non-scaling-stroke`, sem mudança de largura, espessura ou shape. Halo pequeno: `drop-shadow(0 0 1.2px var(--silver))`.
- Núcleo/corpo/cauda com opacidades 1/.48/.22; comprimentos 18/44/74 e atrasos espaciais 0/22/60. Nos segmentos curtos de Posicionamento mobile: 60/130/220 e atrasos 0/65/180, para a luz continuar legível em pixels reais.
- Temperatura: prata oficial `--silver`, champagne discreto `--champagne-light` próximo da região direita; sem azul dominante ou neon novo.
- Posicionamento: **6.4s** por ciclo. Mobile passa pelos três segmentos existentes, com delays 0/1.9/3.8s; não redesenha sua conexão.
- Método: **7.3s**, fase inicial −2.1s. As duas seções têm ritmos diferentes.
- Fade no início/fim e breve intervalo ao reiniciar. IntersectionObserver pausa highlights fora da área visível; dentro dela continuam sem depender de scroll, mouse ou toque. Variantes ocultas não pintam.
- `prefers-reduced-motion:reduce`: paths de highlight com `display:none` e `animation:none!important`; linha estrutural e todos os pontos/cores permanecem estáticos.

## Rotor, extração e retorno

- Raio, câmera, inclinação (−10° compacto / −30° desktop), dimensões e meia-roda desktop intactos. Conteúdo, 12 direções, imagens, ordem, labels e controles mantidos.
- Opacidade por face, sem aplicar opacity ao grupo 3D: **.42–.72**, conforme profundidade calculada pelo cosseno do ângulo. Lâminas frontais têm mais presença, distantes ficam mais translúcidas. Mudanças ambientais abaixo de .004 são agrupadas, sem alterar a precisão do ângulo.
- Lâmina selecionada ganha presença até **.90** no alinhamento; proxy incoming chega a 1. Destaque mantém opacidade 1 e protagonismo. Geometria tridimensional não é achatada.
- Alinhamento proporcional ao ângulo: até 30° = `d * 280 / 30`; acima = `280 + (d - 30) * 220 / 150`, até 500ms. Sem duração mínima artificial em deslocamento zero.
- Easing de alinhamento: `cubic-bezier(.3,.55,.25,1)`.
- Travessia incoming: **780ms**, easing `cubic-bezier(.25,.65,.2,1)`.
- Outgoing: mantém a posição inicial por **180ms** (`fill:both`), depois retorna em 600ms. Ambos terminam juntos. O destaque não fica vazio quando a extração começa.
- Projeção dos quatro cantos e homografias preservadas; 17 poses em vez de nove. Abertura/redução usa smoothstep para diminuir mudanças bruscas de orientação/proporção nas extremidades. Trajetórias espaciais e distinção entre entrada/retorno mantidas.
- Retirado brightness animado; presença acompanha opacity. Crop nativo/fallback e duas imagens proxy mantidos.
- Copy muda aos **452ms** de travessia, perto de a peça assumir protagonismo. Texto anterior fica em 1 e suaviza até .72; próximo entra de .72 para 1 em 180ms, sem estado de texto vazio. Contador/ARIA/anúncio continuam juntos com a seleção.
- Sem pausa fixa de 450ms após o assentamento. Retomada ambiental a partir do mesmo ângulo, com rampa smoothstep de velocidade por **600ms**, chegando aos **3.2°/s** aprovados.
- Imagens adjacentes decodificadas antecipadamente quando o conjunto está ativo/visível; cache por URL. Destino distante prepara imagem em paralelo ao alinhamento antes da extração. Sem substituir arquivos ou criar carregamento por frame.
- Pausas por foco, mouse, botão, viewport, documento oculto, interrupção por scroll/resize e reduced motion preservadas. Cursor dos controles não sugere travamento durante busy.

## QA e evidência

- Chromium / Home oficial pelo Color Lab, sem overrides de tema. Implementação final: `3b0a379aff2910788888373d24835d439c76decb`.
- **320, 360, 390, 430, 768, 900, 901, 1024, 1280, 1440px**: scrollWidth = clientWidth, zero imagens quebradas, `d` dos sete paths idênticos à base e posições locais dos textos do Método idênticas. Dimensões de Hero, Método, Perspectiva, CTA e Footer idênticas em todos os tamanhos.
- Pulso verificado por estilos computados em desktop/mobile: ciclos 6.4/7.3s, stroke 1px, gradientes oficiais, fases dos três segmentos mobile e dashoffset avançando continuamente entre observações com a tela parada.
- Inspeção visual de Posicionamento desktop/mobile, Método desktop/mobile e Coleção 1280/390. Inclinação preservada nos dez tamanhos, lâminas visíveis e destaque mais presente.
- Navegação desktop 01→02, End→12 e ArrowRight→01; compacto 01→02. Resize durante troca compacto→desktop termina na direção pretendida, busy limpo, zero proxies restantes e imagem principal com opacity 1.
- Menu abre e fecha por Escape; Projetos avança para Vértice Clínica; chip Coleção alterna aria-pressed. Campos do formulário editáveis, nenhum envio de mensagem.
- Teste Node/VM com funções reais e DOM/WAAPI controlados: 36 escolhas em reduced motion preservam a permutação das 12 lâminas, sem RAF ou proxies; overlap/commit de copy/limpeza da troca normal; pointerup/pointercancel liberam pausa; primeiro frame retomado sem salto, rampa chega à velocidade nominal; 17 poses finitas e quatro cantos iniciais/finais exatos em incoming/outgoing.
- Console: nenhum erro da aplicação observado; erros de metadata da extensão separados.
- `node --check script.js`, `git diff --check` e revisão do diff aprovados. HTML, assets e JS externo ao bloco de pulso/Coleção idênticos à base.

## Performance e limites

- Sem biblioteca nova, canvas/WebGL, blur de área grande ou animação contínua de width/height/top/left. Medidas da transferência ocorrem antes dos proxies; loop ambiental não lê layout. Animações usam transforms, opacity e dashoffset em SVGs pequenos.
- Reduced motion e handlers de toque/cancelamento validados em teste controlado; esta ferramenta não oferece emulação visual nativa dessa preferência nem toque físico. QA de interação no browser usa clique/teclado em viewports mobile e desktop.
- Sem aparelho físico/Safari/iOS ou perfil de FPS/GPU. Não se afirma medição de frames renderizados; fluidez foi avaliada visualmente e pela arquitetura/testes das trajetórias e estado.
- Preview de implementação READY: `https://avero-studio-demo-jt3ze0k8o-john-e7bd.vercel.app/`. Fechamento documental gera preview visualmente idêntico; commit/URL finais na entrega.
- Main intacta em `dd9257f9c2c42d28d421a300727d6aef148f4b63`; sem merge ou promoção para produção. Hero, Serviços, Perspectiva, Footer, wordmark e paleta preservados.
- Parar após esta build; não iniciar motion de íris ou outra rodada.
