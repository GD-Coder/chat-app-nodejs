// Base
const express = require("express")
const socketio = require("socket.io")
const path = require("path")
const http = require("http")
const hbs = require("hbs")
require("./db/mongoose")
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Routes
const UserRoutes = require("./routers/user")

app.use(express.json())
app.use(UserRoutes)

const port = process.env.PORT
let userCount = 0

// Define paths for Express config
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static serve directory
app.use(express.static(publicPath))

io.on("connection", socket => {
  socket.emit("serverMessage", "Welcome!")
  socket.broadcast.emit("serverMessage", "A new user has entered the room!")
  socket.on("sendMessage", message => {
    io.emit("broadcast", message)
  })

  socket.on("disconnect", () => {
    socket.emit("welcome", "Goodbye!")
    io.emit("serverMessage", "A user has left the room...")
  })
})

app.get("", (req, res) => {
  res.render("index", {
    title: "Chat App",
    creator: "Gerald Downey"
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}...`)
})
