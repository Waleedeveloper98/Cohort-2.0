import { stockOfVariant } from "../dao/stock.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCart = async (req, res) => {
    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({ message: "Product or variant not found" })
    }

    const stock = await stockOfVariant(productId, variantId)

    const cart = (await cartModel.findOne({ user: req.user.id })) || (await cartModel.create({ user: req.user.id }))

    const isProductInCart = cart.items.find(item => item.product.toString() === productId && item?.variant.toString() === variantId)

    if (isProductInCart) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item?.variant.toString() === variantId)?.quantity;
        if (quantityInCart + quantity > stock) {
            return res.status(400).json({ message: "Not enough stock available" })
        }

        await cartModel.findOneAndUpdate({
            user: req.user._id,
            "items.product": productId,
            "items.variant": variantId
        }, {
            $inc: { "items.$.quantity": quantity }
        })

        return res.status(200).json({ message: "Cart updated successfully" })

    }

    if (quantity > stock) {
        return res.status(400).json({ message: "Not enough stock available" })
    }

    cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price: product.price
    })

    await cart.save();

    return res.status(200).json({ message: "Product added to cart successfully" })
}


export const getCart = async (req, res) => {
    const cart = await cartModel.findOne({ user: req.user.id }).populate("items.product").populate("items.variant")

    if (!cart) {
        await cartModel.create({ user: req.user.id })
    }

    return res.status(200).json({
        message: "Cart retrieved successfully",
        cart
    })

}