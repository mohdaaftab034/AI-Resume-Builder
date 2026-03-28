import express from 'express';
import { chatWithAI } from '../controllers/chatController.js';

const router = express.Router();

// Chat Endpoint
router.post('/message', chatWithAI);

export default router;
