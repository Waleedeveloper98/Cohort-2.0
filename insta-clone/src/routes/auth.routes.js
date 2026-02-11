const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require("jsonwebtoken")


authRouter.post("/register", async (req, res) => {
    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email },
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist."
        })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        bio
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully.",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
})



module.exports = authRouter

