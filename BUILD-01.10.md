# AVERO Studio — Build 01.10

Branch: `build-01-2-refino-visual`. Base aprovada: `9101edf` (Build 01.9).
Escopo: correções mobile, sem reinterpretar o desktop ou o Posicionamento.

## Arquivos

- `index.html`: somente path e nós do SVG mobile do Método.
- `styles.css`: regras adicionadas após o CSS existente; Hero/Serviços até 700px e Coleção/Perspectiva/fechamento até 900px.
- `script.js`: desdobramento/recolhimento visual das páginas durante a troca mobile da Coleção; fluxo desktop preservado.
- `review/build-01-10.html`: ferramenta isolada de revisão por largura e seção, fora da Home.
- `BUILD-01.10.md`: registro desta rodada.

Nenhum asset foi trocado ou criado. A alteração local preexistente em `assets/collection-gastronomy.png` foi preservada e não entrou nos commits desta build.

## Hero

Os dois CTAs têm exatamente 54px de altura, mesmos limites superior/inferior e conteúdo centralizado. O principal permanece mais largo. O rótulo cabe em uma linha inclusive em 320px. A faixa de ações continua com 66px para preservar o encaixe vertical do olho; a diferença fica como respiro abaixo dos botões.

A nebulosa usa uma camada independente de gradientes radiais em `::before`, do segundo trecho da headline até a região do texto complementar. `mask-image: linear-gradient(...)` dissipa as duas extremidades. Um segundo pseudo-elemento mostra apenas um recorte superior da nebulosa do asset existente, sem esticar a imagem nem reproduzir outro olho. As regras de posição, escala, background e máscara de `.hero-mobile-eye` permaneceram intactas. Em 390px, o olho manteve o mesmo deslocamento de 388,46875px relativo à Hero antes/depois.

O componente ROLAR fica em `display:none` e sua área saiu do grid. A assinatura fecha a Hero com 22px de respiro após o texto. O indicador e a Hero de tablet/desktop continuam com o tratamento anterior acima de 700px.

## Serviços

A máscara de desfragmentação cresceu de 155×105 para 205×145px, com pontos de raio 1,8px e passo de 8px. O degradê inferior ficou menos opaco para que os fragmentos do próprio asset apareçam. A transição continua restrita ao canto inferior direito próximo da ação; nomes, descrições, botões e estrutura dos cards foram preservados. Inspeção visual em 320px confirmou pontos visíveis e imagens legíveis.

## Método

O SVG mobile entra à esquerda, passa abaixo de Imersão, curva para a direita, acompanha Direção/Criação e retorna com raio amplo à esquerda. Termina em `(8,368)` no viewBox `400×460`; não faz a antiga volta extra nem continua sob a frase de Evolução. Os quatro nós acompanham o percurso. Etapas, tipografia, espaçamento e fechamento continuam iguais. O SVG desktop não mudou.

## Coleção

Destaque à esquerda preservado. As quatro páginas laterais compartilham uma dobradiça em 64% da largura/40% da altura do mecanismo. Ângulos, escalas e camadas diferentes formam um leque ligado ao pequeno eixo, substituindo a leitura de pilha vertical. A estrutura dos 12 itens e a ordem DOM foram mantidas.

As páginas oscilam autonomamente ±2° em ciclos CSS de 18s, com fases distintas; o destaque não troca sozinho. O movimento foi observado com a página parada e duas matrizes de transformação diferentes, sem scroll. Pausa manual continua disponível; fora da área visível ou com a aba oculta, o mecanismo repousa.

As setas pausam o movimento ambiental por 5,5s. A troca FLIP existente move as peças reais por 720ms; no mobile, uma animação da transformação visual também desdobra a página que avança e recolhe a que retorna. Não há clones, reorganização DOM ou bibliotecas novas. Cliques consecutivos cancelam/assentam a transição anterior. Após a troca, a animação ambiental retoma.

