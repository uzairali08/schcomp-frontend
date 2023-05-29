// import logo1 from "./images/logo-1.png";
import image from "./images/logo-1.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CustomAlert from "./CustomAlert";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  async function login() {
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/adminlogin", {
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
      navigate("/StatisticsCharts");
    }
  }

  // if Admin is login redirect to Home Page
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate("/StatisticsCharts");
    }
  }, []);


  return (
    <>
    <CustomAlert message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
    <div style={{ backgroundColor: "#ddf7e3" }}>
      <div class="container register-form col-md-5 pt-5 pb-5">
        <div class="form">
          <div class="note">
            <h2>Login as Admin</h2>
          </div>
        </div>
        <div class="form-content register-content" style={{ backgroundColor: "white" }}>
          <img src={image} width={"250px"}/>
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
export default AdminLogin;
