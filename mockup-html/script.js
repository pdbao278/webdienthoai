// script.js - PhoneStore Mockup UI Interaction Script

// Mock Product Database with detailed specs and attributes for filtering
const PRODUCTS = {
    "1": {
        "id": 1,
        "name": "iPhone 15 Pro Max 256GB",
        "brand": "Apple",
        "rawPrice": 26990000,
        "priceCurrent": "26.990.000đ",
        "priceOld": "32.990.000đ",
        "discount": "Giảm 18%",
        "rating": "4.6",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "camera"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone 15 Pro Max 256GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A17 Pro (3nm), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "iOS 17",
            "chip": "Apple A17 Pro (3nm)",
            "ramrom": "8GB / 256GB",
            "battery": "4441 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227129/phonestore/products/Apple/iphone-15-pro-max-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227130/phonestore/products/Apple/iphone-15-pro-max-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227131/phonestore/products/Apple/iphone-15-pro-max-256gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-15-pro-max-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            2,
            3,
            4
        ]
    },
    "2": {
        "id": 2,
        "name": "iPhone 16 128GB",
        "brand": "Apple",
        "rawPrice": 19490000,
        "priceCurrent": "19.490.000đ",
        "priceOld": "22.990.000đ",
        "discount": "Giảm 15%",
        "rating": "4.7",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone 16 128GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A18 (3nm), bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.1 inches",
            "os": "iOS 18",
            "chip": "Apple A18 (3nm)",
            "ramrom": "8GB / 128GB",
            "battery": "3561 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227136/phonestore/products/Apple/iphone-16-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227138/phonestore/products/Apple/iphone-16-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227139/phonestore/products/Apple/iphone-16-128gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-16-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            1,
            3,
            4
        ]
    },
    "3": {
        "id": 3,
        "name": "iPhone 16 Plus 128GB",
        "brand": "Apple",
        "rawPrice": 21990000,
        "priceCurrent": "21.990.000đ",
        "priceOld": "25.990.000đ",
        "discount": "Giảm 15%",
        "rating": "4.8",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone 16 Plus 128GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A18 (3nm), bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "iOS 18",
            "chip": "Apple A18 (3nm)",
            "ramrom": "8GB / 128GB",
            "battery": "4674 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227140/phonestore/products/Apple/iphone-16-plus-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227142/phonestore/products/Apple/iphone-16-plus-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227144/phonestore/products/Apple/iphone-16-plus-128gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-16-plus-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            1,
            2,
            4
        ]
    },
    "4": {
        "id": 4,
        "name": "iPhone 16 Pro 128GB",
        "brand": "Apple",
        "rawPrice": 24990000,
        "priceCurrent": "24.990.000đ",
        "priceOld": "28.990.000đ",
        "discount": "Giảm 14%",
        "rating": "4.9",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone 16 Pro 128GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A18 Pro (3nm), bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.3 inches",
            "os": "iOS 18",
            "chip": "Apple A18 Pro (3nm)",
            "ramrom": "8GB / 128GB",
            "battery": "3582 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227147/phonestore/products/Apple/iphone-16-pro-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227148/phonestore/products/Apple/iphone-16-pro-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227151/phonestore/products/Apple/iphone-16-pro-128gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-16-pro-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            1,
            2,
            3
        ]
    },
    "5": {
        "id": 5,
        "name": "iPhone 16 Pro Max 256GB",
        "brand": "Apple",
        "rawPrice": 29590000,
        "priceCurrent": "29.590.000đ",
        "priceOld": "34.990.000đ",
        "discount": "Giảm 15%",
        "rating": "5.0",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "camera"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone 16 Pro Max 256GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A18 Pro (3nm), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.9 inches",
            "os": "iOS 18",
            "chip": "Apple A18 Pro (3nm)",
            "ramrom": "8GB / 256GB",
            "battery": "4685 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227152/phonestore/products/Apple/iphone-16-pro-max-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227155/phonestore/products/Apple/iphone-16-pro-max-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227156/phonestore/products/Apple/iphone-16-pro-max-256gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-16-pro-max-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            1,
            2,
            3
        ]
    },
    "6": {
        "id": 6,
        "name": "iPhone 17 128GB",
        "brand": "Apple",
        "rawPrice": 22990000,
        "priceCurrent": "22.990.000đ",
        "priceOld": "24.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.5",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone 17 128GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A19 (3nm), bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.1 inches",
            "os": "iOS 19",
            "chip": "Apple A19 (3nm)",
            "ramrom": "8GB / 128GB",
            "battery": "3782 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227159/phonestore/products/Apple/iphone-17-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227162/phonestore/products/Apple/iphone-17-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227164/phonestore/products/Apple/iphone-17-128gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-17-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            1,
            2,
            3
        ]
    },
    "7": {
        "id": 7,
        "name": "iPhone 17 Pro 256GB",
        "brand": "Apple",
        "rawPrice": 29990000,
        "priceCurrent": "29.990.000đ",
        "priceOld": "31.990.000đ",
        "discount": "Giảm 6%",
        "rating": "4.6",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone 17 Pro 256GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A19 Pro (3nm), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.3 inches",
            "os": "iOS 19",
            "chip": "Apple A19 Pro (3nm)",
            "ramrom": "12GB / 256GB",
            "battery": "3985 mAh, Sạc nhanh 30W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227166/phonestore/products/Apple/iphone-17-pro-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227168/phonestore/products/Apple/iphone-17-pro-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227170/phonestore/products/Apple/iphone-17-pro-256gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-17-pro-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            1,
            2,
            3
        ]
    },
    "8": {
        "id": 8,
        "name": "iPhone 17 Pro Max 256GB",
        "brand": "Apple",
        "rawPrice": 33990000,
        "priceCurrent": "33.990.000đ",
        "priceOld": "35.990.000đ",
        "discount": "Giảm 6%",
        "rating": "4.7",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone 17 Pro Max 256GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A19 Pro (3nm), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.9 inches",
            "os": "iOS 19",
            "chip": "Apple A19 Pro (3nm)",
            "ramrom": "12GB / 256GB",
            "battery": "4852 mAh, Sạc nhanh 35W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227171/phonestore/products/Apple/iphone-17-pro-max-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227173/phonestore/products/Apple/iphone-17-pro-max-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227174/phonestore/products/Apple/iphone-17-pro-max-256gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-17-pro-max-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            1,
            2,
            3
        ]
    },
    "9": {
        "id": 9,
        "name": "iPhone 17 Slim 256GB",
        "brand": "Apple",
        "rawPrice": 31990000,
        "priceCurrent": "31.990.000đ",
        "priceOld": "33.990.000đ",
        "discount": "Giảm 6%",
        "rating": "4.8",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone 17 Slim 256GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A19 (3nm), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.6 inches",
            "os": "iOS 19",
            "chip": "Apple A19 (3nm)",
            "ramrom": "8GB / 256GB",
            "battery": "3500 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227176/phonestore/products/Apple/iphone-17-slim-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227179/phonestore/products/Apple/iphone-17-slim-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227180/phonestore/products/Apple/iphone-17-slim-256gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-17-slim-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            1,
            2,
            3
        ]
    },
    "10": {
        "id": 10,
        "name": "iPhone SE 4 128GB",
        "brand": "Apple",
        "rawPrice": 13990000,
        "priceCurrent": "13.990.000đ",
        "priceOld": "14.990.000đ",
        "discount": "Giảm 7%",
        "rating": "4.9",
        "category": "midrange",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại iPhone SE 4 128GB chính hãng từ Apple. Thiết kế sang trọng, hiệu năng vượt trội với chip Apple A18 (3nm), bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.1 inches",
            "os": "iOS 18",
            "chip": "Apple A18 (3nm)",
            "ramrom": "8GB / 128GB",
            "battery": "3279 mAh, Sạc nhanh 20W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227181/phonestore/products/Apple/iphone-se-4-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227182/phonestore/products/Apple/iphone-se-4-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227185/phonestore/products/Apple/iphone-se-4-128gb/detail.webp",
        "video": "../data/dienthoai/Apple/iphone-se-4-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            1,
            2,
            3
        ]
    },
    "11": {
        "id": 11,
        "name": "HONOR 200 5G 256GB",
        "brand": "HONOR",
        "rawPrice": 11990000,
        "priceCurrent": "11.990.000đ",
        "priceOld": "12.990.000đ",
        "discount": "Giảm 8%",
        "rating": "5.0",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR 200 5G 256GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 7 Gen 3, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "MagicOS 8",
            "chip": "Snapdragon 7 Gen 3",
            "ramrom": "12GB / 256GB",
            "battery": "5200 mAh, Sạc nhanh 100W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227187/phonestore/products/HONOR/honor-200-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227188/phonestore/products/HONOR/honor-200-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227189/phonestore/products/HONOR/honor-200-5g-256gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-200-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            12,
            13,
            14
        ]
    },
    "12": {
        "id": 12,
        "name": "HONOR 200 Pro 5G 512GB",
        "brand": "HONOR",
        "rawPrice": 15490000,
        "priceCurrent": "15.490.000đ",
        "priceOld": "16.990.000đ",
        "discount": "Giảm 9%",
        "rating": "4.5",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR 200 Pro 5G 512GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8s Gen 3 (Camera Studio Harcourt), bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "MagicOS 8",
            "chip": "Snapdragon 8s Gen 3 (Camera Studio Harcourt)",
            "ramrom": "12GB / 512GB",
            "battery": "5200 mAh, Sạc nhanh 100W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227191/phonestore/products/HONOR/honor-200-pro-5g-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227192/phonestore/products/HONOR/honor-200-pro-5g-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227195/phonestore/products/HONOR/honor-200-pro-5g-512gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-200-pro-5g-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            11,
            13,
            14
        ]
    },
    "13": {
        "id": 13,
        "name": "HONOR 90 5G 256GB",
        "brand": "HONOR",
        "rawPrice": 8990000,
        "priceCurrent": "8.990.000đ",
        "priceOld": "10.990.000đ",
        "discount": "Giảm 18%",
        "rating": "4.6",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR 90 5G 256GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 7 Gen 1, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "MagicOS 7.1",
            "chip": "Snapdragon 7 Gen 1",
            "ramrom": "12GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 66W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227196/phonestore/products/HONOR/honor-90-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227198/phonestore/products/HONOR/honor-90-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227199/phonestore/products/HONOR/honor-90-5g-256gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-90-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            11,
            12,
            14
        ]
    },
    "14": {
        "id": 14,
        "name": "HONOR Magic V2 512GB",
        "brand": "HONOR",
        "rawPrice": 37990000,
        "priceCurrent": "37.990.000đ",
        "priceOld": "39.990.000đ",
        "discount": "Giảm 5%",
        "rating": "4.7",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR Magic V2 512GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 2 (Siêu mỏng 9.9mm), bộ nhớ trong 512GB.",
        "specs": {
            "screen": "7.92 inches chính",
            "os": "MagicOS 7.2",
            "chip": "Snapdragon 8 Gen 2 (Siêu mỏng 9.9mm)",
            "ramrom": "16GB / 512GB",
            "battery": "5000 mAh, Sạc nhanh 66W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227200/phonestore/products/HONOR/honor-magic-v2-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227201/phonestore/products/HONOR/honor-magic-v2-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227202/phonestore/products/HONOR/honor-magic-v2-512gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-magic-v2-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            11,
            12,
            13
        ]
    },
    "15": {
        "id": 15,
        "name": "HONOR Magic6 Lite 256GB",
        "brand": "HONOR",
        "rawPrice": 7290000,
        "priceCurrent": "7.290.000đ",
        "priceOld": "7.990.000đ",
        "discount": "Giảm 9%",
        "rating": "4.8",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR Magic6 Lite 256GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 6 Gen 1, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "MagicOS 7.2",
            "chip": "Snapdragon 6 Gen 1",
            "ramrom": "8GB / 256GB",
            "battery": "5300 mAh, Sạc nhanh 35W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227206/phonestore/products/HONOR/honor-magic6-lite-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227207/phonestore/products/HONOR/honor-magic6-lite-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227209/phonestore/products/HONOR/honor-magic6-lite-256gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-magic6-lite-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            11,
            12,
            13
        ]
    },
    "16": {
        "id": 16,
        "name": "HONOR Magic6 Pro 5G 512GB",
        "brand": "HONOR",
        "rawPrice": 26990000,
        "priceCurrent": "26.990.000đ",
        "priceOld": "28.990.000đ",
        "discount": "Giảm 7%",
        "rating": "4.9",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "battery"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR Magic6 Pro 5G 512GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 3, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.8 inches",
            "os": "MagicOS 8 (Android 14)",
            "chip": "Snapdragon 8 Gen 3",
            "ramrom": "16GB / 512GB",
            "battery": "5600 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227211/phonestore/products/HONOR/honor-magic6-pro-5g-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227212/phonestore/products/HONOR/honor-magic6-pro-5g-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227213/phonestore/products/HONOR/honor-magic6-pro-5g-512gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-magic6-pro-5g-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            11,
            12,
            13
        ]
    },
    "17": {
        "id": 17,
        "name": "HONOR X6a 128GB",
        "brand": "HONOR",
        "rawPrice": 2990000,
        "priceCurrent": "2.990.000đ",
        "priceOld": "3.490.000đ",
        "discount": "Giảm 14%",
        "rating": "5.0",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR X6a 128GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G36, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.56 inches",
            "os": "MagicOS 7.1",
            "chip": "MediaTek Helio G36",
            "ramrom": "4GB / 128GB",
            "battery": "5200 mAh, Sạc nhanh 22.5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227214/phonestore/products/HONOR/honor-x6a-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227215/phonestore/products/HONOR/honor-x6a-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227216/phonestore/products/HONOR/honor-x6a-128gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-x6a-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            11,
            12,
            13
        ]
    },
    "18": {
        "id": 18,
        "name": "HONOR X7b 128GB",
        "brand": "HONOR",
        "rawPrice": 4490000,
        "priceCurrent": "4.490.000đ",
        "priceOld": "5.290.000đ",
        "discount": "Giảm 15%",
        "rating": "4.5",
        "category": "budget",
        "type": "Android",
        "needs": [
            "battery"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR X7b 128GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 680, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.8 inches",
            "os": "MagicOS 7.2",
            "chip": "Snapdragon 680",
            "ramrom": "8GB / 128GB",
            "battery": "6000 mAh, Sạc nhanh 35W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227217/phonestore/products/HONOR/honor-x7b-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227218/phonestore/products/HONOR/honor-x7b-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227220/phonestore/products/HONOR/honor-x7b-128gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-x7b-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            11,
            12,
            13
        ]
    },
    "19": {
        "id": 19,
        "name": "HONOR X8b 256GB",
        "brand": "HONOR",
        "rawPrice": 5690000,
        "priceCurrent": "5.690.000đ",
        "priceOld": "6.490.000đ",
        "discount": "Giảm 12%",
        "rating": "4.6",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR X8b 256GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 680, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "MagicOS 7.2",
            "chip": "Snapdragon 680",
            "ramrom": "8GB / 256GB",
            "battery": "4500 mAh, Sạc nhanh 35W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227221/phonestore/products/HONOR/honor-x8b-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227222/phonestore/products/HONOR/honor-x8b-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227223/phonestore/products/HONOR/honor-x8b-256gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-x8b-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            11,
            12,
            13
        ]
    },
    "20": {
        "id": 20,
        "name": "HONOR X9b 5G 256GB",
        "brand": "HONOR",
        "rawPrice": 7990000,
        "priceCurrent": "7.990.000đ",
        "priceOld": "8.990.000đ",
        "discount": "Giảm 11%",
        "rating": "4.7",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "battery"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại HONOR X9b 5G 256GB chính hãng từ HONOR. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 6 Gen 1 (Màn hình chống rơi 360 độ), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "MagicUI 7.2 (Android 13)",
            "chip": "Snapdragon 6 Gen 1 (Màn hình chống rơi 360 độ)",
            "ramrom": "12GB / 256GB",
            "battery": "5800 mAh, Sạc nhanh 35W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227228/phonestore/products/HONOR/honor-x9b-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227229/phonestore/products/HONOR/honor-x9b-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227230/phonestore/products/HONOR/honor-x9b-5g-256gb/detail.webp",
        "video": "../data/dienthoai/HONOR/honor-x9b-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            11,
            12,
            13
        ]
    },
    "21": {
        "id": 21,
        "name": "Masstel Fami 12 4G",
        "brand": "Masstel",
        "rawPrice": 590000,
        "priceCurrent": "590.000đ",
        "priceOld": "690.000đ",
        "discount": "Giảm 14%",
        "rating": "4.8",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel Fami 12 4G chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Bàn phím nổi to rõ), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "1.77 inches",
            "os": "Fami OS",
            "chip": "Unisoc T107 (Bàn phím nổi to rõ)",
            "ramrom": "1GB / 1GB",
            "battery": "1400 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227232/phonestore/products/Masstel/masstel-fami-12-4g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227233/phonestore/products/Masstel/masstel-fami-12-4g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227235/phonestore/products/Masstel/masstel-fami-12-4g/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-fami-12-4g/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            22,
            23,
            24
        ]
    },
    "22": {
        "id": 22,
        "name": "Masstel Fami 50 4G Pro",
        "brand": "Masstel",
        "rawPrice": 790000,
        "priceCurrent": "790.000đ",
        "priceOld": "890.000đ",
        "discount": "Giảm 11%",
        "rating": "4.9",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel Fami 50 4G Pro chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Đèn pin kép siêu sáng), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.2 inches",
            "os": "Fami OS",
            "chip": "Unisoc T107 (Đèn pin kép siêu sáng)",
            "ramrom": "1GB / 1GB",
            "battery": "1600 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227236/phonestore/products/Masstel/masstel-fami-50-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227238/phonestore/products/Masstel/masstel-fami-50-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227239/phonestore/products/Masstel/masstel-fami-50-4g-pro/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-fami-50-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            21,
            23,
            24
        ]
    },
    "23": {
        "id": 23,
        "name": "Masstel Fami 60 4G Pro",
        "brand": "Masstel",
        "rawPrice": 750000,
        "priceCurrent": "750.000đ",
        "priceOld": "850.000đ",
        "discount": "Giảm 12%",
        "rating": "5.0",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel Fami 60 4G Pro chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Có phím SOS khẩn cấp), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.0 inches",
            "os": "Fami OS",
            "chip": "Unisoc T107 (Có phím SOS khẩn cấp)",
            "ramrom": "1GB / 1GB",
            "battery": "1400 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227240/phonestore/products/Masstel/masstel-fami-60-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227241/phonestore/products/Masstel/masstel-fami-60-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227242/phonestore/products/Masstel/masstel-fami-60-4g-pro/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-fami-60-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            21,
            22,
            24
        ]
    },
    "24": {
        "id": 24,
        "name": "Masstel HAPI 30 4G",
        "brand": "Masstel",
        "rawPrice": 1790000,
        "priceCurrent": "1.790.000đ",
        "priceOld": "1.990.000đ",
        "discount": "Giảm 10%",
        "rating": "4.5",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "3GB",
        "storage": "32GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel HAPI 30 4G chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek MT6739, bộ nhớ trong 32GB.",
        "specs": {
            "screen": "5.0 inches",
            "os": "Android 11 Go",
            "chip": "MediaTek MT6739",
            "ramrom": "3GB / 32GB",
            "battery": "2000 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227244/phonestore/products/Masstel/masstel-hapi-30-4g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227245/phonestore/products/Masstel/masstel-hapi-30-4g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227246/phonestore/products/Masstel/masstel-hapi-30-4g/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-hapi-30-4g/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            21,
            22,
            23
        ]
    },
    "25": {
        "id": 25,
        "name": "Masstel Izi 10 4G Pro",
        "brand": "Masstel",
        "rawPrice": 390000,
        "priceCurrent": "390.000đ",
        "priceOld": "450.000đ",
        "discount": "Giảm 13%",
        "rating": "4.6",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel Izi 10 4G Pro chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Hỗ trợ 4G VoLTE), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "1.77 inches",
            "os": "Masstel OS",
            "chip": "Unisoc T107 (Hỗ trợ 4G VoLTE)",
            "ramrom": "1GB / 1GB",
            "battery": "1000 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227248/phonestore/products/Masstel/masstel-izi-10-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227250/phonestore/products/Masstel/masstel-izi-10-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227251/phonestore/products/Masstel/masstel-izi-10-4g-pro/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-izi-10-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            21,
            22,
            23
        ]
    },
    "26": {
        "id": 26,
        "name": "Masstel Izi 12 4G Pro",
        "brand": "Masstel",
        "rawPrice": 420000,
        "priceCurrent": "420.000đ",
        "priceOld": "490.000đ",
        "discount": "Giảm 14%",
        "rating": "4.7",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel Izi 12 4G Pro chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107, bộ nhớ trong 1GB.",
        "specs": {
            "screen": "1.77 inches",
            "os": "Masstel OS",
            "chip": "Unisoc T107",
            "ramrom": "1GB / 1GB",
            "battery": "1000 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227253/phonestore/products/Masstel/masstel-izi-12-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227254/phonestore/products/Masstel/masstel-izi-12-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227256/phonestore/products/Masstel/masstel-izi-12-4g-pro/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-izi-12-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            21,
            22,
            23
        ]
    },
    "27": {
        "id": 27,
        "name": "Masstel Izi 20 4G Pro",
        "brand": "Masstel",
        "rawPrice": 490000,
        "priceCurrent": "490.000đ",
        "priceOld": "550.000đ",
        "discount": "Giảm 11%",
        "rating": "4.8",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel Izi 20 4G Pro chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107, bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.4 inches",
            "os": "Masstel OS",
            "chip": "Unisoc T107",
            "ramrom": "1GB / 1GB",
            "battery": "1400 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227257/phonestore/products/Masstel/masstel-izi-20-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227259/phonestore/products/Masstel/masstel-izi-20-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227260/phonestore/products/Masstel/masstel-izi-20-4g-pro/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-izi-20-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            21,
            22,
            23
        ]
    },
    "28": {
        "id": 28,
        "name": "Masstel Izi 30 4G Pro",
        "brand": "Masstel",
        "rawPrice": 590000,
        "priceCurrent": "590.000đ",
        "priceOld": "650.000đ",
        "discount": "Giảm 9%",
        "rating": "4.9",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel Izi 30 4G Pro chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Phông chữ cực lớn), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.8 inches",
            "os": "Masstel OS",
            "chip": "Unisoc T107 (Phông chữ cực lớn)",
            "ramrom": "1GB / 1GB",
            "battery": "1800 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227263/phonestore/products/Masstel/masstel-izi-30-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227265/phonestore/products/Masstel/masstel-izi-30-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227266/phonestore/products/Masstel/masstel-izi-30-4g-pro/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-izi-30-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            21,
            22,
            23
        ]
    },
    "29": {
        "id": 29,
        "name": "Masstel Izi 32 4G",
        "brand": "Masstel",
        "rawPrice": 620000,
        "priceCurrent": "620.000đ",
        "priceOld": "690.000đ",
        "discount": "Giảm 10%",
        "rating": "5.0",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel Izi 32 4G chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107, bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.8 inches",
            "os": "Masstel OS",
            "chip": "Unisoc T107",
            "ramrom": "1GB / 1GB",
            "battery": "1500 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227268/phonestore/products/Masstel/masstel-izi-32-4g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227269/phonestore/products/Masstel/masstel-izi-32-4g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227270/phonestore/products/Masstel/masstel-izi-32-4g/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-izi-32-4g/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            21,
            22,
            23
        ]
    },
    "30": {
        "id": 30,
        "name": "Masstel Izi 55 4G Pro",
        "brand": "Masstel",
        "rawPrice": 670000,
        "priceCurrent": "670.000đ",
        "priceOld": "750.000đ",
        "discount": "Giảm 11%",
        "rating": "4.5",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Masstel Izi 55 4G Pro chính hãng từ Masstel. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Nghe đài FM không cần tai nghe), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.4 inches",
            "os": "Masstel OS",
            "chip": "Unisoc T107 (Nghe đài FM không cần tai nghe)",
            "ramrom": "1GB / 1GB",
            "battery": "1800 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227272/phonestore/products/Masstel/masstel-izi-55-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227273/phonestore/products/Masstel/masstel-izi-55-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227274/phonestore/products/Masstel/masstel-izi-55-4g-pro/detail.webp",
        "video": "../data/dienthoai/Masstel/masstel-izi-55-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            21,
            22,
            23
        ]
    },
    "31": {
        "id": 31,
        "name": "Mobell F209 4G nắp gập",
        "brand": "Mobell",
        "rawPrice": 770000,
        "priceCurrent": "770.000đ",
        "priceOld": "850.000đ",
        "discount": "Giảm 9%",
        "rating": "4.6",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell F209 4G nắp gập chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Thiết kế nắp gập thời trang), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.4 inches",
            "os": "Mobell OS",
            "chip": "Unisoc T107 (Thiết kế nắp gập thời trang)",
            "ramrom": "1GB / 1GB",
            "battery": "1200 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227276/phonestore/products/Mobell/mobell-f209-4g-nap-gap/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227277/phonestore/products/Mobell/mobell-f209-4g-nap-gap/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227279/phonestore/products/Mobell/mobell-f209-4g-nap-gap/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-f209-4g-nap-gap/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            32,
            33,
            34
        ]
    },
    "32": {
        "id": 32,
        "name": "Mobell F309 4G nắp gập",
        "brand": "Mobell",
        "rawPrice": 790000,
        "priceCurrent": "790.000đ",
        "priceOld": "890.000đ",
        "discount": "Giảm 11%",
        "rating": "4.7",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell F309 4G nắp gập chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107, bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.8 inches",
            "os": "Mobell OS",
            "chip": "Unisoc T107",
            "ramrom": "1GB / 1GB",
            "battery": "1500 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227281/phonestore/products/Mobell/mobell-f309-4g-nap-gap/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227283/phonestore/products/Mobell/mobell-f309-4g-nap-gap/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227284/phonestore/products/Mobell/mobell-f309-4g-nap-gap/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-f309-4g-nap-gap/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            31,
            33,
            34
        ]
    },
    "33": {
        "id": 33,
        "name": "Mobell M229 4G Pro",
        "brand": "Mobell",
        "rawPrice": 390000,
        "priceCurrent": "390.000đ",
        "priceOld": "450.000đ",
        "discount": "Giảm 13%",
        "rating": "4.8",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell M229 4G Pro chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Bàn phím mềm mại), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "1.77 inches",
            "os": "Mobell OS",
            "chip": "Unisoc T107 (Bàn phím mềm mại)",
            "ramrom": "1GB / 1GB",
            "battery": "1000 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227286/phonestore/products/Mobell/mobell-m229-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227287/phonestore/products/Mobell/mobell-m229-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227289/phonestore/products/Mobell/mobell-m229-4g-pro/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-m229-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            31,
            32,
            34
        ]
    },
    "34": {
        "id": 34,
        "name": "Mobell M389 4G Pro",
        "brand": "Mobell",
        "rawPrice": 590000,
        "priceCurrent": "590.000đ",
        "priceOld": "650.000đ",
        "discount": "Giảm 9%",
        "rating": "4.9",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell M389 4G Pro chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Thiết kế giả da), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.4 inches",
            "os": "Mobell OS",
            "chip": "Unisoc T107 (Thiết kế giả da)",
            "ramrom": "1GB / 1GB",
            "battery": "1700 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227291/phonestore/products/Mobell/mobell-m389-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227292/phonestore/products/Mobell/mobell-m389-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227293/phonestore/products/Mobell/mobell-m389-4g-pro/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-m389-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            31,
            32,
            33
        ]
    },
    "35": {
        "id": 35,
        "name": "Mobell M529 4G Pro",
        "brand": "Mobell",
        "rawPrice": 520000,
        "priceCurrent": "520.000đ",
        "priceOld": "590.000đ",
        "discount": "Giảm 12%",
        "rating": "5.0",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell M529 4G Pro chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Pin khủng kéo dài), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.4 inches",
            "os": "Mobell OS",
            "chip": "Unisoc T107 (Pin khủng kéo dài)",
            "ramrom": "1GB / 1GB",
            "battery": "2500 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227296/phonestore/products/Mobell/mobell-m529-4g-pro/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227297/phonestore/products/Mobell/mobell-m529-4g-pro/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227299/phonestore/products/Mobell/mobell-m529-4g-pro/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-m529-4g-pro/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            31,
            32,
            33
        ]
    },
    "36": {
        "id": 36,
        "name": "Mobell Nova P3 4G",
        "brand": "Mobell",
        "rawPrice": 1750000,
        "priceCurrent": "1.750.000đ",
        "priceOld": "1.990.000đ",
        "discount": "Giảm 12%",
        "rating": "4.5",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "2GB",
        "storage": "16GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell Nova P3 4G chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek MT6739, bộ nhớ trong 16GB.",
        "specs": {
            "screen": "6.08 inches",
            "os": "Android 11 Go",
            "chip": "MediaTek MT6739",
            "ramrom": "2GB / 16GB",
            "battery": "3000 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227300/phonestore/products/Mobell/mobell-nova-p3-4g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227302/phonestore/products/Mobell/mobell-nova-p3-4g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227303/phonestore/products/Mobell/mobell-nova-p3-4g/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-nova-p3-4g/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            31,
            32,
            33
        ]
    },
    "37": {
        "id": 37,
        "name": "Mobell Nova S3 4G",
        "brand": "Mobell",
        "rawPrice": 1950000,
        "priceCurrent": "1.950.000đ",
        "priceOld": "2.190.000đ",
        "discount": "Giảm 11%",
        "rating": "4.6",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "3GB",
        "storage": "32GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell Nova S3 4G chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek MT6739, bộ nhớ trong 32GB.",
        "specs": {
            "screen": "6.26 inches",
            "os": "Android 11 Go",
            "chip": "MediaTek MT6739",
            "ramrom": "3GB / 32GB",
            "battery": "3500 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227304/phonestore/products/Mobell/mobell-nova-s3-4g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227306/phonestore/products/Mobell/mobell-nova-s3-4g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227307/phonestore/products/Mobell/mobell-nova-s3-4g/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-nova-s3-4g/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            31,
            32,
            33
        ]
    },
    "38": {
        "id": 38,
        "name": "Mobell Rock 4 4G",
        "brand": "Mobell",
        "rawPrice": 690000,
        "priceCurrent": "690.000đ",
        "priceOld": "750.000đ",
        "discount": "Giảm 8%",
        "rating": "4.7",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "1GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell Rock 4 4G chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107 (Thiết kế hầm hố chống va đập), bộ nhớ trong 1GB.",
        "specs": {
            "screen": "2.4 inches",
            "os": "Mobell OS",
            "chip": "Unisoc T107 (Thiết kế hầm hố chống va đập)",
            "ramrom": "1GB / 1GB",
            "battery": "3250 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227309/phonestore/products/Mobell/mobell-rock-4-4g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227310/phonestore/products/Mobell/mobell-rock-4-4g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227312/phonestore/products/Mobell/mobell-rock-4-4g/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-rock-4-4g/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            31,
            32,
            33
        ]
    },
    "39": {
        "id": 39,
        "name": "Mobell S40 3G",
        "brand": "Mobell",
        "rawPrice": 1190000,
        "priceCurrent": "1.190.000đ",
        "priceOld": "1.490.000đ",
        "discount": "Giảm 20%",
        "rating": "4.8",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "8GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell S40 3G chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip Spreadtrum SC7731E, bộ nhớ trong 8GB.",
        "specs": {
            "screen": "5.0 inches",
            "os": "Android 8.1 Go",
            "chip": "Spreadtrum SC7731E",
            "ramrom": "1GB / 8GB",
            "battery": "2000 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227314/phonestore/products/Mobell/mobell-s40-3g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227316/phonestore/products/Mobell/mobell-s40-3g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227317/phonestore/products/Mobell/mobell-s40-3g/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-s40-3g/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            31,
            32,
            33
        ]
    },
    "40": {
        "id": 40,
        "name": "Mobell S41 4G",
        "brand": "Mobell",
        "rawPrice": 1490000,
        "priceCurrent": "1.490.000đ",
        "priceOld": "1.790.000đ",
        "discount": "Giảm 17%",
        "rating": "4.9",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "2GB",
        "storage": "16GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Mobell S41 4G chính hãng từ Mobell. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc SC9832E, bộ nhớ trong 16GB.",
        "specs": {
            "screen": "5.0 inches",
            "os": "Android 10 Go",
            "chip": "Unisoc SC9832E",
            "ramrom": "2GB / 16GB",
            "battery": "2200 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227319/phonestore/products/Mobell/mobell-s41-4g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227320/phonestore/products/Mobell/mobell-s41-4g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227322/phonestore/products/Mobell/mobell-s41-4g/detail.webp",
        "video": "../data/dienthoai/Mobell/mobell-s41-4g/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            31,
            32,
            33
        ]
    },
    "41": {
        "id": 41,
        "name": "Motorola Edge 40 Neo 256GB",
        "brand": "Motorola",
        "rawPrice": 7990000,
        "priceCurrent": "7.990.000đ",
        "priceOld": "8.990.000đ",
        "discount": "Giảm 11%",
        "rating": "5.0",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "144Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Edge 40 Neo 256GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 7030, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.55 inches",
            "os": "Android 13",
            "chip": "Dimensity 7030",
            "ramrom": "8GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 68W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227324/phonestore/products/Motorola/motorola-edge-40-neo-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227326/phonestore/products/Motorola/motorola-edge-40-neo-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227328/phonestore/products/Motorola/motorola-edge-40-neo-256gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-edge-40-neo-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            42,
            43,
            44
        ]
    },
    "42": {
        "id": 42,
        "name": "Motorola Edge 50 Fusion 256GB",
        "brand": "Motorola",
        "rawPrice": 9990000,
        "priceCurrent": "9.990.000đ",
        "priceOld": "10.990.000đ",
        "discount": "Giảm 9%",
        "rating": "4.5",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Edge 50 Fusion 256GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 7s Gen 2, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "Android 14",
            "chip": "Snapdragon 7s Gen 2",
            "ramrom": "8GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 68W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227330/phonestore/products/Motorola/motorola-edge-50-fusion-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227331/phonestore/products/Motorola/motorola-edge-50-fusion-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227333/phonestore/products/Motorola/motorola-edge-50-fusion-256gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-edge-50-fusion-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            41,
            43,
            44
        ]
    },
    "43": {
        "id": 43,
        "name": "Motorola Edge 50 Pro 256GB",
        "brand": "Motorola",
        "rawPrice": 17490000,
        "priceCurrent": "17.490.000đ",
        "priceOld": "18.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.6",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "144Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Edge 50 Pro 256GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 7 Gen 3, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "Android 14",
            "chip": "Snapdragon 7 Gen 3",
            "ramrom": "12GB / 256GB",
            "battery": "4500 mAh, Sạc nhanh 125W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227336/phonestore/products/Motorola/motorola-edge-50-pro-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227338/phonestore/products/Motorola/motorola-edge-50-pro-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227339/phonestore/products/Motorola/motorola-edge-50-pro-256gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-edge-50-pro-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            41,
            42,
            44
        ]
    },
    "44": {
        "id": 44,
        "name": "Motorola Edge 50 Ultra 512GB",
        "brand": "Motorola",
        "rawPrice": 24990000,
        "priceCurrent": "24.990.000đ",
        "priceOld": "26.990.000đ",
        "discount": "Giảm 7%",
        "rating": "4.7",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "camera"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "144Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Edge 50 Ultra 512GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8s Gen 3 (Mặt lưng gỗ/da thật), bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "Android 14 (Hello UX)",
            "chip": "Snapdragon 8s Gen 3 (Mặt lưng gỗ/da thật)",
            "ramrom": "16GB / 512GB",
            "battery": "4500 mAh, Sạc nhanh 125W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227341/phonestore/products/Motorola/motorola-edge-50-ultra-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227342/phonestore/products/Motorola/motorola-edge-50-ultra-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227344/phonestore/products/Motorola/motorola-edge-50-ultra-512gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-edge-50-ultra-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            41,
            42,
            43
        ]
    },
    "45": {
        "id": 45,
        "name": "Motorola Moto G14 64GB",
        "brand": "Motorola",
        "rawPrice": 2390000,
        "priceCurrent": "2.390.000đ",
        "priceOld": "2.790.000đ",
        "discount": "Giảm 14%",
        "rating": "4.8",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "64GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Moto G14 64GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc Tiger T616, bộ nhớ trong 64GB.",
        "specs": {
            "screen": "6.5 inches",
            "os": "Android 13",
            "chip": "Unisoc Tiger T616",
            "ramrom": "4GB / 64GB",
            "battery": "5000 mAh, Sạc nhanh 15W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227346/phonestore/products/Motorola/motorola-moto-g14-64gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227348/phonestore/products/Motorola/motorola-moto-g14-64gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227350/phonestore/products/Motorola/motorola-moto-g14-64gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-moto-g14-64gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            41,
            42,
            43
        ]
    },
    "46": {
        "id": 46,
        "name": "Motorola Moto G24 Power 128GB",
        "brand": "Motorola",
        "rawPrice": 3290000,
        "priceCurrent": "3.290.000đ",
        "priceOld": "3.690.000đ",
        "discount": "Giảm 11%",
        "rating": "4.9",
        "category": "budget",
        "type": "Android",
        "needs": [
            "battery"
        ],
        "ram": "4GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Moto G24 Power 128GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G85, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.56 inches",
            "os": "Android 14",
            "chip": "MediaTek Helio G85",
            "ramrom": "4GB / 128GB",
            "battery": "6000 mAh, Sạc nhanh 30W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227352/phonestore/products/Motorola/motorola-moto-g24-power-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227353/phonestore/products/Motorola/motorola-moto-g24-power-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227355/phonestore/products/Motorola/motorola-moto-g24-power-128gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-moto-g24-power-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            41,
            42,
            43
        ]
    },
    "47": {
        "id": 47,
        "name": "Motorola Moto G54 5G 128GB",
        "brand": "Motorola",
        "rawPrice": 4290000,
        "priceCurrent": "4.290.000đ",
        "priceOld": "4.990.000đ",
        "discount": "Giảm 14%",
        "rating": "5.0",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Moto G54 5G 128GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 7020, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.5 inches",
            "os": "Android 13",
            "chip": "Dimensity 7020",
            "ramrom": "8GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 15W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227357/phonestore/products/Motorola/motorola-moto-g54-5g-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227360/phonestore/products/Motorola/motorola-moto-g54-5g-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227362/phonestore/products/Motorola/motorola-moto-g54-5g-128gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-moto-g54-5g-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            41,
            42,
            43
        ]
    },
    "48": {
        "id": 48,
        "name": "Motorola Moto G85 5G 256GB",
        "brand": "Motorola",
        "rawPrice": 6490000,
        "priceCurrent": "6.490.000đ",
        "priceOld": "6.990.000đ",
        "discount": "Giảm 7%",
        "rating": "4.5",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Moto G85 5G 256GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 6s Gen 3 (Màn hình cong), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "Android 14",
            "chip": "Snapdragon 6s Gen 3 (Màn hình cong)",
            "ramrom": "8GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 30W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227365/phonestore/products/Motorola/motorola-moto-g85-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227367/phonestore/products/Motorola/motorola-moto-g85-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227369/phonestore/products/Motorola/motorola-moto-g85-5g-256gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-moto-g85-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            41,
            42,
            43
        ]
    },
    "49": {
        "id": 49,
        "name": "Motorola Razr 50 256GB",
        "brand": "Motorola",
        "rawPrice": 19990000,
        "priceCurrent": "19.990.000đ",
        "priceOld": "21.990.000đ",
        "discount": "Giảm 9%",
        "rating": "4.6",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Razr 50 256GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 7300X, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.9 inches chính",
            "os": "Android 14",
            "chip": "Dimensity 7300X",
            "ramrom": "8GB / 256GB",
            "battery": "4200 mAh, Sạc nhanh 30W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227371/phonestore/products/Motorola/motorola-razr-50-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227372/phonestore/products/Motorola/motorola-razr-50-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227374/phonestore/products/Motorola/motorola-razr-50-256gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-razr-50-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            41,
            42,
            43
        ]
    },
    "50": {
        "id": 50,
        "name": "Motorola Razr 50 Ultra 512GB",
        "brand": "Motorola",
        "rawPrice": 26990000,
        "priceCurrent": "26.990.000đ",
        "priceOld": "28.990.000đ",
        "discount": "Giảm 7%",
        "rating": "4.7",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "camera"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Motorola Razr 50 Ultra 512GB chính hãng từ Motorola. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8s Gen 3, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.9 inches chính",
            "os": "Android 14",
            "chip": "Snapdragon 8s Gen 3",
            "ramrom": "12GB / 512GB",
            "battery": "4000 mAh, Sạc nhanh 45W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227375/phonestore/products/Motorola/motorola-razr-50-ultra-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227376/phonestore/products/Motorola/motorola-razr-50-ultra-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227377/phonestore/products/Motorola/motorola-razr-50-ultra-512gb/detail.webp",
        "video": "../data/dienthoai/Motorola/motorola-razr-50-ultra-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            41,
            42,
            43
        ]
    },
    "51": {
        "id": 51,
        "name": "Nokia 105 4G Pro (2025)",
        "brand": "Nokia",
        "rawPrice": 750000,
        "priceCurrent": "750.000đ",
        "priceOld": "850.000đ",
        "discount": "Giảm 12%",
        "rating": "4.8",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "2GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia 105 4G Pro (2025) chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107, bộ nhớ trong 2GB.",
        "specs": {
            "screen": "2.0 inches",
            "os": "Nokia Series 30+",
            "chip": "Unisoc T107",
            "ramrom": "1GB / 2GB",
            "battery": "1450 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227379/phonestore/products/Nokia/nokia-105-4g-pro-2025/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227380/phonestore/products/Nokia/nokia-105-4g-pro-2025/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227381/phonestore/products/Nokia/nokia-105-4g-pro-2025/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-105-4g-pro-2025/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            52,
            53,
            54
        ]
    },
    "52": {
        "id": 52,
        "name": "Nokia 110 4G Pro (2025)",
        "brand": "Nokia",
        "rawPrice": 850000,
        "priceCurrent": "850.000đ",
        "priceOld": "950.000đ",
        "discount": "Giảm 11%",
        "rating": "4.9",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "2GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia 110 4G Pro (2025) chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107, bộ nhớ trong 2GB.",
        "specs": {
            "screen": "2.0 inches",
            "os": "Nokia Series 30+",
            "chip": "Unisoc T107",
            "ramrom": "1GB / 2GB",
            "battery": "1450 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227383/phonestore/products/Nokia/nokia-110-4g-pro-2025/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227384/phonestore/products/Nokia/nokia-110-4g-pro-2025/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227385/phonestore/products/Nokia/nokia-110-4g-pro-2025/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-110-4g-pro-2025/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            51,
            53,
            54
        ]
    },
    "53": {
        "id": 53,
        "name": "Nokia 2660 Flip 4G",
        "brand": "Nokia",
        "rawPrice": 1590000,
        "priceCurrent": "1.590.000đ",
        "priceOld": "1.790.000đ",
        "discount": "Giảm 11%",
        "rating": "5.0",
        "category": "budget",
        "type": "Fold",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "2GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia 2660 Flip 4G chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107, bộ nhớ trong 2GB.",
        "specs": {
            "screen": "2.8 inches TFT chính",
            "os": "Nokia Series 30+",
            "chip": "Unisoc T107",
            "ramrom": "1GB / 2GB",
            "battery": "1450 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227386/phonestore/products/Nokia/nokia-2660-flip-4g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227387/phonestore/products/Nokia/nokia-2660-flip-4g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227388/phonestore/products/Nokia/nokia-2660-flip-4g/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-2660-flip-4g/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            51,
            52,
            54
        ]
    },
    "54": {
        "id": 54,
        "name": "Nokia 5710 XpressAudio",
        "brand": "Nokia",
        "rawPrice": 1690000,
        "priceCurrent": "1.690.000đ",
        "priceOld": "1.990.000đ",
        "discount": "Giảm 15%",
        "rating": "4.5",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "2GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia 5710 XpressAudio chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107, bộ nhớ trong 2GB.",
        "specs": {
            "screen": "2.4 inches",
            "os": "Nokia Series 30+",
            "chip": "Unisoc T107",
            "ramrom": "1GB / 2GB",
            "battery": "1450 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227390/phonestore/products/Nokia/nokia-5710-xpressaudio/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227390/phonestore/products/Nokia/nokia-5710-xpressaudio/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227391/phonestore/products/Nokia/nokia-5710-xpressaudio/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-5710-xpressaudio/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            51,
            52,
            53
        ]
    },
    "55": {
        "id": 55,
        "name": "Nokia 8210 4G",
        "brand": "Nokia",
        "rawPrice": 1390000,
        "priceCurrent": "1.390.000đ",
        "priceOld": "1.590.000đ",
        "discount": "Giảm 13%",
        "rating": "4.6",
        "category": "budget",
        "type": "Feature",
        "needs": [
            "thin"
        ],
        "ram": "1GB",
        "storage": "2GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia 8210 4G chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T107, bộ nhớ trong 2GB.",
        "specs": {
            "screen": "2.8 inches",
            "os": "Nokia Series 30+",
            "chip": "Unisoc T107",
            "ramrom": "1GB / 2GB",
            "battery": "1450 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227392/phonestore/products/Nokia/nokia-8210-4g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227394/phonestore/products/Nokia/nokia-8210-4g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227394/phonestore/products/Nokia/nokia-8210-4g/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-8210-4g/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            51,
            52,
            53
        ]
    },
    "56": {
        "id": 56,
        "name": "Nokia C12 64GB",
        "brand": "Nokia",
        "rawPrice": 1990000,
        "priceCurrent": "1.990.000đ",
        "priceOld": "2.490.000đ",
        "discount": "Giảm 20%",
        "rating": "4.7",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "3GB",
        "storage": "64GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia C12 64GB chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc SC9863A1, bộ nhớ trong 64GB.",
        "specs": {
            "screen": "6.3 inches",
            "os": "Android 12 Go",
            "chip": "Unisoc SC9863A1",
            "ramrom": "3GB / 64GB",
            "battery": "3000 mAh, Sạc nhanh 5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227395/phonestore/products/Nokia/nokia-c12-64gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227397/phonestore/products/Nokia/nokia-c12-64gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227398/phonestore/products/Nokia/nokia-c12-64gb/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-c12-64gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            51,
            52,
            53
        ]
    },
    "57": {
        "id": 57,
        "name": "Nokia C32 128GB",
        "brand": "Nokia",
        "rawPrice": 2790000,
        "priceCurrent": "2.790.000đ",
        "priceOld": "3.290.000đ",
        "discount": "Giảm 15%",
        "rating": "4.8",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia C32 128GB chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc SC9863A, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.5 inches",
            "os": "Android 13",
            "chip": "Unisoc SC9863A",
            "ramrom": "4GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 10W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227399/phonestore/products/Nokia/nokia-c32-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227400/phonestore/products/Nokia/nokia-c32-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227402/phonestore/products/Nokia/nokia-c32-128gb/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-c32-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            51,
            52,
            53
        ]
    },
    "58": {
        "id": 58,
        "name": "Nokia G22 128GB",
        "brand": "Nokia",
        "rawPrice": 3490000,
        "priceCurrent": "3.490.000đ",
        "priceOld": "4.290.000đ",
        "discount": "Giảm 19%",
        "rating": "4.9",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia G22 128GB chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc Tiger T606, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.52 inches",
            "os": "Android 12",
            "chip": "Unisoc Tiger T606",
            "ramrom": "4GB / 128GB",
            "battery": "5050 mAh, Sạc nhanh 20W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227404/phonestore/products/Nokia/nokia-g22-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227405/phonestore/products/Nokia/nokia-g22-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227407/phonestore/products/Nokia/nokia-g22-128gb/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-g22-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            51,
            52,
            53
        ]
    },
    "59": {
        "id": 59,
        "name": "Nokia G42 5G 128GB",
        "brand": "Nokia",
        "rawPrice": 5290000,
        "priceCurrent": "5.290.000đ",
        "priceOld": "5.990.000đ",
        "discount": "Giảm 12%",
        "rating": "5.0",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "6GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia G42 5G 128GB chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 480+ 5G, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.56 inches",
            "os": "Android 13 (Hỗ trợ tự sửa chữa QuickFix)",
            "chip": "Snapdragon 480+ 5G",
            "ramrom": "6GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 20W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227408/phonestore/products/Nokia/nokia-g42-5g-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227409/phonestore/products/Nokia/nokia-g42-5g-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227410/phonestore/products/Nokia/nokia-g42-5g-128gb/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-g42-5g-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            51,
            52,
            53
        ]
    },
    "60": {
        "id": 60,
        "name": "Nokia XR21 5G 128GB",
        "brand": "Nokia",
        "rawPrice": 11490000,
        "priceCurrent": "11.490.000đ",
        "priceOld": "12.990.000đ",
        "discount": "Giảm 12%",
        "rating": "4.5",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "6GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nokia XR21 5G 128GB chính hãng từ Nokia. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 695 5G, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.49 inches",
            "os": "Android 13",
            "chip": "Snapdragon 695 5G",
            "ramrom": "6GB / 128GB",
            "battery": "4800 mAh, Sạc nhanh 33W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227412/phonestore/products/Nokia/nokia-xr21-5g-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227413/phonestore/products/Nokia/nokia-xr21-5g-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227415/phonestore/products/Nokia/nokia-xr21-5g-128gb/detail.webp",
        "video": "../data/dienthoai/Nokia/nokia-xr21-5g-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            51,
            52,
            53
        ]
    },
    "61": {
        "id": 61,
        "name": "Nubia Focus 5G 128GB",
        "brand": "Nubia",
        "rawPrice": 4290000,
        "priceCurrent": "4.290.000đ",
        "priceOld": "4.990.000đ",
        "discount": "Giảm 14%",
        "rating": "4.6",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "6GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia Focus 5G 128GB chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T760, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.56 inches",
            "os": "Android 13",
            "chip": "Unisoc T760",
            "ramrom": "6GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 22.5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227415/phonestore/products/Nubia/nubia-focus-5g-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227417/phonestore/products/Nubia/nubia-focus-5g-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227419/phonestore/products/Nubia/nubia-focus-5g-128gb/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-focus-5g-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            62,
            63,
            64
        ]
    },
    "62": {
        "id": 62,
        "name": "Nubia Focus Pro 5G 256GB",
        "brand": "Nubia",
        "rawPrice": 6290000,
        "priceCurrent": "6.290.000đ",
        "priceOld": "6.990.000đ",
        "discount": "Giảm 10%",
        "rating": "4.7",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia Focus Pro 5G 256GB chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T760 (Thiết kế máy ảnh cơ học), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.72 inches",
            "os": "Android 13",
            "chip": "Unisoc T760 (Thiết kế máy ảnh cơ học)",
            "ramrom": "8GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 33W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227420/phonestore/products/Nubia/nubia-focus-pro-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227421/phonestore/products/Nubia/nubia-focus-pro-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227422/phonestore/products/Nubia/nubia-focus-pro-5g-256gb/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-focus-pro-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            61,
            63,
            64
        ]
    },
    "63": {
        "id": 63,
        "name": "Nubia Music 128GB",
        "brand": "Nubia",
        "rawPrice": 2590000,
        "priceCurrent": "2.590.000đ",
        "priceOld": "2.990.000đ",
        "discount": "Giảm 13%",
        "rating": "4.8",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia Music 128GB chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc SC9863A (Loa khủng đĩa than 600%), bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.6 inches",
            "os": "Android 13",
            "chip": "Unisoc SC9863A (Loa khủng đĩa than 600%)",
            "ramrom": "4GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 10W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227424/phonestore/products/Nubia/nubia-music-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227425/phonestore/products/Nubia/nubia-music-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227426/phonestore/products/Nubia/nubia-music-128gb/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-music-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            61,
            62,
            64
        ]
    },
    "64": {
        "id": 64,
        "name": "Nubia Neo 2 5G 256GB",
        "brand": "Nubia",
        "rawPrice": 5290000,
        "priceCurrent": "5.290.000đ",
        "priceOld": "5.990.000đ",
        "discount": "Giảm 12%",
        "rating": "4.9",
        "category": "gaming",
        "type": "AI",
        "needs": [
            "gaming",
            "battery"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia Neo 2 5G 256GB chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T820 (Phím vai trigger cảm ứng), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.72 inches",
            "os": "Android 13",
            "chip": "Unisoc T820 (Phím vai trigger cảm ứng)",
            "ramrom": "8GB / 256GB",
            "battery": "6000 mAh, Sạc nhanh 33W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227428/phonestore/products/Nubia/nubia-neo-2-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227430/phonestore/products/Nubia/nubia-neo-2-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227431/phonestore/products/Nubia/nubia-neo-2-5g-256gb/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-neo-2-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            61,
            62,
            63
        ]
    },
    "65": {
        "id": 65,
        "name": "Nubia Neo 5G 256GB",
        "brand": "Nubia",
        "rawPrice": 4190000,
        "priceCurrent": "4.190.000đ",
        "priceOld": "4.990.000đ",
        "discount": "Giảm 16%",
        "rating": "5.0",
        "category": "gaming",
        "type": "Android",
        "needs": [
            "gaming"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia Neo 5G 256GB chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc T820, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.6 inches",
            "os": "Android 13",
            "chip": "Unisoc T820",
            "ramrom": "8GB / 256GB",
            "battery": "4500 mAh, Sạc nhanh 22.5W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227432/phonestore/products/Nubia/nubia-neo-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227433/phonestore/products/Nubia/nubia-neo-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227435/phonestore/products/Nubia/nubia-neo-5g-256gb/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-neo-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            61,
            62,
            63
        ]
    },
    "66": {
        "id": 66,
        "name": "Nubia RedMagic 8S Pro 256GB",
        "brand": "Nubia",
        "rawPrice": 17490000,
        "priceCurrent": "17.490.000đ",
        "priceOld": "19.990.000đ",
        "discount": "Giảm 13%",
        "rating": "4.5",
        "category": "gaming",
        "type": "Android",
        "needs": [
            "gaming",
            "battery"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia RedMagic 8S Pro 256GB chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 2, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.8 inches",
            "os": "RedMagic OS 8.0",
            "chip": "Snapdragon 8 Gen 2",
            "ramrom": "12GB / 256GB",
            "battery": "6000 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227435/phonestore/products/Nubia/nubia-redmagic-8s-pro-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227436/phonestore/products/Nubia/nubia-redmagic-8s-pro-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227438/phonestore/products/Nubia/nubia-redmagic-8s-pro-256gb/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-redmagic-8s-pro-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            61,
            62,
            63
        ]
    },
    "67": {
        "id": 67,
        "name": "Nubia RedMagic 9 Pro 5G",
        "brand": "Nubia",
        "rawPrice": 19990000,
        "priceCurrent": "19.990.000đ",
        "priceOld": "21.990.000đ",
        "discount": "Giảm 9%",
        "rating": "4.6",
        "category": "gaming",
        "type": "Android",
        "needs": [
            "gaming",
            "battery"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia RedMagic 9 Pro 5G chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 3, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.8 inches",
            "os": "RedMagic OS 9.0",
            "chip": "Snapdragon 8 Gen 3",
            "ramrom": "12GB / 256GB",
            "battery": "6500 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227439/phonestore/products/Nubia/nubia-redmagic-9-pro-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227440/phonestore/products/Nubia/nubia-redmagic-9-pro-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227441/phonestore/products/Nubia/nubia-redmagic-9-pro-5g/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-redmagic-9-pro-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            61,
            62,
            63
        ]
    },
    "68": {
        "id": 68,
        "name": "Nubia RedMagic 9S Pro 5G",
        "brand": "Nubia",
        "rawPrice": 22490000,
        "priceCurrent": "22.490.000đ",
        "priceOld": "23.990.000đ",
        "discount": "Giảm 6%",
        "rating": "4.7",
        "category": "gaming",
        "type": "Android",
        "needs": [
            "gaming",
            "battery"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia RedMagic 9S Pro 5G chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 3 Leading Version (Quạt tản nhiệt cơ học), bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.8 inches",
            "os": "RedMagic OS 9.5 (Android 14)",
            "chip": "Snapdragon 8 Gen 3 Leading Version (Quạt tản nhiệt cơ học)",
            "ramrom": "16GB / 512GB",
            "battery": "6500 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227442/phonestore/products/Nubia/nubia-redmagic-9s-pro-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227443/phonestore/products/Nubia/nubia-redmagic-9s-pro-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227444/phonestore/products/Nubia/nubia-redmagic-9s-pro-5g/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-redmagic-9s-pro-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            61,
            62,
            63
        ]
    },
    "69": {
        "id": 69,
        "name": "Nubia Z50S Pro 256GB",
        "brand": "Nubia",
        "rawPrice": 14990000,
        "priceCurrent": "14.990.000đ",
        "priceOld": "17.990.000đ",
        "discount": "Giảm 17%",
        "rating": "4.8",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia Z50S Pro 256GB chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 2, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "MyOS 13",
            "chip": "Snapdragon 8 Gen 2",
            "ramrom": "12GB / 256GB",
            "battery": "5100 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227445/phonestore/products/Nubia/nubia-z50s-pro-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227446/phonestore/products/Nubia/nubia-z50s-pro-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227447/phonestore/products/Nubia/nubia-z50s-pro-256gb/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-z50s-pro-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            61,
            62,
            63
        ]
    },
    "70": {
        "id": 70,
        "name": "Nubia Z60 Ultra 512GB",
        "brand": "Nubia",
        "rawPrice": 23990000,
        "priceCurrent": "23.990.000đ",
        "priceOld": "25.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.9",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "camera",
            "battery"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Nubia Z60 Ultra 512GB chính hãng từ Nubia. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 3 (Ống kính tiêu cự 35mm), bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.8 inches",
            "os": "MyOS 14 (Android 14)",
            "chip": "Snapdragon 8 Gen 3 (Ống kính tiêu cự 35mm)",
            "ramrom": "16GB / 512GB",
            "battery": "6000 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227448/phonestore/products/Nubia/nubia-z60-ultra-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227450/phonestore/products/Nubia/nubia-z60-ultra-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227451/phonestore/products/Nubia/nubia-z60-ultra-512gb/detail.webp",
        "video": "../data/dienthoai/Nubia/nubia-z60-ultra-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            61,
            62,
            63
        ]
    },
    "71": {
        "id": 71,
        "name": "Find N3 Fold 512GB",
        "brand": "OPPO",
        "rawPrice": 41990000,
        "priceCurrent": "41.990.000đ",
        "priceOld": "44.990.000đ",
        "discount": "Giảm 7%",
        "rating": "5.0",
        "category": "flagship",
        "type": "Fold",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Find N3 Fold 512GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 2, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "7.82 inches (Chính) / 6.31 inches (Phụ)",
            "os": "ColorOS 14",
            "chip": "Snapdragon 8 Gen 2",
            "ramrom": "16GB / 512GB",
            "battery": "4805 mAh, Sạc nhanh 67W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227452/phonestore/products/OPPO/find-n3-fold-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227453/phonestore/products/OPPO/find-n3-fold-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227454/phonestore/products/OPPO/find-n3-fold-512gb/detail.webp",
        "video": "../data/dienthoai/OPPO/find-n3-fold-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            72,
            73,
            74
        ]
    },
    "72": {
        "id": 72,
        "name": "Find X7 Ultra 512GB",
        "brand": "OPPO",
        "rawPrice": 24990000,
        "priceCurrent": "24.990.000đ",
        "priceOld": "29.990.000đ",
        "discount": "Giảm 17%",
        "rating": "4.5",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "camera"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Find X7 Ultra 512GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 3, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.82 inches",
            "os": "ColorOS 14",
            "chip": "Snapdragon 8 Gen 3",
            "ramrom": "16GB / 512GB",
            "battery": "5000 mAh, Sạc nhanh 100W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227455/phonestore/products/OPPO/find-x7-ultra-512gb/front.webp",
        "imageBack": "",
        "imageDetail": "",
        "video": "../data/dienthoai/OPPO/find-x7-ultra-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            71,
            73,
            74
        ]
    },
    "73": {
        "id": 73,
        "name": "Find X8 Ultra 512GB",
        "brand": "OPPO",
        "rawPrice": 30990000,
        "priceCurrent": "30.990.000đ",
        "priceOld": "32.990.000đ",
        "discount": "Giảm 6%",
        "rating": "4.6",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "camera",
            "battery"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Find X8 Ultra 512GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 9400 / Snapdragon 8 Gen 4, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.82 inches",
            "os": "ColorOS 15",
            "chip": "Dimensity 9400 / Snapdragon 8 Gen 4",
            "ramrom": "16GB / 512GB",
            "battery": "5600 mAh, Sạc nhanh 100W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227457/phonestore/products/OPPO/find-x8-ultra-512gb/front.webp",
        "imageBack": "",
        "imageDetail": "",
        "video": "../data/dienthoai/OPPO/find-x8-ultra-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            71,
            72,
            74
        ]
    },
    "74": {
        "id": 74,
        "name": "OPPO A18 64GB",
        "brand": "OPPO",
        "rawPrice": 2890000,
        "priceCurrent": "2.890.000đ",
        "priceOld": "3.290.000đ",
        "discount": "Giảm 12%",
        "rating": "4.7",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "64GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại OPPO A18 64GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G85, bộ nhớ trong 64GB.",
        "specs": {
            "screen": "6.56 inches",
            "os": "ColorOS 13",
            "chip": "MediaTek Helio G85",
            "ramrom": "4GB / 64GB",
            "battery": "5000 mAh, Sạc nhanh 10W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227458/phonestore/products/OPPO/oppo-a18-64gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227459/phonestore/products/OPPO/oppo-a18-64gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227460/phonestore/products/OPPO/oppo-a18-64gb/detail.webp",
        "video": "../data/dienthoai/OPPO/oppo-a18-64gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            71,
            72,
            73
        ]
    },
    "75": {
        "id": 75,
        "name": "OPPO A3 128GB",
        "brand": "OPPO",
        "rawPrice": 4490000,
        "priceCurrent": "4.490.000đ",
        "priceOld": "4.990.000đ",
        "discount": "Giảm 10%",
        "rating": "4.8",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "6GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại OPPO A3 128GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 680, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "ColorOS 14",
            "chip": "Snapdragon 680",
            "ramrom": "6GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 45W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227461/phonestore/products/OPPO/oppo-a3-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227463/phonestore/products/OPPO/oppo-a3-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227464/phonestore/products/OPPO/oppo-a3-128gb/detail.webp",
        "video": "../data/dienthoai/OPPO/oppo-a3-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            71,
            72,
            73
        ]
    },
    "76": {
        "id": 76,
        "name": "OPPO A3 Pro 5G 256GB",
        "brand": "OPPO",
        "rawPrice": 8290000,
        "priceCurrent": "8.290.000đ",
        "priceOld": "8.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.9",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại OPPO A3 Pro 5G 256GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 6300, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "ColorOS 14",
            "chip": "Dimensity 6300",
            "ramrom": "8GB / 256GB",
            "battery": "5100 mAh, Sạc nhanh 45W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227465/phonestore/products/OPPO/oppo-a3-pro-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227466/phonestore/products/OPPO/oppo-a3-pro-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227467/phonestore/products/OPPO/oppo-a3-pro-5g-256gb/detail.webp",
        "video": "../data/dienthoai/OPPO/oppo-a3-pro-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            71,
            72,
            73
        ]
    },
    "77": {
        "id": 77,
        "name": "Reno13 5G 256GB",
        "brand": "OPPO",
        "rawPrice": 12590000,
        "priceCurrent": "12.590.000đ",
        "priceOld": "13.990.000đ",
        "discount": "Giảm 10%",
        "rating": "5.0",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "battery"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Reno13 5G 256GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 8300, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.59 inches",
            "os": "ColorOS 14",
            "chip": "Dimensity 8300",
            "ramrom": "8GB / 256GB",
            "battery": "5600 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227469/phonestore/products/OPPO/reno13-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227470/phonestore/products/OPPO/reno13-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227471/phonestore/products/OPPO/reno13-5g-256gb/detail.webp",
        "video": "../data/dienthoai/OPPO/reno13-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            71,
            72,
            73
        ]
    },
    "78": {
        "id": 78,
        "name": "Reno13 Pro 5G 256GB",
        "brand": "OPPO",
        "rawPrice": 17490000,
        "priceCurrent": "17.490.000đ",
        "priceOld": "18.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.5",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "battery"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Reno13 Pro 5G 256GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 8350, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.83 inches",
            "os": "ColorOS 14",
            "chip": "Dimensity 8350",
            "ramrom": "12GB / 256GB",
            "battery": "5800 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227472/phonestore/products/OPPO/reno13-pro-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227473/phonestore/products/OPPO/reno13-pro-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227474/phonestore/products/OPPO/reno13-pro-5g-256gb/detail.webp",
        "video": "../data/dienthoai/OPPO/reno13-pro-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            71,
            72,
            73
        ]
    },
    "79": {
        "id": 79,
        "name": "Reno14 5G 256GB",
        "brand": "OPPO",
        "rawPrice": 14990000,
        "priceCurrent": "14.990.000đ",
        "priceOld": "15.990.000đ",
        "discount": "Giảm 6%",
        "rating": "4.6",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "gaming",
            "camera",
            "thin"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Reno14 5G 256GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 8300, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "ColorOS 15",
            "chip": "Dimensity 8300",
            "ramrom": "12GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227475/phonestore/products/OPPO/reno14-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227476/phonestore/products/OPPO/reno14-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227477/phonestore/products/OPPO/reno14-5g-256gb/detail.webp",
        "video": "../data/dienthoai/OPPO/reno14-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            71,
            72,
            73
        ]
    },
    "80": {
        "id": 80,
        "name": "Reno14 Pro 5G 512GB",
        "brand": "OPPO",
        "rawPrice": 18990000,
        "priceCurrent": "18.990.000đ",
        "priceOld": "19.990.000đ",
        "discount": "Giảm 5%",
        "rating": "4.7",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Reno14 Pro 5G 512GB chính hãng từ OPPO. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 8400, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "ColorOS 15",
            "chip": "Dimensity 8400",
            "ramrom": "12GB / 512GB",
            "battery": "5000 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227478/phonestore/products/OPPO/reno14-pro-5g-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227479/phonestore/products/OPPO/reno14-pro-5g-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227481/phonestore/products/OPPO/reno14-pro-5g-512gb/detail.webp",
        "video": "../data/dienthoai/OPPO/reno14-pro-5g-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            71,
            72,
            73
        ]
    },
    "81": {
        "id": 81,
        "name": "Galaxy A15 128GB",
        "brand": "Samsung",
        "rawPrice": 4290000,
        "priceCurrent": "4.290.000đ",
        "priceOld": "4.990.000đ",
        "discount": "Giảm 14%",
        "rating": "4.8",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy A15 128GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G99, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.5 inches",
            "os": "Android 14",
            "chip": "MediaTek Helio G99",
            "ramrom": "8GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227518/phonestore/products/Samsung/galaxy-a15-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227519/phonestore/products/Samsung/galaxy-a15-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227520/phonestore/products/Samsung/galaxy-a15-128gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-a15-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            82,
            83,
            84
        ]
    },
    "82": {
        "id": 82,
        "name": "Galaxy A35 5G 128GB",
        "brand": "Samsung",
        "rawPrice": 7490000,
        "priceCurrent": "7.490.000đ",
        "priceOld": "8.290.000đ",
        "discount": "Giảm 10%",
        "rating": "4.9",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy A35 5G 128GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip Exynos 1380, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.6 inches",
            "os": "Android 14",
            "chip": "Exynos 1380",
            "ramrom": "8GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227522/phonestore/products/Samsung/galaxy-a35-5g-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227523/phonestore/products/Samsung/galaxy-a35-5g-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227524/phonestore/products/Samsung/galaxy-a35-5g-128gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-a35-5g-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            81,
            83,
            84
        ]
    },
    "83": {
        "id": 83,
        "name": "Galaxy A55 5G 128GB",
        "brand": "Samsung",
        "rawPrice": 8990000,
        "priceCurrent": "8.990.000đ",
        "priceOld": "9.990.000đ",
        "discount": "Giảm 10%",
        "rating": "5.0",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy A55 5G 128GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip Exynos 1480, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.6 inches",
            "os": "Android 14",
            "chip": "Exynos 1480",
            "ramrom": "8GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227525/phonestore/products/Samsung/galaxy-a55-5g-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227526/phonestore/products/Samsung/galaxy-a55-5g-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227527/phonestore/products/Samsung/galaxy-a55-5g-128gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-a55-5g-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            81,
            82,
            84
        ]
    },
    "84": {
        "id": 84,
        "name": "Galaxy S25 256GB",
        "brand": "Samsung",
        "rawPrice": 20490000,
        "priceCurrent": "20.490.000đ",
        "priceOld": "23.990.000đ",
        "discount": "Giảm 15%",
        "rating": "4.5",
        "category": "flagship",
        "type": "AI",
        "needs": [
            "gaming",
            "camera",
            "thin"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy S25 256GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip Exynos 2500, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.2 inches",
            "os": "Android 15",
            "chip": "Exynos 2500",
            "ramrom": "12GB / 256GB",
            "battery": "4000 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227528/phonestore/products/Samsung/galaxy-s25-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227529/phonestore/products/Samsung/galaxy-s25-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227530/phonestore/products/Samsung/galaxy-s25-256gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-s25-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            81,
            82,
            83
        ]
    },
    "85": {
        "id": 85,
        "name": "Galaxy S25 Ultra 256GB",
        "brand": "Samsung",
        "rawPrice": 31490000,
        "priceCurrent": "31.490.000đ",
        "priceOld": "34.990.000đ",
        "discount": "Giảm 10%",
        "rating": "4.6",
        "category": "flagship",
        "type": "AI",
        "needs": [
            "camera"
        ],
        "ram": "16GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy S25 Ultra 256GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 4, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.8 inches",
            "os": "Android 15",
            "chip": "Snapdragon 8 Gen 4",
            "ramrom": "16GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 45W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227533/phonestore/products/Samsung/galaxy-s25-ultra-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227534/phonestore/products/Samsung/galaxy-s25-ultra-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227535/phonestore/products/Samsung/galaxy-s25-ultra-256gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-s25-ultra-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            81,
            82,
            83
        ]
    },
    "86": {
        "id": 86,
        "name": "Galaxy S26 128GB",
        "brand": "Samsung",
        "rawPrice": 20990000,
        "priceCurrent": "20.990.000đ",
        "priceOld": "22.990.000đ",
        "discount": "Giảm 9%",
        "rating": "4.7",
        "category": "flagship",
        "type": "AI",
        "needs": [
            "gaming",
            "camera",
            "thin"
        ],
        "ram": "12GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy S26 128GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip Exynos 2600 / Snapdragon 8 Gen 5, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.2 inches",
            "os": "Android 16",
            "chip": "Exynos 2600 / Snapdragon 8 Gen 5",
            "ramrom": "12GB / 128GB",
            "battery": "4000 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227537/phonestore/products/Samsung/galaxy-s26-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227538/phonestore/products/Samsung/galaxy-s26-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227539/phonestore/products/Samsung/galaxy-s26-128gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-s26-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            81,
            82,
            83
        ]
    },
    "87": {
        "id": 87,
        "name": "Galaxy S26 Plus 256GB",
        "brand": "Samsung",
        "rawPrice": 26990000,
        "priceCurrent": "26.990.000đ",
        "priceOld": "28.990.000đ",
        "discount": "Giảm 7%",
        "rating": "4.8",
        "category": "flagship",
        "type": "AI",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy S26 Plus 256GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip Exynos 2600 / Snapdragon 8 Gen 5, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "Android 16",
            "chip": "Exynos 2600 / Snapdragon 8 Gen 5",
            "ramrom": "12GB / 256GB",
            "battery": "4900 mAh, Sạc nhanh 45W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227541/phonestore/products/Samsung/galaxy-s26-plus-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227542/phonestore/products/Samsung/galaxy-s26-plus-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227543/phonestore/products/Samsung/galaxy-s26-plus-256gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-s26-plus-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            81,
            82,
            83
        ]
    },
    "88": {
        "id": 88,
        "name": "Galaxy S26 Ultra 256GB",
        "brand": "Samsung",
        "rawPrice": 34990000,
        "priceCurrent": "34.990.000đ",
        "priceOld": "36.990.000đ",
        "discount": "Giảm 5%",
        "rating": "4.9",
        "category": "flagship",
        "type": "AI",
        "needs": [
            "camera"
        ],
        "ram": "16GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy S26 Ultra 256GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 5, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.8 inches",
            "os": "Android 16",
            "chip": "Snapdragon 8 Gen 5",
            "ramrom": "16GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 45W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227546/phonestore/products/Samsung/galaxy-s26-ultra-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227547/phonestore/products/Samsung/galaxy-s26-ultra-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227548/phonestore/products/Samsung/galaxy-s26-ultra-256gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-s26-ultra-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            81,
            82,
            83
        ]
    },
    "89": {
        "id": 89,
        "name": "Galaxy Z Flip7 256GB",
        "brand": "Samsung",
        "rawPrice": 24990000,
        "priceCurrent": "24.990.000đ",
        "priceOld": "26.990.000đ",
        "discount": "Giảm 7%",
        "rating": "5.0",
        "category": "flagship",
        "type": "Fold",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy Z Flip7 256GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 5, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches (Chính) / 3.9 inches (Phụ)",
            "os": "Android 16",
            "chip": "Snapdragon 8 Gen 5",
            "ramrom": "12GB / 256GB",
            "battery": "4200 mAh, Sạc nhanh 25W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227549/phonestore/products/Samsung/galaxy-z-flip7-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227550/phonestore/products/Samsung/galaxy-z-flip7-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227551/phonestore/products/Samsung/galaxy-z-flip7-256gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-z-flip7-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            81,
            82,
            83
        ]
    },
    "90": {
        "id": 90,
        "name": "Galaxy Z Fold7 512GB",
        "brand": "Samsung",
        "rawPrice": 44990000,
        "priceCurrent": "44.990.000đ",
        "priceOld": "46.990.000đ",
        "discount": "Giảm 4%",
        "rating": "4.5",
        "category": "flagship",
        "type": "Fold",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Galaxy Z Fold7 512GB chính hãng từ Samsung. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 5, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "7.6 inches (Chính) / 6.3 inches (Phụ)",
            "os": "Android 16",
            "chip": "Snapdragon 8 Gen 5",
            "ramrom": "16GB / 512GB",
            "battery": "4600 mAh, Sạc nhanh 45W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227553/phonestore/products/Samsung/galaxy-z-fold7-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227554/phonestore/products/Samsung/galaxy-z-fold7-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227555/phonestore/products/Samsung/galaxy-z-fold7-512gb/detail.webp",
        "video": "../data/dienthoai/Samsung/galaxy-z-fold7-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            81,
            82,
            83
        ]
    },
    "91": {
        "id": 91,
        "name": "Tecno Camon 30 Premier 5G",
        "brand": "Tecno",
        "rawPrice": 11990000,
        "priceCurrent": "11.990.000đ",
        "priceOld": "12.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.6",
        "category": "midrange",
        "type": "iOS",
        "needs": [
            "camera"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Camon 30 Premier 5G chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 8200 Ultimate, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.77 inches",
            "os": "HiOS 14",
            "chip": "Dimensity 8200 Ultimate",
            "ramrom": "12GB / 512GB",
            "battery": "5000 mAh, Sạc nhanh 70W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227556/phonestore/products/Tecno/tecno-camon-30-premier-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227558/phonestore/products/Tecno/tecno-camon-30-premier-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227559/phonestore/products/Tecno/tecno-camon-30-premier-5g/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-camon-30-premier-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            92,
            93,
            94
        ]
    },
    "92": {
        "id": 92,
        "name": "Tecno Camon 30 Pro 5G",
        "brand": "Tecno",
        "rawPrice": 8990000,
        "priceCurrent": "8.990.000đ",
        "priceOld": "9.990.000đ",
        "discount": "Giảm 10%",
        "rating": "4.7",
        "category": "midrange",
        "type": "iOS",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "144Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Camon 30 Pro 5G chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 8200 Ultimate, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "HiOS 14",
            "chip": "Dimensity 8200 Ultimate",
            "ramrom": "12GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 70W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227560/phonestore/products/Tecno/tecno-camon-30-pro-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227561/phonestore/products/Tecno/tecno-camon-30-pro-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227562/phonestore/products/Tecno/tecno-camon-30-pro-5g/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-camon-30-pro-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            91,
            93,
            94
        ]
    },
    "93": {
        "id": 93,
        "name": "Tecno Phantom V Flip2 5G",
        "brand": "Tecno",
        "rawPrice": 17990000,
        "priceCurrent": "17.990.000đ",
        "priceOld": "18.990.000đ",
        "discount": "Giảm 5%",
        "rating": "4.8",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast",
            "wireless"
        ],
        "specialFeatures": [
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Phantom V Flip2 5G chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 8020, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.9 inches chính",
            "os": "HiOS 14",
            "chip": "Dimensity 8020",
            "ramrom": "8GB / 256GB",
            "battery": "4720 mAh, Sạc nhanh 70W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227564/phonestore/products/Tecno/tecno-phantom-v-flip2-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227565/phonestore/products/Tecno/tecno-phantom-v-flip2-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227566/phonestore/products/Tecno/tecno-phantom-v-flip2-5g/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-phantom-v-flip2-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            91,
            92,
            94
        ]
    },
    "94": {
        "id": 94,
        "name": "Tecno Phantom V Fold2 5G",
        "brand": "Tecno",
        "rawPrice": 25990000,
        "priceCurrent": "25.990.000đ",
        "priceOld": "26.990.000đ",
        "discount": "Giảm 4%",
        "rating": "4.9",
        "category": "flagship",
        "type": "iOS",
        "needs": [
            "battery"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast",
            "wireless"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Phantom V Fold2 5G chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 9000+, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "7.85 inches chính",
            "os": "HiOS 14 (Android 14)",
            "chip": "Dimensity 9000+",
            "ramrom": "12GB / 512GB",
            "battery": "5750 mAh, Sạc nhanh 70W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227567/phonestore/products/Tecno/tecno-phantom-v-fold2-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227568/phonestore/products/Tecno/tecno-phantom-v-fold2-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227569/phonestore/products/Tecno/tecno-phantom-v-fold2-5g/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-phantom-v-fold2-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            91,
            92,
            93
        ]
    },
    "95": {
        "id": 95,
        "name": "Tecno Pop 8 64GB",
        "brand": "Tecno",
        "rawPrice": 2090000,
        "priceCurrent": "2.090.000đ",
        "priceOld": "2.490.000đ",
        "discount": "Giảm 16%",
        "rating": "5.0",
        "category": "budget",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "3GB",
        "storage": "64GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Pop 8 64GB chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc Tiger T606, bộ nhớ trong 64GB.",
        "specs": {
            "screen": "6.6 inches",
            "os": "Android 13 Go (HiOS 13)",
            "chip": "Unisoc Tiger T606",
            "ramrom": "3GB / 64GB",
            "battery": "5000 mAh, Sạc nhanh 10W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227570/phonestore/products/Tecno/tecno-pop-8-64gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227572/phonestore/products/Tecno/tecno-pop-8-64gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227573/phonestore/products/Tecno/tecno-pop-8-64gb/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-pop-8-64gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            91,
            92,
            93
        ]
    },
    "96": {
        "id": 96,
        "name": "Tecno Pova 5 Pro 5G",
        "brand": "Tecno",
        "rawPrice": 4590000,
        "priceCurrent": "4.590.000đ",
        "priceOld": "5.290.000đ",
        "discount": "Giảm 13%",
        "rating": "4.5",
        "category": "gaming",
        "type": "iOS",
        "needs": [
            "gaming"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Pova 5 Pro 5G chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 6080 (Thiết kế LED 3D), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "HiOS 13",
            "chip": "Dimensity 6080 (Thiết kế LED 3D)",
            "ramrom": "8GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 68W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227574/phonestore/products/Tecno/tecno-pova-5-pro-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227575/phonestore/products/Tecno/tecno-pova-5-pro-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227576/phonestore/products/Tecno/tecno-pova-5-pro-5g/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-pova-5-pro-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            91,
            92,
            93
        ]
    },
    "97": {
        "id": 97,
        "name": "Tecno Pova 6 Pro 5G 256GB",
        "brand": "Tecno",
        "rawPrice": 6990000,
        "priceCurrent": "6.990.000đ",
        "priceOld": "7.490.000đ",
        "discount": "Giảm 7%",
        "rating": "4.6",
        "category": "gaming",
        "type": "iOS",
        "needs": [
            "gaming",
            "battery"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Pova 6 Pro 5G 256GB chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 6080 (Thiết kế LED mecha), bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "HiOS 14",
            "chip": "Dimensity 6080 (Thiết kế LED mecha)",
            "ramrom": "12GB / 256GB",
            "battery": "6000 mAh, Sạc nhanh 70W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227577/phonestore/products/Tecno/tecno-pova-6-pro-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227578/phonestore/products/Tecno/tecno-pova-6-pro-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227580/phonestore/products/Tecno/tecno-pova-6-pro-5g-256gb/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-pova-6-pro-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            91,
            92,
            93
        ]
    },
    "98": {
        "id": 98,
        "name": "Tecno Spark 20 128GB",
        "brand": "Tecno",
        "rawPrice": 3090000,
        "priceCurrent": "3.090.000đ",
        "priceOld": "3.490.000đ",
        "discount": "Giảm 11%",
        "rating": "4.7",
        "category": "budget",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Spark 20 128GB chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G85, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.6 inches",
            "os": "HiOS 13",
            "chip": "MediaTek Helio G85",
            "ramrom": "8GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 18W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227581/phonestore/products/Tecno/tecno-spark-20-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227582/phonestore/products/Tecno/tecno-spark-20-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227583/phonestore/products/Tecno/tecno-spark-20-128gb/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-spark-20-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            91,
            92,
            93
        ]
    },
    "99": {
        "id": 99,
        "name": "Tecno Spark 20 Pro Plus 256GB",
        "brand": "Tecno",
        "rawPrice": 4990000,
        "priceCurrent": "4.990.000đ",
        "priceOld": "5.490.000đ",
        "discount": "Giảm 9%",
        "rating": "4.8",
        "category": "midrange",
        "type": "iOS",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Spark 20 Pro Plus 256GB chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G99 Ultimate, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "HiOS 14",
            "chip": "MediaTek Helio G99 Ultimate",
            "ramrom": "8GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 33W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227584/phonestore/products/Tecno/tecno-spark-20-pro-plus-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227585/phonestore/products/Tecno/tecno-spark-20-pro-plus-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227586/phonestore/products/Tecno/tecno-spark-20-pro-plus-256gb/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-spark-20-pro-plus-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            91,
            92,
            93
        ]
    },
    "100": {
        "id": 100,
        "name": "Tecno Spark Go 2024 64GB",
        "brand": "Tecno",
        "rawPrice": 1890000,
        "priceCurrent": "1.890.000đ",
        "priceOld": "2.290.000đ",
        "discount": "Giảm 17%",
        "rating": "4.9",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "3GB",
        "storage": "64GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Tecno Spark Go 2024 64GB chính hãng từ Tecno. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc Tiger T606, bộ nhớ trong 64GB.",
        "specs": {
            "screen": "6.6 inches",
            "os": "Android 13 Go",
            "chip": "Unisoc Tiger T606",
            "ramrom": "3GB / 64GB",
            "battery": "5000 mAh, Sạc nhanh 10W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227588/phonestore/products/Tecno/tecno-spark-go-2024-64gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227590/phonestore/products/Tecno/tecno-spark-go-2024-64gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227591/phonestore/products/Tecno/tecno-spark-go-2024-64gb/detail.webp",
        "video": "../data/dienthoai/Tecno/tecno-spark-go-2024-64gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            91,
            92,
            93
        ]
    },
    "101": {
        "id": 101,
        "name": "Poco F7 Pro 512GB",
        "brand": "Xiaomi",
        "rawPrice": 13990000,
        "priceCurrent": "13.990.000đ",
        "priceOld": "14.990.000đ",
        "discount": "Giảm 7%",
        "rating": "5.0",
        "category": "gaming",
        "type": "Android",
        "needs": [
            "gaming"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Poco F7 Pro 512GB chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8s Gen 4, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "Xiaomi HyperOS 2.0",
            "chip": "Snapdragon 8s Gen 4",
            "ramrom": "12GB / 512GB",
            "battery": "5000 mAh, Sạc nhanh 120W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227644/phonestore/products/Xiaomi/poco-f7-pro-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227645/phonestore/products/Xiaomi/poco-f7-pro-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227647/phonestore/products/Xiaomi/poco-f7-pro-512gb/detail.webp",
        "video": "../data/dienthoai/Xiaomi/poco-f7-pro-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            102,
            103,
            104
        ]
    },
    "102": {
        "id": 102,
        "name": "Redmi 14C 128GB",
        "brand": "Xiaomi",
        "rawPrice": 3190000,
        "priceCurrent": "3.190.000đ",
        "priceOld": "3.490.000đ",
        "discount": "Giảm 9%",
        "rating": "4.5",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Redmi 14C 128GB chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G81, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.88 inches",
            "os": "Xiaomi HyperOS 1.0",
            "chip": "MediaTek Helio G81",
            "ramrom": "4GB / 128GB",
            "battery": "5160 mAh, Sạc nhanh 18W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227651/phonestore/products/Xiaomi/redmi-14c-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227652/phonestore/products/Xiaomi/redmi-14c-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227653/phonestore/products/Xiaomi/redmi-14c-128gb/detail.webp",
        "video": "../data/dienthoai/Xiaomi/redmi-14c-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            101,
            103,
            104
        ]
    },
    "103": {
        "id": 103,
        "name": "Redmi A3 64GB",
        "brand": "Xiaomi",
        "rawPrice": 2190000,
        "priceCurrent": "2.190.000đ",
        "priceOld": "2.490.000đ",
        "discount": "Giảm 12%",
        "rating": "4.6",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "3GB",
        "storage": "64GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Redmi A3 64GB chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G36, bộ nhớ trong 64GB.",
        "specs": {
            "screen": "6.71 inches",
            "os": "Android 14 Go",
            "chip": "MediaTek Helio G36",
            "ramrom": "3GB / 64GB",
            "battery": "5000 mAh, Sạc nhanh 10W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227654/phonestore/products/Xiaomi/redmi-a3-64gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227656/phonestore/products/Xiaomi/redmi-a3-64gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227658/phonestore/products/Xiaomi/redmi-a3-64gb/detail.webp",
        "video": "../data/dienthoai/Xiaomi/redmi-a3-64gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            101,
            102,
            104
        ]
    },
    "104": {
        "id": 104,
        "name": "Redmi Note 14 Pro Plus 5G",
        "brand": "Xiaomi",
        "rawPrice": 9490000,
        "priceCurrent": "9.490.000đ",
        "priceOld": "10.990.000đ",
        "discount": "Giảm 14%",
        "rating": "4.7",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "battery"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Redmi Note 14 Pro Plus 5G chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 7s Gen 3, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "Xiaomi HyperOS 1.0",
            "chip": "Snapdragon 7s Gen 3",
            "ramrom": "12GB / 256GB",
            "battery": "6200 mAh, Sạc nhanh 90W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227661/phonestore/products/Xiaomi/redmi-note-14-pro-plus-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227662/phonestore/products/Xiaomi/redmi-note-14-pro-plus-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227663/phonestore/products/Xiaomi/redmi-note-14-pro-plus-5g/detail.webp",
        "video": "../data/dienthoai/Xiaomi/redmi-note-14-pro-plus-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            101,
            102,
            103
        ]
    },
    "105": {
        "id": 105,
        "name": "Redmi Note 15 Pro 5G",
        "brand": "Xiaomi",
        "rawPrice": 8790000,
        "priceCurrent": "8.790.000đ",
        "priceOld": "9.490.000đ",
        "discount": "Giảm 7%",
        "rating": "4.8",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Redmi Note 15 Pro 5G chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 7s Gen 4, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "Xiaomi HyperOS 2.0",
            "chip": "Snapdragon 7s Gen 4",
            "ramrom": "8GB / 256GB",
            "battery": "5200 mAh, Sạc nhanh 67W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227665/phonestore/products/Xiaomi/redmi-note-15-pro-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227666/phonestore/products/Xiaomi/redmi-note-15-pro-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227667/phonestore/products/Xiaomi/redmi-note-15-pro-5g/detail.webp",
        "video": "../data/dienthoai/Xiaomi/redmi-note-15-pro-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            101,
            102,
            103
        ]
    },
    "106": {
        "id": 106,
        "name": "Redmi Note 15 Pro Plus 5G",
        "brand": "Xiaomi",
        "rawPrice": 10990000,
        "priceCurrent": "10.990.000đ",
        "priceOld": "11.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.9",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Redmi Note 15 Pro Plus 5G chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 7500 Ultra, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "Xiaomi HyperOS 2.0",
            "chip": "Dimensity 7500 Ultra",
            "ramrom": "12GB / 512GB",
            "battery": "5100 mAh, Sạc nhanh 120W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227671/phonestore/products/Xiaomi/redmi-note-15-pro-plus-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227672/phonestore/products/Xiaomi/redmi-note-15-pro-plus-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227673/phonestore/products/Xiaomi/redmi-note-15-pro-plus-5g/detail.webp",
        "video": "../data/dienthoai/Xiaomi/redmi-note-15-pro-plus-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            101,
            102,
            103
        ]
    },
    "107": {
        "id": 107,
        "name": "Xiaomi 15 256GB",
        "brand": "Xiaomi",
        "rawPrice": 19990000,
        "priceCurrent": "19.990.000đ",
        "priceOld": "21.990.000đ",
        "discount": "Giảm 9%",
        "rating": "5.0",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Xiaomi 15 256GB chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 4, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.36 inches",
            "os": "Xiaomi HyperOS 1.5",
            "chip": "Snapdragon 8 Gen 4",
            "ramrom": "12GB / 256GB",
            "battery": "4800 mAh, Sạc nhanh 90W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227676/phonestore/products/Xiaomi/xiaomi-15-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227678/phonestore/products/Xiaomi/xiaomi-15-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227679/phonestore/products/Xiaomi/xiaomi-15-256gb/detail.webp",
        "video": "../data/dienthoai/Xiaomi/xiaomi-15-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            101,
            102,
            103
        ]
    },
    "108": {
        "id": 108,
        "name": "Xiaomi 15 Pro 512GB",
        "brand": "Xiaomi",
        "rawPrice": 27990000,
        "priceCurrent": "27.990.000đ",
        "priceOld": "29.990.000đ",
        "discount": "Giảm 7%",
        "rating": "4.5",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Xiaomi 15 Pro 512GB chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 4, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.73 inches",
            "os": "Xiaomi HyperOS 1.5",
            "chip": "Snapdragon 8 Gen 4",
            "ramrom": "16GB / 512GB",
            "battery": "5400 mAh, Sạc nhanh 90W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227683/phonestore/products/Xiaomi/xiaomi-15-pro-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227685/phonestore/products/Xiaomi/xiaomi-15-pro-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227686/phonestore/products/Xiaomi/xiaomi-15-pro-512gb/detail.webp",
        "video": "../data/dienthoai/Xiaomi/xiaomi-15-pro-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            101,
            102,
            103
        ]
    },
    "109": {
        "id": 109,
        "name": "Xiaomi 16 256GB",
        "brand": "Xiaomi",
        "rawPrice": 20990000,
        "priceCurrent": "20.990.000đ",
        "priceOld": "22.990.000đ",
        "discount": "Giảm 9%",
        "rating": "4.6",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Xiaomi 16 256GB chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 5, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.36 inches",
            "os": "Xiaomi HyperOS 2.0",
            "chip": "Snapdragon 8 Gen 5",
            "ramrom": "12GB / 256GB",
            "battery": "4900 mAh, Sạc nhanh 90W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227689/phonestore/products/Xiaomi/xiaomi-16-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227690/phonestore/products/Xiaomi/xiaomi-16-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227691/phonestore/products/Xiaomi/xiaomi-16-256gb/detail.webp",
        "video": "../data/dienthoai/Xiaomi/xiaomi-16-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            101,
            102,
            103
        ]
    },
    "110": {
        "id": 110,
        "name": "Xiaomi 16 Ultra 512GB",
        "brand": "Xiaomi",
        "rawPrice": 32990000,
        "priceCurrent": "32.990.000đ",
        "priceOld": "34.990.000đ",
        "discount": "Giảm 6%",
        "rating": "4.7",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "camera",
            "battery"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại Xiaomi 16 Ultra 512GB chính hãng từ Xiaomi. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 5, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.73 inches",
            "os": "Xiaomi HyperOS 2.0",
            "chip": "Snapdragon 8 Gen 5",
            "ramrom": "16GB / 512GB",
            "battery": "5500 mAh, Sạc nhanh 120W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227695/phonestore/products/Xiaomi/xiaomi-16-ultra-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227696/phonestore/products/Xiaomi/xiaomi-16-ultra-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227698/phonestore/products/Xiaomi/xiaomi-16-ultra-512gb/detail.webp",
        "video": "../data/dienthoai/Xiaomi/xiaomi-16-ultra-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            101,
            102,
            103
        ]
    },
    "111": {
        "id": 111,
        "name": "realme 12 Pro Plus 5G",
        "brand": "realme",
        "rawPrice": 10490000,
        "priceCurrent": "10.490.000đ",
        "priceOld": "11.990.000đ",
        "discount": "Giảm 13%",
        "rating": "4.8",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme 12 Pro Plus 5G chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 7s Gen 2, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "realme UI 5.0 (Android 14)",
            "chip": "Snapdragon 7s Gen 2",
            "ramrom": "8GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 67W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227482/phonestore/products/realme/realme-12-pro-plus-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227483/phonestore/products/realme/realme-12-pro-plus-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227484/phonestore/products/realme/realme-12-pro-plus-5g/detail.webp",
        "video": "../data/dienthoai/realme/realme-12-pro-plus-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            112,
            113,
            114
        ]
    },
    "112": {
        "id": 112,
        "name": "realme 13 Pro Plus 5G",
        "brand": "realme",
        "rawPrice": 11990000,
        "priceCurrent": "11.990.000đ",
        "priceOld": "12.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.9",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme 13 Pro Plus 5G chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 7s Gen 2, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.7 inches",
            "os": "realme UI 5.0 (Android 14)",
            "chip": "Snapdragon 7s Gen 2",
            "ramrom": "12GB / 512GB",
            "battery": "5200 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227485/phonestore/products/realme/realme-13-pro-plus-5g/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227486/phonestore/products/realme/realme-13-pro-plus-5g/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227488/phonestore/products/realme/realme-13-pro-plus-5g/detail.webp",
        "video": "../data/dienthoai/realme/realme-13-pro-plus-5g/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            111,
            113,
            114
        ]
    },
    "113": {
        "id": 113,
        "name": "realme C53 128GB",
        "brand": "realme",
        "rawPrice": 3690000,
        "priceCurrent": "3.690.000đ",
        "priceOld": "4.290.000đ",
        "discount": "Giảm 14%",
        "rating": "5.0",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "6GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme C53 128GB chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc Tiger T612, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.74 inches",
            "os": "Android 13",
            "chip": "Unisoc Tiger T612",
            "ramrom": "6GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 33W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227489/phonestore/products/realme/realme-c53-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227490/phonestore/products/realme/realme-c53-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227492/phonestore/products/realme/realme-c53-128gb/detail.webp",
        "video": "../data/dienthoai/realme/realme-c53-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            111,
            112,
            114
        ]
    },
    "114": {
        "id": 114,
        "name": "realme C61 128GB",
        "brand": "realme",
        "rawPrice": 3290000,
        "priceCurrent": "3.290.000đ",
        "priceOld": "3.590.000đ",
        "discount": "Giảm 8%",
        "rating": "4.5",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme C61 128GB chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc Tiger T612, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.74 inches",
            "os": "Android 14",
            "chip": "Unisoc Tiger T612",
            "ramrom": "4GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 15W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227494/phonestore/products/realme/realme-c61-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227495/phonestore/products/realme/realme-c61-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227496/phonestore/products/realme/realme-c61-128gb/detail.webp",
        "video": "../data/dienthoai/realme/realme-c61-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            111,
            112,
            113
        ]
    },
    "115": {
        "id": 115,
        "name": "realme C65 128GB",
        "brand": "realme",
        "rawPrice": 3590000,
        "priceCurrent": "3.590.000đ",
        "priceOld": "3.990.000đ",
        "discount": "Giảm 10%",
        "rating": "4.6",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "6GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme C65 128GB chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G85, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "Android 14",
            "chip": "MediaTek Helio G85",
            "ramrom": "6GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 45W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227497/phonestore/products/realme/realme-c65-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227499/phonestore/products/realme/realme-c65-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227500/phonestore/products/realme/realme-c65-128gb/detail.webp",
        "video": "../data/dienthoai/realme/realme-c65-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            111,
            112,
            113
        ]
    },
    "116": {
        "id": 116,
        "name": "realme C67 128GB",
        "brand": "realme",
        "rawPrice": 4690000,
        "priceCurrent": "4.690.000đ",
        "priceOld": "5.290.000đ",
        "discount": "Giảm 11%",
        "rating": "4.7",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme C67 128GB chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 685, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.72 inches",
            "os": "Android 14",
            "chip": "Snapdragon 685",
            "ramrom": "8GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 33W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227500/phonestore/products/realme/realme-c67-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227502/phonestore/products/realme/realme-c67-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227503/phonestore/products/realme/realme-c67-128gb/detail.webp",
        "video": "../data/dienthoai/realme/realme-c67-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            111,
            112,
            113
        ]
    },
    "117": {
        "id": 117,
        "name": "realme GT5 Pro 256GB",
        "brand": "realme",
        "rawPrice": 13990000,
        "priceCurrent": "13.990.000đ",
        "priceOld": "15.990.000đ",
        "discount": "Giảm 13%",
        "rating": "4.8",
        "category": "gaming",
        "type": "Android",
        "needs": [
            "gaming"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "144Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme GT5 Pro 256GB chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 3, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "Android 14",
            "chip": "Snapdragon 8 Gen 3",
            "ramrom": "12GB / 256GB",
            "battery": "5400 mAh, Sạc nhanh 100W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227504/phonestore/products/realme/realme-gt5-pro-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227505/phonestore/products/realme/realme-gt5-pro-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227506/phonestore/products/realme/realme-gt5-pro-256gb/detail.webp",
        "video": "../data/dienthoai/realme/realme-gt5-pro-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            111,
            112,
            113
        ]
    },
    "118": {
        "id": 118,
        "name": "realme GT6 5G 256GB",
        "brand": "realme",
        "rawPrice": 15990000,
        "priceCurrent": "15.990.000đ",
        "priceOld": "16.990.000đ",
        "discount": "Giảm 6%",
        "rating": "4.9",
        "category": "gaming",
        "type": "Android",
        "needs": [
            "gaming",
            "battery"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme GT6 5G 256GB chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8s Gen 3, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "realme UI 5.0 (Android 14)",
            "chip": "Snapdragon 8s Gen 3",
            "ramrom": "12GB / 256GB",
            "battery": "5500 mAh, Sạc nhanh 120W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227507/phonestore/products/realme/realme-gt6-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227508/phonestore/products/realme/realme-gt6-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227508/phonestore/products/realme/realme-gt6-5g-256gb/detail.webp",
        "video": "../data/dienthoai/realme/realme-gt6-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            111,
            112,
            113
        ]
    },
    "119": {
        "id": 119,
        "name": "realme Note 50 64GB",
        "brand": "realme",
        "rawPrice": 2290000,
        "priceCurrent": "2.290.000đ",
        "priceOld": "2.490.000đ",
        "discount": "Giảm 8%",
        "rating": "5.0",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "3GB",
        "storage": "64GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme Note 50 64GB chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc Tiger T612, bộ nhớ trong 64GB.",
        "specs": {
            "screen": "6.74 inches",
            "os": "Android 13",
            "chip": "Unisoc Tiger T612",
            "ramrom": "3GB / 64GB",
            "battery": "5000 mAh, Sạc nhanh 10W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227509/phonestore/products/realme/realme-note-50-64gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227511/phonestore/products/realme/realme-note-50-64gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227513/phonestore/products/realme/realme-note-50-64gb/detail.webp",
        "video": "../data/dienthoai/realme/realme-note-50-64gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            111,
            112,
            113
        ]
    },
    "120": {
        "id": 120,
        "name": "realme Note 60 64GB",
        "brand": "realme",
        "rawPrice": 2690000,
        "priceCurrent": "2.690.000đ",
        "priceOld": "2.990.000đ",
        "discount": "Giảm 10%",
        "rating": "4.5",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "64GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại realme Note 60 64GB chính hãng từ realme. Thiết kế sang trọng, hiệu năng vượt trội với chip Unisoc Tiger T612, bộ nhớ trong 64GB.",
        "specs": {
            "screen": "6.74 inches",
            "os": "Android 14",
            "chip": "Unisoc Tiger T612",
            "ramrom": "4GB / 64GB",
            "battery": "5000 mAh, Sạc nhanh 10W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227514/phonestore/products/realme/realme-note-60-64gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227515/phonestore/products/realme/realme-note-60-64gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227517/phonestore/products/realme/realme-note-60-64gb/detail.webp",
        "video": "../data/dienthoai/realme/realme-note-60-64gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            111,
            112,
            113
        ]
    },
    "121": {
        "id": 121,
        "name": "vivo T3 Ultra 256GB",
        "brand": "vivo",
        "rawPrice": 11990000,
        "priceCurrent": "11.990.000đ",
        "priceOld": "12.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.6",
        "category": "gaming",
        "type": "Android",
        "needs": [
            "gaming",
            "camera",
            "battery"
        ],
        "ram": "12GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo T3 Ultra 256GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 9200+, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "Funtouch OS 14",
            "chip": "Dimensity 9200+",
            "ramrom": "12GB / 256GB",
            "battery": "5500 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227593/phonestore/products/vivo/vivo-t3-ultra-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227596/phonestore/products/vivo/vivo-t3-ultra-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227597/phonestore/products/vivo/vivo-t3-ultra-256gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-t3-ultra-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            122,
            123,
            124
        ]
    },
    "122": {
        "id": 122,
        "name": "vivo V30 Pro 512GB",
        "brand": "vivo",
        "rawPrice": 13990000,
        "priceCurrent": "13.990.000đ",
        "priceOld": "15.990.000đ",
        "discount": "Giảm 13%",
        "rating": "4.7",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "gaming",
            "camera"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo V30 Pro 512GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 8200, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "Funtouch OS 14",
            "chip": "Dimensity 8200",
            "ramrom": "12GB / 512GB",
            "battery": "5000 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227599/phonestore/products/vivo/vivo-v30-pro-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227600/phonestore/products/vivo/vivo-v30-pro-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227601/phonestore/products/vivo/vivo-v30-pro-512gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-v30-pro-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            121,
            123,
            124
        ]
    },
    "123": {
        "id": 123,
        "name": "vivo V40 Lite 256GB",
        "brand": "vivo",
        "rawPrice": 7990000,
        "priceCurrent": "7.990.000đ",
        "priceOld": "8.490.000đ",
        "discount": "Giảm 6%",
        "rating": "4.8",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo V40 Lite 256GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 685, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "Funtouch OS 14",
            "chip": "Snapdragon 685",
            "ramrom": "8GB / 256GB",
            "battery": "5000 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227603/phonestore/products/vivo/vivo-v40-lite-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227604/phonestore/products/vivo/vivo-v40-lite-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227606/phonestore/products/vivo/vivo-v40-lite-256gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-v40-lite-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            121,
            122,
            124
        ]
    },
    "124": {
        "id": 124,
        "name": "vivo V40 Pro 5G 512GB",
        "brand": "vivo",
        "rawPrice": 15990000,
        "priceCurrent": "15.990.000đ",
        "priceOld": "16.990.000đ",
        "discount": "Giảm 6%",
        "rating": "4.9",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "battery"
        ],
        "ram": "12GB",
        "storage": "512GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo V40 Pro 5G 512GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 9200+, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "Funtouch OS 14",
            "chip": "Dimensity 9200+",
            "ramrom": "12GB / 512GB",
            "battery": "5500 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227608/phonestore/products/vivo/vivo-v40-pro-5g-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227609/phonestore/products/vivo/vivo-v40-pro-5g-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227611/phonestore/products/vivo/vivo-v40-pro-5g-512gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-v40-pro-5g-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            121,
            122,
            123
        ]
    },
    "125": {
        "id": 125,
        "name": "vivo X100 Ultra 512GB",
        "brand": "vivo",
        "rawPrice": 24990000,
        "priceCurrent": "24.990.000đ",
        "priceOld": "28.990.000đ",
        "discount": "Giảm 14%",
        "rating": "5.0",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "camera",
            "battery"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo X100 Ultra 512GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 8 Gen 3, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "Funtouch OS 14",
            "chip": "Snapdragon 8 Gen 3",
            "ramrom": "16GB / 512GB",
            "battery": "5500 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227613/phonestore/products/vivo/vivo-x100-ultra-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227614/phonestore/products/vivo/vivo-x100-ultra-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227616/phonestore/products/vivo/vivo-x100-ultra-512gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-x100-ultra-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            121,
            122,
            123
        ]
    },
    "126": {
        "id": 126,
        "name": "vivo X200 Pro 512GB",
        "brand": "vivo",
        "rawPrice": 27990000,
        "priceCurrent": "27.990.000đ",
        "priceOld": "29.990.000đ",
        "discount": "Giảm 7%",
        "rating": "4.5",
        "category": "flagship",
        "type": "Android",
        "needs": [
            "battery"
        ],
        "ram": "16GB",
        "storage": "512GB",
        "resolution": "2K+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "aiEdit",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo X200 Pro 512GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip Dimensity 9400, bộ nhớ trong 512GB.",
        "specs": {
            "screen": "6.78 inches",
            "os": "OriginOS 5 / Funtouch OS 15",
            "chip": "Dimensity 9400",
            "ramrom": "16GB / 512GB",
            "battery": "6000 mAh, Sạc nhanh 90W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227617/phonestore/products/vivo/vivo-x200-pro-512gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227618/phonestore/products/vivo/vivo-x200-pro-512gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227620/phonestore/products/vivo/vivo-x200-pro-512gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-x200-pro-512gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            },
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            }
        ],
        "related": [
            121,
            122,
            123
        ]
    },
    "127": {
        "id": 127,
        "name": "vivo Y03 64GB",
        "brand": "vivo",
        "rawPrice": 2690000,
        "priceCurrent": "2.690.000đ",
        "priceOld": "2.990.000đ",
        "discount": "Giảm 10%",
        "rating": "4.6",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "4GB",
        "storage": "64GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo Y03 64GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G85, bộ nhớ trong 64GB.",
        "specs": {
            "screen": "6.56 inches",
            "os": "Funtouch OS 14",
            "chip": "MediaTek Helio G85",
            "ramrom": "4GB / 64GB",
            "battery": "5000 mAh, Sạc nhanh 15W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227621/phonestore/products/vivo/vivo-y03-64gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227623/phonestore/products/vivo/vivo-y03-64gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227625/phonestore/products/vivo/vivo-y03-64gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-y03-64gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            },
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            }
        ],
        "related": [
            121,
            122,
            123
        ]
    },
    "128": {
        "id": 128,
        "name": "vivo Y100 128GB",
        "brand": "vivo",
        "rawPrice": 6590000,
        "priceCurrent": "6.590.000đ",
        "priceOld": "7.290.000đ",
        "discount": "Giảm 10%",
        "rating": "4.7",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast",
            "superFast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "superFast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo Y100 128GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 685, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "Funtouch OS 14",
            "chip": "Snapdragon 685",
            "ramrom": "8GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 80W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227627/phonestore/products/vivo/vivo-y100-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227629/phonestore/products/vivo/vivo-y100-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227630/phonestore/products/vivo/vivo-y100-128gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-y100-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Trần Hoàng Nam",
                "stars": "★★★★★",
                "content": "Sản phẩm chính hãng, đập hộp cực thích. Rất đáng mua."
            },
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            }
        ],
        "related": [
            121,
            122,
            123
        ]
    },
    "129": {
        "id": 129,
        "name": "vivo Y18s 128GB",
        "brand": "vivo",
        "rawPrice": 3990000,
        "priceCurrent": "3.990.000đ",
        "priceOld": "4.490.000đ",
        "discount": "Giảm 11%",
        "rating": "4.8",
        "category": "budget",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "6GB",
        "storage": "128GB",
        "resolution": "HD+",
        "refreshRate": "90Hz",
        "charging": [],
        "specialFeatures": [
            "waterResist",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo Y18s 128GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip MediaTek Helio G85, bộ nhớ trong 128GB.",
        "specs": {
            "screen": "6.56 inches",
            "os": "Funtouch OS 14",
            "chip": "MediaTek Helio G85",
            "ramrom": "6GB / 128GB",
            "battery": "5000 mAh, Sạc nhanh 15W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227632/phonestore/products/vivo/vivo-y18s-128gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227633/phonestore/products/vivo/vivo-y18s-128gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227636/phonestore/products/vivo/vivo-y18s-128gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-y18s-128gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Vũ Phương Thảo",
                "stars": "★★★★☆",
                "content": "Thiết kế đẹp, cầm chắc tay. Cửa hàng hỗ trợ nhiệt tình."
            },
            {
                "name": "Lê Thị Hoa",
                "stars": "★★★★★",
                "content": "Camera chụp ảnh sắc nét, màu sắc trung thực. Hài lòng với chất lượng phục vụ."
            }
        ],
        "related": [
            121,
            122,
            123
        ]
    },
    "130": {
        "id": 130,
        "name": "vivo Y200 5G 256GB",
        "brand": "vivo",
        "rawPrice": 8290000,
        "priceCurrent": "8.290.000đ",
        "priceOld": "8.990.000đ",
        "discount": "Giảm 8%",
        "rating": "4.9",
        "category": "midrange",
        "type": "Android",
        "needs": [
            "thin"
        ],
        "ram": "8GB",
        "storage": "256GB",
        "resolution": "HD+",
        "refreshRate": "120Hz",
        "charging": [
            "fast"
        ],
        "specialFeatures": [
            "waterResist",
            "fast",
            "5G",
            "nfc"
        ],
        "description": "Điện thoại vivo Y200 5G 256GB chính hãng từ vivo. Thiết kế sang trọng, hiệu năng vượt trội với chip Snapdragon 4 Gen 2, bộ nhớ trong 256GB.",
        "specs": {
            "screen": "6.67 inches",
            "os": "Funtouch OS 14",
            "chip": "Snapdragon 4 Gen 2",
            "ramrom": "8GB / 256GB",
            "battery": "4800 mAh, Sạc nhanh 44W"
        },
        "imageFront": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227638/phonestore/products/vivo/vivo-y200-5g-256gb/front.webp",
        "imageBack": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227640/phonestore/products/vivo/vivo-y200-5g-256gb/back.webp",
        "imageDetail": "https://res.cloudinary.com/dw9catzob/image/upload/v1782227642/phonestore/products/vivo/vivo-y200-5g-256gb/detail.webp",
        "video": "../data/dienthoai/vivo/vivo-y200-5g-256gb/videos/intro.webm",
        "reviews": [
            {
                "name": "Nguyễn Văn Bình",
                "stars": "★★★★★",
                "content": "Máy dùng mượt mà, màn hình hiển thị rất đẹp. Giao hàng Click & Collect cực nhanh."
            },
            {
                "name": "Phạm Minh Tuấn",
                "stars": "★★★★☆",
                "content": "Hiệu năng tốt, chơi game mượt. Pin trâu dùng cả ngày chưa hết. Hơi nặng tay tí."
            }
        ],
        "related": [
            121,
            122,
            123
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Shared elements
    const cartCountBadge = document.querySelector(".cart-count");
    
    // Helper to update cart badge count based on actual items
    function updateCartBadge() {
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountBadge) cartCountBadge.textContent = totalCount;
        localStorage.setItem("cartCount", totalCount); // backward compatibility
    }

    function addToCart(productId, qty = 1) {
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existing = cartItems.find(item => item.id === productId);
        if (existing) {
            existing.quantity += qty;
        } else {
            cartItems.push({ id: productId, quantity: qty });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartBadge();
    }

    updateCartBadge();

    // -------------------------------------------------------------
    // HOMEPAGE LOGIC (index.html)
    // -------------------------------------------------------------
    const slides = document.querySelectorAll(".carousel-item");
    if (slides.length > 0) {
        // Carousel Banner Auto Scroll
        const dots = document.querySelectorAll(".dot");
        let currentSlide = 0;
        const slideInterval = 4000;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            dots.forEach(dot => dot.classList.remove("active"));
            
            slides[index].classList.add("active");
            dots[index].classList.add("active");
            currentSlide = index;
        }

        function nextSlide() {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        let intervalId = setInterval(nextSlide, slideInterval);

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                clearInterval(intervalId);
                showSlide(index);
                intervalId = setInterval(nextSlide, slideInterval);
            });
        });
    }

    // HOMEPAGE MULTI-CRITERIA FILTERS
    const homepageGrid = document.getElementById("homepage-product-grid");
    if (homepageGrid) {
        // Unified Filter State
        const filterState = {
            brand: [],
            priceRange: "all",
            priceMax: 65000000,
            type: [],
            needs: [],
            ram: [],
            resolution: [],
            refreshRate: [],
            storage: [],
            charging: [],
            specialFeatures: []
        };

        let activeCategory = "all";

        // DOM Elements
        const modalOverlay = document.getElementById("filterModalOverlay");
        const btnOpenAll = document.getElementById("btnOpenAllFilters");
        const btnCloseModal = document.getElementById("btnCloseModal");
        const btnClearModal = document.getElementById("btnClearModal");
        const btnApplyModal = document.getElementById("btnApplyModal");

        const modalSlider = document.getElementById("modalPriceRangeSlider");
        const modalSliderVal = document.getElementById("modal-price-slider-val");

        // --- Dropdown Toggle Behaviors ---
        const dropdowns = document.querySelectorAll(".quick-filter-dropdown");
        dropdowns.forEach(dd => {
            const toggleBtn = dd.querySelector(".quick-filter-btn");
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isOpen = dd.classList.contains("open");
                // Close other dropdowns
                dropdowns.forEach(other => other.classList.remove("open"));
                if (!isOpen) {
                    dd.classList.add("open");
                }
            });
        });

        document.addEventListener("click", () => {
            dropdowns.forEach(dd => dd.classList.remove("open"));
        });

        document.querySelectorAll(".quick-dropdown-menu").forEach(menu => {
            menu.addEventListener("click", (e) => e.stopPropagation());
        });

        // --- Open / Close Modal ---
        if (btnOpenAll) {
            btnOpenAll.addEventListener("click", () => {
                modalOverlay.classList.add("open");
                document.body.classList.add("modal-open");
                syncUIFromState();
                updateModalFooterCount();
            });
        }

        const closeModal = () => {
            modalOverlay.classList.remove("open");
            document.body.classList.remove("modal-open");
        };

        if (btnCloseModal) btnCloseModal.addEventListener("click", closeModal);
        if (modalOverlay) {
            modalOverlay.addEventListener("click", (e) => {
                if (e.target === modalOverlay) closeModal();
            });
        }

        // --- Category Tabs (Flagship / Midrange / Gaming) ---
        const tabBtns = document.querySelectorAll(".tab-btn");
        tabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                tabBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                activeCategory = btn.getAttribute("data-filter");
                filterAndRender();
            });
        });

        // --- Quick Filters Inputs Listeners ---
        // Quick Brand checkboxes
        document.querySelectorAll('.quick-dropdown-options[data-filter-type="brand"] input').forEach(input => {
            input.addEventListener("change", () => {
                if (input.checked) {
                    if (!filterState.brand.includes(input.value)) filterState.brand.push(input.value);
                } else {
                    filterState.brand = filterState.brand.filter(val => val !== input.value);
                }
                syncUIFromState();
                filterAndRender();
            });
        });

        // Quick Price radios
        document.querySelectorAll('.quick-dropdown-options[data-filter-type="priceRange"] input').forEach(input => {
            input.addEventListener("change", () => {
                if (input.checked) {
                    filterState.priceRange = input.value;
                    syncUIFromState();
                    filterAndRender();
                }
            });
        });

        // Quick Needs checkboxes
        document.querySelectorAll('.quick-dropdown-options[data-filter-type="needs"] input').forEach(input => {
            input.addEventListener("change", () => {
                if (input.checked) {
                    if (!filterState.needs.includes(input.value)) filterState.needs.push(input.value);
                } else {
                    filterState.needs = filterState.needs.filter(val => val !== input.value);
                }
                syncUIFromState();
                filterAndRender();
            });
        });

        // --- Modal Chips Interactions ---
        const chips = document.querySelectorAll(".filter-chip");
        chips.forEach(chip => {
            chip.addEventListener("click", () => {
                const container = chip.closest(".chip-container");
                const filterType = container.getAttribute("data-filter-type");
                const value = chip.getAttribute("data-value");
                const isSingleSelect = container.classList.contains("single-select");

                if (isSingleSelect) {
                    filterState[filterType] = value;
                } else {
                    const index = filterState[filterType].indexOf(value);
                    if (index > -1) {
                        filterState[filterType].splice(index, 1);
                    } else {
                        filterState[filterType].push(value);
                    }
                }
                syncUIFromState();
                updateModalFooterCount();
            });
        });

        // --- Modal Price Slider Interactions ---
        if (modalSlider) {
            modalSlider.addEventListener("input", (e) => {
                const val = parseInt(e.target.value);
                filterState.priceMax = val;
                if (val === 65000000) {
                    modalSliderVal.textContent = "65.000.000đ";
                } else {
                    modalSliderVal.textContent = val.toLocaleString("vi-VN") + "đ";
                }
                updateModalFooterCount();
            });
        }

        // --- Price Sort Dropdown ---
        const sortSelectEl = document.getElementById("sortPriceSelect");
        if (sortSelectEl) {
            sortSelectEl.addEventListener("change", () => {
                filterAndRender();
            });
        }

        // --- Modal Bottom Action Buttons ---
        if (btnClearModal) {
            btnClearModal.addEventListener("click", () => {
                // Reset State
                filterState.brand = [];
                filterState.priceRange = "all";
                filterState.priceMax = 65000000;
                filterState.type = [];
                filterState.needs = [];
                filterState.ram = [];
                filterState.resolution = [];
                filterState.refreshRate = [];
                filterState.storage = [];
                filterState.charging = [];
                filterState.specialFeatures = [];

                if (sortSelectEl) {
                    sortSelectEl.value = "default";
                }

                syncUIFromState();
                updateModalFooterCount();
                filterAndRender();
            });
        }

        if (btnApplyModal) {
            btnApplyModal.addEventListener("click", () => {
                closeModal();
                filterAndRender();
            });
        }

        // --- Sync State to both UIs ---
        function syncUIFromState() {
            // 1. Sync quick filters checkboxes/radios
            document.querySelectorAll('.quick-dropdown-options[data-filter-type="brand"] input').forEach(input => {
                input.checked = filterState.brand.includes(input.value);
            });
            document.querySelectorAll('.quick-dropdown-options[data-filter-type="priceRange"] input').forEach(input => {
                input.checked = (filterState.priceRange === input.value);
            });
            document.querySelectorAll('.quick-dropdown-options[data-filter-type="needs"] input').forEach(input => {
                input.checked = filterState.needs.includes(input.value);
            });

            // Update top bar buttons active class and label
            const brandBtn = document.querySelector("#dropdown-brand .quick-filter-btn");
            if (filterState.brand.length > 0) {
                brandBtn.classList.add("active");
                brandBtn.innerHTML = `Hãng (${filterState.brand.length}) <i class="fa-solid fa-chevron-down"></i>`;
            } else {
                brandBtn.classList.remove("active");
                brandBtn.innerHTML = `Hãng <i class="fa-solid fa-chevron-down"></i>`;
            }

            const priceBtn = document.querySelector("#dropdown-price .quick-filter-btn");
            if (filterState.priceRange !== "all") {
                priceBtn.classList.add("active");
                const labels = {
                    "under-2m": "Dưới 2tr",
                    "2m-4m": "2tr - 4tr",
                    "4m-7m": "4tr - 7tr",
                    "7m-13m": "7tr - 13tr",
                    "13m-20m": "13tr - 20tr",
                    "above-20m": "Trên 20tr"
                };
                priceBtn.innerHTML = `${labels[filterState.priceRange]} <i class="fa-solid fa-chevron-down"></i>`;
            } else {
                priceBtn.classList.remove("active");
                priceBtn.innerHTML = `Giá <i class="fa-solid fa-chevron-down"></i>`;
            }

            const needsBtn = document.querySelector("#dropdown-needs .quick-filter-btn");
            if (filterState.needs.length > 0) {
                needsBtn.classList.add("active");
                needsBtn.innerHTML = `Nhu cầu (${filterState.needs.length}) <i class="fa-solid fa-chevron-down"></i>`;
            } else {
                needsBtn.classList.remove("active");
                needsBtn.innerHTML = `Nhu cầu <i class="fa-solid fa-chevron-down"></i>`;
            }

            // 2. Sync modal chips
            const allChips = document.querySelectorAll(".filter-chip");
            allChips.forEach(chip => {
                const container = chip.closest(".chip-container");
                const filterType = container.getAttribute("data-filter-type");
                const value = chip.getAttribute("data-value");
                const isSingleSelect = container.classList.contains("single-select");

                if (isSingleSelect) {
                    if (filterState[filterType] === value) {
                        chip.classList.add("active");
                    } else {
                        chip.classList.remove("active");
                    }
                } else {
                    if (filterState[filterType].includes(value)) {
                        chip.classList.add("active");
                    } else {
                        chip.classList.remove("active");
                    }
                }
            });

            // 3. Sync modal slider
            if (modalSlider) {
                modalSlider.value = filterState.priceMax;
                if (filterState.priceMax === 65000000) {
                    modalSliderVal.textContent = "65.000.000đ";
                } else {
                    modalSliderVal.textContent = filterState.priceMax.toLocaleString("vi-VN") + "đ";
                }
            }
        }

        // --- Count matches ---
        function getFilteredCount() {
            return Object.values(PRODUCTS).filter(p => matchProduct(p)).length;
        }

        function updateModalFooterCount() {
            const count = getFilteredCount();
            if (btnApplyModal) {
                btnApplyModal.textContent = `Xem ${count} kết quả`;
            }
        }

        // --- Filter matching logic ---
        function matchProduct(p) {
            // Category tab
            if (activeCategory !== "all" && p.category !== activeCategory) {
                return false;
            }

            // Brand
            if (filterState.brand.length > 0 && !filterState.brand.includes(p.brand)) {
                return false;
            }

            // Price range categories
            if (filterState.priceRange !== "all") {
                const price = p.rawPrice;
                if (filterState.priceRange === "under-2m" && price >= 2000000) return false;
                if (filterState.priceRange === "2m-4m" && (price < 2000000 || price > 4000000)) return false;
                if (filterState.priceRange === "4m-7m" && (price < 4000000 || price > 7000000)) return false;
                if (filterState.priceRange === "7m-13m" && (price < 7000000 || price > 13000000)) return false;
                if (filterState.priceRange === "13m-20m" && (price < 13000000 || price > 20000000)) return false;
                if (filterState.priceRange === "above-20m" && price <= 20000000) return false;
            }

            // Slider max price
            if (p.rawPrice > filterState.priceMax) {
                return false;
            }

            // Phone type
            if (filterState.type.length > 0 && !filterState.type.includes(p.type)) {
                return false;
            }

            // Needs
            if (filterState.needs.length > 0) {
                const hasAllNeeds = filterState.needs.every(need => p.needs && p.needs.includes(need));
                if (!hasAllNeeds) return false;
            }

            // RAM
            if (filterState.ram.length > 0 && !filterState.ram.includes(p.ram)) {
                return false;
            }

            // Resolution
            if (filterState.resolution.length > 0 && !filterState.resolution.includes(p.resolution)) {
                return false;
            }

            // Refresh Rate
            if (filterState.refreshRate.length > 0 && !filterState.refreshRate.includes(p.refreshRate)) {
                return false;
            }

            // Storage
            if (filterState.storage.length > 0 && !filterState.storage.includes(p.storage)) {
                return false;
            }

            // Charging
            if (filterState.charging.length > 0) {
                const hasAllCharging = filterState.charging.every(c => p.charging && p.charging.includes(c));
                if (!hasAllCharging) return false;
            }

            // Special Features
            if (filterState.specialFeatures.length > 0) {
                const hasAllSpecials = filterState.specialFeatures.every(s => p.specialFeatures && p.specialFeatures.includes(s));
                if (!hasAllSpecials) return false;
            }

            return true;
        }

        // --- Render Products ---
        function filterAndRender() {
            let filtered = Object.values(PRODUCTS).filter(p => matchProduct(p));

            // Price Sorting
            if (sortSelectEl) {
                const sortVal = sortSelectEl.value;
                if (sortVal === "price-asc") {
                    filtered.sort((a, b) => a.rawPrice - b.rawPrice);
                } else if (sortVal === "price-desc") {
                    filtered.sort((a, b) => b.rawPrice - a.rawPrice);
                }
            }

            homepageGrid.innerHTML = "";
            if (filtered.length === 0) {
                homepageGrid.innerHTML = `
                    <div class="catalog-empty-state">
                        <i class="fa-regular fa-folder-open"></i>
                        <h3>Không tìm thấy sản phẩm</h3>
                        <p>Vui lòng điều chỉnh lại các tiêu chí bộ lọc để tìm được chiếc điện thoại phù hợp.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach(p => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.setAttribute("data-id", p.id);
                card.setAttribute("data-category", p.category);
                
                const mainImgHtml = p.imageFront ? `<img src="${p.imageFront}" class="product-img" style="max-height: 120px; object-fit: contain;" alt="${p.name}">` : `<svg viewBox="0 0 100 150" class="product-img" width="80"><rect x="25" y="10" width="50" height="130" rx="12" fill="#2d3748" stroke="#718096" stroke-width="2"/><rect x="27" y="12" width="46" height="126" rx="10" fill="#0f172a"/><rect x="42" y="16" width="16" height="4" rx="2" fill="#2d3748"/><circle cx="50" cy="18" r="1" fill="#4a5568"/></svg>`;

                card.innerHTML = `
                    <span class="badge-discount">${p.discount}</span>
                    <a href="detail.html?id=${p.id}" class="product-img-wrap">
                        ${mainImgHtml}
                    </a>
                    <div class="product-info">
                        <h3 class="product-name"><a href="detail.html?id=${p.id}">${p.name}</a></h3>
                        <div class="product-price-row">
                            <span class="price-current">${p.priceCurrent}</span>
                            <span class="price-old">${p.priceOld}</span>
                        </div>
                        <div class="product-rating">
                            <i class="fa-solid fa-star"></i>
                            <span class="product-rating-val">${p.rating}</span>
                            <span class="product-rating-count">(${p.reviews.length} đánh giá)</span>
                        </div>
                        <div class="product-actions">
                            <button class="btn-buy" data-id="${p.id}">Mua ngay</button>
                        </div>
                    </div>
                `;

                // Bind buy action
                card.querySelector(".btn-buy").addEventListener("click", (e) => {
                    e.preventDefault();
                    addToCart(p.id, 1);
                    const btn = e.target;
                    const originalText = btn.textContent;
                    btn.textContent = "Đã thêm ✓";
                    btn.style.backgroundColor = "var(--secondary)";
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = "";
                    }, 1000);
                });

                homepageGrid.appendChild(card);
            });
        }

        // Run on load
        filterAndRender();
    }

    // -------------------------------------------------------------
    // PRODUCT DETAIL & COMPARISON LOGIC (detail.html)
    // -------------------------------------------------------------
    const isDetailPage = window.location.pathname.includes("detail.html");
    if (isDetailPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get("id")) || 1;
        const currentProduct = PRODUCTS[productId] || PRODUCTS[1];

        // Populate main details
        document.getElementById("breadcrumb-product-name").textContent = currentProduct.name;
        document.getElementById("product-name").textContent = currentProduct.name;
        document.getElementById("product-rating-val").textContent = currentProduct.rating;
        document.getElementById("product-brand").textContent = currentProduct.brand;
        document.getElementById("product-price-current").textContent = currentProduct.priceCurrent;
        document.getElementById("product-price-old").textContent = currentProduct.priceOld;
        document.getElementById("product-discount").textContent = currentProduct.discount;
        document.getElementById("product-description").textContent = currentProduct.description;

        // Specs table
        document.getElementById("spec-screen").textContent = currentProduct.specs.screen;
        document.getElementById("spec-os").textContent = currentProduct.specs.os;
        document.getElementById("spec-chip").textContent = currentProduct.specs.chip;
        document.getElementById("spec-ramrom").textContent = currentProduct.specs.ramrom;
        document.getElementById("spec-battery").textContent = currentProduct.specs.battery;

        // Build media items for gallery
        const mediaItems = [];
        if (currentProduct.imageFront) mediaItems.push({ type: 'image', url: currentProduct.imageFront, label: 'Mặt trước' });
        if (currentProduct.imageBack) mediaItems.push({ type: 'image', url: currentProduct.imageBack, label: 'Mặt sau' });
        if (currentProduct.imageDetail) mediaItems.push({ type: 'image', url: currentProduct.imageDetail, label: 'Chi tiết' });
        if (currentProduct.video) mediaItems.push({ type: 'video', url: currentProduct.video, label: 'Video intro' });

        if (mediaItems.length === 0) {
            mediaItems.push({
                type: 'svg',
                content: `<svg viewBox="0 0 100 150" class="detail-product-img" width="160"><rect x="25" y="10" width="50" height="130" rx="12" fill="#2d3748" stroke="#718096" stroke-width="2"/><rect x="27" y="12" width="46" height="126" rx="10" fill="#0f172a"/><rect x="42" y="16" width="16" height="4" rx="2" fill="#2d3748"/><circle cx="50" cy="18" r="1" fill="#4a5568"/></svg>`,
                label: 'Ảnh dựng'
            });
        }

        // Render main media container
        const mainMediaContainer = document.getElementById("product-main-media");
        function showMainMedia(item) {
            mainMediaContainer.innerHTML = "";
            if (item.type === 'image') {
                const img = document.createElement("img");
                img.src = item.url;
                img.className = "detail-product-img";
                img.alt = currentProduct.name;
                img.style.maxHeight = "280px";
                img.style.objectFit = "contain";
                mainMediaContainer.appendChild(img);
            } else if (item.type === 'video') {
                const video = document.createElement("video");
                video.src = item.url;
                video.className = "detail-product-img";
                video.controls = true;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.style.maxHeight = "280px";
                video.style.width = "100%";
                video.style.objectFit = "contain";
                mainMediaContainer.appendChild(video);
            } else if (item.type === 'svg') {
                mainMediaContainer.innerHTML = item.content;
            }
        }

        // Show the first item initially
        showMainMedia(mediaItems[0]);

        // Render Thumbnails
        const thumbnailsContainer = document.getElementById("product-thumbnails");
        thumbnailsContainer.innerHTML = "";
        mediaItems.forEach((item, idx) => {
            const thumbDiv = document.createElement("div");
            thumbDiv.className = `thumbnail ${idx === 0 ? 'active' : ''}`;
            thumbDiv.setAttribute("data-index", idx);
            
            if (item.type === 'image') {
                thumbDiv.innerHTML = `<img src="${item.url}" style="width: 40px; height: 40px; object-fit: contain;" alt="${item.label}">`;
            } else if (item.type === 'video') {
                thumbDiv.innerHTML = `<div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #fee2e2; color: #ef4444; border-radius: 4px;"><i class="fa-solid fa-play"></i></div>`;
            } else if (item.type === 'svg') {
                thumbDiv.innerHTML = `<div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #e2e8f0; color: #475569; border-radius: 4px;"><i class="fa-solid fa-mobile-screen"></i></div>`;
            }
            
            thumbnailsContainer.appendChild(thumbDiv);

            thumbDiv.addEventListener("click", () => {
                document.querySelectorAll(".thumbnail").forEach(t => t.classList.remove("active"));
                thumbDiv.classList.add("active");
                showMainMedia(item);
            });
        });

        // Reviews list
        const reviewsContainer = document.getElementById("reviews-list-container");
        reviewsContainer.innerHTML = "";
        currentProduct.reviews.forEach(rev => {
            const revDiv = document.createElement("div");
            revDiv.className = "review-item";
            revDiv.innerHTML = `
                <div class="review-meta">
                    <span class="reviewer-name">${rev.name}</span>
                    <span class="review-stars">${rev.stars}</span>
                </div>
                <p class="review-content">${rev.content}</p>
            `;
            reviewsContainer.appendChild(revDiv);
        });
        document.querySelector('[data-tab="reviews"]').textContent = `Đánh giá (${currentProduct.reviews.length})`;

        // Tabs functionality
        const detailTabBtns = document.querySelectorAll(".detail-tab-btn");
        const tabPanes = document.querySelectorAll(".tab-pane");
        detailTabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                detailTabBtns.forEach(b => b.classList.remove("active"));
                tabPanes.forEach(p => p.classList.remove("active"));

                btn.classList.add("active");
                const targetTab = btn.getAttribute("data-tab");
                document.getElementById(`tab-${targetTab}`).classList.add("active");
            });
        });

        // Buy now / Add cart events
        const detailBuyBtn = document.getElementById("btn-buy-now");
        const detailAddBtn = document.getElementById("btn-add-cart");

        if (detailBuyBtn) {
            detailBuyBtn.addEventListener("click", () => {
                addToCart(productId, 1);
                window.location.href = "checkout.html";
            });
        }

        if (detailAddBtn) {
            detailAddBtn.addEventListener("click", () => {
                addToCart(productId, 1);
                const originalText = detailAddBtn.innerHTML;
                detailAddBtn.innerHTML = "Đã thêm ✓";
                detailAddBtn.style.borderColor = "var(--secondary)";
                detailAddBtn.style.color = "var(--secondary)";
                setTimeout(() => {
                    detailAddBtn.innerHTML = originalText;
                    detailAddBtn.style.borderColor = "";
                    detailAddBtn.style.color = "";
                }, 1500);
            });
        }

        // Scroll to compare section
        const btnScrollCompare = document.getElementById("btnScrollCompare");
        if (btnScrollCompare) {
            btnScrollCompare.addEventListener("click", () => {
                document.getElementById("compare-section").scrollIntoView({ behavior: "smooth" });
            });
        }

        // Bottom Comparison Logic
        let comparedIds = []; // Stores IDs of compared products (max 3 other products)

        // Render suggest chips
        const chipsContainer = document.getElementById("related-suggestions-chips");
        function renderSuggestions() {
            chipsContainer.innerHTML = "";
            currentProduct.related.forEach(relId => {
                const relProd = PRODUCTS[relId];
                if (!relProd) return;

                const isAlreadyAdded = comparedIds.includes(relId);
                const chip = document.createElement("button");
                chip.className = "suggestion-chip";
                chip.style.opacity = isAlreadyAdded ? "0.5" : "1";
                chip.style.cursor = isAlreadyAdded ? "default" : "pointer";
                chip.innerHTML = `+ ${relProd.name}`;

                if (!isAlreadyAdded) {
                    chip.addEventListener("click", () => {
                        addComparedProduct(relId);
                    });
                }
                chipsContainer.appendChild(chip);
            });
        }

        // Add compared product
        function addComparedProduct(id) {
            if (comparedIds.includes(id)) return;
            if (comparedIds.length >= 3) {
                alert("Bạn chỉ có thể so sánh tối đa 4 sản phẩm cùng một lúc!");
                return;
            }
            comparedIds.push(id);
            renderSuggestions();
            renderCompareTable();
        }

        // Remove compared product
        function removeComparedProduct(id) {
            comparedIds = comparedIds.filter(cid => cid !== id);
            renderSuggestions();
            renderCompareTable();
        }

        // Render Compare Table
        const compareRowHeader = document.getElementById("compare-row-header");
        const compareTableBody = document.getElementById("compare-table-body");

        function renderCompareTable() {
            // Render Headers
            const currentImgHtml = currentProduct.imageFront ? `<img src="${currentProduct.imageFront}" style="width: 50px; height: 50px; object-fit: contain; margin: 0 auto 0.5rem auto; display: block;" alt="${currentProduct.name}">` : `<svg viewBox="0 0 100 150" width="50" style="margin: 0 auto 0.5rem auto;"><rect x="25" y="10" width="50" height="130" rx="12" fill="#2d3748"/><rect x="27" y="12" width="46" height="126" rx="10" fill="#0f172a"/></svg>`;

            compareRowHeader.innerHTML = `
                <th class="spec-label-col">Thông số</th>
                <th class="main-product-col" id="compare-header-current">
                    ${currentImgHtml}
                    <span class="prod-title">${currentProduct.name}</span>
                </th>
            `;

            for (let i = 0; i < 3; i++) {
                const compId = comparedIds[i];
                if (compId && PRODUCTS[compId]) {
                    const compProd = PRODUCTS[compId];
                    const compImgHtml = compProd.imageFront ? `<img src="${compProd.imageFront}" style="width: 50px; height: 50px; object-fit: contain; margin: 0 auto 0.5rem auto; display: block;" alt="${compProd.name}">` : `<svg viewBox="0 0 100 150" width="50" style="margin: 0 auto 0.5rem auto;"><rect x="25" y="10" width="50" height="130" rx="12" fill="#2d3748"/><rect x="27" y="12" width="46" height="126" rx="10" fill="#0f172a"/></svg>`;

                    const th = document.createElement("th");
                    th.className = "compare-col-header";
                    th.innerHTML = `
                        <span class="compare-remove-btn" data-id="${compId}">&times;</span>
                        ${compImgHtml}
                        <span class="prod-title">${compProd.name}</span>
                    `;
                    th.querySelector(".compare-remove-btn").addEventListener("click", () => {
                        removeComparedProduct(compId);
                    });
                    compareRowHeader.appendChild(th);
                } else {
                    const th = document.createElement("th");
                    th.className = "compare-placeholder-col";
                    th.innerHTML = `
                        <div class="placeholder-content" style="padding: 1rem 0;">
                            <i class="fa-solid fa-plus-circle" style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 0.25rem; display:block;"></i>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">Thêm máy</span>
                        </div>
                    `;
                    compareRowHeader.appendChild(th);
                }
            }

            // Render Specs Rows
            const specDefinitions = [
                { key: "priceCurrent", label: "Giá hiện tại" },
                { key: "screen", label: "Màn hình", specKey: "screen" },
                { key: "os", label: "Hệ điều hành", specKey: "os" },
                { key: "chip", label: "Chip xử lý", specKey: "chip" },
                { key: "ramrom", label: "RAM/ROM", specKey: "ramrom" },
                { key: "battery", label: "Pin & Sạc", specKey: "battery" }
            ];

            compareTableBody.innerHTML = "";

            specDefinitions.forEach(spec => {
                const tr = document.createElement("tr");
                let rowHtml = `<td class="spec-label-col">${spec.label}</td>`;

                let mainVal = spec.specKey ? currentProduct.specs[spec.specKey] : currentProduct[spec.key];
                rowHtml += `<td class="main-product-col" style="font-weight: 600;">${mainVal}</td>`;

                for (let i = 0; i < 3; i++) {
                    const compId = comparedIds[i];
                    if (compId && PRODUCTS[compId]) {
                        const compProd = PRODUCTS[compId];
                        let val = spec.specKey ? compProd.specs[spec.specKey] : compProd[spec.key];
                        rowHtml += `<td>${val}</td>`;
                    } else {
                        rowHtml += `<td class="compare-placeholder-col" style="color: #cbd5e1;">-</td>`;
                    }
                }

                tr.innerHTML = rowHtml;
                compareTableBody.appendChild(tr);
            });
        }

        // Autocomplete search logic
        const compareSearchInput = document.getElementById("compare-search-input");
        const compareDropdown = document.getElementById("compare-autocomplete-dropdown");

        compareSearchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                compareDropdown.classList.remove("active");
                return;
            }

            const matches = Object.values(PRODUCTS).filter(p => {
                return p.id !== currentProduct.id && 
                       !comparedIds.includes(p.id) &&
                       (p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
            });

            if (matches.length > 0) {
                compareDropdown.innerHTML = "";
                matches.forEach(p => {
                    const div = document.createElement("div");
                    div.className = "autocomplete-item";
                    const itemImgHtml = p.imageFront ? `<img src="${p.imageFront}" style="width: 24px; height: 24px; object-fit: contain; vertical-align: middle;" alt="${p.name}">` : `<svg viewBox="0 0 100 150" width="24" style="vertical-align: middle;"><rect x="25" y="10" width="50" height="130" rx="12" fill="#2d3748"/><rect x="27" y="12" width="46" height="126" rx="10" fill="#0f172a"/></svg>`;

                    div.innerHTML = `
                        ${itemImgHtml}
                        <div class="item-details" style="display:inline-block; vertical-align:middle; margin-left:0.5rem;">
                            <span class="item-name" style="font-weight:600; display:block;">${p.name}</span>
                            <span class="item-price" style="color:var(--accent); font-size:0.8rem;">${p.priceCurrent}</span>
                        </div>
                    `;
                    div.addEventListener("click", () => {
                        addComparedProduct(p.id);
                        compareSearchInput.value = "";
                        compareDropdown.classList.remove("active");
                    });
                    compareDropdown.appendChild(div);
                });
                compareDropdown.classList.add("active");
            } else {
                compareDropdown.innerHTML = `<div style="padding: 0.75rem 1rem; font-size: 0.85rem; color: var(--text-muted); font-style:italic;">Không tìm thấy điện thoại phù hợp</div>`;
                compareDropdown.classList.add("active");
            }
        });

        document.addEventListener("click", (e) => {
            if (compareSearchInput && !compareSearchInput.contains(e.target) && compareDropdown && !compareDropdown.contains(e.target)) {
                compareDropdown.classList.remove("active");
            }
        });

        // Initialize Comparison
        renderSuggestions();
        renderCompareTable();
    }

    // =============================================================
    // CART PAGE LOGIC (cart.html)
    // =============================================================
    const isCartPage = window.location.pathname.includes("cart.html");
    if (isCartPage) {
        const cartItemsList = document.getElementById("cart-items-list");
        const cartEmptyState = document.getElementById("cart-empty-state");
        const cartLayoutContainer = document.getElementById("cart-layout-container");
        
        const summarySubtotal = document.getElementById("summary-subtotal");
        const summaryDiscount = document.getElementById("summary-discount");
        const summaryTotal = document.getElementById("summary-total");
        
        const voucherInput = document.getElementById("voucher-input");
        const btnApplyVoucher = document.getElementById("btn-apply-voucher");
        const voucherMessage = document.getElementById("voucher-message");
        const voucherAppliedInfo = document.getElementById("voucher-applied-info");
        const appliedVoucherCode = document.getElementById("applied-voucher-code");
        
        let appliedVoucher = JSON.parse(sessionStorage.getItem("appliedVoucher")) || null;

        function formatPrice(number) {
            return number.toLocaleString('vi-VN') + 'đ';
        }

        function renderCart() {
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            
            if (cartItems.length === 0) {
                if (cartLayoutContainer) cartLayoutContainer.style.display = "none";
                if (cartEmptyState) cartEmptyState.style.display = "block";
                return;
            }
            
            if (cartLayoutContainer) cartLayoutContainer.style.display = "grid";
            if (cartEmptyState) cartEmptyState.style.display = "none";
            
            if (cartItemsList) {
                cartItemsList.innerHTML = "";
                
                cartItems.forEach(item => {
                    const prod = PRODUCTS[item.id];
                    if (!prod) return;
                    
                    const row = document.createElement("div");
                    row.className = "cart-item-row";
                    const cartImgHtml = prod.imageFront ? `<img src="${prod.imageFront}" style="width: 48px; height: 48px; object-fit: contain;" alt="${prod.name}">` : `<svg viewBox="0 0 100 150" width="48"><rect x="25" y="10" width="50" height="130" rx="12" fill="#2d3748"/><rect x="27" y="12" width="46" height="126" rx="10" fill="#0f172a"/></svg>`;

                    row.innerHTML = `
                        <div class="cart-item-info">
                            <div class="cart-item-image">
                                ${cartImgHtml}
                            </div>
                            <div class="cart-item-details">
                                <a href="detail.html?id=${prod.id}" class="cart-item-name">${prod.name}</a>
                                <button class="cart-item-remove-btn" data-id="${prod.id}"><i class="fa-solid fa-trash-can"></i> Xóa</button>
                            </div>
                        </div>
                        <div class="cart-item-price-current">${prod.priceCurrent}</div>
                        <div>
                            <div class="quantity-ctrl">
                                <button class="quantity-ctrl-btn btn-minus" data-id="${prod.id}">-</button>
                                <span class="quantity-val">${item.quantity}</span>
                                <button class="quantity-ctrl-btn btn-plus" data-id="${prod.id}">+</button>
                            </div>
                        </div>
                        <div class="cart-item-price-subtotal">${formatPrice(prod.rawPrice * item.quantity)}</div>
                    `;
                    
                    // Bind quantity changes
                    row.querySelector(".btn-minus").addEventListener("click", () => updateQty(item.id, -1));
                    row.querySelector(".btn-plus").addEventListener("click", () => updateQty(item.id, 1));
                    row.querySelector(".cart-item-remove-btn").addEventListener("click", () => removeCartItem(item.id));
                    
                    cartItemsList.appendChild(row);
                });
            }
            
            calculateTotals();
        }

        function updateQty(id, diff) {
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            const item = cartItems.find(item => item.id === id);
            if (item) {
                item.quantity += diff;
                if (item.quantity <= 0) {
                    cartItems = cartItems.filter(i => i.id !== id);
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartBadge();
            renderCart();
        }

        function removeCartItem(id) {
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            cartItems = cartItems.filter(item => item.id !== id);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartBadge();
            renderCart();
        }

        function calculateTotals() {
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            let subtotal = cartItems.reduce((sum, item) => {
                const prod = PRODUCTS[item.id];
                return sum + (prod ? prod.rawPrice * item.quantity : 0);
            }, 0);

            let discount = 0;
            if (appliedVoucher) {
                if (appliedVoucher.type === "fixed") {
                    discount = appliedVoucher.value;
                } else if (appliedVoucher.type === "percentage") {
                    discount = Math.floor(subtotal * (appliedVoucher.value / 100));
                    if (appliedVoucher.max && discount > appliedVoucher.max) {
                        discount = appliedVoucher.max;
                    }
                }
                
                if (discount > subtotal) discount = subtotal;
                
                if (voucherAppliedInfo) {
                    voucherAppliedInfo.style.display = "flex";
                    if (appliedVoucherCode) appliedVoucherCode.textContent = appliedVoucher.code;
                }
            } else {
                if (voucherAppliedInfo) voucherAppliedInfo.style.display = "none";
            }

            let total = subtotal - discount;

            if (summarySubtotal) summarySubtotal.textContent = formatPrice(subtotal);
            if (summaryDiscount) summaryDiscount.textContent = formatPrice(discount);
            if (summaryTotal) summaryTotal.textContent = formatPrice(total);
        }

        // Voucher codes list in system (mocking backend)
        const SYSTEM_VOUCHERS = {
            "GIAM50": { code: "GIAM50", type: "fixed", value: 50000, desc: "Giảm trực tiếp 50.000đ" },
            "TET2026": { code: "TET2026", type: "percentage", value: 10, max: 2000000, desc: "Giảm 10% tối đa 2.000.000đ cho năm mới 2026" },
            "NEWYEAR2026": { code: "NEWYEAR2026", type: "percentage", value: 15, max: 3000000, desc: "Giảm 15% tối đa 3.000.000đ" },
            "IPHONE17": { code: "IPHONE17", type: "fixed", value: 1000000, desc: "Giảm 1.000.000đ cho khách mua iPhone 17" },
            "SAMSUNG20": { code: "SAMSUNG20", type: "percentage", value: 20, max: 1500000, desc: "Giảm 20% tối đa 1.500.000đ cho dòng Samsung" },
            "GAMINGMAX": { code: "GAMINGMAX", type: "percentage", value: 8, max: 2500000, desc: "Giảm 8% tối đa 2.500.000đ cho gaming phone" },
            "WELCOME100": { code: "WELCOME100", type: "fixed", value: 100000, desc: "Giảm 100.000đ cho khách hàng mới" },
            "MONEYSAVER": { code: "MONEYSAVER", type: "fixed", value: 200000, desc: "Giảm 200.000đ cho đơn từ 5.000.000đ" },
            "VIPMEMBER": { code: "VIPMEMBER", type: "percentage", value: 5, max: 5000000, desc: "Giảm 5% tối đa 5.000.000đ cho VIP" },
            "FREESHIP": { code: "FREESHIP", type: "fixed", value: 30000, desc: "Giảm 30.000đ hỗ trợ chi phí nhận tại cửa hàng" }
        };

        if (btnApplyVoucher) {
            btnApplyVoucher.addEventListener("click", () => {
                const codeInput = voucherInput.value.trim().toUpperCase();
                if (!codeInput) {
                    showVoucherMsg("Vui lòng nhập mã giảm giá", "error");
                    return;
                }
                
                // Get custom vouchers from localStorage as well
                const customVouchers = JSON.parse(localStorage.getItem("adminVouchers")) || [];
                const customV = customVouchers.find(v => v.code === codeInput);
                
                const voucher = SYSTEM_VOUCHERS[codeInput] || customV;
                
                if (voucher) {
                    appliedVoucher = voucher;
                    sessionStorage.setItem("appliedVoucher", JSON.stringify(voucher));
                    showVoucherMsg(`Đã áp dụng thành công: ${voucher.desc || ("Giảm " + (voucher.type === 'fixed' ? formatPrice(voucher.value) : (voucher.value + '%')))}`, "success");
                    calculateTotals();
                } else {
                    showVoucherMsg("Mã giảm giá không chính xác hoặc đã hết hạn", "error");
                }
            });
        }

        function showVoucherMsg(text, type) {
            if (voucherMessage) {
                voucherMessage.textContent = text;
                voucherMessage.className = `voucher-msg ${type}`;
            }
        }

        if (appliedVoucher) {
            showVoucherMsg(`Đã áp dụng: ${appliedVoucher.desc || "Mã giảm giá"}`, "success");
        }

        renderCart();
    }

    // =============================================================
    // CHECKOUT PAGE LOGIC (checkout.html)
    // =============================================================
    const isCheckoutPage = window.location.pathname.includes("checkout.html");
    if (isCheckoutPage) {
        const checkoutItemsList = document.getElementById("checkout-items-list");
        const checkoutSubtotal = document.getElementById("checkout-subtotal");
        const checkoutDiscount = document.getElementById("checkout-discount");
        const checkoutTotal = document.getElementById("checkout-total");
        const checkoutDate = document.getElementById("checkout-date");
        const btnSubmitOrder = document.getElementById("btn-submit-order");
        
        const successOverlay = document.getElementById("checkout-success-overlay");
        const ticketOrderId = document.getElementById("ticket-order-id");
        const ticketName = document.getElementById("ticket-name");
        const ticketTimeDate = document.getElementById("ticket-time-date");
        const ticketTotal = document.getElementById("ticket-total");
        
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let appliedVoucher = JSON.parse(sessionStorage.getItem("appliedVoucher")) || null;

        if (cartItems.length === 0) {
            alert("Giỏ hàng của bạn đang trống! Đang quay lại trang chủ.");
            window.location.href = "index.html";
        }

        function formatPrice(number) {
            return number.toLocaleString('vi-VN') + 'đ';
        }

        // Generate Dates options (Today, Tomorrow, Day after)
        if (checkoutDate) {
            const today = new Date();
            for (let i = 0; i < 3; i++) {
                const optDate = new Date();
                optDate.setDate(today.getDate() + i);
                
                const valStr = optDate.toLocaleDateString('vi-VN');
                const labelStr = i === 0 ? `Hôm nay (${valStr})` : (i === 1 ? `Ngày mai (${valStr})` : `Ngày kia (${valStr})`);
                
                const option = document.createElement("option");
                option.value = valStr;
                option.textContent = labelStr;
                checkoutDate.appendChild(option);
            }
        }

        function renderCheckoutSummary() {
            if (checkoutItemsList) {
                checkoutItemsList.innerHTML = "";
                let subtotal = 0;
                
                cartItems.forEach(item => {
                    const prod = PRODUCTS[item.id];
                    if (!prod) return;
                    
                    subtotal += prod.rawPrice * item.quantity;
                    
                    const div = document.createElement("div");
                    div.className = "checkout-item-mini";
                    div.innerHTML = `
                        <span class="checkout-item-name">${prod.name}</span>
                        <span class="checkout-item-qty-price">${item.quantity} x ${prod.priceCurrent}</span>
                    `;
                    checkoutItemsList.appendChild(div);
                });
                
                let discount = 0;
                if (appliedVoucher) {
                    if (appliedVoucher.type === "fixed") {
                        discount = appliedVoucher.value;
                    } else if (appliedVoucher.type === "percentage") {
                        discount = Math.floor(subtotal * (appliedVoucher.value / 100));
                        if (appliedVoucher.max && discount > appliedVoucher.max) {
                            discount = appliedVoucher.max;
                        }
                    }
                    if (discount > subtotal) discount = subtotal;
                }
                
                let total = subtotal - discount;
                
                if (checkoutSubtotal) checkoutSubtotal.textContent = formatPrice(subtotal);
                if (checkoutDiscount) checkoutDiscount.textContent = formatPrice(discount);
                if (checkoutTotal) checkoutTotal.textContent = formatPrice(total);
                
                return { subtotal, discount, total };
            }
        }

        const pricing = renderCheckoutSummary();

        // Submit order
        if (btnSubmitOrder) {
            btnSubmitOrder.addEventListener("click", () => {
                const name = document.getElementById("checkout-name").value.trim();
                const phone = document.getElementById("checkout-phone").value.trim();
                const email = document.getElementById("checkout-email").value.trim();
                const dateVal = checkoutDate.value;
                const timeVal = document.getElementById("checkout-time").value;
                const noteVal = document.getElementById("checkout-note").value;
                
                if (!name || !phone || !email) {
                    alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
                    return;
                }
                
                const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
                
                const orderData = {
                    id: orderId,
                    customerName: name,
                    customerPhone: phone,
                    customerEmail: email,
                    date: dateVal,
                    time: timeVal,
                    note: noteVal,
                    items: cartItems.map(item => ({
                        id: item.id,
                        name: PRODUCTS[item.id].name,
                        price: PRODUCTS[item.id].priceCurrent,
                        rawPrice: PRODUCTS[item.id].rawPrice,
                        quantity: item.quantity
                    })),
                    subtotal: pricing.subtotal,
                    discount: pricing.discount,
                    total: pricing.total,
                    status: "Đã đặt",
                    createdAt: new Date().toLocaleString('vi-VN')
                };
                
                // Save Order
                let orders = JSON.parse(localStorage.getItem("orders")) || [];
                orders.unshift(orderData);
                localStorage.setItem("orders", JSON.stringify(orders));
                
                // Clear cart
                localStorage.setItem("cartItems", JSON.stringify([]));
                sessionStorage.removeItem("appliedVoucher");
                updateCartBadge();
                
                // Show Success Receipt ticket modal
                if (ticketOrderId) ticketOrderId.textContent = orderId;
                if (ticketName) ticketName.textContent = name;
                if (ticketTimeDate) ticketTimeDate.textContent = `${timeVal} - ${dateVal}`;
                if (ticketTotal) ticketTotal.textContent = formatPrice(pricing.total);
                
                if (successOverlay) successOverlay.style.display = "flex";
            });
        }
    }

    // =============================================================
    // ORDERS PAGE LOGIC (orders.html)
    // =============================================================
    const isOrdersPage = window.location.pathname.includes("orders.html");
    if (isOrdersPage) {
        const ordersListContainer = document.getElementById("orders-list-container");
        const ordersEmptyState = document.getElementById("orders-empty-state");
        const qrModalOverlay = document.getElementById("qr-modal-overlay");
        const btnCloseQrModal = document.getElementById("btn-close-qr-modal");
        
        const qrModalOrderCode = document.getElementById("qr-modal-order-code");
        const qrModalProdNames = document.getElementById("qr-modal-prod-names");
        const qrModalTotalAmt = document.getElementById("qr-modal-total-amt");
        const qrModalExpiry = document.getElementById("qr-modal-expiry");

        function formatPrice(number) {
            return number.toLocaleString('vi-VN') + 'đ';
        }

        function renderOrders() {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            
            if (orders.length === 0) {
                if (ordersListContainer) ordersListContainer.style.display = "none";
                if (ordersEmptyState) ordersEmptyState.style.display = "block";
                return;
            }
            
            if (ordersListContainer) ordersListContainer.style.display = "block";
            if (ordersEmptyState) ordersEmptyState.style.display = "none";
            
            if (ordersListContainer) {
                ordersListContainer.innerHTML = "";
                
                orders.forEach(order => {
                    const card = document.createElement("div");
                    card.className = "order-item-card";
                    
                    let statusClass = "status-ordered";
                    if (order.status === "Đang chuẩn bị") statusClass = "status-preparing";
                    if (order.status === "Chờ nhận hàng") statusClass = "status-ready";
                    if (order.status === "Hoàn thành") statusClass = "status-completed";
                    if (order.status === "Đã hủy") statusClass = "status-cancelled";
                    
                    let prodSummaries = order.items.map(i => `${i.name} (x${i.quantity})`).join(", ");
                    
                    card.innerHTML = `
                        <div class="order-item-header">
                            <div class="order-code-date">
                                Mã đơn: <strong>${order.id}</strong> | Đặt ngày: ${order.createdAt.split(' ')[0]}
                            </div>
                            <span class="order-status-badge ${statusClass}">${order.status}</span>
                        </div>
                        <div class="order-item-body">
                            <div class="order-prod-row"><i class="fa-solid fa-mobile-screen"></i> ${prodSummaries}</div>
                            <div><i class="fa-regular fa-user"></i> Người nhận: ${order.customerName} - ${order.customerPhone}</div>
                            <div><i class="fa-solid fa-store"></i> Địa điểm: PhoneStore Central Q.10</div>
                            <div><i class="fa-regular fa-clock"></i> Nhận lúc: ${order.time} ngày ${order.date}</div>
                        </div>
                        <div class="order-item-footer">
                            <div class="order-total-price">Thanh toán tại quầy: <strong>${formatPrice(order.total)}</strong></div>
                            <div class="order-actions-row">
                                <button class="btn-order-action btn-cancel" data-id="${order.id}" ${order.status !== "Đã đặt" ? "disabled" : ""}>Hủy đơn</button>
                                <button class="btn-order-action btn-qr" data-id="${order.id}">Mã nhận hàng QR</button>
                            </div>
                        </div>
                    `;
                    
                    // Bind cancel
                    card.querySelector(".btn-cancel").addEventListener("click", () => cancelOrder(order.id));
                    
                    // Bind QR view
                    card.querySelector(".btn-qr").addEventListener("click", () => openQrModal(order));
                    
                    ordersListContainer.appendChild(card);
                });
            }
        }

        function cancelOrder(id) {
            if (confirm(`Bạn có chắc chắn muốn hủy đơn đặt trước ${id}?`)) {
                let orders = JSON.parse(localStorage.getItem("orders")) || [];
                const order = orders.find(o => o.id === id);
                if (order) {
                    order.status = "Đã hủy";
                    localStorage.setItem("orders", JSON.stringify(orders));
                    renderOrders();
                }
            }
        }

        function openQrModal(order) {
            if (qrModalOrderCode) qrModalOrderCode.textContent = order.id;
            if (qrModalProdNames) qrModalProdNames.textContent = order.items.map(i => `${i.name} (x${i.quantity})`).join(", ");
            if (qrModalTotalAmt) qrModalTotalAmt.textContent = formatPrice(order.total);
            if (qrModalExpiry) qrModalExpiry.textContent = `${order.time} - ${order.date}`;
            
            if (qrModalOverlay) qrModalOverlay.style.display = "flex";
        }

        if (btnCloseQrModal) {
            btnCloseQrModal.addEventListener("click", () => {
                if (qrModalOverlay) qrModalOverlay.style.display = "none";
            });
        }
        
        if (qrModalOverlay) {
            qrModalOverlay.addEventListener("click", (e) => {
                if (e.target === qrModalOverlay) qrModalOverlay.style.display = "none";
            });
        }

        renderOrders();
    }

    // =============================================================
    // ADMIN DASHBOARD PAGE LOGIC (admin.html)
    // =============================================================
    const isAdminPage = window.location.pathname.includes("admin.html");
    if (isAdminPage) {
        // Tab switching
        const navBtns = document.querySelectorAll(".admin-nav-btn");
        const tabPanes = document.querySelectorAll(".admin-tab-pane");
        
        navBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                navBtns.forEach(b => b.classList.remove("active"));
                tabPanes.forEach(p => p.classList.remove("active"));
                
                btn.classList.add("active");
                const tabId = btn.getAttribute("data-tab");
                document.getElementById(`pane-${tabId}`).classList.add("active");
            });
        });

        // Dashboard Stats
        const statRevenue = document.getElementById("stat-revenue");
        const statOrdersCount = document.getElementById("stat-orders-count");
        const statProductsCount = document.getElementById("stat-products-count");

        function formatPrice(number) {
            return number.toLocaleString('vi-VN') + 'đ';
        }

        function calculateStats() {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            let completedOrders = orders.filter(o => o.status === "Hoàn thành");
            
            let revenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
            
            let customProds = JSON.parse(localStorage.getItem("adminProducts")) || [];
            let totalProducts = Object.keys(PRODUCTS).length + customProds.length;
            
            if (statRevenue) statRevenue.textContent = formatPrice(revenue);
            if (statOrdersCount) statOrdersCount.textContent = orders.length;
            if (statProductsCount) statProductsCount.textContent = totalProducts;
        }

        // --- ORDER MANAGEMENT TAB ---
        const ordersTableBody = document.getElementById("admin-orders-table-body");
        const orderFilterBtns = document.querySelectorAll("#admin-order-filters .admin-filter-btn");
        let activeOrderFilter = "all";

        orderFilterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                orderFilterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                activeOrderFilter = btn.getAttribute("data-status");
                renderAdminOrders();
            });
        });

        function renderAdminOrders() {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            
            if (activeOrderFilter !== "all") {
                orders = orders.filter(o => o.status === activeOrderFilter);
            }
            
            if (ordersTableBody) {
                ordersTableBody.innerHTML = "";
                
                if (orders.length === 0) {
                    ordersTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); font-style:italic; padding:2rem;">Không có đơn hàng nào</td></tr>`;
                    return;
                }
                
                orders.forEach(order => {
                    const tr = document.createElement("tr");
                    let itemsSummaries = order.items.map(i => `${i.name} (x${i.quantity})`).join("<br>");
                    
                    tr.innerHTML = `
                        <td><strong>${order.id}</strong></td>
                        <td>
                            <div>${order.customerName}</div>
                            <div style="font-size:0.7rem; color:var(--text-muted);">${order.customerPhone}</div>
                        </td>
                        <td>${order.time}<br>${order.date}</td>
                        <td><div style="max-width:200px; line-height:1.3;">${itemsSummaries}</div></td>
                        <td><strong>${formatPrice(order.total)}</strong></td>
                        <td>
                            <select class="admin-status-select" data-id="${order.id}">
                                <option value="Đã đặt" ${order.status === "Đã đặt" ? "selected" : ""}>Đã đặt</option>
                                <option value="Đang chuẩn bị" ${order.status === "Đang chuẩn bị" ? "selected" : ""}>Đang chuẩn bị</option>
                                <option value="Chờ nhận hàng" ${order.status === "Chờ nhận hàng" ? "selected" : ""}>Chờ nhận máy</option>
                                <option value="Hoàn thành" ${order.status === "Hoàn thành" ? "selected" : ""}>Hoàn thành</option>
                                <option value="Đã hủy" ${order.status === "Đã hủy" ? "selected" : ""}>Đã hủy</option>
                            </select>
                        </td>
                        <td>
                            <button class="admin-action-btn btn-delete" data-id="${order.id}"><i class="fa-solid fa-trash"></i> Hủy</button>
                        </td>
                    `;
                    
                    // Bind select status change
                    tr.querySelector(".admin-status-select").addEventListener("change", (e) => {
                        updateOrderStatus(order.id, e.target.value);
                    });
                    
                    // Bind delete
                    tr.querySelector(".btn-delete").addEventListener("click", () => {
                        updateOrderStatus(order.id, "Đã hủy");
                    });
                    
                    ordersTableBody.appendChild(tr);
                });
            }
        }

        function updateOrderStatus(id, newStatus) {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            const order = orders.find(o => o.id === id);
            if (order) {
                order.status = newStatus;
                localStorage.setItem("orders", JSON.stringify(orders));
                renderAdminOrders();
                calculateStats();
            }
        }

        // QR SCANNER SIMULATOR FOR PICK & PACK
        const btnAdminQrScanner = document.getElementById("btnAdminQrScanner");
        const qrScanModalOverlay = document.getElementById("qr-scan-modal-overlay");
        const btnCloseQrScannerModal = document.getElementById("btn-close-qr-scanner-modal");
        const qrScanInput = document.getElementById("qr-scan-input");
        const simScanOrderList = document.getElementById("sim-scan-order-list");
        const btnSubmitQrScan = document.getElementById("btn-submit-qr-scan");

        if (btnAdminQrScanner) {
            btnAdminQrScanner.addEventListener("click", () => {
                if (qrScanModalOverlay) qrScanModalOverlay.style.display = "flex";
                renderSimScanOrdersList();
            });
        }

        if (btnCloseQrScannerModal) {
            btnCloseQrScannerModal.addEventListener("click", () => {
                if (qrScanModalOverlay) qrScanModalOverlay.style.display = "none";
            });
        }

        function renderSimScanOrdersList() {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            let pendingOrders = orders.filter(o => o.status === "Chờ nhận hàng" || o.status === "Đã đặt");
            
            if (simScanOrderList) {
                simScanOrderList.innerHTML = "";
                
                if (pendingOrders.length === 0) {
                    simScanOrderList.innerHTML = `<div style="padding:0.75rem; text-align:center; font-size:0.75rem; color:var(--text-muted); font-style:italic;">Không có đơn hàng chờ nhận máy nào</div>`;
                    return;
                }
                
                pendingOrders.forEach(o => {
                    const div = document.createElement("div");
                    div.className = "sim-scan-item";
                    div.innerHTML = `
                        <span><strong>${o.id}</strong> - ${o.customerName}</span>
                        <span>${formatPrice(o.total)}</span>
                    `;
                    div.addEventListener("click", () => {
                        qrScanInput.value = o.id;
                    });
                    simScanOrderList.appendChild(div);
                });
            }
        }

        if (btnSubmitQrScan) {
            btnSubmitQrScan.addEventListener("click", () => {
                const code = qrScanInput.value.trim().toUpperCase();
                if (!code) {
                    alert("Vui lòng nhập hoặc chọn mã đơn hàng!");
                    return;
                }
                
                let orders = JSON.parse(localStorage.getItem("orders")) || [];
                const order = orders.find(o => o.id === code);
                
                if (order) {
                    order.status = "Hoàn thành";
                    localStorage.setItem("orders", JSON.stringify(orders));
                    alert(`[TIẾNG BÍP THÀNH CÔNG] Xác nhận đơn hàng ${code} hoàn thành! Khách hàng đã thanh toán và nhận máy.`);
                    qrScanInput.value = "";
                    if (qrScanModalOverlay) qrScanModalOverlay.style.display = "none";
                    renderAdminOrders();
                    calculateStats();
                } else {
                    alert("Không tìm thấy đơn hàng tương ứng với mã quét!");
                }
            });
        }

        // --- PRODUCT MANAGEMENT TAB ---
        const btnAdminAddProduct = document.getElementById("btnAdminAddProduct");
        const productModalOverlay = document.getElementById("product-modal-overlay");
        const btnCloseProductModal = document.getElementById("btn-close-product-modal");
        const addProductForm = document.getElementById("add-product-form");
        const productsTableBody = document.getElementById("admin-products-table-body");

        if (btnAdminAddProduct) {
            btnAdminAddProduct.addEventListener("click", () => {
                if (productModalOverlay) productModalOverlay.style.display = "flex";
            });
        }
        if (btnCloseProductModal) {
            btnCloseProductModal.addEventListener("click", () => {
                if (productModalOverlay) productModalOverlay.style.display = "none";
            });
        }

        function renderAdminProducts() {
            let customProds = JSON.parse(localStorage.getItem("adminProducts")) || [];
            
            if (productsTableBody) {
                productsTableBody.innerHTML = "";
                
                // First list static products
                Object.values(PRODUCTS).forEach(p => {
                    appendProductRow(p, false);
                });
                
                // List custom added ones
                customProds.forEach(p => {
                    appendProductRow(p, true);
                });
            }
        }

        function appendProductRow(p, isCustom) {
            const tr = document.createElement("tr");
            const adminImgHtml = p.imageFront ? `<img src="${p.imageFront}" style="width: 24px; height: 24px; object-fit: contain;" alt="${p.name}">` : (p.svgMarkup ? p.svgMarkup.replace('class="detail-product-img"', '').replace('width="160"', 'width="24"') : '<i class="fa-solid fa-mobile"></i>');

            tr.innerHTML = `
                <td>
                    <div class="admin-table-avatar">
                        ${adminImgHtml}
                    </div>
                </td>
                <td><strong>${p.name}</strong></td>
                <td>${p.brand}</td>
                <td><span class="order-status-badge status-ready">${p.category}</span></td>
                <td>${p.priceOld || formatPrice(p.rawPrice)}</td>
                <td><strong style="color:var(--accent);">${p.priceCurrent || formatPrice(p.rawPrice)}</strong></td>
                <td>10</td>
                <td>
                    <button class="admin-action-btn btn-prod-delete" data-id="${p.id}" ${!isCustom ? "disabled style='opacity:0.3; cursor:not-allowed;'" : ""}><i class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            `;
            
            if (isCustom) {
                tr.querySelector(".btn-prod-delete").addEventListener("click", () => deleteCustomProduct(p.id));
            }
            
            productsTableBody.appendChild(tr);
        }

        function deleteCustomProduct(id) {
            if (confirm("Xác nhận xóa sản phẩm này khỏi kho lưu trữ mockup?")) {
                let customProds = JSON.parse(localStorage.getItem("adminProducts")) || [];
                customProds = customProds.filter(p => p.id !== id);
                localStorage.setItem("adminProducts", JSON.stringify(customProds));
                renderAdminProducts();
                calculateStats();
            }
        }

        if (addProductForm) {
            addProductForm.addEventListener("submit", (e) => {
                e.preventDefault();
                
                const name = document.getElementById("p-name").value.trim();
                const brand = document.getElementById("p-brand").value;
                const category = document.getElementById("p-category").value;
                const priceOldVal = parseInt(document.getElementById("p-price-old").value);
                const priceCurVal = parseInt(document.getElementById("p-price-current").value);
                const chip = document.getElementById("p-chip").value.trim();
                const ram = document.getElementById("p-ram").value;
                const storage = document.getElementById("p-storage").value;
                const desc = document.getElementById("p-desc").value.trim();
                
                const newId = 100 + Math.floor(Math.random() * 900);
                
                const newProduct = {
                    id: newId,
                    name: name,
                    brand: brand,
                    rawPrice: priceCurVal,
                    priceCurrent: formatPrice(priceCurVal),
                    priceOld: formatPrice(priceOldVal),
                    discount: "Giảm " + Math.floor((priceOldVal - priceCurVal) / priceOldVal * 100) + "%",
                    rating: "5.0",
                    category: category,
                    type: brand === "Apple" ? "iOS" : "Android",
                    needs: ["gaming"],
                    ram: ram,
                    storage: storage,
                    description: desc,
                    specs: {
                        screen: "6.7 inches, AMOLED",
                        os: brand === "Apple" ? "iOS" : "Android",
                        chip: chip,
                        ramrom: `${ram} / ${storage}`,
                        battery: "5000 mAh"
                    },
                    svgMarkup: `
                        <svg viewBox="0 0 100 150" class="detail-product-img" width="160">
                            <rect x="25" y="10" width="50" height="130" rx="10" fill="#4a5568" stroke="#cbd5e1" stroke-width="2"/>
                            <rect x="27" y="12" width="46" height="126" rx="8" fill="#0f172a"/>
                        </svg>
                    `,
                    thumbnails: [
                        `<svg viewBox="0 0 100 150" width="40"><rect x="25" y="10" width="50" height="130" rx="10" fill="#4a5568"/></svg>`
                    ],
                    reviews: []
                };
                
                let customProds = JSON.parse(localStorage.getItem("adminProducts")) || [];
                customProds.push(newProduct);
                localStorage.setItem("adminProducts", JSON.stringify(customProds));
                
                alert("Thêm sản phẩm thành công!");
                addProductForm.reset();
                if (productModalOverlay) productModalOverlay.style.display = "none";
                renderAdminProducts();
                calculateStats();
            });
        }

        // --- VOUCHERS MANAGEMENT TAB ---
        const btnAdminAddVoucher = document.getElementById("btnAdminAddVoucher");
        const voucherModalOverlay = document.getElementById("voucher-modal-overlay");
        const btnCloseVoucherModal = document.getElementById("btn-close-voucher-modal");
        const addVoucherForm = document.getElementById("add-voucher-form");
        const vouchersTableBody = document.getElementById("admin-vouchers-table-body");

        if (btnAdminAddVoucher) {
            btnAdminAddVoucher.addEventListener("click", () => {
                if (voucherModalOverlay) voucherModalOverlay.style.display = "flex";
            });
        }
        if (btnCloseVoucherModal) {
            btnCloseVoucherModal.addEventListener("click", () => {
                if (voucherModalOverlay) voucherModalOverlay.style.display = "none";
            });
        }

        function renderAdminVouchers() {
            if (vouchersTableBody) {
                vouchersTableBody.innerHTML = "";
                
                // Static Vouchers
                vouchersTableBody.innerHTML += `
                    <tr>
                        <td><span class="voucher-code-badge">GIAM50</span></td>
                        <td>Giảm cố định</td>
                        <td>50.000đ</td>
                        <td>-</td>
                        <td>0đ</td>
                        <td>Không giới hạn</td>
                        <td><span class="order-status-badge status-completed">Đang chạy</span></td>
                    </tr>
                    <tr>
                        <td><span class="voucher-code-badge">TET2026</span></td>
                        <td>Giảm phần trăm</td>
                        <td>10%</td>
                        <td>2.000.000đ</td>
                        <td>0đ</td>
                        <td>Không giới hạn</td>
                        <td><span class="order-status-badge status-completed">Đang chạy</span></td>
                    </tr>
                `;
                
                // Custom Vouchers
                let customVouchers = JSON.parse(localStorage.getItem("adminVouchers")) || [];
                customVouchers.forEach(v => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td><span class="voucher-code-badge">${v.code}</span></td>
                        <td>${v.type === 'fixed' ? 'Giảm cố định' : 'Giảm phần trăm'}</td>
                        <td>${v.type === 'fixed' ? formatPrice(v.value) : (v.value + '%')}</td>
                        <td>${v.max > 0 ? formatPrice(v.max) : '-'}</td>
                        <td>${v.min > 0 ? formatPrice(v.min) : '0đ'}</td>
                        <td>${v.qty}</td>
                        <td><span class="order-status-badge status-completed">Đang chạy</span></td>
                    `;
                    vouchersTableBody.appendChild(tr);
                });
            }
        }

        if (addVoucherForm) {
            addVoucherForm.addEventListener("submit", (e) => {
                e.preventDefault();
                
                const code = document.getElementById("v-code").value.trim().toUpperCase();
                const type = document.getElementById("v-type").value;
                const value = parseInt(document.getElementById("v-value").value);
                const max = parseInt(document.getElementById("v-max").value) || 0;
                const min = parseInt(document.getElementById("v-min").value) || 0;
                const qty = parseInt(document.getElementById("v-qty").value) || 0;
                
                const newVoucher = {
                    code,
                    type,
                    value,
                    max,
                    min,
                    qty,
                    desc: type === "fixed" ? `Giảm ${formatPrice(value)}` : `Giảm ${value}% tối đa ${formatPrice(max)}`
                };
                
                let customVouchers = JSON.parse(localStorage.getItem("adminVouchers")) || [];
                customVouchers.push(newVoucher);
                localStorage.setItem("adminVouchers", JSON.stringify(customVouchers));
                
                alert("Tạo mã giảm giá thành công!");
                addVoucherForm.reset();
                if (voucherModalOverlay) voucherModalOverlay.style.display = "none";
                renderAdminVouchers();
            });
        }

        // Init Admin data
        calculateStats();
        renderAdminOrders();
        renderAdminProducts();
        renderAdminVouchers();
    }
});
