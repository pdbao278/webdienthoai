import os
import json
import sys
import subprocess

# Reconfigure stdout for UTF-8 to prevent console encoding errors on Windows
sys.stdout.reconfigure(encoding='utf-8')

# 1. Parse .env.local to get Cloudinary credentials
def load_env_local():
    env = {}
    if os.path.exists(".env.local"):
        with open(".env.local", "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    if "=" in line:
                        k, v = line.split("=", 1)
                        env[k.strip()] = v.strip()
    return env

env = load_env_local()
cloud_name = env.get("CLOUDINARY_CLOUD_NAME")
api_key = env.get("CLOUDINARY_API_KEY")
api_secret = env.get("CLOUDINARY_API_SECRET")

if not cloud_name or not api_key or not api_secret:
    print("Error: Missing Cloudinary credentials in .env.local")
    print("Please make sure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.")
    sys.exit(1)

# 2. Try importing cloudinary, install if missing
try:
    import cloudinary
    import cloudinary.uploader
except ImportError:
    print("Cloudinary library not found. Installing via pip...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "cloudinary"])
        import cloudinary
        import cloudinary.uploader
    except Exception as e:
        print(f"Failed to install cloudinary library: {e}")
        sys.exit(1)

# Configure Cloudinary
cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret,
    secure=True
)

BASE_DIR = "data/dienthoai"

def upload_image_to_cloudinary(local_path, folder_path, public_id):
    if not os.path.exists(local_path):
        print(f"  - File not found: {local_path}")
        return None
        
    print(f"  - Uploading {local_path} to Cloudinary...")
    try:
        response = cloudinary.uploader.upload(
            local_path,
            folder=folder_path,
            public_id=public_id,
            overwrite=True,
            resource_type="image",
            format="webp", # Force optimize to WebP format
            transformation=[{"quality": "auto:good"}]
        )
        secure_url = response.get("secure_url")
        print(f"    => Success: {secure_url}")
        return secure_url
    except Exception as e:
        print(f"    => Upload error for {local_path}: {e}")
        return None

def main():
    if not os.path.exists(BASE_DIR):
        print(f"Base directory {BASE_DIR} does not exist.")
        return
        
    total_uploaded = 0
    total_skipped = 0
    
    print("Starting Cloudinary image upload process...")
    
    # Traverse through all brands and model directories
    for brand in os.listdir(BASE_DIR):
        brand_path = os.path.join(BASE_DIR, brand)
        if not os.path.isdir(brand_path):
            continue
            
        print(f"\nBrand: {brand}")
        
        for model_slug in os.listdir(brand_path):
            model_path = os.path.join(brand_path, model_slug)
            if not os.path.isdir(model_path):
                continue
                
            data_json_path = os.path.join(model_path, "data.json")
            if not os.path.exists(data_json_path):
                continue
                
            with open(data_json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            model_name = data.get("san_pham", "")
            print(f" - Product: {model_name} ({model_slug})")
            
            images_list = data.get("media", {}).get("images", [])
            updated_images = []
            has_changes = False
            
            for idx, img_path in enumerate(images_list):
                # If it's already uploaded to Cloudinary, skip
                if img_path.startswith("http"):
                    print(f"  - Image [{idx}] already remote: {img_path}")
                    updated_images.append(img_path)
                    total_skipped += 1
                    continue
                
                # Determine names
                # e.g., data/dienthoai/Apple/iphone-16-pro-max/images/front.jpg
                filename = os.path.basename(img_path)
                name_without_ext = os.path.splitext(filename)[0]
                
                local_file_path = os.path.join(model_path, "images", filename)
                
                # Cloudinary folder and public id structure
                cloudinary_folder = f"phonestore/products/{brand}/{model_slug}"
                public_id = name_without_ext # front, back, detail
                
                cloudinary_url = upload_image_to_cloudinary(local_file_path, cloudinary_folder, public_id)
                if cloudinary_url:
                    updated_images.append(cloudinary_url)
                    has_changes = True
                    total_uploaded += 1
                else:
                    # Fallback to current path if upload failed
                    updated_images.append(img_path)
            
            if has_changes:
                data["media"]["images"] = updated_images
                try:
                    with open(data_json_path, "w", encoding="utf-8") as f:
                        json.dump(data, f, ensure_ascii=False, indent=2)
                    print(f"   => Updated data.json successfully.")
                except Exception as e:
                    print(f"   => Error writing data.json: {e}")
                    
    print("\n--- Cloudinary Upload Summary ---")
    print(f"New images uploaded: {total_uploaded}")
    print(f"Images skipped (already uploaded): {total_skipped}")
    
    # 3. Trigger update_frontend_products.py to sync with mockup-html/script.js
    print("\nSyncing changes to mockup frontend (script.js)...")
    try:
        result = subprocess.run(
            [sys.executable, "scripts/update_frontend_products.py"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        print(result.stdout)
        if result.returncode == 0:
            print("Successfully synced all product data with Cloudinary URLs to the frontend!")
        else:
            print(f"Error running update_frontend_products.py: {result.stderr}")
    except Exception as e:
        print(f"Failed to trigger frontend update: {e}")

if __name__ == "__main__":
    main()
