# Jarvis Auditor — o motor

Um auditor só, com duas visões. A entrada é `index.js`.

| Visão | Arquivo | O que confere | Achado |
|---|---|---|---|
| Por documento | `motor.js` + `regras/` | As 177 regras do CRIVO convertidas do C# (`testes/aud_*.test.mjs`, iguais ao gabarito) e as do Jarvis Reforma, sobre o XML de cada NF-e, CT-e e NFS-e, os eventos da Reforma e o cruzamento entre notas guardadas (CRZ-*) | `{ regra: 'CLA-01', gravidade: 0 \| 1 \| 2, mensagem, item, esperado, informado, diferenca }` |
| Da competência | `competencia.js` (antigo `motor/auditor_fiscal.js`) | Cruzamentos da escrituração do mês: documentos escriturados (`ctb_documentos`), XMLs guardados, pessoas, acumuladores, apurações gravadas × recálculo, retenções sem guia (`testes/fapur_motor.test.mjs`) | `{ id, regra: 'cfop', nivel: 'erro' \| 'aviso', titulo, texto, docId, numero, participante, valor }` |

```js
import { criarMotor, auditarCompetencia } from './motor/auditor/index.js';
const motor = await criarMotor();          // carrega as tabelas oficiais (tabelas/) e monta o catálogo
motor.conferirNfe(xml);                    // { nota, achados, piorGravidade, erros, alertas }
auditarCompetencia({ competencia: '2026-09', empresa, documentos, xmls, pessoas, apuracoes, recalculo });
```

Desde 02/11/2026 (Jarvis Reforma): o leitor aceita a NFC-e (modelo 65) e o motor roda em cada nota só as regras do modelo dela
(`regra.modelos`); as regras ligadas à NT 2025.002-RTC trazem vigência, rejeição e natureza (`regras/vigencias.js`,
`situacaoRejeicao()` em `conferencia.js`); `leiaute.js` é a camada do schema (XSD em `tabelas/schemas/`, ainda sem os arquivos).
As regras que não vieram do CRIVO (`REGRAS_JARVIS` em `motor.js`) estão em `regras/nfce.js` e `regras/nt_jarvis.js`.

Desde 03/11/2026 (PR 3): os eventos da Reforma na NF-e têm leitor próprio (`eventos.js`) e regras EVT-01 a EVT-09 (`regras/eventos.js`,
documento `evento`, `motor.conferirEvento(xml, { nota, eventos })`); o CT-e OS (modelo 67) entra no leitor do CT-e, com `regra.modelos`
também no CT-e; a NFS-e lê os campos da NT 009; `tabelas/nfse-anexo-viii.json` (Anexo VIII) vai vazio até a planilha ser convertida.

`motor/auditor_fiscal.js` só reexporta `competencia.js` (`auditar`, `REGRAS`, `NCM_MONOFASICO`), para a tela
`modulos/fiscal/telas/apur_auditor.js` e os testes que ainda importam de lá.

## Onde as duas visões se sobrepõem (decidir depois)

Por ora **nada mudou nos resultados**: cada visão continua achando o que achava. As linhas abaixo são o que as duas
conferem em comum, para decidir depois se a competência passa a usar a regra do CRIVO, se as duas ficam (uma sobre o XML,
outra sobre o escriturado) ou se uma das telas esconde o achado repetido.

