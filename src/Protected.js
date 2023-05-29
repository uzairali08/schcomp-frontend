import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import CustomAlert from "./CustomAlert";

function Protected(props) {
  const { Component } = props;
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-info"));
    if (!user) {
      navigate("/");
      return;
    }
    const userRole = user.userrole;

    if (userRole === "Learner") {
      const allowedRoutes = [
        "/OfferedSubjects",
        "/QuranicSubjects",
        "/QuranicSubjects/Content/" + params.id,
        "/InteractiveLearningSession/" + params.id,
        "/Quizz/" + params.id,
        "/PracticeTest/" + params.id,
      ];

      if (!allowedRoutes.includes(location.pathname)) {
        // alert("Access Denied! You are not permitted to access this link");
        setAlertMessage(
          "Access Denied! You are not permitted to access this link"
        );
        setShowAlert(true);
        navigate("/QuranicSubjects");
      }
    } else if (userRole === "Admin") {
      const allowedRoutes = [
        "/Subjects",
        "/EditSubject/" + params.id,
        "/RegisteredLearners",
        "/RegisteredScholars",
        "/RegisteredCoursesList",
        "/QuranicSubjects",
        "/QuranicSubjects/Content/" + params.id,
      ];
      if (!allowedRoutes.includes(location.pathname)) {
        // alert("Access Denied! You are not permitted to access this link");
        setAlertMessage(
          "Access Denied! You are not permitted to access this link"
        );
        setShowAlert(true);
        navigate("/QuranicSubjects");
      }
    } else if (userRole === "Scholar") {
      const allowedRoutes = [
        "/AddCourse",
        "/AddObjectiveTest",
        "/AddSubjectiveTest",
        "/QuranicSubjects",
        "/QuranicSubjects/Content/" + params.id,
        "/Subjects",
        "/EditSubject/" + params.id,
        "/OfferedSubjects",
        "/RegisteredCoursesList",
      ];
      if (!allowedRoutes.includes(location.pathname)) {
        // alert("Access Denied! You are not permitted to access this link");
        setAlertMessage(
          "Access Denied! You are not permitted to access this link"
        );
        setShowAlert(true);
        navigate("/QuranicSubjects");
      }
    }
    setLoading(false);
  }, [navigate, location.pathname]);

  if (loading) {
    return (
      <>
        <div class="loader">
          <div class="loader-text">Loading...</div>
          <div class="loader-bar"></div>
        </div>
      </>
    ); // Render your loading screen component
  }

  return (
    <>
      {" "}
      <CustomAlert
        message={alertMessage}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />{" "}
      <Component />
    </>
  );
}
export default Protected;
