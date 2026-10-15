# Hero desktop — fundo, assinatura, íris e wordmark

## Base e escopo

- Branch existente: `feature/service-landing-page-pilot`.
- Base confirmada antes da edição: `336ddf9fcb30a76a1905a680fd3aee9af1bb3c6c`.
- Código final: `70108e639745424c9be74e8a8000c2f3685c8e5e`.
- Somente acabamento desktop a partir de 901px; mobile/tablet até 900px preservados.
- HTML final idêntico à base. Nenhum asset substituído ou reexportado.
- Main preservada em `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Sem merge ou produção.

## Alterações

### Wordmark do header da Home

Mantido `assets/avero-wordmark-provisional-01-16a.png`, 2172 × 724. Não há outra versão transparente de maior definição do mesmo wordmark no repositório; a fonte antiga contém outra apresentação e não foi reutilizada.

Aplicados `image-rendering:-webkit-optimize-contrast` e contraste estático de 1.08 somente ao header desktop da Home. Nenhum upscale, glow, nova sombra, mudança de width/height, transform ou posição. A caixa continua 185 × 49px; a imagem conserva seu retângulo e proporção. Navegadores sem suporte à otimização de downsampling conservam a interpolação padrão. Esse tratamento melhora a leitura das bordas, mas não cria detalhes ausentes no PNG provisório. Header das páginas internas e Footer não recebem esse tratamento.

### Assinatura de transição

`VISÃO MOVIMENTO RESULTADOS` deixa a lateral inferior do olho e ocupa a faixa vazia abaixo das ações, centralizada, em linha horizontal. Usa o espaço absoluto já existente, sem aumentar a altura da Hero nem deslocar a próxima seção. Fonte 12px, champagne claro e espaçamento controlado. Conteúdo, markup e apresentação mobile originais preservados.

### Atmosfera

Mesma nebulosa oficial `assets/hero-nebula-official.png`, fixa atrás do olho. Campo passa de 142% × 172% para 154% × 183% da Hero, aproximadamente 15% mais área, com opacity .50 (antes .46), enquadramento ajustado e máscara radial em alpha 1 / .88 / .38 / 0. Tratamento cromático prata já existente preservado. Dois gradientes estáticos de baixa intensidade acrescentam prata/champagne ao espaço de transição, dissolvendo antes do limite inferior. Sem filtros animados, retângulos ou mudanças na seção seguinte.

### Íris

Mouse real já movimentava a camada nesta base; o problema observado foi a pequena variação nas proximidades do olho. O raio de entrada passa de .42 / .70 para .30 / .52 das dimensões do conjunto. A mesma distância do cursor produz uma resposta mais perceptível, sem ampliar a área segura de deslocamento.

Limites preservados: `min(13px, largura × .013)` em X e `min(8px, altura × .018)` em Y, normalizados por elipse. Interpolação exponencial de 165ms, retorno suave ao centro, um único RAF e pausa ao assentar. Moldura e nebulosa permanecem fixas. Recorte, dimensões, encaixe e assets oficiais do olho não mudaram. Touch/pen/mobile e reduced motion continuam estáticos. Não há idle contínuo, dependência nova ou leitura de layout por frame.

## Verificações executadas

- `node --check script.js` e `git diff --check`: passaram.
- Harness temporário executando o controlador real: ativação com mouse secundário, limites elípticos, X/Y, inversão, retorno exato, touch/mobile, reduced motion, RAF único, cache de layout, visibilidade e consistência 60/120Hz passaram.
- Chromium, Home oficial e iframe de revisão sem overrides de tema: 390, 430, 768, 900, 901, 1024, 1280 e 1440px; zero overflow.
- Comparação geométrica com a base nas oito larguras: Hero, conteúdo, headline, apoio, ações, header, imagem/caixa da logo, conjunto externo do olho e todas as seções/Footer permanecem iguais. A única diferença geométrica é a assinatura desktop. Mobile, incluindo assinatura, idêntico.
- Inspeção visual desktop e mobile; nebulosa mais presente e dissolvida; assinatura afastada do olho. Logo com o mesmo tamanho, posição e enquadramento.
- Mouse real: deslocamentos observados de aproximadamente `10.834 / -2.408px` à direita e `-11.183 / 1.449px` à esquerda, moldura/nebulosa com `transform:none`; retorno neutro conferido.
- Menu mobile abre e fecha por Escape; navegação interna de revisão; Coleção avança para Arquitetura & Interiores e retorna a Gastronomia por ArrowLeft. Seleção de Landing page no formulário respondeu e foi restaurada; nenhuma mensagem enviada.
- Console inspecionado: sem erro da aplicação observado; registros encontrados pertencem à extensão do navegador.
- Diff final restrito a CSS da Hero/header desktop, dois parâmetros do controlador da íris e este registro. HTML, fontes, imagens, carrosséis, outras seções e páginas internas intactos.

## Limitações

Safari/iOS e aparelhos físicos não executados. Reduced motion verificado no controlador e CSS, sem emulação nativa da preferência no navegador disponível. Não houve perfil de FPS/GPU nem teste visual com JavaScript desativado; o fallback CSS estático existente foi preservado. A nitidez final permanece limitada pelo arquivo provisório do wordmark. Intensidade atmosférica e movimento aguardam homologação do usuário no preview.
