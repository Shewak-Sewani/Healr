import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CartPopup from "./CartPopup";
import { useCart } from "./CartContext";
import HeroSection from "./HeroSection";
import PopularLabs from "./PopularLabs";
import PopularMedicalTests from "./PopularMedicalTests";
import PopularRadiologyTests from "./PopularRadiologyTests";
import Footer from "./Footer";

const TestCard = ({ test, onAddToCart }) => {
  return (
    <div
      style={{
        minHeight: "220px",
        backgroundColor: "#f3f7fd",
        borderRadius: "0.5rem",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      <h5 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
        {test.testName}
      </h5>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#6c757d",
          marginBottom: "0.25rem",
        }}
      >
        Type: {test.testType || "N/A"}
      </p>
      <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        Lab: {test.labName}
      </p>
      <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>
        Rs. {test.fee}{" "}
        <span
          style={{ fontWeight: 400, fontSize: "0.85rem", color: "#6c757d" }}
        >
          per test
        </span>
      </div>
      <button
        style={{
          width: "100%",
          backgroundColor: "#00005c",
          color: "white",
          fontWeight: 500,
          padding: "0.5rem",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
        onClick={() => onAddToCart(test)}
      >
        🛒 Add to Cart
      </button>
    </div>
  );
};

const LaboratoryTests = () => {
  const [laboratories, setLaboratories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 10;
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchTerm(query);
      setCurrentPage(1);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/laboratories");
        const data = await response.json();
        setLaboratories(data);
      } catch (error) {
        console.error("Error fetching laboratories:", error);
      }
    };
    fetchLaboratories();
  }, []);

  const allTests = useMemo(() => {
    return laboratories.reduce((acc, lab) => {
      const labTests = lab.tests.map((test) => ({
        ...test,
        labName: lab.labName,
      }));
      return [...acc, ...labTests];
    }, []);
  }, [laboratories]);

  const filteredTests = useMemo(() => {
    if (!searchTerm.trim()) return allTests;
    return allTests.filter((test) =>
      test.testName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTests, searchTerm]);

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);

  const getPageNumbers = () => {
    const maxPagesToShow = 7;
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let end = start + maxPagesToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleAddToCart = (test) => {
    addToCart({
      ...test,
      openfda: { brand_name: [test.testName] },
      price: test.fee,
      quantity: 1,
    });
    setIsCartVisible(true);
  };

  return (
    <>
      <HeroSection />

      <div style={{ backgroundColor: "#f8f9fa", padding: "1rem 0" }}>
        <div
          style={{
            padding: "0 2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            minHeight: "60px",
          }}
        >
          <style>{`
            .loader {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 0.1em;
              font-size: 1.2rem;
              
              height: 80px;
            }
            .loader span {
              color: black;
              opacity: 0;
              letter-spacing: 0.1em;
              text-shadow: 2px 2px 3px #919191;
              animation: pass 2s ease-in-out infinite;
            }
            .l { animation-delay: 0.2s; }
            .o { animation-delay: 0.4s; }
            .a { animation-delay: 0.6s; }
            .d { animation-delay: 0.8s; }
            .i { animation-delay: 1s; }
            .n { animation-delay: 1.2s; }
            .g { animation-delay: 1.4s; }
            .d1 { animation-delay: 1.6s; animation-name: pass1; }
            .d2 { animation-delay: 2s; animation-name: pass1; }

            @keyframes pass {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            @keyframes pass1 {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>

          {laboratories && laboratories.length > 0 ? (
            <PopularLabs labs={laboratories.slice(0, 9)} />
          ) : (
            <div className="loader">
              <span className="l">L</span>
              <span className="o">o</span>
              <span className="a">a</span>
              <span className="d">d</span>
              <span className="i">i</span>
              <span className="n">n</span>
              <span className="g">g</span>
              <span className="d1">.</span>
              <span className="d2">.</span>
            </div>
          )}
        </div>
      </div>

      <PopularMedicalTests />
      <PopularRadiologyTests />

      <div
        style={{ padding: "2rem 2rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        <h4
          style={{
            fontWeight: 600,
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Search Tests
        </h4>
        <input
          type="text"
          style={{
            width: "100%",
            marginBottom: "1.5rem",
            padding: "0.75rem 1rem",
            border: "2px solid rgb(153, 153, 255)",
            borderRadius: "0.5rem",
            fontSize: "1rem",
          }}
          placeholder="Search test by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />{" "}
        <div className="row">
          {currentTests.map((test, index) => (
            <div className="col-md-4" key={index}>
              <TestCard test={test} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <nav>
              <ul className="pagination">
                {currentPage > 1 && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      &laquo;
                    </button>
                  </li>
                )}

                {getPageNumbers().map((pageNum) => (
                  <li
                    className={`page-item ${
                      currentPage === pageNum ? "active" : ""
                    }`}
                    key={pageNum}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                ))}

                {currentPage < totalPages && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      &raquo;
                    </button>
                  </li>
                )}
              </ul>
            </nav>
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
      <Footer />
    </>
  );
};

export default LaboratoryTests;
