import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalPrice: null,
        currency: null
    },
    reducers: {
        setItems: (state, action) => {
            state.totalPrice = action.payload.totalPrice;
            state.currency = action.payload.currency;
            state.items = action.payload.items;
        },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            const item = state.items.find(item =>
                item.product._id === productId &&
                (item.variant?._id === variantId || item.variant === variantId)
            );
            if (item) {
                item.quantity += 1;
                state.totalPrice += item.price.amount;
            }
        },
        decrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            const item = state.items.find(item =>
                item.product._id === productId &&
                (item.variant?._id === variantId || item.variant === variantId)
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalPrice -= item.price.amount;
            }
        },
        deleteItem: (state, action) => {
            const { productId, variantId } = action.payload;
            const item = state.items.find(item =>
                item.product._id === productId &&
                (item.variant?._id === variantId || item.variant === variantId)
            );
            if (item) {
                state.totalPrice -= item.price.amount * item.quantity;
                state.items = state.items.filter(i => i !== item);
            }
        }
    }
})

export const { setItems, incrementCartItem, deleteItem, decrementCartItem } = cartSlice.actions;
export default cartSlice.reducer