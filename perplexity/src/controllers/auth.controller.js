import { asyncHandler } from "../middlewares/asyncHandler.js"
import userModel from "../models/user.model.js"
import { sendEmail } from "../services/mail.service.js"
import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError.js"

export const register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return next(new AppError("User with this email or username already exists"), 409)
    }

    const user = await userModel.create({
        username, email, password
    })

    const verifyEmailToken = jwt.sign({
        email: user.email,
    }, process.env.JWT_SECRET)

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please click the link below to verify your email address and complete your registration:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${verifyEmailToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    return res.status(201).json({
        success: true,
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

})

export const verifyEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.query
    if (!token) {
        return next(new AppError("Token is required", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({ email: decoded.email })

    if (!user) {
        return next(new AppError("Invalid User", 401))
    }
    user.verified = true
    await user.save()

    return res.send(`
            <h1>Email Verified Successfully</h1>
            <p>Your email has been verified successfully. You can now login to your account.</p>
            <a href="http://localhost:3000/login">Go to Login</a>
        `)
})


export const login = async (req, res) => {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return next(new AppError("Invalid Credentials", 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new AppError("Invalid Credentials", 401))
    }

    if (!user.verified) {
        return next(new AppError("Please verify email first before login", 401))
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(200).json({
        success: true,
        message: "user logged-in successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })
}


export const getMe = async (req, res) => {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    return res.status(200).json({
        success: true,
        message: "user fetched successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })
}