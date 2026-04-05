import express from "express";
import useGraph from "../src/ai/graph.ai.js";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.post("/invoke", async (req, res) => {
  const { input } = req.body;
  console.log("INPUT:", input);
  if (!input || input.trim() === "") {
    return res.status(400).json({
      message: "Input is required",
      success: false,
    });
  }
  const result = await useGraph(input);

  res.status(200).json({
    message: "Graph executed successfully",
    success: true,
    result,
  });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

export default app;
