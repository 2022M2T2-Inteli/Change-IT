const express = require('express'); // framework express 
const app = express(); // app faz o manuseio do express
const hostname = '127.0.0.1'; // endereço 
const port = 3022; // porta do site
var db = require("./connection.js"); // db recebe tudo que tá no javascript do banco de dados

app.use(express.static("../src/")); // pega o diretório do front

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/Home.html`); // printa no console
});