import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Trash2, Maximize2, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithGemini } from '../services/geminiService';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatWidgetProps {
  config: any;
  onClose?: () => void;
}

export function ChatWidget({ config, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi there! How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithGemini([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'model', content: response || "Sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Error connecting to AI. Please check your config." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-2xl text-white selection:bg-indigo-500/30">
      {/* Header */}
      <div className="p-4 bg-slate-900/40 backdrop-blur-md flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/10">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight">{config.name || 'Chat Assistant'}</div>
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
               <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Active</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
           <button onClick={() => setMessages([{ role: 'model', content: "Hi there! How can I help you today?" }])} className="p-2 text-slate-500 hover:text-white transition-colors hover:bg-white/5 rounded-lg">
              <Trash2 size={16} />
           </button>
           {onClose && (
             <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors hover:bg-white/5 rounded-lg">
                <X size={16} />
             </button>
           )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={idx}
              className={cn(
                "flex gap-3",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 shadow-sm",
                msg.role === 'user' ? "bg-indigo-600/40 text-indigo-200" : "bg-slate-800 text-slate-400"
              )}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={cn(
                "max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-indigo-600/30 text-indigo-50 border border-indigo-500/20 rounded-tr-none" 
                  : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-sm shadow-xl shadow-black/10"
              )}>
                <div className="markdown-body prose prose-invert prose-sm overflow-hidden">
                   <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center animate-pulse border border-white/5">
                <Bot size={16} className="text-slate-500" />
             </div>
             <div className="bg-white/5 px-5 py-3 rounded-2xl border border-white/10 rounded-tl-none backdrop-blur-sm">
                <div className="flex gap-1.5">
                   <span className="w-1.5 h-1.5 bg-indigo-400/60 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-indigo-400/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                   <span className="w-1.5 h-1.5 bg-indigo-400/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900/40 backdrop-blur-md border-t border-white/5">
        <div className="relative flex items-center group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-xs text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 backdrop-blur-md transition-all shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2.5 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20 active:scale-90"
          >
            <Send size={16} className="rotate-0 group-focus-within:rotate-12 transition-transform" />
          </button>
        </div>
        <div className="mt-2.5 text-center">
           <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black">Powered by Manoj Builder</span>
        </div>
      </div>
    </div>
  );
}
