# AVERO — Color Lab V2

## Escopo e base

- Branch: `build-01-13-2-recovery-method`, mantida conforme o checkout atual e AGENTS.md.
- Base visual: `d99a11847903d27fc1b93fcf9616c5d88884edad`, já com a correção final de respiro do Método desktop/mobile.
- Ambiente: `/review/color-lab.html`. A Home oficial permanece na raiz, sem importar os estilos do laboratório.
- Não há escolha automática de direção, merge ou promoção para produção.

## Arquitetura da comparação

O laboratório busca o `index.html` existente e o apresenta num único iframe `srcdoc`. Uma tag `base` mantém os caminhos de assets, CSS e JavaScript apontando para a raiz da mesma preview. O CSS cromático é acrescentado depois de `styles.css`, apenas nesse documento de revisão.

As três direções usam `data-theme="a|b|c"` e CSS custom properties. As setas, rotor V4, troca física, carrossel de Projetos, menu e formulário continuam usando o `script.js` original. Ao alternar A/B/C, o iframe não é recriado: rolagem, direção ativa, projeto ativo e seleção de chips são preservados.

Uma adaptação exclusiva de `srcdoc` mantém links `#...` no documento de revisão. Sem essa adaptação, a tag `base` faria a navegação nativa abrir a Home oficial dentro do iframe. O laboratório impede somente essa navegação de documento e rola até o destino original, preservando os listeners de serviço/projeto e o foco do skip link. Links externos permanecem com o comportamento existente.

Controles exclusivos do laboratório:

- A/B/C: botões com `aria-pressed`, acionáveis por teclado.
- Largura: Janela, 320, 390, 430, 768, 900, 1280 e 1440 px.
- Ir para: acesso às áreas da Home sem recarregar.
- URL conserva `theme`, `width` e `area` para compartilhar o enquadramento.
- A margem de scrollbar nativa do iframe é ocultada somente no laboratório, para que a largura selecionada corresponda à largura útil do conteúdo. Rolagem por toque, roda e teclado continua disponível.

## A — Prata Nebular

### Tokens

| Token | Valor | Papel |
|---|---|---|
| `--bg-primary` | `#07090D` | Cosmos neutro |
| `--bg-secondary` | `#0C1015` | Superfícies profundas |
| `--bg-depth` | `#10151B` | Reserva de profundidade |
| `--surface` | `#12181E` | Campos, chips e controles |
| `--surface-high` | `#141A20` | Hover discreto |
| `--text-primary` | `#F2F5F7` | Branco frio |
| `--silver` | `#D8DFE6` | Material luminoso e destaque da headline |
| `--text-secondary` | `#AAB4BF` | Descrições, placeholders e índices |
| `--text-muted` | `#77828D` | Reserva para marcações discretas |
| `--line` | `#AAB4BF` | Trajetórias e divisores existentes |
| `--accent-primary` | `#75BBC8` | Ciano pontual: nós e estados |
| `--accent-secondary` | `#4DA3FF` | Azul Avero: foco acessível |
| `--accent-warm` | `#D8DFE6` | Neutro nesta direção |
| `--button-primary` | `#DDE4EA` | CTA prateado |
| `--button-primary-text` | `#07090D` | Texto escuro do CTA |
| `--button-hover` | `#C6DEE3` | Hover ciano-prateado |
| `--border` | `rgba(170,180,191,.28)` | Bordas decorativas |
| `--control-border` | `#77828D` | Contornos de controles funcionais |

As transparências de iluminação derivam de tokens RGB de material, accent e fundo. Não há paleta nova espalhada por seção. Aliases `--cosmos`, `--nebula`, `--lume`, `--neutral` e `--blue` adaptam as regras existentes exclusivamente dentro do laboratório.

### Estratégia e sensação

Grafite profundo, prata fria nas linhas e nos CTAs, ciano em pequenos momentos. A palavra “negócios.” usa prata. Os mockups mantêm suas cores e fornecem diversidade de temperatura. A atmosfera pretende ser precisa, silenciosa e editorial.

