<!-- © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. -->
# Coletor Jarvis

O Coletor é um programa pequeno que fica **num computador da empresa** (o servidor da loja, o computador do fiscal) e
trabalha 24 horas, sem o navegador aberto. Ele tem dois modos, que podem ficar ligados juntos:

- **Busca na SEFAZ** (desde 26/11/2026): busca na SEFAZ as notas emitidas contra a empresa (NF-e e, se ligado, CT-e), com
  o **certificado A1 que fica só neste computador**, e manda o que chegou para o Jarvis (**Baixar notas da SEFAZ**), que
  grava e confere com as regras do Jarvis Reforma. Faz também a **manifestação do destinatário** (ciência, confirmação…),
  assinada aqui com o certificado.
- **Pasta** (Jarvis Reforma › Ligar uma pasta): olha a pasta dos XML e as subpastas e manda cada XML novo (ou o XML de
  dentro de um ZIP) para o Jarvis conferir.

```
SEFAZ ◀──certificado A1──▶ Coletor (este computador) ──HTTPS + token jvc_──▶ Jarvis (função reforma-coletor)
pasta dos XML ───────────▶ Coletor ────────────────────────────────────────▶ conferência do Jarvis Reforma
```

**Por que a busca na SEFAZ é pelo Coletor:** a SEFAZ só pede o certificado da empresa no meio da conexão (renegociação
TLS), e o servidor do Jarvis não consegue fazer isso ("Connection reset by peer"). O Node.js deste computador consegue.
A NFS-e nacional (ADN) continua sendo buscada pelo servidor do Jarvis.

## Instalar (Windows): um botão e um duplo clique (desde 26/11/2026)
1. **No Jarvis Reforma**, escolha a empresa e, em **Ligar uma pasta › Coletor Jarvis** (ou em Cadastros › Empresas e
   certificados › Captura da SEFAZ, ou na janela **Buscar na SEFAZ**), clique em **Baixar o Coletor Jarvis para
   Windows**. O Jarvis cria o coletor (se a empresa já tem um, pergunta se troca — o token antigo para de valer — ou se
   cria mais um) e baixa `Coletor Jarvis - <empresa>.zip`, **já configurado**: o endereço, o token `jvc_` (entregue só
   dentro do pacote, uma vez; o Jarvis guarda só o hash) e a empresa, com a busca na SEFAZ ligada.
2. **No computador da empresa que fica ligado**: botão direito no .zip › **Extrair tudo** e dois cliques em
   **Instalar Coletor Jarvis.cmd** (aberto de dentro do ZIP sem extrair, ele procura o pacote em Downloads e extrai
   sozinho). O instalador (`instalar.ps1`, sem editar nada):
   - copia o Coletor para `%LOCALAPPDATA%ColetorJarvis`;
   - usa o **Node.js** do computador (20 ou mais novo) ou baixa o **Node portátil oficial** (versão fixa
     `22.23.5`, conferida pelo SHA-256 publicado no `SHASUMS256.txt` de nodejs.org) para
     `%LOCALAPPDATA%ColetorJarvis
ode` — nada é instalado no Windows;
   - confere o token com o Jarvis e pega o CNPJ da empresa;
   - **o certificado A1**: procura no Windows (`Cert:CurrentUserMy`, com a chave privada e na validade) os do mesmo
     CNPJ-base da empresa (matriz e filiais; o do mesmo CNPJ primeiro). Um só, usa; vários, pergunta qual (menu numerado).
     Exporta para `certificado.pfx` na pasta do Coletor (só o seu usuário lê) com uma **senha aleatória gerada pelo
     instalador**, guardada cifrada pela DPAPI no `segredo-sefaz.json` (o mesmo do `--certificado`). Sem certificado
     instalado no Windows, ou com a chave marcada como não exportável: abre a janela para escolher o arquivo **.pfx** e
     pede a senha (não aparece na tela). O certificado e a senha **nunca vão para o Jarvis**;
   - pergunta (opcional) se o Coletor também vigia uma pasta de XML;
   - roda o diagnóstico e diz em linguagem simples: **"Tudo certo: o Coletor já está buscando as notas da EMPRESA"** (ou
     o que falta corrigir);
   - cria a tarefa **Coletor Jarvis** no Agendador (liga com o Windows e volta se cair) e já faz a primeira busca;
   - põe no menu Iniciar › Coletor Jarvis os atalhos **"Coletor Jarvis – ver situação"** (tarefa, diagnóstico e o fim do
     log) e **"Desinstalar Coletor Jarvis"** (tira a tarefa, os atalhos, os arquivos e o .pfx local; o certificado
     instalado no Windows continua como estava; revogue o coletor no Jarvis).
