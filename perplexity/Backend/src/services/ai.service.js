import { initChatModel } from "langchain";


const model = await initChatModel(
    "google-genai:gemini-2.5-flash-lite",
    { apiKey: process.env.GEMINI_API_KEY }
);

export const generateMessages = async (prompt) => {
    const response = await model.invoke(prompt);
    console.log(response.content)
}