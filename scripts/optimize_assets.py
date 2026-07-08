import os
import subprocess
from PIL import Image

def get_size_kb(filepath):
    return round(os.path.getsize(filepath) / 1024, 2)

def compress_webp_image(filepath, max_width=1920, quality=75):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    
    original_size = get_size_kb(filepath)
    try:
        with Image.open(filepath) as img:
            # Check dimensions and resize if necessary
            w, h = img.size
            if w > max_width:
                ratio = max_width / float(w)
                new_h = int(float(h) * ratio)
                img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
                print(f"Resized {os.path.basename(filepath)} from {w}x{h} to {max_width}x{new_h}")
            
            # Save compressed webp
            img.save(filepath, "WEBP", quality=quality, method=6)
        
        compressed_size = get_size_kb(filepath)
        reduction = round(((original_size - compressed_size) / original_size) * 100, 2)
        print(f"Compressed {os.path.basename(filepath)}: {original_size} KB -> {compressed_size} KB ({reduction}% reduction)")
    except Exception as e:
        print(f"Error compressing {filepath}: {e}")

def compress_other_image(filepath, max_width=1920, quality=75):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    original_size = get_size_kb(filepath)
    try:
        with Image.open(filepath) as img:
            w, h = img.size
            if w > max_width:
                ratio = max_width / float(w)
                new_h = int(float(h) * ratio)
                img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
            
            # Keep original format
            fmt = img.format if img.format else "JPEG"
            if fmt == "PNG":
                img.save(filepath, "PNG", optimize=True)
            else:
                img.save(filepath, fmt, quality=quality, optimize=True)
                
        compressed_size = get_size_kb(filepath)
        reduction = round(((original_size - compressed_size) / original_size) * 100, 2)
        print(f"Compressed {os.path.basename(filepath)} ({fmt}): {original_size} KB -> {compressed_size} KB ({reduction}% reduction)")
    except Exception as e:
        print(f"Error compressing {filepath}: {e}")

def compress_video_ffmpeg(filepath, quality_crf=28):
    if not os.path.exists(filepath):
        print(f"Video file not found: {filepath}")
        return
    
    original_size = get_size_kb(filepath)
    temp_filepath = filepath.replace(".mp4", "_temp.mp4")
    
    print(f"Compressing video {os.path.basename(filepath)} using ffmpeg...")
    cmd = [
        "ffmpeg", "-i", filepath,
        "-vcodec", "libx264",
        "-crf", str(quality_crf),
        "-preset", "fast",
        "-acodec", "aac",
        "-b:a", "128k",
        temp_filepath,
        "-y"
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if os.path.exists(temp_filepath):
            os.replace(temp_filepath, filepath)
            compressed_size = get_size_kb(filepath)
            reduction = round(((original_size - compressed_size) / original_size) * 100, 2)
            print(f"Compressed {os.path.basename(filepath)}: {original_size/1024:.2f} MB -> {compressed_size/1024:.2f} MB ({reduction}% reduction)")
        else:
            print("Failed to replace video: temp file not found.")
    except Exception as e:
        print(f"Error compressing video with ffmpeg: {e}")

if __name__ == "__main__":
    # Compress Hero Images
    for i in range(1, 6):
        compress_webp_image(f"public/hero{i}.webp")
    
    # Compress other large images
    compress_other_image("public/about-hero-image.png")
    compress_webp_image("public/faq.webp")
    compress_other_image("public/top galle.jpg")
    
    # Compress contact video
    compress_video_ffmpeg("public/contact-hero.mp4")
