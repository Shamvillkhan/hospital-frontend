import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const [contact, setContact] = useState(null);

  const styles = {
    footer: {
      backgroundColor: "#000000ff",
      padding: "4rem 0 2rem",
      fontFamily: "'Inter', sans-serif",
      color: "#E5E7EB",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "1.5rem",
      color: "#ffffffff",
    },
    listItem: {
      marginBottom: "0.75rem",
      color: "#ffffffff",
      cursor: "pointer",
    },
    copyright: {
      marginTop: "3rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid #ffffffff",
      color: "#ffffffff",
      textAlign: "center",
    },
    appBadge: {
      height: "40px",
      marginRight: "1rem",
      marginBottom: "1rem",
      borderRadius: "6px",
      backgroundColor: "#000000ff",
      padding: "2px",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "0.75rem",
      color: "#ffffffff",
    },
    icon: {
      marginRight: "10px",
      color: "#ffffffff",
    },
    socialIcons: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    socialIcon: {
      fontSize: "1.25rem",
      color: "#ffffffff",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    // Fetch only active contact detail from backend
    axios
      .get("https://hospital-backend-3-0pon.onrender.com/hosp/contactdetail/active")
      .then((res) => {
        setContact(res.data[0]); // assuming you get an array, take first
      })
      .catch((err) => {
        console.error("Error fetching contact detail:", err);
      });
  }, []);

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="row">
          {/* Hospital Info */}
          <div className="col-md-3 mb-4">
            <h4 style={styles.sectionTitle}>Our Hospital</h4>
            <p style={{ color: "#ffffffff" }}>
              Providing compassionate healthcare with world-class facilities and
              expert doctors to ensure your well-being.
            </p>
            <div style={styles.socialIcons}>
              {contact?.facebook && (
                <a href={contact.facebook} target="_blank" rel="noreferrer">
                  <FaFacebook style={styles.socialIcon} />
                </a>
              )}
              {contact?.twitter && (
                <a href={contact.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter style={styles.socialIcon} />
                </a>
              )}
              {contact?.instagram && (
                <a href={contact.instagram} target="_blank" rel="noreferrer">
                  <FaInstagram style={styles.socialIcon} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h4 style={styles.sectionTitle}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={styles.listItem}>Home</li>
              <li style={styles.listItem}>Departments</li>
              <li style={styles.listItem}>Doctors</li>
              <li style={styles.listItem}>Appointments</li>
            </ul>
          </div>

          {/* Patient Resources */}
          <div className="col-md-3 mb-4">
            <h4 style={styles.sectionTitle}>Patient Resources</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={styles.listItem}>Health Insurance</li>
              <li style={styles.listItem}>Emergency Care</li>
              <li style={styles.listItem}>Privacy Policy</li>
              <li style={styles.listItem}>Terms of Service</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h4 style={styles.sectionTitle}>Contact Us</h4>
            <div style={styles.contactItem}>
              <FaPhoneAlt style={styles.icon} /> {contact?.phone || "N/A"}
            </div>
            <div style={styles.contactItem}>
              <FaEnvelope style={styles.icon} /> {contact?.email || "N/A"}
            </div>
            <div style={styles.contactItem}>
              <FaMapMarkerAlt style={styles.icon} /> {contact?.address || "N/A"}
            </div>
            <div className="d-flex flex-column mt-3">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                style={styles.appBadge}
              />
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Play Store"
                style={{ ...styles.appBadge, height: "50px" }}
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={styles.copyright}>
          <p>© 2025 Wellness Hospital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
