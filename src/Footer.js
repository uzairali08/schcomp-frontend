import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub, FaHome, FaEnvelope, FaPhone
} from "react-icons/fa";
import logo1 from "./images/logo-1.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footerTopSection d-flex justify-content-between pt-2">
        <div className="row">
          <div className="col-md-2 col-sm-12 text-sm-center">
            <h3>Get connected:</h3>
          </div>
          <div className="col-md-3 col-sm-12 text-sm-center">
            <a href="#" className="me-4">
              <FaFacebookF color="white" size={25} />
            </a>
            <a href="#" className="me-4">
              <FaTwitter color="white" size={25} />
            </a>
            <a href="#" className="me-4">
              <FaGoogle color="white" size={25} />
            </a>
            <a href="#" className="me-4">
              <FaInstagram color="white" size={25} />
            </a>
            <a href="#" className="me-4">
              <FaLinkedin color="white" size={25} />
            </a>
            <a href="#" className="me-4">
              <FaGithub color="white" size={25} />
            </a>
          </div>
          <div className="col-md-4 col-sm-12"></div>
        </div>
      </div>
      <div className="footerMiddleSection p-5 pb-3">
        <div className="row">
          <div className="col-md-3 col-sm-12 text-sm-center">
          <h4 className="text-uppercase fw-bold">MUALLIM</h4>
          <h4 className="text-uppercase fs-5 fw-bold">Scholar's Companion</h4>
            <div className="footer-logo">
              {/* <img src={logo1} alt="Company Name" width={210} /> */}
              <p>
                A web-based software application for Subject-Specific Learning
                of Quran-il-Hakeem
              </p>
            </div>
          </div>
          <div className="col-md-3 col-sm-12 text-sm-center">
            <h4 className="text-uppercase fw-bold">Our Services</h4>
            <p>
              <a href="#" class="text-dark">Subject Specific Learning</a>
            </p>
            <p>
              <a href="#" class="text-dark">Interactive Learning Sessions</a>
            </p>
            <p>
              <a href="#" class="text-dark">Computer Based Testing</a>
            </p>
            <p>
              <a href="#" class="text-dark">Visualization of Quranic Subjects</a>
            </p>
          </div>
          <div className="col-md-3 col-sm-12 text-sm-center">
            <h4 className="text-uppercase fw-bold">Quick Links</h4>
            <p>
              <a href="#" class="text-dark">Homepage</a>
            </p>
            <p>
              <a href="#" class="text-dark">Quranic Subjects</a>
            </p>
            <p>
              <a href="#" class="text-dark">Our Services</a>
            </p>
            <p>
              <a href="#" class="text-dark">About Us</a>
            </p>
          </div>
          <div className="col-md-3 col-sm-12 text-sm-center">
            <h4 className="text-uppercase fw-bold">Contact Us</h4>
            <p> <FaHome size={25} color="black" /> Foundation University Islamabad</p>
            <p> <FaEnvelope size={25} color="black" />  uzair7508@gmail.com</p>
            <p> <FaPhone size={25} color="black" />  +92 335 8777607</p>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <h4 className="text-center">All rights reserved &copy; Scholar's Companion 2023</h4>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
