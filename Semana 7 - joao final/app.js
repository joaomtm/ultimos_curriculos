const express = require("express");
const app = express();

const hostname = "127.0.0.1";
const port = 3000;

const sqlite3 = require("sqlite3").verbose();
const DBPATH = "dbInfo.db";
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/curriculo.html");
});

/* definição dos endpoints */

/*** CRUD ***/

// Retorna todas as informações do currículo, em formato JSON
app.get("/info", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = "SELECT * FROM tbInfo";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Insere um conjunto de informações no currículo
app.post("/info", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar o erro de CORS

  // Inserir informações no banco de dados
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql =
    "INSERT INTO tbInfo (name, address, phone, email) VALUES (?, ?, ?, ?)";
  db.run(
    sql,
    [req.body.name, req.body.address, req.body.phone, req.body.email],
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  db.close(); // Fecha o banco
  res.end();
});

// Atualiza uma informação do currículo
app.patch("/info/:id", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar o erro de CORS

  // Pegar id da URL
  id = req.params.id;

  // Atualiza informações no banco de dados
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql =
    "UPDATE tbInfo SET name = ?, address = ?, phone = ?, email = ? WHERE id = ?";
  db.run(
    sql,
    [req.body.name, req.body.address, req.body.phone, req.body.email, id],
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  db.close(); // Fecha o banco;
  res.end();
});

// Exclui uma informação (é o D do CRUD - Delete)
app.delete("/info/:id", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar o erro de CORS

  // Pegar id da URL
  id = req.params.id;

  // Deleta informações do banco
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = "DELETE FROM tbInfo WHERE id = ?";
  db.run(sql, [id], (err) => {
    if (err) {
      throw err;
    }
  });
  db.close(); // Fecha o banco
  res.end();
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
