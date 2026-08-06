@echo off
setlocal
cd /d "%~dp0"
echo Sync public from ops/finanzas...
copy /Y "..\..\ops\finanzas\ledger.json" "public\ledger.json" >nul
copy /Y "..\..\ops\finanzas\ledger-ssot.json" "public\ledger-ssot.json" >nul
copy /Y "..\..\ops\finanzas\index.html" "public\index.html" >nul
echo wrangler deploy...
npx --yes wrangler@4 deploy
echo Done. Smoke: curl -s https://finanzas.vientonorte.io/ledger.json ^| findstr summary_today