| Regra da competência | Regras do CRIVO | Diferença hoje |
|---|---|---|
| `cfop` (CFOP × operação e UF, por `doc_fiscal.conferirCfop`) | CLA-03 (entrada/saída), CLA-04 (destino), CLA-05 (idDest × UFs), CLA-11 (CFOP na tabela oficial e válido na NF-e); CT-e: CTE-14, CTE-33 | A competência usa a UF do cadastro do participante quando o documento não traz; o CRIVO usa a do XML e a tabela IT 2023.002 (vigência e indNFe), que a competência não consulta. Gravidade igual (erro). |
| `cfop_cst` (CFOP × CST/CSOSN, por `doc_fiscal.conferirCfopCst`) | CLA-08 (CFOP de ST × CST), ICM-04 (CST × valor destacado), CLA-06 (CST × regime); CT-e: CTE-13 | A competência dá erro; CLA-08 é alerta. |
| `ncm` (ausente, sem 8 dígitos, fora da tabela NCM vigente) | CLA-01 (formato), CRZ-01 (mesmo produto com NCM diferente), RTC-28 (NCM do anexo do cClassTrib) | Só a competência confere se o NCM existe (`web/escritorio/tabelas/ncm.json`); CLA-01 confere só o formato. Competência: aviso; CLA-01: erro. Frete (CT-e, CFOP x35x) fica fora nas duas. |
| `aliquota` interestadual (fora de 4/7/12% e a esperada pela origem e UFs) | ICM-01 (Resoluções do Senado 22/1989 e 13/2012); CT-e: CTE-04, CTE-05, CTE-25 | Mesma base legal. Competência: erro fora de 4/7/12, aviso na diferente da esperada; ICM-01: erro. |
| `aliquota` interna (diferente da modal da UF, `livros_fiscais.ALIQ_INTERNA`) | — | Só na competência. |
| `simples_credito` (Simples emitindo com CST do regime normal) | CLA-06 | Mesma regra; CLA-06 olha o CRT do XML, a competência olha o regime da empresa no cadastro. |
| `simples_credito` (crédito de nota de fornecedor do Simples sem permissão; acumulador de entrada com crédito) | CAL-09 (crédito do Simples informado e calculado) | CAL-09 confere a nota do fornecedor; a competência confere o crédito escriturado e o acumulador (só ela). |
| `monofasico` (NCM típico sem CST 04 nem marca) | PIS-03 (CST sem contribuição com valor) | Direções opostas: PIS-03 acusa CST 04 com valor; a competência acusa NCM monofásico sem CST 04 (lista resumida, `NCM_MONOFASICO`). ICM-06 e RTC-15 são do ICMS e do IBS/CBS monofásicos, outro assunto. |
| `st_mva` (base da ST sem MVA; CST de ST sem valor retido) | CAL-03 (ICMS-ST recalculado), ICM-04 (CST × valor), CLA-08 | O CRIVO recalcula a ST; a competência só vê se a base passa do valor do item. |
| `difal` (venda a não contribuinte de outra UF sem DIFAL) | ICM-02 | Mesma base legal (EC 87/2015, LC 190/2022). ICM-02 recalcula e tem erro e alerta; a competência só vê se há DIFAL destacado. |
| `difal` (entradas de uso e consumo/ativo sem DIFAL na apuração gravada) | — | Só na competência. |
| `cancelada` (cancelada escriturada como normal ou contabilizada) | AUT-03 (protocolo de autorização), CRZ-04 (referência a nota cancelada) | Não é a mesma conferência: o CRIVO olha a situação na SEFAZ; a competência olha a escrituração. Ficam as duas. |
| `divergencia` (apuração gravada × escrituração atual) e `retencao_sem_guia` | — | Só na competência. |

Outros pontos para a decisão:

- **Gravidade.** A competência usa `erro`/`aviso`; o CRIVO usa 0 informativo, 1 alerta e 2 erro. Se juntar as telas, a
  correspondência natural é aviso = alerta (1) e erro = erro (2).
- **IBS/CBS.** A competência não confere IBS/CBS. Quem confere é a apuração `motor/reforma.js` (`apurarIbsCbs`: destacado ×
  calculado por documento), que se sobrepõe a RTC-03 (base × alíquota), RTC-07 (alíquota efetiva na redução) e RTC-11
  (percentual de redução do cClassTrib). Desde a etapa 2a as duas usam a mesma tabela oficial de cClassTrib
  (`tabelas/cclasstrib.json`, IT 2025.002 v1.71) para a redução, por isso não divergem mais nesse ponto.
- **Entrada.** O CRIVO precisa do XML (ou da nota lida por `lerNfe`); a competência lê as linhas do banco. Unificar as
  regras exige primeiro decidir de onde vem o item (XML guardado em `fis_xml` ou o escriturado).
