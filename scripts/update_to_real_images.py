import os
import json
import urllib.request
import shutil
import sys

# Reconfigure stdout for UTF-8 to prevent console encoding errors on Windows
sys.stdout.reconfigure(encoding='utf-8')

# Curated high-quality real smartphone images from Unsplash
IMAGE_POOL_URLS = {
    "iphone_front": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    "iphone_back": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80",
    "iphone_detail": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    
    "samsung_front": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    "samsung_back": "https://images.unsplash.com/photo-1610945415295-d9b226b485fc?auto=format&fit=crop&w=600&q=80",
    "samsung_detail": "https://images.unsplash.com/photo-1583573636246-18cb2246697f?auto=format&fit=crop&w=600&q=80",
    
    "android_front": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "android_back": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "android_detail": "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80",
    
    "foldable_front": "https://images.unsplash.com/photo-1678873400262-e64e59f4277b?auto=format&fit=crop&w=600&q=80",
    "foldable_back": "https://images.unsplash.com/photo-1678873400192-38d58129e710?auto=format&fit=crop&w=600&q=80",
    "foldable_detail": "https://images.unsplash.com/photo-1678873400216-a1928dc07386?auto=format&fit=crop&w=600&q=80",
    
    "feature_front": "https://images.unsplash.com/photo-1605170439002-90f450c9ac76?auto=format&fit=crop&w=600&q=80",
    "feature_back": "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80",
    "feature_detail": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    
    "gaming_front": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    "gaming_back": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    "gaming_detail": "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=600&q=80"
}

CACHE_DIR = "data/image_cache"

def download_image(url, filename):
    filepath = os.path.join(CACHE_DIR, filename)
    if os.path.exists(filepath):
        print(f"  - Đã có sẵn trong cache: {filename}")
        return True
        
    print(f"  - Đang tải: {filename} từ Unsplash...")
    try:
        # Set User-Agent to avoid getting blocked
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, timeout=20) as response, open(filepath, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)
        print(f"    => Tải thành công: {filename}")
        return True
    except Exception as e:
        print(f"    => Lỗi khi tải {filename}: {e}")
        return False

def select_image_keys(brand, category, phone_type):
    # Determine the best front, back, detail images depending on product specs
    if brand == "Apple":
        return "iphone_front", "iphone_back", "iphone_detail"
    elif brand == "Samsung":
        if phone_type == "Fold":
            return "foldable_front", "foldable_back", "foldable_detail"
        else:
            return "samsung_front", "samsung_back", "samsung_detail"
    elif phone_type == "Feature" or brand in ["Masstel", "Mobell"] and category == "pho_thong":
        return "feature_front", "feature_back", "feature_detail"
    elif category == "gaming":
        return "gaming_front", "gaming_back", "gaming_detail"
    else:
        # Standard Android smartphone
        return "android_front", "android_back", "android_detail"

def copy_with_fallback(src_key, dest_name, category_type, brand, images_dir):
    src_path = os.path.join(CACHE_DIR, f"{src_key}.jpg")
    if not os.path.exists(src_path):
        # Fallback mapping
        fallback_key = "android_" + category_type
        if brand == "Apple":
            fallback_key = "iphone_" + category_type
        src_path = os.path.join(CACHE_DIR, f"{fallback_key}.jpg")
        # Ultimate fallback
        if not os.path.exists(src_path):
            # Use any of the known successful downloads
            for key in ["android_front", "iphone_front", "gaming_front"]:
                temp_path = os.path.join(CACHE_DIR, f"{key}.jpg")
                if os.path.exists(temp_path):
                    src_path = temp_path
                    break
    shutil.copy2(src_path, os.path.join(images_dir, dest_name))

def main():
    os.makedirs(CACHE_DIR, exist_ok=True)
    
    print("1. Đang chuẩn bị tải các ảnh smartphone thật từ Unsplash về bộ nhớ đệm...")
    for key, url in IMAGE_POOL_URLS.items():
        download_image(url, f"{key}.jpg")
        
    print("\n2. Bắt đầu cập nhật hình ảnh thật cho 130 sản phẩm...")
    root_dir = "data/dienthoai"
    
    if not os.path.exists(root_dir):
        print(f"Thư mục {root_dir} không tồn tại. Vui lòng chạy generate_seed_data.py trước!")
        return
        
    updated_count = 0
    
    for brand in os.listdir(root_dir):
        brand_path = os.path.join(root_dir, brand)
        if not os.path.isdir(brand_path):
            continue
            
        for slug in os.listdir(brand_path):
            product_path = os.path.join(brand_path, slug)
            data_file = os.path.join(product_path, "data.json")
            
            if not os.path.exists(data_file):
                continue
                
            # Load current product data
            with open(data_file, 'r', encoding='utf-8') as f:
                product_data = json.load(f)
                
            category = product_data.get("phan_khuc", "pho_thong")
            # We map the custom 'type' from generate_seed_data.py to identify phone types
            # Let's check the brand name to be safe
            phone_type = "Android"
            if brand == "Apple":
                phone_type = "iOS"
            elif brand in ["Masstel", "Mobell"] and product_data.get("gia_ban", 1000000) < 1000000:
                phone_type = "Feature"
            elif "Fold" in product_data.get("mo_ta", "") or "Flip" in product_data.get("mo_ta", ""):
                phone_type = "Fold"
                
            front_k, back_k, detail_k = select_image_keys(brand, category, phone_type)
            
            images_dir = os.path.join(product_path, "images")
            os.makedirs(images_dir, exist_ok=True)
            
            # Copy cached real images to the target directories as .jpg
            copy_with_fallback(front_k, "front.jpg", "front", brand, images_dir)
            copy_with_fallback(back_k, "back.jpg", "back", brand, images_dir)
            copy_with_fallback(detail_k, "detail.jpg", "detail", brand, images_dir)
            
            # Remove old SVG files if they exist to prevent bloat
            for svg_file in ["front.svg", "back.svg", "detail.svg"]:
                svg_path = os.path.join(images_dir, svg_file)
                if os.path.exists(svg_path):
                    try:
                        os.remove(svg_path)
                    except Exception as e:
                        pass
                    
            # Update product JSON paths
            product_data["media"]["images"] = [
                f"data/dienthoai/{brand}/{slug}/images/front.jpg",
                f"data/dienthoai/{brand}/{slug}/images/back.jpg",
                f"data/dienthoai/{brand}/{slug}/images/detail.jpg"
            ]
            
            # Save updated data.json
            with open(data_file, 'w', encoding='utf-8') as f:
                json.dump(product_data, f, ensure_ascii=False, indent=2)
                
            updated_count += 1
            
        print(f"  - Đã cập nhật xong ảnh thật cho các mẫu hãng: {brand}")
        
    print(f"\nHoàn thành! Đã thay thế ảnh SVG bằng ảnh thật (.jpg) cho {updated_count} sản phẩm.")

if __name__ == "__main__":
    main()
