import express from "express"

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    return res.status(200).json("Welcome to docker home page")
})

app.get("/api/users", (req, res) => {
    const data = [
        {
            "id": 1,
            "name": "Alex Rivera"
        },
        {
            "id": 2,
            "name": "Jordan Chen"
        },
        {
            "id": 3,
            "name": "Sam Taylor"
        },
        {
            "id": 4,
            "name": "Morgan Wright"
        },
    ]

    return res.json(data)
})

export default app