const postModel = require("../models/post.model")
const userModel = require("../models/user.model")
const validateObjectId = require("../services/validateId.service")


const createBlog = async (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    const userId = req.user.id

    if (!userId) {
        return res.status(401).json({
            message: "Invalid User"
        })
    }

    const blog = await postModel.create({
        title,
        content,
        user: userId
    })

    return res.status(201).json({
        message: "blog created successfully",
        blog
    })
}

const getAllBlogs = async (req, res) => {

    const blogs = await postModel.find().populate("user", "username email")

    return res.status(200).json({
        message: "All blog posts",
        blogs
    })
}

const getSingleBlogPost = async (req, res) => {
    const postId = req.params.postId;

    if (!validateObjectId(postId)) {
        return res.status(400).json({
            message: "Invalid post id"
        })
    }

    const blog = await postModel.findById(postId).populate("user", "username email");

    if (!blog) {
        return res.status(404).json({
            message: "blog post not found"
        })
    }

    return res.status(200).json({
        message: "blog post",
        blog
    })
}

const getAllMyBlogs = async (req, res) => {
    const userId = req.user.id;

    const blogs = await postModel.find({ user: userId })

    if (blogs.length === 0) {
        return res.status(200).json({
            blogs: []
        })
    }

    return res.status(200).json({
        message: "My all blogs posts",
        blogs
    })
}

const updateBlogPost = async (req, res) => {
    const postId = req.params.postId;
    const { title, content } = req.body

    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content required"
        })
    }

    if (!validateObjectId(postId)) {
        return res.status(400).json({
            message: "Invalid post id"
        })
    }

    const blog = await postModel.findById(postId)

    if (!blog) {
        return res.status(404).json({
            message: "blog post not found"
        })
    }

    const author = req.user.id
    const postUser = blog.user.toString()

    const isAuthor = author === postUser
    if (!isAuthor) {
        return res.status(403).json({
            message: "only blog author can update his blog post"
        })
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

}

const deleteBlogPost = async (req, res) => {
    const postId = req.params.postId;

    if (!validateObjectId(postId)) {
        return res.status(400).json({
            message: "Invalid post id"
        })
    }

    const blog = await postModel.findById(postId)


    if (!blog) {
        return res.status(404).json({
            message: "blog post not found"
        })
    }

    const author = req.user.id;
    const blogUser = blog.user.toString()

    const isAuthor = author === blogUser

    if (!isAuthor) {
        return res.status(403).json({
            message: "only author can delete his blog post"
        })
    }

    await postModel.findByIdAndDelete(postId)

    return res.status(200).json({
        message: "blog post deleted successfully",
    })
}


module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlogPost,
    getAllMyBlogs,
    updateBlogPost,
    deleteBlogPost
}