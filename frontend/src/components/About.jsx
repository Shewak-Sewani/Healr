import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="my-5 py-5 bg-light" id="About">
      <div className="container text-center">
        <h2 className="fw-bold">Everything You Need in One Place</h2>
        <p className="text-muted">Find and Book the Best Doctors near you</p>

        <div className="row mt-4">
          <div className="col-md-4">
            <Link to="/consult-online" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card border-0 shadow-sm p-4 h-100" style={{ cursor: 'pointer' }}>
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-person-badge fs-2 text-primary"></i>
                  <h5 className="fw-bold mt-3">Book Doctor Appointments</h5>
                  <p className="text-muted flex-grow-1">
                    Users can find doctors by specialty, city, or hospital and
                    book appointments online or via phone.{' '}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/consult-online" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card border-0 shadow-sm p-4 h-100" style={{ cursor: 'pointer' }}>
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-camera-video fs-2 text-success"></i>
                  <h5 className="fw-bold mt-3">Online Video Consultations</h5>
                  <p className="text-muted flex-grow-1">
                    Patients can consult with doctors virtually through Oladoc&apos;s
                    telemedicine services.{' '}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/labs" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card border-0 shadow-sm p-4 h-100" style={{ cursor: 'pointer' }}>
                <div className="card-body d-flex flex-column align-items-center">
                  <i className="bi bi-file-earmark-medical fs-2 text-warning"></i>
                  <h5 className="fw-bold mt-3">Access to Lab Tests</h5>
                  <p className="text-muted flex-grow-1">
                    Users can order lab tests at home, see test prices, and get
                    reports online from partner labs.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
