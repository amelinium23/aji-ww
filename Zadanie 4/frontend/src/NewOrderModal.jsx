import React from "react";
import { Modal, Form, FloatingLabel } from "react-bootstrap";

export default function NewOrderModal({ show, onShow, products }) {
  console.log(products);
  const onClose = () => {
    onShow();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel label=""></FloatingLabel>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
