const fs = require('fs');
const path = require('path');
const https = require('https');
const { pipeline } = require('stream');
const { promisify } = require('util');

const streamPipeline = promisify(pipeline);

const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets', 'external');
const FLAGS_DIR = path.join(__dirname, '..', 'public', 'assets', 'flags');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}
if (!fs.existsSync(FLAGS_DIR)) {
    fs.mkdirSync(FLAGS_DIR, { recursive: true });
}

const assets = [
    // Gallery Section - Top
    { url: 'https://framerusercontent.com/images/MCPK7p5lTLN6GtYpPFkZlnYj0.png', name: 'gallery-top-1.png' },
    { url: 'https://framerusercontent.com/images/irxbxcWqTT1XF46oYdrlKLmKfOE.png', name: 'gallery-top-2.png' },
    { url: 'https://framerusercontent.com/images/0cyrgdyFgH4HXcbQey3Id3OdM.png', name: 'gallery-top-3.png' },
    { url: 'https://framerusercontent.com/images/qzaQswFpybM7ehhvBpCnIyQR1D0.png', name: 'gallery-top-4.png' },
    { url: 'https://framerusercontent.com/images/0YhgQURqbt0V1jk5DnLxnr8lQGM.png', name: 'gallery-top-5.png' },
    { url: 'https://framerusercontent.com/images/NIOzuaQtTENMPhLTK3Aq3wMU3q0.png', name: 'gallery-top-6.png' },

    // Gallery Section - Bottom
    { url: 'https://framerusercontent.com/images/aXMmKMkmbaftgXqgLW6l6Ne4Yw.jpg', name: 'gallery-bottom-1.jpg' },
    { url: 'https://framerusercontent.com/images/dW9aMqWFmgP5lFVORYj19sfPXlc.jpg', name: 'gallery-bottom-2.jpg' },
    { url: 'https://framerusercontent.com/images/I8tMu3NoQxnNKS3uTWK08UyrtU.jpg', name: 'gallery-bottom-3.jpg' },
    { url: 'https://framerusercontent.com/images/LLXplKFJHbnVubPwKelRdMqHmkI.jpg', name: 'gallery-bottom-4.jpg' },
    { url: 'https://framerusercontent.com/images/bWR2wFJxD0uj0cXXJhXUQOFMJU.jpg', name: 'gallery-bottom-5.jpg' },
    { url: 'https://framerusercontent.com/images/VyUdS5a2DU5hdC28yUIwCzIq43E.jpg', name: 'gallery-bottom-6.jpg' },

    // Hero Section
    { url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80', name: 'hero-slide-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1600&q=80', name: 'hero-slide-2.jpg' },
    // Hero Reviews
    { url: 'https://framerusercontent.com/images/mTpOnAfGxjZE7Z7TD3u2q9l1nG0.svg', name: 'review-logo-1.svg' },
    { url: 'https://framerusercontent.com/images/HuoVn1mDCC4O7up0AjLEAe3EQ0o.svg', name: 'review-logo-2.svg' },
    { url: 'https://framerusercontent.com/images/irZerHv0KOVqAzYvSe5OSulXw.svg', name: 'review-logo-3.svg' },

    // Why Choose Section
    { url: 'https://framerusercontent.com/images/yOKwFdFKY3vjnBjIFSHsbvJtGEw.svg', name: 'feature-icon-1.svg' },
    { url: 'https://framerusercontent.com/images/xDlIioBbdkjqzyh8Xb7gwdIkME.svg', name: 'feature-icon-2.svg' },
    { url: 'https://framerusercontent.com/images/i9CGUTJ7W9zjCZqQzogEhO50rC8.svg', name: 'feature-icon-3.svg' },
    { url: 'https://framerusercontent.com/images/qaMqFMP6O0oJf1VF1GJxGHX0vi8.svg', name: 'feature-icon-4.svg' },
    { url: 'https://framerusercontent.com/assets/0OHtSMgrBACOp6V9EqV3e6KtlSQ.mp4', name: 'why-choose-video.mp4' },

    // Header Flags
    { url: 'https://flagcdn.com/w40/lk.png', name: 'flag-lk.png', dir: FLAGS_DIR },
    { url: 'https://flagcdn.com/w40/us.png', name: 'flag-us.png', dir: FLAGS_DIR },
    { url: 'https://flagcdn.com/w40/eu.png', name: 'flag-eu.png', dir: FLAGS_DIR },
    { url: 'https://flagcdn.com/w40/gb.png', name: 'flag-gb.png', dir: FLAGS_DIR },
    { url: 'https://flagcdn.com/w40/au.png', name: 'flag-au.png', dir: FLAGS_DIR },
];

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode >= 400) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            const fileStream = fs.createWriteStream(dest);
            streamPipeline(response, fileStream)
                .then(() => resolve())
                .catch(reject);
        }).on('error', reject);
    });
}

async function main() {
    console.log('Starting asset download...');

    for (const asset of assets) {
        const dir = asset.dir || ASSETS_DIR;
        const dest = path.join(dir, asset.name);

        if (fs.existsSync(dest)) {
            console.log(`Skipping ${asset.name} (already exists)`);
            continue;
        }

        console.log(`Downloading ${asset.name}...`);
        try {
            await downloadFile(asset.url, dest);
            console.log(`Downloaded ${asset.name}`);
        } catch (err) {
            console.error(`Error downloading ${asset.name}:`, err.message);
        }
    }

    console.log('Asset download complete.');
}

main();
