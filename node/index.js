const mysql = require('mysql2');
const express = require('express');
const app = express();

const pool = mysql.createPool({
  host     : 'app-db',
  user     : 'root',
  password : 'root',
  database : 'app'
});

function initializeDatabase() {
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS app;`;
    pool.query(createDatabaseQuery, (err, results) => {
        if (err) {
            console.error('Erro ao criar o banco de dados:', err);
            return;
        }
        console.log('Banco de dados app criado ou já existente.');

        const createTableQuery = `CREATE TABLE IF NOT EXISTS app.people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        PRIMARY KEY(id)
        );`;
        pool.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err);
            return;
        }
        console.log('Tabela people criada ou já existente.');
        });
    });
}
  
initializeDatabase();

app.get('/', (req, res) => {
    pool.query('SELECT * FROM people', (err, results) => {
        if (err) throw err;

        let html = '<!DOCTYPE html><html><head><title>Full Cycle Rocks!</title></head><body>';
        html += '<h1>Full Cycle Rocks!</h1>';

        html += '<ul>';
        for (let i = 0; i < results.length; i++) {
        html += `<li>${results[i].name}</li>`;
        }
        html += '</ul>';

        html += '</body></html>';

        res.send(html);
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
