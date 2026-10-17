@echo off
chcp 65001 > nul
title Enviando para o GitHub - Rosalinda Khal e João Luiz Filho
cd /d "%~dp0"
cls
echo ======================================================================
echo   ENVIANDO SITE PARA O GITHUB: marciomsilvargs/Rosalinda-Khal-
echo ======================================================================
echo.
echo Executando: git push -u origin main
echo (Se o GitHub pedir autenticacao, autorize na janela do navegador)
echo.
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ======================================================================
    echo   [SUCESSO] Todos os arquivos estao agora no seu GitHub!
    echo   Acesse: https://github.com/marciomsilvargs/Rosalinda-Khal-
    echo ======================================================================
) else (
    echo ======================================================================
    echo   [ERRO] Nao foi possivel concluir o envio. Verifique a mensagem acima.
    echo ======================================================================
)
echo.
pause
