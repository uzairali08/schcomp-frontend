import React, { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomAlert from "./CustomAlert";

function AddObjectiveTest() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [showQues, setShowQues] = useState(false);
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handle1 = () => {
    setShow1(!show1);
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


  //this is Id of subject that is selecteds
  const [subjectId, setSubjectId] = useState([]);
  const [surahData, setSurahData] = useState([]);
  const [surahNo, setSurahNo] = useState([]);
  const [ayatId, setAyatId] = useState([]);
  const [ayatNo, setAyatNo] = useState([]);


  const [questionEnglish, setQuestionEnglish] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [hint, setHint] = useState("");
  const [correctOption, setCorrectOption] = useState("");


  //compare the value of Subject Name with selected value and show it in text fields

  const [ayaatData, setAyaatData] = useState([]);

  async function handleSelectedSubject(event) {
    const selectedSubject = event.target.value;

    //calling getayaats function
    // await getayaats(selectedSurahNumber);

    const subject = subjectData.find(item => item.subjectName == selectedSubject);
    const Id = subject ? subject.id : null;
    setSubjectId(Id);

    let result = await fetch("http://localhost:8000/api/getsurahdata/" + Id);
    result = await result.json();
    setSurahData(result);

    console.warn(result);

  }

  async function handleSelectedSurah(event) {
    const selectedSurah = event.target.value;

    const surah = surahData.find(item => item.surahNo == selectedSurah);
    const surahN = surah ? surah.surahName : null;

    setSurahNo(selectedSurah);

    console.warn(surahN);
    await getayaat(selectedSurah);

    setTimeout(() => {
      const surahNameInput = document.getElementById('surahNameInput');
      surahNameInput.value = surahN || '';
    }, 10);

  }

  async function getayaat(selectedSurah) {
    const surahNo = selectedSurah;
    const data = { subjectId, surahNo };

    let result = await fetch("http://localhost:8000/api/getayaatdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    result = await result.json();

    setAyaatData(result);
  }


  async function handleSelectedAyaat(event) {
    const selectedAyaat = event.target.value;

    const ayaat = ayaatData.find(item => item.ayatNo == selectedAyaat);
    const ayaatName = ayaat ? ayaat.arabicText : null;
    const ayaatNo = ayaat ? ayaat.ayatNo : null;
    const ayaatId = ayaat ? ayaat.ayatId : null;

    setAyatNo(ayaatNo);
    setAyatId(ayaatId);

    // setAyaatNumber(selectedSurah);

    setTimeout(() => {
      const ayaatNameInput = document.getElementById('ayaatNameInput');
      ayaatNameInput.value = ayaatName || '';
    }, 10);

  }

  const handleShowQues = () => {
    setShowQues(true);

    addobjectivetest();
    getquestionsdata();

  };

  async function addobjectivetest() {
    const formData = new FormData();
    formData.append("surahNo", surahNo);
    formData.append("ayatNo", ayatNo);
    formData.append("ayatId", ayatId);
    formData.append("questionEnglish", questionEnglish);
    formData.append("option1", option1);
    formData.append("option2", option2);
    formData.append("option3", option3);
    formData.append("option4", option4);
    formData.append("hint", hint);
    formData.append("correctOption", correctOption);
    formData.append("subjectId", subjectId);


    console.warn(formData);


    try {
      let response = await fetch("http://localhost:8000/api/addobjectivetest", {
        method: "POST",
        body: formData
      });

      let responseData = await response.json();

    } catch (error) {
      console.error("Error:", error);
      // alert(error.message);
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  }

  const [questionsData, setQuestionsData] = useState([]);

  async function getquestionsdata() {
    let result = await fetch("http://localhost:8000/api/getquestionsdata/" + subjectId);
    result = await result.json();
    setQuestionsData(result);
    console.warn(relatedAyaatsData);
  }

  async function deletequestion(ayatId) {
    const data = { subjectId, ayatId };
    console.warn(data);
    let result = await fetch("http://localhost:8000/api/deletequestion", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    result = await result.json();
    getquestionsdata();
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
                  {questionsData.map((item) => (
                    <div>
                      <div className="col-sm-8 offset-2 shortCourseDetail">
                        <h4>Question: {item.questionEnglish}</h4>
                        <hr></hr>
                        <p><b>Option 1:</b> {item.option1}</p>
                        <p><b>Option 2:</b> {item.option2}</p>
                        <p><b>Option 3:</b> {item.option3}</p>
                        <p><b>Option 4:</b> {item.option4}</p>
                        <p><b>Hint:</b> {item.hint}</p>
                        <p><b>Correct Option:</b> {item.correctOption}</p>

                        <div className="text-center">
                          <Button className="btn btn-danger" onClick={() => { deletequestion(item.ayatId) }}>Delete</Button>
                        </div>
                      </div>
                      <br></br>
                    </div>
                  ))}
                </>
              )}
            </div>

            <h2 className="addCourseHeader col-sm-8 offset-2 mb-0">Add Practice/Graded Test Questions</h2>
            {/* <h2 className="addCourseHeader col-sm-8 offset-2 mb-0">Practice/Graded Test Questions</h2> */}
            <div className="col-sm-8 offset-2 shortCourseDetail">

              <br></br>
              <div className="form-group">
                <label>Subject Name:</label>
                <select class="form-control" style={{ width: "100%" }} onChange={(event) => handleSelectedSubject(event)}>
                  <option value="none" selected disabled hidden>Select Subject</option>
                  {subjectData.map((item) => (
                    <option>{item.subjectName}</option>
                  ))}
                </select>
                {/* <br></br>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  readonly
                  value="Subject name will display here"
                  className="form-control"
                /> */}
                <br></br>

                <label>Surah Number:</label>
                <select class="form-control" style={{ width: "100%" }} onChange={(event) => handleSelectedSurah(event)}>
                  <option value="none" selected disabled hidden>Select Surah</option>
                  {surahData.map((item) => (
                    <option>{item.surahNo}</option>
                  ))}
                </select>
                <br></br>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  readonly
                  // value="Surah name will display here"
                  id="surahNameInput"
                  className="form-control"
                />
                <br></br>

                <label>Ayat Number:</label>
                <select class="form-control" style={{ width: "100%" }} onChange={(event) => handleSelectedAyaat(event)}>
                  <option value="none" selected disabled hidden>Select Ayaat</option>
                  {ayaatData.map((item) => (
                    <option>{item.ayatNo}</option>
                  ))}
                </select>
                <br></br>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  readonly
                  // value="Ayat Text will display here"
                  id="ayaatNameInput"
                  className="form-control"
                />
                <br></br>

                <label>Add Question:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Write the Question here"
                  onChange={(e) => setQuestionEnglish(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label>Option 1:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Write the Option 1"
                  onChange={(e) => setOption1(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label>Option 2:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Write the Option 2"
                  onChange={(e) => setOption2(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label>Option 3:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Write the Option 3"
                  onChange={(e) => setOption3(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label>Option 4:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Write the Option 4"
                  onChange={(e) => setOption4(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label>Hint:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Write the Hint"
                  onChange={(e) => setHint(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <label>Answer:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Write the correct Answer"
                  onChange={(e) => setCorrectOption(e.target.value)}
                  className="form-control"
                />
                <br></br>

                <div className="addRelatedAyaatBtn">
                  <button className="subjectSaveBtn col-2" onClick={handleShowQues}>Add More</button>
                  <br></br><br></br>
                  <button className="subjectSaveBtn col-2" onClick={handle1}>
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

export default AddObjectiveTest;
