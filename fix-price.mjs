import fs from 'fs';
import path from 'path';

const files = [
  'web/frontend/src/app/cart/page.tsx',
  'web/frontend/src/app/checkout/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the calculation
  content = content.replace(/\(item\.productVariant\?\.giaBan \* item\.soLuong \|\| 0\)/g, 
    'calculateItemSubtotal(item.soLuong, item.productVariant?.giaBan || 0, item.productVariant?.giaBanGoc, !!item.productVariant?.flashSale)');

  // Also replace checkout display item total: item.soLuong \times formatCurrency(item.productVariant?.giaBan || 0)
  // Wait, the display of the subtotal in checkout needs to show the correct subtotal for the item.
  // In checkout: <span className="text-slate-500 text-xs font-semibold block">{item.soLuong} × {formatCurrency(item.productVariant?.giaBan || 0)}</span>
  // Should we change it? Yes, we should probably change it to just show the subtotal or indicate the flash sale.
  
  // Ensure calculateItemSubtotal is imported
  if (!content.includes('calculateItemSubtotal')) {
    content = content.replace(/import \{ formatCurrency \} from '@\/lib\/utils';/, 
      "import { formatCurrency, calculateItemSubtotal } from '@/lib/utils';");
  }

  // Handle cart specific UI logic for showing "1 giá Flash Sale, X giá gốc"
  if (file.includes('cart/page.tsx')) {
    const searchHtml = `<div className="col-span-1 md:col-span-2 text-right font-bold text-rose-600 tabular-nums">
                        {formatCurrency((item.productVariant?.giaBan || 0) * item.soLuong)}
                      </div>`;
    const replaceHtml = `<div className="col-span-1 md:col-span-2 text-right font-bold text-rose-600 tabular-nums flex flex-col items-end justify-center">
                        {formatCurrency(calculateItemSubtotal(
                          item.soLuong,
                          item.productVariant?.giaBan || 0,
                          item.productVariant?.giaBanGoc,
                          !!item.productVariant?.flashSale
                        ))}
                        {item.productVariant?.flashSale && item.soLuong > 1 && (
                          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap mt-1">
                            (1 giá Flash Sale, {item.soLuong - 1} giá gốc)
                          </span>
                        )}
                      </div>`;
    content = content.replace(searchHtml, replaceHtml);
  } else if (file.includes('checkout/page.tsx')) {
    const searchHtml = `<span className="text-slate-500 text-xs font-semibold block">{item.soLuong} × {formatCurrency(item.productVariant?.giaBan || 0)}</span>`;
    const replaceHtml = `<span className="text-slate-500 text-xs font-semibold block">
                        {item.soLuong} × {formatCurrency(item.productVariant?.giaBan || 0)}
                        {item.productVariant?.flashSale && item.soLuong > 1 && (
                          <span className="block text-rose-500 text-[10px] mt-0.5">
                            (1 giá Flash Sale, {item.soLuong - 1} giá gốc)
                          </span>
                        )}
                      </span>`;
    content = content.replace(searchHtml, replaceHtml);
  }

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
