const mongoose = require("mongoose")

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database is connected")
        })
}

module.exports = connectToDB