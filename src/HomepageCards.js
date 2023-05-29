import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import image1 from "./images/ssl.png";
import image3 from "./images/cbt.png";
import image2 from "./images/il.png";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

function HomepageCard() {
  return (
    <>
    <div className="cardSection">
        <h1 className="text-uppercase">Our Services</h1>
      </div>
    <Row className="homepageCards px-3">
    <Col xs={11} md={6} lg={3} className="ms-auto ml-auto">
      <Card className="cardBox">
        <Card.Img variant="top" src={image3} style={{ width: "100px" }} />
        <Card.Body>
          <Card.Title>
            <h3>Visualization of Quranic Subjects</h3>
          </Card.Title>
          <Card.Text>
            <p>
              Representation of key concepts in the Quran-il-Hakeem to enhance learner's experience.
            </p>
          </Card.Text>
          <Link className="cardLink" to={`#vqs`}>Learn More</Link>
        </Card.Body>
      </Card>
      </Col>

      <Col xs={11} md={6} lg={3} className="ms-auto ml-auto">
      <Card className="cardBox">
        <Card.Img variant="top" src={image1} style={{ width: "100px" }} />
        <Card.Body>
          <Card.Title>
            <h3>Subject-Specific Learning</h3>
          </Card.Title>
          <Card.Text>
            <p>
              Learning the teaching of Quran-il-Hakeem about various real-life
              issues.
            </p>
          </Card.Text>
          <Link className="cardLink" to={`#ssl`}>Learn More</Link>
        </Card.Body>
      </Card>
      </Col>

      <Col xs={11} md={6} lg={3} className="ms-auto ml-auto">
      <Card className="cardBox">
        <Card.Img variant="top" src={image3} style={{ width: "100px" }} />
        <Card.Body>
          <Card.Title>
            <h3>Computer Based Testing</h3>
          </Card.Title>
          <Card.Text>
            <p>
              Systematic & automated testing environment for learner's
              evaluation.
            </p>
          </Card.Text>
          <Link className="cardLink" to={`#cbt`}>Learn More</Link>
        </Card.Body>
      </Card>
      </Col>

      <Col xs={11} md={6} lg={3} className="ms-auto ml-auto">
      <Card className="cardBox">
        <Card.Img variant="top" src={image2} style={{ width: "100px" }} />
        <Card.Body>
          <Card.Title>
            <h3>Interactive Learning Sessions</h3>
          </Card.Title>
          <Card.Text>
            <p>
              Maximizing the learner's interaction through computer assisted
              learning.
            </p>
          </Card.Text>
          <Link className="cardLink" to={`#ils`}>Learn More</Link>
        </Card.Body>
      </Card>
      </Col>
      
    </Row>
    </>
  );
}

export default HomepageCard;
