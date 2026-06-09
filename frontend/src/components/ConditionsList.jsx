import React from "react";
import "./ConditionsList.css";
import { useNavigate } from "react-router-dom";

import Acne from "../assets/conditions/acne.png";
import Diarrhea from "../assets/conditions/diarrhea.png";
import Fever from "../assets/conditions/fever.png";
import HeartAttack from "../assets/conditions/heart-attack.png";
import HighBloodPressure from "../assets/conditions/high-blood-pressure.png";
import Piles from "../assets/conditions/piles.png";
import Pregnancy from "../assets/conditions/pregnancy.png";
import Asthma from "../assets/conditions/asthma.png";
import BackPain from "../assets/conditions/back-pain.png";
import Ear from "../assets/conditions/ear.png";
import SkinDisease from "../assets/conditions/skin-disease.png";
import ToothAche from "../assets/conditions/tooth-ache.png";

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
  { name: "Acne", icon: Acne },
  { name: "Diarrhea", icon: Diarrhea },
  { name: "Fever", icon: Fever },
  { name: "Heart Attack", icon: HeartAttack },
  { name: "High Blood Pressure", icon: HighBloodPressure },
  { name: "Piles", icon: Piles },
  { name: "Pregnancy", icon: Pregnancy },
  { name: "Asthma", icon: Asthma },
  { name: "Back Pain", icon: BackPain },
  { name: "Ear", icon: Ear },
  { name: "Skin Disease", icon: SkinDisease },
  { name: "Tooth Ache", icon: ToothAche },
];

const ConditionsList = () => {
  const navigate = useNavigate();

  const handleConditionClick = (condition) => {
    const specializations = conditionToSpecialization[condition.toLowerCase()];
    if (specializations && specializations.length > 0) {
      const primarySpecialization = encodeURIComponent(specializations[0]);
      navigate(`/search-results?query=${primarySpecialization}`);
    } else {
      alert("No specialization found for this condition.");
    }
  };

  return (
    <div className="conditions-container">
      <div className="conditions-header">
        <h2>Search doctor by Conditions</h2>
      </div>
      <div className="conditions-grid">
        {conditions.map((condition, index) => (
          <div
            className="condition-card"
            key={index}
            onClick={() => handleConditionClick(condition.name)}
            style={{ cursor: "pointer" }}
          >
            <div className="condition-icon">
              <img src={condition.icon} alt={condition.name} />
            </div>
            <p className="condition-name">{condition.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConditionsList;
