const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "Image URL is required for creating a post"]
    },
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User id required for creating a post"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel