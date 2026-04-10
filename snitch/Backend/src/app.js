import express from "express"
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}))

app.get("/", (req, res) => {
    return res.status(200).json({ message: "server is running" })
})

app.use("/api/auth", authRouter)

export default app