# Orientações para agentes

## Projeto e estrutura

AVERO Studio é uma página estática em HTML, CSS e JavaScript puro, com conteúdo
em português do Brasil. Leia `README.md` antes de alterar o projeto.

- `index.html`: conteúdo, navegação, serviços, coleção, projetos e formulário.
- `styles.css`: identidade visual, layout responsivo e enquadramento das imagens.
- `script.js`: menu mobile, seleção de serviços, carrosséis e mensagem WhatsApp.
- `assets/`: imagens originais da marca, serviços e conceitos.
- `vercel.json`: publicação estática da raiz e cabeçalhos HTTP.

Não há gerenciador de pacotes, dependências de produção, etapa de build ou suíte
automatizada versionada. Evite introduzir ferramentas ou frameworks sem necessidade
para a tarefa solicitada.

## Branch e main

- Antes de editar, confirme a branch atual com `git branch --show-current`.
- Nunca trabalhe diretamente na `main`, salvo autorização explícita do usuário.
- Se a tarefa indicar uma branch específica, trabalhe somente nela.
- Não crie branches extras por iniciativa própria.
- Use a branch indicada pela tarefa.
- Crie uma nova branch somente quando a tarefa ou o usuário solicitar explicitamente.
- Nunca crie worktree ou branch paralela apenas por conveniência.
- Nunca faça merge automaticamente.
- Nunca promova preview para produção sem autorização explícita do usuário.

## Checkpoints e documentação

- Antes de mudanças relevantes, leia `README.md` e os arquivos `BUILD-*.md`
  relacionados à área ou tarefa, quando existirem.
- Trate esses arquivos como fonte de verdade sobre decisões já aprovadas.
- Não reinterprete uma seção aprovada sem pedido explícito.

## Hierarquia de instruções

- Os arquivos `README.md` e `BUILD-*.md` registram o estado e as decisões aprovadas
  do projeto.
- Se a tarefa atual autorizar explicitamente alterar uma decisão registrada
  anteriormente, a instrução da tarefa atual prevalece.
- Nesse caso, documente claramente a nova decisão no registro da build correspondente.
- Não trate documentação antiga como motivo para ignorar uma mudança explicitamente
  solicitada pelo usuário.

## Escopo cirúrgico

- Altere apenas os arquivos e áreas necessários para a tarefa.
- Não aproveite uma tarefa isolada para redesenhar outras partes do site.
- Preserve desktop quando a tarefa for mobile-only e vice-versa.
- Evite refactors amplos não solicitados e reformatar arquivos inteiros.

## Desenvolvimento local

Use o checkout existente. As tarefas na nuvem já têm ambiente isolado; não crie
worktrees sem solicitação explícita. Verifique `git status --short` antes de editar
e preserve alterações existentes.

Na raiz do repositório, inicie o servidor:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

O servidor precisa ser iniciado novamente após restaurar o ambiente. Se a porta
estiver ocupada, inspecione o serviço existente ou use outra porta; não encerre
processos de terceiros. No onboarding da nuvem, use requisições locais para
validação, sem apresentar links de loopback como prévias ao usuário.

## Convenções e comportamento a preservar

- Mantenha HTML semântico, textos em pt-BR, rótulos acessíveis e navegação por teclado.
- Ao alterar seletores, preserve a correspondência entre HTML, CSS e JavaScript,
  incluindo `data-service`, `data-project` e estados ARIA.
- Prefira ajustar enquadramentos com CSS; criação ou substituição de assets é
  permitida quando explicitamente autorizada pela tarefa, seguindo as regras de assets.
- Cores oficiais: Cosmos `#050A13`, Nebulosa `#0D1B2A`, Azul `#4DA3FF`,
  Lume `#E8F2FF` e Neutro `#A8B3C7`. A interface usa Montserrat.
- Montserrat é carregada de `fonts.googleapis.com` e `fonts.gstatic.com`;
  diferencie falhas de rede de falhas do aplicativo.
- O formulário valida nome, negócio e descrição, monta uma URL para WhatsApp
  e deixa o visitante confirmar o envio. Não armazene dados do formulário.
