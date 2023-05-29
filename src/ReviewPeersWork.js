import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./Header";

function ReviewPeersWork() {
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



  //define state variables for each radio button value and comments
  const [activityMark1, setActivityMark1] = useState("");
  const [activityMark2, setActivityMark2] = useState("");
  const [activityMark3, setActivityMark3] = useState("");
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");


  //learner Id whose marks are assigned
  const [learnersId, setLearnersId] = useState("");



  const handle3 = async () => {
    // Access the values of activityMark1, activityMark2, and activityMark3
    console.warn("activityMark1:", activityMark1);
    console.warn("activityMark2:", activityMark2);
    console.warn("activityMark3:", activityMark3);

    calculateobtainedmarks();

    setShow3(!show3);
  };


  const params = useParams();

  //get learner id from localstorage
  const user = JSON.parse(localStorage.getItem("user-info"));
  const userId = user ? user.id : "";

  const [courseId, setCourseId] = useState(params.id);

  const [unCheckedData, setUnCheckedData] = useState('');

  // const [learnerId, setLearnerId] = useState('');

  // Get the unchecked solutions details
  useEffect(() => {
    async function getUnCheckedSolutions() {
      const formData = new FormData();
      formData.append("learnerId", userId);
      formData.append("courseId", courseId);

      const result = await fetch("http://localhost:8000/api/getuncheckedsolutions", {
        method: "POST",
        body: formData,
      });

      const responseData = await result.json();
      setUnCheckedData(responseData);

      // set learnerId here
      if (responseData && responseData.learnerId) {
        // setLearnerId(responseData.learnerId);
        console.warn("this is learner id: " + responseData.learnerId);
      }

      getsubjectivesolution(responseData.learnerId);

    }

    getUnCheckedSolutions();
  }, [userId, courseId]);



  const [data, setData] = useState(null);


  async function getsubjectivesolution(learnerId) {
    console.warn("learner id is: " + learnerId);
    setLearnersId(learnerId);
    const formData = new FormData();
    formData.append("learnerId", learnerId);
    formData.append("courseId", courseId);

    try {
      const result = await fetch("http://localhost:8000/api/getsubjectivesolution", {
        method: "POST",
        body: formData,
      });
      const responseData = await result.json();
      console.warn(responseData);
      setData(responseData);
    } catch (error) {
      console.error(error);
    }
  }




  // to save marks in databse ----->
  const [totalMarks] = useState(30);
  // const [obtainedMarks, setObtainedMarks] = useState('');

  function calculateobtainedmarks() {
    const sum = parseInt(activityMark1) + parseInt(activityMark2) + parseInt(activityMark3);
    quizmarks(sum);
  }

  async function quizmarks(obtainedMarks) {
    const formData = new FormData();
    formData.append("learnerId", learnersId);
    formData.append("courseId", courseId);
    formData.append("totalMarks", totalMarks);
    formData.append("obtainedMarks", obtainedMarks);
    formData.append("comment1", comment1);
    formData.append("comment2", comment2);
    formData.append("comment3", comment3);

    let response = await fetch("http://localhost:8000/api/subjectivemarks", {
      method: "POST",
      body: formData
    });

    updatecheck();

  }


  //update the table field to checked
  async function updatecheck() {
    const formData = new FormData();
    formData.append("learnerId", learnersId);
    formData.append("courseId", courseId);
    let response = await fetch("http://localhost:8000/api/updatecheck", {
      method: "POST",
      body: formData
    });
  }




  return (
    <>
      <Navbar />
      <div className="peerReviewPage">
        <h2 className="peerReviewHeader col-sm-8 offset-2 mb-0">
          Subjective Test Grading
        </h2>
        <h2 className="peerReviewHeader col-sm-8 offset-2 mb-0">
          Review Peer's Work
        </h2>
        <div className="peerReviewContainer col-sm-8 offset-2 pb-5">
          {show1 && (
            <>
              <h2>Sample Solution</h2>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Write your answer here."
                value={data?.answer1 || ''}
              ></textarea>
              <br></br>

              <div className="row">
                <div className="col-8">
                  <div className="peerReviewQuestionContainer p-3">
                    <h3
                      className="text-center text-white p-1"
                      style={{ background: "#286029" }}
                    >
                      Question # 01
                    </h3>
                    <h4>{data?.question1 || ''}</h4>

                    <textarea
                      className="form-control"
                      rows={20}
                      placeholder="Write your answer here."
                      value={data?.solution1 || ''}
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
                    <input type="radio" class="form-check-input mb-3" name="activityMark1" value={"10"} checked={activityMark1 === "10"} onChange={(e) => setActivityMark1(e.target.value)} /> Maximum Points: 10

                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Activities for maximum points will display here"
                      value={data?.maxActivity1 || ''}
                    ></textarea>
                    <input type="radio" class="form-check-input mb-3" name="activityMark1" value={"5"} checked={activityMark1 === "5"} onChange={(e) => setActivityMark1(e.target.value)} /> Average Points: 05

                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Activities for average points will display here"
                      value={data?.avgActivity1 || ''}
                    ></textarea>
                    <input type="radio" class="form-check-input mb-3" name="activityMark1" value={"0"} checked={activityMark1 === "0"} onChange={(e) => setActivityMark1(e.target.value)} /> Minimum Points: 00

                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Activities for minimum points will display here"
                      value={data?.minActivity1 || ''}
                    ></textarea>
                    <h5>Comments</h5>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Write you comments here"
                      onChange={(event) => setComment1(event.target.value)}
                    ></textarea>
                  </div>
                </div>

                <button
                  onClick={handle1}
                  className="peerReviewBtn text-center p-2 mt-5 col-3"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {show2 && (
            <>
              <h2>Sample Solution</h2>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Write your answer here."
                value={data?.answer2 || ''}
              ></textarea>
              <div className="row">
                <div className="col-8">
                  <div className="peerReviewQuestionContainer p-3">
                    <h3
                      className="text-center text-white p-1"
                      style={{ background: "#286029" }}
                    >
                      Question # 02
                    </h3>
                    <h4>{data?.question2 || ''}</h4>

                    <textarea
                      className="form-control"
                      rows={20}
                      placeholder="Write your answer here."
                      value={data?.solution2 || ''}
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
                    <input type="radio" class="form-check-input mb-3" name="activityMark2" value={"10"} checked={activityMark2 === "10"} onChange={(e) => setActivityMark2(e.target.value)} /> Maximum Points: 10
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Activities for maximum points will display here"
                      value={data?.maxActivity2 || ''}
                    ></textarea>
                    <input type="radio" class="form-check-input mb-3" name="activityMark2" value={"5"} checked={activityMark2 === "5"} onChange={(e) => setActivityMark2(e.target.value)} /> Average Points: 05
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Activities for average points will display here"
                      value={data?.avgActivity2 || ''}
                    ></textarea>
                    <input type="radio" class="form-check-input mb-3" name="activityMark2" value={"0"} checked={activityMark2 === "0"} onChange={(e) => setActivityMark2(e.target.value)} /> Minimum Points: 00
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Activities for minimum points will display here"
                      value={data?.minActivity2 || ''}
                    ></textarea>
                    <h5>Comments</h5>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Write you comments here"
                      onChange={(event) => setComment2(event.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button
                  onClick={handle1}
                  className="peerReviewBtn text-center p-2 mt-5 col-3 mx-2"
                >
                  Previous
                </button>
                <button
                  onClick={handle2}
                  className="peerReviewBtn text-center p-2 mt-5 col-3 mx-2"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {show3 && (
            <>
              <h2>Sample Solution</h2>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Write your answer here."
                value={data?.answer3 || ''}
              ></textarea>
              <div className="row">
                <div className="col-8">
                  <div className="peerReviewQuestionContainer p-3">
                    <h3
                      className="text-center text-white p-1"
                      style={{ background: "#286029" }}
                    >
                      Question # 03
                    </h3>
                    <h4>{data?.question3 || ''}</h4>

                    <textarea
                      className="form-control"
                      rows={20}
                      placeholder="Write your answer here."
                      value={data?.solution3 || ''}
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
                    <input type="radio" class="form-check-input mb-3" name="activityMark3" value={"10"} checked={activityMark3 === "10"} onChange={(e) => setActivityMark3(e.target.value)} /> Maximum Points: 10
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Activities for maximum points will display here"
                      value={data?.maxActivity3 || ''}
                    ></textarea>
                    <input type="radio" class="form-check-input mb-3" name="activityMark3" value={"5"} checked={activityMark3 === "5"} onChange={(e) => setActivityMark3(e.target.value)} /> Average Points: 05
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Activities for average points will display here"
                      value={data?.avgActivity3 || ''}
                    ></textarea>
                    <input type="radio" class="form-check-input mb-3" name="activityMark3" value={"0"} checked={activityMark3 === "0"} onChange={(e) => setActivityMark3(e.target.value)} /> Minimum Points: 00
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Activities for minimum points will display here"
                      value={data?.minActivity3 || ''}
                    ></textarea>
                    <h5>Comments</h5>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Write you comments here"
                      onChange={(event) => setComment3(event.target.value)}
                    ></textarea>
                  </div>
                </div>

                <button
                  onClick={handle2}
                  className="peerReviewBtn text-center p-2 mt-5 col-3 mx-2"
                >
                  Previous
                </button>
                <button
                  onClick={handle3}
                  className="peerReviewBtn text-center p-2 mt-5 col-3 mx-2"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ReviewPeersWork;