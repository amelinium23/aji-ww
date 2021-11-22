var express = require("express");
var router = express.Router();

var connection = require("../database.js");

router.get("/", (req, res, next) => {
  connection.query(`SELECT * FROM statuses`, (err, rows, fields) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
