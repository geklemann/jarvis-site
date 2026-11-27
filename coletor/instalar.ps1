# © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
# Coletor Jarvis › o instalador de UM duplo clique (pedido do dono em 26/11/2026: "na instalação ele já ficar preparado
# para uso, sem o usuário ter que fazer um monte de passos"). Vem no pacote que o Jarvis Reforma monta no navegador (o
# config.json com o token e a empresa já dentro) e é chamado pelo "Instalar Coletor Jarvis.cmd". Sem editar nada:
#   1. copia o Coletor para %LOCALAPPDATA%\ColetorJarvis;
#   2. usa o Node.js instalado (20 ou mais novo) ou baixa o Node portátil oficial (versão fixa, conferida pelo SHA-256
#      publicado no SHASUMS256.txt de nodejs.org) para %LOCALAPPDATA%\ColetorJarvis\node — nada é instalado no Windows;
#   3. confere o token com o Jarvis e pega o CNPJ da empresa;
#   4. o certificado A1: procura no Windows (Cert:\CurrentUser\My, com a chave privada, na validade) os do mesmo CNPJ-base
#      da empresa; um só, usa; vários, pergunta qual; exporta para um .pfx local (só este usuário lê) com uma senha
#      aleatória que o próprio instalador gera e que fica cifrada pela DPAPI do Windows (o mesmo segredo-sefaz.json do
#      "node coletor.mjs --certificado"). Sem certificado instalado (ou sem poder exportar): a janela para escolher o .pfx
#      e a senha digitada aqui (Read-Host -AsSecureString). Nada disso vai para o Jarvis;
#   5. roda o diagnóstico e diz em linguagem simples se está tudo certo;
#   6. cria a tarefa "Coletor Jarvis" no Agendador (liga com o Windows e volta se cair) e já faz a primeira busca;
#   7. os atalhos no menu Iniciar: "Coletor Jarvis – ver situação" e "Desinstalar Coletor Jarvis".
# O script não tem assinatura digital de código: o Windows pode mostrar o aviso do SmartScreen (README.md).
# Uso:  powershell -ExecutionPolicy Bypass -File instalar.ps1               instala (o .cmd chama assim)
#       powershell -ExecutionPolicy Bypass -File instalar.ps1 -Situacao     a situação (tarefa, diagnóstico, log)
#       powershell -ExecutionPolicy Bypass -File instalar.ps1 -Desinstalar  remove a tarefa, os atalhos, os arquivos e o .pfx local
#       ... -Simular [-Destino <pasta>] [-CertificadosSimulados <json>] [-Escolha <n>]   teste: não baixa nada, não exporta,
#           não cria tarefa nem atalho, não fala com o Jarvis (testes/coletor_instalador.test.mjs)
[CmdletBinding()]
param(
  [switch]$Desinstalar,
  [switch]$Situacao,
  [switch]$Simular,
  [string]$Destino = '',
  [string]$CertificadosSimulados = '',
  [int]$Escolha = -1,
  [switch]$SemPasta,
  [switch]$SemPausa
)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
try { [Console]::OutputEncoding = New-Object System.Text.UTF8Encoding $false } catch { }
$OutputEncoding = New-Object System.Text.UTF8Encoding $false   # o que o PowerShell manda para o node pela entrada
if (-not $Destino) { $Destino = Join-Path $env:LOCALAPPDATA 'ColetorJarvis' }
$Destino = [IO.Path]::GetFullPath($Destino)
$origem = Split-Path -Parent $MyInvocation.MyCommand.Path
$tarefa = 'Coletor Jarvis'
$menu = Join-Path ([Environment]::GetFolderPath('Programs')) 'Coletor Jarvis'
# Node.js portátil: versão LTS fixa; os SHA-256 copiados de https://nodejs.org/dist/v22.23.5/SHASUMS256.txt.
$NODE_VERSAO = '22.23.5'
$NODE_SHA256 = @{
  'x64'   = '4a191082e9706866830379d577d2cc8a50c776fcd9436a8d061b063ed0d9a0e3'
  'arm64' = 'c1856817f611738c77534efbff8a5a17990593eab24046bc8d2c23a77a160d13'
}
$script:node = $null

