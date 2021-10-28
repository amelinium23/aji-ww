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

/** not working for now */
router.post("/", (req, res, next) => {
  let body = req.body;
  console.log(req.body);
  if (body === {}) {
    console.error(`The body of request is empty`);
  } else {
    connection.connect();
    connection.query(
      `INSERT INTO products(name, description, weight, price, category_id) VALUES(${body.name}, ${body.description}, ${body.price}, ${body.weight}, ${body.categoryId})`,
      (err, rows, fields) => {
        if (err) {
          console.debug(err.message);
        } else {
          console.debug(JSON.stringify(body));
          res.send(body);
        }
      }
    );
    connection.end();
  }
});

module.exports = router;
