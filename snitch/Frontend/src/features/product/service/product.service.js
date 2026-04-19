import axios from "axios"

const productApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})


export const createProduct = async (formData) => {
    const response = await productApiInstance.post("/", formData)
    return response.data
}

export const getSellerProducts = async () => {
    const response = await productApiInstance.get("/")
    return response.data
}

export const getAllProducts = async () => {
    const response = await productApiInstance.get("/all");
    return response.data
}

export const getSingleProduct = async ({ id }) => {
    const response = await productApiInstance.get(`/detail/${id}`)
    return response.data
}

export const addProductVariant = async ({ productId, variantData }) => {

    console.log("Variant data received in service function:", variantData);

    const formData = new FormData();
    formData.append("stock", variantData.stock);
    formData.append("amount", variantData.price);
    formData.append("attributes", JSON.stringify(variantData.attributes));
    variantData.images.forEach((image) => {
        formData.append("images", image.file);
    });

    const response = await productApiInstance.post(`/${productId}/variants`, formData)
    return response.data
}