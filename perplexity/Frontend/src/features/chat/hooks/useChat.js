import { addMessages, addNewMessage, createNewChat, setChats, setCurrentChatId, setError, setLoading } from "../chat.slice";
import { deleteChat, getChats, getMessages, sendMessage } from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import { useDispatch, useSelector } from "react-redux"


export const useChat = () => {
    const { chats } = useSelector((state) => state.chat);

    const dispatch = useDispatch()

    const handleSendMessage = async ({ message, chatId }) => {
        try {
            dispatch(setLoading(true));

            const data = await sendMessage({ message, chatId });

            console.log("API Response:", data);

            const { chat, aiMessage } = data;

            // ✅ Get chatId safely
            const finalChatId =
                chat?._id || aiMessage?.chat || chatId;

            if (!finalChatId) {
                console.error("No chatId found!");
                return;
            }

            const cleanTitle =
                chat?.title?.replace(/^"+|"+$/g, "")
                    ?.replace(/\*\*/g, "") || "New Chat";

            // ✅ Create chat only if not exists
            if (!chats[finalChatId]) {
                dispatch(createNewChat({
                    chatId: finalChatId,
                    title: cleanTitle,
                }));
            }

            // ✅ Add user message
            dispatch(addNewMessage({
                chatId: finalChatId,
                content: message,
                role: "user"
            }));

            // ✅ Add AI message
            dispatch(addNewMessage({
                chatId: finalChatId,
                content: aiMessage.content,
                role: aiMessage.role
            }));

            dispatch(setCurrentChatId(finalChatId));

        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
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