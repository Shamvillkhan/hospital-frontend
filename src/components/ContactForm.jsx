import axios from "axios";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    active: true,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://hospital-backend-3-0pon.onrender.com/hosp/contactdetail/add", formData);
      setMessage("✅ Contact saved successfully!");
      console.log(res.data);
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "Something went wrong"));
      console.error(err);
    }
  };

  return (
    <>
      <style>{`
        .form-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 25px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .form-title {
          text-align: center;
          margin-bottom: 25px;
          font-size: 24px;
          font-weight: 600;
          color: #333;
        }
        .contact-form .form-group {
          margin-bottom: 18px;
        }
        .contact-form label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #444;
        }
        .contact-form input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          transition: border-color 0.2s ease-in-out;
        }
        .contact-form input:focus {
          border-color: #000;
          outline: none;
        }
        .checkbox label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: #333;
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .submit-btn:hover {
          background: #333;
        }
        .form-message {
          margin-top: 15px;
          text-align: center;
          font-weight: 500;
          color: #007bff;
        }
      `}</style>

      <div className="form-container">
        <h2 className="form-title">Add Contact Detail</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              maxLength="10"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-group">
            <label>Facebook</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/yourprofile"
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/yourprofile"
            />
          </div>

          <div className="form-group">
            <label>Instagram</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/yourprofile"
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />{" "}
              Active
            </label>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </div>
    </>
  );
};

export default ContactForm;
