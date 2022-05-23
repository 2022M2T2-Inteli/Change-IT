var sqlite3 = require('sqlite3').verbose() // recebe o módulo do sqlite
var md5 = require('md5') // recebe o módulo do md5 (criptografia)

const DBSOURCE = "Projeto5.db" // responsável pela operação do bd

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


module.exports = db // exporta o bd