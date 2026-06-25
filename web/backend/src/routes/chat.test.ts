import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../index';
import * as geminiModule from '../lib/gemini';

// Mock gemini
vi.mock('../lib/gemini', () => ({
  askGemini: vi.fn()
}));

describe('Chat API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects requests without message', async () => {
    const res = await request(app).post('/api/chat').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns heuristic answer without calling Gemini if matched', async () => {
    const askGeminiSpy = vi.spyOn(geminiModule, 'askGemini');
    const res = await request(app).post('/api/chat').send({ message: 'địa chỉ ở đâu' });
    
    expect(res.status).toBe(200);
    expect(res.body.reply).toContain('123 Đường 3/2');
    expect(askGeminiSpy).not.toHaveBeenCalled();
  });

  it('calls Gemini if no heuristic matched', async () => {
    const askGeminiSpy = vi.spyOn(geminiModule, 'askGemini').mockResolvedValue('Chào bạn, tôi là Gemini.');
    const res = await request(app).post('/api/chat').send({ message: 'Chào bạn' });
    
    expect(res.status).toBe(200);
    expect(res.body.reply).toBe('Chào bạn, tôi là Gemini.');
    expect(askGeminiSpy).toHaveBeenCalled();
  });

  it('falls back to default error message if Gemini throws', async () => {
    const askGeminiSpy = vi.spyOn(geminiModule, 'askGemini').mockRejectedValue(new Error('API Key missing'));
    const res = await request(app).post('/api/chat').send({ message: 'Chào bạn' });
    
    expect(res.status).toBe(200);
    expect(res.body.reply).toContain('hệ thống tư vấn AI đang bảo trì');
  });
});
