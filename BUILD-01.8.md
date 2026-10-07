# AVERO Studio — Build 01.8

Branch: `build-01-2-refino-visual`. Base: `eed0d932de2ee946e833682bc3e4c74daf3f92b0` (Build 01.7).

## Arquivos e escopo

- `index.html`: somente Método e Perspectiva. Conteúdo preservado; assinatura aprovada do Método integrada após as etapas; CTA redundante removido.
- `styles.css`: regras novas restritas a `.method` e `.perspective`. CSS das Builds anteriores preservado integralmente.
- `review/build-01-8.html`: revisão isolada da Home em iframe de largura real; áreas Método/Perspectiva selecionáveis. “Visão geral” reduz apenas a exibição do iframe, sem mudar a largura testada.
- `BUILD-01.8.md`: decisões e verificação da rodada.

`script.js` e todos os assets permanecem intactos. Hero, Posicionamento, Serviços, Coleção Avero, Projetos, CTA final, Footer e background global não foram reinterpretados. Comparação com a base confirma o restante do HTML byte a byte e o CSS anterior como prefixo sem alterações.

## Método desktop

Introdução à esquerda e percurso à direita. A linha começa horizontalmente abaixo de Imersão, faz uma curva ampla à direita e segue verticalmente. Pequenos deslocamentos laterais aproximam as quatro etapas do percurso sem alterar a sequência 01 → 02 → 03 → 04. Há quatro nós pequenos, com contraste moderado e glow de 3px; sem pulsação ou animação contínua.

A lista ordenada mantém o conteúdo e a ordem semântica. A linha e os marcadores são SVGs decorativos, com `aria-hidden` e `focusable="false"`; nenhum texto está dentro do SVG. Os números são discretos e não repetem a leitura da lista.

“Conheça nosso método” apontava apenas para `#metodo`, dentro da própria seção. O botão foi removido, sem criar página ou destino artificial. O ID `metodo` permanece na lista. O encerramento “Clareza durante o processo. / Intenção em cada decisão.” acompanha o fim da trajetória, sem card.

## Método mobile e tablet estreito

A partir de 900px, a introdução e as quatro palavras ficam centralizadas. O percurso possui desenho próprio: passa abaixo de Imersão, contorna Direção à direita, acompanha Criação, retorna por baixo dela, curva pela esquerda e termina sob Evolução. As descrições ficam centralizadas e a ordem DOM permanece igual.

A área da trajetória é de 420px, com intervalos de 100px entre etapas, em vez dos 460px do desktop. A curva contorna o conteúdo e deixa espaço para as descrições em duas linhas nas telas menores. Os números ficam próximos das palavras, sem interferir na trajetória.

## Perspectiva desktop

Três forças em uma composição com colunas laterais iguais: frase esquerda voltada para o centro, símbolo no eixo exato e frase direita. As três partes compartilham o centro vertical. O asset existente `avero-eye.png` foi mantido; escala menor, opacidade de 56%, crop e máscara radial suavizam sua presença. O contexto é uma reflexão breve, com maior proximidade entre as massas tipográficas e o símbolo.

“Percepção gera confiança. / Confiança abre oportunidades.” fecha o conjunto no eixo central. A assinatura VISÃO · MOVIMENTO · RESULTADOS tem escala pequena, tracking moderado e distância própria. O texto complementar existente da assinatura também foi preservado.

## Perspectiva mobile

A partir de 900px, o conjunto migra para composição central e vertical. O símbolo mantém altura de 205px e largura responsiva, de aproximadamente 231px em 320px a 310px em tablet/mobile largo. O título e a frase seguinte se aproximam das bordas do olho por margens negativas pequenas de 12px e 22px.

Uma máscara vertical suave, combinada com uma máscara radial, reduz a presença do símbolo nas regiões próximas dos textos e preserva o centro. O texto fica à frente e mantém opacidade integral. Não há JavaScript, novo asset, efeito na íris ou fade aplicado à tipografia.

## Transição para CTA e motion

A transição adicional de eclipse/órbita foi descartada. As trajetórias globais já sustentam a continuidade, e outra peça competiria com o centro do manifesto. Foi mantida uma passagem aberta com espaçamento natural; nenhuma alteração no CTA final.

Tudo nesta rodada permanece estático, inclusive com `prefers-reduced-motion`. Para uma rodada futura de motion: revelação progressiva do percurso e entrada discreta das etapas, respeitando a preferência de movimento reduzido. Nenhuma dessas animações foi implementada agora.

## Verificação responsiva

Larguras reais verificadas na preview: 1440, 1280, 1024, 900, 768, 430, 390, 360 e 320px.

| Largura | Percurso | Altura do Método | Altura da Perspectiva |
| --- | --- | --- | --- |
| 1440px | Desktop | 643,6px | 525,4px |
| 1280px | Desktop | 643,6px | 525,4px |
| 1024px | Desktop | 643,6px | 525,4px |
| 900px | Central/mobile | 808,5px | 663,2px |
| 768px | Central/mobile | 808,5px | 663,2px |
| 430px | Central/mobile | 812,3px | 628,0px |
| 390px | Central/mobile | 830,8px | 614,2px |
| 360px | Central/mobile | 829,8px | 607,0px |
| 320px | Central/mobile | 862,8px | 655,0px |

- Nenhum overflow horizontal da Home ou texto cortado nas nove larguras.
- Conferência geométrica do SVG renderizado contra os retângulos de leitura dos títulos, descrições e números; trajetória não cruza letras.
- Centro do olho coincide com o centro da composição, com diferença máxima de 0,01px por arredondamento.
- Abaixo de 900px, títulos e descrições do Método e textos principais da Perspectiva centralizados.
- Lista semântica, headings, ordem de leitura e elementos decorativos ocultos à leitura assistiva preservados.
- Sem nova biblioteca, framework, JS, canvas, WebGL ou asset pesado.

## Problemas encontrados e corrigidos

1. CTA do Método sem função adicional: substituído pelo fechamento aprovado.
2. Regra antiga escondia o `br` do fechamento no mobile, juntando as frases: override restrito ao encerramento restaurou a quebra.
3. Fade inicial do SVG mobile escondia o trecho horizontal: gradiente passou a usar coordenadas do próprio SVG, mantendo a chegada da linha visível.
4. Em 320px, a curva encostava no marcador 04: os números foram deslocados 15px para perto dos títulos, sem mudar a centralidade das palavras.
5. Percurso mobile inicialmente mais longo: reduzido de 460 para 420px e espaçamento ajustado.

Nenhum bloqueio funcional identificado. Escala/presença do símbolo, proximidade tipográfica e intensidade da trajetória aguardam revisão visual. A rodada não inclui animação do olho nem qualquer outro motion complexo.

Main permaneceu no SHA `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Nenhum merge ou promoção para produção foi realizado.
