import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const DoctorSlotsList = () => {
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [search, setSearch] = useState({
    doctor: "",
    dayOfWeek: "",
    slotName: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    axios
      .get("https://hospital-backend-3-0pon.onrender.com/hosp/doctorslots/getall")
      .then((res) => setDoctorSlots(res.data)) // direct array now
      .catch((err) => console.error("Error fetching doctor slots:", err));
  }, []);

  // 🔹 Filtered slots based on search
  const filteredSlots = doctorSlots.filter((slot) => {
    const fullName =
      `${slot.staffId?.firstName || ""} ${slot.staffId?.lastName || ""}`
        .toLowerCase()
        .includes(search.doctor.toLowerCase());

    const dayMatch = slot.dayOfWeek
      ?.toLowerCase()
      .includes(search.dayOfWeek.toLowerCase());

    const slotMatch = slot.slotId?.slotName
      ?.toLowerCase()
      .includes(search.slotName.toLowerCase());

    // Convert slot times
    const slotStart = slot.slotId?.startTime || "";
    const slotEnd = slot.slotId?.endTime || "";

    const rangeStart = search.startTime || "00:00";
    const rangeEnd = search.endTime || "23:59";

    // Agar user ne time filter dala hai to check karo
    const inRange =
      (!search.startTime && !search.endTime) ||
      (slotStart >= rangeStart && slotEnd <= rangeEnd);

    return fullName && dayMatch && slotMatch && inRange;
  });

  return (
    <div className="container mt-5">
      <h2>All Doctor Slots</h2>

      {/* 🔹 Search Filters */}
      <div className="row g-2 mb-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Doctor"
            value={search.doctor}
            onChange={(e) =>
              setSearch({ ...search, doctor: e.target.value })
            }
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Day of Week"
            value={search.dayOfWeek}
            onChange={(e) =>
              setSearch({ ...search, dayOfWeek: e.target.value })
            }
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={search.slotName}
            onChange={(e) =>
              setSearch({ ...search, slotName: e.target.value })
            }
          >
            <option value="">All Slots</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="time"
            className="form-control"
            value={search.startTime}
            onChange={(e) =>
              setSearch({ ...search, startTime: e.target.value })
            }
          />
        </div>
        <div className="col-md-2">
          <input
            type="time"
            className="form-control"
            value={search.endTime}
            onChange={(e) =>
              setSearch({ ...search, endTime: e.target.value })
            }
          />
        </div>
      </div>

      {/* 🔹 Slots Table */}
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Slot ID</th>
            <th>Doctor Name</th>
            <th>Department</th>
            <th>Slot Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Day of Week</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {filteredSlots.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No doctor slots found
              </td>
            </tr>
          ) : (
            filteredSlots.map((slot) => (
              <tr key={slot.doctorSlotId}>
                <td>{slot.doctorSlotId}</td>
                <td>
                  {slot.staffId?.firstName} {slot.staffId?.lastName}
                </td>
                <td>{slot.staffId?.department?.name}</td>
                <td>{slot.slotId?.slotName}</td>
                <td>{slot.slotId?.startTime}</td>
                <td>{slot.slotId?.endTime}</td>
                <td>{slot.dayOfWeek}</td>
                
                <td>{slot.isActive ? "Available" : "Booked"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorSlotsList;
