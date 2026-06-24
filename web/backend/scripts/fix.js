const fs = require('fs');
let content = fs.readFileSync('web/backend/prisma/seed.ts', 'utf8');

content = content.replace(/\/'https:\\\/\\\/res\.cloudinary\.com\\\/dw9catzob\\\/image\\\/upload\\\/v1782227129\\\/phonestore\\\/products\\\/Apple\\\/iphone-15-pro-max-256gb\\\/front\.webp'\//g, "'https://res.cloudinary.com/dw9catzob/image/upload/v1782227129/phonestore/products/Apple/iphone-15-pro-max-256gb/front.webp'");
content = content.replace(/\/'https:\\\/\\\/placehold\.co\\\/600x600\\\/png\?text=PhoneStore'\//g, "'https://placehold.co/600x600/png?text=PhoneStore'");

fs.writeFileSync('web/backend/prisma/seed.ts', content);
console.log('Fixed regex in seed.ts');
