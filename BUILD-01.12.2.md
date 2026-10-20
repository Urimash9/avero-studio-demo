# AVERO Studio — Build 01.12.2 / Motor radial 3D V4 mobile

Branch: `build-01-12-2-v4-radial`.
Checkpoint: `a8346e2e95b1a62e1e5a095e72d323b5f22b7ab9` da branch
`build-01-12-collection-3d`, preservada como base da Build 01.12.1.

## Decisão e escopo

A geometria compacta da 01.12.1 foi substituída pelo princípio estrutural do V4
fornecido pelo usuário. Poses independentes em torno de uma lombada não davam a
silhueta radial desejada. A nova decisão supersede, para esta rodada, a janela
parcial, a troca física e o movimento ambiental documentados nas builds anteriores.

O `index-7.html` foi lido integralmente e comparado ao HTML contido no ZIP:
os dois arquivos são idênticos. SHA-256 da referência:
`8f4827f1b2ba7d6e08772194686051eb55c7ca1cecac930c7fc037a1de85c1ab`.
Foram transplantados somente câmera, tilt global, rotor único, lâminas radiais,
faces e vão frontal. Cores, tipografia, assets, layout e controles do mini-site
não foram copiados.

Esta implementação pertence exclusivamente ao modo compacto existente, até
900px. Imagem ativa à esquerda, rotor à direita e controles abaixo permanecem.
Não há extração física, autoplay, movimento ambiental, swipe novo ou dependências.

Arquivos alterados:

- `script.js`: criação dos previews radiais a partir do catálogo existente,
  geometria compacta e navegação do rotor.
- `styles.css`: substituição do bloco do motor 3D compacto por regras V4
  explícitas, dentro de `@media(max-width:900px)`.
- `BUILD-01.12.2.md`: este registro.

`index.html`, AGENTS.md, README, builds anteriores, assets e configuração Vercel
permanecem intactos. CSS anterior ao bloco do motor compacto e JavaScript externo
ao controlador da Coleção foram comparados byte a byte com o checkpoint.

## Estrutura radial

```text
collection-engine
├── collection-pieces       // catálogo semântico e destaque independente
└── collection-radial-stage // câmera; aria-hidden e inert
    └── collection-radial-tilt
        └── collection-radial-rotor
            └── 12 collection-radial-blade
                ├── face front
                └── face back
```

A estrutura decorativa é criada uma única vez quando o modo compacto é usado.
Cada lâmina recebe sua imagem de `collectionDirections`, derivado dos 12 itens
do HTML; não existe lista comercial duplicada manualmente. Ambas as faces usam
o mesmo asset provisório da direção, com alt vazio, `aria-hidden` e
`backface-visibility: hidden`. O verso gira 180° em Y.

Tilt, rotor e lâminas preservam `transform-style: preserve-3d`. Cada lâmina tem
uma posição angular fixa; não há poses diferentes por vizinho:

```text
total = 12
step = 360 / total = 30°
angle = index * step
blade = rotateY(angle) translateZ(radius) rotateY(90deg)

frontGapOffset = step / 2 = 15°
rotor final = rotateY(-activeIndex * step - frontGapOffset)
```

O último `rotateY(90deg)` transforma o painel em uma lâmina radial. O vão frontal
mantém o centro aberto, com superfícies dos dois lados do eixo implícito. O antigo
marcador da lombada foi desativado; não há haste nova. As 12 lâminas permanecem
reais e distribuídas em 360°, incluindo a direção ativa. A imagem principal não
participa do rotor nem da animação.

## Parâmetros e densidade

As dimensões derivam da largura disponível `W` da Coleção, sem breakpoint novo:

```text
largura do stage = min(W * 0,5, 260px)
radius = largura do stage * 0,37
largura da lâmina = radius * 0,44
altura da lâmina = radius * 1,28
perspective = clamp(800px, W * 2,6, 1200px)
perspective-origin = 50% 45%
tilt global = rotateX(-7deg)
```

O raio é aproximadamente 2,27 vezes a largura da lâmina. Isso cria separação
radial e vazio central, sem reutilizar o raio pequeno da 01.12.1. A imagem ativa
mantém largura de 44%, limitada a 240px, altura e posição anteriores. O stage fica
alinhado à direita, com sua altura e topo alinhados à região da imagem ativa.

| Viewport | Raio | Lâmina: largura × altura | Perspective |
| --- | --- | --- | --- |
| 320px | 53,65px | 23,61 × 68,67px | 800px |
| 360px | 61,05px | 26,86 × 78,14px | 858px |
| 390px | 64,75px | 28,49 × 82,88px | 910px |
| 430px | 72,15px | 31,75 × 92,35px | 1014px |
| 768 / 900px | 96,20px | 42,33 × 123,14px | 1200px |

390px foi validado primeiro. Quatro combinações de raio, largura, altura e tilt
foram comparadas visualmente, incluindo uma proporção próxima da referência V4.
A configuração final usa lâminas estreitas e mais altas, com raio maior.
Os 12 itens funcionaram na geometria radial e foram mantidos. Há oclusão natural
entre superfícies; não se pretende apresentar 12 screenshots frontais legíveis
simultaneamente. Nenhuma arquitetura de 6 ou 8 slots foi implementada.

