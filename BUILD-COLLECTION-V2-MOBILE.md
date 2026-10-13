# Coleção Avero V2 — correção do enquadramento mobile

## Decisão e base

A apresentação mobile dos commits `7d18dec` e `8b73a34` não foi aprovada.
Este registro substitui a orientação anterior deste arquivo.

Branch `feature/colecao-avero-v2-assets`; restauração a partir de
`9e673f17e0a192d46108f8cd7017b94ede133355`, já com os 12 assets V2.

## Componente restaurado

- `script.js` e `review/color-lab.html` restaurados integralmente da base.
- Removido o bloco CSS que ampliava o destaque para 3:2/largura integral,
  reposicionava e reduzia o rotor, e reorganizava a legenda.
- Card compacto, rotor ao lado, dimensões, perspectiva, radius, câmera,
  opacidade, posições, controles, timing e troca física voltam ao modelo anterior.
- A base possui botões e teclado; não possui navegação da Coleção por swipe/drag.
  O gesto acrescentado na implementação rejeitada também foi revertido,
  preservando o comportamento da versão anterior.

## Ajuste exclusivo das imagens

Somente `@media(max-width:900px)`, mantendo `object-fit:cover`.
Nenhuma regra nova de tamanho, aspect-ratio, layout, opacidade ou espaçamento.

O foco horizontal varia por arquivo; foco vertical permanece em 50%.
O mesmo foco vale para destaque, faces e imagem temporária da transferência.
`transform-origin` acompanha o foco, para que a escala interna de crop existente
não recentralize a imagem durante a troca. Não há mudança no motor de animação.

| Universo | Foco horizontal |
| --- | --- |
| Gastronomia | 35% |
| Arquitetura & Interiores | 0% |
| Hotelaria | 52% |
| Estética & Beleza | 40% |
| Saúde | 35% |
| Moda | 25% |
| Varejo | 48% |
| Barbearia | 42% |
| Coquetelaria | 50% |
| Móveis Planejados | 40% |
| Institucional Premium | 52% |
| Solução Tecnológica / Comercial | 55% |

O enquadramento privilegia o núcleo visual de cada composição. O slot aprovado
é mais estreito que os arquivos 3:2: partes laterais continuam recortadas, e
textos pequenos incorporados às imagens continuam limitados pelo tamanho do card.
Não houve reexportação, recriação, distorção, troca de arquivo ou de ordem.

## Verificações locais

- `node --check script.js` e `git diff --check` aprovados.
- Harness Node/VM das funções reais: overlap, copy/contador/ARIA, fila de navegação,
  decode, resize/viewport, reduced motion e endpoints/crop da transferência aprovados.
- Script, Color Lab, HTML e todos os assets idênticos à base `9e673f1`.
- Acima de 900px não existe alteração nova de enquadramento ou geometria.
- Chromium / Home oficial em 360, 390, 430, 900, 901, 1024, 1280 e 1440px:
  mesmas medidas, posições, geometria do rotor e alturas de todas as seções da base,
  sem overflow. Desktop conserva também o object-position central original.
- Os 12 universos foram percorridos em 390px; arquivos carregados, ordem,
  contador e focos conferidos. Próximo/anterior, Home e resize testados.
- Foco e origem de escala das duas imagens temporárias conferidos durante a troca.
- Arraste horizontal conserva o item ativo, como na base sem swipe/drag.
  Sem erros da aplicação observados; avisos da extensão do navegador separados.
- Sem aparelho físico ou Safari/iOS disponível; mobile validado em iframe Chromium.

Hero e demais seções preservadas. Main intacta; sem merge ou promoção a produção.
