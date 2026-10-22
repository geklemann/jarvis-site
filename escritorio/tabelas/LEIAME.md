# Tabelas de referência fiscais e de calendário

Estes JSON alimentam três lugares:
- as tabelas `ctb_ref_*` do banco, pela migração `supabase/migrations/20261024100400_ctb_ref_carga.sql`, gerada por `node ops/tabelas/gerar-ref.mjs`;
- o campo de consulta (F2) de `comum/kit/fontes.js`, que lê o JSON quando a tabela do banco está vazia ou não existe;
- a demonstração (`?demo`), que não tem as tabelas `ctb_ref_*`.

Formato de cada arquivo: `{ tabela, fonte, capturado_em, conferido_em, total, itens: [...] }`, um item por linha. Gere de novo com o próprio script; não edite à mão. O teste `testes/ctb_v2_migracoes.test.mjs` confere o formato, os totais e se a migração está igual ao que os JSON geram.

**Data da conferência:** 19/10/2026. O proxy desta sessão bloqueia os sites `gov.br` (CONFAZ, Siscomex, IBGE, Planalto). Por isso as tabelas vieram de **capturas dos dados oficiais feitas por terceiros**: o pacote npm `@br-validators/core` 1.10.0-data.46, que guarda o endereço oficial e a data de cada captura. A conversão leu os dados como texto, sem executar o código do pacote.

| Arquivo | Itens | Fonte | Captura | Situação |
|---|---:|---|---|---|
| `cfop.json` | 695 | CONFAZ — Convênio s/nº de 1970 (SINIEF), Anexo II, CFOP vigente (`confaz.fazenda.gov.br/legislacao/ajustes/sinief/cfop_cvsn_70_vigente`) | 20/09/2026 | **Conferir.** 76 títulos de grupo vêm com `grupo: true` e não vão em documento. 6 códigos estão na lista antiga (github.com/jansenfelipe/cfop, 2015) mas não na captura de 2026: 1350, 5504, 5505, 6504, 6505 e 6929. Entram como **conferir**, com a nota "ausente na captura de 2026; conferir na fonte oficial". Pelo menos 5504/5505 (remessa para formação de lote de exportação) continuam vigentes, o que mostra que a captura de 2026 também pode estar incompleta. |
| `cst.json` | 114 | Tabela A (origem): Convênio s/nº de 1970, com o Ajuste SINIEF 20/2012 (códigos 0 a 8; **transcrita à mão**). Tabela B (CST do ICMS). CST do IPI, PIS e COFINS: tabelas externas do SPED (IN RFB 932/2009). CSOSN: Ajuste SINIEF 03/2010. | 24/06/2026 (CST), 27/06/2026 (CSOSN) | **Conferir a Tabela B.** A captura trazia só 00, 10, 20, 30, 40, 41, 50, 51, 60, 70 e 90. Os CST 02, 15, 53 e 61 (ICMS monofásico sobre combustíveis, LC 192/2022 e NT 2023.001 da NF-e) foram acrescentados à mão, marcados **conferir**. `tributo` vale `origem`, `icms`, `ipi`, `pis`, `cofins` ou `csosn`. Os códigos de IBS/CBS da reforma (cClassTrib) ainda não entraram. |
| `csosn.json` | 10 | CONFAZ, Ajuste SINIEF 03/2010 | 27/06/2026 | Completa. Os mesmos itens de `tributo: 'csosn'` do `cst.json`. |
| `lc116.json` | 200 | Lista anexa à LC 116/2003, com as LC 157/2016 e 183/2021 (`planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm`) | 25/06/2026 | Completa nos subitens, no formato `01.01` da NFS-e. Os títulos dos itens (01, 02…) e os subitens vetados ficam de fora. |
| `cnae.json` | 1.332 | IBGE/CONCLA — CNAE 2.3, subclasses (API `servicodados.ibge.gov.br/api/v2/cnae/subclasses`) | 20/09/2026 | Completa, de **fonte secundária**: todos os itens marcados **conferir**. Formato `0000-0/00`. |
| `municipios.json` | 5.571 | IBGE — API de localidades v1 (`/localidades/municipios`) | 20/09/2026 | Completa, de **fonte secundária**: marcada **conferir**. Já tem Boa Esperança do Norte/MT (5101837). |
| `ncm.json` | 11.734 | Códigos de 8 dígitos (10.515): Siscomex/Classif (`portalunico.siscomex.gov.br/classif/api/publico/nomenclatura/download/json`). Texto das posições de 4 dígitos (1.219) e do nível intermediário: github.com/jansenfelipe/ncm, sem data e anterior ao SH 2022. | 20/09/2026 | Os **códigos** são os vigentes. As **descrições** foram montadas de duas fontes secundárias (posição — nível de cima — item), então tudo está marcado **conferir**. 68 itens de posições novas do SH 2022 (por exemplo 0309 e 2404) ficaram só com o texto do próprio item. |
| `feriados.json` | 204 | `web/escritorio/motor/calendario.js` (Lei 662/1949 com a Lei 10.607/2002, Lei 6.802/1980, Lei 14.759/2023 e datas móveis pela Páscoa) | 19/10/2026 | Só os nacionais, de 2020 a 2035. Carnaval e Corpus Christi entram como "sem expediente bancário". Feriados estaduais e municipais o escritório acrescenta em `ctb_ref_feriados`. |

`ctb_ref_indices` (índices econômicos) começa vazia: não houve fonte oficial acessível. Carregue IPCA, IGP-M, INPC e Selic do BCB/SGS, do IBGE e da FGV por migração.

## Trocar pela fonte oficial
Baixe o arquivo oficial fora do repositório e converta:
```sh
node ops/tabelas/gerar-ref.mjs --importar ncm        nomenclatura.json   # Siscomex › Classif › download JSON
node ops/tabelas/gerar-ref.mjs --importar municipios municipios.json     # https://servicodados.ibge.gov.br/api/v1/localidades/municipios
node ops/tabelas/gerar-ref.mjs --importar cnae       subclasses.json     # https://servicodados.ibge.gov.br/api/v2/cnae/subclasses
```
Depois, atualize a fonte e a data nesta tabela e gere a carga numa **migração nova**, porque uma migração já aplicada não se edita:
```sh
node ops/tabelas/gerar-ref.mjs --saida supabase/migrations/<data>_ctb_ref_carga2.sql
```
O formato de cada arquivo oficial está descrito em `importar()` e foi testado com exemplos montados à mão. **Conferir no primeiro uso.**
