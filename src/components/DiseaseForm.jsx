import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DiseaseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diseaseName, setDiseaseName] = useState("");
  const [curePrecaution, setCurePrecaution] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // for showing selected image

  useEffect(() => {
    if (id) {
      axios
        .get(`https://hospital-backend-3-0pon.onrender.com/hosp/disease/gett/${id}`)
        .then((res) => {
          setDiseaseName(res.data.diseaseName);
          setCurePrecaution(res.data.curePrecaution);
          if (res.data.image) {
            setPreview(`https://hospital-backend-3-0pon.onrender.com/hosp/uploads/${res.data.image}`);
          }
        })
        .catch((err) => console.error("Error fetching disease:", err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "disease",
      new Blob(
        [JSON.stringify({ id, diseaseName, curePrecaution })],
        { type: "application/json" }
      )
    );
    if (image) {
      formData.append("image", image);
    }

    try {
      if (id) {
        // Update
        await axios.put(
          `https://hospital-backend-3-0pon.onrender.com/hosp/disease/update/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Add
        await axios.post(
          "https://hospital-backend-3-0pon.onrender.com/hosp/disease/add",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      navigate("/"); // redirect back to list
    } catch (error) {
      console.error("Error saving disease:", error);
      alert("Failed to save disease");
    }
  };

  return (
    <div className="container py-5">
      <h2>{id ? "Update Disease" : "Add Disease"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Disease Name</label>
          <input
            type="text"
            className="form-control"
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Cure & Precaution</label>
          <textarea
            className="form-control"
            value={curePrecaution}
            onChange={(e) => setCurePrecaution(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Upload Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>

        {preview && (
          <div className="mb-3">
            <label>Preview:</label>
            <br />
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default DiseaseForm;
