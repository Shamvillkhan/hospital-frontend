import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddDoctorSlot = () => {
  const [formData, setFormData] = useState({
    slotId: "",
    staffId: "",
    dayOfWeek: "",
    isActive: true,
  });

  const [slots, setSlots] = useState([]);
  const [staff, setStaff] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch Slots
  useEffect(() => {
    axios
      .get("http://localhost:6996/hosp/slots/getall")
      .then((res) => setSlots(res.data))
      .catch((err) => console.error("Error fetching slots:", err));
  }, []);

  // Fetch Staff (Doctors)
  useEffect(() => {
    axios
      .get("http://localhost:6996/hosp/staff/doctors")
      .then((res) => setStaff(res.data))
      .catch((err) => console.error("Error fetching staff:", err));
  }, []);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        slotId: { slotId: formData.slotId },
        staffId: { staffId: formData.staffId },
        dayOfWeek: formData.dayOfWeek,
        isActive: formData.isActive,
      };

      await axios.post("http://localhost:6996/hosp/doctorslots/add", payload);
      setMessage("Doctor slot created successfully!");
      setFormData({ slotId: "", staffId: "", dayOfWeek: "", isActive: true });
    } catch (error) {
      console.error("Error creating doctor slot:", error);
      setMessage("Failed to create doctor slot");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Doctor Slot</h2>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
        {/* Select Doctor */}
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
            {staff.map((doc) => (
              <option key={doc.staffId} value={doc.staffId}>
                {doc.firstName} {doc.lastName} ({doc.department?.name})
              </option>
            ))}
          </select>
        </div>

        {/* Select Slot */}
        <div className="mb-3">
          <label className="form-label">Slot</label>
          <select
            className="form-select"
            value={formData.slotId}
            onChange={(e) =>
              setFormData({ ...formData, slotId: e.target.value })
            }
            required
          >
            <option value="">-- Select Slot --</option>
            {slots.map((s) => (
              <option key={s.slotId} value={s.slotId}>
                {s.slotName} ({s.startTime} - {s.endTime})
              </option>
            ))}
          </select>
        </div>

        {/* Select Day of Week */}
        <div className="mb-3">
          <label className="form-label">Day of Week</label>
          <select
            className="form-select"
            value={formData.dayOfWeek}
            onChange={(e) =>
              setFormData({ ...formData, dayOfWeek: e.target.value })
            }
            required
          >
            <option value="">-- Select Day --</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        {/* Availability */}
        <div className="mb-3">
          <label className="form-label">Availability</label>
          <select
            className="form-select"
            value={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.value === "true" })
            }
            required
          >
            <option value={true}>Available</option>
            <option value={false}>Booked</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddDoctorSlot;
