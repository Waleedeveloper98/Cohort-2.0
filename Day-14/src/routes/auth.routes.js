const express = require("express")
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()


authRouter.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    const isPasswordMatched = password === confirmPassword

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            message: "Please fill all the fields."
        })
    }

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        return res.status(400).json({
            message: "Please fill all the fields with correct data."
        })
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 charcters long."
        })
    }

    if (!isPasswordMatched) {
        return res.status(400).json({
            message: "Password not matched"
        })
    }

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex")


    const isEmailAlreadyExists = await userModel.findOne({ email })

    if (isEmailAlreadyExists) {
        return res.status(409).json({
            message: "Email already exists please login."
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user created",
        user,
        token
    })
})

module.exports = authRouter