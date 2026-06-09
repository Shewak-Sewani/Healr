import React from "react";
import { useNavigate } from "react-router-dom";
import "./HealthServices.css";

import consultImage from "../images/consult.webp";
import clinicImage from "../images/clinic.webp";
import labImage from "../images/laboratory.jpg";
import surgeryImage from "../images/surgery.png";
import medicineImage from "../images/medicine.jpg";

const services = [
  {
    title: "Consult Online",
    description: "Connect with Specialists through Video call.",
    image: consultImage,
  },
  {
    title: "In-Clinic Appointments",
    description: "Book an In-Person visit to doctor's clinic.",
    image: clinicImage,
    route: "/in-clinic-appointment"
  },
  {
    title: "Laboratory Tests",
    description: "Avail Exclusive discounts on lab tests.",
    image: labImage,
    route: "/labs"
  },
  {
    title: "Procedures & Surgeries",
    description: "Plan your surgeries at discounted rates.",
    image: surgeryImage,
    route: "/surgery",
  },
  {
    title: "Medicines",
    description: "Know your medicines better",
    image: medicineImage,
    route: "/medicine",
  },
];

const HealthServices = () => {
  const navigate = useNavigate();

  return (
    <div className="health-services container my-5">
      <div className="row justify-content-center gap-3">
        {services.map((service, index) => (
          <div
            className="service-card shadow-sm"
            key={index}
            style={{ cursor: service.title === "Consult Online" || service.route ? "pointer" : "default" }}
            onClick={() => {
              if (service.title === "Consult Online") {
                navigate("/consult-online");
              } else if (service.route) {
                navigate(service.route);
              }
            }}
          >
            <div className="service-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-content p-3">
              <h5 className="fw-bold">{service.title}</h5>
              <p className="mb-0">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthServices;
