const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followUserController = async (req, res) => {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExist) {
        return res.status(404).json({
            message: "Wrong username"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAlreadyFollowing) {
        return res.status(404).json({
            message: "You already following this user"
        })
    }

    const follow = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: "successfully followed user",
        follow
    })
}

const unfollowUserController = async (req, res) => {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot unfollow yourself"
        })
    }

    const isFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if (!isFollowing) {
        return res.status(400).json({
            message: "Your not following this user"
        })
    }

    await followModel.findByIdAndDelete(isFollowing._id)

    res.status(200).json({
        message: "successfully unfollowed",
        isFollowing
    })

}

module.exports = {
    followUserController,
    unfollowUserController
}