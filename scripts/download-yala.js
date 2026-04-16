const https = require('https');
const fs = require('fs');

const urls = [
  { url: "https://d2xmwf00c85p5s.cloudfront.net/shutterstock_2115574874_6b314e1675.jpg", path: "public/YALA/Sri Lankan Leopard.jpg" },
  { url: "https://d2xmwf00c85p5s.cloudfront.net/shutterstock_719873488_940b73f13f.jpg", path: "public/YALA/Sloth Bear.jpg" },
  { url: "https://d2xmwf00c85p5s.cloudfront.net/shutterstock_2646662551_6750011d6b.jpg", path: "public/YALA/Mugger Crocodile.jpg" },
  { url: "https://d2xmwf00c85p5s.cloudfront.net/shutterstock_2432394461_34b5420d71.jpg", path: "public/YALA/Elephants in Sri Lanka.jpg" },
  { url: "https://d2xmwf00c85p5s.cloudfront.net/shutterstock_2652851609_c663c4d935.jpg", path: "public/YALA/Kataragama Hindu Temple.jpg" },
  { url: "https://d2xmwf00c85p5s.cloudfront.net/download_fc30406590.webp", path: "public/YALA/Jungle Sundowner.webp" }
];

const download = (url, dest) => new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
        hostname: parsed.hostname,
        path: parsed.pathname,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
        }
    };
    https.get(options, (res) => {
        if (res.statusCode === 200 || res.statusCode === 201) {
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        } else {
            console.log(`Failed ${url}: ${res.statusCode}`);
            reject(`Failed with ${res.statusCode}`);
        }
    }).on('error', (err) => {
        console.log(`Error ${url}: ${err.message}`);
        reject(err);
    });
});

fs.mkdirSync('public/YALA', { recursive: true });

async function run() {
    for (const item of urls) {
        try {
            if (fs.existsSync(item.path) && fs.statSync(item.path).size > 0) continue; // skip already downloaded
            console.log("Downloading", item.path);
            await download(item.url, item.path);
            console.log("Downloaded", item.path);
        } catch (e) {
            console.error(e);
        }
    }
}

run();
