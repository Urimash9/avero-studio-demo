# AVERO Studio — Home V1

Home estática em HTML, CSS e JavaScript, reconstruída a partir da referência visual aprovada em setembro de 2026. Sem etapa de build ou dependências em produção.

## Arquivos

- `index.html`: conteúdo, navegação, catálogo de conceitos e formulário.
- `styles.css`: composição desktop, tablet e celular; enquadramentos das imagens.
- `script.js`: menu mobile, navegação da coleção, seleção de serviços e mensagem para WhatsApp.
- `assets/avero-eye.png`: símbolo luminoso original enviado pelo responsável, aplicado no hero, na perspectiva, no rodapé e no favicon.
- `assets/avero-wordmark-source.png`: assinatura original AVERO. O enquadramento CSS exibe wordmark e Studio sem redesenhar a marca.
- `assets/ambient-flow.png`: linhas luminosas para transições, preservadas da composição aprovada.
- `assets/service-*.png`: quatro imagens originais de serviços.
- `assets/collection-*.png`: imagens originais para as direções da coleção.
- `assets/project-*.png`: mockups originais Nicota, clínica e gastronomia.

As 13 imagens enviadas nas duas partes estão organizadas por finalidade. Os arquivos originais são preservados; `object-fit` e máscaras CSS controlam apenas sua exibição. Os recortes da captura de referência foram substituídos pelos arquivos de 1536 px. Cores oficiais: Cosmos `#050A13`, Nebulosa `#0D1B2A`, Azul `#4DA3FF`, Lume `#E8F2FF`, Neutro `#A8B3C7`. Montserrat é usada na interface, conforme o Brand Kit v1.

## Comportamento

O formulário valida nome, empresa e descrição, monta uma mensagem com os serviços selecionados e abre o WhatsApp `+55 34 99737-4006`. O visitante confirma o envio no WhatsApp. Os campos não são armazenados no site.

A coleção apresenta seis direções visuais personalizáveis com setas, paginação e navegação por teclado. O destaque de projetos alterna entre três mockups com setas e paginação. Os cards de projetos são conceitos/demos; as ações preenchem a conversa com a direção selecionada. Não são páginas de casos reais entregues.

O endereço de e-mail reproduz a referência e deve ser validado pelo responsável. O Instagram aparece como texto até que o endereço oficial do perfil seja informado. Não há links de privacidade ou termos sem documentos correspondentes.

## Publicação

Configure a Vercel para servir a raiz do repositório como site estático (`Other`), sem comando de build. `vercel.json` conserva essa configuração e define cabeçalhos básicos.

## Verificação

Verificado no navegador em desktop e em iframe com largura de 390 px: conteúdo e imagens, ausência de rolagem horizontal, menu mobile, navegação interna, controles da coleção e dos projetos, seleção de serviço e montagem da mensagem com acentos e quebras de linha. Nenhuma mensagem de teste foi enviada.
