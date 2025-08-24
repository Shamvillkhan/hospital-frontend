import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserMd,
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarCheck,
  FaSearch,
} from "react-icons/fa";

const doctorsData = [
  { id: 1, name: "Dr. Arjun Mehta", speciality: "Cardiologist", experience: "10 Years", image: "https://via.placeholder.com/300x200" },
  { id: 2, name: "Dr. Neha Sharma", speciality: "Dermatologist", experience: "7 Years", image: "https://via.placeholder.com/300x200" },
  { id: 3, name: "Dr. Ramesh Kumar", speciality: "Orthopedic", experience: "12 Years", image: "https://via.placeholder.com/300x200" },
  { id: 4, name: "Dr. Priya Singh", speciality: "Neurologist", experience: "8 Years", image: "https://via.placeholder.com/300x200" },
  { id: 5, name: "Dr. Sameer Patel", speciality: "Cardiologist", experience: "15 Years", image: "https://via.placeholder.com/300x200" },
];

const Doctors = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const specialities = [
    { name: "All", icon: <FaUserMd className="me-2" /> },
    { name: "Cardiologist", icon: <FaHeartbeat className="me-2" /> },
    { name: "Dermatologist", icon: <FaUser className="me-2" /> },
    { name: "Orthopedic", icon: <FaBone className="me-2" /> },
    { name: "Neurologist", icon: <FaBrain className="me-2" /> },
  ];

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSpeciality =
      selectedSpeciality === "All" || doc.speciality === selectedSpeciality;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpeciality && matchesSearch;
  });

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({ name: "", email: "", mobile: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Appointment booked with ${selectedDoctor.name}\nName: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}`
    );
    setSelectedDoctor(null);
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="p-4 bg-white rounded shadow-sm">
            <h4 className="mb-3 fw-bold text-dark">Search by Speciality</h4>
            {specialities.map((spec, index) => (
              <button
                key={index}
                className={`btn w-100 mb-2 d-flex align-items-center justify-content-center fw-semibold ${
                  selectedSpeciality === spec.name
                    ? "btn-dark"
                    : "btn-outline-dark"
                }`}
                onClick={() => setSelectedSpeciality(spec.name)}
              >
                {spec.icon} {spec.name}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div className="col-md-9">
          {/* 🔍 Search Input */}
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search doctor or speciality..."
                className="form-control border-dark"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            {filteredDoctors.map((doctor) => (
              <div className="col-md-4 mb-4" key={doctor.id}>
                <div className="card shadow-lg border-0 h-100 rounded-3">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="card-img-top rounded-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold text-dark">
                      {doctor.name}
                    </h5>
                    <p className="text-muted mb-1">{doctor.speciality}</p>
                    <p className="small">Experience: {doctor.experience}</p>
                    <button
                      className="btn btn-dark btn-sm w-100 d-flex align-items-center justify-content-center"
                      onClick={() => handleBookClick(doctor)}
                    >
                      <FaCalendarCheck className="me-2" /> Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredDoctors.length === 0 && (
              <p className="text-center text-muted">No doctors found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {selectedDoctor && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-3 border-0 shadow-lg">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">
                  <FaCalendarCheck className="me-2" />
                  Book Appointment with {selectedDoctor.name}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedDoctor(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Your Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Your Email</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Mobile Number
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaPhone />
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark w-100 fw-bold d-flex align-items-center justify-content-center"
                  >
                    <FaCalendarCheck className="me-2" /> Confirm Appointmentt
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
