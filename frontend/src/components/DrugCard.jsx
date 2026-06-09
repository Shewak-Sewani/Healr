import React, { useEffect, useState } from "react";
import "./Drugcard.css";
import { useNavigate } from "react-router-dom";
import CartPopup from "./CartPopup";
import { useCart } from "./CartContext";
import Footer from "./Footer";

const defaultMedicines = [
  "Panadol",
  "Augmentin",
  "Flagyl",
  "Cal*",
  "Bru*",
  "Cip*",
  "Aug*",
  "Pan*",
  "Paracetamol",
  "Ibuprofen",
  "Cetirizine",
  "Disprin",
  "Eno",
  "Zantac",
  "Metro*",
  "Napa",
  "Amox*",
  "Tylenol",
  "Advil",
  "Benadryl",
  "Claritin",
  "Zyrtec",
  "Pepto-Bismol",
  "Tums",
  "Ranitidine",
  "Dolo",
  "Crocin",
  "Motrin",
  "Asprin",
  "Domperidone",
  "Rifampin",
  "Lisinopril",
  "Losartan",
  "Atorvastatin",
  "Omeprazole",
  "Prednisone",
  "Ciprofloxacin",
  "Azithromycin",
];

const DrugCard = ({ drug, onDetailsClick, onAddToCart }) => {
  const brand = drug.openfda?.brand_name?.[0] || "Unknown";
  const purpose = drug.purpose?.[0] || "No purpose info";
  const price = drug.price || 0;

  const truncate = (text, length = 80) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <div className="card">
      <h2 className="card-title">{brand}</h2>
      <p>{truncate(purpose)}</p>
      <div className="price">
        Rs. {price} <span style={{ fontWeight: "normal" }}>per unit</span>
      </div>
      <div>
        <button
          className="btn btn-details"
          onClick={() => onDetailsClick(drug)}
        >
          Details
        </button>
        <button className="btn btn-cart" onClick={() => onAddToCart(drug)}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

const DrugSearchPage = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [selectedCartDrug, setSelectedCartDrug] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const { cart, addToCart, removeFromCart } = useCart();

  const navigate = useNavigate();

  const handleAddToCart = (drug) => {
    addToCart(drug);
    setIsCartVisible(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(drugs.length / itemsPerPage);
  const paginatedDrugs = drugs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchDefaultDrugs = async () => {
    setLoading(true);

    try {
      const fetchPromises = defaultMedicines.map(async (name) => {
        try {
          const res = await fetch(
            `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${name}&limit=3`
          );
          const data = await res.json();
          if (data.results?.[0]) {
            return {
              ...data.results[0],
              price: Math.floor(Math.random() * (200 - 10 + 1)) + 10,
            };
          }
        } catch (err) {
          console.error(`Error fetching ${name}`, err);
          return null;
        }
      });

      const allResults = await Promise.all(fetchPromises);
      const filteredResults = allResults.filter(Boolean);

      setDrugs(filteredResults);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error in fetchDefaultDrugs", error);
      setDrugs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultDrugs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim().length < 2) {
      fetchDefaultDrugs();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(
          searchTerm + "*"
        )}&limit=100`
      );
      const data = await res.json();
      const pricedResults =
        data.results?.map((d) => ({
          ...d,
          price: Math.floor(Math.random() * (600 - 10 + 1)) + 10,
        })) || [];
      setDrugs(pricedResults);
    } catch (err) {
      console.error("Error searching drugs:", err);
      setDrugs([]);
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  };

  const closeModal = () => setSelectedDrug(null);

  return (
    <>
      <div className="bg-light min-vh-100 py-5">
        <div className="container">
          <h1 className="text-center fw-bold mb-3">Medicine Search</h1>
          <p className="text-center text-muted mb-4">
            Find and order your medicines online
          </p>
          <form
            onSubmit={handleSearch}
            className="d-flex justify-content-center mb-4"
          >
            <div className="search-bar-merged">
              <input
                type="text"
                className="search-input-merged"
                placeholder="Search by brand name (e.g. Panadol, Augmentin)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn-merged">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "150px" }}
            >
              <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : drugs.length > 0 ? (
            <>
              <div className="row g-4">
                {paginatedDrugs.map((drug, i) => (
                  <div className="col-md-6 col-lg-4" key={i}>
                    <DrugCard
                      drug={drug}
                      onDetailsClick={setSelectedDrug}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center mt-5 gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      className={`modern-pagination-btn ${currentPage === num ? "active" : ""
                        }`}
                      onClick={() => setCurrentPage(num)}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor:
                          currentPage === num ? "#022442" : "#fff",
                        color: currentPage === num ? "#fff" : "#000",
                        border: "1px solid #ccc",
                        borderRadius: "0.375rem",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-muted">No medicines found.</p>
          )}

          {selectedDrug && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>
                  ×
                </button>
                <h2>{selectedDrug.openfda?.brand_name?.[0] || "Unknown"}</h2>
                <p>
                  <strong>Generic:</strong>{" "}
                  {selectedDrug.openfda?.generic_name?.[0] || "N/A"}
                </p>
                <p>
                  <strong>Manufacturer:</strong>{" "}
                  {selectedDrug.openfda?.manufacturer_name?.[0] || "Unknown"}
                </p>
                <p className="truncate-text">
                  <strong>Purpose:</strong>{" "}
                  {selectedDrug.purpose?.[0] || "No purpose info"}
                </p>
                <p className="truncate-text">
                  <strong>Indications:</strong>{" "}
                  {selectedDrug.indications_and_usage?.[0] || "Not specified"}
                </p>
                <p className="truncate-text">
                  <strong>Dosage:</strong>{" "}
                  {selectedDrug.dosage_and_administration?.[0] ||
                    "Not available"}
                </p>
                <p>
                  <strong>Price:</strong> Rs. {selectedDrug.price}
                </p>
              </div>
            </div>
          )}
        </div>
        {isCartVisible && (
          <CartPopup
            cart={cart}
            onClose={() => setIsCartVisible(false)}
            onRemove={(index) => removeFromCart(index)}
            onCheckout={() => {
              setIsCartVisible(false);
              navigate("/cart");
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default DrugSearchPage;
