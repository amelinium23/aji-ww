import React from "react";
import axios from "axios";
import { Container, Dropdown, Table, Button, Row, Col } from "react-bootstrap";
import AddProductModal from "./AddProductModal.jsx";
import EditProductModal from "./EditProductModal.jsx";

export default function SellerView() {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [statuses, setStatuses] = React.useState([]);
  const [productsToShow, setProductsToShow] = React.useState(10);
  const [ordersToShow, setOrdersToShow] = React.useState(10);
  const [showAddProduct, setShowAddProduct] = React.useState(false);
  const [showEditProduct, setShowEditProduct] = React.useState(false);
  const [productToEdit, setProductToEdit] = React.useState({
    name: "",
    price: 0.0,
    category_id: 1,
    description: "",
    weight: 0.0,
  });

  React.useEffect(() => {
    const fetchData = async () => {
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
      axios.get(`http://localhost:8000/status`).then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setStatuses(data);
        }
      });
    };
    fetchOrders();
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchOrders = () => {
    axios.get(`http://localhost:8000/orders`).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setOrders(data);
      }
    });
  };

  const fetchProducts = () => {
    axios.get(`http://localhost:8000/products`).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setProducts(data);
      }
    });
  };

  const showAddProductModal = () => setShowAddProduct(!showAddProduct);
  const showEditProductModal = () => setShowEditProduct(!showEditProduct);

  const changeStatus = (order, status) => {
    axios.put(
      `http://localhost:8000/orders/${order.id}/stan`,
      { status: status.id, approval_date: new Date().toLocaleDateString() },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    fetchOrders();
  };

  const editProduct = (product) => {
    setProductToEdit(product);
    showEditProductModal();
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
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price (PLN)</th>
            <th>Weight (kg)</th>
            <th>Category</th>
            <th>Edit product</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 && categories.length > 0
            ? products.slice(0, productsToShow).map((pr) => {
                return (
                  <tr key={`${pr.id}-${pr.name}`}>
                    <td>{pr.id}</td>
                    <td>{pr.name}</td>
                    <td>{pr.description}</td>
                    <td>{pr.price.toFixed(2)}</td>
                    <td>{pr.weight.toFixed(2)}</td>
                    <td>
                      {categories.length > 0
                        ? categories.find((ct) => ct.id === pr.category_id).name
                        : pr.category_id}
                    </td>
                    <td>
                      <Button variant="success" onClick={() => editProduct(pr)}>
                        Edit product
                      </Button>
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
          <Button
            variant="success outline-secondary"
            onClick={showAddProductModal}
          >
            Add new product
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
      <h4>Orders</h4>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>State</th>
            <th>Approval Date</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Product</th>
            <th>Change stage of order</th>
          </tr>
        </thead>
        <tbody style={{ alignContent: "center" }}>
          {orders
            ? orders.slice(0, ordersToShow).map((or) => {
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
                    <td>
                      {or.approval_date === null
                        ? "Unapproved"
                        : or.approval_date}
                    </td>
                    <td>{or.username}</td>
                    <td>{or.email}</td>
                    <td>{or.phoneNumber === null ? "-" : or.phoneNumber}</td>
                    <td>
                      {products.length > 0
                        ? products.find((pr) => pr.id === or.product_id).name
                        : or.product_id}
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success">
                          Change state
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {statuses.length > 0 && or.state >= 2
                            ? statuses
                                .filter((st) => st.id !== 1 && st.id !== 2)
                                .map((st) => {
                                  return (
                                    <Dropdown.Item
                                      key={`${st.id}-${st.name}`}
                                      onClick={() => changeStatus(or, st)}
                                    >
                                      {changeStateString(st)}
                                    </Dropdown.Item>
                                  );
                                })
                            : statuses.map((st) => {
                                return (
                                  <Dropdown.Item
                                    key={`${st.id}-${st.name}`}
                                    onClick={() => changeStatus(or, st)}
                                  >
                                    {changeStateString(st)}
                                  </Dropdown.Item>
                                );
                              })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      <Row
        className="justify-content-md-center"
        style={{ marginBottom: "1vh" }}
      >
        <Col md="auto">
          <Button
            onClick={() => setOrdersToShow(ordersToShow - 10)}
            disabled={ordersToShow === 10 ? true : false}
          >
            Collapse
          </Button>
        </Col>
        <Col md="auto">
          <Button
            onClick={() => setOrdersToShow(ordersToShow + 10)}
            disabled={
              orders.length > 10 && ordersToShow < orders.length ? false : true
            }
          >
            Load more
          </Button>
        </Col>
      </Row>
      <AddProductModal
        show={showAddProduct}
        onShow={showAddProductModal}
        categories={categories}
        fetchProducts={fetchProducts}
      />
      <EditProductModal
        show={showEditProduct}
        onShow={showEditProductModal}
        fetchProducts={fetchProducts}
        categories={categories}
        product={productToEdit}
      />
    </Container>
  );
}
