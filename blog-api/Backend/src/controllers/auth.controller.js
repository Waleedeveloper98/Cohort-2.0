const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("../middlewares/asyncHandler")
const AppError = require("../utils/appError")

const registerUser = asyncHandler(async (req, res, next) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        // const error = new Error("All fields are required")
        // error.statusCode = 400
        // return next(error)
        return next(new AppError("All fields are required", 400))
    }

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

const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !password) {
            return next(new AppError("All fields are required", 400))
        }
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
    } catch (error) {
        next(error)
    }

}

module.exports = {
    registerUser,
    loginUser
}