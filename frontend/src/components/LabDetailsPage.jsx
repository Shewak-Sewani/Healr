import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PopularMedicalTests from "../components/PopularMedicalTests";
import PopularRadiologyTests from "../components/PopularRadiologyTests";
import CartPopup from "../components/CartPopup";

const TestCard = ({ test, onAddToCart }) => {
  return (
    <div
      className="card mb-2 p-2"
      style={{ minHeight: "220px", backgroundColor: "#f3f7fd" }}
    >
      <h5 className="card-title fw-semibold">{test.testName}</h5>
      <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
        Type: {test.testType || "N/A"}
      </p>
      <p className="mb-1" style={{ fontSize: "0.9rem" }}>
        Lab: {test.labName}
      </p>
      <div className="mb-2 fw-bold">
        Rs. {test.fee}{" "}
        <span className="fw-normal" style={{ fontSize: "0.85rem" }}>
          per test
        </span>
      </div>
      <button
        className="btn w-100"
        style={{ backgroundColor: "#00005c", color: "white" }}
        onClick={() => onAddToCart(test)}
      >
        🛒 Add to Cart
      </button>
    </div>
  );
};

const LabDetailsPage = () => {
  const { labName } = useParams();
  const navigate = useNavigate();

  const [laboratories, setLaboratories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const testsPerPage = 6;

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
    if (!Array.isArray(laboratories)) return [];
    return laboratories.reduce((acc, lab) => {
      const labTests = lab.tests.map((test) => ({
        ...test,
        labName: lab.labName,
      }));
      return [...acc, ...labTests];
    }, []);
  }, [laboratories]);

  const filteredTests = useMemo(() => {
    return allTests.filter(
      (test) =>
        test.labName?.toLowerCase() === labName?.toLowerCase() &&
        test.testName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTests, labName, searchTerm]);

  const totalPages = Math.ceil(filteredTests.length / testsPerPage);
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

  const getPageNumbers = () => {
    const totalNumbers = 7;
    const half = Math.floor(totalNumbers / 2);

    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(currentPage - half, 1);
    let end = start + totalNumbers - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - totalNumbers + 1;
    }

    return Array.from({ length: totalNumbers }, (_, i) => start + i);
  };

  const handleAddToCart = (test) => {
    setCart([...cart, test]);
    setIsCartVisible(true);
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-left mb-4">{labName}</h2>

      <PopularMedicalTests labName={labName} />
      <PopularRadiologyTests labName={labName} />

      <div className="container py-3">
        <h5 className="fw-semibold mb-2">Search Tests</h5>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search test by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

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
                    className={`page-item ${currentPage === pageNum ? "active" : ""
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
          onRemove={removeFromCart}
          onCheckout={() => {
            setIsCartVisible(false);
            navigate("/cart");
          }}
        />
      )}
    </div>
  );
};

export default LabDetailsPage;
