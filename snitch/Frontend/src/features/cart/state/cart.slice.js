import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload
            state.items = state.items.map(item => item.product._id === productId && item.variant === variantId ? { ...item, quantity: item.quantity + 1 } : item)
        },
        decrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            state.items = state.items.map(item => item.product._id === productId && item.variant === variantId ? { ...item, quantity: item.quantity - 1 } : item)
        }
        ,
        deleteItem: (state, action) => {
            const { productId, variantId } = action.payload;
            state.items = state.items.filter(item => item.product._id !== productId && item.variant !== variantId)
        }
    }
})

export const { setItems, incrementCartItem, deleteItem, decrementCartItem } = cartSlice.actions;
export default cartSlice.reducer