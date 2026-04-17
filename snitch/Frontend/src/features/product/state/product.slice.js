import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        sellerProducts: [],
        products: [],
        singleProduct: null,
        loading: false
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload
        },
        addProduct: (state, action) => {
            state.sellerProducts.push(action.payload)
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setSellerProducts, addProduct, setProducts, setSingleProduct, setLoading } = productSlice.actions;
export default productSlice.reducer