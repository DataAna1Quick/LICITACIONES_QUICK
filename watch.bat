@echo off
title Vigilante index.html - Auto Push
echo ============================================
echo   LICITACIONES - Auto Push al modificar index
echo ============================================
echo.
cd /d "%~dp0"
python PrimerAnalisis\src\auto_push.py
pause
