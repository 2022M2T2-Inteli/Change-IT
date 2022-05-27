const express = require('express'); // framework express 
const app = express(); // app faz o manuseio do express
const hostname = '127.0.0.1'; // endereço 
const port = 3022; // porta do site
var md5 = require('md5') // recebe o módulo do md5 (criptografia)
var sqlite3 = require('sqlite3').verbose(); // import de todos os módulos necessários
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
var atualizar = 'UPDATE user SET (name , email, password) WHERE VALUES id=1'
var get = 'SELECT * FROM user'
var delet = 'DELETE FROM user WHERE id=3'

app.use(express.static("../src/")); // pega o diretório do front
app.use(express.json()); // pega o diretório do node.js

const DBSOURCE = "Projeto5.db" // responsável pela operação do bd
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(express.urlencoded({
    extended: true
}))


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) { // aparece o erro no console se ele existir
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.') // aparece isso no console se der bom
    }
});

//get, post, put, delete methods

app.post("/registrarVoluntario", (req, res) => { //Método Post, pega os campos da ficha de cadastro do Voluntário e envia para o banco de dados
    const username = req.body.username
    const age = req.body.idade
    const doc = req.body.documento
    const help = req.body.ajudar
    const inspire = req.body.inspirar
    const email = req.body.email
    db.run(insert, [username, age, email])
    res.end()
})

app.post("/registrarInsumos", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dados
    const nameInsumos = req.body.nomeInsumos
    const idadeInsumos = req.body.idadeInsumos
    const documentoInsumos = req.body.documentoInsumos
    const produtoInsumos = req.body.produtoInsumos
    const emailInsumos = req.body.emailInsumos
    db.run(insert, [nameInsumos, idadeInsumos, emailInsumos])
    res.end()
})

app.put("/ativarVoluntario", (req, res) => { //Método Put, atualiza os campos dentro do banco de dados
    db.run(atualizar, ["acorda", "pedrinho", "campeonato    "]);
})

app.get("/returnVoluntario", (req, res) => { //Método Get, pega todas as informações dentro do banco de dados e retorna elas, sendo possível exibi-las quando necessário
    db.run(get);
})

app.delete("/deleteVoluntario", (req, res) => { //Método Delete, deleta um usuário do banco de dados, por exemplo
    db.run(delet);
})



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/Home.html`); // printa no console
});

module.exports = db // exporta o bd

// Endpoints relacionados aos assistidos
// 	insertAssistido (post)
// 	updateAssistido (put)
// 	readAssitido (get)
// Endpoints relacionados aos voluntários
// 	insertVoluntário (post)
// 	switchVoluntário (put)
// 	readVoluntário (get)
// Endpoints relacionados aos colaboradores
// 	insertColaborador
// 	switchColaborador
// 	updateColaborador
// 	readColaborador
// Endpoints relacionados aos doadores
// 	insertDoador
// 	readDoador
// Endpoints relacionados às doações
// 	insertDoação
// 	readDoação
// Endpoints relacionados às atividades
// 	insertAtividade
// 	updateAtividade
// 	readAtividade