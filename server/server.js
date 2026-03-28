import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import userRouter from './routes/user.routes.js';
import resumeRouter from './routes/resume.routes.js';
import aiRouter from './routes/ai.routes.js';
import contactRouter from './routes/contact.routes.js';
import adminRouter from './routes/admin.routes.js';
import chatRouter from './routes/chat.routes.js';
import protect from './middlewares/authMiddleware.js';
import { getAISuggestions } from './controllers/userPlatformController.js';

const app = express();

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

app.use((req, res, next) => {
    console.log(`[GLOBAL LOG] ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 3000;


// Database connection
await connectDB();

app.use(express.json());
app.use(cors({
    origin: true, // Echoes the request origin
    credentials: true
}));

app.get('/', (req, res) => res.send("Server is live..."));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);
app.use('/api/chat', chatRouter);

// Debugging direct mount
app.post('/api/users/platforms/ai-analysis', protect, getAISuggestions);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})