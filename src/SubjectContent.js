import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CustomAlert from "./CustomAlert";
function SubjectContent() {
  
  const params = useParams();
  const [data, setData] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    async function fetchRelatedContent() {
      let result = await fetch(
        "http://localhost:8000/api/relatedayaats/" + params.id
      );
      result = await result.json();
      setData(result);
    }
    fetchRelatedContent();
  }, []);

  const [subject, setSubject] = useState([]);
  useEffect(() => {
    async function getSubjectName() {
      let result = await fetch(
        "http://localhost:8000/api/getSubjectName/" + params.id
      );
      result = await result.json();
      setSubject(result);
    }
    getSubjectName();
  }, []);


  function buttonClick() {
    const userInfo = localStorage.getItem("user-info");
    const paramsId = params.id;
    const learnersId = JSON.parse(userInfo).id; // assuming that the user ID is stored as "id" in the user-info object in local storage

    if (userInfo) {
      fetch("http://localhost:8000/api/coursesregistrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coursesId: paramsId,
          learnersId: learnersId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // alert(data.message); // display the message from the backend in an alert
          setAlertMessage(data.message);
          setShowAlert(true);
        })
        .catch((error) => {
          // alert(data.message); // display error message in an alert
          setAlertMessage(data.message);
          setShowAlert(true);
        });
    } else {
      // alert("Kindly Login First!");
          setAlertMessage("Kindly Login First!");
          setShowAlert(true);
    }
  }


  var rowIndex = 1;
  return (
    <>
    <Navbar />
    <CustomAlert message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
    <div className="subjectContentPage">
      <div className="subjectTitle col-sm-10 offset-sm-1">
        <h1>{subject.map((item) => item.subjectName)}</h1>
      </div>

      <div className="col-sm-10 offset-sm-1 pt-3 pb-3">
        <h2 className="pb-3">Related Ayaat</h2>

        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>English Translation</th>
              <th>Arabic Text</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td style={{ width: "100px" }}>{rowIndex++}</td>
                <td style={{ width: "600px", textAlign: "left" }}>
                  {item.eng_sahihInternational}
                </td>
                <td style={{ textAlign: "right" }}>{item.arabicText}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <button className="subjectContetBtn" onClick={buttonClick}>
        Register This Course!
      </button>
    </div>
    </>
  );
}

export default SubjectContent;
