const fs = require('fs');
let content = fs.readFileSync('web/backend/prisma/seed.ts', 'utf8');

content = content.replace(/\/'(https:\/\/[^']+)'\//g, "'$1'");

fs.writeFileSync('web/backend/prisma/seed.ts', content);
console.log('Fixed regex in seed.ts');
