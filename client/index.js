//node_modules/socket.io-client/dist/socket.io.js

let socket = io();

// document.getElementById("msgBtn").addEventListener("click", () => {
//   socket.emit("button", "pressed");
// });
// document.getElementById("output").innerHTML = "hllo";

let buttonDiv = document.getElementById("buttonGrid");

let buttons = document.getElementsByClassName("btn");

for (let x = 0; x < buttons.length; x++) {
  buttons[x].addEventListener("click", () => {
    socket.emit("button", x);
  });
}
