import { useDispatch } from "react-redux"
import { addToCart, decrementQuantityInCart, deleteCartItem, getCart, incrementQuantityInCart } from "../service/cart.api"
import { decrementCartItem, deleteItem, incrementCartItem, setItems } from "../state/cart.slice"

export const useCart = () => {

    const dispatch = useDispatch()

    const handleAddToCart = async ({ productId, variantId }) => {
        const data = await addToCart({ productId, variantId })
        return data
    }

    const handleGetCart = async () => {
        const data = await getCart();
        dispatch(setItems(data.cart.items))
        return data.cart.items
    }

    const handleIncrementQuantityInCart = async ({ productId, variantId }) => {
        const data = await incrementQuantityInCart({ productId, variantId })
        dispatch(incrementCartItem({ productId, variantId }))
        return data
    }

    const handleDecrementQuantityInCart = async ({ productId, variantId }) => {
        const data = await decrementQuantityInCart({ productId, variantId })
        dispatch(decrementCartItem({ productId, variantId }))
        return data
    }

    const handleDeleteCartItem = async ({ productId, variantId }) => {
        const data = await deleteCartItem({ productId, variantId })
        console.log(data)
        dispatch(deleteItem({ productId, variantId }))
        await handleGetCart()
        return data
    }

    return { handleAddToCart, handleGetCart, handleIncrementQuantityInCart, handleDeleteCartItem, handleDecrementQuantityInCart }
}