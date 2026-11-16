@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Dang mo trang quan tri website... (dong cua so nay de tat)
start "" http://localhost:4400/
node admin\server.mjs
pause
