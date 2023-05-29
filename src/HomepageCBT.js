import "./App.css";
import image from "./images/cbt.jpg";
import { Container, Row, Col } from 'react-bootstrap';
import Header from "./Header";

function HomepageCBT() {
  return (
    <div className="pt-5 pb-5" style={{backgroundColor:"#ddf7e3"}}>
      <Container>
      <Row>
        <Col lg={4} className="my-auto">
          <div>
            <h1 style={{color:"#286029"}}>Computer Based Testing</h1>
            <p>Systematic & automated testing environment for learner's evaluation.</p>
            <ul>
                <li>Automated Evaluation Platform</li>
                <li>Technology-Enabled Assessments</li>
                <li>Objective Assessment Tools</li>
                <li>Data-driven Performance Analysis</li>
                <li>Efficient Testing Environment</li>
                <li>Technology-Enabled Assessments</li>
                <li>Instant Feedback and Results</li>
                <li>Computerized Testing System</li>
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
  );
}

export default HomepageCBT;
