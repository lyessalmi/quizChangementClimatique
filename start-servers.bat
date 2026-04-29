@echo off

start cmd /k "cd /d "%~dp0backend" && node serveur.js"

start cmd /k "cd /d "%~dp0frontend" && npm run dev"

