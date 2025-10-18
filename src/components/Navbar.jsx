import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: "#fff",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1030,
      transition: "all 0.3s ease",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    navLink: {
      fontSize: "1rem",
      fontWeight: "500",
      margin: "0 1rem",
      color: "#000",
      textDecoration: "none",
      position: "relative",
      paddingBottom: "4px",
    },
    navbarBrand: {
      fontSize: "1.95rem",
      fontWeight: "700",
      color: "#000",
      textDecoration: "none",
    },
    toggler: {
      border: "none",
      filter: "invert(0%)",
    },
  };

  return (
    <>
      {/* ✅ Internal CSS for hover underline */}
      <style>{`
        .nav-link.custom-link {
          color: #000 !important;
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link.custom-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background-color: black;
          transition: width 0.3s ease;
        }
        .nav-link.custom-link:hover::after {
          width: 100%;
        }
        .nav-link.custom-link:hover {
          color: #000 !important; /* ✅ no blue */
        }
      `}</style>

      <nav className="navbar navbar-expand-lg py-4" style={styles.navbar}>
        <div className="container">
          <Link to="/" className="navbar-brand" style={styles.navbarBrand}>
            AZZOLO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={styles.toggler}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link custom-link" style={styles.navLink}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cure" className="nav-link custom-link" style={styles.navLink}>
                  Cure
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/knowmore" className="nav-link custom-link" style={styles.navLink}>
                  Know more
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/testimonial" className="nav-link custom-link" style={styles.navLink}>
                  Testimonial
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/doctor" className="nav-link custom-link" style={styles.navLink}>
                  Doctors
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link custom-link" style={styles.navLink}>
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link custom-link" style={styles.navLink}>
                  AdminDashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Spacer div so content doesn't overlap navbar */}
      <div style={{ height: "90px" }}></div>
    </>
  );
};

export default Navbar;
