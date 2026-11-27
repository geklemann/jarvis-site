@echo off
rem Coletor Jarvis: dois cliques aqui instalam o coletor no Agendador de Tarefas (veja o README.md).
rem (c) 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91). Veja LICENSE e AUTORIA.md.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0instalar-windows.ps1" %*
pause
