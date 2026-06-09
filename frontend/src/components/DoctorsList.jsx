import React from "react";
import "./DoctorsList.css";
import { useNavigate } from "react-router-dom";

import Dermatologist from "../assets/doctors/dermatologist.png";
import Gynecologist from "../assets/doctors/gynecologist.png";
import Urologist from "../assets/doctors/urologist.png";
import Gastroenterologist from "../assets/doctors/gastroenterologist.png";
import Dentist from "../assets/doctors/dentist.png";
import Psychiatrist from "../assets/doctors/psychiatrist.png";
import ENT from "../assets/doctors/ent-specialist.png";
import Orthopedic from "../assets/doctors/orthopedic-surgeon.png";
import Sexologist from "../assets/doctors/sexologist.png";
import Neurologist from "../assets/doctors/neurologist.png";
import ChildSpecialist from "../assets/doctors/child-specialist.png";
import Pulmonologist from "../assets/doctors/pulmonologist.png";
import EyeSpecialist from "../assets/doctors/eye-specialist.png";
import GeneralPhysician from "../assets/doctors/general-physician.png";

const doctors = [
  { name: "Dermatologist", icon: Dermatologist },
  { name: "Gynecologist", icon: Gynecologist },
  { name: "Urologist", icon: Urologist },
  { name: "Gastroenterologist", icon: Gastroenterologist },
  { name: "Dentist", icon: Dentist },
  { name: "Psychiatrist", icon: Psychiatrist },
  { name: "ENT Specialist", icon: ENT },
  { name: "Orthopedic Surgeon", icon: Orthopedic },
  { name: "Sexologist", icon: Sexologist },
  { name: "Neurologist", icon: Neurologist },
  { name: "Child Specialist", icon: ChildSpecialist },
  { name: "Pulmonologist", icon: Pulmonologist },
  { name: "Eye Specialist", icon: EyeSpecialist },
  { name: "General Physician", icon: GeneralPhysician },
];

const DoctorsList = () => {
  const navigate = useNavigate();

  const handleSpecializationClick = (specialization) => {
    const encodedQuery = encodeURIComponent(specialization.trim());
    navigate(`/search-results?query=${encodedQuery}`);
  };

  return (
    <div className="doctors-container">
      <div className="doctors-header">
        <h2>Consult best doctors online</h2>
      </div>
      <div className="doctors-grid">
        {doctors.map((doc, index) => (
          <div
            className="doctor-card"
            key={index}
            onClick={() => handleSpecializationClick(doc.name)}
            style={{ cursor: "pointer", background: 'none', boxShadow: 'none', padding: 0, border: 'none' }}
          >
            <div className="doctor-icon">
              <img src={doc.icon} alt={doc.name} />
            </div>
            <p className="doctor-name">{doc.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
