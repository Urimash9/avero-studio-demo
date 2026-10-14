# SEO & Performance — quarta página interna de Serviço

## Base e escopo

- Base aprovada: `182455a878bb2fc51f3ef0cae48e41775f618c8c`, com a correção
  gráfica de Casa Ocre preservada.
- Branch mantida: `feature/service-landing-page-pilot`.
- Rota nova: `/servicos/seo-performance`, na mesma aba.
- Home visualmente intacta. Landing Pages, Sites Institucionais e E-commerce
  + Cardápios preservadas. Main intacta, sem merge ou promoção a produção.

## Arquitetura e componentes reutilizados

Página estática em `servicos/seo-performance/index.html`, com rewrite adicional
em `vercel.json`. Rotas anteriores e cabeçalhos preservados.

Reutilizados integralmente, sem alterar:
- `/styles.css`: tokens B, Montserrat, header/footer, botões e foco.
- `/servicos/service-pages.css`: base editorial, entrega, CTA, responsividade
  e atmosfera champagne aprovada.
- `/servicos/service-pages.js`: menu mobile, Escape e retorno de foco.
- Markup do header/footer da piloto, com âncoras absolutas da Home.

`/servicos/seo.css` é exclusivo desta rota, com seletores sob
`.service-page--seo`. Sem frameworks, dependências, formulário ou motion novo.
CTAs principais levam ao contato já existente em `/#contato`.

## Direção visual e conteúdo

Conceito: **Base para crescer**.

- Hero editorial com título acima do conjunto, copy/CTA à esquerda e Atlas Rank
  abaixo à direita. Visual inteiro em 4:3, sem crop, filtro, transformação ou
  alteração de arquivo. Dois pequenos cantos técnicos externos dão profundidade,
  sem círculo, curva envolvente, overlay sobre conteúdo ou painel novo de métricas.
- Asset identificado como aplicação conceitual com dados ilustrativos;
  nenhuma métrica do mockup é apresentada como resultado da AVERO.
- Definição breve de SEO técnico/performance.
- Pilares conectados por um eixo comum, em composição assimétrica sem caixas.
- Razões comerciais e situações práticas: lentidão, peso, mobile, organização
  de conteúdo, sites antigos, presença orgânica e preparo para indexação.
- Entrega em estrutura, assets e revisão; monitoramento condicionado ao escopo.
- Valor: percepção/cuidado, com frase grande à direita e complemento à esquerda
  no desktop; ordem de leitura preservada no mobile.
- Fluxo técnico estático: estrutura → carregamento → experiência → descoberta.
  Eixo horizontal no desktop/tablet, vertical no mobile, sem quatro cards.
- Seção transparente sobre os fatores de SEO, sem promessas de primeira posição,
  tráfego, percentuais de velocidade ou resultados garantidos.
- Convite final com CTA ao contato existente.

A composição difere da piloto e de Casa Ocre pela headline acima do palco,
do visual institucional pela posição de Atlas Rank e pelo ritmo técnico dos
pilares/fluxo/valor. Header/footer, identidade, ambientação e componentes-base
conservam a família aprovada.

## Alteração exata na Home

Somente a seta SEO & Performance:
- `href="#contato"` → `href="/servicos/seo-performance"`.
- Rótulo acessível → `Saiba mais sobre SEO e Performance`.

Símbolo, classes, `data-service`, textos, asset, card, proporções, animações,
efeitos, espaçamentos e responsividade idênticos à base.

## Validação e limitações

QA previsto no preview em 390, 430, 768, 1024, 1280 e 1440px e revisão das
quatro rotas. Evidência será registrada após a inspeção.
Checks: `node --check script.js`, `node --check servicos/service-pages.js`
e `git diff --check`.

Reduced motion herdado do sistema aprovado; todos os novos elementos estáticos.
Ambiente: Chromium/iframe, sem Safari/iOS ou aparelhos físicos.
