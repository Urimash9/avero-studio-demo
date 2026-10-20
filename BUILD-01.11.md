# AVERO Studio — Build 01.11 / Mobile V2.1

Refinamento limitado à Hero, Serviços, Método, Perspectiva e links finais no celular. Branch: `build-01-2-refino-visual`. Sem merge ou alterações na main.

## Arquivos

- `styles.css`: regras novas limitadas a até 700px; a única regra externa oculta o novo SVG de celular.
- `index.html`: SVG decorativo exclusivo do Método no celular. SVGs desktop e tablet anteriores preservados.
- `assets/eye-silhouette-mask.svg`: máscara suave que isola a silhueta do olho existente.
- `assets/nebula-only-mask.svg`: máscara complementar para aproveitar a nebulosa do mesmo raster, sem duplicar o olho.
- `assets/service-fragment-mask.svg`: recortes de alfa irregulares com fragmentos e opacidades progressivas.
- `review/build-01-11.html`: ferramenta de revisão da preview, incluindo 375px.
- `BUILD-01.11.md`: registro da entrega.

Nenhum PNG foi substituído e o JavaScript permanece idêntico à Build 01.10.

## Correções

**Hero:** nebulosa em camada independente mais ampla, chegando à região da headline e dissipando perto do texto abaixo. A máscara complementar remove o símbolo da camada de fundo; uma segunda máscara mostra o olho por cima, no mesmo enquadramento. Gradientes vertical e radial suavizam as extremidades e as laterais. Botões, posição e dimensões do olho foram preservados. Em 390px, ambos os CTAs continuam com 54px de altura e o mesmo início vertical.

**Serviços:** o pontilhado regular foi substituído por uma máscara de alfa aplicada diretamente à imagem. A transição usa uma borda irregular, fragmentos maiores próximos à imagem e fragmentos menores com menor opacidade à direita. Os fragmentos mostram pixels do próprio mockup. O overlay pontilhado foi desativado no celular. Estrutura, imagens, descrições e ações dos quatro cards preservadas.

**Método:** percurso começa mais acima, passa abaixo de Imersão, curva à direita para Direção e Criação e retorna para terminar à esquerda, antes da descrição de Evolução. Quatro nós pertencem à linha e acompanham o centro vertical dos títulos. Imersão e Evolução se deslocam 24px à direita; Direção e Criação, 24px à esquerda. A curva inicial foi afastada da primeira descrição após a revisão em 320px. Sem mudança de ordem semântica ou copy. Trajetórias anteriores permanecem ativas acima de 700px.

**Perspectiva:** símbolo e nebulosa receberam tratamento separado. A silhueta inteira permanece visível, com opacidade de 0,9 na camada do olho e brilho moderado de 1,08. A nebulosa fica mais discreta e com bordas dissipadas. Escala, centralidade, textos e relação visual texto/olho preservados.

**Links finais:** Explorar passa a ter seis links em duas colunas equilibradas. No grupo Contato, WhatsApp e Instagram ocupam as duas laterais; heading, CTA e e-mail permanecem no eixo central. Links com área mínima de 44px. Formulário e inputs não foram alterados.

## Validação

Preview Vercel do código auditado: commit `924f6e31d3c999cffbab1d39fbf2faf5f6a06ecb`, deployment `dpl_5y2YkJ14X38zXmbFAUvbsHkyzE65`, estado READY, target preview.

- **390, 375 e 320px:** revisão no Chrome, conferência visual de espaçamentos, máscaras, trajetória e rodapé. `scrollWidth` igual a `clientWidth`, sem overflow horizontal ou controles fora da área útil.
- A ferramenta usa iframe com scrollbar de 15px: áreas úteis de 375, 360 e 305px, respectivamente. Media queries usam a largura nominal selecionada.
- CTAs da Hero: 54px em todas as três larguras, início e término alinhados. Em 390px, olho e texto complementar mantêm as mesmas medidas e coordenadas da Build 01.10.
- Quatro nós do Método: diferença vertical de no máximo 0,04px em relação ao centro dos títulos nas larguras mobile auditadas.
- **768 e 900px:** sem overflow; o novo SVG de celular fica oculto e a trajetória tablet anterior permanece ativa.
- **1024, 1280 e 1440px:** comparação de 18 elementos por largura, totalizando 54 comparações. Nenhuma diferença nas dimensões, tipografia, camadas, opacidade e composição auditadas, desconsiderando apenas a origem da URL da preview.
- HTML e SVGs válidos, IDs únicos, referências de assets existentes e `git diff --check` sem problemas.
- Nenhuma nova animação; comportamento anterior de `prefers-reduced-motion` preservado. Sem dependências novas.

## Limites e preservação

Verificação feita no Chrome da preview, em larguras reais do iframe. Não houve teste físico em iOS/Safari ou Android nesta rodada. Os mockups provisórios continuam sendo os anteriores; a intensidade da fragmentação varia conforme a luminosidade de cada imagem.

Hero desktop, Posicionamento, Coleção, Projetos, Método desktop/tablet, Perspectiva desktop/tablet, CTA e formulário foram preservados. O footer desktop também permanece intacto.

Main conferida antes e depois, sem mudança: `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Nenhum merge realizado. Rodada encerrada para revisão visual.
