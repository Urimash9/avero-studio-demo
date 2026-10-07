# BUILD 01.13.1 — Hero + Método mobile

## Base e escopo

- Base: `4e25731f75971b3470d7309867f97cc4b69a230c`.
- Branch: `build-01-13-1-hero-method-refino`.
- Implementação visual validada: `31d14f74b85500828cf343395c6843de1431d413`.
- Alterações de produto limitadas a uma regra mobile da nebulosa e aos dois
  atributos `d` dos SVGs mobile do Método. Nenhum JavaScript ou asset alterado.

## Hero — extensão da atmosfera

Regra exclusiva para `max-width:700px`, preservando o breakpoint aprovado.
O pseudo-elemento `.hero-content:before` mantém o asset
`assets/avero-nebula-continuous-v1.webp`, `background-size:cover`, posição
`center 55%` e opacidade `0.55`.

Se a altura do conteúdo é H, a camada anterior tinha altura B = H − 100px
(insets de 65px acima e 35px abaixo). A nova área usa:

- `top:calc(73px - 8%)` = 65px − 8% de B;
- `bottom:calc(41px - 6%)` = 35px − 6% de B;
- altura resultante: 114% de B;
- máscara apenas nas extremidades:
  `linear-gradient(180deg,transparent,#000 16%,#000 76%,transparent)`.

Em 390px, a camada anterior media 556.75px. A nova mede aproximadamente
634.70px: sobe 44.55px (8%) e avança 33.41px (6%) abaixo. A atmosfera surge
mais cedo na headline, concentra textura nos CTAs/olho e se dissipa sobre
o texto inferior. Não há máscara interna, alteração cromática ou aumento
de opacidade. Olho, headline, CTAs de 54px, textos e assinatura não se movem.
Hero em 701px+ permanece idêntica à base.

## Método — tangentes contínuas

### Phone (`max-width:700px`)

O percurso continua passando pelos quatro nós originais:
`(75,26)`, `(362,135.5)`, `(362,245)`, `(75,354.5)`.
Os controles da aproximação de Direção, da volta direita e da saída de
Criação foram ajustados em conjunto para manter tangentes alinhadas.
Direção continua para a direita antes de contornar a área; a volta usa
dois Béziers com tangente vertical comum no extremo direito, sem reta longa.
Criação inicia o retorno para baixo/esquerda sem mudança brusca de direção.

Os dois segmentos de entrada e os dois segmentos finais permanecem
exatamente iguais. O término continua em `(0,368)`, à esquerda de Evolução,
sem passar sob “O lançamento não precisa ser o fim.”

### Compacto (`701px–900px`)

Preservados os nós `(75,99)`, `(370,190)`, `(370,256)`, `(75,342)`.
O pequeno `V190` e os controles que quebravam a tangência foram substituídos
por Béziers contínuos. A aproximação foi aberta acima da tipografia de
Direção após revisão em 768/900px. A saída de Criação mantém continuidade
até o segmento final original. Início `(0,74)` e término `(8,368)` intactos.

Nenhum índice, texto, offset das etapas, nó, cor, gradiente, glow ou regra
desktop do Método foi alterado. Verificação geométrica confirma continuidade
G1 nas junções relevantes e ausência de inversão de curvatura nos segmentos
ajustados; o trecho final aprovado foi preservado.

## QA

- Comparações antes/depois de Hero e Método em 390px capturadas e inspecionadas.
- Larguras auditadas: **390, 430, 360, 320, 768, 900, 901, 1024, 1280, 1440px**.
- Zero overflow horizontal da Home nas dez larguras medidas.
- Inspeção visual phone: nebulosa contínua, fades suaves, texto legível,
  CTAs sem quebra nova, olho sem deslocamento ou crop adicional.
- Inspeção visual Método: curva fluida, quatro marcos preservados,
  sem colisão com textos e retorno final à esquerda.
- Geometria e estilos computados da Hero/etapas e áreas preservadas comparados
  à base. Desktop comparado após carregamento estável; SVG desktop inalterado.
- Imagens carregadas, menu mobile pelo teclado, navegação interna,
  Coleção seguinte/anterior por teclado, Projetos seguinte e chips verificados.
- Nenhum erro/warning do site observado no console. Mensagens da extensão do
  navegador e do login Vercel/Google One Tap foram separadas do console da Home.
- `node --check script.js` e `git diff --check` passaram.
- Nenhuma animação nova; suporte existente a reduced-motion preservado.

Uma preview intermediária incompleta foi corrigida restaurando a árvore
aprovada antes do QA final. O diff acumulado final preserva todos os demais
arquivos. Uma alteração local pré-existente em `collection-gastronomy.png`
foi deixada intacta e excluída de todos os commits desta rodada.

## Preservação e limites

Cores, assets, JavaScript, Coleção (rotor, movimento, timings e controles),
Header, Posicionamento, Serviços, Projetos, Perspectiva, CTA/form e Footer
permanecem intactos. Em 901px+ não existe alteração visual desta build.
Não houve merge, promoção de produção ou alteração na main.

QA realizado em Chromium com viewports reais no iframe de revisão existente;
Safari/iOS e aparelhos físicos não foram testados nesta rodada. Aprovação
estética final permanece com a revisão visual do usuário.
