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
const req = require('express/lib/request');
// var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
// var atualizar = 'UPDATE user SET (name , email, password) WHERE VALUES id=1'
// var get = 'SELECT * FROM user'
// var delet = "DELETE FROM user WHERE id= '" + req.body.id + "'";

app.use(express.static("../src/")); // pega o diretório do front
app.use(express.json()); // pega o diretório do node.js

const DBSOURCE = "DatabaseOficial5.db" // responsável pela operação do bd
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

// Endpoints relacionados aos assistidos/atendidos
app.post("/registrarAssistido", (req, res) => { //Método Post, pega os campos da ficha de assistidos e também envia para o banco de dados
    const nameAssistido = req.body.nome
    const nameSocialAssistido = req.body.NomeSocial
    const local = req.body.local
    const seratendido = req.body.Sim
    const naoatendido = req.body.Nao
    const temporua = req.body.rua
    const motivo = req.body.motivo
    const outromotivo = req.body.outros
    const satendimento = req.body.simAtendido
    const natendimento = req.body.naoAtendido
    const observaçao = req.body.observacao
    if (seratendido) {
        if (satendimento) {
            sql = "INSERT INTO Assistido (Nome, Apelido, Endereco, ObservacaoEndereco, TempoRua, PrincipaisMotivos, OutrosMotivos, Atendido, Observacao) VALUES ('" + nameAssistido + "', '" + nameSocialAssistido + "', '" + local + "', '" + seratendido + "', '" + temporua + "', '" + motivo + "', '" + outromotivo + "', '" + satendimento + "', '" + observaçao + "')";
        } else {
            sql = "INSERT INTO Assistido (Nome, Apelido, Endereco, ObservacaoEndereco, TempoRua, PrincipaisMotivos, OutrosMotivos, Atendido, Observacao) VALUES ('" + nameAssistido + "', '" + nameSocialAssistido + "', '" + local + "', '" + seratendido + "', '" + temporua + "', '" + motivo + "', '" + outromotivo + "', '" + natendimento + "', '" + observaçao + "')";
        }
    } else {
        if (satendimento) {
            sql = "INSERT INTO Assistido (Nome, Apelido, Endereco, ObservacaoEndereco, TempoRua, PrincipaisMotivos, OutrosMotivos, Atendido, Observacao) VALUES ('" + nameAssistido + "', '" + nameSocialAssistido + "', '" + local + "', '" + naoatendido + "', '" + temporua + "', '" + motivo + "', '" + outromotivo + "', '" + satendimento + "', '" + observaçao + "')";
        } else {
            sql = "INSERT INTO Assistido (Nome, Apelido, Endereco, ObservacaoEndereco, TempoRua, PrincipaisMotivos, OutrosMotivos, Atendido, Observacao) VALUES ('" + nameAssistido + "', '" + nameSocialAssistido + "', '" + local + "', '" + naoatendido + "', '" + temporua + "', '" + motivo + "', '" + outromotivo + "', '" + natendimento + "', '" + observaçao + "')";
        }
    }

    db.run(sql);
    res.end();
})
app.put("/atualizarAssistido", (req, res) => {
    const nome = req.body.nome
    const endereco = req.body.endereco
    var sql = "INSERT Assistido SET Nome = '" + nome + "' SET Endereco = '" + endereco + "'WHERE idAssistido = " + req.body.idAssistido;
    var db = new sqlite3.Database(DBSOURCE);
    db.run(sql, []);
    db.close();;
})

app.get("/readAssistido", (req, res) => { //Método Get, pega todas as informações dentro do banco de dados e retorna elas, tornando possível exibí-las quando necessário

    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Assistido ORDER BY idAssistido COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
})
app.delete("/deleteAssistido", (req, res) => { //Método Delete, delete um usuário do banco de dados, por exemplo
    db.run(delet);
})

