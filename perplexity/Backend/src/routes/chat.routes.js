import { Router } from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js";
const chatRouter = Router()

chatRouter.post("/message", identifyUser, sendMessage)
chatRouter.get("/", identifyUser, getChats)
chatRouter.get("/:chatId/messages", identifyUser, getMessages)
chatRouter.delete("/:chatId/delete", identifyUser, deleteChat)

export default chatRouter