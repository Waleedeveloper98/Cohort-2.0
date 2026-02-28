const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const blacklistModel = require("../models/blacklist.model");

const handleRegisterUser = async (req, res) => {
    const { username, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist with this email or username"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token)

    return res.status(201).json({
        message: "user successfully registered",
        user: {
            username: user.username,
            email: user.email
        }
    })
}

const handleLoginUser = async (req, res) => {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email },
        ]
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Invalid credientials"
        })
    }

    const isPasswordVerified = await bcrypt.compare(password, user.password)

    if (!isPasswordVerified) {
        return res.status(401).json({
            message: "Invalid credientials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token)

    return res.status(200).json({
        message: "user successfully Logged In",
        user: {
            username: user.username,
            email: user.email
        }
    })
}

const handleGetMe = async (req, res) => {
    const userId = req.user.id;

    const user = await userModel.findById(userId)

    return res.status(200).json({
        message: "user details",
        user
    })
}

const handleLogoutUser = async (req, res) => {
    const token = req.cookies.token
    res.clearCookie("token")

    await blacklistModel.create({ token })

    return res.status(200).json({
        message: "user logout successfully"
    })
}


module.exports = {
    handleRegisterUser,
    handleLoginUser,
    handleGetMe,
    handleLogoutUser
}