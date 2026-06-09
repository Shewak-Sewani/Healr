import { useLocation, Navigate } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";

const DoctorDashboardWrapper = () => {
  const location = useLocation();
  const storedDoctor = JSON.parse(localStorage.getItem("doctor"));
  const doctor = location.state?.doctor || storedDoctor;

  if (!doctor) return <Navigate to="/" replace />;

  return <DoctorDashboard doctor={doctor} />;
};

export default DoctorDashboardWrapper
