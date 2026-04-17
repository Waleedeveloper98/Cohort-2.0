import { useDispatch } from "react-redux"
import { setSellerProducts, addProduct, setProducts, setSingleProduct, setLoading } from "../state/product.slice";
import { createProduct, getAllProducts, getSellerProducts, getSingleProduct } from "../service/product.service";

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

    const handleGetAllProducts = async () => {
        try {
            const data = await getAllProducts();
            dispatch(setProducts(data.products))
        } catch (error) {
            console.log(error?.response?.data?.message || error)
        }
    }

    const handleGetSingleProduct = async ({ id }) => {
        try {
            dispatch(setLoading(true));
            const data = await getSingleProduct({ id })
            dispatch(setSingleProduct(data.product))
            return data.product
        } catch (error) {
            console.log(error?.response?.data?.message || error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleCreateProduct, handleGetSellerProducts, handleGetAllProducts, handleGetSingleProduct }
}