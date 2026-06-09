import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './ListFilteredDoctors.css';

const surgeryOptions = [
  "Liposuction",
  "Rhinoplasty",
  "Hair Transplant",
  "Caesarean (C-Section)",
  "IVF",
  "Penile Implants",
  "Vasectomy",
  "Hernia Surgery",
  "Circumcision",
  "Fistula",
  "Cataract Eye Surgery",
  "Renal (Kidney) Transplant",
  "Root Canal",
  "CO2 Fractional Laser",
  "Dental Implants",
  "Nephrectomy",
  "Varicocele Microsurgery (Varicocelectomy)",
  "ACL Reconstruction Surgery",
  "Knee Replacement Surgery"
];

const cityOptions = ["Lahore", "Karachi", "Islamabad"];

const SurgeryRequestForm = ({ doctor, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    surgery: '',
    date: '',
    city: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const surgeryToSpecialization = {
    "Liposuction": "Plastic Surgeon",
    "Rhinoplasty": "ENT Surgeon",
    "Hair Transplant": "Dermatologist",
    "Caesarean (C-Section)": "Gynecologist",
    "IVF": "Fertility Specialist",
    "Penile Implants": "Urologist",
    "Vasectomy": "Urologist",
    "Hernia Surgery": "General Surgeon",
    "Circumcision": "Urologist",
    "Fistula": "Colorectal Surgeon",
    "Cataract Eye Surgery": "Ophthalmologist",
    "Renal (Kidney) Transplant": "Nephrologist",
    "Root Canal": "Dentist",
    "CO2 Fractional Laser": "Dermatologist",
    "Dental Implants": "Dentist",
    "Nephrectomy": "Urologist",
    "Varicocele Microsurgery (Varicocelectomy)": "Urologist",
    "ACL Reconstruction Surgery": "Orthopedic Surgeon",
    "Knee Replacement Surgery": "Orthopedic Surgeon"
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const specialization = surgeryToSpecialization[form.surgery] || '';
      const payload = {
        patientName: form.name,
        patientContact: form.contact,
        patientEmail: form.email,
        surgery: form.surgery,
        date: form.date,
        city: form.city,
        specialization,
        doctorId: doctor._id
      };
      const res = await fetch('http://localhost:5000/api/surgeries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to submit request');
      setMessage('Surgery request submitted successfully!');
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1500);
    } catch (error) {
      setMessage('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="surgery-request-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="surgery-request-form" style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Request Surgery with Dr. {doctor.name}</h4>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            disabled={submitting}
          ></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Patient Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number *</label>
            <input
              type="tel"
              name="contact"
              className="form-control"
              value={form.contact}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Surgery For *</label>
            <select
              name="surgery"
              className="form-select"
              value={form.surgery}
              onChange={handleChange}
              required
              disabled={submitting}
            >
              <option value="">Select Surgery</option>
              {surgeryOptions.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Preferred Date *</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
              disabled={submitting}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">City *</label>
            <select
              name="city"
              className="form-select"
              value={form.city}
              onChange={handleChange}
              required
              disabled={submitting}
            >
              <option value="">Select City</option>
              {cityOptions.map((city, i) => (
                <option key={i} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-warning text-white w-100"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
          {message && <div className="mt-3 alert alert-info">{message}</div>}
        </form>
      </div>
    </div>
  );
};

const ListSurgeryDoctors = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [sortOption, setSortOption] = useState("");

  const handleSort = (option) => {
    setSortOption(option);
  };

  const getComparableValue = (value, defaultValue = -Infinity) => {
    if (typeof value === "string") {
      const parsed = parseInt(value.replace(/[^0-9]/g, ""));
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return typeof value === "number" ? value : defaultValue;
  };

  const sortedDoctors = sortOption
    ? [...doctors].sort((a, b) => {
      if (sortOption === "experience") {
        return (
          getComparableValue(b.profile?.experience) -
          getComparableValue(a.profile?.experience)
        );
      }
      if (sortOption === "fee") {
        return (
          getComparableValue(a.profile?.surgeryFee || a.profile?.fee, Infinity) -
          getComparableValue(b.profile?.surgeryFee || b.profile?.fee, Infinity)
        );
      }
      if (sortOption === "rating") {
        return (
          getComparableValue(b.profile?.rating) -
          getComparableValue(a.profile?.rating)
        );
      }
      return 0;
    })
    : doctors;

  return (
    <div className="container my-5">
      <div className="mb-4 text-start filter-buttons-container">
        <button
          className={`btn btn-outline-primary btn-sm rounded-pill me-2 filter-btn ${sortOption === "experience" ? "active" : ""
            }`}
          onClick={() => handleSort("experience")}
        >
          Most Experienced
        </button>
        <button
          className={`btn btn-outline-primary btn-sm rounded-pill me-2 filter-btn ${sortOption === "fee" ? "active" : ""
            }`}
          onClick={() => handleSort("fee")}
        >
          Lowest Surgery Fee
        </button>
        <button
          className={`btn btn-outline-primary btn-sm rounded-pill me-2 filter-btn ${sortOption === "rating" ? "active" : ""
            }`}
          onClick={() => handleSort("rating")}
        >
          Highest Rating
        </button>
      </div>

      {sortedDoctors && sortedDoctors.length > 0 ? (
        sortedDoctors.map((doctor) => (
          <div key={doctor._id} className="card mb-4 shadow-sm doctor-card-style">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-2 text-center">
                  <img
                    src={doctor.profile?.profilePicture || "./src/IMAGES/profile.jpg"}
                    alt={doctor.name}
                    className="img-fluid rounded-circle doctor-avatar"
                  />
                </div>
                <div className="col-md-7">
                  <h5 className="doctor-name">
                    {doctor.name}{" "}
                    {doctor.profile?.verified && (
                      <span className="badge bg-warning text-dark ms-2">
                        PMDC Verified ⭐
                      </span>
                    )}
                  </h5>
                  <p className="mb-1">
                    {doctor.profile?.specialization?.join(", ") ||
                      "No Specialization"}
                  </p>
                  <p className="mb-1 text-muted">
                    {doctor.profile?.highestDegree}{" "}
                    {doctor.profile?.degrees?.length > 0 &&
                      `(${doctor.profile.degrees.join(", ")})`}
                  </p>
                  <div className="d-flex flex-wrap gap-3 mt-2">
                    <span className="badge bg-light text-dark">
                      🎓 {doctor.profile?.experience || "N/A"} Years Experience
                    </span>
                    <span className="badge bg-light text-dark">
                      👍 {doctor.profile?.rating || "98%"}
                    </span>
                    <span className="badge bg-success text-white">
                      🏥 Surgery Specialist
                    </span>
                  </div>
                </div>
                <div className="col-md-3 text-end">
                  <p className="small mb-1">
                    {doctor.profile?.verified ? "PMDC Verified" : "Not Verified"}
                  </p>
                  <button
                    className="btn btn-warning text-white w-100 mb-2"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    🏥 Request Surgery
                  </button>
                </div>
              </div>
              <hr />
              <div className="row mt-3 text-center">
                <div className="col-md-12">
                  <p className="mb-1 fw-semibold">Surgery Fee</p>
                  <p className="text-primary mb-1">
                    {doctor.profile?.location || "Hospital/Clinic"}
                  </p>
                  <p className="text-success">
                    Rs. {doctor.profile?.surgeryFee || doctor.profile?.fee || "Contact for Price"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-5">
          <p className="text-muted">No surgeons found.</p>
        </div>
      )}

      {selectedDoctor && (
        <SurgeryRequestForm
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
};

export default ListSurgeryDoctors;