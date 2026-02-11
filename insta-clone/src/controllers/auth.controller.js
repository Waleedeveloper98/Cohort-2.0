const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
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
}

const loginController = async (req, res) => {
    const { username, email, password, bio, profileImage } = req.body

    const user = await userModel.findOne({
        $or: [
            {
                username: username,
            },
            {
                email: email
            }
        ]
    })

    if (!user) {
        return res.status(401).json({
            message: "User not exist"
        })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    if (user.password !== hashedPassword) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged In",
        user: {
            username: user.username,
            email: user.email,
        }
    })

}

module.exports = {
    registerController,
    loginController
}