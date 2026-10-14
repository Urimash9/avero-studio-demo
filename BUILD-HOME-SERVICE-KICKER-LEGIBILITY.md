# Home / Serviços — legibilidade das microheadlines

## Base e escopo

- Base aprovada: `aa95dd51ed284408a79b8b585df73772cdfd7d46`.
- Branch mantida: `feature/service-landing-page-pilot`.
- Escopo visual: somente os quatro `small` em `#servicos .service-kicker`.
- Main intacta. Sem merge ou promoção para produção.

## Tratamento

Frases: PRESENÇA QUE POSICIONA, PÁGINAS QUE CONVERTEM,
EXPERIÊNCIAS QUE VENDEM e BASE PARA CRESCER.

- Champagne claro oficial `--champagne-light` / `#D2C2A4` nas quatro frases,
  conforme a direção atual, com a mesma lógica visual em todos os cards.
- Sombra escura curta, sem glow claro ou saturação nova.
- Pseudo-elemento absoluto atrás de cada frase: halo escuro local,
  gradiente elíptico de bordas transparentes (`closest-side`).
- Apoio de 10px vertical e 24px horizontal além do texto, sem padding real,
  box, borda, tarja, backdrop-filter, blur, imagem ou animação nova.
- `isolation` mantém o apoio atrás da própria microheadline;
  `pointer-events: none` preserva interação.
- Nenhuma mudança em tamanho, peso, line-height, tracking, posição ou margem
  do texto; nenhum reflow ou mudança na estrutura dos cards.
- Regra limitada à Home por `#servicos`; páginas internas não têm esse bloco.

## Preservação

HTML, JavaScript, rotas e assets idênticos à base. Nenhuma alteração em títulos,
descrições, CTAs/setas, bordas, recortes, slots, imagens, órbita, proporções,
posições dos cards, espaçamentos, outras seções ou páginas internas.
O stylesheet anterior permanece integralmente preservado antes do bloco novo.

## QA

Referência anterior registrada em 320, 360, 390, 430, 768, 900, 1024,
1280 e 1440px. QA do tratamento será registrado após conferir o preview.
Checks: `node --check script.js` e `git diff --check`.
Sem motion novo; suporte existente a reduced motion preservado.
Ambiente: Chromium/iframe, sem Safari/iOS ou aparelhos físicos.