Vantagens: maior protagonismo dos assets e do olho; redução da repetição de preenchimentos azuis; bom contraste em uma base consistente.

Riscos: pode parecer muito contida em telas de baixo brilho; o prata pode ficar uniforme se a direção for aplicada futuramente sem conservar o ritmo das imagens e dos vazios.

## B — Prata Nebular + Champagne Cósmico

### Tokens adicionais

Herda todos os tokens de A. Não muda a Hero nem os CTAs principais para champagne.

| Token | Valor |
|---|---|
| `--champagne-light` | `#D2C2A4` |
| `--champagne-mid` | `#C4AF8B` |
| `--champagne-muted` | `#9D8C72` |
| `--accent-warm` | `var(--champagne-light)` |
| `--project-light-rgb` | `196 175 139` |
| `--warm-rgb` | `210 194 164` |

### Distribuição do contraponto

- Projetos: luz radial de baixa intensidade, divisor da informação, detalhe da ação e indicador ativo.
- Método: somente o terceiro nó ganha champagne; a linha permanece prata e os outros nós continuam em ciano discreto.
- CTA: marcador da observação e borda muito sutil do formulário. Botões continuam prateados.
- Footer: tagline curta em champagne claro. Marca e olho não são recoloridos.
- Hero, Posicionamento, Serviços, Coleção e olho da Perspectiva: mesma lógica de A.

O calor é restrito a pequenos acentos, buscando o princípio de 5–10% da experiência. Esse percentual não foi medido como área de pixels: a implementação controla a quantidade por poucos pontos de aplicação, e não por preencher seções.

Sensação: metal frio com uma luz secundária quente.

Vantagens: pequenas mudanças de temperatura na rolagem; diferenciação autoral sem transformar a página em preto e ouro.

Riscos: o efeito é deliberadamente discreto e quase ausente na Hero; aumentar demais esses detalhes numa implementação futura poderia descaracterizar a marca ou competir com os mockups quentes.

## C — Ciano Gelo

### Overrides de A

| Token | Valor |
|---|---|
| `--accent-primary` | `#8FD6DD` |
| `--accent-soft` | `#72B8C2` |
| `--accent-pale` | `#B5E2E5` |
| `--line` | `var(--accent-soft)` |
| `--button-primary` | `var(--accent-pale)` |
| `--button-hover` | `#D6ECEE` |
| `--glow-rgb` | `143 214 221` |

Fundo, textos e superfícies permanecem grafite/prata. Headline destacada e CTA recebem ciano pálido; trajetórias usam ciano mineral. O Azul Avero continua reservado ao foco.

Diferença em relação à Home: não usa azul forte como preenchimento principal e não retoma o fundo azul-marinho. O ciano é claro e menos elétrico.

Vantagens: mantém uma leitura tecnológica familiar com menos saturação; facilita comparar a intensidade dos acentos com A/B.

Riscos: é a opção mais fria e pode voltar a parecer repetitiva se o accent for ampliado além dos pontos definidos.

## Atmosfera, ritmo e imagens

- Fundo primário neutralizado para grafite; campos/controles e o formulário usam variações próximas, sem novos blocos coloridos rígidos.
- Hero: material luminoso nos CTAs e na tipografia, olho original e atmosfera de apoio.
- Posicionamento: luz neutra muito baixa e trajetória prata.
- Serviços: bordas, rótulos, linha orbital, controles e overlays passam a usar tokens. Imagens, crops, filtros originais e máscara de fragmentação permanecem iguais.
- Coleção: molduras, controles, contador e trajetória neutros; nenhuma mudança no rotor, velocidade, transformações, proxies ou conteúdos das miniaturas.
- Projetos: um leve contraponto de temperatura somente em B; imagens permanecem intactas.
- Método: paths, quatro nós e textos horizontais preservados; apenas as cores variam.
- Perspectiva: ambiente silencioso, sem champagne no olho.
- CTA: contraste de material claro sobre fundo escuro; edição dos campos continua alinhada convencionalmente.
- Footer: muito escuro, links prateados, olho lateral preservado e assinatura quente apenas em B.

### Tratamento não destrutivo da nebulosa

