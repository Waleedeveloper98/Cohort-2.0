const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username must be unique"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select:false
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
        required: [true, "role is required"]
    }
}, { timeseries: true })

const userModel = mongoose.model("users", userSchema)

module.exports = userModel