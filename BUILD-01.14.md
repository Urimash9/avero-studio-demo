# Build 01.14 — Paleta oficial B e continuidade champagne

## Base e escopo

- Branch: `build-01-14-palette-b-home`.
- Base aprovada: `a5e49d406ace45ee61dfce1f6e2cb8fc60206f68`, branch `build-01-13-2-recovery-method`.
- Paleta escolhida pelo usuário: **B — Prata Nebular + Champagne Cósmico**.
- A permanece como controle do laboratório. C permanece acessível como estudo histórico descartado.
- Sem merge, alteração da main ou promoção de produção.

## Sequência de implementação

1. Corrigir B no Color Lab antes de tocar a Home.
2. Publicar o checkpoint `e3d97b4654a7d978e0d67ee97a10e67724c998d9` e validar Método B em 390/1280px.
3. Capturar a Home anterior, sem overrides cromáticos do laboratório.
4. Integrar os tokens e as declarações cromáticas aprovadas no CSS oficial.
5. Publicar `604bc96b591a242cf2bfbdc29a98a6fa04787b17` para QA da Home.
6. Documentar o sistema oficial e consolidar esta build.

## Arquivos

- `index.html`: classe oficial `avero-palette-b`; apenas paths/gradientes do Método além disso.
- `styles.css`: tokens oficiais e regras de material/luz por seção.
- `review/color-lab.js`: variante B do path/fade, restauração dos paths V2 para A/C; modo `view=home` para enquadrar o CSS oficial sem injetar tema.
- `review/color-lab.css`: último fade da curva B em champagne; declarações da A preservadas.
- `review/color-lab.html`: identificação da B oficial/C histórica e larguras adicionais de revisão.
- `BUILD-01.14.md` e `AVERO-COLOR-SYSTEM-V2.md`: decisão, tokens, regras e QA.

`script.js` permanece byte a byte igual à base. Nenhum asset foi substituído ou publicado. A alteração local preexistente em `assets/collection-gastronomy.png` foi preservada no checkout e excluída dos commits.

## Integração oficial

Os tokens ficam em `:root` no `styles.css`. Aliases antigos são mantidos para compatibilidade. As regras cromáticas oficiais usam `html.avero-palette-b`. Essa classe é estática na Home e não depende de estado JS.

A Home não importa CSS/JS de review e não contém `data-theme`, `data-color-lab`, iframe ou srcdoc. O laboratório remove a classe oficial somente de sua cópia, permitindo comparar A/C sem herdar os capítulos quentes oficiais. A/B/C e os controles de revisão continuam disponíveis.

Foram selecionadas apenas declarações de cor, material, borda, sombra, glow e tratamento das camadas atmosféricas. Regras do gutter de revisão, controles do laboratório e experimento C não foram transplantadas.

## Correção da curva champagne

O usuário confirmou que o trecho problemático era a **curva direita do Método**.

- Desktop: chegada ao nó 02 e saída para a curva compartilham a tangente `(25,25)`; a descida começa antes, sem segmento longo seguido de queda.
- Phone/compacto: chegada e saída no nó 02 compartilham a tangente `(23,23.5)`; o desenho permanece contínuo.
- A tangente do encontro anterior também permanece proporcional/contínua.
- Nós, início, retorno inferior, fim à esquerda e posições dos textos não mudaram.
- Fade horizontal: offsets `0 / .16 / .66 / .84 / .93 / 1`; opacidades `0 / .58 / .58 / .4 / .2 / 0`.
- O declínio começa em `.66`; os dois últimos stops recebem champagne dessaturado. A borda externa chega a zero gradualmente.
- Linha majoritariamente prata, dois nós quentes, sem quina ou corte seco.

Os mesmos paths/stops validados em B foram usados nos SVGs nativos da Home. A/C restauram a geometria/fade originais do laboratório.

## Hero, nebulosa e olho

- Headline destacada em Silver Lume; CTA principal material claro, texto escuro.
- Nebulosa mobile: `saturate(.38) brightness(.9)`, tratamento não destrutivo.
- Fluxo global atmosférico: `saturate(.32) brightness(.9)`.
- Enquadramento, extensão, máscaras de extremidade, opacidades e posição do olho preservados.
- `avero-nebula-continuous-v1.webp` e `avero-eye-isolated-v1.webp` continuam independentes no mobile.
- Olho sem recoloração/filtro novo; nenhuma camada champagne na Hero ou Perspectiva.
- Desktop mantém sua arquitetura aprovada. O background de `hero-art` usa luminosity; não há filtro aplicado ao elemento pai do olho.
- Perspectiva mobile: olho `.74`, nebulosa `.17`, composição mantida.

## Ritmo cromático

Hero fria → Posicionamento neutro → Serviços frios com acento da solução em destaque → Coleção neutra → Projetos aquecidos → Método quente controlado → Perspectiva fria → CTA aquecido → Footer profundo com assinatura quente.

Projetos/CTA usam glow quente `.16`; Método/Footer, `.075`. A borda do formulário usa `.52`, a camada quente do card `.055`. Champagne não recolore imagens nem preenche botões inteiros. ~18% é alvo perceptivo aprovado, não medição por área de pixels.

## QA

### Larguras e comparação

- Enquadramentos: **320, 360, 390, 430, 768, 900, 901, 1024, 1280, 1440px**.
- Prioridades: 390px e 1280px.
- O Chrome de revisão reserva 15px de gutter nativo no modo Home: `scrollWidth == clientWidth` em todos os casos (305/345/375/415/753/885/886/1009/1265/1425). A largura da viewport configurada é a indicada acima; nenhum overflow da Home. A ferramenta externa pode rolar horizontalmente para enquadrar 1440px em uma janela menor.
- Antes/depois: Hero, Projetos, Método, CTA e Footer em 390/1280px, com imagens completamente carregadas.
- Medidas de 22 blocos na comparação antes/depois: mesmas larguras, alturas, fontes, line-height, grids, padding, margin e transforms nas duas referências. Nenhuma diferença estrutural encontrada.
- Textos do Método: quatro transforms `none` em todas as larguras.
- CTAs mobile: mesma altura final 54px; texto principal sem wrap.
- Serviços/Projetos/Coleção mantêm imagens, crops e máscaras; fragmentação utiliza o mesmo SVG.
- A teve as cores computadas comparadas ao checkpoint anterior: equivalentes.
- As cores computadas da Home correspondem a B corrigida; mudanças de destaque em Serviços acompanham o slot ativo, como antes.

### Contraste

| Par de tokens | Contraste |
| --- | ---: |
| CTA principal, texto escuro / prata | 15,52:1 |
| Texto secundário / fundo principal | 9,48:1 |
| Placeholder / superfície | 8,50:1 |
| Chip / superfície | 8,50:1 |
| Texto muted / fundo principal | 5,09:1 |
| Champagne / fundo secundário | 10,90:1 |
| Borda funcional / superfície | 4,56:1 |
| Foco azul / fundo principal | 7,59:1 |

São verificações dos pares de tokens, somadas à inspeção visual dos fundos compostos; não constituem uma auditoria WCAG completa.

### Interações e checks

- Menu mobile abre, fecha por Escape e mantém foco.
- Inputs/textarea editáveis com alinhamento interno à esquerda; foco azul visível; chip alterna aria-pressed. Formulário não enviado ao WhatsApp durante QA.
- Projetos: troca para Vértice, um slide ativo e aria-hidden coerentes.
- Serviços desktop: navegação por teclado altera a solução em destaque.
- Coleção: avanço manual mobile e por teclado desktop; contador 01→02/12; rotor ambiental observado mudando de ângulo sem scroll. Velocidade **3.2deg/s** preservada no JS.
- Reduced motion: CSS/JS da base revisados e preservados, sem novo motion. A ferramenta de browser não ofereceu emulação desse recurso; não se afirma teste visual em modo reduce.
- Console da aplicação e registro de erros da revisão: sem erros encontrados.
- `node --check script.js`, `node --check review/color-lab.js` e `git diff --check`: passaram.
- Diff: HTML inalterado fora da classe oficial e SVGs autorizados; todas as regras de layout anteriores preservadas; JS/assets fora do commit.

## Limitações e encerramento

- Assets provisórios continuam provisórios, sem novo tratamento nas imagens dos negócios.
- Chrome desktop foi usado nos enquadramentos responsivos; não houve teste em aparelhos físicos.
- Nenhuma biblioteca, dependência ou animação foi adicionada.
- Color Lab preservado. Coleção, conteúdo, layout e interações preservados.
- A publicação desta rodada é somente preview da branch. Main e produção permanecem intactas.
