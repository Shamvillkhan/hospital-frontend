import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorAppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "Scheduled",
    notes: "",
    email: "",
    staffId: "",
    doctorSlotId: "",
    phone: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Fetch all doctors
  useEffect(() => {
    axios
      .get("http://localhost:6996/hosp/staff/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  // 🔹 Fetch all doctor slots
  useEffect(() => {
    axios
      .get("http://localhost:6996/hosp/doctorslots/getall")
      .then((res) => setSlots(res.data))
      .catch((err) => console.error("Error fetching slots:", err));
  }, []);

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        status: formData.status,
        notes: formData.notes,
        email: formData.email,
        phone: formData.phone,
        staff: { staffId: formData.staffId },
        doctorSlot: { doctorSlotId: formData.doctorSlotId },
      };

      await axios.post(
        "http://localhost:6996/hosp/doctorappointments/add",
        payload
      );

      setMessage("Appointment created successfully!");
      setFormData({
        name: "",
        appointmentDate: "",
        appointmentTime: "",
        status: "Scheduled",
        notes: "",
        email: "",
        staffId: "",
        doctorSlotId: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      setMessage("Failed to create appointment");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Doctor Appointment</h2>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Patient Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            pattern="[0-9]{10}"
            required
          />
        </div>

        {/* Appointment Date */}
        <div className="mb-3">
          <label className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.appointmentDate}
            onChange={(e) =>
              setFormData({ ...formData, appointmentDate: e.target.value })
            }
            required
          />
        </div>

        {/* Appointment Time */}
        <div className="mb-3">
          <label className="form-label">Appointment Time</label>
          <input
            type="time"
            className="form-control"
            value={formData.appointmentTime}
            onChange={(e) =>
              setFormData({ ...formData, appointmentTime: e.target.value })
            }
            required
          />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
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
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            maxLength={500}
          ></textarea>
        </div>

        {/* Doctor */}
        <div className="mb-3">
          <label className="form-label">Doctor</label>
          <select
            className="form-select"
            value={formData.staffId}
            onChange={(e) =>
              setFormData({ ...formData, staffId: e.target.value })
            }
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.staffId} value={doc.staffId}>
                {doc.firstName} {doc.lastName} ({doc.department?.name})
              </option>
            ))}
          </select>
        </div>
{/* Doctor Slot */}
<div className="mb-3">
  <label className="form-label">Doctor Slot</label>
  <select
    className="form-select"
    value={formData.doctorSlotId}
    onChange={(e) =>
      setFormData({ ...formData, doctorSlotId: e.target.value })
    }
    required
  >
    <option value="">-- Select Slot --</option>
    {slots.map((slot) => (
      <option key={slot.doctorSlotId} value={slot.doctorSlotId}>
        {`Slot: ${slot.slotId?.slotName} | Time: ${slot.slotId?.startTime} - ${slot.slotId?.endTime} | Doctor: ${slot.staffId?.firstName} ${slot.staffId?.lastName} | Department: ${slot.staffId?.department?.name} | Day: ${slot.dayOfWeek} | ${slot.isActive ? "Available" : "Booked"}`}
      </option>
    ))}
  </select>
</div>


        <button type="submit" className="btn btn-primary">
          Add Appointment
        </button>
      </form>
    </div>
  );
};

export default DoctorAppointmentForm;
