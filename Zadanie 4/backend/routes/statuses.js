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
  connection.connect();
  connection.query(`SELECT * FROM statuses`, (err, rows, fields) => {
    if (err) {
      res.send(err.message);
      connection.end();
    } else {
      res.send(rows);
      connection.end();
    }
  });
  connection.end();
});

module.exports = router;
