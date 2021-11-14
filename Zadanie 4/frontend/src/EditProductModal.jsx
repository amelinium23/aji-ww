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
  const [name, setName] = React.useState(product.name || "");
  const [description, setDescription] = React.useState(
    product.description || ""
  );
  const [price, setPrice] = React.useState(product.price || 0.0);
  const [weight, setWeight] = React.useState(product.weight || 0.0);
  const [category, setCategory] = React.useState(product.category_id || "");

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      name: name,
      description: description,
      price: price,
      weight: weight,
      category_id: category.id,
    };
    axios.put(`http://localhost:8000/products/${product.id}`, body, {
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
    setName(product.name || "");
    setDescription(product.description || "");
    setPrice(product.price || 0.0);
    setWeight(product.price || 0.0);
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
        <Form onSubmit={onSubmit}>
          <FloatingLabel label="Name" style={{ marginBottom: "1vh" }}>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={categories.find((ct) => ct.id === category)}
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
