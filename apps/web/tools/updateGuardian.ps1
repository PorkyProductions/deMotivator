$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$guardianFile = Join-Path $scriptDir 'ProjectGuardian.kt'
$packageJson = (Resolve-Path (Join-Path $scriptDir '..' 'package.json')).Path.Replace('\', '/')

$version = node -p "require('$packageJson').version"
$buildTime = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ss') + 'Z'

$content = Get-Content $guardianFile -Raw
$content = $content -replace 'const val GUARDIAN_VERSION: String = "[^"]*"', "const val GUARDIAN_VERSION: String = `"$version`""
$content = $content -replace 'val createdAt: Instant = Instant.parse\("[^"]*"\)', "val createdAt: Instant = Instant.parse(`"$buildTime`")"
[System.IO.File]::WriteAllText($guardianFile, $content)

Write-Host "ProjectGuardian.kt updated: version=$version, buildTime=$buildTime"
