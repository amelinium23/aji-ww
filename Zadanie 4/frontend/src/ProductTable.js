import React from "react";
import axios from "axios";
import { Container, Table, Button, Row, Col } from "react-bootstrap";

export default function ProductTable() {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [productsToShow, setProductsToShow] = React.useState(10);

  React.useEffect(() => {
    const fetchData = () =>
      axios.get(`http://localhost:8000/products`).then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setProducts(data);
          console.log(data);
        }
      });
    axios.get(`http://localhost:8000/categories`).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setCategories(data);
        console.log(data);
      }
    });
    fetchData();
  }, []);

  return (
    <Container>
      <Table striped hover bordered>
        <thead>
          <tr>
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
      <Row>
        <Col md={3}>
          <Button
            onClick={() => setProductsToShow(productsToShow - 10)}
            disabled={productsToShow === 10 ? true : false}
          >
            Zwiń
          </Button>
        </Col>
        <Col md={3}>
          <Button>Dodaj nowy produkt</Button>
        </Col>
        <Col md={6}>
          <Button
            className="button-style"
            onClick={() => setProductsToShow(productsToShow + 10)}
          >
            Wczytaj więcej
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
