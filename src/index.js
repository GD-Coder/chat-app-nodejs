// Base
const express = require("express")
const path = require("path")
const hbs = require("hbs")
require("./db/mongoose")
const app = express()
const socketio = require("socket.io")
const http = require("http")
const server = http.createServer(app)
const io = socketio(server)
const Filter = require("bad-words")
let userCount = 0

io.on("connection", socket => {
  socket.emit("serverMessage", "Welcome!")
  userCount++
  socket.broadcast.emit(
    "serverMessage",
    `A new user has entered the room! ${userCount} users present.`
  )
  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter()
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed...")
    }
    socket.broadcast.emit("serverMessage", message)
    callback()
  })

  socket.on("disconnect", () => {
    socket.emit("welcome", "Goodbye!")
    userCount--
    io.emit(
      "serverMessage",
      `A user has left the room... ${userCount} users remain.`
    )
  })

  socket.on("sendLocation", (location, callback) => {
    io.emit(
      "serverMessage",
      `https://google.com/maps?q=${location.latitlude},${location.longitude}`,
      callback()
    )
  })
})

// Routes
const UserRoutes = require("./routers/user")

app.use(express.json())
app.use(UserRoutes)

const port = process.env.PORT

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

app.get("", (req, res) => {
  res.render("index", {
    title: "Chat App",
    creator: "Gerald Downey"
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}...`)
})
