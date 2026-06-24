import os
import json
import base64
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Minimal WebM base64 string (1-second blank video, ~175 bytes)
MINIMAL_WEBM_BASE64 = (
    "GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FA"
    "Aw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyB"
    "ACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAw"
    "AQCdASoIAAgAAUAmJaQAA3AA/vz0AAA="
)

# Colors and graphics config for generating SVG image mockups
COLOR_THEMES = {
    "Apple": {"body": "#1c1c1e", "accent": "#a6a6a6", "wallpaper": "#6366f1"},
    "Samsung": {"body": "#374151", "accent": "#9ca3af", "wallpaper": "#10b981"},
    "Xiaomi": {"body": "#0f172a", "accent": "#1e293b", "wallpaper": "#f97316"},
    "OPPO": {"body": "#064e3b", "accent": "#0f766e", "wallpaper": "#f43f5e"},
    "vivo": {"body": "#1e293b", "accent": "#334155", "wallpaper": "#3b82f6"},
    "realme": {"body": "#14532d", "accent": "#22c55e", "wallpaper": "#eab308"},
    "Nokia": {"body": "#1f2937", "accent": "#4b5563", "wallpaper": "#a855f7"},
    "Tecno": {"body": "#030712", "accent": "#1f2937", "wallpaper": "#ec4899"},
    "HONOR": {"body": "#0f5132", "accent": "#198754", "wallpaper": "#06b6d4"},
    "Motorola": {"body": "#ffbe98", "accent": "#ffd8c2", "wallpaper": "#10b981"},
    "Masstel": {"body": "#1e3a8a", "accent": "#3b82f6", "wallpaper": "#eab308"},
    "Mobell": {"body": "#18181b", "accent": "#27272a", "wallpaper": "#ef4444"},
    "Nubia": {"body": "#09090b", "accent": "#ef4444", "wallpaper": "#06b6d4"}
}

