const express = require('express'); // framework express 
const app = express(); // app faz o manuseio do express

const hostname = '127.0.0.1'; // endereço 
const port = 3022; // porta do site

var db = require("./connection.js"); // db recebe tudo que tá no javascript do banco de dados

app.use(express.static("../src/")); // pega o diretório do front
app.use(express.json()); // pega o diretório do node.js

/* =========================
  DEFINIÇÃO DOS ENDPOINTS
========================= */

// Retorna todos os registros (Read)
app.get('/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // o leitor analisa todos os registros (apelidados de *)

  var db = new sqlite3.Database(DBPATH); // abre o banco de dados
  var sql = 'SELECT * FROM tbUser ORDER BY userId COLLATE NOCASE'; // pega todos os registros (*) e ordena por ID
  db.all(sql, [], (err, rows) => { // se der algum erro a gnt precisa de uma resposta
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // fecha o banco
});

//Insere um registro (Create)
// app.post('/insert', urlencodedParser, (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS também

//   sql = "INSERT INTO tbUser (title, id, completed) VALUES ('" + req.body.title + "', '" + req.body.userId + "', false)'";
//   var db = new sqlite3.Database(DBPATH); // Abre o banco de dados
//   db.run(sql, [], err => {
//     if (err) {
//       throw err; // quando acontece algo errado
//     }
//   });
//   db.close(); // Fecha o banco
//   res.end();
// });

// Atualiza um registro (Update)
// app.post('/update', urlencodedParser, (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
//   sql = "UPDATE tbUser SET title = '" + req.body.title + "' WHERE userId =" + req.body.userId;
//   var db = new sqlite3.Database(DBPATH); // Abre o banco de dados
//   db.run(sql, [], err => {
//     if (err) {
//       throw err;
//     }
//     res.end();
//   });
//   db.close(); // Fecha o banco
// });

// // Exclui um registro (Delete)
// app.post('/delete', urlencodedParser, (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   sql = "DELETE FROM tbUser WHERE userId =" + req.body.userId;
//   var db = new sqlite3.Database(DBPATH); // Abre o banco de dados
//   db.run(sql, [], err => {
//     if (err) {
//       throw err;
//     }
//     res.end();
//   });
//   db.close(); // Fecha o banco
// });


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/Home.html <br /> asdoaisj`); // printa no console
});

