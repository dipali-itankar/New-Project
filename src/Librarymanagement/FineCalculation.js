import React from "react";
import { Form, Button, Table, Card, Row, Col } from "react-bootstrap";

const FineCalculation = () => {
  return (
    <div>
      <h3 className="mb-4">💰 Fine Calculation</h3>

      <Card className="p-4 mb-4 shadow-sm">
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
          <Button variant="danger">Calculate Fine</Button>
        </Form>
      </Card>

      <Card className="p-4 shadow-sm">
        <h5>📄 Fine Records</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Book ISBN</th>
              <th>Days Late</th>
              <th>Fine Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample row — replace with real data */}
            <tr>
              <td>STD001</td>
              <td>9781234567897</td>
              <td>3</td>
              <td>₹30</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default FineCalculation;
