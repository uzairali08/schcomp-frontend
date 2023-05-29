import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import "./registeredlearners.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Button } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Card from "react-bootstrap/Card";

function RegisteredCourses() {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const id = user ? user.id : "";

  const [learnerId] = useState(id);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/registeredcourses/${learnerId}`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMyAPI();
  }, []);

  //delete operation code ----->
  async function deleteOperation(id) {
    let result = await fetch(
      "http://localhost:8000/api/deleteregisteredcourse/" + id,
      {
        method: "DELETE",
      }
    );
    result = await result.json();
    getData();
  }

  async function getData() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/registeredcourses/${learnerId}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  //view operation code ----->
  async function viewOperation(id) {
    navigate;
  }

  var rowIndex = 1;
  return (
    <div className="pb-5" style={{ backgroundColor: "#ddf7e3" }}>
      <Navbar />
      <div className="col-sm-10 offset-1 pt-5 pb-5">
        <div className="text-center">
          <h1
            className="text-uppercase text-white mb-0"
            style={{ backgroundColor: "#286029" }}
          >
            My Courses
          </h1>
        </div>

        <div className="pb-5 pt-5 ps-4 bg-white">
          <div className="row">
          {data.map((item) => (
            <div className="col-4">
            
              <Card
                style={{
                  backgroundColor: "#ddf7e3",
                  border: "2px solid #286029",
                }}
              >
                
                <Card.Body className="pt-3 pb-3">
                  <Card.Title
                    className="text-center"
                    style={{ color: "#286029" }}
                  >
                    {item.subjectName}
                  </Card.Title>
                  <Card.Text>
                    You can proceed to course by clicking button below:
                  </Card.Text>
                  <div className="text-center">
                  <Link to={"/CourseMenu/" + item.coursesId}>
                        <button
                          onClick={() => {
                            viewOperation();
                          }}
                          className="mb-2"
                          style={{width:"100%", backgroundColor:"#286029", color:"white", padding:"5px 0px 5px 0px", border:"none"}}
                        >
                          Go to course
                        </button>
                      </Link>

                      <br></br>
                      <button
                        onClick={() => {
                          deleteOperation(item.id);
                        }}
                        style={{width:"100%", backgroundColor:"#DF2E38", color:"white", padding:"5px 0px 5px 0px", border:"none"}}
                      >
                        Drop the course
                      </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
            ))}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default RegisteredCourses;
