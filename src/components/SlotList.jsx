import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const SlotsList = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await axios.get("https://hospital-backend-3-0pon.onrender.com/hosp/slots/getall");
      setSlots(res.data);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Slots</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Slot ID</th>
            <th>Slot Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {slots.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No slots found
              </td>
            </tr>
          ) : (
            slots.map((slot) => (
              <tr key={slot.slotId}>
                <td>{slot.slotId}</td>
                <td>{slot.slotName}</td>
                <td>{slot.startTime}</td>
                <td>{slot.endTime}</td>
                <td>{slot.createdAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SlotsList;
