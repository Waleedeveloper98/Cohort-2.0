import axios from "axios"

const api = axios.create({
    baseURL: "https://moodify-bk3d.onrender.com",
    withCredentials: true
})

export const getSong = async ({ mood }) => {
    const response = await api.get("/api/songs?mood=" + mood)
    return response.data
}