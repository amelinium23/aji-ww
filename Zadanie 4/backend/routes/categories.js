var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tomczak123!",
  database: "my_db",
});

router.get("/", (req, res, next) => {
  connection.query(`SELECT * FROM categories`, (err, rows, fields) => {
    err ? res.send(err.message) : res.send(rows);
  });
});

module.exports = router;
