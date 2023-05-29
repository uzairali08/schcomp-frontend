import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import image1 from "./images/ssl.png";
import image3 from "./images/cbt.png";
import image2 from "./images/il.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function CourseMenu() {
  const params = useParams();

  //get learner id from localstorage
  const user = JSON.parse(localStorage.getItem("user-info"));
  const learnersId = user ? user.id : "";

  // useEffect(() => {
  //   async function fetchMarks() {
  //     let result = await fetch("http://localhost:8000/api/getquizmarks/" + params.id);
  //     result = await result.json();
  //     alert(result); // Display the result using alert
  //     console.warn(result);
  //   }

  //   fetchMarks();
  // }, []);

  const [coursesId, setCoursesId] = useState(params.coursesId);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [obtainedMarks, setObtainedMarks] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const formData = new FormData();
      formData.append("learnersId", learnersId);
      formData.append("coursesId", coursesId);

      try {
        const result = await fetch("http://localhost:8000/api/getquizmarks", {
          method: "POST",
          body: formData,
        });

        const responseData = await result.json();
        console.warn(responseData);
        setData(responseData);
        setStatus(responseData.status);
        setObtainedMarks(responseData.obtainedMarks);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
    }
  }, [data]);



  // get the progress of interactive learning data from backend
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      const formData = new FormData();
      formData.append("learnerId", learnersId);
      formData.append("courseId", coursesId);

      try {
        let result = await fetch("http://localhost:8000/api/getprogress", {
          method: "POST",
          body: formData,
        });
        result = await result.json();
        console.warn("this is console: " + result);
        setPercentage(result.percentage);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMyAPI();
  }, []);




  async function insertprogress() {

    const formData = new FormData();
    formData.append('courseId', coursesId);
    formData.append('learnerId', learnersId);

    //fetch objective data
    let result = await fetch("http://localhost:8000/api/progresstable", {
      method: "POST",
      body: formData
    });
    result = await result.json();
  }



  return (
    <div className="pb-5" style={{ backgroundColor: "#ddf7e3" }}>
      <Navbar />
      <div className="text-center pt-5">
        <h1 className="text-uppercase text-white col-sm-10 offset-sm-1 mb-0" style={{ backgroundColor: "#286029" }}>Course Menu</h1>
      </div>
      <div className="col-sm-10 offset-sm-1 ps-4 pb-5 pt-5 bg-white">
        {/* <Card className="cardBox w-25">
          <Card.Img variant="top" src={image3} style={{ width: "100px" }} />
          <Card.Body>
            <Card.Title>
              <h3>View Course Content</h3>
            </Card.Title>
            <Card.Text>
              <p>
                Course content will display here
              </p>
            </Card.Text>
            <Link to={"/QuranicSubjects/Content/" + params.coursesId} className="cardLink">View Content</Link>
          </Card.Body>
        </Card> */}
        <div className="row">
          <div className="col-1"></div>
          <div className="col">
            <Card style={{ backgroundColor: "#ddf7e3", border: "2px solid #286029", height: "220px" }}>
              <Card.Body className="pt-5 pb-5">
                <Card.Title className="text-center" style={{ color: "#286029" }}>Interactive Learning</Card.Title>
                <Card.Text>
                  Start the interactive learning session to gain knowledge
                  {percentage === null ? (
                    <></>
                  ) : (
                    <p>Your Progress is: {percentage}%</p>
                  )}

                </Card.Text>
                <br></br>
                <div className="text-center">
                  <Link className="courseMenuBtns" to={"/InteractiveLearningSession/" + params.coursesId} onClick={insertprogress}>Start Learning</Link>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card style={{ backgroundColor: "#ddf7e3", border: "2px solid #286029", height: "220px" }}>
              <Card.Body className="pt-5 pb-5">
                <Card.Title className="text-center" style={{ color: "#286029" }}>Practice Test</Card.Title>
                <Card.Text>
                  Practice your ability before going to graded test.
                </Card.Text>
                <br></br>
                <div className="text-center">
                  <Link className="courseMenuBtns" to={"/PracticeTest/" + params.coursesId}>Start Test</Link>
                </div>
              </Card.Body>
            </Card>
          </div>


          <div className="col">
            {percentage === 100 ? (
              <Card style={{ backgroundColor: "#ddf7e3", border: "2px solid #286029", height: "220px" }}>
                <Card.Body className="pt-5 pb-5">
                  <Card.Title className="text-center" style={{ color: "#286029" }}>Graded Test</Card.Title>
                  <Card.Text>
                    Test you ability.
                    {status === "Attempted" ? (
                      <p>Already Attempted<br /> Your Quiz Marks are: {obtainedMarks}</p>
                    ) : (
                      <p>Remember this is only 1 time test.</p>
                    )}
                  </Card.Text>
                  {status === "Attempted" ? (
                    <></>
                  ) : (
                    <div className="text-center">
                      <Link className="courseMenuBtns" to={"/Quizz/" + params.coursesId}>
                        Start Test
                      </Link>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ) : (
              <></>
            )}
          </div>
          <div className="col-1"></div>
        </div>



        <br></br>

        <div className="row">
          <div className="col-2"></div>
          <div className="col">
            {percentage === 100 ? (
              <Card style={{ backgroundColor: "#ddf7e3", border: "2px solid #286029", height: "220px" }}>
                <Card.Body className="pt-5 pb-5">
                  <Card.Title className="text-center" style={{ color: "#286029" }}>Peer Review Assessment</Card.Title>
                  <Card.Text>
                    More descriptive test. Remember this is onlt 1 time test.
                  </Card.Text>
                  <div className="text-center">
                    <Link className="courseMenuBtns" to={"/PeerReviewAssessment/" + params.coursesId}>Start Test</Link>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <></>
            )}
          </div>
          <div className="col">
            {percentage === 100 ? (
              <Card style={{ backgroundColor: "#ddf7e3", border: "2px solid #286029", height: "220px" }}>
                <Card.Body className="pt-5 pb-5">
                  <Card.Title className="text-center" style={{ color: "#286029" }}>Result</Card.Title>
                  <Card.Text>
                    View your grades.
                  </Card.Text>
                  <div className="text-center">
                    <Link className="courseMenuBtns" to={"/Result/" + params.coursesId}>Start Test</Link>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <></>
            )}
          </div>
          <div className="col-2"></div>
        </div>

        {/* <Card className="cardBox w-25">
          <Card.Img variant="top" src={image1} style={{ width: "100px" }} />
          <Card.Body>
            <Card.Title>
              <h3>Interactive Learning Session</h3>
            </Card.Title>
            <Card.Text>
              <p>Interactive Learning Session will display here</p>
            </Card.Text>
            <Link
              to={"/InteractiveLearningSession/" + params.coursesId}
              className="cardLink"
            >
              Start Interactive Learning
            </Link>
          </Card.Body>
        </Card> */}

        {/* <Card className="cardBox w-25">
          <Card.Img variant="top" src={image3} style={{ width: "100px" }} />
          <Card.Body>
            <Card.Title>
              <h3>Take Practice Test</h3>
            </Card.Title>
            <Card.Text>
              <p>Practice test display here.</p>
            </Card.Text>
            <Link to={"/PracticeTest/" + params.coursesId} className="cardLink">
              Take Test
            </Link>
          </Card.Body>
        </Card> */}

        {/* <Card className="cardBox w-25">
          <Card.Img variant="top" src={image3} style={{ width: "100px" }} />
          <Card.Body>
            <Card.Title>
              <h3>Take Graded Test</h3>
            </Card.Title>
            <Card.Text>
              {status === "Attempted" ? (
                <p>Your Quiz Marks are: {obtainedMarks}</p>
              ) : (
                <p>You can attempt the test 1 time</p>
              )}
            </Card.Text>
            {status === "Attempted" ? (
              <></>
            ) : (
              <Link to={"/Quizz/" + params.coursesId} className="cardLink">
                Take Test
              </Link>
            )}
          </Card.Body>
        </Card> */}

        {/* <Card className="cardBox w-25">
          <Card.Img variant="top" src={image2} style={{ width: "100px" }} />
          <Card.Body>
            <Card.Title>
              <h3>Subjective Test</h3>
            </Card.Title>
            <Card.Text>
              <p>Subjetive Test will display here</p>
            </Card.Text>
            <Link
              to={"/PeerReviewAssessment/" + params.coursesId}
              className="cardLink"
            >
              Take Test
            </Link>
          </Card.Body>
        </Card> */}
      </div>
    </div>
  );
}

export default CourseMenu;