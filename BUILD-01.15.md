# Build 01.15 — fechamento desktop / biblioteca radial expandida

## Base e branch

- Repositório: `Urimash9/avero-studio-demo`.
- Branch de trabalho existente: `build-01-14-palette-b-home`.
- HEAD confirmado antes de editar: `54a979f5938408c4e45aca3cda2032aeee0ebb42`.
- Checkpoint da Build 01.14: `d624bbaaa9606c1724a54c4be76559bc0c04d5c7`.
- O HEAD já trazia a primeira implementação da 01.15, sem seu documento final. Essa implementação foi revisada e refinada; não foi reiniciada.
- Leituras: `AGENTS.md`, `README.md`, `BUILD-01.13.2.md`, `BUILD-01.14.md`, `AVERO-COLOR-SYSTEM-V2.md` e registros da coleção 01.12/01.13.
- Mesma branch conforme AGENTS; nenhuma branch extra, worktree, merge, mudança de main ou promoção para produção.

## Coleção desktop

Princípio: **biblioteca radial expandida**. A introdução mantém sua coluna e o projeto ativo mantém o protagonismo. A biblioteca lateral compartilha o catálogo e o mecanismo físico já aprovado no mobile.

- Um rotor, doze lâminas com frente/verso, câmera CSS e grupo de inclinação; sem bibliotecas novas.
- O eixo do rotor coincide com a borda direita da área do conjunto. O `overflow:clip` local contém a metade externa; não se oculta metade do catálogo. Todas as doze direções continuam navegáveis.
- A largura do stage desktop é 98% da área do conjunto, contra 90% na primeira implementação. Raio de 42% do stage; lâmina com largura de 52% e altura de 104% do raio. A proporção anterior de 130% deixava as lâminas excessivamente altas.
- Inclinação global desktop de −30°, contra −24° no HEAD inicial e −10° no compacto. A perspectiva conserva a leitura espacial sem inclinar a tipografia.
- O rotor fica centralizado verticalmente. A área usa altura `clamp(510px,46vw,660px)` para acomodar a projeção em 1024–1440px.
- Destaque com 66% da largura do conjunto e proporção 16:10; copy e CTA permanecem independentes do rotor.
- Troca física compartilhada: alinhamento do slot ao portão de extração −60°, dois proxies projetados com os cantos reais da face, saída do próximo item e retorno do anterior, permuta do mapa de conteúdos.
- Travessia de 600ms, copy atualizada aos 140ms, retomada após 450ms e velocidade ambiental de 3,2°/s preservadas. Ambiente não troca a direção ativa.
- Controles anterior/próximo, teclado (setas, Home, End), contador 01/12, anúncio acessível e botão de pausa preservados.
- Pausas por interação, foco/ponteiro, visibilidade, aba oculta, preferência de movimento reduzido e interrupção por resize/scroll continuam no mesmo proprietário de estado.

## Perspectiva desktop

O raster antigo fechado foi substituído pela mesma base oficial usada no mobile:

- `::after`: `assets/avero-eye-isolated-v1.webp`, transparência nativa, tamanho 96%, opacidade .70, sem filtro sobre o símbolo.
- `::before`: `assets/avero-nebula-continuous-v1.webp`, opacidade .13, tratamento cromático oficial e fade vertical independente.
- Layout, colunas, hierarquia textual, posição geral e papel secundário preservados. Camadas estáticas; sem animação da íris.
- Assets originais preservados; nenhum arquivo de imagem foi criado ou substituído nesta build.

## Microrefinos

- Remoção do ponto/eixo orbital legado do desktop, que sobrava sobre o novo mecanismo radial.
- Ajustes de proporção, altura útil, centro vertical e inclinação do conjunto.
- Fundo suave atrás da legenda do destaque para preservar contraste quando uma lâmina passa ao fundo; sem nova caixa ou alteração da copy.
- Revisão das demais áreas sem abrir novas frentes: Hero, Posicionamento, Serviços, Projetos, Método, CTA e Footer não receberam mudanças estruturais ou overrides novos.
- Paleta B — Prata Nebular + Champagne Cósmico — e Color Lab intactos.

## Preservação

