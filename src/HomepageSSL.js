import "./App.css";
import image from "./images/Quran.jpg";
import { Container, Row, Col } from 'react-bootstrap';
import Header from "./Header";

function HomepageSSL() {
  return (
    <div className="pt-5 pb-5">
      <Container>
      <Row>
      <Col lg={8}>
          <div>
            <img src={image} width={"100%"} alt="Your Picture" />
          </div>
        </Col>
        <Col lg={4} className="my-auto">
          <div>
            <h1 style={{color:"#286029"}}>Subject Specific Learning</h1>
            <p>Learning the teaching of Quran-il-Hakeem about various real-life issues.</p>
            <ul>
                <li>Practical Guidance for Life</li>
                <li>Applying Quranic Principles</li>
                <li>Quranic Wisdom for Today</li>
                <li>Ethical Lessons from Quran</li>
                <li>Life Lessons from Quran</li>
                <li>Addressing Modern Issues</li>
                <li>Real-Life Relevance of Quran</li>
                <li>Quranic Solutions for Challenges</li>
                <li>Quran as a Guide</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default HomepageSSL;
