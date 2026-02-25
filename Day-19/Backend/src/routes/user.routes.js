const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const followRouter = express.Router()
const followController = require("../controllers/user.controller")


followRouter.post("/follow/:username", identifyUser, followController.followUserController)

followRouter.post("/unfollow/:username", identifyUser, followController.unfollowUserController)

followRouter.post("/reject/:username", identifyUser, followController.followRequestRejectController)

followRouter.post("/accept/:username", identifyUser, followController.followRequestAcceptController)

followRouter.get("/follows", identifyUser, followController.getFollowsController)

followRouter.get("/followers", identifyUser, followController.getFollowersController)

followRouter.get("/others", identifyUser, followController.getOtherUsers)

module.exports = followRouter