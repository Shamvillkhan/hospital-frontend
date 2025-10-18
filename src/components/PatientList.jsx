import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countMessage, setCountMessage] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
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

  // Filter patients based on search
  const filteredPatients = patients.filter((p) => {
    const search = searchTerm.toLowerCase();
    return (
      p.firstName?.toLowerCase().includes(search) ||
      p.lastName?.toLowerCase().includes(search) ||
      p.phone?.toLowerCase().includes(search) ||
      p.email?.toLowerCase().includes(search) ||
      p.bloodType?.toLowerCase().includes(search) ||
      p.gender?.toLowerCase().includes(search)
    );
  });

  // Count by gender
  const handleCountByGender = (gender) => {
    const count = patients.filter((p) => p.gender === gender).length;
    setCountMessage(`Total ${gender} patients: ${count}`);
  };

  // Count by blood group
  const handleCountByBloodGroup = () => {
    if (!selectedBloodGroup) {
      setCountMessage("Please select a blood group first.");
      return;
    }
    const count = patients.filter((p) => p.bloodType === selectedBloodGroup).length;
    setCountMessage(`Total patients with blood group ${selectedBloodGroup}: ${count}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Patients</h2>

      {/* Search Box */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by Name, Phone, Email, Gender, or Blood Group"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Count Buttons */}
      <div className="mb-3 d-flex align-items-center gap-2">
        <button className="btn btn-info" onClick={() => handleCountByGender("Male")}>
          Count Male
        </button>
        <button className="btn btn-info" onClick={() => handleCountByGender("Female")}>
          Count Female
        </button>
        <button className="btn btn-info" onClick={() => handleCountByGender("Other")}>
          Count Other
        </button>

        {/* Blood Group Count */}
        <select
          className="form-select w-auto"
          value={selectedBloodGroup}
          onChange={(e) => setSelectedBloodGroup(e.target.value)}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <button className="btn btn-primary" onClick={handleCountByBloodGroup}>
          Count by Blood Group
        </button>
      </div>

      {countMessage && <div className="alert alert-info">{countMessage}</div>}

      {/* Table */}
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
                <td>{p.firstName} {p.lastName}</td>
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
  