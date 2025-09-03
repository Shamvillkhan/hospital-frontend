import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Cure = () => {
  const [diseases, setDiseases] = useState([]);
  const navigate = useNavigate();

  const fetchDiseases = async () => {
    try {
      const response = await axios.get("http://localhost:6996/hosp/disease/getAll");
      setDiseases(response.data);
    } catch (error) {
      console.error("Error fetching diseases:", error);
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this disease?")) {
      try {
        await axios.delete(`http://localhost:6996/hosp/disease/delete/${id}`);
        setDiseases(diseases.filter((d) => d.id !== id));
      } catch (error) {
        console.error("Error deleting disease:", error);
        alert("Failed to delete disease");
      }
    }
  };

  return (
    <div className="container py-5" style={{ marginTop: "80px" }}>
      <h2 className="text-center mb-4">Disease & Cure</h2>

      <div className="row">
        {diseases.length > 0 ? (
          diseases.map((disease) => (
            <div className="col-md-4 mb-4" key={disease.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    disease.image
                      ? `http://localhost:6996/hosp/uploads/${disease.image}`
                      : "https://via.placeholder.com/300x180?text=No+Image"
                  }
                  className="card-img-top"
                  alt={disease.diseaseName}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{disease.diseaseName}</h5>
                  <p className="card-text">{disease.curePrecaution}</p>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/update/${disease.id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(disease.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No diseases found.</p>
        )}
      </div>
    </div>
  );
};

export default Cure;
