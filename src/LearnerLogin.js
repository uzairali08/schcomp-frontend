import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "./Header";
import CustomAlert from "./CustomAlert";
import image from "./images/logo-1.png";

function LearnerLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  async function login() {
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/learnerlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    if (result.error) {
      setAlertMessage(result.error);
      setShowAlert(true);
    } else if (result.success) {
      setAlertMessage("Login Successfully");
      setShowAlert(true);

      //user info saved in local storage
      localStorage.setItem("user-info", JSON.stringify(result.user));
      navigate("/QuranicSubjects");
    }
  }


  // if Learner is login redirect to Quranic Subject Page
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate("/QuranicSubjects");
    }
  }, []);


  return (
    <>
      {/* <Header /> */}
      <CustomAlert message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
      <div style={{ backgroundColor: "#ddf7e3" }}>
        <div class="container register-form col-md-5 pt-5 pb-5">
          <div class="form">
            <div class="note">
              <h2>Login as a Learner</h2>
            </div>
          </div>
          <div class="form-content register-content" style={{ backgroundColor: "white"  }}>
            <img src={image} width={"250px"} />
            <div class="col-sm-10 offset-1 p-2">
              <div class="loginn-app">
                {" "}
                <br />
                <label style={{float:"left"}}>Email</label>
                <input
                  type="text"
                  class="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <label style={{float:"left"}}>Password</label>
                <input
                  type="password"
                  class="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <br />
                <span
                type="button"
                  className="signupBtn col-5"
                  onClick={login}
                >
                  Login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LearnerLogin;
