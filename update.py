import os
import re

html_path = 'c:/Users/lovel/Desktop/glow dental clinic/index.html'
css_path = 'c:/Users/lovel/Desktop/glow dental clinic/style.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# HTML Replacements
html = html.replace('Sri Lakshmi Rajagopal Multispeciality Dental Care', 'Glow Dental Clinic')
html = html.replace('Sri Lakshmi Rajagopal Dental Care', 'Glow Dental Clinic')
html = html.replace('Sri Lakshmi Rajagopal', 'Glow Dental Clinic')
html = html.replace('Nellikuppam', 'Chennai')
html = html.replace('Cuddalore', 'Chennai')

# CSS Replacements
css = re.sub(r'--primary-blue:\s*#[0-9a-fA-F]+;', '--primary-blue: #ff4081;', css)
css = re.sub(r'--primary-green:\s*#[0-9a-fA-F]+;', '--primary-green: #f50057;', css)
css = re.sub(r'--deep-blue:\s*#[0-9a-fA-F]+;', '--deep-blue: #c51162;', css)
css = re.sub(r'--light-blue:\s*#[0-9a-fA-F]+;', '--light-blue: #fce4ec;', css)
css = re.sub(r'--dark-text:\s*#[0-9a-fA-F]+;', '--dark-text: #4a154b;', css)
css = re.sub(r'--soft-white:\s*#[0-9a-fA-F]+;', '--soft-white: #fffafa;', css)
css = re.sub(r'color:\s*#0f3460;', 'color: #c51162;', css)
css = re.sub(r'color:\s*#45a05e;', 'color: #ff4081;', css)
css = re.sub(r'rgba\(0, 150, 255', 'rgba(255, 64, 129', css)
css = re.sub(r'rgba\(5, 72, 121', 'rgba(197, 17, 98', css)
css = re.sub(r'rgba\(43, 81, 187', 'rgba(245, 0, 87', css)

# Make images look great if they are screenshots:
css += "\n\n/* Override object-fit for gallery to cleanly crop screenshots */\n"
css += ".photo-grid img, .gallery img, img.gallery-image {\n"
css += "    width: 100%;\n"
css += "    height: 300px;\n"
css += "    object-fit: cover;\n"
css += "    object-position: center;\n"
css += "    border-radius: 12px;\n"
css += "}\n"

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print('Replaced HTML texts and updated CSS theme variables.')
