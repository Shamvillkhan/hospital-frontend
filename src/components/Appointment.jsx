import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const doctors = [
  { id: 1, name: "Dr. Ramesh Kumar", specialty: "Cardiologist", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Dr. Neha Sharma", specialty: "Dermatologist", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "Dr. Aman Verma", specialty: "Neurologist", image: "https://randomuser.me/api/portraits/men/67.jpg" },
  { id: 4, name: "Dr. Pooja Patel", specialty: "Pediatrician", image: "https://randomuser.me/api/portraits/women/50.jpg" },
  { id: 5, name: "Dr. Sameer Khan", specialty: "Orthopedic", image: "https://randomuser.me/api/portraits/men/40.jpg" },
  { id: 6, name: "Dr. Anjali Mehta", specialty: "Gynecologist", image: "https://randomuser.me/api/portraits/women/65.jpg" },
];

const Appointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [search, setSearch] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form to FormSubmit.co
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor) return;

    try {
      const res = await fetch("https://formsubmit.co/shamvillk@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          doctor: selectedDoctor.name,
          specialty: selectedDoctor.specialty,
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          _captcha: "false",
          _next: "https://formsubmit.co/thank-you",
        }),
      });

      if (res.ok) {
        alert(`✅ Appointment booked successfully with ${selectedDoctor.name}`);
        setSelectedDoctor(null);
        setFormData({ name: "", email: "", mobile: "" });
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Failed to send. Try again later.");
    }
  };

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <h2 className="text-center fw-bold text-dark mb-3">Book Your Appointment</h2>
        <p className="text-center text-muted mb-4">
          Choose from our team of highly qualified doctors and schedule your appointment.
        </p>

        {/* Search Input */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Doctor List */}
        <div className="row g-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div key={doc.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card shadow-sm h-100 text-center border-0">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="card-img-top rounded-circle mx-auto mt-4"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">{doc.name}</h5>
                    <p className="card-text text-primary fw-medium">{doc.specialty}</p>
                    <button
                      onClick={() => setSelectedDoctor(doc)}
                      className="btn btn-dark w-100"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-danger">No doctors found</p>
          )}
        </div>

        {/* Popup Form (Modal Style) */}
        {selectedDoctor && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          >
            <div className="card shadow-lg border-0" style={{ maxWidth: "500px", width: "100%" }}>
              <div className="card-body">
                <h4 className="text-center fw-bold mb-4">
                  Book Appointment with <span className="text-primary">{selectedDoctor.name}</span>
                </h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Your Mobile Number"
                      className="form-control"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100 mb-2">
                    ✅ Confirm Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDoctor(null)}
                    className="btn btn-outline-secondary w-100"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Appointment;
