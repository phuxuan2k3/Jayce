import Slide from "./components/Slide";
import Navbar from "../../components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Form from "./components/RegisterForm";

export default function Register() {
  return (
    <>
      <Navbar></Navbar>
      <Container fluid className="m-0 p-0" style={{ height: "80%" }}>
        <Row className="h-100">
          <Col md={5} className="h-100 mb-5">
            <Slide></Slide>
            <Row className="mb-5"> </Row>
          </Col>
          <Col md={7} className="h-100 mt-4">
            <Form></Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
