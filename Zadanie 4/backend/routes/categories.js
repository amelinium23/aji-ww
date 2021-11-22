var express = require("express");
var router = express.Router();
var connection = require("../database.js");

router.get("/", (req, res, next) => {
  connection.query(`SELECT * FROM categories`, (err, rows, fields) => {
    err ? res.send(err.message) : res.send(rows);
  });
});

module.exports = router;
