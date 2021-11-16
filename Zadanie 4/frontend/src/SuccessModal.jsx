import React from "react";
import { Button, Modal, ListGroup, Row, Col } from "react-bootstrap";

export default function SuccessModal({ show, onShow, products }) {
  const totalPrice = (products) => {
    let total = 0;
    products.forEach((pr) => (total += pr.price));
    return total;
  };

  return (
    <Modal show={show} onHide={onShow}>
      <Modal.Header closeButton>
        <Modal.Title>Ordering complete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup numbered>
          {products.map((pr) => {
            return (
              <ListGroup.Item
                variant="success"
                key={`${pr.id}-${pr.name}`}
                style={{ marginBottom: "1vh" }}
              >
                <Row
                  key={`${pr.name}-${pr.id}`}
                  className="justify-content-md-center"
                >
                  <Col md="auto">Name: {pr.name}</Col>
                  <Col md="auto">Weight: {pr.weight}</Col>
                  <Col md="auto">Price: {pr.price}</Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <Row className="justify-content-md-center" style={{ marginTop: "1vh" }}>
          <Col md="auto">
            <h5>Total price: {totalPrice(products).toFixed(2)} zł</h5>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="justify-content-md-center" style={{ marginTop: "1vh" }}>
          <Col md="auto">
            <Button variant="danger" onClick={onShow}>
              Close
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}
