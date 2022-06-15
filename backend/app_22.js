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
const { read } = require('fs');
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

// Endpoints relacionados a tabela Doacoes

app.post("/registrarInsumos", (req, res) => { //Método Post, pega os campos da ficha de insumos e também envia para o banco de dados
    
    const datainsumos = req.body.dataInsumos
    const SaAnonimoInsumos = req.body.SimAnonimo
    const NaAnonimoInsumos = req.body.NaoAnonimo
    const nameInsumos = req.body.nomeInsumos
    const documentoInsumos = req.body.CPFInsumos
    const produtoInsumos = req.body.NomeProduto
    const emailInsumos = req.body.emailInsumo
    const SajudaEntrega = req.body.SimAjuda
    const NajudaEntrega = req.body.NaoAjuda
    const obsIns = req.body.ObsInsumos

    if (SajudaInsumos) {
        if (SajudaEntrega) {
            sql = "INSERT INTO Doador (Nome, CPF, Email, Anônimo, Ajuda) VALUES ('" + nameInsumos + "', '" + documentoInsumos + "', '" + emailInsumos + "', '" + SajudaInsumos + "', '" + SajudaEntrega + "')";
        } else {
            sql = "INSERT INTO Doador (Nome, CPF, Email, Anônimo, Ajuda) VALUES ('" + nameInsumos + "', '" + documentoInsumos + "', '" + emailInsumos + "', '" + SajudaInsumos + "', '" + NajudaEntrega + "')";
        }
    } else {
        if (SajudaEntrega) {
            sql = "INSERT INTO Doador (Nome, CPF, Email, Anônimo, Ajuda) VALUES ('" + nameInsumos + "', '" + documentoInsumos + "', '" + emailInsumos + "', '" + NajudaInsumos + "', '" + SajudaEntrega + "')";
        } else {
            sql = "INSERT INTO Doador (Nome, CPF, Email, Anônimo, Ajuda) VALUES ('" + nameInsumos + "', '" + documentoInsumos + "', '" + emailInsumos + "', '" + NajudaInsumos + "', '" + NajudaEntrega + "')";
        }
    }
    sqld = "INSERT INTO Doação (NomeProduto, Data, Observações) VALUES ('" + produtoInsumos + "', '" + datainsumos + "', '" + obsIns + "')";

    db.run(sql);
    db.run(sqld);
    res.end()
})
// app.put("/atualizarInsumos", (req, res) => { //Método Put, atualzia os campos dentro do banco de dados
//     const nome = req.body.nome
//     const endereco = req.body.endereco
//     var sql = "INSERT Doação SET Nome = '" + nome + "' SET Endereco = '" + endereco + "'WHERE idAssistido = " + req.body.idAssistido;
//     var db = new sqlite3.Database(DBSOURCE);
//     db.run(sql, []);
//     db.close();;
// })

app.get("/readInsumos", (req, res) => { // Método Get, pega todas as informações dentro do banco de dados e retorna elas, tornado possível exibí-las quando necessário
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Doacoes ORDER BY idDoacoes COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
})

app.delete("/deleteInsumos", (req, res) => { //Método Delete, deleta um usuário do banco de dados, por exemplo
    sql = "DELETE FROM Doação WHERE idDoação= '" + req.body.id + "'";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, []);
    db.close(); // Fecha o banco
});

