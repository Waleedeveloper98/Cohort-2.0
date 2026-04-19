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

export const getAllProducts = async (req, res) => {
    const products = await productModel.find()

    return res.status(200).json({
        message: "Products fetched successfully",
        products
    })
}

export const getProductDetails = async (req, res) => {
    const { id } = req.params;

    const product = await productModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    return res.status(200).json({
        message: "Product fetched successfully",
        product
    })
}


export const createProductVariant = async (req, res) => {
    const { productId } = req.params;
    const { stock, amount, currency, attributes } = req.body

    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id
    })

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }))

    const variant = {
        stock,
        price: {
            amount,
            currency,
        },
        attributes: JSON.parse(attributes) || {},
        images
    }

    product.variants.push(variant)
    await product.save()

    return res.status(201).json({
        message: "Product variant created successfully",
        variant
    })


}