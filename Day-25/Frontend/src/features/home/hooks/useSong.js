import { getSong } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../SongContext";

export const useSong = () => {
    const { song, setSong, loading, setLoading } = useContext(SongContext)

    const handleGetSong = async ({ mood }) => {
        setLoading(true)
        try {
            const data = await getSong({ mood })
            setSong(data.song)
        } catch (error) {
            throw error
        }
        finally {
            setLoading(false)
        }

    }
    return ({
        song, loading, handleGetSong
    })
}