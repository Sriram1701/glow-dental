const fs = require('fs');

// Replace HTML
let html = fs.readFileSync('index.html', 'utf-8');
const heroHtmlRegex = /<section class="hero" id="home">[\s\S]*?<\/section>/;
const newHeroHtml = `<section class="hero-new" id="home">
        <div class="hero-content-new">
            <h4 class="hero-super-title">ADVANCED. GENTLE. PERSONALIZED.</h4>
            <h1 class="hero-title-new">Glow Dental Clinic.<br><span class="hero-cursive-title">Confident Smile.</span></h1>
            
            <p class="hero-desc-new">Medical-led dental treatments tailored to your features, designed to enhance your natural smile and oral health.</p>
            
            <div class="hero-buttons-new">
                <a href="https://wa.me/919787807552" target="_blank" class="btn-solid-new">BOOK CONSULTATION</a>
                <a href="#services-section" class="btn-outline-new">OUR TREATMENTS</a>
            </div>
            
            <div class="hero-icons-new">
                <div class="icon-item-new">
                    <i class="fa-solid fa-shield-heart"></i>
                    <span>MEDICAL-LED CARE</span>
                </div>
                <div class="icon-item-new">
                    <i class="fa-solid fa-award"></i>
                    <span>PREMIUM QUALITY</span>
                </div>
                <div class="icon-item-new">
                    <i class="fa-regular fa-face-smile"></i>
                    <span>NATURAL RESULTS</span>
                </div>
            </div>
        </div>
    </section>`;
html = html.replace(heroHtmlRegex, newHeroHtml);
fs.writeFileSync('index.html', html);


// Append CSS
let css = fs.readFileSync('style.css', 'utf-8');
const newCss = `

/* --- NEW HERO SECTION (SAMPLE MATCH) --- */
.hero-new {
    width: 100%;
    min-height: 90vh;
    display: flex;
    align-items: center;
    background-color: #faf5f0;
    background-image: linear-gradient(to right, #faf5f0 40%, rgba(250, 245, 240, 0.8) 60%, transparent 100%), url('images/hero/dental.jpg');
    background-size: cover;
    background-position: center right;
    background-repeat: no-repeat;
    padding: 0 100px;
    box-sizing: border-box;
    margin-top: 20px;
}

.hero-content-new {
    max-width: 650px;
    padding: 40px 0;
    text-align: left;
    z-index: 2;
}

.hero-super-title {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.25em;
    color: #c49a96;
    margin-bottom: 25px;
    text-transform: uppercase;
    font-weight: 600;
}

.hero-title-new {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 4.5rem;
    color: #333333;
    line-height: 1.15;
    font-weight: 400;
    margin-bottom: 25px;
}

.hero-cursive-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    color: #d4a3a3;
    font-weight: 400;
}

.hero-desc-new {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    color: #555555;
    line-height: 1.7;
    margin-bottom: 40px;
    max-width: 90%;
}

.hero-buttons-new {
    display: flex;
    gap: 20px;
    margin-bottom: 60px;
}

.btn-solid-new {
    background-color: #d4a3a3;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-solid-new:hover {
    background-color: #b38282;
}

.btn-outline-new {
    background-color: transparent;
    color: #333;
    padding: 16px 32px;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    font-weight: 600;
    border: 1px solid #d4a3a3;
    transition: all 0.3s ease;
}

.btn-outline-new:hover {
    background-color: rgba(212, 163, 163, 0.1);
}

.hero-icons-new {
    display: flex;
    gap: 50px;
}

.icon-item-new {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.icon-item-new i {
    font-size: 1.6rem;
    color: #d4a3a3;
}

.icon-item-new span {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #333;
}

@media (max-width: 768px) {
    .hero-new {
        padding: 60px 20px;
        background-image: linear-gradient(to bottom, #faf5f0 55%, rgba(250, 245, 240, 0.9) 70%, transparent 100%), url('images/hero/dental.jpg');
        background-position: center bottom;
        align-items: flex-start;
    }
    .hero-title-new {
        font-size: 3.2rem;
    }
    .hero-buttons-new {
        flex-direction: column;
        gap: 15px;
    }
    .hero-icons-new {
        flex-direction: column;
        gap: 25px;
        align-items: flex-start;
    }
    .icon-item-new {
        flex-direction: row;
        align-items: center;
        gap: 20px;
    }
}
`;
fs.appendFileSync('style.css', newCss);
console.log('Update Complete');
