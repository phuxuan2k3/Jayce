import { Card, Col, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function IndividualIntervalsExample() {
  const intervalTime = 1000;
  const text = [
    "Các nhà triết học chỉ giải thích thế giới bằng các phương thức khác nhau, vấn đề là ở chỗ thay đổi thế giới.",
    "Khoa học cho chúng ta tri thức, nhưng chỉ triết học mới có thể cho chúng ta sự thông thái.",
    "Tính gàn dở của các nhà triết gia mọi thời đại là phủ nhận điều tồn tại và giải thích điều không tồn tại.",
  ];
  return (
    <Carousel className="h-100 mb-5">
      {text.map((item, index) => (
        <Carousel.Item key={index} interval={intervalTime}>
          <Card className="">
            <Card.Body
              className=" d-flex flex-column justify-content-center align-items-center"
              style={{ height: "90vh", backgroundColor: "#D5EEF1" }}
            >
              <div className="w-75 display-5">{item}</div>
              <Row className="w-100">
                <Col></Col>
                <Col>
                  <h3 className="">Phú Xuân</h3>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
      {/* <Carousel.Item interval={interval}>
        <Card className="">
          <Card.Body
            className=" d-flex flex-column justify-content-center align-items-center"
            style={{ height: "90vh", backgroundColor: "#D5EEF1" }}
          >
            <div className="w-75 display-5">
              Các nhà triết học chỉ giải thích thế giới bằng các phương thức
              khác nhau, vấn đề là ở chỗ thay đổi thế giới.
            </div>
            <Row className="w-100">
              <Col></Col>
              <Col>
                <h3 className="">Phú Xuân</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item className="">
        <Card className="">
          <Card.Body
            className=" d-flex flex-column justify-content-center align-items-center"
            style={{ height: "90vh", backgroundColor: "#D5EEF1" }}
          >
            <div className="w-75 display-5">
              Khoa học cho chúng ta tri thức, nhưng chỉ triết học mới có thể cho
              chúng ta sự thông thái.
            </div>
            <Row className="w-100">
              <Col></Col>
              <Col>
                <h3 className="">Phú Xuân</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item className="">
        <Card className="">
          <Card.Body
            className=" d-flex flex-column justify-content-center align-items-center"
            style={{ height: "90vh", backgroundColor: "#D5EEF1" }}
          >
            <div className="w-75 display-5">
              Tính gàn dở của các nhà triết gia mọi thời đại là phủ nhận điều
              tồn tại và giải thích điều không tồn tại.
            </div>
            <Row className="w-100">
              <Col></Col>
              <Col>
                <h3 className="">Phú Xuân</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default IndividualIntervalsExample;
