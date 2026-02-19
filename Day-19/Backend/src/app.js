const express = require("express")
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const cookieParser = require("cookie-parser")
const followRouter = require("./routes/user.routes")
const cors = require("cors")


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

app.use("/api/auth", authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",followRouter)

module.exports = app