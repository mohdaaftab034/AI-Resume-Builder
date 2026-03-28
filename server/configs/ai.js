import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ai = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

if (!process.env.GEMINI_API_KEY) console.error("GEMINI_API_KEY IS MISSING IN SERVER CONFIG!");

export { genAI };
export default ai;