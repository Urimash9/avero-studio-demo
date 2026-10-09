# Build 01.16B.2 — limpeza dos índices de Serviços

## Base e escopo

- Branch existente `build-01-14-palette-b-home`; base aprovada `037f7812c408a8459015234ac983b09a0f262db4`.
- Pedido atual autoriza somente retirar a identificação principal 01/02/03/04 dos quatro serviços. Essa autorização pontual prevalece sobre registros anteriores que congelavam Serviços.
- Removidos os quatro spans decorativos `.num` em `index.html`, tanto para desktop quanto mobile.
- Subtítulos, títulos, descrições, imagens, links de ação, estrutura e controle de destaque permanecem idênticos. Nenhuma mudança em CSS, JavaScript, assets ou outras seções.
- O kicker já usa flex: com um único subtítulo, o gap deixa de ocupar espaço. Subtítulo e título compartilham a mesma borda esquerda, sem margens novas ou vazios residuais.

## Validação

- Home oficial no Chromium, via Color Lab em `view=home`, sem overrides de tema: 320, 390, 430, 768, 1024, 1280 e 1440px. Zero overflow horizontal e nenhum índice de Serviço restante.
- Inspeção visual em 390, 768 e 1280px. Alinhamentos medidos dos quatro cards em 390, 768, 1024 e 1280px: deslocamento horizontal entre subtítulo e título igual a zero. Imagens dos quatro serviços carregadas.
- Controle desktop “Destacar próxima solução” muda de Sites institucionais para Landing Pages normalmente.
- Console sem erros da aplicação observados; mensagens da extensão do navegador identificadas separadamente.
- HTTP local: raiz, CSS, JavaScript e as quatro imagens de Serviços retornam 200.
- Comparação exata do HTML com a base confirma somente os quatro spans removidos. `node --check script.js` e `git diff --check` aprovados.
- Sem teste em aparelho físico ou Safari/iOS; não foram repetidos testes extensos das interações não alteradas.

## Preservação

- Hero, paleta B, linhas, Método, Coleção/rotor, Projetos, Perspectiva, CTA, formulário e Footer intactos.
- Main permanece em `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Sem merge ou promoção para produção.
