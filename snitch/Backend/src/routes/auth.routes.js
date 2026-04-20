import { Router } from "express";
import { getMe, googleCallback, login, register } from "../controllers/auth.controller.js";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validator.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const authRouter = Router()

/**
 *@route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", validateRegisterUser, register)


/**
 *@route POST /api/auth/login
 * @description Login an existing user
 * @access Public
 */
authRouter.post("/login", validateLoginUser, login)


/**
 *@route GET /api/auth/getMe
 * @description Get the current logged-in user's profile
 * @access Private
 */
authRouter.get("/getMe", authValidation, getMe)


/**
 *@route GET /api/auth/google
 * @description Initiate Google OAuth flow
 * @access Public
 */
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))


/**
 *@route GET /api/auth/google/callback
 * @description Handle Google OAuth callback
 * @access Public
 */
authRouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: config.NODE_ENV === "development" ? "http://localhost:5173/login" : "/login" }), googleCallback)

export default authRouter