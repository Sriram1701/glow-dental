$htmlPath = "c:\Users\lovel\Desktop\glow dental clinic\index.html"
$cssPath = "c:\Users\lovel\Desktop\glow dental clinic\style.css"

$html = Get-Content -Path $htmlPath -Raw
$html = $html -replace "Sri Lakshmi Rajagopal Multispeciality Dental Care", "Glow Dental Clinic"
$html = $html -replace "Sri Lakshmi Rajagopal Dental Care", "Glow Dental Clinic"
$html = $html -replace "Sri Lakshmi Rajagopal", "Glow Dental Clinic"
$html = $html -replace "Nellikuppam", "Chennai"
$html = $html -replace "Cuddalore", "Chennai"

Set-Content -Path $htmlPath -Value $html

$css = Get-Content -Path $cssPath -Raw
$css = $css -replace "--primary-blue:\s*#[0-9a-fA-F]+;", "--primary-blue: #ff4081;"
$css = $css -replace "--primary-green:\s*#[0-9a-fA-F]+;", "--primary-green: #f50057;"
$css = $css -replace "--deep-blue:\s*#[0-9a-fA-F]+;", "--deep-blue: #c51162;"
$css = $css -replace "--light-blue:\s*#[0-9a-fA-F]+;", "--light-blue: #fce4ec;"
$css = $css -replace "--dark-text:\s*#[0-9a-fA-F]+;", "--dark-text: #4a154b;"
$css = $css -replace "--soft-white:\s*#[0-9a-fA-F]+;", "--soft-white: #fffafa;"
$css = $css -replace "color:\s*#0f3460;", "color: #c51162;"
$css = $css -replace "color:\s*#45a05e;", "color: #ff4081;"
$css = $css -replace "rgba\(0, 150, 255", "rgba(255, 64, 129"
$css = $css -replace "rgba\(5, 72, 121", "rgba(197, 17, 98"
$css = $css -replace "rgba\(43, 81, 187", "rgba(245, 0, 87"

$css += "`n`n/* Override object-fit for gallery to cleanly crop screenshots */`n"
$css += ".photo-grid img, .gallery img, img.gallery-image, .photos-container img {`n"
$css += "    width: 100%;`n"
$css += "    height: 300px;`n"
$css += "    object-fit: cover;`n"
$css += "    object-position: center;`n"
$css += "    border-radius: 12px;`n"
$css += "}`n"

Set-Content -Path $cssPath -Value $css
Write-Output "Done"
