import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"

export const createProduct = async (req, res) => {
    const { title, description, amount, currency } = req.body

    const seller = req.user

    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname,
        })
    }))

    const product = await productModel.create({
        title,
        description,
        seller: seller._id,
        price: {
            amount,
            currency
        },
        images
    })

    return res.status(201).json({
        message: "Product created successfully",
        product
    })
}

export const getSellerProducts = async (req, res) => {
    const products = await productModel.find({ seller: req.user.id })

    return res.status(200).json({
        message: "Products fetched successfully",
        products
    })
}