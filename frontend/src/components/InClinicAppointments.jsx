import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Stethoscope, Search, ChevronDown, X } from 'lucide-react';
import './InClinicAppointments.css';
import { useNavigate } from 'react-router-dom';

const InClinicAppointments = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [specialtySearch, setSpecialtySearch] = useState('');
  const [isSpecialtyDropdownOpen, setIsSpecialtyDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const cities = ['Lahore', 'Karachi', 'Islamabad'];

  const specialties = ['Acupuncturist', 'Aesthetic Gynecologist', 'Aesthetic Medicine Specialist', 'Aesthetic Physician', 'Andrologist', 'Autism Consultant', 'Cancer Surgeon', 'Child and Adolescent Psychiatrist', 'Child-Kidney Specialist', 'Consultant Physician', 'Cosmetic Dentist', 'Cosmetic Surgeon', 'Cosmetologist', 'Counselor', 'Dentist', 'Dermatologist', 'Diabetologist', 'ENT Specialist', 'ENT Surgeon', 'Endocrinologist', 'Endodontist', 'Endoscopic Surgeon', 'Eye Surgeon', 'Family Physician', 'Fertility Consultant', 'Gastroenterologist', 'General Physician', 'General Surgeon', 'Geriatrician', 'Gynecological Oncologist', 'Gynecologist', 'Hair Transplant Surgeon', 'Head and Neck Surgeon', 'Hepatologist', 'Hernia Surgeon', 'Hypertension Specialist', 'Implantologist', 'Internal Medicine Specialist', 'Kidney Transplant Surgeon', 'Laparoscopic Surgeon', 'Laser Specialist', 'Male Sexual Health Specialist', 'Neonatologist', 'Nephrologist', 'Neurologist', 'Obstetrician', 'Oral and Maxillofacial Surgeon', 'Orthodontist', 'Orthotist and Prosthetist', 'Pain Management Specialist', 'Pediatric Cardiologist', 'Pediatric Diabetologist', 'Pediatric Endocrinologist', 'Pediatric Gastroenterologist', 'Pediatric Hematologist', 'Pediatric Neurologist', 'Pediatric Nutritionist', 'Pediatric Oncologist', 'Pediatric Rheumatologist', 'Pediatric Surgeon', 'Pediatric Urologist', 'Pediatrician', 'Periodontist', 'Plastic Surgeon', 'Preventive Medicine Doctor', 'Prosthodontist', 'Psychiatrist', 'Psychologist', 'Reconstructive Surgeon', 'Rehab Medicine', 'Rehablitation Specialist', 'Renal Surgeon', 'Restorative Dentist', 'Sexologist', 'Sleep Medicine Doctor', 'Specialist in Operative Dentistry', 'Thyroid Surgeon', 'Uro-Oncologist', 'Urologist'];

  const filteredSpecialties = specialties.filter(s => s.toLowerCase().includes(specialtySearch.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSpecialtyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    setSpecialtySearch(specialty);
    setIsSpecialtyDropdownOpen(false);
  };

  const handleSpecialtyInputChange = (e) => {
    setSpecialtySearch(e.target.value);
    setIsSpecialtyDropdownOpen(true);
    if (selectedSpecialty && e.target.value !== selectedSpecialty) {
      setSelectedSpecialty('');
    }
  };

  const clearSpecialtySelection = () => {
    setSelectedSpecialty('');
    setSpecialtySearch('');
    setIsSpecialtyDropdownOpen(false);
  };

  const handleSearch = () => {
    if (selectedCity && selectedSpecialty) {
      navigate(`/search-results?specialization=${encodeURIComponent(selectedSpecialty)}&city=${encodeURIComponent(selectedCity)}`);
    } else {
      alert('Please select both city and specialization');
    }
  };

  return (
    <div className="appointments-wrapper">
      <div className="appointments-container">
        <div className="header">
          <h1>Find Your Doctor to Book an Appointment</h1>
          <p>Select your preferred city and medical specialization</p>
        </div>

        <div className="form-box">
          <div className="city-section">
            <label><MapPin size={20} /> Select City</label>
            <div className="city-grid">
              {cities.map(city => (
                <button
                  key={city}
                  className={`city-button ${selectedCity === city ? 'selected' : ''}`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="specialty-section">
            <label><Stethoscope size={20} /> Select Specialization</label>
            <div className="dropdown-wrapper" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Search for a specialization..."
                value={specialtySearch}
                onChange={handleSpecialtyInputChange}
                onFocus={() => setIsSpecialtyDropdownOpen(true)}
                className={`specialty-input ${selectedSpecialty ? 'highlighted' : ''}`}
              />
              <div className="input-icons">
                {selectedSpecialty && (
                  <button onClick={clearSpecialtySelection} className="clear-btn">
                    <X size={16} />
                  </button>
                )}
                <ChevronDown size={20} className={`chevron ${isSpecialtyDropdownOpen ? 'rotated' : ''}`} />
              </div>

              {isSpecialtyDropdownOpen && (
                <div className="dropdown-list">
                  {filteredSpecialties.length > 0 ? (
                    filteredSpecialties.map(specialty => (
                      <button
                        key={specialty}
                        onClick={() => handleSpecialtySelect(specialty)}
                        className={`dropdown-item ${selectedSpecialty === specialty ? 'active' : ''}`}
                      >
                        {specialty}
                      </button>
                    ))
                  ) : (
                    <div className="dropdown-empty">No specializations found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSearch}
            className={`search-btn ${selectedCity && selectedSpecialty ? 'active' : 'disabled'}`}
            disabled={!selectedCity || !selectedSpecialty}
          >
            <Search size={20} />
            <span>Find Doctors</span>
          </button>
        </div>

        <p className="footer-text">
          Can't find your specialization? <span className="contact-link">Contact us</span>
        </p>
      </div>
    </div>
  );
};

export default InClinicAppointments;
