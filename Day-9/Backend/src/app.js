const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")

const app = express()


app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


app.post("/api/v1/notes", async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note Created Successfully",
        note
    })
})


app.get("/api/v1/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes data",
        notes

    })

})


app.delete("/api/v1/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully",
    })
})


app.patch("/api/v1/notes/:id", async (req, res) => {
    const id = req.params.id
    const description = req.body.description
    const title = req.body.title
    await noteModel.findByIdAndUpdate(id, { title, description })

    res.status(200).json({
        message: "Note updated successfully",
    })
})

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

module.exports = app