import React from "react";
import axios from "axios";
import { Container, Table, Row, Col, Button } from "react-bootstrap";

export default function SellerView() {
  const [productsToShow, setProductsToShow] = React.useState(10);
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

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

  return (
    <Container>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>Want it?</th>
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
                <td></td>
                <td>{pr.name}</td>
                <td>{pr.description}</td>
                <td>{pr.price}</td>
                <td>{pr.weight}</td>
                <td>
                  {categories.length > 0
                    ? categories.find((ct) => ct.id === pr.category_id).name
                    : null}
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
            Collapse
          </Button>
        </Col>
        <Col md="auto">
          <Button
            onClick={() => setProductsToShow(productsToShow + 10)}
            disabled={products.length > 10 ? false : true}
          >
            Load more
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
