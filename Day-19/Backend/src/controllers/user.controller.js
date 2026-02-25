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
    follow.status = "accept"
    await follow.save()

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

const followRequestRejectController = async (req, res) => {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username

    if (!followeeUsername) {
        return res.status(401).json({
            message: "Parameter is not required"
        })
    }
    if (!followerUsername) {
        return res.status(400).json({
            message: "User not exist"
        })
    }

    const pendingRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })
    if (!pendingRequest) {
        return res.status(400).json({
            message: "No pending follow request found",
        })
    }

    pendingRequest.status = "reject"
    await pendingRequest.save()

    res.status(200).json({
        message: "status updated to reject",
        data: pendingRequest
    })
}

const followRequestAcceptController = async (req, res) => {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username

    if (!followeeUsername) {
        return res.status(400).json({
            message: "Parameter is not correct"
        })
    }
    if (!followerUsername) {
        return res.status(400).json({
            message: "User not exist"
        })
    }

    const acceptRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })

    if (!acceptRequest) {
        return res.status(400).json({
            message: "No pending follow request found"
        })
    }

    acceptRequest.status = "accept"
    await acceptRequest.save()

    res.status(200).json({
        message: "status is updated to accept",
        data: acceptRequest
    })

}

const getFollowsController = async (req, res) => {
    const user = req.user.username
    const myFollows = await followModel.find({ follower: user })
    return res.status(200).json({
        message: "follows list",
        myFollows
    })
}

const getFollowersController = async (req, res) => {
    const user = req.user.username
    const myFollowers = await followModel.find({ followee: user })
    return res.status(200).json({
        message: "followers list",
        myFollowers
    })
}

const getOtherUsers = async (req, res) => {
    const user = req.user.username
    const follows = await followModel.find({ follower: user })
    const myFollows = follows.map(item => item.followee)

    const followers = await followModel.find({ followee: user })
    const myFollowers = followers.map(item => item.follower)

    const excludedUsers = myFollows.concat(myFollowers, user)
    const others = await userModel.find({
        username: { $nin: excludedUsers }
    })

    return res.status(200).json({
        message: "other users",
        others
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    followRequestRejectController,
    followRequestAcceptController,
    getFollowsController,
    getFollowersController,
    getOtherUsers
}