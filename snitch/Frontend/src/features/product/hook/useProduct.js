import { useDispatch } from "react-redux"
import { setSellerProducts, addProduct } from "../state/product.slice";
import { createProduct, getSellerProducts } from "../service/product.service";

export const useProduct = () => {
    const dispatch = useDispatch();

    const handleCreateProduct = async (formData) => {
        try {
            const data = await createProduct(formData)
            dispatch(addProduct(data.product))
            return data.product
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetSellerProducts = async () => {
        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products))
            return data.products
        } catch (error) {
            console.log(error)
        }
    }

    return { handleCreateProduct, handleGetSellerProducts }
}