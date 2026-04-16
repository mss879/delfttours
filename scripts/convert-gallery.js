const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../public/Gallery page Delft');
const outputDir = path.join(__dirname, '../public/gallery');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const imageFiles = files.filter(f => /\.(jpe?g|png)$/i.test(f));
  
  if (imageFiles.length === 0) {
    console.log('No images found to convert.');
    return;
  }

  console.log(`Found ${imageFiles.length} images. Starting conversion...`);

  imageFiles.forEach(file => {
    const inputPath = path.join(inputDir, file);
    // Slugify filename
    const nameWithoutExt = path.parse(file).name;
    const slugifiedName = nameWithoutExt.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const outputPath = path.join(outputDir, `${slugifiedName}.webp`);

    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(info => {
        console.log(`Converted: ${file} -> ${slugifiedName}.webp (${info.size} bytes)`);
      })
      .catch(err => {
        console.error(`Error converting ${file}:`, err);
      });
  });
});
