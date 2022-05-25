const express = require('express'); // framework express 
const app = express(); // app faz o manuseio do express

const hostname = '127.0.0.1'; // endereço 
const port = 3022; // porta do site

app.use(express.static("../src/")); // pega o diretório do front
app.use(express.json()); // pega o diretório do node.js
var sqlite3 = require('sqlite3').verbose() // recebe o módulo do sqlite
var md5 = require('md5') // recebe o módulo do md5 (criptografia)
var sqlite3 = require('sqlite3').verbose();
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit"); // import de todos os módulos necessários

const DBSOURCE = "Projeto5.db" // responsável pela operação do bd
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(express.urlencoded({
    extended: true
}))

app.post("/Voluntario", (req, res) => {
    const username = req.body.username
    const age = req.body.idade
    const doc = req.body.documento
    const help = req.body.ajudar
    const inspire = req.body.inspirar
    const email = req.body.email
    var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    db.run(insert, [username, age, email])
    res.end()
})
app.post("/Insumos", (req, res) => {
    const nameInsumos = req.body.nomeInsumos
    const idadeInsumos = req.body.idadeInsumos
    const documentoInsumos = req.body.documentoInsumos
    const produtoInsumos = req.body.produtoInsumos
    const emailInsumos = req.body.emailInsumos
    var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    db.run(insert, [nameInsumos, idadeInsumos, emailInsumos])
    res.end()
})

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) { // aparece o erro no console se ele existir
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.') // aparece isso no console se der bom
        // var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
        // db.run(insert, ["admin", "admin@example.com", md5("admin123456")])
        // db.run(insert, ["user", "user@example.com", md5("user123456")])
        // db.run(insert, ["zaidan", "zaidan@alexandre.kil", md5("ste123456")])
    }
});
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(express.static(path.join(__dirname, './public')));
// app.use(helmet());
// app.use(limiter);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/Home.html`); // printa no console
});

module.exports = db // exporta o bd