3. **Pronto**: em poucos minutos o coletor aparece como **Ligado** em Ligar uma pasta › Coletor Jarvis e as notas chegam
   em **Baixar notas da SEFAZ**.

> **Aviso do Windows (SmartScreen):** o instalador ainda **não tem assinatura digital de código**, então o Windows pode
> mostrar "O Windows protegeu o computador" ou "Não foi possível verificar o editor". Confira que o pacote veio do Jarvis
> e clique em **Mais informações › Executar assim mesmo** (ou **Executar**).

> Use um usuário do Windows que fique logado (ou o computador que fica ligado com o usuário de sempre): a tarefa roda com
> o usuário que instalou, que é o mesmo que abre o certificado cifrado.

Reinstalar (computador novo, token perdido) é sempre com um **pacote novo** (o token aparece uma vez só). No mesmo
computador e na mesma empresa, o certificado já guardado é mantido.

Teste do instalador sem mexer em nada: `powershell -ExecutionPolicy Bypass -File instalar.ps1 -Simular -Destino <pasta>
[-CertificadosSimulados <lista.json>] [-Escolha <n>]` (não baixa o Node, não exporta, não fala com o Jarvis, não cria
tarefa nem atalho; é o que `testes/coletor_instalador.test.mjs` roda).

## Instalação manual (Linux, Mac ou sem o instalador)
1. No Jarvis: em **Ligar uma pasta › Coletor Jarvis › Instalação manual**, clique em **Criar só o token**, dê um nome e
   baixe o **config.json** (o token aparece uma vez só). Em Empresas e certificados, "Onde buscar" deve estar em **Pelo
   Coletor Jarvis** (o padrão).
2. Copie a pasta **coletor-xml** (de um pacote baixado no Jarvis, a pasta `coletor`, ou com a equipe) para
   `C:Jarviscoletor-xml` e instale o **Node.js** 20 ou mais novo (nodejs.org, LTS).
3. Ponha o config.json na pasta; a SEFAZ ligada é `"sefaz": { "ligado": true }`; a pasta dos XML é opcional (no Windows,
   a barra duas vezes: `"pasta": "D:\Notas fiscais",`).
4. `node coletor.mjs --certificado` (o .pfx e a senha, guardados só aqui, cifrados pela DPAPI), `node coletor.mjs
   --diagnostico` (tudo `[ok]` é o sinal verde) e, no Windows, dois cliques em `instalar-windows.cmd` (a tarefa).

### config.json (exemplo)
```json
{
  "url": "https://SEU-PROJETO.supabase.co/functions/v1/reforma-coletor",
  "token": "jvc_…",
  "sefaz": { "ligado": true, "intervalo_min": 5, "max_consultas_hora": 20 },
  "pasta": "C:\\XML",
  "intervalo_min": 10,
  "computador": ""
}
```
| Campo | O que é |
|---|---|
| `url` | O endereço da função: `https://<projeto>.supabase.co/functions/v1/reforma-coletor` (já vem no config.json baixado) |
| `token` | O token do coletor (`jvc_…`), mostrado uma vez ao criar o coletor |
| `sefaz.ligado` | Liga a busca na SEFAZ neste computador |
| `sefaz.intervalo_min` | De quantos em quantos minutos o Coletor pergunta ao Jarvis se há busca a fazer (padrão 5). Quem decide a hora da busca é a empresa no Jarvis (a cada 1 hora, ou o "Buscar agora" da tela) e a espera da SEFAZ |
| `sefaz.max_consultas_hora` | No máximo quantas consultas à SEFAZ por hora, por serviço (padrão 20) |
| `sefaz.cadeia` | (raro) Um arquivo `.pem` com a cadeia pública do servidor da SEFAZ, se o diagnóstico disser que este computador não reconheceu o certificado do servidor |
| `sefaz.segredo` / `sefaz.estado` | Onde ficam o certificado cifrado e o estado da busca (padrão `./segredo-sefaz.json` e `./estado-sefaz.json`) |
| `pasta` | A pasta dos XML (as subpastas entram). Opcional se a SEFAZ estiver ligada |
| `intervalo_min` | De quantos em quantos minutos olhar a pasta (padrão 10; de 1 a 1440) |
| `computador` | O nome que aparece no Jarvis (vazio = o nome do computador) |
| `estado` | Onde o coletor anota o que já leu da pasta (padrão `./estado-coletor.json`; sem o conteúdo das notas) |

