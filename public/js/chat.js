const socket = io()
const messageButton = document.querySelector("#reply-button")
const locationButton = document.querySelector("#location-button")
const messageInput = document.querySelector(".message")
const form = document.querySelector("#message-form")
const messages = document.querySelector("#messages")
const serverMessage = document.querySelector("#server-message")
const errorMessage = document.querySelector("#error")

socket.on("userMessage", received => {
  let html = `<p class="message-text">${
    received.text
  }</p><br><p class="date-text">${moment(received.createdAt).format("lll")}</p>`
  messages.insertAdjacentHTML("beforeEnd", html)
})

socket.on("serverMessage", message => {
  serverMessage.textContent = message
})

socket.on("locationMessage", location => {
  let html = `<p class="message-text"><a href="${
    location.text
  }" target="_blank" class="location-link">My Current Location</a></p><br><p class="date-text">${moment(
    location.createdAt
  ).format("lll")}</p>`
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
