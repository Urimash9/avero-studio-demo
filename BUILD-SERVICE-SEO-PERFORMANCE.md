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

Checks locais aprovados:
- `node --check script.js`, `node --check servicos/service-pages.js`
  e `git diff --check`.
- Um H1, oito H2, IDs únicos, alt text, recursos e âncoras válidos;
  nenhum formulário novo. Header/footer idênticos nas quatro páginas.
- Home idêntica à base salvo os dois atributos do CTA SEO.
- HTML/CSS das três páginas anteriores, CSS/JS comuns e todos os assets
  byte a byte iguais à base. Rotas/configuração anteriores preservadas.
- HTTP local: Home, CSS/JS, Atlas Rank e os quatro HTMLs de Serviço com
  200 completos. Projeto sem etapa de build.

QA executado no preview READY em Chromium, com o iframe de revisão existente
em modo Home oficial, sem overrides de tema:

| Largura | Overflow horizontal | Atlas Rank inteiro |
| --- | --- | --- |
| 390px | 0px | 321 × 241px |
| 430px | 0px | 361 × 271px |
| 768px | 0px | 572 × 429px |
| 1024px | 0px | 483 × 363px |
| 1280px | 0px | 560 × 420px |
| 1440px | 0px | 560 × 420px |

Dimensões arredondadas. Imagem carregada em 1536 × 1152, `object-fit: contain`
e transformação `none`. Nenhum título, copy, rótulo, passo ou botão excede sua caixa.
Hero, pilares, entrega, valor, fluxo técnico, transparência e CTA inspecionados
em mobile/desktop. Contraste e cores computadas preservam os tokens oficiais B.

- Entrada pelo CTA da Home via Enter em 1280px e clique em 390px, mesma aba.
- CTA principal/final chegam a `/#contato`, com o formulário existente;
  retorno chega a `/#servicos`. Nenhuma mensagem ou dado de teste enviado.
- Menu abre com seis links; Escape fecha e devolve foco. Tab entre CTA/retorno
  mostra outline visível de 2px.
- Home em 390px mantém as posições/alturas aprovadas de todas as oito seções.
- Console sem erros da aplicação observados; mensagens de metadata da extensão
  do navegador separadas de erros do site.
- Zero animações no CSS computado do conteúdo. Reduced motion herdado do
  sistema aprovado; preferência do sistema operacional não emulada.

## QA entre as quatro páginas

Todas abertas pelos respectivos CTAs da Home, no mesmo preview, e revisadas
em 390 e 1280px: títulos/assets corretos, header/footer presentes, mesma
navegação e zero overflow. Brand do header com largura 155/185px, respectivamente.

| Rota | Asset | CSS de SEO nas páginas anteriores |
| --- | --- | --- |
| `/servicos/landing-pages` | Método Prisma | Ausente |
| `/servicos/sites-institucionais` | Lunara Interiores | Ausente |
| `/servicos/ecommerce-cardapios` | Casa Ocre | Ausente |
| `/servicos/seo-performance` | Atlas Rank | Exclusivo desta rota |

Alturas das três páginas anteriores iguais às medições aprovadas. Arco aberto
da Casa Ocre preservado, sem retorno da elipse. Quatro links da Home sem `target`,
rotas sem extensão atendidas e retorno aos Serviços funcional.

Limite do ambiente: Chromium/iframe, sem Safari/iOS ou aparelhos físicos.
Atlas Rank contém dados ilustrativos do asset aprovado, não resultados medidos.
