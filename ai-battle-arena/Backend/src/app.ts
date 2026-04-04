import express from "express"
import useGraph from "../src/ai/graph.ai.js"

const app = express()

app.post("/use-graph", async (req, res) => {
    const result = await useGraph("Can human brain identify real or fake difference?")

    res.json(result)
})

export default app;