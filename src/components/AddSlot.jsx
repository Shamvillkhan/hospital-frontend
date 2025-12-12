import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from "../api";

const AddSlot = () => {
  const [slot, setSlot] = useState({
    slotName: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/slots/add`, slot);
      alert("Slot added successfully!");
      setSlot({ slotName: "", startTime: "", endTime: "" }); // reset form
    } catch (err) {
      console.error("Error adding slot:", err);
      alert("Failed to add slot!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Slot</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Slot Name</label>
          <select
            className="form-select"
            name="slotName"
            value={slot.slotName}
            onChange={handleChange}
            required
          >
            <option value="">Select Slot</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Start Time</label>
          <input
            type="time"
            className="form-control"
            name="startTime"
            value={slot.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Time</label>
          <input
            type="time"
            className="form-control"
            name="endTime"
            value={slot.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlot;
