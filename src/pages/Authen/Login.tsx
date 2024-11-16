import Slide from "./components/carousel";
import Navbar from "../../components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Form from "./components/form";

export default function Login() {
  return (
    <>
      <Navbar></Navbar>
      <Container fluid className="m-0 p-0" style={{ height: "80%" }}>
        <Row className="h-100">
          <Col md={5} className="h-100">
            <Slide></Slide>
          </Col>
          <Col md={7} className="h-100">
            <Form></Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
