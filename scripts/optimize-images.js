const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const imageExtensions = ['.jpg', '.jpeg', '.png'];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, '/', file));
        }
    });

    return arrayOfFiles;
}

async function optimizeImages() {
    console.log('Starting image optimization...');
    const allFiles = getAllFiles(publicDir, []);

    for (const file of allFiles) {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
            const stats = fs.statSync(file);
            // Skip if file is already small (e.g. < 50KB) or optimized
            if (stats.size < 50 * 1024) continue;

            console.log(`Optimizing: ${file} (${(stats.size / 1024).toFixed(2)} KB)`);

            try {
                const buffer = await sharp(file)
                    .resize({ width: 1920, withoutEnlargement: true }) // Limit max width
                    .jpeg({ quality: 80, mozjpeg: true })
                    .png({ quality: 80, compressionLevel: 8 })
                    .toBuffer();

                fs.writeFileSync(file, buffer);
                const newStats = fs.statSync(file);
                console.log(`Saved: ${file} (${(newStats.size / 1024).toFixed(2)} KB) - saved ${((stats.size - newStats.size) / 1024).toFixed(2)} KB`);
            } catch (err) {
                console.error(`Error optimizing ${file}:`, err.message);
            }
        }
    }
    console.log('Image optimization complete.');
}

optimizeImages();
