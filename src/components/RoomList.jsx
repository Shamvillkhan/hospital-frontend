import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔍 Fetch all rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:6996/hosp/rooms/getall");
      setRooms(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // ❌ Delete room
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`http://localhost:6996/hosp/rooms/delete/${id}`);
        alert("Room deleted successfully");
        fetchRooms(); // refresh list
      } catch (error) {
        console.error(error);
        alert("Error deleting room");
      }
    }
  };

  // ✏️ Edit room
  const handleEdit = (id) => {
    navigate(`/editroom/${id}`); // AddOrUpdateRoom page
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>All Rooms</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/addroom")}
      >
        Add Room
      </button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room Number</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No rooms found
              </td>
            </tr>
          ) : (
            rooms.map((room) => (
              <tr key={room.roomId}>
                <td>{room.roomId}</td>
                <td>{room.roomNumber}</td>
                <td>{room.type}</td>
                <td>{room.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(room.roomId)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(room.roomId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
