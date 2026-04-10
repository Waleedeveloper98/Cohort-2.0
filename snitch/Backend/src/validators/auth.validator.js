import { body, validationResult } from "express-validator";

export const validator = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    next()
}

export const validateRegisterUser = [
    body("fullName")
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 3 })
        .withMessage("Full name must be greater than 3 characters"),
    body("email")
        .isEmail()
        .withMessage("Enter valid email format"),
    body("contact")
        .matches(/^\d{10}$/)
        .withMessage("contact must be 10 characters long"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be greater than 6 characters long"),
    body("isSeller")
        .isBoolean().withMessage("isSeller must be a boolean"),

    validator
]

export const validateLoginUser = [
    body("email")
        .isEmail()
        .withMessage("Enter valid email format"),
    body("password")
        .notEmpty()
        .withMessage("Password is required"),
    validator
]