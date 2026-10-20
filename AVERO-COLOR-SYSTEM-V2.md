# AVERO Color System V2

Paleta oficial aprovada: **Prata Nebular + Champagne Cósmico (B)**, aplicada na Build 01.14. A é controle histórico; C foi descartada.

A estrutura é escura e neutra; o material é prateado. Ciano é energia pontual, champagne é contraponto de temperatura, Azul Avero é microacento funcional.

## Tokens oficiais

| Família | Token | Valor |
| --- | --- | --- |
| Base | `--bg-primary` | `#07090D` |
| Base | `--bg-secondary` | `#0C1015` |
| Base | `--bg-depth` | `#10151B` |
| Superfície | `--surface` | `#12181E` |
| Superfície | `--surface-high` | `#141A20` |
| Texto | `--text-primary` | `#F2F5F7` |
| Material | `--silver` | `#D8DFE6` |
| Texto | `--text-secondary` | `#AAB4BF` |
| Texto | `--text-muted` | `#77828D` |
| Linha | `--line` | `#AAB4BF` |
| Energia | `--accent-primary` | `#75BBC8` |
| Funcional | `--accent-secondary` | `#4DA3FF` |
| Contraponto | `--champagne-light` | `#D2C2A4` |
| Contraponto | `--champagne-mid` | `#C4AF8B` |
| Contraponto | `--champagne-muted` | `#9D8C72` |
| CTA | `--button-primary` | `#DDE4EA` |
| CTA | `--button-primary-text` | `#07090D` |
| CTA | `--button-hover` | `#C6DEE3` |
| Borda | `--border` | `rgba(170,180,191,.28)` |
| Borda funcional | `--control-border` | `#77828D` |

Tokens derivados centralizam a iluminação: `--champagne-text` (light), `--champagne-border` (.52), `--champagne-surface` (.055), `--champagne-glow` (.16), `--champagne-glow-soft` (.075), `--champagne-glow-node` (.5), `--champagne-hover` (.10), a partir de `--warm-rgb:210 194 164`.

`--material-rgb:216 223 230`, `--glow-rgb:117 187 200`, `--background-rgb:7 9 13` e `--project-light-rgb:196 175 139` apoiam gradientes sem espalhar cores arbitrárias. Aliases antigos `--cosmos`, `--nebula`, `--lume`, `--neutral`, `--blue` resolvem para os tokens oficiais.

## Ritmo por seção

| Seção | Temperatura e uso |
| --- | --- |
| Hero | Fria; destaque prata, CTA material claro, olho original, nebulosa neutralizada. |
| Posicionamento | Neutra; linha prata e nós frios. |
| Serviços | Prata fria; champagne só na assinatura/hover da solução em destaque. |
| Coleção | Neutra; imagens fornecem variedade; contador é microacento quente. |
| Projetos | Primeiro aquecimento; ambient glow, divisor, labels, CTA e paginação. |
| Método | Linha majoritariamente prata; nós 02/03 quentes, trecho final do gradiente champagne em dissipação. |
| Perspectiva | Resfriamento; olho original sem champagne, ambiente discreto. |
| CTA final | Glow quente, borda/superfície do formulário e detalhes secundários; botão primário prata. |
| Footer | Fundo profundo, tagline/grupos/assinatura quentes; olho lateral frio. |

Champagne possui presença, ausência e retorno. O alvo de ~18% descreve percepção cromática, não uma proporção literal de pixels. Não distribuir uniformemente nem ampliar a saturação.

## Material, atmosfera e foco

- Primários: prata luminosa com texto escuro; hover ciano-prata.
- Secundários: superfície escura/transparente, texto prata, borda legível.
- Azul Avero: foco e pequenos estados funcionais; evitar grandes preenchimentos.
- Nebulosa independente: `saturate(.38) brightness(.9)`; fluxo global: `saturate(.32) brightness(.9)`.
- Não filtrar olhos, marcas ou mockups dos negócios ao neutralizar atmosfera.
- Método: fade progressivo `.58 → .4 → .2 → 0`, com descida curva antecipada e tangentes contínuas; não usar corte seco.

## Usos proibidos

- Champagne dominante na Hero, headline, olho ou imagens de negócios.
- Botões inteiros dourados, preto+ouro saturado ou atmosfera marrom uniforme.
- Azul forte como preenchimento predominante da rolagem.
- Prata uniforme sem variação de temperatura.
- Alterar geometria, layout, tipografia, velocidade de rotor ou assets para aplicar cor.
- Usar tokens de baixo contraste em controles/pequenos textos sobre superfícies claras.

Detalhes de QA, escopo e implementação: `BUILD-01.14.md`. A Home usa apenas `styles.css`/`script.js`; o Color Lab é referência separada, preservada para revisão.
