import { Link, useNavigate } from "react-router-dom";
import fetchAllDoctors from "./fetchAllDoctors";
import DoctorDropdown from "./DoctorDropdown";
import ConditionsDropdown from "./ConditionDropdown";
import CityDropdown from "./CityDropdown";

const AppNavbar = ({
  patient,
  setPatient,
  doctor,
  setDoctor,
  admin,
  setAdmin,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("patient");
    localStorage.removeItem("doctor");
    localStorage.removeItem("admin");
    if (setPatient) setPatient(null);
    if (setDoctor) setDoctor(null);
    if (setAdmin) setAdmin(null);
    navigate("/login");
  };

  const underlineStyle = `
    .underline-hover {
      position: relative;
      display: inline-block;
      color: #333;
      text-decoration: none;
      font-weight: 500;
    }

    .underline-hover::after {
      content: '';
      position: absolute;
      width: 0%;
      height: 2px;
      left: 0;
      bottom: -4px;
      background-color: #ff6b35;
      transition: width 0.3s ease;
    }

    .underline-hover:hover::after {
      width: 100%;
    }
  `;
  const loginstyle = `
  .nav-login-btn {
    background: transparent;
    color: #2c83fb; /* blue text */
    border: 1px solid #2c83fb;
    transition: all 0.3s ease;
  }
  .nav-login-btn:hover {
    background: #2c83fb;
    color: #fff;
  }

  .nav-signup-btn {
    background: #ffc107;
    color: #333;
    border: none;
    transition: all 0.3s ease;
  }
  .nav-signup-btn:hover {
    background: #e0a800;
    color: white;
  }
`;

  return (
    <>
      <style>{underlineStyle}</style>
      <style>{loginstyle}</style>
      <nav
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          background: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 1000,
          padding: "1rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            height: "40px",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            <span style={{ color: "#ff6b35" }}>hea</span>
            <span style={{ color: "#0033cc" }}>lr</span>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "3rem",
              }}
            >
              <div className="underline-hover">
                <DoctorDropdown />
              </div>
              <div className="underline-hover">
                <CityDropdown />
              </div>
              <div className="underline-hover">
                <ConditionsDropdown />
              </div>

              <a
                href="#About"
                className="underline-hover"
                style={{
                  color: "#333",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                About
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
                position: "relative",
              }}
            >
              {!patient && !doctor && !admin ? (
                <>
                  <Link
                    to="/login"
                    className="nav-login-btn"
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: "0.95rem",
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-signup-btn"
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: "0.95rem",
                    }}
                  >
                    SignUp
                  </Link>
                </>
              ) : admin ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <button
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderRadius: "6px",
                      fontWeight: "500",
                      fontSize: "0.95rem",
                      background: "#f0f0f0",
                      color: "#333",
                      border: "none",
                      cursor: "default",
                    }}
                  >
                    {admin?.name || admin?.email || "Admin"}
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderRadius: "6px",
                      fontWeight: "500",
                      fontSize: "0.95rem",
                      background: "#ff4d4f",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <button
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderRadius: "6px",
                      fontWeight: "500",
                      fontSize: "0.95rem",
                      background: "#f0f0f0",
                      color: "#333",
                      border: "none",
                      cursor: "default",
                    }}
                  >
                    {patient?.name || doctor?.name}
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderRadius: "6px",
                      fontWeight: "500",
                      fontSize: "0.95rem",
                      background: "#ff4d4f",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavbar;
