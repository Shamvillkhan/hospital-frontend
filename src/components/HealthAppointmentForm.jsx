import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const HealthAppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "Scheduled",
    notes: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://hospital-backend-3-0pon.onrender.com/hosp/healthappointments/add", formData);
      setMessage("✅ Appointment created successfully!");
      setFormData({
        name: "",
        appointmentDate: "",
        appointmentTime: "",
        status: "Scheduled",
        notes: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Error creating appointment.");
    }
  };

  return (
    <div className="container my-5">
      <style>
        {`
          .form-card {
            max-width: 600px;
            margin: auto;
            padding: 30px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          .form-title {
            text-align: center;
            font-weight: bold;
            margin-bottom: 20px;
            color: #007bff;
          }
          .btn-custom {
            background-color: #007bff;
            color: white;
            font-weight: 500;
          }
          .btn-custom:hover {
            background-color: #0056b3;
          }
          .message {
            text-align: center;
            margin-top: 15px;
            font-weight: 500;
          }
        `}
      </style>

      <div className="form-card">
        <h3 className="form-title">Book Appointment</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength="45"
            />
          </div>

          {/* Appointment Date */}
          <div className="mb-3">
            <label className="form-label">Appointment Date</label>
            <input
              type="date"
              className="form-control"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Appointment Time */}
          <div className="mb-3">
            <label className="form-label">Appointment Time</label>
            <input
              type="time"
              className="form-control"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notes */}
          <div className="mb-3">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              maxLength="500"
            ></textarea>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength="45"
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              maxLength="10"
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-custom w-100">
            Submit Appointment
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default HealthAppointmentForm;
