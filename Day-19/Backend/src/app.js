const express = require("express")
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const cookieParser = require("cookie-parser")
const followRouter = require("./routes/user.routes")
const cors = require("cors")
const path = require("path")


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://cohort-2-0-1-o0le.onrender.com",
    credentials: true
}))

app.use(express.static("./public"))

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", followRouter)

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

module.exports = app