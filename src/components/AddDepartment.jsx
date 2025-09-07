import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    headOfDepartment: "",
    contactNumber: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Department name is required";
    else if (formData.name.length > 100)
      newErrors.name = "Department name cannot exceed 100 characters";

    if (formData.description.length > 1000)
      newErrors.description = "Description cannot exceed 1000 characters";

    if (formData.contactNumber && !/^[0-9]{10,15}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Contact number must be 10 to 15 digits";

    if (formData.location.length > 100)
      newErrors.location = "Location cannot exceed 100 characters";

    if (formData.headOfDepartment && isNaN(formData.headOfDepartment))
      newErrors.headOfDepartment = "Head of Department must be a number";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post("http://localhost:6996/hosp/departments/add", formData)
      .then((res) => {
        setSuccessMsg("Department added successfully!");
        setFormData({
          name: "",
          description: "",
          headOfDepartment: "",
          contactNumber: "",
          location: "",
        });
        setErrors({});
      })
      .catch((err) => {
        console.error("Error adding department:", err);
        setSuccessMsg("");
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">Add New Department</h4>
            </div>
            <div className="card-body">
              {successMsg && (
                <div className="alert alert-success">{successMsg}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Department Name *</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Head of Department (Staff ID)</label>
                  <input
                    type="number"
                    name="headOfDepartment"
                    className={`form-control ${
                      errors.headOfDepartment ? "is-invalid" : ""
                    }`}
                    value={formData.headOfDepartment}
                    onChange={handleChange}
                  />
                  {errors.headOfDepartment && (
                    <div className="invalid-feedback">{errors.headOfDepartment}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    className={`form-control ${
                      errors.contactNumber ? "is-invalid" : ""
                    }`}
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                  {errors.contactNumber && (
                    <div className="invalid-feedback">{errors.contactNumber}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className={`form-control ${errors.location ? "is-invalid" : ""}`}
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && (
                    <div className="invalid-feedback">{errors.location}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