## Comandos
```sh
cd C:\Jarvis\coletor-xml
node coletor.mjs --certificado   # aponta o .pfx e a senha (guardados só aqui, cifrados)
node coletor.mjs --certificado --pfx=<arquivo> --senha-stdin [--cnpj=<CNPJ>]   # o mesmo, sem perguntas (o instalador)
node coletor.mjs --empresa       # a empresa e o CNPJ pelo Jarvis, numa linha JSON (o instalador)
node coletor.mjs --diagnostico   # testa token, certificado, conexão com a SEFAZ e uma consulta em homologação
node coletor.mjs --testar        # só confere o token e o endereço
node coletor.mjs --uma-vez       # uma volta (pasta e SEFAZ) e sai
node coletor.mjs                 # liga
powershell -ExecutionPolicy Bypass -File instalar-windows.ps1 -Remover   # tira a tarefa do Agendador
powershell -ExecutionPolicy Bypass -File instalar.ps1 -Situacao         # a situação (o atalho do menu Iniciar)
powershell -ExecutionPolicy Bypass -File instalar.ps1 -Desinstalar      # desinstala tudo (o atalho do menu Iniciar)
```
No Linux ou no Mac: `node coletor.mjs config.json` num serviço do systemd ou no `launchd` (a pasta com `/`). Fora do
Windows, o `segredo-sefaz.json` **não é cifrado**: fica só com a permissão do seu usuário (600).

## Como a busca na SEFAZ funciona
- A cada volta o Coletor pergunta ao Jarvis o que fazer: o CNPJ, a UF, o ambiente, o **NSU de onde parou** (guardado no
  Jarvis), a hora da próxima consulta permitida, as **manifestações na fila** e as notas que pedem o **XML completo**.
- Busca pela **Distribuição DF-e** (`distNSU`) a partir do último NSU, em lotes de até 50 documentos, enquanto houver
  fila (até 20 lotes por volta). Cada lote vai para o Jarvis **na hora** (o Jarvis lê cada XML, grava em Baixar notas da
  SEFAZ e confere os completos). O mesmo lote mandado duas vezes não entra duas vezes.
- **Regra da SEFAZ:** depois de "nenhum documento" (137), do fim da fila ou de "consumo indevido" (656), a próxima consulta
  só depois de **1 hora** — o Coletor espera sozinho. E no máximo 20 consultas por hora por serviço.
- **Manifestação do destinatário:** quando alguém manifesta uma nota no Jarvis, ela vai para a fila; o Coletor monta o
  evento, **assina aqui** com o certificado (XMLDSig) e manda para a SEFAZ; o retorno (registrado ou rejeitado) volta ao
  Jarvis. Se o Jarvis estiver fora do ar nessa hora, o retorno fica guardado e vai na próxima volta.
- **XML completo:** depois da ciência, o Coletor pede o XML completo pela chave (`consChNFe`).
- O certificado antigo cifrado com RC2 abre sozinho (o Coletor se religa com `--openssl-legacy-provider`).

## Como saber se está funcionando
- No Jarvis, em **Cadastros › Empresas e certificados**, a empresa mostra **"Busca pelo Coletor Jarvis neste computador:
  última busca dd/mm hh:mm"** (e o último retorno da SEFAZ). Em **Ligar uma pasta › Coletor Jarvis**, o coletor aparece como
  **Ligado**, com o último contato.
- No computador, o `coletor.log` tem uma linha por volta, por exemplo
  `SEFAZ: NF-e: 12 documento(s) em 1 lote(s), cStat 138 Documento localizado.` ou
  `SEFAZ: NF-e: esperando a SEFAZ até 15:42.` O log nunca tem o conteúdo das notas nem a senha.
- **Sem contato** no Jarvis quer dizer que o Coletor não fala com o Jarvis há mais de 30 minutos: confira se o computador
  está ligado e com internet, e veja o `coletor.log`.

