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
      case 2:
        sendSerial("o");
        break;
      case 5:
        sendSerial("f");
        break;
      case 3:
        sendSerial("n");
        break;
      case 12:
        sendSerial("r");
        break;
      case 13:
        sendSerial("g");
        break;
      case 14:
        sendSerial("b");
        break;
      case 15:
        sendSerial("1");
        break;
      case 16:
        sendSerial("2");
        break;
      case 17:
        sendSerial("3");
        break;
      case 18:
        sendSerial("4");
        break;
      case 19:
        sendSerial("5");
        break;
      case 20:
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