# The complete list of 130 phone models (10 per brand) with detailed parameters
# up to June 2026.
PHONES_DATABASE = {
    "Apple": [
        {"name": "iPhone 17 Pro Max 256GB", "category": "flagship", "type": "iOS", "price_goc": 35990000, "price_ban": 33990000, "chip": "Apple A19 Pro (3nm)", "ram": 12, "rom": 256, "screen": "6.9 inches, OLED Super Retina XDR, 120Hz", "battery": 4852, "charging": 35, "camera_sau": "48MP + 48MP + 48MP", "camera_truoc": "24MP", "os": "iOS 19", "weight": 221, "water": "IP68"},
        {"name": "iPhone 17 Pro 256GB", "category": "flagship", "type": "iOS", "price_goc": 31990000, "price_ban": 29990000, "chip": "Apple A19 Pro (3nm)", "ram": 12, "rom": 256, "screen": "6.3 inches, OLED Super Retina XDR, 120Hz", "battery": 3985, "charging": 30, "camera_sau": "48MP + 48MP + 48MP", "camera_truoc": "24MP", "os": "iOS 19", "weight": 187, "water": "IP68"},
        {"name": "iPhone 17 Slim 256GB", "category": "flagship", "type": "iOS", "price_goc": 33990000, "price_ban": 31990000, "chip": "Apple A19 (3nm)", "ram": 8, "rom": 256, "screen": "6.6 inches, OLED Super Retina XDR, 120Hz", "battery": 3500, "charging": 25, "camera_sau": "48MP", "camera_truoc": "24MP", "os": "iOS 19", "weight": 150, "water": "IP68"},
        {"name": "iPhone 17 128GB", "category": "flagship", "type": "iOS", "price_goc": 24990000, "price_ban": 22990000, "chip": "Apple A19 (3nm)", "ram": 8, "rom": 128, "screen": "6.1 inches, OLED Super Retina XDR, 120Hz", "battery": 3782, "charging": 25, "camera_sau": "48MP + 12MP", "camera_truoc": "24MP", "os": "iOS 19", "weight": 172, "water": "IP68"},
        {"name": "iPhone SE 4 128GB", "category": "tam_trung", "type": "iOS", "price_goc": 14990000, "price_ban": 13990000, "chip": "Apple A18 (3nm)", "ram": 8, "rom": 128, "screen": "6.1 inches, OLED, 60Hz", "battery": 3279, "charging": 20, "camera_sau": "48MP", "camera_truoc": "12MP", "os": "iOS 18", "weight": 165, "water": "IP68"},
        {"name": "iPhone 16 Pro Max 256GB", "category": "flagship", "type": "iOS", "price_goc": 34990000, "price_ban": 29590000, "chip": "Apple A18 Pro (3nm)", "ram": 8, "rom": 256, "screen": "6.9 inches, OLED Super Retina XDR, 120Hz", "battery": 4685, "charging": 25, "camera_sau": "48MP + 48MP + 12MP", "camera_truoc": "12MP", "os": "iOS 18", "weight": 227, "water": "IP68"},
        {"name": "iPhone 16 Pro 128GB", "category": "flagship", "type": "iOS", "price_goc": 28990000, "price_ban": 24990000, "chip": "Apple A18 Pro (3nm)", "ram": 8, "rom": 128, "screen": "6.3 inches, OLED Super Retina XDR, 120Hz", "battery": 3582, "charging": 25, "camera_sau": "48MP + 48MP + 12MP", "camera_truoc": "12MP", "os": "iOS 18", "weight": 199, "water": "IP68"},
        {"name": "iPhone 16 Plus 128GB", "category": "flagship", "type": "iOS", "price_goc": 25990000, "price_ban": 21990000, "chip": "Apple A18 (3nm)", "ram": 8, "rom": 128, "screen": "6.7 inches, OLED Super Retina XDR, 60Hz", "battery": 4674, "charging": 25, "camera_sau": "48MP + 12MP", "camera_truoc": "12MP", "os": "iOS 18", "weight": 199, "water": "IP68"},
        {"name": "iPhone 16 128GB", "category": "flagship", "type": "iOS", "price_goc": 22990000, "price_ban": 19490000, "chip": "Apple A18 (3nm)", "ram": 8, "rom": 128, "screen": "6.1 inches, OLED Super Retina XDR, 60Hz", "battery": 3561, "charging": 25, "camera_sau": "48MP + 12MP", "camera_truoc": "12MP", "os": "iOS 18", "weight": 170, "water": "IP68"},
        {"name": "iPhone 15 Pro Max 256GB", "category": "flagship", "type": "iOS", "price_goc": 32990000, "price_ban": 26990000, "chip": "Apple A17 Pro (3nm)", "ram": 8, "rom": 256, "screen": "6.7 inches, OLED Super Retina XDR, 120Hz", "battery": 4441, "charging": 25, "camera_sau": "48MP + 12MP + 12MP", "camera_truoc": "12MP", "os": "iOS 17", "weight": 221, "water": "IP68"}
    ],
    "Samsung": [
        {"name": "Galaxy S26 Ultra 256GB", "category": "flagship", "type": "AI", "price_goc": 36990000, "price_ban": 34990000, "chip": "Snapdragon 8 Gen 5", "ram": 16, "rom": 256, "screen": "6.8 inches, Dynamic AMOLED 2X, 120Hz", "battery": 5000, "charging": 45, "camera_sau": "200MP + 50MP + 50MP + 12MP", "camera_truoc": "12MP", "os": "Android 16", "weight": 228, "water": "IP68"},
        {"name": "Galaxy S26 Plus 256GB", "category": "flagship", "type": "AI", "price_goc": 28990000, "price_ban": 26990000, "chip": "Exynos 2600 / Snapdragon 8 Gen 5", "ram": 12, "rom": 256, "screen": "6.7 inches, Dynamic AMOLED 2X, 120Hz", "battery": 4900, "charging": 45, "camera_sau": "50MP + 12MP + 10MP", "camera_truoc": "12MP", "os": "Android 16", "weight": 195, "water": "IP68"},
        {"name": "Galaxy S26 128GB", "category": "flagship", "type": "AI", "price_goc": 22990000, "price_ban": 20990000, "chip": "Exynos 2600 / Snapdragon 8 Gen 5", "ram": 12, "rom": 128, "screen": "6.2 inches, Dynamic AMOLED 2X, 120Hz", "battery": 4000, "charging": 25, "camera_sau": "50MP + 12MP + 10MP", "camera_truoc": "12MP", "os": "Android 16", "weight": 167, "water": "IP68"},
        {"name": "Galaxy Z Fold7 512GB", "category": "flagship", "type": "Fold", "price_goc": 46990000, "price_ban": 44990000, "chip": "Snapdragon 8 Gen 5", "ram": 16, "rom": 512, "screen": "7.6 inches (Chính) / 6.3 inches (Phụ), Dynamic AMOLED 2X, 120Hz", "battery": 4600, "charging": 45, "camera_sau": "50MP + 12MP + 10MP", "camera_truoc": "10MP + 4MP dưới màn hình", "os": "Android 16", "weight": 235, "water": "IPX8 / IP48"},
        {"name": "Galaxy Z Flip7 256GB", "category": "flagship", "type": "Fold", "price_goc": 26990000, "price_ban": 24990000, "chip": "Snapdragon 8 Gen 5", "ram": 12, "rom": 256, "screen": "6.7 inches (Chính) / 3.9 inches (Phụ), Dynamic AMOLED 2X, 120Hz", "battery": 4200, "charging": 25, "camera_sau": "50MP + 12MP", "camera_truoc": "10MP", "os": "Android 16", "weight": 185, "water": "IPX8 / IP48"},
        {"name": "Galaxy S25 Ultra 256GB", "category": "flagship", "type": "AI", "price_goc": 34990000, "price_ban": 31490000, "chip": "Snapdragon 8 Gen 4", "ram": 16, "rom": 256, "screen": "6.8 inches, Dynamic AMOLED 2X, 120Hz", "battery": 5000, "charging": 45, "camera_sau": "200MP + 50MP + 50MP + 10MP", "camera_truoc": "12MP", "os": "Android 15", "weight": 219, "water": "IP68"},
        {"name": "Galaxy S25 256GB", "category": "flagship", "type": "AI", "price_goc": 23990000, "price_ban": 20490000, "chip": "Exynos 2500", "ram": 12, "rom": 256, "screen": "6.2 inches, Dynamic AMOLED 2X, 120Hz", "battery": 4000, "charging": 25, "camera_sau": "50MP + 12MP + 10MP", "camera_truoc": "12MP", "os": "Android 15", "weight": 167, "water": "IP68"},
        {"name": "Galaxy A55 5G 128GB", "category": "tam_trung", "type": "Android", "price_goc": 9990000, "price_ban": 8990000, "chip": "Exynos 1480", "ram": 8, "rom": 128, "screen": "6.6 inches, Super AMOLED, 120Hz", "battery": 5000, "charging": 25, "camera_sau": "50MP + 12MP + 5MP", "camera_truoc": "32MP", "os": "Android 14", "weight": 213, "water": "IP67"},
        {"name": "Galaxy A35 5G 128GB", "category": "tam_trung", "type": "Android", "price_goc": 8290000, "price_ban": 7490000, "chip": "Exynos 1380", "ram": 8, "rom": 128, "screen": "6.6 inches, Super AMOLED, 120Hz", "battery": 5000, "charging": 25, "camera_sau": "50MP + 8MP + 5MP", "camera_truoc": "13MP", "os": "Android 14", "weight": 209, "water": "IP67"},
        {"name": "Galaxy A15 128GB", "category": "pho_thong", "type": "Android", "price_goc": 4990000, "price_ban": 4290000, "chip": "MediaTek Helio G99", "ram": 8, "rom": 128, "screen": "6.5 inches, Super AMOLED, 90Hz", "battery": 5000, "charging": 25, "camera_sau": "50MP + 5MP + 2MP", "camera_truoc": "13MP", "os": "Android 14", "weight": 200, "water": "Không"}
    ],
    "Xiaomi": [
        {"name": "Xiaomi 16 Ultra 512GB", "category": "flagship", "type": "Android", "price_goc": 34990000, "price_ban": 32990000, "chip": "Snapdragon 8 Gen 5", "ram": 16, "rom": 512, "screen": "6.73 inches, AMOLED 2K+, 120Hz", "battery": 5500, "charging": 120, "camera_sau": "50MP + 50MP + 50MP + 50MP Leica", "camera_truoc": "32MP", "os": "Xiaomi HyperOS 2.0", "weight": 220, "water": "IP68"},
        {"name": "Xiaomi 16 256GB", "category": "flagship", "type": "Android", "price_goc": 22990000, "price_ban": 20990000, "chip": "Snapdragon 8 Gen 5", "ram": 12, "rom": 256, "screen": "6.36 inches, AMOLED 1.5K, 120Hz", "battery": 4900, "charging": 90, "camera_sau": "50MP + 50MP + 50MP Leica", "camera_truoc": "32MP", "os": "Xiaomi HyperOS 2.0", "weight": 188, "water": "IP68"},
        {"name": "Xiaomi 15 Pro 512GB", "category": "flagship", "type": "Android", "price_goc": 29990000, "price_ban": 27990000, "chip": "Snapdragon 8 Gen 4", "ram": 16, "rom": 512, "screen": "6.73 inches, AMOLED 2K, 120Hz", "battery": 5400, "charging": 90, "camera_sau": "50MP + 50MP + 50MP Leica", "camera_truoc": "32MP", "os": "Xiaomi HyperOS 1.5", "weight": 213, "water": "IP68"},
        {"name": "Xiaomi 15 256GB", "category": "flagship", "type": "Android", "price_goc": 21990000, "price_ban": 19990000, "chip": "Snapdragon 8 Gen 4", "ram": 12, "rom": 256, "screen": "6.36 inches, AMOLED 1.5K, 120Hz", "battery": 4800, "charging": 90, "camera_sau": "50MP + 50MP + 50MP Leica", "camera_truoc": "32MP", "os": "Xiaomi HyperOS 1.5", "weight": 191, "water": "IP68"},
        {"name": "Redmi Note 15 Pro Plus 5G", "category": "tam_trung", "type": "Android", "price_goc": 11990000, "price_ban": 10990000, "chip": "Dimensity 7500 Ultra", "ram": 12, "rom": 512, "screen": "6.67 inches, AMOLED 1.5K, 120Hz", "battery": 5100, "charging": 120, "camera_sau": "200MP + 8MP + 2MP", "camera_truoc": "16MP", "os": "Xiaomi HyperOS 2.0", "weight": 204, "water": "IP68"},
        {"name": "Redmi Note 15 Pro 5G", "category": "tam_trung", "type": "Android", "price_goc": 9490000, "price_ban": 8790000, "chip": "Snapdragon 7s Gen 4", "ram": 8, "rom": 256, "screen": "6.67 inches, AMOLED 1.5K, 120Hz", "battery": 5200, "charging": 67, "camera_sau": "108MP + 8MP + 2MP", "camera_truoc": "16MP", "os": "Xiaomi HyperOS 2.0", "weight": 187, "water": "IP68"},
        {"name": "Redmi Note 14 Pro Plus 5G", "category": "tam_trung", "type": "Android", "price_goc": 10990000, "price_ban": 9490000, "chip": "Snapdragon 7s Gen 3", "ram": 12, "rom": 256, "screen": "6.67 inches, AMOLED 1.5K, 120Hz", "battery": 6200, "charging": 90, "camera_sau": "50MP + 50MP + 8MP", "camera_truoc": "20MP", "os": "Xiaomi HyperOS 1.0", "weight": 210, "water": "IP68"},
        {"name": "Poco F7 Pro 512GB", "category": "gaming", "type": "Android", "price_goc": 14990000, "price_ban": 13990000, "chip": "Snapdragon 8s Gen 4", "ram": 12, "rom": 512, "screen": "6.67 inches, OLED 2K, 120Hz", "battery": 5000, "charging": 120, "camera_sau": "50MP + 8MP + 2MP", "camera_truoc": "16MP", "os": "Xiaomi HyperOS 2.0", "weight": 202, "water": "IP64"},
        {"name": "Redmi 14C 128GB", "category": "pho_thong", "type": "Android", "price_goc": 3490000, "price_ban": 3190000, "chip": "MediaTek Helio G81", "ram": 4, "rom": 128, "screen": "6.88 inches, IPS LCD, 120Hz", "battery": 5160, "charging": 18, "camera_sau": "50MP", "camera_truoc": "13MP", "os": "Xiaomi HyperOS 1.0", "weight": 211, "water": "Không"},
        {"name": "Redmi A3 64GB", "category": "pho_thong", "type": "Android", "price_goc": 2490000, "price_ban": 2190000, "chip": "MediaTek Helio G36", "ram": 3, "rom": 64, "screen": "6.71 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 10, "camera_sau": "8MP", "camera_truoc": "5MP", "os": "Android 14 Go", "weight": 199, "water": "Không"}
    ],
    "OPPO": [
        {"name": "Find X8 Ultra 512GB", "category": "flagship", "type": "Android", "price_goc": 32990000, "price_ban": 30990000, "chip": "Dimensity 9400 / Snapdragon 8 Gen 4", "ram": 16, "rom": 512, "screen": "6.82 inches, OLED 2K+, 120Hz", "battery": 5600, "charging": 100, "camera_sau": "50MP + 50MP + 50MP + 50MP Hasselblad", "camera_truoc": "32MP", "os": "ColorOS 15", "weight": 215, "water": "IP68"},
        {"name": "Find N3 Fold 512GB", "category": "flagship", "type": "Fold", "price_goc": 44990000, "price_ban": 41990000, "chip": "Snapdragon 8 Gen 2", "ram": 16, "rom": 512, "screen": "7.82 inches (Chính) / 6.31 inches (Phụ), OLED, 120Hz", "battery": 4805, "charging": 67, "camera_sau": "48MP + 64MP + 48MP Hasselblad", "camera_truoc": "32MP + 20MP", "os": "ColorOS 14", "weight": 239, "water": "IPX4"},
        {"name": "Reno14 Pro 5G 512GB", "category": "tam_trung", "type": "Android", "price_goc": 19990000, "price_ban": 18990000, "chip": "Dimensity 8400", "ram": 12, "rom": 512, "screen": "6.7 inches, AMOLED, 120Hz", "battery": 5000, "charging": 80, "camera_sau": "50MP + 50MP + 8MP", "camera_truoc": "50MP", "os": "ColorOS 15", "weight": 186, "water": "IP68"},
        {"name": "Reno14 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 15990000, "price_ban": 14990000, "chip": "Dimensity 8300", "ram": 12, "rom": 256, "screen": "6.7 inches, AMOLED, 120Hz", "battery": 5000, "charging": 80, "camera_sau": "50MP + 50MP + 8MP", "camera_truoc": "50MP", "os": "ColorOS 15", "weight": 179, "water": "IP68"},
        {"name": "Reno13 Pro 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 18990000, "price_ban": 17490000, "chip": "Dimensity 8350", "ram": 12, "rom": 256, "screen": "6.83 inches, AMOLED, 120Hz", "battery": 5800, "charging": 80, "camera_sau": "50MP + 50MP + 8MP", "camera_truoc": "50MP", "os": "ColorOS 14", "weight": 197, "water": "IP68"},
        {"name": "Reno13 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 13990000, "price_ban": 12590000, "chip": "Dimensity 8300", "ram": 8, "rom": 256, "screen": "6.59 inches, AMOLED, 120Hz", "battery": 5600, "charging": 80, "camera_sau": "50MP + 8MP", "camera_truoc": "50MP", "os": "ColorOS 14", "weight": 175, "water": "IP68"},
        {"name": "OPPO A3 Pro 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 8990000, "price_ban": 8290000, "chip": "Dimensity 6300", "ram": 8, "rom": 256, "screen": "6.67 inches, IPS LCD, 120Hz", "battery": 5100, "charging": 45, "camera_sau": "50MP + 2MP", "camera_truoc": "8MP", "os": "ColorOS 14", "weight": 186, "water": "IP54"},
        {"name": "OPPO A3 128GB", "category": "pho_thong", "type": "Android", "price_goc": 4990000, "price_ban": 4490000, "chip": "Snapdragon 680", "ram": 6, "rom": 128, "screen": "6.67 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 45, "camera_sau": "50MP + 2MP", "camera_truoc": "8MP", "os": "ColorOS 14", "weight": 186, "water": "IP54"},
        {"name": "OPPO A18 64GB", "category": "pho_thong", "type": "Android", "price_goc": 3290000, "price_ban": 2890000, "chip": "MediaTek Helio G85", "ram": 4, "rom": 64, "screen": "6.56 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 10, "camera_sau": "8MP + 2MP", "camera_truoc": "5MP", "os": "ColorOS 13", "weight": 188, "water": "IP54"},
        {"name": "Find X7 Ultra 512GB", "category": "flagship", "type": "Android", "price_goc": 29990000, "price_ban": 24990000, "chip": "Snapdragon 8 Gen 3", "ram": 16, "rom": 512, "screen": "6.82 inches, AMOLED 2K, 120Hz", "battery": 5000, "charging": 100, "camera_sau": "50MP + 50MP + 50MP + 50MP Hasselblad", "camera_truoc": "32MP", "os": "ColorOS 14", "weight": 221, "water": "IP68"}
    ],
    "vivo": [
        {"name": "vivo X200 Pro 512GB", "category": "flagship", "type": "AI", "price_goc": 29990000, "price_ban": 27990000, "chip": "Dimensity 9400", "ram": 16, "rom": 512, "screen": "6.78 inches, AMOLED 1.5K, 120Hz", "battery": 6000, "charging": 90, "camera_sau": "50MP + 200MP + 50MP Zeiss", "camera_truoc": "32MP", "os": "OriginOS 5 / Funtouch OS 15", "weight": 223, "water": "IP69"},
        {"name": "vivo V40 Pro 5G 512GB", "category": "tam_trung", "type": "Android", "price_goc": 16990000, "price_ban": 15990000, "chip": "Dimensity 9200+", "ram": 12, "rom": 512, "screen": "6.78 inches, AMOLED 1.5K, 120Hz", "battery": 5500, "charging": 80, "camera_sau": "50MP + 50MP + 50MP Zeiss", "camera_truoc": "50MP", "os": "Funtouch OS 14", "weight": 192, "water": "IP68"},
        {"name": "vivo V40 Lite 256GB", "category": "tam_trung", "type": "Android", "price_goc": 8490000, "price_ban": 7990000, "chip": "Snapdragon 685", "ram": 8, "rom": 256, "screen": "6.67 inches, AMOLED, 120Hz", "battery": 5000, "charging": 80, "camera_sau": "50MP + 8MP", "camera_truoc": "32MP", "os": "Funtouch OS 14", "weight": 188, "water": "IP64"},
        {"name": "vivo V30 Pro 512GB", "category": "tam_trung", "type": "Android", "price_goc": 15990000, "price_ban": 13990000, "chip": "Dimensity 8200", "ram": 12, "rom": 512, "screen": "6.78 inches, AMOLED, 120Hz", "battery": 5000, "charging": 80, "camera_sau": "50MP + 50MP + 50MP Zeiss", "camera_truoc": "50MP", "os": "Funtouch OS 14", "weight": 188, "water": "IP54"},
        {"name": "vivo Y100 128GB", "category": "tam_trung", "type": "Android", "price_goc": 7290000, "price_ban": 6590000, "chip": "Snapdragon 685", "ram": 8, "rom": 128, "screen": "6.67 inches, AMOLED, 120Hz", "battery": 5000, "charging": 80, "camera_sau": "50MP + 2MP + Cảm biến Flicker", "camera_truoc": "8MP", "os": "Funtouch OS 14", "weight": 188, "water": "IP54"},
        {"name": "vivo Y200 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 8990000, "price_ban": 8290000, "chip": "Snapdragon 4 Gen 2", "ram": 8, "rom": 256, "screen": "6.67 inches, AMOLED, 120Hz", "battery": 4800, "charging": 44, "camera_sau": "64MP + 2MP", "camera_truoc": "16MP", "os": "Funtouch OS 14", "weight": 190, "water": "IP54"},
        {"name": "vivo Y18s 128GB", "category": "pho_thong", "type": "Android", "price_goc": 4490000, "price_ban": 3990000, "chip": "MediaTek Helio G85", "ram": 6, "rom": 128, "screen": "6.56 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 15, "camera_sau": "50MP + 0.08MP", "camera_truoc": "8MP", "os": "Funtouch OS 14", "weight": 185, "water": "IP54"},
        {"name": "vivo Y03 64GB", "category": "pho_thong", "type": "Android", "price_goc": 2990000, "price_ban": 2690000, "chip": "MediaTek Helio G85", "ram": 4, "rom": 64, "screen": "6.56 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 15, "camera_sau": "13MP + 0.08MP", "camera_truoc": "5MP", "os": "Funtouch OS 14", "weight": 185, "water": "IP54"},
        {"name": "vivo T3 Ultra 256GB", "category": "gaming", "type": "Android", "price_goc": 12990000, "price_ban": 11990000, "chip": "Dimensity 9200+", "ram": 12, "rom": 256, "screen": "6.78 inches, AMOLED, 120Hz", "battery": 5500, "charging": 80, "camera_sau": "50MP + 8MP", "camera_truoc": "50MP", "os": "Funtouch OS 14", "weight": 190, "water": "IP68"},
        {"name": "vivo X100 Ultra 512GB", "category": "flagship", "type": "Android", "price_goc": 28990000, "price_ban": 24990000, "chip": "Snapdragon 8 Gen 3", "ram": 16, "rom": 512, "screen": "6.78 inches, AMOLED 2K, 120Hz", "battery": 5500, "charging": 80, "camera_sau": "50MP + 200MP + 50MP Zeiss", "camera_truoc": "50MP", "os": "Funtouch OS 14", "weight": 229, "water": "IP68"}
    ],
    "realme": [
        {"name": "realme GT6 5G 256GB", "category": "gaming", "type": "AI", "price_goc": 16990000, "price_ban": 15990000, "chip": "Snapdragon 8s Gen 3", "ram": 12, "rom": 256, "screen": "6.78 inches, AMOLED, 120Hz", "battery": 5500, "charging": 120, "camera_sau": "50MP + 50MP + 8MP", "camera_truoc": "32MP", "os": "realme UI 5.0 (Android 14)", "weight": 191, "water": "IP65"},
        {"name": "realme 13 Pro Plus 5G", "category": "tam_trung", "type": "Android", "price_goc": 12990000, "price_ban": 11990000, "chip": "Snapdragon 7s Gen 2", "ram": 12, "rom": 512, "screen": "6.7 inches, AMOLED, 120Hz", "battery": 5200, "charging": 80, "camera_sau": "50MP + 50MP + 8MP Sony LYT", "camera_truoc": "32MP", "os": "realme UI 5.0 (Android 14)", "weight": 190, "water": "IP65"},
        {"name": "realme 12 Pro Plus 5G", "category": "tam_trung", "type": "Android", "price_goc": 11990000, "price_ban": 10490000, "chip": "Snapdragon 7s Gen 2", "ram": 8, "rom": 256, "screen": "6.7 inches, AMOLED, 120Hz", "battery": 5000, "charging": 67, "camera_sau": "50MP + 64MP + 8MP", "camera_truoc": "32MP", "os": "realme UI 5.0 (Android 14)", "weight": 196, "water": "IP65"},
        {"name": "realme C67 128GB", "category": "tam_trung", "type": "Android", "price_goc": 5290000, "price_ban": 4690000, "chip": "Snapdragon 685", "ram": 8, "rom": 128, "screen": "6.72 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 33, "camera_sau": "108MP + 2MP", "camera_truoc": "8MP", "os": "Android 14", "weight": 185, "water": "IP54"},
        {"name": "realme C65 128GB", "category": "pho_thong", "type": "Android", "price_goc": 3990000, "price_ban": 3590000, "chip": "MediaTek Helio G85", "ram": 6, "rom": 128, "screen": "6.67 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 45, "camera_sau": "50MP + 2MP", "camera_truoc": "8MP", "os": "Android 14", "weight": 185, "water": "Không"},
        {"name": "realme Note 60 64GB", "category": "pho_thong", "type": "Android", "price_goc": 2990000, "price_ban": 2690000, "chip": "Unisoc Tiger T612", "ram": 4, "rom": 64, "screen": "6.74 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 10, "camera_sau": "32MP", "camera_truoc": "5MP", "os": "Android 14", "weight": 187, "water": "IP64 / Kháng lực ArmorShell"},
        {"name": "realme C53 128GB", "category": "pho_thong", "type": "Android", "price_goc": 4290000, "price_ban": 3690000, "chip": "Unisoc Tiger T612", "ram": 6, "rom": 128, "screen": "6.74 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 33, "camera_sau": "50MP + 0.08MP", "camera_truoc": "8MP", "os": "Android 13", "weight": 182, "water": "Không"},
        {"name": "realme Note 50 64GB", "category": "pho_thong", "type": "Android", "price_goc": 2490000, "price_ban": 2290000, "chip": "Unisoc Tiger T612", "ram": 3, "rom": 64, "screen": "6.74 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 10, "camera_sau": "13MP", "camera_truoc": "5MP", "os": "Android 13", "weight": 186, "water": "IP54"},
        {"name": "realme GT5 Pro 256GB", "category": "gaming", "type": "Android", "price_goc": 15990000, "price_ban": 13990000, "chip": "Snapdragon 8 Gen 3", "ram": 12, "rom": 256, "screen": "6.78 inches, AMOLED, 144Hz", "battery": 5400, "charging": 100, "camera_sau": "50MP + 50MP + 8MP", "camera_truoc": "32MP", "os": "Android 14", "weight": 218, "water": "IP64"},
        {"name": "realme C61 128GB", "category": "pho_thong", "type": "Android", "price_goc": 3590000, "price_ban": 3290000, "chip": "Unisoc Tiger T612", "ram": 4, "rom": 128, "screen": "6.74 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 15, "camera_sau": "32MP", "camera_truoc": "5MP", "os": "Android 14", "weight": 187, "water": "IP54"}
    ],
    "Nokia": [
        {"name": "Nokia XR21 5G 128GB", "category": "tam_trung", "type": "Android", "price_goc": 12990000, "price_ban": 11490000, "chip": "Snapdragon 695 5G", "ram": 6, "rom": 128, "screen": "6.49 inches, IPS LCD, 120Hz", "battery": 4800, "charging": 33, "camera_sau": "64MP + 8MP", "camera_truoc": "16MP", "os": "Android 13", "weight": 231, "water": "IP68 / IP69K (Siêu bền quân đội)"},
        {"name": "Nokia G42 5G 128GB", "category": "tam_trung", "type": "Android", "price_goc": 5990000, "price_ban": 5290000, "chip": "Snapdragon 480+ 5G", "ram": 6, "rom": 128, "screen": "6.56 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 20, "camera_sau": "50MP + 2MP + 2MP", "camera_truoc": "8MP", "os": "Android 13 (Hỗ trợ tự sửa chữa QuickFix)", "weight": 193, "water": "IP52"},
        {"name": "Nokia C32 128GB", "category": "pho_thong", "type": "Android", "price_goc": 3290000, "price_ban": 2790000, "chip": "Unisoc SC9863A", "ram": 4, "rom": 128, "screen": "6.5 inches, IPS LCD, 60Hz", "battery": 5000, "charging": 10, "camera_sau": "50MP + 2MP", "camera_truoc": "8MP", "os": "Android 13", "weight": 199, "water": "IP52"},
        {"name": "Nokia 105 4G Pro (2025)", "category": "pho_thong", "type": "Feature", "price_goc": 850000, "price_ban": 750000, "chip": "Unisoc T107", "ram": 1, "rom": 2, "screen": "2.0 inches, QVGA", "battery": 1450, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Nokia Series 30+", "weight": 95, "water": "Không"},
        {"name": "Nokia 110 4G Pro (2025)", "category": "pho_thong", "type": "Feature", "price_goc": 950000, "price_ban": 850000, "chip": "Unisoc T107", "ram": 1, "rom": 2, "screen": "2.0 inches, QVGA", "battery": 1450, "charging": 5, "camera_sau": "0.3MP", "camera_truoc": "Không", "os": "Nokia Series 30+", "weight": 98, "water": "Không"},
        {"name": "Nokia 2660 Flip 4G", "category": "pho_thong", "type": "Feature", "price_goc": 1790000, "price_ban": 1590000, "chip": "Unisoc T107", "ram": 1, "rom": 2, "screen": "2.8 inches TFT chính, 1.77 inches phụ", "battery": 1450, "charging": 5, "camera_sau": "0.3MP", "camera_truoc": "Không", "os": "Nokia Series 30+", "weight": 123, "water": "Không"},
        {"name": "Nokia 8210 4G", "category": "pho_thong", "type": "Feature", "price_goc": 1590000, "price_ban": 1390000, "chip": "Unisoc T107", "ram": 1, "rom": 2, "screen": "2.8 inches, QVGA", "battery": 1450, "charging": 5, "camera_sau": "0.3MP", "camera_truoc": "Không", "os": "Nokia Series 30+", "weight": 107, "water": "Không"},
        {"name": "Nokia 5710 XpressAudio", "category": "pho_thong", "type": "Feature", "price_goc": 1990000, "price_ban": 1690000, "chip": "Unisoc T107", "ram": 1, "rom": 2, "screen": "2.4 inches, QVGA", "battery": 1450, "charging": 5, "camera_sau": "0.3MP (Tích hợp tai nghe TWS trong máy)", "camera_truoc": "Không", "os": "Nokia Series 30+", "weight": 129, "water": "Không"},
        {"name": "Nokia G22 128GB", "category": "pho_thong", "type": "Android", "price_goc": 4290000, "price_ban": 3490000, "chip": "Unisoc Tiger T606", "ram": 4, "rom": 128, "screen": "6.52 inches, IPS LCD, 90Hz", "battery": 5050, "charging": 20, "camera_sau": "50MP + 2MP + 2MP", "camera_truoc": "8MP", "os": "Android 12", "weight": 196, "water": "IP52"},
        {"name": "Nokia C12 64GB", "category": "pho_thong", "type": "Android", "price_goc": 2490000, "price_ban": 1990000, "chip": "Unisoc SC9863A1", "ram": 3, "rom": 64, "screen": "6.3 inches, IPS LCD, 60Hz", "battery": 3000, "charging": 5, "camera_sau": "8MP", "camera_truoc": "5MP", "os": "Android 12 Go", "weight": 177, "water": "IP52"}
    ],
    "Tecno": [
        {"name": "Tecno Phantom V Fold2 5G", "category": "flagship", "type": "Fold", "price_goc": 26990000, "price_ban": 25990000, "chip": "Dimensity 9000+", "ram": 12, "rom": 512, "screen": "7.85 inches chính, 6.42 inches phụ, AMOLED, 120Hz", "battery": 5750, "charging": 70, "camera_sau": "50MP + 50MP + 50MP", "camera_truoc": "32MP + 32MP", "os": "HiOS 14 (Android 14)", "weight": 249, "water": "IP54"},
        {"name": "Tecno Camon 30 Premier 5G", "category": "tam_trung", "type": "Android", "price_goc": 12990000, "price_ban": 11990000, "chip": "Dimensity 8200 Ultimate", "ram": 12, "rom": 512, "screen": "6.77 inches, LTPO AMOLED, 120Hz", "battery": 5000, "charging": 70, "camera_sau": "50MP + 50MP + 50MP", "camera_truoc": "50MP", "os": "HiOS 14", "weight": 210, "water": "IP54"},
        {"name": "Tecno Pova 6 Pro 5G 256GB", "category": "gaming", "type": "Android", "price_goc": 7490000, "price_ban": 6990000, "chip": "Dimensity 6080 (Thiết kế LED mecha)", "ram": 12, "rom": 256, "screen": "6.78 inches, AMOLED, 120Hz", "battery": 6000, "charging": 70, "camera_sau": "108MP + 2MP + 0.08MP", "camera_truoc": "32MP", "os": "HiOS 14", "weight": 195, "water": "IP53"},
        {"name": "Tecno Spark 20 Pro Plus 256GB", "category": "tam_trung", "type": "Android", "price_goc": 5490000, "price_ban": 4990000, "chip": "MediaTek Helio G99 Ultimate", "ram": 8, "rom": 256, "screen": "6.78 inches, AMOLED cong, 120Hz", "battery": 5000, "charging": 33, "camera_sau": "108MP + 0.08MP", "camera_truoc": "32MP", "os": "HiOS 14", "weight": 179, "water": "IP53"},
        {"name": "Tecno Camon 30 Pro 5G", "category": "tam_trung", "type": "Android", "price_goc": 9990000, "price_ban": 8990000, "chip": "Dimensity 8200 Ultimate", "ram": 12, "rom": 256, "screen": "6.78 inches, AMOLED, 144Hz", "battery": 5000, "charging": 70, "camera_sau": "50MP + 50MP + 2MP", "camera_truoc": "50MP", "os": "HiOS 14", "weight": 188, "water": "IP53"},
        {"name": "Tecno Pova 5 Pro 5G", "category": "gaming", "type": "Android", "price_goc": 5290000, "price_ban": 4590000, "chip": "Dimensity 6080 (Thiết kế LED 3D)", "ram": 8, "rom": 256, "screen": "6.78 inches, IPS LCD, 120Hz", "battery": 5000, "charging": 68, "camera_sau": "50MP + 0.08MP", "camera_truoc": "16MP", "os": "HiOS 13", "weight": 212, "water": "Không"},
        {"name": "Tecno Spark 20 128GB", "category": "pho_thong", "type": "Android", "price_goc": 3490000, "price_ban": 3090000, "chip": "MediaTek Helio G85", "ram": 8, "rom": 128, "screen": "6.6 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 18, "camera_sau": "50MP + 0.08MP", "camera_truoc": "32MP", "os": "HiOS 13", "weight": 190, "water": "IP53"},
        {"name": "Tecno Pop 8 64GB", "category": "pho_thong", "type": "Android", "price_goc": 2490000, "price_ban": 2090000, "chip": "Unisoc Tiger T606", "ram": 3, "rom": 64, "screen": "6.6 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 10, "camera_sau": "13MP + 0.08MP", "camera_truoc": "8MP", "os": "Android 13 Go (HiOS 13)", "weight": 184, "water": "Không"},
        {"name": "Tecno Phantom V Flip2 5G", "category": "flagship", "type": "Fold", "price_goc": 18990000, "price_ban": 17990000, "chip": "Dimensity 8020", "ram": 8, "rom": 256, "screen": "6.9 inches chính, 3.64 inches phụ, LTPO AMOLED, 120Hz", "battery": 4720, "charging": 70, "camera_sau": "50MP + 50MP", "camera_truoc": "32MP", "os": "HiOS 14", "weight": 196, "water": "Không"},
        {"name": "Tecno Spark Go 2024 64GB", "category": "pho_thong", "type": "Android", "price_goc": 2290000, "price_ban": 1890000, "chip": "Unisoc Tiger T606", "ram": 3, "rom": 64, "screen": "6.6 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 10, "camera_sau": "13MP", "camera_truoc": "8MP", "os": "Android 13 Go", "weight": 185, "water": "Không"}
    ],
    "HONOR": [
        {"name": "HONOR Magic6 Pro 5G 512GB", "category": "flagship", "type": "AI", "price_goc": 28990000, "price_ban": 26990000, "chip": "Snapdragon 8 Gen 3", "ram": 16, "rom": 512, "screen": "6.8 inches, LTPO OLED, 120Hz", "battery": 5600, "charging": 80, "camera_sau": "50MP + 180MP + 50MP", "camera_truoc": "50MP + Cảm biến TOF 3D", "os": "MagicOS 8 (Android 14)", "weight": 225, "water": "IP68"},
        {"name": "HONOR Magic V2 512GB", "category": "flagship", "type": "Fold", "price_goc": 39990000, "price_ban": 37990000, "chip": "Snapdragon 8 Gen 2 (Siêu mỏng 9.9mm)", "ram": 16, "rom": 512, "screen": "7.92 inches chính, 6.43 inches phụ, OLED, 120Hz", "battery": 5000, "charging": 66, "camera_sau": "50MP + 20MP + 50MP", "camera_truoc": "16MP", "os": "MagicOS 7.2", "weight": 231, "water": "Không"},
        {"name": "HONOR 200 Pro 5G 512GB", "category": "tam_trung", "type": "Android", "price_goc": 16990000, "price_ban": 15490000, "chip": "Snapdragon 8s Gen 3 (Camera Studio Harcourt)", "ram": 12, "rom": 512, "screen": "6.78 inches, OLED, 120Hz", "battery": 5200, "charging": 100, "camera_sau": "50MP + 50MP + 12MP", "camera_truoc": "50MP", "os": "MagicOS 8", "weight": 199, "water": "IP55"},
        {"name": "HONOR X9b 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 8990000, "price_ban": 7990000, "chip": "Snapdragon 6 Gen 1 (Màn hình chống rơi 360 độ)", "ram": 12, "rom": 256, "screen": "6.78 inches, AMOLED, 120Hz", "battery": 5800, "charging": 35, "camera_sau": "108MP + 5MP + 2MP", "camera_truoc": "16MP", "os": "MagicUI 7.2 (Android 13)", "weight": 185, "water": "IP53"},
        {"name": "HONOR 200 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 12990000, "price_ban": 11990000, "chip": "Snapdragon 7 Gen 3", "ram": 12, "rom": 256, "screen": "6.7 inches, OLED, 120Hz", "battery": 5200, "charging": 100, "camera_sau": "50MP + 50MP + 12MP", "camera_truoc": "50MP", "os": "MagicOS 8", "weight": 187, "water": "Không"},
        {"name": "HONOR 90 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 10990000, "price_ban": 8990000, "chip": "Snapdragon 7 Gen 1", "ram": 12, "rom": 256, "screen": "6.7 inches, AMOLED, 120Hz", "battery": 5000, "charging": 66, "camera_sau": "200MP + 12MP + 2MP", "camera_truoc": "50MP", "os": "MagicOS 7.1", "weight": 183, "water": "Không"},
        {"name": "HONOR X8b 256GB", "category": "tam_trung", "type": "Android", "price_goc": 6490000, "price_ban": 5690000, "chip": "Snapdragon 680", "ram": 8, "rom": 256, "screen": "6.7 inches, AMOLED, 90Hz", "battery": 4500, "charging": 35, "camera_sau": "108MP + 5MP + 2MP", "camera_truoc": "50MP (Đèn selfie flash)", "os": "MagicOS 7.2", "weight": 166, "water": "Không"},
        {"name": "HONOR X7b 128GB", "category": "pho_thong", "type": "Android", "price_goc": 5290000, "price_ban": 4490000, "chip": "Snapdragon 680", "ram": 8, "rom": 128, "screen": "6.8 inches, IPS LCD, 90Hz", "battery": 6000, "charging": 35, "camera_sau": "108MP + 5MP + 2MP", "camera_truoc": "8MP", "os": "MagicOS 7.2", "weight": 199, "water": "Không"},
        {"name": "HONOR X6a 128GB", "category": "pho_thong", "type": "Android", "price_goc": 3490000, "price_ban": 2990000, "chip": "MediaTek Helio G36", "ram": 4, "rom": 128, "screen": "6.56 inches, IPS LCD, 90Hz", "battery": 5200, "charging": 22.5, "camera_sau": "50MP + 2MP + 2MP", "camera_truoc": "5MP", "os": "MagicOS 7.1", "weight": 188, "water": "Không"},
        {"name": "HONOR Magic6 Lite 256GB", "category": "tam_trung", "type": "Android", "price_goc": 7990000, "price_ban": 7290000, "chip": "Snapdragon 6 Gen 1", "ram": 8, "rom": 256, "screen": "6.78 inches, AMOLED, 120Hz", "battery": 5300, "charging": 35, "camera_sau": "108MP + 5MP + 2MP", "camera_truoc": "16MP", "os": "MagicOS 7.2", "weight": 185, "water": "IP53"}
    ],
    "Motorola": [
        {"name": "Motorola Edge 50 Ultra 512GB", "category": "flagship", "type": "AI", "price_goc": 26990000, "price_ban": 24990000, "chip": "Snapdragon 8s Gen 3 (Mặt lưng gỗ/da thật)", "ram": 16, "rom": 512, "screen": "6.7 inches, P-OLED, 144Hz", "battery": 4500, "charging": 125, "camera_sau": "50MP + 64MP + 50MP", "camera_truoc": "50MP", "os": "Android 14 (Hello UX)", "weight": 197, "water": "IP68"},
        {"name": "Motorola Razr 50 Ultra 512GB", "category": "flagship", "type": "Fold", "price_goc": 28990000, "price_ban": 26990000, "chip": "Snapdragon 8s Gen 3", "ram": 12, "rom": 512, "screen": "6.9 inches chính, 4.0 inches phụ, P-OLED, 165Hz", "battery": 4000, "charging": 45, "camera_sau": "50MP + 50MP", "camera_truoc": "32MP", "os": "Android 14", "weight": 189, "water": "IPX8"},
        {"name": "Motorola Edge 50 Pro 256GB", "category": "tam_trung", "type": "Android", "price_goc": 18990000, "price_ban": 17490000, "chip": "Snapdragon 7 Gen 3", "ram": 12, "rom": 256, "screen": "6.7 inches, P-OLED, 144Hz", "battery": 4500, "charging": 125, "camera_sau": "50MP + 10MP + 13MP", "camera_truoc": "50MP", "os": "Android 14", "weight": 186, "water": "IP68"},
        {"name": "Motorola Edge 50 Fusion 256GB", "category": "tam_trung", "type": "Android", "price_goc": 10990000, "price_ban": 9990000, "chip": "Snapdragon 7s Gen 2", "ram": 8, "rom": 256, "screen": "6.7 inches, P-OLED, 120Hz", "battery": 5000, "charging": 68, "camera_sau": "50MP + 13MP", "camera_truoc": "32MP", "os": "Android 14", "weight": 175, "water": "IP68"},
        {"name": "Motorola Moto G85 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 6990000, "price_ban": 6490000, "chip": "Snapdragon 6s Gen 3 (Màn hình cong)", "ram": 8, "rom": 256, "screen": "6.67 inches, P-OLED, 120Hz", "battery": 5000, "charging": 30, "camera_sau": "50MP + 8MP", "camera_truoc": "32MP", "os": "Android 14", "weight": 173, "water": "Không"},
        {"name": "Motorola Razr 50 256GB", "category": "flagship", "type": "Fold", "price_goc": 21990000, "price_ban": 19990000, "chip": "Dimensity 7300X", "ram": 8, "rom": 256, "screen": "6.9 inches chính, 3.6 inches phụ, P-OLED, 120Hz", "battery": 4200, "charging": 30, "camera_sau": "50MP + 13MP", "camera_truoc": "32MP", "os": "Android 14", "weight": 188, "water": "IPX8"},
        {"name": "Motorola Moto G54 5G 128GB", "category": "tam_trung", "type": "Android", "price_goc": 4990000, "price_ban": 4290000, "chip": "Dimensity 7020", "ram": 8, "rom": 128, "screen": "6.5 inches, IPS LCD, 120Hz", "battery": 5000, "charging": 15, "camera_sau": "50MP + 2MP", "camera_truoc": "16MP", "os": "Android 13", "weight": 177, "water": "Chống tràn nước"},
        {"name": "Motorola Moto G24 Power 128GB", "category": "pho_thong", "type": "Android", "price_goc": 3690000, "price_ban": 3290000, "chip": "MediaTek Helio G85", "ram": 4, "rom": 128, "screen": "6.56 inches, IPS LCD, 90Hz", "battery": 6000, "charging": 30, "camera_sau": "50MP + 2MP", "camera_truoc": "8MP", "os": "Android 14", "weight": 197, "water": "Chống tràn nước"},
        {"name": "Motorola Moto G14 64GB", "category": "pho_thong", "type": "Android", "price_goc": 2790000, "price_ban": 2390000, "chip": "Unisoc Tiger T616", "ram": 4, "rom": 64, "screen": "6.5 inches, IPS LCD, 60Hz", "battery": 5000, "charging": 15, "camera_sau": "50MP + 2MP", "camera_truoc": "8MP", "os": "Android 13", "weight": 177, "water": "Chống tràn nước"},
        {"name": "Motorola Edge 40 Neo 256GB", "category": "tam_trung", "type": "Android", "price_goc": 8990000, "price_ban": 7990000, "chip": "Dimensity 7030", "ram": 8, "rom": 256, "screen": "6.55 inches, P-OLED, 144Hz", "battery": 5000, "charging": 68, "camera_sau": "50MP + 13MP", "camera_truoc": "32MP", "os": "Android 13", "weight": 170, "water": "IP68"}
    ],
    "Masstel": [
        {"name": "Masstel Izi 10 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 450000, "price_ban": 390000, "chip": "Unisoc T107 (Hỗ trợ 4G VoLTE)", "ram": 1, "rom": 1, "screen": "1.77 inches, QQVGA", "battery": 1000, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Masstel OS", "weight": 85, "water": "Không"},
        {"name": "Masstel Izi 20 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 550000, "price_ban": 490000, "chip": "Unisoc T107", "ram": 1, "rom": 1, "screen": "2.4 inches, QVGA", "battery": 1400, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Masstel OS", "weight": 92, "water": "Không"},
        {"name": "Masstel Izi 30 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 650000, "price_ban": 590000, "chip": "Unisoc T107 (Phông chữ cực lớn)", "ram": 1, "rom": 1, "screen": "2.8 inches, QVGA", "battery": 1800, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Masstel OS", "weight": 105, "water": "Không"},
        {"name": "Masstel Fami 60 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 850000, "price_ban": 750000, "chip": "Unisoc T107 (Có phím SOS khẩn cấp)", "ram": 1, "rom": 1, "screen": "2.0 inches, QVGA", "battery": 1400, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Fami OS", "weight": 110, "water": "Không"},
        {"name": "Masstel Fami 12 4G", "category": "pho_thong", "type": "Feature", "price_goc": 690000, "price_ban": 590000, "chip": "Unisoc T107 (Bàn phím nổi to rõ)", "ram": 1, "rom": 1, "screen": "1.77 inches, QQVGA", "battery": 1400, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Fami OS", "weight": 98, "water": "Không"},
        {"name": "Masstel Fami 50 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 890000, "price_ban": 790000, "chip": "Unisoc T107 (Đèn pin kép siêu sáng)", "ram": 1, "rom": 1, "screen": "2.2 inches, QVGA", "battery": 1600, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Fami OS", "weight": 108, "water": "Không"},
        {"name": "Masstel Izi 55 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 750000, "price_ban": 670000, "chip": "Unisoc T107 (Nghe đài FM không cần tai nghe)", "ram": 1, "rom": 1, "screen": "2.4 inches, QVGA", "battery": 1800, "charging": 5, "camera_sau": "0.08MP", "camera_truoc": "Không", "os": "Masstel OS", "weight": 112, "water": "Không"},
        {"name": "Masstel Izi 12 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 490000, "price_ban": 420000, "chip": "Unisoc T107", "ram": 1, "rom": 1, "screen": "1.77 inches, QQVGA", "battery": 1000, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Masstel OS", "weight": 87, "water": "Không"},
        {"name": "Masstel HAPI 30 4G", "category": "pho_thong", "type": "Android", "price_goc": 1990000, "price_ban": 1790000, "chip": "MediaTek MT6739", "ram": 3, "rom": 32, "screen": "5.0 inches, HD, 60Hz", "battery": 2000, "charging": 5, "camera_sau": "5MP", "camera_truoc": "2MP", "os": "Android 11 Go", "weight": 145, "water": "Không"},
        {"name": "Masstel Izi 32 4G", "category": "pho_thong", "type": "Feature", "price_goc": 690000, "price_ban": 620000, "chip": "Unisoc T107", "ram": 1, "rom": 1, "screen": "2.8 inches, QVGA", "battery": 1500, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Masstel OS", "weight": 103, "water": "Không"}
    ],
    "Mobell": [
        {"name": "Mobell Rock 4 4G", "category": "pho_thong", "type": "Feature", "price_goc": 750000, "price_ban": 690000, "chip": "Unisoc T107 (Thiết kế hầm hố chống va đập)", "ram": 1, "rom": 1, "screen": "2.4 inches, QVGA", "battery": 3250, "charging": 5, "camera_sau": "0.08MP", "camera_truoc": "Không", "os": "Mobell OS", "weight": 160, "water": "Kháng bụi nước nhẹ"},
        {"name": "Mobell M529 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 590000, "price_ban": 520000, "chip": "Unisoc T107 (Pin khủng kéo dài)", "ram": 1, "rom": 1, "screen": "2.4 inches, QVGA", "battery": 2500, "charging": 5, "camera_sau": "0.08MP", "camera_truoc": "Không", "os": "Mobell OS", "weight": 120, "water": "Không"},
        {"name": "Mobell M229 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 450000, "price_ban": 390000, "chip": "Unisoc T107 (Bàn phím mềm mại)", "ram": 1, "rom": 1, "screen": "1.77 inches, QQVGA", "battery": 1000, "charging": 5, "camera_sau": "Không", "camera_truoc": "Không", "os": "Mobell OS", "weight": 86, "water": "Không"},
        {"name": "Mobell M389 4G Pro", "category": "pho_thong", "type": "Feature", "price_goc": 650000, "price_ban": 590000, "chip": "Unisoc T107 (Thiết kế giả da)", "ram": 1, "rom": 1, "screen": "2.4 inches, QVGA", "battery": 1700, "charging": 5, "camera_sau": "0.08MP", "camera_truoc": "Không", "os": "Mobell OS", "weight": 102, "water": "Không"},
        {"name": "Mobell F209 4G nắp gập", "category": "pho_thong", "type": "Feature", "price_goc": 850000, "price_ban": 770000, "chip": "Unisoc T107 (Thiết kế nắp gập thời trang)", "ram": 1, "rom": 1, "screen": "2.4 inches, QVGA", "battery": 1200, "charging": 5, "camera_sau": "0.08MP", "camera_truoc": "Không", "os": "Mobell OS", "weight": 115, "water": "Không"},
        {"name": "Mobell F309 4G nắp gập", "category": "pho_thong", "type": "Feature", "price_goc": 890000, "price_ban": 790000, "chip": "Unisoc T107", "ram": 1, "rom": 1, "screen": "2.8 inches, QVGA", "battery": 1500, "charging": 5, "camera_sau": "0.08MP", "camera_truoc": "Không", "os": "Mobell OS", "weight": 122, "water": "Không"},
        {"name": "Mobell Nova P3 4G", "category": "pho_thong", "type": "Android", "price_goc": 1990000, "price_ban": 1750000, "chip": "MediaTek MT6739", "ram": 2, "rom": 16, "screen": "6.08 inches, HD, 60Hz", "battery": 3000, "charging": 5, "camera_sau": "5MP", "camera_truoc": "2MP", "os": "Android 11 Go", "weight": 165, "water": "Không"},
        {"name": "Mobell Nova S3 4G", "category": "pho_thong", "type": "Android", "price_goc": 2190000, "price_ban": 1950000, "chip": "MediaTek MT6739", "ram": 3, "rom": 32, "screen": "6.26 inches, HD, 60Hz", "battery": 3500, "charging": 5, "camera_sau": "8MP", "camera_truoc": "5MP", "os": "Android 11 Go", "weight": 175, "water": "Không"},
        {"name": "Mobell S40 3G", "category": "pho_thong", "type": "Android", "price_goc": 1490000, "price_ban": 1190000, "chip": "Spreadtrum SC7731E", "ram": 1, "rom": 8, "screen": "5.0 inches, FWVGA", "battery": 2000, "charging": 5, "camera_sau": "5MP", "camera_truoc": "2MP", "os": "Android 8.1 Go", "weight": 140, "water": "Không"},
        {"name": "Mobell S41 4G", "category": "pho_thong", "type": "Android", "price_goc": 1790000, "price_ban": 1490000, "chip": "Unisoc SC9832E", "ram": 2, "rom": 16, "screen": "5.0 inches, FWVGA", "battery": 2200, "charging": 5, "camera_sau": "5MP", "camera_truoc": "2MP", "os": "Android 10 Go", "weight": 142, "water": "Không"}
    ],
    "Nubia": [
        {"name": "Nubia RedMagic 9S Pro 5G", "category": "gaming", "type": "Android", "price_goc": 23990000, "price_ban": 22490000, "chip": "Snapdragon 8 Gen 3 Leading Version (Quạt tản nhiệt cơ học)", "ram": 16, "rom": 512, "screen": "6.8 inches, AMOLED flat không khuyết điểm, 120Hz", "battery": 6500, "charging": 80, "camera_sau": "50MP + 50MP + 2MP", "camera_truoc": "16MP dưới màn hình", "os": "RedMagic OS 9.5 (Android 14)", "weight": 229, "water": "Không"},
        {"name": "Nubia RedMagic 9 Pro 5G", "category": "gaming", "type": "Android", "price_goc": 21990000, "price_ban": 19990000, "chip": "Snapdragon 8 Gen 3", "ram": 12, "rom": 256, "screen": "6.8 inches, AMOLED flat, 120Hz", "battery": 6500, "charging": 80, "camera_sau": "50MP + 50MP + 2MP", "camera_truoc": "16MP dưới màn hình", "os": "RedMagic OS 9.0", "weight": 229, "water": "Không"},
        {"name": "Nubia Z60 Ultra 512GB", "category": "flagship", "type": "Android", "price_goc": 25990000, "price_ban": 23990000, "chip": "Snapdragon 8 Gen 3 (Ống kính tiêu cự 35mm)", "ram": 16, "rom": 512, "screen": "6.8 inches, AMOLED flat, 120Hz", "battery": 6000, "charging": 80, "camera_sau": "50MP + 64MP + 50MP", "camera_truoc": "12MP dưới màn hình", "os": "MyOS 14 (Android 14)", "weight": 246, "water": "IP68"},
        {"name": "Nubia Focus Pro 5G 256GB", "category": "tam_trung", "type": "Android", "price_goc": 6990000, "price_ban": 6290000, "chip": "Unisoc T760 (Thiết kế máy ảnh cơ học)", "ram": 8, "rom": 256, "screen": "6.72 inches, IPS LCD, 120Hz", "battery": 5000, "charging": 33, "camera_sau": "108MP + 2MP + 2MP", "camera_truoc": "32MP", "os": "Android 13", "weight": 205, "water": "Không"},
        {"name": "Nubia Neo 2 5G 256GB", "category": "gaming", "type": "Android", "price_goc": 5990000, "price_ban": 5290000, "chip": "Unisoc T820 (Phím vai trigger cảm ứng)", "ram": 8, "rom": 256, "screen": "6.72 inches, IPS LCD, 120Hz", "battery": 6000, "charging": 33, "camera_sau": "50MP + 2MP", "camera_truoc": "8MP", "os": "Android 13", "weight": 208, "water": "Không"},
        {"name": "Nubia Focus 5G 128GB", "category": "pho_thong", "type": "Android", "price_goc": 4990000, "price_ban": 4290000, "chip": "Unisoc T760", "ram": 6, "rom": 128, "screen": "6.56 inches, IPS LCD, 120Hz", "battery": 5000, "charging": 22.5, "camera_sau": "108MP", "camera_truoc": "8MP", "os": "Android 13", "weight": 195, "water": "Không"},
        {"name": "Nubia Neo 5G 256GB", "category": "gaming", "type": "Android", "price_goc": 4990000, "price_ban": 4190000, "chip": "Unisoc T820", "ram": 8, "rom": 256, "screen": "6.6 inches, IPS LCD, 120Hz", "battery": 4500, "charging": 22.5, "camera_sau": "50MP + 2MP", "camera_truoc": "8MP", "os": "Android 13", "weight": 192, "water": "Không"},
        {"name": "Nubia Music 128GB", "category": "pho_thong", "type": "Android", "price_goc": 2990000, "price_ban": 2590000, "chip": "Unisoc SC9863A (Loa khủng đĩa than 600%)", "ram": 4, "rom": 128, "screen": "6.6 inches, IPS LCD, 90Hz", "battery": 5000, "charging": 10, "camera_sau": "50MP + 0.08MP", "camera_truoc": "5MP", "os": "Android 13", "weight": 199, "water": "Không"},
        {"name": "Nubia RedMagic 8S Pro 256GB", "category": "gaming", "type": "Android", "price_goc": 19990000, "price_ban": 17490000, "chip": "Snapdragon 8 Gen 2", "ram": 12, "rom": 256, "screen": "6.8 inches, AMOLED flat, 120Hz", "battery": 6000, "charging": 80, "camera_sau": "50MP + 8MP + 2MP", "camera_truoc": "16MP dưới màn hình", "os": "RedMagic OS 8.0", "weight": 228, "water": "Không"},
        {"name": "Nubia Z50S Pro 256GB", "category": "flagship", "type": "Android", "price_goc": 17990000, "price_ban": 14990000, "chip": "Snapdragon 8 Gen 2", "ram": 12, "rom": 256, "screen": "6.78 inches, AMOLED, 120Hz", "battery": 5100, "charging": 80, "camera_sau": "50MP + 50MP + 8MP", "camera_truoc": "16MP", "os": "MyOS 13", "weight": 228, "water": "Không"}
    ]
}

def make_slug(name):
    # Convert name to a clean URL slug
    slug = name.lower()
    # Replace Vietnamese accents / simple character replacement
    char_map = {
        'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ấ': 'a', 'ần': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a', 'ầ': 'a',
        'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'đ': 'd'
    }
    for k, v in char_map.items():
        slug = slug.replace(k, v)
    
    # Replace special characters and spaces
    for c in "()+/.&":
        slug = slug.replace(c, " ")
    slug = "-".join(slug.split())
    return slug

def generate_svg_markup(view_type, brand, model_name, storage, price_str, theme):
    body_color = theme["body"]
    accent_color = theme["accent"]
    wallpaper_color = theme["wallpaper"]
    
    if view_type == "front":
        return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="wallpaper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{body_color}"/>
      <stop offset="50%" stop-color="{wallpaper_color}"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <!-- Background -->
  <rect width="800" height="1000" rx="20" fill="url(#bg-grad)"/>
  
  <!-- Outer Bezel -->
  <rect x="220" y="100" width="360" height="800" rx="40" fill="#0f172a" stroke="{accent_color}" stroke-width="4" />
  
  <!-- Screen Wallpaper -->
  <rect x="230" y="110" width="340" height="780" rx="32" fill="url(#wallpaper-grad)"/>
  
  <!-- Glow Effect on screen -->
  <circle cx="400" cy="500" r="120" fill="{wallpaper_color}" opacity="0.3" filter="url(#glow)"/>
  
  <!-- UI Text Overlay -->
  <text x="400" y="240" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" letter-spacing="2" text-anchor="middle">PhoneStore v2026</text>
  <text x="400" y="440" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="bold" text-anchor="middle">{model_name}</text>
  <text x="400" y="490" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="18" text-anchor="middle">{brand} • {storage}</text>
  <text x="400" y="550" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="bold" text-anchor="middle">{price_str}</text>
  
  <!-- Dynamic Island or Punch hole notch -->
  <rect x="340" y="125" width="120" height="24" rx="12" fill="#000"/>
  <circle cx="445" cy="137" r="4" fill="#020617"/>
  <circle cx="445" cy="137" r="1.5" fill="#3b82f6"/>
  
  <!-- Home Indicator bar -->
  <rect x="330" y="875" width="140" height="5" rx="2.5" fill="#ffffff" opacity="0.8"/>
</svg>"""

    elif view_type == "back":
        # Draw camera lenses depending on brand/model (mock representations)
        lenses = ""
        if brand in ["Apple", "Samsung", "Xiaomi", "OPPO", "vivo", "Nubia"]:
            # Triple or Quad camera setup
            lenses = f"""
      <rect x="250" y="130" width="120" height="120" rx="24" fill="#000000" opacity="0.3" />
      <circle cx="285" cy="165" r="22" fill="#000000" stroke="#334155" stroke-width="2"/>
      <circle cx="285" cy="165" r="8" fill="#1e293b"/>
      <circle cx="335" cy="165" r="22" fill="#000000" stroke="#334155" stroke-width="2"/>
      <circle cx="335" cy="165" r="8" fill="#1e293b"/>
      <circle cx="285" cy="215" r="22" fill="#000000" stroke="#334155" stroke-width="2"/>
      <circle cx="285" cy="215" r="8" fill="#1e293b"/>
      <circle cx="335" cy="210" r="6" fill="#e2e8f0"/> <!-- Flash -->
            """
        else:
            # Dual or Single camera setup
            lenses = f"""
      <rect x="260" y="130" width="100" height="70" rx="16" fill="#000000" opacity="0.4" />
      <circle cx="290" cy="165" r="20" fill="#000000" stroke="#334155" stroke-width="2"/>
      <circle cx="290" cy="165" r="6" fill="#1e293b"/>
      <circle cx="330" cy="165" r="10" fill="#e2e8f0"/> <!-- Flash/Lens -->
            """

        brand_logo = f"""<text x="400" y="760" fill="{accent_color}" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="bold" letter-spacing="4" text-anchor="middle" opacity="0.7">{brand.upper()}</text>"""
        if brand == "Apple":
            # Simple vector Apple-like leaf/circle logo representation
            brand_logo = """
      <g transform="translate(370, 710) scale(0.6)">
        <path d="M 50 10 C 35 10 20 22 20 40 C 20 65 42 90 50 90 C 58 90 80 65 80 40 C 80 22 65 10 50 10 Z" fill="#ffffff" opacity="0.6"/>
        <path d="M 55 5 C 65 10 65 20 60 25 C 50 22 50 12 55 5 Z" fill="#ffffff" opacity="0.6"/>
      </g>
            """

        return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="{body_color}"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="1000" rx="20" fill="url(#bg-grad)"/>
  
  <!-- Outer Bezel -->
  <rect x="220" y="100" width="360" height="800" rx="40" fill="url(#body-grad)" stroke="{accent_color}" stroke-width="4" />
  
  <!-- Camera Module -->
  {lenses}
  
  <!-- Brand Logo -->
  {brand_logo}
  
  <!-- Product Label -->
  <text x="400" y="830" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="16" text-anchor="middle">{model_name}</text>
</svg>"""

    else: # detail view
        return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="macro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{body_color}"/>
      <stop offset="100%" stop-color="{wallpaper_color}"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="1000" rx="20" fill="url(#bg-grad)"/>
  
  <!-- Zoomed Macro view of lens / screen edge -->
  <circle cx="400" cy="500" r="300" fill="url(#macro-grad)" stroke="{accent_color}" stroke-width="8" />
  <circle cx="400" cy="500" r="280" fill="#020617"/>
  
  <!-- Lens reflect effect -->
  <circle cx="400" cy="500" r="160" fill="none" stroke="#38bdf8" stroke-width="6" opacity="0.5"/>
  <circle cx="400" cy="500" r="80" fill="#1e293b"/>
  <circle cx="370" cy="470" r="30" fill="#ffffff" opacity="0.15"/>
  
  <!-- Info Overlay -->
  <rect x="250" y="850" width="300" height="80" rx="16" fill="#0f172a" stroke="{accent_color}" stroke-width="2" />
  <text x="400" y="895" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" text-anchor="middle">CÔNG NGHỆ ĐỘT PHÁ 2026</text>
</svg>"""

def generate_markdown_spec(brand, phone, slug):
    p_ban = f"{phone['price_ban']:,}đ".replace(",", ".")
    p_goc = f"{phone['price_goc']:,}đ".replace(",", ".")
    
    md = f"""# Thông số kỹ thuật chi tiết: {phone['name']}

Điện thoại **{phone['name']}** thuộc phân khúc **{phone['category'].upper()}** của hãng **{brand}**, chạy hệ điều hành **{phone['os']}**. Máy được trang bị chip **{phone['chip']}**, **{phone['ram']}GB RAM** và **{phone['rom']}GB** dung lượng bộ nhớ trong.

---

## 📊 Bảng thông số kỹ thuật chi tiết

| Thông số | Giá trị |
|---|---|
| **Tên sản phẩm** | {phone['name']} |
| **Hãng sản xuất** | {brand} |
| **Phân khúc** | {phone['category']} |
| **Loại điện thoại** | {phone['type']} |
| **Giá gốc** | {p_goc} |
| **Giá khuyến mãi** | {p_ban} |
| **Vi xử lý (Chip)** | {phone['chip']} |
| **RAM** | {phone['ram']} GB |
| **Bộ nhớ trong (ROM)** | {phone['rom']} GB |
| **Màn hình** | {phone['screen']} |
| **Dung lượng pin** | {phone['battery']} mAh |
| **Sạc nhanh** | {phone['charging']} W |
| **Hỗ trợ 5G** | Hỗ trợ kết nối siêu tốc 5G |
| **Hệ điều hành** | {phone['os']} |
| **Camera sau** | {phone['camera_sau']} |
| **Camera trước** | {phone['camera_truoc']} |
| **Trọng lượng** | {phone['weight']} gram |
| **Chống nước** | {phone['water']} |

---

## 🌟 Mô tả sản phẩm
Được giới thiệu tính đến tháng 6/2026, **{phone['name']}** sở hữu thiết kế hiện đại, tối giản cùng những nâng cấp đột phá về hiệu năng nhờ vi xử lý **{phone['chip']}**. Với dung lượng pin lớn lên đến **{phone['battery']} mAh** kết hợp công nghệ sạc nhanh **{phone['charging']}W**, sản phẩm mang lại thời lượng sử dụng bền bỉ và tiện lợi cho người dùng.

Hệ thống camera đỉnh cao với camera sau **{phone['camera_sau']}** cho chất lượng chụp ảnh, quay phim chuyên nghiệp, sắc nét trong mọi điều kiện ánh sáng. Đây là sự lựa chọn hoàn hảo đáp ứng trọn vẹn nhu cầu làm việc, giải trí và sáng tạo của bạn.
"""
    return md

def main():
    root_dir = "data/dienthoai"
    os.makedirs(root_dir, exist_ok=True)
    
    total_brands = 0
    total_models = 0
    
    # Base64 decode to get binary of minimal valid webm video
    webm_binary = base64.b64decode(MINIMAL_WEBM_BASE64)
    
    print("Bắt đầu sinh dữ liệu mẫu điện thoại...")
    
    for brand, phones in PHONES_DATABASE.items():
        brand_dir = os.path.join(root_dir, brand)
        os.makedirs(brand_dir, exist_ok=True)
        total_brands += 1
        
        brand_products = []
        
        for idx, phone in enumerate(phones):
            slug = make_slug(phone["name"])
            product_dir = os.path.join(brand_dir, slug)
            os.makedirs(product_dir, exist_ok=True)
            
            # Subdirectories for media
            images_dir = os.path.join(product_dir, "images")
            videos_dir = os.path.join(product_dir, "videos")
            os.makedirs(images_dir, exist_ok=True)
            os.makedirs(videos_dir, exist_ok=True)
            
            p_ban_str = f"{phone['price_ban']:,}đ".replace(",", ".")
            theme = COLOR_THEMES.get(brand, {"body": "#1e293b", "accent": "#475569", "wallpaper": "#3b82f6"})
            
            # 1. Generate SVGs
            svg_front = generate_svg_markup("front", brand, phone["name"], f"{phone['rom']}GB", p_ban_str, theme)
            svg_back = generate_svg_markup("back", brand, phone["name"], f"{phone['rom']}GB", p_ban_str, theme)
            svg_detail = generate_svg_markup("detail", brand, phone["name"], f"{phone['rom']}GB", p_ban_str, theme)
            
            with open(os.path.join(images_dir, "front.svg"), "w", encoding="utf-8") as f:
                f.write(svg_front)
            with open(os.path.join(images_dir, "back.svg"), "w", encoding="utf-8") as f:
                f.write(svg_back)
            with open(os.path.join(images_dir, "detail.svg"), "w", encoding="utf-8") as f:
                f.write(svg_detail)
                
            # 2. Write placeholder video (intro.webm)
            with open(os.path.join(videos_dir, "intro.webm"), "wb") as f:
                f.write(webm_binary)
                
            # 3. Generate specs.md
            specs_md = generate_markdown_spec(brand, phone, slug)
            with open(os.path.join(product_dir, "specs.md"), "w", encoding="utf-8") as f:
                f.write(specs_md)
                
            # 4. Construct product record mapping to Database columns
            # Using realistic features mapping
            needs_list = []
            if phone["category"] == "gaming":
                needs_list.append("gaming")
            if "Ultra" in phone["name"] or "Pro Max" in phone["name"] or "Premier" in phone["name"]:
                needs_list.append("camera")
            if "Slim" in phone["name"] or "Lite" in phone["name"]:
                needs_list.append("thin")
            if phone["battery"] >= 5500:
                needs_list.append("battery")
                
            special_features = []
            if phone.get("water", "Không") != "Không":
                special_features.append("waterResist")
            if "AI" in phone["type"] or "Apple A19" in phone["chip"] or "Snapdragon 8 Gen 5" in phone["chip"] or "Magic6" in phone["name"]:
                special_features.append("aiEdit")
            if phone.get("charging", 0) >= 30:
                special_features.append("fast")
            if phone.get("charging", 0) >= 65:
                special_features.append("superFast")
            special_features.append("5G")
            special_features.append("nfc")
            
            product_data = {
                "id": f"{brand.lower()}-{slug}",
                "slug": slug,
                "hang": brand,
                "san_pham": phone["name"],
                "phan_khuc": phone["category"],
                "gia_goc": phone["price_goc"],
                "gia_ban": phone["price_ban"],
                "ton_kho": 50,
                "mo_ta": f"Điện thoại {phone['name']} chính hãng từ {brand}. Thiết kế sang trọng, hiệu năng vượt trội với chip {phone['chip']}, bộ nhớ trong {phone['rom']}GB.",
                "man_hinh_cong_nghe": phone["screen"].split(",")[0],
                "man_hinh_kich_thuoc": float(phone["screen"].split("inches")[0].strip()),
                "man_hinh_do_phan_giai": "Full HD+" if "1.5K" not in phone["screen"] and "2K" not in phone["screen"] else "2K+",
                "man_hinh_tan_so_quet": 120 if "120Hz" in phone["screen"] else (144 if "144Hz" in phone["screen"] else 90),
                "camera_sau": phone["camera_sau"],
                "camera_sau_tinh_nang": "Chống rung quang học OIS, tự động lấy nét PDAF, zoom số chất lượng cao",
                "camera_truoc": phone["camera_truoc"],
                "chip": phone["chip"],
                "ram_gb": phone["ram"],
                "dung_luong_gb": phone["rom"],
                "he_dieu_hanh": phone["os"],
                "pin_mah": phone["battery"],
                "sac_nhanh_w": phone["charging"],
                "ho_tro_5g": True,
                "nfc": True,
                "sim": "2 Nano SIM hoặc 1 Nano + 1 eSIM",
                "trong_luong_g": phone["weight"],
                "chong_nuoc": phone["water"],
                "mau_sac": "Đen",
                "media": {
                    "images": [
                        f"data/dienthoai/{brand}/{slug}/images/front.svg",
                        f"data/dienthoai/{brand}/{slug}/images/back.svg",
                        f"data/dienthoai/{brand}/{slug}/images/detail.svg"
                    ],
                    "videos": [
                        f"data/dienthoai/{brand}/{slug}/videos/intro.webm"
                    ]
                },
                "needs": needs_list,
                "specialFeatures": special_features
            }
            
            with open(os.path.join(product_dir, "data.json"), "w", encoding="utf-8") as f:
                json.dump(product_data, f, ensure_ascii=False, indent=2)
                
            brand_products.append(product_data)
            total_models += 1
            
        # Also write a consolidated data.json at the brand root folder
        with open(os.path.join(brand_dir, "data.json"), "w", encoding="utf-8") as f:
            json.dump(brand_products, f, ensure_ascii=False, indent=2)
            
        print(f"  - Đã sinh xong 10 mẫu điện thoại cho hãng {brand}")
        
    print(f"Hoàn thành! Đã sinh dữ liệu cho {total_brands} hãng, tổng cộng {total_models} mẫu điện thoại.")
    
    # Automatically execute the update_to_real_images script
    print("\n--- Đang tự động chuyển đổi sang ảnh thật từ Unsplash ---")
    try:
        import subprocess
        subprocess.run([sys.executable, "scripts/update_to_real_images.py"], check=True)
    except Exception as e:
        print(f"Lỗi khi tự động chuyển đổi ảnh thật (Unsplash): {e}")

    # Automatically execute the fetch_real_supplier_images script
    print("\n--- Đang tự động tải ảnh thực tế từ nhà phân phối FPT Shop & CellphoneS ---")
    try:
        import subprocess
        subprocess.run([sys.executable, "scripts/fetch_real_supplier_images.py"], check=True)
    except Exception as e:
        print(f"Lỗi khi tự động tải ảnh từ nhà phân phối: {e}")

if __name__ == "__main__":
    main()
