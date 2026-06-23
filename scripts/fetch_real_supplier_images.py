import os
import re
import json
import urllib.request
import urllib.parse
import shutil
import time

# Mapping from case-insensitive model substrings to direct FPT Shop / CellphoneS product URLs
URL_MAPPING = {
    # Apple
    "iphone 17 pro max": "https://cellphones.com.vn/iphone-16-pro-max.html",
    "iphone 16 pro max": "https://cellphones.com.vn/iphone-16-pro-max.html",
    "iphone 15 pro max": "https://cellphones.com.vn/iphone-15-pro-max.html",
    "iphone 17 pro": "https://cellphones.com.vn/iphone-16-pro.html",
    "iphone 16 pro": "https://cellphones.com.vn/iphone-16-pro.html",
    "iphone 17 slim": "https://cellphones.com.vn/iphone-16.html",
    "iphone 17": "https://cellphones.com.vn/iphone-16.html",
    "iphone 16 plus": "https://cellphones.com.vn/iphone-16-plus.html",
    "iphone 16": "https://cellphones.com.vn/iphone-16.html",
    "iphone se 4": "https://cellphones.com.vn/iphone-se-2022.html",

    # Samsung
    "galaxy s26 ultra": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-s24-ultra",
    "galaxy s25 ultra": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-s24-ultra",
    "galaxy s24 ultra": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-s24-ultra",
    "galaxy s26 plus": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-s24-plus",
    "galaxy s26": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-s24",
    "galaxy s25": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-s24",
    "galaxy z fold7": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-z-fold6",
    "galaxy z flip7": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-z-flip6",
    "galaxy a55": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-a55-5g",
    "galaxy a35": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-a35-5g",
    "galaxy a15": "https://fptshop.com.vn/dien-thoai/samsung-galaxy-a15",

    # Xiaomi
    "xiaomi 16 ultra": "https://fptshop.com.vn/dien-thoai/xiaomi-14-ultra",
    "xiaomi 16": "https://fptshop.com.vn/dien-thoai/xiaomi-14",
    "xiaomi 15 pro": "https://fptshop.com.vn/dien-thoai/xiaomi-14-ultra",
    "xiaomi 15": "https://fptshop.com.vn/dien-thoai/xiaomi-14",
    "redmi note 15 pro plus": "https://fptshop.com.vn/dien-thoai/xiaomi-redmi-note-13-pro-plus",
    "redmi note 15 pro": "https://fptshop.com.vn/dien-thoai/xiaomi-redmi-note-13-pro",
    "redmi note 14 pro plus": "https://fptshop.com.vn/dien-thoai/xiaomi-redmi-note-13-pro-plus",
    "poco f7 pro": "https://fptshop.com.vn/dien-thoai/poco-f6-pro",
    "redmi 14c": "https://fptshop.com.vn/dien-thoai/xiaomi-redmi-14c",
    "redmi a3": "https://fptshop.com.vn/dien-thoai/xiaomi-redmi-a3",

    # OPPO
    "find x8 ultra": "https://cellphones.com.vn/oppo-find-x7-ultra.html",
    "find x7 ultra": "https://cellphones.com.vn/oppo-find-x7-ultra.html",
    "find n3 fold": "https://cellphones.com.vn/oppo-find-n3.html",
    "reno14 pro": "https://fptshop.com.vn/dien-thoai/oppo-reno12-5g",
    "reno14": "https://fptshop.com.vn/dien-thoai/oppo-reno12-5g",
    "reno13 pro": "https://fptshop.com.vn/dien-thoai/oppo-reno12-5g",
    "reno13": "https://fptshop.com.vn/dien-thoai/oppo-reno12-5g",
    "oppo a3 pro": "https://fptshop.com.vn/dien-thoai/oppo-a3",
    "oppo a3": "https://fptshop.com.vn/dien-thoai/oppo-a3",
    "oppo a18": "https://fptshop.com.vn/dien-thoai/oppo-a18",

    # vivo
    "vivo x200 pro": "https://fptshop.com.vn/dien-thoai/vivo-v40",
    "vivo x100 ultra": "https://fptshop.com.vn/dien-thoai/vivo-v40",
    "vivo v40 pro": "https://fptshop.com.vn/dien-thoai/vivo-v40-lite",
    "vivo v40 lite": "https://fptshop.com.vn/dien-thoai/vivo-v40-lite",
    "vivo v30 pro": "https://fptshop.com.vn/dien-thoai/vivo-v30-pro",
    "vivo y100": "https://fptshop.com.vn/dien-thoai/vivo-y100",
    "vivo y200": "https://fptshop.com.vn/dien-thoai/vivo-y100",
    "vivo y18s": "https://fptshop.com.vn/dien-thoai/vivo-y03",
    "vivo y03": "https://fptshop.com.vn/dien-thoai/vivo-y03",
    "vivo t3 ultra": "https://fptshop.com.vn/dien-thoai/vivo-v30",

    # realme
    "realme gt6": "https://cellphones.com.vn/realme-gt6.html",
    "realme 13 pro plus": "https://fptshop.com.vn/dien-thoai/realme-12-pro-plus",
    "realme 12 pro plus": "https://fptshop.com.vn/dien-thoai/realme-12-pro-plus",
    "realme c67": "https://fptshop.com.vn/dien-thoai/realme-c67",
    "realme c65": "https://fptshop.com.vn/dien-thoai/realme-c67",
    "realme c61": "https://fptshop.com.vn/dien-thoai/realme-c67",
    "realme c53": "https://fptshop.com.vn/dien-thoai/realme-c67",
    "realme note 60": "https://fptshop.com.vn/dien-thoai/realme-note-60",
    "realme note 50": "https://fptshop.com.vn/dien-thoai/realme-note-60",
    "realme gt5 pro": "https://cellphones.com.vn/realme-gt5-pro.html",

    # Nokia
    "nokia xr21": "https://fptshop.com.vn/dien-thoai/nokia-c32",
    "nokia g42": "https://fptshop.com.vn/dien-thoai/nokia-c32",
    "nokia g22": "https://fptshop.com.vn/dien-thoai/nokia-g22",
    "nokia c32": "https://fptshop.com.vn/dien-thoai/nokia-c32",
    "nokia c12": "https://fptshop.com.vn/dien-thoai/nokia-c32",
    "nokia 105": "https://fptshop.com.vn/dien-thoai/nokia-105-4g-pro",
    "nokia 110": "https://fptshop.com.vn/dien-thoai/nokia-105-4g-pro",
    "nokia 2660": "https://fptshop.com.vn/dien-thoai/nokia-105-4g-pro",
    "nokia 8210": "https://fptshop.com.vn/dien-thoai/nokia-105-4g-pro",
    "nokia 5710": "https://fptshop.com.vn/dien-thoai/nokia-105-4g-pro",

    # Tecno
    "tecno phantom v fold2": "https://cellphones.com.vn/tecno-phantom-v-fold-5g.html",
    "tecno phantom v flip2": "https://cellphones.com.vn/tecno-phantom-v-fold-5g.html",
    "tecno camon 30 premier": "https://cellphones.com.vn/tecno-camon-30-premier.html",
    "tecno camon 30 pro": "https://cellphones.com.vn/tecno-camon-30-premier.html",
    "tecno pova 6 pro": "https://cellphones.com.vn/tecno-pova-6-pro.html",
    "tecno pova 5 pro": "https://cellphones.com.vn/tecno-pova-6-pro.html",
    "tecno spark 20 pro plus": "https://fptshop.com.vn/dien-thoai/tecno-spark-20-pro-plus",
    "tecno spark 20": "https://fptshop.com.vn/dien-thoai/tecno-spark-20",
    "tecno spark go": "https://fptshop.com.vn/dien-thoai/tecno-spark-20",
    "tecno pop 8": "https://fptshop.com.vn/dien-thoai/tecno-pop-8",

    # HONOR
    "honor magic6 pro": "https://fptshop.com.vn/dien-thoai/honor-magic6-pro",
    "honor magic v2": "https://fptshop.com.vn/dien-thoai/honor-magic-v2",
    "honor 200 pro": "https://fptshop.com.vn/dien-thoai/honor-200-pro",
    "honor 200": "https://fptshop.com.vn/dien-thoai/honor-200",
    "honor 90": "https://fptshop.com.vn/dien-thoai/honor-200",
    "honor x9b": "https://fptshop.com.vn/dien-thoai/honor-x9b",
    "honor x8b": "https://fptshop.com.vn/dien-thoai/honor-x8b",
    "honor x7b": "https://fptshop.com.vn/dien-thoai/honor-x8b",
    "honor x6a": "https://fptshop.com.vn/dien-thoai/honor-x8b",
    "honor magic6 lite": "https://fptshop.com.vn/dien-thoai/honor-x9b",

    # Motorola
    "motorola edge 50 ultra": "https://cellphones.com.vn/motorola-edge-50-ultra.html",
    "motorola edge 50 pro": "https://cellphones.com.vn/motorola-edge-50-ultra.html",
    "motorola edge 50 fusion": "https://cellphones.com.vn/motorola-edge-50-ultra.html",
    "motorola edge 40 neo": "https://cellphones.com.vn/motorola-edge-50-ultra.html",
    "motorola razr 50 ultra": "https://cellphones.com.vn/motorola-razr-40-ultra.html",
    "motorola razr 50": "https://cellphones.com.vn/motorola-razr-40-ultra.html",
    "motorola moto g85": "https://cellphones.com.vn/motorola-moto-g54.html",
    "motorola moto g54": "https://cellphones.com.vn/motorola-moto-g54.html",
    "motorola moto g24": "https://cellphones.com.vn/motorola-moto-g54.html",
    "motorola moto g14": "https://cellphones.com.vn/motorola-moto-g54.html",

    # Masstel
    "masstel fami 60": "https://fptshop.com.vn/dien-thoai/masstel-fami-60",
    "masstel fami 12": "https://fptshop.com.vn/dien-thoai/masstel-fami-60",
    "masstel fami 50": "https://fptshop.com.vn/dien-thoai/masstel-fami-60",
    "masstel izi 10": "https://fptshop.com.vn/dien-thoai/masstel-izi-30",
    "masstel izi 20": "https://fptshop.com.vn/dien-thoai/masstel-izi-30",
    "masstel izi 30": "https://fptshop.com.vn/dien-thoai/masstel-izi-30",
    "masstel izi 12": "https://fptshop.com.vn/dien-thoai/masstel-izi-30",
    "masstel izi 32": "https://fptshop.com.vn/dien-thoai/masstel-izi-30",
    "masstel izi 55": "https://fptshop.com.vn/dien-thoai/masstel-izi-30",
    "masstel hapi 30": "https://fptshop.com.vn/dien-thoai/masstel-hapi-30",

    # Mobell
    "mobell rock 4": "https://fptshop.com.vn/dien-thoai/mobell-rock-4",
    "mobell m529": "https://fptshop.com.vn/dien-thoai/mobell-rock-4",
    "mobell m229": "https://fptshop.com.vn/dien-thoai/mobell-rock-4",
    "mobell m389": "https://fptshop.com.vn/dien-thoai/mobell-rock-4",
    "mobell f209": "https://fptshop.com.vn/dien-thoai/mobell-rock-4",
    "mobell f309": "https://fptshop.com.vn/dien-thoai/mobell-rock-4",
    "mobell nova p3": "https://fptshop.com.vn/dien-thoai/mobell-nova-p3",
    "mobell nova s3": "https://fptshop.com.vn/dien-thoai/mobell-nova-p3",
    "mobell s40": "https://fptshop.com.vn/dien-thoai/mobell-nova-p3",
    "mobell s41": "https://fptshop.com.vn/dien-thoai/mobell-nova-p3",

    # Nubia
    "nubia redmagic 9s pro": "https://cellphones.com.vn/nubia-redmagic-9s-pro.html",
    "nubia redmagic 9 pro": "https://cellphones.com.vn/nubia-redmagic-9s-pro.html",
    "nubia redmagic 8s pro": "https://cellphones.com.vn/nubia-redmagic-9s-pro.html",
    "nubia z60 ultra": "https://cellphones.com.vn/nubia-z60-ultra.html",
    "nubia z50s pro": "https://cellphones.com.vn/nubia-z60-ultra.html",
    "nubia focus pro": "https://cellphones.com.vn/nubia-neo-2.html",
    "nubia neo 2": "https://cellphones.com.vn/nubia-neo-2.html",
    "nubia focus": "https://cellphones.com.vn/nubia-neo-2.html",
    "nubia neo": "https://cellphones.com.vn/nubia-neo-2.html",
    "nubia music": "https://cellphones.com.vn/nubia-neo-2.html",
}

