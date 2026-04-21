import { useDispatch } from "react-redux"
import { addToCart } from "../service/cart.api"

export const useCart = () => {

    const dispatch = useDispatch()

    const handleAddToCart = async ({ productId, variantId }) => {
        const data = await addToCart({ productId, variantId })
        console.log(data)
        return data
    }

    return { handleAddToCart }
}