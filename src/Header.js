import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import logo1 from "./images/logo-1.png";
import centerPicture from "./images/ilm.jpg";
import learnerlogo from "./images/learner-profile.png";
import scholarlogo from "./images/scholar-profile.png";
import adminlogo from "./images/admin-profile.png";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user-info'));

  let logo = null;
  if (user != null) {
    const userrole = user.userrole;

    if (userrole === "Learner") {
      logo = <img className="profilelogo" src={learnerlogo} />;
    } else if (userrole === "Scholar") {
      logo = <img className="profilelogo" src={scholarlogo} />;
    } else {
      logo = <img className="profilelogo" src={adminlogo} />;
    }
  }

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  function buttonClick() {
    navigate("/QuranicSubjects");
    // alert("Quranic Subjects!");
  }

  return (
    <div>
      <Navbar expand="lg" className="p-0" style={{ backgroundColor: "white" }}>
        <>
          <Navbar.Brand href="http://localhost:3000/" className="mx-5">
            <img src={logo1} className="logo" alt="" width={"150px"} />
          </Navbar.Brand>
          <Nav className="m-auto">
            <img
              src={centerPicture}
              className="headerAyat"
              alt=""
              width={"500px"}
            />
          </Nav>
          <Nav className="mr-auto mx-4">
            {user != null ? (
              <>
                {/* <Link to={"/QuranicSubjects"} className="headerLink">Quranic Subjects</Link> */}

                <span className="logoutspan">
                  {logo}
                  <NavDropdown className="dropdowntext" title={user.firstName}>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </span>
              </>
            ) : (
              <>
                <Link to={"/RegisterProfile"} className="headerLink">
                  Sign-up
                </Link>
                <Link to={"/LoginProfile"} className="headerLink">
                  Login
                </Link>
              </>
            )}
          </Nav>
        </>
      </Navbar>
    </div>
  );
}

export default Header;
