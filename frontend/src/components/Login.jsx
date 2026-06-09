import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Signup.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const Modal = ({ show, onClose, title, message, isSuccess }) => {
  if (!show) return null;
  const isSuccessMsg = isSuccess;
  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{
          "--modal-bg": isSuccessMsg
            ? "#e3f0fd"
            : "linear-gradient(135deg, #ffeaea 0%, #ffd6d6 100%)",
          "--modal-icon-bg": isSuccessMsg
            ? "#2c83fb"
            : "linear-gradient(135deg, #ff4e4e 60%, #c62828 100%)",
          "--modal-icon-shadow": isSuccessMsg ? "#2c83fb40" : "#ff4e4e40",
          "--modal-title-color": isSuccessMsg ? "#20509e" : "#c62828",
          "--modal-btn-bg": isSuccessMsg
            ? "#2c83fb"
            : "linear-gradient(90deg, #ff4e4e 60%, #c62828 100%)",
          "--modal-btn-shadow": isSuccessMsg ? "#2c83fb30" : "#ff4e4e30",
        }}
      >
        <div className="modal-icon">
          {isSuccessMsg ? (
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="19" fill="none" />
              <path d="M11 20.5L17 26.5L27 14.5" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="19" fill="none" />
              <path d="M13 13L25 25M25 13L13 25" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
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

const Login = ({ setPatient, setDoctor, setAdmin }) => {
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [availableAccounts, setAvailableAccounts] = useState(null);
  const [modal, setModal] = useState({ show: false, title: "", message: "", isSuccess: null });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("patient");
    localStorage.removeItem("doctor");
    localStorage.removeItem("admin");
    if (setPatient) setPatient(null);
    if (setDoctor) setDoctor(null);
    if (setAdmin) setAdmin(null);
  }, []);

  const formik = useFormik({
    initialValues: {
      emailOrMobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailOrMobile: Yup.string().required("Email or mobile is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.emailOrMobile,
            password: values.password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          if (data.admin) {
            setModal({ show: true, title: "Login Successful!", message: "You have logged in successfully.", isSuccess: true });
            setTimeout(() => {
              setModal({ show: false, title: "", message: "", isSuccess: null });
              localStorage.setItem("admin", JSON.stringify(data.admin));
              setAdmin(data.admin);
              navigate("/admin-dashboard");
            }, 1500);
            return;
          }
          if (data.doctor && data.user) {
            setAvailableAccounts(data);
            setShowAccountSelection(true);
            return;
          }
          if (data.doctor && !data.user) {
            setModal({ show: true, title: "Login Successful!", message: "You have logged in successfully.", isSuccess: true });
            setTimeout(() => {
              setModal({ show: false, title: "", message: "", isSuccess: null });
              localStorage.setItem("doctor", JSON.stringify(data.doctor));
              setDoctor(data.doctor);
              navigate("/dashboard", { state: { doctor: data.doctor } });
            }, 1500);
          } else if (data.user && !data.doctor) {
            setModal({ show: true, title: "Login Successful!", message: "You have logged in successfully.", isSuccess: true });
            setTimeout(() => {
              setModal({ show: false, title: "", message: "", isSuccess: null });
              localStorage.setItem("patient", JSON.stringify(data.user));
              setPatient(data.user);
              navigate("/");
            }, 1500);
          } else {
            setModal({ show: true, title: "Login Failed", message: "Unknown user type.", isSuccess: false });
          }
        } else {
          let errorMsg = data.message || data.error || (response.status === 401 ? "Invalid credentials." : response.status === 404 ? "User does not exist." : "Login failed.");
          setModal({ show: true, title: "Login Failed", message: errorMsg, isSuccess: false });
        }
      } catch (error) {
        setModal({ show: true, title: "Login Failed", message: "Something went wrong.", isSuccess: false });
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (showAccountSelection) {
    return (
      <div className="signup-container">
        <Modal show={modal.show} onClose={() => setModal({ show: false, title: "", message: "", isSuccess: null })} title={modal.title} message={modal.message} isSuccess={modal.isSuccess} />
        <div className="signup-box">
          <h2><span className="brand"><span style={{ color: '#ff6b35' }}>hea</span><span style={{ color: '#0033cc' }}>lr</span></span></h2>
          <p>Choose your account type:</p>
          <button className="login-btn" onClick={() => formik.handleSubmit("doctor")} style={{ marginBottom: "10px", width: "100%" }}>Login as Doctor</button>
          <button className="login-btn" onClick={() => formik.handleSubmit("patient")} style={{ marginBottom: "10px", width: "100%", backgroundColor: "#28a745" }}>Login as Patient</button>
          <button onClick={() => setShowAccountSelection(false)} style={{ background: "transparent", border: "none", color: "#007bff", textDecoration: "underline", cursor: "pointer", fontSize: "14px" }}>← Back to login</button>
        </div>
      </div>
    );
  }

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
        <Modal show={modal.show} onClose={() => setModal({ show: false, title: "", message: "", isSuccess: null })} title={modal.title} message={modal.message} isSuccess={modal.isSuccess} />
        <div className="signup-box">
          <h2><span className="brand"><span style={{ color: '#ff6b35' }}>hea</span><span style={{ color: '#0033cc' }}>lr</span></span></h2>
          <p>Login to your account:</p>
          <form onSubmit={formik.handleSubmit}>
            <input type="text" name="emailOrMobile" placeholder="Email or Mobile number" value={formik.values.emailOrMobile} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.emailOrMobile && formik.errors.emailOrMobile && (<div className="error">{formik.errors.emailOrMobile}</div>)}
            <input type="password" name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.password && formik.errors.password && (<div className="error">{formik.errors.password}</div>)}
            <button className="login-btn" type="submit" disabled={formik.isSubmitting}>Login</button>
          </form>
          <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
