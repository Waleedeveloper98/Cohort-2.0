const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist. Please login"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
        role: "user"
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    return res.status(201).json({
        message: "user successfully registered",
        user: {
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

const loginUser = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: username }
        ]
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }


    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    return res.status(200).json({
        message: "user successfully logged-in",
        user: {
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

}

module.exports = {
    registerUser,
    loginUser
}