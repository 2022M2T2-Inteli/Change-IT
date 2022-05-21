const express = require('express');
const app = express();

var db = require("./connection.js");

const hostname = '127.0.0.1';
const port = 3022;
app.use(express.static("../src/"));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});