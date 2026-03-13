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
        return next(new AppError("An account with this email or username already exists.", 409))
    }

    const user = await userModel.create({
        username, email, password
    })

    const verifyEmailToken = jwt.sign({
        email: user.email,
    }, process.env.JWT_SECRET)

    const verifyEmailURL = `http://localhost:3000/api/auth/verify-email?token=${verifyEmailToken}`


    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please click the link below to verify your email address and complete your registration:</p>
                <a href=${verifyEmailURL} style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    return res.status(201).json({
        success: true,
        message: "Registration successful. Please verify your email to activate your account.",
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
        return next(new AppError("Verification token is missing.", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({ email: decoded.email })

    if (!user) {
        return next(new AppError("User associated with this token was not found.", 404))
    }


    const emailAlreadyVerifiedTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Already Verified</title>

    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        background: #f4f6fb;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      .card {
        background: #ffffff;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        text-align: center;
        max-width: 420px;
      }

      .icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      h1 {
        margin: 0;
        font-size: 24px;
        color: #111827;
      }

      p {
        margin-top: 10px;
        color: #6b7280;
        font-size: 15px;
      }

      .btn {
        display: inline-block;
        margin-top: 24px;
        padding: 12px 24px;
        background: #111827;
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        transition: 0.2s ease;
      }

      .btn:hover {
        background: #000;
      }
    </style>
    </head>

    <body>
      <div class="card">
        <div class="icon">ℹ️</div>
        <h1>Email Already Verified</h1>
        <p>Your email has already been verified. You can log in to your account.</p>

        <a href="http://localhost:3000/login" class="btn">
          Go to Login
        </a>
      </div>
    </body>
    </html>
    `;

    if (user.verified) {
        return res.send(emailAlreadyVerifiedTemplate)
    }

    user.verified = true
    await user.save()


    const emailVerifiedTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Email Verified</title>

<style>
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    background: #f4f6fb;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .card {
    background: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    text-align: center;
    max-width: 420px;
  }

  .icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  h1 {
    margin: 0;
    font-size: 24px;
    color: #111827;
  }

  p {
    margin-top: 10px;
    color: #6b7280;
    font-size: 15px;
  }

  .btn {
    display: inline-block;
    margin-top: 24px;
    padding: 12px 24px;
    background: #111827;
    color: #ffffff;
    text-decoration: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: 0.2s ease;
  }

  .btn:hover {
    background: #000;
  }
</style>
</head>

<body>
  <div class="card">
    <div class="icon">✅</div>
    <h1>Email Verified Successfully</h1>
    <p>Your account has been activated. You can now log in and start using the platform.</p>

    <a href="http://localhost:3000/login" class="btn">
      Go to Login
    </a>
  </div>
</body>
</html>
`;


    return res.send(emailVerifiedTemplate)
})


export const resendEmail = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    const user = await userModel.findOne({ email })

    if (!email) {
        return next(new AppError("Email is required", 400))
    }

    if (!user) {
        return next(new AppError("User associated with this token was not found.", 404))
    }

    if (user.verified) {
        return next(new AppError("User email already verified", 200))
    }

    const newToken = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET)
    
    const verifyEmailURL = `http://localhost:3000/api/auth/verify-email?token=${newToken}`


    await sendEmail({
        to: user.email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${user.username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please click the link below to verify your email address and complete your registration:</p>
                <a href=${verifyEmailURL} style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    res.status(200).json({
        success: true,
        message: "Verification email resent successfully"
    })

})


export const login = async (req, res) => {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return next(new AppError("Invalid username/email or password.", 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new AppError("Invalid username/email or password.", 401))
    }

    if (!user.verified) {
        return next(new AppError("Email verification required before logging in.", 403))
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(200).json({
        success: true,
        message: "Login successful.",
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
        message: "User profile retrieved successfully.",
        user: {
            username: user.username,
            email: user.email
        }
    })
}