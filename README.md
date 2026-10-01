# AVERO Studio — Home V1

Home estática em HTML, CSS e JavaScript, reconstruída a partir da referência visual aprovada em setembro de 2026. Sem etapa de build ou dependências em produção.

## Arquivos

- `index.html`: conteúdo, navegação, catálogo de conceitos e formulário.
- `styles.css`: composição desktop, tablet e celular; enquadramentos das imagens.
- `script.js`: menu mobile, navegação da coleção, seleção de serviços e mensagem para WhatsApp.
- `assets/hero-eye.png`: olho/portal luminoso, recriado a partir da referência.
- `assets/ambient-flow.png`: linhas luminosas usadas nas transições.
- `assets/featured-laptop.png`: imagem conceitual do notebook para Stúdio Nicota.
- `assets/reference-sheet.png`: referência original de 510 × 1536 px. Os mockups e thumbnails são exibidos por enquadramento CSS, preservando os visuais fornecidos. A resolução desses thumbnails é limitada pelo arquivo original.
- `assets/favicon.svg`: favicon da página.

## Comportamento

O formulário valida nome, empresa e descrição, monta uma mensagem com os serviços selecionados e abre o WhatsApp `+55 34 99737-4006`. O visitante confirma o envio no WhatsApp. Os campos não são armazenados no site.

A coleção apresenta três direções visuais personalizáveis. Os cards de projetos são conceitos/demos; as ações preenchem a conversa com a direção selecionada. Não são páginas de casos reais entregues.

O endereço de e-mail reproduz a referência e deve ser validado pelo responsável. O Instagram aparece como texto até que o endereço oficial do perfil seja informado. Não há links de privacidade ou termos sem documentos correspondentes.

## Publicação

Configure a Vercel para servir a raiz do repositório como site estático (`Other`), sem comando de build. `vercel.json` conserva essa configuração e define cabeçalhos básicos.

## Verificação

Verificado no navegador em desktop e em iframe com largura de 390 px: conteúdo e imagens, ausência de rolagem horizontal, menu mobile, navegação interna, controles da coleção, seleção de serviço e montagem da mensagem com acentos e quebras de linha. Nenhuma mensagem de teste foi enviada.
