# Upload ./media to the R2 bucket from Windows PowerShell.
# Needs Node.js, and env vars CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID.
$ErrorActionPreference = "Stop"
if (-not $env:CLOUDFLARE_API_TOKEN -or -not $env:CLOUDFLARE_ACCOUNT_ID) { throw "Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID first." }
$bucket = if ($env:R2_BUCKET) { $env:R2_BUCKET } else { "salhiyah-media" }
$root = Join-Path $PSScriptRoot "..\media" | Resolve-Path
$types = @{ ".webp"="image/webp"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".png"="image/png"; ".svg"="image/svg+xml"; ".pdf"="application/pdf"; ".mp4"="video/mp4" }
Get-ChildItem -Path $root -Recurse -File | ForEach-Object {
  $key = $_.FullName.Substring($root.Path.Length + 1).Replace("\", "/")
  $ct = $types[$_.Extension.ToLower()]; if (-not $ct) { $ct = "application/octet-stream" }
  Write-Host "-> $key"
  npx --yes wrangler r2 object put "$bucket/$key" --file $_.FullName --content-type $ct --cache-control "public, max-age=31536000, immutable" --remote
  if ($LASTEXITCODE -ne 0) { throw "Upload failed for $key" }
}
Write-Host "Done."
