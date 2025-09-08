import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all staff from backend
  useEffect(() => {
    axios
      .get("http://localhost:6996/hosp/staff/getall")
      .then((res) => {
        const staffList = res.data.map((member) => ({
          id: member.staffId,
          name: `${member.firstName} ${member.lastName}`,
          role: member.role,
          department: member.department?.name || "Unknown",
          image: member.image
            ? `http://localhost:6996/hosp/uploads/${member.image}`
            : "https://via.placeholder.com/150",
        }));
        setStaff(staffList);
      })
      .catch((err) => console.error("Error fetching staff:", err));
  }, []);

  // Filter staff by search (name, role, department)
  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()) ||
      member.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <h2 className="text-center fw-bold text-dark mb-3">Our Hospital Staff</h2>
        <p className="text-center text-muted mb-4">
          Meet our dedicated team of doctors, nurses, and supporting staff.
        </p>

        {/* Search Input */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search by name, role, or department..."
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Staff List */}
        <div className="row g-4">
          {filteredStaff.length > 0 ? (
            filteredStaff.map((member) => (
              <div key={member.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card shadow-sm h-100 text-center border-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="card-img-top rounded-circle mx-auto mt-4"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">{member.name}</h5>
                    <p className="card-text text-primary fw-medium mb-1">{member.role}</p>
                    <p className="card-text text-muted">{member.department}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-danger">No staff found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Staff;
