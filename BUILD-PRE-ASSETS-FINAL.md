# Refinamento final pré-assets — Método e Coleção desktop

## Base e limite

- Branch existente `build-01-14-palette-b-home`; HEAD local/origin limpo confirmado antes da edição: `6d7600e0df653757e2cccfa25a467c1bbf3d94e0`.
- Fontes: AGENTS.md, README.md, BUILD-01.16A.1.md, BUILD-01.16A.2.md e BUILD-COLLECTION-ROTOR-FINAL.md.
- Alterados apenas o bloco desktop em `styles.css` e este registro. Nenhuma alteração em HTML, JS, assets, textos, tokens, Hero, wordmark, Serviços, Projetos, Perspectiva, CTA, formulário ou Footer.

## Método desktop

- O ajuste anterior aplicava left 24px/12px somente ao h3. Por isso os subtítulos permaneciam no alinhamento antigo, e os títulos ainda avançavam pouco em relação a Direção/Criação.
- As duas regras foram substituídas por margin-left no bloco `.method-step-copy`: **66px em Imersão**, **58px em Evolução**, incluindo título e subtítulo. Os h3 voltam ao fluxo natural, sem offset separado.
- Em relação ao preview anterior, títulos avançam **42px / 46px** e subtítulos **66px / 58px**. A caixa disponível se reduz com a margem, conservando folga até a borda direita.
- Em 1280px, início de Imersão fica 54.8px à direita de Direção; Evolução fica 58px à direita. Seguem aproximadamente o meio da palavra Direção, com encaixe semelhante e respiro maior dos nós/curva.
- Direção/Criação, coordenadas verticais, dimensões da rota, SVG, paths, nós, stroke e animação de pulso intactos. Não foi necessário redesenhar a linha.

## Limpeza sob a roda desktop

- A interferência vinha do campo global `.page-flow`, atrás das faces translúcidas; o SVG local `.collection-axis` já estava oculto no rotor desktop. Aumentar z-index das faces não impediria a transparência de revelar esse fundo.
- Adicionada uma camada neutra `::before` na `.collection-system.is-enhanced.is-radial`, com a **mesma cor existente `var(--bg-primary)`**. Isolation conserva essa camada acima do campo global e abaixo da engine/roda; z-index −1 e pointer-events none.
- Máscaras lineares em dois eixos, combinadas por intersect: fade horizontal entre **24% e 40%**, área opaca à direita; fade vertical nas bordas até **6% / 94%**. Inset vertical −56px acomoda o fade no respiro da própria Coleção, sem uma caixa dura nem uma alteração do layout.
- A área central opaca cobre também os extremos projetados da biblioteca 3D, não apenas sua caixa central. A textura/linha externa continua aparecendo fora dessa região e se dissolve antes de atravessar os assets.
- Nenhuma alteração de opacidade, brilho, dimensões, posição, inclinação, câmera, profundidade, raio, conteúdo ou comportamento do rotor. A transferência, seus proxies, timings, easing e movimento ambiente continuam no JS aprovado, byte a byte.
- Ambos os ajustes restritos a **min-width:901px**. Não há camada nova nem deslocamento de texto até 900px.

## QA

- Chromium / Home oficial pelo Color Lab, sem override de tema: **390, 430, 1024, 1280 e 1440px**, incluindo também a fronteira **900/901px**.
- Comparação DOM com a base: geometria dos quatro títulos/subtítulos idêntica em 390/430/900. Direção e Criação idênticas em todas as larguras. SVG desktop completo idêntico antes/depois; mesmos paths, nós e camadas de energia.
- Desktop: títulos/subtítulos dos dois extremos iniciam juntos, mais à direita; leitura e respiro conferidos. Sem colisão com o traçado ou aproximação da borda. Altura da seção Método preservada.
- Coleção desktop inspecionada com a máscara ativa e faces legíveis, sem linha de fundo atravessando a roda. Composição mobile e sua ausência de máscara confirmadas.
- Sem overflow horizontal ou imagens quebradas nos breakpoints. Próximo/anterior e teclado da Coleção, estado final/card/contador e limpeza dos proxies conferidos. Menu mobile, navegação interna, Projetos e seleção de interesse no contato revisados; sem envio de mensagem.
- Console sem erro atribuído à aplicação observado; mensagens da extensão do navegador diferenciadas do site.
- `node --check script.js` e `git diff --check` aprovados. HTTP local da Home, CSS e JS com status 200 e conteúdo completo lido. Diff final revisado e limitado aos dois pontos desktop.

## Preservação e entrega

- Mobile íntegro; pulso/reduced motion e a troca física da Coleção preservados pelo script inalterado. Nenhum asset substituído e nenhuma dependência adicionada.
- Main continua `dd9257f9c2c42d28d421a300727d6aef148f4b63`; sem merge ou publicação/promoção em produção.
- Limite: inspeção Chromium/iframe, sem aparelho físico ou Safari/iOS. Máscara CSS estática, sem novo custo de animação contínua.
- Rodada encerrada após estes dois ajustes; nenhuma implementação de assets ou motion de Hero iniciada.
