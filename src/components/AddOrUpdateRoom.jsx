import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";

const AddOrUpdateRoom = () => {
  const { id } = useParams(); // agar id hai to update mode
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomNumber: "",
    type: "GENERAL_WARD",
    status: "AVAILABLE"
  });

  const [loading, setLoading] = useState(false);

  // 🔍 Agar update mode, to backend se data fetch karo
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`${BASE_URL}/rooms/get/${id}`)
        .then((res) => setRoom(res.data))
        .catch((err) => alert("Error fetching room data"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // 🔄 Update mode
        await axios.put(`${BASE_URL}/rooms/update/${id}`, room);
        alert("Room updated successfully!");
      } else {
        // ➕ Add mode
        await axios.post(`${BASE_URL}/rooms/add`, room);
        alert("Room added successfully!");
        setRoom({ roomNumber: "", type: "GENERAL_WARD", status: "AVAILABLE" });
      }
      navigate("/rooms"); // redirect after submit
    } catch (error) {
      console.error(error);
      alert("Error submitting room. Check console for details.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{id ? "Update Room" : "Add Room"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Room Number</label>
          <input
            type="text"
            className="form-control"
            name="roomNumber"
            value={room.roomNumber}
            onChange={handleChange}
            required
            maxLength={20}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Room Type</label>
          <select
            className="form-select"
            name="type"
            value={room.type}
            onChange={handleChange}
          >
            <option value="GENERAL_WARD">General Ward</option>
            <option value="ICU">ICU</option>
            <option value="PRIVATE">Private</option>
            <option value="OPERATION_THEATER">Operation Theater</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Room Status</label>
          <select
            className="form-select"
            name="status"
            value={room.status}
            onChange={handleChange}
          >
            <option value="AVAILABLE">Available</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Update Room" : "Add Room"}
        </button>
      </form>
    </div>
  );
};

export default AddOrUpdateRoom;
