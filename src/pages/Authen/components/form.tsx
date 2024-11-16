import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../../assets/css/button.css";
import "../../../assets/css/input.css";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LoginForm() {
  return (
    <Container fluid className="h-100 text-center bg-white">
      <Row className="align-items-center h-100">
        <Row>
          <h4>Welcome to SkillSharp</h4>
        </Row>
        <Row className="justify-content-center">
          <Col md={4}>
            <Button variant="main" className=" w-100 m-1">
              Login
            </Button>{" "}
          </Col>{" "}
          <Col md={4}>
            <Button variant="minor" className="w-100 m-1">
              Register
            </Button>{" "}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Button variant="gradient" className="w-100 m-1">
              <FontAwesomeIcon icon={faGoogle} color="red" /> Sign in with
              Google
            </Button>{" "}
          </Col>{" "}
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Button variant="gradient" className="w-100 m-1">
              Sign in with University
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

        <span>
          Forgot your password? <a href="#reset">Reset it here.</a>
        </span>
        <Row className="justify-content-center">
          <Col md={8}>
            <Button variant="main" className="w-100 m-1">
              Login <FontAwesomeIcon icon={faArrowRight} />
            </Button>{" "}
          </Col>{" "}
        </Row>
      </Row>
    </Container>
  );
}
