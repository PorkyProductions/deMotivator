param(
	[Parameter(Mandatory=$true)]
	[string]$Version
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Resolve-Path (Join-Path $scriptDir '..')

$packages = @(
	(Join-Path $rootDir 'package.json'),
	(Join-Path $rootDir 'apps' 'web' 'package.json'),
	(Join-Path $rootDir 'packages' 'demotivator' 'package.json'),
	(Join-Path $rootDir 'packages' 'shared' 'package.json')
)

foreach ($pkg in $packages) {
	$content = Get-Content $pkg -Raw | ConvertFrom-Json
	$content.version = $Version
	$content | ConvertTo-Json -Depth 100 | Set-Content $pkg
	Write-Host "Updated $pkg -> $Version"
}
