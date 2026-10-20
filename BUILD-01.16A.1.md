# Build 01.16A.1 — Método sem índices + fade da Perspectiva desktop

## Base e limite da rodada

- Branch existente: `build-01-14-palette-b-home`.
- HEAD confirmado, checkout limpo e origin atualizado antes de editar: `9210035c1755e9fef92e0837a9ba580a44822dca`.
- Fontes lidas: AGENTS, README, BUILD-01.16A, BUILD-01.13.2 (Método aprovado) e BUILD-01.15 (olho desktop em camadas).
- Escopo exclusivo: quatro índices do Método, coluna residual desktop e bordas da nebulosa da Perspectiva desktop.
- Não corresponde à Rodada B de motion/rotor. Nenhuma animação nova.

## Método

- Removidos do HTML os spans 01/02/03/04 de Imersão, Direção, Criação e Evolução; desktop, phone e compacto usam o mesmo conteúdo sem índices.
- Acima de 900px, grid das etapas passa de duas colunas para uma, com gap zero. Elimina o espaço reservado aos índices sem alterar largura da etapa, offsets de cada linha, altura mínima, padding superior ou hierarquia.
- Copy desktop ocupa o início natural da etapa: deslocamento horizontal de −41px em 1280/1440 e −34px em 1024, correspondente à antiga coluna+gap. Coordenadas verticais e alturas mantidas.
- Em até 900px os índices eram absolutos. A remoção não altera o fluxo: posições, dimensões e alinhamentos dos quatro blocos de texto idênticos à base em 390/430/768px.
- Títulos, descrições, encerramento, três SVGs, paths, gradientes, strokes e quatro pontos por versão preservados byte a byte. Respiro da curva ao redor dos textos mobile continua igual ao aprovado.
- Não foram removidos contadores da Coleção/Projetos ou outros números fora do Método.

## Nebulosa da Perspectiva desktop

- Alterado exclusivamente o `::before` da `.perspective-eye`, acima de 900px.
- Área ampliada simetricamente: inset −18%/−35% → −28%/−48%. Largura 170% → 196% e altura 136% → 156%, cerca de 15% maiores em cada eixo.
- Fade vertical substituído por máscara elíptica em dois eixos, com raios de 50% da caixa. Opacidade da máscara decresce de 1 para .8/.4/.12/0 em 22/46/68/84/100%; todos os limites da camada chegam a zero, inclusive laterais.
- Mantidos asset, background-position, cover, tratamento cromático e opacidade .13 da nebulosa. Sem blur, brilho extra ou nova mancha forte.
- `::after` do olho permanece intacto: asset isolado oficial, posição central, escala 96%, opacidade .70. Layout e textos da Perspectiva intactos.
- Perspectiva mobile/compacta preservada: nebulosa .17 e olho .74, sem override novo.

## QA e preservação

Chromium no preview da branch, Color Lab em `view=home`, CSS oficial sem overrides de tema.

- Validados **390, 430, 768, 1024, 1280, 1440px**; conferida também a transição 900/901px.
- Nas seis larguras: documentElement.scrollWidth e body.scrollWidth iguais ao clientWidth, zero índices do Método, zero imagens quebradas e quatro nós em cada um dos três SVGs.
- Inspeção visual do Método em phone/compacto/desktop e da Perspectiva em 1024/1280/1440: textos legíveis, linha preservada e nebulosa sem limite retangular perceptível.
- Comparação DOM antes/depois: larguras e alturas de Hero, Serviços, Coleção, Método, Perspectiva, CTA e Footer idênticas nas seis larguras. Geometria dos textos mobile idêntica; pontos idênticos em todas as versões.
- Menu mobile abre e fecha por Escape. Coleção avança 01→02 e retorna por teclado a 01, com estado final sem aria-busy. Projetos avança para Vértice Clínica.
- Campos do formulário editáveis e chip Coleção Avero alterna aria-pressed; nenhum envio ao WhatsApp.
- Console: sem erro atribuído à aplicação observado; mensagens da extensão do navegador separadas.
- HTTP local: Home, CSS, JS, nebulosa e olho isolado retornam 200 e conteúdo não vazio.
- `node --check script.js` e `git diff --check` aprovados; diff revisto.
- Comparação executável com 9210035: HTML idêntico após retirar somente os quatro spans; CSS anterior íntegro antes do bloco novo; `script.js` byte a byte idêntico.
- Nenhuma mudança em Hero, paleta/tokens, Serviços, rotor/carrossel, CTA, formulário, Footer, assets ou configuração Vercel.

## Publicação e encerramento

- Implementação: `e8a48681dfb5dd3728fe250aaf4edc80799b1eda`.
- Preview de implementação READY: `https://avero-studio-demo-ahp95c450-john-e7bd.vercel.app/`.
- O fechamento documental gera preview visualmente idêntico; commit e URL finais informados na entrega.
- Main preservada em `dd9257f9c2c42d28d421a300727d6aef148f4b63`; sem merge ou promoção para produção. Proteção Vercel mantida.
- Limite de QA: Chromium/iframe, sem Safari/iOS ou aparelho físico. Reduced motion preservado pelo código intacto, sem nova animação.
- Parar após esta rodada; não iniciar motion de íris, pulso de linha, rotor ou redesign.
