import { stockOfVariant } from "../dao/stock.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCart = async (req, res) => {
    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;

    const isBaseProduct = productId === variantId;
    let product;

    if (isBaseProduct) {
        product = await productModel.findById(productId);
    } else {
        product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId
        });
    }

    if (!product) {
        return res.status(404).json({ message: "Product or variant not found" })
    }

    const stock = await stockOfVariant(productId, variantId)

    const cart = (await cartModel.findOne({ user: req.user.id })) || (await cartModel.create({ user: req.user.id }))


    const isProductInCart = cart.items.find(item => item.product._id.toString() === productId && item?.variant._id.toString() === variantId)

    if (isProductInCart) {
        const quantityInCart = cart.items.find(item => item.product._id.toString() === productId && item?.variant._id.toString() === variantId)?.quantity;
        if (quantityInCart + quantity > stock) {
            return res.status(400).json({ message: "Not enough stock available" })
        }

        await cartModel.findOneAndUpdate({
            user: req.user.id,
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

    let priceToUse = product.price;
    if (!isBaseProduct) {
        const variant = product.variants.find(v => v._id.toString() === variantId);
        if (variant && variant.price && variant.price.amount !== undefined) {
            priceToUse = variant.price;
        }
    }

    cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price: priceToUse
    })

    await cart.save();

    return res.status(200).json({ message: "Product added to cart successfully" })
}


export const getCart = async (req, res) => {
    const cart = await cartModel.findOne({ user: req.user.id }).populate("items.product")

    if (!cart) {
        await cartModel.create({ user: req.user.id })
    }

    return res.status(200).json({
        message: "Cart retrieved successfully",
        cart
    })

}

export const updateQuantityIncrement = async (req, res) => {
    const { productId, variantId } = req.params;

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({ message: "Product or variant not found" })
    }

    const cart = await cartModel.findOne({ user: req.user.id })

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" })
    }

    const stock = await stockOfVariant(productId, variantId)

    const itemQuantityInCart = cart.items.find(item => item.product._id.toString() === productId && item?.variant._id.toString() === variantId)?.quantity;

    if (itemQuantityInCart + 1 > stock) {
        return res.status(400).json({
            message: `Only ${stock} left in stock.`
        })
    }

    await cartModel.findOneAndUpdate({
        user: req.user.id,
        "items.product": productId,
        "items.variant": variantId
    }, {
        $inc: { "items.$.quantity": 1 }
    }, { new: true })

    return res.status(200).json({ message: "Cart updated successfully" })


}