const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isEmailAlreadyExists = await userModel.findOne({ email })

    const hash = crypto.createHash("md5").update(password).digest("hex")

    if (isEmailAlreadyExists) {
        return res.status(409).json({
            message: "Email already exists"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: hash
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

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    const hash = crypto.createHash("md5").update(password).digest("hex")

    if (!user) {
        return res.status(404).json({
            message: "Invalid email"
        })
    }

    const isPasswordMatched = user.password === hash

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        messag: "user loggedIn",
        user
    })
})

module.exports = authRouter