- Os projetos exibidos são conceitos/demos. Não os apresente como casos entregues
  nem invente links de Instagram, privacidade ou termos ausentes.
- Faça alterações proporcionais ao pedido; evite reformatar os arquivos inteiros.

## Assets

- Não sobrescreva, remova ou substitua assets originais sem autorização explícita
  da tarefa.
- Quando a tarefa autorizar novos assets ou substituição, preserve os originais
  quando possível e documente a alteração.
- Não reutilize o mesmo asset em contextos diferentes apenas por conveniência
  quando a tarefa exigir identidade própria.

## Acessibilidade e motion

- Mantenha foco visível, navegação por teclado, labels, estados ARIA e áreas de
  toque adequadas.
- Respeite `prefers-reduced-motion` em qualquer animação nova.
- Evite esconder informação essencial apenas em hover ou animação.

## Performance e dependências

- Prefira HTML, CSS e JavaScript nativos.
- Não adicione bibliotecas, frameworks, WebGL, canvas ou dependências externas
  sem necessidade clara e autorização da tarefa.
- Prefira `transform` e `opacity` para animações.

## Princípio AVERO

- O site AVERO deve evitar aparência genérica de template.
- Decisões visuais incomuns devem ter função e contexto, não existir apenas como efeito.
- Não invente métricas, clientes, depoimentos ou resultados.
- Conceitos e demos devem continuar identificados de forma honesta.

## Validação

Para alterações em JavaScript, execute na raiz:

```sh
node --check script.js
```

Com o servidor ativo, confira respostas e conteúdo de `/`, `/styles.css`,
`/script.js` e das imagens afetadas. Uma verificação de sintaxe ou porta aberta
não demonstra que as interações funcionam.

Para mudanças de layout ou comportamento, valide em navegador desktop e mobile
(incluindo largura de 390 px): imagens carregadas, ausência de rolagem horizontal
e erros JavaScript, menu mobile, navegação interna, coleção com setas/paginação/
teclado, projetos e seleção de serviços. Preserve o suporte a movimento reduzido.

Para mudanças visuais ou responsivas relevantes, valide, quando aplicável, as
larguras de 1440, 1280, 1024, 900, 768, 430, 390, 360 e 320 px. A tarefa pode
limitar o conjunto de breakpoints, mas nunca ignore transições adjacentes que
possam sofrer regressão. Confirme ausência de overflow horizontal, erros de
console e regressões nas áreas que deveriam permanecer intactas.

Ao testar o formulário, intercepte `window.open` para inspecionar a URL gerada
ou use ferramenta equivalente. Confira campos obrigatórios, serviços selecionados,
acentos, quebras de linha e o link alternativo; não envie mensagens de teste.

Use ferramentas de navegador disponíveis no ambiente, sem adicioná-las como
dependências do site apenas para validação. Informe quais verificações executou
e eventuais limitações. Revise o diff final para alterações fora do escopo.

Antes de concluir, revise `git diff` e confirme que não houve mudanças fora do escopo.

## Publicação

A configuração Vercel usa `Other`, sem comando de build, e serve a raiz do
repositório. Preserve os cabeçalhos definidos em `vercel.json`. Publicar, fazer
push ou commit exige autorização do usuário; preparar ou validar não publica o site.

Quando a tarefa pedir preview, use deployment de branch/preview. Nunca trate
preview como produção e nunca o promova para produção sem autorização explícita.

### Preview Vercel

- Quando a tarefa solicitar preview, após commit/push aguarde o deployment da branch.
- Confirme que o deployment chegou ao estado `READY`.
- Informe a URL exata do preview.
- Se houver erro no deployment, investigue e reporte antes de considerar a tarefa concluída.
- Nunca promova esse preview para produção sem autorização explícita.

## Commit, push e entrega

- Só faça commit ou push quando a tarefa ou o usuário autorizar.
- O commit deve ser específico ao escopo e incluir apenas os arquivos autorizados.
- Ao finalizar, informe branch, commit (ou que não foi criado), arquivos alterados,
  testes executados e limitações.
