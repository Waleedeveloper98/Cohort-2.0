const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("This is your data.")
})

app.get("/products", (req, res) => {
    res.send("This is Products Data.")
})

app.get("/about", (req, res) => {
    res.send("This is About Page.")
})

app.listen(3000)

