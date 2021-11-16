import React from "react";
import axios from "axios";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import OrderDetails from "./OrderDetails.jsx";

export default function NewOrderModal({ show, onShow, products }) {
  const [username, setUsername] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    products.forEach((pr) => {
      let body = {
        state: 1,
        username: username,
        email: mail,
        phoneNumber: phoneNumber,
        product_id: pr.id,
      };
      axios.post(`http://localhost:8000/orders`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    flush();
    onClose();
  };

  const flush = () => {
    setUsername("");
    setMail("");
    setPhoneNumber("");
  };

  const onClose = () => {
    onShow();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <OrderDetails products={products} />
          <FloatingLabel label="Username" style={{ marginBottom: "1vh" }}>
            <Form.Control
              type="text"
              minLength={1}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Mail" style={{ marginBottom: "1vh" }}>
            <Form.Control
              type="text"
              minLength={1}
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Phone number" style={{ marginBottom: "1vh" }}>
            <Form.Control
              type="text"
              minLength={1}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FloatingLabel>
          <Button
            variant="success"
            type="submit"
            onClick={onSubmit}
            style={{ float: "left", marginRight: "1wv" }}
          >
            Buy
          </Button>
          <Button
            variant="danger"
            style={{ float: "right", marginLeft: "1wv" }}
            onClick={onClose}
          >
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
