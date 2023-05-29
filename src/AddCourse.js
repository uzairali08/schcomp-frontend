import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";

function AddCourse() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  // const [show4, setShow4] = useState(false);

  const navigate = useNavigate();
  // function to add course in database (Case 1)

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user-info"));
  const userName = user ? user.firstName + " " + user.lastName : "";

  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [ontLevel1, setOntLevel1] = useState("");
  const [ontLevel2, setOntLevel2] = useState("");
  const [ontLevel3, setOntLevel3] = useState("");
  const [ontLevel4, setOntLevel4] = useState("");
  const [definedBy, setDefinedBy] = useState(userName);
  const [status, setStatus] = useState("Offered");

  async function addcourse() {
    const formData = new FormData();
    formData.append("subjectName", subjectName);
    formData.append("subjectDescription", subjectDescription);
    formData.append("ontologylevel1", ontLevel1);
    formData.append("ontologylevel2", ontLevel2);
    formData.append("ontologylevel3", ontLevel3);
    formData.append("ontologylevel4", ontLevel4);
    formData.append("definedBy", definedBy);
    formData.append("status", status);
    let response = await fetch("http://localhost:8000/api/addcourse", {
      method: "POST",
      body: formData,
    });

    let result = await response.json();
    setSubjectId(result.id);
  }

  //Case 2 code starts here...

  const [surahData, setSurahData] = useState([]);
  const [ayaatData, setAyaatData] = useState([]);

  //function to get surah data from database
  useEffect((async) => {
    async function fetchMyAPI() {
      let surahresult = await fetch("http://localhost:8000/api/getsurahs");
      surahresult = await surahresult.json();
      setSurahData(surahresult);
    }
    fetchMyAPI();
  }, []);

  //compare the value of surah number with selected value and show it in text fields
  async function handleSelectedSurah(event) {
    const selectedSurahNumber = event.target.value;

    //calling getayaats function
    await getayaats(selectedSurahNumber);

    const surah = surahData.find(
      (item) => item.surahNumber == selectedSurahNumber
    );
    const surahName = surah ? surah.surahName : null;

    // Update the value of the text field
    // Wait for a short delay before updating the text field again
    setTimeout(() => {
      const surahNameInput = document.getElementById("surahNameInput");
      surahNameInput.value = surahName || "";
    }, 10);

    setSurahNumber(selectedSurahNumber);
  }

  //function to get ayaats from data from database where surah is selected
  async function getayaats(selectedSurahNumber) {
    let ayaatresult = await fetch(
      "http://localhost:8000/api/getayaats/" + selectedSurahNumber
    );
    ayaatresult = await ayaatresult.json();
    // console.warn(result);
    setAyaatData(ayaatresult);
    console.warn(ayaatresult);
  }

  //compare the value of ayaat number with selected value and show it in text fields
  async function handleSelectedAyaat(event) {
    const selectedAyaatNumber = event.target.value;

    await setAyaatNumber(selectedAyaatNumber);

    const ayaat = ayaatData.find((item) => item.ayatNo == selectedAyaatNumber);
    const ayaatName = ayaat ? ayaat.arabicText : null;

    const ayaatEngName = ayaat ? ayaat.eng_sahihInternational : null;
    const ayaatUrduName = ayaat ? ayaat.ur_AbuAaalaMaududi : null;

    // Update the value of the Arabic text field
    setTimeout(() => {
      const AyaatNameInput = document.getElementById("ayaatNameInput");
      AyaatNameInput.value = ayaatName || "";
    }, 10);

    setTimeout(() => {
      const AyaatNameInput = document.getElementById("ayaatEnglishNameInput");
      AyaatNameInput.value = ayaatEngName || "";
    }, 10);

    setTimeout(() => {
      const AyaatNameInput = document.getElementById("ayaatUrduNameInput");
      AyaatNameInput.value = ayaatUrduName || "";
    }, 10);

    await getayatid(ayaat);
  }

  // function to get the ayatId
  function getayatid(ayaat) {
    const ayaatId = ayaat ? ayaat.ayatId : null;
    setAyatId(ayaatId);
  }

  //show added ayaats on above of page.
  const [showAyaats, setShowAyaats] = useState(false);

  const [subjectId, setSubjectId] = useState([]);
  const [surahNumber, setSurahNumber] = useState([]);
  const [ayaatNumber, setAyaatNumber] = useState([]);
  const [ayatId, setAyatId] = useState([]);

  function handleShowAyaats() {
    
    setShowAyaats(true);

    //here code to add ayaats into database
    addrelatedayaats();
    getrelatedayaats();

  }

  async function addrelatedayaats() {
    const formData = new FormData();
    formData.append("subjectId", subjectId);
    formData.append("ayatId", ayatId);
    formData.append("surahNo", surahNumber);

    try {
      let response = await fetch("http://localhost:8000/api/addrelatedayaats", {
        method: "POST",
        body: formData,
      });

      let responseData = await response.json();
    } catch (error) {
      console.error("Error:", error);
      // alert(error.message);
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  }

  const [relatedAyaatsData, setRelatedAyaatsData] = useState([]);

  async function getrelatedayaats() {
    let result = await fetch(
      "http://localhost:8000/api/getrelatedayaats/" + subjectId
    );
    result = await result.json();
    // console.warn(result);
    setRelatedAyaatsData(result);
    console.warn(relatedAyaatsData);
  }

  async function deleterelatedayaat(ayatId) {
    const data = { subjectId, ayatId };
    console.warn(data);
    let result = await fetch("http://localhost:8000/api/deleterelatedayaat", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    result = await result.json();
    getrelatedayaats();
  }

  const handle1 = () => {
    addcourse();
    setShow1(!show1);
    setShow2(!show2);
    // NextSection();
  };

  const handle2 = () => {
    setShow2(!show2);
    setShow3(!show3);
    navigate("/QuranicSubjects");
  };

  // const MoreAyat = () => {
  //   alert("Adding Ayat");
  // };

  return (
    <>
    <CustomAlert message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
      <Navbar />
      <div className="addCoursePage">
        {show1 && (
          <>
            <h2 className="addCourseHeader col-sm-8 offset-2 mb-0">
              Add Short-Course Detail
            </h2>
            <div className="col-sm-8 offset-2 shortCourseDetail">
              <div className="form-group">
                <label>Short-Course Name:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Short-Course Name"
                  className="form-control"
                  onChange={(e) => setSubjectName(e.target.value)}
                />
                <br></br>

                <label>Short-Course Description:</label>
                <textarea
                  style={{ width: "100%" }}
                  className="form-control"
                  placeholder="Short-Course Description"
                  onChange={(e) => setSubjectDescription(e.target.value)}
                  rows={5}
                ></textarea>
                <br></br>

                <label>Ontology Level 1:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Ontology Level 1"
                  className="form-control"
                  onChange={(e) => setOntLevel1(e.target.value)}
                />
                <br></br>

                <label>Ontology Level 2:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Ontology Level 2"
                  className="form-control"
                  onChange={(e) => setOntLevel2(e.target.value)}
                />
                <br></br>

                <label>Ontology Level 3:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Ontology Level 3"
                  className="form-control"
                  onChange={(e) => setOntLevel3(e.target.value)}
                />
                <br></br>

                <label>Ontology Level 4:</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Ontology Level 4"
                  className="form-control"
                  onChange={(e) => setOntLevel4(e.target.value)}
                />
                <br></br>

                <button className="subjectSaveBtn offset-5" onClick={handle1}>
                  Save & Continue
                </button>
              </div>
            </div>
          </>
        )}

        {show2 && (
          <>
            <div className="mt-3">
              {showAyaats && (
                <>
                  {relatedAyaatsData.map((item) => (
                    <div>
                      <div className="col-sm-8 offset-2 shortCourseDetail">
                        <h4 className="text-center">
                          Surah {item.surahNumber}, {item.surahName}
                        </h4>
                        <hr></hr>
                        <p style={{float:"right", fontSize:"15pt"}}>{item.arabicText}</p>
                        <br/><br />
                        <div className="text-center">
                          <Button className="btn btn-danger"
                            onClick={() => {
                              deleterelatedayaat(item.ayatId);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <br></br>
                    </div>
                  ))}
                </>
              )}
            </div>

            <h2 className="addCourseHeader col-sm-8 offset-2 mb-0">
              Add Related Ayaat
            </h2>
            <div className="col-sm-8 offset-2 shortCourseDetail">
              {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}

              <div className="form-group">
                <label>Surah Number:</label>
                <select
                  class="form-control"
                  onChange={(event) => handleSelectedSurah(event)}
                >
                  <option value="none" selected disabled hidden>
                    Select Surah
                  </option>

                  {surahData.map((item) => (
                    <option>{item.surahNumber}</option>
                  ))}
                </select>

                <label>Surah Name:</label>
                <input
                  type="text"
                  readonly
                  id="surahNameInput"
                  class="form-control"
                ></input>

                <label>Ayat Number:</label>
                <select
                  class="form-control"
                  onChange={(event) => handleSelectedAyaat(event)}
                >
                  <option value="none" selected disabled hidden>
                    Select Ayaat
                  </option>

                  {ayaatData.map((item) => (
                    <option>{item.ayatNo}</option>
                  ))}
                </select>

                <label>Arabic Text:</label>
                <input
                  type="text"
                  readonly
                  id="ayaatNameInput"
                  class="form-control"
                  value=""
                ></input>

                <label>English Text:</label>
                <input
                  type="text"
                  readonly
                  id="ayaatEnglishNameInput"
                  class="form-control"
                  value=""
                ></input>

                <label>Urdu Text:</label>
                <input
                  type="text"
                  readonly
                  id="ayaatUrduNameInput"
                  class="form-control"
                  value=""
                ></input>

                {/* <div className="row">

                <div className="col-3">
                  <label>Surah Number:</label>
                  <select class="form-control" onChange={(event) => handleSelectedSurah(event)}>
                    {surahData.map((item) => (
                      <option>{item.surahNumber}</option>
                    ))}
                  </select>
                </div>

                <div className="col">
                  <label>Surah Name:</label>
                  <input
                    type="text"
                    readonly
                    id="surahNameInput"
                    class="form-control"
                    value="ٱلْفَاتِحَة"
                  ></input>
                </div>

              </div>
              <br></br>

              <div className="AyaatRow">
                <div className="row">

                  <div className="col-3">
                    <label>Ayat Number:</label>
                    <select class="form-control" onChange={(event) => handleSelectedAyaat(event)}>
                      {ayaatData.map((item) => (
                        <option>{item.ayatNo}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col">
                    <label>Arabic Text:</label>
                    <input
                      type="text"
                      readonly
                      id="ayaatNameInput"
                      class="form-control"
                      value=""
                    ></input>
                  </div>

                </div>
                <div className="row">
                <div className="col offset-3">
                    <label>English Text:</label>
                    <input
                      type="text"
                      readonly
                      id="ayaatNameInput"
                      class="form-control"
                      value=""
                    ></input>
                  </div>
                </div>
                <div className="row">
                <div className="col offset-3">
                    <label>Urdu Text:</label>
                    <input
                      type="text"
                      readonly
                      id="ayaatNameInput"
                      class="form-control"
                      value=""
                    ></input>
                  </div>
                </div>
              </div> */}
                <br></br>

                <div className="addRelatedAyaatBtn">
                  <button className="subjectSaveBtn col-2" onClick={handleShowAyaats}>
                    Add More
                  </button>
                  <br></br>
                  <br></br>
                  <button className="subjectSaveBtn col-2" onClick={handle2}>
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

export default AddCourse;
