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

Referência anterior e preview READY comparados em **320, 360, 390, 430, 768,
900, 1024, 1280 e 1440px**:
- Zero overflow horizontal, quatro imagens carregadas em todas as larguras.
- Altura/posição da seção idênticas à base.
- Medidas/posições de cards, microheadlines, títulos e imagens idênticas à base.
- Tipografia (tamanho, peso, line-height e tracking) e opacidade dos cards iguais.
- Pseudofundo computado pelo navegador, com bordas transparentes, sem filter
  ou backdrop-filter. Cor champagne claro e sombra local nas quatro frases.
- Revisão visual de cada frase no mobile e da composição orbital desktop:
  leitura mais clara, sem box duro, interferência em títulos/CTAs ou mudança
  nos recortes/fragmentação.
- Avanço orbital por Enter funcional; slots, nome acessível do botão e
  indicação de destaque atualizados corretamente.
- CTA SEO abriu a rota interna na mesma aba. Zero seletores do tratamento
  na página interna, altura mobile igual à base (6041px) e zero overflow.
- Console sem erro da aplicação observado; avisos de metadata da extensão
  do navegador separados de erros do site.
- `node --check script.js` e `git diff --check` aprovados.
- Comparação de fonte confirmou preservação integral do CSS anterior,
  HTML/JS, assets, configuração e quatro páginas internas.

Sem motion novo; suporte existente a reduced motion preservado.
Ambiente: Chromium/iframe, sem Safari/iOS ou aparelhos físicos.
