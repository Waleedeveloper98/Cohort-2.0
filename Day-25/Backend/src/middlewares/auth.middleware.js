const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")

const verifyUser = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenInBlacklist = await blacklistModel.findOne({
        token
    })

    if (isTokenInBlacklist) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }



    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = verifyUser