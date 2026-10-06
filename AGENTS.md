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
- Preserve os arquivos originais de imagem; ajuste enquadramentos com CSS.
- Cores oficiais: Cosmos `#050A13`, Nebulosa `#0D1B2A`, Azul `#4DA3FF`,
  Lume `#E8F2FF` e Neutro `#A8B3C7`. A interface usa Montserrat.
- Montserrat é carregada de `fonts.googleapis.com` e `fonts.gstatic.com`;
  diferencie falhas de rede de falhas do aplicativo.
- O formulário valida nome, negócio e descrição, monta uma URL para WhatsApp
  e deixa o visitante confirmar o envio. Não armazene dados do formulário.
- Os projetos exibidos são conceitos/demos. Não os apresente como casos entregues
  nem invente links de Instagram, privacidade ou termos ausentes.
- Faça alterações proporcionais ao pedido; evite reformatar os arquivos inteiros.

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

Ao testar o formulário, intercepte `window.open` para inspecionar a URL gerada
ou use ferramenta equivalente. Confira campos obrigatórios, serviços selecionados,
acentos, quebras de linha e o link alternativo; não envie mensagens de teste.

Use ferramentas de navegador disponíveis no ambiente, sem adicioná-las como
dependências do site apenas para validação. Informe quais verificações executou
e eventuais limitações. Revise o diff final para alterações fora do escopo.

## Publicação

A configuração Vercel usa `Other`, sem comando de build, e serve a raiz do
repositório. Preserve os cabeçalhos definidos em `vercel.json`. Publicar, fazer
push ou commit exige autorização do usuário; preparar ou validar não publica o site.
