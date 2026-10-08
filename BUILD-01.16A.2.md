# Build 01.16A.2 — respiro de Imersão e Evolução desktop

- Branch existente: `build-01-14-palette-b-home`.
- Base confirmada e limpa: `f9d59b2442ee6311b1d0d0e3566646f15c947d8a`.
- Fontes: AGENTS.md, README.md, BUILD-01.16A.1.md e BUILD-01.13.2.md.
- Pedido exclusivo: afastar da curva os títulos Imersão e Evolução no desktop.

## Implementação

- Apenas `styles.css`: duas regras dentro de `@media(min-width:901px)`.
- IMERSÃO: posição relativa, deslocamento horizontal de +24px.
- EVOLUÇÃO: posição relativa, deslocamento horizontal de +12px.
- Direção, Criação, todos os subtítulos, caixas das etapas e coordenadas verticais intactos. Sem alteração de fluxo ou dimensões.
- Os três SVGs da linha, pontos, gradientes e fluidez são idênticos à base. Nenhum ajuste de shape necessário.
- Mobile/compacto até 900px sem regras novas. Sem motion novo.
- HTML, JavaScript, assets, olho, Hero, paleta, Serviços, Coleção/carrossel, CTA, formulário e Footer não alterados.

## Validação

- Chromium no preview da implementação, Home oficial pelo Color Lab sem overrides de tema.
- Geometria comparada em 390, 430, 768, 900, 901, 1024, 1280 e 1440px: zero overflow da Home e zero imagens quebradas.
- Até 900px, os quatro títulos e subtítulos têm as mesmas coordenadas e dimensões locais da base. Acima de 900px, apenas x de Imersão/Evolução varia +24/+12px; Direção/Criação e y/altura/largura dos quatro títulos não variam.
- Subtítulos, dimensões da seção e SVG visível preservados em todas as larguras. Comparações usam coordenadas locais da seção para evitar a fase transitória de resize de outras interações preexistentes.
- Inspeção visual em 1024, 1280 e 1440px: respiro maior sem quebrar a unidade da composição.
- Console sem erro da aplicação observado; erros da extensão do navegador identificados separadamente.
- `node --check script.js` e `git diff --check` aprovados; diff revisto e restrito ao escopo.
- Implementação: `afbb9584016d8871747a705bf654d0afdbb309c8`.
- Preview de implementação READY: `https://avero-studio-demo-1ltr6brwc-john-e7bd.vercel.app/`. O fechamento documental gera preview visualmente idêntico; URL/commit finais na entrega.
- Main preservada em `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Sem merge ou produção.
- Limite: sem Safari/iOS físico. Rodada encerrada após este ajuste.
