import React from "react";
import { FaHospitalAlt, FaUserMd, FaHeartbeat, FaAmbulance } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ navigate ke liye import

const KnowMore = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&q=80&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          color: "white",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "15px 25px",
            borderRadius: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Know More About Us
          </h1>
        </div>
      </section>

      {/* About Section */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "3rem auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#000",
            marginBottom: "1rem",
          }}
        >
          Welcome to Our Hospital
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#333", lineHeight: "1.7" }}>
          We are dedicated to providing world-class healthcare with compassion
          and excellence. With state-of-the-art facilities, advanced medical
          technology, and a team of highly qualified doctors, we aim to make
          healthcare accessible and affordable for everyone.
        </p>
      </section>

      {/* Mission, Vision, Values */}
      <section style={{ backgroundColor: "#F9F9F9", padding: "3rem 20px" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "2rem",
              color: "#000",
            }}
          >
            Our Promise
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <FaHospitalAlt size={40} color="#000" />
              <h3
                style={{
                  marginTop: "1rem",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                }}
              >
                Our Mission
              </h3>
              <p style={{ color: "#333" }}>
                To provide compassionate healthcare with cutting-edge
                technology.
              </p>
            </div>
            <div
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <FaHeartbeat size={40} color="#000" />
              <h3
                style={{
                  marginTop: "1rem",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                }}
              >
                Our Vision
              </h3>
              <p style={{ color: "#333" }}>
                To be the most trusted healthcare provider in the region.
              </p>
            </div>
            <div
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <FaUserMd size={40} color="#000" />
              <h3
                style={{
                  marginTop: "1rem",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                }}
              >
                Our Values
              </h3>
              <p style={{ color: "#333" }}>
                Integrity, compassion, and excellence in patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "3rem auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "#000",
          }}
        >
          Why Choose Us?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <FaAmbulance size={40} color="#000" />
            <h3 style={{ marginTop: "0.5rem", fontWeight: "600" }}>
              24/7 Emergency
            </h3>
          </div>
          <div>
            <FaUserMd size={40} color="#000" />
            <h3 style={{ marginTop: "0.5rem", fontWeight: "600" }}>
              Expert Doctors
            </h3>
          </div>
          <div>
            <FaHeartbeat size={40} color="#000" />
            <h3 style={{ marginTop: "0.5rem", fontWeight: "600" }}>
              Advanced Facilities
            </h3>
          </div>
          <div>
            <FaHospitalAlt size={40} color="#000" />
            <h3 style={{ marginTop: "0.5rem", fontWeight: "600" }}>
              Affordable Care
            </h3>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          textAlign: "center",
          padding: "3rem 20px",
          backgroundColor: "#000",
          color: "white",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Ready to Experience the Best Care?
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Book your appointment with our experts today.
        </p>
        <button
          onClick={() => navigate("/appointment")} // ✅ navigate lagaya
          style={{
            backgroundColor: "white",
            color: "#000",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "600",
            borderRadius: "8px",
            cursor: "pointer",
            border: "1px solid #000",
          }}
        >
          Book Appointment
        </button>
      </section>
    </div>
  );
};

export default KnowMore;