CACHE_DIR = "data/image_cache/supplier"
BASE_DIR = "data/dienthoai"

def get_html(url):
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def download_image(img_url, dest_path):
    # Ensure folder exists
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    
    req = urllib.request.Request(
        img_url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            data = response.read()
        if len(data) > 100: # Valid image check
            with open(dest_path, "wb") as f:
                f.write(data)
            return True
    except Exception as e:
        print(f"Error downloading {img_url}: {e}")
    return False

def extract_images_from_html(html, url):
    image_urls = []
    
    if "cellphones.com.vn" in url:
        # CellphoneS: Look for catalog/product images
        matches = re.findall(r'/media/catalog/product/[^\s\"\'<>]*?\.(?:png|jpg|jpeg|webp)', html)
        for path in matches:
            img_url = f"https://cdn2.cellphones.com.vn/x{path}"
            # Clean url just in case
            if img_url not in image_urls:
                image_urls.append(img_url)
    elif "fptshop.com.vn" in url:
        # FPT Shop: Look for unsafe images
        matches = re.findall(r'https?://cdn2\.fptshop\.com\.vn/unsafe/[^\s\"\'<>]*?\.(?:png|jpg|jpeg|webp)', html)
        for img_url in matches:
            lower_url = img_url.lower()
            # Ignore icons, logos, banners, decorations, etc.
            if any(k in lower_url for k in ["icon", "logo", "avatar", "banner", "goi_y", "goi-y", "promotion", "badge", "sticker", "indicator", "small"]):
                continue
                
            # Filter by unsafe width
            size_match = re.search(r'/unsafe/(\d+)x(\d+)/', img_url)
            if not size_match:
                size_match = re.search(r'/unsafe/(\d+)x0/', img_url)
            if size_match:
                width = int(size_match.group(1))
                if width < 300:
                    continue # Skip small images
            
            # Skip if filename contains dimension patterns (e.g. 507x85)
            filename = img_url.split('/')[-1]
            if re.search(r'\d+x\d+', filename):
                continue
                    
            if img_url not in image_urls:
                image_urls.append(img_url)
                
    return image_urls

def get_cached_images(key, url):
    key_slug = key.replace(" ", "-")
    key_cache_dir = os.path.join(CACHE_DIR, key_slug)
    
    # If cache exists with at least 1 image, return them
    if os.path.exists(key_cache_dir):
        files = [f for f in os.listdir(key_cache_dir) if f.startswith(("front.", "back.", "detail."))]
        if len(files) >= 1:
            print(f"Using cached images for '{key}'")
            return [os.path.join(key_cache_dir, f) for f in sorted(files)]
            
    print(f"Downloading images for '{key}' from {url}")
    html = get_html(url)
    if not html:
        return []
        
    img_urls = extract_images_from_html(html, url)
    if not img_urls:
        print(f"No images found on page {url}")
        return []
        
    os.makedirs(key_cache_dir, exist_ok=True)
    cached_paths = []
    
    # Download up to 3 images
    names = ["front", "back", "detail"]
    downloaded_count = 0
    
    for i, img_url in enumerate(img_urls):
        if downloaded_count >= 3:
            break
            
        ext = os.path.splitext(urllib.parse.urlparse(img_url).path)[1]
        if not ext:
            ext = ".png" # default
            
        dest_filename = f"{names[downloaded_count]}{ext}"
        dest_path = os.path.join(key_cache_dir, dest_filename)
        
        print(f"Downloading [{names[downloaded_count]}] {img_url} ...")
        success = download_image(img_url, dest_path)
        if success:
            cached_paths.append(dest_path)
            downloaded_count += 1
            time.sleep(0.5) # small delay between image downloads
            
    return cached_paths

def main():
    import sys
    if sys.platform.startswith('win'):
        sys.stdout.reconfigure(encoding='utf-8')
    print("Starting crawl of real supplier product images...")
    
    if not os.path.exists(BASE_DIR):
        print(f"Base directory {BASE_DIR} does not exist. Run generate_seed_data.py first.")
        return
        
    os.makedirs(CACHE_DIR, exist_ok=True)
    
    total_processed = 0
    updated_count = 0
    fallback_count = 0
    
    # Scan through all brands and model directories
    for brand in os.listdir(BASE_DIR):
        brand_path = os.path.join(BASE_DIR, brand)
        if not os.path.isdir(brand_path):
            continue
            
        print(f"\nProcessing brand: {brand}")
        
        for model_slug in os.listdir(brand_path):
            model_path = os.path.join(brand_path, model_slug)
            if not os.path.isdir(model_path):
                continue
                
            data_json_path = os.path.join(model_path, "data.json")
            if not os.path.exists(data_json_path):
                continue
                
            total_processed += 1
            
            with open(data_json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            model_name = data.get("san_pham", "")
            print(f" - Product: {model_name} (slug: {model_slug})")
            
            # Find matching URL mapping
            matched_key = None
            for key in sorted(URL_MAPPING.keys(), key=len, reverse=True):
                if key in model_name.lower():
                    matched_key = key
                    break
                    
            if not matched_key:
                print(f"   WARNING: No URL mapping found for '{model_name}'. Keeping existing images.")
                fallback_count += 1
                continue
                
            target_url = URL_MAPPING[matched_key]
            
            # Fetch or get cached images
            cached_files = get_cached_images(matched_key, target_url)
            if not cached_files:
                print(f"   WARNING: Failed to fetch images for '{model_name}'. Keeping existing images.")
                fallback_count += 1
                continue
                
            # Copy cached files to the model's images/ directory
            dest_images_dir = os.path.join(model_path, "images")
            
            # Delete old image files first to prevent clutter
            try:
                if os.path.exists(dest_images_dir):
                    # Delete all files in the images folder
                    for f in os.listdir(dest_images_dir):
                        file_path = os.path.join(dest_images_dir, f)
                        if os.path.isfile(file_path):
                            os.remove(file_path)
                else:
                    os.makedirs(dest_images_dir, exist_ok=True)
            except Exception as e:
                print(f"   WARNING: Error cleaning images folder: {e}")
                
            copied_relative_paths = []
            
            # Copy new files
            for cached_file in cached_files:
                filename = os.path.basename(cached_file)
                dest_file_path = os.path.join(dest_images_dir, filename)
                try:
                    shutil.copy2(cached_file, dest_file_path)
                    
                    # Create the relative path from workspace root
                    rel_path = f"data/dienthoai/{brand}/{model_slug}/images/{filename}"
                    copied_relative_paths.append(rel_path)
                except Exception as e:
                    print(f"   WARNING: Error copying {cached_file}: {e}")
                    
            if copied_relative_paths:
                # Update data.json
                data["media"]["images"] = copied_relative_paths
                
                # Write back data.json
                try:
                    with open(data_json_path, "w", encoding="utf-8") as f:
                        json.dump(data, f, ensure_ascii=False, indent=2)
                    print(f"   SUCCESS: Updated {len(copied_relative_paths)} images.")
                    updated_count += 1
                except Exception as e:
                    print(f"   ERROR: Failed to write back data.json: {e}")
            else:
                print("   WARNING: No images copied. Keeping existing paths.")
                fallback_count += 1
                
            # sleep a bit between products to be polite to servers
            time.sleep(0.1)
            
    print("\n--- Crawl & Update Summary ---")
    print(f"Total processed products: {total_processed}")
    print(f"Successfully updated with supplier images: {updated_count}")
    print(f"Kept fallback images (Unsplash): {fallback_count}")
    print("Done!")

if __name__ == "__main__":
    main()
