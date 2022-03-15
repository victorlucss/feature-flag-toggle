// CommonJS
const io = require("socket.io-client");

const socket = io.connect("http://localhost:3000/ff-FFT_482c32433ecd59a099473c68d3fc00d2aa9c6e194a5db14d9e1029720ec189a6");


socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("load_ff", (msg) => {
  // console.log(msg);
});
socket.on("new_ff", (msg) => {
  console.log(msg);
});
socket.on("del_ff", (msg) => {
  console.log(msg);
});
socket.on("update_ff", (msg) => {
  console.log('updated ff');
});

socket.on("disconnect", () => {
  console.log(socket.id);
});
