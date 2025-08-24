import React, { useState } from 'react';
import hero from "../assets/image/hero.jpg";
import { FaCalendarCheck, FaHeartbeat, FaUserMd, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// inside Hero component
const Hero = () => {
  const [showForm, setShowForm] = useState(false); // Modal toggle
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    terms: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.terms) {
    alert("Please accept the Terms & Conditions before submitting.");
    return;
  }

  try {
    const res = await fetch("https://formsubmit.co/shamvillk@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        terms: formData.terms ? "Agreed" : "Not agreed",
        _captcha: "false",
        _next: "https://formsubmit.co/thank-you"
      })
    });

    if (res.ok) {
      alert("Appointment Booked Successfully! ✅");
      setShowForm(false);
      setFormData({ name: "", email: "", mobile: "", terms: false });
    } else {
      alert("Something went wrong ❌");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to submit. Try again later.");
  }
};



  const styles = {
    heroSection: {
      position: "relative",
      height: "100vh",
      backgroundImage: `url(${hero})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      textAlign: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      position: "relative",
      zIndex: 2,
      maxWidth: "800px",
      padding: "0 1rem",
      opacity: 0, // start hidden for animation
      animation: "fadeUp 1s ease-out forwards", // animation
    },
    title: { fontSize: "3.5rem", fontWeight: "800", lineHeight: "1.2", animationDelay: "0s" },
    subtitle: { fontSize: "1.25rem", marginTop: "1rem", marginBottom: "2rem", animationDelay: "0.3s" },
    ctaButton: {
      backgroundColor: "#000",
      padding: "0.75rem 2rem",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "50px",
      border: "none",
      animationDelay: "0.6s",
    },
    sideButtons: {
      position: "absolute",
      top: "50%",
      left: "2rem",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      zIndex: 3,
    },
    sideButton: {
      backgroundColor: "#fff",
      color: "#000",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "12px",
      width: "90%",
      maxWidth: "400px",
      boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      margin: "0.5rem 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    submitBtn: {
      backgroundColor: "#000",
      color: "#fff",
      width: "100%",
      padding: "0.75rem",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      marginTop: "1rem",
    },
  };

  const buttons = [
    { icon: <FaCalendarCheck />, label: "Book Appointment", action: () => navigate("/appointment")  },
    { icon: <FaHeartbeat />, label: "Book Health Checkup", action: () => setShowForm(true) },
    { icon: <FaUserMd />, label: "Get Expert Opinion" , action: () => navigate("/blogs") },
    { icon: <FaSearch />, label: "Search" , action: () => navigate("/doctor") },
  ];

  
  return (
    <div>
      <section style={styles.heroSection}>
        <div style={styles.overlay}></div>

        {/* Sidebar Buttons */}
        <div style={styles.sideButtons} className="side-buttons">
          {buttons.map((btn, index) => (
            <div key={index} className="side-button-wrapper">
              <button
                style={styles.sideButton}
                className="side-btn"
                onClick={btn.action ? btn.action : null}
              >
                {btn.icon}
              </button>
              <span className="tooltip-text">{btn.label}</span>
            </div>
          ))}
        </div>

        {/* Content with animation */}
        <div style={styles.content}>
          <h1 style={styles.title}>Complete Health-Care Solution App For Everyone</h1>
          <p style={styles.subtitle}></p>
       <button 
  onClick={() => navigate('/appointment')} 
  style={styles.ctaButton} 
  className="text-white"
>
  Get Started
</button>

        </div>
      </section>
      
      {/* Modal Form */}
      {showForm && (
        <div style={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#1F2937" }}>Book Health Checkup</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                style={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                style={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                style={styles.input}
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <label style={{ fontSize: "0.9rem", display: "block", marginTop: "0.5rem" }}>
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
                />
                I agree to the Terms & Conditions
              </label>
              <button type="submit" style={styles.submitBtn}>Submit</button>
            </form>
          </div>
          
        </div>

        
      )}

      {/* Tooltip + Animation CSS */}
      <style>
        {`
          .side-button-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tooltip-text {
            position: absolute;
            left: 75px;
            background-color: #000;
            color: #fff;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }
          .side-button-wrapper:hover .tooltip-text {
            opacity: 1 !important;
            visibility: visible !important;
          }
          .side-btn:hover {
            background-color: #000 !important;
            color: #fff !important;
            transform: scale(1.1);
          }
          @keyframes fadeUp {
            0% {
              transform: translateY(50px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @media (max-width: 768px) {
            .side-buttons {
              position: fixed !important;
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
              flex-direction: row !important;
              justify-content: center !important;
              align-items: center !important;
              gap: 1rem !important;
              top: auto !important;
            }
            .tooltip-text {
              left: 50% !important;
              top: -40px !important;
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
