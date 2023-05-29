import "./App.css";
import image from "./images/ils-img.jpg";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";

function HomepageILS() {
  return (
    <div className="pt-5 pb-5" >
      <Container>
        <Row>
          <Col lg={8}>
            <div>
              <img src={image} width={"100%"} alt="Your Picture" />
            </div>
          </Col>
          <Col lg={4} className="my-auto">
            <div>
              <h1 style={{color:"#286029"}}>Interactive Learning Sessions</h1>
              <p>
                Maximizing the learner's interaction through computer assisted
                learning.
              </p>
              <ul>
                <li>Engaging Interactive Sessions</li>
                <li>Computer-Assisted Learning</li>
                <li>Active Participation in Learning</li>
                <li>Personalized Learning Pathways</li>
                <li>Collaborative Online Activities</li>
                <li>Real-time Feedback and Interaction</li>
                <li>Immersive Learning Experience</li>
                <li>Interactive Assessments</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomepageILS;
