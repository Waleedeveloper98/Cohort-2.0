import { config } from "../config/config.js"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

const tokenWithResponse = async (user, res, message) => {
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, config.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token)

    res.status(200).json({
        success: true,
        message,
        user: {
            fullName: user.fullName,
            email: user.email,
            contact: user.contact,
            role: user.role
        }
    })
}

export const register = async (req, res) => {
    try {
        const { fullName, email, contact, password, isSeller } = req.body
        const isUserExists = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })

        if (isUserExists) {
            return res.status(409).json({
                message: "User already exist please login"
            })
        }

        const user = await userModel.create({
            fullName,
            email,
            contact,
            password,
            role: isSeller ? "seller" : "buyer"
        })

        await tokenWithResponse(user, res, "User registered successfully")

    } catch (error) {
        console.log("ERROR ", error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const isPasswordMatched = await user.comparePassword(password)

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        await tokenWithResponse(user, res, "User logged in successfully")
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        res.status(200).json({
            success: true,
            user:{
                fullName: user.fullName,
                email: user.email,
                contact: user.contact,
                role: user.role
            }
        })
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export const googleCallback = async (req, res) => {
    console.log(req.user)
    const { id, displayName, emails, photos } = req.user

    const email = emails[0].value;

    let user = await userModel.findOne({ email })

    if (!user) {
        user = await userModel.create({
            email,
            fullName: displayName,
            password: id,
        })
    }

    res.redirect("http://localhost:5173/")
}