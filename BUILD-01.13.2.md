# Build 01.13.2 — recuperação controlada + Método atual

## Fontes e escopo

- Branch: `build-01-13-2-recovery-method`.
- Base visual obrigatória: `4e25731f75971b3470d7309867f97cc4b69a230c`, da branch `build-01-13-refino-visual-mobile`.
- Referência exclusiva da linha do Método: `2762370e9caa301bd319af4b08ed4871ddc9dbea`, da branch `build-01-12-2-v4-radial`.
- Arquivos de implementação alterados: `index.html` e `styles.css`. Não houve cópia integral de arquivos da referência antiga.

A branch foi criada diretamente na base 01.13. A referência 01.12 forneceu somente os três SVGs do Método (paths, gradientes e quatro nós por versão), linecap/linejoin arredondados, glow dos pontos reduzido de 3px para 2px e compensação horizontal de -4% do SVG desktop até 1100px.

## Hero: arquitetura aprovada preservada

A nebulosa continua sendo uma camada independente com `assets/avero-nebula-continuous-v1.webp`. O olho mantém `assets/avero-eye-isolated-v1.webp`, sua transparência, posição, escala e regras visuais da Build 01.13. O asset antigo permanece preservado.

Somente em até 700px, a área da nebulosa foi ampliada: `top:calc(73px - 8%)` e `bottom:calc(41px - 6%)`. Em relação à camada anterior (top 65px/bottom 35px), isso avança o topo em 8% e o término em 6% da altura anterior da camada. A opacidade permanece em 0.55, assim como o enquadramento e as cores. A máscara é exclusivamente vertical, com fade nas extremidades: transparente → opaco em 16% → opaco até 76% → transparente.

Headline, CTAs, olho, texto inferior e assinatura não foram reposicionados. Em 390px, a atmosfera inicia suavemente atrás da headline, ganha presença perto dos CTAs/olho e se dissipa junto ao texto inferior.

## Perspectiva e recuperação visual

Todas as regras da Perspectiva continuam idênticas à base 01.13. As camadas usam os mesmos dois WebPs independentes; opacidade do olho 0.74 e da nebulosa 0.17 em mobile. A inspeção em 390px confirmou a ausência do antigo fundo retangular. Footer e demais soluções da Build 01.13 também foram preservados pela escolha da base correta.

## Método: transplante e respiro em Criação

O SVG desktop é exatamente o da referência 2762370e: entrada à esquerda, abertura à direita, passagem pelos quatro nós e retorno final à esquerda. Não foram movidos os textos.

Nas versões phone e compacta/mobile, foram preservados a entrada, os quatro nós, a curva superior/direita e o segmento final. O refinamento final altera apenas os dois Béziers do retorno inferior junto a Criação:

- Anchor intermediário: y 326 → 342 (16 unidades SVG, aproximadamente 14.6px na altura phone de 420px).
- A abertura lateral aumenta de x 378 para x 398 no controle correspondente.
- Os controles de entrada/saída foram alinhados para manter continuidade de tangentes, sem cotovelo.
- Phone: `C362 303 398 334.636364 290 342 C182 349.363636 75 336 75 354.5`.
- Compacta: `C362 303.71 398 334.636364 290 342 C182 349.363636 75 336 75 355.24`.

Em 390px, amostragem dos Béziers contra a caixa DOM da descrição de Criação indicou distância mínima aproximada de 2.5px na geometria transplantada para 17.7px após o ajuste. O texto e os quatro nós mantêm suas coordenadas. O término à esquerda permanece idêntico ao da referência e não atravessa a descrição de Evolução.

## QA

Inspeção visual em Chromium, primeiro 390px e depois 1280px, seguida de 320, 360, 430, 768, 900, 901, 1024 e 1440px. Foram registradas comparações antes/depois do Método em 390px e imagens finais de Hero, Perspectiva e Método desktop.

Em todas as dez larguras, `documentElement.scrollWidth === documentElement.clientWidth`: zero overflow horizontal da Home. O helper de revisão pode ter rolagem própria quando o iframe de 1440px excede a janela do navegador; isso não é overflow da Home.

- Textos das etapas, títulos e descrições com transform computado `none`, sem contrarrotação.
- Quatro nós preservados nas três versões; desktop SVG idêntico ao doador.
- Continuidade de tangentes dos trechos ajustados verificada numericamente.
- Menu mobile abre por Enter e fecha por Escape; chip de serviço alterna `aria-pressed`.
- Coleção avança de 01 para 02 pelo teclado e aceita navegação anterior; Projetos avança para Vértice Clínica.
- Console inspecionado: erros observados somente da extensão do navegador, sem erro da aplicação observado.
- `node --check script.js` e `git diff --check`: aprovados.

## Preservação por diff

Comparação com 4e25731 confirmou HTML idêntico fora dos três SVGs do Método. Removendo somente os três ajustes gráficos autorizados do Método e o override de extensão da Hero, o CSS é idêntico à base. `script.js` permanece byte a byte idêntico.

Coleção, rotor V4, velocidade ambiental de 3.2deg/s, troca física, proxies, timings, assets e breakpoints permanecem intactos. Paleta e assets não foram alterados. Perspectiva, Footer e demais seções não foram reinterpretados. Fora da linha autorizada do Método, desktop foi preservado.

Uma alteração local pré-existente em `assets/collection-gastronomy.png` foi preservada e excluída dos commits desta build. Main não foi alterada; não houve merge ou promoção para produção.

## Limites

A validação foi realizada em viewport de Chromium. Safari/iOS e dispositivos físicos não foram testados. O acabamento final continua sujeito à revisão visual do usuário; não foram introduzidas dependências ou motion novo.

## Refinamento posterior — respiro de Criação desktop e Evolução mobile

Após revisão visual do usuário, uma correção exclusivamente geométrica do Método foi aplicada sobre o commit `b8597c9a45a31409d49847b61896754f62548579`, na mesma branch. O SVG desktop originalmente transplantado passa a incorporar este ajuste autorizado.

- Desktop: abertura direita ampliada em 35 unidades SVG (x 530 → 565 nos nós 02/03). Controles da curva acompanham esse deslocamento; o retorno inferior conserva o anchor (330,315), com tangente ajustada para continuidade. Nós 01/04, entrada e término permanecem nas coordenadas anteriores. A distância mínima amostrada até a caixa da descrição de Criação em 1280px passou de aproximadamente 4.9px para 11.2px, sem mover nenhuma palavra.
- Phone e compacta: retorno intermediário elevado de y 342 para 330, cerca de 11px na altura renderizada de 420px. Controles compartilhando y 330 criam uma passagem suave acima de Evolução; a saída do nó 03 permanece vertical e a chegada ao nó 04 permanece suave. Os quatro nós, entrada, trecho superior/direito e fim da linha não foram movidos.
- Textos, pesos, cores, CSS, JavaScript, assets, layout e todas as demais seções permanecem idênticos a b8597c9. No HTML, apenas os três SVGs da linha foram alterados.

QA visual em Chromium: 320, 360, 390, 430, 768, 900, 901, 1024, 1280 e 1440px. Zero overflow da Home em todas as larguras, textos com transform computado `none`, nenhum erro da aplicação observado no console. Tangentes de todos os joins verificadas numericamente; checks `node --check script.js` e `git diff --check` aprovados. Capturas finais de Método 390px e 1280px registradas. Safari/iOS físico permanece não testado.

Sem alterações em Hero, olho, nebulosa, CTA, Coleção ou demais áreas. Main continua intacta, sem merge ou promoção para produção. A alteração local pré-existente em `assets/collection-gastronomy.png` continua excluída dos commits.
