import React from "react";
import { Form, Button, Table, Row, Col, Card } from "react-bootstrap";

const IssueReturn = () => {
  return (
    <div>
      <h3 className="mb-4">🔄 Book Issue / Return Management</h3>

      <Card className="p-4 mb-4 shadow-sm">
        <h5>📘 Issue a Book</h5>
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Student ID</Form.Label>
                <Form.Control type="text" placeholder="Enter student ID" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Book ISBN</Form.Label>
                <Form.Control type="text" placeholder="Enter book ISBN" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Issue Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary">Issue Book</Button>
        </Form>
      </Card>

      <Card className="p-4 mb-4 shadow-sm">
        <h5>📦 Return a Book</h5>
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Student ID</Form.Label>
                <Form.Control type="text" placeholder="Enter student ID" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Book ISBN</Form.Label>
                <Form.Control type="text" placeholder="Enter book ISBN" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Return Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success">Return Book</Button>
        </Form>
      </Card>

      <Card className="p-4 shadow-sm">
        <h5>📋 Issued Books Log</h5>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Book ISBN</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with dynamic data */}
            <tr>
              <td>STD001</td>
              <td>9781234567897</td>
              <td>2025-06-20</td>
              <td>2025-06-25</td>
              <td>Returned</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default IssueReturn;
