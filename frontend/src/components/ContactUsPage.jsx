import React from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#fff",
    fontFamily: "Inter, Segoe UI, Roboto, sans-serif",
    padding: "0",
    margin: "0",
  },
  header: {
    backgroundColor: "#000066",
    color: "#fff",
    padding: "40px 20px",
    textAlign: "center",
  },
  headerTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "10px",
  },
  headerDesc: {
    fontSize: "1.1rem",
    fontWeight: "400",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "40px 60px",
    gap: "40px",
  },
  about: {
    color: "#2D3748",
    fontSize: "1rem",
  },
  contactForm: {
    maxWidth: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "6px 0",
    border: "1px solid #CBD5E0",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    margin: "6px 0",
    border: "1px solid #CBD5E0",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#F6A623",
    border: "none",
    padding: "10px 16px",
    borderRadius: "4px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
  offices: {
    fontSize: "1rem",
    color: "#2D3748",
  },
  officeSection: {
    marginBottom: "20px",
  },
  officeTitle: {
    fontWeight: "700",
    fontSize: "1.1rem",
    marginBottom: "4px",
  },
  emailPhone: {
    color: "#4A5568",
    fontSize: "0.95rem",
  },
};

const ContactUsPage = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>Contact Us</div>
        <div style={styles.headerDesc}>
          Get in touch with HEALR. Use the form to submit your queries or email
          us at hello@HEALR.com
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.about}>
          <h3>About HEALR</h3>
          <p>
            HEALR.com is Pakistan’s premier digital healthcare platform that
            aims to revolutionize the local healthcare market. It connects
            patients with the right doctors and enables the doctors to optimize
            their medical practices via their practice management software.
            Patients can use HEALR (web or mobile app) for the online doctor
            appointment, e-consultation and online lab tests. On the other hand,
            the doctors can manage their appointments, automate their
            scheduling, manage medical records, and process billing.
          </p>
        </div>
        <div style={styles.contactForm}>
          <h3>Contact us</h3>
          <p>
            Please send us a note and we’ll get back to you as quickly as
            possible.
          </p>
          <input style={styles.input} type="text" placeholder="Full name" />
          <input style={styles.input} type="email" placeholder="Email" />
          <input style={styles.input} type="text" placeholder="Phone" />
          <input style={styles.input} type="text" placeholder="Subject" />
          <textarea style={styles.textarea} placeholder="Message"></textarea>
          <button style={styles.button}>Send Message</button>
        </div>
        <div style={styles.offices}>
          <h3>Regional Offices</h3>
          <div style={styles.officeSection}>
            <div style={styles.officeTitle}>Lahore</div>
            <div>
              Address: 290 CCA Sector FF, DHA Phase IV, Lahore, Pakistan, 54660
            </div>
            <div style={styles.emailPhone}>
              Email: hello@HEALR.com
              <br />
              Phone: 04238900939
            </div>
          </div>
          <div style={styles.officeSection}>
            <div style={styles.officeTitle}>Karachi</div>
            <div>
              Address: Office# 703, West Land Trade Center, Shaheed-e-Millat
              Road, Karachi, 75350
            </div>
            <div style={styles.emailPhone}>
              Email: hello@HEALR.com
              <br />
              Phone: 02138140600
            </div>
          </div>
          <div style={styles.officeSection}>
            <div style={styles.officeTitle}>Rawalpindi</div>
            <div>
              Address: Office #55 1st Floor, Midway Centrum Mall 6th rd, Murree
              Road, Rawalpindi, 46300
            </div>
            <div style={styles.emailPhone}>
              Email: hello@HEALR.com
              <br />
              Phone: 0518151800
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
