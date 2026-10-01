# AVERO Studio — Build 01.5

Branch exclusiva: `build-01-2-refino-visual`. Base aprovada: `6b71f62` (Build 01.4).

## Arquivos alterados

- `index.html`: composição decorativa do olho mobile usando o mesmo asset; segmentos SVG decorativos dos pilares. Copy, links e ordem dos pilares preservados.
- `styles.css`: continuidade do background global, Hero até 700px e Posicionamento até 900px. Regras desktop anteriores mantidas.
- `review/build-01-5.html`: ferramenta isolada de revisão com iframe de largura real e seletor de área, sem inclusão na Home.
- `BUILD-01.5.md`: registro da rodada e validação.

## Background

As três camadas existentes deixaram de esticar o asset por percentuais enormes da altura da Home. O arquivo `ambient-flow.png` é reutilizado em faixas de altura limitada, com proporção preservada, opacidades graduais e máscara de entrada/saída. A composição `screen` evita que o preto do raster crie blocos opacos. As faixas aparecem em intervalos diferentes da página e deixam áreas de repouso entre elas. A primeira faixa tablet/desktop foi deslocada para reduzir sua presença atrás da introdução do Posicionamento. Nenhuma nova camada fica acima dos textos ou mockups.

## Hero mobile

Até 700px, a apresentação é centralizada: comunicação superior, headline em três linhas com destaque azul em “negócios.”, duas ações distribuídas em torno do eixo, olho, texto complementar centralizado e indicação de rolagem. O CTA principal tem mais largura; o secundário possui pequeno deslocamento vertical. Ambos preservam seus destinos e altura mínima de 54px. O olho usa `avero-eye.png`, com escala e recorte próprios para o mobile; a composição `screen` integra suas bordas ao fundo. Nenhum asset novo, animação ou biblioteca foi introduzido. O desktop conserva seu olho e estrutura anteriores.

## Posicionamento mobile e tablet

Até 900px, headline e introdução são centralizadas. A trajetória passa pelo centro e mantém os pilares em ordem: Visão à esquerda, Movimento à direita, Resultados à esquerda. A lista ordenada preserva a leitura semântica. Três nós e números discretos marcam a progressão. Segmentos cúbicos suaves se unem exatamente nos nós e acompanham a altura de cada etapa; não dependem de JavaScript nem de alturas fixas dos textos. A linha ocupa o corredor vazio de 40px entre as colunas. O final desaparece gradualmente.

## Imagens e camadas

Auditoria de carregamento, dimensões, opacidade, máscaras e estilos computados dos quatro mockups de Serviços, seis imagens da Coleção e três mockups de Projetos: todos carregados, com dimensões positivas e sem máscaras indevidas. Os filtros de brilho existentes e a profundidade dos cards inativos da Coleção foram preservados. O projeto em destaque mantém sua camada interna isolada e seu overlay de leitura. Não foi encontrada regressão nessas imagens que justificasse alteração de z-index ou redesign.

## Validação

Navegador Chromium, em iframe com viewport real de cada largura: **320, 360, 390, 430, 768, 900, 1024, 1280 e 1440px**.

- Sem overflow horizontal: `scrollWidth` igual ao `clientWidth` em todas as larguras.
- Fontes carregadas; textos principais, botões e pilares dentro dos limites da viewport.
- Eye mobile centralizado, sem cortar os extremos do símbolo; CTAs sem sobreposição, alturas de 54–61px.
- Pilares alternados sem contato com as bordas ou com a trajetória; conexão adaptada às quebras de texto.
- Comparação numérica com a preview imutável da Build 01.4 em 1024/1280/1440px: geometria da Hero e do Posicionamento desktop idêntica, incluindo títulos, textos, ações, olho, assinatura, SVG e pilares.
- Navegação do CTA “Ver projetos” confirmada; foco de teclado visível (contorno azul de 2px com afastamento de 5px).
- Comparação de fonte: HTML de Serviços, Coleção, Projetos, Método, Perspectiva, CTA final e Footer intacto; scripts, assets e regras anteriores de Serviços preservados.
- Sem mudança de conteúdo, formulário ou comportamento dos carrosséis.

A validação cobre layout no Chromium; Safari/iOS e aparelhos físicos não foram executados nesta rodada.

## Pendências de revisão visual

Nenhum defeito funcional identificado nos checks executados. A intensidade das faixas, o tamanho do olho e o pequeno desnível dos CTAs ficam disponíveis para a revisão visual da direção. Motion e animação do olho permanecem para rodadas posteriores.

Não houve reinterpretação de Serviços, Coleção, Projetos, Método ou Perspectiva. A main permaneceu em `dd9257f9c2c42d28d421a300727d6aef148f4b63`; nenhuma alteração direta ou merge foi feito nela. Publicação restrita a preview da branch de trabalho.
