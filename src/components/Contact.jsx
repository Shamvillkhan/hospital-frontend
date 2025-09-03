import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaEnvelope, FaTag, FaCommentDots, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // success/error msg

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await axios.post("http://localhost:6996/hosp/contactus/add", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); // reset form
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Failed to send message. Please try again.");
    }
  };

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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-dark">
                    <FaUser className="me-2" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control border-dark text-dark"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">
                    <FaEnvelope className="me-2" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control border-dark text-dark"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">
                    <FaTag className="me-2" /> Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control border-dark text-dark"
                    placeholder="Enter subject"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">
                    <FaCommentDots className="me-2" /> Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control border-dark text-dark"
                    rows="4"
                    placeholder="Write your message"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
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

              {/* Status Message */}
              {status && (
                <p className="mt-3 text-center" style={{ color: status.includes("✅") ? "green" : "red" }}>
                  {status}
                </p>
              )}
            </div>
          </div>

          {/* Image + Info */}
          <div className="col-md-6 text-center">
            <img
              src="https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-7926.jpg?w=740"
              alt="Hospital"
              className="img-fluid mb-4"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <h5 style={{ fontWeight: "600", color: "#000" }}>
              <FaMapMarkerAlt className="me-2" /> Our Address
            </h5>
            <p style={{ color: "#555" }}>123 Healthcare Street, Indore, India</p>
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
