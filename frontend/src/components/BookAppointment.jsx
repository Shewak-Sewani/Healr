import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Signup.css";

const Modal = ({ show, onClose, title, message, isSuccess }) => {
  if (!show) return null;
  const isSuccessMsg = isSuccess;
  return (
    <div className="modal-overlay" style={{}}>
      <div
        className="modal-content"
        style={{
          '--modal-bg': isSuccessMsg ? '#e3f0fd' : 'linear-gradient(135deg, #ffeaea 0%, #ffd6d6 100%)',
          '--modal-icon-bg': isSuccessMsg ? '#2c83fb' : 'linear-gradient(135deg, #ff4e4e 60%, #c62828 100%)',
          '--modal-icon-shadow': isSuccessMsg ? '#2c83fb40' : '#ff4e4e40',
          '--modal-title-color': isSuccessMsg ? '#20509e' : '#c62828',
          '--modal-btn-bg': isSuccessMsg ? '#2c83fb' : 'linear-gradient(90deg, #ff4e4e 60%, #c62828 100%)',
          '--modal-btn-shadow': isSuccessMsg ? '#2c83fb30' : '#ff4e4e30',
        }}
      >
        <div className="modal-icon">
          {isSuccessMsg ? (
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19" cy="19" r="19" fill="none" />
              <path d="M11 20.5L17 26.5L27 14.5" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19" cy="19" r="19" fill="none" />
              <path d="M13 13L25 25M25 13L13 25" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <h3 className="modal-title">{title}</h3>
        <div className="modal-message">{message}</div>
        <button
          className="modal-close-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [patientId, setPatientId] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState("");
  const [modal, setModal] = useState({ show: false, title: '', message: '', isSuccess: null });
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      const patientObj = JSON.parse(storedPatient);
      setPatientId(patientObj._id);
    } else {
      setModal({ show: true, title: 'Not Logged In', message: 'Please log in first to book an appointment.', isSuccess: false });
    }
  }, [navigate]);

  const handleModalClose = () => {
    setModal({ show: false, title: '', message: '', isSuccess: null });
    if (modal.title === 'Not Logged In') {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(appointmentDate);
    if (selectedDate < today) {
      setModal({ show: true, title: 'Invalid Date', message: 'Appointment date cannot be before today.', isSuccess: false });
      return;
    }

    if (!/\b(am|pm)\b/i.test(timeSlot)) {
      setModal({ show: true, title: 'Invalid Time', message: 'Please specify AM or PM in the time slot.', isSuccess: false });
      return;
    }

    const appointmentData = {
      patient: patientId,
      doctor: doctorId,
      appointmentDate,
      timeSlot,
      reason,
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok) {
        setModal({ show: true, title: 'Success', message: 'Appointment booked successfully!', isSuccess: true });
      } else {
        setModal({ show: true, title: 'Booking Failed', message: data.message || 'Failed to book appointment.', isSuccess: false });
      }
    } catch (error) {
      setModal({ show: true, title: 'Network Error', message: 'Something went wrong.', isSuccess: false });
    }
  };

  if (!patientId)
    return (
      <Modal
        show={modal.show}
        onClose={handleModalClose}
        title={modal.title}
        message={modal.message}
        isSuccess={modal.isSuccess}
      />
    );

  return (
    <div className="container mt-5">
      <Modal
        show={modal.show}
        onClose={handleModalClose}
        title={modal.title}
        message={modal.message}
        isSuccess={modal.isSuccess}
      />
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Appointment Date:</label>
        <input
          type="date"
          className="form-control"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />

        <label>Time Slot:</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. 10:00 AM - 10:30 AM"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
        />

        <label>Reason (optional):</label>
        <textarea
          className="form-control"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button type="submit" className="btn btn-primary mt-3">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
