import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { BsChevronCompactLeft } from "react-icons/bs";

function Result() {

  const params = useParams();

  //get learner id from localstorage
  const user = JSON.parse(localStorage.getItem("user-info"));
  const learnerId = user ? user.id : "";

  //get the courseId
  const [courseId, setCoursesId] = useState(params.id);




  // fetch objective test data from backend
  const [objectiveMarks, setObjectiveMarks] = useState('');

  //fetch subjective test data from backend
  const [subjectiveMarks, setSubjectiveMarks] = useState([]);
  const [comment1, setComment1] = useState('');
  const [comment2, setComment2] = useState('');
  const [comment3, setComment3] = useState('');

  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('learnerId', learnerId);

      //fetch objective data
      let result1 = await fetch("http://localhost:8000/api/objectiveresult", {
        method: "POST",
        body: formData
      });
      result1 = await result1.json();
      setObjectiveMarks(result1?.obtainedMarks || '');



      //fetch subjective data
      let result2 = await fetch("http://localhost:8000/api/subjectiveresult", {
        method: "POST",
        body: formData
      });
      result2 = await result2.json();
      setSubjectiveMarks(result2?.obtainedMarks || '');
      setComment1(result2?.comment1 || '');
      setComment2(result2?.comment2 || '');
      setComment3(result2?.comment3 || '');



      calculateresult(result1.obtainedMarks, result2.obtainedMarks);
    }

    fetchData();
  }, []);





  //fetch subjective test data from backend
  // const [subjectiveMarks, setSubjectiveMarks] = useState([]);
  // const [comment1, setComment1] = useState('');
  // const [comment2, setComment2] = useState('');
  // const [comment3, setComment3] = useState('');

  // useEffect(() => {
  //   async function fetchData() {
  //     const formData = new FormData();
  //     formData.append('courseId', courseId);
  //     formData.append('learnerId', learnerId);

  //     //fetch subjective data
  //     let result = await fetch("http://localhost:8000/api/subjectiveresult", {
  //       method: "POST",
  //       body: formData
  //     });
  //     result = await result.json();
  //     setSubjectiveMarks(result?.obtainedMarks || '');
  //     setComment1(result?.comment1 || '');
  //     setComment2(result?.comment2 || '');
  //     setComment3(result?.comment3 || '');

  //     subjfun(result.obtainedMarks);

  //     calculateresult();

  //   }

  //   fetchData();
  // }, []);


  const [success, setSuccess] = useState("");
  const [fail, setFail] = useState("");


  //calculate the percentag of result
  const [totalMarks, setTotalMarks] = useState('');
  const [percentage, setPercentage] = useState('');


  function calculateresult(objective, subjective) {
    // Convert obtainedMarks to an integer
    const objectiveInt = parseInt(objective);
    const subjectiveInt = parseInt(subjective);

    const total = objectiveInt + subjectiveInt;

    const percent = (total / 40) * 100;
    setTotalMarks(total);
    setPercentage(percent);

    if (percent<60){
      setSuccess(false);
      setFail(true);
    }
    else{
      setSuccess(true);
      setFail(false);
    }
  }


  

  return (
    <>
      <Navbar />
      <div className="resultPage">
        <h2 className="resultHeader col-sm-8 offset-2 mb-0">Result</h2>

        <div className="resultContainer col-sm-8 offset-2 pb-5">
          {success && (
            <h1 className="resultSuccessHeader p-3"><span className="fs-2">🎉</span> Congraluations!!!<span className="fs-2">🎉</span></h1>
          )}

          {fail && (
            <h1 className="resultFailHeader p-3"><span className="fs-2">❌</span> Hard Luck!!!<span className="fs-2">❌</span></h1>
          )}
          <h2>Your Score: {totalMarks}</h2>
          <h1 className="resultPercentage">Total Percentage: {percentage}%</h1>

          <br></br>
          <Table hover variant="white">
            <thead className="resultTableHeader">
              <tr>
                <th>Serial #</th>
                <th>Type</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Interactive Learning</td>
                <td>--</td>
                <td>--</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Objective Test (Practice)</td>
                <td>--</td>
                <td>--</td>
              </tr>

              <tr>
                <td>3</td>
                <td>Objective Test (Graded)</td>
                <td>10</td>
                <td>{objectiveMarks}</td>
              </tr>

              <tr>
                <td>4.</td>
                <td>Subjective Test (Peer Review)</td>
                <td>30</td>
                <td>{subjectiveMarks}</td>
              </tr>
            </tbody>
          </Table>

          <div>
            <h3>Comments:</h3>
            <p>{comment1}</p>
            <p>{comment2}</p>
            <p>{comment3}</p>
          </div>

          <div className="col-12 text-center pt-3">
            <button className="resultBtn py-2">Back To Home</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;