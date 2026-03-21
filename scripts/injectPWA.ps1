$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $scriptDir '..')
$swFile = Join-Path $repoRoot 'www' 'service-worker.js'
$outDir = Join-Path $repoRoot 'apps' 'web' 'out'

# Extract the HTML block from inside the /* ... */ block comment in service-worker.js.
# The block must open with a line that is exactly "/*" and close with "*/".
$swLines = Get-Content $swFile
$found = $false
$pwaLinks = [System.Collections.Generic.List[string]]::new()
foreach ($line in $swLines) {
    if ($line -match '^\*/$') { $found = $false; continue }
    if ($found) { $pwaLinks.Add($line) }
    if ($line -match '^/\*$') { $found = $true }
}

if ($pwaLinks.Count -eq 0) {
    Write-Error "Could not find HTML block in service-worker.js"
    exit 1
}
$pwaBlock = $pwaLinks -join "`n"

Get-ChildItem -Path $outDir -Filter '*.html' | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'apple-touch-icon') {
        Write-Host "Skipping $($_.Name) (already has PWA links)"
        return
    }
    $content = $content -replace '</head>', "$pwaBlock`n</head>"
    [System.IO.File]::WriteAllText($_.FullName, $content)
    Write-Host "Injected PWA links into $($_.Name) ✅"
}
