# Autoria e titularidade do Jarvis

**© 2026 GK Soluções Empresariais LTDA · Todos os direitos reservados.**
Software proprietário (veja [`LICENSE`](LICENSE)), protegido pela Lei 9.609/1998 (Lei do Software) e pela
Lei 9.610/1998 (Lei de Direitos Autorais).

```
-----INÍCIO DO BLOCO DE AUTORIA-----
TITULAR: GK Soluções Empresariais LTDA
CNPJ: 60.180.675/0001-91
AUTORIA: GK Soluções Empresariais LTDA
ANO: 2026
PROGRAMA: Jarvis (Jarvis E-Commerce, Jarvis ERP, Jarvis Escritório, Jarvis Reforma, Jarvis Normas, Jarvis Pessoas, Jarvis Segurança, Jarvis MEI e Jarvis Economia)
DIREITOS: Todos os direitos reservados (Lei 9.609/1998 e Lei 9.610/1998)
-----FIM DO BLOCO DE AUTORIA-----
```

Impressão digital da autoria: **`JARVIS-GK-EE4EF9C1C22A3520`**
(SHA-256 do bloco acima: `ee4ef9c1c22a3520fad9ec9527d74793f79ba1906f68f80825530f4b2b7517a7`).

## Declaração

- **Titular e autora:** GK Soluções Empresariais LTDA, CNPJ 60.180.675/0001-91.
- **Obra:** o programa de computador Jarvis, com os seus 9 produtos, o código-fonte, o esquema do banco, as funções do
  servidor, as telas, as regras de conferência, os roteiros, a documentação, o site institucional, a Academia e os
  materiais de venda deste repositório.
- **Início:** desenvolvido desde 2026. O registro datado é o histórico do repositório de origem no GitHub (o `origin` deste
  repositório: commits, autores e datas); a cópia local pode ser rasa e não mostrar o começo. As 177 regras do CRIVO que o Jarvis
  Reforma traduziu para JavaScript vêm do projeto CRIVO, do mesmo titular (repositório `conferencia-fiscal`, na mesma conta do GitHub).
- **Como foi feito:** o Jarvis foi concebido, especificado e dirigido pela GK Soluções Empresariais LTDA, que definiu
  o que cada produto faz, as regras de negócio, a arquitetura, o texto e o visual, e escolheu e aprovou cada mudança.
  Ferramentas de inteligência artificial (como o Claude Code) foram usadas como **instrumento** de escrita do código, a
  pedido e sob a direção da titular. Os commits marcados "Claude" foram feitos pela ferramenta a pedido da titular; a
  titularidade de tudo o que eles contêm é integral da GK Soluções Empresariais LTDA.

## Os 9 produtos e onde estão

| Produto | Endereço | Pastas principais |
|---|---|---|
| Jarvis E-Commerce | `/app/` | `web/*.js`, `web/*.css`, `web/app/`, `web/cliente.html`, `web/ponto.html`, `web/loja-modelo/`; funções `ai-assistant`, `integrations`, `oauth-callback`, `contas-email`, `gnre`, `navio-posicao` (e as comuns) |
| Jarvis ERP (antigo Jarvis Simples) | `/simples/` | `web/simples/`, a base comum `web/escritorio/comum/` e os motores de `web/escritorio/motor/` que ele usa, o módulo LGPD `web/escritorio/modulos/lgpd/` (o mesmo do Escritório); função `erp-assistente` |
| Jarvis Escritório | `/escritorio/` | `web/escritorio/`; funções `captura-nfe`, `central-fiscal` |
| Jarvis Reforma (antigo Jarvis Auditor) | `/reforma/` | `web/reforma/`, `web/escritorio/modulos/auditor/`, `web/escritorio/motor/auditor/` (cópia no servidor em `supabase/functions/_shared/auditor/`) |
| Jarvis Normas | `/normas/` | `web/normas/`, `web/escritorio/modulos/normas/`, `web/escritorio/motor/normas/` (sem o acervo oficial); função `normas-assistente` |
| Jarvis Pessoas | `/pessoas/` | `web/pessoas/`, `web/escritorio/modulos/gente/`, `web/escritorio/motor/gente/`; funções `pessoas-integracoes`, `pessoas-assistente` |
| Jarvis Segurança | `/seguranca/` | `web/seguranca/`, `web/escritorio/modulos/sst/`, `web/escritorio/motor/sst/`, `web/escritorio/sementes/sst.js`; migrações `20261123*_sst_*.sql` e `20261123160000_cobranca_seguranca.sql` |
| Jarvis MEI | `/mei/` | `web/mei/` (com a página pública `web/mei/agendar/`), `web/escritorio/modulos/mei/`, `web/escritorio/motor/mei_app.js`, `web/escritorio/motor/mei_recibo.js`, `web/escritorio/sementes/mei.js`; migrações `20261124*_mei_*.sql` e `20261124160000_cobranca_mei.sql` |
| Jarvis Economia | `/economia/` | `web/economia/`, `web/escritorio/modulos/economia/`, `web/escritorio/motor/economia/`; função `economia-coletar` (com `supabase/functions/_shared/economia_*.ts`); migração `20261213090000_economia.sql` |
| Comum a todos | — | `web/autoria.js`, `web/autoria-classico.js`, `web/config.js`, `web/erros.js`, `supabase/functions/_shared/`, as funções `portal`, `ponto`, `sistema`, `cobranca`, `supabase/migrations/`, `site/`, `ops/`, `testes/` |

