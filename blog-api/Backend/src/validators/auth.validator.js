const { body } = require("express-validator")

const registerValidation = [
    body("username").notEmpty().withMessage("Username is required").isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),

    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
]

const loginValidation = [
    body("username").notEmpty().withMessage("Username or email is required"),
    body("password").notEmpty().withMessage("Password is required")
]

module.exports = {
    registerValidation,
    loginValidation
}