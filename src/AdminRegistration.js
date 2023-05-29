import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import CustomAlert from "./CustomAlert";

function AdminRegistration() {

  const navigate = useNavigate(); // declare the navigate function

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCNIC] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const [passwordError, setPasswordError] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword !== e.target.value) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  async function signUp() {
    let item = {
      firstName,
      lastName,
      email,
      cnic,
      password,
      gender,
      nationality,
      dateOfBirth
    };
    console.log(item); // Add this line to print the item object
    try {
      let result = await fetch("http://localhost:8000/api/adminregistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });
      if (!result.ok) {
        // throw new Error("Network response was not ok");
        // alert("An unexpected error occured!!!");
        setAlertMessage("An unexpected error occured!!!");
        setShowAlert(true);
      }else if(result.ok){
        navigate("/AdminLogin");
        // alert("Registered Successfully");
        setAlertMessage("Registered Successfully");
        setShowAlert(true);
      }
      result = await result.json();
      console.log(result); // Add this line to print the response
    } catch (error) {
      console.error("Error:", error);
      // alert("Error: " , error)
      setAlertMessage("Error: ", error);
      setShowAlert(true);
    }
  }

  // if Admin is login redirect to Home Page
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate("/QuranicSubject");
    }
  }, []);




  return (
    <>
      {/* <Header /> */}
      <CustomAlert message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
      <div style={{ backgroundColor: "#ddf7e3" }}>
        <div class="container register-form col-md-5 pt-5 pb-5">
          <div class="form" style={{ backgroundColor: "#fff"}}>
            <div class="note">
              <h2>Join as an Admin</h2>
            </div>

            <div class="form-content register-content" style={{ backgroundColor: "white" }}>
              <div class="col-sm-12">
                <div>
                <label style={{float:"left"}}>First Name*</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    class="form-control"
                    placeholder="First Name *"
                  />
                  <label style={{float:"left"}}>Last Name*</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    class="form-control"
                    placeholder="Last Name *"
                  />
                  <label style={{float:"left"}}>Email*</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="form-control"
                    placeholder="Email *"
                  />
                  <label style={{float:"left"}}>CNIC Number</label>
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCNIC(e.target.value)}
                    class="form-control"
                    placeholder="CNIC Number"
                  />
                  <label style={{float:"left"}}>Password*</label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    // onChange={(e) => setPassword(e.target.value)}
                    class="form-control"
                    placeholder="Password *"
                  />
                  <label style={{float:"left"}}>Confirm Password*</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                    class="form-control"
                    placeholder="Confirm Password *"
                  />

                  {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

                  <div className="genderRadio offset-2">
                    <h5>Gender:</h5>
                    <input
                      style={{ marginLeft: "15px" }}
                      type="radio"
                      value="Male"
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                    />{" "}
                    <p style={{ marginLeft: "5px" }}>Male</p>
                    <input
                      style={{ marginLeft: "15px" }}
                      type="radio"
                      value="Female"
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                    />{" "}
                    <p style={{ marginLeft: "5px" }}>Female</p>
                    <input
                      style={{ marginLeft: "15px" }}
                      type="radio"
                      value="Other"
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                    />{" "}
                    <p style={{ marginLeft: "5px" }}>Other</p>
                  </div>

                  <label style={{float:"left"}}>Select Nationality</label>
                  <select
                    onChange={(e) => setNationality(e.target.value)}
                    className="form-control"
                  >
                    <option value={"Select Nationality"} selected hidden>
                      Select Nationality
                    </option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Iran">Iran</option>
                  </select>

                  <label style={{float:"left"}}>Date of Birth</label>
                  <div>
                    <ReactDatePicker
                      className="form-control"
                      placeholderText="Date Of Birth"
                      selected={dateOfBirth}
                      onChange={(date) => setDateOfBirth(date)}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <a href="/AdminLogin"><em>Already have an Account! Login Now!!!</em></a> <br></br>
                  <br></br>
                  <span type="button" onClick={signUp} className="signupBtn">
                    Register / Sign-Up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminRegistration;