A lista exata, arquivo por arquivo, de cada produto sai em `materiais/inpi/<produto>/` quando se roda
`node ops/autoria/pacote-inpi.mjs` (veja [`docs/AUTORIA-INPI.md`](docs/AUTORIA-INPI.md)).

## O que NÃO é da GK (componentes e conteúdos de terceiros)

Continuam com as licenças e os direitos dos seus titulares; a `LICENSE` deste repositório não se aplica a eles.

| Componente | Onde | Titular e licença |
|---|---|---|
| supabase-js | `web/vendor/supabase.js`; `npm:@supabase/supabase-js` nas funções | Supabase, MIT (`web/vendor/Supabase-LICENSE.txt`) |
| SheetJS (xlsx) | `web/vendor/xlsx.full.min.js`; `npm:xlsx@0.18.5` nas funções | SheetJS, Apache-2.0 (`web/vendor/SheetJS-LICENSE.txt`) |
| PDF.js | `web/vendor/pdf.mjs`, `web/vendor/pdf.worker.mjs` | Mozilla Foundation, Apache-2.0 (`web/vendor/LICENSE`) |
| jsPDF 2.5.1, QRCode.js 1.0.0, JSZip 3.10.1, node-forge 1.3.1 | carregados por CDN (cdnjs, jsDelivr) em telas do E-Commerce e do ERP | seus autores, licenças MIT (JSZip: MIT ou GPLv3; node-forge: BSD-3-Clause ou GPL-2.0) |
| node-forge 1.3.1, pdf-lib 1.17.1, web-push 3.6.7, Anthropic SDK 0.128.0 | importados por `npm:` nas funções do Supabase | seus autores (BSD/GPL, MIT, MPL-2.0, MIT) |
| PGlite, esbuild, linkedom (e dependências) | `package.json` (só para testes e montagem do site) | ElectricSQL (Apache-2.0), Evan Wallace (MIT), Andrea Giammarchi (ISC) |
| Playwright, ffmpeg, sherpa-onnx | ferramentas externas das capturas, vídeos e narração (`site/`), não vêm no repositório | seus autores (Apache-2.0, LGPL/GPL, Apache-2.0) |
| Voz Piper `pt_BR-faber-medium` | baixada por `site/academia/aulas/gravar.mjs` para `JARVIS_TTS`, fora do repositório | autores do modelo, conforme a licença do pacote |
| Fontes Inter, Plus Jakarta Sans, DM Sans, Manrope, Nunito e JetBrains Mono | Google Fonts e `site/materiais/divulgacao/assets/fonts/` | seus autores, SIL Open Font License 1.1 |
| Textos oficiais do CPC (pronunciamentos, interpretações, orientações) | `web/escritorio/motor/normas/acervo/` | Comitê de Pronunciamentos Contábeis / FACPCS (termos de uso deles); trechos de origem IFRS: IFRS Foundation |
| Catálogos oficiais do CPC e das NBC do CFC | `web/escritorio/motor/normas/catalogo_oficial.js`, `catalogo_cfc.js` | dados públicos do CPC e do CFC (cpc.org.br, cfc.org.br) |
| Tabelas oficiais (CFOP, CST, CSOSN, LC 116, CNAE, municípios do IBGE, NCM, feriados) | `web/escritorio/tabelas/` | CONFAZ, Receita Federal, IBGE/CONCLA, Siscomex, Planalto (dados públicos; fontes em `LEIAME.md` da pasta) |
| Tabelas da Reforma (cClassTrib, cCredPres, anexos da LC 214/2025, NFS-e, CFOP) e as Notas Técnicas da SEFAZ | `web/escritorio/motor/auditor/tabelas/` e a cópia no servidor | Portal Nacional da NF-e, Receita Federal, Planalto (dados públicos) |
| Normas e leis citadas nas regras (LC 214/2025, EC 132/2023, NT 2025.002-RTC, CPCs) | fundamentos das regras e roteiros | órgãos públicos emissores |

