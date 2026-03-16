import jwt from "jsonwebtoken"

export const identifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid User"
        })
    }
}