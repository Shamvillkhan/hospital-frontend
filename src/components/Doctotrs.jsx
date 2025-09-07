import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserMd,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarCheck,
  FaSearch,
} from "react-icons/fa";

const Doctors = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch departments
    axios
      .get("http://localhost:6996/hosp/departments/getall")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));

    // Fetch doctors
    axios
      .get("http://localhost:6996/hosp/staff/getall")
      .then((res) => {
        const doctors = res.data
          .filter((staff) => staff.role === "Doctor")
          .map((doc) => ({
            ...doc,
            departmentName: doc.department?.name || "Unknown", // read name from department object
          }));
        setDoctorsData(doctors);
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesDepartment =
      selectedDepartment === "All" || doc.departmentName === selectedDepartment;
    const matchesSearch =
      doc.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.departmentName &&
        doc.departmentName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDepartment && matchesSearch;
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
      `Appointment booked with ${selectedDoctor.firstName} ${selectedDoctor.lastName}\nName: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}`
    );
    setSelectedDoctor(null);
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="p-4 bg-white rounded shadow-sm">
            <h4 className="mb-3 fw-bold text-dark">Filter by Department</h4>
            <button
              className={`btn w-100 mb-2 fw-semibold ${
                selectedDepartment === "All" ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setSelectedDepartment("All")}
            >
              All
            </button>
            {departments.map((dept) => (
              <button
                key={dept.departmentId}
                className={`btn w-100 mb-2 fw-semibold ${
                  selectedDepartment === dept.name ? "btn-dark" : "btn-outline-dark"
                }`}
                onClick={() => setSelectedDepartment(dept.name)}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div className="col-md-9">
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search doctor or department..."
                className="form-control border-dark"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            {filteredDoctors.map((doctor) => (
              <div className="col-md-4 mb-4" key={doctor.staffId}>
                <div className="card shadow-lg border-0 h-100 rounded-3">
                  <img
                    src={
                      doctor.image
                        ? `http://localhost:6996/hosp/uploads/${doctor.image}`
                        : "https://via.placeholder.com/300x200"
                    }
                    alt={doctor.firstName + " " + doctor.lastName}
                    className="card-img-top rounded-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold text-dark">
                      {doctor.firstName} {doctor.lastName}
                    </h5>
                    <p className="text-muted mb-1">{doctor.departmentName}</p>
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
                  Book Appointment with {selectedDoctor.firstName}{" "}
                  {selectedDoctor.lastName}
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
                    <label className="form-label fw-semibold">Mobile Number</label>
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
                    <FaCalendarCheck className="me-2" /> Confirm Appointment
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
