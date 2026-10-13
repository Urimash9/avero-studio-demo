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

Breakpoints previstos: 390, 430, 768, 1024, 1280 e 1440px.
Validação de navegador registrada após a inspeção do preview.
Limite do ambiente: sem Safari/iOS ou aparelhos físicos.