- `index.html` idêntico ao checkpoint 01.14.
- CSS da 01.14 íntegro antes do bloco 01.15; novas regras visuais limitadas a `min-width:901px`.
- Comparação executável da função de geometria compacta com d624bba em quatro combinações de largura/altura: propriedades CSS e geometria idênticas.
- JavaScript fora da Coleção, incluindo menu, formulário, Projetos e Serviços, idêntico ao checkpoint.
- Geometria compacta, rotor mobile −10°, timings, catálogo, labels, imagens e olho da Perspectiva mobile preservados.
- Hero desktop congelada para motion futuro: nenhuma alteração estrutural, separação de íris ou movimento novo.
- Serviços não redesenhados; nenhuma dependência, framework ou configuração Vercel alterada.

## QA e evidências

Chromium no preview da branch, usando o modo `view=home` do Color Lab (CSS oficial, sem overrides cromáticos).

- Larguras: **1280 (prioridade), 1024, 1440, 900, 768, 430, 390**, além das transições **901 e 320px**.
- Medições feitas após a geometria JS acompanhar o resize: `documentElement.scrollWidth == clientWidth` e `body.scrollWidth == clientWidth` em todas as nove larguras. O helper externo pode rolar para enquadrar 1440px; isso não é overflow da Home.
- Eixo desktop na borda do conjunto, com diferença inferior a 1px por arredondamento entre clientWidth e coordenadas fracionárias.
- Doze lâminas em todas as larguras; imagens verificadas sem dimensão natural zero.
- Inspeção visual de Coleção em 1280/1024/1440 e mobile 390; Perspectiva em 1280/390. Conteúdo e camadas oficiais carregados.
- Pente fino visual em 1280px: Hero, Posicionamento, Serviços, Método, CTA e Footer, com paleta, hierarquia e arquitetura aprovadas preservadas. Projetos também foi exercitado durante o QA de interação.
- Avanço desktop 01→02; End→12; ArrowRight→01; avanço mobile 01→02. Estado final sem aria-busy, proxies removidos e imagem do destaque com opacidade 1.
- Pausa manual: aria-pressed=true e ângulo estável entre observações; menu mobile abre e fecha com Escape.
- Chip Coleção Avero alterna aria-pressed. Projetos avança para Vértice Clínica, com slide ativo aria-hidden=false.
- Formulário: campos obrigatórios e preenchimento com acentos conferidos no navegador, sem envio. Callback real executado isoladamente em Node/VM com window.open interceptado: validação impede abertura quando inválido; URL, serviços, acentos, quebras de linha, noopener/noreferrer e fallback corretos. Nenhuma mensagem foi enviada.
- Logs do navegador: sem erro atribuído à aplicação observado; mensagens da extensão e da tela externa de login Vercel foram separadas.
- HTTP local: Home, styles.css, script.js, olho isolado e nebulosa respondem 200 com conteúdo não vazio.
- `node --check script.js` e `git diff --check`: aprovados.
- Diff revisto contra o HEAD inicial e contra d624bba; somente Coleção/Perspectiva desktop e este documento fazem parte da build.

## Commits e preview

- `54a979f`: implementação inicial existente da coleção radial desktop e olho unificado.
- `642b687`: proporções, inclinação, altura útil e remoção do marcador legado.
- `9d16e92`: contraste da legenda em primeiro plano.
- Preview visual de 9d16e92 confirmado **READY**, ambiente Preview: `https://avero-studio-demo-9r5r93y73-john-e7bd.vercel.app/`.
- O commit final de documentação gera outro preview com implementação visual idêntica; URL/commit exatos informados na entrega.
- Autenticação Vercel pode ser exigida para acessar o preview. A proteção do projeto não foi desativada.

## Limitações e encerramento

- Não testado em Safari/iOS nem dispositivos físicos.
- Reduced motion preservado por revisão de código e seu caminho de assentamento imediato; a ferramenta de navegador não oferece emulação dessa preferência. Não se afirma QA visual em modo reduce.
- Assets provisórios e variantes que compartilham imagens continuam identificados como conceitos; não foram produzidas novas imagens para esta tarefa.
- A geometria foi avaliada em viewports/iframe de Chromium. Aprovação estética final cabe à revisão do responsável.
- Encerramento nesta build: não iniciar íris, reabrir Serviços, redesenhar Home ou publicar em produção.
