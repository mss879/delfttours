const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processWideImages() {
  const images = [
    {
      input: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\wide_first_timers_1776514116966.png',
      output: 'public/article_images/first-timers-sri-lanka.webp'
    },
    {
      input: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\wide_wildlife_1776514132418.png',
      output: 'public/article_images/wildlife-safari-sri-lanka.webp'
    },
    {
      input: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\wide_honeymoon_1776514148207.png',
      output: 'public/article_images/honeymoon-sri-lanka.webp'
    },
    {
      input: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\wide_culture_1776514162455.png',
      output: 'public/article_images/cultural-triangle-sri-lanka.webp'
    },
    {
      input: 'C:\\Users\\Shahid\\.gemini\\antigravity\\brain\\61f8a4dc-96e1-498e-af1f-ab5ed6a6b2a6\\wide_beach_1776514180164.png',
      output: 'public/article_images/beach-hopping-sri-lanka.webp'
    }
  ];

  for (const img of images) {
    if (!fs.existsSync(img.input)) {
      console.log(`Skipping \${img.input} - not found`);
      continue;
    }

    try {
      await sharp(img.input)
        .webp({ quality: 85 })
        .toFile(path.join(process.cwd(), img.output));
      console.log(`Successfully generated \${img.output}`);
    } catch (err) {
      console.error(`Failed to generate \${img.output}:`, err);
    }
  }
}

processWideImages();
