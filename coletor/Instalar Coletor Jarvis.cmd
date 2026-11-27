@echo off
rem (c) 2026 GK Solucoes Empresariais LTDA (CNPJ 60.180.675/0001-91). Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
rem Coletor Jarvis: dois cliques aqui instalam o Coletor ja configurado para a empresa (veja o LEIA-ME.txt).
rem Chama o coletor\instalar.ps1 (PowerShell do Windows). Aberto de dentro do ZIP (sem extrair), procura o pacote
rem "Coletor Jarvis*.zip" mais novo em Downloads, extrai numa pasta temporaria e instala de la.
setlocal
title Instalar o Coletor Jarvis
set "PS1=%~dp0coletor\instalar.ps1"
if exist "%PS1%" goto instalar
echo Abrindo o pacote do Coletor Jarvis...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$z = Get-ChildItem -LiteralPath (Join-Path $env:USERPROFILE 'Downloads') -Filter 'Coletor Jarvis*.zip' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1; if (-not $z) { exit 2 }; $d = Join-Path $env:TEMP 'ColetorJarvis-instalar'; Remove-Item -LiteralPath $d -Recurse -Force -ErrorAction SilentlyContinue; Expand-Archive -LiteralPath $z.FullName -DestinationPath $d -Force; exit 0"
if errorlevel 1 goto semPacote
set "PS1=%TEMP%\ColetorJarvis-instalar\coletor\instalar.ps1"
if not exist "%PS1%" goto semPacote
:instalar
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS1%" %*
exit /b %errorlevel%
:semPacote
echo.
echo Nao achei os arquivos do Coletor. Clique com o botao direito no arquivo .zip baixado do Jarvis,
echo escolha "Extrair tudo" e, na pasta extraida, de dois cliques em "Instalar Coletor Jarvis.cmd".
echo.
pause
exit /b 1
