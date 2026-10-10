$htmlPath = "c:\Users\lovel\Desktop\glow dental clinic\index.html"

# 1. Rename files
$logoDir = "c:\Users\lovel\Desktop\glow dental clinic\images\logo"
if (Test-Path "$logoDir\*.jpeg") {
    Get-ChildItem "$logoDir\*.jpeg" | Rename-Item -NewName "logo.jpeg" -ErrorAction SilentlyContinue
}

$galleryDir = "c:\Users\lovel\Desktop\glow dental clinic\images\gallery"
if (Test-Path "$galleryDir\*.jpeg") {
    $i = 1
    Get-ChildItem "$galleryDir\*.jpeg" | ForEach-Object {
        Rename-Item $_.FullName -NewName "gallery-$i.jpeg" -ErrorAction SilentlyContinue
        $i++
    }
}

# 2. Update HTML content
$html = Get-Content -Path $htmlPath -Raw

# Replace Dr. name
$html = $html -replace "Dr. Srilakshmi Rajagopal", "Glow Dental Clinic Doctor"

# Replace image paths to point to new images folder
$html = $html -replace 'src="image/logo.jpeg"', 'src="images/logo/logo.jpeg"'
$html = $html -replace 'content="image/logo.jpeg"', 'content="images/logo/logo.jpeg"'
$html = $html -replace 'href="image/logo.jpeg"', 'href="images/logo/logo.jpeg"'

# Replace gallery images
# The existing HTML has a section with these images: clinic-entry, operation-1, reception, operation-2, clinic-night-look
$galleryHtml = @"
<img src="images/gallery/gallery-1.jpeg" class="main-premium-pic gallery-image" alt="Gallery Image 1">
<img src="images/gallery/gallery-2.jpeg" class="sub-premium-pic gallery-image" alt="Gallery Image 2">
<img src="images/gallery/gallery-3.jpeg" class="sub-premium-pic gallery-image" alt="Gallery Image 3">
<img src="images/gallery/gallery-4.jpeg" class="sub-premium-pic gallery-image" alt="Gallery Image 4">
<img src="images/gallery/gallery-5.jpeg" class="sub-premium-pic gallery-image" alt="Gallery Image 5">
<img src="images/gallery/gallery-6.jpeg" class="sub-premium-pic gallery-image" alt="Gallery Image 6">
"@

# Since we don't know the exact HTML structure, we will regex replace the block of old gallery images
# or just blindly replace the image references:
$html = $html -replace 'src="image/clinic-entry.jpg" class="main-premium-pic" alt="Glow Dental Clinic Clinic"', 'src="images/gallery/gallery-1.jpeg" class="main-premium-pic gallery-image" alt="Gallery 1"'
$html = $html -replace 'src="image/operation-1.jpg" class="sub-premium-pic" alt="Operation Chair"', 'src="images/gallery/gallery-2.jpeg" class="sub-premium-pic gallery-image" alt="Gallery 2"'
$html = $html -replace 'src="image/reception.jpg" class="sub-premium-pic" alt="Reception Area"', 'src="images/gallery/gallery-3.jpeg" class="sub-premium-pic gallery-image" alt="Gallery 3"'
$html = $html -replace 'src="image/operation-2.jpg" class="sub-premium-pic" alt="Operation Chair Room"', 'src="images/gallery/gallery-4.jpeg" class="sub-premium-pic gallery-image" alt="Gallery 4"'
$html = $html -replace 'src="image/clinic-night-look.jpg" class="sub-premium-pic" alt="Clinic Night Look"', 'src="images/gallery/gallery-5.jpeg" class="sub-premium-pic gallery-image" alt="Gallery 5"'

# Remove any references to old image folder
$html = $html -replace 'src="image/', 'src="images/'

Set-Content -Path $htmlPath -Value $html

Write-Output "Done"
