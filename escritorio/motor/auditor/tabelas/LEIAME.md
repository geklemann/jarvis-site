# Tabelas oficiais do Jarvis Reforma (antigo Jarvis Auditor)

Vieram das tabelas do CRIVO (`src/ConferenciaFiscal.Motor/Tabelas/`, repositório `conferencia-fiscal`, catálogo
`2026.10.30-12`), reduzidas por `node ops/auditor/gerar-tabelas.mjs <pasta Tabelas do CRIVO>`. Não edite à mão: troque o
arquivo no CRIVO (ou a fonte oficial) e gere de novo. `--conferir` diz se os arquivos daqui estão iguais ao que a pasta gera.

O que muda em relação ao CRIVO: sai o campo `original` (a linha inteira da planilha oficial). Das colunas dele ficam, em
`colunas`, só as que as regras consultam: os indicadores (`ind_*`, `indNFe`, `indNFSe`…) e, no cCredPres, os números
(`pAliqCredPresIBS`…). Ficam também só os campos que o motor lê e, desde 03/11/2026, o `anexo` do cClassTrib (coluna
`ANEXO`: número do anexo da LC 214/2025 ou código do anexo técnico, IT 2025.002 §02), que a tela "Tabelas da Reforma"
mostra. De 1,6 MB para uns 340 KB. `indice-mistura.json` não vem porque nenhuma regra o usa. A carga e as consultas estão
em `../tabelas.js`.

| Arquivo | Fonte (campo `fonte` de cada JSON) |
|---|---|
| `cclasstrib.json` | IT 2025.002 v1.71 (CST e cClassTrib do IBS/CBS), portal SVRS, publicada em 01/10/2026 (a data está como veio do CRIVO; ver o diário) |
| `ccredpres.json` | IT 2025.002 v1.70, aba cCredPres, portal SVRS, publicada em 01/10/2026 |
| `tabela-cfop.json` | IT 2023.002 v2.10 (CFOP com os indicadores da NF-e), Portal da NF-e, 04/09/2026 |
| `combustiveis-monofasicos.json` | IT 2023.003 v1.08 (combustíveis da tributação monofásica, ad rem do ICMS por período), 05/12/2025 |
| `aliquotas-cbs.json` | IT 2026.002 v1.00 (alíquota da CBS por ano; 2027 "aguarda legislação"), 12/05/2026 |
| `lc214-ncm.json` | LC 214/2025, Anexo I (cesta básica) e Anexo XVII / art. 409 (Imposto Seletivo), DOU 16/01/2025, conferido com as LC 227/2026 e 235/2026 |
| `lc214-anexos.json` | LC 214/2025, Anexos IV a XV, DOU 16/01/2025, conferido com a LC 227/2026 |
| `historico.json` | O histórico das versões de cClassTrib, CST, cCredPres (e do IS), com o que mudou campo a campo. Não é carregado pelo motor |
| `imposto-seletivo.json` | Só existe depois de importar uma planilha com as abas CSTIS e cClassTribIS. Formato provisório (código, descrição e as colunas da planilha); o motor não carrega |
| `nfse-anexo-viii.json` | Anexo VIII da NFS-e nacional v1.02.00 (26/10/2026). **Vazio**: a planilha oficial não está no repositório. Feito à mão, não pelo gerador; o formato está em `../tabelas.js › tabelaCorrelacaoNfse` (NFS-08 e NFS-09) |

## Atualizar cClassTrib, CST e cCredPres sem o CRIVO

Quando sair uma versão nova do IT 2025.002 (portal SVRS, Documentos), baixe a planilha à mão e exporte cada aba para CSV
(o repositório não tem leitor de xlsx). No Excel: aba › Arquivo › Salvar como › "CSV UTF-8 (separado por vírgulas)". No
LibreOffice: Salvar como › Texto CSV, UTF-8. O leitor aceita `;` ou `,`, vírgula decimal, `7,5%`, datas dd/mm/aaaa ou o
número serial do Excel e arquivos em Windows-1252.

```sh
node ops/reforma/atualizar-tabelas.mjs "IT 2025.002 v.1.72 - cClass.csv" "IT 2025.002 v.1.72 - CST.csv" "IT 2025.002 v.1.72 - cCredPres.csv"
# confira o que mudou (códigos novos, removidos e alterados, campo a campo) e grave:
node ops/reforma/atualizar-tabelas.mjs --gravar …os mesmos arquivos…
node ops/auditor/copiar-motor-servidor.mjs && TZ=America/Sao_Paulo npm test
```

A versão sai do nome do arquivo (`v.1.72`) ou de `--versao`; a publicação, da maior `DataAtualização` da aba de cClassTrib
ou de `--publicacao`. As linhas passam pelos mesmos redutores de `gerar-tabelas.mjs` (o formato não muda) e pelas
conferências do CRIVO (6 dígitos, prefixo = CST, CST existente, redução de 0 a 100, datas). Erro: nada é gravado.
Testado com as linhas da v1.71 do CRIVO exportadas em CSV: saída idêntica byte a byte. Teste: `aud_atualizar_tabelas`.
Mudou o cClassTrib: mude também a versão do catálogo do motor (`VERSAO_CATALOGO`, em `../apontamentos.js`, vem de `motor.js`) se as regras precisarem conferir as notas de novo.
