import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";


function InteractiveLearningSession() {
  const navigate = useNavigate();
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [ayatSection, setAyatSection] = useState(true);
  const [questionSection, setQuestionSection] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const params = useParams();


  // Get learner id from localstorage
  const user = JSON.parse(localStorage.getItem("user-info"));
  const learnerId = user ? user.id : "";

  // Get the courseId
  const [courseId, setCourseId] = useState(params.id);

  const [currentAyaat, setCurrentAyaat] = useState("");

  const [progressdata, setProgressData] = useState([]);


  useEffect(() => {
    async function fetchMyAPI() {
      let params = new URLSearchParams({
        courseId: courseId,
        learnerId: learnerId
      });
      let result = await fetch(`http://localhost:8000/api/getprogress?${params}`, {
        method: "POST",
      });
      result = await result.json();
      setProgressData(result);
      setCurrentAyaat(result.currentAyat);

    }
    fetchMyAPI();
  }, [courseId, learnerId]);



  const handle1 = () => {
    setShow1(!show1);
    setShow2(!show2);
  };

  // const handle2 = () => {
  //   setShow2(!show2);
  //   setShow3(!show3);
  // };

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let result = await fetch("http://localhost:8000/api/data_content/" + params.id);
      result = await result.json();
      setData(result);
    }
    fetchMyAPI();
  }, []);


  const ayaatPerPage = 1;
  const [selectedOption, setSelectedOption] = useState("");


  const handleNextPage = () => {
    // setCurrentAyaat(currentAyaat + 1);
    updateprogress();

    if (currentAyaat === data.length - 1) {
      updateprogress();
      setAlertMessage("Course Completed Successfully");
      setShowAlert(true);

      // setShow2(!show2);
      // setShow3(!show3);
      navigate("/QuranicSubjects");
    }
    else {
      if (ayatSection) {
        // alert("Correct Ans: " + data[currentAyaat].correctOption);
        setAyatSection(false);
        if (data[currentAyaat].questionId) {
          setQuestionSection(true);
        } else {
          setAyatSection(true);
          // alert("No Question for this Ayat");
          setCurrentAyaat(currentAyaat + 1);

        }
      }
      else if (questionSection) {
        setShowHint(false);
        const correctOption = data[currentAyaat].correctOption;
        if (selectedOption === correctOption) {
          // alert("Your answer is correct!");
          // alert("selected option is: " + selectedOption);
          // alert("correct option is: " + correctOption);

          setSelectedOption(null);
          setQuestionSection(false);
          setAyatSection(true);
          setCurrentAyaat(currentAyaat + 1);

        } else {

          setAlertMessage("Your answer is incorrect. Please try again.");
          setShowAlert(true);
          // alert("selected option is: " + selectedOption);
          // alert("correct option is: " + correctOption);
          // console.log(data[currentAyaat]);

          setShowHint(true);
        }
        // setSelectedOption(null);
        // setQuestionSection(false);
        // setAyatSection(true);
        // setCurrentAyaat(currentAyaat + 1);
        // setShowHint(false);
      }
      else {
        setQuestionSection(false);
        setAyatSection(true);
        setShowHint(false);
      }
    }

  };

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const temp = currentAyaat + 1;
  const startIndex = (temp - 1) * ayaatPerPage;
  const endIndex = startIndex + ayaatPerPage;
  const ayaatToShow = data.slice(startIndex, endIndex);

  function progress() {
    const totalAyaatCount = data.length;
    const currentAyat = currentAyaat;
    const totalAyaat = Math.ceil(totalAyaatCount / ayaatPerPage);
    const progressPercent = Math.round(((currentAyaat + 1) / totalAyaat) * 100);
    return progressPercent;



  }


  async function updateprogress() {
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("learnerId", learnerId);
    formData.append("currentAyat", currentAyaat + 1);
    formData.append("percentage", progress());

    console.warn(formData);

    try {
      let response = await fetch("http://localhost:8000/api/updateprogress", {
        method: "POST",
        body: formData
      });
      let responseData = await response.json();

    } catch (error) {
      console.error("Error:", error);
      // conosle.log(error.message);
    }

  }






  return (
    <>
      <CustomAlert message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
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
              concepts. This session will help you understand the basic
              knowledge of Surah by providing you with Arabic Text along with
              its English and Urdu Translation.
            </h5>
            <br />
            <ul style={{ fontSize: "17px", fontWeight: "bold" }}>
              <li>Arabic Text</li>
              <li>English Translation</li>
              <li>Urdu Translation</li>
              <li>Questions after Ayat</li>
              <li>Its approppriate options</li>
              <li>Hints</li>
            </ul>
            <br />
            <button className="ilNextBtn col-2 offset-5" onClick={handle1}>
              Start Learning
            </button>
          </div>
        )}

        {show2 && (
          <>
            {ayaatToShow.map((item) => (
              <div className="col-sm-10 offset-1 ayaatDiv">
                <h1 style={{ fontSize: "16pt", fontWeight: "bold", float: "right", color: "blue" }}>Progress: {progress()}%</h1>

                {ayatSection && (
                  <>
                    <h3 className="offset-1" style={{ fontWeight: "bold", color: "#286029" }}>Surah No: {item.surahNo}, Ayat No: {item.ayatNo}</h3>
                    <hr />
                    <p className="urSideText" >{item.arabicText}</p>
                    <h3 className="engSideText" style={{ fontWeight: "bold", color: "#286029", textAlign: "left" }}>English Translation</h3>
                    <p style={{ fontSize: "17pt" }} className="engSideText">{item.eng_sahihInternational}</p>
                    <h3 className="urSideText" style={{ fontWeight: "bold", color: "#286029", textAlign: "right" }}>اردو ترجمہ</h3>
                    <p style={{ fontSize: "17pt" }} className="urSideText">{item.ur_AbuAaalaMaududi}</p>
                  </>
                )}

                {questionSection && (
                  <>
                    <h2 style={{ textAlign: "center", color: "#286029", fontWeight: "bold", }} className="offset-1">Quick Quiz</h2>
                    <hr />
                    <h3 className="engSideText pt-3 pb-4" style={{ color: "#286029", textAlign: "left" }}>{item.questionEnglish}</h3>

                    <input style={{ float: "left", marginLeft: "15px" }} type={"radio"} name={item.questionId} value={item.option1} onChange={handleOptionSelect} />{" "}
                    <div style={{ textAlign: "left", marginLeft: "50px", marginTop: "-10px", fontSize: "17pt", color: "midnightblue" }}>{item.option1}</div>
                    <br />
                    <input style={{ float: "left", marginLeft: "15px" }} type={"radio"} name={item.questionId} value={item.option2} onChange={handleOptionSelect} />{" "}
                    <div style={{ textAlign: "left", marginLeft: "50px", marginTop: "-10px", fontSize: "17pt", color: "midnightblue" }}>{item.option2}</div>
                    <br />
                    <input style={{ float: "left", marginLeft: "15px" }} type={"radio"} name={item.questionId} value={item.option3} onChange={handleOptionSelect} />{" "}
                    <div style={{ textAlign: "left", marginLeft: "50px", marginTop: "-10px", fontSize: "17pt", color: "midnightblue" }}>{item.option3}</div>
                    <br />
                    <input style={{ float: "left", marginLeft: "15px" }} type={"radio"} name={item.questionId} value={item.option4} onChange={handleOptionSelect} />{" "}
                    <div style={{ textAlign: "left", marginLeft: "50px", marginTop: "-10px", fontSize: "17pt", color: "midnightblue" }}>{item.option4}</div>
                    <br></br>

                    {showHint && (
                      <>
                        <p style={{ color: "blue", fontSize: "17pt" }} >Hint : {item.hint} </p>
                      </>
                    )}
                  </>
                )}

                <button className="ilQuesBtn col-2 mt-4" onClick={handleNextPage}> Next </button>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default InteractiveLearningSession;