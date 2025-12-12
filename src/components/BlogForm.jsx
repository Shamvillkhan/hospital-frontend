import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../api";
const BlogForm = () => {
  const { id } = useParams(); // agar update hai toh id ayegi
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // agar update hai toh purana data load karo
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/blogs/gett/${id}`)
        .then((res) => {
          setFormData({
            title: res.data.title || "",
            content: res.data.content || "",
            author: res.data.author || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching blog:", err);
          setLoading(false);
        });
    }
  }, [id]);

  // handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("blog", JSON.stringify({ id, ...formData })); // id bhi bhejna hai update ke liye
    if (image) {
      data.append("image", image);
    }

    try {
      await axios.post(`${BASE_URL}/blogs/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(id ? "Blog updated!" : "Blog added!");
      navigate("/");
    } catch (err) {
      console.error("Error saving blog:", err);
      alert("Failed to save blog");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">{id ? "Update Blog" : "Add Blog"}</h2>

      {loading ? (
        <p className="text-center">Loading blog data...</p>
      ) : (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              name="author"
              className="form-control"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              className="form-control"
              rows="5"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
            {/* agar update mode hai toh purana image dikhado */}
            {id && !image && (
              <div className="mt-2">
                <p>Current Image:</p>
                <img
                  src={`${BASE_URL}/uploads/${id}`}
                  alt="Old Blog"
                  style={{ width: "150px", borderRadius: "8px" }}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {id ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogForm;
