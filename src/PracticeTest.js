import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomAlert from "./CustomAlert";

function PracticeTest() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handle1 = () => {
    setShow1(!show1);
    setShow2(!show2);
  };

  const handle2 = () => {
    setShow2(!show2);
    setShow3(!show3);
  };

  const params = useParams();
  const submitButtonRef = useRef(null);

  //get learner id from localstorage
  const user = JSON.parse(localStorage.getItem("user-info"));
  const learnersId = user ? user.id : "";

  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  // const [subjectId, setSubjectId] = useState("1");
  // const [timeLeft, setTimeLeft] = useState(20);

  const [remainingTime, setRemainingTime] = useState(300);

  useEffect(() => {
    async function fetchQuestion() {
      let result = await fetch(
        "http://localhost:8000/api/getquizdata/" + params.id
      );
      result = await result.json();
      // setData(result);

      // Shuffle the questions array
      const shuffledQuestions = result.sort(() => 0.5 - Math.random());

      // Get the first 10 questions from the shuffled array
      const randomQuestions = shuffledQuestions.slice(0, 10);

      setData(randomQuestions);
    }

    fetchQuestion();
  }, []);

  useEffect(() => {
    let interval = null;
    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      // handleSubmit();
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    }
    return () => clearInterval(interval);
  }, [remainingTime]);

  const displayTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (event, question) => {
    const selectedOptionCopy = { ...selectedOption };
    selectedOptionCopy[question] = event.target.value;
    setSelectedOption(selectedOptionCopy);
  };

  const [intervalId, setIntervalId] = useState(null);

  // to save marks in databse ----->
  // const [coursesId, setCoursesId] = useState(params.id);
  // const [status] = useState("Attempted");
  // const [totalMarks] = useState(10);

  // async function quizmarks(obtainedMarks) {
  //     const formData = new FormData();
  //     formData.append("learnersId", learnersId);
  //     formData.append("coursesId", coursesId);
  //     formData.append("status", status);
  //     formData.append("totalMarks", totalMarks);
  //     formData.append("obtainedMarks", obtainedMarks);

  //     let response = await fetch("http://localhost:8000/api/quizmarks", {
  //         method: "POST",
  //         body: formData
  //     });
  // }

  const handleSubmit = async () => {
    let totalScore = 0;
    const results = data.map(({ correctOption, questionId }) => {
      const selected = selectedOption[questionId];
      const correct = correctOption;
      const isCorrect = selected === correct;
      if (isCorrect) {
        totalScore += 1;
      }
      return {
        questionId,
        selectedOption: selected,
        correctOption: correct,
        isCorrect,
      };
    });
    setScore(totalScore);
    setSubmitted(true);
    clearInterval(intervalId);
    setRemainingTime(0);

    handle2();
    // setObtainedMarks(totalScore);
    // await quizmarks(totalScore);
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const quesPerPage = 1;

  const temp = currentQuestion + 1;
  const startIndex = (temp - 1) * quesPerPage;
  const endIndex = startIndex + quesPerPage;
  const questionToShow = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (!(currentQuestion === data.length - 1)) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // alert("Questions Completed");
      setAlertMessage("Questions Completed");
      setShowAlert(true);
    }
  };
  const handlePreviousPage = () => {
    if (!(currentQuestion === 0)) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      // alert("No Previous Question");
      setAlertMessage("No Previous Question");
      setShowAlert(true);
    }
  };

  // const submitQuiz = () => {
  //     handleSubmit();
  //     clearInterval(timer);
  //   };

  const navigate = useNavigate();
  function courseMenu(){
    navigate('/CourseMenu/'+params.id);
  }
  function restartTest() {
    window.location.reload(false);
  }

  return (
    <>
    <CustomAlert message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
      <Navbar />
      <div className="quizPage">
        <div className="quizTitle col-sm-10 offset-sm-1">
          <h1>Practice Test (Objective)</h1>
        </div>
        {/* <div className="quizTimer">
        Time left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        <h3>Time remaining: {displayTime()} seconds</h3>
      </div> */}
        {show1 && (
          <>
            <div className="ilWelcomeScreen col-sm-10 offset-1">
              <h4>Welcome to Practice Test Screen</h4>
              <br />
              <h5>The instructions are as follow:</h5>
              <ul style={{ fontSize: "17px", fontWeight: "bold" }}>
                <li>Total Questions: 10</li>
                <li>Time Allowed: 05 Minutes</li>
                <li>There test is just for your practice</li>
                <li>There is no negative marking</li>
                <li>Click on start button to start the test</li>
              </ul>
              <br />
              <button className="ilNextBtn col-2 offset-5" onClick={handle1}>
                Start Learning
              </button>
            </div>
          </>
        )}

        {show2 && (
          <>
            {questionToShow.map((item) => (
              <div
                className="quizContainer offset-1 col-10"
                key={item.questionId}
              >
                <h3
                  style={{
                    fontSize: "17pt",
                    fontWeight: "bold",
                    float: "right",
                    color: "red",
                  }}
                >
                  Time Remaining: {displayTime()}
                </h3>
                <h2
                  className="offset-2"
                  style={{
                    textAlign: "center",
                    color: "#286029",
                    fontWeight: "bold",
                  }}
                >
                  Question {currentQuestion + 1} of {data.length}
                </h2>
                <hr />
                <h3
                  className="engSideText pt-3 pb-4"
                  style={{ color: "#286029" }}
                >
                  {item.questionEnglish}
                </h3>
                <input
                  type="radio"
                  style={{ float: "left", marginLeft: "15px" }}
                  name={item.questionId}
                  value={item.option1}
                  onChange={(event) =>
                    handleOptionSelect(event, item.questionId)
                  }
                />
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "50px",
                    marginTop: "-10px",
                    fontSize: "17pt",
                    color: "midnightblue",
                  }}
                >
                  {item.option1}
                </div>
                <br />
                <input
                  style={{ float: "left", marginLeft: "15px" }}
                  type={"radio"}
                  name={item.questionId}
                  value={item.option2}
                  onChange={handleOptionSelect}
                />{" "}
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "50px",
                    marginTop: "-10px",
                    fontSize: "17pt",
                    color: "midnightblue",
                  }}
                >
                  {item.option2}
                </div>
                <br />
                <input
                  style={{ float: "left", marginLeft: "15px" }}
                  type={"radio"}
                  name={item.questionId}
                  value={item.option3}
                  onChange={handleOptionSelect}
                />{" "}
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "50px",
                    marginTop: "-10px",
                    fontSize: "17pt",
                    color: "midnightblue",
                  }}
                >
                  {item.option3}
                </div>
                <br />
                <input
                  style={{ float: "left", marginLeft: "15px" }}
                  type={"radio"}
                  name={item.questionId}
                  value={item.option4}
                  onChange={handleOptionSelect}
                />{" "}
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "50px",
                    marginTop: "-10px",
                    fontSize: "17pt",
                    color: "midnightblue",
                  }}
                >
                  {item.option4}
                </div>
                <br />
                <div className="quizNPBtn">
                  <span
                    type="button"
                    className="quizPrevBtn col-1"
                    onClick={handlePreviousPage}
                  >
                    Previous
                  </span>
                  <span
                    type="button"
                    className="quizNextBtn col-1"
                    onClick={handleNextPage}
                    disabled={currentQuestion === data.length - 1}
                  >
                    Next
                  </span>
                </div>
              </div>
            ))}
            {submitted ? (
              <div>
                <h3>
                  Your Score is {score} out of {data.length}
                </h3>
              </div>
            ) : (
              <button
                className="quizbtn col-2"
                onClick={handleSubmit}
                ref={submitButtonRef}
              >
                Submit
              </button>
            )}
          </>
        )}

        {show3 && (
          <>
            <div className="ilWelcomeScreen col-sm-10 offset-1 text-center">
              <h1>
                Your Score is {score} out of {data.length}
              </h1>
              <br></br>

              <button className="quizbtn w-25" onClick={restartTest}>Restart the Test</button>
              <br></br>
              <button className="quizbtn w-25" onClick={courseMenu}>Back to Course Menu</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PracticeTest;
