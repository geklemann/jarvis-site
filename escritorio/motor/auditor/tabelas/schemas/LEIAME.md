# Esquemas XML (XSD) da NF-e e da NFC-e — camada "Leiaute"

Pasta **vazia de propósito** (02/11/2026): os XSD do pacote de liberação da NT 2025.002-RTC (PL_010*) ainda não estão no
Jarvis. A rede deste ambiente não abre o Portal da NF-e, e esquema de pacote de terceiros não entra sem conferência.

Quando baixar do Portal da NF-e (Documentos › Esquemas XML):

1. ponha aqui os `.xsd` do pacote, sem mudar nada;
2. crie `indice.json`:
   ```json
   { "pacote": "PL_010…", "principal": "nfe_v4.00.xsd", "arquivos": ["nfe_v4.00.xsd", "…"], "fonte": "<url>", "obtidoEm": "AAAA-MM-DD" }
   ```
3. no Node, ligue o validador (`ops/auditor/validador-xmllint.mjs`); no navegador ainda não há validador de XSD.

Quem lê: `../../leiaute.js` (`conferirLeiaute`). Sem `indice.json`, a camada responde `sem_esquemas` e a conferência das
regras segue normalmente. Os `.xsd` não vão para a cópia do servidor (`ops/auditor/copiar-motor-servidor.mjs` só copia
`.js` e `.json`): se o servidor for validar o schema, acrescente a extensão lá.
