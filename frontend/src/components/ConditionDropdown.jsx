import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const conditionToSpecialization = {
  acne: ["Dermatologist"],
  diarrhea: ["Gastroenterologist", "General Physician"],
  fever: ["General Physician", "Pediatrician"],
  "heart attack": ["Cardiologist"],
  "high blood pressure": ["Cardiologist", "General Physician"],
  piles: ["Gastroenterologist", "General Surgeon"],
  pregnancy: ["Gynecologist"],
  asthma: ["Pulmonologist", "General Physician"],
  "back pain": ["Orthopedic Surgeon", "Physiotherapist"],
  ear: ["ENT Specialist"],
  "skin disease": ["Dermatologist"],
  "tooth ache": ["Dentist"],
};

const conditions = [
  "Acne",
  "Diarrhea",
  "Fever",
  "Heart Attack",
  "High Blood Pressure",
  "Piles",
  "Pregnancy",
  "Asthma",
  "Back Pain",
  "Ear",
  "Skin Disease",
  "Tooth Ache",
];

const ConditionsDropdown = () => {
  const [showConditions, setShowConditions] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowConditions(!showConditions);
  };

  const handleSelectCondition = (condition) => {
    const specializations = conditionToSpecialization[condition.toLowerCase()];
    if (specializations && specializations.length > 0) {
      const query = encodeURIComponent(specializations[0]);
      navigate(`/search-results?query=${query}`);
      setShowConditions(false);
    } else {
      alert("No specialization found for this condition.");
    }
  };

  return (
    <div className="position-relative"
      onMouseLeave={() => setShowConditions(false)}
    >
      <div
        onClick={toggleDropdown}
        className="nav-link nav-underline"
        style={{
          cursor: "pointer",
          color: "#333",
          textDecoration: "none",
          fontWeight: "500",
        }}
      >
        Medical conditions
      </div>

      {showConditions && (
        <div
          className="dropdown-scrollbox"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
            background: "white",
            border: "1px solid #ccc",
            maxHeight: "300px",
            overflowY: "auto",
            width: "220px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {conditions.map((condition, index) => (
            <div
              key={index}
              onClick={() => handleSelectCondition(condition)}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: "14px",
                borderBottom: "1px solid #eee",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              {condition}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConditionsDropdown;
