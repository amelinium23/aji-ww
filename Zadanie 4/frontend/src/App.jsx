import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Header from "./Header.jsx";
import ProductTable from "./ProductTable.jsx";

export default function App() {
  const [isViewChanged, setIsViewChanged] = React.useState(false);

  return (
    <Container fluid>
      <Header text="Shop" />
      <ProductTable whichView={isViewChanged} />
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button
            style={{ marginTop: "1vh" }}
            variant="dark"
            onClick={() => setIsViewChanged(!isViewChanged)}
          >
            Change view
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
