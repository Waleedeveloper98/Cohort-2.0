import userModel from "../models/user.model.js"
import { sendEmail } from "../services/mail.service.js"

export const register = async (req, res) => {
    const { username, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            success: false,
            message: "User with this email or username already exists",
            err: "User already exists"
        })
    }

    const user = await userModel.create({
        username, email, password
    })

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
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

}