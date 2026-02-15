const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const createPostController = async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token expired. Unauthorized user"
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized user"
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "instagram-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })



}

const getPostController = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "User not found"
        })
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }

    const userId = decoded.id;

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
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "User not found"
        })
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const userId = decoded.id;
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

const savePostController = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "User not found"
        })
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "User not found"
        })
    }

    const postId = req.params.postId;
    const userId = decoded.id

    const post = await postModel.findById(postId)
    const user = await userModel.findById(userId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    if (user.savedPosts.includes(postId)) {
        return res.status(400).json({
            message: "Already saved"
        })
    }

    user.savedPosts.push(postId)
    await user.save()

    res.status(200).json({
        message: "post saved"
    })

}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    savePostController
}