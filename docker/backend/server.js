import express from "express"

const app = express()

const PORT = 3000;

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to our app"
    })
})

app.get("/data",(req,res)=>{
    const data = {
        id:1,
        title:"Title 1",
        description:"description 1"
    }
    return res.status(200).json(data)
})

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})