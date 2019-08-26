const socket = io()
const messageButton = document.querySelector("#reply-button")
const locationButton = document.querySelector("#location-button")
const messageInput = document.querySelector(".message")
const form = document.querySelector("#message-form")
const messages = document.querySelector("#messages")
const serverMessage = document.querySelector("#server-message")
const errorMessage = document.querySelector("#error")

const messageTemplate = document.querySelector("#message-template").innerHTML
const locationTemplate = document.querySelector("#location-template").innerHTML

socket.on("userMessage", received => {
  let html = Mustache.render(received + "</br>", messageTemplate)
  messages.innerHTML = html
})

socket.on("serverMessage", message => {
  serverMessage.textContent = message
})

socket.on("locationMessage", location => {
  let html = Mustache.render(
    `<p><a href='${{ location }}'> ${{ location }} </a></p></br>`,
    locationTemplate
  )
  messages.insertAdjacentHTML("afterBegin", html)
})

messageButton.addEventListener("click", () => {})

form.addEventListener("submit", event => {
  event.preventDefault()
  messageButton.setAttribute("disabled", "disabled")
  socket.emit("sendMessage", messageInput.value, error => {
    messageInput.value = ""
    messageButton.removeAttribute("disabled")
    messageInput.focus()
    if (error) {
      return (errorMessage.textContent = error)
    }
    return console.log("Message delivered!")
  })
})

locationButton.addEventListener("click", () => {
  locationButton.setAttribute("disabled", "disabled")
  if (!navigator.geolocation) {
    return (errorMessage.textContent =
      "Your browser does not support geolocation...")
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
        return (serverMessage.textContent = "Location Shared!")
      }
    )
  })
})
