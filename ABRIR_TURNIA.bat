@echo off
cd /d "%~dp0"
set PORT=5280
start "Turnia Server" /min node dev-server.mjs
timeout /t 2 >nul
start http://127.0.0.1:5280
