const { Router } = require("express")
const authRouter = Router()
const { handleRegisterUser, handleLoginUser, handleGetMe, handleLogoutUser } = require("../controllers/auth.controller")
const verifyUser = require("../middlewares/auth.middleware")


authRouter.post("/register", handleRegisterUser)
authRouter.post("/login", handleLoginUser)
authRouter.get("/get-me", verifyUser, handleGetMe)
authRouter.post("/logout", verifyUser, handleLogoutUser)

module.exports = authRouter