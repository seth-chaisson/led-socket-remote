let app = require("express")();
let express = require("express");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

//--------serial port------
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
let port = null;

SerialPort.list().then((p) => {
  p.forEach((e) => {
    //console.log(e);

    if (e.serialNumber.split("&")[1] == "c0a7753") {
      port = new SerialPort(e.path, { baudRate: 9600 });
      console.log("connected to serial port:" + e.path);
    }
  });
});

app.use(express.static("client"));

io.on("connection", (socket) => {
  socket.on("button", (msg) => {
    switch (msg) {
      case "on":
        sendSerial("o");
        break;
      case "off":
        sendSerial("f");
        break;
      case "normal":
        sendSerial("n");
        break;
      case "red":
        sendSerial("r");
        break;
      case "green":
        sendSerial("g");
        break;
      case "blue":
        sendSerial("b");
        break;
      case "1":
        sendSerial("1");
        break;
      case "2":
        sendSerial("2");
        break;
      case "3":
        sendSerial("3");
        break;
      case "4":
        sendSerial("4");
        break;
      case "5":
        sendSerial("5");
        break;
      case "6":
        sendSerial("6");
        break;

      default:
        break;
    }

    console.log("buttonPressed: " + msg);
  });
  console.log("connected!");
});

http.listen(3000, () => {
  console.log("istening on 3000");
});

function sendSerial(code) {
  if (port === null) {
    console.log("serial port not connected");
    return;
  }
  port.write(code, function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("serial command sent " + code);
  });
}
