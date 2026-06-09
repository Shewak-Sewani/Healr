import React, { useState, useEffect } from 'react';
import './DoctorSettings.css';

const DoctorSettings = ({ doctor, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    highestDegree: '',
    degrees: '',
    experience: '',
    fee: '',
    waitTime: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || '',
        specialization: doctor.profile?.specialization?.join(', ') || '',
        highestDegree: doctor.profile?.highestDegree || '',
        degrees: doctor.profile?.degrees?.join(', ') || '',
        experience: doctor.profile?.experience || '',
        fee: doctor.profile?.fee || '',
        waitTime: doctor.profile?.waitTime || '',
        location: doctor.profile?.location || '',
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const specializationArray = formData.specialization.split(',').map(s => s.trim()).filter(Boolean);
      const degreesArray = formData.degrees.split(',').map(d => d.trim()).filter(Boolean);

      const response = await fetch(`http://localhost:5000/api/doctors/${doctor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          profile: {
            specialization: specializationArray,
            highestDegree: formData.highestDegree,
            degrees: degreesArray,
            experience: formData.experience,
            fee: formData.fee,
            waitTime: formData.waitTime,
            location: formData.location,
          }
        }),
      });

      if (response.ok) {
        const updatedDoctor = await response.json();
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        if (onProfileUpdate) {
          onProfileUpdate(updatedDoctor);
        }
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Profile Settings</h2>
        <p>Update your professional information</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={doctor?.email || ''}
                disabled
                className="disabled-input"
              />
              <small className="disabled-note">Email cannot be changed</small>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Professional Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Separate multiple specializations with commas"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="highestDegree">Highest Degree</label>
              <input
                type="text"
                id="highestDegree"
                name="highestDegree"
                value={formData.highestDegree}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="degrees">Degrees</label>
              <input
                type="text"
                id="degrees"
                name="degrees"
                value={formData.degrees}
                onChange={handleChange}
                placeholder="Separate multiple degrees with commas"
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience (years)</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Practice Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fee">Consultation Fee (₹)</label>
              <input
                type="number"
                id="fee"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="waitTime">Average Wait Time</label>
              <input
                type="text"
                id="waitTime"
                name="waitTime"
                value={formData.waitTime}
                onChange={handleChange}
                placeholder="e.g., 15-20 minutes"
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorSettings; 