function Escrever([string]$Texto, [string]$Cor = 'Gray') { Write-Host $Texto -ForegroundColor $Cor }
function Passo([string]$Texto) { Write-Host ''; Write-Host $Texto -ForegroundColor Cyan }
function Simulado([string]$Texto) { Write-Host "SIMULAR: $Texto" }
function Pausar { if (-not $SemPausa -and -not $Simular) { Write-Host ''; [void](Read-Host 'Aperte Enter para fechar') } }

# ───────────────────────── partes puras (testadas com -Simular) ─────────────────────────
<# O CNPJ do titular no assunto do certificado ICP-Brasil (o CN "RAZÃO SOCIAL:CNPJ"), ou $null. #>
function Get-CnpjDoCertificado([string]$Assunto) {
  if ($Assunto -match '(?:^|,\s*)CN=(?:"([^"]+)"|([^,]+))') {
    $cn = if ($Matches[1]) { $Matches[1] } else { $Matches[2] }
    if ($cn -match ':(\d{14})\s*$') { return $Matches[1] }
  }
  return $null
}
<# O nome do titular (o CN sem o CNPJ). #>
function Get-NomeDoCertificado($Cert) {
  if ("$($Cert.Subject)" -match '(?:^|,\s*)CN=(?:"([^"]+)"|([^,]+))') { $cn = if ($Matches[1]) { $Matches[1] } else { $Matches[2] }; return ($cn -replace ':\d{11,14}\s*$', '').Trim() }
  return "$($Cert.Subject)"
}
<# Os certificados da empresa: com a chave privada, na validade e do mesmo CNPJ-base (8 dígitos: matriz e filiais); o do
   mesmo CNPJ primeiro e, entre iguais, o que vence por último. #>
function Select-CertificadosDaEmpresa($Certificados, [string]$Cnpj, [datetime]$Agora = (Get-Date)) {
  $c = $Cnpj -replace '\D', ''
  if ($c.Length -ne 14) { return @() }
  $base = $c.Substring(0, 8)
  return @($Certificados | Where-Object {
      $doc = "$(Get-CnpjDoCertificado "$($_.Subject)")"
      $_.HasPrivateKey -and $_.NotAfter -gt $Agora -and ($null -eq $_.NotBefore -or $_.NotBefore -le $Agora) -and $doc.Length -eq 14 -and $doc.StartsWith($base)
    } | Sort-Object @{ Expression = { if ("$(Get-CnpjDoCertificado "$($_.Subject)")" -eq $c) { 0 } else { 1 } } }, @{ Expression = 'NotAfter'; Descending = $true })
}
<# Uma senha aleatória para o .pfx local (24 bytes do gerador criptográfico do Windows). #>
function New-SenhaAleatoria {
  $b = New-Object byte[] 24
  $g = [Security.Cryptography.RandomNumberGenerator]::Create(); $g.GetBytes($b); $g.Dispose()
  return [Convert]::ToBase64String($b)
}

