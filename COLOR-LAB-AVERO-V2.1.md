# AVERO — Color Lab V2.1 / Champagne Cósmico

## Base e escopo

- Branch: `build-01-13-2-recovery-method`.
- Base do laboratório: `335059542b71f386c50e1c0e0ae4a270d946fe11`.
- Implementação cromática: `cba8e574b4cfc96654c20f1bbccb0892120a29d1`.
- Alteração exclusiva de `review/color-lab.css`, mais este registro.
- Home oficial, assets, layout, tipografia, geometria, JS e controles A/B/C intactos.
- A permanece controle neutro. C continua disponível, sem refinamento nem promoção a candidata principal.
- O documento V2 permanece como registro histórico. Esta revisão substitui somente sua distribuição da Direção B.

## Estratégia de B

Prata Nebular permanece a estrutura. Champagne passa de microdetalhes quase invisíveis para zonas de luz perceptíveis em capítulos específicos. Não há troca global do accent, botão dourado ou filtro quente sobre imagens.

O alvo de aproximadamente 18% é conceitual: presença, repetição e retorno da temperatura durante a rolagem. Não representa área em pixels, percentual medido, nem garantia perceptual para todos os monitores. O controle é feito por três capítulos quentes (Projetos, Método, CTA), fechamento no Footer e dois sinais menores na abertura. A/B foi inspecionado por alternância imediata e capturas equivalentes em 390 e 1280 px; a decisão final continua visual e pertence ao usuário.

## Tokens exclusivos de B

| Token | Valor / derivação | Função |
|---|---|---|
| `--champagne-light` | `#D2C2A4` | Luz e texto pontual |
| `--champagne-mid` | `#C4AF8B` | Material de bordas e nós |
| `--champagne-muted` | `#9D8C72` | Contorno secundário |
| `--warm-rgb` | `210 194 164` | Base de transparências |
| `--champagne-text` | `var(--champagne-light)` | Labels/assinaturas |
| `--champagne-border` | `rgb(var(--warm-rgb)/.52)` | Card e divisor |
| `--champagne-surface` | `rgb(var(--warm-rgb)/.055)` | Luz interna muito baixa |
| `--champagne-glow` | `rgb(var(--warm-rgb)/.16)` | Projetos e CTA |
| `--champagne-glow-soft` | `rgb(var(--warm-rgb)/.075)` | Método, Footer e sombra do form |
| `--champagne-glow-node` | `rgb(var(--warm-rgb)/.5)` | Glow localizado nos dois nós |
| `--champagne-hover` | `rgb(var(--warm-rgb)/.10)` | Hover pontual no CTA |

Todos os novos valores champagne são centralizados no bloco de tokens de B. Nenhum token de A/C foi alterado. Opacidade de glow não equivale a percentual da experiência.

## Ritmo de temperatura

| Área | Presença de champagne em B |
|---|---|
| Hero | Ausente; exatamente o mesmo tratamento frio de A |
| Posicionamento | Ausente; neutro e trajetória fria |
| Serviços | Somente label da solução na posição orbital 0 e sua borda em hover/foco; não afeta todos os cards |
| Coleção | Somente contador atual; rotor, eixo, blades, imagens, troca física e movimento intactos |
| Projetos | Primeiro aquecimento claro: luz radial externa, divisor, label de status, detalhe de CTA e indicador ativo |
| Método | Luz ambiente localizada, nós 02/03 e seus índices; transição curta no extremo direito da linha |
| Perspectiva | Resfriamento completo; nenhuma regra quente adicionada |
| CTA | Novo aquecimento: luz atrás do form, borda e superfície discretas, heading do card, marcador da observação, detalhe do secundário/WhatsApp e hover pontual |
| Footer | Tagline, headings dos grupos, assinatura final e iluminação lateral muito baixa; links normais continuam prata |

O olho da Hero, da Perspectiva e do Footer não recebe champagne. CTA primário, campos, textos descritivos e headline continuam com o material frio/legível de A. Não há overlay quente sobre mockups nem recoloração de assets.

## Método: material sem mudança de caminho

O último stop dos gradientes existentes passa a champagne médio somente em B. Os demais stops permanecem prata. Como os gradientes são horizontais, essa transição se limita ao extremo direito da curva, sem converter toda a trajetória em champagne. Dois nós centrais recebem luz quente; primeiro e último continuam ciano discreto. Nenhum path, nó, posição, stroke-width ou texto foi movido.

## QA realizado

- Referências visuais: 390 e 1280 px, com Projetos, Método e CTA capturados em A/B no mesmo enquadramento.
- CTA 390: captura contínua montada a partir de dois enquadramentos sobrepostos do mesmo estado, com deslocamento de 562 px; sem recolorir pixels ou alterar a página.
- Checagem rápida: 430, 768, 900 e 1440 px. No documento do iframe, `clientWidth`, `scrollWidth` e `body.scrollWidth` coincidiram em todas as larguras; sem overflow horizontal da Home. Em 1440, o laboratório permite rolagem externa do enquadramento maior que a janela do navegador, como no V2.
- Método com quatro textos horizontais (`transform: none`); coordenadas dos SVGs intactas.
- Hero, Perspectiva e Footer inspecionados em mobile; CTA/Footer e Método também em desktop/tablet. O resfriamento da Perspectiva foi preservado.
- Navegação Coleção 01 → 02, assentamento e movimento ambiental confirmados. Troca A/B preservou item ativo; rotor continua girando sem scroll.
- Tema B acionado por Enter; troca para A preservou chip Redesign selecionado, sem reiniciar o iframe.
- Sem erros de aplicação observados nos logs do preview. Mensagens de metadata de extensão Chrome são externas ao aplicativo.
- `node --check script.js`, `node --check review/color-lab.js` e `git diff --check` aprovados.
- Verificação de integridade: removendo somente blocos CSS de B e comentários, todas as regras restantes são byte equivalentes ao V2. `index.html`, `styles.css`, `script.js`, UI do lab, mecanismo de troca e `vercel.json` permanecem idênticos à base.
- Nenhum motion novo; reduced motion continua sob o CSS/JS originais. A preferência do sistema não foi emulada nesta rodada cromática.

## Vantagens e riscos

Vantagens: A/B difere com clareza nas regiões intermediárias/finais; a prata mantém hierarquia; olhos e imagens continuam com suas próprias cores; presença/ausência/retorno de champagne evita aquecimento uniforme.

Riscos: glows podem ser menos perceptíveis em telas escuras ou de baixo brilho; o mockup Nicota já é quente e pode reforçar a percepção de calor em Projetos. Por isso o estudo usa luz e detalhes fora dos pixels da imagem, permitindo comparar também com os demais projetos. O alvo perceptual de 18% precisa de revisão humana em rolagem longa, não de uma contagem de área.

## Preservação

Direção A e C intactas. Home oficial intacta. Assets não substituídos. A alteração local preexistente em `assets/collection-gastronomy.png` ficou fora dos commits. Main não alterada; sem merge, produção ou escolha automática de vencedora.
