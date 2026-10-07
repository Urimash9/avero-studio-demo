# AVERO Studio — Refino cirúrgico da linha do Método

Branch: `build-01-12-2-v4-radial`.
Base: `e6d938be45a2821b0ccd70c07a5bc2f36d28ada9`.

## Decisão e escopo

O pedido atual substitui somente as decisões de geometria da linha do Método
registradas nas Builds 01.8, 01.10 e 01.11: o mobile foi refinado primeiro e
desktop/tablet passam a compartilhar sua linguagem de entrada, contorno e retorno.

Arquivos: `index.html`, `styles.css` e este registro. No HTML, somente os três
SVGs decorativos existentes do Método mudaram. No CSS, duas regras gráficas
foram ajustadas e uma compensação horizontal do SVG desktop foi acrescentada
ao breakpoint existente de 1100px. Nenhuma alteração em JavaScript ou assets.

## Linha e pontos

- Percursos formados por curvas cúbicas com tangentes contínuas; os trechos
  horizontais/verticais rígidos foram substituídos por curvas discretas.
- Entrada suave à esquerda, abertura arredondada à direita e retorno à esquerda
  junto de Evolução, com finalização dissipada. O desktop acompanha as quatro
  etapas e ganha um retorno completo, em vez de terminar numa haste vertical.
- Retorno inferior afastado da descrição de Criação e do número 04, inclusive
  quando as descrições quebram em duas linhas.
- Quatro pontos sobre cada percurso, alinhados verticalmente aos respectivos
  títulos. Na composição desktop estreita, o deslocamento de −4% do SVG acompanha
  a mudança já existente das margens dos itens; não desloca os textos.
- Mesmas cores, espessura de 1px e raios dos pontos. Opacidade da linha mais
  discreta, pontas/junções arredondadas e glow dos pontos reduzido de 3 para 2px.

Títulos e descrições já não possuíam rotação. Isso foi confirmado também nos
ancestrais dos elementos. Não foi aplicada contrarrotação: a ilusão visual foi
tratada na linha. Fontes, posições, alinhamentos, intervalos e conteúdos dos
blocos, introdução e encerramento permanecem iguais à base.

## QA

Inspeção visual em Chromium: **430, 390, 360, 320, 768, 1024, 1280 e 1440px**.
Transições adicionais: **431, 700, 701, 900, 901, 1100, 1101, 1250 e 1251px**.

- Títulos e descrições horizontais, sem transform/rotate ou itálico, em todas
  as larguras. Caixas de texto idênticas às da base nas larguras comparadas.
- Amostragem do percurso contra retângulos reais de texto, incluindo números
  e descrições multilinha: nenhuma interseção; menor distância medida de 6,7px.
- Pontos pertencem ao percurso; diferença vertical para o centro dos títulos
  abaixo de 0,7px, inclusive nas transições de tamanho tipográfico.
- Zero overflow horizontal e zero erros de JavaScript/console nos cenários.
- Comparação antes/depois de 496 elementos externos ao Método nas larguras
  compactas e 433 nas larguras desktop: medidas, estilos e posições preservados.
- Menu, navegação, Coleção, Projetos, CTA e montagem da URL WhatsApp conferidos
  sem envio de mensagens. Fallback sem JavaScript preservado.
- Reduced motion mantém o percurso estático; SVGs continuam aria-hidden,
  focusable false e sem capturar interação. Ordem semântica das etapas preservada.
- HTML fora dos SVGs e JavaScript integralmente idênticos à base; CSS externo
  ao gráfico do Método e todos os valores de cor preservados.
- `node --check script.js` e `git diff --check` aprovados.

## Limitações e estado

QA em Chromium local; Safari/iOS e dispositivos físicos não testados.
Preview solicitado após o QA: commit/push na mesma branch para deployment de
preview Vercel. Estado e URL confirmados na entrega; sem merge ou promoção para produção.
Main preservada; Hero, Serviços, Coleção, CTA, menu, Footer e demais seções intactos.