# ───────────────────────── Node.js ─────────────────────────
function Invoke-Node([string[]]$Argumentos, $Entrada = $null) {
  $eap = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
  try {
    if ($null -ne $Entrada) { $saida = $Entrada | & $script:node @Argumentos 2>&1 } else { $saida = & $script:node @Argumentos 2>&1 }
    $codigo = $LASTEXITCODE
  } finally { $ErrorActionPreference = $eap }
  return [pscustomobject]@{ Codigo = $codigo; Linhas = @($saida | ForEach-Object { "$_" }) }
}
function Get-NodeUsavel {
  $local = Join-Path $Destino 'node\node.exe'
  if (Test-Path -LiteralPath $local) { return $local }
  $c = Get-Command node -ErrorAction SilentlyContinue
  if ($c) {
    try { $v = (& $c.Source -v) -replace '^v', ''; if ([int]($v.Split('.')[0]) -ge 20) { return $c.Source } } catch { }
  }
  return $null
}
function Install-NodePortatil {
  if (-not [Environment]::Is64BitOperatingSystem) { throw 'Este Windows é de 32 bits: o Coletor precisa de um Windows de 64 bits.' }
  $arq = if ($env:PROCESSOR_ARCHITECTURE -eq 'ARM64' -or $env:PROCESSOR_ARCHITEW6432 -eq 'ARM64') { 'arm64' } else { 'x64' }
  $nome = "node-v$NODE_VERSAO-win-$arq"
  $url = "https://nodejs.org/dist/v$NODE_VERSAO/$nome.zip"
  if ($Simular) { Simulado "baixaria o Node.js $NODE_VERSAO ($arq) de $url e conferiria o SHA-256 $($NODE_SHA256[$arq])"; return $null }
  Escrever "Baixando o Node.js $NODE_VERSAO (o motor do Coletor, uns 30 MB) de nodejs.org..."
  [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
  $zip = Join-Path $env:TEMP "$nome-$PID.zip"
  Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing
  $h = (Get-FileHash -LiteralPath $zip -Algorithm SHA256).Hash.ToLowerInvariant()
  if ($h -ne $NODE_SHA256[$arq]) { Remove-Item -LiteralPath $zip -Force; throw 'O Node.js baixado não confere com o publicado em nodejs.org (SHA-256 diferente). Nada foi instalado: tente de novo mais tarde.' }
  $tmp = Join-Path $Destino '_node'
  Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [IO.Compression.ZipFile]::ExtractToDirectory($zip, $tmp)
  $dest = Join-Path $Destino 'node'
  Remove-Item -LiteralPath $dest -Recurse -Force -ErrorAction SilentlyContinue
  Move-Item -LiteralPath (Join-Path $tmp $nome) -Destination $dest
  Remove-Item -LiteralPath $zip, $tmp -Recurse -Force -ErrorAction SilentlyContinue
  return (Join-Path $dest 'node.exe')
}

# ───────────────────────── arquivos ─────────────────────────
function Set-SoEsteUsuario([string]$Arquivo) {
  & icacls.exe $Arquivo /inheritance:r /grant:r "$($env:USERNAME):(F)" /grant:r '*S-1-5-18:(F)' | Out-Null
}
function Copy-Coletor {
  New-Item -ItemType Directory -Force -Path $Destino | Out-Null
  if ([IO.Path]::GetFullPath($origem).TrimEnd('\') -ieq $Destino.TrimEnd('\')) { return }
  foreach ($i in Get-ChildItem -LiteralPath $origem -Recurse -File) {
    $rel = $i.FullName.Substring($origem.Length).TrimStart('\')
    $para = Join-Path $Destino $rel
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $para) | Out-Null
    Copy-Item -LiteralPath $i.FullName -Destination $para -Force
  }
  Get-ChildItem -LiteralPath $Destino -Recurse -File | Unblock-File -ErrorAction SilentlyContinue
}
function Read-Config([string]$Arquivo) { return (Get-Content -LiteralPath $Arquivo -Raw -Encoding UTF8 | ConvertFrom-Json) }
function Write-Config($Cfg, [string]$Arquivo) {
  # sem BOM: o JSON.parse do Node não aceita o BOM
  [IO.File]::WriteAllText($Arquivo, ($Cfg | ConvertTo-Json -Depth 6), (New-Object System.Text.UTF8Encoding $false))
}

# ───────────────────────── certificado ─────────────────────────
function Get-CertificadosDoWindows {
  if ($CertificadosSimulados) {
    # o PowerShell 5.1 solta a lista do ConvertFrom-Json como um objeto só: o foreach abre
    $j = Get-Content -LiteralPath $CertificadosSimulados -Raw -Encoding UTF8 | ConvertFrom-Json
    return @(foreach ($x in $j) {
        [pscustomobject]@{ Subject = "$($x.Subject)"; Thumbprint = "$($x.Thumbprint)"; NotAfter = [datetime]$x.NotAfter; NotBefore = $(if ($x.NotBefore) { [datetime]$x.NotBefore } else { $null }); HasPrivateKey = [bool]$x.HasPrivateKey }
      })
  }
  return @(Get-ChildItem -Path Cert:\CurrentUser\My -ErrorAction SilentlyContinue)
}
function Select-Certificado($Lista) {
  if ($Lista.Count -eq 1) { return $Lista[0] }
  Escrever 'Achei mais de um certificado desta empresa neste computador:'
  for ($i = 0; $i -lt $Lista.Count; $i++) { Escrever ('  {0}. {1} (CNPJ {2}, vence em {3:dd/MM/yyyy})' -f ($i + 1), (Get-NomeDoCertificado $Lista[$i]), (Get-CnpjDoCertificado "$($Lista[$i].Subject)"), $Lista[$i].NotAfter) 'White' }
  Escrever '  0. Nenhum destes (escolher o arquivo .pfx)' 'White'
  for ($t = 0; $t -lt 5; $t++) {
    $r = if ($Escolha -ge 0) { "$Escolha" } elseif ($Simular) { '1' } else { Read-Host 'Digite o número do certificado e aperte Enter' }
    $n = 0
    if ([int]::TryParse("$r".Trim(), [ref]$n) -and $n -ge 0 -and $n -le $Lista.Count) { if ($n -eq 0) { return $null } else { return $Lista[$n - 1] } }
    if ($Escolha -ge 0) { throw "Escolha $Escolha fora da lista." }
    Escrever "Digite um número de 0 a $($Lista.Count)." 'Yellow'
  }
  throw 'Nenhum certificado escolhido.'
}
function Export-CertificadoLocal($Cert, [string]$Arquivo) {
  $senha = New-SenhaAleatoria
  $seg = ConvertTo-SecureString $senha -AsPlainText -Force
  try { Export-PfxCertificate -Cert $Cert -FilePath $Arquivo -Password $seg -CryptoAlgorithmOption AES256_SHA256 -Force | Out-Null }
  catch [System.Management.Automation.ParameterBindingException] { Export-PfxCertificate -Cert $Cert -FilePath $Arquivo -Password $seg -Force | Out-Null }
  Set-SoEsteUsuario $Arquivo
  return $senha
}
function Select-ArquivoPfx {
  try {
    Add-Type -AssemblyName System.Windows.Forms
    $d = New-Object System.Windows.Forms.OpenFileDialog
    $d.Title = 'Escolha o certificado A1 da empresa (.pfx ou .p12)'
    $d.Filter = 'Certificado A1 (*.pfx;*.p12)|*.pfx;*.p12|Todos os arquivos (*.*)|*.*'
    if ($d.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { return $d.FileName }
    return $null
  } catch {
    return (Read-Host 'Caminho do arquivo .pfx (ex.: C:\Certificados\empresa.pfx)').Trim('"', ' ')
  }
}
function Save-Segredo([string]$Pfx, [string]$Senha, [string]$Cnpj) {
  $r = Invoke-Node @((Join-Path $Destino 'coletor.mjs'), '--certificado', "--pfx=$Pfx", '--senha-stdin', "--cnpj=$Cnpj", (Join-Path $Destino 'config.json')) $Senha
  foreach ($l in $r.Linhas) { if ($l) { Escrever "  $l" $(if ($r.Codigo -eq 0) { 'Gray' } else { 'Yellow' }) } }
  return $r.Codigo
}
<# O certificado: do Windows (exporta) ou do arquivo (copia). Devolve $true quando ficou guardado. #>
function Set-Certificado($Empresa) {
  $pfxLocal = Join-Path $Destino 'certificado.pfx'
  $lista = @(Select-CertificadosDaEmpresa (Get-CertificadosDoWindows) $Empresa.cnpj)
  if ($lista.Count) {
    $c = Select-Certificado $lista
    if ($c) {
      Escrever "Certificado: $(Get-NomeDoCertificado $c) (vence em $($c.NotAfter.ToString('dd/MM/yyyy')))."
      if ($Simular) { Simulado "certificado escolhido: $($c.Thumbprint)"; return $true }
      try {
        $senha = Export-CertificadoLocal $c $pfxLocal
        $cod = Save-Segredo $pfxLocal $senha $Empresa.cnpj
        $senha = $null
        if ($cod -eq 0) { return $true }
      } catch { Escrever "O Windows não deixou copiar este certificado (a chave privada foi instalada como não exportável). Vamos usar o arquivo .pfx." 'Yellow' }
      Remove-Item -LiteralPath $pfxLocal -Force -ErrorAction SilentlyContinue
    }
  } else {
    Escrever "Não achei no Windows um certificado A1 da empresa (CNPJ $($Empresa.cnpj)) com a chave privada e na validade."
  }
  if ($Simular) { Simulado 'pediria o arquivo .pfx e a senha'; return $true }
  for ($t = 1; $t -le 3; $t++) {
    Escrever 'Escolha o arquivo do certificado A1 da empresa (.pfx) na janela que abriu...' 'White'
    $arq = Select-ArquivoPfx
    if (-not $arq -or -not (Test-Path -LiteralPath $arq)) { Escrever 'Nenhum arquivo escolhido.' 'Yellow'; continue }
    $seg = Read-Host 'Senha do certificado (não aparece na tela; fica só neste computador)' -AsSecureString
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($seg)
    try { $senha = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
    Copy-Item -LiteralPath $arq -Destination $pfxLocal -Force
    Set-SoEsteUsuario $pfxLocal
    $cod = Save-Segredo $pfxLocal $senha $Empresa.cnpj
    $senha = $null
    if ($cod -eq 0) { return $true }
    Remove-Item -LiteralPath $pfxLocal -Force -ErrorAction SilentlyContinue
    Escrever 'Vamos tentar de novo.' 'Yellow'
  }
  return $false
}

# ───────────────────────── tarefa e atalhos ─────────────────────────
function Register-Tarefa {
  $cfgArq = Join-Path $Destino 'config.json'
  $acao = New-ScheduledTaskAction -Execute $script:node -Argument "`"$(Join-Path $Destino 'coletor.mjs')`" `"$cfgArq`"" -WorkingDirectory $Destino
  $gatilho = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
  $ajustes = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 5) -ExecutionTimeLimit ([TimeSpan]::Zero) -StartWhenAvailable
  Register-ScheduledTask -TaskName $tarefa -Action $acao -Trigger $gatilho -Settings $ajustes -Description 'Jarvis: busca na SEFAZ as notas da empresa (e, se ligada, manda os XML novos da pasta) para o Jarvis Reforma.' -Force | Out-Null
  Start-ScheduledTask -TaskName $tarefa
}
function New-Atalho([string]$Nome, [string]$Argumentos) {
  New-Item -ItemType Directory -Force -Path $menu | Out-Null
  $ws = New-Object -ComObject WScript.Shell
  $l = $ws.CreateShortcut((Join-Path $menu "$Nome.lnk"))
  $l.TargetPath = Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe'
  $l.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$(Join-Path $Destino 'instalar.ps1')`" $Argumentos"
  $l.WorkingDirectory = $Destino
  $l.Save()
}
function Stop-Coletor {
  Stop-ScheduledTask -TaskName $tarefa -ErrorAction SilentlyContinue
  try {
    Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction Stop | Where-Object { "$($_.CommandLine)" -like "*$Destino*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  } catch { }
}

# ───────────────────────── os três modos ─────────────────────────
function Install-Coletor {
  Escrever 'Coletor Jarvis: instalação' 'Cyan'
  $cfgPacote = Join-Path $origem 'config.json'
  if (-not (Test-Path -LiteralPath $cfgPacote)) { throw 'Falta o config.json do pacote. Baixe o Coletor de novo no Jarvis Reforma (Ligar uma pasta › Coletor Jarvis › Baixar o Coletor Jarvis para Windows).' }
  $cfg = Read-Config $cfgPacote
  if ("$($cfg.token)" -notmatch '^jvc_[0-9a-f]{64}$') { throw 'O config.json deste pacote não tem o token do Coletor. Baixe o pacote de novo no Jarvis Reforma.' }
  $anterior = $null
  if (Test-Path -LiteralPath (Join-Path $Destino 'config.json')) { try { $anterior = Read-Config (Join-Path $Destino 'config.json') } catch { } }

  Passo "[1/6] Copiando o Coletor para $Destino"
  if (-not $Simular) { Stop-Coletor }
  Copy-Coletor
  $cfgArq = Join-Path $Destino 'config.json'

  Passo '[2/6] Conferindo o Node.js (o motor do Coletor)'
  $script:node = Get-NodeUsavel
  if ($script:node) { Escrever "Usando $($script:node)." } else { $script:node = Install-NodePortatil }
  if (-not $script:node -and -not $Simular) { throw 'O Node.js não ficou disponível.' }

  Passo '[3/6] Conferindo o token com o Jarvis'
  $empresa = [pscustomobject]@{ nome = "$($cfg.empresa.nome)"; cnpj = ("$($cfg.empresa.cnpj)" -replace '\D', '') }
  if ($Simular) { Simulado "não falaria com o Jarvis; empresa do pacote: $($empresa.nome) (CNPJ $($empresa.cnpj))" }
  else {
    $r = Invoke-Node @((Join-Path $Destino 'coletor.mjs'), '--empresa', $cfgArq)
    if ($r.Codigo -ne 0) { throw "O Jarvis não aceitou este pacote: $($r.Linhas -join ' ') Baixe o pacote de novo no Jarvis Reforma (o token pode ter sido revogado) e confira a internet." }
    try { $o = ($r.Linhas | Where-Object { $_ -like '{*' } | Select-Object -Last 1) | ConvertFrom-Json; if ($o.cnpj) { $empresa.cnpj = "$($o.cnpj)" }; if ($o.empresa) { $empresa.nome = "$($o.empresa)" } } catch { }
    Escrever "Token aceito: empresa $($empresa.nome) (CNPJ $($empresa.cnpj))." 'Green'
  }

  # a pasta dos XML (opcional): a que já estava ligada continua; senão, pergunta uma vez
  if ($anterior -and $anterior.pasta -and (Test-Path -LiteralPath "$($anterior.pasta)")) { $cfg | Add-Member -NotePropertyName pasta -NotePropertyValue "$($anterior.pasta)" -Force }
  elseif (-not $SemPasta -and -not $Simular) {
    $q = Read-Host 'Quer que o Coletor também vigie uma pasta de XML deste computador? Digite S para escolher (Enter = não)'
    if ("$q".Trim() -match '^[sS]') {
      try {
        Add-Type -AssemblyName System.Windows.Forms
        $f = New-Object System.Windows.Forms.FolderBrowserDialog; $f.Description = 'Escolha a pasta com os XML das notas (as subpastas entram)'
        if ($f.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { $cfg | Add-Member -NotePropertyName pasta -NotePropertyValue $f.SelectedPath -Force; Escrever "Pasta dos XML: $($f.SelectedPath)." }
      } catch { Escrever 'Não abriu a janela da pasta: dá para ligar depois (README.md).' 'Yellow' }
    }
  }
  Write-Config $cfg $cfgArq
  Set-SoEsteUsuario $cfgArq

  Passo '[4/6] Certificado A1 da empresa (fica só neste computador)'
  $mesmo = $anterior -and ("$($anterior.empresa.cnpj)" -replace '\D', '') -eq $empresa.cnpj -and (Test-Path -LiteralPath (Join-Path $Destino 'segredo-sefaz.json'))
  if ($mesmo) { Escrever 'O certificado desta empresa já estava guardado neste computador: mantido.' }
  elseif (-not (Set-Certificado $empresa)) { throw 'O certificado não foi guardado. Rode o instalador de novo com o arquivo .pfx e a senha certos.' }

  Passo '[5/6] Diagnóstico (token, certificado, conexão com a SEFAZ e uma consulta de teste em homologação)'
  $tudoCerto = $true
  if ($Simular) { Simulado 'rodaria node coletor.mjs --diagnostico' }
  else {
    $d = Invoke-Node @((Join-Path $Destino 'coletor.mjs'), '--diagnostico', $cfgArq)
    $falhas = @($d.Linhas | Where-Object { $_ -like '*FALHA*' })
    $tudoCerto = $d.Codigo -eq 0 -and -not $falhas.Count
    if (-not $tudoCerto) { foreach ($l in $falhas) { Escrever ("  " + ($l -replace '^\[FALHA\]\s*', '')) 'Yellow' } }
  }

  Passo '[6/6] Ligando o Coletor (tarefa "Coletor Jarvis", liga sozinha com o Windows) e os atalhos'
  if ($Simular) { Simulado "criaria a tarefa '$tarefa' e os atalhos em $menu" }
  else {
    Register-Tarefa
    New-Atalho 'Coletor Jarvis – ver situação' '-Situacao'
    New-Atalho 'Desinstalar Coletor Jarvis' '-Desinstalar'
  }

  Write-Host ''
  if ($tudoCerto) { Escrever "Tudo certo: o Coletor já está buscando as notas da $($empresa.nome). Elas aparecem no Jarvis Reforma em Baixar notas da SEFAZ." 'Green' }
  else { Escrever "O Coletor foi instalado, mas o diagnóstico acusou o problema acima. Corrija e veja de novo em Iniciar › Coletor Jarvis › Coletor Jarvis – ver situação." 'Yellow' }
  Escrever "Para ver a situação ou desinstalar: menu Iniciar › Coletor Jarvis. O registro fica em $(Join-Path $Destino 'coletor.log')."
  if ($Simular) { Simulado 'fim' }
}

function Show-Situacao {
  Escrever 'Coletor Jarvis: situação' 'Cyan'
  $t = Get-ScheduledTask -TaskName $tarefa -ErrorAction SilentlyContinue
  if ($t) { $i = $t | Get-ScheduledTaskInfo; Escrever "Tarefa '$tarefa': $($t.State) (última execução $($i.LastRunTime))." } else { Escrever "A tarefa '$tarefa' não existe: rode o instalador de novo." 'Yellow' }
  $script:node = Get-NodeUsavel
  if ($script:node -and (Test-Path -LiteralPath (Join-Path $Destino 'config.json'))) {
    Passo 'Diagnóstico'
    $d = Invoke-Node @((Join-Path $Destino 'coletor.mjs'), '--diagnostico', (Join-Path $Destino 'config.json'))
    foreach ($l in $d.Linhas) { Escrever $l $(if ($l -like '*FALHA*') { 'Yellow' } else { 'Gray' }) }
    if ($d.Codigo -eq 0) { Escrever 'Tudo certo: o Coletor está buscando as notas.' 'Green' }
  }
  $log = Join-Path $Destino 'coletor.log'
  if (Test-Path -LiteralPath $log) { Passo 'Últimas linhas do coletor.log'; Get-Content -LiteralPath $log -Tail 15 -Encoding UTF8 | ForEach-Object { Escrever $_ } }
}

function Remove-Coletor {
  Escrever 'Coletor Jarvis: desinstalar' 'Cyan'
  if (-not (Test-Path -LiteralPath (Join-Path $Destino 'coletor.mjs'))) { throw "Não achei o Coletor em $Destino." }
  if (-not $Simular) {
    $q = Read-Host 'Isto remove a tarefa, os atalhos, os arquivos do Coletor e a cópia do certificado deste computador. Digite S para continuar'
    if ("$q".Trim() -notmatch '^[sS]') { Escrever 'Nada foi removido.'; return }
    Stop-Coletor
    Unregister-ScheduledTask -TaskName $tarefa -Confirm:$false -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $menu -Recurse -Force -ErrorAction SilentlyContinue
  } else { Simulado "removeria a tarefa '$tarefa' e os atalhos" }
  Set-Location -LiteralPath $env:TEMP
  Remove-Item -LiteralPath $Destino -Recurse -Force
  Escrever 'Coletor Jarvis removido deste computador (o certificado instalado no Windows continua como estava). No Jarvis, revogue o coletor em Ligar uma pasta › Coletor Jarvis.' 'Green'
}

try {
  if ($Desinstalar) { Remove-Coletor }
  elseif ($Situacao) { Show-Situacao }
  else { Install-Coletor }
  Pausar
  exit 0
} catch {
  Escrever "Não deu certo: $($_.Exception.Message)" 'Red'
  Pausar
  exit 1
}
