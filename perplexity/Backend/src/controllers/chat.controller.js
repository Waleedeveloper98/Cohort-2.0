import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
import { generateChatTitle, generateMessages } from "../services/ai.service.js"

export const sendMessage = async (req, res) => {
    const { message, chat: chatId } = req.body
    console.log(message)

    let title = null, chat = null

    if (!chatId) {
        title = await generateChatTitle(message)
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({ chat: chatId })
    
    const result = await generateMessages(messages)

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: "ai"
    })

    return res.json({
        chat,
        title,
        aiMessage
    })
}