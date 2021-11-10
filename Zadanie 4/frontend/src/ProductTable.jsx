import React from "react";
import axios from "axios";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";

export default function ProductTable({ whichView }) {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [productsToShow, setProductsToShow] = React.useState(10);
  const [productsForOrder, setProductForOrder] = React.useState([]);

  React.useEffect(() => {
    const fetchData = () =>
      axios.get(`http://localhost:8000/products`).then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setProducts(data);
        }
      });
    axios.get(`http://localhost:8000/categories`).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setCategories(data);
      }
    });
    fetchData();
  }, []);

  const checkInArray = (product) => {
    if (productsForOrder.includes(product)) {
      const state = productsForOrder.filter((p) => p.id !== product.id);
      setProductForOrder([...state]);
    } else {
      setProductForOrder([...productsForOrder, product]);
    }
  };

  return (
    <Container>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(0, productsToShow).map((pr) => {
            return (
              <tr key={`${pr.id}-${pr.name}`}>
                <td>
                  <Form.Check
                    type="checkbox"
                    onClick={() => checkInArray(pr)}
                  />
                </td>
                <td>{pr.name}</td>
                <td>{pr.description}</td>
                <td>{pr.price}</td>
                <td>{pr.weight}</td>
                <td>
                  {categories.find((ct) => ct.id === pr.category_id).name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button
            onClick={() => setProductsToShow(productsToShow - 10)}
            disabled={productsToShow === 10 ? true : false}
          >
            Zwiń
          </Button>
        </Col>
        {whichView ? (
          <Col md="auto">
            <Button>Dodaj nowy produkt</Button>
          </Col>
        ) : null}
        <Col md="auto">
          <Button disabled={productsForOrder.length === 0}>Zamów</Button>
        </Col>
        <Col md="auto">
          <Button
            onClick={() => setProductsToShow(productsToShow + 10)}
            disabled={products.length > 10 ? false : true}
          >
            Wczytaj więcej
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
