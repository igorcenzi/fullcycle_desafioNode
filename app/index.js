const express = require("express");
const mysql = require("mysql2");
const app = express();

const port = 3000;

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados!");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  connection.query(createTableQuery, (err) => {
    if (err) throw err;
  });
});

app.get("/", (req, res) => {
  const name = `Usuário ${Math.floor(Math.random() * 1000)}`;

  connection.query(`INSERT INTO people(name) VALUES(?)`, [name], (err) => {
    if (err) throw err;

    connection.query(`SELECT name FROM people`, (err, results) => {
      if (err) throw err;

      const names = results.map((row) => `<li>${row.name}</li>`).join("");
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>${names}</ul>
      `);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
