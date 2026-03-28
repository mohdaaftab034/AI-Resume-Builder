import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, MinusCircle, Maximize2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! I'm the Remunefy AI Assistant. How can I help you with your career, skills, or earning opportunities today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const { token, user } = useSelector(state => state.auth);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const { data } = await api.post('/api/chat/message', { 
                messages: [...messages, userMsg].slice(-8) // Send dynamic window
            });

            setMessages(prev => [...prev, data]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg = error.response?.data?.content || "Sorry, I hit a snag. Please try again in a moment!";
            setMessages(prev => [...prev, { role: "assistant", content: errorMsg }]);
            toast.error(error.response?.data?.message || "I'm having trouble connecting.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans pointer-events-none">
            <div className="pointer-events-auto">
                {/* Floating Toggle Button */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 45 }}
                            onClick={() => setIsOpen(true)}
                            className="p-4 bg-slate-900 text-white rounded-2xl shadow-2xl hover:bg-primary-accent hover:scale-110 active:scale-95 transition-all group border-4 border-white"
                        >
                            <MessageSquare className="size-6 group-hover:hidden" />
                            <Sparkles className="size-6 hidden group-hover:block animate-pulse" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Chat Window */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.9 }}
                            className={`flex flex-col bg-white border border-slate-200 rounded-[2rem] shadow-[0_32px_96px_-16px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16 w-64' : 'h-[550px] w-[380px]'}`}
                        >
                            {/* Header */}
                            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary-accent rounded-xl">
                                        <Sparkles className="size-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black tracking-tight">Career Coach</h4>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Always Active</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                                        {isMinimized ? <Maximize2 className="size-4" /> : <MinusCircle className="size-4" />}
                                    </button>
                                    <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                                        <X className="size-5" />
                                    </button>
                                </div>
                            </div>

                            {!isMinimized && (
                                <>
                                    {/* Messages Area */}
                                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 no-scrollbar">
                                        {messages.map((msg, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={idx}
                                                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                            >
                                                <div className={`p-2 rounded-xl shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-700' : 'bg-orange-100 text-primary-accent'}`}>
                                                    {msg.role === 'user' ? <User className="size-4" /> : <Bot className="size-4" />}
                                                </div>
                                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed font-medium shadow-sm transition-all ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                                                    {msg.content}
                                                </div>
                                            </motion.div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-orange-50 text-primary-accent rounded-xl">
                                                    <Loader2 className="size-4 animate-spin" />
                                                </div>
                                                <div className="px-4 py-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none animate-pulse">
                                                    <div className="flex gap-1">
                                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full delay-75"></span>
                                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full delay-150"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input Area */}
                                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100">
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="Ask me anything..."
                                                className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-8 focus:ring-orange-500/5 focus:bg-white focus:border-primary-accent outline-none transition-all shadow-inner"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!input.trim() || isLoading}
                                                className="absolute right-2 top-2 p-2.5 bg-slate-900 text-white rounded-xl hover:bg-primary-accent active:scale-90 disabled:opacity-20 transition-all shadow-lg"
                                            >
                                                <Send className="size-4" />
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <style jsx>{`
                .text-primary-accent { color: #F95200; }
                .bg-primary-accent { background-color: #F95200; }
                .border-primary-accent { border-color: #F95200; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default AIChatbot;
