const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const followRouter = express.Router()
const followController = require("../controllers/user.controller")


followRouter.post("/follow/:username", identifyUser, followController.followUserController)

followRouter.post("/unfollow/:username", identifyUser, followController.unfollowUserController)

module.exports = followRouter