// Endpoints relacionados às doações
app.post("/registrarInsumos", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dados
    //doador
    const nameInsumos = req.body.nomeInsumos
    const idadeInsumos = req.body.idadeInsumos
    const documentoInsumos = req.body.documentoInsumos
    const emailInsumos = req.body.emailInsumos
    const SajudaInsumos = req.body.Sim
    const NajudaInsumos = req.body.Nao
    const SajudaEntrega = req.body.SimAjuda
    const NajudaEntrega = req.body.NaoAjuda
    const produtoInsumos = req.body.produtoInsumos
    const obsIns = req.body.ObsInsumos
    if (SajudaInsumos) {
        if (SajudaEntrega) {
            sql = "INSERT INTO Doador (Nome, Idade, CPF, Email, Anônimo, Ajuda) VALUES ('" + nameInsumos + "', '" + idadeInsumos + "', '" + documentoInsumos + "', '" + emailInsumos + "', '" + SajudaInsumos + "', '" + SajudaEntrega + "')";
        } else {
            sql = "INSERT INTO Doador (Nome, Idade, CPF, Email, Anônimo, Ajuda) VALUES ('" + nameInsumos + "', '" + idadeInsumos + "', '" + documentoInsumos + "', '" + emailInsumos + "', '" + SajudaInsumos + "', '" + NajudaEntrega + "')";
        }
    } else {
        if (SajudaEntrega) {
            sql = "INSERT INTO Doador (Nome, Idade, CPF, Email, Anônimo, Ajuda) VALUES ('" + nameInsumos + "', '" + idadeInsumos + "', '" + documentoInsumos + "', '" + emailInsumos + "', '" + NajudaInsumos + "', '" + SajudaEntrega + "')";
        } else {
            sql = "INSERT INTO Doador (Nome, Idade, CPF, Email, Anônimo, Ajuda) VALUES ('" + nameInsumos + "', '" + idadeInsumos + "', '" + documentoInsumos + "', '" + emailInsumos + "', '" + NajudaInsumos + "', '" + NajudaEntrega + "')";
        }
    }
    sqld = "INSERT INTO Doação (NomeProduto, Observações) VALUES ('" + produtoInsumos + "', '" + obsIns + "')";

    db.run(sql);
    db.run(sqld);
    res.end()
})
app.put("/atualizarInsumos", (req, res) => { //Método Put, atualzia os campos dentro do banco de dados
    db.run(atualizar, ["acorda", "pedrinho", "campeonato"]);
})
app.get("/readInsumo", (req, res) => { // Método Get, pega todas as informações dentro do banco de dados e retorna elas, tornado possível exibí-las quando necessário
    db.run(get);
})
app.delete("/deleteInsumos", (req, res) => { //Método Delete, deleta um usuário do banco de dados, por exemplo
    db.run(delet);
})

// Endpoints relacionados aos voluntários

//ok
app.post("/registrarVoluntario", (req, res) => { //Método Post, pega os campos da ficha de cadastro do Voluntário e envia para o banco de dados
    const username = req.body.username
    const motivo = req.body.inspirar
    const idade = req.body.idade
    const doc = req.body.documento
    const email = req.body.email
    const obs = req.body.obs
    sql = "INSERT INTO Voluntário (Nome, Motivo, Idade, Documento, Email, Observações) VALUES ('" + username + "', '" + motivo + "', '" + idade + "', '" + doc + "', '" + email + "', '" + obs + "')";
    db.run(sql);
    res.end()
})

app.post("/atualizarVoluntario", (req, res) => { //Método Put, atualiza os campos dentro do banco de dados
    const username = req.body.username
    const idade = req.body.idade
    sql = "UPDATE user SET name = '" + username + "' SET idade = '" + idade + "'WHERE id = " + req.body.id;
    var db = new sqlite3.Database(DBSOURCE);
    db.run(sql, []);
    db.close();
})

