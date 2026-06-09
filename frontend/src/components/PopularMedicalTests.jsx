import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import CartPopup from "./CartPopup";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestCard = ({ test, onAddToCart }) => {
  return (
    <div
      style={{
        minWidth: "280px",
        flex: "0 0 auto",
        backgroundColor: "#f3f7fd",
        borderRadius: "1rem",
        padding: "1rem",
        margin: "0 0.5rem",
      }}
    >
      <h6 style={{ fontWeight: 600 }}>{test.testName}</h6>
      {test.testType && (
        <p
          style={{
            fontSize: "0.85rem",
            color: "#6c757d",
            marginBottom: "0.5rem",
          }}
        >
          Known as {test.testType}
        </p>
      )}
      <p style={{ fontWeight: 700, marginBottom: "1rem" }}>
        Rs. {test.fee}
        {test.maxFee ? ` - ${test.maxFee}` : ""}
      </p>
      <button
        style={{
          width: "100%",
          backgroundColor: "#00005c",
          color: "#fff",
          fontWeight: 500,
          fontSize: "0.9rem",
          border: "none",
          padding: "0.5rem",
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

const PopularMedicalTests = ({ labName = "" }) => {
  const [laboratories, setLaboratories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleAddToCart = (test) => {
    addToCart({
      ...test,
      openfda: { brand_name: [test.testName] },
      price: test.fee,
      quantity: 1,
    });
    setIsCartVisible(true);
  };

  useEffect(() => {
    const fetchLabs = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/laboratories");
        const data = await res.json();
        setLaboratories(data);
      } catch (err) {
        console.error("Error loading labs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  const allTests = laboratories.reduce((acc, lab) => {
    if (labName && lab.labName !== labName) return acc;
    const pathologyTests = lab.tests
      .filter((test) => test.testType === "Pathology")
      .map((test) => ({ ...test, labName: lab.labName }));
    return [...acc, ...pathologyTests];
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "2rem 0" }}>
      <div style={{ padding: "0 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          Popular Medical Tests
        </h4>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#6c757d",
            marginBottom: "1.5rem",
          }}
        >
          {labName
            ? `Medical tests from ${labName}`
            : "Browse top medical (pathology) tests across labs"}
        </p>
        {loading ? (
          <div
            style={{
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <style>{`
      .loading {
        --speed-of-animation: 0.9s;
        --gap: 6px;
        --first-color: #4c86f9;
        --second-color: #49a84c;
        --third-color: #f6bb02;
        --fourth-color: #f6bb02;
        --fifth-color: #2196f3;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        gap: 6px;
        height: 100px;
      }

      .loading span {
        width: 4px;
        height: 50px;
        background: var(--first-color);
        animation: scale var(--speed-of-animation) ease-in-out infinite;
      }

      .loading span:nth-child(2) {
        background: var(--second-color);
        animation-delay: -0.8s;
      }

      .loading span:nth-child(3) {
        background: var(--third-color);
        animation-delay: -0.7s;
      }

      .loading span:nth-child(4) {
        background: var(--fourth-color);
        animation-delay: -0.6s;
      }

      .loading span:nth-child(5) {
        background: var(--fifth-color);
        animation-delay: -0.5s;
      }

      @keyframes scale {
        0%, 40%, 100% {
          transform: scaleY(0.05);
        }
        20% {
          transform: scaleY(1);
        }
      }
    `}</style>
          </div>
        ) : allTests.length > 0 ? (
          <div style={{ position: "relative" }}>
            <ChevronLeft
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "50%",
                padding: "0.25rem",
                zIndex: 1,
                cursor: "pointer",
              }}
              size={30}
              onClick={scrollLeft}
            />

            <div
              ref={scrollRef}
              style={{
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
                gap: "1rem",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onScroll={(e) => {
                e.currentTarget.style.scrollbarWidth = "none";
              }}
            >
              {allTests.map((test, i) => (
                <TestCard key={i} test={test} onAddToCart={handleAddToCart} />
              ))}
            </div>

            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <ChevronRight
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "50%",
                padding: "0.25rem",
                zIndex: 1,
                cursor: "pointer",
              }}
              size={30}
              onClick={scrollRight}
            />
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#6c757d" }}>
            No pathology tests found.
          </p>
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
  );
};

export default PopularMedicalTests;
