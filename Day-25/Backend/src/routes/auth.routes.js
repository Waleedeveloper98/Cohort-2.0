const { Router } = require("express")
const authRouter = Router()
const { handleRegisterUser, handleLoginUser } = require("../controllers/auth.controller")


authRouter.post("/register", handleRegisterUser)
authRouter.post("/login", handleLoginUser)

module.exports = authRouter