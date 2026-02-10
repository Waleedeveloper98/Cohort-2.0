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
        user: {
            name: user.name,
            email: user.email
        },
        token
    })
})

authRouter.get("/get-me", async (req, res) => {
    const token = req.cookies.jwt_token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email
    })

    console.log(user)
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all the fields."
        })
    }

    if (!email.trim() || !password.trim()) {
        return res.status(400).json({
            message: "Please fill all the fields with correct data."
        })
    }

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "User not exist please register."
        })
    }

    const isPasswordMatched = user.password === hashedPassword

    if (!isPasswordMatched) {
        return res.status(400).json({
            message: "Password is invalid."
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User Logged In",
    })

})

authRouter.post("/logout", async (req, res) => {
    res.clearCookie("jwt_token")

    res.status(200).json({
        message: "User Logged Out"
    })
})

module.exports = authRouter