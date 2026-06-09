import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeroSection.css";
import doctorImage from "../images/image1.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-md-6 text-white">
            <h1 className="display-5 fw-bold">
              Find and Book the <span className="highlight">Best Doctors</span>{" "}
              near you
            </h1>
            <div className="badge-box mt-3">
              <span className="badge-text">🧑‍⚕️ Where doctors meet digital.</span>
            </div>

            <form onSubmit={handleSearch} className="search-bar mt-4">
              <div className="search-container">
                <input
                  type="text"
                  className="form-control main-search-input"
                  placeholder="Doctors, Hospital, Conditions"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-warning search-button text-white fw-bold"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Right Content */}
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src={doctorImage}
              alt="Doctor"
              className="img-fluid rounded hero-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
