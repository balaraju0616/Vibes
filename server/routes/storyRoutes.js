import express from "express";
import { upload } from "../configs/multer";
import { addUserStory, getStories } from "../controllers/storyController.js";
import { protect } from "../middlewares/auth";


const storyRouter = express.Router();

storyRouter.post('/create', upload.single('image'), protect, addUserStory)
storyRouter.get('/get', protect, getStories)

export default storyRouter;