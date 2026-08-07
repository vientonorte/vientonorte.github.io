@echo off
setlocal
cd /d "%~dp0"
echo === deploy-finanzas (Worker git-proxy v21) ===
echo SSOT = git main ops/finanzas  ^(no public/ bundle^)
echo.
where npx >nul 2>&1 || (echo ERROR: npx not found & exit /b 1)
echo Deploying worker...
call npx --yes wrangler@4 deploy
if errorlevel 1 (
  echo.
  echo FAILED. Run once: npx wrangler login
  echo Or set CLOUDFLARE_API_TOKEN
  exit /b 1
)
echo.
echo Smoke:
curl -s "https://finanzas.vientonorte.io/__ssot" || curl -s "https://finanzas.vientonorte.io/health"
echo.
echo DoD: header x-vn-finanzas=worker-v21-git-proxy  AND  summary_today matches git
echo Done.
