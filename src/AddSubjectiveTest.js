import React, { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";

function AddSubjectiveTest() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [showQues, setShowQues] = useState(false);
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handle1 = () => {
    setShow1(!show1);
    setShow2(!show2);
  };

  const handle2 = () => {
    setShow2(!show2);
    navigate("/QuranicSubjects");
  };


  //function to get subjects from database
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let result = await fetch("http://localhost:8000/api/subjectslist");
      result = await result.json();
      setSubjectData(result);
    }
    fetchMyAPI();
  }, []);


  async function handleSelectedSubject(event) {
    const selectedSubject = event.target.value;

    //calling getayaats function
    // await getayaats(selectedSurahNumber);

    const subject = subjectData.find(item => item.subjectName == selectedSubject);
    const Id = subject ? subject.id : null;
    setSubjectId(Id);

  }

  const user = JSON.parse(localStorage.getItem("user-info"));
  const userName = user ? user.firstName + " " + user.lastName : "";

  //this is Id of subject that is selecteds
  const [subjectId, setSubjectId] = useState([]);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [totalMarks, setTotalMarks] = useState([]);
  const [file, setFile] = useState([]);
  const [definedBy] = useState(userName);


  async function handleShowQues() {
    setShowQues(true);

    await addsubjectivetest();
    getsubjectivequestionsdata();
  }


  async function addsubjectivetest() {

    const formData = new FormData();
    formData.append("subjectId", subjectId);
    formData.append("question", question);
    formData.append("answer", answer);
    formData.append("totalMarks", totalMarks);
    formData.append("file", file);
    formData.append("definedBy", definedBy);

    console.warn(formData);

    try {
      let response = await fetch("http://localhost:8000/api/addsubjectivequestions", {
        method: "POST",
        body: formData
      });

      let responseData = await response.json();

      // Check if the response contains a success message
      if (response.ok) {
        // alert(responseData.message); // Success message
        setAlertMessage(responseData.message);
        setShowAlert(true);
      } else {
        throw new Error(responseData.message); // Error message
      }
    } catch (error) {
      console.error("Error:", error);
      // alert(error.message);
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  }

  const [subjectiveQuestionsData, setSubjectiveQuestionsData] = useState([]);

  async function getsubjectivequestionsdata() {
    let result = await fetch("http://localhost:8000/api/getsubjectivequestionsdata/" + subjectId);
    result = await result.json();
    setSubjectiveQuestionsData(result);

  }


  async function deletesubjectivequestion(id) {

    let result = await fetch("http://localhost:8000/api/deletesubjectivequestion", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (result.ok) {
      const response = await result.json();
      // alert(response.message); // Backend success message
      setAlertMessage(response.message);
      setShowAlert(true);
      getsubjectivequestionsdata();
    } else {
      // alert("Failed to delete question"); // Backend error message
      setAlertMessage("Failed to delete question");
      setShowAlert(true);
    }
  }


  //Rubric Code starts here ------------>

  async function handleSelectedQuestion(event) {
    const selectedQuestion = event.target.value;

    const question = subjectiveQuestionsData.find(item => item.question == selectedQuestion);
    const id = question ? question.id : null;
    setQuestionId(id);

  }

  const [questionId, setQuestionId] = useState([]);
  const [maxMarks, setMaxMarks] = useState([]);
  const [maxActivity, setMaxActivity] = useState([]);
  const [averageMarks, setAverageMarks] = useState([]);
  const [averageActivity, setAverageActivity] = useState([]);
  const [minMarks, setMinMarks] = useState([]);
  const [minActivity, setMinActivity] = useState([]);


  async function addquestionsrubric() {
    const formData = new FormData();
    formData.append("questionId", questionId);
    formData.append("totalMarks", totalMarks);
    formData.append("maxMarks", maxMarks);
    formData.append("maxActivity", maxActivity);
    formData.append("averageMarks", averageMarks);
    formData.append("averageActivity", averageActivity);
    formData.append("minMarks", minMarks);
    formData.append("minActivity", minActivity);
    formData.append("definedBy", definedBy);
  
    try {
      let response = await fetch("http://localhost:8000/api/addquestionsrubric", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        // Rubric added successfully
        // alert("Rubric added successfully");
        setAlertMessage("Rubric added successfully");
        setShowAlert(true);
      } else {
        // Error occurred while adding rubric
        // alert("Rubric adding failed");
        setAlertMessage("Rubric adding failed");
        setShowAlert(true);
      }
    } catch (error) {
      // Network or server error occurred
      // alert("An error occurred. Please try again later.");
      setAlertMessage("An error occurred. Please try again later.");
      setShowAlert(true);
    }
  }
  

  return (
    <>
    <CustomAlert message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
      <Navbar />
      <div className="addCoursePage">

        {show1 && (
          <>
            <div className="mt-3">
              {showQues && (
                <>
                  {subjectiveQuestionsData.map((item) => (
                    <div>
                      <div className="col-sm-8 offset-2 shortCourseDetail">
                        <h4>Question</h4>
                        <p className="d-flex justify-content-end">Marks: {item.totalMarks} </p>
                        <p>{item.question}</p>
                        <h4>Answer</h4>
                        <p>{item.answer}</p>
                        <div className="d-flex justify-content-end">
                          <Button className="btn btn-danger" onClick={() => { deletesubjectivequestion(item.id) }}>Delete</Button>
                        </div>
                      </div>
                      <br></br>
                    </div>
                  ))}
                </>
              )}
            </div>


            <h2 className="addCourseHeader col-sm-8 offset-2 mb-0">Add Subjective Test</h2>
            <h2 className="addCourseHeader col-sm-8 offset-2 mb-0">Peer-Review Based Assessment</h2>
            <div className="col-sm-8 offset-2 shortCourseDetail">

              <br></br>
              <div className="form-group">
                <label>Choose Subject:</label>
                <select class="form-control" style={{ width: "100%" }} onChange={(event) => handleSelectedSubject(event)}>
                  <option value="none" selected disabled hidden>Select Subject</option>
                  {subjectData.map((item) => (
                    <option>{item.subjectName}</option>
                  ))}
                </select>

                <br></br>

                <label>Add Subjective Question:</label>
                <textarea
                  style={{ width: "100%" }}
                  className="form-control"
                  placeholder="Write the Question here"
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                ></textarea>
                <br></br>

                <label>Add Sample Answer:</label>
                <textarea
                  style={{ width: "100%" }}
                  className="form-control"
                  placeholder="Write the Answer here"
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={4}
                ></textarea>
                <br></br>

                <label>Set Total Marks:</label>
                <input
                  style={{ width: "100%" }}
                  type="number"
                  placeholder="Write the total Marks"
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label id="formFile">Upload Helping Resource:</label>
                <input class="form-control" type="file" id="formFile" onChange={(e) => setFile(e.target.files[0])}></input>
                <br></br>


                <div className="addRelatedAyaatBtn">
                  <button className="subjectSaveBtn col-3" onClick={handleShowQues}>Add More</button>
                  <br></br><br></br>
                  <button className="subjectSaveBtn col-3" onClick={handle1}>
                    Save & Continue
                  </button>
                </div>
              </div>
            </div>

          </>
        )}

        {show2 && (
          <>
            <h2 className="addCourseHeader col-sm-8 offset-2 mb-0">Add Rubric (Grading Criteria)</h2>
            <div className="col-sm-8 offset-2 shortCourseDetail">

              <br></br>
              <div className="form-group">
                <label>Question:</label>
                <select class="form-control" style={{ width: "100%" }} onChange={(event) => handleSelectedQuestion(event)}>
                  <option value="none" selected disabled hidden>Select Question</option>
                  {subjectiveQuestionsData.map((item) => (
                    <option>{item.question}</option>
                  ))}
                </select>
                <br></br>

                <label>Add Maximum Marks:</label>
                <input
                  style={{ width: "100%" }}
                  type="number"
                  placeholder="Enter the maximum marks"
                  onChange={(e) => setMaxMarks(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label>Add Max Activities:</label>
                <textarea
                  style={{ width: "100%" }}
                  className="form-control"
                  placeholder="Write the question activities here"
                  onChange={(e) => setMaxActivity(e.target.value)}
                  rows={4}
                ></textarea>
                <br></br>

                <label>Add Average Marks:</label>
                <input
                  style={{ width: "100%" }}
                  type="number"
                  placeholder="Enter the average marks"
                  onChange={(e) => setAverageMarks(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label>Add Average Activities:</label>
                <textarea
                  style={{ width: "100%" }}
                  className="form-control"
                  placeholder="Write the question activities here"
                  onChange={(e) => setAverageActivity(e.target.value)}
                  rows={4}
                ></textarea>
                <br></br>

                <label>Add Minimum Marks:</label>
                <input
                  style={{ width: "100%" }}
                  type="number"
                  placeholder="Enter the minimum marks"
                  onChange={(e) => setMinMarks(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label>Add Minimum Activities:</label>
                <textarea
                  style={{ width: "100%" }}
                  className="form-control"
                  placeholder="Write the question activities here"
                  onChange={(e) => setMinActivity(e.target.value)}
                  rows={4}
                ></textarea>
                <br></br>


                <div className="addRelatedAyaatBtn">
                  <button className="subjectSaveBtn col-2"
                    onClick={addquestionsrubric}
                  //onClick={handle2}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
}

export default AddSubjectiveTest;
