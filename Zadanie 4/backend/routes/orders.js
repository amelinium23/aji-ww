var express = require("express");
var router = express.Router();
var connection = require("../database.js");

router.get("/", (req, res, next) => {
  connection.query(`SELECT * FROM orders`, (err, rows, fields) => {
    err ? res.send(err.message) : res.send(rows);
  });
});

router.get("/:orderId", (req, res, next) => {
  let orderId = req.params.orderId;
  connection.query(
    `SELECT * FROM orders WHERE id=${orderId}`,
    (err, rows, fields) => (err ? res.send(err.message) : res.send(rows))
  );
});

router.get(`/:orderId/stan`, (req, res, next) => {
  let orderId = req.params.orderId;
  connection.query(
    `SELECT state FROM orders WHERE id = ${orderId}`,
    (err, rows, fields) => {
      err ? res.send(err.message) : res.send(rows);
    }
  );
});

router.post("/", (req, res, next) => {
  let body = {
    state: req.body.state,
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    product_id: req.body.product_id,
  };
  if (
    body.state > 0 &&
    body.username.length > 0 &&
    body.email.length > 0 &&
    body.product_id > 0 &&
    body.phoneNumber.length > 0
  ) {
    connection.query(
      `INSERT INTO orders(state, username, email, product_id, phoneNumber) 
      VALUES(${body.state}, '${body.username}', '${body.email}', ${body.product_id}, ${body.phoneNumber})`,
      (err, rows, fields) => {
        if (err) {
          res.send(err.message);
        } else {
          connection.commit();
          res.send(`Successfully added order: ${JSON.stringify(body)}`);
        }
      }
    );
  } else {
    res.send(`You provided not validate data: ${JSON.stringify(body)}`);
  }
});

router.put(`/:orderId/stan`, (req, res, next) => {
  let orderId = req.params.orderId;
  let body = {
    status: req.body.status,
    approval_date: req.body.approval_date,
  };
  if (body.status > 0 && body.status <= 4) {
    connection.query(
      `UPDATE orders SET state=${body.status}, approval_date='${body.approval_date}' WHERE id=${orderId}`,
      (err, rows, fields) => (err ? res.send(err.message) : res.send(rows))
    );
  } else {
    res.send(`You provided not validate data: ${JSON.stringify(body)}`);
  }
});

module.exports = router;
