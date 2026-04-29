@echo off

start cmd /k "cd /d "%~dp0backend" && npm install && node serveur.js"

start cmd /k "cd /d "%~dp0frontend" && npm install && npm run dev"

