import courses from "./images/courses-counter.png";
import scholars from "./images/scholars-counter.png";
import learners from "./images/learners-counter.png";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import { useEffect, useState } from "react";

function HomepageCounter() {
  const maxLearnerCount = 100;
  const maxScholarCount = 50;
  const maxCourseCount = 20;

  const [learnerCount, setLearnerCount] = useState(0);
  const [scholarCount, setScholarCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const learnerTimer = setInterval(() => {
      setLearnerCount((prevCount) =>
        prevCount === maxLearnerCount ? maxLearnerCount : prevCount + 1
      );
    }, 100);

    const scholarTimer = setInterval(() => {
      setScholarCount((prevCount) =>
        prevCount === maxScholarCount ? maxScholarCount : prevCount + 1
      );
    }, 100);

    if (courseCount !== maxCourseCount) {
      const courseTimer = setInterval(() => {
        setCourseCount((prevCount) =>
          prevCount === maxCourseCount ? maxCourseCount : prevCount + 1
        );
      }, 100);

      return () => {
        clearInterval(learnerTimer);
        clearInterval(scholarTimer);
        clearInterval(courseTimer);
      };
    } else {
      return () => {
        clearInterval(learnerTimer);
        clearInterval(scholarTimer);
      };
    }
  }, [maxLearnerCount, maxScholarCount, maxCourseCount, courseCount]);


  //Getting values from database
  // const [learnerCount, setLearnerCount] = useState(0);
  // const [scholarCount, setScholarCount] = useState(0);
  // const [courseCount, setCourseCount] = useState(0);

  // useEffect(() => {
  //   fetchCounts();
  // }, []);

  // const fetchCounts = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/totalCount");
  //     const data = await response.json();

  //     const { scholarCount, learnerCount, subjectCount } = data;

  //     setScholarCount(scholarCount);
  //     setLearnerCount(learnerCount);
  //     setCourseCount(subjectCount);
  //   } catch (error) {
  //     console.error("Error fetching counts:", error);
  //   }
  // };

  // const maxLearnerCount = learnerCount;
  // const maxScholarCount = scholarCount;
  // const maxCourseCount = courseCount;

  // useEffect(() => {
  //   const learnerTimer = setInterval(() => {
  //     setLearnerCount((prevCount) =>
  //       prevCount === maxLearnerCount ? maxLearnerCount : prevCount + 1
  //     );
  //   }, 100);

  //   const scholarTimer = setInterval(() => {
  //     setScholarCount((prevCount) =>
  //       prevCount === maxScholarCount ? maxScholarCount : prevCount + 1
  //     );
  //   }, 100);

  //   if (courseCount !== maxCourseCount) {
  //     const courseTimer = setInterval(() => {
  //       setCourseCount((prevCount) =>
  //         prevCount === maxCourseCount ? maxCourseCount : prevCount + 1
  //       );
  //     }, 100);

  //     return () => {
  //       clearInterval(learnerTimer);
  //       clearInterval(scholarTimer);
  //       clearInterval(courseTimer);
  //     };
  //   } else {
  //     return () => {
  //       clearInterval(learnerTimer);
  //       clearInterval(scholarTimer);
  //     };
  //   }
  // }, [maxLearnerCount, maxScholarCount, maxCourseCount, courseCount]);

  return (
    <div className="pt-4 pb-4" style={{backgroundColor:"#ddf7e3"}}>
      <Container>
        <Row>
          <Col className="text-center">
          <img src={scholars} width={"20%"} />
            <h2>Scholars</h2>
            <h1>{scholarCount}</h1>
          </Col>
          <Col className="text-center">
          <img src={courses} width={"20%"} />
            <h2>Courses</h2>
            <h1>{courseCount}</h1>
          </Col>
          <Col className="text-center">
          <img src={learners} width={"20%"} />
            <h2>Learners</h2>
            <h1>{learnerCount}</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomepageCounter;