A/B: `saturate(.38) brightness(.9)` na nebulosa independente da Hero mobile e da Perspectiva mobile. C: `saturate(.58) brightness(.9)`. Opacidades, enquadramento e máscaras de dissipação aprovadas permanecem iguais. Não há máscara interna nova nem mudança nos arquivos WebP.

As faixas globais de atmosfera usam `saturate(.32) brightness(.9)` em A/B e `saturate(.45) brightness(.9)` em C, mantendo posições e aparecimento/desaparecimento.

No desktop, `hero-art` contém o olho como filho. O fundo de linhas usa `background-blend-mode: luminosity` com grafite; não se aplica filtro no pai, pois isso alteraria a cor do olho. O raster antigo que integra olho e textura desktop permanece original. Sua textura azul interna não é isolada/reconstruída nesta tarefa. Esse é um limite intencional do estudo sem alteração de assets ou arquitetura.

Olho mobile: asset isolado original sem filtro. Perspectiva mobile mantém olho `opacity: .74` e nebulosa `opacity: .17`. Footer mantém seu olho e opacidade aprovados. Nenhuma imagem de serviço, projeto ou Coleção recebe recoloração nova.

## QA de decisão visual

- Referências principais: 390 e 1280 px, inspecionadas visualmente.
- Checagem rápida: 320, 430, 768, 900 e 1440 px. Largura útil e `scrollWidth` coincidem em todas essas larguras, sem overflow horizontal da Home dentro do iframe.
- Hero capturada em A/B/C, em 390 e 1280 px. Método 390 capturado nas três direções como região intermediária.
- Serviços, Coleção, Projetos, Método, Perspectiva, CTA e Footer inspecionados durante a navegação do laboratório. Imagens lazy carregam ao entrar na área visível; aguardou-se a pintura para revisar os mockups.
- Coleção: próxima direção 01 → 02, assentamento da troca física e movimento ambiental confirmados. Trocar a paleta preservou o item ativo.
- Serviços desktop: controle avançou de Sites institucionais para Landing Pages.
- Projetos: controle avançou de Stúdio Nicota para Vértice Clínica.
- Troca de tema por Enter confirmada; chip selecionado e projeto ativo continuaram selecionados.
- Textos das quatro etapas do Método têm `transform: none`; paths finais permanecem iguais à base.
- Sem erros JavaScript de aplicação observados no console. Houve mensagens de uma extensão do navegador sobre envio de metadata, externas ao site.
- `node --check script.js`, `node --check review/color-lab.js` e `git diff --check` aprovados.
- Nenhuma animação foi criada pelo laboratório. O suporte a reduced motion continua nas regras e no JS originais; esta QA não emulou a preferência do sistema.

### Contraste dos tokens

| Combinação | Razão |
|---|---:|
| Texto principal / fundo | 18,20:1 |
| Texto secundário / fundo | 9,48:1 |
| Placeholder / campo | 8,50:1 |
| Texto do CTA A/B / fundo do CTA | 15,52:1 |
| Texto do CTA C / fundo do CTA | 14,21:1 |
| Contorno funcional / campo | 4,56:1 |
| Azul de foco / fundo | 7,59:1 |

As razões referem-se aos pares sólidos. Não equivalem a uma certificação WCAG de cada pixel sobre imagens/gradientes. Bordas decorativas translúcidas não são utilizadas como única indicação de controles funcionais.

## Integridade e limites

Arquivos criados: `review/color-lab.html`, `review/color-lab-ui.css`, `review/color-lab.css`, `review/color-lab.js` e este documento.

`index.html`, `styles.css`, `script.js`, `vercel.json` e assets versionados permanecem iguais à base `d99a118`. A alteração local preexistente em `assets/collection-gastronomy.png` não faz parte dos commits; o laboratório publicado utiliza o asset remoto aprovado.

Main permanece intacta. Nenhuma direção foi aplicada como oficial. O estudo reutiliza os assets provisórios atuais e não resolve sua futura substituição. O iframe acrescenta somente o ambiente de comparação; não será componente da Home final. A escolha cromática pertence à revisão do responsável.
