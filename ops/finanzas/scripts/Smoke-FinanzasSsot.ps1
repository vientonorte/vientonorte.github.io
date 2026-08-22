#Requires -Version 5.1
<#
.SYNOPSIS
  Smoke SSOT Finanzas: git raw vs live vs local ledger.
  Exit 0 only if live matches git (or --AllowLiveLag for pre-wrangler).
#>
param(
  [switch]$AllowLiveLag,
  [string]$LocalLedger = ""
)

$ErrorActionPreference = "Continue"
$script:fail = 0
function Ok($m) { Write-Host "  PASS  $m" -ForegroundColor Green }
function Bad($m) { Write-Host "  FAIL  $m" -ForegroundColor Red; $script:fail++ }
function Warn($m) { Write-Host "  WARN  $m" -ForegroundColor Yellow }

if (-not $LocalLedger) {
  $cands = @(
    "$env:USERPROFILE\Documents\MICRO 1\07-pagos(1)\dashboard\ledger.json",
    "$env:USERPROFILE\iCloudDrive\Documents\GitHub\vientonorte.github.io\ops\finanzas\ledger.json"
  )
  $LocalLedger = $cands | Where-Object { Test-Path $_ } | Select-Object -First 1
}

function Get-Snap($label, $urlOrPath) {
  try {
    if ($urlOrPath -match '^https?://') {
      $j = Invoke-RestMethod "$urlOrPath$(if($urlOrPath -match '\?'){'&'}else{'?'})t=$(Get-Random)" -Headers @{ "Cache-Control" = "no-cache" }
    } else {
      $j = Get-Content $urlOrPath -Raw -Encoding UTF8 | ConvertFrom-Json
    }
    return [pscustomobject]@{
      label = $label
      today = [int]$j.meta.summary_today_tasks
      mtd   = [int]$j.meta.summary_mtd_tasks
      usdT  = [double]$j.meta.summary_today_usd
      usdM  = [double]$j.meta.summary_mtd_usd
      sync  = [string]$j.meta.sync
      updated = [string]$j.meta.updated
    }
  } catch {
    return [pscustomobject]@{ label = $label; error = $_.Exception.Message }
  }
}

Write-Host "`n=== Smoke Finanzas SSOT ===" -ForegroundColor Cyan

$local = if ($LocalLedger) { Get-Snap "LOCAL" $LocalLedger } else { $null }
$raw   = Get-Snap "GIT_RAW" "https://raw.githubusercontent.com/vientonorte/vientonorte.github.io/main/ops/finanzas/ledger.json"
$pages = Get-Snap "PAGES" "https://vientonorte.github.io/ops/finanzas/ledger.json"
$live  = Get-Snap "LIVE" "https://finanzas.vientonorte.io/ledger.json"

foreach ($s in @($local, $raw, $pages, $live)) {
  if (-not $s) { continue }
  if ($s.error) { Bad "$($s.label): $($s.error)"; continue }
  Write-Host ("  {0,-8} today={1,2} `${2}  mtd={3,3} `${4}  sync={5}" -f $s.label, $s.today, $s.usdT, $s.mtd, $s.usdM, $s.sync)
}

if ($raw.error) { Bad "GIT_RAW unreachable" }
elseif ($pages.error) { Warn "PAGES lag/unreachable" }
elseif ($raw.mtd -ne $pages.mtd) { Warn "PAGES mtd $($pages.mtd) != GIT $($raw.mtd) (CDN lag?)" }
else { Ok "GIT_RAW == PAGES (mtd $($raw.mtd))" }

if ($live.error) {
  Bad "LIVE unreachable: $($live.error)"
} elseif ($raw.error) {
  Bad "cannot compare LIVE (no GIT_RAW)"
} else {
  $lt = [int]$live.today; $lm = [int]$live.mtd
  $rt = [int]$raw.today; $rm = [int]$raw.mtd
  Write-Host "  CMP    LIVE t=$lt mtd=$lm  vs  GIT t=$rt mtd=$rm"
  if ($lm -eq $rm -and $lt -eq $rt) {
    Ok "LIVE == GIT (today $lt mtd $lm) - SSOT aligned"
  } else {
    $msg = "LIVE today=$lt/mtd=$lm != GIT today=$rt/mtd=$rm - Worker stale; run deploy-finanzas.cmd"
    if ($AllowLiveLag) { Warn $msg } else { Bad $msg }
  }
}

# health header
try {
  $h = Invoke-WebRequest "https://finanzas.vientonorte.io/ledger.json" -Method Head -UseBasicParsing
  $xv = $h.Headers["x-vn-finanzas"]
  if ($xv -match "v21-git-proxy") { Ok "Worker header $xv" }
  else { Warn "Worker header=$xv (want worker-v21-git-proxy after deploy)" }
} catch { Warn "no live headers" }

Write-Host ""
if ($script:fail -eq 0) { Write-Host "RESULT: PASS" -ForegroundColor Green; exit 0 }
Write-Host "RESULT: $($script:fail) FAIL" -ForegroundColor Red; exit 1
