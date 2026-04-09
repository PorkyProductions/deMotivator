$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$updaterScript = (Resolve-Path (Join-Path $scriptDir 'updateGuardian.mjs')).Path
node $updaterScript
if ($LASTEXITCODE -ne 0) {
	exit $LASTEXITCODE
}
