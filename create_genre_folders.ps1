# create_genre_folders.ps1
# Script PowerShell para criar pastas de gêneros e um index.html em cada que redireciona para o Spotify
param(
  [string[]]$Genres = @("sertanejo","pagode","funk","trap","rap")
)

$root = Get-Location
foreach($g in $Genres){
  $dir = Join-Path -Path $root -ChildPath $g
  if(-not (Test-Path $dir)){
    New-Item -ItemType Directory -Path $dir | Out-Null
  }
  $spotifyUrl = "https://open.spotify.com/search/$g"
  $html = @"
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=$spotifyUrl">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>$g - Abrindo Spotify</title>
</head>
<body>
  <p>Redirecionando para Spotify: <a href="$spotifyUrl" target="_blank">Abrir $g no Spotify</a></p>
</body>
</html>
"@
  $path = Join-Path -Path $dir -ChildPath "index.html"
  $html | Out-File -FilePath $path -Encoding utf8
}
Write-Host "Pastas criadas: $($Genres -join ', ')" -ForegroundColor Green
Write-Host "Abra a pasta e abra o arquivo index.html no navegador para ser redirecionado ao Spotify."