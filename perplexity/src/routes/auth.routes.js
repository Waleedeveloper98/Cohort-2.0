import { Router } from "express"
import { registerValidation } from "../validators/auth.validator.js"
import { getMe, login, register, resendEmail, verifyEmail } from "../controllers/auth.controller.js"
import { identifyUser } from "../middlewares/auth.middleware.js"

const authRouter = Router()

authRouter.post("/register", registerValidation, register)
authRouter.get("/verify-email", verifyEmail)
authRouter.get("/resend-email", resendEmail)
authRouter.post("/login", login)
authRouter.get("/getMe", identifyUser, getMe)

export default authRouter
