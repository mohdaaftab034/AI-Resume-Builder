import { genAI } from '../configs/ai.js';

const withTimeout = (promise, timeoutMs) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('AI request timeout')), timeoutMs))
    ]);
};

// POST: /api/chat/message
export const chatWithAI = async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ message: "Messages history is required" });
        }

        const sysText = `You are the official AI assistant for Remunefy. 
Remunefy is a smart platform designed to help users with career growth, skill development, and earning opportunities.

Your Role & Specialty:
- Suggest skill-based earning ideas (e.g., design, coding, content writing).
- Give beginner-friendly roadmaps.
- Provide step-by-step guidance when asked "how to start".
- Encourage consistency and learning.
- Help users understand Remunefy's feature and services.
- Answer questions about careers, skills, and earning methods.

Tailored Responses based on User Types:
1. Beginner -> Explain in very simple terms.
2. Student -> Guide with skills + internships.
3. Job seeker -> Focus on resume + interview + skills.
4. Freelancer -> Suggest platforms + portfolio tips.

Behavior:
- Be friendly, confident, and slightly conversational.
- Keep answers short, clear, and helpful. Focus on actionable advice.
- If asked "What is Remunefy?" explain clearly in 2–3 lines.
- For earning, suggest realistic options (freelancing, internships, skills).
- For skills, recommend structured learning paths.
- Never give false promises like "guaranteed income".
- Tone: Friendly startup vibe, motivational but realistic.
- Safety: If unsure, say "I recommend checking with the Remunefy team for accurate details."

Use Markdown for formatting.`;
        const lastMessage = messages[messages.length - 1].content;
        
        // Ensure strictly alternating user/model history for SDK compliance
        let history = messages.slice(0, -1).map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }));
        while (history.length > 0 && history[0].role === 'model') history.shift();

        // Level 1: Primary 2.0-flash (Experimental endpoint)
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }, { apiVersion: 'v1beta' });
            const chat = model.startChat({ 
                history, 
                systemInstruction: { parts: [{ text: sysText }] } 
            });
            const result = await withTimeout(chat.sendMessage(lastMessage), 10000);
            const response = await result.response;
            return res.status(200).json({ role: "assistant", content: response.text().trim() });
        } catch (e1) {
            console.warn("L1 Fallback triggered:", e1.message);
            
            // Level 2: 1.5-flash (Stable endpoint)
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });
                const chat = model.startChat({ history });
                const result = await withTimeout(chat.sendMessage(`${sysText}\n\nClient Question: ${lastMessage}`), 10000);
                const response = await result.response;
                return res.status(200).json({ role: "assistant", content: response.text().trim() });
            } catch (e2) {
                console.warn("L2 Fallback triggered:", e2.message);
                
                // Level 3: Legacy gemini-pro (Standard fallback)
                const model = genAI.getGenerativeModel({ model: "gemini-pro" }, { apiVersion: 'v1' });
                const chat = model.startChat({ history });
                const result = await withTimeout(chat.sendMessage(`${sysText}\n\nClient Question: ${lastMessage}`), 12000);
                const response = await result.response;
                return res.status(200).json({ role: "assistant", content: response.text().trim() });
            }
        }
    } catch (error) {
        console.error("Critical Chatbot Failure:", error.message);
        const isQuota = /429|403|quota|limit/i.test(error.message);
        res.status(error.status || 500).json({ 
            message: isQuota ? "Quota Reached" : "Technical Snag",
            role: "assistant",
            content: isQuota ? "I've hit my daily chat limit. Please try again in a bit!" : `I hit a snag: ${error.message}`
        });
    }
};
