# Copyright 2024, PorkyProductions, and contributors
# Licensed under the Apache License, Version 2.0
#
# sync-insults.ps1
# PowerShell wrapper: builds the demotivator npm package, then runs the Node.js
# sync script to regenerate packages/demotivator-python/demotivator/insults.py.

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot  = Resolve-Path (Join-Path $scriptDir '..')

Write-Host '==> Building demotivator npm package…'
Set-Location $repoRoot
npm run build --workspace @demotivator/shared --silent
npm run build --workspace demotivator --silent

Write-Host '==> Syncing insults to Python package…'
node (Join-Path $scriptDir 'sync-insults.mjs')

Write-Host '==> Done.'