## Navegação, estado e movimento

`collectionState` permanece com a mesma estrutura centralizada do checkpoint.
Imagem, título, descrição, CTA, contador, ARIA e seleção usam o mesmo
`activeIndex`; a atualização ocorre junto ao início da escolha manual.

Somente o rotor anima, por 850ms, com `cubic-bezier(.22,.8,.18,1)`. As lâminas
mantêm seus transforms locais durante o giro. A diferença angular usa o caminho
curto: 12 → 01 gira mais 30° no mesmo sentido, e 01 → 12 gira 30° no sentido
contrário. Ao assentar, o ângulo é normalizado para a fórmula final equivalente,
sem volta longa no wrap. Home e End preservam a escolha exata do primeiro/último.

Durante o giro, entradas adicionais são ignoradas, os botões anunciam
`aria-disabled` e a região fica `aria-busy`. A geração de transição protege contra
callbacks antigos. Resize, mudança de breakpoint, reduced motion, ocultação do
documento ou saída da viewport assentam a escolha e cancelam a animação pendente.
`will-change` fica restrito ao rotor enquanto gira.

O RAF ambiental anterior foi removido do motor ativo. O rotor permanece parado
entre escolhas, não altera `activeIndex` automaticamente e o botão de pausa fica
oculto. Estado de interação e visibilidade foi preservado; não existe loop novo.

Com `prefers-reduced-motion: reduce`, o rotor muda diretamente para o destino,
mantendo a geometria 3D estática. Navegação, foco visível, ArrowLeft, ArrowRight,
Home, End, status e controles de 46×46px continuam funcionando. Os previews não
entram na tabulação; somente o conteúdo comercial ativo é acessível/interativo.
O fallback sem JavaScript conserva os 12 links originais.

## QA

Validação local em Chromium com Playwright, Montserrat carregada por HTTPS com
validação TLS e os assets existentes decodificados antes das capturas.

- 390px primeiro; depois 430, 360, 320, 768, 900, 901, 1024, 1280 e 1440px.
- Transições adjacentes também verificadas em 431, 700 e 701px, com as 12
  seleções, superfícies dentro do palco e zero overflow horizontal.
- As 12 seleções foram verificadas nas seis larguras compactas: 12 lâminas reais,
  rotor dentro do stage, copy protegida, destaque dominante e zero overflow
  horizontal. Nenhuma superfície depende de clipping para caber.
- 150 frames medidos: cinco navegações × cinco pontos do giro × seis larguras.
  Casos 01 → 02, 02 → 03, 11 → 12, 12 → 01 e anterior de 01 → 12; capturas e
  inspeção visual em 25%, 50% e 75%. Um único alvo de animação, transforms locais
  das lâminas constantes e profundidades espaciais distintas foram confirmados.
- Ciclo completo 01 → 12 → 01, anterior em 01 e vinte cliques extras durante
  uma rotação: um único avanço, sem estado pendente.
- Teclado, foco visível, Home/End, sincronização do conteúdo, contador, status e
  ARIA; previews decorativos inert e fora da tabulação.
- Reduced motion em repouso e durante o giro; resize, documento oculto, saída e
  entrada da viewport, release do ponteiro fora do componente e callbacks antigos.
- Cruzamento 900/901px durante o giro: destino preservado, rotor oculto e sem
  transforms inline nas peças do desktop.
- 363 elementos externos à Coleção por largura compacta com medidas e estilos
  auditados idênticos ao checkpoint. Hero, Posicionamento, Serviços, Projetos,
  Método, Perspectiva, CTA e Footer preservados.
- 503 elementos por largura em 901, 1024, 1280 e 1440px com medidas e estilos
  auditados idênticos ao checkpoint, incluindo a Coleção desktop.
- Menu mobile, CTA ativo, controles de projetos e montagem da mensagem WhatsApp
  verificados sem envio externo; fallback sem JavaScript com 12 links acessíveis.
- Sem erros JavaScript ou de console nos testes funcionais.
- HTTP 200 e conteúdo não vazio na página, CSS, JavaScript e todos os assets
  originais servidos localmente.
- `node --check script.js`, `git diff --check` e revisão de escopo aprovados.

## Limitações e publicação

- Assets continuam provisórios, com repetição já existente entre algumas direções.
  Não foram gerados, editados ou substituídos arquivos de imagem.
- QA funcional em Chromium; Safari/iOS e dispositivos físicos não foram testados.
  O cenário de aba usa o handler real de `visibilitychange` com `document.hidden`
  controlado, pois Chromium headless mantém abas visíveis.
- Swipe e extração física não foram adicionados. Esta rodada valida o objeto
  radial e sua rotação manual; a extração depende de uma tarefa futura.
- Preview deve ser confirmado após commit/push. QA local não substitui a
  confirmação do deployment da nova branch.

Branches protegidas permanecem nos checkpoints:
`build-01-12-collection-3d` em `a8346e2e95b1a62e1e5a095e72d323b5f22b7ab9`,
`build-01-2-refino-visual` em `93b6e75ce02e1955e324ff232ed89e2c41958972` e
`main` em `dd9257f9c2c42d28d421a300727d6aef148f4b63`.
Sem merge ou promoção para produção.
