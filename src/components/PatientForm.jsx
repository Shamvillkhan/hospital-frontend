import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PatientForm = () => {
  const location = useLocation();
  const editingPatient = location.state?.patient || null;

  const [formData, setFormData] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    bloodType: "",
  });

  const [message, setMessage] = useState("");

  // Agar update ke liye patient data aaya hai to form pre-fill kar dena
  useEffect(() => {
    if (editingPatient) {
      setFormData(editingPatient);
    }
  }, [editingPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPatient) {
        // Update patient
        await axios.put(`https://hospital-backend-3-0pon.onrender.com/hosp/patients/update/${formData.patientId}`, formData);
        setMessage("Patient updated successfully!");
      } else {
        // Create new patient
        await axios.post("https://hospital-backend-3-0pon.onrender.com/hosp/patients/add", formData);
        setMessage("Patient registered successfully!");
      }

      // Reset form only if it's a new registration
      if (!editingPatient) {
        setFormData({
          patientId: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          phone: "",
          address: "",
          email: "",
          bloodType: "",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage("Error submitting patient. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        {editingPatient ? "Update Patient" : "Patient Registration"}
      </h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            className="form-control"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="^[0-9]{10}$"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            maxLength={100}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Blood Type</label>
          <input
            type="text"
            name="bloodType"
            className="form-control"
            value={formData.bloodType}
            onChange={handleChange}
            maxLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingPatient ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
