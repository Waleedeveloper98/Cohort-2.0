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

export const login = async (username, password) => {
    const response = await api.post("/api/users/login", {
        username, password
    })
    return response.data
}