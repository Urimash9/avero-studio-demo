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

O registro de QA será completado com evidência do preview em 390, 430, 768,
1024, 1280 e 1440px. Checks técnicos: `node --check script.js`,
`node --check servicos/service-pages.js` e `git diff --check`.

Reduced motion herdado do sistema aprovado; novos elementos estáticos.
Limite do ambiente: Chromium/iframe, sem Safari/iOS ou aparelhos físicos.
