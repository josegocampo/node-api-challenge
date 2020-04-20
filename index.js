const express = require('express')
const server = express()

const projectsRoute = require('./routes/projectsRoute')
const actionsRoute = require('./routes/actionsRoute')


server.use(express.json())

server.use('/projects', projectsRoute)
server.use('/actions', actionsRoute)


server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
        message: "Something went wrong",
	})
})


server.get('/', (req, res)=>{
    res.json({
        message: 'Welcome!'
    })
})



const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})