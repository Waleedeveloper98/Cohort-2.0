import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        sellerProducts: []
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload
        },
        addProduct: (state, action) => {
            state.sellerProducts.push(action.payload)
        }
    }
})

export const { setSellerProducts, addProduct } = productSlice.actions;
export default productSlice.reducer