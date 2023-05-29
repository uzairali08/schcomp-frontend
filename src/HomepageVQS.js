import "./App.css";
import image from "./images/vqs.png";
import { Container, Row, Col } from 'react-bootstrap';
import Header from "./Header";

function HomepageVQS() {
  return (
    <>
    <div className="pt-5 pb-5" style={{backgroundColor:"#ddf7e3"}}>
      <Container>
      <Row>
        <Col lg={4} className="my-auto">
          <div>
            <h1 style={{color:"#286029"}}>Visualization of Quranic Subjects</h1>
            <p>Representation of key concepts in the Quran-il-Hakeem to enhance learner's experience.</p>
            <ul>
                <li>Mind Maps for Connections</li>
                <li>Simplify with Infographics</li>
                <li>Conceptual Diagrams for Understanding</li>
                <li>Symbolic Art for Emotional Connection</li>
                <li>Timeline Illustrations for History</li>
                <li>Quran + Visuals = Enhanced Learning</li>
                <li>Text + Visuals = Comprehensive Learning</li>
            </ul>
          </div>
        </Col>
        <Col lg={8}>
          <div>
            <img src={image} width={"100%"} alt="Your Picture" />
          </div>
        </Col>
      </Row>
    </Container>
    </div>
    </>
  );
}

export default HomepageVQS;
