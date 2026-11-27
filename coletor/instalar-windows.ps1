# © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
# Coletor Jarvis › instala no Windows: confere o Node.js e o config.json, testa o token, aponta o certificado da busca
# na SEFAZ (se ligada) e roda o diagnóstico, e cria a tarefa "Coletor Jarvis"
# no Agendador de Tarefas, que liga o coletor quando o usuário entra no Windows e o reinicia se ele cair.
# Uso (na pasta do coletor):  powershell -ExecutionPolicy Bypass -File instalar-windows.ps1
#                             powershell -ExecutionPolicy Bypass -File instalar-windows.ps1 -Remover
param([switch]$Remover)
$ErrorActionPreference = 'Stop'
$pasta = Split-Path -Parent $MyInvocation.MyCommand.Path
$tarefa = 'Coletor Jarvis'

if ($Remover) {
  Unregister-ScheduledTask -TaskName $tarefa -Confirm:$false -ErrorAction SilentlyContinue
  Write-Host "Tarefa '$tarefa' removida. O coletor não liga mais sozinho."
  exit 0
}

$node = (Get-Command node -ErrorAction SilentlyContinue).Source
if (-not $node) { Write-Host 'Instale o Node.js (versão 20 ou mais nova) em https://nodejs.org e rode de novo.' -ForegroundColor Red; exit 1 }
$versao = (& $node -v).TrimStart('v').Split('.')[0]
if ([int]$versao -lt 20) { Write-Host "O Node.js instalado é a versão ${versao}: instale a 20 ou mais nova." -ForegroundColor Red; exit 1 }
$config = Join-Path $pasta 'config.json'
if (-not (Test-Path $config)) { Write-Host 'Falta o config.json nesta pasta: baixe-o no Jarvis (Reforma › Ligar uma pasta › Criar um coletor).' -ForegroundColor Red; exit 1 }

Write-Host 'Conferindo o token com o Jarvis...'
& $node (Join-Path $pasta 'coletor.mjs') --testar $config
if ($LASTEXITCODE -ne 0) { Write-Host 'O teste falhou: confira o config.json (url, token e pasta).' -ForegroundColor Red; exit 1 }

# A busca na SEFAZ (config.json › "sefaz"): o certificado A1 fica só neste computador, cifrado pelo Windows (DPAPI do
# usuário que instala; a tarefa roda com esse mesmo usuário).
$cfg = Get-Content $config -Raw -Encoding UTF8 | ConvertFrom-Json
if ($cfg.sefaz -and $cfg.sefaz.ligado -ne $false) {
  $segredo = if ($cfg.sefaz.segredo) { Join-Path $pasta $cfg.sefaz.segredo } else { Join-Path $pasta 'segredo-sefaz.json' }
  if (-not (Test-Path $segredo)) {
    Write-Host 'Agora aponte o certificado A1 (.pfx) da empresa e a senha (ficam só neste computador):'
    & $node (Join-Path $pasta 'coletor.mjs') --certificado $config
    if ($LASTEXITCODE -ne 0) { Write-Host 'O certificado não foi guardado: rode de novo "node coletor.mjs --certificado".' -ForegroundColor Red; exit 1 }
  }
  Write-Host 'Diagnóstico da busca na SEFAZ (certificado, conexão e uma consulta de teste em homologação)...'
  & $node (Join-Path $pasta 'coletor.mjs') --diagnostico $config
  if ($LASTEXITCODE -ne 0) { Write-Host 'O diagnóstico acusou um problema (veja acima). O Coletor será instalado assim mesmo; corrija e rode "node coletor.mjs --diagnostico".' -ForegroundColor Yellow }
}

$acao = New-ScheduledTaskAction -Execute $node -Argument "`"$(Join-Path $pasta 'coletor.mjs')`" `"$config`"" -WorkingDirectory $pasta
$gatilho = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$ajustes = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 5) -ExecutionTimeLimit ([TimeSpan]::Zero) -StartWhenAvailable
Register-ScheduledTask -TaskName $tarefa -Action $acao -Trigger $gatilho -Settings $ajustes -Description 'Jarvis: manda os XML novos da pasta para a conferência e busca na SEFAZ as notas da empresa.' -Force | Out-Null
Start-ScheduledTask -TaskName $tarefa
Write-Host "Pronto: a tarefa '$tarefa' foi criada e já está rodando. O registro fica em $(Join-Path $pasta 'coletor.log')." -ForegroundColor Green
