import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Header from "./Header.jsx";
import ProductTable from "./ProductTable.jsx";

export default function App() {
  const [isViewChanged, setIsViewChanged] = React.useState(false);

  return (
    <Container>
      <Header text="Shop" />
      <ProductTable whichView={isViewChanged} />
      <Container>
        <Row>
          <Col md={12} className="container">
            <Button
              className="button-style"
              variant="dark"
              onClick={() => setIsViewChanged(!isViewChanged)}
            >
              Change view
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
