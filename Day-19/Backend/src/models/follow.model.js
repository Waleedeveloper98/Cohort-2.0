const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: [true, "follower is required"]
    },
    followee: {
        type: String,
        required: [true, "followee is required"]
    },
    status: {
        type: String,
        default: "pending",
        enum: ["accept", "pending", "reject"],
        required: [true, "status is required"]
    }
},
    {
        timestamps: true
    })

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel