import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h2 className="brand">
            <span style={{ color: '#ff6b35' }}>hea</span><span style={{ color: '#0033cc' }}>lr</span>
          </h2>
          <p>
            Book appointments with top doctors and specialists in Pakistan.
            Avail services like MRI, CT scan, Ultrasound, X-Ray, and video
            consultations.
          </p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy policy</Link>
            </li>
            <li>
              <Link to="/delivery-policy">Delivery Policy</Link>
            </li>
            <li>
              <Link to="/refund-policy">Refund Policy</Link>
            </li>
            <li>
              <Link to="/payment-terms">Payment Terms</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Major Cities</h4>
          <ul>
            <li>
              <a href="#">Karachi</a>
            </li>
            <li>
              <a href="#">Lahore</a>
            </li>
            <li>
              <a href="#">Islamabad</a>
            </li>
            <li>
              <a href="#">Rawalpindi</a>
            </li>
            <li>
              <a href="#">Multan</a>
            </li>
            <li>
              <a href="#">Peshawar</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Top Hospitals</h4>
          <ul>
            <li>
              <a href="#">Doctors Hospital</a>
            </li>
            <li>
              <a href="#">Shifa International</a>
            </li>
            <li>
              <a href="#">Fatima Memorial</a>
            </li>
            <li>
              <a href="#">South City Hospital</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Lab Tests</h4>
          <ul>
            <li>
              <Link to="/labs?query=MRI">MRI in Lahore</Link>
            </li>
            <li>
              <Link to="/labs?query=CT%20Scan">CT Scan</Link>
            </li>
            <li>
              <Link to="/labs?query=X-Ray">X-Ray</Link>
            </li>
            <li>
              <Link to="/labs?query=Ultrasound">Ultrasound</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
