const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("../middlewares/asyncHandler")
const AppError = require("../utils/AppError")


const registerUser = asyncHandler(async (req, res, next) => {

    const { username, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExist) {
        return next(new AppError("User already exist with provided email or username", 409))
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
        role: "user"
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User successfully registered",
        user: {
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
})

const loginUser = asyncHandler(async (req, res, next) => {

    const { username, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: username }
        ]
    }).select("+password")

    if (!user) {
        return next(new AppError("Invalid Credentials", 401))
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        return next(new AppError("Invalid Credentials", 401))
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User successfully logged-in",
        user: {
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

})

module.exports = {
    registerUser,
    loginUser
}