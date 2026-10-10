$htmlPath = "c:\Users\lovel\Desktop\glow dental clinic\index.html"
$html = Get-Content -Path $htmlPath -Raw
$html = $html -replace "Sri%20Lakshmi%20Rajagopal%20Dental%20Care", "Glow%20Dental%20Clinic"
Set-Content -Path $htmlPath -Value $html
Write-Output "Links updated"
