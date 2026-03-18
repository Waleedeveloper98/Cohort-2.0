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

    const messages = await messageModel.find({ chat: chatId || chat._id })

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

export const getChats = async (req, res) => {
    const user = req.user

    const chats = await chatModel.find({ user: user.id })

    return res.status(200).json({
        message: "chats fetched successfully",
        chats
    })
}


export const getMessages = async (req, res) => {
    const { chatId } = req.params

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(400).json({
            message: "Not chat found"
        })
    }

    const messages = await messageModel.find({ chat: chatId })

    return res.status(200).json({
        message: "all messages fetched",
        messages
    })
}

export const deleteChat = async (req, res) => {
    const { chatId } = req.params

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })
    if (!chat) {
        return res.status(400).json({
            message: "Not chat found"
        })
    }

    await messageModel.deleteMany({
        chat: chatId
    })

    return res.status(200).json({
        message: "Chat deleted successfully"
    })
}