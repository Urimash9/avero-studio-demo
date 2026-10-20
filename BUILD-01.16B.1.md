# Build 01.16B.1 — linhas vivas e continuidade da Coleção

## Base e escopo

- Branch existente: `build-01-14-palette-b-home`; base limpa local/origin `15285dd790deb8db1eaff5a8eabebeb1d2f7db07`.
- Revisão solicitada após 01.16B: respiração/energia das linhas e comportamento do rotor, sem redesign, mudanças de texto ou conteúdo.
- Apenas `script.js`, `styles.css` e este registro. HTML, assets, tokens da paleta, Hero, Serviços, Projetos, Perspectiva, CTA, formulário e Footer preservados.

## Energia e respiração

- Path estrutural continua separado, com o mesmo `d`, stroke e gradiente. Sua opacidade respira suavemente entre .82 e 1, em 4.8s no Posicionamento e 5.7s no Método. Nenhuma geometria ou espessura é animada.
- Pulso mais compacto: núcleo/corpo/cauda, com uma quarta camada de halo local. Núcleo com stroke constante de 1px; halo decorativo constante de 1.6px, blur de 1.3px e sombra de 1px. Luz escapa discretamente cerca de 1–3px, sem blur de uma área grande.
- Intensidade começa em 55% do máximo, cresce e suaviza antes de desaparecer; cauda com menor presença. O pulso continua pelos paths existentes em 6.4s / 7.3s, com fases distintas. Prata e champagne oficiais mantidos.
- Os três segmentos mobile de Posicionamento continuam sequenciais: delays 0/1.9/3.8s. Comprimentos menores e proporcionais ao segmento evitam uma barra comprida de luz.
- Método: cópias luminosas dos quatro círculos, sem alterar os originais. Chegada calculada pela distância percorrida no próprio path, com prata nas extremidades e champagne nos pontos já aquecidos.
- Pilares: camada luminosa no nó existente; chegada desktop calculada pela projeção do nó no path. No mobile, resposta acompanha o início de cada segmento. Reforço suave de opacity, sem scale/flare.
- Medidas dos nós apenas na inicialização/resize. A troca entre variantes reinicia os relógios decorativos juntos para evitar defasagem depois de um resize. IntersectionObserver pausa a animação fora da seção; com ela visível, o movimento independe de scroll/toque.
- Reduced motion: pulso, halo, respostas dos nós e respiração desligados; linha e pontos originais estáticos, com opacity 1.

## Continuidade do rotor

- Preservados raio, câmera, inclinações, posições, dimensões, meia-roda desktop e composição compacta. Nenhum asset, nome, label ou ordem mudou.
- Presença das faces por profundidade reduzida de .42–.72 para **.28–.54**, aplicada nas faces, preservando o grupo 3D. Peça selecionada chega a .82; incoming ganha opacity 1 e destaque permanece dominante.
- Alinhamento angular em até 440ms, proporcional à distância. 33 poses Hermite com velocidade final de −3.2°/s, para entrar no movimento lento sem uma parada na porta de saída.
- Decodificação em paralelo ao alinhamento. Se a imagem demora, uma rotação lenta continua; a extração usa o ângulo atual, sem congelar enquanto espera. Cache e aquecimento das imagens adjacentes preservados.
- Durante a transferência, a roda continua girando a 3.2°/s; destino do card anterior medido na pose futura. Incoming 860ms; outgoing segura o palco por 220ms e retorna em 640ms. Easing `cubic-bezier(.32,.05,.22,1)`.
- Copy, contador, ARIA e seleção mudam juntos aos 585ms, quando incoming assume protagonismo. Overlap evita vazio no destaque. Finalização limpa os proxies e mantém o ângulo/velocidade do movimento ambiente.
- Hover deixa a roda viva; pausa explícita e foco continuam disponíveis. Cliques/teclas durante busy são coalescidos em um próximo destino, em vez de ignorados. Apenas uma transferência pode existir por vez.
- Scroll acompanha a camada de transferência usando transform, em vez de finalizar instantaneamente. Resize só de altura (barra do navegador mobile) não encerra a troca; mudanças reais de largura continuam reconciliando a seleção.

## Verificação

- Chromium / Home oficial pelo Color Lab, sem override de tema: **320, 360, 390, 430, 768, 900, 901, 1024, 1280, 1440px**. Zero overflow horizontal e zero imagens quebradas. Inspeção do Método desktop/mobile, pilares mobile e Coleção desktop/mobile.
- Respiração computada entre .82 e 1, halo pequeno, nós respondendo e delays dos segmentos verificados. Sete paths-base e 12 círculos originais preservados; quatro camadas decorativas por SVG.
- Coleção: cliques consecutivos no compacto levam ao destino acumulado, End chega à direção 12, busy limpo, zero proxies e maincard opacity 1. Menu, navegação, Projetos e seleção no formulário revisados sem envio de mensagem.
- Node/VM com funções reais e tempo/DOM/WAAPI controlados: roda durante a transferência; imagem atrasada continua girando e extração começa na pose atual; entrada rápida enfileirada; scroll sem snap; overlap/copy/limpeza; 36 escolhas reduced motion preservam a permutação das 12 peças; pointerup/pointercancel liberam pausa; rampa ambiental e 17 homografias finitas com os quatro cantos finais exatos.
- Regressão: a base 01.16B falha na asserção de rotação contínua durante transferência; a revisão passa.
- `node --check script.js` e `git diff --check` aprovados. Diff restrito às animações/estado da coleção e registro. Sem novas dependências.

## Limites e preservação

- Sem erros da aplicação observados; logs da extensão e da tela de login Vercel separados dos logs da Home.
- Sem teste em aparelho físico, Safari/iOS, emulação visual nativa de reduced motion ou perfil de FPS/GPU. Toque/cancelamento e reduced motion foram testados de forma controlada. Não se afirma ausência absoluta de jank em todo hardware.
- Main permanece `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Sem merge, produção, motion de íris ou alterações em outras seções.
- Revisão encerrada após esta entrega.
