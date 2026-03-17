import { AIMessage, HumanMessage, SystemMessage } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

export const generateMessages = async (messages) => {
    const response = await geminiModel.invoke(messages.map(msg => {
        if (msg.role === "user") {
            return new HumanMessage(msg.content)
        } else if (msg.role === "ai") {
            return new AIMessage(msg.content)
        }
    }))

    return response.text
}

export const generateChatTitle = async (message) => {
    const response = await mistralModel.invoke([
        new SystemMessage(`
            Your a expert in generating titles for the chat.
            Generate a 2-4 words title for the chat based on the message.
            `),
        new HumanMessage(`
            Message: ${message}
            `)
    ])

    return response.text
}