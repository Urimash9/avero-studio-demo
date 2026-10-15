# Hero desktop — assets oficiais separados em camadas

## Base e escopo

- Branch existente: `feature/service-landing-page-pilot`.
- Base confirmada: `4a34723452a3bd6c171e372296c9a88af625f9eb`.
- Commit da implementação: `245bef27e87a283074454e7f0aa45cceb3152203`.
- Refinamento exclusivo do tracking da íris e da atmosfera da Hero desktop. Assets, encaixe, copy, tipografia, grid, botões, espaçamentos, dimensões e posição do conjunto permanecem iguais à base.
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

1. Nebulosa oficial ao fundo, fixa, com opacity .46, tratamento cromático já existente e máscara radial ampliada. Campo passa de 98% × 128% para 142% × 172% da Hero: área 1,95× maior. O fade progride por alpha 1 / .9 / .45 / 0; a proteção de contraste original continua sobre o conteúdo. Sem contorno retangular ou filtro animado.
2. Íris isolada dentro de `.hero-eye-iris-window`, uma janela fixa.
3. Moldura oficial por cima, fixa e sem a antiga máscara complementar. Sua abertura é a transparência do próprio PNG fornecido.
4. A camada de contraste já aprovada continua protegendo o texto.

`assets/hero-eye-aperture-mask.svg` é somente um recorte de exibição, seguindo a abertura do PNG. Não desenha nenhuma parte do símbolo. O fade estático de 3 unidades na resolução original suaviza a extremidade da janela; não há blur animado.

A íris ocupa 44% da largura do conjunto, com origem em 30.9% horizontal / 11.5% vertical. Sua proporção permanece quadrada e não é deformada. O centro da pupila coincide aproximadamente com o ponto óptico original do olho. A janela permanece imóvel enquanto a íris se desloca abaixo da moldura, ocultando qualquer parte externa ao encaixe.

O preload foi dividido por media query: imagem mobile até 900px; moldura e íris separadas a partir de 901px. Não foram adicionadas dependências.

## Diagnóstico e movimento refinado

Na base, o Chromium com mouse primário respondia, mas a entrada era normalizada pela Hero inteira e produzia pouca variação perto do olho. O gate `(hover:hover) and (pointer:fine)` bloqueava um mouse secundário quando o ponteiro primário era touch. Esse bloqueio foi reproduzido no controlador real em um harness determinístico; não se afirma que foi a causa específica no dispositivo do usuário.

A ativação agora exige largura a partir de 901px, ausência de reduced motion e **evento real com pointerType mouse**. Touch e pen não ativam o efeito; não há detecção por user agent nem necessidade de clique. O CSS não depende mais da classificação do ponteiro primário.

- Um listener de pointermove em captura verifica a posição dentro do retângulo da Hero, incluindo sua região coberta pelo header/controles. O header não foi alterado.
- Campo de resposta ancorado no centro óptico do olho (.538 / .565), com raios de entrada .42 da largura / .70 da altura do conjunto. Isso aumenta a leitura do movimento perto da íris.
- Deslocamento máximo proporcional ao olho: `min(13px, largura × .013)` em X e `min(8px, altura × .018)` em Y. Entrada normalizada por uma elipse segura, inclusive nos cantos; o recorte original continua fixo.
- Interpolação exponencial de 165ms, sem bounce. Apenas a íris recebe as variáveis de transform, diretamente no próprio elemento. Moldura e nebulosa permanecem fixas.
- Ao sair da Hero/janela, cancelar o ponteiro ou perder foco, interpola de volta a zero. Após assentar, limpa offsets e encerra o RAF.
- Não existe idle contínuo nesta versão: olho neutro em repouso, observação contida com mouse real. Tablet/mobile por toque permanecem estáticos, inclusive em uma tela larga.
- Um único RAF, usado somente durante a interpolação. Hero e olho são medidos na entrada ou após resize/scroll; nenhuma leitura de layout por frame.
- Reduced motion desativa e centraliza imediatamente. Documento oculto ou Hero fora do viewport limpa o estado e pausa. Retomada aguarda novo movimento real, sem salto acumulado.
- Sem JavaScript, as camadas oficiais permanecem centralizadas por CSS.

## QA executado no refinamento

- Chromium, revisão oficial `review/color-lab.html?view=home`, sem overrides de tema.
- Comparação com a base em **390, 430, 768, 900, 901, 1024, 1280 e 1440px**: geometria de Hero, conteúdo, título, lead, ações, assinatura, header, conjunto externo do olho e todas as seções/Footer idêntica à base. Zero overflow horizontal nas oito larguras.
- Nebulosa medida com área 1,95× maior a partir de 901px; mesma área em 768/900px. No mobile pequeno essa camada desktop continua oculta e a composição aprovada é mantida.
- Inspeção visual desktop: nebulosa claramente mais presente, sem borda dura; textos preservados e olho com os mesmos assets, posição e encaixe.
- Mouse real: amostra à direita `5.127 / -.498px`, inversão à esquerda `-10.448 / 2.583px`, retorno observado abaixo de .5px, completando a zero no teste determinístico. `transform:none` da moldura e da nebulosa durante todas as amostras.
- Mobile 390px inspecionado visualmente: mesmo olho estático, mesmo fundo e mesma organização. Menu abre e fecha por Escape.
- Coleção avança por botão e retorna por ArrowLeft; Projetos assume Vértice Clínica (is-active / aria-hidden=false); seleção de Landing page no formulário responde e foi restaurada. Nenhuma mensagem enviada.
- Console sem erro da aplicação observado; mensagens encontradas pertencem à extensão do navegador e à tela de autenticação da Vercel.
- Harness temporário executando o controlador real: falha de ativação da base em hardware híbrido reproduzida; versão nova passa com mouse secundário. Limites elípticos, eixos, inversão sem snap, retorno exato, touch/mobile/reduced motion, RAF único, cache de layout, visibility/viewport e consistência 60/120Hz passaram.
- `node --check script.js`: passou.
- `git diff --check`: passou.
- Diff restrito ao controlador final da Hero em script.js, duas regras CSS desktop e esta documentação. HTML, assets, outras seções, páginas internas e seus controladores permanecem intactos.

## Limitações

Safari/iOS, aparelhos físicos, perfil de FPS/GPU e inspeção visual com JavaScript desativado não foram executados. Reduced motion foi exercitado no controlador e conferido nas regras CSS; não se afirma emulação nativa dessa preferência no navegador disponível.

A homologação final de intensidade e encaixe cabe ao usuário no preview. Nenhuma rodada adicional de redesign foi iniciada. Serviços, Coleção, Projetos, Método, Perspectiva, CTA, Footer, navegação e páginas internas não receberam alterações.
