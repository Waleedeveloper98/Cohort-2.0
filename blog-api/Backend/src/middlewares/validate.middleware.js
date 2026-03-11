const { validationResult } = require("express-validator")
const AppError = require("../utils/AppError")

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error("Validation failed", 400)
        errors.details = errors.array()
        return next(error)
    }
    next()
}

module.exports = validate