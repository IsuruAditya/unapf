# Re-downloads reference media (images only; videos are listed in README) from the Wix CDN (resized server-side) into public/media.
# Manifest lines: <mediaId>|<dest relative to public/media>|<w>|<h>   (dest ending .png keeps transparency)
$root = Join-Path $PSScriptRoot "..\..\public\media"
$cdn = "https://static.wixstatic.com/media"
$fail = 0
Get-Content "$PSScriptRoot\manifest.txt" | Where-Object { $_ -and -not $_.StartsWith("#") } | ForEach-Object {
  $id, $dest, $w, $h = $_.Split("|")
  $path = Join-Path $root $dest
  New-Item -ItemType Directory -Force (Split-Path $path) | Out-Null
  if (Test-Path $path) { return }
  if ($w -eq "raw") { $url = "$cdn/$id" }
  elseif ($dest.EndsWith(".png")) { $url = "$cdn/$id/v1/fit/w_$w,h_$h/f.png" }
  else { $url = "$cdn/$id/v1/fit/w_$w,h_$h,q_82/f.jpg" }
  $code = curl.exe -s -m 60 -A "Mozilla/5.0" -w "%{http_code}" -o $path $url
  if ($code -ne "200") { Remove-Item $path -ErrorAction SilentlyContinue; "FAIL $code $id -> $dest"; $fail++ }
}
"failures: $fail"

