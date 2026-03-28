import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { 
    analyzeAtsCompatibility, 
    enhanceJobDescription, 
    enhanceProfessionalSummary, 
    uploadResume,
    suggestSkills,
    generateSummaryFromExperience
} from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, uploadResume);
aiRouter.post('/analyze-ats', protect, analyzeAtsCompatibility);
aiRouter.post('/suggest-skills', protect, suggestSkills);
aiRouter.post('/generate-summary', protect, generateSummaryFromExperience);

export default aiRouter;