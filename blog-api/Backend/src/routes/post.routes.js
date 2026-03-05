const { Router } = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const { createBlog, getAllBlogs, getSingleBlogPost, updateBlogPost, deleteBlogPost, getAllMyBlogs } = require("../controllers/post.controller")
const postRouter = Router()

postRouter.post("/", identifyUser, createBlog)
postRouter.get("/", identifyUser, getAllBlogs)
postRouter.get("/my-posts", identifyUser, getAllMyBlogs)
postRouter.get("/:postId", identifyUser, getSingleBlogPost)
postRouter.put("/:postId", identifyUser, updateBlogPost)
postRouter.delete("/:postId", identifyUser, deleteBlogPost)

module.exports = postRouter