# Jarvis Normas — o motor

Entrada: `index.js`. Tudo puro (sem DOM), igual no navegador e no Node. Testes: `testes/nor_*.test.mjs`.

| Arquivo | O quê |
|---|---|
| `catalogo.js` | Catálogo das normas: os documentos da página oficial do CPC (`catalogo_oficial.js`, gerado por `ops/normas/catalogo-oficial.mjs`) com a IFRS correlata do texto oficial (`acervo/indice.js`), as NBC das listas oficiais do CFC (`catalogo_cfc.js`, `ops/normas/catalogo-cfc.mjs`) e os resumos próprios. |
| `acervo.js` | Os textos oficiais importados (`acervo/<norma>.json`), lidos sob demanda: `item('CPC 47', '31')`, `versaoDe()`, `todos()`. |
| `roteiros.js` | Formato dos roteiros (`roteiros/<id>.js`), `validarRoteiro()` (o exemplo precisa fechar: débitos = créditos), `calcularExemplo()`. |
| `revisao.js` | O selo "Revisado por contador": SHA-256 do conteúdo em JSON canônico; `situacaoDoSelo()`, `filaDeRevisao()`, `aplicarRevisao()` (usado só por `ops/normas/revisar.mjs`). |
| `busca.js` + `sinonimos.js` | Busca determinística: sem acento, sinônimos editáveis, relevância, trecho destacado, "CPC 47 item 31". |
| `ifrs.js` | Correlação CPC × IFRS e o resumo próprio da IFRS 18 (sem texto da IFRS Foundation). |
| `assistente.js` | O assistente com IA, só preparado e desligado: a regra da resposta e o formato do pedido. |

Regras: toda orientação cita o fundamento (norma e item); nada aparece como validado sem o selo; o texto das IFRS não
entra (só a correlação, resumos próprios e o link oficial); dados de exemplo são fictícios.
