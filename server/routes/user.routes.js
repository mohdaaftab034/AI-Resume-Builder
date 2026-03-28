import express from 'express';
import { getUserById, getUsersResumes, sendLoginOTP, verifyOTP, googleLogin } from '../controllers/user.controller.js';
import { addPlatform, getPlatforms, deletePlatform, getAISuggestions, verifyPlatform, refreshPlatform } from '../controllers/userPlatformController.js';
import protect from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log(`UserRoute hit: ${req.method} ${req.path}`);
    next();
});


userRouter.post('/send-otp', sendLoginOTP);
userRouter.post('/verify-otp', verifyOTP);
userRouter.post('/google-login', googleLogin);
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUsersResumes);
userRouter.post('/platforms/ai-analysis', protect, getAISuggestions);
userRouter.post('/platforms/add', protect, addPlatform);
userRouter.get('/platforms', protect, getPlatforms);
userRouter.delete('/platforms/:platformId', protect, deletePlatform);
userRouter.put('/platforms/verify/:platformId', protect, verifyPlatform);
userRouter.put('/platforms/refresh/:platformId', protect, refreshPlatform);

export default userRouter;