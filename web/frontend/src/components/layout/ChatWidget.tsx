'use client';

import { useState, useRef, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý ảo của PhoneStore. Tôi có thể giúp gì cho bạn?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1) // Exclude initial greeting if needed, or pass all
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi kết nối');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, hiện tại tôi không thể trả lời. Vui lòng thử lại sau!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-sky-600 text-white rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 ease-[var(--ease-out-expo)] hover:scale-110 hover:shadow-dropdown z-[var(--z-chat)] active:scale-95 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Mở chat"
      >
        <MessageCircle size={24} strokeWidth={1.8} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-modal flex flex-col overflow-hidden transition-all duration-300 ease-[var(--ease-out-expo)] origin-bottom-right z-[var(--z-chat)] border border-slate-200/60 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-sky-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center">
              <Bot size={16} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Trợ lý PhoneStore</h3>
              <p className="text-xs text-sky-100">Luôn sẵn sàng hỗ trợ</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg" aria-label="Đóng chat">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto max-h-[400px] h-[400px] bg-slate-50/50 flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-sky-600 text-white rounded-br-md' : 'bg-white text-slate-700 shadow-card border border-slate-100/80 rounded-bl-md'}`}
                dangerouslySetInnerHTML={msg.role === 'model' ? { __html: DOMPurify.sanitize(msg.text) } : undefined}
              >
                {msg.role === 'user' ? msg.text : undefined}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-card border border-slate-100/80 flex gap-1.5">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Nhập câu hỏi..."
            className="flex-1 bg-slate-100/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/15 transition-all duration-200"
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 bg-sky-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-sky-700 active:scale-95 shrink-0"
          >
            <Send size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );
}
