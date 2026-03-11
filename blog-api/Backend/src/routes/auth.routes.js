const { Router } = require("express")
const { registerUser, loginUser } = require("../controllers/auth.controller")
const validate = require("../middlewares/validate.middleware")
const { registerValidation, loginValidation } = require("../validators/auth.validator")
const authRouter = Router()


// register api ==> /api/auth/register
authRouter.post("/register", registerValidation, validate, registerUser)

// login api ==> /api/auth/login
authRouter.post("/login", loginValidation, validate, loginUser)

module.exports = authRouter