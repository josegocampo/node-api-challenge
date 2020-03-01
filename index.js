const express = require("express")

const server = express()
const port = 4000


server.get("/", (res, res) => {
res.send(`<h1>Welcome to the Sprint Project</h1>`) 
})


server.get("/actions", (req, res) => {
    res.json({
        message : "welcome to the Actions API"
    })
})

