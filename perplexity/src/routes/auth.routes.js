import { Router } from "express"
import { registerValidation } from "../validators/auth.validator.js"
import { register } from "../controllers/auth.controller.js"

const authRouter = Router()

authRouter.post("/register", registerValidation, register)

export default authRouter
