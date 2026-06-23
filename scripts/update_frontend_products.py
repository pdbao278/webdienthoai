import os
import json
import re

DATA_DIR = "data/dienthoai"
SCRIPT_JS_PATH = "mockup-html/script.js"

def format_price(val):
    return f"{val:,}".replace(",", ".") + "đ"

def main():
    print("Starting frontend product database update...")
    
    # 1. Traverse and load all products
    products_list = []
    
    # We want a deterministic order: brand then name/slug
    brands = sorted([d for d in os.listdir(DATA_DIR) if os.path.isdir(os.path.join(DATA_DIR, d))])
    
    for brand in brands:
        brand_dir = os.path.join(DATA_DIR, brand)
        slugs = sorted([d for d in os.listdir(brand_dir) if os.path.isdir(os.path.join(brand_dir, d))])
        
        for slug in slugs:
            json_path = os.path.join(brand_dir, slug, "data.json")
            if os.path.exists(json_path):
                try:
                    with open(json_path, "r", encoding="utf-8") as f:
                        p_data = json.load(f)
                    products_list.append(p_data)
                except Exception as e:
                    print(f"Error loading {json_path}: {e}")

    print(f"Loaded {len(products_list)} products from data/dienthoai")
    
    # 2. Build mapping and product objects
    products_db = {}
    slug_to_id = {}
    
    # Assign sequential integer IDs
    for idx, p in enumerate(products_list, start=1):
        slug = p["slug"]
        slug_to_id[slug] = idx
        
    # Map category
    cat_map = {
        "flagship": "flagship",
        "tam_trung": "midrange",
        "pho_thong": "budget",
        "gaming": "gaming"
    }
    
    # Reviews templates to generate realistic reviews
    review_templates = [
        ("Nguyễn Văn Bình", "★★★★★", "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."),
        ("Lê Thị Hoa", "★★★★★", "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."),
        ("Phạm Minh Tuấn", "★★★★☆", "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."),
        ("Trần Hoàng Nam", "★★★★★", "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."),
        ("Vũ Phương Thảo", "★★★★☆", "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình.")
    ]
    
    for idx, p in enumerate(products_list, start=1):
        slug = p["slug"]
        brand = p["hang"]
        name = p["san_pham"]
        price_goc = p["gia_goc"]
        price_ban = p["gia_ban"]
        
        # Calculate discount
        disc_val = 0
        if price_goc > price_ban:
            disc_val = int(round((1 - price_ban / price_goc) * 100))
        discount_text = f"Giảm {disc_val}%" if disc_val > 0 else ""
        
        # Category
        category = cat_map.get(p.get("phan_khuc", "tam_trung"), "midrange")
        
        # Deduce type
        type_val = "Android"
        os_lower = p.get("he_dieu_hanh", "").lower()
        name_lower = name.lower()
        if "ios" in os_lower:
            type_val = "iOS"
        elif "fold" in name_lower or "flip" in name_lower or p.get("he_dieu_hanh", "") == "Fold":
            type_val = "Fold"
        elif "series 30+" in os_lower or "masstel os" in os_lower or "mobell os" in os_lower or "feature" in os_lower:
            type_val = "Feature"
        elif "ai" in name_lower or "ai" in p.get("chip", "").lower() or p.get("hang", "") in ["Apple", "Samsung"] and category == "flagship":
            type_val = "AI"
            
        # Needs
        needs = p.get("needs", [])
        # Supplement needs if empty
        if not needs:
            if p.get("ram_gb", 0) >= 12 or "gaming" in name_lower:
                needs.append("gaming")
            if p.get("pin_mah", 0) >= 5500:
                needs.append("battery")
            if "camera" in name_lower or p.get("ram_gb", 0) >= 12:
                needs.append("camera")
            if p.get("trong_luong_g", 200) < 180:
                needs.append("thin")
            if not needs:
                needs.append("thin")
                
        # RAM and Storage strings
        ram_str = f"{p.get('ram_gb', 8)}GB" if isinstance(p.get('ram_gb'), int) else str(p.get('ram_gb', "8GB"))
        storage_str = f"{p.get('dung_luong_gb', 128)}GB" if isinstance(p.get('dung_luong_gb'), int) else str(p.get('dung_luong_gb', "128GB"))
        
        # Resolution mapping
        res_str = p.get("man_hinh_do_phan_giai", "Full HD+")
        if "retina" in res_str.lower():
            res_str = "Retina"
        elif "2k" in res_str.lower():
            res_str = "2K+"
        elif "1.5k" in res_str.lower():
            res_str = "1.5K"
        elif "hd" in res_str.lower():
            res_str = "HD+"
            
        # Refresh rate
        rf_rate = f"{p.get('man_hinh_tan_so_quet', 120)}Hz"
        
        # Charging
        charging = []
        sac_w = p.get("sac_nhanh_w", 25)
        if sac_w >= 20:
            charging.append("fast")
        if sac_w >= 60:
            charging.append("superFast")
        if type_val in ["iOS", "AI", "Fold"] and category == "flagship":
            charging.append("wireless")
            
        # Special Features
        specials = p.get("specialFeatures", [])
        if not specials:
            specials = ["5G"]
            if p.get("chong_nuoc", "") != "Không":
                specials.append("waterResist")
            if p.get("nfc", False):
                specials.append("nfc")
            if type_val == "iOS":
                specials.append("face3D")
            if type_val == "AI":
                specials.append("aiEdit")
                
        # Media files (Images & Videos) relative to mockup-html
        images_crawled = p.get("media", {}).get("images", [])
        video_crawled = p.get("media", {}).get("videos", [])
        
        image_front = images_crawled[0] if len(images_crawled) > 0 else ""
        if image_front and not image_front.startswith("http"):
            image_front = f"../{image_front}"
            
        image_back = images_crawled[1] if len(images_crawled) > 1 else ""
        if image_back and not image_back.startswith("http"):
            image_back = f"../{image_back}"
            
        image_detail = images_crawled[2] if len(images_crawled) > 2 else ""
        if image_detail and not image_detail.startswith("http"):
            image_detail = f"../{image_detail}"
            
        video_path = video_crawled[0] if len(video_crawled) > 0 else ""
        if video_path and not video_path.startswith("http"):
            video_path = f"../{video_path}"
        
        # Generate reviews based on ID
        reviews = []
        r_indices = [idx % 5, (idx + 2) % 5]
        for r_idx in r_indices:
            name_user, stars, content = review_templates[r_idx]
            reviews.append({"name": name_user, "stars": stars, "content": content})
            
        # Rating
        rating_val = f"{(4.5 + (idx % 6) * 0.1):.1f}"
        
        # Related products (choose 3 of the same brand or category)
        related_ids = []
        # Same brand first
        for op in products_list:
            if op["slug"] != slug and op["hang"] == brand:
                op_id = slug_to_id[op["slug"]]
                related_ids.append(op_id)
                if len(related_ids) >= 3:
                    break
        # Fill with same category if needed
        if len(related_ids) < 3:
            for op in products_list:
                op_id = slug_to_id[op["slug"]]
                if op["slug"] != slug and op_id not in related_ids:
                    if cat_map.get(op.get("phan_khuc", "tam_trung"), "midrange") == category:
                        related_ids.append(op_id)
                        if len(related_ids) >= 3:
                            break
                            
        products_db[idx] = {
            "id": idx,
            "name": name,
            "brand": brand,
            "rawPrice": price_ban,
            "priceCurrent": format_price(price_ban),
            "priceOld": format_price(price_goc),
            "discount": discount_text,
            "rating": rating_val,
            "category": category,
            "type": type_val,
            "needs": needs,
            "ram": ram_str,
            "storage": storage_str,
            "resolution": res_str,
            "refreshRate": rf_rate,
            "charging": charging,
            "specialFeatures": specials,
            "description": p.get("mo_ta", ""),
            "specs": {
                "screen": p.get("man_hinh_cong_nghe", ""),
                "os": p.get("he_dieu_hanh", ""),
                "chip": p.get("chip", ""),
                "ramrom": f"{ram_str} / {storage_str}",
                "battery": f"{p.get('pin_mah', 5000)} mAh, Sạc nhanh {sac_w}W"
            },
            "imageFront": image_front,
            "imageBack": image_back,
            "imageDetail": image_detail,
            "video": video_path,
            "reviews": reviews,
            "related": related_ids
        }
        
    # 3. Replace in script.js
    with open(SCRIPT_JS_PATH, "r", encoding="utf-8") as f:
        js_content = f.read()
        
    # Find block const PRODUCTS = { ... }
    # Since it is a nested block, we can use a parser or find matching brackets
    start_match = re.search(r"const PRODUCTS = \{", js_content)
    if not start_match:
        print("Error: Could not find const PRODUCTS in script.js")
        return
        
    start_idx = start_match.start()
    
    # Find matching closing bracket for the outer object
    # We scan character by character from the opening '{'
    bracket_count = 1
    end_idx = -1
    for char_idx in range(start_match.end(), len(js_content)):
        char = js_content[char_idx]
        if char == "{":
            bracket_count += 1
        elif char == "}":
            bracket_count -= 1
            if bracket_count == 0:
                # We need to include the semicolon if there is one
                if char_idx + 1 < len(js_content) and js_content[char_idx + 1] == ";":
                    end_idx = char_idx + 2
                else:
                    end_idx = char_idx + 1
                break
                
    if end_idx == -1:
        print("Error: Could not find matching closing bracket for PRODUCTS")
        return
        
    # Format database as pretty JS object
    db_json = json.dumps(products_db, ensure_ascii=False, indent=4)
    js_products_declaration = f"const PRODUCTS = {db_json};"
    
    new_js_content = js_content[:start_idx] + js_products_declaration + js_content[end_idx:]
    
    with open(SCRIPT_JS_PATH, "w", encoding="utf-8") as f:
        f.write(new_js_content)
        
    print(f"SUCCESS: script.js has been updated with {len(products_db)} products!")

if __name__ == "__main__":
    main()
