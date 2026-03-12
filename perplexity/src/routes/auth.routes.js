import { Router } from "express"
import { registerValidation } from "../validators/auth.validator.js"
import { getMe, login, register, verifyEmail } from "../controllers/auth.controller.js"
import { identifyUser } from "../middlewares/auth.middleware.js"

const authRouter = Router()

authRouter.post("/register", registerValidation, register)
authRouter.get("/verify-email", verifyEmail)
authRouter.post("/login", login)
authRouter.get("/getMe", identifyUser, getMe)

export default authRouter
