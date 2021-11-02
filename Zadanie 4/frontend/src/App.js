import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import ProductTable from "./ProductTable";

export default function App() {
  return (
    <Container>
      <Header text="Katalog produktów" />
      <ProductTable />
    </Container>
  );
}
