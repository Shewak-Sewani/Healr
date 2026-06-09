import React from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#F7FAFC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: "16px",
    fontSize: "1.05rem",
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

const DeliveryPolicyPage = () => {
  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Delivery Policy</h1>
          <p style={styles.paragraph}>
            Our platform primarily delivers digital healthcare services such as
            doctor consultations, appointment scheduling, and diagnostic
            reports. Below is our detailed delivery policy for all services
            offered.
          </p>

          <h2 style={styles.subheading}>1. Appointment Confirmations</h2>
          <p style={styles.paragraph}>
            Appointment bookings are confirmed instantly through in-app
            notifications, SMS, or email once the payment (if any) is processed
            and the slot is available.
          </p>

          <h2 style={styles.subheading}>2. Lab Reports and Results</h2>
          <p style={styles.paragraph}>
            Diagnostic reports are delivered electronically within the expected
            timeframe mentioned during booking. Users will be notified via
            email/SMS once the report is available on their dashboard.
          </p>

          <h2 style={styles.subheading}>3. Online Consultations</h2>
          <p style={styles.paragraph}>
            For telemedicine appointments, links are delivered instantly upon
            confirmation. Users are expected to join the call at the scheduled
            time.
          </p>

          <h2 style={styles.subheading}>4. Service Limitations</h2>
          <p style={styles.paragraph}>
            We do not offer physical delivery of medicines or other offline
            services. Please verify service availability before proceeding with
            any transaction.
          </p>

          <p style={styles.note}>
            For assistance, please reach out to our support team.
          </p>
        </div>
      </div>
      <div style={styles.footer}>
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved. |{" "}
        <a href="/privacy-policy" style={{ color: "#4B5563" }}>
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="/contact" style={{ color: "#4B5563" }}>
          Contact
        </a>
      </div>
    </>
  );
};

export default DeliveryPolicyPage;
