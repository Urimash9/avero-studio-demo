# Build 01.16A — identidade, limpeza e alinhamento / Rodada A

## Base e escopo

- Repositório: `Urimash9/avero-studio-demo`.
- Branch existente: `build-01-14-palette-b-home`; sem branch adicional conforme AGENTS.
- HEAD confirmado antes de editar: `b94ff49444e0d332931e4fc59a651bac2b58618d`, fechamento da Build 01.15.
- Leituras: AGENTS, README, BUILD-01.13.2, BUILD-01.14, BUILD-01.15 e AVERO-COLOR-SYSTEM-V2.
- Paleta B oficial mantida. Sem merge, alteração de main ou promoção para produção.

## Wordmark provisório

O PNG enviado pelo responsável foi integrado em `assets/avero-wordmark-provisional-01-16a.png`. É uma cópia byte a byte do upload: RGBA, 2172×724px, aproximadamente 1,6MB. O asset continua **provisório**, sem tratamento como assinatura final.

- Aplicação no header e footer, desktop e mobile.
- O raster antigo permanece preservado; seu background, máscara lateral e screen blend foram desativados somente na marca exibida.
- Transparência nativa; imagem completa com proporção 3:1, sem nebulosa adicional, crop, filtro, blur, upscale, glow ou drop-shadow novo.
- Larguras existentes mantidas: 185px acima de 700px; 155px no phone. A imagem fica centrada verticalmente no slot original, sem ampliar o header.
- Nome acessível e links de início preservados; imagem interna decorativa para evitar anúncio duplicado.
- Nos tamanhos reais inspecionados, não há caixa ou halo retangular perceptível. A silhueta AVERO mantém leitura clara. Em 155px, a linha fina e pequena “STUDIO” perde facilidade de leitura; não houve tentativa de mascarar essa limitação.
- O arquivo contém textura e irregularidades em suas bordas quando ampliado. A integração reduz o arquivo, sem retoque. Recomenda-se substituição futura por asset final limpo, sem reabrir a identidade nesta rodada.

## Limpeza da Hero

- Removido do HTML o link inteiro do mouse/ROLAR, incluindo a seta desenhada pelos pseudoelementos do mouse.
- Nenhum alvo invisível ou foco residual. Regras históricas ficam inertes por não existir o elemento.
- Acima de 700px, padding inferior de 72px no conteúdo conserva o espaço que o indicador ocupava no fluxo; não foi redistribuída a composição da Hero.
- Em 1280/1024/1440px, Hero permanece com 710px e header com 83px. Headline/CTAs deslocaram apenas +0,09375px por arredondamento em relação à referência anterior: efeito visual desprezível.
- Em 390px, Hero, headline, CTAs e header têm as mesmas coordenadas/alturas da referência. O indicador já estava oculto nesse breakpoint.
- Olho, atmosfera, headline, CTAs, assinatura e estrutura geral preservados. Íris congelada para rodada futura.

## Posicionamento

- Desktop acima de 900px: título desce 20px; padding superior do texto passa de 54 para 26px. Padding inferior de 28px compensa sua altura para preservar o respiro da trajetória.
- Em 901–1100px: texto passa de 34 para 22px de padding superior, compensado por 12px inferiores.
- Em 1280px, início das caixas título/texto passa de 54px de diferença para 6px; em 1024px fica em 2px. Mantidas colunas, largura, assimetria e espaçamento da seção.
- Removidos do HTML apenas os índices 01/02/03 de VISÃO/MOVIMENTO/RESULTADOS, em todas as larguras. Os contadores da Coleção e outras numerações continuam intactos.
- Margem esquerda dos três títulos zerada para remover o antigo recuo dos índices no desktop. No mobile essa margem já era zero; a retirada do índice elimina sua linha e margem próprias.
- Alternância mobile, headings, descrições, nós, paths, gradientes e strokes preservados. Os segmentos continuam dimensionados pela altura dos textos.

## Áreas preservadas / Rodada B

- `script.js` byte a byte idêntico à base.
- CSS anterior integralmente preservado; somente bloco 01.16A anexado.
- HTML fora de wordmarks, link ROLAR e três índices idêntico à base, verificado por comparação executável.
- Rotor/carrossel: nenhuma alteração de opacidade, posição, profundidade, geometria, timing, easing, velocidade ambiental, catálogo ou troca física.
- Nenhum keyframe ou motion novo; linhas continuam estáticas. Pulso/veia/luz e refinamentos do rotor ficam para Rodada B.
- Serviços, Coleção, Projetos, Método, Perspectiva e CTA não redesenhados. Color Lab, tokens cromáticos e configuração Vercel intactos.

## QA

Chromium no preview da branch, com Color Lab em `view=home` (CSS oficial sem overrides cromáticos).

- Larguras validadas: **390, 430, 768, 1024, 1280 e 1440px**, mais transição **900/901px**.
- Em todas: `documentElement.scrollWidth == clientWidth` e `body.scrollWidth == clientWidth`; zero overflow horizontal da Home. O helper externo pode rolar para enquadrar 1440px.
- Wordmarks carregados, proporção mantida, nenhum asset com dimensão natural zero, 12 lâminas presentes, índices e mouse/ROLAR ausentes.
- Inspeção visual: header/Hero e Posicionamento em desktop e mobile; footer 1280/390; header 768. Marca sem recorte retangular, navegação sem colisões.
- Menu mobile abre e fecha com Escape; link Serviços fecha o menu e mantém navegação interna. Todos os hrefs internos apontam para IDs existentes.
- Coleção desktop avança 01→02 e retorna por teclado a 01; mobile avança 01→02. Estado final sem aria-busy e sem proxies residuais.
- Projetos avança para Vértice Clínica; formulário permite edição dos três campos obrigatórios e chip Coleção Avero alterna aria-pressed.
- Callback real do formulário executado isoladamente em Node/VM: formulário inválido não abre janela; válido gera URL WhatsApp com serviço, acentos e quebras de linha, noopener/noreferrer e fallback correto. `window.open` interceptado; nenhuma mensagem enviada.
- Console inspecionado: sem erro atribuído à aplicação observado; erros da extensão do navegador separados.
- HTTP local: `/`, `/styles.css`, `/script.js` e PNG novo retornam 200 e conteúdo não vazio.
- `node --check script.js` e `git diff --check` aprovados. Diff revisto e comparação de preservação aprovada.

## Publicação e limites

- Commit de implementação: `59e811c477f84ed6534a3a28901a9188854e7000`.
- Preview de implementação confirmado READY: `https://avero-studio-demo-2x7fcl9zv-john-e7bd.vercel.app/`.
- O fechamento documental gera outro preview com implementação idêntica; commit/URL exatos são informados na entrega.
- Proteção Vercel preservada; preview pode exigir autenticação.
- Validação em Chromium/iframe, sem Safari/iOS ou dispositivo físico. Reduced motion preservado pelo código intacto; sem nova animação e sem emulação visual dessa preferência.
- Main continua em `dd9257f9c2c42d28d421a300727d6aef148f4b63`.
- Encerramento na Rodada A: não iniciar íris, motion de linha, refinamento do rotor ou redesign de Serviços/Home.
