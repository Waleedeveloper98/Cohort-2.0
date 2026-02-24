const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const userModel = require("../models/user.model")
const likeModel = require("../models/like.model")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const createPostController = async (req, res) => {
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "instagram-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

const getPostController = async (req, res) => {
    const userId = req.user.id;

    const posts = await postModel.find({ user: userId })

    if (!posts) {
        return res.status(400).json({
            message: "No posts"
        })
    }

    res.status(200).json({
        message: "your posts",
        posts
    })
}

const getPostDetailsController = async (req, res) => {

    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    if (post.user.toString() !== userId) {
        return res.status(403).json({
            message: "Invalid user"
        })
    }

    res.status(200).json({
        message: "user post",
        post
    })

}

const likePostController = async (req, res) => {
    const postId = req.params.postId;
    const username = req.user.username;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(400).json({
            message: "Cannot find the post"
        })
    }

    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: username
    })
    if (isAlreadyLiked) {
        return res.status(400).json({
            message: "Post is already liked"
        })
    }

    const liked = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(201).json({
        message: "post liked successfully",
        liked
    })
}

const getFeedController = async (req, res) => {
    const posts = await postModel.find().populate("user")

    return res.status(200).json({
        message: "all posts",
        posts
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController
}