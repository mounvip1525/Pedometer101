const express = require("express");
const app = express();
var SerialPort = require("serialport");
var arduinoCOMPort = "COM6";
var data = 0;
const port = 5000;

app.set('view engine', 'ejs');
app.use(express.static("public"))

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {
  baudRate: 9600,
});

arduinoSerialPort.on("open", function () {
  console.log("Serial Port " + arduinoCOMPort + " is opened.");
});


function read() {
  data = (arduinoSerialPort.read());
  // console.log(decodeURIComponent(data));
}

app.get("/", function (request, response) {
  console.log(data);
  response.render("pedo",{ steps : data })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

setInterval(read, 1000);
