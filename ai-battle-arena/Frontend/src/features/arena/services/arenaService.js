import axios from "axios"

const api = axios.create({
  baseURL: "https://ai-battle-arena-ay2y.onrender.com",
  withCredentials: true
})

export const aiService = async (input) => {
  const response = await api.post("/invoke", input)
  console.log(response)
  return response.data
}