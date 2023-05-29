import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import "./editsubject.css";
import { useParams } from "react-router-dom";
import CustomAlert from "./CustomAlert";

function EditSubject() {
  const [data, setData] = useState([]);
  const params = useParams();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [id, setId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [definedBy, setDefinedBy] = useState("");
  const [status, setStatus] = useState("");

  useEffect((async) => {
    async function fetchMyAPI() {
      let result = await fetch(
        "http://localhost:8000/api/getsubject/" + params.id
      );
      result = await result.json();
      setData(result);

      setId(result.id);
      setSubjectName(result.subjectName);
      setSubjectDescription(result.subjectDescription);
      setDefinedBy(result.definedBy);
      setStatus(result.status);
    }
    fetchMyAPI();
  }, []);

  async function editsubject(id) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("subjectName", subjectName);
    formData.append("subjectDescription", subjectDescription);
    formData.append("definedBy", definedBy);
    formData.append("status", status);
    let result = await fetch(
      "http://localhost:8000/api/editsubject/" + id + "?_method=PUT",
      { method: "POST", body: formData }
    );

    // alert("Data has been updated");
    setAlertMessage("Data has been updated");
    setShowAlert(true);
  }

  return (
    <>
    <CustomAlert message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
    <div className="background">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h1>
                  Edit Subject
                  <Link to={"/Subjects"} className="editBackBtn">
                    Back
                  </Link>
                </h1>
              </div>
              <div className="box">
                <div>
                  <label>Subject Id</label>
                  <input
                    type="text"
                    defaultValue={data.id}
                    onChange={(e) => setId(e.target.value)}
                    className="form-control"
                    disabled
                  />
                </div>
                <div>
                  <label>Subject Name</label>
                  <input
                    type="text"
                    defaultValue={data.subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Subject Description</label>
                  <input
                    type="text"
                    defaultValue={data.subjectDescription}
                    onChange={(e) => setSubjectDescription(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Defined By</label>
                  <input
                    type="text"
                    defaultValue={data.definedBy}
                    onChange={(e) => setDefinedBy(e.target.value)}
                    className="form-control"
                    disabled
                  />
                </div>
                <div>
                  <label>Status</label>
                  {/* <input type="text" name="status" defaultValue={data.status} onChange={(e) => setStatus(e.target.value)} className="form-control" /> */}
                  <select
                    defaultValue={data.status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="none" selected disabled hidden>
                      {data.status}
                    </option>
                    <option value="Not Offered">Not Offered</option>
                    <option value="Offered">Offered</option>
                  </select>
                </div>
                <div>
                  <div className="editBtnDiv mt-5 mb-3">
                  <button
                    onClick={() => editsubject(data.id)}
                    className={"savebtn"}
                  >
                    Save Changes
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditSubject;