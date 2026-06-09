import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import AppNavbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HealthServices from "./components/HealthServices";
import DoctorsList from "./components/DoctorsList";
import Footer from "./components/Footer";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Testimonials from "./components/Testimonials";
import SearchResultsPage from "./components/SearchResultsPage";
import DoctorDashboardWrapper from "./components/DoctorDashboardWrapper";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import DeliveryPolicyPage from "./components/DeliveryPolicyPage";
import RefundPolicyPage from "./components/RefundPolicyPage";
import PaymentTermsPage from "./components/PaymentTermsPage";
import ContactUsPage from "./components/ContactUsPage";
import ConditionsList from "./components/ConditionsList";
import DoctorsCityWise from "./components/DoctorsCityWise";
import SurgerySection from "./components/Surgeries";
import CartPage from "./components/Cartpage";
import DrugSearchPage from "./components/DrugCard";
import BookAppointment from "./components/BookAppointment";
import InClinicAppointments from "./components/InClinicAppointments";
import LaboratoryTests from "./components/LaboratoryTests";
import AddPrescription from "./components/AddPrescription";
import LabDetailsPage from "./components/LabDetailsPage";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/NotFound";
import AdminDashboard from "./components/AdminDashboard";
import SurgeryResultsPage from "./components/SurgeryResultsPage";
import ConsultOnline from "./components/ConsultOnline";

function App() {
  const [patient, setPatient] = useState(null);
  const [cart, setCart] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    const storedDoctor = localStorage.getItem("doctor");
    const storedAdmin = localStorage.getItem("admin");

    if (storedPatient) {
      try {
        setPatient(JSON.parse(storedPatient));
      } catch (e) {
        console.error("Invalid patient JSON in localStorage", e);
      }
    }

    if (storedDoctor) {
      try {
        setDoctor(JSON.parse(storedDoctor));
      } catch (e) {
        console.error("Invalid doctor JSON in localStorage", e);
      }
    }

    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (e) {
        console.error("Invalid admin JSON in localStorage", e);
      }
    }

    const handleStorageChange = () => {
      const updatedPatient = localStorage.getItem("patient");
      const updatedDoctor = localStorage.getItem("doctor");
      const updatedAdmin = localStorage.getItem("admin");

      setPatient(updatedPatient ? JSON.parse(updatedPatient) : null);
      setDoctor(updatedDoctor ? JSON.parse(updatedDoctor) : null);
      setAdmin(updatedAdmin ? JSON.parse(updatedAdmin) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        <AppNavbar
          patient={patient}
          setPatient={setPatient}
          doctor={doctor}
          setDoctor={setDoctor}
          admin={admin}
          setAdmin={setAdmin}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <HealthServices />
                <DoctorsList />
                <ConditionsList />
                <Testimonials />
                <About />
                <DoctorsCityWise />
                <Footer />
              </>
            }
          />
          <Route path="/consult-online" element={<ConsultOnline />} />
          <Route
            path="/in-clinic-appointment"
            element={<InClinicAppointments />}
          />
          <Route path="*" element={<NotFound />} />

          <Route path="/labs" element={<LaboratoryTests />} />
          <Route path="/lab/:labName" element={<LabDetailsPage />} />
          <Route path="/surgery" element={<SurgerySection />} />
          <Route path="/medicine" element={<DrugSearchPage />} />
          <Route
            path="/cart"
            element={<CartPage cart={cart} setCart={setCart} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              <Login
                setPatient={setPatient}
                setDoctor={setDoctor}
                setAdmin={setAdmin}
              />
            }
          />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/dashboard" element={<DoctorDashboardWrapper />} />
          <Route path="/add-prescription" element={<AddPrescription />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/delivery-policy" element={<DeliveryPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/payment-terms" element={<PaymentTermsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route
            path="/book-appointment/:doctorId"
            element={<BookAppointment />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/surgery-results" element={<SurgeryResultsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
