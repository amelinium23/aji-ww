import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export default function OrderDetails({ products }) {
  const totalPrice = (products) => {
    let total = 0;
    products.forEach((pr) => {
      total += pr.price;
    });
    return total.toFixed(2);
  };

  return (
    <Container style={{ marginTop: "1vh", marginBottom: "1vh" }}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h5>Chosen products</h5>
        </Col>
      </Row>
      {products.length > 0 ? (
        products.map((pr) => {
          return (
            <Row
              key={`${pr.name}-${pr.id}`}
              className="justify-content-md-center"
            >
              <Col md="auto">Name: {pr.name}</Col>
              <Col md="auto">Weight: {pr.weight}</Col>
              <Col md="auto">Price: {pr.price}</Col>
            </Row>
          );
        })
      ) : (
        <Row className="justify-content-md-center">Cart is empty</Row>
      )}
      <Row className="justify-content-md-center" style={{ marginTop: "1vh" }}>
        <Col md="auto">
          <h5>Total price: {totalPrice(products)} zł</h5>
        </Col>
      </Row>
    </Container>
  );
}
