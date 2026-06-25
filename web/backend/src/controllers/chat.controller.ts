import { Request, Response } from 'express';
import { askGemini } from '../lib/gemini';
import { matchHeuristics } from '../lib/chat-heuristics';

export const chatWithBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;
    
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Nội dung tin nhắn không hợp lệ' });
      return;
    }

    // Try heuristic first for fast exact answers
    const heuristicAnswer = matchHeuristics(message);
    if (heuristicAnswer) {
      res.status(200).json({ reply: heuristicAnswer });
      return;
    }

    try {
      const reply = await askGemini(message, history || []);
      res.status(200).json({ reply });
    } catch (apiError) {
      console.warn('Gemini API Error or not configured, falling back to default:', apiError);
      res.status(200).json({ 
        reply: 'Xin lỗi, hệ thống tư vấn AI đang bảo trì. Bạn có thể liên hệ hotline hoặc tới trực tiếp cửa hàng PhoneStore tại 123 Đường 3/2, Quận 10 để được hỗ trợ nhé!'
      });
    }

  } catch (error: any) {
    res.status(500).json({ error: 'Lỗi server khi xử lý tin nhắn' });
  }
};
