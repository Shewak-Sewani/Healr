import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Signup.css";

const Modal = ({ show, onClose, title, message, isSuccess }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{
          '--modal-bg': isSuccess ? '#e3f0fd' : 'linear-gradient(135deg, #ffeaea 0%, #ffd6d6 100%)',
          '--modal-icon-bg': isSuccess ? '#2c83fb' : 'linear-gradient(135deg, #ff4e4e 60%, #c62828 100%)',
          '--modal-icon-shadow': isSuccess ? '#2c83fb40' : '#ff4e4e40',
          '--modal-title-color': isSuccess ? '#20509e' : '#c62828',
          '--modal-btn-bg': isSuccess ? '#2c83fb' : 'linear-gradient(90deg, #ff4e4e 60%, #c62828 100%)',
          '--modal-btn-shadow': isSuccess ? '#2c83fb30' : '#ff4e4e30',
        }}
      >
        <div className="modal-icon">
          {isSuccess ? (
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19" cy="19" r="19" fill="none" />
              <path d="M11 20.5L17 26.5L27 14.5" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19" cy="19" r="19" fill="none" />
              <path d="M13 13L25 25M25 13L13 25" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <h3 className="modal-title">{title}</h3>
        <div className="modal-message">{message}</div>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Signup = () => {
  const [modal, setModal] = useState({ show: false, title: '', message: '', isSuccess: null });
  const navigate = useNavigate();

  const showModal = (title, msg, success) => {
    setModal({ show: true, title, message: msg, isSuccess: success });
    if (success) {
      setTimeout(() => {
        setModal({ show: false, title: '', message: '', isSuccess: null });
        navigate("/login");
      }, 2500);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email or mobile is required"),
      password: Yup.string().min(6).required("Required"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
      role: Yup.string().required("Select a role"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (res.ok) {
          showModal("Sign Up Successful!", "Your account has been created. Please login to continue.", true);
        } else {
          showModal("Sign Up Failed", data.error || "Signup failed. Please try again.", false);
        }
      } catch (error) {
        showModal("Network Error", "Check your connection and try again.", false);
      }
    },
  });

  const getInputClass = (field) => formik.touched[field] && formik.errors[field] ? "error-field" : "";

  return (
    <div className="signup-container two-column-layout">
      <div className="animation-column">
        <DotLottieReact
          src="https://lottie.host/5cba9fdd-765f-4e36-9602-420490579b3e/t9T8vIhMDQ.lottie"
          autoplay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="form-column">
        <Modal
          show={modal.show}
          onClose={() => setModal({ show: false, title: '', message: '', isSuccess: null })}
          title={modal.title}
          message={modal.message}
          isSuccess={modal.isSuccess}
        />
        <div className="signup-box">
          <h2>
            <span className="brand"><span style={{ color: '#ff6b35' }}>hea</span><span style={{ color: '#0033cc' }}>lr</span></span>
          </h2>
          <p>Create your account below:</p>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={getInputClass("name")}
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
            <input
              type="text"
              name="email"
              placeholder="Email or Mobile number"
              className={getInputClass("email")}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={getInputClass("password")}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={getInputClass("confirmPassword")}
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="error">{formik.errors.confirmPassword}</div>
            )}
            <select
              name="role"
              className={`input-select ${getInputClass("role")}`}
              {...formik.getFieldProps("role")}
            >
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="error">{formik.errors.role}</div>
            )}
            {formik.values.role === "doctor" && (
              <>
                <select
                  name="gender"
                  className={getInputClass("gender")}
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="error">{formik.errors.gender}</div>
                )}
                <div className="custom-dropdown">
                  <input
                    type="text"
                    name="specialization"
                    placeholder="Select or type specialization"
                    className="styled-input"
                    value={formik.values.specialization}
                    onChange={(e) =>
                      formik.setFieldValue("specialization", e.target.value)
                    }
                    onFocus={() => setShowDropdown(true)}
                  />
                  {showDropdown && (
                    <ul className="dropdown-list">
                      {specializations
                        .filter((spec) =>
                          spec
                            .toLowerCase()
                            .includes(formik.values.specialization.toLowerCase())
                        )
                        .map((spec) => (
                          <li
                            key={spec}
                            onClick={() => {
                              formik.setFieldValue("specialization", spec);
                              setShowDropdown(false);
                            }}
                          >
                            {spec}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                {formik.touched.specialization &&
                  formik.errors.specialization && (
                    <div className="error">{formik.errors.specialization}</div>
                  )}
                <input
                  type="text"
                  name="highestDegree"
                  placeholder="Highest Degree"
                  className={getInputClass("highestDegree")}
                  {...formik.getFieldProps("highestDegree")}
                />
                {formik.touched.highestDegree && formik.errors.highestDegree && (
                  <div className="error">{formik.errors.highestDegree}</div>
                )}
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience in years"
                  className={getInputClass("experience")}
                  {...formik.getFieldProps("experience")}
                />
                {formik.touched.experience && formik.errors.experience && (
                  <div className="error">{formik.errors.experience}</div>
                )}
                <input
                  type="text"
                  name="fee"
                  placeholder="Fee"
                  className={getInputClass("fee")}
                  {...formik.getFieldProps("fee")}
                />
                {formik.touched.fee && formik.errors.fee && (
                  <div className="error">{formik.errors.fee}</div>
                )}
                <input
                  type="text"
                  name="waitTime"
                  placeholder="Wait Time"
                  className={getInputClass("waitTime")}
                  {...formik.getFieldProps("waitTime")}
                />
                {formik.touched.waitTime && formik.errors.waitTime && (
                  <div className="error">{formik.errors.waitTime}</div>
                )}
                <input
                  type="text"
                  name="numberOfPatients"
                  placeholder="Number of Patients Treated"
                  className={getInputClass("numberOfPatients")}
                  {...formik.getFieldProps("numberOfPatients")}
                />
                {formik.touched.numberOfPatients &&
                  formik.errors.numberOfPatients && (
                    <div className="error">{formik.errors.numberOfPatients}</div>
                  )}
                <select
                  name="location"
                  className={getInputClass("location")}
                  {...formik.getFieldProps("location")}
                >
                  <option value="">Select Location</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Karachi">Karachi</option>
                </select>
                {formik.touched.location && formik.errors.location && (
                  <div className="error">{formik.errors.location}</div>
                )}
              </>
            )}
            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>
          <p className="signup-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
