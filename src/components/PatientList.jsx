import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(null); // male/female count
  const navigate = useNavigate();

  // Fetch all patients
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:6996/hosp/patients/getall");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Delete patient
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:6996/hosp/patients/delete/${id}`);
      setPatients(patients.filter((p) => p.patientId !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  // Update patient → redirect to form with data
  const handleUpdate = (patient) => {
    navigate("/patient-form", { state: { patient } });
  };

  // Filtered patients by search
  const filteredPatients = patients.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.firstName.toLowerCase().includes(term) ||
      p.lastName.toLowerCase().includes(term) ||
      p.phone.toLowerCase().includes(term) ||
      (p.email && p.email.toLowerCase().includes(term)) ||
      (p.bloodType && p.bloodType.toLowerCase().includes(term)) ||
      (p.gender && p.gender.toLowerCase().includes(term))
    );
  });

  // Count functions
  const countMale = () => {
    const males = patients.filter((p) => p.gender?.toLowerCase() === "male").length;
    setCount(`Total Male Patients: ${males}`);
  };

  const countFemale = () => {
    const females = patients.filter((p) => p.gender?.toLowerCase() === "female").length;
    setCount(`Total Female Patients: ${females}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Patients</h2>

      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name, Phone, Email, Blood Group or Gender"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Count Buttons */}
      <div className="mb-3">
        <button className="btn btn-info me-2" onClick={countMale}>
          Count Male
        </button>
        <button className="btn btn-success" onClick={countFemale}>
          Count Female
        </button>
      </div>

      {/* Show Count */}
      {count && <div className="alert alert-primary">{count}</div>}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Blood Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p) => (
              <tr key={p.patientId}>
                <td>{p.patientId}</td>
                <td>
                  {p.firstName} {p.lastName}
                </td>
                <td>{p.dateOfBirth}</td>
                <td>{p.gender}</td>
                <td>{p.phone}</td>
                <td>{p.email}</td>
                <td>{p.bloodType}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdate(p)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.patientId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No patients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
