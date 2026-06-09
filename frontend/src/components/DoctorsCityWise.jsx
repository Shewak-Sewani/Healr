import React from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorsCityWise.css";

const specializations = [
  "Dermatologist",
  "Gynecologist",
  "Urologist",
  "Sexologist",
  "Internal Medicine Specialist",
  "Child Specialist",
  "Orthopedic Surgeon",
  "Eye Specialist",
  "ENT Specialist",
  "Cardiologist",
  "Neurologist",
  "Psychiatrist",
  "General Surgeon",
  "Gastroenterologist",
  "Endocrinologist",
  "Nephrologist",
  "Pulmonologist",
  "Oncologist",
];

const cities = ["Lahore", "Karachi", "Islamabad"];

const DoctorsCityWise = () => {
  const navigate = useNavigate();

  const handleSelect = (spec, city) => {
    navigate(
      `/search-results?specialization=${encodeURIComponent(
        spec
      )}&city=${encodeURIComponent(city)}`
    );
  };

  return (
    <div className="doctors-container">
      {cities.map((city) => (
        <div className="city-section" key={city}>
          <h2 className="city-title">Doctors in {city}</h2>
          {specializations.map((spec) => (
            <div
              className="specialization-item"
              key={`${city}-${spec}`}
              onClick={() => handleSelect(spec, city)}
            >
              <span className="chevron">›</span>
              <span className="link-text">
                Best {spec} in {city}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DoctorsCityWise;
