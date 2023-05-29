import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./Header";

function PeerReviewAssessment() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handle1 = () => {
    setShow1(!show1);
    setShow2(!show2);
  };

  const handle2 = () => {
    setShow2(!show2);
    setShow3(!show3);
  };

  const handle3 = () => {
    setShow3(!show3);
    // setquestionsvalues();
    addsubjectivesolution();
  };

  const params = useParams();


  const [questionId1, setQuestionId1] = useState('');
  const [question1, setQuestion1] = useState('');
  const [questionId2, setQuestionId2] = useState('');
  const [question2, setQuestion2] = useState('');
  const [questionId3, setQuestionId3] = useState('');
  const [question3, setQuestion3] = useState('');

  //fetch all data from database
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchQuestion() {
      let result = await fetch("http://localhost:8000/api/getallsubjectivedata/" + params.id);
      result = await result.json();
      // setData(result);
      // Shuffle the questions array
      const shuffledQuestions = result.sort(() => 0.5 - Math.random());
      // Get the first 10 questions from the shuffled array

      const randomQuestions = shuffledQuestions.slice(0, 3);
      setData(randomQuestions);

      // Set the values of the questions in the state variables
      setQuestion1(randomQuestions[0]?.question || '');
      setQuestionId1(randomQuestions[0]?.id || '');
      setQuestion2(randomQuestions[1]?.question || '');
      setQuestionId2(randomQuestions[1]?.id || '');
      setQuestion3(randomQuestions[2]?.question || '');
      setQuestionId3(randomQuestions[2]?.id || '');

      getsubjectname();
    }

    fetchQuestion();
  }, [])

  const [subject, setSubject] = useState([]);

  async function getsubjectname() {
    try {
      let result = await fetch("http://localhost:8000/api/getcoursename/" + params.id);
      if (!result.ok) {
        throw new Error("Failed to fetch data");
      }
      result = await result.json();
      setSubject(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, show an error message, or take appropriate action
    }
  }

  // async function getsubjectname() {
  //   try {
  //     alert(params.id);
  //     const response = await fetch("http://localhost:8000/api/getcoursename/" + params.id);
  //     const jsonData = await response.json();
  //     setSubject(jsonData);
  //     alert(jsonData);
  //     console.warn(jsonData);
  //     alert (subject);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };


  //get learner id from localstorage
  const user = JSON.parse(localStorage.getItem("user-info"));
  const learnerId = user ? user.id : "";




  //this is Id of subject that is selecteds
  const [subjectId, setSubjectId] = useState(params.id);
  const [solution1, setSolution1] = useState([]);
  const [solution2, setSolution2] = useState([]);
  const [solution3, setSolution3] = useState([]);

  async function addsubjectivesolution() {
    const formData = new FormData();
    formData.append("courseId", subjectId);
    formData.append("learnerId", learnerId);
    formData.append("questionId1", questionId1);
    formData.append("question1", question1);
    formData.append("solution1", solution1);
    formData.append("questionId2", questionId2);
    formData.append("question2", question2);
    formData.append("solution2", solution2);
    formData.append("questionId3", questionId3);
    formData.append("question3", question3);
    formData.append("solution3", solution3);

    console.warn(formData);

    try {
      let response = await fetch("http://localhost:8000/api/addsubjectivesolution", {
        method: "POST",
        body: formData
      });

      let responseData = await response.json();

    } catch (error) {
      console.error("Error:", error);
      conosle.log(error.message);
    }
  }



  return (
    <>
      <Navbar />
      <div className="peerReviewPage">
        <h2 className="peerReviewHeader col-sm-8 offset-2 mb-0">
          Subjective Test
        </h2>
        <h2 className="peerReviewHeader col-sm-8 offset-2 mb-0">
          Peer Review Assessment
        </h2>
        <div className="peerReviewContainer col-sm-8 offset-2 pb-5">
          <h2>Test Description</h2>
          <ul>
            <li>Course Name : {subject.subjectName}</li>
            <li>Total Questions : 03</li>
            <li>Total Points : 03*10 = 30</li>
            <li>There is no negative marking</li>
          </ul>
          <a href="#">Download helping resource</a>
          <br></br>
          <br></br>


          {show1 && (
            <>
              <div className="row">
                <div className="col-8">
                  <div className="peerReviewQuestionContainer p-3">
                    <h3
                      className="text-center text-white p-1"
                      style={{ background: "#286029" }}
                    >
                      Question # 01
                    </h3>
                    <h4 id="question1">{data.length > 0 && data[0].question}</h4>

                    <textarea
                      className="form-control"
                      rows={18}
                      placeholder="Write your answer here."
                      onChange={(event) => setSolution1(event.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-4">
                  <div className="peerReviewRubricContainer p-3">
                    <h3
                      className="text-center text-white p-1"
                      style={{ background: "#286029" }}
                    >
                      Rubric
                    </h3>
                    <h4 className="text-center">Grading Criteria</h4>
                    <h5>Maximum Points: 10</h5>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Activities for maximum points will display here"
                      value={data.length > 0 && data[0].maxActivity}
                    ></textarea>
                    <h5>Average Points: 05</h5>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Activities for average points will display here"
                      value={data.length > 0 && data[0].averageActivity}
                    ></textarea>
                    <h5>Minimum Points: 00</h5>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Activities for minimum points will display here"
                      value={data.length > 0 && data[0].minActivity}
                    ></textarea>
                  </div>
                </div>

                <button onClick={handle1} className="peerReviewBtn text-center p-2 mt-5 col-3">
                  Next
                </button>
              </div>
            </>
          )}


          {show2 && (
            <>
              <div className="row">
                <div className="col-8">
                  <div className="peerReviewQuestionContainer p-3">
                    <h3
                      className="text-center text-white p-1"
                      style={{ background: "#286029" }}
                    >
                      Question # 02
                    </h3>
                    <h4 id="question2">{data.length > 1 && data[1].question}</h4>

                    <textarea
                      className="form-control"
                      rows={18}
                      placeholder="Write your answer here."
                      onChange={(event) => setSolution2(event.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-4">
                  <div className="peerReviewRubricContainer p-3">
                    <h3
                      className="text-center text-white p-1"
                      style={{ background: "#286029" }}
                    >
                      Rubric
                    </h3>
                    <h4 className="text-center">Grading Criteria</h4>
                    <h5>Maximum Points: 10</h5>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Activities for maximum points will display here"
                      value={data.length > 1 && data[1].maxActivity}
                    ></textarea>
                    <h5>Average Points: 05</h5>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Activities for average points will display here"
                      value={data.length > 1 && data[1].averageActivity}
                    ></textarea>
                    <h5>Minimum Points: 00</h5>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Activities for minimum points will display here"
                      value={data.length > 1 && data[1].minActivity}
                    ></textarea>
                  </div>
                </div>
                <button onClick={handle1} className="peerReviewBtn text-center p-2 mt-5 col-3 mx-2">
                  Previous
                </button>
                <button onClick={handle2} className="peerReviewBtn text-center p-2 mt-5 col-3 mx-2">
                  Next
                </button>
              </div>
            </>
          )}


          {show3 && (
            <>
              <div className="row">
                <div className="col-8">
                  <div className="peerReviewQuestionContainer p-3">
                    <h3
                      className="text-center text-white p-1"
                      style={{ background: "#286029" }}
                    >
                      Question # 03
                    </h3>
                    <h4 id="question3">{data.length > 2 && data[2].question}</h4>

                    <textarea
                      className="form-control"
                      rows={18}
                      placeholder="Write your answer here."
                      onChange={(event) => setSolution3(event.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-4">
                  <div className="peerReviewRubricContainer p-3">
                    <h3
                      className="text-center text-white p-1"
                      style={{ background: "#286029" }}
                    >
                      Rubric
                    </h3>
                    <h4 className="text-center">Grading Criteria</h4>
                    <h5>Maximum Points: 10</h5>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Activities for maximum points will display here"
                      value={data.length > 2 && data[2].maxActivity}
                    ></textarea>
                    <h5>Average Points: 05</h5>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Activities for average points will display here"
                      value={data.length > 2 && data[2].averageActivity}
                    ></textarea>
                    <h5>Minimum Points: 00</h5>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Activities for minimum points will display here"
                      value={data.length > 2 && data[2].minActivity}
                    ></textarea>
                  </div>
                </div>

                <button onClick={handle2} className="peerReviewBtn text-center p-2 mt-5 col-3 mx-2">
                  Previous
                </button>
                <Link to={"/ReviewPeersWork/" + params.id} > <button onClick={handle3} className="peerReviewBtn text-center p-2 mt-5 col-3 mx-2">
                  Submit
                </button></Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PeerReviewAssessment;