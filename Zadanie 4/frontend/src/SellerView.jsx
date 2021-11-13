import React from "react";
import axios from "axios";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";

export default function SellerView() {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [statuses, setStatuses] = React.useState([]);
  const [productsToShow, setProductsToShow] = React.useState(10);
  const [productsToEdit, setProductToEdit] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      axios.get(`http://localhost:8000/products`).then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setProducts(data);
        }
      });
      axios.get(`http://localhost:8000/orders`).then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setOrders(data);
        }
      });
      axios.get(`http://localhost:8000/categories`).then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setCategories(data);
        }
      });
      axios.get(`http://localhost:8000/status`).then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setStatuses(data);
        }
      });
    };
    fetchData();
  }, []);

  const checkInArray = (product) => {
    if (productsToEdit.includes(product)) {
      const state = productsToEdit.filter((p) => p.id !== product.id);
      setProductToEdit([...state]);
    } else {
      setProductToEdit([...productsToEdit, product]);
    }
  };

  const approveOrder = (order) => {
    axios.put(
      `http://localhost:8000/orders/${order.id}/stan`,
      { status: 2 },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    axios.get(`http://localhost:8000/orders`).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setOrders(data);
      }
    });
  };

  const changeStateString = (state) => {
    const name = state.name.toLowerCase();
    return name.replace(name.charAt(0), name.charAt(0).toUpperCase());
  };

  return (
    <Container>
      <h4>Products</h4>
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
          {products && categories
            ? products.slice(0, productsToShow).map((pr) => {
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
                      {categories.length > 0
                        ? categories.find((ct) => ct.id === pr.category_id).name
                        : pr.category_id}
                    </td>
                  </tr>
                );
              })
            : null}
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
          <Button variant="success outline-secondary">Add new product</Button>
        </Col>
        <Col md="auto">
          <Button variant="info">Edit product</Button>
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
      <Container>
        <h4>Orders</h4>
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>State</th>
              <th>Approval Date</th>
              <th>Username</th>
              <th>Email</th>
              <th>Product</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {orders
              ? orders.map((or) => {
                  return (
                    <tr key={`${or.id}-${or.email}`}>
                      <td>{or.id}</td>
                      <td>
                        {statuses.length > 0
                          ? changeStateString(
                              statuses.find((st) => or.state === st.id)
                            )
                          : or.state}
                      </td>
                      <td>{new Date(or.approval_date).toLocaleDateString()}</td>
                      <td>{or.username}</td>
                      <td>{or.email}</td>
                      <td>
                        {products.length > 0
                          ? products.find((pr) => pr.id === or.product_id).name
                          : or.product_id}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => approveOrder(or)}
                        >
                          Approve
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}
