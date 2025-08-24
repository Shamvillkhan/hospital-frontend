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
  const [formData, setFormData] = useState({ name: "", date: "", time: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Appointment booked with ${selectedDoctor.name} on ${formData.date} at ${formData.time}`);
    setSelectedDoctor(null);
    setFormData({ name: "", date: "", time: "" });
  };

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <h2 className="text-center fw-bold text-dark mb-3">Book Your Appointment</h2>
        <p className="text-center text-muted mb-5">
          Choose from our team of highly qualified doctors and schedule your appointment at your convenience.
        </p>

        {/* Doctor List */}
        <div className="row g-4">
          {doctors.map((doc) => (
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
          ))}
        </div>

        {/* Appointment Form */}
        {selectedDoctor && (
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              <div className="card shadow-lg border-0">
                <div className="card-body">
                  <h4 className="text-center fw-bold mb-4">
                    Book Appointment with <span className="text-primary">{selectedDoctor.name}</span>
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        className="form-control"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="time"
                        className="form-control"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
          </div>
        )}
      </div>
    </section>
  );
};

export default Appointment;
