# Sites Institucionais — segunda página interna de Serviço

## Base e escopo

- Base aprovada: `fc409d6515aadb6925f643a8b74a4d01acf7b38e`, piloto Landing Pages com champagne refinado.
- Branch existente mantida: `feature/service-landing-page-pilot`.
- Rota nova: `/servicos/sites-institucionais`, na mesma aba.
- Nenhuma alteração em Landing Pages, CSS/JS compartilhados, assets ou demais seções.
- Main preservada. Sem merge ou promoção para produção.

## Arquitetura e reuso

`servicos/sites-institucionais/index.html` é uma página estática.
A rewrite adicional em `vercel.json` atende a rota sem extensão e preserva a rota
de Landing Pages, cabeçalhos e demais configurações.

Reutilizados integralmente:
- `/styles.css`: tokens, Montserrat, header, footer, botões e foco.
- `/servicos/service-pages.css`: arquitetura editorial, CTA, responsividade-base
  e os mesmos três campos champagne refinados na piloto.
- `/servicos/service-pages.js`: comportamento do menu.
- Markup do header/footer da piloto, com as mesmas âncoras absolutas.

`/servicos/institutional.css` é carregado somente pela nova página.
Seletores limitados a `.service-page--institutional`; nenhuma regra afeta a piloto.
Sem framework, dependência, build, formulário ou animação nova.

## Personalidade e composição

Conceito: **Presença que posiciona**.
A hero usa título editorial acima do conjunto, Lunara à esquerda e chamada
comercial à direita. No mobile, copy/CTA precedem a imagem inteira.
Lunara permanece sem transformação, crop, filtro ou modificação de arquivo;
um suporte recortado atrás da imagem e uma linha estática criam profundidade.
Caption identifica a aplicação conceitual, sem apresentar cliente real.

Conteúdo:
1. Espaço oficial da empresa.
2. Identidade, oferta e conexão em três camadas alinhadas por um eixo,
   sem uma grade de cards.
3. Situações práticas em três parágrafos curtos.
4. Entrega: planejamento, experiência e publicação/evolução.
5. Primeiro contato com a empresa, com frase forte e complemento deslocado.
6. Complementaridade Instagram/site em composição tipográfica paralela.
7. CTA final ao contato existente na Home.

Diferenças em relação à piloto: hero e posição do visual, asset sem inclinação,
seção de organização em camadas, situações em texto, valor com complemento
abaixo à direita e bloco próprio de complementaridade. Header/footer, tokens,
ambientação, botões e sistema de entrega/encerramento pertencem à mesma família.

## Alteração exata na Home

A seta do card Sites Institucionais conserva texto, classes, geometria e
`data-service`; mudam somente:
- `href="#contato"` → `href="/servicos/sites-institucionais"`.
- Rótulo acessível → `Saiba mais sobre Sites Institucionais`.

Link de Landing Pages e todos os outros cards permanecem iguais.

## Checks locais

- `node --check script.js`, `node --check servicos/service-pages.js`
  e `git diff --check` aprovados.
- Home comparada com a base: somente as duas propriedades do CTA institucional.
- Piloto, CSS/JS comuns e todos os assets byte a byte idênticos à base.
- Header/footer do novo HTML idênticos aos da piloto.
- Um H1, IDs únicos, alt text, links/recursos locais e âncoras validados.
- HTTP local: Home, página, folhas de estilo, menu e Lunara com 200
  e conteúdo completo.
- Configuração Vercel preservada salvo a rewrite nova.

## QA e limitações

Breakpoints previstos: 390, 430, 768, 1024, 1280 e 1440px.
QA de navegador será registrado após a inspeção do preview.
Reduced motion herdado do sistema aprovado; todos os novos elementos são estáticos.
Ambiente de homologação: Chromium/iframe, sem Safari/iOS ou aparelhos físicos.

