# E-commerce + Cardápios — terceira página interna de Serviço

## Base e escopo

- Base exata: `53441aecb363c6f81b85a44bf7fc042bee469e3c`.
- Branch mantida: `feature/service-landing-page-pilot`.
- Rota: `/servicos/ecommerce-cardapios`, na mesma aba.
- Landing Pages, Sites Institucionais, estilos/scripts compartilhados e assets
  preservados. Main intacta, sem merge ou promoção a produção.

## Arquitetura

Página estática em `servicos/ecommerce-cardapios/index.html`, servida por uma
rewrite adicional em `vercel.json`. Rotas anteriores e cabeçalhos preservados.

Reutilizados sem modificar:
- `/styles.css`: tokens da paleta B, Montserrat, header/footer, botões e foco.
- `/servicos/service-pages.css`: base editorial, entrega, CTA, responsividade
  e atmosfera champagne já aprovada nas páginas anteriores.
- `/servicos/service-pages.js`: menu mobile e retorno de foco com Escape.
- Header e footer da página piloto, com as mesmas âncoras absolutas.

`/servicos/commerce.css` é carregado somente pela página nova. Todos os seletores
têm escopo `.service-page--commerce`. Sem frameworks, dependências, formulário
ou animação nova. CTAs comerciais levam ao contato existente em `/#contato`.

## Composição e narrativa

Conceito: **Transformar interesse em compra**.

- Hero: Casa Ocre à esquerda e comunicação à direita no desktop. No mobile,
  leitura/CTA precedem o visual. Imagem inteira em 4:3, sem transformação,
  crop, filtro, alteração de arquivo ou distorção.
- Suporte recortado atrás do visual e uma linha estática criam profundidade.
  Caption identifica a aplicação conceitual.
- Definição breve, sem limitar o serviço a uma plataforma ou segmento.
- Dois contextos conectados por um eixo: catálogo/compra e cardápio/pedido.
  Ramos assimétricos e uma conclusão comum; sem dois cards genéricos.
- Situações reais em três parágrafos editoriais.
- Entrega organizada em catálogo, experiência e técnica. Integrações e checkout
  condicionados ao escopo/plataforma; sem promessa de resultados garantidos.
- Valor em composição tipográfica central no desktop, leitura à esquerda mobile.
- Jornada sem cards: descobrir, entender, escolher e agir. Curva SVG estática
  no desktop/tablet, eixo vertical com pontos no mobile; a ordem semântica é igual.
- Convite final segue o componente aprovado de contato.

Diferenças: o visual ocupa a esquerda da hero, em vez da direita da piloto;
o título participa da coluna comercial, em vez de preceder o conjunto como
na institucional. Os contextos ramificados, o valor e a jornada dão ritmo
próprio à página. Identidade, navegação, ambientação e componentes comuns iguais.

## Alteração exata na Home

Somente a seta E-commerce + Cardápios:
- `href="#contato"` → `href="/servicos/ecommerce-cardapios"`.
- `aria-label` → `Saiba mais sobre E-commerce e Cardápios`.

Texto visível, classes, `data-service`, imagens, proporções, layout, efeitos
e responsividade preservados. Nenhuma alteração visual na Home.

## Validação

Checks locais aprovados:
- `node --check script.js`, `node --check servicos/service-pages.js`
  e `git diff --check`.
- HTML: um H1, sete H2, sequência semântica da jornada, IDs únicos,
  alt text, recursos e âncoras válidos; nenhum formulário novo.
- Header/footer idênticos aos da piloto. Home idêntica à base salvo
  os dois atributos do CTA comercial; rotas/cabeçalhos anteriores preservados.
- CSS/JS globais e internos anteriores, HTMLs aprovados e todos os assets
  byte a byte iguais à base.
- HTTP local: Home, CSS/JS, HTML novo e Casa Ocre retornaram 200 completos.
  Não há etapa de build neste projeto.

QA executado no preview Vercel READY, em Chromium e no enquadramento do
Color Lab existente em modo Home oficial, sem overrides de tema:

| Largura | Overflow horizontal | Casa Ocre inteira |
| --- | --- | --- |
| 390px | 0px | 326 × 245px |
| 430px | 0px | 366 × 275px |
| 768px | 0px | 560 × 420px |
| 1024px | 0px | 458 × 344px |
| 1280px | 0px | 563 × 422px |
| 1440px | 0px | 652 × 489px |

Dimensões exibidas arredondadas. Asset original carregado em 1536 × 1152,
`object-fit: contain` e transformação `none` em todas as larguras.
Nenhum título, descrição, rótulo de entrega ou botão excedeu sua caixa.
Hero, contextos, valor, jornada e encerramento inspecionados em desktop/mobile.

- Enter no CTA da Home a 1280px e clique a 390px abrem a rota na mesma aba.
- CTA principal/final chegam a `/#contato`, com o formulário existente.
  Retorno chega a `/#servicos`. Nenhuma mensagem ou dado de teste enviado.
- Menu abre com seis links corretos; Escape fecha e devolve foco.
  Tab entre CTA/retorno exibe outline visível de 2px.
- Home a 390px mantém exatamente as posições/alturas das oito seções da base.
- Ambas as rotas anteriores abertas no mesmo preview: títulos/imagens corretos,
  zero overflow e ausência do novo CSS comercial.
- Console revisado: nenhum erro da aplicação observado. Mensagens de metadata
  da extensão do navegador foram separadas de erros do site.
- Cores computadas de título, copy, eyebrow e CTA correspondem aos tokens B;
  champagne difuso herdado, mais leve no mobile. Legibilidade preservada.
- Reduced motion herdado do sistema aprovado; conteúdo novo completamente
  estático (zero animações no CSS computado). Preferência do sistema operacional
  não emulada; sem motion novo para remover.

Limite do ambiente: Chromium/iframe, sem Safari/iOS ou aparelhos físicos.
Casa Ocre é uma aplicação conceitual, não uma loja operante nesta página.

## Correção cirúrgica — gesto gráfico junto à Casa Ocre

- Base: `72420982faf917b38fead5a0f766e487bc2295fe`, mesma branch.
- A antiga curva envolvente e seu ponto decorativo foram substituídos por
  um único arco curto e aberto, acima do canto superior esquerdo do visual.
- SVG local de 260 × 44, largura de 135–215px e altura de 24px; posição
  absoluta acima da figura, sem interferir no fluxo ou nas dimensões da imagem.
- Gradiente prata/champagne com extremos transparentes e opacidade máxima .22.
  Sem trecho inferior, círculo, moldura curva ou animação nova.
- Até 900px, o SVG não é exibido: mobile e tablet empilhado ficam sem essa linha.
- Mudam somente o SVG decorativo e suas regras `.commerce-current`.
  Asset, imagem, suporte recortado, posição, copy, CTA, fundo champagne,
  espaçamentos, jornada, demais seções e páginas aprovadas preservados.
- QA desta correção será registrado após conferir o preview.