### Problemas comuns
| O que aparece | O que fazer |
|---|---|
| `Senha do certificado errada.` | Rode `node coletor.mjs --certificado` de novo |
| `O certificado venceu em …` | Instale o certificado novo e rode `--certificado` |
| `O certificado é de …, e a empresa no Jarvis é …` | Aponte o .pfx da empresa certa (o mesmo CNPJ-base) |
| `A SEFAZ fechou a conexão` | Confira se é o e-CNPJ A1 da empresa (não o e-CPF) e se está na validade |
| `Este computador não reconheceu o certificado do servidor da SEFAZ` | Atualize o Windows e o Node.js; se continuar, ponha a cadeia em `sefaz.cadeia` |
| `esperando a SEFAZ até …` | Normal: a SEFAZ pede 1 hora entre as consultas sem documento novo |
| `Token do coletor inválido ou revogado` | Crie outro coletor no Jarvis e troque o token no config.json |

## O que ele faz com cada arquivo da pasta
- Lê só `.xml` e `.zip` (o ZIP é aberto aqui mesmo, inclusive ZIP dentro de ZIP); pula os ocultos, os temporários do
  Office (`~$…`) e os downloads pela metade (`.crdownload`, `.part`, `.tmp`).
- Sabe o que mudou pelo tamanho e pela data do arquivo; de cada XML, guarda só o **hash** (SHA-256) e pergunta ao Jarvis
  se ele já tem aquele arquivo antes de mandar (reinstalar o coletor não manda tudo de novo).
- Manda em lotes de até 50 arquivos e 5 MB. Sem internet, guarda como "pendente" e tenta de novo (30 s, 1 min, 2 min…
  até 30 min). Com o token revogado, para e avisa no log.
- No Jarvis: a nota emitida ou recebida pela empresa (pelo CNPJ do cadastro) é conferida e o XML fica guardado no Jarvis
  (para "Analisar de novo" quando as regras mudarem); a mesma nota em dois arquivos entra uma vez; a nota de **outra
  empresa** (a pasta misturada) não entra; o evento da nota fica registrado, mas é conferido em **Eventos da nota**.

## Segurança
- O certificado A1 e a senha **nunca saem deste computador** pelo Coletor: no Windows ficam cifrados com a DPAPI do
  usuário; o Jarvis recebe só os documentos que a SEFAZ entregou e o resultado das manifestações.
- O token vale só para **uma empresa**: manda os XML e os lotes da SEFAZ e lê só o que a busca precisa (NSU, fila de
  manifestações). Guarde o `config.json` só neste computador.
- Perdeu ou trocou o computador? **Revogue** o coletor no Jarvis: o token para de valer na hora.
- O coletor age em nome de quem o criou: se essa pessoa sair da empresa no Jarvis, o coletor para (crie outro).
- Nada do conteúdo das notas, nem a senha, vai para o log.

## Para a equipe Jarvis
- A parte pura da Distribuição DF-e (`lib/sefaz_dfe.mjs`) é uma **cópia** de `supabase/functions/_shared/sefaz_dfe.js`
  (o mesmo código da função captura-nfe). Mudou lá: `node ops/coletor-xml/copiar-sefaz.mjs` (o teste acusa a diferença).
- **O pacote baixado no Jarvis Reforma**: o site publica em `/coletor/` a lista FECHADA de `pacote.mjs` (sem config.json,
  segredo, estado, .pfx ou log) e o `manifesto.json` com o SHA-256 de cada arquivo (`site/gerar.mjs`); a tela
  (`web/escritorio/modulos/auditor/coletor_baixar.js`, parte pura em `coletor_pacote.js`) baixa, confere o SHA-256, cria o
  token, monta o ZIP no navegador com o config.json e confere que nada sensível além do token foi junto. Arquivo novo em
  `lib/` entra sozinho; arquivo novo na raiz, ponha na lista de `pacote.mjs`. O `.cmd` só com ASCII; o `.ps1` com BOM (o
  PowerShell 5.1); o pacote converte os dois para CRLF.
- Testes na raiz do Jarvis, sem rede e sem certificado real: `testes/coletor_instalador.test.mjs` (o pacote, a tela, o
  `--certificado` sem perguntas e o `instalar.ps1 -Simular` no PowerShell), `testes/aud_coletor_programa.test.mjs` (pasta),
  `testes/coletor_sefaz.test.mjs` (SEFAZ: montar e ler, o certificado de teste, a DPAPI, a **renegociação TLS** contra um
  servidor local que imita o IIS, a volta inteira com o Jarvis e a SEFAZ de mentira, o diagnóstico) e
  `testes/coletor_sefaz_sql.test.mjs` (o servidor no PGlite).
