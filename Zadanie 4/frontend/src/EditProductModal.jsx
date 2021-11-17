import React from "react";
import axios from "axios";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";

export default function EditProductModal({
  show,
  onShow,
  product,
  fetchProducts,
  categories,
}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [category, setCategory] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      name: name,
      description: description,
      price: price,
      weight: weight,
      category_id: category.id,
    };
    if (
      body.name.length > 0 &&
      body.description.length > 0 &&
      body.price > 0 &&
      body.weight > 0 &&
      body.category_id
    ) {
      axios.put(`http://localhost:8000/products/${product.id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    fetchProducts();
    onClose();
  };

  const onClose = () => {
    onShow();
    flush();
  };

  const flush = () => {
    setName("");
    setDescription("");
    setPrice(0.0);
    setWeight(0.0);
  };

  const findCategoryObject = (category) =>
    categories.find((ct) => ct.name === category);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit - {product.id} - {product.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit} validated>
          <FloatingLabel label="Name" style={{ marginBottom: "1vh" }}>
            <Form.Control
              type="text"
              value={name}
              minLength={1}
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Description" style={{ marginBottom: "1vh" }}>
            <Form.Control
              as="textarea"
              rows={3}
              minLength={1}
              required={true}
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
              required={true}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </FloatingLabel>
          <FloatingLabel label="Weight" style={{ marginBottom: "1vh" }}>
            <Form.Control
              type="number"
              min={0}
              value={weight}
              step="0.1"
              required={true}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </FloatingLabel>
          <FloatingLabel label="Category" style={{ marginBottom: "1vh" }}>
            <Form.Select
              value={category.name}
              onChange={(e) => setCategory(findCategoryObject(e.target.value))}
              minLength={1}
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
            Edit
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
