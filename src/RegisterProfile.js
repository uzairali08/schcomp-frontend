import scholar from "./images/scholar-logo.jpg";
import learner from "./images/learner-logo.jpg";
import { Link } from "react-router-dom";

function RegisterProfile() {
  return (
    <div className="loginProfile p-5">
      <div className="loginProfileContent col-sm-6 offset-3 p-5">
        <h1 style={{ color: "#286029" }}>Join Scholar's Companion as:</h1>

        <div className="loginContainer">
          <Link to={"/ScholarRegistration"}>
            <input
              type={"image"}
              src={scholar}
              width={"250px"}
              value="Scholar"
              style={{ padding: "20px" }}
            />
          </Link>
        </div>

        <div className="loginContainer">
          <Link to={"/LearnerRegistration"}>
            <input
              type={"image"}
              src={learner}
              width={"250px"}
              value="Scholar"
              style={{ padding: "20px" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterProfile;
