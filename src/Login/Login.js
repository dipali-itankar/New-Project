import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCog,
  FaSignInAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("Admin");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);

    setTimeout(() => {
      // Redirect based on user type
      switch (userType) {
        case "Admin":
          navigate("/admin-dashboard");
          break;
        case "Principal":
          navigate("/principal-dashboard");
          break;
        case "Teacher":
          navigate("/Dashboard");
          break;
        case "Accountant":
          navigate("/accountant-dashboard");
          break;
        case "Librarian":
          navigate("/Librarymanagement");
          break;
        case "Parent":
          navigate("/parent-dashboard");
          break;
        case "Student":
          navigate("/StudentDashboard");
          break;
        
      }
    }, 1000);
  };

  return (
    <Container fluid className="login-container">
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Login</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Successfully Logged In!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Row className="min-vh-100">
        <Col
          md={6}
          className="welcome-section d-flex flex-column justify-content-center align-items-center text-white text-center p-5"
        >
          <FaUserCircle className="welcome-icon mb-3" />
          <h2 className="fw-bold">Welcome User!</h2>
          <p className="welcome-subtext">Empowering Education with Technology</p>
        </Col>

        <Col md={6} className="d-flex justify-content-center align-items-center p-4">
          <Card className="login-card p-4 shadow-lg">
            <div className="text-center mb-4">
              <FaSignInAlt size={40} className="text-primary mb-2" />
              <h3 className="text-primary">School Management System</h3>
              <h5 className="text-dark">Login Page</h5>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>User name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Enter username" required />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaLock /></InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    required
                  />
                  <Button variant="outline-secondary" onClick={togglePassword}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>User Type</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaCog /></InputGroup.Text>
                  <Form.Select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="scrollable-select"
                  >
                    <option>Admin</option>
                    <option>Principal</option>
                    <option>Teacher</option>
                    <option>Accountant</option>
                    <option>Librarian</option>
                    <option>Parent</option>
                    <option>Student</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="primary" size="md">
                  LOGIN
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;