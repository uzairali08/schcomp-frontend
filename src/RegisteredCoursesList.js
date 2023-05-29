import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import "./registeredlearners.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Button } from "react-bootstrap";
import Navbar from "./components/Navbar";


function RegisteredCoursesList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let result = await fetch("http://localhost:8000/api/registeredcourseslist");
      result = await result.json();
      setData(result);
    }
    fetchMyAPI();
  }, []);

  async function deleteOperation(id) {
    let result = await fetch("http://localhost:8000/api/deleteregisteredcourse/" + id, {
      method: "DELETE",
    });
    result = await result.json();
    getData();
  }

  async function getData() {
    let result = await fetch("http://localhost:8000/api/registeredcourseslist");
    result = await result.json();
    setData(result);
  }

  var rowIndex = 1;
  return (
    <div className="pageBackground">
      <Navbar />
      <div className="col-sm-10 offset-1 pt-5 pb-5">
        <div className="headingTile">
          <h1>Enrolled Learners</h1>
        </div>

        <div style={{ paddingTop: "25px" }}>
          <Table striped bordered hover variant="light" className="">
            <thead>
              <tr className="tableheading">
                <th>Serial No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Course Name</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{rowIndex++}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.subjectName}</td>
                  <td>
                    <div className="operator">
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

export default RegisteredCoursesList;
