# Tabelas oficiais do Jarvis Auditor

Vêm das tabelas do CRIVO (`src/ConferenciaFiscal.Motor/Tabelas/`, repositório `conferencia-fiscal`, catálogo
`2026.10.30-12`), reduzidas por `node ops/auditor/gerar-tabelas.mjs <pasta Tabelas do CRIVO>`. Não edite à mão: troque o
arquivo no CRIVO (ou a fonte oficial) e gere de novo. `--conferir` diz se os arquivos daqui estão iguais ao que a pasta gera.

O que muda em relação ao CRIVO: sai o campo `original` (a linha inteira da planilha oficial). Das colunas dele ficam, em
`colunas`, só as que as regras consultam: os indicadores (`ind_*`, `indNFe`, `indNFSe`…) e, no cCredPres, os números
(`pAliqCredPresIBS`…). Ficam também só os campos que o motor lê. De 1,6 MB para uns 340 KB. `indice-mistura.json` não vem
porque o motor não o usa. A carga e as consultas estão em `../tabelas.js`.

| Arquivo | Fonte (campo `fonte` de cada JSON) |
|---|---|
| `cclasstrib.json` | IT 2025.002 v1.71 (CST e cClassTrib do IBS/CBS), portal SVRS, publicada em 01/10/2026 |
| `ccredpres.json` | IT 2025.002 v1.70, aba cCredPres, portal SVRS, publicada em 01/10/2026 |
| `tabela-cfop.json` | IT 2023.002 v2.10 (CFOP com os indicadores da NF-e), Portal da NF-e, 04/09/2026 |
| `combustiveis-monofasicos.json` | IT 2023.003 v1.08 (combustíveis da tributação monofásica, ad rem do ICMS por período), 05/12/2025 |
| `aliquotas-cbs.json` | IT 2026.002 v1.00 (alíquota da CBS por ano; 2027 "aguarda legislação"), 12/05/2026 |
| `lc214-ncm.json` | LC 214/2025, Anexo I (cesta básica) e Anexo XVII / art. 409 (Imposto Seletivo), DOU 16/01/2025, conferido com as LC 227/2026 e 235/2026 |
| `lc214-anexos.json` | LC 214/2025, Anexos IV a XV, DOU 16/01/2025, conferido com a LC 227/2026 |
