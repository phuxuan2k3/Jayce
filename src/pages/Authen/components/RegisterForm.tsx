import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../../assets/css/button.css";
import "../../../assets/css/input.css";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <Container fluid className="h-100 text-center bg-white">
      <Row className="align-items-center h-100">
        <Row>
          <h4>Welcome to SkillSharp</h4>
        </Row>
        <Row className="justify-content-center">
          <Col md={4}>
            <Link to="/login">
              <Button variant="minor" className=" w-100 m-1">
                Login
              </Button>{" "}
            </Link>
          </Col>{" "}
          <Col md={4}>
            <Button variant="main" className="w-100 m-1 disabled">
              Register
            </Button>{" "}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Button variant="gradient" className="w-100 m-1">
              <FontAwesomeIcon icon={faGoogle} color="red" /> Sign up with
              Google
            </Button>{" "}
          </Col>{" "}
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Button variant="gradient" className="w-100 m-1">
              Sign up with University
            </Button>{" "}
          </Col>{" "}
        </Row>
        <Row>
          <Col>
            <hr></hr>
          </Col>
          or
          <Col>
            <hr></hr>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control
                  className="border-gradient rounded"
                  type="email"
                  placeholder="Email address"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Button variant="main" className="w-100 m-1">
              Sign up <FontAwesomeIcon icon={faArrowRight} />
            </Button>{" "}
          </Col>{" "}
        </Row>
        <span>
          By creating an account, you agree to our{" "}
          <a href="#">terms of service and privacy policy.</a>
        </span>
      </Row>
    </Container>
  );
}
