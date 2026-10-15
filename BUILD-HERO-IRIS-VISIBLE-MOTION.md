# Hero desktop — resposta visível da íris

Base: `c94722d649904518fc83da9652be07887783727a`.
Branch: `feature/service-landing-page-pilot`.

## Alteração cirúrgica

- O controlador existente já acompanha o mouse em toda a Hero. O limite anterior
  de deslocamento, proporcional ao olho, deixava a resposta pouco perceptível.
- Novo limite: `min(20px, largura do olho × 0.024)` em X e
  `min(12px, altura do olho × 0.030)` em Y. A normalização elíptica preserva
  a área segura nas diagonais. Somente a íris recebe transformação.
- Preservados: interpolação exponencial de 165ms, retorno gradual ao centro,
  clipping existente, cache das medidas e um único requestAnimationFrame.
- Tracking apenas com mouse, a partir de 901px e sem movimento reduzido.
  Tablet/mobile, toque e prefers-reduced-motion continuam estáticos.
- Assinatura na mesma posição/tamanho: champagne discretamente mais claro e
  word-spacing de 1.05em (antes 0.8em).
- O fade inferior existente termina sua transição em 12% da altura, antes 18%,
  deixando textura residual chegar um pouco mais abaixo. A borda continua
  totalmente dissolvida no fundo; nenhum elemento gráfico foi acrescentado.
- Logo, HTML, assets, composição e demais seções não foram alterados.

## Verificação executada

- `node --check script.js` e `git diff --check`: passaram.
- Harness temporário usando o controlador real: amplitude, extremos, diagonais,
  limite elíptico, inversões rápidas, retorno, mobile/toque/reduced motion,
  único RAF, cache de medidas e consistência entre 60/120Hz passaram.
  A asserção da amplitude solicitada falhava antes da correção e passou depois.
- Chrome com mouse real no preview: esquerda/direita, topo/base, diagonais e
  inversões rápidas. Deslocamentos lidos próximos de -20/+19px em X e -12/+12px
  em Y; moldura com transform none. Saída da Hero restaura o repouso.
- Comparação DOM entre base e preview via Color Lab no modo Home oficial:
  390, 430, 768, 900, 901, 1024, 1280 e 1440px, sem overflow horizontal nem
  alteração das caixas medidas da Hero, logo, H1, ações, olho, assinatura e
  seções seguintes. Inspeção visual desktop e mobile de 390px.
- Menu abre/fecha com Escape; navegação interna; Coleção próximo e teclado
  anterior; seleção de projeto e serviço no formulário funcionaram.
  Nenhuma mensagem foi enviada.
- Console: somente mensagens da extensão do navegador, sem erro do aplicativo
  observado. Não há etapa de build/dependências neste site estático.

## Limitações

QA visual em Chrome remoto e viewports equivalentes; Safari e aparelhos físicos
não foram testados. Reduced motion e frequência de atualização foram verificados
no harness, sem alegação de medição de FPS ou teste nativo de hardware.

Sem merge, alteração da main ou promoção para produção.
