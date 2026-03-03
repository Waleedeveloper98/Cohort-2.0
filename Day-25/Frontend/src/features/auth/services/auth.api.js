import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})


export const register = async (username, email, password) => {
    const response = await api.post("/api/users/register", {
        username, email, password
    })
    return response.data
}

export const login = async ({ username, email, password }) => {
    const response = await api.post("/api/users/login", {
        username, email, password
    })
    return response.data
}


export const getMe = async () => {
    const response = await api.get("/api/users/get-me")
    return response.data
}

export const logout = async () => {
    const response = await api.get("/api/users/logout")
    return response.data
}