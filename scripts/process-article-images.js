const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    { src: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\first_timers_sri_lanka_1776511306355.png', dest: 'first-timers-sri-lanka.webp' },
    { src: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\wildlife_safari_sri_lanka_1776511324593.png', dest: 'wildlife-safari-sri-lanka.webp' },
    { src: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\honeymoon_sri_lanka_1776511350876.png', dest: 'honeymoon-sri-lanka.webp' },
    { src: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\cultural_triangle_sri_lanka_1776511369125.png', dest: 'cultural-triangle-sri-lanka.webp' },
    { src: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\beach_hopping_sri_lanka_1776511387218.png', dest: 'beach-hopping-sri-lanka.webp' }
];

const destFolder = 'public/article_images';
if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
}

async function processImages() {
    for (const img of images) {
        try {
            await sharp(img.src)
                .webp({ quality: 80 })
                .toFile(path.join(destFolder, img.dest));
            console.log(`Successfully converted ${img.dest}`);
        } catch (error) {
            console.error(`Error converting ${img.src}:`, error);
        }
    }
}

processImages();
