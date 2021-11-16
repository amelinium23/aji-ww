import React from "react";
import axios from "axios";
import { Container, Table, Row, Col, Button, Form } from "react-bootstrap";
import NewOrderModal from "./NewOrderModal.jsx";
import OrderDetails from "./OrderDetails.jsx";

export default function SellerView() {
  const [showOrderModal, setShowOrderModal] = React.useState(false);
  const [productsToShow, setProductsToShow] = React.useState(10);
  const [productsForOrder, setProductsForOrder] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = () => {
    axios.get(`http://localhost:8000/products`).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setProducts(data);
      }
    });
  };

  const fetchCategories = () => {
    axios.get(`http://localhost:8000/categories`).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setCategories(data);
      }
    });
  };

  const addProduct = (product) => {
    if (productsForOrder.includes(product)) {
      const rest = productsForOrder.filter((pr) => pr.id !== product.id);
      setProductsForOrder([...rest]);
    } else {
      setProductsForOrder([...productsForOrder, product]);
    }
  };

  const appearOrderModal = () => setShowOrderModal(!showOrderModal);

  return (
    <Container>
      <Row
        className="justify-content-md-center"
        style={{ marginBottom: "1vh" }}
      >
        <Col md="auto">
          <h4>Choose a product</h4>
        </Col>
      </Row>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>Want it?</th>
            <th>
              Name
              <Form.Control
                type="text"
                value={name}
                placeholder="Type name you looking for"
                onChange={(e) => setName(e.target.value)}
              />
            </th>
            <th>Description</th>
            <th>Price (PLN)</th>
            <th>Weight (kg)</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(0, productsToShow).map((pr) => {
            return pr.name.includes(name) ? (
              <tr key={`${pr.id}-${pr.name}`}>
                <td>
                  <Form.Check onClick={() => addProduct(pr)} inline />
                </td>
                <td>{pr.name}</td>
                <td>{pr.description}</td>
                <td>{pr.price.toFixed(2)}</td>
                <td>{pr.weight.toFixed(2)}</td>
                <td>
                  {categories.length > 0
                    ? categories.find((ct) => ct.id === pr.category_id).name
                    : null}
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
      </Table>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button
            onClick={() => setProductsToShow(productsToShow - 10)}
            disabled={productsToShow === 10 ? true : false}
          >
            Collapse
          </Button>
        </Col>

        <Col md="auto">
          <Button
            onClick={() => setProductsToShow(productsToShow + 10)}
            disabled={
              products.length > 10 && productsToShow < products.length
                ? false
                : true
            }
          >
            Load more
          </Button>
        </Col>
      </Row>
      <OrderDetails products={productsForOrder} />
      <Row className="justify-content-md-center" style={{ marginTop: "1vh" }}>
        <Col md="auto">
          <Button
            variant="success"
            disabled={productsForOrder.length === 0}
            onClick={appearOrderModal}
          >
            Order now
          </Button>
        </Col>
      </Row>
      <NewOrderModal
        products={productsForOrder}
        show={showOrderModal}
        onShow={appearOrderModal}
      />
    </Container>
  );
}
