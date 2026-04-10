import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export const register = async ({ fullName, email, contact, password, isSeller }) => {
    const response = await apiInstance.post("/register", { fullName, email, contact, password, isSeller })
    return response.data
}

export const login = async ({ email, password }) => {
    const response = await apiInstance.post("/login", { email, password })
    return response.data
}