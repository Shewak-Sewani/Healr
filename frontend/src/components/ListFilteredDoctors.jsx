import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ListFilteredDoctors.css";

const ListFilteredDoctors = ({ doctors }) => {
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
          getComparableValue(b.profile.experience) -
          getComparableValue(a.profile.experience)
        );
      }
      if (sortOption === "fee") {
        return (
          getComparableValue(a.profile.fee, Infinity) -
          getComparableValue(b.profile.fee, Infinity)
        );
      }
      if (sortOption === "rating") {
        return (
          getComparableValue(b.profile.rating) -
          getComparableValue(a.profile.rating)
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
          Lowest Fee
        </button>
        <button
          className={`btn btn-outline-primary btn-sm rounded-pill me-2 filter-btn ${sortOption === "rating" ? "active" : ""
            }`}
          onClick={() => handleSort("rating")}
        >
          Highest Rating
        </button>
      </div>

      {sortedDoctors.map((doc) => (
        <div key={doc._id} className="card mb-4 shadow-sm doctor-card-style">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-2 text-center">
                <img
                  src={
                    doc.profile?.profilePicture || "./src/IMAGES/profile.jpg"
                  }
                  alt={doc.name}
                  className="img-fluid rounded-circle doctor-avatar"
                />
              </div>
              <div className="col-md-7">
                <h5 className="doctor-name">
                  {doc.name}{" "}
                  {doc.profile?.verified && (
                    <span className="badge bg-warning text-dark ms-2">
                      PMDC Verified ⭐
                    </span>
                  )}
                </h5>
                <p className="mb-1">
                  {doc.profile?.specialization?.join(", ") ||
                    "No Specialization"}
                </p>
                <p className="mb-1 text-muted">
                  {doc.profile?.highestDegree}{" "}
                  {doc.profile?.degrees?.length > 0 &&
                    `(${doc.profile.degrees.join(", ")})`}
                </p>
                <div className="d-flex flex-wrap gap-3 mt-2">
                  <span className="badge bg-light text-dark">
                    ⏱ {doc.profile?.waitTime || "15-30 Min"} Wait Time
                  </span>
                  <span className="badge bg-light text-dark">
                    🎓 {doc.profile?.experience || "N/A"} Years Experience
                  </span>
                  <span className="badge bg-light text-dark">
                    👍 {doc.profile?.rating || "98%"}
                  </span>
                </div>
              </div>
              <div className="col-md-3 text-end">
                <p className="small mb-1">
                  {doc.profile?.verified ? "PMDC Verified" : "Not Verified"}
                </p>
                <Link
                  to={`/video-consult/${doc._id}`}
                  className="btn btn-outline-primary mb-2 w-100"
                  style={{ backgroundColor: "#2929d6" }}
                >
                  🎥 Video Consultation
                </Link>
                <Link
                  to={`/book-appointment/${doc._id}`}
                  className="btn btn-warning text-white w-100"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
            <hr />
            <div className="row mt-3 text-center">
              <div className="col-md-6">
                <p className="mb-1 fw-semibold">Online Video Consultation</p>
                <p className="text-success mb-1">
                  Available{" "}
                  {doc.profile?.availableSlots?.length ? "today" : "soon"}
                </p>
                <p>Rs. {doc.videoFee || "1,500"}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 fw-semibold">
                  {doc.profile?.location || "Clinic/Hospital Name"}
                </p>
                <p className="text-success mb-1">
                  Available {doc.hospitalAvailability || "today"}
                </p>
                <p>Rs. {doc.profile?.fee || "2,500"}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListFilteredDoctors;
