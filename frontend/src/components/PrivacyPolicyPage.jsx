import React from "react";

const styles = {
  pageWrapper: {
    backgroundColor: "#e5e7eb",
    padding: "40px 20px",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  document: {
    backgroundColor: "#ffffff",
    padding: "60px 50px",
    maxWidth: "850px",
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
    fontFamily: '"Georgia", "Times New Roman", serif',
    lineHeight: "1.8",
    color: "#1f2937",
    textAlign: "left",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #d1d5db",
    paddingBottom: "10px",
  },
  subheading: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginTop: "32px",
    marginBottom: "12px",
    color: "#111827",
  },
  paragraph: {
    marginBottom: "16px",
    fontSize: "1.05rem",
  },
  list: {
    paddingLeft: "20px",
    marginBottom: "16px",
    fontSize: "1.05rem",
    listStyleType: "disc",
  },
  note: {
    fontStyle: "italic",
    fontSize: "0.9rem",
    color: "#6b7280",
    marginTop: "30px",
  },
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <div style={styles.pageWrapper}>
        <div style={styles.document}>
          <h1 style={styles.heading}>Privacy Policy</h1>
          <p style={styles.paragraph}>
            Your privacy is extremely important to us. This Privacy Policy
            outlines how we collect, use, disclose, and protect your personal
            information when you use our platform.
          </p>

          <h2 style={styles.subheading}>1. Information We Collect</h2>
          <p style={styles.paragraph}>
            We collect both personal and non-personal information such as your
            name, contact number, email, date of birth, location, medical
            history, appointment records, and more.
          </p>

          <h2 style={styles.subheading}>2. How We Use Your Information</h2>
          <ul style={styles.list}>
            <li>To schedule appointments and send confirmations</li>
            <li>To communicate important updates and notifications</li>
            <li>To improve platform usability and service quality</li>
            <li>For internal analytics and reporting</li>
          </ul>

          <h2 style={styles.subheading}>3. Sharing and Disclosure</h2>
          <p style={styles.paragraph}>
            We do not sell or rent your data to third parties. We may share
            limited information with verified doctors, clinics, or diagnostic
            centers solely for service purposes.
          </p>

          <h2 style={styles.subheading}>4. Data Security</h2>
          <p style={styles.paragraph}>
            Your data is stored securely using encryption protocols and
            industry-standard security practices. We take full measures to
            prevent unauthorized access.
          </p>

          <h2 style={styles.subheading}>5. Cookies</h2>
          <p style={styles.paragraph}>
            Our website uses cookies to enhance your browsing experience. You
            can choose to disable cookies in your browser settings.
          </p>

          <h2 style={styles.subheading}>6. User Consent</h2>
          <p style={styles.paragraph}>
            By using our services, you consent to the terms of this Privacy
            Policy. You may request to delete or update your data anytime by
            contacting us.
          </p>

          <p style={styles.note}>Last updated: 25/05/2025</p>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "0.85rem",
          padding: "20px",
          color: "white",
          backgroundColor: "black",
        }}
      >
        &copy; {new Date().getFullYear()} @HEALR. All rights reserved. |{" "}
        <a href="/terms" style={{ color: "#4B5563" }}>
          Terms
        </a>{" "}
        |{" "}
        <a href="/contact" style={{ color: "#4B5563" }}>
          Contact
        </a>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
