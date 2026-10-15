# Hero desktop — assets oficiais separados em camadas

## Base e escopo

- Branch existente: `feature/service-landing-page-pilot`.
- Base confirmada: `b13f1e012f960231200f9b165df74101db74d5e8`.
- Commit da implementação: `4e7f255e5a66e582aaa28c91db3a930eaedbf0cc`.
- Substituição exclusivamente das fontes visuais da Hero desktop. Copy, tipografia, grid, botões, espaçamentos, dimensões e posição do conjunto permanecem iguais à base.
- Main: `dd9257f9c2c42d28d421a300727d6aef148f4b63`, sem alteração, merge ou promoção para produção.
- Esta versão substitui a composição anterior que recortava a íris a partir de uma segunda cópia do olho inteiro. Agora moldura e íris são os dois PNGs separados fornecidos pelo usuário.

## Arquivos oficiais

Os arquivos foram copiados integralmente, sem reexportação, recoloração, upscale, desenho, remoção de pixels ou alteração de transparência.

| Envio | Referência do usuário | Arquivo no projeto | Dimensões |
| --- | --- | --- | --- |
| `1000036037.png` | `portal_ocular_futurista_em_luz_prateada.png` | `assets/hero-eye-frame-official.png` | 1774 × 887, RGBA |
| `1000036038.png` | `íris_cósmica_luminosa_em_transparência.png` | `assets/hero-eye-iris-official.png` | 1254 × 1254, RGBA |
| `1000033765.png` | `a_wide_dark_cosmic_space_background_scene_a_deep.png` | `assets/hero-nebula-official.png` | 1536 × 1024, RGB |

SHA-256:

- Moldura: `f5aad4ee77e392042bd6f5d79e050d5bb455f9a87029668c1fcba2a30466ddf0`.
- Íris: `fc90a9fafc44568ef79f602ea44946beb0070aaf0f01fc87ccc44847dd9ccd20`.
- Nebulosa: `eb821ef91119327faa99203d406f04aaae0fa891e0168a84019570b0f6e868e1`.

Todos os assets anteriores continuam preservados. O mobile usa o mesmo `avero-eye-isolated-v1.webp` de antes.

## Arquitetura e encaixe

As novas fontes entram somente em `min-width:901px`:

1. Nebulosa oficial ao fundo, fixa, com opacity .34, tratamento cromático já existente e máscara radial ampla. Mantém a área e o fade da base, sem contorno retangular ou filtro animado.
2. Íris isolada dentro de `.hero-eye-iris-window`, uma janela fixa.
3. Moldura oficial por cima, fixa e sem a antiga máscara complementar. Sua abertura é a transparência do próprio PNG fornecido.
4. A camada de contraste já aprovada continua protegendo o texto.

`assets/hero-eye-aperture-mask.svg` é somente um recorte de exibição, seguindo a abertura do PNG. Não desenha nenhuma parte do símbolo. O fade estático de 3 unidades na resolução original suaviza a extremidade da janela; não há blur animado.

A íris ocupa 44% da largura do conjunto, com origem em 30.9% horizontal / 11.5% vertical. Sua proporção permanece quadrada e não é deformada. O centro da pupila coincide aproximadamente com o ponto óptico original do olho. A janela permanece imóvel enquanto a íris se desloca abaixo da moldura, ocultando qualquer parte externa ao encaixe.

O preload foi dividido por media query: imagem mobile até 900px; moldura e íris separadas a partir de 901px. Não foram adicionadas dependências.

## Movimento

`script.js` permanece byte a byte igual à base. O controlador já aprovado é reutilizado:

- Ativação a partir de 901px, com `hover:hover`, `pointer:fine` e sem reduced motion.
- Apenas `.hero-eye-iris` consome os offsets. Moldura e nebulosa têm `transform:none`.
- Amplitude nominal: 9px horizontal / 6px vertical, com limites absolutos de 10px / 7px.
- Easing exponencial de 175ms, independente da taxa de atualização, sem bounce.
- Saída, cancelamento do ponteiro ou perda de foco retornam ao centro suavemente.
- Idle contido, até .45px / .30px, com ciclos de cerca de 14s / 16.9s.
- Um único RAF; nenhuma medição de layout por frame; pausa fora do viewport e com documento oculto.
- Touch é ignorado. Tablet/mobile permanecem estáticos.
- Reduced motion cancela o RAF e centraliza a íris. Sem JS, as camadas ficam centralizadas por CSS.

## QA executado nesta versão

- Chromium, revisão oficial `review/color-lab.html?view=home`, sem overrides de tema.
- Comparação com a base em **390, 430, 768, 900, 901, 1024, 1280 e 1440px**. Após estabilização do resize, geometria de Hero, conteúdo, título, lead, ações, assinatura, header e todas as seções/Footer idêntica à base.
- Zero overflow horizontal nas oito larguras.
- Inspeção visual desktop em 1280/1440px e mobile em 390/430px. Moldura e íris carregadas; abertura preenchida; sem linha cinza de separação, vazamento ou borda retangular percebida. Nebulosa visível e dissolvida no fundo.
- Ponteiro real: direita `7.473 / -1.122px`, inversão `-6.664 / 3.912px`, retorno após saída `.265 / .171px`. Moldura e nebulosa permaneceram com `transform:none` em todas as amostras.
- Resize desktop/mobile desativa o movimento e limpa offsets; assets e CSS do olho mobile aprovado permanecem os mesmos.
- Menu mobile abre e fecha com Escape; Coleção avança por botão e retorna por ArrowLeft; Projetos avança para Vértice Clínica.
- Console sem erros da aplicação observados. Avisos registrados pertencem à extensão do navegador e à tela de autenticação da Vercel. Proteção do preview foi acessada por link temporário autorizado, sem mudar configurações.
- Asset mobile verificado também por HTTP: 200. Os três PNGs novos tiveram igualdade binária confirmada com os envios.
- Harness temporário do controlador real em Node: limites, inversão, retorno, touch ignorado, resize, viewport/visibility, reduced motion inicial e alterado, breakpoint mobile, RAF único, cache de layout e equivalência 60/120Hz passaram.
- `node --check script.js`: passou.
- `git diff --check`: passou.
- Comparação de arquivos: conteúdo da Hero e todo HTML a partir dele idênticos; JS idêntico; CSS novo restrito à Hero em min-width:901px; assets de outras áreas intactos.

## Limitações

Safari/iOS, aparelhos físicos, perfil de FPS/GPU e inspeção visual com JavaScript desativado não foram executados. Reduced motion foi exercitado no controlador e conferido nas regras CSS; não se afirma emulação nativa dessa preferência no navegador disponível.

A homologação final de intensidade e encaixe cabe ao usuário no preview. Nenhuma rodada adicional de redesign foi iniciada. Serviços, Coleção, Projetos, Método, Perspectiva, CTA, Footer, navegação e páginas internas não receberam alterações.
