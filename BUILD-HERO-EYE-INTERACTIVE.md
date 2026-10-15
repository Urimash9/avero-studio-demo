# Hero — olho oficial com estrutura fixa, íris mascarada e nebulosa independente

## Base e escopo

- Repositório: `Urimash9/avero-studio-demo`.
- Branch: `feature/service-landing-page-pilot`, checkout existente, sem branch extra.
- Base do protótipo inicial: `7c70e493d65c92692a5cd4e58f1c33f6614b22d1`.
- Base confirmada antes da correção final: `8a0dfee0954c282e2a17d5cfb35fc49f5e623d41`.
- Código da correção final: `33ca6cb96236542e56683e34cf0dac820ab9ab31`.
- Intervenção exclusiva nas camadas decorativas da Hero. Conteúdo, fontes, CTAs, containers, altura e espaçamentos aprovados preservados.
- Main de referência: `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Sem merge ou promoção para produção.

## Assets oficiais, sem criação ou substituição de arquivos

Os PNGs enviados nesta rodada foram abertos diretamente no workspace e comparados aos WebPs lossless já usados no mobile. A decodificação é **idêntica em todos os pixels**, incluindo alpha. Portanto, são reutilizados os mesmos assets oficiais existentes, sem reexportação, recoloração do olho, upscale, reconstrução ou geração de outro símbolo.

| Arquivo fornecido | Asset utilizado | Dimensões |
| --- | --- | --- |
| `1000033764.png` | `assets/avero-eye-isolated-v1.webp` | 1774 × 887, RGBA |
| `1000033765.png` | `assets/avero-nebula-continuous-v1.webp` | 1536 × 1024, RGB |

SHA-256 dos PNGs recebidos:

- Olho: `733a956707d7d85712aef034810397885fbc661183a025e4d439b065ed953d32`.
- Nebulosa: `eb821ef91119327faa99203d406f04aaae0fa891e0168a84019570b0f6e868e1`.

`assets/avero-eye.png` deixa de fornecer a presença visual da Hero desktop. O arquivo continua intacto para o favicon e aplicações antigas fora desta rodada. O preload da Hero passa a apontar para o olho isolado oficial.

## Arquitetura de camadas

- `.hero-nebula-layer`: atmosfera independente, maior que o olho, opacidade `0.34`, máscara radial ampla e fade progressivo até transparência. A área útil foi ampliada sem alterar a Hero e reutiliza o tratamento estático de nebulosa da paleta B; nenhum filtro é animado.
- `.hero-eye-layer`: conserva as larguras e offsets laterais existentes. A proporção interna passa a ser a proporção nativa 2:1 do símbolo oficial; o centro vertical fica em 46% da Hero.
- `.hero-eye-iris-window`: janela fixa que recorta o centro óptico em `52% / 56.5%`. A máscara elíptica fica parada, portanto o conteúdo móvel não escapa da abertura.
- `.hero-eye-iris`: segunda leitura do **mesmo arquivo oficial**, posicionada por baixo da estrutura e movida somente dentro da janela. Nenhuma pupila é desenhada, reconstruída ou recolorida.
- `.hero-eye-structure`: leitura fixa do asset oficial acima da íris, com máscara complementar à janela. Contorno, extremidades, curvas e brilho externo não recebem `transform`.
- `.hero-shade-layer`: mantém a proteção de contraste já aprovada sobre o conteúdo.

A nebulosa não acompanha o contorno do olho e não cria uma moldura raster. O brilho continua vindo do próprio asset, sem bloom ou glow adicional.

## Movimento desktop

Ativação somente a partir de 901px, com `hover:hover`, `pointer:fine` e sem preferência de movimento reduzido.

- Cursor normalizado em relação à Hero, com coordenadas limitadas a `[-1, 1]`.
- Resposta nominal da íris: 9px horizontal / 6px vertical; incluindo idle, limites absolutos de 10px / 7px.
- Estrutura externa: fixa, sem parallax.
- Nebulosa: fixa, sem parallax.
- Interpolação exponencial: `1 - exp(-delta / 175)`. Constante de tempo de 175ms, sem overshoot ou bounce, independente da taxa de atualização.
- Ao sair da Hero, cancelar o pointer ou perder foco, o alvo volta ao centro. A posição atual interpola até esse alvo.
- Idle: até 0.45px / 0.30px, ciclos de aproximadamente 14s / 16.9s. Seu peso também interpola e diminui durante a observação do cursor.
- Não há rotação, deformação, expansão ou animação de brilho do asset.

## Mobile, reduced motion e fallback

- Mobile até 700px conserva integralmente as camadas, assets e enquadramentos aprovados. Permanece estático; não foi acrescentado loop contínuo em telas pequenas.
- Entre 701 e 900px, a presença do símbolo oficial é estática, usando a composição lateral existente.
- Eventos touch são ignorados pelo tracking, mesmo em um aparelho híbrido.
- `prefers-reduced-motion: reduce` cancela o RAF, limpa os offsets e mantém a íris centralizada. Estrutura e nebulosa já são estáticas por arquitetura.
- Sem JavaScript, as duas máscaras complementares recompõem o olho oficial em repouso e a nebulosa continua presente. A Hero não depende do controlador para exibir o símbolo.

## Performance

Um único RAF é dono do movimento. Apenas duas variáveis CSS são escritas no subtree decorativo e somente a íris as consome. Estrutura, nebulosa e textos não recebem offsets.

O retângulo da Hero é medido no primeiro evento de entrada/movimento e novamente após resize/scroll; não há leitura de layout por frame. O loop pausa fora do viewport e com documento oculto. A fase do idle é conservada na pausa e o delta é limitado ao retomar. Nenhum canvas, WebGL, dependência, filtro animado ou asset adicional.

## QA executado

### Navegador Chromium

- Comparação antes/depois em **390, 430, 768, 900, 1024, 1280 e 1440px**. Limiar de ativação também conferido em **901px**.
- Em todas essas larguras, `scrollWidth == clientWidth`: zero overflow horizontal da Home.
- Geometria de Hero, conteúdo, headline, texto de apoio, CTAs, assinatura e container do olho mobile: idêntica à base. Fontes, margens e paddings também coincidiram.
- Topos e alturas de todas as seções da Home e Footer: idênticos à base nas sete larguras comparadas.
- Assets oficiais visíveis e corretamente vinculados. Mobile com o mesmo olho e atmosfera da base.
- Entrada do cursor, olhar à direita, inversão para a esquerda, saída e retorno ao idle central observados por input real. Offsets observados: direita `7.828 / 3.948px`, esquerda `-6.102 / 0.434px`, retorno `0.173 / 0.510px`.
- Resize entre desktop e mobile desativa e reativa o efeito sem resíduos de offsets no mobile.
- Suspensão fora do viewport confirmada: estilo da Hero fica constante enquanto a seção está fora da tela; retoma ao voltar.
- Menu mobile por Enter e fechamento por Escape. Coleção avança para Arquitetura & Interiores e retorna a Gastronomia por teclado, sem alteração no componente.
- Console inspecionado: nenhum erro atribuível à aplicação observado; mensagens encontradas pertencem ao content-script da extensão do navegador.

### Verificação técnica do controlador

Harness temporário, fora do repositório, executou o código real do controlador em Node com RAF, eventos e media queries simulados. Passaram: limites, inversão sem snap, retorno central, touch ignorado, resize, invalidação do retângulo por scroll, pausa/retomada por viewport e visibility, reduced motion inicial e alterado em execução, breakpoint mobile, um RAF único, ausência de leituras de layout por frame e equivalência da resposta em 60/120Hz.

- `node --check script.js`: passou.
- `git diff --check`: passou.
- Comparação de pixels PNG/WebP: passou, igualdade exata.
- Diff: somente decoração/preload da Hero no HTML; CSS e JS novos acrescentados ao final, com todo o código aprovado anterior byte a byte preservado. Assets e páginas internas não foram alterados.

## Limitações e homologação

Primeiro protótipo funcional para revisão de amplitude, atraso, parallax e intensidade da nebulosa pelo usuário. O centro é uma composição mascarada do raster oficial, sem reconstrução 3D ou separação destrutiva do arquivo.

O navegador de QA não oferece emulação de media features, desativação global de JS ou viewport de 1920px. Reduced motion foi exercitado no controlador e revisado no CSS; fallback sem JS foi verificado pela arquitetura estática, sem afirmar teste visual com JS desativado. Safari/iOS e aparelhos físicos não foram testados. Não foi realizada captura de frame times/Lighthouse; não houve travamento perceptível durante a interação observada.

### Correção final da arquitetura de camadas

- Preview final inspecionado em Chromium a `1363 × 936`: identidade e geometria da Hero preservadas; nebulosa perceptível e dissolvida; nenhuma borda retangular observada.
- Movimento exercitado com entrada real de ponteiro: íris chegou a `7.361px / -0.784px` no teste, enquanto `transform` computado da estrutura e da nebulosa permaneceu `none`.
- Máscaras complementares confirmadas no CSS computado e zero overflow horizontal (`scrollWidth == clientWidth`, 1348px de área útil do documento naquele navegador).
- Console sem erro da aplicação. As mensagens observadas pertenciam ao content-script do navegador e à tela de autenticação da Vercel, fora do site.
- `node --check script.js` e `git diff --check` aprovados após a correção.
- O diff final altera somente as camadas decorativas da Hero em `index.html`, `styles.css` e `script.js`, além deste registro. Mobile continua estático; nenhuma regra do olho móvel aprovado foi modificada.

Não foi possível repetir em navegador automatizado local todos os breakpoints nesta correção porque o executável headless não estava disponível no ambiente. A revisão de escopo e media queries confirma que a interação continua restrita a desktop com ponteiro fino. Safari/iOS e aparelhos físicos permanecem fora da validação desta rodada.

Sem alteração em Serviços, Coleção, Projetos, Método, Perspectiva, CTA, Footer, wordmark, paleta ou páginas internas. Esta rodada termina no preview; nenhum refinamento adicional ou publicação em produção foi iniciado.
