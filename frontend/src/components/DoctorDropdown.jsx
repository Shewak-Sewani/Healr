import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDropdown.css';

const specializations = [
  'Acupuncturist', 'Aesthetic Gynecologist', 'Aesthetic Medicine Specialist', 'Aesthetic Physician', 'Andrologist', 'Autism Consultant', 'Cancer Surgeon', 'Child and Adolescent Psychiatrist', 'Child-Kidney Specialist', 'Consultant Physician', 'Cosmetic Dentist', 'Cosmetic Surgeon', 'Cosmetologist', 'Counselor', 'Dentist', 'Dermatologist', 'Diabetologist', 'ENT Specialist', 'ENT Surgeon', 'Endocrinologist', 'Endodontist', 'Endoscopic Surgeon', 'Eye Surgeon', 'Family Physician', 'Fertility Consultant', 'Gastroenterologist', 'General Physician', 'General Surgeon', 'Geriatrician', 'Gynecological Oncologist', 'Gynecologist', 'Hair Transplant Surgeon', 'Head and Neck Surgeon', 'Hepatologist', 'Hernia Surgeon', 'Hypertension Specialist', 'Implantologist', 'Internal Medicine Specialist', 'Kidney Transplant Surgeon', 'Laparoscopic Surgeon', 'Laser Specialist', 'Male Sexual Health Specialist', 'Neonatologist', 'Nephrologist', 'Neurologist', 'Obstetrician', 'Oral and Maxillofacial Surgeon', 'Orthodontist', 'Orthotist and Prosthetist', 'Pain Management Specialist', 'Pediatric Cardiologist', 'Pediatric Diabetologist', 'Pediatric Endocrinologist', 'Pediatric Gastroenterologist', 'Pediatric Hematologist', 'Pediatric Neurologist', 'Pediatric Nutritionist', 'Pediatric Oncologist', 'Pediatric Rheumatologist', 'Pediatric Surgeon', 'Pediatric Urologist', 'Pediatrician', 'Periodontist', 'Plastic Surgeon', 'Preventive Medicine Doctor', 'Prosthodontist', 'Psychiatrist', 'Psychologist', 'Reconstructive Surgeon', 'Rehab Medicine', 'Rehablitation Specialist', 'Renal Surgeon', 'Restorative Dentist', 'Sexologist', 'Sleep Medicine Doctor', 'Specialist in Operative Dentistry', 'Thyroid Surgeon', 'Uro-Oncologist', 'Urologist'
];

const cities = ['Karachi', 'Lahore', 'Islamabad'];

const DoctorDropdown = () => {
  const [showSpecializations, setShowSpecializations] = useState(false);
  const [activeSpecialization, setActiveSpecialization] = useState(null);
  const navigate = useNavigate();

  const handleDoctorsClick = () => {
    setShowSpecializations(!showSpecializations);
    setActiveSpecialization(null);
  };

  const handleSpecializationClick = (spec) => {
    setActiveSpecialization((prev) => (prev === spec ? null : spec));
  };

  const handleSelect = (spec, city) => {
    navigate(`/search-results?specialization=${encodeURIComponent(spec)}&city=${encodeURIComponent(city)}`);
    setShowSpecializations(false);
  };

  return (
    <div className="position-relative"
      onMouseLeave={() => setShowSpecializations(false)}
    >
      <div
        onClick={handleDoctorsClick}
        className="nav-link nav-underline"
        style={{
          cursor: 'pointer',
          color: "#333",
          textDecoration: "none",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        Doctors
      </div>

      {showSpecializations && (
        <div className="dropdown-scrollbox">
          {specializations.map((spec) => (
            <div key={spec}>
              <div
                onClick={() => handleSpecializationClick(spec)}
                style={{
                  cursor: 'pointer',
                  padding: '6px 0',
                  fontWeight: activeSpecialization === spec ? 'bold' : 'normal'
                }}
              >
                {spec}
              </div>

              {activeSpecialization === spec && (
                <ul style={{ paddingLeft: '15px' }}>
                  {cities.map((city) => (
                    <li
                      key={city}
                      onClick={() => handleSelect(spec, city)}
                      style={{
                        cursor: 'pointer',
                        padding: '4px 0',
                        listStyle: 'circle'
                      }}
                    >
                      Doctor in {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDropdown;
