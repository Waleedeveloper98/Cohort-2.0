import { addMessages, addNewMessage, createNewChat, setChats, setCurrentChatId, setError, setLoading } from "../chat.slice";
import { deleteChat, getChats, getMessages, sendMessage } from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import { useDispatch, useSelector } from "react-redux"


export const useChat = () => {
    const { chats } = useSelector((state) => state.chat);

    const dispatch = useDispatch()

    const handleSendMessage = async ({ message, chatId }) => {
        dispatch(setLoading(true));

        const data = await sendMessage({ message, chatId });
        const { chat, aiMessage } = data;

        const cleanTitle = chat.title
            ?.replace(/^"+|"+$/g, "")
            ?.replace(/\*\*/g, "") || "New Chat";

        // ✅ Only create chat if it doesn't exist
        if (!chats[chat._id]) {
            dispatch(createNewChat({
                chatId: chat._id,
                title: cleanTitle,
            }));
        }

        // ✅ Add user message
        dispatch(addNewMessage({
            chatId: chat._id,
            content: message,
            role: "user"
        }));

        // ✅ Add AI message
        dispatch(addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: aiMessage.role
        }));

        // ✅ Set active chat
        dispatch(setCurrentChatId(chat._id));

        dispatch(setLoading(false));
    };
    const handleGetChats = async () => {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title || "New Chat",
                messages: [],
                lastUpdated: chat.updatedAt
            };
            return acc;
        }, {})))
        dispatch(setLoading(false))
    }

    const handleOpenChat = async (chatId) => {
        dispatch(setLoading(true));

        const data = await getMessages(chatId);

        const formattedMessages = data.messages.map(msg => ({
            content: msg.content,
            role: msg.role
        }));

        dispatch(addMessages({
            chatId,
            messages: formattedMessages
        }));

        dispatch(setCurrentChatId(chatId));

        dispatch(setLoading(false));
    };

    return ({
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    })
}