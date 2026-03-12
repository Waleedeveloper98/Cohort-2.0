import "dotenv/config"
import app from "./src/app.js"
import connectToDB from "./src/config/database.js"
import { generateMessages } from "./src/services/ai.service.js"

const PORT = process.env.PORT || 8000

generateMessages("Give me a detailed answer: Which planet is closest to the sun?")

connectToDB()
    .catch((err) => {
        console.error("MongoDB connection failed:", err)
    })


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})