import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

const systemPrompt = `Bạn là nhân viên tư vấn nhiệt tình của cửa hàng điện thoại PhoneStore.
Nguyên tắc trả lời:
1. Luôn chào hỏi thân thiện.
2. Cung cấp thông tin ngắn gọn, dễ hiểu.
3. Nếu người dùng hỏi về giao hàng, bảo hành, thanh toán, hãy trả lời chính xác theo chính sách của PhoneStore (Click & Collect, bảo hành chính hãng 12 tháng).
4. Nếu người dùng hỏi tìm sản phẩm theo hãng, hãy gợi ý đường dẫn dạng HTML link. Ví dụ: <a href="/phone?hang=Apple" class="text-blue-600 hover:underline">điện thoại Apple</a>.
5. Trả lời bằng tiếng Việt, thân thiện và lịch sự. KHÔNG DÙNG MARKDOWN, chỉ dùng HTML cơ bản như <b>, <br>, <a>.
`;

export async function askGemini(message: string, history: any[] = []) {
  if (!genAI) {
    throw new Error('Gemini API key is missing');
  }

  // Define history format correctly for Gemini
  const formattedHistory = history.map(item => ({
    role: item.role === 'user' ? 'user' : 'model',
    parts: [{ text: item.text }]
  }));

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: systemPrompt
  });

  const chat = model.startChat({
    history: formattedHistory,
  });

  const result = await chat.sendMessage(message);
  return result.response.text();
}
