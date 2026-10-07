# AVERO Studio — Build 01.2

Rodada cirúrgica de refinamento visual, responsividade e acessibilidade. Branch exclusiva: `build-01-2-refino-visual`. Base técnica e visual: `dd9257f9c2c42d28d421a300727d6aef148f4b63` da `main`.

## Arquivos

| Arquivo | Alteração |
| --- | --- |
| `index.html` | Remoção dos sete índices técnicos de seção; campo decorativo compartilhado; camadas estáticas identificáveis da Hero; controles e regiões dos carrosséis com relações ARIA; status da coleção; destino focável do link de pular conteúdo. |
| `styles.css` | Remoção das divisórias de seção/rodapé e fundos locais recortados; transições do background existente com máscaras e opacidade discreta; espaçamento sem lacunas deixadas pelos índices; proporção consistente dos serviços; área reservada para ações dos projetos; ajustes pontuais nos breakpoints; foco visível e controles com pelo menos 44 × 44 px. |
| `script.js` | Cards secundários mostram sempre os dois projetos diferentes do destaque; metadados, imagens e ações atualizados juntos; coleção sincroniza gesto manual e paginação; preserva seleção ao redimensionar; teclas de navegação e anúncios acessíveis; menu fecha quando muda o breakpoint. |
| `BUILD-01.2.md` | Registro de escopo, problemas, correções, verificação e limites da rodada. |

Nenhum asset foi criado, substituído ou modificado. Serviços, seis direções da coleção, três projetos, categorias, status e etapas do método foram preservados. O formulário conserva o número, a mensagem, os chips e a integração do WhatsApp.

## Problemas encontrados e corrigidos

- Sete rótulos técnicos e bordas horizontais criavam quebras entre blocos: removidos sem substitutos.
- Imagens de fundo terminavam nas bordas das seções: o mesmo campo gráfico agora atravessa as áreas e desaparece gradualmente.
- O destaque podia repetir Vértice Clínica ou Sabor Real nos cards secundários: cada estado agora exibe os três projetos uma única vez.
- Controles de 32–40 px e paginação estreita: áreas de interação ampliadas, com espaço reservado para não colidir com os metadados.
- Foco da coleção não tinha destaque próprio: adicionado anel visível, mantendo os demais estados de foco.
- Gesto manual da coleção não atualizava a paginação: sincronização após a rolagem estabilizar.
- Mudança de largura podia deixar o estado do menu desatualizado e desalinhava a seleção da coleção: fechamento e realinhamento nos eventos correspondentes.
- Regras sobrepostas de proporção, espaçamento e quebra de texto: correções localizadas, sem reestruturar o CSS inteiro.

A base já não apresentava overflow horizontal da página nas oito larguras medidas. A rodada preservou isso e também verificou conteúdo interno, sobreposição de controles e estados após interação.

## Verificação realizada

Navegador Chromium, página real em iframes com **largura útil exata** de 320, 360, 390, 430, 768, 900, 1024 e 1280 px. Conferência visual adicional na Home em desktop.

| Largura | Overflow da página | Texto interno medido cortado | Controles menores que 44 px | Projetos duplicados |
| --- | --- | --- | --- | --- |
| 320 px | Não | Não | Não | Não |
| 360 px | Não | Não | Não | Não |
| 390 px | Não | Não | Não | Não |
| 430 px | Não | Não | Não | Não |
| 768 px | Não | Não | Não | Não |
| 900 px | Não | Não | Não | Não |
| 1024 px | Não | Não | Não | Não |
| 1280 px | Não | Não | Não | Não |

- Os três estados de destaque dos projetos foram exercitados em todas as oito larguras. Imagem, título, categoria, status e ação correspondem à direção selecionada.
- Setas e paginação da coleção, último card e retorno ao primeiro foram verificados nas oito larguras.
- Gesto horizontal manual atualizou o card ativo, a paginação e o anúncio da coleção.
- Enter e Escape do menu, setas e Home/End dos carrosséis e foco visível do formulário foram conferidos.
- Redimensionamento de 390 para 900 e de volta manteve a seleção da coleção e fechou o menu.
- `prefers-reduced-motion` permanece no CSS. O ramo JavaScript foi exercitado com preferência simulada em página temporária e escolheu rolagem instantânea.
- Formulário vazio bloqueou a abertura; dados de teste com acentos, quebras de linha e chip selecionado produziram o URL esperado. A abertura foi interceptada apenas na página de teste; nenhuma mensagem foi enviada.
- Hero comparada com a base em 1280 px: mesma geometria de conteúdo, título, texto, botões e assinatura. Raster e enquadramento do olho preservados.
- Todas as imagens da Home carregaram; referências de assets presentes; nenhum erro da aplicação registrado no console; `node --check script.js` e `git diff --check` passaram.
- Páginas e instrumentação temporárias de auditoria não fazem parte da entrega.

## Decisões visuais reservadas

- Revisão específica das imagens dos quatro serviços e da densidade dentro dos cards.
- Próxima etapa própria da Coleção Avero, sem novas categorias ou cards nesta rodada.
- Movimento da Hero e formação do símbolo na Perspectiva.
- Aprovação visual da intensidade e do percurso do fundo compartilhado antes de qualquer nova rodada.

## Limites e riscos técnicos

Nenhum bloqueio funcional foi identificado nos cenários verificados. A auditoria foi feita em Chromium; Safari, Firefox e aparelhos físicos não foram usados nesta rodada. Máscaras CSS devem ser conferidas nesses navegadores durante a revisão final.

A Hero agora tem alvos estáticos para base, composição do olho e contraste, mas glow e íris continuam embutidos no PNG original. Movimento independente dessas partes dependerá de assets em camadas na etapa futura; nenhuma animação, canvas, WebGL ou rastreamento de cursor foi implementado.

## Controle de branch

Todo o código desta rodada foi editado e salvo exclusivamente em `build-01-2-refino-visual`. Não houve merge, promoção de produção nem alteração da `main`. A rodada termina aqui para revisão visual.