A **seleção, a organização, a forma de apresentar e o código** que lê, confere e mostra esses conteúdos são da GK;
o conteúdo oficial em si, não.

## Onde a autoria aparece

- `LICENSE` e este `AUTORIA.md`, com o bloco canônico acima.
- `web/autoria.js` (módulo único) e `web/autoria-classico.js` (a mesma coisa para os scripts clássicos do E-Commerce).
- Cabeçalho de direitos autorais no topo de cada arquivo-fonte escrito para o projeto
  (`node ops/autoria/cabecalho.mjs`); no site publicado, o mesmo aviso vai como comentário preservado em cada `.js` e
  `.css` compactado.
- Nos 5 aplicativos: o aviso no rodapé da barra lateral, as metas `author` e `copyright` e uma linha no console.
- No site: rodapé de todas as páginas, metas e os dados estruturados (`author`, `copyrightHolder`, `publisher`).
- No banco: comentário do esquema `public` e a função `public.jarvis_autoria()`
  (migração `supabase/migrations/20261105140000_autoria.sql`).
- No `package.json` (`author` e `license`).

## Onde a autoria é conferida

Cada ponto confere sozinho; tirar um deles não desliga os outros. Qualquer um que falhe barra os testes, a montagem
ou a publicação, sem tirar do ar a versão que os clientes já usam.

1. `testes/autoria.test.mjs` — roda no `npm test`, no CI (`.github/workflows/ci.yml`) e no Publicar, sobre o código e
   de novo sobre o `_site` montado (`JARVIS_WEB=_site`). Tem o resumo SHA-256 do bloco fixado nele mesmo.
2. `ops/autoria/conferir.mjs` — o conferidor (fonte e `_site`), com passo próprio no `ci.yml` e no `publicar.yml`.
3. `ops/montar-site.mjs` — recusa montar o `_site` se o bloco ou o módulo divergirem (confere o resumo por conta
   própria e também chama o conferidor).
4. `ops/publicar-site.sh` — roda o conferidor antes dos testes e de publicar.
5. `site/gerar.mjs` — não gera o site sem `web/autoria.js` com o titular.
6. Os aplicativos — o núcleo comum dos 4 apps em ES modules (`web/escritorio/comum/nucleo.js`) importa
   `web/autoria.js`, e o carregador dos testes do E-Commerce (`testes/ambiente.mjs`) exige `web/autoria-classico.js`:
   sem eles, nada abre no desenvolvimento e os testes caem.
7. `ops/autoria/cabecalho.mjs --conferir` — acusa arquivo-fonte sem o cabeçalho (usado pelo teste e pelo conferidor).

**Mudar o titular ou estes dados** só por decisão escrita da titular: muda-se o bloco, igual, em `LICENSE`,
`AUTORIA.md`, `web/autoria.js` e `web/autoria-classico.js`, e o resumo SHA-256 e a impressão digital fixados em cada
ponto de conferência acima, numa migração nova para o banco, tudo no mesmo commit.

## Separar um produto (por exemplo, o Jarvis E-Commerce)

A base nova leva, obrigatoriamente: `LICENSE`, `AUTORIA.md`, `web/autoria.js` (e `web/autoria-classico.js` no
E-Commerce), `ops/autoria/` (cabeçalho, conferidor e pacote do INPI), `testes/autoria.test.mjs` e a migração
`20261105140000_autoria.sql`, com os cabeçalhos dos arquivos intactos. A titular continua a mesma.

## Verificar

```sh
node ops/autoria/conferir.mjs              # fonte: bloco, módulo, apps, metas e cabeçalhos
node ops/autoria/conferir.mjs --site _site # também o site montado
node ops/autoria/cabecalho.mjs --conferir  # só os cabeçalhos (lista os que faltam)
node --test testes/autoria.test.mjs
```

O resumo do bloco pode ser refeito à mão: copie as 6 linhas entre os marcadores (sem os marcadores, separadas por uma
quebra de linha `\n`, sem quebra no fim) e calcule o SHA-256 (`sha256sum`, `Get-FileHash`); deve dar o valor acima.
No banco: `select public.jarvis_autoria();`.

Registro no INPI (programa de computador): [`docs/AUTORIA-INPI.md`](docs/AUTORIA-INPI.md).
