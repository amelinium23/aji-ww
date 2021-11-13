import React from "react";
import { Container, Nav } from "react-bootstrap";
import Header from "./Header.jsx";
import ClientView from "./ClientView.jsx";
import SellerView from "./SellerView.jsx";

export default function App() {
  const [activeKey, setActiveKey] = React.useState(1);

  return (
    <Container fluid>
      <Header text="Shop" />
      <Container>
        <Nav
          variant="tabs"
          fill
          defaultActiveKey="clientView"
          style={{ marginBottom: "1vh" }}
        >
          <Nav.Link eventKey="clientView" onClick={() => setActiveKey(1)}>
            Client View
          </Nav.Link>
          <Nav.Link eventKey="sellerView" onClick={() => setActiveKey(2)}>
            Seller View
          </Nav.Link>
        </Nav>
      </Container>
      <Container fluid>
        {activeKey === 1 ? <ClientView /> : <SellerView />}
      </Container>
    </Container>
  );
}
