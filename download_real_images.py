import os
import subprocess
import time
import random

packages = [
    {"id": "SL-3D2N-CTY-01", "keywords": "colombo,city,srilanka"},
    {"id": "SL-4D3N-STD-01", "keywords": "tea,plantation,srilanka"},
    {"id": "SL-5D4N-STD-01", "keywords": "kandy,temple,srilanka"},
    {"id": "SL-5D4N-STD-02", "keywords": "sigiriya,rock,srilanka"},
    {"id": "SL-5D4N-WLD-03", "keywords": "elephant,safari,srilanka"},
    {"id": "SL-5D4N-BCH-04", "keywords": "beach,tropical,srilanka"},
    {"id": "SL-5D4N-STD-05", "keywords": "river,nature,srilanka"},
    {"id": "SL-5D4N-HNM-06", "keywords": "couple,sunset,beach"},
    {"id": "SL-6D5N-STD-01", "keywords": "bridge,train,ella"},
    {"id": "SL-6D5N-STD-02", "keywords": "snorkeling,ocean,srilanka"},
    {"id": "SL-6D5N-WLD-03", "keywords": "leopard,yala,srilanka"},
    {"id": "SL-7D6N-HNM-01", "keywords": "honeymoon,romantic,srilanka"},
    {"id": "SL-7D6N-NGBE-02", "keywords": "ancient,ruins,srilanka"},
    {"id": "SL-7D6N-STD-02", "keywords": "culture,dance,srilanka"},
    {"id": "SL-9D8N-STD-01", "keywords": "island,coast,palm"}
]

output_dir = "public/package-previews"
os.makedirs(output_dir, exist_ok=True)

for pkg in packages:
    # Add a random query param to ensure uniqueness if keywords are similar
    random_id = random.randint(1, 1000)
    url = f"https://loremflickr.com/800/600/{pkg['keywords']}?random={random_id}"
    filename = f"{pkg['id']}.jpg"
    filepath = os.path.join(output_dir, filename)
    
    print(f"Downloading {filename} from {url}...")
    
    # Use curl.exe directly
    try:
        subprocess.run(["curl.exe", "-L", "-o", filepath, url, "-A", "Mozilla/5.0"], check=True)
        print(f"Downloaded {filename}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to download {filename}: {e}")
    
    # Sleep to avoid rate limiting
    time.sleep(1)
