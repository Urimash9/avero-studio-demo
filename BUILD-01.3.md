# AVERO Studio — Build 01.3 / Serviços

Branch exclusiva: `build-01-2-refino-visual`. Base da rodada: `57190a1bbaf29735fd973dd298d70129eb93b0d5` (Build 01.2). A `main` de referência permanece em `dd9257f9c2c42d28d421a300727d6aef148f4b63`.

## Arquivos alterados

| Arquivo | Alteração |
| --- | --- |
| `index.html` | Apenas os quatro cards de Serviços: contêiner do visual, identificação do tipo de card, linha de assinatura, título e rodapé com descrição + CTA. Nomes, descrições, subtítulos, imagens, alt, destino e `data-service` preservados. Removida a quebra fixa dentro de E-commerce + Cardápios; a quebra agora acompanha a largura. Os números dos cards permanecem decorativos, com `aria-hidden`; nenhum índice de seção foi reintroduzido. |
| `styles.css` | Regras de Serviços reunidas em um bloco legível, eliminando as antigas sobreposições específicas da seção. Composição assimétrica em telas amplas; transições intermediárias; uma coluna no mobile; tipografia, contraste, enquadramento, fades, paddings, foco e áreas de interação refinados. Todas as regras das outras seções foram preservadas. |
| `BUILD-01.3.md` | Registro das decisões, problemas, correções, verificação, limites e pendências visuais. |

`script.js`, todos os assets e `BUILD-01.2.md` permanecem sem alterações. O HTML fora de Serviços e as declarações CSS fora de Serviços foram comparados com a base e são iguais. Hero, Coleção Avero, Projetos, Método, Perspectiva, Contato e Footer não foram redesenhados.

## Decisões visuais

- Acima de 1100 px, institucional ocupa duas alturas como peça principal, Landing Pages e E-commerce + Cardápios ocupam as duas áreas de apoio à direita, e SEO & Performance fecha a composição em uma faixa horizontal. Ordem visual e ordem de teclado continuam 1 → 2 → 3 → 4.
- Nas larguras intermediárias, os cards voltam a duas colunas para preservar a leitura. Entre 701 e 820 px, a introdução ocupa a faixa superior; isso evita reduzir excessivamente os cards.
- Até 700 px, cada serviço ocupa a largura útil, com imagem em 2:1, título de 22–24 px, descrição de 14 px e assinatura de 11 px. A sequência fica mais longa que a antiga grade compacta, mas mantém texto legível e espaços controlados, sem altura fixa de conteúdo.
- O institucional tem título de 32 px na composição ampla; os apoios, 22 px; SEO, 27 px. Pesos e espaçamento seguem a família Montserrat já usada no site.
- Os quatro PNGs originais continuam como base. Ajustes usam `object-fit`, enquadramentos específicos, leve redução de saturação/brilho e transição escura nas bordas. Não há novos assets, mini-Homes da AVERO, partículas, animações ou efeitos de movimento.
- Superfícies discretas e parcialmente transparentes deixam o background existente participar da composição. Azul aparece na assinatura numérica, foco, borda e CTA; nenhum novo campo gráfico foi acrescentado.

## Problemas encontrados e corrigidos

- Quatro colunas estreitas no desktop reduziam presença visual, leitura e hierarquia: substituídas pela composição de destaque e apoios.
- A antiga grade mobile usava títulos de 15 px, assinaturas de 8 px e descrições de 13 px: reorganizada em largura inteira, com hierarquia mais clara e melhor respiro.
- As imagens em proporção uniforme mostravam informação demais sem uma leitura principal: proporções e pontos de recorte agora variam conforme o espaço.
- Numeração, subtítulo, título e ação tinham posições pouco relacionadas: assinatura agrupada e rodapé com descrição + ação alinhadas.
- Regras específicas de Serviços estavam espalhadas em vários breakpoints: consolidadas sem modificar as demais seções.
- Durante a implementação, a primeira peça teve conteúdo comprimido por uma base flexível zero: corrigida para preservar a altura natural do texto. A verificação final não apresentou cortes ou sobreposição.

## Verificação

Chromium, Home real em iframes com largura útil exata. Larguras solicitadas: **320, 360, 390, 430, 768, 900, 1024, 1280 e 1920 px**.

Em todas elas: quatro serviços presentes, zero overflow horizontal da página, nenhum overflow de texto medido na seção, visual e conteúdo dentro do card, nenhuma colisão entre descrição e CTA, e ações de pelo menos 44 × 44 px.

Também foram verificadas as transições de **700/701, 820/821, 1100/1101 e 1250/1251 px**, com os mesmos resultados.

Conferência visual adicional em desktop, 900, 768 e 390 px. Os quatro links foram exercitados: institucional e landing selecionam seus chips; e-commerce e SEO preservam o preenchimento da mensagem existente. Tab/Enter, foco visível e ordem dos links foram conferidos. Não houve envio de mensagem nem mudança na integração do WhatsApp.

Comparação de escopo: HTML fora de Serviços idêntico à base, todas as regras CSS fora de Serviços idênticas, JavaScript e assets sem alteração. `git diff --check` e `node --check script.js` passaram. As páginas temporárias de auditoria não fazem parte da entrega.

## Pendências de decisão visual e limites

- Aprovar o peso relativo do institucional, os recortes verticais das peças de apoio no desktop e o ritmo de uma coluna no mobile.
- Os visuais continuam sendo os assets anteriores; a definição de imagens definitivas dos serviços permanece para uma próxima rodada.
- A composição usa cortes mais fechados nos cards pequenos. Mostrar o mockup completo nesses espaços exigiria outro asset ou outra composição; não foi criada uma biblioteca nova nesta rodada.
- A auditoria foi realizada em Chromium, sem Safari, Firefox ou aparelhos físicos. Não foi identificado bloqueio funcional nos cenários verificados.
- A altura da seção aumenta e desloca as seções seguintes normalmente no fluxo. O background compartilhado da Build 01.2 já acompanha a altura total da página; suas regras não foram alteradas.

## Controle de branch

A rodada é salva somente em `build-01-2-refino-visual`. Não há merge nem alteração da `main`, promoção para produção ou implementação de motion complexo. A entrega termina aqui para revisão visual.
