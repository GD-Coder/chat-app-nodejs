const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const menu = $(".nav.navbar-nav")[0]
var menuIsOpen = false
var style = menu.style

function toggleMenu() {
  function show(menu) {
    hamburger.classList.add("hamburger-active")
    style.height = "auto"
  }

  function hide(menu) {
    hamburger.classList.remove("hamburger-active")
    style.height = 0
  }

  if (menuIsOpen) {
    hide(menu)
  } else {
    show(menu)
  }
  menuIsOpen = !menuIsOpen
}

if (navbar) {
  var sticky = navbar.offsetTop

  window.onscroll = function() {
    stickyNavbar()
  }
}
function stickyNavbar() {
  if (window.pageYOffset >= sticky + 5) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky")
  }
}