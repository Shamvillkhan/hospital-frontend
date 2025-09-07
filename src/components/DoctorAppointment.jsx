import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "Scheduled",
    notes: "",
    email: "",
    staffId: "",
    phone: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fetch doctors
  useEffect(() => {
    axios
      .get("http://localhost:6996/hosp/staff/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "staffId") {
      const doctor = doctors.find((doc) => doc.staffId.toString() === value);
      setSelectedDoctor(doctor || null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      alert("Please select a doctor");
      return;
    }

    // Construct payload with full staff object
    const payload = {
      name: formData.name,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      status: formData.status,
      notes: formData.notes,
      email: formData.email,
      phone: formData.phone,
      staff: {
        staffId: selectedDoctor.staffId,
        firstName: selectedDoctor.firstName,
        lastName: selectedDoctor.lastName,
        role: selectedDoctor.role,
        specialization: selectedDoctor.specialization,
        phone: selectedDoctor.phone,
        email: selectedDoctor.email,
        hireDate: selectedDoctor.hireDate,
        department: selectedDoctor.department,
        image: selectedDoctor.image,
        imagePath: selectedDoctor.imagePath,
        address: selectedDoctor.address,
        workingDays: selectedDoctor.workingDays,
      },
    };

    axios
      .post("http://localhost:6996/hosp/doctorappointments/add", payload)
      .then((res) => {
        alert("Appointment booked successfully!");
        setFormData({
          name: "",
          appointmentDate: "",
          appointmentTime: "",
          status: "Scheduled",
          notes: "",
          email: "",
          staffId: "",
          phone: "",
        });
        setSelectedDoctor(null);
      })
      .catch((err) => {
        console.error("Error saving appointment:", err);
        alert("Failed to save appointment");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Book Appointment</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor</label>
          <select
            className="form-select"
            name="staffId"
            value={formData.staffId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.staffId} value={doc.staffId}>
                {doc.firstName} {doc.lastName} (
                {doc.department ? doc.department.name : "Doctor"})
              </option>
            ))}
          </select>
        </div>

        {/* Display selected doctor info */}
        {selectedDoctor && (
          <div className="card mb-3 shadow-sm mt-3">
            <div className="row g-0 align-items-center">
              <div className="col-md-4">
                <img
                  src={
                    selectedDoctor.imagePath
                      ? `http://localhost:6996/hosp/uploads/${selectedDoctor.image}`
                      : "https://via.placeholder.com/150"
                  }
                  className="img-fluid rounded-start"
                  alt={selectedDoctor.firstName}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {selectedDoctor.firstName} {selectedDoctor.lastName}
                  </h5>
                  <p className="card-text">
                    <strong>Department:</strong>{" "}
                    {selectedDoctor.department
                      ? selectedDoctor.department.name
                      : "Unknown"}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Specialization:{" "}
                      {selectedDoctor.specialization || "Doctor"}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
