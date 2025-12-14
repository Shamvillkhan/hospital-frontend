import axios from "axios";
import { useEffect, useState } from "react";

const StaffForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    specialization: "",
    phone: "",
    email: "",
    hireDate: "",
    departmentId: "",
    address: "",
    workingDays: "",
  });
  const [departments, setDepartments] = useState([]);
  const [image, setImage] = useState(null);

  // Fetch departments on load
  useEffect(() => {
    axios
      .get("https://hospital-backend-3-0pon.onrender.com/hosp/departments/getall")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append all fields, converting departmentId to number
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "") {
        form.append(key, key === "departmentId" ? Number(formData[key]) : formData[key]);
      }
    });

    if (image) form.append("image", image);

    axios
      .post("https://hospital-backend-3-0pon.onrender.com/hosp/staff/add", form)
      .then(() => {
        alert("✅ Staff added successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          role: "",
          specialization: "",
          phone: "",
          email: "",
          hireDate: "",
          departmentId: "",
          address: "",
          workingDays: "",
        });
        setImage(null);
      })
      .catch((err) => {
        console.error("❌ Error saving staff:", err.response?.data || err);
        alert("Failed to save staff");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Staff</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
        encType="multipart/form-data"
      >
        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Role --</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Specialization */}
        <div className="mb-3">
          <label className="form-label">Specialization</label>
          <input
            type="text"
            className="form-control"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Hire Date */}
        <div className="mb-3">
          <label className="form-label">Hire Date</label>
          <input
            type="date"
            className="form-control"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Department */}
        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            className="form-select"
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Working Days */}
        <div className="mb-3">
          <label className="form-label">Working Days</label>
          <input
            type="text"
            className="form-control"
            name="workingDays"
            value={formData.workingDays}
            onChange={handleChange}
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default StaffForm;
