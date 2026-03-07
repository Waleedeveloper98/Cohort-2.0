const asyncHandler = require("../middlewares/asyncHandler")
const postModel = require("../models/post.model")
const userModel = require("../models/user.model")
const validateObjectId = require("../services/validateId.service")
const AppError = require("../utils/appError")


const createBlog = asyncHandler(async (req, res, next) => {
    const { title, content } = req.body

    if (!title || !content) {
        return next(new AppError("All fields are required", 400))
    }
    const userId = req.user.id

    if (!userId) {
        return next(new AppError("Invalid User", 401))
    }

    const blog = await postModel.create({
        title,
        content,
        user: userId
    })

    return res.status(201).json({
        message: "blog created successfully",
        data: blog
    })
})

const getAllBlogs = asyncHandler(async (req, res, next) => {

    const blogs = await postModel.find().populate("user", "username email")

    return res.status(200).json({
        message: "All blog posts",
        data: blogs
    })
})

const getSingleBlogPost = asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;

    if (!validateObjectId(postId)) {
        return next(new AppError("Invalid post id", 400))
    }

    const blog = await postModel.findById(postId).populate("user", "username email");

    if (!blog) {
        return next(new AppError("blog post not found", 404))
    }

    return res.status(200).json({
        message: "blog post",
        data: blog
    })
})

const getAllMyBlogs = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const blogs = await postModel.find({ user: userId })

    if (blogs.length === 0) {
        return res.status(200).json({
            message: "No blogs found",
            blogs: []
        })
    }

    return res.status(200).json({
        message: "My all blogs posts",
        blogs
    })
}
)

const updateBlogPost = asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    const { title, content } = req.body

    if (!title || !content) {
        return next(new AppError("Title and content required", 400))
    }

    if (!validateObjectId(postId)) {
        return next(new AppError("Invalid post id", 400))
    }

    const blog = await postModel.findById(postId)

    if (!blog) {
        return next(new AppError("blog post not found", 404))
    }

    const author = req.user.id
    const postUser = blog.user.toString()

    const isAuthor = author === postUser
    if (!isAuthor) {
        return next(new AppError("only blog author can update his blog post", 403))
    }

    blog.title = title;
    blog.content = content;

    await blog.save()

    return res.status(200).json({
        message: "blog post updated successfully",
        blog: {
            title: blog.title,
            content: blog.content
        }
    })

})

const deleteBlogPost = asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;

    if (!validateObjectId(postId)) {
        return next(new AppError("Invalid post id", 400))
    }

    const blog = await postModel.findById(postId)


    if (!blog) {
        return next(new AppError("blog post not found", 404))
    }

    const author = req.user.id;
    const blogUser = blog.user.toString()

    const isAuthor = author === blogUser

    if (!isAuthor) {
        return next(new AppError("only author can delete his blog post", 403))
    }

    await blog.deleteOne()

    return res.status(200).json({
        message: "blog post deleted successfully",
    })
})


module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlogPost,
    getAllMyBlogs,
    updateBlogPost,
    deleteBlogPost
}