// Endpoints relacionados a tabela Montarios


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
            res.status(500).send(err.message);
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
app.post("/Educadores", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBSOURCE);
    sql = "INSERT INTO Educadores (Nome, Motivo, Idade, Documento, Email, Observações) VALUES ('" + username + "', '" + motivo + "', '" + idade + "', '" + doc + "', '" + email + "', '" + obs + "')";
    db.run(sql, []);
    res.end();
});
app.get("/readEducadores", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    var db = new sqlite3.Database(DBSOURCE);
    var sql = 'SELECT * FROM Educador';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

//Api Ficha Cadastro
// READ Cadastros de assistidos (GET)
app.get("/readCadastroAssistido", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    var db = new sqlite3.Database(DBSOURCE);
    var sql = 'SELECT * FROM tbCadastramento ORDER BY idCadastro COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

// Alternativa sobre o modal seria abrir outra página e mandar o endpoint pra ela
/* app.get("/readCadastroEspecifico", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    var db = new sqlite3.Database(DBSOURCE);
    var sql = 'SELECT * FROM tbCadastramento WHERE idCadastro = ' + req.body.idCadastro;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();

    location.replace("../src/visualizarAssistido.html")
}); */

app.post("/deleteCadastroAssistido", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM tbCadastramento WHERE idCadastro = '" + req.body.idCadastro + "'";
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

app.post("/cadastro", (req, res) => { //Método Post, pega os campos da ficha de assistidos e também envia para o banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    var db = new sqlite3.Database(DBSOURCE);
    
    let dt = req.body.data
    let nomec = req.body.NomeCA
    let nomesocialac = req.body.NomeSocialCA   
    let documento = req.body.DocumentoCA
    let datanasc = req.body.NascCA
    let obs = req.body.observacao
    let viadutomarquise = req.body.marquises
    let predio = req.body.Predios
    let parque = req.body.Parques
    let estacao = req.body.Estacoes
    let margem = req.body.Rodovias
    let construcoes = req.body.Construcoes
    let galeria = req.body.Galerias
    let abandonado = req.body.abandonados
    let outro_locais = req.body.Locais
    let albergue = req.body.moradia_Albergue
    let domicilios = req.body.domicilio_Particular
    let ut_esp = req.body.tempo_rua
    let tempo = req.body.tempo_c
    let motivo = req.body.motivos
    let tempo_mora = req.body.tempo_m
    let familia = req.body.f
    let contatofora = req.body.contato_parente_fr
    let freq = req.body.atv_comu
    let atend = req.body.ult_atendimento
    let carteiras = req.body.carteira
    let ganhou = req.body.ganhar
    let benef = req.body.beneficio
    let q = req.body.qual
    let dt1 = req.body.data1
    let dt2 = req.body.data2
    let dt3 = req.body.data3
    let dt4 = req.body.data4
    let dt5 = req.body.data5
    let servico1 = req.body.serv1
    let servico2 = req.body.serv2
    let servico3 = req.body.serv3
    let servico4 = req.body.serv4
    let servico5 = req.body.serv5
    
    sql = "INSERT INTO tbCadastramento (data, nome_completo, clamado, possui_documentos, nascimento, observacao, marquises_viadutos, predios_pri_pub, parques, estacao, rodovias, areas_internas, galerias, lugares_abandonados, outros_locais, albergue, domiciliar_particular, dias_utilizar_espaco, tempo_de_rua, motivos_morar_rua, quanto_tempo_mora_na_cidade, vive_com_sua_familia, contato_com_parentes, seis_meses_atv_comunitaria, seis_meses_atendido_nos_lugares_abaixo, emprego_carteira_assinada, renda, recebeu_beneficio, qual, encam_dt_1, encam_ser_1, encam_dt_2, encam_ser_2, encam_dt_3, encam_ser_3, encam_dt_4, encam_ser_4, encam_dt_5, encam_ser_5) VALUES ('" + dt + "','" + nomec + "','"+ nomesocialac + "','" + documento + "','" + datanasc + "','" + obs + "','"+ viadutomarquise + "','"+ predio + "','"+ parque + "','"+ estacao + "','"+ margem + "','"+ construcoes + "','"+ galeria + "','"+ abandonado + "','"+ outro_locais + "','"+ albergue + "','"+ domicilios + "','"+ ut_esp  + "','"+ tempo  + "','"+ motivo + "','"+ tempo_mora + "','"+ familia + "','"+ contatofora + "','"+ freq + "','"+ atend + "','"+ carteiras + "','"+ ganhou + "','"+ benef + "','"+ q + "','"+  dt1 + "','"+ servico1 + "','"+ dt2 + "','"+ servico2 + "','"+ dt3 + "','"+ servico3 + "','"+ dt4 + "','"+ servico4 + "','"+ dt5 + "','"+ servico5 +"')";
    db.run(sql, []);
    res.end();
});