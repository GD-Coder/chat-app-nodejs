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
  socket.emit("sendMessage", message.value)
})
