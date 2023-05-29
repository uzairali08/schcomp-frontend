import { Button } from "react-bootstrap";
import "./interactivelearning.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";


function InteractiveLearning() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handle1 = () => {
    setShow1(!show1);
    setShow2(!show2);
  };

  const handle2 = () => {
    setShow2(!show2);
    setShow3(!show3);
  };

  const handle3 = () => {
    setShow2(!show2);
    setShow3(!show3);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let result = await fetch("http://localhost:8000/api/relatedayaats/2");
      result = await result.json();
      setData(result);
    }
    fetchMyAPI();
  }, []);

  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let result = await fetch("http://localhost:8000/api/getquiz/2");
      result = await result.json();
      setQuiz(result);
    }
    fetchMyAPI();
  }, []);

  var quesNum = 1;
  return (
    <>
      <Navbar />
      <div className="pageBackground pt-5 pb-5">
        <div className="headingTile col-sm-10 offset-1">
          <h1>Interactive Learning</h1>
        </div>

        {show1 && (
          <div className="ilWelcomeScreen col-sm-10 offset-1">
            <h4>Welcome to Interactive Learning Session</h4>
            <br />
            <h5>
              Interactive Learning helps you to learn and understand te basic
              concepts. This session will help you understand the basic knowledge
              of Surah by providing you with Arabic Text along with its English
              and Urdu Translation.
            </h5>
            <br />
            <ul style={{ fontSize: "16px", fontWeight: "bold" }}>
              <li>Arabic Text</li>
              <li>English Translation</li>
              <li>Urdu Translation</li>
              <li>Questions after Ayat</li>
              <li>Its approppriate options</li>
              <li>Hints</li>
            </ul>
            <br />
            <button className="ilNextBtn" onClick={handle1}>
              Next
            </button>
          </div>
        )}

        {
          show2 && (
            <>
              {data.map((item) => (
                <div className="col-sm-10 offset-1 ayaatDiv">
                  <h3 style={{ fontWeight: "bold", color: "#286029" }}>
                    Surah No: {item.surahNo}, Ayat No: {item.ayatNo}
                  </h3>
                  <hr />
                  <p className="urSideText">{item.arabicText}</p>
                  <h3
                    className="engSideText"
                    style={{ fontWeight: "bold", color: "#286029" }}
                  >
                    English Translation
                  </h3>
                  <p style={{ fontSize: "15pt" }} className="engSideText">
                    {item.eng_sahihInternational}
                  </p>
                  <h3
                    className="urSideText"
                    style={{ fontWeight: "bold", color: "#286029" }}
                  >
                    اردو ترجمہ
                  </h3>
                  <p style={{ fontSize: "15pt" }} className="urSideText">
                    {item.ur_AbuAaalaMaududi}
                  </p>
                </div>
              ))}
              <button className="ilQuesBtn mt-4" onClick={handle2}>
                Next
              </button>
            </>
          )

          //< Button onClick={handle2}>Next</Button>
        }

        {show3 && (
          <>
            {quiz.map((item) => (
              <div>
                <div className="quesDiv col-sm-10 offset-1">
                  <h2
                    style={{
                      textAlign: "center",
                      color: "#286029",
                      fontWeight: "bold",
                    }}
                  >
                    Question: {quesNum++}
                  </h2>
                  <br />
                  <h3
                    className="urSideText pb-4"
                    style={{ color: "#286029", fontWeight: "bold" }}
                  >
                    {item.questionUrdu}
                  </h3>
                  <input
                    style={{ float: "right" }}
                    type={"radio"}
                    name={item.questionId}
                    value="option 1"
                  />{" "}
                  <div
                    style={{
                      textAlign: "right",
                      marginRight: "30px",
                      marginTop: "-10px",
                    }}
                  >
                    {item.option1}
                  </div>
                  <br />
                  <input
                    style={{ float: "right" }}
                    type={"radio"}
                    name={item.questionId}
                    value="option 2"
                  />{" "}
                  <div
                    style={{
                      textAlign: "right",
                      marginRight: "30px",
                      marginTop: "-10px",
                    }}
                  >
                    {item.option2}
                  </div>
                  <br />
                  <input
                    style={{ float: "right" }}
                    type={"radio"}
                    name={item.questionId}
                    value="option 3"
                  />{" "}
                  <div
                    style={{
                      textAlign: "right",
                      marginRight: "30px",
                      marginTop: "-10px",
                    }}
                  >
                    {item.option3}
                  </div>
                  <br />
                  <input
                    style={{ float: "right" }}
                    type={"radio"}
                    name={item.questionId}
                    value="option 4"
                  />{" "}
                  <div
                    style={{
                      textAlign: "right",
                      marginRight: "30px",
                      marginTop: "-10px",
                    }}
                  >
                    {item.option4}
                  </div>
                  <br />
                </div>
                <div></div>
              </div>
            ))}
            <br />
            <button className="ilQuesBtn mt-4" onClick={handle3}>
              Submit
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default InteractiveLearning;
