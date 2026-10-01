# AVERO Studio — Build 01.4

Base: Build 01.3, commit `30f1b1821d887c427308ce325cf7fc3131dd0ac9`.
Branch exclusiva: `build-01-2-refino-visual`.

## Escopo e arquivos

- `index.html`: somente Posicionamento; headline e textos preservados. Pilares convertidos em lista ordenada, com três nós decorativos ocultos da leitura assistiva e trajetória estática em SVG.
- `styles.css`: somente regras de Posicionamento; removidas as regras anteriores da seção, inclusive os overrides mobile. Nenhuma regra de Serviços ou de outra seção alterada.
- `review/build-01-4.html`: página auxiliar fora da navegação da Home para conferir as nove larguras em um iframe com viewport próprio. Não altera a experiência da Home.
- `BUILD-01.4.md`: decisões, verificações e limites desta rodada.

## Composição desktop

Headline dominante à esquerda, em Montserrat; texto complementar mais estreito à direita e deslocado para baixo. A sequência aberta ocupa a largura inferior, com Visão, Movimento e Resultados em posições distintas e três marcos discretos. Não há caixas, bordas ou sombras de cards.

## Composição mobile e tablet

Até 900 px, headline, texto e pilares seguem leitura vertical. Uma conexão lateral acompanha a altura real da lista, sem atravessar texto. Títulos dos pilares em 18 px e frases em 16 px. Até 430 px, o headline abandona as quebras fixas e se ajusta à largura disponível.

## Trajetória e continuidade

Um caminho estático de espessura constante, curvas controladas e transparência nas extremidades conecta os três marcos no desktop. No mobile, a linha vertical se adapta ao conteúdo e se dissolve no final. Um gradiente azul localizado de baixa opacidade mantém o fundo escuro compartilhado da Build 01.2. Nenhuma animação, biblioteca, imagem nova ou dependência foi adicionada; `data-motion="static"` identifica a composição para uma futura etapa própria.

## Problemas tratados

- Pilares comprimidos em três colunas no celular, com textos de 11–12 px.
- Linha ondulada com cinco pontos e pouca relação com os três conceitos.
- Hierarquia simples e rígida entre headline, complemento e sequência.
- Regras responsivas sobrepostas específicas de Posicionamento.

## Verificações

Verificação estática: o HTML fora de Posicionamento é idêntico à Build 01.3; as regras de Serviços são idênticas; JavaScript e assets da Home permanecem intactos. `git diff --check` passou.

A prévia da branch foi auditada em Chromium remoto nas larguras 1440, 1280, 1024, 900, 768, 430, 390, 360 e 320 px, usando viewports próprios dentro de um iframe com a Home completa. Em todas, a largura de rolagem corresponde à largura útil da página, nenhum texto da seção ultrapassa o viewport e os pilares não se sobrepõem. Montserrat carregou; os pilares usam 18 px no mobile e 16–18 px no desktop, com frases de 16 px.

A comparação entre caminho e caixas dos caracteres revelou que a saída inicial da curva passava pelo título Resultados no desktop intermediário. A extremidade foi corrigida para desaparecer acima do texto, preservando os três marcos. A lista recebeu um papel explícito para manter a semântica mesmo com marcadores visuais removidos. A trajetória permanece estática e os elementos decorativos estão ocultos da leitura assistiva.

Capturas de desktop e mobile foram inspecionadas. Nenhum erro da aplicação foi identificado nos logs conferidos; havia mensagens da extensão do navegador e do login anterior da Vercel, que não pertencem à Home.

## Revisão visual e limites

Aprovar a intensidade da trajetória, o deslocamento dos pilares no desktop e o ritmo vertical no mobile. O texto e a identidade foram preservados. Serviços, Hero, Coleção, Projetos, Método, Perspectiva, CTA e Footer não foram reinterpretados.

O ambiente não dispõe de `agent-browser` nem de Chromium local utilizável; a conferência usa o navegador remoto e a prévia da branch. Safari, Firefox e dispositivos físicos não estão cobertos.

## Branch e encerramento

A `main` foi conferida inicialmente em `dd9257f9c2c42d28d421a300727d6aef148f4b63`. Nenhuma mudança direta nela, nenhum merge, nenhuma promoção para produção. A rodada termina para revisão visual, sem implementar motion.
