import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./Header";


function QuranicSubjects() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchSubjects() {
      let result = await fetch("http://localhost:8000/api/quranicsubjects");
      result = await result.json();
      setData(result);
    }
    fetchSubjects();
  }, []);

  async function Search(key) {
    let result = await fetch(
      "http://localhost:8000/api/quranicsubjects/" + key
    );
    result = await result.json();
    // console.warn(result);
    setData(result);
  }

  var rowIndex = 1;
  return (
    <>
    {/* <Header /> */}
    <Navbar />
    <div className="subjectsPage">
      <div className="subjectTitle col-sm-10 offset-sm-1">
        <h1>Quranic Subjects</h1>
      </div>
      <div style={{ paddingTop: "25px", paddingBottom: "25px" }}>

        {/* <form>
        <label className="col me-5">Enter Quranic Subject:</label>
        <input className="col w-75 p-2" type={"text"} placeholder="Search Quranic Subject" onChange={(e) => Search(e.target.value)} />
        </form> */}
        <form> 
          <input
            type={"text"}
            placeholder="Search Quranic Subject"
            className="subjectsInput col-sm-10"
            onChange={(e) => Search(e.target.value)}
          />
          {/* <input
            type={"button"}
            value="Search"
            className="subjectsBtn"
            onClick={(e) => Search(e.target.value)}
            // onChange={(e) => Search(e.target.value)}
          /> */}
        </form>

        
      </div>

      <div className="col-sm-10 offset-sm-1">
        {/* <button
          style={{ marginBottom: "20px" }}
          className="subjectsBtn"
          onClick={fetchSubjects}
        >
          View All Available Courses
        </button> */}
        {/* <h2 style={{ paddingBottom: "10px" }}>Available Offered Courses</h2> */}
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Serial #</th>
              <th>Subject Name</th>
              <th>Description</th>
              <th>Defined By</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody className="QuranicSubjectsTable">
            {data.map((item) => (
              <tr>
                <td>{rowIndex++}</td>
                <td>{item.subjectName}</td>
                <td style={{ width: "500px", textAlign: "left" }}>
                  {item.subjectDescription}
                </td>
                <td>{item.definedBy}</td>
                <td>
                  <Link to={"/QuranicSubjects/Content/" + item.id}>
                    <button className="subjectsBtn">View Content</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* <Footer /> */}
    </div>
    </>
  );
}

export default QuranicSubjects;
