import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const PopularLabs = ({ labs = [], onLabSelect }) => {
  const scrollRef = useRef();
  const navigate = useNavigate();

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (!Array.isArray(labs) || labs.length === 0) {
    return <p style={{ color: "#6c757d" }}>No labs available.</p>;
  }

  return (
    <div
      style={{ position: "relative", padding: "0 1rem", marginBottom: "2rem" }}
    >
      <h4 style={{ fontWeight: 600, marginBottom: "1rem", color: "#212529" }}>
        Popular Labs
      </h4>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <button
          onClick={() => scroll("left")}
          style={{
            position: "absolute",
            top: "50%",
            left: "-12px",
            transform: "translateY(-50%)",
            background: "white",
            border: "none",
            borderRadius: "50%",
            padding: "0.4rem 0.5rem",
            fontSize: "1.2rem",
            zIndex: 1,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          }}
        >
          ❮
        </button>

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "1rem",
            overflowX: "auto",
            scrollBehavior: "smooth",
            padding: "0.5rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {labs.map((lab, index) => {
            const name = lab?.labName || "Unknown Lab";
            return (
              <div
                key={index}
                onClick={() => navigate(`/lab/${encodeURIComponent(name)}`)}
                style={{
                  background: "white",
                  minWidth: "240px",
                  maxWidth: "240px",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.07)",
                  padding: "1rem",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.border = "1px solid black")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.border = "1px solid transparent")
                }
              >
                <h6
                  style={{ fontSize: "1rem", fontWeight: 600, color: "#333" }}
                >
                  {name}
                </h6>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginTop: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#eef4ff",
                      color: "#1d3b78",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      padding: "0.4rem 0.6rem",
                      borderRadius: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    🎯 20% off
                  </span>
                  <span
                    style={{
                      backgroundColor: "#e8f6ec",
                      color: "#2e7d32",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      padding: "0.4rem 0.6rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    🏠 Free Home Sample
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <button
          onClick={() => scroll("right")}
          style={{
            position: "absolute",
            top: "50%",
            right: "-12px",
            transform: "translateY(-50%)",
            background: "white",
            border: "none",
            borderRadius: "50%",
            padding: "0.4rem 0.5rem",
            fontSize: "1.2rem",
            zIndex: 1,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          }}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default PopularLabs;
