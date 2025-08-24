import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaEnvelope, FaTag, FaCommentDots, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="py-5 bg-white">
      <div className="container">
        {/* Title */}
        <div className="text-center mb-5">
          <h2 style={{ fontWeight: "700", fontSize: "2.5rem", color: "#000" }}>
            Contact Us
          </h2>
          <p style={{ color: "#555", fontSize: "1.125rem" }}>
            We’d love to hear from you! Please reach out for any queries,
            appointments, or feedback.
          </p>
        </div>

        <div className="row align-items-center">
          {/* Contact Form */}
          <div className="col-md-6 mb-4">
            <div className="p-4 bg-light shadow rounded">
              <form>
                <div className="mb-3">
                  <label className="form-label text-dark">
                    <FaUser className="me-2" /> Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-dark text-dark"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">
                    <FaEnvelope className="me-2" /> Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control border-dark text-dark"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">
                    <FaTag className="me-2" /> Subject
                  </label>
                  <input
                    type="text"
                    className="form-control border-dark text-dark"
                    placeholder="Enter subject"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">
                    <FaCommentDots className="me-2" /> Message
                  </label>
                  <textarea
                    className="form-control border-dark text-dark"
                    rows="4"
                    placeholder="Write your message"
                  ></textarea>
                </div>

                <button
                  className="btn w-100"
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Image + Info */}
          <div className="col-md-6 text-center">
            <img
              src="https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-7926.jpg?w=740"
              alt="Hospital"
              className="img-fluid mb-4"
              style={{
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
            <h5 style={{ fontWeight: "600", color: "#000" }}>
              <FaMapMarkerAlt className="me-2" /> Our Address
            </h5>
            <p style={{ color: "#555" }}>
              123 Healthcare Street, Indore, India
            </p>
            <h5 style={{ fontWeight: "600", color: "#000" }}>
              <FaPhoneAlt className="me-2" /> Phone
            </h5>
            <p style={{ color: "#555" }}>+91 98765 43210</p>
            <h5 style={{ fontWeight: "600", color: "#000" }}>
              <FaEnvelope className="me-2" /> Email
            </h5>
            <p style={{ color: "#555" }}>support@hospital.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
