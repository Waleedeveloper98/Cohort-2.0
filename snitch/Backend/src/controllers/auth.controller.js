import userModel from "../models/user.model.js"

export const register = async (req, res) => {
    try {
        const { fullName, email, contact, password } = req.body
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
            password
        })

        return res.status(201).json({
            message: "User registered successfully",
            user
        })

    } catch (error) {
        console.log("ERROR ", error)
        return res.status(500).json({
            message: error.message
        })
    }
}