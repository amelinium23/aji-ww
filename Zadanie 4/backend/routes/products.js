var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tomczak123!",
  database: "my_db",
});

/* GET users listing. */
router.get("/", (req, res, next) => {
  connection.connect();

  connection.query("SELECT * FROM products", (err, rows, fields) => {
    err ? console.log(err.message) : res.send(rows);
  });
  connection.end();
});

router.get("/:productId", (req, res, next) => {
  connection.connect();
  connection.query(
    `SELECT * FROM products WHERE id = ${req.params.productId}`,
    (err, rows, fields) => {
      err ? console.log(err.message) : res.send(rows);
    }
  );
  connection.end();
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  connection.connect();
  connection.query(
    `INSERT INTO products VALUES(
      ('${req.body.name}', '${req.body.description}', ${req.body.price}, ${req.body.weight}, ${req.body.category_id})
    )`,
    (err, rows, fields) => {
      if (err) {
        console.debug(err.message);
      } else {
        console.debug(rows);
        res.send(rows);
      }
    }
  );
  connection.end();
});

module.exports = router;
