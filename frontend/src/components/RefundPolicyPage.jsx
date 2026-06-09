import React from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: '"Georgia", "Times New Roman", serif',
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#FFFFFF",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    color: "#2D3748",
    lineHeight: "1.7",
    fontFamily: '"Georgia", "Times New Roman", serif',
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "24px",
    borderBottom: "2px solid #E2E8F0",
    paddingBottom: "10px",
    color: "black",
    textAlign: "center",
  },
  subheading: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginTop: "32px",
    marginBottom: "12px",
    color: "black",
  },
  paragraph: {
    fontSize: "1.05rem",
    marginBottom: "16px",
  },
  list: {
    paddingLeft: "24px",
    marginBottom: "16px",
    fontSize: "1.05rem",
    listStyleType: "disc",
  },
  note: {
    fontStyle: "italic",
    fontSize: "0.9rem",
    color: "#4A5568",
  },
  footer: {
    marginTop: "40px",
    fontSize: "0.85rem",
    color: "white",
    backgroundColor: "black",
    textAlign: "center",

    paddingTop: "20px",
  },
};

const RefundPolicyPage = () => {
  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Refund Policy</h1>
          <p style={styles.paragraph}>
            We strive to ensure a smooth and satisfying experience for our
            users. However, in certain situations, you may be eligible for a
            refund. This policy explains how refunds work on our platform.
          </p>

          <h2 style={styles.subheading}>1. Eligibility for Refund</h2>
          <ul style={styles.list}>
            <li>If a doctor cancels the appointment unexpectedly.</li>
            <li>
              If the user cancels at least 24 hours before the scheduled time.
            </li>
            <li>In the case of technical failures or duplicate payments.</li>
          </ul>

          <h2 style={styles.subheading}>2. Refund Process</h2>
          <p style={styles.paragraph}>
            Once a refund is approved, it will be processed within 5–7 business
            days to the original payment method. Users will be notified via
            email or SMS.
          </p>

          <h2 style={styles.subheading}>3. Non-Refundable Situations</h2>
          <ul style={styles.list}>
            <li>Late cancellations (less than 24 hours before appointment).</li>
            <li>No-shows or missed appointments.</li>
            <li>Refund requests without valid reason or documentation.</li>
          </ul>

          <p style={styles.note}>
            Note: We reserve the right to make final decisions on refunds.
          </p>
        </div>
      </div>
      <div style={styles.footer}>
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved. |{" "}
        <a href="/privacy-policy" style={{ color: "#4B5563" }}>
          Privacy Policy
        </a>
      </div>
    </>
  );
};

export default RefundPolicyPage;
