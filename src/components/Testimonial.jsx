import React from "react";
import { FaUserMd, FaUserInjured } from "react-icons/fa";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "The doctors and nurses here truly care about their patients. They treated me with kindness and professionalism throughout my recovery.",
      author: "Sarah Johnson",
      role: "Recovered Patient",
      icon: <FaUserInjured size={40} color="#2563EB" />,
    },
    {
      id: 2,
      quote:
        "As a doctor, I feel proud to work in an environment where patient well-being is the top priority. The teamwork here is exceptional.",
      author: "Dr. Michael Lee",
      role: "Cardiologist",
      icon: <FaUserMd size={40} color="#059669" />,
    },
    {
      id: 3,
      quote:
        "The hospital’s facilities are world-class, and the staff is always ready to help with a smile. Highly recommend this hospital to everyone.",
      author: "David Wilson",
      role: "Patient’s Family Member",
      icon: <FaUserInjured size={40} color="#2563EB" />,
    },
  ];

  return (
    <section
      style={{
        padding: "5rem 0",
        backgroundColor: "#F0F9FF",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "3rem",
            color: "#0F172A",
          }}
        >
          What People Say About Us
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 20px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  gap: "1rem",
                }}
              >
                {testimonial.icon}
                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "1.125rem",
                      color: "#0F172A",
                    }}
                  >
                    {testimonial.author}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#6B7280",
                    }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  color: "#475569",
                  fontStyle: "italic",
                }}
              >
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
