const express = require("express")
const server = express()
server.use(express.json())

const projectsRouter = require("./routers/projectsRouter");
const actionsRouter = require("./routers/actionsRouter");

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


server.get('/', async (req, res)=>{
    res.json({
        message: "Sprsnt Challenge"
    })
})


server.listen(4001, ()=>{
    console.log( `Hi from the server!`
      );
})