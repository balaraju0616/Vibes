import express from 'express';
import { sendMessage, sseController } from '../controllers/messageController';
import { upload } from '../configs/multer';
import { protect } from '../middlewares/auth';


const messageRouter = express.Router();

messageRouter.get('/userId',sseController)
messageRouter.post('/send', upload.single('image'), protect, sendMessage)
messageRouter.post('/get', protect, getChatMessages)

export default messageRouter;