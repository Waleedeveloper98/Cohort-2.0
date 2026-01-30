require("dotenv").config()
const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database is connected.")
        })
}
connectToDB()

app.listen(3000, () => {
    console.log("Server is running...")
})