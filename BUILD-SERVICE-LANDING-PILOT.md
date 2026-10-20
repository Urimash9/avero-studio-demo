# Página piloto de Serviço — Landing Pages

## Base e escopo

- Checkpoint oficial: `checkpoint/avero-home-v1-colecao-v2`.
- Base exata: `143dd08d7bfda0640964d8da58682f29a50ccbfd`.
- Branch exclusiva: `feature/service-landing-page-pilot`.
- Rota: `/servicos/landing-pages`, mesma aba.
- Home aprovada preservada. Sem merge, alteração de main ou promoção a produção.

## Arquitetura

Projeto estático, sem framework, dependência ou etapa de build.
`servicos/landing-pages/index.html` é a primeira página interna.
Uma rewrite explícita em `vercel.json` serve o HTML pela rota sem extensão;
os cabeçalhos e demais configurações anteriores permanecem iguais.

A página carrega `/styles.css` para tokens, tipografia, botões, header e footer.
`/servicos/service-pages.css` contém apenas estilos prefixados por
`.service-page` e é carregado exclusivamente pela página interna.
`/servicos/service-pages.js` reutiliza o comportamento do menu, sem carregar
o motor de carrosséis/formulário da Home em um documento sem esses componentes.
O script da Home permanece idêntico ao checkpoint.

Header e footer conservam o markup e as classes da Home; links para seções e
caminhos de assets são absolutos, adequados à página interna.
Não há novo formulário. CTAs comerciais levam a `/#contato`.

## Composição e conteúdo

- Hero curta: uma página, um objetivo claro.
- Método Prisma usa o mesmo `assets/service-landing.png`, sem modificar o arquivo.
  Imagem 4:3 inteira, valorizada em composição assimétrica, com profundidade,
  recorte apenas das extremidades externas e linhas estáticas que convergem.
- O que é: definição e usos, em texto breve.
- Quando faz sentido: sete situações concretas numa lista editorial, sem cards.
- Entrega: estratégia, design e execução, numa lista descritiva de três linhas.
- Valor: mensagem de foco com presença tipográfica e explicação curta.
- Encerramento: convite comercial e retorno ao contato existente.

Paleta B e Montserrat reutilizadas. Sem métricas/resultados inventados.
Método Prisma identificado como aplicação conceitual.
Não há animação contínua nova; reduced motion segue as regras globais existentes.

## Alteração exata na Home

Somente a seta do card Landing Pages em `index.html`:
- `href="#contato"` → `href="/servicos/landing-pages"`.
- `aria-label="Conversar sobre landing page"` → `"Saiba mais sobre Landing Pages"`.

Símbolo visível, dimensões, classes e `data-service` preservados.
Nenhuma mudança em `styles.css`, `script.js`, assets, conteúdos ou outras áreas.

## Validação local

- `node --check script.js`, `node --check servicos/service-pages.js`
  e `git diff --check` aprovados.
- Comparação com a base: HTML da Home idêntico salvo as duas propriedades do CTA;
  CSS/JS compartilhados e todos os assets idênticos.
- Um H1, IDs únicos, alt text, ausência de formulário novo e links/âncoras
  internos validados. Todos os recursos locais existem.
- HTTP local: Home, página interna, CSS/JS e Método Prisma retornaram 200
  e conteúdo completo.
- Configuração Vercel comparada com a base: somente a rewrite nova.

## Reuso nas próximas páginas

- Rotas explícitas em `/servicos/<serviço>`.
- Mesmo header/footer, tokens e links absolutos.
- CSS exclusivo para páginas internas; JS limitado aos componentes presentes.
- Estrutura comercial curta: objetivo → formato → aplicação → entrega → contato.
- A composição e o asset de cada serviço podem ter direção própria dentro
  desse sistema. Nenhuma outra página de serviço foi criada nesta rodada.

## Homologação

- Chromium, página publicada dentro do enquadramento do Color Lab sem override:
  **390, 430, 768, 1024, 1280 e 1440px**. Sem overflow horizontal,
  imagens quebradas ou texto ultrapassando sua caixa.
- Método Prisma carregado em todas as larguras, proporção 4:3 e contain preservados.
  Hero, conteúdo editorial, entrega, valor e encerramento inspecionados em mobile
  e desktop. Header/footer usam a mesma identidade aprovada.
- Clique mobile no CTA da Home e navegação por teclado desktop levam à rota
  publicada no mesmo contexto; URL sem extensão e sem redirect para outra página.
- CTA principal e CTA final chegam a `/#contato`, com o formulário existente;
  retorno para Serviços chega a `/#servicos`. Nenhuma mensagem enviada.
- Menu mobile abre, Escape fecha e devolve foco. Tab chega ao link de retorno
  com outline visível. Links de navegação conservam as âncoras da Home.
- Home em 390px conserva exatamente as posições/alturas das oito seções do
  checkpoint, inclusive Coleção, Método e contato. Comparação dos arquivos
  confirma ausência de mudanças visuais e em assets em qualquer breakpoint.
- Sem erro da aplicação observado; avisos de metadata da extensão separados.
- O projeto não possui etapa de build. Checks de sintaxe, HTTP, recursos,
  semântica, isolamento e diff aprovados; preview de implementação READY.
- Reduced motion herdado do stylesheet aprovado; sem animação nova. Não foi
  emulada a preferência do sistema operacional.
- Limite do ambiente: Chromium/iframe, sem Safari/iOS ou aparelhos físicos.

## Refino aprovado de escopo — atmosfera champagne

- Base: `05dbcd396eab43458d4a8e9bbc7446e09ee90bfc`, mesma branch.
- Alterado somente o background de `main` em `servicos/service-pages.css`.
- Três gradientes elípticos largos nas bordas, em 13%, 49% e 81% da altura
  do conteúdo principal. Formam um campo contínuo entre seções, sem caixas.
- Cor herdada de `--warm-rgb` (champagne oficial da Home); presença máxima
  .095 nas bordas e .075 no campo intermediário desktop. Até 900px,
  .065/.045, com área proporcional à largura para manter o mobile limpo.
- Stops intermediários suaves; fade adicional no início/fim do main mantém
  o encontro com header/footer discreto. Footer não recebe a camada nova.
- Sem blur, animação, overlay, elemento extra, JavaScript ou asset novo.
- Nenhuma alteração de geometria, spacing, tipografia, CTA, conteúdo,
  estrutura, HTML, header, footer, imagem principal ou Home.
- `node --check script.js` e `git diff --check` aprovados.
- QA do preview em **390, 430, 768, 1024, 1280 e 1440px**: mesmos valores
  de altura da página, dimensões/tipografia de H1 e dimensões do asset das
  medições aprovadas da base. Zero overflow e textos fora da caixa.
- Imagem carregada e íntegra em todas as larguras; cores de texto preservadas.
  Campo champagne computado pelo navegador nas seis larguras.
- Hero/transições/encerramento desktop e Hero/transição mobile inspecionados:
  presença difusa, legibilidade preservada e sem banding evidente observado.
- Sem erros da aplicação observados; avisos da extensão separados.
- HTTP local da Home e do CSS interno com status 200. Comparação com a base:
  CSS anterior integralmente preservado antes do bloco novo; HTML, JS, assets,
  rotas e Home idênticos. Sem nova animação ou alteração de reduced motion.
- Limite: Chromium/iframe, sem Safari/iOS ou aparelho físico.

