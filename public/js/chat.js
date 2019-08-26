const socket = io()
const button = document.querySelector("#reply-button")
const message = document.querySelector(".message")
const form = document.querySelector("#message-form")

socket.on("broadcast", received => {
  console.log(received)
})

socket.on("serverMessage", welcome => {
  console.log(welcome)
})

button.addEventListener("click", () => {})

form.addEventListener("submit", event => {
  event.preventDefault()
  socket.emit("sendMessage", message.value, error => {
    if (error) {
      return console.log(error)
    }
    return console.log("Message delivered!")
  })
})

document.querySelector("#location-button").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Your browser does not support geolocation...")
  }

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        return console.log("Location Shared!")
      }
    )
  })
})
