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

# Internal package names whose version constraints should be kept in sync
$internalPackages = @(
	'demotivator',
	'@demotivator/shared'
)

$depFields = @('dependencies', 'devDependencies', 'peerDependencies')

foreach ($pkg in $packages) {
	$content = Get-Content $pkg -Raw | ConvertFrom-Json

	# Update the package's own version
	$content.version = $Version

	# Update version constraints for internal packages across all dep fields
	foreach ($field in $depFields) {
		if ($null -eq $content.$field) { continue }
		foreach ($name in $internalPackages) {
			if ($null -ne $content.$field.$name) {
				$content.$field.$name = "^$Version"
			}
		}
	}

	# ConvertTo-Json -Depth 100 to avoid truncating nested objects
	$content | ConvertTo-Json -Depth 100 | Set-Content $pkg
	Write-Host "Updated $pkg -> $Version"
}