import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding reviews...');
  // Lấy ra tất cả user và sản phẩm
  const users = await prisma.user.findMany({ take: 3 });
  if (users.length === 0) {
    console.log('Không có user nào, không thể seed review');
    return;
  }
  
  const products = await prisma.product.findMany({ take: 10 });
  if (products.length === 0) {
    console.log('Không có sản phẩm nào, không thể seed review');
    return;
  }

  const reviewComments = [
    "Sản phẩm rất tuyệt vời, giao hàng nhanh, nhân viên tư vấn nhiệt tình.",
    "Máy dùng mượt mà, camera chụp ảnh rất đẹp. Mình rất ưng ý.",
    "Pin dùng hơi yếu so với quảng cáo nhưng nhìn chung cấu hình ổn trong tầm giá.",
    "Sản phẩm đóng gói cẩn thận, nguyên seal, sẽ ủng hộ shop lần sau.",
    "Thiết kế đẹp, cầm chắc tay, màn hình sắc nét. Rất đáng tiền!",
    "Mình mua tặng vợ nhân ngày kỷ niệm, vợ rất thích. Máy sang trọng.",
    "Hiệu năng chơi game rất tốt, không bị nóng máy nhiều.",
    "Màu sắc bên ngoài đẹp hơn trong ảnh. Nhân viên cửa hàng hỗ trợ cài đặt chu đáo."
  ];

  let count = 0;
  for (const product of products) {
    // Xóa các review cũ của sản phẩm này để tránh trùng lặp nếu chạy nhiều lần
    await prisma.review.deleteMany({ where: { productId: product.id } });

    // Add 2-4 reviews per product
    const numReviews = Math.floor(Math.random() * 3) + 2; 
    
    for (let i = 0; i < numReviews; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
      const comment = reviewComments[Math.floor(Math.random() * reviewComments.length)];
      
      await prisma.review.create({
        data: {
          productId: product.id,
          userId: user.id,
          rating: rating,
          comment: comment,
        }
      });
      count++;
    }
  }

  console.log(`Đã tạo thành công ${count} đánh giá mẫu!`);
  await prisma.$disconnect();
}

seed().catch(console.error);
