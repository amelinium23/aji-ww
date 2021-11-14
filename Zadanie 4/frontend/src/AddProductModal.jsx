import axios from "axios";
import React from "react";
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap";

export default function AddProductModal({
  show,
  onShow,
  categories,
  fetchProducts,
}) {
  const [formName, setFormName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0.0);
  const [weight, setWeight] = React.useState(0.0);
  const [category, setCategory] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      name: formName,
      description: description,
      price: price,
      weight: weight,
      category_id: category.id,
    };
    axios.post(`http://localhost:8000/products`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchProducts();
    onClose();
  };

  const onClose = () => {
    onShow();
    flush();
  };

  const flush = () => {
    setFormName("");
    setDescription("");
    setPrice(0.0);
    setWeight(0.0);
  };

  const findCategoryObject = (category) =>
    categories.find((ct) => ct.name === category);

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add new product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <FloatingLabel label="Name" style={{ marginBottom: "1vh" }}>
            <Form.Control
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Description" style={{ marginBottom: "1vh" }}>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Price" style={{ marginBottom: "1vh" }}>
            <Form.Control
              type="number"
              min={0}
              value={price}
              step="0.1"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </FloatingLabel>
          <FloatingLabel label="Weight" style={{ marginBottom: "1vh" }}>
            <Form.Control
              type="number"
              min={0}
              value={weight}
              step="0.1"
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </FloatingLabel>
          <FloatingLabel label="Category" style={{ marginBottom: "1vh" }}>
            <Form.Select
              value={category.name}
              onChange={(e) => setCategory(findCategoryObject(e.target.value))}
            >
              {categories.length > 0
                ? categories.map((ct) => (
                    <option key={`${ct.id}-${ct.name}`}>{ct.name}</option>
                  ))
                : null}
            </Form.Select>
          </FloatingLabel>
          <Button
            variant="success"
            type="submit"
            onClick={onSubmit}
            style={{ float: "left", marginRight: "1wv" }}
          >
            Add
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
