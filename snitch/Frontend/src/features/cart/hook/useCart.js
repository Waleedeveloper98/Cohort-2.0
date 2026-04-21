import { useDispatch } from "react-redux"
import { addToCart } from "../service/cart.api"
import { addItem } from "../state/cart.slice"

export const useCart = () => {

    const dispatch = useDispatch()

    const handleAddToCart = async ({ productId, variantId }) => {
        const data = await addToCart({ productId, variantId })
        // dispatch(addItem(data.cart))
        console.log(data)
        return data
    }

    return { handleAddToCart }
}