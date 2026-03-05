const { Router } = require("express")
const { registerUser, loginUser } = require("../controllers/auth.controller")
const authRouter = Router()

// register api ==> /api/auth/register
authRouter.post("/register", registerUser)

// login api ==> /api/auth/login
authRouter.post("/login", loginUser)

module.exports = authRouter