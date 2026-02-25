import axios from "axios";

const api = axios.create({
    baseURL: "https://cohort-2-0-1-o0le.onrender.com",
    withCredentials: true
})

export async function getFollows() {
    const response = await api.get("/api/users/follows")
    return response.data
}

export async function getFollowers() {
    const response = await api.get("/api/users/followers")
    return response.data
}

export async function getOthers() {
    const response = await api.get("/api/users/others")
    return response.data
}

export async function follow(username) {
    const response = await api.post("/api/users/follow/" + username)
    return response.data
}