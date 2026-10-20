# AVERO Studio — Build 01.6

Escopo exclusivo: Serviços. Branch `build-01-2-refino-visual`. Base: `f1b6b50040809cc391e21aae938ea2fbe298422e` (Build 01.5). Nenhum merge.

## Arquivos

- `index.html`: núcleo existente reposicionado; dois fragmentos SVG decorativos; quatro soluções identificadas por posição; um controle de avanço e indicação de destaque. Texto, serviços, descrições, imagens, labels e destinos comerciais preservados.
- `styles.css`: regras novas restritas a Serviços e aos elementos exclusivos da órbita. Recortes, integração imagem/conteúdo, estados orbitais e máscara mobile. Nenhuma regra do background global, Hero ou Posicionamento foi alterada.
- `script.js`: navegação orbital nativa, sem dependências; código anterior intacto.
- `review/build-01-6.html`: revisão isolada por largura/área; “Visão geral” apenas reduz a escala visual do iframe no desktop, preservando sua largura de layout real. Não integra a Home.
- `BUILD-01.6.md`: registro e validação.

## Composição desktop

Acima de 1100px, headline, complemento e CTA discreto ocupam o núcleo central estreito. Quatro peças se distribuem ao redor: destaque no alto à esquerda, peça superior à direita, peça inferior à direita e peça inferior deslocada à esquerda. As posições, alturas de imagem e larguras diferem. Não há grade 2x2 nem cruz simétrica. As imagens usam cortes geométricos da mesma família e uma única curva de canto pontual. Dois arcos parciais e glow local sugerem conexão com o background já aprovado. Não foi necessária quinta peça.

## Lógica e controle orbital

O botão circular único avança uma solução por acionamento. Sites institucionais → Landing Pages → E-commerce + Cardápios → SEO & Performance → início. O serviço em destaque ocupa a posição principal, com maior imagem, título e presença. Os outros três continuam visíveis e legíveis. A ordem DOM dos quatro artigos não muda.

A transição usa Web Animations API nativa, duração de 760ms e curva de desaceleração. Os quatro trajetos se curvam para fora do núcleo; não há autoplay. Cliques durante o movimento não empilham rotações. Redimensionar cancela o movimento e assenta os elementos no layout atual. O botão mantém o foco e informa o destaque em seu nome acessível, sem uma região aria-live redundante.

## Tablet e mobile

Entre 701 e 1100px, introdução central e sequência vertical com imagem lateral e deslocamentos discretos alternados. A órbita e seu botão saem da composição antes das telas estreitas.

Até 700px, os quatro serviços seguem empilhados, com imagem predominante, recortes variados e conteúdo sobreposto ao término da imagem. Nome, assinatura, descrição e ação permanecem integrados na mesma peça. O CTA circular tem 44×44px e base sólida de contraste. Nos 320–430px medidos, os cards ficam aproximadamente entre 258 e 343px de altura.

## Desfragmentação

A máscara CSS do canto inferior direito combina uma transição elíptica, uma trama radial de pontos de 7px e uma segunda máscara de saída. A união/interseção das três camadas mantém a imagem íntegra fora do canto e produz imagem → degradê → pontilhado → transparência perto da ação. Os pontos conservam as cores do asset; nenhum filtro azul foi aplicado às identidades dos sites. O CTA e os textos ficam fora da máscara. Sem partículas JS, vídeos, canvas, bibliotecas, novos assets ou centenas de elementos.

## Movimento reduzido e fallback

`prefers-reduced-motion: reduce` troca as posições e o destaque instantaneamente, sem criar animações; mudanças dessa preferência interrompem um movimento em curso. Sem JS, a estrutura padrão apresenta introdução e quatro serviços em fluxo vertical, com todos os links acessíveis e controle oculto. Sem Web Animations API, a navegação funciona por troca instantânea.

## Verificação

Chromium com iframe de largura de viewport real: **1440, 1280, 1024, 900, 768, 430, 390, 360 e 320px**.

- `scrollWidth` igual ao `clientWidth`; textos dentro da viewport, sem colisões entre núcleo e peças nos estados medidos.
- Imagens existentes carregadas, com dimensões positivas e `object-fit: cover`, sem deformação.
- Quatro estados orbitais verificados em 1280px; nenhum serviço removido ou ordem DOM alterada.
- Botão acionado por ponteiro, Enter e Espaço; foco azul visível de 2px preservado.
- CTAs comercialmente funcionais: Site institucional por teclado e Landing page por ponteiro abriram a área de contato e selecionaram o interesse correspondente, sem envio do formulário.
- Teste isolado do controlador: ciclo completo, nenhuma animação com reduced motion, guarda de cliques repetidos e cancelamento por resize.
- Comparação geométrica de Hero e Posicionamento com a preview imutável da Build 01.5: idêntica em 1280 e 390px.
- Comparação de fonte: HTML fora de Serviços intacto; CSS/JS anteriores preservados; assets sem alteração.
- `node --check script.js` e `git diff --check` aprovados.

Reduced motion foi validado por teste do controlador e inspeção das regras; não houve emulação de preferência no browser. Safari/iOS e aparelhos físicos não foram testados.

## Problemas tratados e decisões pendentes

Os limites laterais da transição foram ajustados para evitar overflow durante a rotação; o recorte da seção contém as curvas de passagem. O controle é ocultado imediatamente por CSS no tablet/mobile, além do controle pelo breakpoint em JS. O assentamento das animações canceladas possui proteção contra uma conclusão antiga interferir num movimento novo.

Não há defeito funcional identificado nos testes executados. Permanecem para revisão visual: escala relativa das quatro peças, respiro do núcleo e intensidade do pontilhado. Os assets continuam provisórios; novos mockups feitos para os recortes finais poderão melhorar o foco de cada solução, sobretudo Landing Pages e SEO. Nenhum asset foi gerado nesta rodada.

Hero, Posicionamento, Coleção Avero, Projetos, Método, Perspectiva, CTA final, Footer e motion do olho não foram reinterpretados. Main mantida em `dd9257f9c2c42d28d421a300727d6aef148f4b63`; publicação somente em preview da branch de trabalho.
