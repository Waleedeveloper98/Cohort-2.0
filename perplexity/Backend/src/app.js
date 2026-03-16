import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors"
import morgan from "morgan"

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"]
}))

app.use("/api/auth", authRouter)


app.use(errorHandler)

export default app