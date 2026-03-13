@echo off
title Push Manual - LICITACIONES
cd /d "%~dp0"
python PrimerAnalisis\src\auto_push.py --once
pause
