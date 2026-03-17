import { Router } from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { sendMessage } from "../controllers/chat.controller.js";
const chatRouter = Router()

chatRouter.post("/message", identifyUser, sendMessage)

export default chatRouter