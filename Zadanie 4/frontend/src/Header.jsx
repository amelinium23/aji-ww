import React from "react";
import { Container } from "react-bootstrap";

export default function Header({ text }) {
  return (
    <Container>
      <h1>{text}</h1>
    </Container>
  );
}
