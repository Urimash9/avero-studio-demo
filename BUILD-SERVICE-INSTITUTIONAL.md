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

QA executado no preview Vercel em Chromium, usando o iframe de revisão existente
em modo Home oficial, sem overrides de tema:

| Largura | Overflow horizontal | Lunara inteira, sem deformação |
| --- | --- | --- |
| 390px | 0px | 327 × 245px |
| 430px | 0px | 367 × 275px |
| 768px | 0px | 351 × 263px |
| 1024px | 0px | 505 × 379px |
| 1280px | 0px | 592 × 444px |
| 1440px | 0px | 592 × 444px |

- Asset carregado em 1536 × 1152, `object-fit: contain`, transformação `none`.
- Revisão visual de hero, organização em camadas, valor, complementaridade e CTA;
  textos legíveis, sem colisões ou enquadramento cortado.
- Identificado espaço insuficiente para o rótulo “Planejamento” a 1024px;
  coluna local ampliada para 115px somente entre 901 e 1100px. Revalidação
  do preview final deve confirmar que o rótulo cabe integralmente.
- Entrada pela seta da Home via Enter (1280px) e clique (390px), na mesma aba.
- CTA final chega a `/#contato` e ao formulário existente; retorno chega
  a `/#servicos`. Sem formulário novo ou envio de dados de teste.
- Menu mobile: abre, seis links corretos, Escape fecha e devolve o foco.
- Tab entre CTA/retorno mostra outline visível de 2px.
- Home em 390px conserva a geometria aprovada de todas as seções.
- Console revisado: nenhum erro da aplicação; somente mensagens da extensão
  do ambiente de navegador sobre envio de metadados.
- Os três campos champagne são herdados da piloto, mais leves no mobile.
- Reduced motion herdado do sistema aprovado; todos os novos elementos são
  estáticos e a leitura do CSS computado confirmou zero animações no conteúdo.
  Preferência do sistema operacional não emulada neste ambiente.
- Sem Safari/iOS ou aparelhos físicos; homologação responsiva em Chromium.

