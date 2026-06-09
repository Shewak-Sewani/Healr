import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDropdown.css';

const cities = ['Karachi', 'Lahore', 'Islamabad'];

const CityDropdown = () => {
  const [showCities, setShowCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  const handleCitiesClick = () => {
    setShowCities((prev) => {
      if (prev) setSelectedCity('');
      return !prev;
    });
  };

  const handleSelect = (city) => {
    setSelectedCity(city);
    setShowCities(false);
    navigate(`/search-results?query=${encodeURIComponent(city)}`);
  };

  return (
    <div className="position-relative"
      onMouseLeave={() => setShowCities(false)}
    >
      <div
        onClick={handleCitiesClick}
        className="nav-link nav-underline"
        style={{
          cursor: 'pointer',
          color: '#333',
          textDecoration: 'none',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        Cities
      </div>
      {showCities && (
        <div className="dropdown-scrollbox">
          {cities.map((city) => (
            <div
              key={city}
              onClick={() => handleSelect(city)}
              style={{
                cursor: 'pointer',
                padding: '6px 0',
                fontWeight: selectedCity === city ? 'bold' : 'normal',
                background: selectedCity === city ? '#f0f0f0' : 'transparent',
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityDropdown; 