const express = require("express")

const actionsRouter = require("./actions/actionsRouter")
const projectsRouter = require("./projects/projectsRouter")
const morgan = require("morgan")



const server = express()
const port = 4000

server.use(express.json())
server.use(morgan("combined"))


//connecting routers
server.use("/actions" , actionsRouter)
server.use("/projects" , projectsRouter)

server.listen(port, () => {
	console.log(`Server running on ${port}`)
})