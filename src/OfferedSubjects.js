import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import "./offeredsubjects.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Button } from "react-bootstrap";
import Navbar from "./components/Navbar";


function OfferedSubjects() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let result = await fetch("http://localhost:8000/api/offeredsubjects");
      result = await result.json();
      setData(result);
    }
    fetchMyAPI();
  }, []);

  async function deleteOperation(id) {
    let result = await fetch("http://localhost:8000/api/deletesubject/" + id, {
      method: "DELETE",
    });
    result = await result.json();
    getData();
  }

  async function getData() {
    let result = await fetch("http://localhost:8000/api/offeredsubjects");
    result = await result.json();
    setData(result);
  }

  var rowIndex = 1;
  return (
    <div className="pageBackground">
      <Navbar />
      <div className="pt-5 pb-5">
        <div className="headingTile col-sm-10 offset-1">
          <h1>Offered Subjects</h1>
        </div>

        <div className="col-sm-10 offset-1 pt-4">
          <Table
            striped
            bordered
            hover
            variant="light"
            style={{ paddingTop: "25px" }}
          >
            <thead>
              <tr className="">
                <th>Serial No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Defined By</th>
                <th>Status</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody style={{ verticalAlign: "middle" }}>
              {data.map((item) => (
                <tr>
                  <td style={{ width: "100px" }}>{rowIndex++}</td>
                  <td style={{ textAlign: "center", width: "150px" }}>
                    {item.subjectName}
                  </td>
                  <td style={{ textAlign: "left", width: "500px" }}>
                    {item.subjectDescription}
                  </td>
                  <td style={{ width: "200px" }}>{item.definedBy}</td>
                  <td style={{ width: "100px" }}>{item.status}</td>
                  <td>
                    <div className="operator">
                      <Link to={"/EditSubject/" + item.id}>
                        <button className="subjectsEditBtn">Edit</button>
                      </Link>
                      <button
                        onClick={() => {
                          deleteOperation(item.id);
                        }}
                        className="subjectsDeleteBtn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default OfferedSubjects;