## Perspectiva

O background mobile do olho passou de 125% para 100% de largura. A máscara radial que enfraquecia/cortava as extremidades foi substituída por fade somente vertical. Container, centralidade, altura, margens, textos e opacidade foram preservados. As duas pontas da silhueta estão presentes.

## CTA final e Footer

Composição centralizada do título até o copyright: headline, dois parágrafos, CTAs empilhados, observação de projetos personalizados, card, heading/microcopy, chips, botão, WhatsApp, marca, tagline, grupos de navegação/contato e assinatura final. Containers têm largura máxima e margens automáticas; grupos usam alinhamento central, sem regra global indiscriminada. Inputs/textarea permanecem alinhados à esquerda. Chips e links do fechamento mantêm área mínima de toque de 44px.

## Reduced motion e acessibilidade

A preferência remove a oscilação CSS e impede as animações WAAPI: a navegação troca diretamente. Teste isolado do código real em Node confirmou ciclo dos 12 itens, anterior, Home/End, um único item ativo, inativos inert, zero chamadas de animação e controle ambiental oculto, tanto no modo mobile como no desktop. A regra CSS de redução também foi conferida; não foi feita emulação da preferência do sistema operacional no navegador.

No navegador, as 12 entradas navegaram em ciclo sem duplicar o destaque; Home/End funcionaram, foco por teclado mostrou outline de 2px, pausa/retomada funcionaram. O chip “Ainda não sei” foi selecionado e o campo Nome editado sem envio do formulário. Elementos gráficos são SVG aria-hidden ou pseudo-elementos decorativos.

## Verificação

| Largura solicitada | Largura útil / scrollWidth | Resultado |
| --- | --- | --- |
| 430px | 415 / 415px | Sem overflow; CTAs 54px; percurso encerra antes da frase final; fechamento central |
| 390px | 375 / 375px | Sem overflow; CTAs 54px; olho da Hero na posição original |
| 360px | 345 / 345px | Sem overflow; rótulos inteiros e boa leitura |
| 320px | 305 / 305px | Sem overflow; ciclo 12/12, fragmentação e controles legíveis |
| 768px | 753 / 753px | Sem overflow; transição tablet; Hero anterior preservada |
| 900px | 885 / 885px | Sem overflow; mecanismo/percurso mobile estáveis; Hero anterior preservada |

A diferença de 15px corresponde à barra de rolagem do iframe de revisão. Em todas as larguras, scrollWidth foi igual à largura útil. Controles da Coleção mediram 46×46px e pausa 44×44px.

Comparação de 17 seletores com a Build 01.9 em 1024, 1280 e 1440px: nenhuma diferença de largura, altura, posição horizontal, grid, alinhamento, background-size, máscara ou transformação, usando o mesmo item ativo. O HTML externo ao SVG mobile é idêntico e o CSS anterior foi preservado integralmente. `node --check script.js` e `git diff --check` passaram.

## Limitações e continuidade

- Assets da Coleção continuam provisórios/repetidos; a distinção completa das 12 direções depende dos assets finais já previstos.
- A nebulosa original está no mesmo raster do olho. A expansão usa fundo independente e recorte superior existente; um futuro asset de nebulosa separado permitiria controle fotográfico mais preciso.
- Verificação de renderização realizada em Chrome por larguras de iframe; Safari/iOS e dispositivos físicos não foram testados.
- Motion elaborado e refinamentos de assets continuam fora desta rodada.

Nenhuma copy foi reescrita. Posicionamento e Projetos não foram modificados; as demais intervenções ficaram nos pontos mobile autorizados. Desktop não reinterpretado. Sem novas dependências, assets, páginas comerciais ou seções. Preview da branch criada pela integração Git/Vercel; nenhum deploy de produção ou merge realizado. Main preservada no SHA `dd9257f9c2c42d28d421a300727d6aef148f4b63`.
