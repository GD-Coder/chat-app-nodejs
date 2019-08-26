const socket = io()
const messageButton = document.querySelector("#reply-button")
const locationButton = document.querySelector("#location-button")
const message = document.querySelector(".message")
const form = document.querySelector("#message-form")

socket.on("broadcast", received => {
  console.log(received)
})

socket.on("serverMessage", welcome => {
  console.log(welcome)
})

messageButton.addEventListener("click", () => {})

form.addEventListener("submit", event => {
  event.preventDefault()
  messageButton.setAttribute("disabled", "disabled")
  socket.emit("sendMessage", message.value, error => {
    message.value = ""
    messageButton.removeAttribute("disabled")
    message.focus()
    if (error) {
      return console.log(error)
    }
    return console.log("Message delivered!")
  })
})

locationButton.addEventListener("click", () => {
  locationButton.setAttribute("disabled", "disabled")
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
        locationButton.removeAttribute("disabled")
        return console.log("Location Shared!")
      }
    )
  })
})
