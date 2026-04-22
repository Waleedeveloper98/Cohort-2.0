import { param, body, validationResult } from "express-validator";

const validator = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    next()
}


export const cartValidation = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid product ID format"),
    param("variantId")
        .isMongoId()
        .withMessage("Invalid variant ID format"),
    body("quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantity must be a positive integer"),
    validator
]

export const incrementValidation = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid product ID format"),
    param("variantId")
        .optional()
        .isMongoId()
        .withMessage("Invalid variant ID format"),
    validator
]

export const decrementValidation = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid product ID format"),
    param("variantId")
        .optional()
        .isMongoId()
        .withMessage("Invalid variant ID format"),
    validator
]