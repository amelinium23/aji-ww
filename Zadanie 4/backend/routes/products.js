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
  let body = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    weight: req.body.weight,
    category_id: req.body.category_id,
  };
  if (
    body.name &&
    body.description &&
    body.price > 0 &&
    body.weight > 0 &&
    body.category_id > 0
  ) {
    connection.connect();
    connection.query(
      `INSERT INTO products(name, description, price, weight, category_id) VALUES(
        '${body.name}', '${body.description}', ${body.price}, ${body.weight}, ${body.category_id}
      )`,
      (err, rows, fields) => {
        if (err) {
          console.debug(err.message);
        } else {
          connection.commit();
          res.send(rows);
        }
      }
    );
    connection.end();
  } else {
    res.send(`You provided not validate data: ${JSON.stringify(body)}`);
  }
});

router.put(`/:productId`, (req, res, next) => {
  let productId = req.params.productId;
  let body = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    weight: req.body.weight,
    category_id: req.body.category_id,
  };
  if (body) {
    connection.connect();
    connection.query(
      `UPDATE products 
      SET name='${body.name}', description='${body.description}', price=${body.price}, weight=${body.weight}, category_id=${body.category_id} 
      WHERE id = ${productId}`,
      (err, rows, fields) => {
        if (err) {
          res.send(err.message);
          connection.end();
        } else {
          res.send(rows);
        }
      }
    );
    connection.end();
  }
});

module.exports = router;
