import axios from "axios"

const axiosApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})


export const addToCart = async ({ productId, variantId }) => {
    const response = await axiosApiInstance.post(`/add/${productId}/${variantId}`, { quantity: 1 })
    return response.data
}

export const getCart = async () => {
    const response = await axiosApiInstance.get("/")
    return response.data
}

export const incrementQuantityInCart = async ({ productId, variantId }) => {
    const response = await axiosApiInstance.patch(`/update/quantity/increment/${productId}/${variantId}`)
    return response.data
}