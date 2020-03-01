const express = require("express")

const server = express()
const port = 4000


server.get("/actions", (res, res) => {
res.send(`<h1>Welcome to the Sprint Project</h1>`) 
})
