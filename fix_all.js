const fs = require('fs');

// 1. Fix CSS Colors
let css = fs.readFileSync('style.css', 'utf-8');

const colorMap = {
    // Dark Blues -> Dark Pink/Purple
    '#0f3460': '#4a0e2e',
    '#0d264f': '#4a0e2e',
    '#020d1b': '#2a081a',
    '#185179': '#6b1b45',
    '#185f79': '#6b1b45',
    '#0c4a6e': '#6b1b45',
    '#0f766e': '#6b1b45',
    '#1e293b': '#4a0e2e',
    '#2c3e50': '#4a0e2e', // original dark text
    
    // Greens/Teals -> Vibrant Pinks
    '#22c55e': '#e91e63',
    '#25c430': '#e91e63',
    '#35a164': '#e91e63',
    '#16a34a': '#d81b60',
    '#28a745': '#d81b60',
    '#218838': '#c2185b',
    '#4ade80': '#f06292',
    '#15803d': '#c2185b',
    '#10b981': '#e91e63',
    '#0d9488': '#e91e63',
    '#14b8a6': '#f06292',
    '#45a05e': '#e91e63', // original logo tag
    
    // Light Blues -> Light Pinks
    '#38bdf8': '#f48fb1',
    '#0096ff': '#f06292',
    '#e6f4fe': '#fce4ec',
    '#d0e8ff': '#f8bbd0',
    '#f0fdf4': '#fce4ec',
    '#f1f5f9': '#fcf4f6',
    '#e2e8f0': '#f8bbd0',
    '#f0f4f8': '#fce4ec',
    
    // Grey/Other 
    '#64748b': '#ad6b88'
};

// Apply exact hex replacements (case insensitive)
for (let [oldColor, newColor] of Object.entries(colorMap)) {
    const regex = new RegExp(oldColor, 'gi');
    css = css.replace(regex, newColor);
}

// Ensure generic CSS variables are set to pink palette
css = css.replace(/--primary-blue:\s*[^;]+;/g, '--primary-blue: #e91e63;');
css = css.replace(/--primary-green:\s*[^;]+;/g, '--primary-green: #f06292;');
css = css.replace(/--deep-blue:\s*[^;]+;/g, '--deep-blue: #6b1b45;');
css = css.replace(/--light-blue:\s*[^;]+;/g, '--light-blue: #fce4ec;');
css = css.replace(/--dark-text:\s*[^;]+;/g, '--dark-text: #4a0e2e;');

// Write CSS
fs.writeFileSync('style.css', css);


// 2. Fix HTML
let html = fs.readFileSync('index.html', 'utf-8');

// The hero image was missing
html = html.replace(/<img[^>]*src="images\/dentist-photo\.jpeg"[^>]*>/i, 
    '<img src="images/gallery/gallery-1.jpeg" alt="Glow Dental Clinic" class="hero-main-img" style="object-fit:cover; border-radius:12px; width:100%; height:auto; aspect-ratio: 4/3;">');

// Broken icon images in services
html = html.replace(/<img[^>]*src="images\/root\.jpeg"[^>]*>/i, '<i class="fa-solid fa-tooth" style="font-size: 40px; color: var(--primary-blue); margin-bottom: 15px;"></i>');
html = html.replace(/<img[^>]*src="images\/implant\.jpeg"[^>]*>/i, '<i class="fa-solid fa-tooth" style="font-size: 40px; color: var(--primary-blue); margin-bottom: 15px;"></i>');
html = html.replace(/<img[^>]*src="images\/kids-dentist\.jpeg"[^>]*>/i, '<i class="fa-solid fa-child" style="font-size: 40px; color: var(--primary-blue); margin-bottom: 15px;"></i>');

// Look for any remaining broken gallery images (that still point to image/something.jpg instead of images/gallery/)
// In screenshot, we see "Operation Chair Room", "Clinic Night Look", "Sri Lakshmi Rajagopal Dental Care Clinic".
// We will replace all broken gallery tags that don't point to images/gallery/gallery-
const galleryImages = [
    'images/gallery/gallery-1.jpeg',
    'images/gallery/gallery-2.jpeg',
    'images/gallery/gallery-3.jpeg',
    'images/gallery/gallery-4.jpeg',
    'images/gallery/gallery-5.jpeg',
    'images/gallery/gallery-6.jpeg'
];

// Let's just find the gallery section and rebuild it, or replace the remaining broken tags
html = html.replace(/<img[^>]*alt="Operation Chair Room"[^>]*>/i, `<img src="${galleryImages[3]}" class="sub-premium-pic gallery-image" alt="Gallery 4">`);
html = html.replace(/<img[^>]*alt="Clinic Night Look"[^>]*>/i, `<img src="${galleryImages[4]}" class="sub-premium-pic gallery-image" alt="Gallery 5">`);
html = html.replace(/<img[^>]*alt="Sri Lakshmi Rajagopal Dental Care Clinic"[^>]*>/i, `<img src="${galleryImages[5]}" class="sub-premium-pic gallery-image" alt="Gallery 6">`);

// Replace patients with videos
// We have videos like 161154.mp4, 161156.mp4, 161157.mp4, 161159.mp4, 161161.mp4, 161164.mp4, 161166.mp4, 161183.mp4, 161184.mp4, 161186.mp4
const videos = fs.readdirSync('videos').filter(f => f.endsWith('.mp4')).map(f => 'videos/' + f);
let videoIndex = 0;

for (let i = 1; i <= 10; i++) {
    const videoSrc = videos[videoIndex % videos.length];
    html = html.replace(new RegExp(`<img[^>]*src="images\/patient-${i}\\.jpg"[^>]*>`, 'gi'), 
        `<video src="${videoSrc}" autoplay loop muted playsinline style="width:100%; border-radius:12px; height:300px; object-fit:cover;"></video>`);
    videoIndex++;
}

fs.writeFileSync('index.html', html);

console.log("HTML and CSS fixed successfully.");
