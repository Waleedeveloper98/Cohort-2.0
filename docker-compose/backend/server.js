import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import path from "path"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(express.static("public"))


app.get("/api/health", (req, res) => {
    return res.status(200).json("App is working...")
})



app.get("/api/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Alice"
        },
        {
            id: 2,
            name: "Bob"
        },
        {
            id: 3,
            name: "Charles"
        }
    ]

    return res.json(users)
})

app.get("*name", (req, res) => {
    res.sendFile("./public/index.html", { root: __dirname });
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})