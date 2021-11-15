import React from "react";
import { Row, Col } from "react-bootstrap";

export default function ListView({ products }) {
  return products.length > 0 ? (
    products.map((pr) => {
      return (
        <Row key={`${pr.name}-${pr.id}`} className="justify-content-md-center">
          <Col md="auto">Name: {pr.name}</Col>
          <Col md="auto">Weight: {pr.weight}</Col>
          <Col md="auto">Price: {pr.price}</Col>
        </Row>
      );
    })
  ) : (
    <Row className="justify-content-md-center">Cart is empty</Row>
  );
}
