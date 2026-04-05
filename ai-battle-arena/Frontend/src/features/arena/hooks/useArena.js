import { useContext } from "react";
import { ArenaContext } from "../ArenaContext";
import { aiService } from "../services/arenaService";

export const useArena = () => {
    const { messages, setMessages, loading, setLoading } = useContext(ArenaContext)

    const handleAiService = async (input) => {
        try {
            setLoading(true)
            const data = await aiService(input)
            setMessages(data.result)
        } catch (error) {
            throw new Error(error)
        }
        finally {
            setLoading(false)
        }
    }

    return { handleAiService, messages, loading, setMessages };
};
