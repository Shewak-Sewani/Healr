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
    fontFamily: '"Georgia", "Times New Roman", serif',
    color: "#2D3748",
    lineHeight: "1.7",
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
    borderTop: "1px solid #E5E7EB",
    paddingTop: "20px",
  },
};

const PaymentTermsPage = () => {
  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Payment Terms</h1>
          <p style={styles.paragraph}>
            These terms govern all transactions made through our platform. We
            ensure secure payment processing and full transparency in billing.
          </p>

          <h2 style={styles.subheading}>1. Accepted Payment Methods</h2>
          <p style={styles.paragraph}>
            We accept credit/debit cards, digital wallets, bank transfers, and
            any other method visible on the payment page. All payments are
            processed through secure gateways.
          </p>

          <h2 style={styles.subheading}>2. Payment Confirmation</h2>
          <p style={styles.paragraph}>
            A confirmation email/SMS is sent immediately upon successful
            transaction. Users can also view the receipt in their profile
            dashboard.
          </p>

          <h2 style={styles.subheading}>3. Pricing Policy</h2>
          <p style={styles.paragraph}>
            Service prices are clearly mentioned on the website. The platform is
            not responsible for any price difference quoted offline by clinics
            or doctors.
          </p>

          <h2 style={styles.subheading}>4. Failed Transactions</h2>
          <p style={styles.paragraph}>
            In case of a failed payment, no amount will be deducted. If an
            amount is debited but the service is not booked, it will be
            auto-refunded within 3–5 business days.
          </p>

          <p style={styles.note}>
            We recommend saving the transaction ID for future reference.
          </p>
        </div>
      </div>
      <div style={styles.footer}>
        &copy; {new Date().getFullYear()} HEALR. All rights reserved. |{" "}
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

export default PaymentTermsPage;
