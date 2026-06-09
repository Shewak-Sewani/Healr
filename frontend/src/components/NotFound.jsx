import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem 1rem 1rem 1rem",
        marginTop: "-2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f8f9fa",
        color: "#343a40",
        minHeight: "90vh",
      }}
    >
      <div style={{ width: "100%,", maxWidth: "800px", marginBottom: "2rem" }}>
        <DotLottieReact
          src="https://lottie.host/044cce1c-ecca-4c1f-83bd-f540ccfa994a/ddWZ1dXTjZ.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <h2
        style={{ marginBottom: "0.5rem", fontSize: "2rem", fontWeight: "700" }}
      >
        404 - Page Not Found
      </h2>
      <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
        Oops! The page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;