app.get('/readVoluntario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM user ORDER BY id COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post("/deleteVoluntario", (req, res) => { //Método Delete, deleta um usuário do banco de dados, por exemplo
    sql = "DELETE FROM user WHERE id= '" + req.body.id + "'";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, []);
    db.close(); // Fecha o banco
});



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/Home.html`); // printa no console
});

module.exports = db // exporta o bd

//pendente


// Endpoints relacionados aos assistidos
// 	insertAssistido (post)
// 	updateAssistido (put)
// 	readAssitido (get)



// Endpoints relacionados aos colaboradores
// 	insertColaborador (post)
// 	switchColaborador
// 	updateColaborador (put)
// 	readColaborador (get)


//pendente
app.get('/readColaborador', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Colaborador ORDER BY CPF COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post("/insertColaborador", (req, res) => { //Método de inserir dados do colaborador
    sql = `INSERT INTO Colaborador (Nome, CPF, Tipo, Senha, Email, Endereco, Data, PrimeiroAcesso, UltimoAcesso) VALUES ('${req.body.NomeColab}','${req.body.CPFColab}','${req.body.TipoColab}', '${req.body.SenhaColab}', '${req.body.EmailColab}', '${req.body.EnderecoColab}', '${req.body.PrimeiraDataColab}', '${req.body.PrimeiroAcessoColab}', '${req.body.UltimoAcessoColab}')`;
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, []);
    db.close(); // Fecha o banco
});

app.post('/updateColaborador', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    sql = `UPDATE Colaborador SET`
    if (req.body.NomeColab) {
        sql += ` Nome = '${req.body.NomeColab}',`;
    };
    if (req.body.TipoColab) {
        sql += ` Tipo = '${req.body.TipoColab}'`
    };
    if (req.body.SenhaColab) {
        sql += `, Senha = '${req.body.SenhaColab}'`
    };
    sql += ` WHERE CPF = '${req.body.CPFColab}'`;

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

app.post('/deleteColaborador', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    sql = "DELETE FROM Colaborador WHERE CPF = '" + req.body.CPFColab + "'";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

// Endpoints relacionados aos doadores
// 	insertDoador (post)
// 	readDoador (get)

//pendente

app.post("/insertDoador", (req, res) => { //Método de inserir dados dos doares
    sql = "INSERT INTO user (name, email, senha, idade, recorrencia) VALUES ('" + username + "', '" + email + "', '" + age + "')";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, []);
    db.close(); // Fecha o banco
});

app.get("/readDoador", (req, res) => { //Método Get, pega todas as informações dentro do banco de dados e retorna elas, tornando possível exibí-las quando necessário
    db.run(get)
});

// Endpoints relacionados às atividades
// 	insertAtividade (post)
// 	updateAtividade (put)
// 	readAtividade (get)


//pendente

app.post("/insertAtividade", (req, res) => { //Método de inserir dados do colaborador
    const idAssistido = req.body.idAssistido
    const nome = req.body.nome
    const tipo = req.body.tipo
    const
        sql = "INSERT INTO Atividade (idAssistido, Nome, Tipo) VALUES ('" + idAssistido + "', '" + nome + "', '" + tipo + "')";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, []);
    db.close(); // Fecha o banco


    // const idAssistido = req.body.idAssistido
    // const tipo = req.body.tipo
    // sql = "INSERT INTO Atividade SET idAssistido = '" + idAssistido + "' SET Tipo = '" + tipo + "'WHERE id = " + req.body.id;
    // var db = new sqlite3.Database(DBSOURCE);
    // db.run(sql, []);
    // db.close();
});

app.put("/updateAtividade", (req, res) => { //Método Put, atualzia os campos dentro do banco de dados
    db.run(atualizar, ["acorda", "pedrinho", "campeonato"]);
});

app.get("/readAtividade", (req, res) => { //Método Get, pega todas as informações dentro do banco de dados e retorna elas, tornando possível exibí-las quando necessário
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Atividade ORDER BY idAtividade COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});