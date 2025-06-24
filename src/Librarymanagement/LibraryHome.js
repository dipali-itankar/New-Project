import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const LibraryHome = () => {
  // Dummy data — you can replace with props or API data
  const totalBooks = 500;
  const booksAllotted = 120;
  const booksRemaining = totalBooks - booksAllotted;

  return (
    <div>
      <h3 className="mb-4">📘 Library Dashboard</h3>
      <Row className="g-1">
        <Col md={4}>
          <Card bg="primary" text="white" className="text-center p-3 shadow">
            <Card.Title>Total Books</Card.Title>
            <Card.Text style={{ fontSize: "1.8rem" }}>{totalBooks}</Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="warning" text="dark" className="text-center p-3 shadow">
            <Card.Title>Books Allotted</Card.Title>
            <Card.Text style={{ fontSize: "1.8rem" }}>{booksAllotted}</Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white" className="text-center p-3 shadow">
            <Card.Title>Books Available</Card.Title>
            <Card.Text style={{ fontSize: "1.8rem" }}>{booksRemaining}</Card.Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LibraryHome;
