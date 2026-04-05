import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

export const aiService = async (input) => {
  const response = await api.post("/invoke", input)
  console.log(response)
  return response.data
}